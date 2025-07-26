let  map_vehicle_id_elife_to_fliggy = [
    {'name': 'Economic 5 seats', 'fliggy_id': 2, 'elife_vehicle_id': 1, 'max_luggage': 2},
    {'name': 'Comfortable 5 seats', 'fliggy_id': 3, 'elife_vehicle_id': 12, 'max_luggage': 2},
    {'name': 'Business 5 seats', 'fliggy_id': 4, 'elife_vehicle_id': 2, 'max_luggage': 3},
    {'name': 'Luxury 5 seats', 'fliggy_id': 5, 'elife_vehicle_id': 14, 'max_luggage': 3},
    {'name': 'Economic 7 seats', 'fliggy_id': 6, 'elife_vehicle_id': 6, 'max_luggage': 4},
    {'name': 'Comfortable 7 seats', 'fliggy_id': 7, 'elife_vehicle_id': 3, 'max_luggage': 4},
    {'name': 'Business 7 seats', 'fliggy_id': 8, 'elife_vehicle_id': 4, 'max_luggage': 4},
    {'name': 'Business 7 seats', 'fliggy_id': 8, 'elife_vehicle_id': 13, 'max_luggage': 4},
    {'name': 'Business 7 seats', 'fliggy_id': 8, 'elife_vehicle_id': 36, 'max_luggage': 4},
    {'name': 'Economic 9 seats', 'fliggy_id': 10, 'elife_vehicle_id': 5, 'max_luggage': 4},
    {'name': 'Comfortable 9 seats', 'fliggy_id': 11, 'elife_vehicle_id': 5, 'max_luggage': 5},
    {'name': 'Business 10 seats', 'fliggy_id': 13, 'elife_vehicle_id': 9, 'max_luggage': 6},
    {'name': 'Economic 12 seats', 'fliggy_id': 14, 'elife_vehicle_id': 10, 'max_luggage': 6},
    {'name': 'Comfortable 12 seats', 'fliggy_id': 15, 'elife_vehicle_id': 10, 'max_luggage': 5},
    {'name': 'minibus 10 seats', 'fliggy_id': 17, 'elife_vehicle_id': 9, 'max_luggage': 6},
    {'name': 'midibus 14 seats', 'fliggy_id': 18, 'elife_vehicle_id': 11, 'max_luggage': 6},
    {'name': 'midibus 19 seats', 'fliggy_id': 19, 'elife_vehicle_id': 30, 'max_luggage': 7},
    {'name': 'midibus 25 seats', 'fliggy_id': 20, 'elife_vehicle_id': 31, 'max_luggage': 12},
    {'name': 'midibus 25 seats', 'fliggy_id': 20, 'elife_vehicle_id': 32, 'max_luggage': 12},
    {'name': 'bus 35 seats', 'fliggy_id': 23, 'elife_vehicle_id': 33, 'max_luggage': 18},
    {'name': 'bus 45 seats', 'fliggy_id': 24, 'elife_vehicle_id': 34, 'max_luggage': 23},
    {'name': 'Tesla', 'fliggy_id': 21, 'elife_vehicle_id': 42, 'max_luggage': 2},
    {'name': 'Tesla', 'fliggy_id': 21, 'elife_vehicle_id': 49, 'max_luggage': 2}
]

let fliggy_vehicle_name_map = {
    '经济5座': 'Economic 5 seats',
    '舒适 5 座 ': 'Comfortable 5 seats',
    '商务5座 ': 'Business 5 seats',
    '豪华5座 ': 'Luxury 5 seats',
    '经济 7 座 ': 'Economic 7 seats',
    '舒适7座': 'Comfortable 7 seats',
    '豪华 7 座': 'Business 7 seats',
    '经济9座': 'Economic 9 seats',
    '舒适9座': 'Comfortable 9 seats',
    '商务10座': 'Business 10 seats',
    '舒适12座': 'Comfortable 12 seats',
    '14座中巴': 'midibus 14 seats',
    '19座中巴': 'midibus 19 seats',
    '24座中巴': 'midibus 25 seats',
    '35座中巴': 'bus 35 seats',
    '45座中巴': 'bus 45 seats'
}



let  vehicle_map_cz = [
    {'name': 'Economic 5 seats', 'fliggy_id': 2, 'elife_vehicle_id': 1, 'max_luggage': 2},
    {'name': 'Comfortable 5 seats', 'fliggy_id': 3, 'elife_vehicle_id': 12, 'max_luggage': 2},
    {'name': 'Business 5 seats', 'fliggy_id': 4, 'elife_vehicle_id': 2, 'max_luggage': 3},
    {'name': 'Economic 7 seats', 'fliggy_id': 6, 'elife_vehicle_id': 6, 'max_luggage': 4},
    {'name': 'Comfortable 7 seats', 'fliggy_id': 7, 'elife_vehicle_id': 3, 'max_luggage': 4},
    {'name': 'Business 7 seats', 'fliggy_id': 8, 'elife_vehicle_id': 36, 'max_luggage': 4},
    {'name': 'Economic 9 seats', 'fliggy_id': 10, 'elife_vehicle_id': 5, 'max_luggage': 4},
    {'name': 'Comfortable 9 seats', 'fliggy_id': 11, 'elife_vehicle_id': 5, 'max_luggage': 5},
    {'name': 'Business 10 seats', 'fliggy_id': 13, 'elife_vehicle_id': 9, 'max_luggage': 5},
    {'name': 'Comfortable 12 seats', 'fliggy_id': 15, 'elife_vehicle_id': 10, 'max_luggage': 6},
    {'name': 'midibus 14 seats', 'fliggy_id': 18, 'elife_vehicle_id': 11, 'max_luggage': 5},
    {'name': 'midibus 19 seats', 'fliggy_id': 19, 'elife_vehicle_id': 30, 'max_luggage': 5},
    {'name': 'midibus 25 seats', 'fliggy_id': 20, 'elife_vehicle_id': 32, 'max_luggage': 5},
    {'name': 'bus 35 seats', 'fliggy_id': 23, 'elife_vehicle_id': 33, 'max_luggage': 10},
    {'name': 'bus 45 seats', 'fliggy_id': 24, 'elife_vehicle_id': 34, 'max_luggage': 20},
]

let mapping = [

  {
    "figgy": "经济5座",
    "elife": "Sedan"
  },
  {
    "figgy": "舒适 5 座 ",
    "elife": "Comfort Sedan"
  },
  {
    "figgy": "豪华5座 ",
    "elife": "Business Sedan"
  },
  {
    "figgy": "经济 7 座 ",
    "elife": "MPV-4"
  },
  {
    "figgy": "舒适7座",
    "elife": "MPV-5"
  },
  {
    "figgy": "豪华 7 座",
    "elife": "Business Minivan"
  },
  {
    "figgy": "经济9座",
    "elife": "MINI BUS-8"
  },
  {
    "figgy": "舒适9座",
    "elife": "MINI BUS-8"
  },
  {
    "figgy": "商务10座",
    "elife": "MINI BUS-10"
  },
  {
    "figgy": "舒适12座",
    "elife": "MINI BUS-12"
  },
  {
    "figgy": "14座中巴",
    "elife": "MINI BUS-14"
  },
  {
    "figgy": "19座中巴",
    "elife": "20-seat Bus"
  },
  {
    "figgy": "24座中巴",
    "elife": "27-seat Bus"
  },
  {
    "figgy": "35座中巴",
    "elife": "36-seat Bus"
  },
  {
    "figgy": "45座中巴",
    "elife": "44-seat Coach bus"
  }
]