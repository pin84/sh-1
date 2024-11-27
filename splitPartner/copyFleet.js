/**
select id ,name,lat,lng,radius,bidding,parent_fleet_id,unverified,service_area_pricing_id  from fleet where parent_fleet_id = 15 and radius > 1

select id ,name,lat,lng,radius,bidding,parent_fleet_id,unverified,service_area_pricing_id from fleet where parent_fleet_id = 15 and radius is null
 */


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


// let elifeFleets = [
//   {
//     "id": 38,
//     "name": "San Francisco, USA",
//     "lat": 37.817962,
//     "lng": -122.211278,
//     "radius": 144841,
//     "bidding": null,
//     "inserted_at": "2020-02-21 22:54:40",
//     "last_updated_at": "2024-11-26 19:04:57",
//     "parent_fleet_id": 15,
//     "unverified": null,
//     "service_area_pricing_id": 1348111
//   },
//   {
//     "id": 41,
//     "name": "Bangkok,Thailand",
//     "lat": 13.997487,
//     "lng": 100.839436,
//     "radius": 150000,
//     "bidding": null,
//     "inserted_at": "2020-02-22 00:21:22",
//     "last_updated_at": "2024-11-26 12:11:18",
//     "parent_fleet_id": 15,
//     "unverified": null,
//     "service_area_pricing_id": 1331941
//   },
//   {
//     "id": 43,
//     "name": "Tokyo, Japan",
//     "lat": 35.897797,
//     "lng": 139.264891,
//     "radius": 149000,
//     "bidding": null,
//     "inserted_at": "2020-02-22 00:36:46",
//     "last_updated_at": "2024-11-22 05:03:10",
//     "parent_fleet_id": 15,
//     "unverified": null,
//     "service_area_pricing_id": 1186655
//   },
//   {
//     "id": 133,
//     "name": "Istanbul,Turkey",
//     "lat": 40.752299,
//     "lng": 28.513496,
//     "radius": null,
//     "bidding": null,
//     "inserted_at": "2020-02-26 23:38:04",
//     "last_updated_at": "2024-11-26 15:18:35",
//     "parent_fleet_id": 15,
//     "unverified": null,
//     "service_area_pricing_id": 1339369
//   },
//   {
//     "id": 673,
//     "name": "Changsha,CHN",
//     "lat": 28.225512,
//     "lng": 112.934996,
//     "radius": 201000,
//     "bidding": null,
//     "inserted_at": "2020-10-21 22:53:55",
//     "last_updated_at": "2024-09-28 03:21:11",
//     "parent_fleet_id": 15,
//     "unverified": null,
//     "service_area_pricing_id": 217896
//   }
// ]

let elifeFleets = [
  {
    "id": 1172,
    "name": "A Coruna,Spain",
    "lat": 43.301164,
    "lng": -8.379209,
    "radius": 130000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 227744
  },
  {
    "id": 1608,
    "name": "Aalborg, Denmark",
    "lat": 57.096919,
    "lng": 9.856463,
    "radius": 58000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 451855
  },
  {
    "id": 1610,
    "name": "Aarhus, Denmark",
    "lat": 56.188484,
    "lng": 10.260061,
    "radius": 40000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 414639
  },
  {
    "id": 42758,
    "name": "Abbotsford",
    "lat": 49.273989,
    "lng": -122.265781,
    "radius": 30000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 126337
  },
  {
    "id": 838,
    "name": "Aberdeen,UK",
    "lat": 57.149298,
    "lng": -2.106681,
    "radius": 16093,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 1360968
  },
  {
    "id": 1374,
    "name": "Abha Saudi Arabia",
    "lat": 18.234816,
    "lng": 42.657733,
    "radius": 91526,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": null
  },
  {
    "id": 1815,
    "name": "Abidjan, Cote d'Ivoire",
    "lat": 5.254470,
    "lng": -3.929629,
    "radius": 66000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 151119
  },
  {
    "id": 153,
    "name": "Abu Dhabi",
    "lat": 24.441938,
    "lng": 54.650074,
    "radius": 146000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 666495
  },
  {
    "id": 1405,
    "name": "Abuja,Nigeria",
    "lat": 9.004025,
    "lng": 7.269052,
    "radius": 176000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 74591
  },
  {
    "id": 803,
    "name": "Acapulco,Mexico",
    "lat": 16.762312,
    "lng": -99.755607,
    "radius": 200000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 253238
  },
  {
    "id": 1415,
    "name": "Accra,Ghana",
    "lat": 5.606095,
    "lng": -0.168123,
    "radius": 104000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 260320
  },
  {
    "id": 917,
    "name": "Adana,Turkey",
    "lat": 36.887490,
    "lng": 35.281919,
    "radius": 80000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 213257
  },
  {
    "id": 1207,
    "name": "Addis Ababa, Ethiopia",
    "lat": 8.983364,
    "lng": 38.796274,
    "radius": 109000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 182672
  },
  {
    "id": 1357,
    "name": "Addu City Maldives",
    "lat": -0.674989,
    "lng": 73.073281,
    "radius": 11326,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": null
  },
  {
    "id": 138,
    "name": "Adelaide,Australia",
    "lat": -35.077640,
    "lng": 138.637415,
    "radius": 75000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 1221012
  },
  {
    "id": 1268,
    "name": "Adrar Algeria",
    "lat": 27.841245,
    "lng": -0.188088,
    "radius": 94000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 12825
  },
  {
    "id": 1039,
    "name": "Agadir,Morocco,Africa",
    "lat": 30.329929,
    "lng": -9.410286,
    "radius": 77000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 1105278
  },
  {
    "id": 1704,
    "name": "Agartala, India",
    "lat": 23.892742,
    "lng": 91.243846,
    "radius": 77000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 93920
  },
  {
    "id": 1832,
    "name": "Agra, India",
    "lat": 27.152696,
    "lng": 77.961756,
    "radius": 350000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 183734
  },
  {
    "id": 1251,
    "name": "Aguadilla, Puerto Rico",
    "lat": 18.268636,
    "lng": -66.630207,
    "radius": 112000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 1016612
  },
  {
    "id": 747,
    "name": "Aguascalientes,Mexico",
    "lat": 21.701298,
    "lng": -102.316228,
    "radius": 128000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 200512
  },
  {
    "id": 1705,
    "name": "Ahmedabad,India",
    "lat": 23.073426,
    "lng": 72.626571,
    "radius": 500000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 739919
  },
  {
    "id": 1122,
    "name": "Ajaccio,France",
    "lat": 41.920217,
    "lng": 8.794628,
    "radius": 97000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 183903
  },
  {
    "id": 27563,
    "name": "Ajmer",
    "lat": 26.589548,
    "lng": 74.817039,
    "radius": 300000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 91116
  },
  {
    "id": 1052,
    "name": "Akita,Japan",
    "lat": 39.612004,
    "lng": 140.220164,
    "radius": 62000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 492598
  },
  {
    "id": 1853,
    "name": "Akola, India",
    "lat": 20.696181,
    "lng": 77.059063,
    "radius": 81000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 29505
  },
  {
    "id": 1677,
    "name": "Aktau Kazakhstan",
    "lat": 43.856809,
    "lng": 51.086945,
    "radius": 121209,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": null
  },
  {
    "id": 1678,
    "name": "Aktobe  Kazakhstan",
    "lat": 50.248757,
    "lng": 57.210795,
    "radius": 105719,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": null
  },
  {
    "id": 1632,
    "name": "Akureyri, Iceland",
    "lat": 65.654617,
    "lng": -18.075596,
    "radius": 100000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 386794
  },
  {
    "id": 1386,
    "name": "Al Ain  United Arab Emirates",
    "lat": 24.656035,
    "lng": 55.078362,
    "radius": 109493,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": null
  },
  {
    "id": 1375,
    "name": "Al-Ahsa  Saudi Arabia",
    "lat": 25.289359,
    "lng": 49.486170,
    "radius": 85000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 6509
  },
  {
    "id": 1376,
    "name": "Al-Jawf, Saudi Arabia",
    "lat": 29.788502,
    "lng": 40.102021,
    "radius": 90000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 504592
  },
  {
    "id": 1622,
    "name": "Aland, Finland",
    "lat": 60.199882,
    "lng": 19.946022,
    "radius": 25000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 68583
  },
  {
    "id": 1769,
    "name": "Albacete Spain",
    "lat": 38.945425,
    "lng": -1.880315,
    "radius": 190000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": null
  },
  {
    "id": 399,
    "name": "Albany, NY, USA",
    "lat": 42.748712,
    "lng": -73.805498,
    "radius": 262322,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 162749
  },
  {
    "id": 380,
    "name": "Albuquerque, NM, USA",
    "lat": 35.043333,
    "lng": -106.612909,
    "radius": 199558,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 199317
  },
  {
    "id": 1160,
    "name": "Alderney  Guernsey",
    "lat": 49.707396,
    "lng": -2.190232,
    "radius": 3930,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": null
  },
  {
    "id": 1633,
    "name": "Alesund, Norway",
    "lat": 62.558656,
    "lng": 6.115278,
    "radius": 56000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 162687
  },
  {
    "id": 976,
    "name": "Alexandria-ALY,Egypt",
    "lat": 31.192316,
    "lng": 29.953056,
    "radius": 97000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 110398
  },
  {
    "id": 1854,
    "name": "Alexandria, LA, USA",
    "lat": 31.327411,
    "lng": -92.545186,
    "radius": 80467,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 62004
  },
  {
    "id": 975,
    "name": "Alexandria,Egypt",
    "lat": 30.932410,
    "lng": 29.696464,
    "radius": 96000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 160649
  },
  {
    "id": 1226,
    "name": "Alghero,Italy",
    "lat": 39.572618,
    "lng": 8.713522,
    "radius": 200000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 264829
  },
  {
    "id": 1308,
    "name": "Algiers,Algeria",
    "lat": 36.697922,
    "lng": 3.206867,
    "radius": 99000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 210158
  },
  {
    "id": 451,
    "name": "Alicante, Spain",
    "lat": 38.285483,
    "lng": -0.560056,
    "radius": 89000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 845925
  },
  {
    "id": 1679,
    "name": "Almaty,Kazakhstan",
    "lat": 43.349927,
    "lng": 77.025289,
    "radius": 100000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 198804
  },
  {
    "id": 874,
    "name": "Almeria,Spain",
    "lat": 36.844647,
    "lng": -2.373148,
    "radius": 56000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 193391
  },
  {
    "id": 1001,
    "name": "Alor Setar, Malaysia",
    "lat": 6.101301,
    "lng": 100.435831,
    "radius": 59278,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 1119804
  },
  {
    "id": 37329,
    "name": "Alta, Norway",
    "lat": 69.977909,
    "lng": 23.346842,
    "radius": 500000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 499401
  },
  {
    "id": 1038,
    "name": "Altenburg, German",
    "lat": 50.979207,
    "lng": 12.510923,
    "radius": 20000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 112613
  },
  {
    "id": 16893,
    "name": "amalfi",
    "lat": 40.823869,
    "lng": 14.583444,
    "radius": 35000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 363119
  },
  {
    "id": 25362,
    "name": "Amboseli Kenya",
    "lat": -2.645649,
    "lng": 37.248716,
    "radius": 150000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 36351
  },
  {
    "id": 1706,
    "name": "Amritsar, India",
    "lat": 31.705620,
    "lng": 74.806864,
    "radius": 300000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 458149
  },
  {
    "id": 318,
    "name": "Amsterdam,Netherlands",
    "lat": 52.454400,
    "lng": 5.388415,
    "radius": 150000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 1323710
  },
  {
    "id": 379,
    "name": "Anchorage,USA",
    "lat": 61.175886,
    "lng": -149.990079,
    "radius": 482802,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 805677
  },
  {
    "id": 873,
    "name": "Ancona,Italy",
    "lat": 43.338578,
    "lng": 13.372781,
    "radius": 50000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 264841
  },
  {
    "id": 1695,
    "name": "Andijan Uzbekistan",
    "lat": 40.739175,
    "lng": 72.313218,
    "radius": 76873,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": null
  },
  {
    "id": 920,
    "name": "Angeles, Philippines",
    "lat": 15.184649,
    "lng": 120.556924,
    "radius": 87000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 1370088
  },
  {
    "id": 37520,
    "name": "Angelholm-Helsingborg",
    "lat": 56.287315,
    "lng": 12.868031,
    "radius": 30000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 116760
  },
  {
    "id": 135,
    "name": "Ankara, Turkey",
    "lat": 40.038423,
    "lng": 33.300505,
    "radius": 220000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 1159849
  },
  {
    "id": 1269,
    "name": "Annaba  Algeria",
    "lat": 36.824058,
    "lng": 7.821569,
    "radius": 87201,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": null
  },
  {
    "id": 134,
    "name": "Antalya,Turkey",
    "lat": 36.735101,
    "lng": 31.005962,
    "radius": 140000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 1196761
  },
  {
    "id": 1339,
    "name": "Antananarivo  Madagascar",
    "lat": -18.799302,
    "lng": 47.475271,
    "radius": 200000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 7701
  },
  {
    "id": 848,
    "name": "Antigua,Antigua and Barbuda",
    "lat": 17.083909,
    "lng": -61.783572,
    "radius": 16000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 329715
  },
  {
    "id": 1285,
    "name": "Antofagasta  Chile",
    "lat": -23.448436,
    "lng": -70.440731,
    "radius": 147052,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": null
  },
  {
    "id": 1340,
    "name": "Antsiranana  Madagascar",
    "lat": -12.560302,
    "lng": 49.360085,
    "radius": 98854,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": null
  },
  {
    "id": 1119,
    "name": "Antwerp,Belgium",
    "lat": 51.237441,
    "lng": 4.373060,
    "radius": 100000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 1189672
  },
  {
    "id": 1053,
    "name": "Aomori,Japan",
    "lat": 40.789707,
    "lng": 140.701344,
    "radius": 53000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 492602
  },
  {
    "id": 786,
    "name": "Appleton  WI  USA",
    "lat": 44.260286,
    "lng": -88.511193,
    "radius": 160934,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 25756
  },
  {
    "id": 1366,
    "name": "Aqaba, Jordan",
    "lat": 29.613297,
    "lng": 35.019938,
    "radius": 96000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 194038
  },
  {
    "id": 942,
    "name": "Aracaju  Brazil",
    "lat": -10.986988,
    "lng": -37.072620,
    "radius": 256018,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": null
  },
  {
    "id": 1297,
    "name": "Arequipa,Peru",
    "lat": -16.344681,
    "lng": -71.567881,
    "radius": 84000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 412162
  },
  {
    "id": 1824,
    "name": "Arica  Chile",
    "lat": -18.348474,
    "lng": -70.335360,
    "radius": 90338,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 16352
  },
  {
    "id": 434,
    "name": "Arlanda Airport Stockholm",
    "lat": 59.643457,
    "lng": 17.945930,
    "radius": 60000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 517082
  },
  {
    "id": 862,
    "name": "Armenia Colombia",
    "lat": 4.452882,
    "lng": -75.766298,
    "radius": 81702,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 20802
  },
  {
    "id": 1396,
    "name": "Arua, Uganda",
    "lat": 2.966891,
    "lng": 31.486362,
    "radius": 102000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 109550
  },
  {
    "id": 15053,
    "name": "Arusha,Tanzania",
    "lat": -3.368027,
    "lng": 36.624895,
    "radius": 100000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 184567
  },
  {
    "id": 16767,
    "name": "Asahikawa",
    "lat": 43.757787,
    "lng": 142.375020,
    "radius": 17000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 493015
  },
  {
    "id": 1694,
    "name": "Ashgabat,Turkmenistan",
    "lat": 37.984513,
    "lng": 58.366511,
    "radius": 68797,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 391089
  },
  {
    "id": 1173,
    "name": "Asturias,Spain",
    "lat": 43.562382,
    "lng": -6.033498,
    "radius": 83000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 222914
  },
  {
    "id": 1295,
    "name": "Asuncion, Paraguay",
    "lat": -25.261386,
    "lng": -57.582845,
    "radius": 70000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 321342
  },
  {
    "id": 978,
    "name": "Aswan,Egypt",
    "lat": 24.429787,
    "lng": 33.133879,
    "radius": 246000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 220226
  },
  {
    "id": 977,
    "name": "Asyut,Egypt",
    "lat": 27.050007,
    "lng": 31.015408,
    "radius": 120000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 110400
  },
  {
    "id": 446,
    "name": "Athens",
    "lat": 38.043879,
    "lng": 24.014334,
    "radius": 68000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 1108452
  },
  {
    "id": 88,
    "name": "Atlanta,GA,USA",
    "lat": 33.606365,
    "lng": -84.278937,
    "radius": 112654,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 1370143
  },
  {
    "id": 787,
    "name": "Atlantic City, NJ, USA",
    "lat": 39.455778,
    "lng": -74.572512,
    "radius": 321868,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 98743
  },
  {
    "id": 1680,
    "name": "Atyrau  Kazakhstan",
    "lat": 47.122449,
    "lng": 51.830449,
    "radius": 98265,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": null
  },
  {
    "id": 142,
    "name": "Auckland,New Zealand",
    "lat": -37.008248,
    "lng": 174.785036,
    "radius": 117000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 1369621
  },
  {
    "id": 27380,
    "name": "Aug",
    "lat": 19.867355,
    "lng": 75.395796,
    "radius": 150000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 93868
  },
  {
    "id": 1707,
    "name": "Aurangabad, India",
    "lat": 19.867355,
    "lng": 75.395796,
    "radius": 250000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 124600
  },
  {
    "id": 98,
    "name": "Austin,USA",
    "lat": 30.086746,
    "lng": -97.651988,
    "radius": 128747,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 1369656
  },
  {
    "id": 53520,
    "name": "Ayodhya, India",
    "lat": 26.748034,
    "lng": 82.150781,
    "radius": 350000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 474612
  },
  {
    "id": 1491,
    "name": "Bacau  Romania",
    "lat": 46.531050,
    "lng": 26.910705,
    "radius": 61779,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": null
  },
  {
    "id": 25735,
    "name": "Badajoz",
    "lat": 38.893955,
    "lng": -6.818817,
    "radius": 150000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 210685
  },
  {
    "id": 1434,
    "name": "Baden-Baden/Karlsruhe, Germany",
    "lat": 48.778212,
    "lng": 8.087660,
    "radius": 100000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 599501
  },
  {
    "id": 881,
    "name": "Bagdogra, India",
    "lat": 26.684993,
    "lng": 88.325422,
    "radius": 100000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 90903
  },
  {
    "id": 1501,
    "name": "Baku,Azerbaijan",
    "lat": 40.428480,
    "lng": 49.828470,
    "radius": 56000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 674319
  },
  {
    "id": 103,
    "name": "Bali,Indonesia",
    "lat": -8.255368,
    "lng": 115.218327,
    "radius": 90000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 1191326
  },
  {
    "id": 1010,
    "name": "Balikpapan",
    "lat": -1.265815,
    "lng": 116.897726,
    "radius": 82000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 114626
  },
  {
    "id": 18476,
    "name": "Ballina,Australia",
    "lat": -28.516790,
    "lng": 153.460781,
    "radius": 177170,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 1225437
  },
  {
    "id": 27537,
    "name": "Balurghat",
    "lat": 25.263526,
    "lng": 88.796762,
    "radius": 300000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 46264
  },
  {
    "id": 37585,
    "name": "Banak-Lakselv, Norway",
    "lat": 70.066206,
    "lng": 24.982051,
    "radius": 300000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 90415
  },
  {
    "id": 1033,
    "name": "Banda Aceh Indonesia",
    "lat": 5.518381,
    "lng": 95.417085,
    "radius": 70000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": null
  },
  {
    "id": 1011,
    "name": "Bandar Lampung,Indonesia",
    "lat": -5.244915,
    "lng": 105.180435,
    "radius": 100000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 192934
  },
  {
    "id": 1009,
    "name": "Bandar Seri Begawan,Brunei",
    "lat": 4.843487,
    "lng": 114.717388,
    "radius": 61000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 109946
  },
  {
    "id": 1013,
    "name": "Bandung-KJT Indonesia",
    "lat": -6.651630,
    "lng": 108.158524,
    "radius": 76000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": null
  },
  {
    "id": 1012,
    "name": "Bandung,Indonesia",
    "lat": -6.903840,
    "lng": 107.580197,
    "radius": 103000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 77395
  },
  {
    "id": 157,
    "name": "Bangalore, India",
    "lat": 13.198635,
    "lng": 77.706593,
    "radius": 200000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 414646
  },
  {
    "id": 41,
    "name": "Bangkok,Thailand",
    "lat": 13.997487,
    "lng": 100.839436,
    "radius": 150000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 1364498
  },
  {
    "id": 788,
    "name": "Bangor, ME, USA",
    "lat": 44.715462,
    "lng": -68.918482,
    "radius": 128747,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 179742
  },
  {
    "id": 1508,
    "name": "Banja Luka Bosnia and Herzegovina",
    "lat": 44.933629,
    "lng": 17.303790,
    "radius": 50000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 367160
  },
  {
    "id": 1014,
    "name": "Banjarmasin Indonesia",
    "lat": -3.436853,
    "lng": 114.760618,
    "radius": 76247,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": null
  },
  {
    "id": 1414,
    "name": "Banjul,Gambia",
    "lat": 13.343909,
    "lng": -16.652285,
    "radius": 56000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 109940
  },
  {
    "id": 1015,
    "name": "Banyuwangi,Indonesia",
    "lat": -8.312371,
    "lng": 114.339392,
    "radius": 58000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 114656
  },
  {
    "id": 1064,
    "name": "Baotou,China",
    "lat": 40.657626,
    "lng": 109.847232,
    "radius": 191000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 218001
  },
  {
    "id": 857,
    "name": "Barahona  Dominican Republic",
    "lat": 18.249120,
    "lng": -71.123381,
    "radius": 59292,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": null
  },
  {
    "id": 621,
    "name": "Barbados(Country in the Caribbean)",
    "lat": 13.145476,
    "lng": -59.557280,
    "radius": 24000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 156286
  },
  {
    "id": 277,
    "name": "Barcelona,Spain",
    "lat": 41.297445,
    "lng": 2.083294,
    "radius": 150000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 1158608
  },
  {
    "id": 37336,
    "name": "Bardufoss, Norway",
    "lat": 69.059601,
    "lng": 18.538964,
    "radius": 30000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 107516
  },
  {
    "id": 1228,
    "name": "Bari,Italy",
    "lat": 40.957553,
    "lng": 15.958999,
    "radius": 100000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 285497
  },
  {
    "id": 863,
    "name": "Barranquilla,Colombia",
    "lat": 10.735454,
    "lng": -74.732533,
    "radius": 56000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 135217
  },
  {
    "id": 918,
    "name": "Basco, Philippines",
    "lat": 20.449138,
    "lng": 121.976066,
    "radius": 14000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 34579
  },
  {
    "id": 22247,
    "name": "Basel",
    "lat": 47.078328,
    "lng": 8.270814,
    "radius": 219000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 403776
  },
  {
    "id": 1159,
    "name": "Bastia,France",
    "lat": 42.549679,
    "lng": 9.483407,
    "radius": 102000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 405134
  },
  {
    "id": 1016,
    "name": "Batam,Indonesia",
    "lat": 1.121925,
    "lng": 104.118297,
    "radius": 21000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 112346
  },
  {
    "id": 1270,
    "name": "Batna Algeria",
    "lat": 35.757443,
    "lng": 6.308163,
    "radius": 103000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 12828
  },
  {
    "id": 37330,
    "name": "Båtsfjord, Norway",
    "lat": 70.602737,
    "lng": 29.691903,
    "radius": 400000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 90420
  },
  {
    "id": 937,
    "name": "Batumi  Georgia",
    "lat": 41.606789,
    "lng": 41.610851,
    "radius": 82234,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": null
  },
  {
    "id": 1123,
    "name": "Beauvais,France",
    "lat": 49.454468,
    "lng": 2.111511,
    "radius": 116000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 1118332
  },
  {
    "id": 1066,
    "name": "BeiHai,China",
    "lat": 21.478239,
    "lng": 109.126872,
    "radius": 49000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 218003
  },
  {
    "id": 274,
    "name": "BeiJing,China",
    "lat": 39.898647,
    "lng": 116.406993,
    "radius": 233000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 566307
  },
  {
    "id": 1165,
    "name": "Beja  Portugal",
    "lat": 38.063668,
    "lng": -7.939303,
    "radius": 87000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 7073
  },
  {
    "id": 1271,
    "name": "Bejaia  Algeria",
    "lat": 36.715378,
    "lng": 5.071289,
    "radius": 68872,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": null
  },
  {
    "id": 943,
    "name": "Belem  Brazil",
    "lat": -1.513856,
    "lng": -48.197372,
    "radius": 66200,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": null
  },
  {
    "id": 841,
    "name": "Belfast,UK",
    "lat": 54.598276,
    "lng": -5.908799,
    "radius": 30154,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 1360969
  },
  {
    "id": 27549,
    "name": "Belgaum, India",
    "lat": 15.861036,
    "lng": 74.612956,
    "radius": 300000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 45853
  },
  {
    "id": 1539,
    "name": "Belgrade,Serbia",
    "lat": 44.820498,
    "lng": 20.291691,
    "radius": 100000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 380608
  },
  {
    "id": 1198,
    "name": "Belize City, Belize",
    "lat": 17.508567,
    "lng": -88.619506,
    "radius": 51312,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 410793
  },
  {
    "id": 16431,
    "name": "Bellingham，USA",
    "lat": 48.795579,
    "lng": -122.533064,
    "radius": 25749,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 38751
  },
  {
    "id": 944,
    "name": "Belo Horizonte, Brazil",
    "lat": -19.634099,
    "lng": -43.965396,
    "radius": 85000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 159767
  },
  {
    "id": 880,
    "name": "Bergen, Norway",
    "lat": 60.291830,
    "lng": 5.222017,
    "radius": 15000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 875245
  },
  {
    "id": 1124,
    "name": "Bergerac,France",
    "lat": 44.824025,
    "lng": 0.518638,
    "radius": 150000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 406310
  },
  {
    "id": 37334,
    "name": "Berlevåg, Norway",
    "lat": 70.870036,
    "lng": 29.029759,
    "radius": 400000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 90422
  },
  {
    "id": 1435,
    "name": "Berlin-BER,Germany",
    "lat": 52.362513,
    "lng": 13.502979,
    "radius": 150000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 1327747
  },
  {
    "id": 622,
    "name": "Bermuda(Unite Kingdom)",
    "lat": 32.359829,
    "lng": -64.702033,
    "radius": 22000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 173292
  },
  {
    "id": 1224,
    "name": "Bern,Switzerland",
    "lat": 46.936608,
    "lng": 7.466551,
    "radius": 180000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 101284
  },
  {
    "id": 1125,
    "name": "Beziers,France",
    "lat": 43.322513,
    "lng": 3.355438,
    "radius": 100000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 178298
  },
  {
    "id": 27583,
    "name": "Bhatinda",
    "lat": 30.271520,
    "lng": 74.745828,
    "radius": 200000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 45928
  },
  {
    "id": 27586,
    "name": "Bhavnagar",
    "lat": 21.753780,
    "lng": 72.183427,
    "radius": 200000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 45931
  },
  {
    "id": 1708,
    "name": "Bhopal, India",
    "lat": 23.290790,
    "lng": 77.335659,
    "radius": 800000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 220391
  },
  {
    "id": 1709,
    "name": "Bhubaneswar, India",
    "lat": 20.251115,
    "lng": 85.815349,
    "radius": 300000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 91148
  },
  {
    "id": 27587,
    "name": "Bhuj",
    "lat": 23.275533,
    "lng": 69.663948,
    "radius": 150000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 45932
  },
  {
    "id": 1017,
    "name": "Biak Indonesia",
    "lat": -1.189494,
    "lng": 136.108492,
    "radius": 78000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": null
  },
  {
    "id": 1126,
    "name": "Biarritz,France",
    "lat": 43.468823,
    "lng": -1.528031,
    "radius": 150000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 404940
  },
  {
    "id": 27558,
    "name": "Bilaspur",
    "lat": 21.994588,
    "lng": 82.114642,
    "radius": 300000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 45998
  },
  {
    "id": 1174,
    "name": "Bilbao,Spain",
    "lat": 43.302494,
    "lng": -2.911116,
    "radius": 150000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 191209
  },
  {
    "id": 39218,
    "name": "Bildudalur",
    "lat": 65.641674,
    "lng": -23.546482,
    "radius": 150000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 69313
  },
  {
    "id": 1611,
    "name": "Billund, Denmark",
    "lat": 55.740807,
    "lng": 9.152600,
    "radius": 20000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 499285
  },
  {
    "id": 454,
    "name": "Birmingham, UK",
    "lat": 52.597119,
    "lng": -1.935972,
    "radius": 160934,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 931175
  },
  {
    "id": 1691,
    "name": "Bishkek, Kyrgyzstan",
    "lat": 43.054239,
    "lng": 74.469508,
    "radius": 50000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 194241
  },
  {
    "id": 1410,
    "name": "Blantyre, Malawi",
    "lat": -15.681326,
    "lng": 35.001919,
    "radius": 84000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 73420
  },
  {
    "id": 28207,
    "name": "Bloemfontein,South Africa",
    "lat": -29.092736,
    "lng": 26.298767,
    "radius": 150000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 49123
  },
  {
    "id": 2310,
    "name": "Bloomington  IL  USD",
    "lat": 40.480185,
    "lng": -88.918934,
    "radius": 32186,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": null
  },
  {
    "id": 1280,
    "name": "Bluefields Nicaragua",
    "lat": 11.991944,
    "lng": -83.772500,
    "radius": 73029,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": null
  },
  {
    "id": 945,
    "name": "Boa Vista  Brazil",
    "lat": 2.841198,
    "lng": -60.692197,
    "radius": 77178,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": null
  },
  {
    "id": 1333,
    "name": "Boa Vista Island  Cape Verde",
    "lat": 16.135412,
    "lng": -22.892334,
    "radius": 25000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 13641
  },
  {
    "id": 1352,
    "name": "Bobo-Dioulasso  Burkina Faso",
    "lat": 11.156043,
    "lng": -4.333395,
    "radius": 83597,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": null
  },
  {
    "id": 1634,
    "name": "Bodo, Norway",
    "lat": 67.302248,
    "lng": 14.581964,
    "radius": 60000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 90427
  },
  {
    "id": 905,
    "name": "Bodrum,Turkey",
    "lat": 37.117374,
    "lng": 28.039704,
    "radius": 100000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 1197324
  },
  {
    "id": 636,
    "name": "Bogota,Colombia",
    "lat": 4.697150,
    "lng": -74.141105,
    "radius": 200000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 469521
  },
  {
    "id": 389,
    "name": "Boise, USA",
    "lat": 43.565823,
    "lng": -116.222316,
    "radius": 175418,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 197086
  },
  {
    "id": 1844,
    "name": "Bokhtar, Tajikistan",
    "lat": 37.862220,
    "lng": 68.862722,
    "radius": 59000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 34568
  },
  {
    "id": 1229,
    "name": "Bologna,Italy",
    "lat": 44.534522,
    "lng": 11.287859,
    "radius": 100000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 700235
  },
  {
    "id": 40175,
    "name": "Bolzano",
    "lat": 46.538655,
    "lng": 11.529533,
    "radius": 50000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 264843
  },
  {
    "id": 1846,
    "name": "Bom Jesus Da Lapa  Brazil",
    "lat": -13.261065,
    "lng": -43.411525,
    "radius": 121720,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": null
  },
  {
    "id": 856,
    "name": "Bonaire, Caribbean Netherlands",
    "lat": 12.161015,
    "lng": -68.268912,
    "radius": 26087,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 373503
  },
  {
    "id": 110,
    "name": "Boracay, Philippines",
    "lat": 11.676993,
    "lng": 122.025689,
    "radius": 39000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 149089
  },
  {
    "id": 1127,
    "name": "Bordeaux,France",
    "lat": 44.830594,
    "lng": -0.710305,
    "radius": 50000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 441002
  },
  {
    "id": 37326,
    "name": "Bornholm, Denmark",
    "lat": 55.062873,
    "lng": 14.761109,
    "radius": 10000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 113782
  },
  {
    "id": 74,
    "name": "Boston, USA",
    "lat": 42.351387,
    "lng": -71.087511,
    "radius": 128747,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 1370111
  },
  {
    "id": 828,
    "name": "Bournemouth,UK",
    "lat": 50.752436,
    "lng": -1.891886,
    "radius": 32187,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 527123
  },
  {
    "id": 896,
    "name": "Brac  Croatia",
    "lat": 43.281407,
    "lng": 16.661457,
    "radius": 22388,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": null
  },
  {
    "id": 1255,
    "name": "Brades  Montserrat",
    "lat": 16.791430,
    "lng": -62.193331,
    "radius": 13996,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": null
  },
  {
    "id": 946,
    "name": "Brasilia, Brazil",
    "lat": -15.869737,
    "lng": -47.917235,
    "radius": 84000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 117149
  },
  {
    "id": 1422,
    "name": "Bratislava,Slovakia",
    "lat": 48.170263,
    "lng": 17.210524,
    "radius": 100000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 1043365
  },
  {
    "id": 1436,
    "name": "Bremen,Germany",
    "lat": 53.047971,
    "lng": 8.785874,
    "radius": 100000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 840507
  },
  {
    "id": 1310,
    "name": "Brescia,Italy",
    "lat": 45.457436,
    "lng": 10.246186,
    "radius": 30000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 264849
  },
  {
    "id": 1128,
    "name": "Brest,France",
    "lat": 48.447638,
    "lng": -4.417832,
    "radius": 66000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 178301
  },
  {
    "id": 1230,
    "name": "Brindisi,Italy",
    "lat": 40.656763,
    "lng": 17.945349,
    "radius": 50000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 662637
  },
  {
    "id": 139,
    "name": "Brisbane,Australia",
    "lat": -27.546738,
    "lng": 153.369075,
    "radius": 155000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 1364994
  },
  {
    "id": 829,
    "name": "Bristol,UK",
    "lat": 51.358661,
    "lng": -2.432907,
    "radius": 179791,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 1361002
  },
  {
    "id": 1431,
    "name": "Brno, Czechia",
    "lat": 49.206094,
    "lng": 16.638419,
    "radius": 67000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 95038
  },
  {
    "id": 21306,
    "name": "Bromma Stockholm Airport",
    "lat": 59.326757,
    "lng": 17.966490,
    "radius": 200000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 517372
  },
  {
    "id": 1313,
    "name": "Broome,Australia",
    "lat": -17.952554,
    "lng": 122.233772,
    "radius": 50000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 181484
  },
  {
    "id": 2332,
    "name": "Brownsville  TX  USA",
    "lat": 25.906327,
    "lng": -97.426986,
    "radius": 80467,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 7517
  },
  {
    "id": 435,
    "name": "Brussels,Belgium",
    "lat": 50.681768,
    "lng": 4.472198,
    "radius": 150000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 1186647
  },
  {
    "id": 864,
    "name": "Bucaramanga Colombia",
    "lat": 7.128090,
    "lng": -73.181271,
    "radius": 150000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 20805
  },
  {
    "id": 342,
    "name": "Bucharest, Romania",
    "lat": 44.535096,
    "lng": 26.086023,
    "radius": 100000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 712517
  },
  {
    "id": 316,
    "name": "Budapest, Hungary",
    "lat": 47.438459,
    "lng": 19.252296,
    "radius": 150000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 1364987
  },
  {
    "id": 1842,
    "name": "Buenaventura  Colombia",
    "lat": 3.820876,
    "lng": -76.993193,
    "radius": 103387,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": null
  },
  {
    "id": 27454,
    "name": "Buenos Aires",
    "lat": -34.602230,
    "lng": -58.467417,
    "radius": 15000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 1338537
  },
  {
    "id": 326,
    "name": "Buenos Aires,Argentina",
    "lat": -34.825549,
    "lng": -58.568728,
    "radius": 20000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 1338844
  },
  {
    "id": 92,
    "name": "Buffalo,USA",
    "lat": 42.942225,
    "lng": -78.732196,
    "radius": 32187,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 1370171
  },
  {
    "id": 1696,
    "name": "Bukhara, Uzbekistan",
    "lat": 39.760321,
    "lng": 64.475321,
    "radius": 79000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 94917
  },
  {
    "id": 1425,
    "name": "Bulawayo, Zimbabwe",
    "lat": -20.015379,
    "lng": 28.622562,
    "radius": 113000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 71634
  },
  {
    "id": 21907,
    "name": "Buochs Airport",
    "lat": 46.904763,
    "lng": 7.620135,
    "radius": 184578,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 73880
  },
  {
    "id": 1377,
    "name": "Buraydah, Saudi Arabia",
    "lat": 26.305133,
    "lng": 43.768510,
    "radius": 105000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 133175
  },
  {
    "id": 338,
    "name": "Burgas",
    "lat": 42.653534,
    "lng": 27.559688,
    "radius": 80000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 198465
  },
  {
    "id": 906,
    "name": "Bursa,Turkey",
    "lat": 40.244048,
    "lng": 29.054034,
    "radius": 50000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 1155373
  },
  {
    "id": 107,
    "name": "Busan, Korean",
    "lat": 35.476465,
    "lng": 128.564466,
    "radius": 150000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 905301
  },
  {
    "id": 1209,
    "name": "Bydgoszcz, Poland",
    "lat": 53.097951,
    "lng": 17.972681,
    "radius": 300000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 99940
  },
  {
    "id": 1750,
    "name": "Cabo Frio  Brazil",
    "lat": -22.925909,
    "lng": -42.079260,
    "radius": 74710,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": null
  },
  {
    "id": 45796,
    "name": "Caen, France",
    "lat": 49.183191,
    "lng": -0.459430,
    "radius": 150000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 178302
  },
  {
    "id": 999,
    "name": "Cagayan, Philippines",
    "lat": 18.002284,
    "lng": 121.656851,
    "radius": 49000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 166633
  },
  {
    "id": 1231,
    "name": "Cagliari,Italy",
    "lat": 39.251079,
    "lng": 9.055678,
    "radius": 50000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 662635
  },
  {
    "id": 647,
    "name": "Cairns,Australia",
    "lat": -16.899774,
    "lng": 145.740665,
    "radius": 150000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 304726
  },
  {
    "id": 323,
    "name": "Cairo,Egypt",
    "lat": 30.112719,
    "lng": 31.399853,
    "radius": 79000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 253003
  },
  {
    "id": 1828,
    "name": "Calama Chile",
    "lat": -22.495110,
    "lng": -68.907904,
    "radius": 200000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": null
  },
  {
    "id": 1845,
    "name": "Calapan  Philippines",
    "lat": 13.534693,
    "lng": 121.145345,
    "radius": 44648,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": null
  },
  {
    "id": 58,
    "name": "Calgary,Canada",
    "lat": 51.121503,
    "lng": -114.007616,
    "radius": 200000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 1368563
  },
  {
    "id": 885,
    "name": "Cali,Colombia",
    "lat": 3.541110,
    "lng": -76.384584,
    "radius": 150000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 56667
  },
  {
    "id": 749,
    "name": "Campeche,Mexico",
    "lat": 19.814263,
    "lng": -90.503843,
    "radius": 136000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 200531
  },
  {
    "id": 947,
    "name": "Campinas, Brazil",
    "lat": -23.008205,
    "lng": -47.137569,
    "radius": 109000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 55617
  },
  {
    "id": 948,
    "name": "Campo Grande  Brazil",
    "lat": -20.468694,
    "lng": -54.674123,
    "radius": 92967,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 25698
  },
  {
    "id": 934,
    "name": "Can Tho,Vietnam",
    "lat": 10.080483,
    "lng": 105.712178,
    "radius": 124000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 212913
  },
  {
    "id": 137,
    "name": "Canberra,Australia",
    "lat": -35.473781,
    "lng": 149.536076,
    "radius": 150000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 740850
  },
  {
    "id": 167,
    "name": "Cancun,Mexico",
    "lat": 21.134250,
    "lng": -87.799718,
    "radius": 110000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 1335763
  },
  {
    "id": 1259,
    "name": "Canouan, Saint Vincent and the Grenadines",
    "lat": 12.726935,
    "lng": -61.325169,
    "radius": 4365,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 479077
  },
  {
    "id": 1252,
    "name": "Cap-Haitien, Haiti",
    "lat": 19.464128,
    "lng": -72.515697,
    "radius": 64000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 450671
  },
  {
    "id": 995,
    "name": "Cape Town,South Africa",
    "lat": -33.957188,
    "lng": 18.563123,
    "radius": 92000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 1362008
  },
  {
    "id": 44024,
    "name": "Caracas, Venezuela",
    "lat": 10.597258,
    "lng": -67.005337,
    "radius": 150000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 174202
  },
  {
    "id": 1129,
    "name": "Carcassonne,France",
    "lat": 43.215751,
    "lng": 2.306171,
    "radius": 150000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 178303
  },
  {
    "id": 830,
    "name": "Cardiff,UK",
    "lat": 51.494931,
    "lng": -3.207810,
    "radius": 24140,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 571408
  },
  {
    "id": 640,
    "name": "Cartagena,Colombia",
    "lat": 10.363168,
    "lng": -75.055315,
    "radius": 100000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 191466
  },
  {
    "id": 1040,
    "name": "Casablanca,Morocco,Africa",
    "lat": 33.369970,
    "lng": -7.585723,
    "radius": 91000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 1105539
  },
  {
    "id": 1175,
    "name": "Castellon de la Plana,Spain",
    "lat": 40.205208,
    "lng": 0.067282,
    "radius": 150000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 49003
  },
  {
    "id": 1232,
    "name": "Catania,Italy",
    "lat": 37.490339,
    "lng": 15.353508,
    "radius": 100000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 462153
  },
  {
    "id": 1293,
    "name": "Cayenne  French Guiana",
    "lat": 4.822225,
    "lng": -52.363898,
    "radius": 78639,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": null
  },
  {
    "id": 855,
    "name": "Cayman Brac  Cayman Islands",
    "lat": 19.702873,
    "lng": -79.744840,
    "radius": 19342,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": null
  },
  {
    "id": 109,
    "name": "Cebu, Philippines",
    "lat": 10.447603,
    "lng": 123.858861,
    "radius": 45000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 1331931
  },
  {
    "id": 1130,
    "name": "Chalons-en-Champagne,France",
    "lat": 48.780754,
    "lng": 4.189277,
    "radius": 200000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 178304
  },
  {
    "id": 1131,
    "name": "Chambery,France",
    "lat": 45.637929,
    "lng": 5.883871,
    "radius": 120000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 910062
  },
  {
    "id": 1710,
    "name": "Chandigarh, India",
    "lat": 30.668406,
    "lng": 76.786402,
    "radius": 300000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 1330895
  },
  {
    "id": 656,
    "name": "ChangChun,China",
    "lat": 43.799214,
    "lng": 125.346530,
    "radius": 275000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 184656
  },
  {
    "id": 54508,
    "name": "Changde",
    "lat": 29.023147,
    "lng": 111.688632,
    "radius": 214440,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 219094
  },
  {
    "id": 673,
    "name": "Changsha,CHN",
    "lat": 28.225512,
    "lng": 112.934996,
    "radius": 201000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 217896
  },
  {
    "id": 41947,
    "name": "Changwat Trang",
    "lat": 7.511479,
    "lng": 99.615320,
    "radius": 50000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 87919
  },
  {
    "id": 1067,
    "name": "ChangZhou,China",
    "lat": 31.816277,
    "lng": 119.969383,
    "radius": 184000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 218004
  },
  {
    "id": 1469,
    "name": "Chania,Greece",
    "lat": 35.351857,
    "lng": 24.563378,
    "radius": 120000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 248575
  },
  {
    "id": 385,
    "name": "Charleston,SC,USA",
    "lat": 33.035683,
    "lng": -80.224770,
    "radius": 104607,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 203305
  },
  {
    "id": 95,
    "name": "Charlotte,USA",
    "lat": 35.228993,
    "lng": -80.917186,
    "radius": 152887,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 1370152
  },
  {
    "id": 40923,
    "name": "Charlottesville",
    "lat": 38.048196,
    "lng": -78.444327,
    "radius": 119091,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 192092
  },
  {
    "id": 418,
    "name": "Charlottetown, Canada",
    "lat": 46.290393,
    "lng": -63.124442,
    "radius": 50000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 109620
  },
  {
    "id": 459,
    "name": "ChengDu,China",
    "lat": 30.572382,
    "lng": 104.088608,
    "radius": 200000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 963287
  },
  {
    "id": 160,
    "name": "Chennai, India",
    "lat": 12.994112,
    "lng": 80.170867,
    "radius": 600000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 398453
  },
  {
    "id": 1049,
    "name": "Cheongju, Korean",
    "lat": 36.770394,
    "lng": 127.451815,
    "radius": 41000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 491380
  },
  {
    "id": 1754,
    "name": "Chetumal  Mexico",
    "lat": 18.506395,
    "lng": -88.324296,
    "radius": 83633,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": null
  },
  {
    "id": 46,
    "name": "Chiang Mai,Thailand",
    "lat": 18.855770,
    "lng": 98.900138,
    "radius": 126000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 1364900
  },
  {
    "id": 47,
    "name": "Chiang Rai, Thailand",
    "lat": 19.954284,
    "lng": 99.879150,
    "radius": 170000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 387774
  },
  {
    "id": 68,
    "name": "Chicago,USA",
    "lat": 42.028240,
    "lng": -87.921929,
    "radius": 225308,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 1311347
  },
  {
    "id": 1847,
    "name": "Chichen Itza, Mexico",
    "lat": 20.422469,
    "lng": -88.603871,
    "radius": 133000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 200541
  },
  {
    "id": 782,
    "name": "Chihuahua,Mexico",
    "lat": 28.015331,
    "lng": -106.325031,
    "radius": 250000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 212326
  },
  {
    "id": 1470,
    "name": "Chios Island  Greece",
    "lat": 38.386309,
    "lng": 25.936543,
    "radius": 27821,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": null
  },
  {
    "id": 1522,
    "name": "Chisinau, Republic of Moldova",
    "lat": 46.935168,
    "lng": 28.935516,
    "radius": 50000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 123800
  },
  {
    "id": 1354,
    "name": "Chittagong,Bangladesh",
    "lat": 22.327023,
    "lng": 91.902570,
    "radius": 107000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 129174
  },
  {
    "id": 1273,
    "name": "Chlef  Algeria",
    "lat": 36.217444,
    "lng": 1.324707,
    "radius": 103281,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": null
  },
  {
    "id": 460,
    "name": "ChongQing",
    "lat": 29.572367,
    "lng": 106.553822,
    "radius": 108000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 324283
  },
  {
    "id": 143,
    "name": "Christchurch,New Zealand",
    "lat": -43.662945,
    "lng": 172.720075,
    "radius": 137000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 378300
  },
  {
    "id": 1316,
    "name": "Christmas Island",
    "lat": -10.479780,
    "lng": 105.633462,
    "radius": 12567,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": null
  },
  {
    "id": 849,
    "name": "Chub Cay  Bahamas",
    "lat": 25.431719,
    "lng": -77.883649,
    "radius": 6299,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": null
  },
  {
    "id": 93,
    "name": "Cincinnati,USA",
    "lat": 39.083810,
    "lng": -84.427942,
    "radius": 88514,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 199875
  },
  {
    "id": 804,
    "name": "Ciudad Del Carmen, Mexico",
    "lat": 18.651059,
    "lng": -91.802435,
    "radius": 101000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 212436
  },
  {
    "id": 1296,
    "name": "Ciudad del Este, Paraguay",
    "lat": -25.443100,
    "lng": -55.203394,
    "radius": 81000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 1016055
  },
  {
    "id": 1825,
    "name": "Ciudad Obregon, Sonora, Mexico",
    "lat": 27.393981,
    "lng": -109.834090,
    "radius": 110000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 212445
  },
  {
    "id": 1823,
    "name": "Clermont-Ferrand,France",
    "lat": 45.787249,
    "lng": 3.164263,
    "radius": 150000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 406495
  },
  {
    "id": 85,
    "name": "Cleveland,OH,USA",
    "lat": 41.405798,
    "lng": -81.853867,
    "radius": 218870,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 197116
  },
  {
    "id": 1492,
    "name": "Cluj-Napoca, Romania",
    "lat": 46.782507,
    "lng": 23.688025,
    "radius": 150000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 279348
  },
  {
    "id": 974,
    "name": "Cochabamba, Bolivia",
    "lat": -17.417048,
    "lng": -66.178708,
    "radius": 65000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 857726
  },
  {
    "id": 1711,
    "name": "Cochin, India",
    "lat": 10.151783,
    "lng": 76.392958,
    "radius": 300000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 739896
  },
  {
    "id": 1317,
    "name": "Cocos (Keeling) Islands",
    "lat": -12.187951,
    "lng": 96.829345,
    "radius": 6367,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": null
  },
  {
    "id": 1712,
    "name": "Coimbatore, India",
    "lat": 11.030432,
    "lng": 77.039093,
    "radius": 250000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 901856
  },
  {
    "id": 132,
    "name": "Colombo,Sri Lanka",
    "lat": 7.180155,
    "lng": 79.884252,
    "radius": 300000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 661233
  },
  {
    "id": 466,
    "name": "Colon Panama",
    "lat": 9.340505,
    "lng": -82.244294,
    "radius": 50000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": null
  },
  {
    "id": 414,
    "name": "Colorado Springs,USA",
    "lat": 38.801712,
    "lng": -104.702604,
    "radius": 321868,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 83485
  },
  {
    "id": 2823,
    "name": "Columbia, SC, USA",
    "lat": 33.941917,
    "lng": -81.122002,
    "radius": 160934,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 274078
  },
  {
    "id": 1799,
    "name": "Columbus (OH),USA",
    "lat": 39.999940,
    "lng": -82.887177,
    "radius": 320259,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 197296
  },
  {
    "id": 57874,
    "name": "Conakry",
    "lat": 9.575472,
    "lng": -13.619883,
    "radius": 150000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 166674
  },
  {
    "id": 1286,
    "name": "Concepcion  Chile",
    "lat": -36.856405,
    "lng": -72.395317,
    "radius": 91368,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": null
  },
  {
    "id": 1493,
    "name": "Constanta  Romania",
    "lat": 44.350128,
    "lng": 28.481816,
    "radius": 66835,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": null
  },
  {
    "id": 1274,
    "name": "Constantine  Algeria",
    "lat": 36.283471,
    "lng": 6.622142,
    "radius": 78836,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": null
  },
  {
    "id": 27588,
    "name": "Cooch Behar",
    "lat": 26.329725,
    "lng": 89.469870,
    "radius": 150000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 45935
  },
  {
    "id": 25725,
    "name": "Cordoba",
    "lat": 37.844692,
    "lng": -4.844100,
    "radius": 50133,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 37619
  },
  {
    "id": 891,
    "name": "Cordoba,Argentina",
    "lat": -31.390494,
    "lng": -64.198587,
    "radius": 200000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 406590
  },
  {
    "id": 1471,
    "name": "Corfu,Greece",
    "lat": 39.524675,
    "lng": 19.767684,
    "radius": 35000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 248566
  },
  {
    "id": 843,
    "name": "Cork, Ireland",
    "lat": 51.849059,
    "lng": -8.489885,
    "radius": 150000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 1284059
  },
  {
    "id": 1281,
    "name": "Corn Island Nicaragua",
    "lat": 12.172143,
    "lng": -83.059543,
    "radius": 3768,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": null
  },
  {
    "id": 1789,
    "name": "Corozal  Colombia",
    "lat": 9.332520,
    "lng": -75.283589,
    "radius": 65990,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": null
  },
  {
    "id": 26028,
    "name": "Corrientes",
    "lat": -27.500923,
    "lng": -58.782530,
    "radius": 7000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 39037
  },
  {
    "id": 1351,
    "name": "Cotonou, Benin",
    "lat": 6.506016,
    "lng": 2.406801,
    "radius": 50000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 110292
  },
  {
    "id": 26303,
    "name": "Coventry",
    "lat": 52.405399,
    "lng": -1.548666,
    "radius": 44666,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 528564
  },
  {
    "id": 601,
    "name": "Cozumel,Mexico",
    "lat": 20.413240,
    "lng": -86.822979,
    "radius": 25000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 747068
  },
  {
    "id": 37508,
    "name": "CPH Copenhage",
    "lat": 55.664848,
    "lng": 12.407082,
    "radius": 30000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 373573
  },
  {
    "id": 1494,
    "name": "Craiova Romania",
    "lat": 44.312765,
    "lng": 23.878591,
    "radius": 76253,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": null
  },
  {
    "id": 39613,
    "name": "CRL,Brussels",
    "lat": 50.462537,
    "lng": 4.458821,
    "radius": 20000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 771923
  },
  {
    "id": 886,
    "name": "Cucuta Colombia",
    "lat": 7.927180,
    "lng": -72.508177,
    "radius": 86945,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 25697
  },
  {
    "id": 27573,
    "name": "Cuddalore",
    "lat": 11.614227,
    "lng": 79.526227,
    "radius": 150000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 46721
  },
  {
    "id": 1287,
    "name": "Cuenca  Ecuador",
    "lat": -2.890014,
    "lng": -78.985813,
    "radius": 74123,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 16051
  },
  {
    "id": 949,
    "name": "Cuiaba, Brazil",
    "lat": -15.653079,
    "lng": -56.117269,
    "radius": 150000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 134595
  },
  {
    "id": 600,
    "name": "Culebra Puerto Rico",
    "lat": 18.312465,
    "lng": -65.303890,
    "radius": 14878,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": null
  },
  {
    "id": 780,
    "name": "Culiacan,Mexico",
    "lat": 25.445353,
    "lng": -106.100952,
    "radius": 200000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 200536
  },
  {
    "id": 1233,
    "name": "Cuneo,Italy",
    "lat": 44.380139,
    "lng": 7.770296,
    "radius": 50000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 662641
  },
  {
    "id": 950,
    "name": "Curitiba, Brazil",
    "lat": -25.532713,
    "lng": -49.172481,
    "radius": 71000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 30720
  },
  {
    "id": 709,
    "name": "Cusco,Peru",
    "lat": -13.597884,
    "lng": -71.834377,
    "radius": 50000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 1336191
  },
  {
    "id": 22665,
    "name": "Czestochowa",
    "lat": 50.888701,
    "lng": 19.201842,
    "radius": 500000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 32106
  },
  {
    "id": 1048,
    "name": "Daegu, Korean",
    "lat": 35.899487,
    "lng": 128.638387,
    "radius": 22000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 491376
  },
  {
    "id": 1401,
    "name": "Dakar, Senegal",
    "lat": 14.802635,
    "lng": -16.700442,
    "radius": 173000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 109917
  },
  {
    "id": 1153,
    "name": "Dakhla,Morocco,Africa",
    "lat": 23.713740,
    "lng": -15.928254,
    "radius": 135000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 122894
  },
  {
    "id": 1835,
    "name": "Dalat,Vietnam",
    "lat": 11.750342,
    "lng": 108.368180,
    "radius": 120000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 365077
  },
  {
    "id": 61661,
    "name": "Dali,China",
    "lat": 25.611505,
    "lng": 100.296352,
    "radius": 120000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 185824
  },
  {
    "id": 660,
    "name": "DaLian,China",
    "lat": 38.965556,
    "lng": 121.483401,
    "radius": 111000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 208035
  },
  {
    "id": 76,
    "name": "Dallas,USA",
    "lat": 32.811447,
    "lng": -97.005236,
    "radius": 152887,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 1370146
  },
  {
    "id": 27559,
    "name": "Daman",
    "lat": 20.433698,
    "lng": 72.843424,
    "radius": 110000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 46709
  },
  {
    "id": 1378,
    "name": "Dammam,Saudi Arabia",
    "lat": 26.468325,
    "lng": 49.797248,
    "radius": 72000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 1145044
  },
  {
    "id": 118,
    "name": "DaNang,Vietnam",
    "lat": 16.056328,
    "lng": 108.200834,
    "radius": 130000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 1369121
  },
  {
    "id": 1068,
    "name": "Dandong,China",
    "lat": 40.162611,
    "lng": 124.315518,
    "radius": 8000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 218006
  },
  {
    "id": 882,
    "name": "Dar es Salaam,Tanzania",
    "lat": -6.872539,
    "lng": 39.206916,
    "radius": 76000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 133552
  },
  {
    "id": 1650,
    "name": "Darlington, Unite Kingdom",
    "lat": 54.524300,
    "lng": -1.531442,
    "radius": 26108,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 528484
  },
  {
    "id": 644,
    "name": "Darwin,Australia",
    "lat": -12.476273,
    "lng": 130.968440,
    "radius": 50000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 206537
  },
  {
    "id": 1738,
    "name": "Dasoguz, Turkmenistan",
    "lat": 41.763525,
    "lng": 59.833711,
    "radius": 67000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 458347
  },
  {
    "id": 1069,
    "name": "Datong,China",
    "lat": 40.070467,
    "lng": 113.311067,
    "radius": 100000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 365987
  },
  {
    "id": 22254,
    "name": "Daugavpils",
    "lat": 56.269642,
    "lng": 24.931485,
    "radius": 200000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 26852
  },
  {
    "id": 987,
    "name": "Davao City,Philippines",
    "lat": 7.130404,
    "lng": 125.645524,
    "radius": 89000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 464822
  },
  {
    "id": 1111,
    "name": "David  Panama",
    "lat": 8.391653,
    "lng": -82.431478,
    "radius": 63000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": null
  },
  {
    "id": 411,
    "name": "Dayton, OH, USA",
    "lat": 39.902524,
    "lng": -84.221772,
    "radius": 123919,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 100341
  },
  {
    "id": 13895,
    "name": "Daytona Beach,USA",
    "lat": 29.429873,
    "lng": -80.671539,
    "radius": 72420,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 272106
  },
  {
    "id": 638,
    "name": "Dead Sea,Israal",
    "lat": 31.722219,
    "lng": 35.986431,
    "radius": 87000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 109949
  },
  {
    "id": 1457,
    "name": "Debrecen, Hungary",
    "lat": 47.489747,
    "lng": 21.612190,
    "radius": 10000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 205925
  },
  {
    "id": 1848,
    "name": "Dehradun, India",
    "lat": 30.195134,
    "lng": 78.192097,
    "radius": 250000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 495688
  },
  {
    "id": 159,
    "name": "Delhi, India",
    "lat": 28.556162,
    "lng": 77.099958,
    "radius": 55000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 1322008
  },
  {
    "id": 84,
    "name": "Denver, USA",
    "lat": 39.762918,
    "lng": -105.118758,
    "radius": 193121,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 1323711
  },
  {
    "id": 401,
    "name": "Des Moines, IA, USA",
    "lat": 41.534133,
    "lng": -93.658796,
    "radius": 225308,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 188673
  },
  {
    "id": 400,
    "name": "desmoines",
    "lat": 33.562427,
    "lng": -86.754126,
    "radius": 80467,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 175051
  },
  {
    "id": 2095,
    "name": "Destin FL USA",
    "lat": 30.446058,
    "lng": -86.510413,
    "radius": 321868,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 8531
  },
  {
    "id": 87,
    "name": "Detroit,USA",
    "lat": 42.216172,
    "lng": -83.355384,
    "radius": 107826,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 1370166
  },
  {
    "id": 1355,
    "name": "Dhaka, Bangladesh",
    "lat": 23.843434,
    "lng": 90.402925,
    "radius": 100000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 125642
  },
  {
    "id": 27582,
    "name": "Dhanbad",
    "lat": 23.833949,
    "lng": 86.426007,
    "radius": 150000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 45925
  },
  {
    "id": 27581,
    "name": "Dibrugarh",
    "lat": 27.479837,
    "lng": 95.015811,
    "radius": 150000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 45919
  },
  {
    "id": 1857,
    "name": "Dien Bien, Vietnam",
    "lat": 21.465140,
    "lng": 103.179917,
    "radius": 24000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 137531
  },
  {
    "id": 1032,
    "name": "Dili East Timor",
    "lat": -8.954027,
    "lng": 125.621050,
    "radius": 65708,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": null
  },
  {
    "id": 27578,
    "name": "Dimapur",
    "lat": 25.880048,
    "lng": 93.773042,
    "radius": 150000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 91145
  },
  {
    "id": 1132,
    "name": "Dinard,France",
    "lat": 48.594895,
    "lng": -2.086523,
    "radius": 200000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 405180
  },
  {
    "id": 1208,
    "name": "Dire Dawa, Ethiopia",
    "lat": 9.616758,
    "lng": 41.861568,
    "radius": 114000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 109928
  },
  {
    "id": 1822,
    "name": "Ditiki Achaia  Greece",
    "lat": 38.135961,
    "lng": 21.604261,
    "radius": 62743,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": null
  },
  {
    "id": 27579,
    "name": "Diu",
    "lat": 20.713314,
    "lng": 70.925079,
    "radius": 200000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 45917
  },
  {
    "id": 1263,
    "name": "Djerba,Tunisia",
    "lat": 33.870591,
    "lng": 10.775073,
    "radius": 67000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 239287
  },
  {
    "id": 1337,
    "name": "Djibouti City, Djibouti",
    "lat": 11.705504,
    "lng": 42.769607,
    "radius": 111000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 73396
  },
  {
    "id": 1372,
    "name": "Doha,Qatar",
    "lat": 25.260876,
    "lng": 51.613842,
    "radius": 110000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 1183547
  },
  {
    "id": 831,
    "name": "Doncaster/Sheffield,UK",
    "lat": 53.497416,
    "lng": -1.143908,
    "radius": 32187,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 527131
  },
  {
    "id": 1858,
    "name": "Dong Hoi, Vietnam",
    "lat": 17.513435,
    "lng": 106.589896,
    "radius": 137000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 137526
  },
  {
    "id": 1438,
    "name": "Dortmund,Germany",
    "lat": 51.517397,
    "lng": 7.612263,
    "radius": 100000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 599494
  },
  {
    "id": 1331,
    "name": "Douala,Cameroon",
    "lat": 4.013439,
    "lng": 9.717007,
    "radius": 189000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 110303
  },
  {
    "id": 1826,
    "name": "Dresden, Germany",
    "lat": 51.132153,
    "lng": 13.767207,
    "radius": 40000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 171184
  },
  {
    "id": 1392,
    "name": "Dubai-DWC,United Arab Emirates",
    "lat": 24.895221,
    "lng": 55.138681,
    "radius": 169000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 148717
  },
  {
    "id": 152,
    "name": "Dubai,United Arab Emirates",
    "lat": 25.253175,
    "lng": 55.365673,
    "radius": 152000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 1282603
  },
  {
    "id": 328,
    "name": "Dublin,Ireland",
    "lat": 53.581191,
    "lng": -8.716666,
    "radius": 245000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 764162
  },
  {
    "id": 684,
    "name": "Dubrovnik,Croatia",
    "lat": 42.560359,
    "lng": 18.262193,
    "radius": 86000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 189275
  },
  {
    "id": 19281,
    "name": "Dundee",
    "lat": 56.464002,
    "lng": -2.992785,
    "radius": 16093,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 528486
  },
  {
    "id": 1322,
    "name": "Dunedin, New Zealand",
    "lat": -45.901980,
    "lng": 170.458802,
    "radius": 50000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 155699
  },
  {
    "id": 1070,
    "name": "Dunhuang,China",
    "lat": 40.124404,
    "lng": 94.652970,
    "radius": 126000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 218008
  },
  {
    "id": 805,
    "name": "Durango, Mexico",
    "lat": 24.126003,
    "lng": -104.533899,
    "radius": 105000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 212583
  },
  {
    "id": 996,
    "name": "Durban,South Africa",
    "lat": -29.609979,
    "lng": 31.116887,
    "radius": 95000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 1156480
  },
  {
    "id": 1811,
    "name": "Dushanbe, Tajikistan",
    "lat": 38.548643,
    "lng": 68.815496,
    "radius": 120000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 799535
  },
  {
    "id": 445,
    "name": "Dusseldorf, Germany",
    "lat": 51.287615,
    "lng": 6.766791,
    "radius": 100000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 575457
  },
  {
    "id": 785,
    "name": "Eagle,CO,USA",
    "lat": 39.642564,
    "lng": -106.914548,
    "radius": 32187,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 125471
  },
  {
    "id": 998,
    "name": "East London,South Africa",
    "lat": -33.036492,
    "lng": 27.824622,
    "radius": 99000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 194384
  },
  {
    "id": 450,
    "name": "Edinburgh,UK",
    "lat": 56.145837,
    "lng": -3.114368,
    "radius": 160934,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 384779
  },
  {
    "id": 60,
    "name": "Edmonton,Canada",
    "lat": 53.305437,
    "lng": -113.577381,
    "radius": 150000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 1368241
  },
  {
    "id": 1161,
    "name": "Eindhoven,Netherlands",
    "lat": 51.450745,
    "lng": 5.377595,
    "radius": 50000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 914876
  },
  {
    "id": 979,
    "name": "El Arish, Egypt",
    "lat": 31.078092,
    "lng": 33.836074,
    "radius": 103000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 110402
  },
  {
    "id": 1827,
    "name": "El Calafate,Argentina",
    "lat": -50.283977,
    "lng": -72.053641,
    "radius": 40000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 1016054
  },
  {
    "id": 980,
    "name": "El Dabaa, Egypt",
    "lat": 30.929128,
    "lng": 28.462662,
    "radius": 92000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 110403
  },
  {
    "id": 993,
    "name": "Eldoret, Kenya",
    "lat": 0.404862,
    "lng": 35.223880,
    "radius": 145000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 61566
  },
  {
    "id": 717,
    "name": "Eleuthera, The Bahamas",
    "lat": 25.240277,
    "lng": -76.406629,
    "radius": 78000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 68005
  },
  {
    "id": 21916,
    "name": "Emmen",
    "lat": 47.040869,
    "lng": 7.527549,
    "radius": 160000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 73577
  },
  {
    "id": 1307,
    "name": "Enfidha, Tunisia",
    "lat": 36.084371,
    "lng": 10.438674,
    "radius": 75000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 141348
  },
  {
    "id": 1071,
    "name": "Enshi,China",
    "lat": 30.274315,
    "lng": 109.487288,
    "radius": 109000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 218009
  },
  {
    "id": 37328,
    "name": "Esbjerg, Denmark",
    "lat": 55.525833,
    "lng": 8.553333,
    "radius": 20000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 113781
  },
  {
    "id": 1288,
    "name": "Esmeraldas  Ecuador",
    "lat": 0.973982,
    "lng": -79.624805,
    "radius": 103804,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 16057
  },
  {
    "id": 11395,
    "name": "Essaouira,MAR",
    "lat": 31.403046,
    "lng": -9.688183,
    "radius": 150000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 212915
  },
  {
    "id": 1860,
    "name": "Estherville  IA  USA",
    "lat": 43.405892,
    "lng": -94.747158,
    "radius": 108010,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": null
  },
  {
    "id": 37319,
    "name": "Evenes Harstad/Narvik, Norway",
    "lat": 68.491892,
    "lng": 16.684131,
    "radius": 400000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 90430
  },
  {
    "id": 833,
    "name": "Exeter,UK",
    "lat": 50.703060,
    "lng": -3.578976,
    "radius": 64374,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 527133
  },
  {
    "id": 789,
    "name": "Fairbanks, AK, USA",
    "lat": 63.477575,
    "lng": -147.558628,
    "radius": 289681,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 167591
  },
  {
    "id": 2150,
    "name": "Faisalabad, Pakistan",
    "lat": 31.363043,
    "lng": 72.987570,
    "radius": 100000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 219634
  },
  {
    "id": 1166,
    "name": "Faro,Portugal",
    "lat": 37.035138,
    "lng": -7.936761,
    "radius": 150000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 571786
  },
  {
    "id": 2259,
    "name": "Fayetteville",
    "lat": 36.278659,
    "lng": -94.304294,
    "radius": 99779,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 42679
  },
  {
    "id": 704,
    "name": "Fayetteville  AR  USA",
    "lat": 36.003418,
    "lng": -94.171949,
    "radius": 321868,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 7748
  },
  {
    "id": 1697,
    "name": "Fergana, Uzbekistan",
    "lat": 40.375993,
    "lng": 71.751969,
    "radius": 79581,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 739708
  },
  {
    "id": 1768,
    "name": "Fernando de Noronha  Brazil",
    "lat": -3.854614,
    "lng": -32.424385,
    "radius": 11487,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": null
  },
  {
    "id": 1041,
    "name": "Fes,Morocco,Africa",
    "lat": 33.928824,
    "lng": -4.979357,
    "radius": 91000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 1106172
  },
  {
    "id": 1133,
    "name": "Figari,France",
    "lat": 41.502335,
    "lng": 9.098381,
    "radius": 99000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 405037
  },
  {
    "id": 146,
    "name": "Fiji",
    "lat": -17.902962,
    "lng": 177.884209,
    "radius": 67000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 210161
  },
  {
    "id": 23024,
    "name": "Finkenwerder",
    "lat": 53.533389,
    "lng": 9.831441,
    "radius": 150000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 29025
  },
  {
    "id": 693,
    "name": "Flagstaff,USA",
    "lat": 35.140193,
    "lng": -111.670881,
    "radius": 136794,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 83498
  },
  {
    "id": 346,
    "name": "Florence,Italy",
    "lat": 43.658768,
    "lng": 11.163785,
    "radius": 120000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 1229837
  },
  {
    "id": 1843,
    "name": "Florencia Colombia",
    "lat": 1.589243,
    "lng": -75.560644,
    "radius": 106542,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": null
  },
  {
    "id": 1200,
    "name": "Flores  Guatemala",
    "lat": 16.914660,
    "lng": -89.877218,
    "radius": 72232,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": null
  },
  {
    "id": 951,
    "name": "Florianopolis, Brazil",
    "lat": -27.670118,
    "lng": -48.545966,
    "radius": 74000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 169848
  },
  {
    "id": 37340,
    "name": "Florø, Norway",
    "lat": 61.585805,
    "lng": 5.024496,
    "radius": 20000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 810602
  },
  {
    "id": 71,
    "name": "Fort Myers,FL,USA",
    "lat": 26.533705,
    "lng": -81.755308,
    "radius": 72420,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 197737
  },
  {
    "id": 1254,
    "name": "Fort-de-France, Martinique",
    "lat": 14.595614,
    "lng": -61.000244,
    "radius": 40000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 136640
  },
  {
    "id": 952,
    "name": "Fortaleza, Brazil",
    "lat": -3.777156,
    "lng": -38.533097,
    "radius": 107000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 104667
  },
  {
    "id": 953,
    "name": "Foz do Iguacu, Brazil",
    "lat": -25.597709,
    "lng": -54.488513,
    "radius": 73438,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 442277
  },
  {
    "id": 1411,
    "name": "Franceville,Gabon",
    "lat": -1.632236,
    "lng": 13.420235,
    "radius": 100000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 110308
  },
  {
    "id": 1326,
    "name": "Francistown,Botswana",
    "lat": -21.197539,
    "lng": 27.055966,
    "radius": 100000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 110317
  },
  {
    "id": 345,
    "name": "Frankfurt, Germany",
    "lat": 50.110504,
    "lng": 8.712071,
    "radius": 100000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 1328245
  },
  {
    "id": 1400,
    "name": "Freetown,Sierra Leone",
    "lat": 8.613587,
    "lng": -13.201561,
    "radius": 115000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 110230
  },
  {
    "id": 790,
    "name": "Fresno, CA, USA",
    "lat": 36.966942,
    "lng": -119.285474,
    "radius": 128747,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 198191
  },
  {
    "id": 1440,
    "name": "Friedrichshafen, Germany",
    "lat": 47.672245,
    "lng": 9.512191,
    "radius": 40000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 112622
  },
  {
    "id": 1176,
    "name": "Fuerteventura,Spain",
    "lat": 28.307395,
    "lng": -14.048125,
    "radius": 61000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 392187
  },
  {
    "id": 128,
    "name": "Fukuoka, Japan",
    "lat": 32.846074,
    "lng": 130.828769,
    "radius": 138000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 493930
  },
  {
    "id": 746,
    "name": "Fukushima,Japan",
    "lat": 37.266318,
    "lng": 140.406642,
    "radius": 49000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 492578
  },
  {
    "id": 1167,
    "name": "Funchal,Portugal",
    "lat": 32.735083,
    "lng": -16.970881,
    "radius": 32000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 234929
  },
  {
    "id": 664,
    "name": "Fuzhou,China",
    "lat": 26.073341,
    "lng": 119.296438,
    "radius": 109000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 217885
  },
  {
    "id": 1324,
    "name": "Gaborone Botswana",
    "lat": -24.554347,
    "lng": 25.920190,
    "radius": 134000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 12541
  },
  {
    "id": 821,
    "name": "Gander,Canada",
    "lat": 48.946558,
    "lng": -54.575696,
    "radius": 50000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 109639
  },
  {
    "id": 1502,
    "name": "Ganja  Azerbaijan",
    "lat": 40.739488,
    "lng": 46.299759,
    "radius": 60425,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": null
  },
  {
    "id": 1072,
    "name": "Ganzhou,China",
    "lat": 25.826979,
    "lng": 114.941570,
    "radius": 100000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 218010
  },
  {
    "id": 1714,
    "name": "Gaya, India",
    "lat": 24.748822,
    "lng": 84.943732,
    "radius": 250000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 91100
  },
  {
    "id": 907,
    "name": "Gaziantep,Turkey",
    "lat": 36.947121,
    "lng": 37.474040,
    "radius": 100000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 347531
  },
  {
    "id": 1829,
    "name": "Gazipasa,Turkey",
    "lat": 36.412708,
    "lng": 32.443546,
    "radius": 50000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 412254
  },
  {
    "id": 1210,
    "name": "Gdansk, Poland",
    "lat": 54.378843,
    "lng": 18.468075,
    "radius": 200000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 386859
  },
  {
    "id": 919,
    "name": "General Santos,Philippines",
    "lat": 6.057532,
    "lng": 125.099748,
    "radius": 200000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 121600
  },
  {
    "id": 449,
    "name": "Geneva,Switzerland",
    "lat": 46.355616,
    "lng": 6.346735,
    "radius": 450000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 806046
  },
  {
    "id": 1311,
    "name": "Genoa,Italy",
    "lat": 44.683164,
    "lng": 8.473181,
    "radius": 80000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 1037245
  },
  {
    "id": 1294,
    "name": "Georgetown, Guyana",
    "lat": 6.306096,
    "lng": -58.821864,
    "radius": 180000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 192375
  },
  {
    "id": 854,
    "name": "Georgetown,Cayman Islands",
    "lat": 19.298329,
    "lng": -81.293958,
    "radius": 29000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 76911
  },
  {
    "id": 1155,
    "name": "Gibraltar",
    "lat": 36.142592,
    "lng": -5.343258,
    "radius": 5000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 182642
  },
  {
    "id": 1177,
    "name": "Girona,Spain",
    "lat": 41.902730,
    "lng": 2.762969,
    "radius": 32000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 204396
  },
  {
    "id": 839,
    "name": "Glasgow,UK",
    "lat": 55.728398,
    "lng": -3.607144,
    "radius": 160934,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 930731
  },
  {
    "id": 17033,
    "name": "GLO",
    "lat": 51.901960,
    "lng": -2.147113,
    "radius": 40234,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 507426
  },
  {
    "id": 1713,
    "name": "Goa, India",
    "lat": 15.294214,
    "lng": 73.986961,
    "radius": 48000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 634352
  },
  {
    "id": 954,
    "name": "Goiania  Brazil",
    "lat": -16.632303,
    "lng": -49.216345,
    "radius": 89842,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": null
  },
  {
    "id": 40174,
    "name": "Gold Coast,Australia",
    "lat": -28.076208,
    "lng": 153.450089,
    "radius": 200000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 1364983
  },
  {
    "id": 42920,
    "name": "Gorakhpur, India",
    "lat": 26.746390,
    "lng": 83.442854,
    "radius": 100000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 93952
  },
  {
    "id": 1641,
    "name": "Gothenburg,Sweden",
    "lat": 57.668799,
    "lng": 12.292314,
    "radius": 30000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 386744
  },
  {
    "id": 1179,
    "name": "Granada,Spain",
    "lat": 37.184870,
    "lng": -3.777516,
    "radius": 50000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 192620
  },
  {
    "id": 716,
    "name": "Grand Bahama The Bahamas",
    "lat": 26.361266,
    "lng": -78.517742,
    "radius": 81429,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 15025
  },
  {
    "id": 397,
    "name": "Grand Rapids, MI, USA",
    "lat": 42.884663,
    "lng": -85.524843,
    "radius": 199558,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 197379
  },
  {
    "id": 18250,
    "name": "Graz",
    "lat": 46.994046,
    "lng": 15.440132,
    "radius": 150000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 210556
  },
  {
    "id": 791,
    "name": "Green Bay, WI, USA",
    "lat": 44.492700,
    "lng": -88.127178,
    "radius": 321868,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 199936
  },
  {
    "id": 413,
    "name": "Greensboro, NC, USA",
    "lat": 36.374537,
    "lng": -80.045918,
    "radius": 160934,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 181932
  },
  {
    "id": 405,
    "name": "Greerville  SC  USA",
    "lat": 34.895901,
    "lng": -82.217234,
    "radius": 199558,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 8798
  },
  {
    "id": 484,
    "name": "Grenada ",
    "lat": 12.007111,
    "lng": -61.786040,
    "radius": 36542,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": null
  },
  {
    "id": 21918,
    "name": "Grenchen",
    "lat": 47.181764,
    "lng": 7.411161,
    "radius": 10000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 25983
  },
  {
    "id": 1135,
    "name": "Grenoble,France",
    "lat": 45.362175,
    "lng": 5.330244,
    "radius": 200000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 178519
  },
  {
    "id": 5526,
    "name": "Greven, Germany",
    "lat": 52.132935,
    "lng": 7.690944,
    "radius": 40000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 600743
  },
  {
    "id": 1162,
    "name": "Groningen, Netherlands",
    "lat": 52.805659,
    "lng": 6.603567,
    "radius": 10000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 124299
  },
  {
    "id": 166,
    "name": "Guadalajara,Mexico",
    "lat": 20.525956,
    "lng": -103.307625,
    "radius": 200000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 271726
  },
  {
    "id": 169,
    "name": "Guanajuato,Mexico",
    "lat": 20.929357,
    "lng": -101.414585,
    "radius": 100000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 453744
  },
  {
    "id": 275,
    "name": "Guangzhou,China",
    "lat": 23.128922,
    "lng": 113.281779,
    "radius": 78000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 1080386
  },
  {
    "id": 1199,
    "name": "Guatemala City, Guatemala",
    "lat": 14.584098,
    "lng": -90.527687,
    "radius": 81000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 105726
  },
  {
    "id": 1289,
    "name": "Guayaquil  Ecuador",
    "lat": -2.082180,
    "lng": -79.875958,
    "radius": 67415,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": null
  },
  {
    "id": 1156,
    "name": "Guernsey  Guernsey ",
    "lat": 49.465775,
    "lng": -2.624895,
    "radius": 10730,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": null
  },
  {
    "id": 347,
    "name": "GuiLin",
    "lat": 25.269138,
    "lng": 110.287531,
    "radius": 72000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 338174
  },
  {
    "id": 674,
    "name": "GuiYang,China",
    "lat": 26.638249,
    "lng": 106.635241,
    "radius": 200000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 233483
  },
  {
    "id": 1398,
    "name": "Gulu, Uganda",
    "lat": 2.799497,
    "lng": 32.275278,
    "radius": 118000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 109551
  },
  {
    "id": 1715,
    "name": "Guwahati, India",
    "lat": 26.106473,
    "lng": 91.586047,
    "radius": 150000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 495690
  },
  {
    "id": 27507,
    "name": "Gwalior",
    "lat": 26.285499,
    "lng": 78.217173,
    "radius": 300000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 91080
  },
  {
    "id": 37538,
    "name": "Gydnia",
    "lat": 54.579348,
    "lng": 18.515281,
    "radius": 150000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 174672
  },
  {
    "id": 1459,
    "name": "Gyor, Hungary",
    "lat": 47.623347,
    "lng": 17.804460,
    "radius": 102000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 260903
  },
  {
    "id": 1500,
    "name": "Gyumri  Armenia",
    "lat": 40.751110,
    "lng": 43.854270,
    "radius": 58338,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": null
  },
  {
    "id": 696,
    "name": "Ha Long Bay,Vietnam",
    "lat": 20.881556,
    "lng": 106.559777,
    "radius": 89000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 1369902
  },
  {
    "id": 1379,
    "name": "Ha'il, Saudi Arabia",
    "lat": 27.438251,
    "lng": 41.690178,
    "radius": 62000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 150939
  },
  {
    "id": 678,
    "name": "HaiKou,China",
    "lat": 19.900481,
    "lng": 110.311684,
    "radius": 30000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 338139
  },
  {
    "id": 822,
    "name": "Halifax,Canada",
    "lat": 44.883561,
    "lng": -63.509407,
    "radius": 80000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 1370109
  },
  {
    "id": 1362,
    "name": "Hambantota, Sri Lanka",
    "lat": 6.221978,
    "lng": 80.992066,
    "radius": 101065,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 83662
  },
  {
    "id": 425,
    "name": "Hamburg",
    "lat": 53.633622,
    "lng": 9.997413,
    "radius": 150000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 245113
  },
  {
    "id": 37342,
    "name": "Hammerfest-Prærien, Norway",
    "lat": 70.679722,
    "lng": 23.668611,
    "radius": 400000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 90440
  },
  {
    "id": 1349,
    "name": "Hanga Roa, Easter Island",
    "lat": -27.124505,
    "lng": -109.350386,
    "radius": 16000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 106292
  },
  {
    "id": 273,
    "name": "HangZhou",
    "lat": 30.274320,
    "lng": 120.161736,
    "radius": 324000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 203698
  },
  {
    "id": 1358,
    "name": "Hanimaadhoo  Maldives",
    "lat": 6.746492,
    "lng": 73.169173,
    "radius": 3924,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": null
  },
  {
    "id": 117,
    "name": "Hanoi,Vietnam",
    "lat": 21.218715,
    "lng": 105.804171,
    "radius": 145000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 1319552
  },
  {
    "id": 1441,
    "name": "Hanover,Germany",
    "lat": 52.461849,
    "lng": 9.688992,
    "radius": 100000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 600739
  },
  {
    "id": 1423,
    "name": "Harare, Zimbabwe",
    "lat": -17.918784,
    "lng": 31.097279,
    "radius": 103000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 91097
  },
  {
    "id": 661,
    "name": "Harbin,China",
    "lat": 45.763447,
    "lng": 126.634537,
    "radius": 103000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 336742
  },
  {
    "id": 1998,
    "name": "Harrisburg, PA",
    "lat": 40.182971,
    "lng": -76.803408,
    "radius": 37015,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 203239
  },
  {
    "id": 46977,
    "name": "Hartford",
    "lat": 41.514076,
    "lng": -72.538157,
    "radius": 160934,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 162602
  },
  {
    "id": 1275,
    "name": "Hassi Messaoud  Algeria",
    "lat": 31.673889,
    "lng": 6.140556,
    "radius": 95000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": null
  },
  {
    "id": 930,
    "name": "Hat Yai, Thailand",
    "lat": 6.936216,
    "lng": 100.393721,
    "radius": 75000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 180832
  },
  {
    "id": 18014,
    "name": "Hatay",
    "lat": 36.363345,
    "lng": 36.284129,
    "radius": 200000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": null
  },
  {
    "id": 1635,
    "name": "Haugesund, Norway",
    "lat": 59.344487,
    "lng": 5.216570,
    "radius": 50000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 90441
  },
  {
    "id": 663,
    "name": "Hefei,China",
    "lat": 31.833091,
    "lng": 117.208709,
    "radius": 128000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 338194
  },
  {
    "id": 447,
    "name": "Helsinki, Finland",
    "lat": 61.247637,
    "lng": 24.333973,
    "radius": 150000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 759875
  },
  {
    "id": 1472,
    "name": "Heraklion,Greece",
    "lat": 35.339580,
    "lng": 25.174748,
    "radius": 62000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 283802
  },
  {
    "id": 781,
    "name": "Hermosillo, Mexico",
    "lat": 29.090023,
    "lng": -111.051983,
    "radius": 111000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 84586
  },
  {
    "id": 1458,
    "name": "Heviz, Hungary",
    "lat": 46.683877,
    "lng": 17.158208,
    "radius": 65000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 208110
  },
  {
    "id": 91,
    "name": "Hilo  HI  USA",
    "lat": 19.718834,
    "lng": -155.041687,
    "radius": 78000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 6540
  },
  {
    "id": 1057,
    "name": "Hiroshima, Japan",
    "lat": 34.415450,
    "lng": 132.675454,
    "radius": 34000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 492856
  },
  {
    "id": 113,
    "name": "Ho Chi Minh,Vietnam",
    "lat": 10.789448,
    "lng": 106.644243,
    "radius": 194000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 740411
  },
  {
    "id": 645,
    "name": "Hobart,Australia",
    "lat": -42.827609,
    "lng": 147.352092,
    "radius": 80000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 739831
  },
  {
    "id": 659,
    "name": "Hohhot,China",
    "lat": 40.830720,
    "lng": 111.777891,
    "radius": 177000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 217882
  },
  {
    "id": 150,
    "name": "Hong Kong,China",
    "lat": 22.298462,
    "lng": 114.099213,
    "radius": 21870,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 1369119
  },
  {
    "id": 37345,
    "name": "Honningsvåg-Valan, Norway.",
    "lat": 71.009466,
    "lng": 25.985302,
    "radius": 350000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 90442
  },
  {
    "id": 89,
    "name": "Honolulu,USA",
    "lat": 21.324513,
    "lng": -157.925074,
    "radius": 62764,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 1286945
  },
  {
    "id": 99,
    "name": "Houston,USA",
    "lat": 29.974775,
    "lng": -95.534262,
    "radius": 128747,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 1370163
  },
  {
    "id": 37588,
    "name": "Hovden Ørsta–Volda, Norway",
    "lat": 62.180036,
    "lng": 6.079498,
    "radius": 300000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 90443
  },
  {
    "id": 23250,
    "name": "HPN",
    "lat": 41.068333,
    "lng": -73.708664,
    "radius": 4828,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 30837
  },
  {
    "id": 695,
    "name": "Hua Hin,Thailand",
    "lat": 12.627490,
    "lng": 99.951620,
    "radius": 200000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 180833
  },
  {
    "id": 1116,
    "name": "Huai'an,China",
    "lat": 33.736988,
    "lng": 119.127669,
    "radius": 104000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 150792
  },
  {
    "id": 1106,
    "name": "Hualien, Taiwan, China",
    "lat": 24.025449,
    "lng": 121.614825,
    "radius": 93000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 140541
  },
  {
    "id": 1073,
    "name": "Huangshan City,China",
    "lat": 29.713722,
    "lng": 118.356512,
    "radius": 130000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 218011
  },
  {
    "id": 806,
    "name": "Huatulco,Mexico",
    "lat": 15.772261,
    "lng": -96.258357,
    "radius": 100000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 216893
  },
  {
    "id": 27506,
    "name": "Hubballi",
    "lat": 15.357242,
    "lng": 75.084859,
    "radius": 150000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 45606
  },
  {
    "id": 935,
    "name": "Hue, Vietnam",
    "lat": 16.397783,
    "lng": 107.700699,
    "radius": 116000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 176189
  },
  {
    "id": 23241,
    "name": "Huelva",
    "lat": 37.363490,
    "lng": -6.921801,
    "radius": 30000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 113492
  },
  {
    "id": 1180,
    "name": "Huesca Spain",
    "lat": 42.082429,
    "lng": -0.322664,
    "radius": 150000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": null
  },
  {
    "id": 57687,
    "name": "Huizhou,China",
    "lat": 22.922938,
    "lng": 114.691846,
    "radius": 56000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 175039
  },
  {
    "id": 1074,
    "name": "Hulunbuir,China",
    "lat": 49.213318,
    "lng": 119.824061,
    "radius": 70000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 218012
  },
  {
    "id": 792,
    "name": "Huntsville, AL, USA",
    "lat": 34.640333,
    "lng": -86.775690,
    "radius": 321868,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 147442
  },
  {
    "id": 981,
    "name": "Hurghada,Egypt",
    "lat": 27.180494,
    "lng": 33.807566,
    "radius": 100000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 455744
  },
  {
    "id": 37594,
    "name": "Húsavík, Iceland",
    "lat": 65.955816,
    "lng": -17.419725,
    "radius": 200000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 386795
  },
  {
    "id": 1716,
    "name": "Hyderabad, India",
    "lat": 17.240263,
    "lng": 78.429385,
    "radius": 350000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 1188352
  },
  {
    "id": 22438,
    "name": "Hyvinkaa Airfield",
    "lat": 60.654400,
    "lng": 24.881239,
    "radius": 10000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 140395
  },
  {
    "id": 1495,
    "name": "Iasi, Romania",
    "lat": 47.177145,
    "lng": 27.617312,
    "radius": 150000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 278749
  },
  {
    "id": 1777,
    "name": "Ibague Colombia",
    "lat": 4.425284,
    "lng": -75.140216,
    "radius": 133220,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": null
  },
  {
    "id": 37148,
    "name": "Ibaraki，Japan",
    "lat": 36.206806,
    "lng": 140.243303,
    "radius": 46000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 493324
  },
  {
    "id": 1181,
    "name": "Ibiza,Spain",
    "lat": 39.056379,
    "lng": 1.379463,
    "radius": 28000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 234932
  },
  {
    "id": 921,
    "name": "Iloilo City, Philippines",
    "lat": 11.060713,
    "lng": 122.321799,
    "radius": 50000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 464826
  },
  {
    "id": 1717,
    "name": "Imphal, India",
    "lat": 24.764416,
    "lng": 93.897329,
    "radius": 79000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 94349
  },
  {
    "id": 96,
    "name": "Indianapolis",
    "lat": 39.492881,
    "lng": -85.991938,
    "radius": 160934,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 1309935
  },
  {
    "id": 1718,
    "name": "Indore, India",
    "lat": 22.726675,
    "lng": 75.804159,
    "radius": 800000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 108808
  },
  {
    "id": 1451,
    "name": "Innsbruck, Austria",
    "lat": 47.299313,
    "lng": 11.383553,
    "radius": 80000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 191080
  },
  {
    "id": 22074,
    "name": "Interlaken",
    "lat": 46.673962,
    "lng": 7.882435,
    "radius": 200000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 117247
  },
  {
    "id": 840,
    "name": "Inverness,UK",
    "lat": 57.477296,
    "lng": -4.223030,
    "radius": 19118,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 527827
  },
  {
    "id": 1778,
    "name": "Ipiales  Colombia",
    "lat": 0.949208,
    "lng": -77.538271,
    "radius": 61311,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": null
  },
  {
    "id": 1002,
    "name": "Ipoh,Malaysia",
    "lat": 4.570357,
    "lng": 101.098168,
    "radius": 150000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 1146167
  },
  {
    "id": 1749,
    "name": "Iquique  Chile",
    "lat": -20.536408,
    "lng": -70.180518,
    "radius": 113276,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": null
  },
  {
    "id": 37593,
    "name": "Ísafjörður, Iceland",
    "lat": 66.055413,
    "lng": -23.142302,
    "radius": 300000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 386798
  },
  {
    "id": 1359,
    "name": "Islamabad, Pakistan",
    "lat": 33.556793,
    "lng": 72.835613,
    "radius": 78000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 597214
  },
  {
    "id": 1158,
    "name": "Isle of Man",
    "lat": 54.152596,
    "lng": -4.482878,
    "radius": 32000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 95448
  },
  {
    "id": 1692,
    "name": "Issyk-Kul, Kyrgyzstan",
    "lat": 42.585892,
    "lng": 76.706234,
    "radius": 69000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 195582
  },
  {
    "id": 1830,
    "name": "Ivalo-Inari, Finland",
    "lat": 68.608565,
    "lng": 27.420037,
    "radius": 80000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 516645
  },
  {
    "id": 908,
    "name": "Izmir,Turkey",
    "lat": 38.376242,
    "lng": 28.343758,
    "radius": 200000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 1172529
  },
  {
    "id": 27436,
    "name": "Jabalpur, India",
    "lat": 23.178261,
    "lng": 80.052135,
    "radius": 250000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 143713
  },
  {
    "id": 97,
    "name": "Jacksonville",
    "lat": 30.366174,
    "lng": -81.302226,
    "radius": 104607,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 293616
  },
  {
    "id": 1363,
    "name": "Jaffna  Sri Lanka",
    "lat": 9.792812,
    "lng": 80.070999,
    "radius": 80000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 8262
  },
  {
    "id": 708,
    "name": "Jaipur, India",
    "lat": 26.828944,
    "lng": 75.805618,
    "radius": 400000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 629984
  },
  {
    "id": 27560,
    "name": "Jaisalmer",
    "lat": 26.870623,
    "lng": 70.855865,
    "radius": 120000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 91123
  },
  {
    "id": 1018,
    "name": "Jakarta-HLP,Indonesia",
    "lat": -6.778398,
    "lng": 106.906655,
    "radius": 158000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 1276562
  },
  {
    "id": 27543,
    "name": "Jalgaon, India",
    "lat": 20.961404,
    "lng": 75.619162,
    "radius": 300000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 94443
  },
  {
    "id": 27497,
    "name": "Jamnagar India",
    "lat": 22.460711,
    "lng": 70.015896,
    "radius": 300000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 68408
  },
  {
    "id": 27546,
    "name": "Jamshedpur, India",
    "lat": 22.815347,
    "lng": 86.171812,
    "radius": 280000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 91102
  },
  {
    "id": 314,
    "name": "Jeddah, Saudi Arabia",
    "lat": 21.664396,
    "lng": 39.174157,
    "radius": 150000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 155103
  },
  {
    "id": 106,
    "name": "Jeju, Korean",
    "lat": 33.432648,
    "lng": 126.546304,
    "radius": 43000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 491378
  },
  {
    "id": 1182,
    "name": "Jerez de la Frontera,Spain",
    "lat": 36.745294,
    "lng": -6.060878,
    "radius": 150000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 266522
  },
  {
    "id": 1157,
    "name": "Jersey",
    "lat": 49.198491,
    "lng": -2.143036,
    "radius": 11000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 29572
  },
  {
    "id": 27550,
    "name": "Jeypore",
    "lat": 18.813487,
    "lng": 82.712333,
    "radius": 300000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 46265
  },
  {
    "id": 27548,
    "name": "Jharsuguda, India",
    "lat": 21.916107,
    "lng": 84.046365,
    "radius": 250000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 45819
  },
  {
    "id": 1112,
    "name": "Jiamusi,China",
    "lat": 46.787855,
    "lng": 130.343405,
    "radius": 200000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 218071
  },
  {
    "id": 1075,
    "name": "JieYang,China",
    "lat": 23.547085,
    "lng": 116.514411,
    "radius": 161000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 218013
  },
  {
    "id": 1276,
    "name": "Jijel  Algeria",
    "lat": 36.793393,
    "lng": 5.877775,
    "radius": 87950,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": null
  },
  {
    "id": 665,
    "name": "Jinan,China",
    "lat": 36.643708,
    "lng": 117.123439,
    "radius": 197000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 207947
  },
  {
    "id": 61570,
    "name": "Jingdezhen,China",
    "lat": 29.290708,
    "lng": 117.176084,
    "radius": 150000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 185006
  },
  {
    "id": 9499,
    "name": "Jiujiang,China",
    "lat": 29.481183,
    "lng": 115.807767,
    "radius": 130000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 106468
  },
  {
    "id": 1381,
    "name": "Jizan, Saudi Arabia",
    "lat": 16.902686,
    "lng": 42.582818,
    "radius": 59000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 86143
  },
  {
    "id": 955,
    "name": "Joao Pessoa, Brazil",
    "lat": -7.146009,
    "lng": -34.948776,
    "radius": 115000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 113529
  },
  {
    "id": 27377,
    "name": "Jodhpur, India",
    "lat": 26.255365,
    "lng": 73.049821,
    "radius": 350000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 1327751
  },
  {
    "id": 341,
    "name": "Johannesburg,South Africa",
    "lat": -25.938303,
    "lng": 28.010372,
    "radius": 106000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 1310315
  },
  {
    "id": 102,
    "name": "Johor Bahru,Malaysia",
    "lat": 1.614255,
    "lng": 103.661531,
    "radius": 19000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 1113733
  },
  {
    "id": 37524,
    "name": "Jonkoping",
    "lat": 57.750548,
    "lng": 14.070347,
    "radius": 30000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 113780
  },
  {
    "id": 17312,
    "name": "Jujuy",
    "lat": -23.371420,
    "lng": -65.610192,
    "radius": 130000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 193167
  },
  {
    "id": 692,
    "name": "Juneau, AK, USA",
    "lat": 58.357981,
    "lng": -134.583179,
    "radius": 136794,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 42688
  },
  {
    "id": 22432,
    "name": "Jyvaskyla",
    "lat": 62.401035,
    "lng": 25.674723,
    "radius": 150000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 27383
  },
  {
    "id": 27505,
    "name": "Kadapa",
    "lat": 14.518366,
    "lng": 78.768026,
    "radius": 150000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 45595
  },
  {
    "id": 1055,
    "name": "Kagoshima, Japan",
    "lat": 31.688292,
    "lng": 130.597322,
    "radius": 45000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 492847
  },
  {
    "id": 375,
    "name": "Kahului,HI,USA",
    "lat": 20.896792,
    "lng": -156.432938,
    "radius": 45062,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 738615
  },
  {
    "id": 1653,
    "name": "Kalamata,Greece",
    "lat": 37.054855,
    "lng": 22.034119,
    "radius": 87000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 210340
  },
  {
    "id": 1204,
    "name": "Kalispell, USA",
    "lat": 48.307665,
    "lng": -114.252534,
    "radius": 125529,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 199336
  },
  {
    "id": 1397,
    "name": "Kampala, Uganda",
    "lat": 0.043591,
    "lng": 32.441794,
    "radius": 129000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 201468
  },
  {
    "id": 27504,
    "name": "Kangra, India",
    "lat": 32.165158,
    "lng": 76.262551,
    "radius": 40000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 274744
  },
  {
    "id": 1744,
    "name": "Kannur, India",
    "lat": 11.914234,
    "lng": 75.548641,
    "radius": 250000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 91169
  },
  {
    "id": 27562,
    "name": "Kanpur, India",
    "lat": 26.408939,
    "lng": 80.409261,
    "radius": 300000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 93639
  },
  {
    "id": 368,
    "name": "Kansas City,MO,USA",
    "lat": 39.068597,
    "lng": -94.005793,
    "radius": 160934,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 195807
  },
  {
    "id": 149,
    "name": "Kaohsiung,Taiwan, China",
    "lat": 22.696479,
    "lng": 120.289648,
    "radius": 57000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 203707
  },
  {
    "id": 1360,
    "name": "Karachi,Pakistan",
    "lat": 24.900782,
    "lng": 67.168103,
    "radius": 58000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 1369932
  },
  {
    "id": 1681,
    "name": "Karaganda  Kazakhstan",
    "lat": 49.670833,
    "lng": 73.334444,
    "radius": 117077,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": null
  },
  {
    "id": 1432,
    "name": "Karlovy Vary, Czechia",
    "lat": 50.183600,
    "lng": 13.269074,
    "radius": 20000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 116383
  },
  {
    "id": 37521,
    "name": "Karlstad",
    "lat": 59.443735,
    "lng": 13.344772,
    "radius": 20000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 116759
  },
  {
    "id": 1473,
    "name": "Karpathos Island, Greece",
    "lat": 35.652873,
    "lng": 27.259533,
    "radius": 32000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 198278
  },
  {
    "id": 1327,
    "name": "Kasane,Botswana",
    "lat": -17.830600,
    "lng": 25.163719,
    "radius": 111000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 71626
  },
  {
    "id": 66735,
    "name": "Kashgar,China",
    "lat": 39.467155,
    "lng": 76.011070,
    "radius": 89000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 208757
  },
  {
    "id": 155,
    "name": "Kathmandu, Nepal",
    "lat": 27.862200,
    "lng": 85.201946,
    "radius": 150000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 772362
  },
  {
    "id": 1211,
    "name": "Katowice, Poland",
    "lat": 50.252913,
    "lng": 19.022322,
    "radius": 40000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 499172
  },
  {
    "id": 1519,
    "name": "Kaunas, Lithuania",
    "lat": 54.967000,
    "lng": 24.073575,
    "radius": 50000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 517752
  },
  {
    "id": 1474,
    "name": "Kavala, Greece",
    "lat": 41.388789,
    "lng": 24.542896,
    "radius": 150000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 97360
  },
  {
    "id": 909,
    "name": "Kayseri,Turkey",
    "lat": 38.775325,
    "lng": 35.725023,
    "radius": 150000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 1128809
  },
  {
    "id": 1475,
    "name": "Kefalonia Island,Greece",
    "lat": 38.119549,
    "lng": 20.504942,
    "radius": 34000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 198260
  },
  {
    "id": 825,
    "name": "Kelowna City,Canada",
    "lat": 49.956928,
    "lng": -119.378731,
    "radius": 60000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 175519
  },
  {
    "id": 844,
    "name": "Kerry,Ireland",
    "lat": 52.181386,
    "lng": -9.537219,
    "radius": 66000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 73890
  },
  {
    "id": 793,
    "name": "Key West,USA",
    "lat": 24.675415,
    "lng": -81.627228,
    "radius": 64374,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 264439
  },
  {
    "id": 27417,
    "name": "Khajuraho, India",
    "lat": 24.810567,
    "lng": 79.912928,
    "radius": 300000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 677053
  },
  {
    "id": 24861,
    "name": "Khon Kaen，Thailand",
    "lat": 16.464881,
    "lng": 102.787098,
    "radius": 150000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 1369954
  },
  {
    "id": 1812,
    "name": "Khujand, Tajikistan",
    "lat": 40.219245,
    "lng": 69.698175,
    "radius": 71000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 799554
  },
  {
    "id": 1849,
    "name": "Kiel Germany",
    "lat": 54.383987,
    "lng": 10.144137,
    "radius": 60683,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": null
  },
  {
    "id": 1403,
    "name": "Kigali, Rwanda",
    "lat": -1.963079,
    "lng": 30.135004,
    "radius": 82000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 73955
  },
  {
    "id": 902,
    "name": "Kilimanjaro,Tanzania",
    "lat": -3.424525,
    "lng": 37.065080,
    "radius": 105000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 110338
  },
  {
    "id": 769,
    "name": "Kingston,Jamaica",
    "lat": 17.937479,
    "lng": -76.779487,
    "radius": 100000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 1015740
  },
  {
    "id": 1258,
    "name": "Kingstown, Saint Vincent and the Grenadines",
    "lat": 13.251902,
    "lng": -61.156508,
    "radius": 17000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 479087
  },
  {
    "id": 1320,
    "name": "Kiritimati Kiribati",
    "lat": 1.881895,
    "lng": -157.344525,
    "radius": 31054,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": null
  },
  {
    "id": 37325,
    "name": "Kirkenes, Norway",
    "lat": 69.721424,
    "lng": 29.883179,
    "radius": 20000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 107308
  },
  {
    "id": 37269,
    "name": "Kiruna",
    "lat": 67.823939,
    "lng": 20.336618,
    "radius": 20000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 107517
  },
  {
    "id": 992,
    "name": "Kisumu, Kenya",
    "lat": -0.088294,
    "lng": 34.725745,
    "radius": 70000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 61570
  },
  {
    "id": 1623,
    "name": "Kittila, Finland",
    "lat": 67.694986,
    "lng": 24.850680,
    "radius": 50000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 516649
  },
  {
    "id": 1419,
    "name": "Klagenfurt,Austria",
    "lat": 46.650013,
    "lng": 14.324858,
    "radius": 100000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 207928
  },
  {
    "id": 22259,
    "name": "Klaipeda",
    "lat": 55.712054,
    "lng": 21.242927,
    "radius": 50000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 517757
  },
  {
    "id": 845,
    "name": "Knock, Ireland",
    "lat": 53.913794,
    "lng": -8.811220,
    "radius": 64000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 73895
  },
  {
    "id": 408,
    "name": "Knoxville",
    "lat": 35.810833,
    "lng": -83.993889,
    "radius": 135185,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 20812
  },
  {
    "id": 48,
    "name": "Ko Samui,Thailand",
    "lat": 9.509500,
    "lng": 100.013246,
    "radius": 14000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 1364977
  },
  {
    "id": 129,
    "name": "Kobe, Japan",
    "lat": 34.686601,
    "lng": 135.181903,
    "radius": 16000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 1369629
  },
  {
    "id": 22442,
    "name": "Kokkola",
    "lat": 63.718869,
    "lng": 23.134222,
    "radius": 50000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 27412
  },
  {
    "id": 1682,
    "name": "Kokshetau  Kazakhstan",
    "lat": 53.333461,
    "lng": 69.591018,
    "radius": 90349,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": null
  },
  {
    "id": 27564,
    "name": "Kolhapur",
    "lat": 16.665231,
    "lng": 74.282750,
    "radius": 300000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 46714
  },
  {
    "id": 161,
    "name": "Kolkata, India",
    "lat": 22.652043,
    "lng": 88.446330,
    "radius": 130000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 250582
  },
  {
    "id": 1056,
    "name": "Komatsu, Japan",
    "lat": 35.953721,
    "lng": 137.087327,
    "radius": 43000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 492849
  },
  {
    "id": 390,
    "name": "Kona, USA",
    "lat": 19.736916,
    "lng": -156.042925,
    "radius": 75639,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 741104
  },
  {
    "id": 910,
    "name": "Konya,Turkey",
    "lat": 38.185304,
    "lng": 32.165787,
    "radius": 100000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 92623
  },
  {
    "id": 1476,
    "name": "Kos Island,Greece",
    "lat": 36.773879,
    "lng": 27.145457,
    "radius": 22000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 198262
  },
  {
    "id": 1461,
    "name": "Kosice  Slovakia",
    "lat": 48.672906,
    "lng": 21.237443,
    "radius": 55451,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": null
  },
  {
    "id": 1683,
    "name": "Kostanay, Kazakhstan",
    "lat": 53.220658,
    "lng": 63.553825,
    "radius": 106930,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 208922
  },
  {
    "id": 27567,
    "name": "Kota",
    "lat": 25.163426,
    "lng": 75.850470,
    "radius": 300000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 91107
  },
  {
    "id": 1003,
    "name": "Kota Bharu, Malaysia",
    "lat": 6.169839,
    "lng": 102.293205,
    "radius": 88000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 733418
  },
  {
    "id": 50,
    "name": "Kota Kinabalu,Malaysia",
    "lat": 5.985850,
    "lng": 116.075668,
    "radius": 112000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 904822
  },
  {
    "id": 1851,
    "name": "Kozani  Greece",
    "lat": 40.289302,
    "lng": 21.840673,
    "radius": 73555,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": null
  },
  {
    "id": 1719,
    "name": "Kozhikode, India",
    "lat": 11.139728,
    "lng": 75.950785,
    "radius": 250000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 50748
  },
  {
    "id": 929,
    "name": "Krabi,Thailand",
    "lat": 8.099280,
    "lng": 98.983195,
    "radius": 67000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 1368901
  },
  {
    "id": 710,
    "name": "Krakow,Poland",
    "lat": 50.076978,
    "lng": 19.788119,
    "radius": 120000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 463746
  },
  {
    "id": 1542,
    "name": "Kraljevo  Serbia",
    "lat": 43.827486,
    "lng": 20.581207,
    "radius": 79336,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": null
  },
  {
    "id": 1735,
    "name": "Kristiansand-KSU, Norway",
    "lat": 63.020579,
    "lng": 7.614489,
    "radius": 30000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 102247
  },
  {
    "id": 1636,
    "name": "Kristiansand, Norway",
    "lat": 58.203830,
    "lng": 8.083769,
    "radius": 92000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 90447
  },
  {
    "id": 2926,
    "name": "Kruger National Park,South Africa",
    "lat": -24.963114,
    "lng": 31.589907,
    "radius": 150000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 205552
  },
  {
    "id": 49,
    "name": "Kuala Lumpur, Malaysia",
    "lat": 3.151843,
    "lng": 101.701701,
    "radius": 111108,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 1369626
  },
  {
    "id": 1004,
    "name": "Kuala Terengganu, Malaysia",
    "lat": 5.127366,
    "lng": 102.805924,
    "radius": 70000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 119734
  },
  {
    "id": 1005,
    "name": "Kuantan, Malaysia",
    "lat": 3.780722,
    "lng": 103.214974,
    "radius": 78000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 733419
  },
  {
    "id": 1006,
    "name": "Kuching, Malaysia",
    "lat": 1.547436,
    "lng": 110.369072,
    "radius": 43894,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 1192751
  },
  {
    "id": 1813,
    "name": "Kulob, Tajikistan",
    "lat": 38.020684,
    "lng": 69.498741,
    "radius": 70000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 799567
  },
  {
    "id": 27460,
    "name": "Kumaon",
    "lat": 29.596726,
    "lng": 80.236287,
    "radius": 100000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 51692
  },
  {
    "id": 675,
    "name": "KunMing,China",
    "lat": 24.872746,
    "lng": 102.830270,
    "radius": 101000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 207957
  },
  {
    "id": 1624,
    "name": "Kuopio, Finland",
    "lat": 63.006528,
    "lng": 27.797197,
    "radius": 300000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 114862
  },
  {
    "id": 1019,
    "name": "Kupang Indonesia",
    "lat": -10.014764,
    "lng": 123.722827,
    "radius": 57526,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": null
  },
  {
    "id": 40926,
    "name": "Kushinagar, India",
    "lat": 26.769341,
    "lng": 83.896143,
    "radius": 300000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 91129
  },
  {
    "id": 911,
    "name": "Kutahya,Turkey",
    "lat": 39.404494,
    "lng": 29.981262,
    "radius": 30000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 95050
  },
  {
    "id": 940,
    "name": "Kutaisi,Georgia",
    "lat": 42.182069,
    "lng": 42.465602,
    "radius": 81000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 115294
  },
  {
    "id": 1625,
    "name": "Kuusamo, Finland",
    "lat": 65.960618,
    "lng": 29.197705,
    "radius": 40000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 123182
  },
  {
    "id": 1367,
    "name": "Kuwait City, Kuwait",
    "lat": 29.262008,
    "lng": 47.575538,
    "radius": 69000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 111519
  },
  {
    "id": 1736,
    "name": "Kyzylorda  Kazakhstan",
    "lat": 44.711773,
    "lng": 65.587838,
    "radius": 119528,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": null
  },
  {
    "id": 45829,
    "name": "La Havana, Cuba",
    "lat": 23.077669,
    "lng": -81.618514,
    "radius": 170750,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 370446
  },
  {
    "id": 1183,
    "name": "La Palma,Spain",
    "lat": 28.622356,
    "lng": -17.754814,
    "radius": 36000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 49809
  },
  {
    "id": 972,
    "name": "La Paz, Bolivia",
    "lat": -16.510248,
    "lng": -68.188295,
    "radius": 87815,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 857725
  },
  {
    "id": 1862,
    "name": "La Paz,Mexico",
    "lat": 23.497268,
    "lng": -110.556483,
    "radius": 100000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 200571
  },
  {
    "id": 1136,
    "name": "La Rochelle,France",
    "lat": 46.176549,
    "lng": -1.193563,
    "radius": 200000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 178520
  },
  {
    "id": 861,
    "name": "La Romana, Dominican",
    "lat": 18.420744,
    "lng": -68.815485,
    "radius": 20000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 177049
  },
  {
    "id": 1154,
    "name": "Laayoune,Morocco,Africa",
    "lat": 27.150958,
    "lng": -13.221615,
    "radius": 143000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 1106217
  },
  {
    "id": 1450,
    "name": "Lagos, Nigeria",
    "lat": 6.581819,
    "lng": 3.321135,
    "radius": 105000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 122891
  },
  {
    "id": 2148,
    "name": "Lahore, Pakistan",
    "lat": 31.502506,
    "lng": 74.314133,
    "radius": 25249,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 1369918
  },
  {
    "id": 823,
    "name": "Lake simcoe,Canada",
    "lat": 44.488156,
    "lng": -79.546183,
    "radius": 50000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 116702
  },
  {
    "id": 1802,
    "name": "Lakeland, USA",
    "lat": 28.014162,
    "lng": -81.936478,
    "radius": 16093,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 118100
  },
  {
    "id": 1234,
    "name": "Lamezia,Italy",
    "lat": 38.873706,
    "lng": 16.219926,
    "radius": 50000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 662638
  },
  {
    "id": 51,
    "name": "Langkawi, Malaysia",
    "lat": 6.342366,
    "lng": 99.731115,
    "radius": 18000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 1034909
  },
  {
    "id": 1655,
    "name": "Lankaran  Azerbaijan",
    "lat": 38.742131,
    "lng": 48.823759,
    "radius": 60493,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": null
  },
  {
    "id": 794,
    "name": "Lansing, MI, USA",
    "lat": 42.775038,
    "lng": -84.589454,
    "radius": 199558,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 157773
  },
  {
    "id": 1184,
    "name": "Lanzarote,Spain",
    "lat": 28.994891,
    "lng": -13.576938,
    "radius": 34000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 192627
  },
  {
    "id": 668,
    "name": "LanZhou,China",
    "lat": 36.055802,
    "lng": 103.816596,
    "radius": 149000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 365941
  },
  {
    "id": 988,
    "name": "Laoag, Philippines",
    "lat": 18.182105,
    "lng": 120.531781,
    "radius": 74000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 120278
  },
  {
    "id": 1626,
    "name": "Lappeenranta, Finland",
    "lat": 61.160809,
    "lng": 27.870695,
    "radius": 50000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 80662
  },
  {
    "id": 1752,
    "name": "Laredo  TX  USA",
    "lat": 27.544783,
    "lng": -99.461359,
    "radius": 94951,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 7640
  },
  {
    "id": 639,
    "name": "Larnaca, Cyprus",
    "lat": 34.872340,
    "lng": 33.620352,
    "radius": 20000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 405141
  },
  {
    "id": 1178,
    "name": "Las Palmas,Spain",
    "lat": 27.933185,
    "lng": -15.387707,
    "radius": 50000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 203894
  },
  {
    "id": 1819,
    "name": "Las Vegas, NM, USA",
    "lat": 35.654405,
    "lng": -105.142532,
    "radius": 101388,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 199329
  },
  {
    "id": 62,
    "name": "Las Vegas,USA",
    "lat": 36.084000,
    "lng": -115.153739,
    "radius": 120701,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 1360958
  },
  {
    "id": 702,
    "name": "LaSa,China",
    "lat": 29.641813,
    "lng": 91.116427,
    "radius": 112000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 218000
  },
  {
    "id": 27569,
    "name": "Latur",
    "lat": 18.409689,
    "lng": 76.466116,
    "radius": 300000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 46717
  },
  {
    "id": 834,
    "name": "Leeds/Bradford,UK",
    "lat": 53.859385,
    "lng": -1.411867,
    "radius": 30383,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 1360976
  },
  {
    "id": 22255,
    "name": "Leipaja",
    "lat": 56.561569,
    "lng": 23.312574,
    "radius": 198000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 68331
  },
  {
    "id": 1442,
    "name": "Leipzig,Germany",
    "lat": 51.422081,
    "lng": 12.220381,
    "radius": 100000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 599171
  },
  {
    "id": 37337,
    "name": "Leirin -Fagernes, Norway",
    "lat": 61.006602,
    "lng": 9.294330,
    "radius": 20000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 137002
  },
  {
    "id": 37348,
    "name": "Leknes, Norway",
    "lat": 68.154037,
    "lng": 13.615376,
    "radius": 10000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 107518
  },
  {
    "id": 27503,
    "name": "Lengpui",
    "lat": 23.838848,
    "lng": 92.624171,
    "radius": 300000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 45573
  },
  {
    "id": 1864,
    "name": "Leon, Spain",
    "lat": 42.590438,
    "lng": -5.643462,
    "radius": 105000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 48975
  },
  {
    "id": 887,
    "name": "Leticia, Colombia",
    "lat": -4.197614,
    "lng": -69.942689,
    "radius": 94000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 38763
  },
  {
    "id": 1076,
    "name": "Lianyungang,China",
    "lat": 34.564965,
    "lng": 118.881707,
    "radius": 108000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 218014
  },
  {
    "id": 743,
    "name": "Liberia,Costa Rica",
    "lat": 10.484038,
    "lng": -85.473836,
    "radius": 60000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 500602
  },
  {
    "id": 1412,
    "name": "Libreville, Gabon",
    "lat": 0.457650,
    "lng": 9.411156,
    "radius": 78000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 110307
  },
  {
    "id": 1120,
    "name": "Liege, Belgium",
    "lat": 50.641159,
    "lng": 5.447912,
    "radius": 20000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 173669
  },
  {
    "id": 395,
    "name": "Lihue, HI, USA",
    "lat": 21.978849,
    "lng": -159.343759,
    "radius": 28968,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 733878
  },
  {
    "id": 1077,
    "name": "Lijiang,China",
    "lat": 26.679116,
    "lng": 100.177856,
    "radius": 133000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 337182
  },
  {
    "id": 1137,
    "name": "Lille,France",
    "lat": 50.566993,
    "lng": 3.103732,
    "radius": 100000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 178521
  },
  {
    "id": 1409,
    "name": "Lilongwe,Malawi",
    "lat": -13.775330,
    "lng": 33.796726,
    "radius": 68000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 71647
  },
  {
    "id": 320,
    "name": "Lima,Peru",
    "lat": -11.900454,
    "lng": -76.793432,
    "radius": 47000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 1335768
  },
  {
    "id": 1138,
    "name": "Limoges,France",
    "lat": 45.861921,
    "lng": 1.176635,
    "radius": 150000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 178522
  },
  {
    "id": 37525,
    "name": "Linkoping",
    "lat": 58.407442,
    "lng": 15.657141,
    "radius": 50000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 89140
  },
  {
    "id": 1078,
    "name": "Linyi,China",
    "lat": 35.106427,
    "lng": 118.414967,
    "radius": 155000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 218016
  },
  {
    "id": 1420,
    "name": "Linz, Austria",
    "lat": 48.239617,
    "lng": 14.191673,
    "radius": 128000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 95926
  },
  {
    "id": 430,
    "name": "Lisbon,Portugal",
    "lat": 38.775594,
    "lng": -9.135367,
    "radius": 150000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 1160399
  },
  {
    "id": 407,
    "name": "Little Rock, AR, USA",
    "lat": 34.730705,
    "lng": -92.221653,
    "radius": 123919,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 42695
  },
  {
    "id": 485,
    "name": "Livepool,UK",
    "lat": 53.494394,
    "lng": -3.441327,
    "radius": 89739,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 1360972
  },
  {
    "id": 1449,
    "name": "Livingstone, Zambia",
    "lat": -17.825252,
    "lng": 25.819217,
    "radius": 91000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 71643
  },
  {
    "id": 1487,
    "name": "Ljubljana,Slovenia",
    "lat": 46.225943,
    "lng": 14.455914,
    "radius": 62000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 198440
  },
  {
    "id": 1206,
    "name": "Lleida  Spain",
    "lat": 41.728470,
    "lng": 0.543491,
    "radius": 90388,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": null
  },
  {
    "id": 27993,
    "name": "Locarno",
    "lat": 46.163863,
    "lng": 8.881329,
    "radius": 200000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 195652
  },
  {
    "id": 1213,
    "name": "Lodz, Poland",
    "lat": 51.719705,
    "lng": 19.390809,
    "radius": 300000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 499173
  },
  {
    "id": 883,
    "name": "Lombok, Indonesia",
    "lat": -8.532843,
    "lng": 116.243081,
    "radius": 57000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 192109
  },
  {
    "id": 1399,
    "name": "Lome  Togo",
    "lat": 6.536327,
    "lng": 1.297010,
    "radius": 63957,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": null
  },
  {
    "id": 1283,
    "name": "London,Canada",
    "lat": 43.028551,
    "lng": -81.149864,
    "radius": 170000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 264495
  },
  {
    "id": 185,
    "name": "London,UK",
    "lat": 51.932829,
    "lng": -1.251565,
    "radius": 225308,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 1314692
  },
  {
    "id": 1793,
    "name": "Loreto,Mexico",
    "lat": 25.967960,
    "lng": -111.682546,
    "radius": 78000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 97349
  },
  {
    "id": 37,
    "name": "Los Angeles,USA",
    "lat": 33.997389,
    "lng": -117.981055,
    "radius": 181855,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 1361541
  },
  {
    "id": 606,
    "name": "Los Cabos,Mexico",
    "lat": 23.354097,
    "lng": -109.276793,
    "radius": 100000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 1143467
  },
  {
    "id": 897,
    "name": "Losinj  Croatia",
    "lat": 44.840688,
    "lng": 14.280088,
    "radius": 46530,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": null
  },
  {
    "id": 391,
    "name": "Louisville, KY, USA",
    "lat": 38.175662,
    "lng": -85.736923,
    "radius": 120701,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 154264
  },
  {
    "id": 1323,
    "name": "Luanda, Angola",
    "lat": -8.848056,
    "lng": 13.235278,
    "radius": 106000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 114744
  },
  {
    "id": 18710,
    "name": "Luang Prabang,Laos",
    "lat": 19.901028,
    "lng": 102.168417,
    "radius": 150000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 144818
  },
  {
    "id": 1350,
    "name": "Lubango, Angola",
    "lat": -14.921899,
    "lng": 13.572616,
    "radius": 132000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 71642
  },
  {
    "id": 1453,
    "name": "Lubeck,Germany",
    "lat": 53.805286,
    "lng": 10.710608,
    "radius": 150000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 194757
  },
  {
    "id": 1212,
    "name": "Lublin, Poland",
    "lat": 51.235810,
    "lng": 22.715066,
    "radius": 500000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 499174
  },
  {
    "id": 1720,
    "name": "Lucknow, India",
    "lat": 26.761732,
    "lng": 80.885655,
    "radius": 550000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 260874
  },
  {
    "id": 27570,
    "name": "Ludhiana",
    "lat": 30.854279,
    "lng": 75.951802,
    "radius": 200000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 90962
  },
  {
    "id": 21917,
    "name": "Lugano,Switzerland",
    "lat": 46.831838,
    "lng": 8.822218,
    "radius": 200000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 806128
  },
  {
    "id": 1642,
    "name": "Lulea, Sweden",
    "lat": 65.542549,
    "lng": 22.121855,
    "radius": 40000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 517747
  },
  {
    "id": 1079,
    "name": "Luoyang,China",
    "lat": 34.736000,
    "lng": 112.392302,
    "radius": 120000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 218017
  },
  {
    "id": 1394,
    "name": "Lusaka, Zambia",
    "lat": -15.325105,
    "lng": 28.446016,
    "radius": 336000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 71644
  },
  {
    "id": 21635,
    "name": "Lussane",
    "lat": 46.541575,
    "lng": 6.617745,
    "radius": 200000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 771471
  },
  {
    "id": 486,
    "name": "Luxemburg",
    "lat": 49.628900,
    "lng": 6.214745,
    "radius": 100000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 266033
  },
  {
    "id": 982,
    "name": "Luxor,Egypt",
    "lat": 25.673883,
    "lng": 32.701494,
    "radius": 64000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 1027756
  },
  {
    "id": 1139,
    "name": "Lyon,France",
    "lat": 45.723418,
    "lng": 5.088777,
    "radius": 150000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 795782
  },
  {
    "id": 1163,
    "name": "Maastricht, Netherlands",
    "lat": 50.912265,
    "lng": 5.771180,
    "radius": 15000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 124306
  },
  {
    "id": 151,
    "name": "Macau，MFM，China",
    "lat": 22.172165,
    "lng": 113.580752,
    "radius": 9000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 203704
  },
  {
    "id": 956,
    "name": "Maceio, Brazil",
    "lat": -9.514847,
    "lng": -35.792416,
    "radius": 98000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 188073
  },
  {
    "id": 1290,
    "name": "Machala  Ecuador",
    "lat": -3.402961,
    "lng": -79.575846,
    "radius": 73195,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": null
  },
  {
    "id": 410,
    "name": "Madison, WI, USA",
    "lat": 43.046176,
    "lng": -89.372737,
    "radius": 80467,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 188317
  },
  {
    "id": 319,
    "name": "Madrid,Spain",
    "lat": 40.498332,
    "lng": -3.567598,
    "radius": 200000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 1159298
  },
  {
    "id": 1721,
    "name": "Madurai, India",
    "lat": 9.838228,
    "lng": 78.089478,
    "radius": 250000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 91150
  },
  {
    "id": 24858,
    "name": "Mae Sot，Thailand",
    "lat": 16.703263,
    "lng": 98.545568,
    "radius": 150000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 200872
  },
  {
    "id": 1341,
    "name": "Mahajanga  Madagascar",
    "lat": -15.666389,
    "lng": 46.350833,
    "radius": 111822,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": null
  },
  {
    "id": 1779,
    "name": "Maicao  Colombia",
    "lat": 11.231178,
    "lng": -72.493172,
    "radius": 76690,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": null
  },
  {
    "id": 1020,
    "name": "Makassar,Indonesia",
    "lat": -5.118783,
    "lng": 119.813156,
    "radius": 68000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 124905
  },
  {
    "id": 1338,
    "name": "Malabo Equatorial Guinea",
    "lat": 3.756956,
    "lng": 8.710955,
    "radius": 44000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 10399
  },
  {
    "id": 448,
    "name": "Malaga,Spain",
    "lat": 36.678761,
    "lng": -4.494392,
    "radius": 150000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 775412
  },
  {
    "id": 912,
    "name": "Malatya Turkey",
    "lat": 38.439497,
    "lng": 38.104663,
    "radius": 150000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": null
  },
  {
    "id": 868,
    "name": "Male,Maldives",
    "lat": 4.191522,
    "lng": 73.546433,
    "radius": 6000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 1191328
  },
  {
    "id": 1643,
    "name": "Malmo, Sweden",
    "lat": 55.561754,
    "lng": 13.143052,
    "radius": 50000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 517577
  },
  {
    "id": 1021,
    "name": "Manado,Indonesia",
    "lat": 1.211288,
    "lng": 124.898048,
    "radius": 63000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 192930
  },
  {
    "id": 1201,
    "name": "Managua  Nicaragua",
    "lat": 12.144652,
    "lng": -86.171317,
    "radius": 69130,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": null
  },
  {
    "id": 27568,
    "name": "Manali-Kullu, India",
    "lat": 31.876909,
    "lng": 77.151897,
    "radius": 300000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 90953
  },
  {
    "id": 1456,
    "name": "Manama, Bahrain",
    "lat": 26.057787,
    "lng": 50.617804,
    "radius": 33000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 109957
  },
  {
    "id": 957,
    "name": "Manaus  Brazil",
    "lat": -3.035847,
    "lng": -60.046325,
    "radius": 50000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 20809
  },
  {
    "id": 409,
    "name": "Manchester, NH, USA",
    "lat": 42.983619,
    "lng": -71.203147,
    "radius": 64374,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 121464
  },
  {
    "id": 291,
    "name": "Manchester,UK",
    "lat": 53.223382,
    "lng": -1.616021,
    "radius": 80467,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 926112
  },
  {
    "id": 1722,
    "name": "Mangalore, India",
    "lat": 12.954171,
    "lng": 74.885804,
    "radius": 73000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 227557
  },
  {
    "id": 1080,
    "name": "Mangshi,China",
    "lat": 24.423846,
    "lng": 98.539165,
    "radius": 60000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 218018
  },
  {
    "id": 1820,
    "name": "Manhattan, KS, USA",
    "lat": 39.134209,
    "lng": -96.673838,
    "radius": 56327,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 195032
  },
  {
    "id": 108,
    "name": "Manila,Philippines",
    "lat": 14.552471,
    "lng": 120.932013,
    "radius": 102000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 1369624
  },
  {
    "id": 1780,
    "name": "Manizales Colombia",
    "lat": 5.029111,
    "lng": -75.469197,
    "radius": 117006,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": null
  },
  {
    "id": 1291,
    "name": "Manta  Ecuador",
    "lat": -0.952906,
    "lng": -80.684155,
    "radius": 124287,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": null
  },
  {
    "id": 1753,
    "name": "Manzanillo,Mexico",
    "lat": 19.148136,
    "lng": -104.559687,
    "radius": 95000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 251344
  },
  {
    "id": 1081,
    "name": "Manzhouli,China",
    "lat": 49.297212,
    "lng": 117.341787,
    "radius": 36000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 218019
  },
  {
    "id": 1455,
    "name": "Manzini, Eswatini",
    "lat": -26.357834,
    "lng": 31.720971,
    "radius": 50000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 110315
  },
  {
    "id": 25058,
    "name": "maputo, mozambique",
    "lat": -25.923719,
    "lng": 32.574867,
    "radius": 150000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 168271
  },
  {
    "id": 783,
    "name": "Mar del Plata,Argentina",
    "lat": -37.656603,
    "lng": -58.933219,
    "radius": 200000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 410573
  },
  {
    "id": 38708,
    "name": "Mardin",
    "lat": 37.234348,
    "lng": 40.636843,
    "radius": 150000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 347402
  },
  {
    "id": 1488,
    "name": "Maribor  Slovenia",
    "lat": 46.478944,
    "lng": 15.683820,
    "radius": 71686,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": null
  },
  {
    "id": 623,
    "name": "Marrakesh,Morocco",
    "lat": 31.602376,
    "lng": -8.023668,
    "radius": 100000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 1105083
  },
  {
    "id": 983,
    "name": "Marsa Alam,Egypt",
    "lat": 25.555052,
    "lng": 34.590796,
    "radius": 106000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 1319581
  },
  {
    "id": 1140,
    "name": "Marseille,France",
    "lat": 43.438424,
    "lng": 5.214414,
    "radius": 200000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 440921
  },
  {
    "id": 853,
    "name": "Marsh Harbour  Bahamas",
    "lat": 26.616755,
    "lng": -77.214944,
    "radius": 103271,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": null
  },
  {
    "id": 1739,
    "name": "Mary, Turkmenistan",
    "lat": 37.606667,
    "lng": 61.901389,
    "radius": 104000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 458348
  },
  {
    "id": 20426,
    "name": "Masai Mara KEN",
    "lat": -1.409155,
    "lng": 35.110674,
    "radius": 100000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 22186
  },
  {
    "id": 745,
    "name": "MatsuyamJapan",
    "lat": 33.824826,
    "lng": 132.760444,
    "radius": 20000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 492438
  },
  {
    "id": 1325,
    "name": "Maun,Botswana",
    "lat": -19.975833,
    "lng": 23.428167,
    "radius": 186000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 177942
  },
  {
    "id": 171,
    "name": "Mauritius",
    "lat": -20.433134,
    "lng": 57.678997,
    "radius": 60000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 222818
  },
  {
    "id": 818,
    "name": "Mazatlan,Mexico",
    "lat": 23.167125,
    "lng": -106.270107,
    "radius": 150000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 127299
  },
  {
    "id": 1022,
    "name": "Medan, Indonisia",
    "lat": 3.633825,
    "lng": 98.877302,
    "radius": 83000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 111906
  },
  {
    "id": 643,
    "name": "Medellin,Colombia",
    "lat": 6.211153,
    "lng": -75.524680,
    "radius": 145000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 186005
  },
  {
    "id": 461,
    "name": "Medina,Saudi Arabia",
    "lat": 24.553811,
    "lng": 39.714990,
    "radius": 103000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 155105
  },
  {
    "id": 37493,
    "name": "Mehamn, Norway",
    "lat": 71.029193,
    "lng": 27.826445,
    "radius": 300000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 90767
  },
  {
    "id": 1082,
    "name": "Meizhou,China",
    "lat": 24.263606,
    "lng": 116.108934,
    "radius": 105000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 218020
  },
  {
    "id": 140,
    "name": "Melbourne,Australia",
    "lat": -37.632498,
    "lng": 145.036201,
    "radius": 200000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 1369612
  },
  {
    "id": 1809,
    "name": "Melbourne,FL,USA",
    "lat": 28.101266,
    "lng": -80.645078,
    "radius": 72420,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 748514
  },
  {
    "id": 1443,
    "name": "Memmingen,Germany",
    "lat": 47.986520,
    "lng": 10.231525,
    "radius": 120000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 234355
  },
  {
    "id": 384,
    "name": "Memphis,TN,USA",
    "lat": 35.042068,
    "lng": -89.979173,
    "radius": 152887,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 201608
  },
  {
    "id": 776,
    "name": "Mendoza,Argentina",
    "lat": -32.827830,
    "lng": -68.798497,
    "radius": 150000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 1197926
  },
  {
    "id": 1185,
    "name": "Menorca,Spain",
    "lat": 39.932846,
    "lng": 4.073717,
    "radius": 40000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 202990
  },
  {
    "id": 778,
    "name": "Merida,Mexico",
    "lat": 20.933842,
    "lng": -89.660443,
    "radius": 200000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 201304
  },
  {
    "id": 984,
    "name": "Mersa Matruh Egypt",
    "lat": 31.338079,
    "lng": 27.216972,
    "radius": 139049,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": null
  },
  {
    "id": 748,
    "name": "Mexicali, Mexico",
    "lat": 32.232148,
    "lng": -115.418265,
    "radius": 49000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 212885
  },
  {
    "id": 165,
    "name": "Mexico City,Mexico",
    "lat": 19.436076,
    "lng": -99.071908,
    "radius": 200000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 1044489
  },
  {
    "id": 69,
    "name": "Miami,USA",
    "lat": 25.693810,
    "lng": -81.076445,
    "radius": 349227,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 1369314
  },
  {
    "id": 325,
    "name": "Milan, Italy",
    "lat": 45.403944,
    "lng": 9.191505,
    "radius": 120000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 1198710
  },
  {
    "id": 374,
    "name": "Milwaukee, WI, USA",
    "lat": 42.947143,
    "lng": -87.903356,
    "radius": 128747,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 197463
  },
  {
    "id": 877,
    "name": "Mindelo,Cape Verde",
    "lat": 16.827754,
    "lng": -24.981229,
    "radius": 15034,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 210168
  },
  {
    "id": 86,
    "name": "Minneapolis",
    "lat": 44.884755,
    "lng": -93.222285,
    "radius": 120701,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 1370103
  },
  {
    "id": 40547,
    "name": "Minsk, Belarus",
    "lat": 53.889203,
    "lng": 28.034235,
    "radius": 150000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 445102
  },
  {
    "id": 1478,
    "name": "Mitilini , Greece",
    "lat": 39.095734,
    "lng": 26.196515,
    "radius": 38000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 198280
  },
  {
    "id": 1781,
    "name": "Mitu  Colombia",
    "lat": 1.253324,
    "lng": -70.233826,
    "radius": 66812,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": null
  },
  {
    "id": 651,
    "name": "Mobile, AL, USA",
    "lat": 30.692512,
    "lng": -88.245494,
    "radius": 200000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 261057
  },
  {
    "id": 36335,
    "name": "Modlin Airport",
    "lat": 52.449265,
    "lng": 20.651237,
    "radius": 150000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 191983
  },
  {
    "id": 37320,
    "name": "Molde, Norway",
    "lat": 62.746371,
    "lng": 7.260621,
    "radius": 400000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 90768
  },
  {
    "id": 1035,
    "name": "Mombasa, Kenya",
    "lat": -4.036696,
    "lng": 39.595582,
    "radius": 82000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 1187187
  },
  {
    "id": 1264,
    "name": "Monastir, Tunisia",
    "lat": 35.760586,
    "lng": 10.752833,
    "radius": 95000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 239288
  },
  {
    "id": 750,
    "name": "Monclova, Mexico",
    "lat": 26.954848,
    "lng": -101.463657,
    "radius": 109000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 215244
  },
  {
    "id": 826,
    "name": "Moncton, Canada",
    "lat": 46.116181,
    "lng": -64.688447,
    "radius": 100000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 136739
  },
  {
    "id": 1417,
    "name": "Monrovia, Liberia",
    "lat": 6.241239,
    "lng": -10.352785,
    "radius": 108000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 177907
  },
  {
    "id": 482,
    "name": "Montego Bay,Jamaica",
    "lat": 18.405095,
    "lng": -77.556628,
    "radius": 90000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 1300212
  },
  {
    "id": 1770,
    "name": "Monteria  Colombia",
    "lat": 8.825197,
    "lng": -75.824013,
    "radius": 83838,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": null
  },
  {
    "id": 168,
    "name": "Monterrey, Mexico",
    "lat": 25.749436,
    "lng": -100.247779,
    "radius": 50000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 1336709
  },
  {
    "id": 777,
    "name": "Montevideo, Uruguay",
    "lat": -34.837097,
    "lng": -56.016180,
    "radius": 132000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 313133
  },
  {
    "id": 700,
    "name": "Montgomery, AL, USA",
    "lat": 32.305071,
    "lng": -86.390635,
    "radius": 204386,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 171298
  },
  {
    "id": 57,
    "name": "Montreal,Canada",
    "lat": 46.398614,
    "lng": -73.627843,
    "radius": 164000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 1365499
  },
  {
    "id": 67384,
    "name": "Mopa",
    "lat": 16.177048,
    "lng": 74.091992,
    "radius": 150000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 494326
  },
  {
    "id": 809,
    "name": "Morelia,Mexico",
    "lat": 19.846465,
    "lng": -101.028137,
    "radius": 95000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 38734
  },
  {
    "id": 1336,
    "name": "Moroni, Comoros",
    "lat": -11.619630,
    "lng": 43.362819,
    "radius": 39000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 191664
  },
  {
    "id": 37582,
    "name": "Mosjøen, Norway",
    "lat": 65.784555,
    "lng": 13.214656,
    "radius": 300000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 90769
  },
  {
    "id": 1511,
    "name": "Mostar  Bosnia and Herzegovina",
    "lat": 43.290073,
    "lng": 17.836167,
    "radius": 56899,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": null
  },
  {
    "id": 1304,
    "name": "Mount Pleasant  Falkland Islands",
    "lat": -51.889285,
    "lng": -58.494301,
    "radius": 87808,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": null
  },
  {
    "id": 1050,
    "name": "Muan,Korean",
    "lat": 34.949096,
    "lng": 126.537525,
    "radius": 23000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 491385
  },
  {
    "id": 1083,
    "name": "Mudanjiang,China",
    "lat": 44.524167,
    "lng": 129.568889,
    "radius": 101000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 218021
  },
  {
    "id": 1141,
    "name": "Mulhouse,France",
    "lat": 47.598165,
    "lng": 7.525486,
    "radius": 100000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 403904
  },
  {
    "id": 2149,
    "name": "Multan  Pakistan",
    "lat": 30.196025,
    "lng": 71.423960,
    "radius": 109194,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": null
  },
  {
    "id": 158,
    "name": "Mumbai, India",
    "lat": 19.089560,
    "lng": 72.865614,
    "radius": 200000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 771910
  },
  {
    "id": 340,
    "name": "Munich,Germany",
    "lat": 48.353662,
    "lng": 11.775028,
    "radius": 150000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 1327755
  },
  {
    "id": 1186,
    "name": "Murcia,Spain",
    "lat": 37.804477,
    "lng": -1.131331,
    "radius": 20000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 190801
  },
  {
    "id": 1369,
    "name": "Muscat,Oman",
    "lat": 23.600936,
    "lng": 58.287094,
    "radius": 121000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 404838
  },
  {
    "id": 27571,
    "name": "Muzaffarpur",
    "lat": 26.117593,
    "lng": 85.312326,
    "radius": 100000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 46719
  },
  {
    "id": 903,
    "name": "Mwanza, Tanzania",
    "lat": -2.822821,
    "lng": 33.032712,
    "radius": 70000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 110341
  },
  {
    "id": 1477,
    "name": "Mykonos Island,Greece",
    "lat": 37.454129,
    "lng": 25.364589,
    "radius": 9000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 260884
  },
  {
    "id": 403,
    "name": "Myrtle Beach",
    "lat": 33.580719,
    "lng": -78.899706,
    "radius": 88514,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 203295
  },
  {
    "id": 27572,
    "name": "Mysore",
    "lat": 12.231050,
    "lng": 76.654178,
    "radius": 300000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 46720
  },
  {
    "id": 1042,
    "name": "Nador, Morocco, Africa",
    "lat": 34.994302,
    "lng": -3.024930,
    "radius": 79000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 1105719
  },
  {
    "id": 127,
    "name": "Nagoya",
    "lat": 35.147244,
    "lng": 136.901855,
    "radius": 36000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 1360994
  },
  {
    "id": 1723,
    "name": "Nagpur, India",
    "lat": 21.091821,
    "lng": 79.049246,
    "radius": 250000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 90980
  },
  {
    "id": 1060,
    "name": "Naha,Japan",
    "lat": 26.462331,
    "lng": 128.009213,
    "radius": 56000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 1117169
  },
  {
    "id": 324,
    "name": "Nairobi,Kenya",
    "lat": -0.923646,
    "lng": 36.798052,
    "radius": 81000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 1331934
  },
  {
    "id": 1382,
    "name": "Najran  Saudi Arabia",
    "lat": 17.616806,
    "lng": 44.419516,
    "radius": 80000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 6549
  },
  {
    "id": 1503,
    "name": "Nakhchivan  Azerbaijan",
    "lat": 39.189615,
    "lng": 45.457937,
    "radius": 56161,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": null
  },
  {
    "id": 1698,
    "name": "Namangan  Uzbekistan",
    "lat": 40.983478,
    "lng": 71.574717,
    "radius": 66156,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": null
  },
  {
    "id": 677,
    "name": "NanChang,China",
    "lat": 28.693495,
    "lng": 115.834535,
    "radius": 333000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 207942
  },
  {
    "id": 27394,
    "name": "Nanded India",
    "lat": 19.183297,
    "lng": 77.334760,
    "radius": 150000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 94464
  },
  {
    "id": 662,
    "name": "NanJing,China",
    "lat": 32.052997,
    "lng": 118.806666,
    "radius": 98000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 222303
  },
  {
    "id": 676,
    "name": "NanNing,China",
    "lat": 22.818467,
    "lng": 108.376997,
    "radius": 113000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 594563
  },
  {
    "id": 1142,
    "name": "Nantes,France",
    "lat": 47.157419,
    "lng": -1.606232,
    "radius": 150000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 405137
  },
  {
    "id": 1084,
    "name": "Nantong,China",
    "lat": 32.070833,
    "lng": 120.964570,
    "radius": 135000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 218022
  },
  {
    "id": 1235,
    "name": "Naples,Italy",
    "lat": 40.988332,
    "lng": 14.299462,
    "radius": 70000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 1261571
  },
  {
    "id": 27430,
    "name": "Nashik, Maharashtra",
    "lat": 20.112933,
    "lng": 73.893835,
    "radius": 250000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 45866
  },
  {
    "id": 94,
    "name": "Nashville,USA",
    "lat": 36.144112,
    "lng": -86.619417,
    "radius": 160934,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 1370161
  },
  {
    "id": 713,
    "name": "Nassau,The Bahamas",
    "lat": 25.040196,
    "lng": -77.400976,
    "radius": 18000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 1132833
  },
  {
    "id": 958,
    "name": "Natal,Brazil",
    "lat": -5.768882,
    "lng": -35.366072,
    "radius": 102000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 442137
  },
  {
    "id": 1699,
    "name": "Navoi  Uzbekistan",
    "lat": 40.119007,
    "lng": 65.169958,
    "radius": 144295,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": null
  },
  {
    "id": 1395,
    "name": "Ndola, Zambia",
    "lat": -13.202056,
    "lng": 28.058899,
    "radius": 96000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 71645
  },
  {
    "id": 54853,
    "name": "Negril, Jamaica",
    "lat": 18.270583,
    "lng": -78.286131,
    "radius": 20000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 1016047
  },
  {
    "id": 1782,
    "name": "Neiva  Colombia",
    "lat": 2.947050,
    "lng": -75.292823,
    "radius": 71374,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": null
  },
  {
    "id": 997,
    "name": "Nelspruit,South Africa",
    "lat": -25.382253,
    "lng": 31.105478,
    "radius": 70000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 170886
  },
  {
    "id": 36334,
    "name": "Neuchatel",
    "lat": 46.959181,
    "lng": 6.865197,
    "radius": 300000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 120020
  },
  {
    "id": 38111,
    "name": "Neuquen, Neuquen",
    "lat": -38.952138,
    "lng": -68.140484,
    "radius": 25000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 64605
  },
  {
    "id": 913,
    "name": "Nevsehir,Turkey",
    "lat": 38.576141,
    "lng": 33.998423,
    "radius": 150000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 1129091
  },
  {
    "id": 367,
    "name": "new orlean,USA",
    "lat": 29.989902,
    "lng": -90.261977,
    "radius": 123919,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 1370113
  },
  {
    "id": 40,
    "name": "New York,USA",
    "lat": 40.699082,
    "lng": -73.944567,
    "radius": 185074,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 1345346
  },
  {
    "id": 795,
    "name": "Newburgh,USA",
    "lat": 41.498403,
    "lng": -74.100863,
    "radius": 16093,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 197826
  },
  {
    "id": 835,
    "name": "Newcastle, UK",
    "lat": 54.974909,
    "lng": -1.635801,
    "radius": 40541,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 527301
  },
  {
    "id": 646,
    "name": "Newcastle,Australia",
    "lat": -32.863042,
    "lng": 151.684496,
    "radius": 79000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 254157
  },
  {
    "id": 1651,
    "name": "Newquay,UK",
    "lat": 50.416825,
    "lng": -5.066588,
    "radius": 16093,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 528485
  },
  {
    "id": 114,
    "name": "Nha Trang, Vietnam",
    "lat": 12.010762,
    "lng": 109.216496,
    "radius": 160000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 1369610
  },
  {
    "id": 1408,
    "name": "Niamey, Niger",
    "lat": 13.483654,
    "lng": 2.183100,
    "radius": 98000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 110359
  },
  {
    "id": 452,
    "name": "Nice,France",
    "lat": 43.659769,
    "lng": 7.214821,
    "radius": 28000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 1186651
  },
  {
    "id": 1117,
    "name": "Niigata, Japan",
    "lat": 37.925026,
    "lng": 139.078276,
    "radius": 41000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 493006
  },
  {
    "id": 1143,
    "name": "Nimes,France",
    "lat": 43.671255,
    "lng": 4.193242,
    "radius": 200000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 406591
  },
  {
    "id": 1085,
    "name": "Ningbo,China",
    "lat": 29.870156,
    "lng": 121.544005,
    "radius": 150000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 207934
  },
  {
    "id": 1541,
    "name": "Nis  Serbia",
    "lat": 43.337628,
    "lng": 21.866318,
    "radius": 59562,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": null
  },
  {
    "id": 392,
    "name": "Norfolk",
    "lat": 36.895684,
    "lng": -76.200016,
    "radius": 112654,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 217845
  },
  {
    "id": 1644,
    "name": "Norrkoping, Sweden",
    "lat": 58.583359,
    "lng": 16.233902,
    "radius": 30000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 113783
  },
  {
    "id": 1468,
    "name": "North Nicosia, Cyprus",
    "lat": 35.158773,
    "lng": 33.503990,
    "radius": 50000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 354650
  },
  {
    "id": 836,
    "name": "Norwich, UK",
    "lat": 52.634934,
    "lng": 1.292402,
    "radius": 34603,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 527303
  },
  {
    "id": 1342,
    "name": "Nosy Be, Madagascar",
    "lat": -13.281142,
    "lng": 48.264966,
    "radius": 19000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 194040
  },
  {
    "id": 832,
    "name": "Nottingham,UK",
    "lat": 52.945984,
    "lng": -1.185317,
    "radius": 40234,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 527132
  },
  {
    "id": 21743,
    "name": "Nouakchott,Mauritania",
    "lat": 18.308632,
    "lng": -15.962980,
    "radius": 150000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 175035
  },
  {
    "id": 1700,
    "name": "Nukus  Uzbekistan",
    "lat": 42.481812,
    "lng": 59.617585,
    "radius": 72097,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": null
  },
  {
    "id": 1684,
    "name": "Nur-Sultan, Kazakhstan",
    "lat": 51.028069,
    "lng": 71.463303,
    "radius": 104000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 1192746
  },
  {
    "id": 1444,
    "name": "Nuremberg,Germany",
    "lat": 49.497120,
    "lng": 11.079808,
    "radius": 100000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 278807
  },
  {
    "id": 706,
    "name": "Oaxaca,Mexico",
    "lat": 16.615595,
    "lng": -96.160944,
    "radius": 245000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 275963
  },
  {
    "id": 16771,
    "name": "Obihiro",
    "lat": 42.771611,
    "lng": 143.300140,
    "radius": 36000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 493016
  },
  {
    "id": 44861,
    "name": "Ocho Ríos",
    "lat": 18.241112,
    "lng": -77.130403,
    "radius": 34000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 192614
  },
  {
    "id": 1808,
    "name": "Odessa, USA",
    "lat": 31.941739,
    "lng": -102.204750,
    "radius": 241401,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 42710
  },
  {
    "id": 2046,
    "name": "Ogdensburg, NY, USA",
    "lat": 44.682093,
    "lng": -75.476830,
    "radius": 41843,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 199347
  },
  {
    "id": 1673,
    "name": "Ohrid, North Macedonia",
    "lat": 41.181111,
    "lng": 20.745278,
    "radius": 67000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 222887
  },
  {
    "id": 1062,
    "name": "Okayama, Japan",
    "lat": 34.658214,
    "lng": 133.925737,
    "radius": 21000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 492998
  },
  {
    "id": 386,
    "name": "Oklahoma, OK, USA",
    "lat": 35.393056,
    "lng": -97.600556,
    "radius": 321868,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 126583
  },
  {
    "id": 1236,
    "name": "Olbia,Italy",
    "lat": 40.917390,
    "lng": 9.508790,
    "radius": 30000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 283826
  },
  {
    "id": 989,
    "name": "Olongapo, Philippines",
    "lat": 14.795184,
    "lng": 120.274963,
    "radius": 63000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 34612
  },
  {
    "id": 382,
    "name": "Omaha, USA",
    "lat": 41.332008,
    "lng": -95.938320,
    "radius": 96560,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 189200
  },
  {
    "id": 1496,
    "name": "Oradea  Romania",
    "lat": 47.025664,
    "lng": 21.902690,
    "radius": 75844,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": null
  },
  {
    "id": 1685,
    "name": "Oral%EF%BC%8CKazakhstan",
    "lat": 51.153313,
    "lng": 51.538415,
    "radius": 81067,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 455911
  },
  {
    "id": 1277,
    "name": "Oran, Algeria",
    "lat": 35.620248,
    "lng": -0.606133,
    "radius": 83000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 129875
  },
  {
    "id": 1746,
    "name": "Oranjestad  Sint Eustatius  Caribbean Netherlands",
    "lat": 17.496493,
    "lng": -62.979397,
    "radius": 5603,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": null
  },
  {
    "id": 620,
    "name": "Oranjestad,Aruba",
    "lat": 12.501594,
    "lng": -70.011993,
    "radius": 20000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 1021370
  },
  {
    "id": 1086,
    "name": "Ordos City,China",
    "lat": 39.495550,
    "lng": 109.870683,
    "radius": 242000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 218023
  },
  {
    "id": 990,
    "name": "Orlando-SFB,USA",
    "lat": 28.706076,
    "lng": -81.207857,
    "radius": 61155,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 197773
  },
  {
    "id": 72,
    "name": "Orlando,USA",
    "lat": 28.431158,
    "lng": -81.308083,
    "radius": 241401,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 1364981
  },
  {
    "id": 44,
    "name": "Osaka, Japan",
    "lat": 34.344015,
    "lng": 135.829812,
    "radius": 105000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 491392
  },
  {
    "id": 1693,
    "name": "Osh, Kyrgyzstan",
    "lat": 40.608183,
    "lng": 72.786605,
    "radius": 57000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 195584
  },
  {
    "id": 898,
    "name": "Osijek  Croatia",
    "lat": 45.466321,
    "lng": 18.807286,
    "radius": 76589,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": null
  },
  {
    "id": 1686,
    "name": "Oskemen  Kazakhstan",
    "lat": 50.026128,
    "lng": 82.506095,
    "radius": 112657,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": null
  },
  {
    "id": 431,
    "name": "Oslo, Norway",
    "lat": 60.197550,
    "lng": 11.100415,
    "radius": 80000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 1239637
  },
  {
    "id": 1121,
    "name": "Ostend/Bruges, Belgium",
    "lat": 51.173208,
    "lng": 2.851960,
    "radius": 30000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 207950
  },
  {
    "id": 1645,
    "name": "Ostersund, Sweden",
    "lat": 63.198389,
    "lng": 14.497864,
    "radius": 20000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 113785
  },
  {
    "id": 1433,
    "name": "Ostrava, Czechia",
    "lat": 49.680969,
    "lng": 17.929735,
    "radius": 80000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 95039
  },
  {
    "id": 59,
    "name": "Ottawa,Canada",
    "lat": 45.319212,
    "lng": -75.669165,
    "radius": 58000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 1076846
  },
  {
    "id": 1328,
    "name": "Ouagadougou  Burkina Faso",
    "lat": 12.354993,
    "lng": -1.513994,
    "radius": 190075,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": null
  },
  {
    "id": 1043,
    "name": "Oujda,Morocco,Africa",
    "lat": 34.787222,
    "lng": -1.940623,
    "radius": 105000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 1105807
  },
  {
    "id": 1627,
    "name": "Oulu, Finland",
    "lat": 64.930875,
    "lng": 25.355838,
    "radius": 150000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 516650
  },
  {
    "id": 1272,
    "name": "Oumache  Algeria",
    "lat": 34.792095,
    "lng": 5.733720,
    "radius": 57030,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": null
  },
  {
    "id": 1034,
    "name": "Padang Indonesia",
    "lat": -0.789574,
    "lng": 100.283121,
    "radius": 50000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 28757
  },
  {
    "id": 36309,
    "name": "Paderborn",
    "lat": 51.613192,
    "lng": 8.617736,
    "radius": 50000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 154338
  },
  {
    "id": 1312,
    "name": "Pago Pago, American Samoa",
    "lat": -14.323406,
    "lng": -170.682550,
    "radius": 18000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 130554
  },
  {
    "id": 1008,
    "name": "Pakse, Laos",
    "lat": 15.135927,
    "lng": 105.779563,
    "radius": 78000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 144821
  },
  {
    "id": 27552,
    "name": "Pakyong",
    "lat": 27.226657,
    "lng": 88.587700,
    "radius": 300000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 46269
  },
  {
    "id": 1520,
    "name": "Palanga, Lithuania",
    "lat": 55.971431,
    "lng": 21.097118,
    "radius": 65000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 517755
  },
  {
    "id": 1023,
    "name": "Palembang,Indonesia",
    "lat": -2.896672,
    "lng": 104.699205,
    "radius": 97872,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 147465
  },
  {
    "id": 1237,
    "name": "Palermo,Italy",
    "lat": 37.900811,
    "lng": 13.238325,
    "radius": 70000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 1327216
  },
  {
    "id": 378,
    "name": "Palm Beach, USA",
    "lat": 26.685748,
    "lng": -80.092817,
    "radius": 28968,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 254216
  },
  {
    "id": 404,
    "name": "Palm Springs,CA, USA",
    "lat": 34.130876,
    "lng": -116.032100,
    "radius": 64374,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 248680
  },
  {
    "id": 429,
    "name": "Palma,Spain",
    "lat": 39.551741,
    "lng": 2.736165,
    "radius": 68000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 198858
  },
  {
    "id": 25634,
    "name": "Palmerola",
    "lat": 14.816094,
    "lng": -87.156208,
    "radius": 97000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 217979
  },
  {
    "id": 1187,
    "name": "Pamplona, Spain",
    "lat": 42.808073,
    "lng": -1.632551,
    "radius": 30000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 234905
  },
  {
    "id": 423,
    "name": "Panama City, Panama",
    "lat": 9.031239,
    "lng": -79.478213,
    "radius": 128000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 254258
  },
  {
    "id": 991,
    "name": "Panama City,USA",
    "lat": 30.354854,
    "lng": -85.798260,
    "radius": 199558,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 139463
  },
  {
    "id": 923,
    "name": "Panglao Island, Philippines",
    "lat": 9.804585,
    "lng": 124.112588,
    "radius": 51000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 1276046
  },
  {
    "id": 1319,
    "name": "Papeete, French Polynesia",
    "lat": -17.559865,
    "lng": -149.610387,
    "radius": 41000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 142262
  },
  {
    "id": 1467,
    "name": "Paphos,Cyprus",
    "lat": 34.714558,
    "lng": 32.518921,
    "radius": 60000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 234433
  },
  {
    "id": 1298,
    "name": "Paramaribo, Suriname",
    "lat": 5.609095,
    "lng": -55.793321,
    "radius": 146000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 1016531
  },
  {
    "id": 1452,
    "name": "Pardubice  Czechia",
    "lat": 50.017548,
    "lng": 15.724856,
    "radius": 102453,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": null
  },
  {
    "id": 276,
    "name": "Paris,France",
    "lat": 48.850908,
    "lng": 2.397494,
    "radius": 100000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 1276054
  },
  {
    "id": 1238,
    "name": "Parma,Italy",
    "lat": 44.826243,
    "lng": 10.297408,
    "radius": 30000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 264847
  },
  {
    "id": 1348,
    "name": "Paro Bhutan",
    "lat": 27.388121,
    "lng": 89.753366,
    "radius": 106741,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": null
  },
  {
    "id": 1783,
    "name": "Pasto  Colombia",
    "lat": 1.397232,
    "lng": -77.290521,
    "radius": 73536,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": null
  },
  {
    "id": 27500,
    "name": "Pathankot, India",
    "lat": 32.223700,
    "lng": 75.636399,
    "radius": 250000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 90960
  },
  {
    "id": 27561,
    "name": "Patna",
    "lat": 25.594717,
    "lng": 85.090794,
    "radius": 300000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 91101
  },
  {
    "id": 42,
    "name": "Pattaya,Thialand",
    "lat": 12.674526,
    "lng": 100.998005,
    "radius": 200000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 1361538
  },
  {
    "id": 1144,
    "name": "Pau,France",
    "lat": 43.283155,
    "lng": -0.207383,
    "radius": 150000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 405132
  },
  {
    "id": 1687,
    "name": "Pavlodar  Kazakhstan",
    "lat": 52.198382,
    "lng": 77.069711,
    "radius": 112215,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": null
  },
  {
    "id": 1460,
    "name": "Pecs  Hungary",
    "lat": 45.993682,
    "lng": 18.234215,
    "radius": 64656,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": null
  },
  {
    "id": 1024,
    "name": "Pekanbaru Indonesia",
    "lat": 0.464462,
    "lng": 101.448156,
    "radius": 99000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": null
  },
  {
    "id": 1859,
    "name": "Pellston  MI  USA",
    "lat": 45.571490,
    "lng": -84.786183,
    "radius": 101388,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 7364
  },
  {
    "id": 52,
    "name": "PeNang,Malaysia",
    "lat": 5.008142,
    "lng": 100.608054,
    "radius": 89000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 1362935
  },
  {
    "id": 415,
    "name": "Pensacola,FL,USA",
    "lat": 30.473816,
    "lng": -87.186705,
    "radius": 321868,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 142246
  },
  {
    "id": 888,
    "name": "Pereira, Colombia",
    "lat": 4.815196,
    "lng": -75.736256,
    "radius": 93000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 117561
  },
  {
    "id": 1145,
    "name": "Perpignan,France",
    "lat": 42.741336,
    "lng": 2.871428,
    "radius": 100000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 178529
  },
  {
    "id": 136,
    "name": "Perth,Australia",
    "lat": -32.516581,
    "lng": 115.003841,
    "radius": 150000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 1251568
  },
  {
    "id": 1239,
    "name": "Perugia, Italy",
    "lat": 42.922187,
    "lng": 12.572218,
    "radius": 50000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 353712
  },
  {
    "id": 1240,
    "name": "Pescara,Italy",
    "lat": 42.364125,
    "lng": 13.987496,
    "radius": 50000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 117112
  },
  {
    "id": 959,
    "name": "Petrolina  Brazil",
    "lat": -9.366573,
    "lng": -40.565859,
    "radius": 107619,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": null
  },
  {
    "id": 1688,
    "name": "Petropavl  Kazakhstan",
    "lat": 54.777254,
    "lng": 69.185907,
    "radius": 74864,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": null
  },
  {
    "id": 77,
    "name": "Philadelphia,USA",
    "lat": 39.993104,
    "lng": -75.077076,
    "radius": 160934,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 308851
  },
  {
    "id": 111,
    "name": "Phnom Penh, Cambodia",
    "lat": 12.295843,
    "lng": 104.348737,
    "radius": 221000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 1331349
  },
  {
    "id": 67,
    "name": "Phoenix,AZ,USA",
    "lat": 33.437269,
    "lng": -112.007788,
    "radius": 80467,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 236791
  },
  {
    "id": 116,
    "name": "Phu Quoc, Vietnam",
    "lat": 10.163415,
    "lng": 103.998030,
    "radius": 35000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 1187205
  },
  {
    "id": 45,
    "name": "Phuket,Thailand",
    "lat": 8.124476,
    "lng": 98.257164,
    "radius": 200000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 1318368
  },
  {
    "id": 1751,
    "name": "Piedras Negras, Mexico",
    "lat": 28.411433,
    "lng": -101.394867,
    "radius": 91000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 382790
  },
  {
    "id": 1462,
    "name": "Piestany  Slovakia",
    "lat": 48.611243,
    "lng": 17.832340,
    "radius": 72640,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": null
  },
  {
    "id": 718,
    "name": "Pig Beach  The Bahamas",
    "lat": 23.563622,
    "lng": -75.873825,
    "radius": 50000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": null
  },
  {
    "id": 1241,
    "name": "Pisa,Italy",
    "lat": 43.652575,
    "lng": 10.258348,
    "radius": 50000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 661985
  },
  {
    "id": 371,
    "name": "Pittsburgh,USA",
    "lat": 40.479061,
    "lng": -80.010598,
    "radius": 104607,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 209194
  },
  {
    "id": 2887,
    "name": "Plattsburgh,NY,USA",
    "lat": 44.561377,
    "lng": -73.309762,
    "radius": 62194,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 75224
  },
  {
    "id": 1874,
    "name": "Playa del Carmen, Mexico",
    "lat": 20.695449,
    "lng": -87.135494,
    "radius": 20000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 1165807
  },
  {
    "id": 1512,
    "name": "Plovdiv, Bulgaria",
    "lat": 42.306181,
    "lng": 25.086215,
    "radius": 100000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 245390
  },
  {
    "id": 1523,
    "name": "Podgorica,Montenegro",
    "lat": 42.367858,
    "lng": 19.247673,
    "radius": 63000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 193769
  },
  {
    "id": 1250,
    "name": "Pointe-a-Pitre Guadeloupe",
    "lat": 16.267613,
    "lng": -61.527249,
    "radius": 41000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 10716
  },
  {
    "id": 1146,
    "name": "Poitiers,France",
    "lat": 46.587738,
    "lng": 0.308869,
    "radius": 200000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 178530
  },
  {
    "id": 1170,
    "name": "Ponta Delgada,Portugal",
    "lat": 37.749346,
    "lng": -25.710385,
    "radius": 52000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 234662
  },
  {
    "id": 1025,
    "name": "Pontianak Indonesia",
    "lat": -0.146734,
    "lng": 109.404345,
    "radius": 72320,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": null
  },
  {
    "id": 1784,
    "name": "Popayan  Colombia",
    "lat": 2.452570,
    "lng": -76.609592,
    "radius": 134920,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": null
  },
  {
    "id": 1464,
    "name": "Poprad  Slovakia",
    "lat": 49.068316,
    "lng": 20.247673,
    "radius": 76241,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": null
  },
  {
    "id": 27459,
    "name": "Porbandar",
    "lat": 21.647701,
    "lng": 69.660959,
    "radius": 150000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 46723
  },
  {
    "id": 27501,
    "name": "Port Blair, India",
    "lat": 11.650340,
    "lng": 92.732851,
    "radius": 200000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 109994
  },
  {
    "id": 870,
    "name": "Port Elizabeth,South Africa",
    "lat": -33.987272,
    "lng": 25.614295,
    "radius": 75000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 474600
  },
  {
    "id": 1314,
    "name": "Port Hedland,Australia",
    "lat": -20.378189,
    "lng": 118.631653,
    "radius": 50000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 171809
  },
  {
    "id": 1260,
    "name": "Port of Spain, Trinidad and Tobago",
    "lat": 10.416761,
    "lng": -61.394459,
    "radius": 73000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 171424
  },
  {
    "id": 1253,
    "name": "Port-au-Prince Haiti",
    "lat": 18.575924,
    "lng": -72.294638,
    "radius": 53000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": null
  },
  {
    "id": 1413,
    "name": "Port-Gentil, Gabon",
    "lat": -0.721140,
    "lng": 8.752426,
    "radius": 108000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 110309
  },
  {
    "id": 412,
    "name": "Portland,ME,USA",
    "lat": 43.646479,
    "lng": -70.309697,
    "radius": 193121,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 145559
  },
  {
    "id": 64,
    "name": "Portland,OR,USA",
    "lat": 45.589769,
    "lng": -122.595094,
    "radius": 199558,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 626573
  },
  {
    "id": 960,
    "name": "Porto Alegre  Brazil",
    "lat": -29.993473,
    "lng": -51.175381,
    "radius": 76745,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 25356
  },
  {
    "id": 1168,
    "name": "Porto Santo Island  Portugal",
    "lat": 33.074939,
    "lng": -16.350032,
    "radius": 6000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 28818
  },
  {
    "id": 961,
    "name": "Porto Velho  Brazil",
    "lat": -8.714170,
    "lng": -63.898320,
    "radius": 85057,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": null
  },
  {
    "id": 1169,
    "name": "Porto,Portugal",
    "lat": 41.242119,
    "lng": -8.678551,
    "radius": 150000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 571785
  },
  {
    "id": 1489,
    "name": "Portoroz  Slovenia",
    "lat": 45.474404,
    "lng": 13.616712,
    "radius": 63293,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": null
  },
  {
    "id": 1214,
    "name": "Poznan, Poland",
    "lat": 52.386437,
    "lng": 16.960452,
    "radius": 350000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 463747
  },
  {
    "id": 173,
    "name": "Prague, Czech Republic",
    "lat": 50.092922,
    "lng": 14.260322,
    "radius": 200000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 1115337
  },
  {
    "id": 879,
    "name": "Praia,Cape Verde",
    "lat": 15.073607,
    "lng": -23.596050,
    "radius": 35000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 95404
  },
  {
    "id": 42921,
    "name": "Prayagraj, India",
    "lat": 25.430222,
    "lng": 81.741196,
    "radius": 300000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 93955
  },
  {
    "id": 1479,
    "name": "Preveza, Greece",
    "lat": 38.931062,
    "lng": 20.772488,
    "radius": 51000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 198282
  },
  {
    "id": 46972,
    "name": "Princeton",
    "lat": 40.103993,
    "lng": -74.821221,
    "radius": 64374,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 173334
  },
  {
    "id": 1672,
    "name": "Pristina  Kosovo",
    "lat": 42.574564,
    "lng": 21.029508,
    "radius": 52927,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": null
  },
  {
    "id": 1785,
    "name": "Providence Island  Colombia",
    "lat": 13.358840,
    "lng": -81.359158,
    "radius": 8056,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": null
  },
  {
    "id": 798,
    "name": "Providence,RI,USA",
    "lat": 41.734773,
    "lng": -71.439524,
    "radius": 40234,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 112877
  },
  {
    "id": 1262,
    "name": "Providenciales,Turks and Caicos Islands",
    "lat": 21.747276,
    "lng": -72.265250,
    "radius": 15000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 496851
  },
  {
    "id": 1836,
    "name": "Pu'er City,Yunnan,China",
    "lat": 22.793523,
    "lng": 100.962887,
    "radius": 74000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 151129
  },
  {
    "id": 40552,
    "name": "Puducherry, India",
    "lat": 11.965171,
    "lng": 79.814836,
    "radius": 300000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 144120
  },
  {
    "id": 1794,
    "name": "Puebla, Mexico",
    "lat": 19.163919,
    "lng": -98.376140,
    "radius": 105000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 253217
  },
  {
    "id": 1282,
    "name": "Puerto Cabezas  Nicaragua",
    "lat": 14.041994,
    "lng": -83.380538,
    "radius": 66314,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": null
  },
  {
    "id": 4232,
    "name": "Puerto Escondido, Mexico",
    "lat": 16.116842,
    "lng": -97.270500,
    "radius": 80000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 251332
  },
  {
    "id": 892,
    "name": "Puerto Iguazu,Argentina",
    "lat": -25.731778,
    "lng": -54.476181,
    "radius": 97000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 406597
  },
  {
    "id": 10780,
    "name": "Puerto Madryn  Argentina",
    "lat": -42.759577,
    "lng": -65.101541,
    "radius": 150000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 26573
  },
  {
    "id": 1305,
    "name": "Puerto Montt, Chile",
    "lat": -41.433741,
    "lng": -73.098504,
    "radius": 62000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 120363
  },
  {
    "id": 924,
    "name": "Puerto Princesa, Philippines",
    "lat": 9.745656,
    "lng": 118.750432,
    "radius": 112000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 1370083
  },
  {
    "id": 607,
    "name": "Puerto Vallarta,Mexico",
    "lat": 20.680518,
    "lng": -105.252376,
    "radius": 200000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 915758
  },
  {
    "id": 899,
    "name": "Pula, Croatia",
    "lat": 45.244771,
    "lng": 13.775060,
    "radius": 58000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 147996
  },
  {
    "id": 1724,
    "name": "Pune, India",
    "lat": 18.579343,
    "lng": 73.908917,
    "radius": 200000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 234871
  },
  {
    "id": 654,
    "name": "Punta Arenas Chile",
    "lat": -53.123921,
    "lng": -71.809857,
    "radius": 95553,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": null
  },
  {
    "id": 858,
    "name": "Punta Cana,Dominican",
    "lat": 18.610132,
    "lng": -68.501509,
    "radius": 25000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 747063
  },
  {
    "id": 1299,
    "name": "Punta del Este, Uruguay",
    "lat": -34.796448,
    "lng": -54.457613,
    "radius": 100000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 479223
  },
  {
    "id": 27458,
    "name": "Purnia",
    "lat": 25.761892,
    "lng": 87.415885,
    "radius": 150000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 45342
  },
  {
    "id": 1504,
    "name": "Qabala  Azerbaijan",
    "lat": 40.826667,
    "lng": 47.712500,
    "radius": 61799,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": null
  },
  {
    "id": 1742,
    "name": "Qarshi, Uzbekistan",
    "lat": 38.811239,
    "lng": 65.774284,
    "radius": 60000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 34557
  },
  {
    "id": 681,
    "name": "QingDao,China",
    "lat": 36.056278,
    "lng": 120.383560,
    "radius": 81000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 213251
  },
  {
    "id": 1113,
    "name": "Qinhuangdao,China",
    "lat": 39.669166,
    "lng": 119.065715,
    "radius": 70000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 218131
  },
  {
    "id": 57414,
    "name": "Qionghai",
    "lat": 19.251417,
    "lng": 110.472574,
    "radius": 22000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 185848
  },
  {
    "id": 1087,
    "name": "Qiqihar,China",
    "lat": 47.253936,
    "lng": 123.923947,
    "radius": 101000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 218024
  },
  {
    "id": 936,
    "name": "Quang Nam, Vietnam",
    "lat": 15.414409,
    "lng": 108.703817,
    "radius": 110000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 153714
  },
  {
    "id": 1088,
    "name": "Quanzhou,China",
    "lat": 24.799373,
    "lng": 118.594643,
    "radius": 126000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 218025
  },
  {
    "id": 100,
    "name": "Quebec,Canada",
    "lat": 46.790772,
    "lng": -71.388569,
    "radius": 150000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 1369969
  },
  {
    "id": 145,
    "name": "Queenstown,New Zealand",
    "lat": -44.955660,
    "lng": 169.187999,
    "radius": 116000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 669709
  },
  {
    "id": 810,
    "name": "Queretaaro, Mexico",
    "lat": 20.622511,
    "lng": -100.187271,
    "radius": 87000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 251364
  },
  {
    "id": 697,
    "name": "Qui Nhon Vietnam",
    "lat": 13.953000,
    "lng": 109.049000,
    "radius": 120000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 21842
  },
  {
    "id": 1786,
    "name": "Quibdo  Colombia",
    "lat": 5.690999,
    "lng": -76.644184,
    "radius": 79816,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": null
  },
  {
    "id": 655,
    "name": "Quito,Ecuador",
    "lat": -0.124227,
    "lng": -78.360568,
    "radius": 116000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 129482
  },
  {
    "id": 1044,
    "name": "Rabat,Morocco,Africa",
    "lat": 34.036115,
    "lng": -6.748095,
    "radius": 107000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 1105870
  },
  {
    "id": 1803,
    "name": "Racine, USA",
    "lat": 42.718547,
    "lng": -87.836709,
    "radius": 112654,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 147500
  },
  {
    "id": 27427,
    "name": "Raipur, Chhattisgarh",
    "lat": 21.185970,
    "lng": 81.740421,
    "radius": 300000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 90977
  },
  {
    "id": 27553,
    "name": "Rajahmundry",
    "lat": 17.107290,
    "lng": 81.817776,
    "radius": 300000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 46280
  },
  {
    "id": 15804,
    "name": "Raleigh, USA",
    "lat": 35.892282,
    "lng": -78.592199,
    "radius": 120701,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 492867
  },
  {
    "id": 27540,
    "name": "Ranchi, India",
    "lat": 23.317248,
    "lng": 85.325224,
    "radius": 400000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 398451
  },
  {
    "id": 1318,
    "name": "Rarotonga, Cook Islands",
    "lat": -21.231189,
    "lng": -159.781637,
    "radius": 10000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 108751
  },
  {
    "id": 1387,
    "name": "Ras Al Khaimah,United Arab Emirates",
    "lat": 25.445946,
    "lng": 55.744964,
    "radius": 76000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 772957
  },
  {
    "id": 962,
    "name": "Recife, Brazil",
    "lat": -8.125932,
    "lng": -34.924015,
    "radius": 107000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 144145
  },
  {
    "id": 827,
    "name": "Regina,Canada",
    "lat": 50.432104,
    "lng": -104.663942,
    "radius": 150000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 65244
  },
  {
    "id": 364,
    "name": "Reno,NV,USA",
    "lat": 39.302275,
    "lng": -119.827632,
    "radius": 78858,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 106992
  },
  {
    "id": 893,
    "name": "Resistencia Argentina",
    "lat": -27.444926,
    "lng": -59.048739,
    "radius": 200000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": null
  },
  {
    "id": 365,
    "name": "Reykjavik,Iceland",
    "lat": 63.978603,
    "lng": -22.635036,
    "radius": 200000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 554846
  },
  {
    "id": 1480,
    "name": "Rhodes,Greece",
    "lat": 36.119145,
    "lng": 28.080114,
    "radius": 40000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 198312
  },
  {
    "id": 387,
    "name": "Richmond, VA, USA",
    "lat": 37.506580,
    "lng": -77.320811,
    "radius": 199558,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 79428
  },
  {
    "id": 22253,
    "name": "Riga",
    "lat": 56.964604,
    "lng": 24.105149,
    "radius": 300000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 517756
  },
  {
    "id": 900,
    "name": "Rijeka, Croatia",
    "lat": 45.442553,
    "lng": 14.748310,
    "radius": 57000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 846516
  },
  {
    "id": 1242,
    "name": "Rimini,Italy",
    "lat": 44.109128,
    "lng": 12.561968,
    "radius": 70000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 278204
  },
  {
    "id": 963,
    "name": "Rio Branco  Brazil",
    "lat": -9.866221,
    "lng": -67.897199,
    "radius": 62049,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": null
  },
  {
    "id": 964,
    "name": "Rio De Janeiro-SDU, Brazil",
    "lat": -22.247203,
    "lng": -43.264413,
    "radius": 100000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 191647
  },
  {
    "id": 344,
    "name": "Rio de Janeiro,Brazil",
    "lat": -22.814500,
    "lng": -43.144580,
    "radius": 150000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 1370121
  },
  {
    "id": 894,
    "name": "Rio Gallegos Argentina",
    "lat": -51.611403,
    "lng": -69.303833,
    "radius": 65569,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": null
  },
  {
    "id": 1205,
    "name": "Rio Negro Argentina",
    "lat": -40.863078,
    "lng": -63.005511,
    "radius": 200000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": null
  },
  {
    "id": 889,
    "name": "Riohacha  Colombia",
    "lat": 11.528599,
    "lng": -72.919172,
    "radius": 94038,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": null
  },
  {
    "id": 1300,
    "name": "Rivera  Uruguay",
    "lat": -30.974445,
    "lng": -55.476665,
    "radius": 103216,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": null
  },
  {
    "id": 1373,
    "name": "Riyadh,Saudi Arabia",
    "lat": 24.959775,
    "lng": 46.700388,
    "radius": 155000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 155102
  },
  {
    "id": 58213,
    "name": "Rizhao,China",
    "lat": 35.549655,
    "lng": 119.427039,
    "radius": 120000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 168546
  },
  {
    "id": 884,
    "name": "Road Town, British Virgin Islands",
    "lat": 18.429218,
    "lng": -64.627130,
    "radius": 12000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 36132
  },
  {
    "id": 1804,
    "name": "Rochester (MN), USA",
    "lat": 43.910983,
    "lng": -92.496770,
    "radius": 123919,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 196905
  },
  {
    "id": 402,
    "name": "Rochester, NY, USA",
    "lat": 43.122523,
    "lng": -77.666572,
    "radius": 130357,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 201452
  },
  {
    "id": 1805,
    "name": "Rockford, USA",
    "lat": 42.250659,
    "lng": -89.068841,
    "radius": 24140,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 117814
  },
  {
    "id": 1147,
    "name": "Rodez,France",
    "lat": 44.410816,
    "lng": 2.483214,
    "radius": 200000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 178532
  },
  {
    "id": 315,
    "name": "Rome,Italy",
    "lat": 42.179612,
    "lng": 13.090926,
    "radius": 180000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 915338
  },
  {
    "id": 1861,
    "name": "Rosario,Argentina",
    "lat": -32.916954,
    "lng": -60.780394,
    "radius": 200000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 68002
  },
  {
    "id": 1249,
    "name": "Roseau, Dominica",
    "lat": 15.450784,
    "lng": -61.331090,
    "radius": 29000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 168417
  },
  {
    "id": 424,
    "name": "Rosklide,Denmark",
    "lat": 55.624561,
    "lng": 12.163690,
    "radius": 30000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 207931
  },
  {
    "id": 1833,
    "name": "Rostock,Germany",
    "lat": 53.914003,
    "lng": 12.286303,
    "radius": 40000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 112626
  },
  {
    "id": 1164,
    "name": "Rotterdam, Netherlands",
    "lat": 51.884462,
    "lng": 4.504350,
    "radius": 50000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 188131
  },
  {
    "id": 1628,
    "name": "Rovaniemi, Finland",
    "lat": 66.563104,
    "lng": 25.830078,
    "radius": 300000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 516647
  },
  {
    "id": 27556,
    "name": "Rupsi",
    "lat": 26.142214,
    "lng": 89.906935,
    "radius": 200000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 46282
  },
  {
    "id": 1215,
    "name": "Rzeszow, Poland",
    "lat": 50.114826,
    "lng": 22.024598,
    "radius": 68000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 100105
  },
  {
    "id": 1747,
    "name": "Saba  Caribbean Netherlands",
    "lat": 17.644610,
    "lng": -63.220728,
    "radius": 8189,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": null
  },
  {
    "id": 1840,
    "name": "Sabah, Malaysia",
    "lat": 4.242769,
    "lng": 117.900085,
    "radius": 101537,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 1107904
  },
  {
    "id": 1247,
    "name": "Saint Croix,U.S. Virgin Islands",
    "lat": 17.699529,
    "lng": -64.797470,
    "radius": 26000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 123260
  },
  {
    "id": 1148,
    "name": "Saint Etienne,France",
    "lat": 45.531808,
    "lng": 4.294072,
    "radius": 150000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 178534
  },
  {
    "id": 1256,
    "name": "Saint Kitts, Saint Kitts and Nevis",
    "lat": 17.311215,
    "lng": -62.714100,
    "radius": 19000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 500599
  },
  {
    "id": 1246,
    "name": "Saint Thomas,U.S. Virgin Islands",
    "lat": 18.336061,
    "lng": -64.972273,
    "radius": 15000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 105725
  },
  {
    "id": 1404,
    "name": "Saint-Denis,Reunion",
    "lat": -20.891878,
    "lng": 55.512167,
    "radius": 50000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 120161
  },
  {
    "id": 1798,
    "name": "Saint-Pierre, Saint Pierre and Miquelon",
    "lat": 46.963885,
    "lng": -56.415905,
    "radius": 22000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 496960
  },
  {
    "id": 170,
    "name": "Saipan,USA",
    "lat": 15.181381,
    "lng": 145.774284,
    "radius": 15000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 492726
  },
  {
    "id": 1334,
    "name": "Sal Island,Cape Verde",
    "lat": 16.734579,
    "lng": -22.943976,
    "radius": 19000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 58834
  },
  {
    "id": 1370,
    "name": "Salalah, Oman",
    "lat": 17.048162,
    "lng": 54.087763,
    "radius": 106000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 111466
  },
  {
    "id": 25728,
    "name": "Salamanca",
    "lat": 40.940344,
    "lng": -5.502248,
    "radius": 42000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 48992
  },
  {
    "id": 27557,
    "name": "Salem",
    "lat": 11.782643,
    "lng": 78.061868,
    "radius": 250000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 45840
  },
  {
    "id": 66,
    "name": "Salt Lake City,UT,USA",
    "lat": 40.423079,
    "lng": -110.879946,
    "radius": 643736,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 1223748
  },
  {
    "id": 23660,
    "name": "Salta",
    "lat": -24.844230,
    "lng": -65.478412,
    "radius": 130000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 105733
  },
  {
    "id": 1795,
    "name": "Saltillo, Mexico",
    "lat": 25.401057,
    "lng": -100.994061,
    "radius": 50000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 340631
  },
  {
    "id": 965,
    "name": "Salvador,Brazil",
    "lat": -12.911098,
    "lng": -38.331241,
    "radius": 78000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 192069
  },
  {
    "id": 1421,
    "name": "Salzburg,Austria",
    "lat": 47.792647,
    "lng": 13.002927,
    "radius": 100000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 511631
  },
  {
    "id": 860,
    "name": "Samana, Dominican",
    "lat": 19.267656,
    "lng": -69.730461,
    "radius": 70000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 123258
  },
  {
    "id": 1701,
    "name": "Samarkand  Uzbekistan",
    "lat": 39.755602,
    "lng": 66.743905,
    "radius": 90214,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": null
  },
  {
    "id": 1481,
    "name": "Samos,Greece",
    "lat": 37.784089,
    "lng": 26.812868,
    "radius": 25000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 198285
  },
  {
    "id": 914,
    "name": "Samsun,Turkey",
    "lat": 41.005575,
    "lng": 36.813405,
    "radius": 94000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 184909
  },
  {
    "id": 890,
    "name": "San Andres,Colombia",
    "lat": 12.586116,
    "lng": -81.702158,
    "radius": 15000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 153584
  },
  {
    "id": 65,
    "name": "San Antonio,USA",
    "lat": 29.491800,
    "lng": -98.414228,
    "radius": 72420,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 470197
  },
  {
    "id": 865,
    "name": "San Carlos de Bariloche,Argentina",
    "lat": -41.145966,
    "lng": -71.161577,
    "radius": 55000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 383990
  },
  {
    "id": 75,
    "name": "San Diego",
    "lat": 33.092222,
    "lng": -117.074788,
    "radius": 61155,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 1107862
  },
  {
    "id": 859,
    "name": "San Felipe de Puerto Plata Dominican",
    "lat": 19.755229,
    "lng": -70.563656,
    "radius": 85000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 7406
  },
  {
    "id": 38,
    "name": "San Francisco, USA",
    "lat": 37.817962,
    "lng": -122.211278,
    "radius": 144841,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 1362023
  },
  {
    "id": 467,
    "name": "San Jose(Costa Rica)",
    "lat": 9.965521,
    "lng": -83.830485,
    "radius": 110000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 1202087
  },
  {
    "id": 23662,
    "name": "San Juan",
    "lat": -31.571814,
    "lng": -68.422568,
    "radius": 155000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 164223
  },
  {
    "id": 372,
    "name": "San Juan,Puerto Rico",
    "lat": 18.313447,
    "lng": -66.395584,
    "radius": 107000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 1017624
  },
  {
    "id": 812,
    "name": "San Luis Potosi, Mexico",
    "lat": 22.256886,
    "lng": -100.934151,
    "radius": 83000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 250986
  },
  {
    "id": 26033,
    "name": "San Martin de los Andes",
    "lat": -40.081378,
    "lng": -71.143285,
    "radius": 150000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 216573
  },
  {
    "id": 774,
    "name": "San Salvador, El Salvador",
    "lat": 13.348651,
    "lng": -88.936203,
    "radius": 135000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 497095
  },
  {
    "id": 25734,
    "name": "San Sebastián",
    "lat": 43.356427,
    "lng": -1.790937,
    "radius": 10000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 192623
  },
  {
    "id": 1997,
    "name": "Santa Barbara",
    "lat": 34.341525,
    "lng": -119.688642,
    "radius": 20921,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 738606
  },
  {
    "id": 878,
    "name": "Santa Cruz de Tenerife Spain",
    "lat": 28.265635,
    "lng": -16.457975,
    "radius": 50000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": null
  },
  {
    "id": 973,
    "name": "Santa Cruz%EF%BC%8CBolivia",
    "lat": -17.643120,
    "lng": -63.140756,
    "radius": 50000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 857727
  },
  {
    "id": 641,
    "name": "Santa Marta, Colombia",
    "lat": 11.103147,
    "lng": -74.012426,
    "radius": 58000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 115608
  },
  {
    "id": 1189,
    "name": "Santander,Spain",
    "lat": 43.426566,
    "lng": -3.821786,
    "radius": 20000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 165575
  },
  {
    "id": 1190,
    "name": "Santiago de Compostela, Spain",
    "lat": 42.891751,
    "lng": -8.421141,
    "radius": 82000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 192626
  },
  {
    "id": 653,
    "name": "Santiago Dominican Republic",
    "lat": 19.402133,
    "lng": -70.601907,
    "radius": 137092,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": null
  },
  {
    "id": 652,
    "name": "Santiago,Chile",
    "lat": -33.396606,
    "lng": -70.793440,
    "radius": 71000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 1335767
  },
  {
    "id": 703,
    "name": "Santo Domingo, Dominican",
    "lat": 18.553208,
    "lng": -69.858279,
    "radius": 50000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 372559
  },
  {
    "id": 866,
    "name": "Santorini,Greece",
    "lat": 36.408609,
    "lng": 25.415850,
    "radius": 9000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 265429
  },
  {
    "id": 679,
    "name": "SanYa,China",
    "lat": 18.393581,
    "lng": 109.600476,
    "radius": 70000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 335174
  },
  {
    "id": 966,
    "name": "Sao Luis, Brazil",
    "lat": -2.759228,
    "lng": -43.980782,
    "radius": 53359,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 442151
  },
  {
    "id": 343,
    "name": "Sao Paulo,Brazil",
    "lat": -23.528949,
    "lng": -46.564814,
    "radius": 100000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 1370038
  },
  {
    "id": 1402,
    "name": "Sao Tome, Sao Tome and Principe",
    "lat": 0.234707,
    "lng": 6.657678,
    "radius": 31000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 194225
  },
  {
    "id": 126,
    "name": "Sapporo",
    "lat": 43.373151,
    "lng": 142.434608,
    "radius": 270000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 796959
  },
  {
    "id": 1509,
    "name": "Sarajevo, Bosnia and Herzegovina",
    "lat": 43.825796,
    "lng": 18.336527,
    "radius": 70000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 222863
  },
  {
    "id": 799,
    "name": "Sarasota/Bradenton, FL, USA",
    "lat": 27.271649,
    "lng": -82.462580,
    "radius": 96560,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 197803
  },
  {
    "id": 61,
    "name": "Saskatoon, Canada",
    "lat": 52.174589,
    "lng": -106.700482,
    "radius": 125000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 175521
  },
  {
    "id": 444,
    "name": "Savannah,GA,USA",
    "lat": 32.177138,
    "lng": -80.949509,
    "radius": 241401,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 197771
  },
  {
    "id": 1007,
    "name": "Savannakhet, Laos",
    "lat": 16.556802,
    "lng": 104.763035,
    "radius": 131000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 144823
  },
  {
    "id": 37381,
    "name": "Save",
    "lat": 57.776411,
    "lng": 11.864751,
    "radius": 50000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 61619
  },
  {
    "id": 37386,
    "name": "Scania",
    "lat": 55.924078,
    "lng": 14.081180,
    "radius": 150000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 61314
  },
  {
    "id": 39,
    "name": "Seattle,USA",
    "lat": 47.409879,
    "lng": -122.099895,
    "radius": 144841,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 620554
  },
  {
    "id": 37311,
    "name": "Seinäjoki, Finland",
    "lat": 62.693158,
    "lng": 22.827810,
    "radius": 500000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 99641
  },
  {
    "id": 1026,
    "name": "Semarang,Indonesia",
    "lat": -6.966345,
    "lng": 110.374989,
    "radius": 82000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 192938
  },
  {
    "id": 1737,
    "name": "Semey  Kazakhstan",
    "lat": 50.353313,
    "lng": 80.233354,
    "radius": 100525,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": null
  },
  {
    "id": 1063,
    "name": "Sendai, Japan",
    "lat": 38.172138,
    "lng": 140.798810,
    "radius": 39000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 493004
  },
  {
    "id": 1309,
    "name": "Setif  Algeria",
    "lat": 36.175511,
    "lng": 5.330304,
    "radius": 99854,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": null
  },
  {
    "id": 1191,
    "name": "Seville,Spain",
    "lat": 37.420167,
    "lng": -5.893050,
    "radius": 150000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 192803
  },
  {
    "id": 1346,
    "name": "Seychelles",
    "lat": -4.671054,
    "lng": 55.511444,
    "radius": 17000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 171832
  },
  {
    "id": 1265,
    "name": "Sfax  Tunisia",
    "lat": 35.202252,
    "lng": 10.133801,
    "radius": 97174,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": null
  },
  {
    "id": 272,
    "name": "Shanghai,China",
    "lat": 31.226194,
    "lng": 121.480952,
    "radius": 280000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 565444
  },
  {
    "id": 846,
    "name": "Shannon,Ireland",
    "lat": 52.699657,
    "lng": -8.914691,
    "radius": 80000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 80209
  },
  {
    "id": 1393,
    "name": "Sharjah, United Arab Emirates",
    "lat": 25.328435,
    "lng": 55.512258,
    "radius": 163000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 234887
  },
  {
    "id": 986,
    "name": "Sharm el-Sheikh,Egypt",
    "lat": 27.976828,
    "lng": 34.393527,
    "radius": 49000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 488108
  },
  {
    "id": 330,
    "name": "Shenyang,China",
    "lat": 41.803374,
    "lng": 123.430606,
    "radius": 100000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 218552
  },
  {
    "id": 9714,
    "name": "shihezi,China",
    "lat": 44.244939,
    "lng": 85.895876,
    "radius": 200000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 106484
  },
  {
    "id": 657,
    "name": "Shijiazhuang,China",
    "lat": 38.021650,
    "lng": 114.498913,
    "radius": 318000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 207961
  },
  {
    "id": 27053,
    "name": "Shillong",
    "lat": 25.631943,
    "lng": 91.969587,
    "radius": 200000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 90472
  },
  {
    "id": 27426,
    "name": "Shirdi",
    "lat": 19.692383,
    "lng": 74.394066,
    "radius": 300000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 74724
  },
  {
    "id": 130,
    "name": "Shizuoka",
    "lat": 34.796475,
    "lng": 138.185322,
    "radius": 53000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 491562
  },
  {
    "id": 1689,
    "name": "Shymkent  Kazakhstan",
    "lat": 42.366172,
    "lng": 69.493104,
    "radius": 120254,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": null
  },
  {
    "id": 1521,
    "name": "Siauliai, Lithuania",
    "lat": 55.893889,
    "lng": 23.395011,
    "radius": 150000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 99577
  },
  {
    "id": 1497,
    "name": "Sibiu, Romania",
    "lat": 45.787445,
    "lng": 24.090210,
    "radius": 68000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 234703
  },
  {
    "id": 1027,
    "name": "Siborong-Borong Indonesia",
    "lat": 2.262275,
    "lng": 98.987803,
    "radius": 60000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": null
  },
  {
    "id": 112,
    "name": "Siem Reap,Cambodia",
    "lat": 12.606478,
    "lng": 104.313768,
    "radius": 201000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 1331354
  },
  {
    "id": 156,
    "name": "Sihanoukville, Cambodia",
    "lat": 10.580013,
    "lng": 103.640258,
    "radius": 150000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 188059
  },
  {
    "id": 27547,
    "name": "Silchar, India",
    "lat": 24.912706,
    "lng": 92.978895,
    "radius": 250000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 45874
  },
  {
    "id": 125,
    "name": "Singapore",
    "lat": 1.917634,
    "lng": 103.747740,
    "radius": 85000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 1222701
  },
  {
    "id": 683,
    "name": "Sint Maarten",
    "lat": 18.041870,
    "lng": -63.113082,
    "radius": 54371,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": null
  },
  {
    "id": 38999,
    "name": "Skellefteå, Sweden",
    "lat": 64.623294,
    "lng": 21.068005,
    "radius": 30000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 113788
  },
  {
    "id": 1482,
    "name": "Skiathos Island, Greece",
    "lat": 39.171023,
    "lng": 23.450968,
    "radius": 6000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 198279
  },
  {
    "id": 1674,
    "name": "Skopje, North Macedonia",
    "lat": 41.963161,
    "lng": 21.622353,
    "radius": 120000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 189284
  },
  {
    "id": 1483,
    "name": "Skyros Island  Greece",
    "lat": 38.869457,
    "lng": 24.570192,
    "radius": 16120,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": null
  },
  {
    "id": 1465,
    "name": "Sliac  Slovakia",
    "lat": 48.638056,
    "lng": 19.134167,
    "radius": 78488,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": null
  },
  {
    "id": 337,
    "name": "Sofia, Bulgaria",
    "lat": 42.693428,
    "lng": 23.407123,
    "radius": 89000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 601063
  },
  {
    "id": 1036,
    "name": "Sohag, Egypt",
    "lat": 26.339072,
    "lng": 31.737720,
    "radius": 86000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 110406
  },
  {
    "id": 1371,
    "name": "Sohar, Oman",
    "lat": 24.386311,
    "lng": 56.655128,
    "radius": 41000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 149108
  },
  {
    "id": 1118,
    "name": "Sokhumi  Georgia",
    "lat": 42.901181,
    "lng": 41.097378,
    "radius": 65239,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": null
  },
  {
    "id": 27605,
    "name": "Solarpur",
    "lat": 17.625439,
    "lng": 75.932994,
    "radius": 250000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 45971
  },
  {
    "id": 852,
    "name": "South Eleuthera  Bahamas",
    "lat": 25.154983,
    "lng": -76.460553,
    "radius": 77605,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": null
  },
  {
    "id": 837,
    "name": "Southampton,UK",
    "lat": 50.945846,
    "lng": -1.365737,
    "radius": 49890,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 527305
  },
  {
    "id": 689,
    "name": "Split,Croatia",
    "lat": 43.536704,
    "lng": 16.299025,
    "radius": 88000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 175868
  },
  {
    "id": 393,
    "name": "Spokane,WA,USA",
    "lat": 47.621748,
    "lng": -117.534812,
    "radius": 321868,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 196277
  },
  {
    "id": 27608,
    "name": "Sri Sathya Sai",
    "lat": 17.625439,
    "lng": 75.932994,
    "radius": 250000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 45988
  },
  {
    "id": 1745,
    "name": "Srinagar, India",
    "lat": 34.002176,
    "lng": 74.762402,
    "radius": 200000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 142026
  },
  {
    "id": 1863,
    "name": "St George,UT,USA",
    "lat": 37.009446,
    "lng": -113.553612,
    "radius": 96560,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 197030
  },
  {
    "id": 417,
    "name": "ST Johns, Canada",
    "lat": 47.621210,
    "lng": -52.742443,
    "radius": 200000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 65246
  },
  {
    "id": 366,
    "name": "St Louis",
    "lat": 38.633879,
    "lng": -90.482200,
    "radius": 67592,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 199170
  },
  {
    "id": 985,
    "name": "St. Catherine, Egypt",
    "lat": 28.672287,
    "lng": 33.952887,
    "radius": 74000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 110408
  },
  {
    "id": 1225,
    "name": "St. Gallen,Switzerland",
    "lat": 47.485874,
    "lng": 9.560018,
    "radius": 30000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 113117
  },
  {
    "id": 1306,
    "name": "St. Jean, Saint Barthelemy",
    "lat": 17.895250,
    "lng": -62.837126,
    "radius": 4000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 410787
  },
  {
    "id": 21304,
    "name": "Stockholm Skavsta Airport",
    "lat": 58.808935,
    "lng": 16.895704,
    "radius": 5000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 116749
  },
  {
    "id": 1646,
    "name": "Stockholm-VST, Sweden",
    "lat": 59.623208,
    "lng": 16.567098,
    "radius": 10000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 398450
  },
  {
    "id": 1149,
    "name": "Strasbourg,France",
    "lat": 48.539430,
    "lng": 7.628023,
    "radius": 100000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 403771
  },
  {
    "id": 1445,
    "name": "Stuttgart,Germany",
    "lat": 48.687636,
    "lng": 9.205576,
    "radius": 100000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 573764
  },
  {
    "id": 1837,
    "name": "Sukhothai  Thailand",
    "lat": 17.237500,
    "lng": 99.818333,
    "radius": 126000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 22245
  },
  {
    "id": 1838,
    "name": "Sunshine Coast,Australia",
    "lat": -26.760436,
    "lng": 153.155239,
    "radius": 119000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 738618
  },
  {
    "id": 1028,
    "name": "Surabaya,Indonesia",
    "lat": -7.378885,
    "lng": 112.787289,
    "radius": 57000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 162152
  },
  {
    "id": 1029,
    "name": "Surakarta,Indonesia",
    "lat": -7.515511,
    "lng": 110.756146,
    "radius": 72000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 192935
  },
  {
    "id": 694,
    "name": "Surat Thani, Thailand",
    "lat": 9.136747,
    "lng": 99.139787,
    "radius": 86000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 180834
  },
  {
    "id": 1729,
    "name": "Surat, India",
    "lat": 21.120530,
    "lng": 72.743089,
    "radius": 500000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 53420
  },
  {
    "id": 141,
    "name": "Sydney,Australia",
    "lat": -33.240367,
    "lng": 151.571657,
    "radius": 178000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 1311332
  },
  {
    "id": 1356,
    "name": "Sylhet, Bangladesh",
    "lat": 24.816325,
    "lng": 91.799309,
    "radius": 68000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 183134
  },
  {
    "id": 406,
    "name": "Syracuse, NY, USA",
    "lat": 43.113930,
    "lng": -76.110189,
    "radius": 199558,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 133489
  },
  {
    "id": 1218,
    "name": "Szczecin, Poland",
    "lat": 53.585877,
    "lng": 14.902781,
    "radius": 20000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 112651
  },
  {
    "id": 1384,
    "name": "Ta'if, Saudi Arabia",
    "lat": 21.480649,
    "lng": 40.552691,
    "radius": 88000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 150944
  },
  {
    "id": 1037,
    "name": "Taba,Egypt",
    "lat": 29.593668,
    "lng": 34.775952,
    "radius": 203000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 110409
  },
  {
    "id": 1266,
    "name": "Tabarka  Tunisia",
    "lat": 36.978253,
    "lng": 8.961823,
    "radius": 65144,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": null
  },
  {
    "id": 1383,
    "name": "Tabuk, Saudi Arabia",
    "lat": 28.372117,
    "lng": 36.598635,
    "radius": 81000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 44644
  },
  {
    "id": 148,
    "name": "Taichung，Taiwan, China",
    "lat": 24.244766,
    "lng": 120.651630,
    "radius": 29000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 203708
  },
  {
    "id": 1107,
    "name": "Tainan, Taiwan, China",
    "lat": 22.948017,
    "lng": 120.216054,
    "radius": 80000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 126247
  },
  {
    "id": 147,
    "name": "Taipei，Taiwan, China",
    "lat": 24.839976,
    "lng": 121.443349,
    "radius": 145000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 400555
  },
  {
    "id": 658,
    "name": "TaiYuan,China",
    "lat": 37.876079,
    "lng": 112.561546,
    "radius": 131000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 184662
  },
  {
    "id": 1807,
    "name": "Tallahassee, USA",
    "lat": 30.290026,
    "lng": -84.936637,
    "radius": 80467,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 112920
  },
  {
    "id": 1514,
    "name": "Tallinn, Estonia",
    "lat": 58.915238,
    "lng": 25.405983,
    "radius": 130000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 517748
  },
  {
    "id": 1416,
    "name": "Tamale,Ghana",
    "lat": 9.552232,
    "lng": -0.863374,
    "radius": 109000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 110286
  },
  {
    "id": 1278,
    "name": "Tamanrasset  Algeria",
    "lat": 22.811111,
    "lng": 5.450833,
    "radius": 304774,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": null
  },
  {
    "id": 24315,
    "name": "Tamarindo",
    "lat": 10.270955,
    "lng": -85.529558,
    "radius": 43000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 157549
  },
  {
    "id": 70,
    "name": "Tampa,USA",
    "lat": 27.785242,
    "lng": -82.566552,
    "radius": 80467,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 1370141
  },
  {
    "id": 1629,
    "name": "Tampere, Finland",
    "lat": 61.414857,
    "lng": 23.604630,
    "radius": 200000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 516771
  },
  {
    "id": 813,
    "name": "Tampico,Mexico",
    "lat": 22.080849,
    "lng": -98.462457,
    "radius": 93000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 358372
  },
  {
    "id": 1045,
    "name": "Tangier,Morocco,Africa",
    "lat": 35.726595,
    "lng": -5.915068,
    "radius": 59000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 1105959
  },
  {
    "id": 1030,
    "name": "Tanjung Pandan,Indonesia",
    "lat": -2.753977,
    "lng": 107.753159,
    "radius": 51000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 192937
  },
  {
    "id": 1047,
    "name": "Tarakan Indonesia",
    "lat": 3.356795,
    "lng": 117.636746,
    "radius": 14774,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": null
  },
  {
    "id": 1321,
    "name": "Tarawa  Kiribati",
    "lat": 1.407653,
    "lng": 173.033013,
    "radius": 31049,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": null
  },
  {
    "id": 1690,
    "name": "Taraz  Kazakhstan",
    "lat": 42.866358,
    "lng": 71.293378,
    "radius": 91009,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": null
  },
  {
    "id": 1188,
    "name": "Tarragona,Spain",
    "lat": 41.148259,
    "lng": 1.168289,
    "radius": 92000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 202309
  },
  {
    "id": 1515,
    "name": "Tartu, Estonia",
    "lat": 58.309498,
    "lng": 26.689304,
    "radius": 50000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 517750
  },
  {
    "id": 1743,
    "name": "Tashkent,Uzbekistan",
    "lat": 41.261067,
    "lng": 69.278814,
    "radius": 100000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 146822
  },
  {
    "id": 70051,
    "name": "Taurange/Rotorua",
    "lat": -37.888626,
    "lng": 176.362312,
    "radius": 150000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 353791
  },
  {
    "id": 941,
    "name": "Tbilisi,Georgia",
    "lat": 41.669608,
    "lng": 44.964349,
    "radius": 100000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 229410
  },
  {
    "id": 1821,
    "name": "Temuco  Chile",
    "lat": -38.927165,
    "lng": -72.646853,
    "radius": 90197,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": null
  },
  {
    "id": 26047,
    "name": "Tenerife South Spain",
    "lat": 28.046758,
    "lng": -16.572530,
    "radius": 150000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 245312
  },
  {
    "id": 1192,
    "name": "Tenerife, North Spain",
    "lat": 28.378237,
    "lng": -16.488989,
    "radius": 50000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 227785
  },
  {
    "id": 1855,
    "name": "Tepic, Mexico",
    "lat": 21.417062,
    "lng": -104.839306,
    "radius": 102000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 229638
  },
  {
    "id": 1171,
    "name": "Terceira Island  Portugal",
    "lat": 38.753758,
    "lng": -27.120190,
    "radius": 26872,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": null
  },
  {
    "id": 1108,
    "name": "Teresina  Brazil",
    "lat": -5.060252,
    "lng": -42.823646,
    "radius": 102644,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": null
  },
  {
    "id": 1702,
    "name": "Termez  Uzbekistan",
    "lat": 37.280903,
    "lng": 67.318927,
    "radius": 56812,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": null
  },
  {
    "id": 1046,
    "name": "Tetouan, Morocco",
    "lat": 35.591092,
    "lng": -5.331020,
    "radius": 60000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 1106066
  },
  {
    "id": 27613,
    "name": "Tezpur Airport",
    "lat": 26.698792,
    "lng": 92.768732,
    "radius": 200000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 45991
  },
  {
    "id": 847,
    "name": "The Valley, Anguilla",
    "lat": 18.237542,
    "lng": -63.080949,
    "radius": 13000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 371551
  },
  {
    "id": 1484,
    "name": "Thessaloniki,Greece",
    "lat": 40.520423,
    "lng": 22.971676,
    "radius": 88000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 266006
  },
  {
    "id": 667,
    "name": "TianJing,China",
    "lat": 39.064795,
    "lng": 117.240295,
    "radius": 230000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 208027
  },
  {
    "id": 779,
    "name": "Tijuana,Mexico",
    "lat": 32.332471,
    "lng": -116.883809,
    "radius": 24000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 36699
  },
  {
    "id": 1498,
    "name": "Timisoara, Romania",
    "lat": 45.810234,
    "lng": 21.320193,
    "radius": 70000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 85700
  },
  {
    "id": 1656,
    "name": "Tirana, Albania",
    "lat": 41.419115,
    "lng": 19.713477,
    "radius": 64000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 74692
  },
  {
    "id": 27435,
    "name": "Tirupati, Andhra Pradesh",
    "lat": 13.638431,
    "lng": 79.547399,
    "radius": 300000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 51056
  },
  {
    "id": 1524,
    "name": "Tivat, Montenegro",
    "lat": 42.405636,
    "lng": 18.722231,
    "radius": 150000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 230269
  },
  {
    "id": 1279,
    "name": "Tlemcen  Algeria",
    "lat": 35.012304,
    "lng": -1.447937,
    "radius": 136142,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": null
  },
  {
    "id": 1343,
    "name": "Toamasina  Madagascar",
    "lat": -18.110186,
    "lng": 49.392609,
    "radius": 103257,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": null
  },
  {
    "id": 1261,
    "name": "Tobago, Trinidad and Tobago",
    "lat": 11.198192,
    "lng": -60.686103,
    "radius": 26000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 171425
  },
  {
    "id": 43,
    "name": "Tokyo, Japan",
    "lat": 35.897797,
    "lng": 139.264891,
    "radius": 149000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 1186655
  },
  {
    "id": 1344,
    "name": "Tolanaro  Madagascar",
    "lat": -25.036490,
    "lng": 46.954418,
    "radius": 119255,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": null
  },
  {
    "id": 1787,
    "name": "Tolu  Colombia",
    "lat": 9.512460,
    "lng": -75.586580,
    "radius": 93121,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": null
  },
  {
    "id": 814,
    "name": "Toluca, Mexico",
    "lat": 19.338948,
    "lng": -99.569836,
    "radius": 80000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 179146
  },
  {
    "id": 56,
    "name": "Toronto,Canada",
    "lat": 43.367114,
    "lng": -79.996821,
    "radius": 81000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 740404
  },
  {
    "id": 74406,
    "name": "Torp Sandefjord",
    "lat": 59.182446,
    "lng": 10.256912,
    "radius": 40000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 832924
  },
  {
    "id": 815,
    "name": "Torreon, Mexico",
    "lat": 25.563218,
    "lng": -103.403864,
    "radius": 125000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 229640
  },
  {
    "id": 1150,
    "name": "Toulon,France",
    "lat": 43.094657,
    "lng": 6.150897,
    "radius": 76000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 178537
  },
  {
    "id": 1151,
    "name": "Toulouse,France",
    "lat": 43.629386,
    "lng": 1.367682,
    "radius": 104000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 405129
  },
  {
    "id": 1152,
    "name": "Tours,France",
    "lat": 47.425905,
    "lng": 0.719640,
    "radius": 150000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 178542
  },
  {
    "id": 1315,
    "name": "Townsville,Australia",
    "lat": -19.247049,
    "lng": 146.766794,
    "radius": 98000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 171817
  },
  {
    "id": 1267,
    "name": "Tozeur  Tunisia",
    "lat": 33.935338,
    "lng": 8.111465,
    "radius": 51522,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": null
  },
  {
    "id": 915,
    "name": "Trabzon,Turkey",
    "lat": 40.496114,
    "lng": 40.458596,
    "radius": 150000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 1162855
  },
  {
    "id": 1243,
    "name": "Trapani,Italy",
    "lat": 37.959703,
    "lng": 12.565590,
    "radius": 30000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 662565
  },
  {
    "id": 14171,
    "name": "Trat,Thailand",
    "lat": 12.281264,
    "lng": 102.324395,
    "radius": 43000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 184241
  },
  {
    "id": 1856,
    "name": "Tri-Cities, TN, USA",
    "lat": 36.481673,
    "lng": -82.407717,
    "radius": 99779,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 42732
  },
  {
    "id": 1728,
    "name": "Trichy, India",
    "lat": 10.760252,
    "lng": 78.708590,
    "radius": 250000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 51053
  },
  {
    "id": 1244,
    "name": "Trieste,Italy",
    "lat": 45.527595,
    "lng": 12.883904,
    "radius": 80000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 198791
  },
  {
    "id": 1727,
    "name": "Trivandrum, India",
    "lat": 8.483420,
    "lng": 76.919819,
    "radius": 545000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 279315
  },
  {
    "id": 37387,
    "name": "Trollhttan Vanersborg",
    "lat": 58.316470,
    "lng": 12.350358,
    "radius": 80000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 61309
  },
  {
    "id": 1639,
    "name": "Tromso, Norway",
    "lat": 69.681935,
    "lng": 18.916264,
    "radius": 8000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 499295
  },
  {
    "id": 1640,
    "name": "Trondheim, Norway",
    "lat": 63.458270,
    "lng": 10.922599,
    "radius": 61000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 516574
  },
  {
    "id": 394,
    "name": "Tucson,AZ,USA",
    "lat": 33.014877,
    "lng": -111.151846,
    "radius": 160934,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 209921
  },
  {
    "id": 23661,
    "name": "Tucuman",
    "lat": -26.845211,
    "lng": -64.932449,
    "radius": 130000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 59437
  },
  {
    "id": 1292,
    "name": "Tulcan  Ecuador",
    "lat": 0.115181,
    "lng": -78.101655,
    "radius": 86380,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": null
  },
  {
    "id": 1345,
    "name": "Tulear  Madagascar",
    "lat": -23.387862,
    "lng": 43.723193,
    "radius": 131662,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": null
  },
  {
    "id": 398,
    "name": "Tulsa, OK, USA",
    "lat": 36.198778,
    "lng": -95.883866,
    "radius": 199558,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 48769
  },
  {
    "id": 17863,
    "name": "Tulum",
    "lat": 19.875080,
    "lng": -87.858879,
    "radius": 105000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 464945
  },
  {
    "id": 1788,
    "name": "Tumaco  Colombia",
    "lat": 1.812363,
    "lng": -78.751523,
    "radius": 83921,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": null
  },
  {
    "id": 339,
    "name": "Tunis, Tunisia",
    "lat": 36.845858,
    "lng": 10.219075,
    "radius": 120000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 195184
  },
  {
    "id": 1741,
    "name": "Turkmenabat, Turkmenistan",
    "lat": 38.936835,
    "lng": 63.567634,
    "radius": 59751,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 672683
  },
  {
    "id": 1740,
    "name": "Turkmenbashi, Turkmenistan",
    "lat": 40.050000,
    "lng": 53.000000,
    "radius": 79000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 672684
  },
  {
    "id": 1630,
    "name": "Turku, Finland",
    "lat": 60.511498,
    "lng": 22.263285,
    "radius": 50000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 516770
  },
  {
    "id": 27614,
    "name": "Tuticorin",
    "lat": 8.726458,
    "lng": 78.027290,
    "radius": 300000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 46289
  },
  {
    "id": 816,
    "name": "Tuxtla Gutierrez, Mexico",
    "lat": 16.369734,
    "lng": -93.071582,
    "radius": 90000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 383934
  },
  {
    "id": 1510,
    "name": "Tuzla  Bosnia and Herzegovina",
    "lat": 44.464043,
    "lng": 18.710289,
    "radius": 56983,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": null
  },
  {
    "id": 968,
    "name": "Uberlandia  Brazil",
    "lat": -18.889337,
    "lng": -48.230954,
    "radius": 73143,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": null
  },
  {
    "id": 707,
    "name": "Udaipur, India",
    "lat": 24.619878,
    "lng": 73.890143,
    "radius": 450000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 458148
  },
  {
    "id": 933,
    "name": "Udon Thani, Thailand",
    "lat": 17.387112,
    "lng": 102.775528,
    "radius": 86000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 180827
  },
  {
    "id": 164,
    "name": "Ulaanbaator",
    "lat": 47.751816,
    "lng": 106.791745,
    "radius": 200000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 172140
  },
  {
    "id": 1114,
    "name": "Ulanqab,China",
    "lat": 41.126595,
    "lng": 113.110275,
    "radius": 400000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 218178
  },
  {
    "id": 1647,
    "name": "Umea, Sweden",
    "lat": 63.793016,
    "lng": 20.289280,
    "radius": 30000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 517745
  },
  {
    "id": 904,
    "name": "Unguja/Zanzibar,Tanzania",
    "lat": -6.127057,
    "lng": 39.355275,
    "radius": 50000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 207001
  },
  {
    "id": 1703,
    "name": "Urgench  Uzbekistan",
    "lat": 41.583884,
    "lng": 60.642432,
    "radius": 61892,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": null
  },
  {
    "id": 1796,
    "name": "Uruapan  Mexico",
    "lat": 19.397231,
    "lng": -102.039299,
    "radius": 109986,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": null
  },
  {
    "id": 895,
    "name": "Ushuaia,Argentina",
    "lat": -54.711356,
    "lng": -68.309505,
    "radius": 18000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 112295
  },
  {
    "id": 18512,
    "name": "Uvero alto",
    "lat": 18.808542,
    "lng": -68.581380,
    "radius": 41865,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": null
  },
  {
    "id": 1631,
    "name": "Vaasa, Finland",
    "lat": 63.051248,
    "lng": 21.762713,
    "radius": 60000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 516783
  },
  {
    "id": 27443,
    "name": "Vadodara",
    "lat": 22.332462,
    "lng": 73.217054,
    "radius": 300000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 79152
  },
  {
    "id": 1490,
    "name": "Vagar, Faroe Islands",
    "lat": 62.067597,
    "lng": -7.279002,
    "radius": 100000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 155475
  },
  {
    "id": 1193,
    "name": "Valencia,Spain",
    "lat": 39.489233,
    "lng": -0.478026,
    "radius": 50000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 222375
  },
  {
    "id": 1194,
    "name": "Valladolid, Spain",
    "lat": 41.706014,
    "lng": -4.845069,
    "radius": 86000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 166712
  },
  {
    "id": 1790,
    "name": "Valledupar, Colombia",
    "lat": 10.433620,
    "lng": -73.247788,
    "radius": 55000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 113972
  },
  {
    "id": 1486,
    "name": "Valletta,Malta",
    "lat": 35.854113,
    "lng": 14.483280,
    "radius": 50000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 405039
  },
  {
    "id": 55,
    "name": "Vancouver,Canada",
    "lat": 49.601359,
    "lng": -122.910208,
    "radius": 126000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 1370060
  },
  {
    "id": 70151,
    "name": "Varadero, Cuba",
    "lat": 23.034311,
    "lng": -81.437687,
    "radius": 150000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 370569
  },
  {
    "id": 1726,
    "name": "Varanasi, India",
    "lat": 25.448768,
    "lng": 82.856796,
    "radius": 250000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 1336232
  },
  {
    "id": 37316,
    "name": "Varkaus, Finland",
    "lat": 62.173759,
    "lng": 27.865261,
    "radius": 400000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 60532
  },
  {
    "id": 1513,
    "name": "Varna,Bulgaria",
    "lat": 43.236797,
    "lng": 27.827114,
    "radius": 140000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 198466
  },
  {
    "id": 1648,
    "name": "Vaxjo, Sweden",
    "lat": 56.924885,
    "lng": 14.731647,
    "radius": 80000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 90403
  },
  {
    "id": 327,
    "name": "Venice,Italy",
    "lat": 45.711877,
    "lng": 12.118111,
    "radius": 110000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 1223751
  },
  {
    "id": 1518,
    "name": "Ventspils, Latvia",
    "lat": 56.770250,
    "lng": 22.953277,
    "radius": 136000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 99543
  },
  {
    "id": 817,
    "name": "Veracruz, Mexico",
    "lat": 19.115429,
    "lng": -96.274514,
    "radius": 83000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 179105
  },
  {
    "id": 1245,
    "name": "Verona,Italy",
    "lat": 45.209289,
    "lng": 10.406803,
    "radius": 130701,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 701989
  },
  {
    "id": 1424,
    "name": "Victoria Falls,Zimbabwe",
    "lat": -18.095899,
    "lng": 25.851344,
    "radius": 142000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 739684
  },
  {
    "id": 1284,
    "name": "Victoria,Canada",
    "lat": 48.518552,
    "lng": -123.400192,
    "radius": 15000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 210526
  },
  {
    "id": 317,
    "name": "Vienna,Austria",
    "lat": 48.112612,
    "lng": 16.575514,
    "radius": 100000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 601061
  },
  {
    "id": 120,
    "name": "Vientiane,Laos",
    "lat": 18.398149,
    "lng": 102.601352,
    "radius": 100000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 464840
  },
  {
    "id": 599,
    "name": "Vieques Puerto Rico",
    "lat": 18.055646,
    "lng": -65.407558,
    "radius": 25000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": null
  },
  {
    "id": 1257,
    "name": "Vieux Fort Quarter, Saint Lucia",
    "lat": 13.888582,
    "lng": -60.937747,
    "radius": 26000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 171426
  },
  {
    "id": 1195,
    "name": "Vigo,Spain",
    "lat": 42.224969,
    "lng": -8.632883,
    "radius": 150000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 245353
  },
  {
    "id": 27615,
    "name": "Vijayawada International",
    "lat": 16.523838,
    "lng": 80.791417,
    "radius": 300000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 46290
  },
  {
    "id": 819,
    "name": "Villahermosa%EF%BC%8CMexico",
    "lat": 17.995458,
    "lng": -92.816567,
    "radius": 89000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 99097
  },
  {
    "id": 1791,
    "name": "Villavicencio  Colombia",
    "lat": 4.168983,
    "lng": -73.612168,
    "radius": 100620,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": null
  },
  {
    "id": 869,
    "name": "Vilnius, Lithuania",
    "lat": 54.688871,
    "lng": 25.286558,
    "radius": 200000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 517754
  },
  {
    "id": 1725,
    "name": "Visakhapatnam, India",
    "lat": 17.728469,
    "lng": 83.223558,
    "radius": 250000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 187844
  },
  {
    "id": 1649,
    "name": "Visby  Sweden",
    "lat": 57.462167,
    "lng": 18.693941,
    "radius": 79767,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": null
  },
  {
    "id": 1196,
    "name": "Vitoria-Gasteiz, Spain",
    "lat": 42.883428,
    "lng": -2.731205,
    "radius": 20000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 123829
  },
  {
    "id": 969,
    "name": "Vitoria, Brazil",
    "lat": -20.257649,
    "lng": -40.283535,
    "radius": 65000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 179157
  },
  {
    "id": 1654,
    "name": "Volos, Greece",
    "lat": 39.218785,
    "lng": 22.669756,
    "radius": 64000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 198286
  },
  {
    "id": 1347,
    "name": "Walvis Bay,Namibia",
    "lat": -22.979722,
    "lng": 14.645278,
    "radius": 113000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 110311
  },
  {
    "id": 1089,
    "name": "Wanzhou,China",
    "lat": 30.797607,
    "lng": 108.431544,
    "radius": 108000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 218026
  },
  {
    "id": 27616,
    "name": "Warangal",
    "lat": 17.916580,
    "lng": 79.600138,
    "radius": 250000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 46291
  },
  {
    "id": 322,
    "name": "Warsaw,Poland",
    "lat": 52.308251,
    "lng": 20.809564,
    "radius": 450000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 453638
  },
  {
    "id": 73,
    "name": "Washington DC",
    "lat": 38.975496,
    "lng": -77.096270,
    "radius": 96560,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 1033760
  },
  {
    "id": 1446,
    "name": "Weeze,Germany",
    "lat": 51.602758,
    "lng": 6.141652,
    "radius": 100000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 705682
  },
  {
    "id": 1090,
    "name": "Weihai,China",
    "lat": 37.178346,
    "lng": 122.053275,
    "radius": 154000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 186246
  },
  {
    "id": 144,
    "name": "Wellington,New Zealand",
    "lat": -41.220077,
    "lng": 175.006623,
    "radius": 48000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 813165
  },
  {
    "id": 1091,
    "name": "Wenzhou,China",
    "lat": 27.911024,
    "lng": 120.855411,
    "radius": 155000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 272485
  },
  {
    "id": 820,
    "name": "Whitehorse,Canada",
    "lat": 60.714123,
    "lng": -135.076117,
    "radius": 150000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 109617
  },
  {
    "id": 416,
    "name": "Wichita",
    "lat": 37.650853,
    "lng": -97.428699,
    "radius": 107826,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 25761
  },
  {
    "id": 801,
    "name": "Wilkes-Barre,USA",
    "lat": 41.337768,
    "lng": -75.723781,
    "radius": 96560,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 197073
  },
  {
    "id": 1248,
    "name": "Willemstad,Curacao",
    "lat": 12.188463,
    "lng": -68.960945,
    "radius": 40000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 1019773
  },
  {
    "id": 802,
    "name": "Wilmington(NC), USA",
    "lat": 34.266893,
    "lng": -77.910520,
    "radius": 96560,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 98773
  },
  {
    "id": 1353,
    "name": "Windhoek,Namibia",
    "lat": -22.487264,
    "lng": 17.463968,
    "radius": 115000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 110313
  },
  {
    "id": 38052,
    "name": "Windsor International airport",
    "lat": 42.186085,
    "lng": -82.910903,
    "radius": 19000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 64813
  },
  {
    "id": 650,
    "name": "Winnipeg,Canada",
    "lat": 49.909828,
    "lng": -97.236546,
    "radius": 100000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 764151
  },
  {
    "id": 1219,
    "name": "Wroclaw, Poland",
    "lat": 51.104165,
    "lng": 16.880933,
    "radius": 400000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 463838
  },
  {
    "id": 672,
    "name": "WuHan,China",
    "lat": 30.587637,
    "lng": 114.323932,
    "radius": 130000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 207946
  },
  {
    "id": 666,
    "name": "Wulumuqi,China",
    "lat": 43.821164,
    "lng": 87.617555,
    "radius": 154000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 217886
  },
  {
    "id": 1092,
    "name": "Wuxi,China",
    "lat": 31.494090,
    "lng": 120.315302,
    "radius": 162000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 207939
  },
  {
    "id": 1093,
    "name": "Wuyishan,China",
    "lat": 27.705218,
    "lng": 118.003567,
    "radius": 116000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 218028
  },
  {
    "id": 670,
    "name": "Xi'An,China",
    "lat": 34.265699,
    "lng": 108.955693,
    "radius": 102000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 306478
  },
  {
    "id": 680,
    "name": "XiaMen",
    "lat": 24.491393,
    "lng": 118.079228,
    "radius": 102000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 207943
  },
  {
    "id": 669,
    "name": "XiNing,China",
    "lat": 36.602847,
    "lng": 101.766126,
    "radius": 182000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 217888
  },
  {
    "id": 1115,
    "name": "Xinzhou,China",
    "lat": 38.416663,
    "lng": 112.734174,
    "radius": 101000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 218240
  },
  {
    "id": 1094,
    "name": "Xishuangbanna,China",
    "lat": 22.027088,
    "lng": 100.763285,
    "radius": 38000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 218029
  },
  {
    "id": 1095,
    "name": "Xuzhou,China",
    "lat": 34.199805,
    "lng": 117.297676,
    "radius": 136000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 218030
  },
  {
    "id": 1385,
    "name": "Yanbu, Saudi Arabia",
    "lat": 24.150240,
    "lng": 38.063201,
    "radius": 94000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 113964
  },
  {
    "id": 1096,
    "name": "Yancheng,China",
    "lat": 33.356491,
    "lng": 120.170556,
    "radius": 119000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 218031
  },
  {
    "id": 1051,
    "name": "Yangyang, Korean",
    "lat": 38.007021,
    "lng": 128.480162,
    "radius": 33000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 491387
  },
  {
    "id": 1097,
    "name": "YangZhou,China",
    "lat": 32.387246,
    "lng": 119.417719,
    "radius": 123000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 218032
  },
  {
    "id": 1099,
    "name": "Yantai,China",
    "lat": 37.560439,
    "lng": 121.049557,
    "radius": 116000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 218046
  },
  {
    "id": 1332,
    "name": "Yaounde,Cameroon",
    "lat": 3.714916,
    "lng": 11.547693,
    "radius": 239000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 149439
  },
  {
    "id": 1499,
    "name": "Yerevan, Armenia",
    "lat": 40.149178,
    "lng": 44.398857,
    "radius": 80000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 203267
  },
  {
    "id": 1100,
    "name": "Yichang,China",
    "lat": 30.690334,
    "lng": 111.278425,
    "radius": 123000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 218047
  },
  {
    "id": 701,
    "name": "Yinchuan,China",
    "lat": 38.476234,
    "lng": 106.244146,
    "radius": 200000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 217902
  },
  {
    "id": 1101,
    "name": "Yiwu,China",
    "lat": 29.316458,
    "lng": 120.069397,
    "radius": 186000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 294493
  },
  {
    "id": 1031,
    "name": "Yogyakarta,Indonesia",
    "lat": -7.901509,
    "lng": 110.058326,
    "radius": 109000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 173451
  },
  {
    "id": 1792,
    "name": "Yopal  Colombia",
    "lat": 5.320657,
    "lng": -72.386216,
    "radius": 102362,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": null
  },
  {
    "id": 1102,
    "name": "Yuncheng,China",
    "lat": 35.032506,
    "lng": 111.020524,
    "radius": 104000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 218049
  },
  {
    "id": 1797,
    "name": "Zacatecas  Mexico",
    "lat": 22.900251,
    "lng": -102.680396,
    "radius": 130270,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": null
  },
  {
    "id": 690,
    "name": "Zagreb,Croatia",
    "lat": 45.740750,
    "lng": 16.067437,
    "radius": 150000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 200407
  },
  {
    "id": 1485,
    "name": "Zakynthos, Greece",
    "lat": 37.772894,
    "lng": 20.797350,
    "radius": 21000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 307590
  },
  {
    "id": 925,
    "name": "Zamboanga City, Philippines",
    "lat": 7.568349,
    "lng": 122.484621,
    "radius": 93000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 34603
  },
  {
    "id": 1197,
    "name": "Zaragoza, Spain",
    "lat": 41.660358,
    "lng": -1.022720,
    "radius": 89000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 192810
  },
  {
    "id": 1103,
    "name": "Zhangjiajie,China",
    "lat": 29.118179,
    "lng": 110.484115,
    "radius": 133000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 218050
  },
  {
    "id": 1104,
    "name": "Zhanjiang,China",
    "lat": 21.268290,
    "lng": 110.354941,
    "radius": 96000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 218051
  },
  {
    "id": 671,
    "name": "ZhengZhou,China",
    "lat": 34.738536,
    "lng": 113.631196,
    "radius": 143000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 505855
  },
  {
    "id": 682,
    "name": "ZhuHai,China",
    "lat": 22.168647,
    "lng": 113.326141,
    "radius": 52000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 217901
  },
  {
    "id": 807,
    "name": "Zihuatanejo ,Mexico",
    "lat": 17.606168,
    "lng": -101.463711,
    "radius": 76000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 1143470
  },
  {
    "id": 1466,
    "name": "Zilina  Slovakia",
    "lat": 49.233659,
    "lng": 18.614183,
    "radius": 114683,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": null
  },
  {
    "id": 916,
    "name": "Zonguldak Turkey",
    "lat": 41.506545,
    "lng": 32.090593,
    "radius": 200000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": null
  },
  {
    "id": 1105,
    "name": "Zunyi,China",
    "lat": 27.741876,
    "lng": 106.923950,
    "radius": 139000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 218052
  },
  {
    "id": 426,
    "name": "Zurich,Switzerland",
    "lat": 47.100456,
    "lng": 8.398921,
    "radius": 214000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 805692
  },
  {
    "id": 57867,
    "name": "土格加劳",
    "lat": 17.786283,
    "lng": 121.631379,
    "radius": 37000,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 166631
  }
]

let elifeFleetsNotRadius = [
  {
    "id": 329,
    "name": "Dalaman, Turkey",
    "lat": 37.162864,
    "lng": 28.763040,
    "radius": null,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 1197325
  },
  {
    "id": 133,
    "name": "Istanbul,Turkey",
    "lat": 40.752299,
    "lng": 28.513496,
    "radius": null,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 1339369
  },
  {
    "id": 842,
    "name": "Londonderry,UK",
    "lat": 54.976666,
    "lng": -7.237052,
    "radius": null,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 528482
  },
  {
    "id": 105,
    "name": "Seoul,Korean",
    "lat": 36.502780,
    "lng": 127.828198,
    "radius": null,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 508862
  },
  {
    "id": 311,
    "name": "ShenZhen,China",
    "lat": 22.672667,
    "lng": 114.151620,
    "radius": null,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 1156450
  },
  {
    "id": 744,
    "name": "Turin,Italy",
    "lat": 45.021223,
    "lng": 8.490428,
    "radius": null,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 1146712
  },
  {
    "id": 1098,
    "name": "Yanji,China",
    "lat": 42.887669,
    "lng": 129.504275,
    "radius": null,
    "bidding": null,
    "parent_fleet_id": 15,
    "unverified": null,
    "service_area_pricing_id": 367265
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