select
vehicle_class.id,
vehicle_class.name,
case
when i18n_category.eng_text = 'Sedan' then 'sedan'
when i18n_category.eng_text like '%Minivans and SUV%' then 'mpv'
when i18n_category.eng_text = 'Stretch Limousine' then 'passenger-stretch'
when i18n_category.eng_text = 'Minibus' then 'minibus'
when i18n_category.eng_text = 'Buses' and  vehicle_class.name not like '%Coach%' then 'bus'
when i18n_category.eng_text = 'Buses' and  vehicle_class.name like '%Coach%' then 'coach-bus'
ELSE 'other'
END as category_name
FROM vehicle_class
INNER JOIN vehicle_category_class ON vehicle_class.id = vehicle_category_class.class_id
INNER JOIN vehicle_category ON vehicle_category_class.category_id = vehicle_category.id
INNER JOIN i18n as i18n_category ON vehicle_category.name_i18n_id = i18n_category.id
ORDER BY vehicle_category.seq, category_name,vehicle_category_class.seq;