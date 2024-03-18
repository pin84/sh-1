#134677721
update
    sql_template
set
    sql_template = 'insert into supply_demand_pricing(supply_fleet_id,demand_fleet_id,json)
values ({{ supply_fleet_id }},{{ demand_fleet_id }},"{{ pricing_json }}");
select @T1ID:=last_insert_id() as t1_id;
update fleet_supply_demand set pricing_id=@T1ID where supply_fleet_id={{ supply_fleet_id }} 
and demand_fleet_id={{ demand_fleet_id }};'
where
    sql_enum = 134677721;

134677721: 修改partner的加价百分比 。 或修改服务区 v1
insert into
    supply_demand_pricing(supply_fleet_id, demand_fleet_id, json)
values
    (
        { { supply_fleet_id } },
        { { demand_fleet_id } },
        "{\"percent\": \"{{ pricing_json.percent }}\"}"
    );

select
    @T1ID := last_insert_id() as t1_id;

update
    fleet_supply_demand
set
    pricing_id = @T1ID
where
    supply_fleet_id = { { supply_fleet_id } }
    and demand_fleet_id = { { demand_fleet_id } };

{ 'total_affected_rows': 'total_affected_rows' } #v2
insert into
    supply_demand_pricing(supply_fleet_id, demand_fleet_id, json)
values
    (
        { { supply_fleet_id } },
        { { demand_fleet_id } },
        "{{ pricing_json }}"
    );

select
    @T1ID := last_insert_id() as t1_id;

update
    fleet_supply_demand
set
    pricing_id = @T1ID
where
    supply_fleet_id = { { supply_fleet_id } }
    and demand_fleet_id = { { demand_fleet_id } };

{ 'total_affected_rows': 'total_affected_rows' }