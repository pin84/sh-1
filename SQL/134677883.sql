/**
134677883  get partner list 





v1:
select partner.name as partner_name,
partner.id as partner_id,
supply_demand_pricing.json as pricing_json, partner.fleet_id
from partner
inner join fleet_supply_demand on fleet_supply_demand.demand_fleet_id=partner.fleet_id
left join supply_demand_pricing on supply_demand_pricing.id=fleet_supply_demand.pricing_id

inner join login on login.id={{ login_id }}
join access_pass on access_pass.id=login.access_pass_id and access_pass.partner & 1 = 1


where fleet_supply_demand.supply_fleet_id={{ access_fleet_id }} and {{ access_fleet_id }} = {{ elife_fleet_id }} 
{% if partner_name %}
and partner.name like "%{{ partner_name }}%"
{% endif %}
order by partner.id asc



[{
	'partner_id*': 'partner_id',
	'partner_name': 'partner_name',
	'fleet_id': 'fleet_id',
	'pricing_json': 'pricing_json',
    'partner_name_svc': 'partner_name'
}]



*/