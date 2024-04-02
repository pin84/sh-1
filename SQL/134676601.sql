

select * from sql_template where sql_enum=134676601 ;

update  sql_template set sql_template = 'select if(ap.partner & 1, partner.name, concat(substring(partner.name,1,1), "_", substring(partner.name,-1))) as partner_name,
if(ap.partner & 1, partner.name, "***") as partner_name_svc,
partner.id as partner_id,
if(ap.partner & 1, supply_demand_pricing.json, REGEXP_REPLACE(supply_demand_pricing.json,"[0-9]*", "")) as pricing_json, partner.fleet_id
from partner
inner join fleet_supply_demand on fleet_supply_demand.demand_fleet_id=partner.fleet_id
inner join supply_demand_pricing on supply_demand_pricing.id=fleet_supply_demand.pricing_id
inner join login on login.id = {{ login_id }}
left join access_pass ap on ap.id = login.access_pass_id
where fleet_supply_demand.supply_fleet_id={{ access_fleet_id }} and {{ access_fleet_id }} = {{ elife_fleet_id }} and partner.id > {{partner_id}}
{% if partner_name %}
and partner.name like "%{{ partner_name }}%"
{% endif %}
order by partner.id asc
limit {{ rows_to_fetch }}'  where sql_enum=134676601 ;


/**
134676601:get partner list on the account


dev v2
select if(ap.partner & 1, partner.name, concat(substring(partner.name,1,1), "_", substring(partner.name,-1))) as partner_name,
if(ap.partner & 1, partner.name, "***") as partner_name_svc,
partner.id as partner_id,
if(ap.partner & 1, supply_demand_pricing.json, REGEXP_REPLACE(supply_demand_pricing.json,"[0-9]*", "")) as pricing_json, partner.fleet_id
from partner
inner join fleet_supply_demand on fleet_supply_demand.demand_fleet_id=partner.fleet_id
inner join supply_demand_pricing on supply_demand_pricing.id=fleet_supply_demand.pricing_id
inner join login on login.id = {{ login_id }}
left join access_pass ap on ap.id = login.access_pass_id
where fleet_supply_demand.supply_fleet_id={{ access_fleet_id }} and {{ access_fleet_id }} = {{ elife_fleet_id }} and partner.id > {{partner_id}}
{% if partner_name %}
and partner.name like "%{{ partner_name }}%"
{% endif %}
order by partner.id asc
limit {{ rows_to_fetch }}

[{
	'partner_id*': 'partner_id',
	'partner_name': 'partner_name',
	'fleet_id': 'fleet_id',
	'pricing_json': 'pricing_json',
    'partner_name_svc': 'partner_name_svc'
}]



prod  template 
partner_name, partner.id as partner_id, supply_demand_pricing.json as pricing_json, partner.fleet_id 
from partner 
inner join fleet_supply_demand on fleet_supply_demand.demand_fleet_id=partner.fleet_id 
inner join supply_demand_pricing on supply_demand_pricing.id=fleet_supply_demand.pricing_id 
inner join login on login.id = {{ login_id}} 
and login.id in (8, 7, 1160)
inner join access_pass on access_pass.id = login.access_pass_id 
and access_pass.partner & 1 = 1 where 1 = 1 
and fleet_supply_demand.supply_fleet_id={{ access_fleet_id }} 
and {{ access_fleet_id }} = {{ elife_fleet_id }}


prod result template 
 [{
    'partner_id*': 'partner_id',
    'partner_name': 'partner_name',
    'fleet_id': 'fleet_id',
    'pricing_json': 'pricing_json'
}]





dev  v1

'select if(ap.partner & 1, partner.name, concat(substring(partner.name,1,1), "_", substring(partner.name,-1))) 
as partner_name,
partner.id as partner_id,
if(ap.partner & 1, supply_demand_pricing.json, REGEXP_REPLACE(supply_demand_pricing.json,"[0-9]*", "")) as pricing_json, partner.fleet_id
from partner
inner join fleet_supply_demand on fleet_supply_demand.demand_fleet_id=partner.fleet_id
inner join supply_demand_pricing on supply_demand_pricing.id=fleet_supply_demand.pricing_id
inner join login on login.id = {{ login_id }}
left join access_pass ap on ap.id = login.access_pass_id
where fleet_supply_demand.supply_fleet_id={{ access_fleet_id }} and {{ access_fleet_id }} = {{ elife_fleet_id }}
and  partner.id > {{partner_id}}
{% if partner_name %}
and partner.name like "%{{ partner_name }}%"
{% endif %}
order by partner.id asc'

[{
	'partner_id*': 'partner_id',
	'partner_name': 'partner_name',
	'fleet_id': 'fleet_id',
	'pricing_json': 'pricing_json'
}]





**/




