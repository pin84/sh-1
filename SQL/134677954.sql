

134677954
get service area currency and meet and greet



----------v1 start-------
SELECT 
JSON_EXTRACT(service_area_pricing.pricing,'$.pricing.meet_n_greet') as mng_amount,
JSON_EXTRACT(service_area_pricing.pricing,'$.pricing.currency') as currency,
service_area_pricing.service_area_id
FROM service_area_pricing 
where id = 1;
{% if service_area_pricing_ids or service_area_ids %}
    {% if service_area_pricing_ids  %}
         service_area_pricing.id in ({% for sapid in service_area_pricing_ids %}{% if loop.index0>0 %},{% endif %}{{ sapid }}{% endfor %})
    {% endif %}
	{% if service_area_ids  %}
		{% if service_area_pricing_ids  %}
		  and
		{% endif %}
        service_area_pricing.service_area_id in ({% for said in service_area_ids %}{% if loop.index0>0 %},{% endif %}{{ said }}{% endfor %})
    {% endif %}
{% else %}
    service_area_pricing.service_area_id = 0
{% endif %}

[{'service_area_id*':'service_area_id','mng_amount':'mng_amount','currency':'currency'}]
----------v1 end-------

