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
    "携程车型": "商务8座",
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

let currentMapping = {
  "percent": "0",
  "dataType": "1",
  "doNotDel": "doNotDel",
  "vehicle_type_mapping": [
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
        "ISL",
        "LTU"
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
        "MEX"
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
      "countries": [
        "DNK"
      ],
      "mapping": [
        {
          "elife": "1",
          "china_ctrip_api": 146
        },
        {
          "elife": "1",
          "china_ctrip_api": 117
        },
        {
          "elife": "12",
          "china_ctrip_api": 118
        },
        {
          "elife": "2",
          "china_ctrip_api": 119
        },
        {
          "elife": "3",
          "china_ctrip_api": 20020
        },
        {
          "elife": "36",
          "china_ctrip_api": 120
        },
        {
          "elife": "7",
          "china_ctrip_api": 121
        },
        {
          "elife": "8",
          "china_ctrip_api": 122
        },
        {
          "elife": "5",
          "china_ctrip_api": 123
        },
        {
          "elife": "5",
          "china_ctrip_api": 124
        },
        {
          "elife": "9",
          "china_ctrip_api": 126
        },
        {
          "elife": "10",
          "china_ctrip_api": 127
        },
        {
          "elife": "11",
          "china_ctrip_api": 128
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
          "china_ctrip_api": 146
        },
        {
          "elife": "1",
          "china_ctrip_api": 117
        },
        {
          "elife": "12",
          "china_ctrip_api": 118
        },
        {
          "elife": "2",
          "china_ctrip_api": 119
        },
        {
          "elife": "6",
          "china_ctrip_api": 20020
        },
        {
          "elife": "36",
          "china_ctrip_api": 120
        },
        {
          "elife": "3",
          "china_ctrip_api": 121
        },
        {
          "elife": "8",
          "china_ctrip_api": 122
        },
        {
          "elife": "5",
          "china_ctrip_api": 123
        },
        {
          "elife": "5",
          "china_ctrip_api": 124
        },
        {
          "elife": "9",
          "china_ctrip_api": 126
        },
        {
          "elife": "10",
          "china_ctrip_api": 127
        },
        {
          "elife": "11",
          "china_ctrip_api": 128
        }
      ]
    },
    {
      "countries": [
        "EST"
      ],
      "mapping": [
        {
          "elife": "1",
          "china_ctrip_api": 146
        },
        {
          "elife": "1",
          "china_ctrip_api": 117
        },
        {
          "elife": "12",
          "china_ctrip_api": 118
        },
        {
          "elife": "2",
          "china_ctrip_api": 119
        },
        {
          "elife": "3",
          "china_ctrip_api": 20020
        },
        {
          "elife": "36",
          "china_ctrip_api": 120
        },
        {
          "elife": "7",
          "china_ctrip_api": 121
        },
        {
          "elife": "8",
          "china_ctrip_api": 122
        },
        {
          "elife": "5",
          "china_ctrip_api": 123
        },
        {
          "elife": "5",
          "china_ctrip_api": 124
        },
        {
          "elife": "9",
          "china_ctrip_api": 126
        },
        {
          "elife": "10",
          "china_ctrip_api": 127
        },
        {
          "elife": "11",
          "china_ctrip_api": 128
        }
      ]
    },
    {
      "countries": [
        "FIN"
      ],
      "mapping": [
        {
          "elife": "1",
          "china_ctrip_api": 146
        },
        {
          "elife": "1",
          "china_ctrip_api": 117
        },
        {
          "elife": "12",
          "china_ctrip_api": 118
        },
        {
          "elife": "2",
          "china_ctrip_api": 119
        },
        {
          "elife": "3",
          "china_ctrip_api": 20020
        },
        {
          "elife": "36",
          "china_ctrip_api": 120
        },
        {
          "elife": "7",
          "china_ctrip_api": 121
        },
        {
          "elife": "8",
          "china_ctrip_api": 122
        },
        {
          "elife": "5",
          "china_ctrip_api": 123
        },
        {
          "elife": "5",
          "china_ctrip_api": 124
        },
        {
          "elife": "9",
          "china_ctrip_api": 126
        },
        {
          "elife": "10",
          "china_ctrip_api": 127
        },
        {
          "elife": "11",
          "china_ctrip_api": 128
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
          "china_ctrip_api": 117
        },
        {
          "elife": "12",
          "china_ctrip_api": 118
        },
        {
          "elife": "2",
          "china_ctrip_api": 119
        },
        {
          "elife": "6",
          "china_ctrip_api": 20020
        },
        {
          "elife": "36",
          "china_ctrip_api": 120
        },
        {
          "elife": "3",
          "china_ctrip_api": 121
        },
        {
          "elife": "5",
          "china_ctrip_api": 122
        },
        {
          "elife": "11",
          "china_ctrip_api": 128
        }
      ]
    },
    {
      "countries": [
        "LVA"
      ],
      "mapping": [
        {
          "elife": "1",
          "china_ctrip_api": 146
        },
        {
          "elife": "1",
          "china_ctrip_api": 117
        },
        {
          "elife": "12",
          "china_ctrip_api": 118
        },
        {
          "elife": "2",
          "china_ctrip_api": 119
        },
        {
          "elife": "3",
          "china_ctrip_api": 20020
        },
        {
          "elife": "36",
          "china_ctrip_api": 120
        },
        {
          "elife": "7",
          "china_ctrip_api": 121
        },
        {
          "elife": "8",
          "china_ctrip_api": 122
        },
        {
          "elife": "5",
          "china_ctrip_api": 123
        },
        {
          "elife": "5",
          "china_ctrip_api": 124
        },
        {
          "elife": "9",
          "china_ctrip_api": 126
        },
        {
          "elife": "10",
          "china_ctrip_api": 127
        },
        {
          "elife": "11",
          "china_ctrip_api": 128
        }
      ]
    },
    {
      "countries": [
        "NOR"
      ],
      "mapping": [
        {
          "elife": "1",
          "china_ctrip_api": 146
        },
        {
          "elife": "1",
          "china_ctrip_api": 117
        },
        {
          "elife": "12",
          "china_ctrip_api": 118
        },
        {
          "elife": "2",
          "china_ctrip_api": 119
        },
        {
          "elife": "3",
          "china_ctrip_api": 20020
        },
        {
          "elife": "36",
          "china_ctrip_api": 120
        },
        {
          "elife": "7",
          "china_ctrip_api": 121
        },
        {
          "elife": "8",
          "china_ctrip_api": 122
        },
        {
          "elife": "5",
          "china_ctrip_api": 123
        },
        {
          "elife": "5",
          "china_ctrip_api": 124
        },
        {
          "elife": "9",
          "china_ctrip_api": 126
        },
        {
          "elife": "10",
          "china_ctrip_api": 127
        },
        {
          "elife": "11",
          "china_ctrip_api": 128
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
          "china_ctrip_api": 146
        },
        {
          "elife": "1",
          "china_ctrip_api": 117
        },
        {
          "elife": "2",
          "china_ctrip_api": 118
        },
        {
          "elife": "6",
          "china_ctrip_api": 20020
        },
        {
          "elife": "4",
          "china_ctrip_api": 120
        },
        {
          "elife": "5",
          "china_ctrip_api": 124
        },
        {
          "elife": "11",
          "china_ctrip_api": 128
        },
        {
          "elife": "3",
          "china_ctrip_api": 121
        }
      ]
    },
    {
      "countries": [
        "POL"
      ],
      "mapping": [
        {
          "elife": "1",
          "china_ctrip_api": 146
        },
        {
          "elife": "1",
          "china_ctrip_api": 117
        },
        {
          "elife": "12",
          "china_ctrip_api": 118
        },
        {
          "elife": "2",
          "china_ctrip_api": 119
        },
        {
          "elife": "3",
          "china_ctrip_api": 20020
        },
        {
          "elife": "36",
          "china_ctrip_api": 120
        },
        {
          "elife": "7",
          "china_ctrip_api": 121
        },
        {
          "elife": "8",
          "china_ctrip_api": 122
        },
        {
          "elife": "5",
          "china_ctrip_api": 123
        },
        {
          "elife": "5",
          "china_ctrip_api": 124
        },
        {
          "elife": "9",
          "china_ctrip_api": 126
        },
        {
          "elife": "10",
          "china_ctrip_api": 127
        },
        {
          "elife": "11",
          "china_ctrip_api": 128
        }
      ]
    },
    {
      "countries": [
        "SWE"
      ],
      "mapping": [
        {
          "elife": "1",
          "china_ctrip_api": 146
        },
        {
          "elife": "1",
          "china_ctrip_api": 117
        },
        {
          "elife": "12",
          "china_ctrip_api": 118
        },
        {
          "elife": "2",
          "china_ctrip_api": 119
        },
        {
          "elife": "3",
          "china_ctrip_api": 20020
        },
        {
          "elife": "36",
          "china_ctrip_api": 120
        },
        {
          "elife": "7",
          "china_ctrip_api": 121
        },
        {
          "elife": "8",
          "china_ctrip_api": 122
        },
        {
          "elife": "5",
          "china_ctrip_api": 123
        },
        {
          "elife": "5",
          "china_ctrip_api": 124
        },
        {
          "elife": "9",
          "china_ctrip_api": 126
        },
        {
          "elife": "10",
          "china_ctrip_api": 127
        },
        {
          "elife": "11",
          "china_ctrip_api": 128
        }
      ]
    }
  ]
}
let countryMapping = [
  {
    "country": "ZAF",
    "json": [{ "id": "4c03-daf9-7441", "maker": "", "model": "", "x_maker": "", "x_model": "", "image_url_1": "", "image_url_2": "", "max_luggage": "", "min_luggage": "", "vehicle_class": "Sedan", "x_max_luggage": "", "x_min_luggage": "", "max_passengers": "", "min_passengers": "", "x_vehicle_class": "紧凑5座", "vehicle_class_id": "1", "x_max_passengers": "", "x_min_passengers": "", "x_vehicle_category": "", "x_vehicle_class_id": "" }, { "id": "bd3e-797f-80d0", "maker": "", "model": "", "x_maker": "", "x_model": "", "image_url_1": "", "image_url_2": "", "max_luggage": "", "min_luggage": "", "vehicle_class": "Sedan", "x_max_luggage": "", "x_min_luggage": "", "max_passengers": "", "min_passengers": "", "x_vehicle_class": "经济5座", "vehicle_class_id": "1", "x_max_passengers": "", "x_min_passengers": "", "x_vehicle_category": "", "x_vehicle_class_id": "" }, { "id": "df7b-2878-30fc", "maker": "", "model": "", "x_maker": "", "x_model": "", "image_url_1": "", "image_url_2": "", "max_luggage": "", "min_luggage": 0, "max_passenger": "", "min_passenger": 1, "vehicle_class": "Comfort Sedan", "x_max_luggage": "", "x_min_luggage": "", "x_vehicle_class": "舒适5座", "vehicle_class_id": "12", "x_max_passengers": "", "x_min_passengers": "", "x_vehicle_category": "" }, { "id": "c9f2-5fa1-fbb2", "maker": "", "model": "", "x_maker": "", "x_model": "", "image_url_1": "", "image_url_2": "", "max_luggage": "", "min_luggage": "", "vehicle_class": "Business Sedan", "x_max_luggage": "", "x_min_luggage": "", "max_passengers": "", "min_passengers": "", "x_vehicle_class": "豪华5座", "vehicle_class_id": "2", "x_max_passengers": "", "x_min_passengers": "", "x_vehicle_category": "", "x_vehicle_class_id": "" }, { "id": "c71b-4184-bc5f", "maker": "", "model": "", "x_maker": "", "x_model": "", "image_url_1": "", "image_url_2": "", "max_luggage": "", "min_luggage": "", "vehicle_class": "Business Minivan", "x_max_luggage": "", "x_min_luggage": "", "max_passengers": "", "min_passengers": "", "x_vehicle_class": "豪华7座", "vehicle_class_id": "36", "x_max_passengers": "", "x_min_passengers": "", "x_vehicle_category": "", "x_vehicle_class_id": "" }, { "id": "d875-d482-4a53", "maker": "", "model": "", "x_maker": "", "x_model": "", "image_url_1": "", "image_url_2": "", "max_luggage": "", "min_luggage": 0, "max_passenger": "", "min_passenger": 1, "vehicle_class": "MPV-5", "x_max_luggage": "", "x_min_luggage": "", "x_vehicle_class": "商务7座", "vehicle_class_id": "3", "x_max_passengers": "", "x_min_passengers": "", "x_vehicle_category": "" }, { "id": "f6b9-0fbc-82af", "maker": "", "model": "", "x_maker": "", "x_model": "", "image_url_1": "", "image_url_2": "", "max_luggage": "", "min_luggage": "", "vehicle_class": "Minibus-8", "x_max_luggage": "", "x_min_luggage": "", "max_passengers": "", "min_passengers": "", "x_vehicle_class": "8座小巴", "vehicle_class_id": "5", "x_max_passengers": "", "x_min_passengers": "", "x_vehicle_category": "", "x_vehicle_class_id": "" }, { "id": "ffde-60e1-cdce", "maker": "", "model": "", "x_maker": "", "x_model": "", "image_url_1": "", "image_url_2": "", "max_luggage": "", "min_luggage": "", "vehicle_class": "Minibus-10", "x_max_luggage": "", "x_min_luggage": "", "max_passengers": "", "min_passengers": "", "x_vehicle_class": "9座小巴", "vehicle_class_id": "9", "x_max_passengers": "", "x_min_passengers": "", "x_vehicle_category": "", "x_vehicle_class_id": "" }, { "id": "3813-83f1-2d72", "maker": "", "model": "", "x_maker": "", "x_model": "", "image_url_1": "", "image_url_2": "", "max_luggage": "", "min_luggage": "", "vehicle_class": "Minibus-10", "x_max_luggage": "", "x_min_luggage": "", "max_passengers": "", "min_passengers": "", "x_vehicle_class": "10座小巴", "vehicle_class_id": "9", "x_max_passengers": "", "x_min_passengers": "", "x_vehicle_category": "", "x_vehicle_class_id": "" }, { "id": "1d55-4d84-049c", "maker": "", "model": "", "x_maker": "", "x_model": "", "image_url_1": "", "image_url_2": "", "max_luggage": "", "min_luggage": 0, "max_passenger": "", "min_passenger": 1, "vehicle_class": "Minibus-12", "x_max_luggage": "", "x_min_luggage": "", "x_vehicle_class": "12座小巴", "vehicle_class_id": "10", "x_max_passengers": "", "x_min_passengers": "", "x_vehicle_category": "" }, { "id": "eb8b-0b6c-f666", "maker": "", "model": "", "x_maker": "", "x_model": "", "image_url_1": "", "image_url_2": "", "max_luggage": "", "min_luggage": "", "vehicle_class": "Minibus-14", "x_max_luggage": "", "x_min_luggage": "", "max_passengers": "", "min_passengers": "", "x_vehicle_class": "14座中巴", "vehicle_class_id": "11", "x_max_passengers": "", "x_min_passengers": "", "x_vehicle_category": "", "x_vehicle_class_id": "" }, { "id": "db85-5913-2414", "maker": "", "model": "", "x_maker": "", "x_model": "", "image_url_1": "", "image_url_2": "", "max_luggage": "", "min_luggage": 0, "max_passenger": "", "min_passenger": 1, "vehicle_class": "MPV-4", "x_max_luggage": "", "x_min_luggage": "", "x_vehicle_class": "舒适7座", "vehicle_class_id": "6", "x_max_passengers": "", "x_min_passengers": "", "x_vehicle_category": "" }]
  },
  {
    "country": "VNM",
    "json": [{ "id": "a914-d93c-fa08", "maker": "", "model": "", "x_maker": "", "x_model": "", "image_url_1": "", "image_url_2": "", "max_luggage": "", "min_luggage": "", "vehicle_class": "Sedan", "x_max_luggage": "", "x_min_luggage": "", "max_passengers": "", "min_passengers": "", "x_vehicle_class": "紧凑5座", "vehicle_class_id": "1", "x_max_passengers": "", "x_min_passengers": "", "x_vehicle_category": "", "x_vehicle_class_id": "" }, { "id": "ab6a-656a-aa6b", "maker": "", "model": "", "x_maker": "", "x_model": "", "image_url_1": "", "image_url_2": "", "max_luggage": "", "min_luggage": "", "vehicle_class": "Sedan", "x_max_luggage": "", "x_min_luggage": "", "max_passengers": "", "min_passengers": "", "x_vehicle_class": "经济5座", "vehicle_class_id": "1", "x_max_passengers": "", "x_min_passengers": "", "x_vehicle_category": "", "x_vehicle_class_id": "" }, { "id": "1af9-442f-1da2", "maker": "", "model": "", "x_maker": "", "x_model": "", "image_url_1": "", "image_url_2": "", "max_luggage": "", "min_luggage": "", "vehicle_class": "MPV-4", "x_max_luggage": "", "x_min_luggage": "", "max_passengers": "", "min_passengers": "", "x_vehicle_class": "舒适5座", "vehicle_class_id": "6", "x_max_passengers": "", "x_min_passengers": "", "x_vehicle_category": "", "x_vehicle_class_id": "" }, { "id": "1999-e0ba-1afd", "maker": "", "model": "", "x_maker": "", "x_model": "", "image_url_1": "", "image_url_2": "", "max_luggage": "", "min_luggage": "", "vehicle_class": "Business Sedan", "x_max_luggage": "", "x_min_luggage": "", "max_passengers": "", "min_passengers": "", "x_vehicle_class": "豪华5座", "vehicle_class_id": "2", "x_max_passengers": "", "x_min_passengers": "", "x_vehicle_category": "", "x_vehicle_class_id": "" }, { "id": "1a12-c514-3771", "maker": "", "model": "", "x_maker": "", "x_model": "", "image_url_1": "", "image_url_2": "", "max_luggage": "", "min_luggage": "", "vehicle_class": "MPV-5", "x_max_luggage": "", "x_min_luggage": "", "max_passengers": "", "min_passengers": "", "x_vehicle_class": "舒适7座", "vehicle_class_id": "3", "x_max_passengers": "", "x_min_passengers": "", "x_vehicle_category": "", "x_vehicle_class_id": "" }, { "id": "1cc5-6d27-7095", "maker": "", "model": "", "x_maker": "", "x_model": "", "image_url_1": "", "image_url_2": "", "max_luggage": "", "min_luggage": "", "vehicle_class": "Business Minivan", "x_max_luggage": "", "x_min_luggage": "", "max_passengers": "", "min_passengers": "", "x_vehicle_class": "豪华7座", "vehicle_class_id": "36", "x_max_passengers": "", "x_min_passengers": "", "x_vehicle_category": "", "x_vehicle_class_id": "" }, { "id": "9cfd-22ff-4e8e", "maker": "", "model": "", "x_maker": "", "x_model": "", "image_url_1": "", "image_url_2": "", "max_luggage": "", "min_luggage": "", "vehicle_class": "Business SUV", "x_max_luggage": "", "x_min_luggage": "", "max_passengers": "", "min_passengers": "", "x_vehicle_class": "商务7座", "vehicle_class_id": "4", "x_max_passengers": "", "x_min_passengers": "", "x_vehicle_category": "", "x_vehicle_class_id": "" }, { "id": "4909-43ad-b87e", "maker": "", "model": "", "x_maker": "", "x_model": "", "image_url_1": "", "image_url_2": "", "max_luggage": "", "min_luggage": "", "vehicle_class": "Minibus-14", "x_max_luggage": "", "x_min_luggage": "", "max_passengers": "", "min_passengers": "", "x_vehicle_class": "14座中巴", "vehicle_class_id": "11", "x_max_passengers": "", "x_min_passengers": "", "x_vehicle_category": "", "x_vehicle_class_id": "" }, { "id": "435e-03b2-8db7", "maker": "", "model": "", "x_maker": "", "x_model": "", "image_url_1": "", "image_url_2": "", "max_luggage": "", "min_luggage": 0, "max_passenger": "", "min_passenger": 1, "vehicle_class": "Minibus-8", "x_max_luggage": "", "x_min_luggage": "", "x_vehicle_class": "8座小巴", "vehicle_class_id": "5", "x_max_passengers": "", "x_min_passengers": "", "x_vehicle_category": "" }, { "id": "95ae-7639-82e8", "maker": "", "model": "", "x_maker": "", "x_model": "", "image_url_1": "", "image_url_2": "", "max_luggage": "", "min_luggage": 0, "max_passenger": "", "min_passenger": 1, "vehicle_class": "Minibus-10", "x_max_luggage": "", "x_min_luggage": "", "x_vehicle_class": "9座小巴", "vehicle_class_id": "9", "x_max_passengers": "", "x_min_passengers": "", "x_vehicle_category": "" }, { "id": "7cb2-020e-e11f", "maker": "", "model": "", "x_maker": "", "x_model": "", "image_url_1": "", "image_url_2": "", "max_luggage": "", "min_luggage": 0, "max_passenger": "", "min_passenger": 1, "vehicle_class": "Minibus-10", "x_max_luggage": "", "x_min_luggage": "", "x_vehicle_class": "10座小巴", "vehicle_class_id": "9", "x_max_passengers": "", "x_min_passengers": "", "x_vehicle_category": "" }, { "id": "060e-7b4b-01fa", "maker": "", "model": "", "x_maker": "", "x_model": "", "image_url_1": "", "image_url_2": "", "max_luggage": "", "min_luggage": 0, "max_passenger": "", "min_passenger": 1, "vehicle_class": "Minibus-12", "x_max_luggage": "", "x_min_luggage": "", "x_vehicle_class": "12座小巴", "vehicle_class_id": "10", "x_max_passengers": "", "x_min_passengers": "", "x_vehicle_category": "" }]
  },
  {
    "country": "TZA",
    "json": [{ "id": "83e3-edb3-09a6", "maker": "", "model": "", "x_maker": "", "x_model": "", "image_url_1": "", "image_url_2": "", "max_luggage": "", "min_luggage": "", "vehicle_class": "Sedan", "x_max_luggage": "", "x_min_luggage": "", "max_passengers": "", "min_passengers": "", "x_vehicle_class": "紧凑5座", "vehicle_class_id": "1", "x_max_passengers": "", "x_min_passengers": "", "x_vehicle_category": "", "x_vehicle_class_id": "" }, { "id": "7c83-1b94-6b16", "maker": "", "model": "", "x_maker": "", "x_model": "", "image_url_1": "", "image_url_2": "", "max_luggage": "", "min_luggage": "", "vehicle_class": "Sedan", "x_max_luggage": "", "x_min_luggage": "", "max_passengers": "", "min_passengers": "", "x_vehicle_class": "经济5座", "vehicle_class_id": "1", "x_max_passengers": "", "x_min_passengers": "", "x_vehicle_category": "", "x_vehicle_class_id": "" }, { "id": "a950-7de2-8157", "maker": "", "model": "", "x_maker": "", "x_model": "", "image_url_1": "", "image_url_2": "", "max_luggage": "", "min_luggage": 0, "max_passenger": "", "min_passenger": 1, "vehicle_class": "Comfort Sedan", "x_max_luggage": "", "x_min_luggage": "", "x_vehicle_class": "舒适5座", "vehicle_class_id": "12", "x_max_passengers": "", "x_min_passengers": "", "x_vehicle_category": "" }, { "id": "1269-0eba-a053", "maker": "", "model": "", "x_maker": "", "x_model": "", "image_url_1": "", "image_url_2": "", "max_luggage": "", "min_luggage": "", "vehicle_class": "Business Sedan", "x_max_luggage": "", "x_min_luggage": "", "max_passengers": "", "min_passengers": "", "x_vehicle_class": "豪华5座", "vehicle_class_id": "2", "x_max_passengers": "", "x_min_passengers": "", "x_vehicle_category": "", "x_vehicle_class_id": "" }, { "id": "dcf1-4106-c8cc", "maker": "", "model": "", "x_maker": "", "x_model": "", "image_url_1": "", "image_url_2": "", "max_luggage": "", "min_luggage": "", "vehicle_class": "Business Minivan", "x_max_luggage": "", "x_min_luggage": "", "max_passengers": "", "min_passengers": "", "x_vehicle_class": "豪华7座", "vehicle_class_id": "36", "x_max_passengers": "", "x_min_passengers": "", "x_vehicle_category": "", "x_vehicle_class_id": "" }, { "id": "897d-3c14-178e", "maker": "", "model": "", "x_maker": "", "x_model": "", "image_url_1": "", "image_url_2": "", "max_luggage": "", "min_luggage": 0, "max_passenger": "", "min_passenger": 1, "vehicle_class": "MPV-5", "x_max_luggage": "", "x_min_luggage": "", "x_vehicle_class": "商务7座", "vehicle_class_id": "3", "x_max_passengers": "", "x_min_passengers": "", "x_vehicle_category": "" }, { "id": "bd71-5e82-c6e6", "maker": "", "model": "", "x_maker": "", "x_model": "", "image_url_1": "", "image_url_2": "", "max_luggage": "", "min_luggage": "", "vehicle_class": "Minibus-8", "x_max_luggage": "", "x_min_luggage": "", "max_passengers": "", "min_passengers": "", "x_vehicle_class": "8座小巴", "vehicle_class_id": "5", "x_max_passengers": "", "x_min_passengers": "", "x_vehicle_category": "", "x_vehicle_class_id": "" }, { "id": "fa41-2dfe-fc9a", "maker": "", "model": "", "x_maker": "", "x_model": "", "image_url_1": "", "image_url_2": "", "max_luggage": "", "min_luggage": "", "vehicle_class": "Minibus-10", "x_max_luggage": "", "x_min_luggage": "", "max_passengers": "", "min_passengers": "", "x_vehicle_class": "9座小巴", "vehicle_class_id": "9", "x_max_passengers": "", "x_min_passengers": "", "x_vehicle_category": "", "x_vehicle_class_id": "" }, { "id": "0b0f-7ad6-7c96", "maker": "", "model": "", "x_maker": "", "x_model": "", "image_url_1": "", "image_url_2": "", "max_luggage": "", "min_luggage": "", "vehicle_class": "Minibus-10", "x_max_luggage": "", "x_min_luggage": "", "max_passengers": "", "min_passengers": "", "x_vehicle_class": "10座小巴", "vehicle_class_id": "9", "x_max_passengers": "", "x_min_passengers": "", "x_vehicle_category": "", "x_vehicle_class_id": "" }, { "id": "ed97-bb38-995f", "maker": "", "model": "", "x_maker": "", "x_model": "", "image_url_1": "", "image_url_2": "", "max_luggage": "", "min_luggage": 0, "max_passenger": "", "min_passenger": 1, "vehicle_class": "Minibus-12", "x_max_luggage": "", "x_min_luggage": "", "x_vehicle_class": "12座小巴", "vehicle_class_id": "10", "x_max_passengers": "", "x_min_passengers": "", "x_vehicle_category": "" }, { "id": "15c4-f312-09be", "maker": "", "model": "", "x_maker": "", "x_model": "", "image_url_1": "", "image_url_2": "", "max_luggage": "", "min_luggage": "", "vehicle_class": "Minibus-14", "x_max_luggage": "", "x_min_luggage": "", "max_passengers": "", "min_passengers": "", "x_vehicle_class": "14座中巴", "vehicle_class_id": "11", "x_max_passengers": "", "x_min_passengers": "", "x_vehicle_category": "", "x_vehicle_class_id": "" }, { "id": "eed8-adf2-ad9f", "maker": "", "model": "", "x_maker": "", "x_model": "", "image_url_1": "", "image_url_2": "", "max_luggage": "", "min_luggage": 0, "max_passenger": "", "min_passenger": 1, "vehicle_class": "MPV-4", "x_max_luggage": "", "x_min_luggage": "", "x_vehicle_class": "舒适7座", "vehicle_class_id": "6", "x_max_passengers": "", "x_min_passengers": "", "x_vehicle_category": "" }]
  },
  {
    "country": "SAU",
    "json": [{ "id": "f000-acfa-3ca5", "maker": "", "model": "", "x_maker": "", "x_model": "", "image_url_1": "", "image_url_2": "", "max_luggage": "", "min_luggage": "", "vehicle_class": "Sedan", "x_max_luggage": "", "x_min_luggage": "", "max_passengers": "", "min_passengers": "", "x_vehicle_class": "紧凑5座", "vehicle_class_id": "1", "x_max_passengers": "", "x_min_passengers": "", "x_vehicle_category": "", "x_vehicle_class_id": "" }, { "id": "306a-e2eb-5fe7", "maker": "", "model": "", "x_maker": "", "x_model": "", "image_url_1": "", "image_url_2": "", "max_luggage": "", "min_luggage": "", "vehicle_class": "Sedan", "x_max_luggage": "", "x_min_luggage": "", "max_passengers": "", "min_passengers": "", "x_vehicle_class": "经济5座", "vehicle_class_id": "1", "x_max_passengers": "", "x_min_passengers": "", "x_vehicle_category": "", "x_vehicle_class_id": "" }, { "id": "e25d-6b44-b904", "maker": "", "model": "", "x_maker": "", "x_model": "", "image_url_1": "", "image_url_2": "", "max_luggage": "", "min_luggage": 0, "max_passenger": "", "min_passenger": 1, "vehicle_class": "Comfort Sedan", "x_max_luggage": "", "x_min_luggage": "", "x_vehicle_class": "舒适5座", "vehicle_class_id": "12", "x_max_passengers": "", "x_min_passengers": "", "x_vehicle_category": "" }, { "id": "0868-7383-54d2", "maker": "", "model": "", "x_maker": "", "x_model": "", "image_url_1": "", "image_url_2": "", "max_luggage": "", "min_luggage": "", "vehicle_class": "Business Sedan", "x_max_luggage": "", "x_min_luggage": "", "max_passengers": "", "min_passengers": "", "x_vehicle_class": "豪华5座", "vehicle_class_id": "2", "x_max_passengers": "", "x_min_passengers": "", "x_vehicle_category": "", "x_vehicle_class_id": "" }, { "id": "ec93-19a2-cb70", "maker": "", "model": "", "x_maker": "", "x_model": "", "image_url_1": "", "image_url_2": "", "max_luggage": "", "min_luggage": "", "vehicle_class": "Business Minivan", "x_max_luggage": "", "x_min_luggage": "", "max_passengers": "", "min_passengers": "", "x_vehicle_class": "豪华7座", "vehicle_class_id": "36", "x_max_passengers": "", "x_min_passengers": "", "x_vehicle_category": "", "x_vehicle_class_id": "" }, { "id": "e936-7626-9d60", "maker": "", "model": "", "x_maker": "", "x_model": "", "image_url_1": "", "image_url_2": "", "max_luggage": "", "min_luggage": 0, "max_passenger": "", "min_passenger": 1, "vehicle_class": "MPV-5", "x_max_luggage": "", "x_min_luggage": "", "x_vehicle_class": "商务7座", "vehicle_class_id": "3", "x_max_passengers": "", "x_min_passengers": "", "x_vehicle_category": "" }, { "id": "2e29-eba2-73f5", "maker": "", "model": "", "x_maker": "", "x_model": "", "image_url_1": "", "image_url_2": "", "max_luggage": "", "min_luggage": "", "vehicle_class": "Minibus-8", "x_max_luggage": "", "x_min_luggage": "", "max_passengers": "", "min_passengers": "", "x_vehicle_class": "8座小巴", "vehicle_class_id": "5", "x_max_passengers": "", "x_min_passengers": "", "x_vehicle_category": "", "x_vehicle_class_id": "" }, { "id": "2b6d-d409-b579", "maker": "", "model": "", "x_maker": "", "x_model": "", "image_url_1": "", "image_url_2": "", "max_luggage": "", "min_luggage": "", "vehicle_class": "Minibus-10", "x_max_luggage": "", "x_min_luggage": "", "max_passengers": "", "min_passengers": "", "x_vehicle_class": "9座小巴", "vehicle_class_id": "9", "x_max_passengers": "", "x_min_passengers": "", "x_vehicle_category": "", "x_vehicle_class_id": "" }, { "id": "1ee8-11fb-2b65", "maker": "", "model": "", "x_maker": "", "x_model": "", "image_url_1": "", "image_url_2": "", "max_luggage": "", "min_luggage": "", "vehicle_class": "Minibus-10", "x_max_luggage": "", "x_min_luggage": "", "max_passengers": "", "min_passengers": "", "x_vehicle_class": "10座小巴", "vehicle_class_id": "9", "x_max_passengers": "", "x_min_passengers": "", "x_vehicle_category": "", "x_vehicle_class_id": "" }, { "id": "3923-c745-1f4f", "maker": "", "model": "", "x_maker": "", "x_model": "", "image_url_1": "", "image_url_2": "", "max_luggage": "", "min_luggage": 0, "max_passenger": "", "min_passenger": 1, "vehicle_class": "Minibus-12", "x_max_luggage": "", "x_min_luggage": "", "x_vehicle_class": "12座小巴", "vehicle_class_id": "10", "x_max_passengers": "", "x_min_passengers": "", "x_vehicle_category": "" }, { "id": "da7e-a39f-a5e6", "maker": "", "model": "", "x_maker": "", "x_model": "", "image_url_1": "", "image_url_2": "", "max_luggage": "", "min_luggage": "", "vehicle_class": "Minibus-14", "x_max_luggage": "", "x_min_luggage": "", "max_passengers": "", "min_passengers": "", "x_vehicle_class": "14座中巴", "vehicle_class_id": "11", "x_max_passengers": "", "x_min_passengers": "", "x_vehicle_category": "", "x_vehicle_class_id": "" }, { "id": "bd6f-9bef-4431", "maker": "", "model": "", "x_maker": "", "x_model": "", "image_url_1": "", "image_url_2": "", "max_luggage": "", "min_luggage": 0, "max_passenger": "", "min_passenger": 1, "vehicle_class": "MPV-4", "x_max_luggage": "", "x_min_luggage": "", "x_vehicle_class": "舒适7座", "vehicle_class_id": "6", "x_max_passengers": "", "x_min_passengers": "", "x_vehicle_category": "" }]
  },
  {
    "country": "QAT",
    "json": [{ "id": "39f3-49d1-b23b", "maker": "", "model": "", "x_maker": "", "x_model": "", "image_url_1": "", "image_url_2": "", "max_luggage": "", "min_luggage": "", "vehicle_class": "Sedan", "x_max_luggage": "", "x_min_luggage": "", "max_passengers": "", "min_passengers": "", "x_vehicle_class": "紧凑5座", "vehicle_class_id": "1", "x_max_passengers": "", "x_min_passengers": "", "x_vehicle_category": "", "x_vehicle_class_id": "" }, { "id": "323d-474f-52e1", "maker": "", "model": "", "x_maker": "", "x_model": "", "image_url_1": "", "image_url_2": "", "max_luggage": "", "min_luggage": "", "vehicle_class": "Sedan", "x_max_luggage": "", "x_min_luggage": "", "max_passengers": "", "min_passengers": "", "x_vehicle_class": "经济5座", "vehicle_class_id": "1", "x_max_passengers": "", "x_min_passengers": "", "x_vehicle_category": "", "x_vehicle_class_id": "" }, { "id": "8122-8060-dcb6", "maker": "", "model": "", "x_maker": "", "x_model": "", "image_url_1": "", "image_url_2": "", "max_luggage": "", "min_luggage": 0, "max_passenger": "", "min_passenger": 1, "vehicle_class": "Comfort Sedan", "x_max_luggage": "", "x_min_luggage": "", "x_vehicle_class": "舒适5座", "vehicle_class_id": "12", "x_max_passengers": "", "x_min_passengers": "", "x_vehicle_category": "" }, { "id": "ef48-8d76-03ce", "maker": "", "model": "", "x_maker": "", "x_model": "", "image_url_1": "", "image_url_2": "", "max_luggage": "", "min_luggage": "", "vehicle_class": "Business Sedan", "x_max_luggage": "", "x_min_luggage": "", "max_passengers": "", "min_passengers": "", "x_vehicle_class": "豪华5座", "vehicle_class_id": "2", "x_max_passengers": "", "x_min_passengers": "", "x_vehicle_category": "", "x_vehicle_class_id": "" }, { "id": "b80f-91f4-b12a", "maker": "", "model": "", "x_maker": "", "x_model": "", "image_url_1": "", "image_url_2": "", "max_luggage": "", "min_luggage": "", "vehicle_class": "Business Minivan", "x_max_luggage": "", "x_min_luggage": "", "max_passengers": "", "min_passengers": "", "x_vehicle_class": "豪华7座", "vehicle_class_id": "36", "x_max_passengers": "", "x_min_passengers": "", "x_vehicle_category": "", "x_vehicle_class_id": "" }, { "id": "285d-eff4-0e70", "maker": "", "model": "", "x_maker": "", "x_model": "", "image_url_1": "", "image_url_2": "", "max_luggage": "", "min_luggage": 0, "max_passenger": "", "min_passenger": 1, "vehicle_class": "MPV-5", "x_max_luggage": "", "x_min_luggage": "", "x_vehicle_class": "商务7座", "vehicle_class_id": "3", "x_max_passengers": "", "x_min_passengers": "", "x_vehicle_category": "" }, { "id": "d8b6-75ba-0140", "maker": "", "model": "", "x_maker": "", "x_model": "", "image_url_1": "", "image_url_2": "", "max_luggage": "", "min_luggage": "", "vehicle_class": "Minibus-8", "x_max_luggage": "", "x_min_luggage": "", "max_passengers": "", "min_passengers": "", "x_vehicle_class": "8座小巴", "vehicle_class_id": "5", "x_max_passengers": "", "x_min_passengers": "", "x_vehicle_category": "", "x_vehicle_class_id": "" }, { "id": "ba73-4e92-3b7c", "maker": "", "model": "", "x_maker": "", "x_model": "", "image_url_1": "", "image_url_2": "", "max_luggage": "", "min_luggage": "", "vehicle_class": "Minibus-10", "x_max_luggage": "", "x_min_luggage": "", "max_passengers": "", "min_passengers": "", "x_vehicle_class": "9座小巴", "vehicle_class_id": "9", "x_max_passengers": "", "x_min_passengers": "", "x_vehicle_category": "", "x_vehicle_class_id": "" }, { "id": "7ce6-c835-1f96", "maker": "", "model": "", "x_maker": "", "x_model": "", "image_url_1": "", "image_url_2": "", "max_luggage": "", "min_luggage": "", "vehicle_class": "Minibus-10", "x_max_luggage": "", "x_min_luggage": "", "max_passengers": "", "min_passengers": "", "x_vehicle_class": "10座小巴", "vehicle_class_id": "9", "x_max_passengers": "", "x_min_passengers": "", "x_vehicle_category": "", "x_vehicle_class_id": "" }, { "id": "db26-d8cc-bb20", "maker": "", "model": "", "x_maker": "", "x_model": "", "image_url_1": "", "image_url_2": "", "max_luggage": "", "min_luggage": 0, "max_passenger": "", "min_passenger": 1, "vehicle_class": "Minibus-12", "x_max_luggage": "", "x_min_luggage": "", "x_vehicle_class": "12座小巴", "vehicle_class_id": "10", "x_max_passengers": "", "x_min_passengers": "", "x_vehicle_category": "" }, { "id": "834a-8fb9-0e34", "maker": "", "model": "", "x_maker": "", "x_model": "", "image_url_1": "", "image_url_2": "", "max_luggage": "", "min_luggage": "", "vehicle_class": "Minibus-14", "x_max_luggage": "", "x_min_luggage": "", "max_passengers": "", "min_passengers": "", "x_vehicle_class": "14座中巴", "vehicle_class_id": "11", "x_max_passengers": "", "x_min_passengers": "", "x_vehicle_category": "", "x_vehicle_class_id": "" }, { "id": "aa64-5946-6d15", "maker": "", "model": "", "x_maker": "", "x_model": "", "image_url_1": "", "image_url_2": "", "max_luggage": "", "min_luggage": 0, "max_passenger": "", "min_passenger": 1, "vehicle_class": "MPV-4", "x_max_luggage": "", "x_min_luggage": "", "x_vehicle_class": "舒适7座", "vehicle_class_id": "6", "x_max_passengers": "", "x_min_passengers": "", "x_vehicle_category": "" }]
  },
  {
    "country": "PHL",
    "json": [{ "id": "b5ee-d52f-3f56", "maker": "", "model": "", "x_maker": "", "x_model": "", "image_url_1": "", "image_url_2": "", "max_luggage": "", "min_luggage": "", "vehicle_class": "Sedan", "x_max_luggage": "", "x_min_luggage": "", "max_passengers": "", "min_passengers": "", "x_vehicle_class": "紧凑5座", "vehicle_class_id": "1", "x_max_passengers": "", "x_min_passengers": "", "x_vehicle_category": "", "x_vehicle_class_id": "" }, { "id": "c822-2375-2e9f", "maker": "", "model": "", "x_maker": "", "x_model": "", "image_url_1": "", "image_url_2": "", "max_luggage": "", "min_luggage": "", "vehicle_class": "Sedan", "x_max_luggage": "", "x_min_luggage": "", "max_passengers": "", "min_passengers": "", "x_vehicle_class": "经济5座", "vehicle_class_id": "1", "x_max_passengers": "", "x_min_passengers": "", "x_vehicle_category": "", "x_vehicle_class_id": "" }, { "id": "fa0d-00b5-bd1c", "maker": "", "model": "", "x_maker": "", "x_model": "", "image_url_1": "", "image_url_2": "", "max_luggage": "", "min_luggage": "", "vehicle_class": "MPV-4", "x_max_luggage": "", "x_min_luggage": "", "max_passengers": "", "min_passengers": "", "x_vehicle_class": "舒适5座", "vehicle_class_id": "6", "x_max_passengers": "", "x_min_passengers": "", "x_vehicle_category": "", "x_vehicle_class_id": "" }, { "id": "364b-bbba-9a4b", "maker": "", "model": "", "x_maker": "", "x_model": "", "image_url_1": "", "image_url_2": "", "max_luggage": "", "min_luggage": "", "vehicle_class": "Business Sedan", "x_max_luggage": "", "x_min_luggage": "", "max_passengers": "", "min_passengers": "", "x_vehicle_class": "豪华5座", "vehicle_class_id": "2", "x_max_passengers": "", "x_min_passengers": "", "x_vehicle_category": "", "x_vehicle_class_id": "" }, { "id": "7688-932c-7921", "maker": "", "model": "", "x_maker": "", "x_model": "", "image_url_1": "", "image_url_2": "", "max_luggage": "", "min_luggage": "", "vehicle_class": "MPV-5", "x_max_luggage": "", "x_min_luggage": "", "max_passengers": "", "min_passengers": "", "x_vehicle_class": "舒适7座", "vehicle_class_id": "3", "x_max_passengers": "", "x_min_passengers": "", "x_vehicle_category": "", "x_vehicle_class_id": "" }, { "id": "7fc6-48ff-e2a7", "maker": "", "model": "", "x_maker": "", "x_model": "", "image_url_1": "", "image_url_2": "", "max_luggage": "", "min_luggage": "", "vehicle_class": "Business Minivan", "x_max_luggage": "", "x_min_luggage": "", "max_passengers": "", "min_passengers": "", "x_vehicle_class": "豪华7座", "vehicle_class_id": "36", "x_max_passengers": "", "x_min_passengers": "", "x_vehicle_category": "", "x_vehicle_class_id": "" }, { "id": "0eae-26df-2f89", "maker": "", "model": "", "x_maker": "", "x_model": "", "image_url_1": "", "image_url_2": "", "max_luggage": "", "min_luggage": "", "vehicle_class": "Business SUV", "x_max_luggage": "", "x_min_luggage": "", "max_passengers": "", "min_passengers": "", "x_vehicle_class": "商务7座", "vehicle_class_id": "4", "x_max_passengers": "", "x_min_passengers": "", "x_vehicle_category": "", "x_vehicle_class_id": "" }, { "id": "2ce2-794b-2ff9", "maker": "", "model": "", "x_maker": "", "x_model": "", "image_url_1": "", "image_url_2": "", "max_luggage": "", "min_luggage": "", "vehicle_class": "Minibus-14", "x_max_luggage": "", "x_min_luggage": "", "max_passengers": "", "min_passengers": "", "x_vehicle_class": "14座中巴", "vehicle_class_id": "11", "x_max_passengers": "", "x_min_passengers": "", "x_vehicle_category": "", "x_vehicle_class_id": "" }, { "id": "faf6-a100-78a0", "maker": "", "model": "", "x_maker": "", "x_model": "", "image_url_1": "", "image_url_2": "", "max_luggage": "", "min_luggage": 0, "max_passenger": "", "min_passenger": 1, "vehicle_class": "Minibus-8", "x_max_luggage": "", "x_min_luggage": "", "x_vehicle_class": "8座小巴", "vehicle_class_id": "5", "x_max_passengers": "", "x_min_passengers": "", "x_vehicle_category": "" }, { "id": "c50d-3e10-619e", "maker": "", "model": "", "x_maker": "", "x_model": "", "image_url_1": "", "image_url_2": "", "max_luggage": "", "min_luggage": 0, "max_passenger": "", "min_passenger": 1, "vehicle_class": "Minibus-8", "x_max_luggage": "", "x_min_luggage": "", "x_vehicle_class": "9座小巴", "vehicle_class_id": "5", "x_max_passengers": "", "x_min_passengers": "", "x_vehicle_category": "" }, { "id": "77e1-5318-66a3", "maker": "", "model": "", "x_maker": "", "x_model": "", "image_url_1": "", "image_url_2": "", "max_luggage": "", "min_luggage": 0, "max_passenger": "", "min_passenger": 1, "vehicle_class": "Minibus-10", "x_max_luggage": "", "x_min_luggage": "", "x_vehicle_class": "10座小巴", "vehicle_class_id": "9", "x_max_passengers": "", "x_min_passengers": "", "x_vehicle_category": "" }, { "id": "6a08-447c-f651", "maker": "", "model": "", "x_maker": "", "x_model": "", "image_url_1": "", "image_url_2": "", "max_luggage": "", "min_luggage": 0, "max_passenger": "", "min_passenger": 1, "vehicle_class": "Minibus-12", "x_max_luggage": "", "x_min_luggage": "", "x_vehicle_class": "12座小巴", "vehicle_class_id": "10", "x_max_passengers": "", "x_min_passengers": "", "x_vehicle_category": "" }]
  },
  {
    "country": "OMN",
    "json": [{ "id": "e62f-2bf9-cecb", "maker": "", "model": "", "x_maker": "", "x_model": "", "image_url_1": "", "image_url_2": "", "max_luggage": "", "min_luggage": "", "vehicle_class": "Sedan", "x_max_luggage": "", "x_min_luggage": "", "max_passengers": "", "min_passengers": "", "x_vehicle_class": "紧凑5座", "vehicle_class_id": "1", "x_max_passengers": "", "x_min_passengers": "", "x_vehicle_category": "", "x_vehicle_class_id": "" }, { "id": "ceb6-b9e1-7a79", "maker": "", "model": "", "x_maker": "", "x_model": "", "image_url_1": "", "image_url_2": "", "max_luggage": "", "min_luggage": "", "vehicle_class": "Sedan", "x_max_luggage": "", "x_min_luggage": "", "max_passengers": "", "min_passengers": "", "x_vehicle_class": "经济5座", "vehicle_class_id": "1", "x_max_passengers": "", "x_min_passengers": "", "x_vehicle_category": "", "x_vehicle_class_id": "" }, { "id": "e2c0-3405-dff1", "maker": "", "model": "", "x_maker": "", "x_model": "", "image_url_1": "", "image_url_2": "", "max_luggage": "", "min_luggage": 0, "max_passenger": "", "min_passenger": 1, "vehicle_class": "Comfort Sedan", "x_max_luggage": "", "x_min_luggage": "", "x_vehicle_class": "舒适5座", "vehicle_class_id": "12", "x_max_passengers": "", "x_min_passengers": "", "x_vehicle_category": "" }, { "id": "d0ff-c343-dd95", "maker": "", "model": "", "x_maker": "", "x_model": "", "image_url_1": "", "image_url_2": "", "max_luggage": "", "min_luggage": "", "vehicle_class": "Business Sedan", "x_max_luggage": "", "x_min_luggage": "", "max_passengers": "", "min_passengers": "", "x_vehicle_class": "豪华5座", "vehicle_class_id": "2", "x_max_passengers": "", "x_min_passengers": "", "x_vehicle_category": "", "x_vehicle_class_id": "" }, { "id": "1635-6ed1-c9b9", "maker": "", "model": "", "x_maker": "", "x_model": "", "image_url_1": "", "image_url_2": "", "max_luggage": "", "min_luggage": "", "vehicle_class": "Business Minivan", "x_max_luggage": "", "x_min_luggage": "", "max_passengers": "", "min_passengers": "", "x_vehicle_class": "豪华7座", "vehicle_class_id": "36", "x_max_passengers": "", "x_min_passengers": "", "x_vehicle_category": "", "x_vehicle_class_id": "" }, { "id": "0e94-5394-018a", "maker": "", "model": "", "x_maker": "", "x_model": "", "image_url_1": "", "image_url_2": "", "max_luggage": "", "min_luggage": 0, "max_passenger": "", "min_passenger": 1, "vehicle_class": "MPV-5", "x_max_luggage": "", "x_min_luggage": "", "x_vehicle_class": "商务7座", "vehicle_class_id": "3", "x_max_passengers": "", "x_min_passengers": "", "x_vehicle_category": "" }, { "id": "b3ce-93f3-9755", "maker": "", "model": "", "x_maker": "", "x_model": "", "image_url_1": "", "image_url_2": "", "max_luggage": "", "min_luggage": "", "vehicle_class": "Minibus-8", "x_max_luggage": "", "x_min_luggage": "", "max_passengers": "", "min_passengers": "", "x_vehicle_class": "8座小巴", "vehicle_class_id": "5", "x_max_passengers": "", "x_min_passengers": "", "x_vehicle_category": "", "x_vehicle_class_id": "" }, { "id": "0925-2b13-727e", "maker": "", "model": "", "x_maker": "", "x_model": "", "image_url_1": "", "image_url_2": "", "max_luggage": "", "min_luggage": "", "vehicle_class": "Minibus-10", "x_max_luggage": "", "x_min_luggage": "", "max_passengers": "", "min_passengers": "", "x_vehicle_class": "9座小巴", "vehicle_class_id": "9", "x_max_passengers": "", "x_min_passengers": "", "x_vehicle_category": "", "x_vehicle_class_id": "" }, { "id": "2331-ba2c-dabe", "maker": "", "model": "", "x_maker": "", "x_model": "", "image_url_1": "", "image_url_2": "", "max_luggage": "", "min_luggage": "", "vehicle_class": "Minibus-10", "x_max_luggage": "", "x_min_luggage": "", "max_passengers": "", "min_passengers": "", "x_vehicle_class": "10座小巴", "vehicle_class_id": "9", "x_max_passengers": "", "x_min_passengers": "", "x_vehicle_category": "", "x_vehicle_class_id": "" }, { "id": "664a-3456-bd08", "maker": "", "model": "", "x_maker": "", "x_model": "", "image_url_1": "", "image_url_2": "", "max_luggage": "", "min_luggage": 0, "max_passenger": "", "min_passenger": 1, "vehicle_class": "Minibus-12", "x_max_luggage": "", "x_min_luggage": "", "x_vehicle_class": "12座小巴", "vehicle_class_id": "10", "x_max_passengers": "", "x_min_passengers": "", "x_vehicle_category": "" }, { "id": "66ee-61ba-0184", "maker": "", "model": "", "x_maker": "", "x_model": "", "image_url_1": "", "image_url_2": "", "max_luggage": "", "min_luggage": "", "vehicle_class": "Minibus-14", "x_max_luggage": "", "x_min_luggage": "", "max_passengers": "", "min_passengers": "", "x_vehicle_class": "14座中巴", "vehicle_class_id": "11", "x_max_passengers": "", "x_min_passengers": "", "x_vehicle_category": "", "x_vehicle_class_id": "" }, { "id": "50ea-36bb-a133", "maker": "", "model": "", "x_maker": "", "x_model": "", "image_url_1": "", "image_url_2": "", "max_luggage": "", "min_luggage": 0, "max_passenger": "", "min_passenger": 1, "vehicle_class": "MPV-4", "x_max_luggage": "", "x_min_luggage": "", "x_vehicle_class": "舒适7座", "vehicle_class_id": "6", "x_max_passengers": "", "x_min_passengers": "", "x_vehicle_category": "" }]
  },
  {
    "country": "MUS",
    "json": [{ "id": "1d09-580f-33a4", "maker": "", "model": "", "x_maker": "", "x_model": "", "image_url_1": "", "image_url_2": "", "max_luggage": "", "min_luggage": "", "vehicle_class": "Sedan", "x_max_luggage": "", "x_min_luggage": "", "max_passengers": "", "min_passengers": "", "x_vehicle_class": "紧凑5座", "vehicle_class_id": "1", "x_max_passengers": "", "x_min_passengers": "", "x_vehicle_category": "", "x_vehicle_class_id": "" }, { "id": "a9e9-72d5-2406", "maker": "", "model": "", "x_maker": "", "x_model": "", "image_url_1": "", "image_url_2": "", "max_luggage": "", "min_luggage": "", "vehicle_class": "Sedan", "x_max_luggage": "", "x_min_luggage": "", "max_passengers": "", "min_passengers": "", "x_vehicle_class": "经济5座", "vehicle_class_id": "1", "x_max_passengers": "", "x_min_passengers": "", "x_vehicle_category": "", "x_vehicle_class_id": "" }, { "id": "7e84-1b18-b11f", "maker": "", "model": "", "x_maker": "", "x_model": "", "image_url_1": "", "image_url_2": "", "max_luggage": "", "min_luggage": 0, "max_passenger": "", "min_passenger": 1, "vehicle_class": "Comfort Sedan", "x_max_luggage": "", "x_min_luggage": "", "x_vehicle_class": "舒适5座", "vehicle_class_id": "12", "x_max_passengers": "", "x_min_passengers": "", "x_vehicle_category": "" }, { "id": "4baa-2a7f-0efa", "maker": "", "model": "", "x_maker": "", "x_model": "", "image_url_1": "", "image_url_2": "", "max_luggage": "", "min_luggage": "", "vehicle_class": "Business Sedan", "x_max_luggage": "", "x_min_luggage": "", "max_passengers": "", "min_passengers": "", "x_vehicle_class": "豪华5座", "vehicle_class_id": "2", "x_max_passengers": "", "x_min_passengers": "", "x_vehicle_category": "", "x_vehicle_class_id": "" }, { "id": "c446-0b01-0ccd", "maker": "", "model": "", "x_maker": "", "x_model": "", "image_url_1": "", "image_url_2": "", "max_luggage": "", "min_luggage": "", "vehicle_class": "Business Minivan", "x_max_luggage": "", "x_min_luggage": "", "max_passengers": "", "min_passengers": "", "x_vehicle_class": "豪华7座", "vehicle_class_id": "36", "x_max_passengers": "", "x_min_passengers": "", "x_vehicle_category": "", "x_vehicle_class_id": "" }, { "id": "a448-e7a6-b48b", "maker": "", "model": "", "x_maker": "", "x_model": "", "image_url_1": "", "image_url_2": "", "max_luggage": "", "min_luggage": 0, "max_passenger": "", "min_passenger": 1, "vehicle_class": "MPV-5", "x_max_luggage": "", "x_min_luggage": "", "x_vehicle_class": "商务7座", "vehicle_class_id": "3", "x_max_passengers": "", "x_min_passengers": "", "x_vehicle_category": "" }, { "id": "6cfa-d564-ae94", "maker": "", "model": "", "x_maker": "", "x_model": "", "image_url_1": "", "image_url_2": "", "max_luggage": "", "min_luggage": "", "vehicle_class": "Minibus-8", "x_max_luggage": "", "x_min_luggage": "", "max_passengers": "", "min_passengers": "", "x_vehicle_class": "8座小巴", "vehicle_class_id": "5", "x_max_passengers": "", "x_min_passengers": "", "x_vehicle_category": "", "x_vehicle_class_id": "" }, { "id": "7152-738b-87d5", "maker": "", "model": "", "x_maker": "", "x_model": "", "image_url_1": "", "image_url_2": "", "max_luggage": "", "min_luggage": "", "vehicle_class": "Minibus-10", "x_max_luggage": "", "x_min_luggage": "", "max_passengers": "", "min_passengers": "", "x_vehicle_class": "9座小巴", "vehicle_class_id": "9", "x_max_passengers": "", "x_min_passengers": "", "x_vehicle_category": "", "x_vehicle_class_id": "" }, { "id": "1208-fea1-05b2", "maker": "", "model": "", "x_maker": "", "x_model": "", "image_url_1": "", "image_url_2": "", "max_luggage": "", "min_luggage": "", "vehicle_class": "Minibus-10", "x_max_luggage": "", "x_min_luggage": "", "max_passengers": "", "min_passengers": "", "x_vehicle_class": "10座小巴", "vehicle_class_id": "9", "x_max_passengers": "", "x_min_passengers": "", "x_vehicle_category": "", "x_vehicle_class_id": "" }, { "id": "21c1-1d36-1a13", "maker": "", "model": "", "x_maker": "", "x_model": "", "image_url_1": "", "image_url_2": "", "max_luggage": "", "min_luggage": 0, "max_passenger": "", "min_passenger": 1, "vehicle_class": "Minibus-12", "x_max_luggage": "", "x_min_luggage": "", "x_vehicle_class": "12座小巴", "vehicle_class_id": "10", "x_max_passengers": "", "x_min_passengers": "", "x_vehicle_category": "" }, { "id": "d55e-c3f4-eabe", "maker": "", "model": "", "x_maker": "", "x_model": "", "image_url_1": "", "image_url_2": "", "max_luggage": "", "min_luggage": "", "vehicle_class": "Minibus-14", "x_max_luggage": "", "x_min_luggage": "", "max_passengers": "", "min_passengers": "", "x_vehicle_class": "14座中巴", "vehicle_class_id": "11", "x_max_passengers": "", "x_min_passengers": "", "x_vehicle_category": "", "x_vehicle_class_id": "" }, { "id": "9a76-8a75-6e87", "maker": "", "model": "", "x_maker": "", "x_model": "", "image_url_1": "", "image_url_2": "", "max_luggage": "", "min_luggage": 0, "max_passenger": "", "min_passenger": 1, "vehicle_class": "MPV-4", "x_max_luggage": "", "x_min_luggage": "", "x_vehicle_class": "舒适7座", "vehicle_class_id": "6", "x_max_passengers": "", "x_min_passengers": "", "x_vehicle_category": "" }]
  },
  {
    "country": "MNG",
    "json": [{ "id": "25b3-4240-b599", "maker": "", "model": "", "x_maker": "", "x_model": "", "image_url_1": "", "image_url_2": "", "max_luggage": "", "min_luggage": "", "vehicle_class": "Sedan", "x_max_luggage": "", "x_min_luggage": "", "max_passengers": "", "min_passengers": "", "x_vehicle_class": "紧凑5座", "vehicle_class_id": "1", "x_max_passengers": "", "x_min_passengers": "", "x_vehicle_category": "", "x_vehicle_class_id": "" }, { "id": "b28f-7064-1ba2", "maker": "", "model": "", "x_maker": "", "x_model": "", "image_url_1": "", "image_url_2": "", "max_luggage": "", "min_luggage": "", "vehicle_class": "Sedan", "x_max_luggage": "", "x_min_luggage": "", "max_passengers": "", "min_passengers": "", "x_vehicle_class": "经济5座", "vehicle_class_id": "1", "x_max_passengers": "", "x_min_passengers": "", "x_vehicle_category": "", "x_vehicle_class_id": "" }, { "id": "5a4a-abbd-964d", "maker": "", "model": "", "x_maker": "", "x_model": "", "image_url_1": "", "image_url_2": "", "max_luggage": "", "min_luggage": 0, "max_passenger": "", "min_passenger": 1, "vehicle_class": "Comfort Sedan", "x_max_luggage": "", "x_min_luggage": "", "x_vehicle_class": "舒适5座", "vehicle_class_id": "12", "x_max_passengers": "", "x_min_passengers": "", "x_vehicle_category": "" }, { "id": "10dd-9a05-392d", "maker": "", "model": "", "x_maker": "", "x_model": "", "image_url_1": "", "image_url_2": "", "max_luggage": "", "min_luggage": "", "vehicle_class": "Business Sedan", "x_max_luggage": "", "x_min_luggage": "", "max_passengers": "", "min_passengers": "", "x_vehicle_class": "豪华5座", "vehicle_class_id": "2", "x_max_passengers": "", "x_min_passengers": "", "x_vehicle_category": "", "x_vehicle_class_id": "" }, { "id": "ff34-3c31-d6f7", "maker": "", "model": "", "x_maker": "", "x_model": "", "image_url_1": "", "image_url_2": "", "max_luggage": "", "min_luggage": "", "vehicle_class": "Business Minivan", "x_max_luggage": "", "x_min_luggage": "", "max_passengers": "", "min_passengers": "", "x_vehicle_class": "豪华7座", "vehicle_class_id": "36", "x_max_passengers": "", "x_min_passengers": "", "x_vehicle_category": "", "x_vehicle_class_id": "" }, { "id": "b8d4-b9bc-0e29", "maker": "", "model": "", "x_maker": "", "x_model": "", "image_url_1": "", "image_url_2": "", "max_luggage": "", "min_luggage": 0, "max_passenger": "", "min_passenger": 1, "vehicle_class": "MPV-5", "x_max_luggage": "", "x_min_luggage": "", "x_vehicle_class": "商务7座", "vehicle_class_id": "3", "x_max_passengers": "", "x_min_passengers": "", "x_vehicle_category": "" }, { "id": "3b86-8ed5-6fcc", "maker": "", "model": "", "x_maker": "", "x_model": "", "image_url_1": "", "image_url_2": "", "max_luggage": "", "min_luggage": "", "vehicle_class": "Minibus-8", "x_max_luggage": "", "x_min_luggage": "", "max_passengers": "", "min_passengers": "", "x_vehicle_class": "8座小巴", "vehicle_class_id": "5", "x_max_passengers": "", "x_min_passengers": "", "x_vehicle_category": "", "x_vehicle_class_id": "" }, { "id": "5a7b-0364-d657", "maker": "", "model": "", "x_maker": "", "x_model": "", "image_url_1": "", "image_url_2": "", "max_luggage": "", "min_luggage": "", "vehicle_class": "Minibus-10", "x_max_luggage": "", "x_min_luggage": "", "max_passengers": "", "min_passengers": "", "x_vehicle_class": "9座小巴", "vehicle_class_id": "9", "x_max_passengers": "", "x_min_passengers": "", "x_vehicle_category": "", "x_vehicle_class_id": "" }, { "id": "3e83-8dd3-4f93", "maker": "", "model": "", "x_maker": "", "x_model": "", "image_url_1": "", "image_url_2": "", "max_luggage": "", "min_luggage": "", "vehicle_class": "Minibus-10", "x_max_luggage": "", "x_min_luggage": "", "max_passengers": "", "min_passengers": "", "x_vehicle_class": "10座小巴", "vehicle_class_id": "9", "x_max_passengers": "", "x_min_passengers": "", "x_vehicle_category": "", "x_vehicle_class_id": "" }, { "id": "34ab-4da3-2206", "maker": "", "model": "", "x_maker": "", "x_model": "", "image_url_1": "", "image_url_2": "", "max_luggage": "", "min_luggage": 0, "max_passenger": "", "min_passenger": 1, "vehicle_class": "Minibus-12", "x_max_luggage": "", "x_min_luggage": "", "x_vehicle_class": "12座小巴", "vehicle_class_id": "10", "x_max_passengers": "", "x_min_passengers": "", "x_vehicle_category": "" }, { "id": "c3b6-f968-6d90", "maker": "", "model": "", "x_maker": "", "x_model": "", "image_url_1": "", "image_url_2": "", "max_luggage": "", "min_luggage": "", "vehicle_class": "Minibus-14", "x_max_luggage": "", "x_min_luggage": "", "max_passengers": "", "min_passengers": "", "x_vehicle_class": "14座中巴", "vehicle_class_id": "11", "x_max_passengers": "", "x_min_passengers": "", "x_vehicle_category": "", "x_vehicle_class_id": "" }, { "id": "7cb0-a184-893c", "maker": "", "model": "", "x_maker": "", "x_model": "", "image_url_1": "", "image_url_2": "", "max_luggage": "", "min_luggage": 0, "max_passenger": "", "min_passenger": 1, "vehicle_class": "MPV-4", "x_max_luggage": "", "x_min_luggage": "", "x_vehicle_class": "舒适7座", "vehicle_class_id": "6", "x_max_passengers": "", "x_min_passengers": "", "x_vehicle_category": "" }]
  },
  {
    "country": "LKA",
    "json": [{ "id": "a7ac-6228-d103", "maker": "", "model": "", "x_maker": "", "x_model": "", "image_url_1": "", "image_url_2": "", "max_luggage": "", "min_luggage": "", "vehicle_class": "Sedan", "x_max_luggage": "", "x_min_luggage": "", "max_passengers": "", "min_passengers": "", "x_vehicle_class": "紧凑5座", "vehicle_class_id": "1", "x_max_passengers": "", "x_min_passengers": "", "x_vehicle_category": "", "x_vehicle_class_id": "" }, { "id": "d20f-610b-68e1", "maker": "", "model": "", "x_maker": "", "x_model": "", "image_url_1": "", "image_url_2": "", "max_luggage": "", "min_luggage": "", "vehicle_class": "Sedan", "x_max_luggage": "", "x_min_luggage": "", "max_passengers": "", "min_passengers": "", "x_vehicle_class": "经济5座", "vehicle_class_id": "1", "x_max_passengers": "", "x_min_passengers": "", "x_vehicle_category": "", "x_vehicle_class_id": "" }, { "id": "f6fe-6eaa-9860", "maker": "", "model": "", "x_maker": "", "x_model": "", "image_url_1": "", "image_url_2": "", "max_luggage": "", "min_luggage": 0, "max_passenger": "", "min_passenger": 1, "vehicle_class": "Comfort Sedan", "x_max_luggage": "", "x_min_luggage": "", "x_vehicle_class": "舒适5座", "vehicle_class_id": "12", "x_max_passengers": "", "x_min_passengers": "", "x_vehicle_category": "" }, { "id": "764f-d64a-d605", "maker": "", "model": "", "x_maker": "", "x_model": "", "image_url_1": "", "image_url_2": "", "max_luggage": "", "min_luggage": "", "vehicle_class": "Business Sedan", "x_max_luggage": "", "x_min_luggage": "", "max_passengers": "", "min_passengers": "", "x_vehicle_class": "豪华5座", "vehicle_class_id": "2", "x_max_passengers": "", "x_min_passengers": "", "x_vehicle_category": "", "x_vehicle_class_id": "" }, { "id": "bc1c-233e-c734", "maker": "", "model": "", "x_maker": "", "x_model": "", "image_url_1": "", "image_url_2": "", "max_luggage": "", "min_luggage": 0, "max_passenger": "", "min_passenger": 1, "vehicle_class": "MPV-4", "x_max_luggage": "", "x_min_luggage": "", "x_vehicle_class": "舒适7座", "vehicle_class_id": "6", "x_max_passengers": "", "x_min_passengers": "", "x_vehicle_category": "" }, { "id": "0a13-01d8-f08b", "maker": "", "model": "", "x_maker": "", "x_model": "", "image_url_1": "", "image_url_2": "", "max_luggage": "", "min_luggage": "", "vehicle_class": "Business Minivan", "x_max_luggage": "", "x_min_luggage": "", "max_passengers": "", "min_passengers": "", "x_vehicle_class": "豪华7座", "vehicle_class_id": "36", "x_max_passengers": "", "x_min_passengers": "", "x_vehicle_category": "", "x_vehicle_class_id": "" }, { "id": "d294-5cea-a5bd", "maker": "", "model": "", "x_maker": "", "x_model": "", "image_url_1": "", "image_url_2": "", "max_luggage": "", "min_luggage": 0, "max_passenger": "", "min_passenger": 1, "vehicle_class": "MPV-5", "x_max_luggage": "", "x_min_luggage": "", "x_vehicle_class": "商务7座", "vehicle_class_id": "3", "x_max_passengers": "", "x_min_passengers": "", "x_vehicle_category": "" }, { "id": "aa92-29ce-41fa", "maker": "", "model": "", "x_maker": "", "x_model": "", "image_url_1": "", "image_url_2": "", "max_luggage": "", "min_luggage": "", "vehicle_class": "Minibus-14", "x_max_luggage": "", "x_min_luggage": "", "max_passengers": "", "min_passengers": "", "x_vehicle_class": "14座中巴", "vehicle_class_id": "11", "x_max_passengers": "", "x_min_passengers": "", "x_vehicle_category": "", "x_vehicle_class_id": "" }, { "id": "9bec-4508-dbd2", "maker": "", "model": "", "x_maker": "", "x_model": "", "image_url_1": "", "image_url_2": "", "max_luggage": "", "min_luggage": 0, "max_passenger": "", "min_passenger": 1, "vehicle_class": "Minibus-8", "x_max_luggage": "", "x_min_luggage": "", "x_vehicle_class": "8座小巴", "vehicle_class_id": "5", "x_max_passengers": "", "x_min_passengers": "", "x_vehicle_category": "" }, { "id": "247d-462a-3947", "maker": "", "model": "", "x_maker": "", "x_model": "", "image_url_1": "", "image_url_2": "", "max_luggage": "", "min_luggage": 0, "max_passenger": "", "min_passenger": 1, "vehicle_class": "Minibus-10", "x_max_luggage": "", "x_min_luggage": "", "x_vehicle_class": "9座小巴", "vehicle_class_id": "9", "x_max_passengers": "", "x_min_passengers": "", "x_vehicle_category": "" }, { "id": "1a8c-2442-42a5", "maker": "", "model": "", "x_maker": "", "x_model": "", "image_url_1": "", "image_url_2": "", "max_luggage": "", "min_luggage": 0, "max_passenger": "", "min_passenger": 1, "vehicle_class": "Minibus-10", "x_max_luggage": "", "x_min_luggage": "", "x_vehicle_class": "10座小巴", "vehicle_class_id": "9", "x_max_passengers": "", "x_min_passengers": "", "x_vehicle_category": "" }, { "id": "b2e6-21f3-14e9", "maker": "", "model": "", "x_maker": "", "x_model": "", "image_url_1": "", "image_url_2": "", "max_luggage": "", "min_luggage": 0, "max_passenger": "", "min_passenger": 1, "vehicle_class": "Minibus-12", "x_max_luggage": "", "x_min_luggage": "", "x_vehicle_class": "12座小巴", "vehicle_class_id": "10", "x_max_passengers": "", "x_min_passengers": "", "x_vehicle_category": "" }, { "id": "348e-827c-1ee7", "maker": "", "model": "", "x_maker": "", "x_model": "", "image_url_1": "", "image_url_2": "", "max_luggage": "", "min_luggage": 0, "max_passenger": "", "min_passenger": 1, "vehicle_class": "Minibus-14", "x_max_luggage": "", "x_min_luggage": "", "x_vehicle_class": "14座中巴", "vehicle_class_id": "11", "x_max_passengers": "", "x_min_passengers": "", "x_vehicle_category": "" }]
  },
  {
    "country": "LAO",
    "json": [{ "id": "d8f3-ec52-7d43", "maker": "", "model": "", "x_maker": "", "x_model": "", "image_url_1": "", "image_url_2": "", "max_luggage": "", "min_luggage": "", "vehicle_class": "Sedan", "x_max_luggage": "", "x_min_luggage": "", "max_passengers": "", "min_passengers": "", "x_vehicle_class": "紧凑5座", "vehicle_class_id": "1", "x_max_passengers": "", "x_min_passengers": "", "x_vehicle_category": "", "x_vehicle_class_id": "" }, { "id": "50f7-719d-63c4", "maker": "", "model": "", "x_maker": "", "x_model": "", "image_url_1": "", "image_url_2": "", "max_luggage": "", "min_luggage": "", "vehicle_class": "Sedan", "x_max_luggage": "", "x_min_luggage": "", "max_passengers": "", "min_passengers": "", "x_vehicle_class": "经济5座", "vehicle_class_id": "1", "x_max_passengers": "", "x_min_passengers": "", "x_vehicle_category": "", "x_vehicle_class_id": "" }, { "id": "49c4-a3b9-4d74", "maker": "", "model": "", "x_maker": "", "x_model": "", "image_url_1": "", "image_url_2": "", "max_luggage": "", "min_luggage": "", "vehicle_class": "MPV-4", "x_max_luggage": "", "x_min_luggage": "", "max_passengers": "", "min_passengers": "", "x_vehicle_class": "舒适5座", "vehicle_class_id": "6", "x_max_passengers": "", "x_min_passengers": "", "x_vehicle_category": "", "x_vehicle_class_id": "" }, { "id": "51b2-8566-2fbb", "maker": "", "model": "", "x_maker": "", "x_model": "", "image_url_1": "", "image_url_2": "", "max_luggage": "", "min_luggage": "", "vehicle_class": "Business Sedan", "x_max_luggage": "", "x_min_luggage": "", "max_passengers": "", "min_passengers": "", "x_vehicle_class": "豪华5座", "vehicle_class_id": "2", "x_max_passengers": "", "x_min_passengers": "", "x_vehicle_category": "", "x_vehicle_class_id": "" }, { "id": "1665-6c40-a67c", "maker": "", "model": "", "x_maker": "", "x_model": "", "image_url_1": "", "image_url_2": "", "max_luggage": "", "min_luggage": "", "vehicle_class": "MPV-5", "x_max_luggage": "", "x_min_luggage": "", "max_passengers": "", "min_passengers": "", "x_vehicle_class": "舒适7座", "vehicle_class_id": "3", "x_max_passengers": "", "x_min_passengers": "", "x_vehicle_category": "", "x_vehicle_class_id": "" }, { "id": "9ab0-cfda-819d", "maker": "", "model": "", "x_maker": "", "x_model": "", "image_url_1": "", "image_url_2": "", "max_luggage": "", "min_luggage": "", "vehicle_class": "Business Minivan", "x_max_luggage": "", "x_min_luggage": "", "max_passengers": "", "min_passengers": "", "x_vehicle_class": "豪华7座", "vehicle_class_id": "36", "x_max_passengers": "", "x_min_passengers": "", "x_vehicle_category": "", "x_vehicle_class_id": "" }, { "id": "b63a-b4d4-a01c", "maker": "", "model": "", "x_maker": "", "x_model": "", "image_url_1": "", "image_url_2": "", "max_luggage": "", "min_luggage": "", "vehicle_class": "Business SUV", "x_max_luggage": "", "x_min_luggage": "", "max_passengers": "", "min_passengers": "", "x_vehicle_class": "商务7座", "vehicle_class_id": "4", "x_max_passengers": "", "x_min_passengers": "", "x_vehicle_category": "", "x_vehicle_class_id": "" }, { "id": "a68f-5234-ea89", "maker": "", "model": "", "x_maker": "", "x_model": "", "image_url_1": "", "image_url_2": "", "max_luggage": "", "min_luggage": "", "vehicle_class": "Minibus-14", "x_max_luggage": "", "x_min_luggage": "", "max_passengers": "", "min_passengers": "", "x_vehicle_class": "14座中巴", "vehicle_class_id": "11", "x_max_passengers": "", "x_min_passengers": "", "x_vehicle_category": "", "x_vehicle_class_id": "" }, { "id": "4314-b618-8d4e", "maker": "", "model": "", "x_maker": "", "x_model": "", "image_url_1": "", "image_url_2": "", "max_luggage": "", "min_luggage": 0, "max_passenger": "", "min_passenger": 1, "vehicle_class": "Minibus-8", "x_max_luggage": "", "x_min_luggage": "", "x_vehicle_class": "8座小巴", "vehicle_class_id": "5", "x_max_passengers": "", "x_min_passengers": "", "x_vehicle_category": "" }, { "id": "cdff-f81b-f15d", "maker": "", "model": "", "x_maker": "", "x_model": "", "image_url_1": "", "image_url_2": "", "max_luggage": "", "min_luggage": 0, "max_passenger": "", "min_passenger": 1, "vehicle_class": "Minibus-8", "x_max_luggage": "", "x_min_luggage": "", "x_vehicle_class": "9座小巴", "vehicle_class_id": "5", "x_max_passengers": "", "x_min_passengers": "", "x_vehicle_category": "" }, { "id": "e6c7-3f4a-041a", "maker": "", "model": "", "x_maker": "", "x_model": "", "image_url_1": "", "image_url_2": "", "max_luggage": "", "min_luggage": 0, "max_passenger": "", "min_passenger": 1, "vehicle_class": "Minibus-10", "x_max_luggage": "", "x_min_luggage": "", "x_vehicle_class": "10座小巴", "vehicle_class_id": "9", "x_max_passengers": "", "x_min_passengers": "", "x_vehicle_category": "" }, { "id": "92eb-a9f0-48bf", "maker": "", "model": "", "x_maker": "", "x_model": "", "image_url_1": "", "image_url_2": "", "max_luggage": "", "min_luggage": 0, "max_passenger": "", "min_passenger": 1, "vehicle_class": "Minibus-12", "x_max_luggage": "", "x_min_luggage": "", "x_vehicle_class": "12座小巴", "vehicle_class_id": "10", "x_max_passengers": "", "x_min_passengers": "", "x_vehicle_category": "" }, { "id": "119f-ab16-1a2b", "maker": "", "model": "", "x_maker": "", "x_model": "", "image_url_1": "", "image_url_2": "", "max_luggage": "", "min_luggage": 0, "max_passenger": "", "min_passenger": 1, "vehicle_class": "Minibus-14", "x_max_luggage": "", "x_min_luggage": "", "x_vehicle_class": "14座中巴", "vehicle_class_id": "11", "x_max_passengers": "", "x_min_passengers": "", "x_vehicle_category": "" }]
  },
  {
    "country": "KHM",
    "json": [{ "id": "86ba-d78f-9e8c", "maker": "", "model": "", "x_maker": "", "x_model": "", "image_url_1": "", "image_url_2": "", "max_luggage": "", "min_luggage": "", "vehicle_class": "Sedan", "x_max_luggage": "", "x_min_luggage": "", "max_passengers": "", "min_passengers": "", "x_vehicle_class": "紧凑5座", "vehicle_class_id": "1", "x_max_passengers": "", "x_min_passengers": "", "x_vehicle_category": "", "x_vehicle_class_id": "" }, { "id": "7b5f-3a5c-5ec7", "maker": "", "model": "", "x_maker": "", "x_model": "", "image_url_1": "", "image_url_2": "", "max_luggage": "", "min_luggage": "", "vehicle_class": "Sedan", "x_max_luggage": "", "x_min_luggage": "", "max_passengers": "", "min_passengers": "", "x_vehicle_class": "经济5座", "vehicle_class_id": "1", "x_max_passengers": "", "x_min_passengers": "", "x_vehicle_category": "", "x_vehicle_class_id": "" }, { "id": "3323-7ceb-e07c", "maker": "", "model": "", "x_maker": "", "x_model": "", "image_url_1": "", "image_url_2": "", "max_luggage": "", "min_luggage": "", "vehicle_class": "MPV-4", "x_max_luggage": "", "x_min_luggage": "", "max_passengers": "", "min_passengers": "", "x_vehicle_class": "舒适5座", "vehicle_class_id": "6", "x_max_passengers": "", "x_min_passengers": "", "x_vehicle_category": "", "x_vehicle_class_id": "" }, { "id": "0eff-d37b-24fb", "maker": "", "model": "", "x_maker": "", "x_model": "", "image_url_1": "", "image_url_2": "", "max_luggage": "", "min_luggage": "", "vehicle_class": "Business Sedan", "x_max_luggage": "", "x_min_luggage": "", "max_passengers": "", "min_passengers": "", "x_vehicle_class": "豪华5座", "vehicle_class_id": "2", "x_max_passengers": "", "x_min_passengers": "", "x_vehicle_category": "", "x_vehicle_class_id": "" }, { "id": "044f-289a-3988", "maker": "", "model": "", "x_maker": "", "x_model": "", "image_url_1": "", "image_url_2": "", "max_luggage": "", "min_luggage": "", "vehicle_class": "MPV-5", "x_max_luggage": "", "x_min_luggage": "", "max_passengers": "", "min_passengers": "", "x_vehicle_class": "舒适7座", "vehicle_class_id": "3", "x_max_passengers": "", "x_min_passengers": "", "x_vehicle_category": "", "x_vehicle_class_id": "" }, { "id": "88ce-d40f-d7ba", "maker": "", "model": "", "x_maker": "", "x_model": "", "image_url_1": "", "image_url_2": "", "max_luggage": "", "min_luggage": "", "vehicle_class": "Business Minivan", "x_max_luggage": "", "x_min_luggage": "", "max_passengers": "", "min_passengers": "", "x_vehicle_class": "豪华7座", "vehicle_class_id": "36", "x_max_passengers": "", "x_min_passengers": "", "x_vehicle_category": "", "x_vehicle_class_id": "" }, { "id": "9cd3-c1e3-ae01", "maker": "", "model": "", "x_maker": "", "x_model": "", "image_url_1": "", "image_url_2": "", "max_luggage": "", "min_luggage": "", "vehicle_class": "Business SUV", "x_max_luggage": "", "x_min_luggage": "", "max_passengers": "", "min_passengers": "", "x_vehicle_class": "商务7座", "vehicle_class_id": "4", "x_max_passengers": "", "x_min_passengers": "", "x_vehicle_category": "", "x_vehicle_class_id": "" }, { "id": "b9e3-1b16-7654", "maker": "", "model": "", "x_maker": "", "x_model": "", "image_url_1": "", "image_url_2": "", "max_luggage": "", "min_luggage": "", "vehicle_class": "Minibus-14", "x_max_luggage": "", "x_min_luggage": "", "max_passengers": "", "min_passengers": "", "x_vehicle_class": "14座中巴", "vehicle_class_id": "11", "x_max_passengers": "", "x_min_passengers": "", "x_vehicle_category": "", "x_vehicle_class_id": "" }, { "id": "9786-58d5-5090", "maker": "", "model": "", "x_maker": "", "x_model": "", "image_url_1": "", "image_url_2": "", "max_luggage": "", "min_luggage": 0, "max_passenger": "", "min_passenger": 1, "vehicle_class": "Minibus-8", "x_max_luggage": "", "x_min_luggage": "", "x_vehicle_class": "8座小巴", "vehicle_class_id": "5", "x_max_passengers": "", "x_min_passengers": "", "x_vehicle_category": "" }, { "id": "09c2-6260-a748", "maker": "", "model": "", "x_maker": "", "x_model": "", "image_url_1": "", "image_url_2": "", "max_luggage": "", "min_luggage": 0, "max_passenger": "", "min_passenger": 1, "vehicle_class": "Minibus-10", "x_max_luggage": "", "x_min_luggage": "", "x_vehicle_class": "9座小巴", "vehicle_class_id": "9", "x_max_passengers": "", "x_min_passengers": "", "x_vehicle_category": "" }, { "id": "9c31-ca53-4d39", "maker": "", "model": "", "x_maker": "", "x_model": "", "image_url_1": "", "image_url_2": "", "max_luggage": "", "min_luggage": 0, "max_passenger": "", "min_passenger": 1, "vehicle_class": "Minibus-10", "x_max_luggage": "", "x_min_luggage": "", "x_vehicle_class": "10座小巴", "vehicle_class_id": "9", "x_max_passengers": "", "x_min_passengers": "", "x_vehicle_category": "" }, { "id": "3310-b1c6-c9d9", "maker": "", "model": "", "x_maker": "", "x_model": "", "image_url_1": "", "image_url_2": "", "max_luggage": "", "min_luggage": 0, "max_passenger": "", "min_passenger": 1, "vehicle_class": "Minibus-12", "x_max_luggage": "", "x_min_luggage": "", "x_vehicle_class": "12座小巴", "vehicle_class_id": "10", "x_max_passengers": "", "x_min_passengers": "", "x_vehicle_category": "" }]
  },
  {
    "country": "KAZ",
    "json": [{ "id": "e1a0-364b-2854", "maker": "", "model": "", "x_maker": "", "x_model": "", "image_url_1": "", "image_url_2": "", "max_luggage": "", "min_luggage": "", "vehicle_class": "Sedan", "x_max_luggage": "", "x_min_luggage": "", "max_passengers": "", "min_passengers": "", "x_vehicle_class": "紧凑5座", "vehicle_class_id": "1", "x_max_passengers": "", "x_min_passengers": "", "x_vehicle_category": "", "x_vehicle_class_id": "" }, { "id": "021e-3a46-8e80", "maker": "", "model": "", "x_maker": "", "x_model": "", "image_url_1": "", "image_url_2": "", "max_luggage": "", "min_luggage": "", "vehicle_class": "Sedan", "x_max_luggage": "", "x_min_luggage": "", "max_passengers": "", "min_passengers": "", "x_vehicle_class": "经济5座", "vehicle_class_id": "1", "x_max_passengers": "", "x_min_passengers": "", "x_vehicle_category": "", "x_vehicle_class_id": "" }, { "id": "22b4-979a-41ca", "maker": "", "model": "", "x_maker": "", "x_model": "", "image_url_1": "", "image_url_2": "", "max_luggage": "", "min_luggage": 0, "max_passenger": "", "min_passenger": 1, "vehicle_class": "Comfort Sedan", "x_max_luggage": "", "x_min_luggage": "", "x_vehicle_class": "舒适5座", "vehicle_class_id": "12", "x_max_passengers": "", "x_min_passengers": "", "x_vehicle_category": "" }, { "id": "d467-4de6-d12f", "maker": "", "model": "", "x_maker": "", "x_model": "", "image_url_1": "", "image_url_2": "", "max_luggage": "", "min_luggage": "", "vehicle_class": "Business Sedan", "x_max_luggage": "", "x_min_luggage": "", "max_passengers": "", "min_passengers": "", "x_vehicle_class": "豪华5座", "vehicle_class_id": "2", "x_max_passengers": "", "x_min_passengers": "", "x_vehicle_category": "", "x_vehicle_class_id": "" }, { "id": "8cd8-6201-a186", "maker": "", "model": "", "x_maker": "", "x_model": "", "image_url_1": "", "image_url_2": "", "max_luggage": "", "min_luggage": "", "vehicle_class": "Business Minivan", "x_max_luggage": "", "x_min_luggage": "", "max_passengers": "", "min_passengers": "", "x_vehicle_class": "豪华7座", "vehicle_class_id": "36", "x_max_passengers": "", "x_min_passengers": "", "x_vehicle_category": "", "x_vehicle_class_id": "" }, { "id": "e5c0-3f6f-0206", "maker": "", "model": "", "x_maker": "", "x_model": "", "image_url_1": "", "image_url_2": "", "max_luggage": "", "min_luggage": 0, "max_passenger": "", "min_passenger": 1, "vehicle_class": "MPV-5", "x_max_luggage": "", "x_min_luggage": "", "x_vehicle_class": "商务7座", "vehicle_class_id": "3", "x_max_passengers": "", "x_min_passengers": "", "x_vehicle_category": "" }, { "id": "ee71-948a-c09a", "maker": "", "model": "", "x_maker": "", "x_model": "", "image_url_1": "", "image_url_2": "", "max_luggage": "", "min_luggage": "", "vehicle_class": "Minibus-8", "x_max_luggage": "", "x_min_luggage": "", "max_passengers": "", "min_passengers": "", "x_vehicle_class": "8座小巴", "vehicle_class_id": "5", "x_max_passengers": "", "x_min_passengers": "", "x_vehicle_category": "", "x_vehicle_class_id": "" }, { "id": "b5c7-adff-e39d", "maker": "", "model": "", "x_maker": "", "x_model": "", "image_url_1": "", "image_url_2": "", "max_luggage": "", "min_luggage": "", "vehicle_class": "Minibus-10", "x_max_luggage": "", "x_min_luggage": "", "max_passengers": "", "min_passengers": "", "x_vehicle_class": "9座小巴", "vehicle_class_id": "9", "x_max_passengers": "", "x_min_passengers": "", "x_vehicle_category": "", "x_vehicle_class_id": "" }, { "id": "c703-80d6-61d0", "maker": "", "model": "", "x_maker": "", "x_model": "", "image_url_1": "", "image_url_2": "", "max_luggage": "", "min_luggage": "", "vehicle_class": "Minibus-10", "x_max_luggage": "", "x_min_luggage": "", "max_passengers": "", "min_passengers": "", "x_vehicle_class": "10座小巴", "vehicle_class_id": "9", "x_max_passengers": "", "x_min_passengers": "", "x_vehicle_category": "", "x_vehicle_class_id": "" }, { "id": "54c8-d161-24d4", "maker": "", "model": "", "x_maker": "", "x_model": "", "image_url_1": "", "image_url_2": "", "max_luggage": "", "min_luggage": 0, "max_passenger": "", "min_passenger": 1, "vehicle_class": "Minibus-12", "x_max_luggage": "", "x_min_luggage": "", "x_vehicle_class": "12座小巴", "vehicle_class_id": "10", "x_max_passengers": "", "x_min_passengers": "", "x_vehicle_category": "" }, { "id": "4775-d128-dfc6", "maker": "", "model": "", "x_maker": "", "x_model": "", "image_url_1": "", "image_url_2": "", "max_luggage": "", "min_luggage": "", "vehicle_class": "Minibus-14", "x_max_luggage": "", "x_min_luggage": "", "max_passengers": "", "min_passengers": "", "x_vehicle_class": "14座中巴", "vehicle_class_id": "11", "x_max_passengers": "", "x_min_passengers": "", "x_vehicle_category": "", "x_vehicle_class_id": "" }, { "id": "2f27-ce94-f824", "maker": "", "model": "", "x_maker": "", "x_model": "", "image_url_1": "", "image_url_2": "", "max_luggage": "", "min_luggage": 0, "max_passenger": "", "min_passenger": 1, "vehicle_class": "MPV-4", "x_max_luggage": "", "x_min_luggage": "", "x_vehicle_class": "舒适7座", "vehicle_class_id": "6", "x_max_passengers": "", "x_min_passengers": "", "x_vehicle_category": "" }]
  },
  {
    "country": "HUN",
    "json": [{ "id": "b314-1c65-478f", "maker": "", "model": "", "x_maker": "", "x_model": "", "image_url_1": "", "image_url_2": "", "max_luggage": "", "min_luggage": "", "vehicle_class": "Sedan", "x_max_luggage": "", "x_min_luggage": "", "max_passengers": "", "min_passengers": "", "x_vehicle_class": "紧凑5座", "vehicle_class_id": "1", "x_max_passengers": "", "x_min_passengers": "", "x_vehicle_category": "", "x_vehicle_class_id": "" }, { "id": "1d58-02a4-6359", "maker": "", "model": "", "x_maker": "", "x_model": "", "image_url_1": "", "image_url_2": "", "max_luggage": "", "min_luggage": "", "vehicle_class": "Sedan", "x_max_luggage": "", "x_min_luggage": "", "max_passengers": "", "min_passengers": "", "x_vehicle_class": "经济5座", "vehicle_class_id": "1", "x_max_passengers": "", "x_min_passengers": "", "x_vehicle_category": "", "x_vehicle_class_id": "" }, { "id": "beba-0643-7cc2", "maker": "", "model": "", "x_maker": "", "x_model": "", "image_url_1": "", "image_url_2": "", "max_luggage": "", "min_luggage": "", "vehicle_class": "Comfort Sedan", "x_max_luggage": "", "x_min_luggage": "", "max_passengers": "", "min_passengers": "", "x_vehicle_class": "舒适5座", "vehicle_class_id": "12", "x_max_passengers": "", "x_min_passengers": "", "x_vehicle_category": "", "x_vehicle_class_id": "" }, { "id": "8c08-48ad-b0f3", "maker": "", "model": "", "x_maker": "", "x_model": "", "image_url_1": "", "image_url_2": "", "max_luggage": "", "min_luggage": "", "vehicle_class": "Business Sedan", "x_max_luggage": "", "x_min_luggage": "", "max_passengers": "", "min_passengers": "", "x_vehicle_class": "豪华5座", "vehicle_class_id": "2", "x_max_passengers": "", "x_min_passengers": "", "x_vehicle_category": "", "x_vehicle_class_id": "" }, { "id": "eb19-ada4-bffa", "maker": "", "model": "", "x_maker": "", "x_model": "", "image_url_1": "", "image_url_2": "", "max_luggage": "", "min_luggage": "", "vehicle_class": "MPV-4", "x_max_luggage": "", "x_min_luggage": "", "max_passengers": "", "min_passengers": "", "x_vehicle_class": "舒适7座", "vehicle_class_id": "6", "x_max_passengers": "", "x_min_passengers": "", "x_vehicle_category": "", "x_vehicle_class_id": "" }, { "id": "86e5-df32-fafa", "maker": "", "model": "", "x_maker": "", "x_model": "", "image_url_1": "", "image_url_2": "", "max_luggage": "", "min_luggage": "", "vehicle_class": "Business Minivan", "x_max_luggage": "", "x_min_luggage": "", "max_passengers": "", "min_passengers": "", "x_vehicle_class": "豪华7座", "vehicle_class_id": "36", "x_max_passengers": "", "x_min_passengers": "", "x_vehicle_category": "", "x_vehicle_class_id": "" }, { "id": "0175-eea5-d13b", "maker": "", "model": "", "x_maker": "", "x_model": "", "image_url_1": "", "image_url_2": "", "max_luggage": "", "min_luggage": 0, "max_passenger": "", "min_passenger": 1, "vehicle_class": "MPV-5", "x_max_luggage": "", "x_min_luggage": "", "x_vehicle_class": "商务7座", "vehicle_class_id": "3", "x_max_passengers": "", "x_min_passengers": "", "x_vehicle_category": "" }, { "id": "7ee4-859d-c620", "maker": "", "model": "", "x_maker": "", "x_model": "", "image_url_1": "", "image_url_2": "", "max_luggage": "", "min_luggage": "", "vehicle_class": "Minibus-7", "x_max_luggage": "", "x_min_luggage": "", "max_passengers": "", "min_passengers": "", "x_vehicle_class": "商务8座", "vehicle_class_id": "8", "x_max_passengers": "", "x_min_passengers": "", "x_vehicle_category": "", "x_vehicle_class_id": "" }, { "id": "15dc-4b77-6df5", "maker": "", "model": "", "x_maker": "", "x_model": "", "image_url_1": "", "image_url_2": "", "max_luggage": "", "min_luggage": "", "vehicle_class": "Minibus-8", "x_max_luggage": "", "x_min_luggage": "", "max_passengers": "", "min_passengers": "", "x_vehicle_class": "商务9座", "vehicle_class_id": "5", "x_max_passengers": "", "x_min_passengers": "", "x_vehicle_category": "", "x_vehicle_class_id": "" }, { "id": "0bbc-65cf-2282", "maker": "", "model": "", "x_maker": "", "x_model": "", "image_url_1": "", "image_url_2": "", "max_luggage": "", "min_luggage": "", "vehicle_class": "Minibus-7", "x_max_luggage": "", "x_min_luggage": "", "max_passengers": "", "min_passengers": "", "x_vehicle_class": "8座小巴", "vehicle_class_id": "8", "x_max_passengers": "", "x_min_passengers": "", "x_vehicle_category": "", "x_vehicle_class_id": "" }, { "id": "957a-52de-4ee2", "maker": "", "model": "", "x_maker": "", "x_model": "", "image_url_1": "", "image_url_2": "", "max_luggage": "", "min_luggage": "", "vehicle_class": "Minibus-10", "x_max_luggage": "", "x_min_luggage": "", "max_passengers": "", "min_passengers": "", "x_vehicle_class": "9座小巴", "vehicle_class_id": "9", "x_max_passengers": "", "x_min_passengers": "", "x_vehicle_category": "", "x_vehicle_class_id": "" }, { "id": "2db7-08b8-0906", "maker": "", "model": "", "x_maker": "", "x_model": "", "image_url_1": "", "image_url_2": "", "max_luggage": "", "min_luggage": "", "vehicle_class": "Minibus-10", "x_max_luggage": "", "x_min_luggage": "", "max_passengers": "", "min_passengers": "", "x_vehicle_class": "10座小巴", "vehicle_class_id": "9", "x_max_passengers": "", "x_min_passengers": "", "x_vehicle_category": "", "x_vehicle_class_id": "" }, { "id": "0a23-f106-697d", "maker": "", "model": "", "x_maker": "", "x_model": "", "image_url_1": "", "image_url_2": "", "max_luggage": "", "min_luggage": "", "vehicle_class": "Minibus-12", "x_max_luggage": "", "x_min_luggage": "", "max_passengers": "", "min_passengers": "", "x_vehicle_class": "12座小巴", "vehicle_class_id": "10", "x_max_passengers": "", "x_min_passengers": "", "x_vehicle_category": "", "x_vehicle_class_id": "" }, { "id": "3cc4-70b9-4693", "maker": "", "model": "", "x_maker": "", "x_model": "", "image_url_1": "", "image_url_2": "", "max_luggage": "", "min_luggage": "", "vehicle_class": "Minibus-14", "x_max_luggage": "", "x_min_luggage": "", "max_passengers": "", "min_passengers": "", "x_vehicle_class": "14座中巴", "vehicle_class_id": "11", "x_max_passengers": "", "x_min_passengers": "", "x_vehicle_category": "", "x_vehicle_class_id": "" }]
  },
  {
    "country": "GBR",
    "json": [{ "id": "6b6c-beba-cbac", "maker": "", "model": "", "x_maker": "", "x_model": "", "image_url_1": "", "image_url_2": "", "max_luggage": "", "min_luggage": "", "vehicle_class": "Sedan", "x_max_luggage": "", "x_min_luggage": "", "max_passengers": "", "min_passengers": "", "x_vehicle_class": "紧凑5座", "vehicle_class_id": "1", "x_max_passengers": "", "x_min_passengers": "", "x_vehicle_category": "", "x_vehicle_class_id": "" }, { "id": "5b51-7b10-a343", "maker": "", "model": "", "x_maker": "", "x_model": "", "image_url_1": "", "image_url_2": "", "max_luggage": "", "min_luggage": 0, "min_passenger": 1, "vehicle_class": "Sedan", "x_max_luggage": "", "x_min_luggage": "", "max_passengers": "", "min_passengers": "", "x_vehicle_class": "经济5座", "vehicle_class_id": "1", "x_max_passengers": "", "x_min_passengers": "", "x_vehicle_category": "", "x_vehicle_class_id": "" }, { "id": "c06d-a146-c5b3", "maker": "", "model": "", "x_maker": "", "x_model": "", "image_url_1": "", "image_url_2": "", "max_luggage": "", "min_luggage": 0, "min_passenger": 1, "vehicle_class": "Comfort Sedan", "x_max_luggage": "", "x_min_luggage": "", "max_passengers": "", "min_passengers": "", "x_vehicle_class": "舒适5座", "vehicle_class_id": "12", "x_max_passengers": "", "x_min_passengers": "", "x_vehicle_category": "", "x_vehicle_class_id": "" }, { "id": "58c5-2db3-c3e0", "maker": "", "model": "", "x_maker": "", "x_model": "", "image_url_1": "", "image_url_2": "", "max_luggage": "", "min_luggage": 0, "min_passenger": 1, "vehicle_class": "Business Sedan", "x_max_luggage": "", "x_min_luggage": "", "max_passengers": "", "min_passengers": "", "x_vehicle_class": "豪华5座", "vehicle_class_id": "2", "x_max_passengers": "", "x_min_passengers": "", "x_vehicle_category": "", "x_vehicle_class_id": "" }, { "id": "fa04-ae1d-92db", "maker": "", "model": "", "x_maker": "", "x_model": "", "image_url_1": "", "image_url_2": "", "max_luggage": "", "min_luggage": 0, "max_passenger": "", "min_passenger": 1, "vehicle_class": "MPV-4", "x_max_luggage": "", "x_min_luggage": "", "x_vehicle_class": "舒适7座", "vehicle_class_id": "6", "x_max_passengers": "", "x_min_passengers": "", "x_vehicle_category": "" }, { "id": "8d7b-cf18-ea56", "maker": "", "model": "", "x_maker": "", "x_model": "", "image_url_1": "", "image_url_2": "", "max_luggage": "", "min_luggage": "", "vehicle_class": "Minibus-8", "x_max_luggage": "", "x_min_luggage": "", "max_passengers": "", "min_passengers": "", "x_vehicle_class": "8座小巴", "vehicle_class_id": "5", "x_max_passengers": "", "x_min_passengers": "", "x_vehicle_category": "", "x_vehicle_class_id": "" }, { "id": "00e3-065b-09ba", "maker": "", "model": "", "x_maker": "", "x_model": "", "image_url_1": "", "image_url_2": "", "max_luggage": "", "min_luggage": "", "vehicle_class": "Minibus-14", "x_max_luggage": "", "x_min_luggage": "", "max_passengers": "", "min_passengers": "", "x_vehicle_class": "14座中巴", "vehicle_class_id": "11", "x_max_passengers": "", "x_min_passengers": "", "x_vehicle_category": "", "x_vehicle_class_id": "" }, { "id": "8bc4-0103-16c9", "maker": "", "model": "", "x_maker": "", "x_model": "", "image_url_1": "", "image_url_2": "", "max_luggage": "", "min_luggage": 0, "max_passenger": "", "min_passenger": 1, "vehicle_class": "Business Minivan", "x_max_luggage": "", "x_min_luggage": "", "x_vehicle_class": "豪华7座", "vehicle_class_id": "36", "x_max_passengers": "", "x_min_passengers": "", "x_vehicle_category": "" }, { "id": "f629-503a-a11a", "maker": "", "model": "", "x_maker": "", "x_model": "", "image_url_1": "", "image_url_2": "", "max_luggage": "", "min_luggage": 0, "max_passenger": "", "min_passenger": 1, "vehicle_class": "MPV-5", "x_max_luggage": "", "x_min_luggage": "", "x_vehicle_class": "商务7座", "vehicle_class_id": "3", "x_max_passengers": "", "x_min_passengers": "", "x_vehicle_category": "" }, { "id": "f463-aa29-f9bf", "maker": "", "model": "", "x_maker": "", "x_model": "", "image_url_1": "", "image_url_2": "", "max_luggage": "", "min_luggage": 0, "max_passenger": "", "min_passenger": 1, "vehicle_class": "Minibus-7", "x_max_luggage": "", "x_min_luggage": "", "x_vehicle_class": "商务8座", "vehicle_class_id": "8", "x_max_passengers": "", "x_min_passengers": "", "x_vehicle_category": "" }, { "id": "c589-dfed-0f59", "maker": "", "model": "", "x_maker": "", "x_model": "", "image_url_1": "", "image_url_2": "", "max_luggage": "", "min_luggage": 0, "max_passenger": "", "min_passenger": 1, "vehicle_class": "Minibus-10", "x_max_luggage": "", "x_min_luggage": "", "x_vehicle_class": "10座小巴", "vehicle_class_id": "9", "x_max_passengers": "", "x_min_passengers": "", "x_vehicle_category": "" }, { "id": "a512-9a96-9f3f", "maker": "", "model": "", "x_maker": "", "x_model": "", "image_url_1": "", "image_url_2": "", "max_luggage": "", "min_luggage": 0, "max_passenger": "", "min_passenger": 1, "vehicle_class": "Minibus-12", "x_max_luggage": "", "x_min_luggage": "", "x_vehicle_class": "12座小巴", "vehicle_class_id": "10", "x_max_passengers": "", "x_min_passengers": "", "x_vehicle_category": "" }]
  },
  {
    "country": "EGY",
    "json": [{ "id": "0062-1755-002b", "maker": "", "model": "", "x_maker": "", "x_model": "", "image_url_1": "", "image_url_2": "", "max_luggage": "", "min_luggage": "", "vehicle_class": "Sedan", "x_max_luggage": "", "x_min_luggage": "", "max_passengers": "", "min_passengers": "", "x_vehicle_class": "紧凑5座", "vehicle_class_id": "1", "x_max_passengers": "", "x_min_passengers": "", "x_vehicle_category": "", "x_vehicle_class_id": "" }, { "id": "f0e1-5d29-b841", "maker": "", "model": "", "x_maker": "", "x_model": "", "image_url_1": "", "image_url_2": "", "max_luggage": "", "min_luggage": "", "vehicle_class": "Sedan", "x_max_luggage": "", "x_min_luggage": "", "max_passengers": "", "min_passengers": "", "x_vehicle_class": "经济5座", "vehicle_class_id": "1", "x_max_passengers": "", "x_min_passengers": "", "x_vehicle_category": "", "x_vehicle_class_id": "" }, { "id": "3752-aebb-e69f", "maker": "", "model": "", "x_maker": "", "x_model": "", "image_url_1": "", "image_url_2": "", "max_luggage": "", "min_luggage": "", "vehicle_class": "MPV-4", "x_max_luggage": "", "x_min_luggage": "", "max_passengers": "", "min_passengers": "", "x_vehicle_class": "舒适5座", "vehicle_class_id": "6", "x_max_passengers": "", "x_min_passengers": "", "x_vehicle_category": "", "x_vehicle_class_id": "" }, { "id": "8922-d123-64b4", "maker": "", "model": "", "x_maker": "", "x_model": "", "image_url_1": "", "image_url_2": "", "max_luggage": "", "min_luggage": "", "vehicle_class": "Business Sedan", "x_max_luggage": "", "x_min_luggage": "", "max_passengers": "", "min_passengers": "", "x_vehicle_class": "豪华5座", "vehicle_class_id": "2", "x_max_passengers": "", "x_min_passengers": "", "x_vehicle_category": "", "x_vehicle_class_id": "" }, { "id": "e9f6-9373-d035", "maker": "", "model": "", "x_maker": "", "x_model": "", "image_url_1": "", "image_url_2": "", "max_luggage": "", "min_luggage": "", "vehicle_class": "Business Minivan", "x_max_luggage": "", "x_min_luggage": "", "max_passengers": "", "min_passengers": "", "x_vehicle_class": "豪华7座", "vehicle_class_id": "36", "x_max_passengers": "", "x_min_passengers": "", "x_vehicle_category": "", "x_vehicle_class_id": "" }, { "id": "600a-593b-1765", "maker": "", "model": "", "x_maker": "", "x_model": "", "image_url_1": "", "image_url_2": "", "max_luggage": "", "min_luggage": "", "vehicle_class": "Business SUV", "x_max_luggage": "", "x_min_luggage": "", "max_passengers": "", "min_passengers": "", "x_vehicle_class": "商务7座", "vehicle_class_id": "4", "x_max_passengers": "", "x_min_passengers": "", "x_vehicle_category": "", "x_vehicle_class_id": "" }, { "id": "dbe1-fede-12ab", "maker": "", "model": "", "x_maker": "", "x_model": "", "image_url_1": "", "image_url_2": "", "max_luggage": "", "min_luggage": "", "vehicle_class": "Minibus-8", "x_max_luggage": "", "x_min_luggage": "", "max_passengers": "", "min_passengers": "", "x_vehicle_class": "8座小巴", "vehicle_class_id": "5", "x_max_passengers": "", "x_min_passengers": "", "x_vehicle_category": "", "x_vehicle_class_id": "" }, { "id": "b398-cd2c-76bd", "maker": "", "model": "", "x_maker": "", "x_model": "", "image_url_1": "", "image_url_2": "", "max_luggage": "", "min_luggage": "", "vehicle_class": "Minibus-10", "x_max_luggage": "", "x_min_luggage": "", "max_passengers": "", "min_passengers": "", "x_vehicle_class": "9座小巴", "vehicle_class_id": "9", "x_max_passengers": "", "x_min_passengers": "", "x_vehicle_category": "", "x_vehicle_class_id": "" }, { "id": "8db3-4114-c715", "maker": "", "model": "", "x_maker": "", "x_model": "", "image_url_1": "", "image_url_2": "", "max_luggage": "", "min_luggage": "", "vehicle_class": "Minibus-10", "x_max_luggage": "", "x_min_luggage": "", "max_passengers": "", "min_passengers": "", "x_vehicle_class": "10座小巴", "vehicle_class_id": "9", "x_max_passengers": "", "x_min_passengers": "", "x_vehicle_category": "", "x_vehicle_class_id": "" }, { "id": "dc6e-30c9-baec", "maker": "", "model": "", "x_maker": "", "x_model": "", "image_url_1": "", "image_url_2": "", "max_luggage": "", "min_luggage": 0, "max_passenger": "", "min_passenger": 1, "vehicle_class": "Minibus-12", "x_max_luggage": "", "x_min_luggage": "", "x_vehicle_class": "12座小巴", "vehicle_class_id": "10", "x_max_passengers": "", "x_min_passengers": "", "x_vehicle_category": "" }, { "id": "066f-1fb4-7368", "maker": "", "model": "", "x_maker": "", "x_model": "", "image_url_1": "", "image_url_2": "", "max_luggage": "", "min_luggage": "", "vehicle_class": "Minibus-14", "x_max_luggage": "", "x_min_luggage": "", "max_passengers": "", "min_passengers": "", "x_vehicle_class": "14座中巴", "vehicle_class_id": "11", "x_max_passengers": "", "x_min_passengers": "", "x_vehicle_category": "", "x_vehicle_class_id": "" }, { "id": "67b3-3af1-4175", "maker": "", "model": "", "x_maker": "", "x_model": "", "image_url_1": "", "image_url_2": "", "max_luggage": "", "min_luggage": "", "vehicle_class": "MPV-5", "x_max_luggage": "", "x_min_luggage": "", "max_passengers": "", "min_passengers": "", "x_vehicle_class": "舒适7座", "vehicle_class_id": "3", "x_max_passengers": "", "x_min_passengers": "", "x_vehicle_category": "", "x_vehicle_class_id": "" }]
  },
  {
    "country": "BRN",
    "json": [{ "id": "4be8-f370-2ab4", "maker": "", "model": "", "x_maker": "", "x_model": "", "image_url_1": "", "image_url_2": "", "max_luggage": "", "min_luggage": "", "vehicle_class": "Sedan", "x_max_luggage": "", "x_min_luggage": "", "max_passengers": "", "min_passengers": "", "x_vehicle_class": "紧凑5座", "vehicle_class_id": "1", "x_max_passengers": "", "x_min_passengers": "", "x_vehicle_category": "", "x_vehicle_class_id": "" }, { "id": "e3d6-f769-10a1", "maker": "", "model": "", "x_maker": "", "x_model": "", "image_url_1": "", "image_url_2": "", "max_luggage": "", "min_luggage": "", "vehicle_class": "Sedan", "x_max_luggage": "", "x_min_luggage": "", "max_passengers": "", "min_passengers": "", "x_vehicle_class": "经济5座", "vehicle_class_id": "1", "x_max_passengers": "", "x_min_passengers": "", "x_vehicle_category": "", "x_vehicle_class_id": "" }, { "id": "e527-89a0-0f64", "maker": "", "model": "", "x_maker": "", "x_model": "", "image_url_1": "", "image_url_2": "", "max_luggage": "", "min_luggage": 0, "max_passenger": "", "min_passenger": 1, "vehicle_class": "Comfort Sedan", "x_max_luggage": "", "x_min_luggage": "", "x_vehicle_class": "舒适5座", "vehicle_class_id": "12", "x_max_passengers": "", "x_min_passengers": "", "x_vehicle_category": "" }, { "id": "efbd-0b61-2d85", "maker": "", "model": "", "x_maker": "", "x_model": "", "image_url_1": "", "image_url_2": "", "max_luggage": "", "min_luggage": "", "vehicle_class": "Business Sedan", "x_max_luggage": "", "x_min_luggage": "", "max_passengers": "", "min_passengers": "", "x_vehicle_class": "豪华5座", "vehicle_class_id": "2", "x_max_passengers": "", "x_min_passengers": "", "x_vehicle_category": "", "x_vehicle_class_id": "" }, { "id": "0a60-0ee7-8864", "maker": "", "model": "", "x_maker": "", "x_model": "", "image_url_1": "", "image_url_2": "", "max_luggage": "", "min_luggage": "", "vehicle_class": "Business Minivan", "x_max_luggage": "", "x_min_luggage": "", "max_passengers": "", "min_passengers": "", "x_vehicle_class": "豪华7座", "vehicle_class_id": "36", "x_max_passengers": "", "x_min_passengers": "", "x_vehicle_category": "", "x_vehicle_class_id": "" }, { "id": "3fae-2934-8027", "maker": "", "model": "", "x_maker": "", "x_model": "", "image_url_1": "", "image_url_2": "", "max_luggage": "", "min_luggage": 0, "max_passenger": "", "min_passenger": 1, "vehicle_class": "MPV-5", "x_max_luggage": "", "x_min_luggage": "", "x_vehicle_class": "商务7座", "vehicle_class_id": "3", "x_max_passengers": "", "x_min_passengers": "", "x_vehicle_category": "" }, { "id": "aaaa-41ee-78b9", "maker": "", "model": "", "x_maker": "", "x_model": "", "image_url_1": "", "image_url_2": "", "max_luggage": "", "min_luggage": 0, "max_passenger": "", "min_passenger": 1, "vehicle_class": "Minibus-8", "x_max_luggage": "", "x_min_luggage": "", "x_vehicle_class": "8座小巴", "vehicle_class_id": "5", "x_max_passengers": "", "x_min_passengers": "", "x_vehicle_category": "" }, { "id": "f857-f649-f595", "maker": "", "model": "", "x_maker": "", "x_model": "", "image_url_1": "", "image_url_2": "", "max_luggage": "", "min_luggage": "", "vehicle_class": "Minibus-10", "x_max_luggage": "", "x_min_luggage": "", "max_passengers": "", "min_passengers": "", "x_vehicle_class": "9座小巴", "vehicle_class_id": "9", "x_max_passengers": "", "x_min_passengers": "", "x_vehicle_category": "", "x_vehicle_class_id": "" }, { "id": "c163-cd25-5556", "maker": "", "model": "", "x_maker": "", "x_model": "", "image_url_1": "", "image_url_2": "", "max_luggage": "", "min_luggage": "", "vehicle_class": "Minibus-10", "x_max_luggage": "", "x_min_luggage": "", "max_passengers": "", "min_passengers": "", "x_vehicle_class": "10座小巴", "vehicle_class_id": "9", "x_max_passengers": "", "x_min_passengers": "", "x_vehicle_category": "", "x_vehicle_class_id": "" }, { "id": "2b9e-1277-7b9d", "maker": "", "model": "", "x_maker": "", "x_model": "", "image_url_1": "", "image_url_2": "", "max_luggage": "", "min_luggage": 0, "max_passenger": "", "min_passenger": 1, "vehicle_class": "Minibus-12", "x_max_luggage": "", "x_min_luggage": "", "x_vehicle_class": "12座小巴", "vehicle_class_id": "10", "x_max_passengers": "", "x_min_passengers": "", "x_vehicle_category": "" }, { "id": "4a8e-6dd8-4e65", "maker": "", "model": "", "x_maker": "", "x_model": "", "image_url_1": "", "image_url_2": "", "max_luggage": "", "min_luggage": "", "vehicle_class": "Minibus-14", "x_max_luggage": "", "x_min_luggage": "", "max_passengers": "", "min_passengers": "", "x_vehicle_class": "14座中巴", "vehicle_class_id": "11", "x_max_passengers": "", "x_min_passengers": "", "x_vehicle_category": "", "x_vehicle_class_id": "" }, { "id": "543b-d94a-15be", "maker": "", "model": "", "x_maker": "", "x_model": "", "image_url_1": "", "image_url_2": "", "max_luggage": "", "min_luggage": 0, "max_passenger": "", "min_passenger": 1, "vehicle_class": "MPV-4", "x_max_luggage": "", "x_min_luggage": "", "x_vehicle_class": "舒适7座", "vehicle_class_id": "6", "x_max_passengers": "", "x_min_passengers": "", "x_vehicle_category": "" }]
  },
  {
    "country": "ARE",
    "json": [{ "id": "0fbe-5362-311a", "maker": "", "model": "", "x_maker": "", "x_model": "", "image_url_1": "", "image_url_2": "", "max_luggage": "", "min_luggage": "", "vehicle_class": "Sedan", "x_max_luggage": "", "x_min_luggage": "", "max_passengers": "", "min_passengers": "", "x_vehicle_class": "紧凑5座", "vehicle_class_id": "1", "x_max_passengers": "", "x_min_passengers": "", "x_vehicle_category": "", "x_vehicle_class_id": "" }, { "id": "2518-6e22-654b", "maker": "", "model": "", "x_maker": "", "x_model": "", "image_url_1": "", "image_url_2": "", "max_luggage": "", "min_luggage": "", "vehicle_class": "Sedan", "x_max_luggage": "", "x_min_luggage": "", "max_passengers": "", "min_passengers": "", "x_vehicle_class": "经济5座", "vehicle_class_id": "1", "x_max_passengers": "", "x_min_passengers": "", "x_vehicle_category": "", "x_vehicle_class_id": "" }, { "id": "2483-01c5-9182", "maker": "", "model": "", "x_maker": "", "x_model": "", "image_url_1": "", "image_url_2": "", "max_luggage": "", "min_luggage": 0, "min_passenger": 1, "vehicle_class": "Comfort Sedan", "x_max_luggage": "", "x_min_luggage": "", "max_passengers": "", "min_passengers": "", "x_vehicle_class": "舒适5座", "vehicle_class_id": "12", "x_max_passengers": "", "x_min_passengers": "", "x_vehicle_category": "", "x_vehicle_class_id": "" }, { "id": "cce7-fe4b-f534", "maker": "", "model": "", "x_maker": "", "x_model": "", "image_url_1": "", "image_url_2": "", "max_luggage": "", "min_luggage": "", "vehicle_class": "Business Sedan", "x_max_luggage": "", "x_min_luggage": "", "max_passengers": "", "min_passengers": "", "x_vehicle_class": "豪华5座", "vehicle_class_id": "2", "x_max_passengers": "", "x_min_passengers": "", "x_vehicle_category": "", "x_vehicle_class_id": "" }, { "id": "c000-c404-4530", "maker": "", "model": "", "x_maker": "", "x_model": "", "image_url_1": "", "image_url_2": "", "max_luggage": "", "min_luggage": 0, "min_passenger": 1, "vehicle_class": "MPV-4", "x_max_luggage": "", "x_min_luggage": "", "max_passengers": "", "min_passengers": "", "x_vehicle_class": "舒适7座", "vehicle_class_id": "3", "x_max_passengers": "", "x_min_passengers": "", "x_vehicle_category": "", "x_vehicle_class_id": "" }, { "id": "9a13-1dfd-4ea7", "maker": "", "model": "", "x_maker": "", "x_model": "", "image_url_1": "", "image_url_2": "", "max_luggage": "", "min_luggage": "", "vehicle_class": "Business Minivan", "x_max_luggage": "", "x_min_luggage": "", "max_passengers": "", "min_passengers": "", "x_vehicle_class": "豪华7座", "vehicle_class_id": "36", "x_max_passengers": "", "x_min_passengers": "", "x_vehicle_category": "", "x_vehicle_class_id": "" }, { "id": "a099-3eb0-4536", "maker": "", "model": "", "x_maker": "", "x_model": "", "image_url_1": "", "image_url_2": "", "max_luggage": "", "min_luggage": 0, "min_passenger": 1, "vehicle_class": "MPV-5", "x_max_luggage": "", "x_min_luggage": "", "max_passengers": "", "min_passengers": "", "x_vehicle_class": "商务7座", "vehicle_class_id": "3", "x_max_passengers": "", "x_min_passengers": "", "x_vehicle_category": "", "x_vehicle_class_id": "" }, { "id": "aa27-8615-58a0", "maker": "", "model": "", "x_maker": "", "x_model": "", "image_url_1": "", "image_url_2": "", "max_luggage": "", "min_luggage": "", "vehicle_class": "Minibus-14", "x_max_luggage": "", "x_min_luggage": "", "max_passengers": "", "min_passengers": "", "x_vehicle_class": "14座中巴", "vehicle_class_id": "11", "x_max_passengers": "", "x_min_passengers": "", "x_vehicle_category": "", "x_vehicle_class_id": "" }, { "id": "8db7-03c0-c87f", "maker": "", "model": "", "x_maker": "", "x_model": "", "image_url_1": "", "image_url_2": "", "max_luggage": "", "min_luggage": 0, "max_passenger": "", "min_passenger": 1, "vehicle_class": "Minibus-7", "x_max_luggage": "", "x_min_luggage": "", "x_vehicle_class": "8座小巴", "vehicle_class_id": "8", "x_max_passengers": "", "x_min_passengers": "", "x_vehicle_category": "" }, { "id": "aeb1-0d1b-fc0f", "maker": "", "model": "", "x_maker": "", "x_model": "", "image_url_1": "", "image_url_2": "", "max_luggage": "", "min_luggage": 0, "max_passenger": "", "min_passenger": 1, "vehicle_class": "Minibus-8", "x_max_luggage": "", "x_min_luggage": "", "x_vehicle_class": "9座小巴", "vehicle_class_id": "5", "x_max_passengers": "", "x_min_passengers": "", "x_vehicle_category": "" }, { "id": "a0fb-913c-ccbe", "maker": "", "model": "", "x_maker": "", "x_model": "", "image_url_1": "", "image_url_2": "", "max_luggage": "", "min_luggage": 0, "max_passenger": "", "min_passenger": 1, "vehicle_class": "Minibus-10", "x_max_luggage": "", "x_min_luggage": "", "x_vehicle_class": "10座小巴", "vehicle_class_id": "9", "x_max_passengers": "", "x_min_passengers": "", "x_vehicle_category": "" }, { "id": "2739-2108-46e2", "maker": "", "model": "", "x_maker": "", "x_model": "", "image_url_1": "", "image_url_2": "", "max_luggage": "", "min_luggage": 0, "max_passenger": "", "min_passenger": 1, "vehicle_class": "Minibus-12", "x_max_luggage": "", "x_min_luggage": "", "x_vehicle_class": "12座小巴", "vehicle_class_id": "10", "x_max_passengers": "", "x_min_passengers": "", "x_vehicle_category": "" }, { "id": "292e-51c0-7900", "maker": "", "model": "", "x_maker": "", "x_model": "", "image_url_1": "", "image_url_2": "", "max_luggage": "", "min_luggage": 0, "max_passenger": "", "min_passenger": 1, "vehicle_class": "Minibus-14", "x_max_luggage": "", "x_min_luggage": "", "x_vehicle_class": "14座中巴", "vehicle_class_id": "11", "x_max_passengers": "", "x_min_passengers": "", "x_vehicle_category": "" }]
  },
  {
    "country": "ARE",
    "json": [{ "id": "0fbe-5362-311a", "maker": "", "model": "", "x_maker": "", "x_model": "", "image_url_1": "", "image_url_2": "", "max_luggage": "", "min_luggage": "", "vehicle_class": "Sedan", "x_max_luggage": "", "x_min_luggage": "", "max_passengers": "", "min_passengers": "", "x_vehicle_class": "紧凑5座", "vehicle_class_id": "1", "x_max_passengers": "", "x_min_passengers": "", "x_vehicle_category": "", "x_vehicle_class_id": "" }, { "id": "2518-6e22-654b", "maker": "", "model": "", "x_maker": "", "x_model": "", "image_url_1": "", "image_url_2": "", "max_luggage": "", "min_luggage": "", "vehicle_class": "Sedan", "x_max_luggage": "", "x_min_luggage": "", "max_passengers": "", "min_passengers": "", "x_vehicle_class": "经济5座", "vehicle_class_id": "1", "x_max_passengers": "", "x_min_passengers": "", "x_vehicle_category": "", "x_vehicle_class_id": "" }, { "id": "2483-01c5-9182", "maker": "", "model": "", "x_maker": "", "x_model": "", "image_url_1": "", "image_url_2": "", "max_luggage": "", "min_luggage": 0, "min_passenger": 1, "vehicle_class": "Comfort Sedan", "x_max_luggage": "", "x_min_luggage": "", "max_passengers": "", "min_passengers": "", "x_vehicle_class": "舒适5座", "vehicle_class_id": "12", "x_max_passengers": "", "x_min_passengers": "", "x_vehicle_category": "", "x_vehicle_class_id": "" }, { "id": "cce7-fe4b-f534", "maker": "", "model": "", "x_maker": "", "x_model": "", "image_url_1": "", "image_url_2": "", "max_luggage": "", "min_luggage": "", "vehicle_class": "Business Sedan", "x_max_luggage": "", "x_min_luggage": "", "max_passengers": "", "min_passengers": "", "x_vehicle_class": "豪华5座", "vehicle_class_id": "2", "x_max_passengers": "", "x_min_passengers": "", "x_vehicle_category": "", "x_vehicle_class_id": "" }, { "id": "c000-c404-4530", "maker": "", "model": "", "x_maker": "", "x_model": "", "image_url_1": "", "image_url_2": "", "max_luggage": "", "min_luggage": 0, "min_passenger": 1, "vehicle_class": "MPV-4", "x_max_luggage": "", "x_min_luggage": "", "max_passengers": "", "min_passengers": "", "x_vehicle_class": "舒适7座", "vehicle_class_id": "3", "x_max_passengers": "", "x_min_passengers": "", "x_vehicle_category": "", "x_vehicle_class_id": "" }, { "id": "9a13-1dfd-4ea7", "maker": "", "model": "", "x_maker": "", "x_model": "", "image_url_1": "", "image_url_2": "", "max_luggage": "", "min_luggage": "", "vehicle_class": "Business Minivan", "x_max_luggage": "", "x_min_luggage": "", "max_passengers": "", "min_passengers": "", "x_vehicle_class": "豪华7座", "vehicle_class_id": "36", "x_max_passengers": "", "x_min_passengers": "", "x_vehicle_category": "", "x_vehicle_class_id": "" }, { "id": "a099-3eb0-4536", "maker": "", "model": "", "x_maker": "", "x_model": "", "image_url_1": "", "image_url_2": "", "max_luggage": "", "min_luggage": 0, "min_passenger": 1, "vehicle_class": "MPV-5", "x_max_luggage": "", "x_min_luggage": "", "max_passengers": "", "min_passengers": "", "x_vehicle_class": "商务7座", "vehicle_class_id": "3", "x_max_passengers": "", "x_min_passengers": "", "x_vehicle_category": "", "x_vehicle_class_id": "" }, { "id": "aa27-8615-58a0", "maker": "", "model": "", "x_maker": "", "x_model": "", "image_url_1": "", "image_url_2": "", "max_luggage": "", "min_luggage": "", "vehicle_class": "Minibus-14", "x_max_luggage": "", "x_min_luggage": "", "max_passengers": "", "min_passengers": "", "x_vehicle_class": "14座中巴", "vehicle_class_id": "11", "x_max_passengers": "", "x_min_passengers": "", "x_vehicle_category": "", "x_vehicle_class_id": "" }, { "id": "8db7-03c0-c87f", "maker": "", "model": "", "x_maker": "", "x_model": "", "image_url_1": "", "image_url_2": "", "max_luggage": "", "min_luggage": 0, "max_passenger": "", "min_passenger": 1, "vehicle_class": "Minibus-8", "x_max_luggage": "", "x_min_luggage": "", "x_vehicle_class": "8座小巴", "vehicle_class_id": "5", "x_max_passengers": "", "x_min_passengers": "", "x_vehicle_category": "" }, { "id": "aeb1-0d1b-fc0f", "maker": "", "model": "", "x_maker": "", "x_model": "", "image_url_1": "", "image_url_2": "", "max_luggage": "", "min_luggage": 0, "max_passenger": "", "min_passenger": 1, "vehicle_class": "Minibus-10", "x_max_luggage": "", "x_min_luggage": "", "x_vehicle_class": "9座小巴", "vehicle_class_id": "9", "x_max_passengers": "", "x_min_passengers": "", "x_vehicle_category": "" }, { "id": "a0fb-913c-ccbe", "maker": "", "model": "", "x_maker": "", "x_model": "", "image_url_1": "", "image_url_2": "", "max_luggage": "", "min_luggage": 0, "max_passenger": "", "min_passenger": 1, "vehicle_class": "Minibus-10", "x_max_luggage": "", "x_min_luggage": "", "x_vehicle_class": "10座小巴", "vehicle_class_id": "9", "x_max_passengers": "", "x_min_passengers": "", "x_vehicle_category": "" }, { "id": "2739-2108-46e2", "maker": "", "model": "", "x_maker": "", "x_model": "", "image_url_1": "", "image_url_2": "", "max_luggage": "", "min_luggage": 0, "max_passenger": "", "min_passenger": 1, "vehicle_class": "Minibus-12", "x_max_luggage": "", "x_min_luggage": "", "x_vehicle_class": "12座小巴", "vehicle_class_id": "10", "x_max_passengers": "", "x_min_passengers": "", "x_vehicle_category": "" }, { "id": "292e-51c0-7900", "maker": "", "model": "", "x_maker": "", "x_model": "", "image_url_1": "", "image_url_2": "", "max_luggage": "", "min_luggage": 0, "max_passenger": "", "min_passenger": 1, "vehicle_class": "Minibus-14", "x_max_luggage": "", "x_min_luggage": "", "x_vehicle_class": "14座中巴", "vehicle_class_id": "11", "x_max_passengers": "", "x_min_passengers": "", "x_vehicle_category": "" }]
  },
  {
    "country": "ARE",
    "json": [{ "id": "0fbe-5362-311a", "maker": "", "model": "", "x_maker": "", "x_model": "", "image_url_1": "", "image_url_2": "", "max_luggage": "", "min_luggage": "", "vehicle_class": "Sedan", "x_max_luggage": "", "x_min_luggage": "", "max_passengers": "", "min_passengers": "", "x_vehicle_class": "紧凑5座", "vehicle_class_id": "1", "x_max_passengers": "", "x_min_passengers": "", "x_vehicle_category": "", "x_vehicle_class_id": "" }, { "id": "2518-6e22-654b", "maker": "", "model": "", "x_maker": "", "x_model": "", "image_url_1": "", "image_url_2": "", "max_luggage": "", "min_luggage": "", "vehicle_class": "Sedan", "x_max_luggage": "", "x_min_luggage": "", "max_passengers": "", "min_passengers": "", "x_vehicle_class": "经济5座", "vehicle_class_id": "1", "x_max_passengers": "", "x_min_passengers": "", "x_vehicle_category": "", "x_vehicle_class_id": "" }, { "id": "2483-01c5-9182", "maker": "", "model": "", "x_maker": "", "x_model": "", "image_url_1": "", "image_url_2": "", "max_luggage": "", "min_luggage": 0, "max_passenger": "", "min_passenger": 1, "vehicle_class": "Comfort Sedan", "x_max_luggage": "", "x_min_luggage": "", "x_vehicle_class": "舒适5座", "vehicle_class_id": "12", "x_max_passengers": "", "x_min_passengers": "", "x_vehicle_category": "" }, { "id": "cce7-fe4b-f534", "maker": "", "model": "", "x_maker": "", "x_model": "", "image_url_1": "", "image_url_2": "", "max_luggage": "", "min_luggage": "", "vehicle_class": "Business Sedan", "x_max_luggage": "", "x_min_luggage": "", "max_passengers": "", "min_passengers": "", "x_vehicle_class": "豪华5座", "vehicle_class_id": "2", "x_max_passengers": "", "x_min_passengers": "", "x_vehicle_category": "", "x_vehicle_class_id": "" }, { "id": "c000-c404-4530", "maker": "", "model": "", "x_maker": "", "x_model": "", "image_url_1": "", "image_url_2": "", "max_luggage": "", "min_luggage": 0, "max_passenger": "", "min_passenger": 1, "vehicle_class": "MPV-4", "x_max_luggage": "", "x_min_luggage": "", "x_vehicle_class": "舒适7座", "vehicle_class_id": "3", "x_max_passengers": "", "x_min_passengers": "", "x_vehicle_category": "" }, { "id": "9a13-1dfd-4ea7", "maker": "", "model": "", "x_maker": "", "x_model": "", "image_url_1": "", "image_url_2": "", "max_luggage": "", "min_luggage": "", "vehicle_class": "Business Minivan", "x_max_luggage": "", "x_min_luggage": "", "max_passengers": "", "min_passengers": "", "x_vehicle_class": "豪华7座", "vehicle_class_id": "36", "x_max_passengers": "", "x_min_passengers": "", "x_vehicle_category": "", "x_vehicle_class_id": "" }, { "id": "a099-3eb0-4536", "maker": "", "model": "", "x_maker": "", "x_model": "", "image_url_1": "", "image_url_2": "", "max_luggage": "", "min_luggage": 0, "max_passenger": "", "min_passenger": 1, "vehicle_class": "MPV-5", "x_max_luggage": "", "x_min_luggage": "", "x_vehicle_class": "商务7座", "vehicle_class_id": "3", "x_max_passengers": "", "x_min_passengers": "", "x_vehicle_category": "" }, { "id": "aa27-8615-58a0", "maker": "", "model": "", "x_maker": "", "x_model": "", "image_url_1": "", "image_url_2": "", "max_luggage": "", "min_luggage": "", "vehicle_class": "Minibus-14", "x_max_luggage": "", "x_min_luggage": "", "max_passengers": "", "min_passengers": "", "x_vehicle_class": "14座中巴", "vehicle_class_id": "11", "x_max_passengers": "", "x_min_passengers": "", "x_vehicle_category": "", "x_vehicle_class_id": "" }]
  },
  {
    "country": "GBR",
    "json": [{ "id": "6b6c-beba-cbac", "maker": "", "model": "", "x_maker": "", "x_model": "", "image_url_1": "", "image_url_2": "", "max_luggage": "", "min_luggage": "", "vehicle_class": "Sedan", "x_max_luggage": "", "x_min_luggage": "", "max_passengers": "", "min_passengers": "", "x_vehicle_class": "紧凑5座", "vehicle_class_id": "1", "x_max_passengers": "", "x_min_passengers": "", "x_vehicle_category": "", "x_vehicle_class_id": "" }, { "id": "5b51-7b10-a343", "maker": "", "model": "", "x_maker": "", "x_model": "", "image_url_1": "", "image_url_2": "", "max_luggage": "", "min_luggage": 0, "min_passenger": 1, "vehicle_class": "Sedan", "x_max_luggage": "", "x_min_luggage": "", "max_passengers": "", "min_passengers": "", "x_vehicle_class": "经济5座", "vehicle_class_id": "1", "x_max_passengers": "", "x_min_passengers": "", "x_vehicle_category": "", "x_vehicle_class_id": "" }, { "id": "c06d-a146-c5b3", "maker": "", "model": "", "x_maker": "", "x_model": "", "image_url_1": "", "image_url_2": "", "max_luggage": "", "min_luggage": 0, "min_passenger": 1, "vehicle_class": "Comfort Sedan", "x_max_luggage": "", "x_min_luggage": "", "max_passengers": "", "min_passengers": "", "x_vehicle_class": "舒适5座", "vehicle_class_id": "12", "x_max_passengers": "", "x_min_passengers": "", "x_vehicle_category": "", "x_vehicle_class_id": "" }, { "id": "58c5-2db3-c3e0", "maker": "", "model": "", "x_maker": "", "x_model": "", "image_url_1": "", "image_url_2": "", "max_luggage": "", "min_luggage": 0, "min_passenger": 1, "vehicle_class": "Business Sedan", "x_max_luggage": "", "x_min_luggage": "", "max_passengers": "", "min_passengers": "", "x_vehicle_class": "豪华5座", "vehicle_class_id": "2", "x_max_passengers": "", "x_min_passengers": "", "x_vehicle_category": "", "x_vehicle_class_id": "" }, { "id": "fa04-ae1d-92db", "maker": "", "model": "", "x_maker": "", "x_model": "", "image_url_1": "", "image_url_2": "", "max_luggage": "", "min_luggage": "", "vehicle_class": "MPV-5", "x_max_luggage": "", "x_min_luggage": "", "max_passengers": "", "min_passengers": "", "x_vehicle_class": "舒适7座", "vehicle_class_id": "3", "x_max_passengers": "", "x_min_passengers": "", "x_vehicle_category": "", "x_vehicle_class_id": "" }, { "id": "8d7b-cf18-ea56", "maker": "", "model": "", "x_maker": "", "x_model": "", "image_url_1": "", "image_url_2": "", "max_luggage": "", "min_luggage": "", "vehicle_class": "Minibus-8", "x_max_luggage": "", "x_min_luggage": "", "max_passengers": "", "min_passengers": "", "x_vehicle_class": "8座小巴", "vehicle_class_id": "5", "x_max_passengers": "", "x_min_passengers": "", "x_vehicle_category": "", "x_vehicle_class_id": "" }, { "id": "00e3-065b-09ba", "maker": "", "model": "", "x_maker": "", "x_model": "", "image_url_1": "", "image_url_2": "", "max_luggage": "", "min_luggage": "", "vehicle_class": "Minibus-14", "x_max_luggage": "", "x_min_luggage": "", "max_passengers": "", "min_passengers": "", "x_vehicle_class": "14座中巴", "vehicle_class_id": "11", "x_max_passengers": "", "x_min_passengers": "", "x_vehicle_category": "", "x_vehicle_class_id": "" }, { "id": "8bc4-0103-16c9", "maker": "", "model": "", "x_maker": "", "x_model": "", "image_url_1": "", "image_url_2": "", "max_luggage": "", "min_luggage": 0, "max_passenger": "", "min_passenger": 1, "vehicle_class": "Business Minivan", "x_max_luggage": "", "x_min_luggage": "", "x_vehicle_class": "豪华7座", "vehicle_class_id": "36", "x_max_passengers": "", "x_min_passengers": "", "x_vehicle_category": "" }, { "id": "f629-503a-a11a", "maker": "", "model": "", "x_maker": "", "x_model": "", "image_url_1": "", "image_url_2": "", "max_luggage": "", "min_luggage": 0, "max_passenger": "", "min_passenger": 1, "vehicle_class": "MPV-6", "x_max_luggage": "", "x_min_luggage": "", "x_vehicle_class": "商务7座", "vehicle_class_id": "7", "x_max_passengers": "", "x_min_passengers": "", "x_vehicle_category": "" }, { "id": "f463-aa29-f9bf", "maker": "", "model": "", "x_maker": "", "x_model": "", "image_url_1": "", "image_url_2": "", "max_luggage": "", "min_luggage": 0, "max_passenger": "", "min_passenger": 1, "vehicle_class": "Minibus-7", "x_max_luggage": "", "x_min_luggage": "", "x_vehicle_class": "商务8座", "vehicle_class_id": "8", "x_max_passengers": "", "x_min_passengers": "", "x_vehicle_category": "" }, { "id": "c589-dfed-0f59", "maker": "", "model": "", "x_maker": "", "x_model": "", "image_url_1": "", "image_url_2": "", "max_luggage": "", "min_luggage": 0, "max_passenger": "", "min_passenger": 1, "vehicle_class": "Minibus-10", "x_max_luggage": "", "x_min_luggage": "", "x_vehicle_class": "10座小巴", "vehicle_class_id": "9", "x_max_passengers": "", "x_min_passengers": "", "x_vehicle_category": "" }, { "id": "a512-9a96-9f3f", "maker": "", "model": "", "x_maker": "", "x_model": "", "image_url_1": "", "image_url_2": "", "max_luggage": "", "min_luggage": 0, "max_passenger": "", "min_passenger": 1, "vehicle_class": "Minibus-12", "x_max_luggage": "", "x_min_luggage": "", "x_vehicle_class": "12座小巴", "vehicle_class_id": "10", "x_max_passengers": "", "x_min_passengers": "", "x_vehicle_category": "" }]
  },
  {
    "country": "GBR",
    "json": [{ "id": "6b6c-beba-cbac", "maker": "", "model": "", "x_maker": "", "x_model": "", "image_url_1": "", "image_url_2": "", "max_luggage": "", "min_luggage": "", "vehicle_class": "Sedan", "x_max_luggage": "", "x_min_luggage": "", "max_passengers": "", "min_passengers": "", "x_vehicle_class": "紧凑5座", "vehicle_class_id": "1", "x_max_passengers": "", "x_min_passengers": "", "x_vehicle_category": "", "x_vehicle_class_id": "" }, { "id": "5b51-7b10-a343", "maker": "", "model": "", "x_maker": "", "x_model": "", "image_url_1": "", "image_url_2": "", "max_luggage": "", "min_luggage": 0, "max_passenger": "", "min_passenger": 1, "vehicle_class": "Sedan", "x_max_luggage": "", "x_min_luggage": "", "x_vehicle_class": "经济5座", "vehicle_class_id": "1", "x_max_passengers": "", "x_min_passengers": "", "x_vehicle_category": "" }, { "id": "c06d-a146-c5b3", "maker": "", "model": "", "x_maker": "", "x_model": "", "image_url_1": "", "image_url_2": "", "max_luggage": "", "min_luggage": 0, "max_passenger": "", "min_passenger": 1, "vehicle_class": "Comfort Sedan", "x_max_luggage": "", "x_min_luggage": "", "x_vehicle_class": "舒适5座", "vehicle_class_id": "12", "x_max_passengers": "", "x_min_passengers": "", "x_vehicle_category": "" }, { "id": "58c5-2db3-c3e0", "maker": "", "model": "", "x_maker": "", "x_model": "", "image_url_1": "", "image_url_2": "", "max_luggage": "", "min_luggage": 0, "max_passenger": "", "min_passenger": 1, "vehicle_class": "Business Sedan", "x_max_luggage": "", "x_min_luggage": "", "x_vehicle_class": "豪华5座", "vehicle_class_id": "2", "x_max_passengers": "", "x_min_passengers": "", "x_vehicle_category": "" }, { "id": "fa04-ae1d-92db", "maker": "", "model": "", "x_maker": "", "x_model": "", "image_url_1": "", "image_url_2": "", "max_luggage": "", "min_luggage": "", "vehicle_class": "MPV-5", "x_max_luggage": "", "x_min_luggage": "", "max_passengers": "", "min_passengers": "", "x_vehicle_class": "舒适7座", "vehicle_class_id": "3", "x_max_passengers": "", "x_min_passengers": "", "x_vehicle_category": "", "x_vehicle_class_id": "" }, { "id": "8d7b-cf18-ea56", "maker": "", "model": "", "x_maker": "", "x_model": "", "image_url_1": "", "image_url_2": "", "max_luggage": "", "min_luggage": "", "vehicle_class": "Minibus-8", "x_max_luggage": "", "x_min_luggage": "", "max_passengers": "", "min_passengers": "", "x_vehicle_class": "8座小巴", "vehicle_class_id": "5", "x_max_passengers": "", "x_min_passengers": "", "x_vehicle_category": "", "x_vehicle_class_id": "" }, { "id": "00e3-065b-09ba", "maker": "", "model": "", "x_maker": "", "x_model": "", "image_url_1": "", "image_url_2": "", "max_luggage": "", "min_luggage": "", "vehicle_class": "Minibus-14", "x_max_luggage": "", "x_min_luggage": "", "max_passengers": "", "min_passengers": "", "x_vehicle_class": "14座中巴", "vehicle_class_id": "11", "x_max_passengers": "", "x_min_passengers": "", "x_vehicle_category": "", "x_vehicle_class_id": "" }]
  },
  {
    "country": "IND",
    "json": [{ "id": "0452-8464-5a5b", "maker": "", "model": "", "x_maker": "", "x_model": "", "image_url_1": "", "image_url_2": "", "max_luggage": "", "min_luggage": "", "vehicle_class": "Sedan", "x_max_luggage": "", "x_min_luggage": "", "max_passengers": "", "min_passengers": "", "x_vehicle_class": "紧凑5座", "vehicle_class_id": "1", "x_max_passengers": "", "x_min_passengers": "", "x_vehicle_category": "", "x_vehicle_class_id": "" }, { "id": "767b-d1f9-be17", "maker": "", "model": "", "x_maker": "", "x_model": "", "image_url_1": "", "image_url_2": "", "max_luggage": "", "min_luggage": "", "vehicle_class": "Sedan", "x_max_luggage": "", "x_min_luggage": "", "max_passengers": "", "min_passengers": "", "x_vehicle_class": "经济5座", "vehicle_class_id": "1", "x_max_passengers": "", "x_min_passengers": "", "x_vehicle_category": "", "x_vehicle_class_id": "" }, { "id": "60c6-3030-94e0", "maker": "", "model": "", "x_maker": "", "x_model": "", "image_url_1": "", "image_url_2": "", "max_luggage": "3", "min_luggage": 0, "max_passenger": "3", "min_passenger": 1, "vehicle_class": "Comfort Sedan", "x_max_luggage": "", "x_min_luggage": "", "x_vehicle_class": "舒适5座", "vehicle_class_id": "12", "x_max_passengers": "", "x_min_passengers": "", "x_vehicle_category": "" }, { "id": "df14-be8f-7591", "maker": "", "model": "", "x_maker": "", "x_model": "", "image_url_1": "", "image_url_2": "", "max_luggage": "", "min_luggage": "", "vehicle_class": "Business Sedan", "x_max_luggage": "", "x_min_luggage": "", "max_passengers": "", "min_passengers": "", "x_vehicle_class": "豪华5座", "vehicle_class_id": "2", "x_max_passengers": "", "x_min_passengers": "", "x_vehicle_category": "", "x_vehicle_class_id": "" }, { "id": "3fe4-ec3c-b6d4", "maker": "", "model": "", "x_maker": "", "x_model": "", "image_url_1": "", "image_url_2": "", "max_luggage": "", "min_luggage": 0, "max_passenger": "", "min_passenger": 1, "vehicle_class": "MPV-4", "x_max_luggage": "", "x_min_luggage": "", "x_vehicle_class": "舒适7座", "vehicle_class_id": "6", "x_max_passengers": "", "x_min_passengers": "", "x_vehicle_category": "" }, { "id": "1589-2049-b614", "maker": "", "model": "", "x_maker": "", "x_model": "", "image_url_1": "", "image_url_2": "", "max_luggage": "", "min_luggage": 0, "max_passenger": "", "min_passenger": 1, "vehicle_class": "Business SUV", "x_max_luggage": "", "x_min_luggage": "", "x_vehicle_class": "豪华7座", "vehicle_class_id": "4", "x_max_passengers": "", "x_min_passengers": "", "x_vehicle_category": "" }, { "id": "1020-c7c7-7c8c", "maker": "", "model": "", "x_maker": "", "x_model": "", "image_url_1": "", "image_url_2": "", "max_luggage": "", "min_luggage": 0, "max_passenger": "", "min_passenger": 1, "vehicle_class": "MPV-5", "x_max_luggage": "", "x_min_luggage": "", "x_vehicle_class": "商务7座", "vehicle_class_id": "3", "x_max_passengers": "", "x_min_passengers": "", "x_vehicle_category": "" }, { "id": "251f-ea18-5dc6", "maker": "", "model": "", "x_maker": "", "x_model": "", "image_url_1": "", "image_url_2": "", "max_luggage": "", "min_luggage": "", "vehicle_class": "Minibus-10", "x_max_luggage": "", "x_min_luggage": "", "max_passengers": "", "min_passengers": "", "x_vehicle_class": "商务9座", "vehicle_class_id": "9", "x_max_passengers": "", "x_min_passengers": "", "x_vehicle_category": "", "x_vehicle_class_id": "" }, { "id": "4000-1633-3d9c", "maker": "", "model": "", "x_maker": "", "x_model": "", "image_url_1": "", "image_url_2": "", "max_luggage": "", "min_luggage": "", "vehicle_class": "Minibus-8", "x_max_luggage": "", "x_min_luggage": "", "max_passengers": "", "min_passengers": "", "x_vehicle_class": "8座小巴", "vehicle_class_id": "5", "x_max_passengers": "", "x_min_passengers": "", "x_vehicle_category": "", "x_vehicle_class_id": "" }, { "id": "674d-4a70-8b0d", "maker": "", "model": "", "x_maker": "", "x_model": "", "image_url_1": "", "image_url_2": "", "max_luggage": "", "min_luggage": "", "vehicle_class": "Minibus-12", "x_max_luggage": "", "x_min_luggage": "", "max_passengers": "", "min_passengers": "", "x_vehicle_class": "12座小巴", "vehicle_class_id": "10", "x_max_passengers": "", "x_min_passengers": "", "x_vehicle_category": "", "x_vehicle_class_id": "" }, { "id": "713f-b792-06ec", "maker": "", "model": "", "x_maker": "", "x_model": "", "image_url_1": "", "image_url_2": "", "max_luggage": "", "min_luggage": "", "vehicle_class": "Minibus-14", "x_max_luggage": "", "x_min_luggage": "", "max_passengers": "", "min_passengers": "", "x_vehicle_class": "14座中巴", "vehicle_class_id": "11", "x_max_passengers": "", "x_min_passengers": "", "x_vehicle_category": "", "x_vehicle_class_id": "" }]
  }
]