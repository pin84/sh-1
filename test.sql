SELECT 
JSON_EXTRACT(service_area_pricing.pricing,'$.pricing.meet_n_greet') as mng_amount,
JSON_EXTRACT(service_area_pricing.pricing,'$.pricing.currency') as currency,
JSON_EXTRACT(service_area_pricing.add_service,'$.add_service.is_p') as is_p,
JSON_EXTRACT(service_area_pricing.add_service,'$.add_service.cs_p') as cs_p,
JSON_EXTRACT(service_area_pricing.add_service,'$.add_service.ts_p') as ts_p,
service_area_pricing.service_area_id
FROM service_area_pricing 
where 
{% if service_area_pricing_ids or service_area_ids %}
    {% if service_area_pricing_ids  %}
         service_area_pricing.id in ({% for sapid in service_area_pricing_ids %}{% if loop.index0>0 %},{% endif %}{{ sapid }}{% endfor %})
    {% endif %}
    {% if service_area_ids  %}
	{% if service_area_pricing_ids  %}
	     or
	{% endif %}
        service_area_pricing.service_area_id in ({% for said in service_area_ids %}{% if loop.index0>0 %},{% endif %}{{ said }}{% endfor %})
    {% endif %}
{% else %}
    service_area_pricing.service_area_id = 0
{% endif %}



[{'service_area_id*':'service_area_id','mng_amount':'mng_amount','currency':'currency'}]