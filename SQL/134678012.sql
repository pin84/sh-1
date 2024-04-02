select vc.id,
    vc.name,
    vc.max as o_max_passenger,
    vc.manufacturer as o_maker,
    vc.model as o_model,
    vc.image_url as o_image_url,
    vc.image_url_2 as o_image_url_2,
    vm.id as vm_id,
    vm.maker,
    vm.model,
    vm.max_passenger,
    vm.max_luggage,
    vm.image_url_1,
    vm.image_url_2,
    vm.maker_txt_id,
    vm.model_txt_id,
    seq_front
from vehicle_class vc
    left join vehicle_model vm on vm.vehicle_class_id = vc.id
    and vm.country = '{{country_code}}'
    left join country on vm.country = country.alpha_3
order by seq_front


    [{'vehicle_id':'id','vehicle_name':'name',
'o_max_passenger':'o_max_passenger','o_maker':'o_maker','o_model':'o_model','o_image_url':'o_image_url','o_image_url_2':'o_image_url_2',
'o_max_luggage':'o_max_passenger','vm_id':'vm_id','maker':'maker','model':'model', 
'max_passenger':'max_passenger','max_luggage':'max_luggage','image_url_1':'image_url_1','image_url_2':'image_url_2',
'maker_txt_id':'maker_txt_id','model_txt_id':'model_txt_id','seq_front':'seq_front'}]
    /*------------v1--------*/
select vc.id,
    vc.name,
    vc.max as o_max_passenger,
    vc.manufacturer as o_maker,
    vc.model as o_model,
    vc.image_url as o_image_url,
    vc.image_url_2 as o_image_url_2,
    vm.id as vm_id,
    vm.maker,
    vm.model,
    vm.max_passenger,
    vm.max_luggage,
    vm.image_url_1,
    vm.image_url_2,
    vm.maker_txt_id,
    vm.model_txt_id,
    seq
from vehicle_class vc
    left join vehicle_model vm on vm.vehicle_class_id = vc.id
    and vm.country = '{{country_code}}'
    left join country on vm.country = country.alpha_3
order by seq
    /*------------v1--------*/
    [{'vehicle_id':'id','vehicle_name':'name',
'o_max_passenger':'o_max_passenger','o_maker':'o_maker','o_model':'o_model','o_image_url':'o_image_url','o_image_url_2':'o_image_url_2',
'o_max_luggage':'o_max_passenger','vm_id':'vm_id','maker':'maker','model':'model', 
'max_passenger':'max_passenger','max_luggage':'max_luggage','image_url_1':'image_url_1','image_url_2':'image_url_2',
'maker_txt_id':'maker_txt_id','model_txt_id':'model_txt_id'}]