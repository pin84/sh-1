
v2
insert into supply_demand_pricing(supply_fleet_id,demand_fleet_id,json)
values ({{ supply_fleet_id }},{{ demand_fleet_id }}, replace("{{ pricing_json }}", "'", '"'));
select @T1ID:=last_insert_id() as t1_id;
update fleet_supply_demand set pricing_id=@T1ID where supply_fleet_id={{ supply_fleet_id }} 
and demand_fleet_id={{ demand_fleet_id }}
and pricing_id = {{  old pricing id }}
if count = 0 fail





v1

insert into supply_demand_pricing(supply_fleet_id,demand_fleet_id,json)
values ({{ supply_fleet_id }},{{ demand_fleet_id }}, replace("{{ pricing_json }}", "'", '"'));
select @T1ID:=last_insert_id() as t1_id;
update fleet_supply_demand set pricing_id=@T1ID where supply_fleet_id={{ supply_fleet_id }} 
and demand_fleet_id={{ demand_fleet_id }};

{
    'total_affected_rows': 'total_affected_rows'
}


