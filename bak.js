let json = {
  "currencyCode": "USD",
  "serviceArea": {
    "name": "nanning",
    "lat": 22.791353405922795,
    "lng": 108.25311325248032,
    "radius": 50000,
    "parent_fleet_id": 40,
    "id": 26975,
    "parent_fleet_name": "Elife"
  },
  "airports": [
    "NNG"
  ],
  "countryCode": "CHN",
  "pricing": {
    "ranges": [
      {
        "seq": 0,
        "amount": 1,
        "currency": "USD",
        "distance": 1000,
        "from": 1000,
        "to": 2000,
        "distanceIn": 0,
        "per_unit": 1
      }
    ],
    "currency": "USD",
    "min_amount": 3,
    "min_distance": 1000
  },
  "vehicleClasses": [
    {
      "vehicle_class_id": 1,
      "delta_amount": 0,
      "percent": 0,
      "hourly_percent": 0,
      "hourly_delta": 0,
      "surcharge_schedule": [
        [
          {
            "from": "00:00",
            "to": "02:00",
            "break": "false",
            "delta_amount": 110,
            "ts": 1710986295705
          }
        ],
        [
          {
            "from": "00:00",
            "to": "02:00",
            "break": "false",
            "delta_amount": 110,
            "ts": 1710986295705
          }
        ],
        [
          {
            "from": "00:00",
            "to": "02:00",
            "break": "false",
            "delta_amount": 110,
            "ts": 1710986295705
          }
        ],
        "null",
        "null",
        "null",
        "null"
      ]
    },
    {
      "vehicle_class_id": 12,
      "delta_amount": 0,
      "percent": 0,
      "hourly_percent": 0,
      "hourly_delta": 0,
      "percent_appendix": [
        {
          "field": "pricing.min_amount",
          "delta_amount": 0.8
        },
        {
          "field": "pricing.ranges.0",
          "delta_amount": 0.5
        },
        {
          "field": "zones.0.prices.0.p_amt",
          "delta_amount": 0.8
        },
        {
          "field": "zones.0.prices.0.d_amt",
          "delta_amount": 0.3
        },
        {
          "field": "zones.1.prices.0.p_amt",
          "delta_amount": 1.6
        },
        {
          "field": "zones.1.prices.0.d_amt",
          "delta_amount": 0.5
        },
        {
          "field": "hourly_pricing.rules.0.min_amount",
          "delta_amount": 2.4
        },
        {
          "field": "hourly_pricing.rules.0.ranges.0",
          "delta_amount": 0.8
        },
        {
          "field": "downtown_areas.min_amount",
          "delta_amount": 2
        },
        {
          "field": "downtown_areas.ranges.0",
          "delta_amount": 0.5
        },
        {
          "field": "zone2zone.prices.0",
          "delta_amount": 0.6
        }
      ],
      "surcharge_schedule": [
        [
          {
            "from": "00:00",
            "to": "02:00",
            "break": "false",
            "delta_amount": 110,
            "ts": 1710986295705
          }
        ],
        [
          {
            "from": "00:00",
            "to": "02:00",
            "break": "false",
            "delta_amount": 110,
            "ts": 1710986295705
          }
        ],
        [
          {
            "from": "00:00",
            "to": "02:00",
            "break": "false",
            "delta_amount": 110,
            "ts": 1710986295705
          }
        ],
        "null",
        "null",
        "null",
        "null"
      ]
    }
  ],
  "date_surcharge_method": "sum",
  "service_area_pricing_id": 5453,
  "req_id": "6224de98-9b5f-4ba6-ad83-dcd27f1e9123",
  "downtown_areas": {
    "area_geometry": [
      {
        "lat": 22.80473857103623,
        "lng": 107.819851559375
      },
      {
        "lat": 23.175539967894892,
        "lng": 108.0616728484375
      },
      {
        "lat": 23.21593294458104,
        "lng": 108.51784960625
      },
      {
        "lat": 23.174715117839387,
        "lng": 108.60580126640625
      },
      {
        "lat": 22.80980224641355,
        "lng": 108.6717802703125
      },
      {
        "lat": 22.478996641374565,
        "lng": 108.6332060515625
      },
      {
        "lat": 22.438384353361545,
        "lng": 108.0946318328125
      }
    ],
    "ranges": [
      {
        "seq": 0,
        "amount": 1,
        "currency": "USD",
        "distance": 1000000,
        "from": 1000000,
        "to": 2000000,
        "distanceIn": 0,
        "per_unit": 1
      }
    ],
    "currency": "USD",
    "min_amount": 100,
    "min_distance": 1000000
  },
  "hourly_pricing": {
    "rules": [
      {
        "io": 1,
        "name": "Rule 1",
        "currency": "COP",
        "min_amount": 1,
        "min_duration": 1,
        "max_distance": 100,
        "zones": [
          "serviceArea"
        ],
        "ranges": [
          {
            "seq": 0,
            "amount": 3,
            "currency": "USD",
            "duration": 1,
            "from": 1,
            "to": 2
          }
        ]
      },
      {
        "io": 0,
        "name": "Rule 2",
        "currency": "COP",
        "max_distance": 200,
        "min_amount": 2,
        "min_duration": 1,
        "ranges": [
          {
            "seq": 0,
            "amount": 2,
            "currency": "USD",
            "duration": 1,
            "from": 1,
            "to": 2
          }
        ],
        "zones": [
          "serviceArea"
        ]
      }
    ],
    "currency": "USD"
  },
  "notice_time_rules": [
    {
      "zones": [
        "serviceArea"
      ],
      "ps": [
        {
          "vc_ids": [
            1
          ],
          "notice_time": [
            {
              "delta_amount": 3,
              "time": 1440
            }
          ],
          "allowance": 1200
        }
      ]
    }
  ],
  "pricing_schedule_sum": [
    {
      "notice_time_hint": [
        [
          {
            "from": "00:00",
            "to": "02:00",
            "break": "false",
            "delta_amount": 110,
            "ts": 1710986295705
          }
        ],
        [
          {
            "from": "00:00",
            "to": "02:00",
            "break": "false",
            "delta_amount": 110,
            "ts": 1710986295705
          }
        ],
        [
          {
            "from": "00:00",
            "to": "02:00",
            "break": "false",
            "delta_amount": 110,
            "ts": 1710986295705
          }
        ],
        "null",
        "null",
        "null",
        "null"
      ],
      "vehicles": [
        1,
        12
      ]
    }
  ],
  "specific_date_surcharge": [
    {
      "from_date": "2024-04-16",
      "to_date": "2024-04-24",
      "currency": "USD",
      "vehicle_classes": [
        {
          "vehicle_class_ids": [
            1
          ],
          "percent": 0,
          "delta_amount": 122
        }
      ],
      "zones": [
        "serviceArea"
      ],
      "name": "Rule 1"
    }
  ],
  "add_service": {
    "is_p": 0,
    "ts_p": 1
  },
  "tz": {
    "dos": 0,
    "ros": 28800,
    "tzid": "Asia/Shanghai"
  },
  "zone2zone": {
    "mac": 0,
    "prices": [
      {
        "name": "NNG-市区",
        "from_zone": "NNG机场",
        "to_zone": "市区",
        "amount": 3,
        "reverse": 45
      }
    ]
  },
  "zones": [
    {
      "lat": 22.831829812324735,
      "lng": 108.1624760454491,
      "name": "NNG机场",
      "p2p": "true",
      "prices": [
        {
          "airport": "NNG",
          "p_amt": 1,
          "d_amt": 2,
          "currency": "USD",
          "amount": 1
        }
      ],
      "radius": 0,
      "polygons": [
        {
          "lat": 22.79641757859638,
          "lng": 107.89032028373036
        },
        {
          "lat": 23.01935267760075,
          "lng": 108.18158004935536
        },
        {
          "lat": 23.09264123981686,
          "lng": 108.40155075248036
        },
        {
          "lat": 22.82173561957818,
          "lng": 108.43463180716785
        },
        {
          "lat": 22.571018384832612,
          "lng": 108.33013961966785
        },
        {
          "lat": 22.586234781711187,
          "lng": 108.09918258841785
        }
      ],
      "p2p_t": "NNG.p"
    },
    {
      "lat": 22.79641757859638,
      "lng": 108.56622360404285,
      "name": "市区",
      "p2p": "false",
      "prices": [
        {
          "airport": "NNG",
          "p_amt": 2,
          "d_amt": 3,
          "currency": "USD",
          "amount": 2
        }
      ],
      "radius": 16666.666666666668
    }
  ]
}


let partnerJson = {
  "percent": "100",
  "dataType": "1",
  "service_areas": {
    "sas_percent": [
      {
        "id": 26975,
        "percent": "5",
        "vcs": [
          {
            "id": 1,
            "percent": "10"
          }
        ]
      },
      {
        "id": 3471,
        "percent": "1",
        "vcs": [
          {
            "id": 1,
            "percent": "10"
          },
          {
            "id": 2,
            "percent": "-15"
          }
        ]
      }
    ],
    "exclude": [
      {
        "id": "2649"
      }
    ],
    "ads_delta": [
      {
        "id": "3471",
        "infant": {
          "delta": -10,
          "currency": "CNY",
          "switch": "on"
        },
        "toddler": {
          "delta": -2,
          "currency": "CNY",
          "switch": "off"
        },
        "child": {
          "delta": 2,
          "currency": "CNY",
          "switch": "on"
        }
      },
      {
        "id": "26975",
        "infant": {
          "delta": 1,
          "currency": "USD",
          "switch": "on"
        },
        "toddler": {
          "delta": 12,
          "currency": "USD",
          "switch": "off"
        },
        "child": {
          "delta": -10,
          "currency": "USD",
          "switch": "on"
        }
      }
    ],
    "mag_delta": [
      {
        "id": "3471",
        "delta": -3,
        "currency": "CNY",
        "switch": "off"
      },
      {
        "id": "26975",
        "delta": 1,
        "currency": "USD",
        "switch": "on"
      }
    ]
  },
  "doNotDel": "doNotDel"
}
