select fleet.id as fleet_id, fleet.lat, fleet.lng, fleet.radius, fleet.parent_fleet_id, parent_fleet.name as parent_fleet_name, 
fleet.service_area_pricing_id 
from fleet 
inner join 
fleet parent_fleet 
on 
parent_fleet.id=fleet.parent_fleet_id 
where 
fleet.lat < 35.234083800982056 
and 
fleet.lat > 31.63676739901792
and 
fleet.lng < -115.47435358262068 
and 
fleet.lng > -119.76364201737933 
and 
fleet.id in (select id from fleet where parent_fleet_id=15);