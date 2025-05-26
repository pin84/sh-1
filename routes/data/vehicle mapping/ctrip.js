let x_ctrip = [
  {
    "车型id": "123",
    "携程车型": "商务9座",
  },
  {
    "车型id": "146",
    "携程车型": "紧凑5座",
    "elife 车型": "mini sedan"
  },
  {
    "车型id": "117",
    "携程车型": "经济5座",
    "elife 车型": "sedan"
  },
  {
    "车型id": "118",
    "携程车型": "舒适5座",
    "elife 车型": "comfort sedan"
  },
  {
    "车型id": "119",
    "携程车型": "豪华5座",
    "elife 车型": "business sedan"
  },
  {
    "车型id": "141",
    "携程车型": "特斯拉5座",
    "elife 车型": "ev business sedan"
  },
  {
    "车型id": "40002",
    "携程车型": "特斯拉model s",
    "elife 车型": "ev first class sedan"
  },
  {
    "车型id": "40003",
    "携程车型": "特斯拉model x",
    "elife 车型": "ev business suv"
  },
  {
    "车型id": "20020",
    "携程车型": "舒适7座",
    "elife 车型": "mpv4"
  },
  {
    "车型id": "121",
    "携程车型": "商务7座",
    "elife 车型": "mpv5"
  },
  {
    "车型id": "122",
    "携程车型": "商务8 座",
    "elife 车型": "mpv6"
  },
  {
    "车型id": "20009",
    "携程车型": "豪华6座",
    "elife 车型": "business mpv4"
  },
  {
    "车型id": "120",
    "携程车型": "豪华7座",
    "elife 车型": "business suv"
  },
  {
    "车型id": "20196",
    "携程车型": "豪华8座",
    "elife 车型": "business minivan"
  },
  {
    "车型id": "124",
    "携程车型": "8座小巴",
    "elife 车型": "minibus 7"
  },
  {
    "车型id": "125",
    "携程车型": "9座小巴",
    "elife 车型": "Minibus 8"
  },
  {
    "车型id": "126",
    "携程车型": "10座小巴",
    "elife 车型": "minibus 10"
  },
  {
    "车型id": "127",
    "携程车型": "12座小巴",
    "elife 车型": "minibus 12"
  },
  {
    "车型id": "128",
    "携程车型": "14座中巴",
    "elife 车型": "minibus 14"
  }
]

let  vehicle_type_mapping = [
    {
      "countries": [
        "MYS",
        "SGP"
      ],
      "mapping": [
        {
          "elife": "1",
          "china_ctrip_api": 146,
          "max": 3,
          "loggage": 2
        },
        {
          "elife": "12",
          "china_ctrip_api": 117,
          "max": 3,
          "loggage": 2
        },
        {
          "elife": "6",
          "china_ctrip_api": 118,
          "max": 4,
          "loggage": 2
        },
        {
          "elife": "3",
          "china_ctrip_api": 20020,
          "max": 4,
          "loggage": 4
        },
        {
          "elife": "2",
          "china_ctrip_api": 119,
          "max": 4,
          "loggage": 3
        },
        {
          "elife": "4",
          "china_ctrip_api": 120,
          "max": 6,
          "loggage": 4
        },
        {
          "elife": "3",
          "china_ctrip_api": 121,
          "max": 6,
          "loggage": 4
        },
        {
          "elife": "5",
          "china_ctrip_api": 124,
          "max": 7,
          "loggage": 4
        },
        {
          "elife": "9",
          "china_ctrip_api": 125,
          "max": 8,
          "loggage": 5
        },
        {
          "elife": "9",
          "china_ctrip_api": 126,
          "max": 9,
          "loggage": 5
        },
        {
          "elife": "11",
          "china_ctrip_api": 127,
          "max": 11,
          "loggage": 6
        },
        {
          "elife": "11",
          "china_ctrip_api": 128,
          "max": 13,
          "loggage": 6
        }
      ]
    },
    {
      "countries": [
        "JPN"
      ],
      "mapping": [
        {
          "elife": "1",
          "china_ctrip_api": 146,
          "max": 4,
          "loggage": 2
        },
        {
          "elife": "12",
          "china_ctrip_api": 118,
          "max": 4,
          "loggage": 2
        },
        {
          "elife": "2",
          "china_ctrip_api": 119,
          "max": 4,
          "loggage": 3
        },
        {
          "elife": "6",
          "china_ctrip_api": 20020,
          "max": 4,
          "loggage": 4
        },
        {
          "elife": "4",
          "china_ctrip_api": 120,
          "max": 6,
          "loggage": 4
        },
        {
          "elife": "3",
          "china_ctrip_api": 121,
          "max": 6,
          "loggage": 4
        },
        {
          "elife": "7",
          "china_ctrip_api": 124,
          "max": 7,
          "loggage": 4
        },
        {
          "elife": "8",
          "china_ctrip_api": 125,
          "max": 8,
          "loggage": 5
        },
        {
          "elife": "5",
          "china_ctrip_api": 126,
          "max": 9,
          "loggage": 6
        },
        {
          "elife": "9",
          "china_ctrip_api": 127,
          "max": 11,
          "loggage": 6
        },
        {
          "elife": "9",
          "china_ctrip_api": 128,
          "max": 13,
          "loggage": 6
        }
      ]
    },
    {
      "countries": [
        "AUS",
        "NZL"
      ],
      "mapping": [
        {
          "elife": "1",
          "china_ctrip_api": 146,
          "max": 3,
          "loggage": 2
        },
        {
          "elife": "1",
          "china_ctrip_api": 117,
          "max": 4,
          "loggage": 2
        },
        {
          "elife": "12",
          "china_ctrip_api": 118,
          "max": 4,
          "loggage": 2
        },
        {
          "elife": "2",
          "china_ctrip_api": 119,
          "max": 4,
          "loggage": 3
        },
        {
          "elife": "3",
          "china_ctrip_api": 20020,
          "max": 4,
          "loggage": 4
        },
        {
          "elife": "4",
          "china_ctrip_api": 120,
          "max": 6,
          "loggage": 4
        },
        {
          "elife": "4",
          "china_ctrip_api": 121,
          "max": 6,
          "loggage": 4
        },
        {
          "elife": "5",
          "china_ctrip_api": 122,
          "max": 7,
          "loggage": 5
        },
        {
          "elife": "5",
          "china_ctrip_api": 124,
          "max": 7,
          "loggage": 4
        },
        {
          "elife": "9",
          "china_ctrip_api": 125,
          "max": 8,
          "loggage": 5
        },
        {
          "elife": "9",
          "china_ctrip_api": 126,
          "max": 9,
          "loggage": 6
        },
        {
          "elife": "10",
          "china_ctrip_api": 127,
          "max": 11,
          "loggage": 6
        }
      ]
    },
    {
      "countries": [
        "KOR"
      ],
      "mapping": [
        {
          "elife": "1",
          "china_ctrip_api": 117,
          "max": 4,
          "loggage": 2
        },
        {
          "elife": "12",
          "china_ctrip_api": 118,
          "max": 4,
          "loggage": 2
        },
        {
          "elife": "2",
          "china_ctrip_api": 119,
          "max": 4,
          "loggage": 3
        },
        {
          "elife": "6",
          "china_ctrip_api": 20020,
          "max": 4,
          "loggage": 4
        },
        {
          "elife": "4",
          "china_ctrip_api": 120,
          "max": 6,
          "loggage": 4
        },
        {
          "elife": "3",
          "china_ctrip_api": 121,
          "max": 6,
          "loggage": 4
        },
        {
          "elife": "5",
          "china_ctrip_api": 123,
          "max": 8,
          "loggage": 6
        },
        {
          "elife": "10",
          "china_ctrip_api": 127,
          "max": 11,
          "loggage": 6
        }
      ]
    },
    {
      "countries": [
        "TWN"
      ],
      "mapping": [
        {
          "elife": "1",
          "china_ctrip_api": 146,
          "max": 3,
          "loggage": 2
        },
        {
          "elife": "1",
          "china_ctrip_api": 117,
          "max": 4,
          "loggage": 2
        },
        {
          "elife": "12",
          "china_ctrip_api": 118,
          "max": 4,
          "loggage": 2
        },
        {
          "elife": "40",
          "china_ctrip_api": 119,
          "max": 4,
          "loggage": 3
        },
        {
          "elife": "3",
          "china_ctrip_api": 20020,
          "max": 4,
          "loggage": 4
        },
        {
          "elife": "4",
          "china_ctrip_api": 120,
          "max": 6,
          "loggage": 4
        },
        {
          "elife": "3",
          "china_ctrip_api": 121,
          "max": 6,
          "loggage": 4
        },
        {
          "elife": "36",
          "china_ctrip_api": 122,
          "max": 11,
          "loggage": 6
        },
        {
          "elife": "5",
          "china_ctrip_api": 124,
          "max": 7,
          "loggage": 5
        }
      ]
    },
    {
      "countries": [
        "USA",
        "CAN"
      ],
      "mapping": [
        {
          "elife": "109",
          "china_ctrip_api": 146,
          "max": 3,
          "loggage": 3
        },
        {
          "elife": "1",
          "china_ctrip_api": 117,
          "max": 3,
          "loggage": 3
        },
        {
          "elife": "12",
          "china_ctrip_api": 118,
          "max": 3,
          "loggage": 3
        },
        {
          "elife": "2",
          "china_ctrip_api": 119,
          "max": 3,
          "loggage": 3
        },
        {
          "elife": "42",
          "china_ctrip_api": 141,
          "max": 3,
          "loggage": 3
        },
        {
          "elife": "43",
          "china_ctrip_api": 40002,
          "max": 3,
          "loggage": 3
        },
        {
          "elife": "49",
          "china_ctrip_api": 40003,
          "max": 4,
          "loggage": 4
        },
        {
          "elife": "6",
          "china_ctrip_api": 20020,
          "max": 4,
          "loggage": 4
        },
        {
          "elife": "4",
          "china_ctrip_api": 120,
          "max": 5,
          "loggage": 5
        },
        {
          "elife": "3",
          "china_ctrip_api": 121,
          "max": 5,
          "loggage": 5
        },
        {
          "elife": "7",
          "china_ctrip_api": 122,
          "max": 6,
          "loggage": 6
        },
        {
          "elife": "13",
          "china_ctrip_api": 20009,
          "max": 4,
          "loggage": 4
        },
        {
          "elife": "36",
          "china_ctrip_api": 20196,
          "max": 6,
          "loggage": 6
        },
        {
          "elife": "8",
          "china_ctrip_api": 124,
          "max": 7,
          "loggage": 7
        },
        {
          "elife": "5",
          "china_ctrip_api": 125,
          "max": 8,
          "loggage": 8
        },
        {
          "elife": "9",
          "china_ctrip_api": 126,
          "max": 10,
          "loggage": 10
        },
        {
          "elife": "10",
          "china_ctrip_api": 127,
          "max": 11,
          "loggage": 11
        },
        {
          "elife": "11",
          "china_ctrip_api": 128,
          "max": 14,
          "loggage": 14
        }
      ]
    },
    {
      "countries": [
        "ARE"
      ],
      "mapping": [
        {
          "elife": "1",
          "china_ctrip_api": 146,
          "max": 3,
          "loggage": 2
        },
        {
          "elife": "1",
          "china_ctrip_api": 117,
          "max": 4,
          "loggage": 2
        },
        {
          "elife": "6",
          "china_ctrip_api": 118,
          "max": 4,
          "loggage": 2
        },
        {
          "elife": "2",
          "china_ctrip_api": 119,
          "max": 4,
          "loggage": 3
        },
        {
          "elife": "3",
          "china_ctrip_api": 20020,
          "max": 4,
          "loggage": 4
        },
        {
          "elife": "36",
          "china_ctrip_api": 120,
          "max": 6,
          "loggage": 4
        },
        {
          "elife": "4",
          "china_ctrip_api": 121,
          "max": 6,
          "loggage": 4
        },
        {
          "elife": "11",
          "china_ctrip_api": 128,
          "max": 13,
          "loggage": 6
        }
      ]
    },
    {
      "countries": [
        "LAO",
        "VNM",
        "KHM",
        "IDN",
        "PHL",
        "LKA"
      ],
      "mapping": [
        {
          "elife": "1",
          "china_ctrip_api": 146,
          "max": 3,
          "loggage": 2
        },
        {
          "elife": "1",
          "china_ctrip_api": 117,
          "max": 4,
          "loggage": 2
        },
        {
          "elife": "6",
          "china_ctrip_api": 118,
          "max": 4,
          "loggage": 2
        },
        {
          "elife": "2",
          "china_ctrip_api": 119,
          "max": 4,
          "loggage": 3
        },
        {
          "elife": "3",
          "china_ctrip_api": 20020,
          "max": 4,
          "loggage": 4
        },
        {
          "elife": "36",
          "china_ctrip_api": 120,
          "max": 6,
          "loggage": 4
        },
        {
          "elife": "4",
          "china_ctrip_api": 121,
          "max": 6,
          "loggage": 4
        },
        {
          "elife": "11",
          "china_ctrip_api": 128,
          "max": 13,
          "loggage": 6
        }
      ]
    },
    {
      "countries": [
        "FRA"
      ],
      "mapping": [
        {
          "elife": "1",
          "china_ctrip_api": 117,
          "max": 4,
          "loggage": 2
        },
        {
          "elife": "12",
          "china_ctrip_api": 118,
          "max": 3,
          "loggage": 2
        },
        {
          "elife": "2",
          "china_ctrip_api": 119,
          "max": 4,
          "loggage": 3
        },
        {
          "elife": "6",
          "china_ctrip_api": 20020,
          "max": 4,
          "loggage": 4
        },
        {
          "elife": "36",
          "china_ctrip_api": 120,
          "max": 6,
          "loggage": 4
        },
        {
          "elife": "3",
          "china_ctrip_api": 121,
          "max": 6,
          "loggage": 4
        },
        {
          "elife": "8",
          "china_ctrip_api": 122,
          "max": 7,
          "loggage": 5
        },
        {
          "elife": "11",
          "china_ctrip_api": 128,
          "max": 13,
          "loggage": 6
        }
      ]
    },
    {
      "countries": [
        "HRV",
        "LUX",
        "NLD",
        "AUT",
        "BGR",
        "PRT",
        "ALB",
        "BIH",
        "BLR",
        "CYP",
        "GGY",
        "GIB",
        "MNE",
        "ROU",
        "RUS",
        "SRB",
        "SVK",
        "UKR",
        "XKX",
        "XXK"
      ],
      "mapping": [
        {
          "elife": "1",
          "china_ctrip_api": 146,
          "max": 3,
          "loggage": 2
        },
        {
          "elife": "6",
          "china_ctrip_api": 117,
          "max": 4,
          "loggage": 2
        },
        {
          "elife": "6",
          "china_ctrip_api": 118,
          "max": 4,
          "loggage": 2
        },
        {
          "elife": "4",
          "china_ctrip_api": 119,
          "max": 4,
          "loggage": 3
        },
        {
          "elife": "3",
          "china_ctrip_api": 20020,
          "max": 4,
          "loggage": 4
        },
        {
          "elife": "5",
          "china_ctrip_api": 124,
          "max": 7,
          "loggage": 5
        },
        {
          "elife": "11",
          "china_ctrip_api": 128,
          "max": 13,
          "loggage": 6
        }
      ]
    },
    {
      "countries": [
        "DNK",
        "EST",
        "FIN",
        "ISL",
        "LVA",
        "LTU",
        "NOR",
        "POL",
        "SWE"
      ],
      "mapping": [
        {
          "elife": "1",
          "china_ctrip_api": 146,
          "max": 3,
          "loggage": 2
        },
        {
          "elife": "1",
          "china_ctrip_api": 117,
          "max": 3,
          "loggage": 2
        },
        {
          "elife": "12",
          "china_ctrip_api": 118,
          "max": 4,
          "loggage": 2
        },
        {
          "elife": "2",
          "china_ctrip_api": 119,
          "max": 4,
          "loggage": 3
        },
        {
          "elife": "6",
          "china_ctrip_api": 20020,
          "max": 4,
          "loggage": 4
        },
        {
          "elife": "36",
          "china_ctrip_api": 120,
          "max": 6,
          "loggage": 4
        },
        {
          "elife": "7",
          "china_ctrip_api": 121,
          "max": 6,
          "loggage": 4
        },
        {
          "elife": "8",
          "china_ctrip_api": 122,
          "max": 7,
          "loggage": 5
        },
        {
          "elife": "5",
          "china_ctrip_api": 123,
          "max": 8,
          "loggage": 5
        },
        {
          "elife": "8",
          "china_ctrip_api": 124,
          "max": 7,
          "loggage": 4
        },
        {
          "elife": "9",
          "china_ctrip_api": 126,
          "max": 9,
          "loggage": 6
        },
        {
          "elife": "10",
          "china_ctrip_api": 127,
          "max": 11,
          "loggage": 6
        },
        {
          "elife": "11",
          "china_ctrip_api": 128,
          "max": 13,
          "loggage": 6
        }
      ]
    },
    {
      "countries": [
        "ESP"
      ],
      "mapping": [
        {
          "elife": "1",
          "china_ctrip_api": 146,
          "max": 3,
          "loggage": 2
        },
        {
          "elife": "1",
          "china_ctrip_api": 117,
          "max": 3,
          "loggage": 2
        },
        {
          "elife": "12",
          "china_ctrip_api": 118,
          "max": 4,
          "loggage": 2
        },
        {
          "elife": "2",
          "china_ctrip_api": 119,
          "max": 4,
          "loggage": 3
        },
        {
          "elife": "6",
          "china_ctrip_api": 20020,
          "max": 4,
          "loggage": 4
        },
        {
          "elife": "36",
          "china_ctrip_api": 120,
          "max": 6,
          "loggage": 4
        },
        {
          "elife": "7",
          "china_ctrip_api": 121,
          "max": 6,
          "loggage": 4
        },
        {
          "elife": "8",
          "china_ctrip_api": 122,
          "max": 7,
          "loggage": 5
        },
        {
          "elife": "5",
          "china_ctrip_api": 123,
          "max": 8,
          "loggage": 5
        },
        {
          "elife": "8",
          "china_ctrip_api": 124,
          "max": 7,
          "loggage": 4
        },
        {
          "elife": "9",
          "china_ctrip_api": 126,
          "max": 9,
          "loggage": 6
        },
        {
          "elife": "10",
          "china_ctrip_api": 127,
          "max": 11,
          "loggage": 6
        },
        {
          "elife": "11",
          "china_ctrip_api": 128,
          "max": 13,
          "loggage": 6
        }
      ]
    },
    {
      "countries": [
        "BEL",
        "HUN",
        "CZE",
        "GRC"
      ],
      "mapping": [
        {
          "elife": "1",
          "china_ctrip_api": 146,
          "max": 3,
          "loggage": 2
        },
        {
          "elife": "1",
          "china_ctrip_api": 117,
          "max": 4,
          "loggage": 2
        },
        {
          "elife": "12",
          "china_ctrip_api": 118,
          "max": 4,
          "loggage": 2
        },
        {
          "elife": "2",
          "china_ctrip_api": 119,
          "max": 4,
          "loggage": 3
        },
        {
          "elife": "6",
          "china_ctrip_api": 20020,
          "max": 4,
          "loggage": 4
        },
        {
          "elife": "36",
          "china_ctrip_api": 120,
          "max": 6,
          "loggage": 4
        },
        {
          "elife": "7",
          "china_ctrip_api": 121,
          "max": 6,
          "loggage": 4
        },
        {
          "elife": "8",
          "china_ctrip_api": 122,
          "max": 7,
          "loggage": 5
        },
        {
          "elife": "5",
          "china_ctrip_api": 123,
          "max": 8,
          "loggage": 6
        },
        {
          "elife": "8",
          "china_ctrip_api": 124,
          "max": 7,
          "loggage": 4
        },
        {
          "elife": "9",
          "china_ctrip_api": 125,
          "max": 8,
          "loggage": 5
        },
        {
          "elife": "9",
          "china_ctrip_api": 126,
          "max": 9,
          "loggage": 6
        },
        {
          "elife": "10",
          "china_ctrip_api": 127,
          "max": 11,
          "loggage": 6
        },
        {
          "elife": "11",
          "china_ctrip_api": 128,
          "max": 13,
          "loggage": 6
        }
      ]
    },
    {
      "countries": [
        "GBR",
        "TUR"
      ],
      "mapping": [
        {
          "elife": "1",
          "china_ctrip_api": 146,
          "max": 3,
          "loggage": 2
        },
        {
          "elife": "6",
          "china_ctrip_api": 117,
          "max": 4,
          "loggage": 2
        },
        {
          "elife": "6",
          "china_ctrip_api": 118,
          "max": 4,
          "loggage": 2
        },
        {
          "elife": "4",
          "china_ctrip_api": 119,
          "max": 4,
          "loggage": 3
        },
        {
          "elife": "3",
          "china_ctrip_api": 20020,
          "max": 4,
          "loggage": 4
        },
        {
          "elife": "5",
          "china_ctrip_api": 124,
          "max": 7,
          "loggage": 5
        },
        {
          "elife": "11",
          "china_ctrip_api": 128,
          "max": 13,
          "loggage": 6
        }
      ]
    },
    {
      "countries": [
        "ITA",
        "MEX",
        "PAN",
        "BRA",
        "COL"
      ],
      "mapping": [
        {
          "elife": "109",
          "china_ctrip_api": 146,
          "max": 3,
          "loggage": 3
        },
        {
          "elife": "1",
          "china_ctrip_api": 117,
          "max": 3,
          "loggage": 3
        },
        {
          "elife": "12",
          "china_ctrip_api": 118,
          "max": 3,
          "loggage": 3
        },
        {
          "elife": "2",
          "china_ctrip_api": 119,
          "max": 3,
          "loggage": 3
        },
        {
          "elife": "42",
          "china_ctrip_api": 141,
          "max": 3,
          "loggage": 3
        },
        {
          "elife": "43",
          "china_ctrip_api": 40002,
          "max": 3,
          "loggage": 3
        },
        {
          "elife": "49",
          "china_ctrip_api": 40003,
          "max": 4,
          "loggage": 4
        },
        {
          "elife": "6",
          "china_ctrip_api": 20020,
          "max": 4,
          "loggage": 4
        },
        {
          "elife": "4",
          "china_ctrip_api": 120,
          "max": 5,
          "loggage": 5
        },
        {
          "elife": "3",
          "china_ctrip_api": 121,
          "max": 5,
          "loggage": 5
        },
        {
          "elife": "7",
          "china_ctrip_api": 122,
          "max": 6,
          "loggage": 6
        },
        {
          "elife": "13",
          "china_ctrip_api": 20009,
          "max": 4,
          "loggage": 4
        },
        {
          "elife": "36",
          "china_ctrip_api": 20196,
          "max": 6,
          "loggage": 6
        },
        {
          "elife": "8",
          "china_ctrip_api": 124,
          "max": 7,
          "loggage": 7
        },
        {
          "elife": "5",
          "china_ctrip_api": 125,
          "max": 8,
          "loggage": 8
        },
        {
          "elife": "9",
          "china_ctrip_api": 126,
          "max": 10,
          "loggage": 10
        },
        {
          "elife": "10",
          "china_ctrip_api": 127,
          "max": 11,
          "loggage": 11
        },
        {
          "elife": "11",
          "china_ctrip_api": 128,
          "max": 14,
          "loggage": 14
        }
      ]
    },
    {
      "countries": [
        "CHL",
        "MEX-1"
      ],
      "mapping": [
        {
          "elife": "109",
          "china_ctrip_api": 146,
          "max": 3,
          "loggage": 3
        },
        {
          "elife": "1",
          "china_ctrip_api": 117,
          "max": 3,
          "loggage": 3
        },
        {
          "elife": "12",
          "china_ctrip_api": 118,
          "max": 3,
          "loggage": 3
        },
        {
          "elife": "2",
          "china_ctrip_api": 119,
          "max": 3,
          "loggage": 3
        },
        {
          "elife": "6",
          "china_ctrip_api": 20020,
          "max": 4,
          "loggage": 4
        },
        {
          "elife": "4",
          "china_ctrip_api": 120,
          "max": 5,
          "loggage": 5
        },
        {
          "elife": "3",
          "china_ctrip_api": 121,
          "max": 5,
          "loggage": 5
        },
        {
          "elife": "7",
          "china_ctrip_api": 122,
          "max": 6,
          "loggage": 6
        },
        {
          "elife": "13",
          "china_ctrip_api": 20009,
          "max": 4,
          "loggage": 4
        },
        {
          "elife": "36",
          "china_ctrip_api": 20196,
          "max": 6,
          "loggage": 6
        },
        {
          "elife": "8",
          "china_ctrip_api": 124,
          "max": 7,
          "loggage": 7
        },
        {
          "elife": "5",
          "china_ctrip_api": 125,
          "max": 8,
          "loggage": 8
        },
        {
          "elife": "9",
          "china_ctrip_api": 126,
          "max": 10,
          "loggage": 10
        },
        {
          "elife": "10",
          "china_ctrip_api": 127,
          "max": 11,
          "loggage": 11
        },
        {
          "elife": "11",
          "china_ctrip_api": 128,
          "max": 14,
          "loggage": 14
        }
      ]
    },
    {
      "countries": [
        "DEU"
      ],
      "mapping": [
        {
          "elife": "1",
          "china_ctrip_api": 146,
          "max": 3,
          "loggage": 2
        },
        {
          "elife": "6",
          "china_ctrip_api": 117,
          "max": 4,
          "loggage": 2
        },
        {
          "elife": "6",
          "china_ctrip_api": 118,
          "max": 4,
          "loggage": 2
        },
        {
          "elife": "4",
          "china_ctrip_api": 119,
          "max": 4,
          "loggage": 3
        },
        {
          "elife": "3",
          "china_ctrip_api": 20020,
          "max": 4,
          "loggage": 4
        },
        {
          "elife": "5",
          "china_ctrip_api": 121,
          "max": 6,
          "loggage": 5
        },
        {
          "elife": "5",
          "china_ctrip_api": 124,
          "max": 7,
          "loggage": 5
        },
        {
          "elife": "11",
          "china_ctrip_api": 128,
          "max": 13,
          "loggage": 6
        }
      ]
    },
    {
      "countries": [
        "IND"
      ],
      "mapping": [
        {
          "elife": "1",
          "china_ctrip_api": 146,
          "max": 3,
          "loggage": 2
        },
        {
          "elife": "1",
          "china_ctrip_api": 117,
          "max": 3,
          "loggage": 2
        },
        {
          "elife": "12",
          "china_ctrip_api": 118,
          "max": 4,
          "loggage": 2
        },
        {
          "elife": "2",
          "china_ctrip_api": 119,
          "max": 4,
          "loggage": 3
        },
        {
          "elife": "3",
          "china_ctrip_api": 20020,
          "max": 4,
          "loggage": 4
        },
        {
          "elife": "36",
          "china_ctrip_api": 120,
          "max": 6,
          "loggage": 4
        },
        {
          "elife": "4",
          "china_ctrip_api": 121,
          "max": 6,
          "loggage": 4
        },
        {
          "elife": "9",
          "china_ctrip_api": 123,
          "max": 8,
          "loggage": 5
        },
        {
          "elife": "5",
          "china_ctrip_api": 124,
          "max": 7,
          "loggage": 4
        },
        {
          "elife": "10",
          "china_ctrip_api": 127,
          "max": 11,
          "loggage": 6
        },
        {
          "elife": "11",
          "china_ctrip_api": 128,
          "max": 13,
          "loggage": 6
        }
      ]
    },
    {
      "countries": [
        "CRI"
      ],
      "mapping": [
        {
          "elife": "1",
          "china_ctrip_api": 146,
          "max": 3,
          "loggage": 2
        },
        {
          "elife": "6",
          "china_ctrip_api": 117,
          "max": 4,
          "loggage": 2
        },
        {
          "elife": "2",
          "china_ctrip_api": 119,
          "max": 4,
          "loggage": 3
        },
        {
          "elife": "3",
          "china_ctrip_api": 20020,
          "max": 4,
          "loggage": 4
        },
        {
          "elife": "4",
          "china_ctrip_api": 120,
          "max": 6,
          "loggage": 4
        },
        {
          "elife": "3",
          "china_ctrip_api": 121,
          "max": 6,
          "loggage": 4
        },
        {
          "elife": "5",
          "china_ctrip_api": 124,
          "max": 7,
          "loggage": 5
        },
        {
          "elife": "11",
          "china_ctrip_api": 128,
          "max": 13,
          "loggage": 6
        }
      ]
    },
    {
      "countries": [
        "ARG"
      ],
      "mapping": [
        {
          "elife": "1",
          "china_ctrip_api": 146,
          "max": 3,
          "loggage": 2
        },
        {
          "elife": "6",
          "china_ctrip_api": 117,
          "max": 4,
          "loggage": 2
        },
        {
          "elife": "2",
          "china_ctrip_api": 118,
          "max": 4,
          "loggage": 2
        },
        {
          "elife": "3",
          "china_ctrip_api": 20020,
          "max": 4,
          "loggage": 4
        },
        {
          "elife": "4",
          "china_ctrip_api": 120,
          "max": 6,
          "loggage": 4
        },
        {
          "elife": "5",
          "china_ctrip_api": 124,
          "max": 7,
          "loggage": 5
        },
        {
          "elife": "11",
          "china_ctrip_api": 128,
          "max": 13,
          "loggage": 6
        }
      ]
    },
    {
      "countries": [
        "PER"
      ],
      "mapping": [
        {
          "elife": "109",
          "china_ctrip_api": 146,
          "max": 3,
          "loggage": 2
        },
        {
          "elife": "1",
          "china_ctrip_api": 117,
          "max": 4,
          "loggage": 2
        },
        {
          "elife": "2",
          "china_ctrip_api": 118,
          "max": 4,
          "loggage": 2
        },
        {
          "elife": "6",
          "china_ctrip_api": 20020,
          "max": 4,
          "loggage": 4
        },
        {
          "elife": "4",
          "china_ctrip_api": 120,
          "max": 6,
          "loggage": 4
        },
        {
          "elife": "3",
          "china_ctrip_api": 121,
          "max": 6,
          "loggage": 4
        },
        {
          "elife": "5",
          "china_ctrip_api": 124,
          "max": 7,
          "loggage": 5
        },
        {
          "elife": "11",
          "china_ctrip_api": 128,
          "max": 13,
          "loggage": 6
        }
      ]
    },
    {
      "countries": [
        "ABW",
        "JAM"
      ],
      "mapping": [
        {
          "elife": "1",
          "china_ctrip_api": 146,
          "max": 3,
          "loggage": 2
        },
        {
          "elife": "6",
          "china_ctrip_api": 117,
          "max": 4,
          "loggage": 2
        },
        {
          "elife": "2",
          "china_ctrip_api": 118,
          "max": 4,
          "loggage": 2
        },
        {
          "elife": "3",
          "china_ctrip_api": 20020,
          "max": 4,
          "loggage": 4
        },
        {
          "elife": "4",
          "china_ctrip_api": 120,
          "max": 6,
          "loggage": 4
        },
        {
          "elife": "3",
          "china_ctrip_api": 121,
          "max": 6,
          "loggage": 4
        },
        {
          "elife": "5",
          "china_ctrip_api": 124,
          "max": 7,
          "loggage": 5
        },
        {
          "elife": "11",
          "china_ctrip_api": 128,
          "max": 13,
          "loggage": 6
        }
      ]
    },
    {
      "countries": [
        "DOM"
      ],
      "mapping": [
        {
          "elife": "1",
          "china_ctrip_api": 146,
          "max": 3,
          "loggage": 2
        },
        {
          "elife": "6",
          "china_ctrip_api": 117,
          "max": 4,
          "loggage": 2
        },
        {
          "elife": "6",
          "china_ctrip_api": 118,
          "max": 4,
          "loggage": 2
        },
        {
          "elife": "2",
          "china_ctrip_api": 119,
          "max": 4,
          "loggage": 3
        },
        {
          "elife": "3",
          "china_ctrip_api": 20020,
          "max": 4,
          "loggage": 4
        },
        {
          "elife": "4",
          "china_ctrip_api": 120,
          "max": 6,
          "loggage": 4
        },
        {
          "elife": "3",
          "china_ctrip_api": 121,
          "max": 6,
          "loggage": 4
        },
        {
          "elife": "5",
          "china_ctrip_api": 124,
          "max": 7,
          "loggage": 5
        },
        {
          "elife": "11",
          "china_ctrip_api": 128,
          "max": 13,
          "loggage": 6
        }
      ]
    },
    {
      "countries": [
        "CHE",
        "IRL"
      ],
      "mapping": [
        {
          "elife": "1",
          "china_ctrip_api": 117,
          "max": 4,
          "loggage": 2
        },
        {
          "elife": "12",
          "china_ctrip_api": 118,
          "max": 4,
          "loggage": 2
        },
        {
          "elife": "6",
          "china_ctrip_api": 20020,
          "max": 4,
          "loggage": 4
        },
        {
          "elife": "2",
          "china_ctrip_api": 119,
          "max": 4,
          "loggage": 3
        },
        {
          "elife": "36",
          "china_ctrip_api": 120,
          "max": 6,
          "loggage": 4
        },
        {
          "elife": "7",
          "china_ctrip_api": 121,
          "max": 6,
          "loggage": 4
        },
        {
          "elife": "8",
          "china_ctrip_api": 122,
          "max": 7,
          "loggage": 5
        },
        {
          "elife": "5",
          "china_ctrip_api": 124,
          "max": 7,
          "loggage": 5
        },
        {
          "elife": "9",
          "china_ctrip_api": 125,
          "max": 8,
          "loggage": 5
        },
        {
          "elife": "9",
          "china_ctrip_api": 126,
          "max": 9,
          "loggage": 6
        },
        {
          "elife": "11",
          "china_ctrip_api": 127,
          "max": 11,
          "loggage": 6
        },
        {
          "elife": "11",
          "china_ctrip_api": 128,
          "max": 13,
          "loggage": 6
        }
      ]
    },
    {
      "countries": [
        "DEFAULT"
      ],
      "mapping": [
        {
          "elife": "1",
          "china_ctrip_api": 146,
          "max": 3,
          "loggage": 2
        },
        {
          "elife": "6",
          "china_ctrip_api": 117,
          "max": 4,
          "loggage": 2
        },
        {
          "elife": "6",
          "china_ctrip_api": 118,
          "max": 4,
          "loggage": 2
        },
        {
          "elife": "2",
          "china_ctrip_api": 119,
          "max": 4,
          "loggage": 3
        },
        {
          "elife": "4",
          "china_ctrip_api": 120,
          "max": 6,
          "loggage": 4
        },
        {
          "elife": "5",
          "china_ctrip_api": 124,
          "max": 7,
          "loggage": 5
        },
        {
          "elife": "9",
          "china_ctrip_api": 125,
          "max": 8,
          "loggage": 5
        },
        {
          "elife": "9",
          "china_ctrip_api": 126,
          "max": 9,
          "loggage": 6
        },
        {
          "elife": "11",
          "china_ctrip_api": 127,
          "max": 11,
          "loggage": 6
        },
        {
          "elife": "11",
          "china_ctrip_api": 128,
          "max": 13,
          "loggage": 6
        },
        {
          "elife": "3",
          "china_ctrip_api": 20020,
          "max": 4,
          "loggage": 4
        }
      ]
    },
    {
      "countries": [
        "QAT",
        "TZA",
        "EGY",
        "OMN",
        "UGA",
        "ZAF",
        "KAZ",
        "NGA",
        "SAU",
        "TJK",
        "MAR",
        "ZMB",
        "MUS",
        "BRN",
        "MNG"
      ],
      "mapping": [
        {
          "elife": "1",
          "china_ctrip_api": 146,
          "max": 3,
          "loggage": 2
        },
        {
          "elife": "1",
          "china_ctrip_api": 117,
          "max": 4,
          "loggage": 2
        },
        {
          "elife": "6",
          "china_ctrip_api": 118,
          "max": 4,
          "loggage": 2
        },
        {
          "elife": "2",
          "china_ctrip_api": 119,
          "max": 4,
          "loggage": 3
        },
        {
          "elife": "36",
          "china_ctrip_api": 120,
          "max": 6,
          "loggage": 4
        },
        {
          "elife": "4",
          "china_ctrip_api": 121,
          "max": 6,
          "loggage": 4
        },
        {
          "elife": "5",
          "china_ctrip_api": 124,
          "max": 7,
          "loggage": 5
        },
        {
          "elife": "9",
          "china_ctrip_api": 125,
          "max": 8,
          "loggage": 5
        },
        {
          "elife": "9",
          "china_ctrip_api": 126,
          "max": 9,
          "loggage": 6
        },
        {
          "elife": "11",
          "china_ctrip_api": 127,
          "max": 11,
          "loggage": 6
        },
        {
          "elife": "11",
          "china_ctrip_api": 128,
          "max": 13,
          "loggage": 6
        },
        {
          "elife": "3",
          "china_ctrip_api": 20020,
          "max": 4,
          "loggage": 4
        }
      ]
    },
    {
      "area_ids": [
        152,
        1392
      ],
      "mapping": [
        {
          "elife": "1",
          "china_ctrip_api": 146,
          "max": 3,
          "loggage": 2
        },
        {
          "elife": "1",
          "china_ctrip_api": 117,
          "max": 4,
          "loggage": 2
        },
        {
          "elife": "6",
          "china_ctrip_api": 118,
          "max": 4,
          "loggage": 2
        },
        {
          "elife": "2",
          "china_ctrip_api": 119,
          "max": 4,
          "loggage": 3
        },
        {
          "elife": "3",
          "china_ctrip_api": 20020,
          "max": 4,
          "loggage": 4
        },
        {
          "elife": "36",
          "china_ctrip_api": 120,
          "max": 6,
          "loggage": 4
        },
        {
          "elife": "4",
          "china_ctrip_api": 121,
          "max": 6,
          "loggage": 4
        },
        {
          "elife": "11",
          "china_ctrip_api": 128,
          "max": 13,
          "loggage": 6
        }
      ]
    }
  ]
