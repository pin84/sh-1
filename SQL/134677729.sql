select service_area_pricing.id,
    note.note,
    date_format(
        service_area_pricing.last_updated_at,
        '%Y-%m-%d %H:%i'
    ) as last_updated_at,
    (
        case
            when e_login.employee_id is not null then concat(
                ifnull(e_person.first_name, ' '),
                ifnull(e_person.last_name, ' '),
                '(employee)'
            )
            when f_login.fleet_emp_id is not null then concat(
                ifnull(f_person.first_name, ' '),
                ifnull(f_person.last_name, ' '),
                '(fleet emp)'
            )
            else ''
        end
    ) as operator
from service_area_pricing
    inner join fleet on fleet.id = service_area_pricing.service_area_id
    left join note on note.id = service_area_pricing.note_id
    left join login f_login on f_login.id = service_area_pricing.login_id
    left join fleet_emp on fleet_emp.id = f_login.fleet_emp_id
    left join person f_person on f_person.id = fleet_emp.person_id
    left join login e_login on e_login.id = service_area_pricing.login_id
    left join employee on employee.id = e_login.employee_id
    left join person e_person on e_person.id = employee.person_id
where service_area_pricing.service_area_id = {{ serviceAreaId }}
    and {{ access_fleet_id }} = fleet.parent_fleet_id
order by fleet.service_area_pricing_id desc,
    service_area_pricing.id desc;
    
[{
    'id':'id',
    'last_updated_at':'last_updated_at', 
    'note':'note',
    'operator':'operator'
}]