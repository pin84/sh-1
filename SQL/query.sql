use ride

select * from fleet where name = 'elife_mozio'
27595
select * from fleet_supply_demand 
where demand_fleet_id = 45
40,1592
select * from supply_demand_pricing where id = 1592
select * from supply_demand_pricing where id = 1746
创建1746, 

select * from fleet where parent_fleet_id = 27595
select * from service_area_pricing where id = 5309

select * from fleet_supply_demand 
where demand_fleet_id = 45

select * from service_area_pricing 
where 
service_area_id = 27596 
ORDER BY ID DESC LIMIT 2
5305
select * from fleet where id in (27596,40)


select * from supply_demand_pricing where supply_fleet_id = 27596

select * from fleet_supply_demand where demand_fleet_id = 45
40 --》27596
1592--》1746

select * from fleet_supply_demand where demand_fleet_id = 710
40-->27596
pricing_id 1740 --> null

select * from partner where name = 'TESTING'


select * from fleet where id in (25034,26975)

select * from supply_demand_pricing where demand_fleet_id = 710  order by id desc

