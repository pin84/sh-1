import os
import json
from framework import logger
from framework import sql_handler
from framework import run_sql
from framework import get_spp_route_to_place_lat_lng_key
from framework import get_spp_route_from_place_lat_lng_key
from framework import redis_geo_add

def spp_route_select(cnx, cursor):
    query = """
    select 
    route.id as route_id, route.from_place_lat_lng, route.to_place_lat_lng
    from 
    spp_route route
    """
    param = []
    
    results = run_sql(cnx, cursor, query, param, fetch='all')

    if results is None:
        return []
    else:
        return [dict(zip(cursor.column_names, result)) for result in results]


@sql_handler()
def write_spp_route(cnx, cursor):
    route_query = spp_route_select(cnx=cnx, cursor=cursor)
    
    from_route_data = list()
    to_route_data = list()
    from_route_place_lat_lng_name_key, get_from_route_key = get_spp_route_from_place_lat_lng_key()
    to_route_place_lat_lng_name_key, get_to_route_key = get_spp_route_to_place_lat_lng_key()
    
    for route in route_query:
        from_place_lat_lng = route['from_place_lat_lng']
        to_place_lat_lng = route['to_place_lat_lng']
        route_id = route['route_id']
        
        try:
            from_place_lat_lng_json = json.loads(from_place_lat_lng)
            to_place_lat_lng_json = json.loads(to_place_lat_lng)
            from_place_lat = float(from_place_lat_lng_json['lat'])
            from_place_lng = float(from_place_lat_lng_json['lng'])

            to_place_lat = float(to_place_lat_lng_json['lat'])
            to_place_lng = float(to_place_lat_lng_json['lng'])
        except:
            logger.info(f"error: {route_id}")
            continue

        from_route_data.extend([
            from_place_lng,
            from_place_lat,
            get_from_route_key(route_id)
        ])

        to_route_data.extend([
            to_place_lng,
            to_place_lat,
            get_to_route_key(route_id)
        ])
    
    redis_geo_add(from_route_place_lat_lng_name_key, values=from_route_data)
    redis_geo_add(to_route_place_lat_lng_name_key, values=to_route_data)


# def lambda_handler(event, context):
#     logger.info(os.path.basename(__file__))
#     return service_area_pricing_json_get(event=event)

if __name__ == "__main__":
    # event = {'resource': '/service-area-pricings/id/jsons/id', 'path': '/service-area-pricings/id/jsons/id', 'httpMethod': 'GET', 'headers': {'Accept': '*/*', 'Accept-Encoding': 'gzip, deflate, br', 'Host': 's46bnb5w13.execute-api.us-east-2.amazonaws.com', 'Postman-Token': '15f37935-76f6-4589-ba9c-f70a99cffcfd', 'User-Agent': 'PostmanRuntime/7.40.0', 'X-Amzn-Trace-Id': 'Root=1-66d5646f-787c74d5067991ce431b4c3b', 'X-Forwarded-For': '163.123.192.90', 'X-Forwarded-Port': '443', 'X-Forwarded-Proto': 'https'}, 'multiValueHeaders': {'Accept': ['*/*'], 'Accept-Encoding': ['gzip, deflate, br'], 'Host': ['s46bnb5w13.execute-api.us-east-2.amazonaws.com'], 'Postman-Token': ['15f37935-76f6-4589-ba9c-f70a99cffcfd'], 'User-Agent': ['PostmanRuntime/7.40.0'], 'X-Amzn-Trace-Id': ['Root=1-66d5646f-787c74d5067991ce431b4c3b'], 'X-Forwarded-For': ['163.123.192.90'], 'X-Forwarded-Port': ['443'], 'X-Forwarded-Proto': ['https']}, 'queryStringParameters': {'json_id': '7703', 'req_id': 'e4953242-ed7d-c820-cb2e-16a7e14535f8', 'ses': 'fVLohApBMkA8x9AWJM2wCep7tfgCoMhRft5QcfL0wyts0RnDZ5KkUfMiMdDxbvQVArzqFqRlYX4BoXHHP5RKrGZ5lYGtUQ5EE8TVux6ZMN84ajxON74e6qHmx2NoIG1I'}, 'multiValueQueryStringParameters': {'json_id': ['7703'], 'req_id': ['e4953242-ed7d-c820-cb2e-16a7e14535f8'], 'ses': ['fVLohApBMkA8x9AWJM2wCep7tfgCoMhRft5QcfL0wyts0RnDZ5KkUfMiMdDxbvQVArzqFqRlYX4BoXHHP5RKrGZ5lYGtUQ5EE8TVux6ZMN84ajxON74e6qHmx2NoIG1I']}, 'pathParameters': None, 'stageVariables': None, 'requestContext': {'resourceId': '88r2co', 'resourcePath': '/service-area-pricings/id/jsons/id', 'httpMethod': 'GET', 'extendedRequestId': 'ddyhiEUZiYcEV2A=', 'requestTime': '02/Sep/2024:07:08:31 +0000', 'path': '/dev/service-area-pricings/id/jsons/id', 'accountId': '396489051206', 'protocol': 'HTTP/1.1', 'stage': 'dev', 'domainPrefix': 's46bnb5w13', 'requestTimeEpoch': 1725260911959, 'requestId': 'f58da45d-962e-4638-b475-eac5efa39975', 'identity': {'cognitoIdentityPoolId': None, 'accountId': None, 'cognitoIdentityId': None, 'caller': None, 'sourceIp': '163.123.192.90', 'principalOrgId': None, 'accessKey': None, 'cognitoAuthenticationType': None, 'cognitoAuthenticationProvider': None, 'userArn': None, 'userAgent': 'PostmanRuntime/7.40.0', 'user': None}, 'domainName': 's46bnb5w13.execute-api.us-east-2.amazonaws.com', 'deploymentId': 'gnvs53', 'apiId': 's46bnb5w13'}, 'body': None, 'isBase64Encoded': False}
    # event = {'resource': '/service-area-pricings/id/jsons/id', 'path': '/service-area-pricings/id/jsons/id', 'httpMethod': 'GET', 'headers': {'accept': 'application/json, text/javascript, */*; q=0.01', 'accept-encoding': 'gzip, deflate, br, zstd', 'accept-language': 'en,zh-CN;q=0.9,zh;q=0.8', 'Host': 's46bnb5w13.execute-api.us-east-2.amazonaws.com', 'origin': 'https://elifetransfer.s3.us-east-2.amazonaws.com', 'priority': 'u=1, i', 'referer': 'https://elifetransfer.s3.us-east-2.amazonaws.com/', 'sec-ch-ua': '"Google Chrome";v="131", "Chromium";v="131", "Not_A Brand";v="24"', 'sec-ch-ua-mobile': '?0', 'sec-ch-ua-platform': '"macOS"', 'sec-fetch-dest': 'empty', 'sec-fetch-mode': 'cors', 'sec-fetch-site': 'cross-site', 'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36', 'X-Amzn-Trace-Id': 'Root=1-674ec9f6-47cb7ab307de55bb409f60c1', 'X-Forwarded-For': '38.181.76.159', 'X-Forwarded-Port': '443', 'X-Forwarded-Proto': 'https'}, 'multiValueHeaders': {'accept': ['application/json, text/javascript, */*; q=0.01'], 'accept-encoding': ['gzip, deflate, br, zstd'], 'accept-language': ['en,zh-CN;q=0.9,zh;q=0.8'], 'Host': ['s46bnb5w13.execute-api.us-east-2.amazonaws.com'], 'origin': ['https://elifetransfer.s3.us-east-2.amazonaws.com'], 'priority': ['u=1, i'], 'referer': ['https://elifetransfer.s3.us-east-2.amazonaws.com/'], 'sec-ch-ua': ['"Google Chrome";v="131", "Chromium";v="131", "Not_A Brand";v="24"'], 'sec-ch-ua-mobile': ['?0'], 'sec-ch-ua-platform': ['"macOS"'], 'sec-fetch-dest': ['empty'], 'sec-fetch-mode': ['cors'], 'sec-fetch-site': ['cross-site'], 'User-Agent': ['Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36'], 'X-Amzn-Trace-Id': ['Root=1-674ec9f6-47cb7ab307de55bb409f60c1'], 'X-Forwarded-For': ['38.181.76.159'], 'X-Forwarded-Port': ['443'], 'X-Forwarded-Proto': ['https']}, 'queryStringParameters': {'json_id': '9429', 'ses': 'FAR8ZGdhdNyh5JAmBReAeKWLNABtc87A7CZcaBfGSVe5psOiiJNDLiMeXvvFkYfQlmuj4gOKffHPG1xy0fJqdONDSTVcnmQ8U4dOfPtyq9T8qFWmQxQHT3Wk8RqL4o5t'}, 'multiValueQueryStringParameters': {'json_id': ['9429'], 'ses': ['FAR8ZGdhdNyh5JAmBReAeKWLNABtc87A7CZcaBfGSVe5psOiiJNDLiMeXvvFkYfQlmuj4gOKffHPG1xy0fJqdONDSTVcnmQ8U4dOfPtyq9T8qFWmQxQHT3Wk8RqL4o5t']}, 'pathParameters': None, 'stageVariables': None, 'requestContext': {'resourceId': '88r2co', 'resourcePath': '/service-area-pricings/id/jsons/id', 'httpMethod': 'GET', 'extendedRequestId': 'CNR-oGUeCYcEHew=', 'requestTime': '03/Dec/2024:09:05:58 +0000', 'path': '/dev/service-area-pricings/id/jsons/id', 'accountId': '396489051206', 'protocol': 'HTTP/1.1', 'stage': 'dev', 'domainPrefix': 's46bnb5w13', 'requestTimeEpoch': 1733216758802, 'requestId': '17f52adc-6e0d-4457-b92a-bf8f6a5542e2', 'identity': {'cognitoIdentityPoolId': None, 'accountId': None, 'cognitoIdentityId': None, 'caller': None, 'sourceIp': '38.181.76.159', 'principalOrgId': None, 'accessKey': None, 'cognitoAuthenticationType': None, 'cognitoAuthenticationProvider': None, 'userArn': None, 'userAgent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36', 'user': None}, 'domainName': 's46bnb5w13.execute-api.us-east-2.amazonaws.com', 'deploymentId': 'gnvs53', 'apiId': 's46bnb5w13'}, 'body': None, 'isBase64Encoded': False}
    # event = {'resource': '/service-area-pricings/id/jsons/id', 'path': '/service-area-pricings/id/jsons/id', 'httpMethod': 'GET', 'headers': {'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8', 'Accept-Encoding': 'gzip, deflate', 'Accept-Language': 'zh-CN', 'Cookie': 'acw_tc=2760820917333680521245490e1d78b7072faa19b36ae42209dba38b60f365', 'Host': 'n5wp0kwpvj.execute-api.us-east-2.amazonaws.com', 'User-Agent': 'DingTalkBot-LinkService/1.0 (+https://open-doc.dingtalk.com/microapp/faquestions/ftpfeu)', 'X-Amzn-Trace-Id': 'Root=1-67638ed9-0624add365316d0019105909', 'X-Forwarded-For': '39.103.217.225', 'X-Forwarded-Port': '443', 'X-Forwarded-Proto': 'https'}, 'multiValueHeaders': {'Accept': ['text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8'], 'Accept-Encoding': ['gzip, deflate'], 'Accept-Language': ['zh-CN'], 'Cookie': ['acw_tc=2760820917333680521245490e1d78b7072faa19b36ae42209dba38b60f365'], 'Host': ['n5wp0kwpvj.execute-api.us-east-2.amazonaws.com'], 'User-Agent': ['DingTalkBot-LinkService/1.0 (+https://open-doc.dingtalk.com/microapp/faquestions/ftpfeu)'], 'X-Amzn-Trace-Id': ['Root=1-67638ed9-0624add365316d0019105909'], 'X-Forwarded-For': ['39.103.217.225'], 'X-Forwarded-Port': ['443'], 'X-Forwarded-Proto': ['https']}, 'queryStringParameters': {'json_id': '367265', 'ses': '14NRCAz1thiPlke8iyNIiSzEQRd9oWaXEZN3hWaKWFToed8ShtJdY47K0MFjsDEq...'}, 'multiValueQueryStringParameters': {'json_id': ['367265'], 'ses': ['14NRCAz1thiPlke8iyNIiSzEQRd9oWaXEZN3hWaKWFToed8ShtJdY47K0MFjsDEq...']}, 'pathParameters': None, 'stageVariables': None, 'requestContext': {'resourceId': 'fqm45s', 'resourcePath': '/service-area-pricings/id/jsons/id', 'httpMethod': 'GET', 'extendedRequestId': 'DBNCDFPcCYcEO5g=', 'requestTime': '19/Dec/2024:03:11:21 +0000', 'path': '/upncoming/service-area-pricings/id/jsons/id', 'accountId': '064290855103', 'protocol': 'HTTP/1.1', 'stage': 'upncoming', 'domainPrefix': 'n5wp0kwpvj', 'requestTimeEpoch': 1734577881506, 'requestId': '8aa6778a-1b60-4311-b420-93312f38fea0', 'identity': {'cognitoIdentityPoolId': None, 'accountId': None, 'cognitoIdentityId': None, 'caller': None, 'sourceIp': '39.103.217.225', 'principalOrgId': None, 'accessKey': None, 'cognitoAuthenticationType': None, 'cognitoAuthenticationProvider': None, 'userArn': None, 'userAgent': 'DingTalkBot-LinkService/1.0 (+https://open-doc.dingtalk.com/microapp/faquestions/ftpfeu)', 'user': None}, 'domainName': 'n5wp0kwpvj.execute-api.us-east-2.amazonaws.com', 'deploymentId': 'vsa4lc', 'apiId': 'n5wp0kwpvj'}, 'body': None, 'isBase64Encoded': False}
    # lambda_handler(event=event, context=None)
    write_spp_route()