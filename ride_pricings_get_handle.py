import time
from math import ceil
from uuid import uuid4
from copy import deepcopy
from json import loads, dumps
from random import sample
from string import digits, ascii_lowercase
from datetime import datetime, timedelta
from threading import Thread
from sql import (
    login_session_select,
    fleets_select_by_from_to,
    select_service_area_pricings_by_info,
    access_token_select_by_info,
    corporates_select_by_info
)
from framework import calculate_distance
from framework import sql_handler, tuple_find
from framework import logger, get_hash
from framework.env import get_elife_fleet_id
from framework import s3_put_object_caller
from framework import get_s3_signature_parameters
from framework.env import get_s3_quote_bucket_name
from .ride_pricings_post_handle import ride_pricings_post_proc
from enumeration.resource_types import resource_types


fleets_cache = {}

@sql_handler()
def ride_pricings_get_handle(event, queryStringParameters, cnx, cursor):
    resultJson = {
        'restStatus': 200,
        'body': {}
    }

    if queryStringParameters is None or not isinstance(queryStringParameters, dict):
        resultJson['restStatus'] = 403
        resultJson['body'] = {'errCode': 10040, 'errMsg': 'Not authorized.'}
        return resultJson

    session = queryStringParameters.get('ses', '')
    token = queryStringParameters.get('t', '')
    if 'ses' in queryStringParameters:
        session = queryStringParameters['ses']

        if len(session) == 0:
            resultJson['restStatus'] = 403
            resultJson['body'] = {'errCode': 10040, 'errMsg': 'Not authorized.'}
            return resultJson

        session_hash = get_hash(session)

        session_info = login_session_select(session_hash, cnx, cursor)

        if session_info is None:
            resultJson['restStatus'] = 403
            resultJson['body'] = {'errCode': 10040, 'errMsg': 'Not authorized.'}
            return resultJson
        else:
            if 'access' in session_info:
                access = loads(session_info['access'])
                if access['type'] in ('agency_emp', 'corporate_emp', 'affiliate_emp') :
                    queryStringParameters['demand_fleet_id'] = access['fleet_id']
                    queryStringParameters['supply_fleet_id'] = get_elife_fleet_id()
                elif access['type'] != 'employee':
                    resultJson['restStatus'] = 403
                    resultJson['body'] = {'errCode': 10040, 'errMsg': 'Not authorized.'}
                    return resultJson
            else:
                resultJson['restStatus'] = 403
                resultJson['body'] = {'errCode': 10040, 'errMsg': 'Not authorized.'}
                return resultJson
    elif len(token) > 0:
        token_hash = get_hash(token)
        corporate_type = tuple_find(resource_types, 'name', 'Corporate')
        token_info = access_token_select_by_info({
                'token': token_hash, 
                'resource_type': corporate_type['id']
        }, cnx, cursor)
        if token_info is None:
            logger.error('corporate token was not found.')
            resultJson['restStatus'] = 403
            resultJson['body'] = {'errCode': 10040, 'errMsg': 'Not authorized.'}
            return resultJson
        corporate = corporates_select_by_info({"corporate.id": token_info["resource_id"]}, cnx, cursor)
        if corporate and corporate[0]:
            queryStringParameters['demand_fleet_id'] = corporate[0]['fleet_id']
            queryStringParameters['supply_fleet_id'] = get_elife_fleet_id()
        else:
            logger.error('corporate not found.')
            resultJson['restStatus'] = 403
            resultJson['body'] = {'errCode': 10040, 'errMsg': 'Not authorized.'}
            return resultJson
    else:
        queryStringParameters['supply_fleet_id'] = get_elife_fleet_id()

        if 'demand_fleet_id' in queryStringParameters:
            del queryStringParameters['demand_fleet_id']

    return ride_pricings_get_proc(queryStringParameters, resultJson, cnx, cursor)


def ride_pricings_get_proc(queryStringParameters, resultJson, cnx, cursor, cache=False, buffer=None, scheduled=False):
    from_point = {}
    to_point = {}

    if queryStringParameters is None:
        resultJson['restStatus'] = 400
        resultJson['body'] = {'errCode': 10041, 'errMsg': 'Input parameter is missing.'}
        return resultJson
    from_point['lat'] = queryStringParameters.get('from_lat', '')
    from_point['lng'] = queryStringParameters.get('from_lng', '')
    to_point['lat'] = queryStringParameters.get('to_lat', '')
    to_point['lng'] = queryStringParameters.get('to_lng', '')

    demand_fleet_id = int(queryStringParameters.get('demand_fleet_id', 0))

    supply_fleet_id = int(queryStringParameters.get('supply_fleet_id', 0))

    passenger_count = int(queryStringParameters.get('passenger_count', 0))

    children_count = int(queryStringParameters.get('children_count', 0))

    infant_count = int(queryStringParameters.get('infant_count', 0))

    called_from = queryStringParameters.get('called_from', '')

    # meet_n_greet = queryStringParameters.get('meet_n_greet')

    stops = queryStringParameters.get('stops', '')
    if len(stops) > 0 and isinstance(stops, str):
        stop_list = stops.split(',')
        stops = []
        for stop in stop_list:
            coordinate_list = stop.split(':')
            stops.append({
                'lat': coordinate_list[0],
                'lng': coordinate_list[1]
            })

    queryStringParameters['stops'] = stops

    passenger_count += children_count + infant_count

    if not (bool(from_point['lat']) and bool(from_point['lng'])):
        resultJson['restStatus'] = 400
        resultJson['body'] = {'errCode': 10041, 'errMsg': 'Input parameter is missing.'}
        return resultJson

    for point in (from_point, to_point):
        if isinstance(point['lat'], str) and len(point['lat']) > 0:
            point['lat'] = float(point['lat'])
        if isinstance(point['lng'], str) and len(point['lng']) > 0:
            point['lng'] = float(point['lng'])

    if supply_fleet_id == 0:
        supply_fleet_id = get_elife_fleet_id()
    # fleet_ids_qry = []
    # if buffer == 'aggressive':
    #     logger.info('print fleets_cache: ')
    #     logger.info(fleets_cache)
    #     for fleet_item in fleets_cache.values():
    #         distance_from = calculate_distance({'lat': fleet_item['serviceArea']['lat'], 'lng': fleet_item['serviceArea']['lng']},
    #                                             {'lat': from_point['lat'], 'lng': from_point['lng']})
    #         if distance_from < fleet_item['serviceArea']['radius'] and fleet_item['serviceArea']['parent_fleet_id'] == get_elife_fleet_id():
    #             logger.info('using fleets_cache item: ')
    #             logger.info(fleet_item)
    #             fleet_ids_qry.append(dict(fleet_item['serviceArea'],
    #                                       **{'service_area_pricing_id': fleet_item['service_area_pricing_id'], 'fleet_id': fleet_item['serviceArea']['id']}))
    # if len(fleet_ids_qry) == 0:
    #     fleet_ids_qry = fleets_select_by_from_to(from_point, to_point, demand_fleet_id, supply_fleet_id, cnx, cursor)
    fleet_price_list = []
    hint = 0
    country = ''
    from_fleet_list = get_fleet_list(from_point, to_point, demand_fleet_id, supply_fleet_id,cache, cnx, cursor)
    for fleet in from_fleet_list:
        queryStringParameters['service_area'] = fleet
        queryStringParameters['get_flag'] = True

        country = fleet.get('countryCode', '')

        if buffer == 'aggressive':
            distance_from = calculate_distance({'lat': fleet['serviceArea']['lat'], 'lng': fleet['serviceArea']['lng']}, {'lat': from_point['lat'], 'lng': from_point['lng']})
            distance_to = calculate_distance({'lat': fleet['serviceArea']['lat'], 'lng': fleet['serviceArea']['lng']}, {'lat': to_point['lat'], 'lng': to_point['lng']})
            if distance_from < fleet['serviceArea']['radius'] and distance_to < fleet['serviceArea']['radius']:
                queryStringParameters['country_code'] = country
                queryStringParameters['is_in_same_country'] = 1
        # logger.info('print ride_pricings_post_proc parameters queryStringParameters: ')
        # logger.info(queryStringParameters)
        # if meet_n_greet is None:
        #     del queryStringParameters['service_area']['pricing']['meet_n_greet']
        result = ride_pricings_post_proc(queryStringParameters, resultJson, cnx, cursor, cache)
        # round trip price calculated separately
        if 'return_time' in queryStringParameters and queryStringParameters['return_time']:
            return_resultJson = {
                'restStatus': 200,
                'body': {}
            }
            logger.info('calculate round trip price')
            return_queryStringParameters = deepcopy(queryStringParameters)
            return_queryStringParameters['from_time_str'] = ''                
            return_queryStringParameters['from_utc'] = return_queryStringParameters['return_time']
            result_return = ride_pricings_post_proc(return_queryStringParameters, return_resultJson, cnx, cursor, cache)
            if result_return['restStatus'] != 200:
                return result_return
            else:
                calculate_roundtrip_final_price(result, result_return)
        if result['restStatus'] != 200:
            return result
        else:
            if 'hint' in result['body']:
                hint = result['body']['hint']
            fleet_price_list.extend(result['body']['fleets'])
    
    # cross ServiceArea 
    country_pricing_strategy = {
        'high': {'ALA', 'GRC', 'ISL', 'LVA', 'RUS'},
        'low': {'AND', 'AUT', 'BEL', 'BGR', 'BLR', 'CAN', 'CYP', 'CZE', 'DEU', 'ESP', 'EST', 'FIN', 'GIB', 'HRV', 
                'HUN', 'LIE', 'LTU', 'LUX', 'MDA', 'MKD', 'MNE', 'NLD', 'POL', 'PRT', 'ROU', 'SRB', 'USA'}
    }    
    if country in country_pricing_strategy['high'] or country in country_pricing_strategy['low']:
        destination_fleet_price_list = []
        destination_fleet_list = get_fleet_list(to_point, from_point, demand_fleet_id, supply_fleet_id,cache, cnx, cursor)
        destination_fleet_list = get_different_to_fleet_list(from_fleet_list, destination_fleet_list)
        if destination_fleet_list:
            strategy = 'high' if country in country_pricing_strategy['high'] else 'low'
            destination_queryStringParameters = deepcopy(queryStringParameters)
            destination_queryStringParameters['from_lat'], destination_queryStringParameters['to_lat'] = destination_queryStringParameters['to_lat'], destination_queryStringParameters['from_lat']
            destination_queryStringParameters['from_lng'], destination_queryStringParameters['to_lng'] = destination_queryStringParameters['to_lng'], destination_queryStringParameters['from_lng']
            for fleet in destination_fleet_list:
                destination_queryStringParameters['service_area'] = fleet
                destination_queryStringParameters['get_flag'] = True
                country = fleet.get('countryCode', '')

                if buffer == 'aggressive':
                    distance_from = calculate_distance({'lat': fleet['serviceArea']['lat'], 'lng': fleet['serviceArea']['lng']}, {'lat': to_point['lat'], 'lng': to_point['lng']})
                    distance_to = calculate_distance({'lat': fleet['serviceArea']['lat'], 'lng': fleet['serviceArea']['lng']}, {'lat': from_point['lat'], 'lng': from_point['lng']})
                    if distance_from < fleet['serviceArea']['radius'] and distance_to < fleet['serviceArea']['radius']:
                        destination_queryStringParameters['country_code'] = country
                        destination_queryStringParameters['is_in_same_country'] = 1

                destination_resultJson = {
                    'restStatus': 200,
                    'body': {}
                }
                destination_result = ride_pricings_post_proc(destination_queryStringParameters, destination_resultJson, cnx, cursor, cache)
                if 'return_time' in destination_queryStringParameters and destination_queryStringParameters['return_time']:
                    return_resultJson_2 = {
                        'restStatus': 200,
                        'body': {}
                    }
                    logger.info('calculate round trip price')
                    return_queryStringParameters_2 = deepcopy(destination_queryStringParameters)
                    return_queryStringParameters_2['from_time_str'] = ''                
                    return_queryStringParameters_2['from_utc'] = return_queryStringParameters_2['return_time']
                    result_return_2 = ride_pricings_post_proc(return_queryStringParameters_2, return_resultJson_2, cnx, cursor, cache)
                    if result_return_2['restStatus'] != 200:
                        return result_return_2
                    else:
                        calculate_roundtrip_final_price(destination_result, result_return_2)
                if destination_result['restStatus'] == 200:
                    destination_fleet_price_list.extend(destination_result['body']['fleets'])
            # price comparison
            if fleet_price_list and destination_fleet_price_list:
                final_fleet_price_list = []
                for depart_price in fleet_price_list:
                    arrivel_price = tuple_find(destination_fleet_price_list, 'parent_fleet_id', depart_price['parent_fleet_id'])
                    final_fleet_price_list.append(choose_target_area_price(depart_price, arrivel_price, strategy))

                fleet_price_list = final_fleet_price_list

    resultJson['restStatus'] = 200
    if len(fleet_price_list) == 0 and hint > 0:
        resultJson['body'] = {'fleets': fleet_price_list, 'hint': hint}
    else:
        resultJson['body'] = {'fleets': fleet_price_list}

    if called_from != 'ride_quotes_post' and scheduled is False:
        quote_id = str(uuid4()).replace('-', '')
        folder_name = datetime.strftime(datetime.utcnow(), '%Y-%m') + '/'
        bucket = get_s3_quote_bucket_name()
        s3_sig_params = get_s3_signature_parameters()

        s3_data_list = []

        queryStringParameters_s3 = deepcopy(queryStringParameters)

        if 'service_area' in queryStringParameters_s3:
            del queryStringParameters_s3['service_area']
        if 'vehicle_class_list' in queryStringParameters_s3:
            del queryStringParameters_s3['vehicle_class_list']
        if 'get_flag' in queryStringParameters_s3:
            del queryStringParameters_s3['get_flag']

        if 'ses' in queryStringParameters_s3:
            queryStringParameters_s3['ses'] = \
                queryStringParameters_s3['ses'][:len(queryStringParameters_s3['ses']) // 2] + '...'
            
        request_time = int(datetime.utcnow().timestamp())
        random_tail_str =''.join(sample(ascii_lowercase + digits, 8))
        queryStringParameters_s3['request_time'] = request_time
        req = (dumps(queryStringParameters_s3) + f'\n{quote_id}').encode('utf-8')
        request_id = queryStringParameters_s3.get('request_id', '')
        if len(request_id) == 0:
            request_id = queryStringParameters_s3.get('sec', '').replace('-', '')
        request_id = str(uuid4()).replace('-', '') if len(request_id) == 0 else request_id
        request_id_s3 = f'{request_id}-{request_time}-{random_tail_str}'
        req_name = f'{folder_name}{request_id_s3}-req.json'
        s3_data_list.append({
            'name': req_name,
            'data': req
        })

        if len(resultJson['body']['fleets']) > 0:
            for vehicle_classes in resultJson['body']['fleets']:
                for vehicle_price in vehicle_classes['vehicle_classes']:
                    if 'vehicle_class_id' in vehicle_price:
                        vehicle_price['price']['quote_id'] = f'{quote_id}-v{vehicle_price["vehicle_class_id"]}'
                    else:
                        vehicle_price['price']['quote_id'] = quote_id
                if "meet_and_greet" in vehicle_classes:
                    if len(vehicle_classes['meet_and_greet']) > 0:
                        vehicle_classes['meet_and_greet']['price']['quote_id'] = f'{quote_id}-m'

            quote = deepcopy(resultJson['body'])
            quote['request_time'] = request_time
            s3_data_list.append({
                'name': f'{folder_name}{quote_id}-rep.json',
                'data': (dumps(quote, ensure_ascii=False) + f'\n{request_id_s3}').encode('utf-8')
            })

        if called_from == 'fliggy_callback':
            logger.info('upload s3 using multi threading')
            logger.info(s3_data_list)
            logger.info(f"s3 req, rep file_name: {', '.join([i['name'] for i in s3_data_list])}")
            thread = Thread(target=s3_put_object_caller, args=(bucket, s3_data_list, s3_sig_params))
            thread.start()
        else:
            upload_result = s3_put_object_caller(bucket, s3_data_list, s3_sig_params)
            logger.info(f'upload result {upload_result}')

            resultJson['body']['request_id'] = request_id
    else:
        resultJson['body']['country'] = country

    return resultJson


def format_service_area(area):
    if 'vehicleClasses' in area:
        area['pricing']['vehicleClasses'] = area['vehicleClasses']
        del area['vehicleClasses']

    return area

def load_princing_json_and_set_princing_id(cached_fleet_item):
    service_area_pricing_id = cached_fleet_item['id']
    cached_fleet_item = loads(cached_fleet_item['pricing'])
    cached_fleet_item['service_area_pricing_id'] = service_area_pricing_id
    return cached_fleet_item


def get_fleet_list(from_point, to_point, demand_fleet_id, supply_fleet_id,cache, cnx, cursor):
    fleet_list = []
    start_time = time.time()
    fleet_ids_qry = fleets_select_by_from_to(from_point, to_point, demand_fleet_id, supply_fleet_id, cnx, cursor)
    end_time = time.time()
    logger.info('function fleets_select_by_from_to takes {} sec'.format(end_time - start_time))
    if len(fleet_ids_qry) != 0:   
        cached_ids = []
        logger.info('print fleet_ids_qry: ')
        logger.info(fleet_ids_qry)
        for i in fleet_ids_qry:
            if str(i['fleet_id']) in fleets_cache:
                cached = fleets_cache[str(i['fleet_id'])]
                now = datetime.now()
                if cached['expire_at'] < now:
                    del fleets_cache[str(i['fleet_id'])]
                else:
                    fleet_list.append(fleets_cache[str(i['fleet_id'])])
                    cached_ids.append(i['fleet_id'])

        # fleet_ids = [i['fleet_id'] for i in fleet_ids if i not in cached_ids]
        fleet_ids = [i['fleet_id'] for i in fleet_ids_qry if i['fleet_id'] not in cached_ids and i['service_area_pricing_id'] is None]
        pricing_ids = [i['service_area_pricing_id']
                        for i in fleet_ids_qry if i['fleet_id'] not in cached_ids and i['service_area_pricing_id'] is not None]

        not_cached_fleets = []
        if len(pricing_ids) != 0:
            not_cached_fleets_1 = select_service_area_pricings_by_info({'service_area_pricing.id': pricing_ids}, cnx, cursor)
            not_cached_fleets.extend(not_cached_fleets_1)

        if len(fleet_ids) > 0:
            not_cached_fleets_2 = select_service_area_pricings_by_info({'service_area_pricing.service_area_id': fleet_ids}, cnx, cursor)
            for item_fleet_id in fleet_ids:
                pricing_one_fleet_id = tuple_find(not_cached_fleets_2, 'service_area_id', item_fleet_id)
                if pricing_one_fleet_id is not None:
                    not_cached_fleets.append(pricing_one_fleet_id)

        # not_cached_fleets = [loads(item['pricing']) for item in not_cached_fleets]
        not_cached_fleets = list(map(load_princing_json_and_set_princing_id, not_cached_fleets))
        not_cached_fleets = list(map(format_service_area, not_cached_fleets))
        fleet_list += not_cached_fleets
        if cache:
            for fleet in not_cached_fleets:
                fleet['expire_at'] = datetime.now() + timedelta(hours=1)
                fleets_cache[str(fleet['serviceArea']['id'])] = fleet
                logger.info('Fleet {} is cached.'.format(str(fleet['serviceArea']['id'])))
    return fleet_list     


def get_different_to_fleet_list(from_fleet_list, to_fleet_list):
    different_to_fleet_list = []
    from_fleet_ids = [fleet['serviceArea']['id'] for fleet in from_fleet_list]
    for fleet in to_fleet_list:
        if fleet['serviceArea']['id'] not in from_fleet_ids:
            different_to_fleet_list.append(fleet)

    return different_to_fleet_list


def calculate_roundtrip_final_price(first_trip, return_trip):
    if not first_trip['body']['fleets'] or not return_trip['body']['fleets']:
        return
    
    return_vehicle_classes = return_trip['body']['fleets'][0]['vehicle_classes']
    for ind, vehicle_class in enumerate(first_trip['body']['fleets'][0]['vehicle_classes']):
        if vehicle_class['vehicle_class_id'] == return_vehicle_classes[ind]['vehicle_class_id']:
            vehicle_class['price']['amount'] += ceil(return_vehicle_classes[ind]['price']['amount'] * 100) / 100            
        else:
            return_vehicle_class = tuple_find(return_vehicle_classes, 'vehicle_class_id', vehicle_class['vehicle_class_id'])
            vehicle_class['price']['amount'] += ceil(return_vehicle_class['price']['amount'] * 100) / 100
            
        vehicle_class['price']['amount'] = round(vehicle_class['price']['amount'], 2)


def choose_target_area_price(depart_area_price, arrivel_area_price, strategy):
    if not arrivel_area_price or 'vehicle_classes' \
    not in arrivel_area_price or len(arrivel_area_price['vehicle_classes']) == 0:
        return depart_area_price
    
    depart_mean_price = sum([
        i['price']['amount'] 
        for i in depart_area_price['vehicle_classes']
    ]) / len(depart_area_price['vehicle_classes'])

    arrivel_mean_price = sum([
        i['price']['amount'] 
        for i in arrivel_area_price['vehicle_classes']
    ]) / len(arrivel_area_price['vehicle_classes'])

    if strategy == 'high':
        return depart_area_price if depart_mean_price >= arrivel_mean_price else arrivel_area_price
    else:
        return depart_area_price if depart_mean_price < arrivel_mean_price else arrivel_area_price