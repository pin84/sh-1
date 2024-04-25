select @accessPassPartner := count(ap.fleet)
from login
join access_pass ap on ap.id = login.access_pass_id
where login.id = {{ login_id }}
and ap.partner & 1 = 1;
{% if access_id != 0 %}
select @unlimited_airport:=if(count(ap.id)=0,1,0) from access_airport ap
where access_id = {{ access_id }};
{% else %}
select @unlimited_airport:=1;
{% endif %}
{% if access_id != 0 %}
select @unlimited_country:=if(count(ac.id)=0,1,0) from access_country ac
where access_id = {{ access_id }};
{% else %}
select @unlimited_country:=1;
{% endif %}
select ride.id as ride_id, ride.stat as ride_stat, partner_tran_id, ride.vip as vip,
airport_code3, from_place_id, from_pl.name as from_place_name, ride.from_utc, from_time_str, from_timezone_str, ride.to_utc as ride_utc,
from_daylight, to_place_id, to_pl.name as to_place_name, ride.to_utc, to_time_str, to_timezone_str, to_daylight,
passenger_id, distance, duration, vehicle_class_id, passenger_count,
luggage_count, trip_count, meet_n_greet
, if(@accessPassPartner <> 0,partner_tran.partner_id,if(partner_tran.partner_id = 11,11,partner_tran.partner_id)) as partner_id
, partner_tran.ref_type as ref_type, partner_tran.reference as reference, partner_tran.reference_2 as reference2,
ride.service_area_id,service_area.name as service_area_name,
dispatch.id as dispatch_id, dispatch.stat as dispatch_stat,
dispatch_fleet.id as dispatch_fleet_id, dispatch_fleet.name as dispatch_fleet_name, cell_phone.number as cell_phone
, email.email as email, person.first_name as passenger_first_name, person.last_name as passenger_last_name,
vehicle_class.name as vehicle_class_name, airport.code3 as airport, airport.ctry as country,
coalesce(agency.name, affiliate.name, corporate.name) as subpartner_name,
coalesce(agency.fleet_id, affiliate.fleet_id, corporate.fleet_id) as subpartner_fleet_id
from ride
left join partner_tran on partner_tran.id=ride.partner_tran_id
left join place from_pl on from_pl.id=ride.from_place_id
left join place to_pl on to_pl.id=ride.to_place_id
left join dispatch on dispatch.ride_id=ride.id and dispatch.trip_no_x = 1
left join fleet dispatch_fleet on dispatch_fleet.id=dispatch.to_fleet_id
left join fleet service_area on service_area.id=ride.service_area_id
left join ride_passenger on ride_passenger.id=ride.passenger_id
left join customer on customer.id=ride_passenger.customer_id
left join customer_cell_phone on customer_cell_phone.customer_id=customer.id
left join cell_phone on cell_phone.id=customer_cell_phone.cell_phone_id
left join email on email.id=customer.email_id
left join person on customer.person_id=person.id
left join vehicle_class on vehicle_class.id=ride.vehicle_class_id
left join airport_fleet on ride.service_area_id = airport_fleet.fleet_id and airport_fleet.parent_fleet_id = {{ access_fleet_id }}
left join airport on airport_fleet.airport = airport.code3
left join dispatch dispatch2 on dispatch2.ride_id=ride.id and (dispatch2.trip_no_x = -1 or dispatch.trip_no_x is null)
left join fleet dispatch_fleet2 on dispatch_fleet2.id=dispatch2.from_fleet_id
left join agency on dispatch_fleet2.id = agency.fleet_id
left join affiliate on dispatch_fleet2.id = affiliate.fleet_id
left join corporate on dispatch_fleet2.id = corporate.fleet_id
where {{ access_fleet_id }}={{ elife_fleet_id }}
and (ride.id != 3117793 or {{ login_id }} = 11646)
and ( ( @unlimited_airport = 1 and @unlimited_country = 1)
or ( @unlimited_airport = 0 and ride.service_area_id in
( select airport_fleet.fleet_id
from access_airport, airport_fleet
where access_id = {{ access_id }}
and access_airport.airport = airport_fleet.airport
and airport_fleet.parent_fleet_id = {{ elife_fleet_id }}
))
or ( @unlimited_country = 0 and airport.ctry in (select airport_country from access_country where access_id = {{ access_id }}))
or (ride.service_area_id is null)
)
and ride.to_utc is not null
and ride.trip_count = 2
{% if ride_stats %}
and ride.stat in ({% for ride_stat in ride_stats %}{% if loop.index0>0 %},{% endif %}{{ ride_stat }}{% endfor %})
{% endif %}
{% if the_ride_id %}
and ride.id in ({{the_ride_id}})
{% elif reference %}
and ride.id in (
select ride.id from ride
join partner_tran on ride.partner_tran_id = partner_tran.id
where (partner_tran.reference_2 like '{{ reference }}%' or reference like '{{ reference }}%' or right(reference, 6) like '{{ reference }}' or right(partner_tran.reference_2,6) like '{{ reference }}'))
{% endif %}
and (
(
{{ ride_id }} = 0
and
(ride.to_utc >= {{ utc_start }} and ride.to_utc <= {{ utc_end }})
)
or
(
{{ ride_id }} <> 0
and
(
(
ride.id >= {{ ride_id }}
and
(ride.to_utc = {{ utc_start }})
)
or
(ride.to_utc > {{ utc_start }} and ride.to_utc <= {{ utc_end }})
)
)
)
{% if service_area_id %}
and ride.service_area_id={{ service_area_id }}
{% endif %}
{% if cell_number %}
and cell_phone.number like '{{ cell_number }}%'
{% endif %}
{% if vip %}
and ride.vip = 1
{% endif %}
{% if email %}
and email.email like '{{ email }}%'
{% endif %}
{% if partner_id %}
and partner_tran.partner_id={{ partner_id }}
{% endif %}
{% if to_fleet_id %}
and dispatch.to_fleet_id={{ to_fleet_id }}
{% endif %}
{% if passenger_name %}
and
(
{% for p_name in passenger_name %}{% if loop.index0>0 %}or{% endif %} person.first_name like '{{ p_name }}%'{% endfor %}
or {% for p_name in passenger_name %}{% if loop.index0>0 %}or{% endif %} person.last_name like '{{ p_name }}%'{% endfor %}
)
{% endif %}
{% if vehicle_class %}
and vehicle_class.id = {{ vehicle_class }}
{% endif %}
{% if vehicle_classes %}
and vehicle_class.id in ({% for vc in vehicle_classes %}{% if loop.index0>0 %},{% endif %}{{ vc }}{% endfor %})
{% endif %}
{% if meet_n_greet %}
and ride.meet_n_greet = {{ meet_n_greet }}
{% endif %}
{% if ride_types %}
and (
{% for ride_type in ride_types %}
{% if loop.index0>0 %} or {% endif %}
{% if ride_type == 'one_way' %}
(ride.distance > 0 and ride.trip_count = 1)
{% endif %}
{% if ride_type == 'round_trip' %}
ride.trip_count = 2
{% endif %}
{% if ride_type == 'hourly' %}
(ride.distance = 0 and ride.trip_count = 1)
{% endif %}
{% if ride_type == 'multi_day' %}
ride.trip_count > 2
{% endif %}
{% endfor %}
)
{% endif %}
{% if trip_count %}
and ride.trip_count={{ trip_count }}
{% endif %}
{% if airport %}
and airport.code3='{{ airport }}'
{% endif %}
{% if country %}
and airport.ctry='{{ country }}'
{% endif %}
{% if no_fleet %}
and  ((select count(*) from dispatch where dispatch.ride_id = ride.id and dispatch.trip_no_x = 1) = 0 and
(select count(*) from dispatch where dispatch.ride_id = ride.id and ifnull(dispatch.trip_no_x,-1) = -1) > 0 )
{% endif %}
{% if subpartner %}
and (case when '{{subpartner_type}}' = 'agency' then agency.id
when '{{subpartner_type}}' = 'affiliate' then affiliate.id
when '{{subpartner_type}}' = 'corporate' then corporate.id end) = {{ subpartner }}
{% endif %}
order by ride.to_utc, ride.id
limit {{ rows_to_fetch }};