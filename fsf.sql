
{% if emp_access_id == 0 %}
select @access_id:={{ access_id }};
{% else %}
select @access_id:={{ emp_access_id }};
{% endif %}
select fleet.id as fleet_id, fleet.name as service_area_name, airport_fleet.airport as airport,
airport.ctry as country_code ,country.name as cname,country.alpha_3 as alpha_3, fleet.service_area_pricing_id
from fleet
inner join airport_fleet on airport_fleet.fleet_id=fleet.id
left join airport on airport_fleet.airport = airport.code3
inner join country on country.alpha_3=airport.ctry
where fleet.parent_fleet_id={{ access_fleet_id }} 
and
(
(
( select count(*) from access_airport where access_id = @access_id ) = 0
and
( select count(*) from access_country where access_id = @access_id ) = 0
)
or
(
(
( select count(*) from access_airport where access_id = @access_id ) > 0
and
( select count(*) from access_country where access_id = @access_id ) = 0
)
and
fleet.id in
(
select airport_fleet.fleet_id
from access_airport, airport_fleet
where access_id = @access_id
and access_airport.airport = airport_fleet.airport
and airport_fleet.parent_fleet_id = {{ access_fleet_id }}
)
)
or
(
(
( select count(*) from access_airport where access_id = @access_id ) = 0
and
( select count(*) from access_country where access_id = @access_id ) > 0
)
and
airport.ctry in (select airport_country from access_country where access_id = @access_id)
)
or
(
(
( select count(*) from access_airport where access_id = @access_id ) > 0
and
( select count(*) from access_country where access_id = @access_id ) > 0
)
and
(
fleet.id in
(
select airport_fleet.fleet_id
from access_airport, airport_fleet
where access_id = @access_id
and access_airport.airport = airport_fleet.airport
and airport_fleet.parent_fleet_id = {{ access_fleet_id }}
)
or
airport.ctry in (select airport_country from access_country where access_id = @access_id)
)
)
)
order by fleet.name, airport_fleet.airport
{% if rows_to_fetch %}
limit {{ rows_to_fetch }}
{% endif %};