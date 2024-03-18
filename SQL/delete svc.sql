use ride
select * from fleet where parent_fleet_id = 40 and name like "nanning%"
set @fleetId='25034';
 

update ride set service_area_id=null where service_area_id=@fleetId;

delete
from note_service_area_pricing
where service_area_pricing_id in
(
select id
from service_area_pricing
where service_area_id=@fleetId
);

update fleet set service_area_pricing_id=null where id=@fleetId;

delete from service_area_pricing where service_area_id =@fleetId;
delete from airport_fleet where fleet_id =@fleetId;

update fleet_driver
set fleet_id=1036,person_id=null,email_id=null, cell_phone_id=null
where fleet_id=@fleetId;



delete from fleet where id =@fleetId;
select * from fleet where id =@fleetId;





