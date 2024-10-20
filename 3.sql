UPDATE ride.spp_route t
SET 
    {% if from_place %}
        t.from_place  = '{{from_place}}'
    {% endif %}
    {% if to_place %}
         ,t.to_place   = '{{to_place}}'
    {% endif %}
    {% if service_area_id %}
         ,t.service_area_id    = '{{service_area_id}}'
    {% endif %}
    {% if json %}
         ,t.json                  = '{{json}}'
    {% endif %}
    {% if json %}
         ,t.name                  = '{{name}}'
    {% endif %}   
    {% if json %}
          ,t.from_place_lat_lng    = '{{from_place_lat_lng}}'
    {% endif %}      
    {% if json %}
          ,t.to_place_lat_lng      = '{{to_place_lat_lng}}'
    {% endif %}       
    {% if json %}
          ,t.strategy_id           = {{strategy_id}}
    {% endif %}           
    {% if json %}
          ,t.from_address          = '{{from_address}}'
    {% endif %}
    {% if json %}
         ,t.to_address            = '{{to_address}}'
    {% endif %}   
    {% if json %}
          ,t.platform_name         = '{{platform_name}}'
    {% endif %}   
    {% if json %}
          ,t.partner_id            = {{partner_id}}
    {% endif %}   
    {% if json %}
          ,t.service_area_id_elife = {{service_area_id_elife}}
    {% endif %}   
    {% if json %}
          ,t.is_active             = {{is_active}}
    {% endif %}   
    {% if json %}
          ,t.batch                 = {{batch}}
    {% endif %}         
WHERE t.id = {{id}};


