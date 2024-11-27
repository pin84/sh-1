[
    {
        'id': 'id',
        'from_place': 'from_place',
        'to_place': 'to_place',
        'vehicle_class_id': 'vehicle_class_id',
        'service_area_id': 'service_area_id',
        'strategy_id': 'strategy_id',
        'country_code': 'country_code',
        'country_name': 'country_name',
        'service_area_name': 'service_area_name',
        'platform_name': 'platform_name',
        'partner_id': 'partner_id',
        'service_area_id_elife': 'service_area_id_elife',
        'json': 'json',
        'from_address':'from_address',
        'to_address':'to_address'
    }
]

select sr.id,
       sr.service_area_id,
       sr.from_place,
       sr.to_place,
       sr.strategy_id,
       sr.partner_id,
       sr.platform_name,
       sr.json,
       sr.from_address,
       sr.to_address,
       c.name as country_name,
       c.alpha_3 as country_code,
       fleet.name as service_area_name

from spp_route sr
         left join airport_fleet af on af.fleet_id = sr.service_area_id
         left join airport on airport.code3 = af.airport
         left join country c on c.alpha_3 = airport.ctry
         left join fleet on fleet.id = sr.service_area_id
where  sr.is_active = 99
{% if partner_id %}
   and sr.partner_id = {{partner_id}} 
{% endif %}
group by sr.id