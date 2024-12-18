// let elifeFleets = [
//   {
//     "id": 11835,
//     "parent_fleet_id": 40,
//     "name": "长沙-CSX",
//     "radius": null,
//     "lng": 113.230588,
//     "bidding": null,
//     "unverified": null,
//     "in_blacklist": null,
//     "inserted_at": "2023-02-20 06:31:49",
//     "last_updated_at": "2024-11-06 01:43:24",
//     "service_area_pricing_id": 8740,
//     "lat": 28.841313
//   }
// ]


let elifeFleets = [
  {
    "id": 38,
    "name": "San Francisco, USA",
    "lat": 37.817962,
    "lng": -122.211278,
    "radius": 144841,
    "bidding": null,
    "inserted_at": "2020-02-21 22:54:40",
    "last_updated_at": "2024-11-26 19:04:57",
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 1348111
  },
  {
    "id": 41,
    "name": "Bangkok,Thailand",
    "lat": 13.997487,
    "lng": 100.839436,
    "radius": 150000,
    "bidding": null,
    "inserted_at": "2020-02-22 00:21:22",
    "last_updated_at": "2024-11-26 12:11:18",
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 1331941
  },
  {
    "id": 43,
    "name": "Tokyo, Japan",
    "lat": 35.897797,
    "lng": 139.264891,
    "radius": 149000,
    "bidding": null,
    "inserted_at": "2020-02-22 00:36:46",
    "last_updated_at": "2024-11-22 05:03:10",
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 1186655
  },
  {
    "id": 133,
    "name": "Istanbul,Turkey",
    "lat": 40.752299,
    "lng": 28.513496,
    "radius": null,
    "bidding": null,
    "inserted_at": "2020-02-26 23:38:04",
    "last_updated_at": "2024-11-26 15:18:35",
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 1339369
  },
  {
    "id": 673,
    "name": "Changsha,CHN",
    "lat": 28.225512,
    "lng": 112.934996,
    "radius": 201000,
    "bidding": null,
    "inserted_at": "2020-10-21 22:53:55",
    "last_updated_at": "2024-09-28 03:21:11",
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 217896
  }
]



let partnerJson = {
  "service_areas": {
    "sas_percent": [
      {
        "id": 1840,
        "percent": "6"
      },
      {
        "id": 1006,
        "percent": "6"
      },
      {
        "id": 1005,
        "percent": "6"
      },
      {
        "id": 1004,
        "percent": "6"
      },
      {
        "id": 1003,
        "percent": "6"
      },
      {
        "id": 1001,
        "percent": "6"
      },
      {
        "id": 102,
        "percent": "6"
      },
      {
        "id": 106,
        "percent": "30"
      },
      {
        "id": 107,
        "percent": "10",
        "vcs": [
          {
            "id": 2,
            "percent": "35"
          },
          {
            "id": 6,
            "percent": "35"
          }
        ]
      },
      {
        "id": 105,
        "percent": "7",
        "vcs": [
          {
            "id": 2,
            "percent": "20"
          },
          {
            "id": 6,
            "percent": "10"
          },
          {
            "id": 5,
            "percent": "250"
          },
          {
            "id": 9,
            "percent": "250"
          }
        ]
      },
      {
        "id": 460,
        "percent": "6"
      },
      {
        "id": 459,
        "percent": "6"
      },
      {
        "id": 675,
        "percent": "6"
      },
      {
        "id": 674,
        "percent": "6"
      },
      {
        "id": 673,
        "percent": "6"
      },
      {
        "id": 672,
        "percent": "6"
      },
      {
        "id": 670,
        "percent": "6"
      },
      {
        "id": 667,
        "percent": "6"
      },
      {
        "id": 665,
        "percent": "6"
      },
      {
        "id": 662,
        "percent": "6"
      },
      {
        "id": 661,
        "percent": "6"
      },
      {
        "id": 660,
        "percent": "6"
      },
      {
        "id": 147,
        "percent": "6"
      },
      {
        "id": 151,
        "percent": "6"
      },
      {
        "id": 311,
        "percent": "6"
      },
      {
        "id": 275,
        "percent": "6"
      },
      {
        "id": 272,
        "percent": "6"
      },
      {
        "id": 274,
        "percent": "6"
      },
      {
        "id": 150,
        "percent": "6"
      },
      {
        "id": 1002,
        "percent": "5"
      },
      {
        "id": 50,
        "percent": "5"
      },
      {
        "id": 51,
        "percent": "5"
      },
      {
        "id": 52,
        "percent": "5"
      },
      {
        "id": 125,
        "percent": "5"
      },
      {
        "id": 49,
        "percent": "5"
      },
      {
        "id": "1053",
        "percent": "50"
      },
      {
        "id": "37148",
        "percent": "50"
      },
      {
        "id": "1062",
        "percent": "50"
      },
      {
        "id": "1117",
        "percent": "50"
      },
      {
        "id": "126",
        "percent": ""
      },
      {
        "id": "43",
        "percent": "0",
        "vcs": [
          {
            "id": 2,
            "percent": "90"
          },
          {
            "id": 4,
            "percent": "90"
          },
          {
            "id": 5,
            "percent": "50"
          },
          {
            "id": 9,
            "percent": "50"
          },
          {
            "id": 10,
            "percent": "50"
          }
        ]
      },
      {
        "id": "44",
        "percent": ""
      },
      {
        "id": "1060",
        "percent": ""
      },
      {
        "id": "128",
        "percent": ""
      },
      {
        "id": "130",
        "percent": "50"
      },
      {
        "id": "16767",
        "percent": "50"
      },
      {
        "id": "1052",
        "percent": "50"
      },
      {
        "id": "746",
        "percent": "50"
      },
      {
        "id": "1057",
        "percent": "50"
      },
      {
        "id": "1056",
        "percent": "50"
      },
      {
        "id": "745",
        "percent": "50"
      },
      {
        "id": "127",
        "percent": ""
      },
      {
        "id": "16771",
        "percent": "50"
      },
      {
        "id": 37508,
        "percent": "",
        "vcs": [
          {
            "id": 1,
            "percent": "-2"
          },
          {
            "id": 2,
            "percent": "-3"
          },
          {
            "id": 8,
            "percent": "-12"
          }
        ]
      },
      {
        "id": 62,
        "percent": "",
        "vcs": [
          {
            "id": 1,
            "percent": "15"
          },
          {
            "id": 2,
            "percent": "10"
          },
          {
            "id": 6,
            "percent": "15"
          },
          {
            "id": 3,
            "percent": "15"
          },
          {
            "id": 4,
            "percent": "10"
          }
        ]
      },
      {
        "id": 37,
        "percent": "",
        "vcs": [
          {
            "id": 1,
            "percent": "-4"
          },
          {
            "id": 2,
            "percent": "-1.1"
          },
          {
            "id": 4,
            "percent": "-1.6"
          }
        ]
      },
      {
        "id": 822,
        "percent": "1"
      },
      {
        "id": 88,
        "percent": "",
        "vcs": [
          {
            "id": 2,
            "percent": "5"
          }
        ]
      },
      {
        "id": 99,
        "percent": ""
      },
      {
        "id": 68,
        "percent": "",
        "vcs": [
          {
            "id": 1,
            "percent": "-1.5"
          }
        ]
      },
      {
        "id": 39,
        "percent": "",
        "vcs": [
          {
            "id": 1,
            "percent": "-6"
          },
          {
            "id": 2,
            "percent": "-10"
          },
          {
            "id": 6,
            "percent": "7"
          },
          {
            "id": 3,
            "percent": "7"
          },
          {
            "id": 4,
            "percent": "-15"
          }
        ]
      },
      {
        "id": 367,
        "percent": "",
        "vcs": [
          {
            "id": 1,
            "percent": "30"
          },
          {
            "id": 6,
            "percent": "25"
          },
          {
            "id": 3,
            "percent": "25"
          }
        ]
      },
      {
        "id": 89,
        "percent": "5"
      },
      {
        "id": 72,
        "percent": "10",
        "vcs": [
          {
            "id": 1,
            "percent": "8"
          }
        ]
      },
      {
        "id": 69,
        "percent": "10",
        "vcs": [
          {
            "id": 1,
            "percent": "10"
          },
          {
            "id": 6,
            "percent": "20"
          },
          {
            "id": 3,
            "percent": "20"
          }
        ]
      },
      {
        "id": 40,
        "percent": "10",
        "vcs": [
          {
            "id": 1,
            "percent": "19"
          },
          {
            "id": 3,
            "percent": "32"
          },
          {
            "id": 6,
            "percent": "25"
          }
        ]
      },
      {
        "id": 38,
        "percent": "5"
      },
      {
        "id": 113,
        "percent": "",
        "vcs": [
          {
            "id": 6,
            "percent": "8"
          }
        ]
      },
      {
        "id": 114,
        "percent": ""
      },
      {
        "id": 117,
        "percent": "",
        "vcs": [
          {
            "id": 1,
            "percent": "15"
          },
          {
            "id": 6,
            "percent": "2"
          }
        ]
      },
      {
        "id": 118,
        "percent": "",
        "vcs": [
          {
            "id": 1,
            "percent": "44"
          },
          {
            "id": 6,
            "percent": "25"
          },
          {
            "id": 3,
            "percent": "20"
          },
          {
            "id": 5,
            "percent": "26"
          },
          {
            "id": 9,
            "percent": "30"
          }
        ]
      },
      {
        "id": 45,
        "percent": "",
        "vcs": [
          {
            "id": 1,
            "percent": "4"
          },
          {
            "id": 6,
            "percent": "9"
          }
        ]
      },
      {
        "id": 929,
        "percent": "",
        "vcs": [
          {
            "id": 1,
            "percent": "-5"
          },
          {
            "id": 5,
            "percent": "-5"
          }
        ]
      },
      {
        "id": 48,
        "percent": "",
        "vcs": [
          {
            "id": 1,
            "percent": "28"
          },
          {
            "id": 6,
            "percent": "30"
          },
          {
            "id": 3,
            "percent": "35"
          }
        ]
      },
      {
        "id": 41,
        "percent": "",
        "vcs": [
          {
            "id": 1,
            "percent": "25"
          },
          {
            "id": 6,
            "percent": "16.2"
          },
          {
            "id": 3,
            "percent": "0"
          },
          {
            "id": 5,
            "percent": "-5"
          },
          {
            "id": 9,
            "percent": "30"
          }
        ]
      },
      {
        "id": 39613,
        "percent": ""
      },
      {
        "id": 1119,
        "percent": ""
      },
      {
        "id": 1471,
        "percent": ""
      },
      {
        "id": 1477,
        "percent": ""
      },
      {
        "id": 866,
        "percent": ""
      },
      {
        "id": 446,
        "percent": "",
        "vcs": [
          {
            "id": 1,
            "percent": "-8.6"
          },
          {
            "id": 6,
            "percent": "-5.6"
          }
        ]
      },
      {
        "id": 173,
        "percent": "",
        "vcs": [
          {
            "id": 1,
            "percent": "-2.12"
          }
        ]
      },
      {
        "id": 435,
        "percent": "",
        "vcs": [
          {
            "id": 1,
            "percent": "3"
          },
          {
            "id": 5,
            "percent": "-8"
          },
          {
            "id": 6,
            "percent": "-1.2"
          }
        ]
      },
      {
        "id": 316,
        "percent": ""
      },
      {
        "id": 1139,
        "percent": "",
        "vcs": [
          {
            "id": 1,
            "percent": "6.84"
          },
          {
            "id": 5,
            "percent": "5.35"
          }
        ]
      },
      {
        "id": 1127,
        "percent": "",
        "vcs": [
          {
            "id": 1,
            "percent": "-0.83"
          },
          {
            "id": 6,
            "percent": "20"
          },
          {
            "id": 3,
            "percent": "20"
          }
        ]
      },
      {
        "id": 1140,
        "percent": "",
        "vcs": [
          {
            "id": 1,
            "percent": "6.25"
          },
          {
            "id": 6,
            "percent": "42.59"
          },
          {
            "id": 5,
            "percent": "5.66"
          }
        ]
      },
      {
        "id": 452,
        "percent": "",
        "vcs": [
          {
            "id": 1,
            "percent": "-0.73"
          },
          {
            "id": 6,
            "percent": "17.7"
          }
        ]
      },
      {
        "id": 449,
        "percent": "",
        "vcs": [
          {
            "id": 1,
            "percent": "19"
          },
          {
            "id": 6,
            "percent": "20"
          },
          {
            "id": 5,
            "percent": "5"
          }
        ]
      },
      {
        "id": 328,
        "percent": "",
        "vcs": [
          {
            "id": 2,
            "percent": "25"
          },
          {
            "id": 6,
            "percent": "90"
          },
          {
            "id": 3,
            "percent": "92"
          },
          {
            "id": 7,
            "percent": "75"
          }
        ]
      },
      {
        "id": 426,
        "percent": "",
        "vcs": [
          {
            "id": 1,
            "percent": "4"
          },
          {
            "id": 6,
            "percent": "10"
          },
          {
            "id": 3,
            "percent": "10"
          },
          {
            "id": 5,
            "percent": "-19.9"
          },
          {
            "id": 8,
            "percent": "-16.7"
          }
        ]
      },
      {
        "id": 276,
        "percent": "",
        "vcs": [
          {
            "id": 1,
            "percent": "-2"
          },
          {
            "id": 2,
            "percent": "-5.5"
          },
          {
            "id": 6,
            "percent": "-10"
          },
          {
            "id": 3,
            "percent": "-5"
          },
          {
            "id": 4,
            "percent": "-10"
          },
          {
            "id": 36,
            "percent": "-10"
          },
          {
            "id": 5,
            "percent": "-8.2"
          },
          {
            "id": 7,
            "percent": "-4"
          },
          {
            "id": 8,
            "percent": "-15.23"
          }
        ]
      },
      {
        "id": "1054",
        "percent": "50"
      },
      {
        "id": "1058",
        "percent": "50"
      },
      {
        "id": "15384",
        "percent": "50"
      },
      {
        "id": "1059",
        "percent": "50"
      },
      {
        "id": "1061",
        "percent": "50"
      }
    ],
    "ads_delta": [
      {
        "id": "69",
        "infant": {
          "delta": 0,
          "currency": "USD",
          "switch": "on"
        },
        "toddler": {
          "delta": 0,
          "currency": "USD",
          "switch": "on"
        },
        "children": {
          "delta": 0,
          "currency": "USD",
          "switch": "on"
        },
        "meal": {
          "delta": 0,
          "currency": "USD",
          "switch": "off"
        },
        "lodge": {
          "delta": 0,
          "currency": "USD",
          "switch": "off"
        }
      },
      {
        "id": "72",
        "infant": {
          "delta": 0,
          "currency": "USD",
          "switch": "on"
        },
        "toddler": {
          "delta": 0,
          "currency": "USD",
          "switch": "on"
        },
        "children": {
          "delta": 0,
          "currency": "USD",
          "switch": "on"
        },
        "meal": {
          "delta": 0,
          "currency": "USD",
          "switch": "off"
        },
        "lodge": {
          "delta": 0,
          "currency": "USD",
          "switch": "off"
        }
      },
      {
        "id": "89",
        "infant": {
          "delta": 0,
          "currency": "USD",
          "switch": "on"
        },
        "toddler": {
          "delta": 0,
          "currency": "USD",
          "switch": "on"
        },
        "children": {
          "delta": 0,
          "currency": "USD",
          "switch": "on"
        },
        "meal": {
          "delta": 0,
          "currency": "USD",
          "switch": "off"
        },
        "lodge": {
          "delta": 0,
          "currency": "USD",
          "switch": "off"
        }
      },
      {
        "id": "99",
        "infant": {
          "delta": 0,
          "currency": "USD",
          "switch": "on"
        },
        "toddler": {
          "delta": 0,
          "currency": "USD",
          "switch": "on"
        },
        "children": {
          "delta": 0,
          "currency": "USD",
          "switch": "on"
        },
        "meal": {
          "delta": 0,
          "currency": "USD",
          "switch": "off"
        },
        "lodge": {
          "delta": 0,
          "currency": "USD",
          "switch": "off"
        }
      },
      {
        "id": "68",
        "infant": {
          "delta": 0,
          "currency": "USD",
          "switch": "on"
        },
        "toddler": {
          "delta": 0,
          "currency": "USD",
          "switch": "on"
        },
        "children": {
          "delta": 0,
          "currency": "USD",
          "switch": "on"
        },
        "meal": {
          "delta": 0,
          "currency": "USD",
          "switch": "off"
        },
        "lodge": {
          "delta": 0,
          "currency": "USD",
          "switch": "off"
        }
      },
      {
        "id": "37",
        "infant": {
          "delta": 0,
          "currency": "USD",
          "switch": "on"
        },
        "toddler": {
          "delta": 0,
          "currency": "USD",
          "switch": "on"
        },
        "children": {
          "delta": 0,
          "currency": "USD",
          "switch": "on"
        },
        "meal": {
          "delta": 0,
          "currency": "USD",
          "switch": "off"
        },
        "lodge": {
          "delta": 0,
          "currency": "USD",
          "switch": "off"
        }
      },
      {
        "id": "62",
        "infant": {
          "delta": 0,
          "currency": "USD",
          "switch": "on"
        },
        "toddler": {
          "delta": 0,
          "currency": "USD",
          "switch": "on"
        },
        "children": {
          "delta": 0,
          "currency": "USD",
          "switch": "on"
        },
        "meal": {
          "delta": 0,
          "currency": "USD",
          "switch": "off"
        },
        "lodge": {
          "delta": 0,
          "currency": "USD",
          "switch": "off"
        }
      },
      {
        "id": "87",
        "infant": {
          "delta": 0,
          "currency": "USD",
          "switch": "on"
        },
        "toddler": {
          "delta": 0,
          "currency": "USD",
          "switch": "on"
        },
        "children": {
          "delta": 0,
          "currency": "USD",
          "switch": "on"
        },
        "meal": {
          "delta": 0,
          "currency": "USD",
          "switch": "off"
        },
        "lodge": {
          "delta": 0,
          "currency": "USD",
          "switch": "off"
        }
      },
      {
        "id": "88",
        "infant": {
          "delta": 0,
          "currency": "USD",
          "switch": "on"
        },
        "toddler": {
          "delta": 0,
          "currency": "USD",
          "switch": "on"
        },
        "children": {
          "delta": 0,
          "currency": "USD",
          "switch": "on"
        },
        "meal": {
          "delta": 0,
          "currency": "USD",
          "switch": "off"
        },
        "lodge": {
          "delta": 0,
          "currency": "USD",
          "switch": "off"
        }
      },
      {
        "id": "39",
        "infant": {
          "delta": 0,
          "currency": "USD",
          "switch": "on"
        },
        "toddler": {
          "delta": 0,
          "currency": "USD",
          "switch": "on"
        },
        "children": {
          "delta": 0,
          "currency": "USD",
          "switch": "on"
        },
        "meal": {
          "delta": 0,
          "currency": "USD",
          "switch": "off"
        },
        "lodge": {
          "delta": 0,
          "currency": "USD",
          "switch": "off"
        }
      },
      {
        "id": "84",
        "infant": {
          "delta": 0,
          "currency": "USD",
          "switch": "on"
        },
        "toddler": {
          "delta": 0,
          "currency": "USD",
          "switch": "on"
        },
        "children": {
          "delta": 0,
          "currency": "USD",
          "switch": "on"
        },
        "meal": {
          "delta": 0,
          "currency": "USD",
          "switch": "off"
        },
        "lodge": {
          "delta": 0,
          "currency": "USD",
          "switch": "off"
        }
      },
      {
        "id": "70",
        "infant": {
          "delta": 0,
          "currency": "USD",
          "switch": "on"
        },
        "toddler": {
          "delta": 0,
          "currency": "USD",
          "switch": "on"
        },
        "children": {
          "delta": 0,
          "currency": "USD",
          "switch": "on"
        },
        "meal": {
          "delta": 0,
          "currency": "USD",
          "switch": "off"
        },
        "lodge": {
          "delta": 0,
          "currency": "USD",
          "switch": "off"
        }
      },
      {
        "id": "40",
        "infant": {
          "delta": 0,
          "currency": "USD",
          "switch": "on"
        },
        "toddler": {
          "delta": 0,
          "currency": "USD",
          "switch": "on"
        },
        "children": {
          "delta": 0,
          "currency": "USD",
          "switch": "on"
        },
        "meal": {
          "delta": 0,
          "currency": "USD",
          "switch": "off"
        },
        "lodge": {
          "delta": 0,
          "currency": "USD",
          "switch": "off"
        }
      },
      {
        "id": "73",
        "infant": {
          "delta": 0,
          "currency": "USD",
          "switch": "on"
        },
        "toddler": {
          "delta": 0,
          "currency": "USD",
          "switch": "on"
        },
        "children": {
          "delta": 0,
          "currency": "USD",
          "switch": "on"
        },
        "meal": {
          "delta": 0,
          "currency": "USD",
          "switch": "off"
        },
        "lodge": {
          "delta": 0,
          "currency": "USD",
          "switch": "off"
        }
      },
      {
        "id": "74",
        "infant": {
          "delta": 0,
          "currency": "USD",
          "switch": "on"
        },
        "toddler": {
          "delta": 0,
          "currency": "USD",
          "switch": "on"
        },
        "children": {
          "delta": 0,
          "currency": "USD",
          "switch": "on"
        },
        "meal": {
          "delta": 0,
          "currency": "USD",
          "switch": "off"
        },
        "lodge": {
          "delta": 0,
          "currency": "USD",
          "switch": "off"
        }
      },
      {
        "id": "390",
        "infant": {
          "delta": 0,
          "currency": "USD",
          "switch": "on"
        },
        "toddler": {
          "delta": 0,
          "currency": "USD",
          "switch": "on"
        },
        "children": {
          "delta": 0,
          "currency": "USD",
          "switch": "on"
        },
        "meal": {
          "delta": 0,
          "currency": "USD",
          "switch": "off"
        },
        "lodge": {
          "delta": 0,
          "currency": "USD",
          "switch": "off"
        }
      },
      {
        "id": "76",
        "infant": {
          "delta": 0,
          "currency": "USD",
          "switch": "on"
        },
        "toddler": {
          "delta": 0,
          "currency": "USD",
          "switch": "on"
        },
        "children": {
          "delta": 0,
          "currency": "USD",
          "switch": "on"
        },
        "meal": {
          "delta": 0,
          "currency": "USD",
          "switch": "off"
        },
        "lodge": {
          "delta": 0,
          "currency": "USD",
          "switch": "off"
        }
      },
      {
        "id": "94",
        "infant": {
          "delta": 0,
          "currency": "USD",
          "switch": "on"
        },
        "toddler": {
          "delta": 0,
          "currency": "USD",
          "switch": "on"
        },
        "children": {
          "delta": 0,
          "currency": "USD",
          "switch": "on"
        },
        "meal": {
          "delta": 0,
          "currency": "USD",
          "switch": "off"
        },
        "lodge": {
          "delta": 0,
          "currency": "USD",
          "switch": "off"
        }
      },
      {
        "id": "65",
        "infant": {
          "delta": 0,
          "currency": "USD",
          "switch": "on"
        },
        "toddler": {
          "delta": 0,
          "currency": "USD",
          "switch": "on"
        },
        "children": {
          "delta": 0,
          "currency": "USD",
          "switch": "on"
        },
        "meal": {
          "delta": 0,
          "currency": "USD",
          "switch": "off"
        },
        "lodge": {
          "delta": 0,
          "currency": "USD",
          "switch": "off"
        }
      },
      {
        "id": "98",
        "infant": {
          "delta": 0,
          "currency": "USD",
          "switch": "on"
        },
        "toddler": {
          "delta": 0,
          "currency": "USD",
          "switch": "on"
        },
        "children": {
          "delta": 0,
          "currency": "USD",
          "switch": "on"
        },
        "meal": {
          "delta": 0,
          "currency": "USD",
          "switch": "off"
        },
        "lodge": {
          "delta": 0,
          "currency": "USD",
          "switch": "off"
        }
      },
      {
        "id": "77",
        "infant": {
          "delta": 0,
          "currency": "USD",
          "switch": "on"
        },
        "toddler": {
          "delta": 0,
          "currency": "USD",
          "switch": "on"
        },
        "children": {
          "delta": 0,
          "currency": "USD",
          "switch": "on"
        },
        "meal": {
          "delta": 0,
          "currency": "USD",
          "switch": "off"
        },
        "lodge": {
          "delta": 0,
          "currency": "USD",
          "switch": "off"
        }
      },
      {
        "id": "38",
        "infant": {
          "delta": 0,
          "currency": "USD",
          "switch": "on"
        },
        "toddler": {
          "delta": 0,
          "currency": "USD",
          "switch": "on"
        },
        "children": {
          "delta": 0,
          "currency": "USD",
          "switch": "on"
        },
        "meal": {
          "delta": 0,
          "currency": "USD",
          "switch": "off"
        },
        "lodge": {
          "delta": 0,
          "currency": "USD",
          "switch": "off"
        }
      },
      {
        "id": "56",
        "infant": {
          "delta": 0,
          "currency": "USD",
          "switch": "on"
        },
        "toddler": {
          "delta": 0,
          "currency": "USD",
          "switch": "on"
        },
        "children": {
          "delta": 0,
          "currency": "USD",
          "switch": "on"
        },
        "meal": {
          "delta": 0,
          "currency": "USD",
          "switch": "off"
        },
        "lodge": {
          "delta": 0,
          "currency": "USD",
          "switch": "off"
        }
      },
      {
        "id": "58",
        "infant": {
          "delta": 0,
          "currency": "USD",
          "switch": "on"
        },
        "toddler": {
          "delta": 0,
          "currency": "USD",
          "switch": "on"
        },
        "children": {
          "delta": 0,
          "currency": "USD",
          "switch": "on"
        },
        "meal": {
          "delta": 0,
          "currency": "USD",
          "switch": "off"
        },
        "lodge": {
          "delta": 0,
          "currency": "USD",
          "switch": "off"
        }
      },
      {
        "id": "55",
        "infant": {
          "delta": 0,
          "currency": "USD",
          "switch": "off"
        },
        "toddler": {
          "delta": 0,
          "currency": "USD",
          "switch": "off"
        },
        "children": {
          "delta": 0,
          "currency": "USD",
          "switch": "off"
        },
        "meal": {
          "delta": 0,
          "currency": "USD",
          "switch": "off"
        },
        "lodge": {
          "delta": 0,
          "currency": "USD",
          "switch": "off"
        }
      },
      {
        "id": "57",
        "infant": {
          "delta": 0,
          "currency": "USD",
          "switch": "off"
        },
        "toddler": {
          "delta": 0,
          "currency": "USD",
          "switch": "off"
        },
        "children": {
          "delta": 0,
          "currency": "USD",
          "switch": "off"
        },
        "meal": {
          "delta": 0,
          "currency": "USD",
          "switch": "off"
        },
        "lodge": {
          "delta": 0,
          "currency": "USD",
          "switch": "off"
        }
      },
      {
        "id": "92",
        "infant": {
          "delta": 0,
          "currency": "USD",
          "switch": "on"
        },
        "toddler": {
          "delta": 0,
          "currency": "USD",
          "switch": "on"
        },
        "children": {
          "delta": 0,
          "currency": "USD",
          "switch": "on"
        },
        "meal": {
          "delta": 0,
          "currency": "USD",
          "switch": "off"
        },
        "lodge": {
          "delta": 0,
          "currency": "USD",
          "switch": "off"
        }
      },
      {
        "id": "96",
        "infant": {
          "delta": 0,
          "currency": "USD",
          "switch": "off"
        },
        "toddler": {
          "delta": 0,
          "currency": "USD",
          "switch": "off"
        },
        "children": {
          "delta": 0,
          "currency": "USD",
          "switch": "off"
        },
        "meal": {
          "delta": 0,
          "currency": "USD",
          "switch": "off"
        },
        "lodge": {
          "delta": 0,
          "currency": "USD",
          "switch": "off"
        }
      },
      {
        "id": "384",
        "infant": {
          "delta": 0,
          "currency": "USD",
          "switch": "off"
        },
        "toddler": {
          "delta": 0,
          "currency": "USD",
          "switch": "off"
        },
        "children": {
          "delta": 0,
          "currency": "USD",
          "switch": "off"
        },
        "meal": {
          "delta": 0,
          "currency": "USD",
          "switch": "off"
        },
        "lodge": {
          "delta": 0,
          "currency": "USD",
          "switch": "off"
        }
      },
      {
        "id": "85",
        "infant": {
          "delta": 0,
          "currency": "USD",
          "switch": "off"
        },
        "toddler": {
          "delta": 0,
          "currency": "USD",
          "switch": "off"
        },
        "children": {
          "delta": 0,
          "currency": "USD",
          "switch": "off"
        },
        "meal": {
          "delta": 0,
          "currency": "USD",
          "switch": "off"
        },
        "lodge": {
          "delta": 0,
          "currency": "USD",
          "switch": "off"
        }
      },
      {
        "id": "86",
        "infant": {
          "delta": 0,
          "currency": "USD",
          "switch": "on"
        },
        "toddler": {
          "delta": 0,
          "currency": "USD",
          "switch": "on"
        },
        "children": {
          "delta": 0,
          "currency": "USD",
          "switch": "on"
        },
        "meal": {
          "delta": 0,
          "currency": "USD",
          "switch": "off"
        },
        "lodge": {
          "delta": 0,
          "currency": "USD",
          "switch": "off"
        }
      },
      {
        "id": "67",
        "infant": {
          "delta": 0,
          "currency": "USD",
          "switch": "off"
        },
        "toddler": {
          "delta": 0,
          "currency": "USD",
          "switch": "off"
        },
        "children": {
          "delta": 0,
          "currency": "USD",
          "switch": "off"
        },
        "meal": {
          "delta": 0,
          "currency": "USD",
          "switch": "off"
        },
        "lodge": {
          "delta": 0,
          "currency": "USD",
          "switch": "off"
        }
      },
      {
        "id": "60",
        "infant": {
          "delta": 0,
          "currency": "USD",
          "switch": "off"
        },
        "toddler": {
          "delta": 0,
          "currency": "USD",
          "switch": "off"
        },
        "children": {
          "delta": 0,
          "currency": "USD",
          "switch": "off"
        },
        "meal": {
          "delta": 0,
          "currency": "USD",
          "switch": "off"
        },
        "lodge": {
          "delta": 0,
          "currency": "USD",
          "switch": "off"
        }
      },
      {
        "id": "391",
        "infant": {
          "delta": 0,
          "currency": "USD",
          "switch": "off"
        },
        "toddler": {
          "delta": 0,
          "currency": "USD",
          "switch": "off"
        },
        "children": {
          "delta": 0,
          "currency": "USD",
          "switch": "off"
        },
        "meal": {
          "delta": 0,
          "currency": "USD",
          "switch": "off"
        },
        "lodge": {
          "delta": 0,
          "currency": "USD",
          "switch": "off"
        }
      }
    ],
    "mag_delta": [
      {
        "id": "69",
        "delta": 0,
        "currency": "USD",
        "switch": "off"
      },
      {
        "id": "72",
        "delta": 0,
        "currency": "USD",
        "switch": "off"
      },
      {
        "id": "89",
        "delta": 0,
        "currency": "USD",
        "switch": "off"
      },
      {
        "id": "99",
        "delta": 0,
        "currency": "USD",
        "switch": "off"
      },
      {
        "id": "68",
        "delta": 0,
        "currency": "USD",
        "switch": "off"
      },
      {
        "id": "37",
        "delta": 0,
        "currency": "USD",
        "switch": "off"
      },
      {
        "id": "62",
        "delta": 0,
        "currency": "USD",
        "switch": "off"
      },
      {
        "id": "87",
        "delta": 0,
        "currency": "USD",
        "switch": "off"
      },
      {
        "id": "88",
        "delta": 0,
        "currency": "USD",
        "switch": "off"
      },
      {
        "id": "39",
        "delta": 0,
        "currency": "USD",
        "switch": "off"
      },
      {
        "id": "84",
        "delta": 0,
        "currency": "USD",
        "switch": "off"
      },
      {
        "id": "70",
        "delta": 0,
        "currency": "USD",
        "switch": "off"
      },
      {
        "id": "40",
        "delta": 0,
        "currency": "USD",
        "switch": "off"
      },
      {
        "id": "73",
        "delta": 0,
        "currency": "USD",
        "switch": "off"
      },
      {
        "id": "74",
        "delta": 0,
        "currency": "USD",
        "switch": "off"
      },
      {
        "id": "390",
        "delta": 0,
        "currency": "USD",
        "switch": "off"
      },
      {
        "id": "76",
        "delta": 0,
        "currency": "USD",
        "switch": "off"
      },
      {
        "id": "94",
        "delta": 0,
        "currency": "USD",
        "switch": "off"
      },
      {
        "id": "65",
        "delta": 0,
        "currency": "USD",
        "switch": "off"
      },
      {
        "id": "98",
        "delta": 0,
        "currency": "USD",
        "switch": "off"
      },
      {
        "id": "77",
        "delta": -12,
        "currency": "USD",
        "switch": "off"
      },
      {
        "id": "38",
        "delta": 0,
        "currency": "USD",
        "switch": "off"
      },
      {
        "id": "56",
        "delta": 0,
        "currency": "USD",
        "switch": "off"
      },
      {
        "id": "58",
        "delta": 0,
        "currency": "USD",
        "switch": "off"
      },
      {
        "id": "55",
        "delta": 0,
        "currency": "USD",
        "switch": "off"
      },
      {
        "id": "57",
        "delta": 0,
        "currency": "USD",
        "switch": "off"
      },
      {
        "id": "92",
        "delta": 0,
        "currency": "USD",
        "switch": "off"
      },
      {
        "id": "96",
        "delta": 0,
        "currency": "USD",
        "switch": "off"
      },
      {
        "id": "384",
        "delta": -5,
        "currency": "USD",
        "switch": "off"
      },
      {
        "id": "85",
        "delta": 0,
        "currency": "USD",
        "switch": "off"
      },
      {
        "id": "86",
        "delta": 0,
        "currency": "USD",
        "switch": "off"
      },
      {
        "id": "67",
        "delta": 0,
        "currency": "USD",
        "switch": "off"
      },
      {
        "id": "60",
        "delta": 0,
        "currency": "USD",
        "switch": "off"
      },
      {
        "id": "391",
        "delta": -5,
        "currency": "USD",
        "switch": "off"
      }
    ]
  },
  "doNotDel": "doNotDel"
}










let aleadyInserta = [
  {
    "id": 1707,
    "name": "Aurangabad, India",
    "lat": 19.867355,
    "lng": 75.395796,
    "radius": 250000,
    "bidding": null,
    "inserted_at": "2020-12-17 17:55:42",
    "last_updated_at": "2024-02-17 14:57:48",
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 124600,
    "note": "airport has aleady exist"
  },
  {
    "id": 673,
    "name": "Changsha,CHN",
    "lat": 28.225512,
    "lng": 112.934996,
    "radius": 201000,
    "bidding": null,
    "inserted_at": "2020-10-21 22:53:55",
    "last_updated_at": "2024-09-28 03:21:11",
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 217896,
    "note": "airport has aleady exist"
  },
  {
    "id": 1281,
    "name": "Corn Island Nicaragua",
    "lat": 12.172143,
    "lng": -83.059543,
    "radius": 3768,
    "bidding": null,
    "inserted_at": "2020-12-04 00:00:26",
    "last_updated_at": "2023-05-19 08:35:09",
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": null,
    "note": "airport has aleady exist"
  },
  {
    "id": 276,
    "name": "Paris,France",
    "lat": 48.850908,
    "lng": 2.397494,
    "radius": 100000,
    "bidding": null,
    "inserted_at": "2020-06-08 20:49:25",
    "last_updated_at": "2024-11-04 04:47:23",
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 565584,
    "note": "airport has aleady exist"
  },
  {
    "id": 276,
    "name": "Paris,France",
    "lat": 48.850908,
    "lng": 2.397494,
    "radius": 100000,
    "bidding": null,
    "inserted_at": "2020-06-08 20:49:25",
    "last_updated_at": "2024-11-04 04:47:23",
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 565584,
    "note": "airport has aleady exist"
  },
  {
    "id": 70,
    "name": "Tampa,USA",
    "lat": 27.785242,
    "lng": -82.566552,
    "radius": 80467,
    "bidding": null,
    "inserted_at": "2020-02-23 02:51:17",
    "last_updated_at": "2024-11-06 23:23:46",
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 655204,
    "note": "airport has aleady exist"
  },
  {
    "id": 70,
    "name": "Tampa,USA",
    "lat": 27.785242,
    "lng": -82.566552,
    "radius": 80467,
    "bidding": null,
    "inserted_at": "2020-02-23 02:51:17",
    "last_updated_at": "2024-11-06 23:23:46",
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 655204,
    "note": "airport has aleady exist"
  },
  {
    "id": 26047,
    "name": "Tenerife South Spain",
    "lat": 28.046758,
    "lng": -16.57253,
    "radius": 150000,
    "bidding": null,
    "inserted_at": "2023-07-06 18:30:40",
    "last_updated_at": "2024-10-07 10:16:53",
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 245312,
    "note": "airport has aleady exist"
  }
]

let errorLista = [
  {
    "id": 18014,
    "name": "Hatay",
    "lat": 36.363345,
    "lng": 36.284129,
    "radius": 200000,
    "bidding": null,
    "inserted_at": "2023-02-01 09:44:26",
    "last_updated_at": "2023-02-01 09:44:26",
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": null,
    "note": "no pricing json"
  },
  {
    "id": 18512,
    "name": "Uvero alto",
    "lat": 18.808542,
    "lng": -68.58138,
    "radius": 41865,
    "bidding": null,
    "inserted_at": "2023-02-14 21:05:41",
    "last_updated_at": "2023-02-14 21:05:41",
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": null,
    "note": "no pricing json"
  }
]

let list = [
  {
    "id": 1707,
    "name": "Aurangabad, India",
    "lat": 19.867355,
    "lng": 75.395796,
    "radius": 250000,
    "bidding": null,
    "inserted_at": "2020-12-17 17:55:42",
    "last_updated_at": "2024-02-17 14:57:48",
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 124600,
    "note": "airport has aleady exist"
  },
  {
    "id": 26047,
    "name": "Tenerife South Spain",
    "lat": 28.046758,
    "lng": -16.57253,
    "radius": 150000,
    "bidding": null,
    "inserted_at": "2023-07-06 18:30:40",
    "last_updated_at": "2024-10-07 10:16:53",
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 245312,
    "note": "airport has aleady exist"
  }
]