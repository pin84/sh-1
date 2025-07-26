const ses = 'YM9zkRVEF7DYYr1JFhgAyKobXMYWYgnfuBRqEX8y5ePR7hykxUVrSdXVM9rrIWXB9IwfUBQFMVeS7bCHMTwXNy0UqpSR9DFXnayZVBCkgGmXn0fGFhtNT8g729VBq4CO'
const sesDev = 'UEc1L5eErGh7DFkDh6wrQ46IVQt0d8QYQfquN6udTq7t0ETpcA7lmlXrUXJC2t66teluAqg47qpGznRfaVc6d4b9OHAJilwsE1e3wMYhvDdkfEgCJzYAaCe59gRYg8Sm'

async function getFleetIdAndPricingByAirport(url, airport, parent_fleet_id) {
  debugger
  let cachKey = `${parent_fleet_id}-${airport}`
  let res = caches[cachKey]
  if (res) {
    return res
  }
  debugger
  res = await fetchData({
    url,
    method: "POST",
    data: {
      sql: 134679330,
      version: '1.9',
      airport,
      parent_fleet_id,
    }
  })
  caches[cachKey] = res
  

  let { pricing_id, fleet_id, pricing } = res
  if(!fleet_id){
    return {}
  }
  if (!pricing_id && !pricing) {
    pricing = await getLatPricingJsonAndFleeNotJsonId(url, fleet_id)
  }

  if (!pricing) {
    let fleetInfo = await fetchData({
      url,
      method: 'POST',
      data: {
        sql: 134679330,
        version: '4.090',
        airportCode: airport,
        parent_fleet_id
      }
    })
    res['pricing'] = {}
    res['pricing']['serviceArea'] = fleetInfo
    res['pricing'] = JSON.stringify( res['pricing'])
  }
  return res
}
async function getAirportInfo(url, code) {
  // select a.code3,ad.lat,ad.lng,a.radius from address ad left join airport a on code3 = '{{airport_code}}' where ad.id = a.address_id
  let res = caches[code]
  if (!res) {
    res = await fetchData({
      url,
      method: 'POST',
      data: {
        sql: 134679330,
        version: '4.068',
        airport_code: code
      }
    })
    caches[code] = res
  }
  return res
}
async function getLastPricingJsonBySvcId(url, svcId) {
  let pricing = caches[svcId]
  if (pricing) {
    return pricing
  }
  let res = await fetchData({
    url,
    method: "POST",
    data: {
      sql: 134679330,
      version: '4.004',
      svcId,
    }
  })
  pricing = res?.pricing || null

  if (!pricing) {
    pricing = await getLatPricingJsonAndFleeNotJsonId(url, svcId)
  }
  if (!pricing) return
  pricing = JSON.parse(pricing)
  caches[svcId] = pricing
  return pricing
}
async function getPricingJsonBySvcId(url, id) {
  //  select pricing from fleet left join service_area_pricing s on  s.id = fleet.service_area_pricing_id where fleet.id = {{svc_id}}
  let result = caches[id]
  if (result) {
    return result
  }
  let d = {
    sql: 134678865,
    version: '1.1',
    svc_id: id
  }

  let res = await fetchData({
    url,
    method: 'POST',
    data: d,
    desc: 'get pricing json_id'
  })

  let { pricing } = res
  if (!pricing) {
    return
  }
  result = JSON.parse(res.pricing)
  caches[id] = result
  return result
}
async function getPricingJsonBySvcIdNew(url, id) {
  //  select pricing from fleet left join service_area_pricing s on  s.id = fleet.service_area_pricing_id where fleet.id = {{svc_id}}
  let result = caches[id]
  if (result) {
    return result
  }
  let d = {
    sql: 134679330,
    version: '4.081',
    svc_id: id
  }

  let res = await fetchData({
    url,
    method: 'POST',
    data: d,
    desc: 'get pricing json_id'
  })

  let { pricing } = res
  if (!pricing) {
    return
  }
  result = JSON.parse(res.pricing)
  caches[id] = result
  return result
}

async function getFlightNoByAiportCode(url, airport_code, min_hh, max_hh) {
  // select flight_no from airport_fleet where airport = {{airport_code}}
  let str = `flightNo-${airport_code}`
  let res = caches[str]
  if (!res) {
    let d = {
      sql: 134679330,
      version: '4.067',
      to_airport_code: airport_code,
      min_hh,
      max_hh,
    }
    if (!min_hh) {
      delete d.min_hh
      delete d.max_hh
    }
    res = await fetchData({
      url,
      method: 'POST',
      data: d
    })
    caches[str] = res
  }
  return res
}



async function insertAndUpdate(url, pricing_str, newFleetId) {
  let updateD = {
    sql: 134678780,
    version: '1.0',
    pricing_str,
    new_fleet_id: newFleetId
  }

  // insert into service_area_pricing (service_area_id,pricing,effective_at,expire_at) 
  // values  ({{new_fleet_id}},'{{pricing_str}}','2024-04-08 05:05:00','2037-12-31 23:59:59' );
  // update fleet set service_area_pricing_id = last_insert_id() where id = {{new_fleet_id}} limit 1;

  let res = await fetchData({
    url,
    method: 'POST',
    data: updateD,
    desc: 'update json'
  })

  return res
}
// -------------have cache -----------------



const googleJsKey = 'AIzaSyCaAk67K9PyOQ5yuejv1xZGc7KOuKLOAUs'



async function getAddrFromLatLng(latlng) {
  let { lat, lng } = latlng
  let str = `${lat}-${lng}`
  let formatAddress = caches[str]
  if (!formatAddress) {
    let url = `https://maps.googleapis.com/maps/api/geocode/json`
    let res = await fetchData({
      url,
      method: 'GET',
      data: {
        latlng: `${lat},${lng}`,
        key: googleJsKey
      }
    })
    let results = res?.results || []
    formatAddress = results[0]?.formatted_address || ''
    caches[str] = formatAddress
  }
  return formatAddress
}



function isMSbrowser() {
  const userAgent = window.navigator.userAgent
  return userAgent.indexOf('Edge') !== -1 || userAgent.indexOf('Trident') !== -1
}

function format(data) {
  return String(data).replace(/"/g, '""').replace(/(^[\s\S]*$)/, '"$1"')
}

function saveCSV(title, head, data) {
  let wordSeparator = ','
  let lineSeparator = '\n'
  let reTitle = title + '.csv'
  let headBOM = '\ufeff'
  let headStr = head ? head.map(item => format(item)).join(wordSeparator) + lineSeparator : ''
  let dataStr = data ? data.map(row => row.map(item => format(item)).join(wordSeparator)).join(lineSeparator) : ''

  return isMSbrowser()
    ? new Promise(resolve => { // Edge、IE11
      let blob = new Blob([headBOM + headStr + dataStr], { type: 'text/plain;charset=utf-8' })
      window.navigator.msSaveBlob(blob, reTitle)
      resolve()
    })
    : new Promise(resolve => { // Chrome、Firefox
      let a = document.createElement('a')
      a.href = 'data:text/csv;charset=utf-8,' + headBOM + encodeURIComponent(headStr + dataStr)
      a.download = reTitle
      a.click()
      resolve()
    })
}

function getStandardDateTime() {
  let date = new Date()
  let t = date.toLocaleString('zh-CN')
  let arr = t.split(' ')
  let dateArr = arr[0].split('/')
  let [y, m, d] = dateArr
  if (m < 10) {
    m = `0${m}`
  }
  if (d < 10) {
    d = `0${d}`
  }
  let str = `${y}-${m}-${d} ${arr[1]}`
  return str
}


async function getRouteById(url, id) {
  let res = await fetchData({
    url,
    method: 'POST',
    data: {
      sql: 134679330,
      version: '4.030',
      id
    }
  })

  return res
}



async function getOtherFleetSvcId(url, svcId, parent_fleet_id = 15) {
  // select * from airport_fleet where  airport in (select  airport from airport_fleet where fleet_id = {{svcId}} ) and parent_fleet_id = {{parent_fleet_id}}
  let d = {
    sql: 134678983,
    version: '1.0',
    svcId,
    parent_fleet_id
  }

  let res = await fetchData({
    url,
    method: "POST",
    data: d
  })

  return res.fleet_id
}


function isIntersect(p1, q1, p2, q2) {
  // 辅助函数：计算向量 (p, q) 和 (r, s) 的叉积
  function crossProduct(p, q, r) {
    return (q.lat - p.lat) * (r.lng - p.lng) - (q.lng - p.lng) * (r.lat - p.lat);
  }

  // 检查 (p1, q1) 和 (p2, q2) 是否相交
  const d1 = crossProduct(p2, q2, p1);
  const d2 = crossProduct(p2, q2, q1);
  const d3 = crossProduct(p1, q1, p2);
  const d4 = crossProduct(p1, q1, q2);

  // 检查是否跨越
  if ((d1 * d2 < 0) && (d3 * d4 < 0)) {
    return true;
  }

  // 检查是否共线重叠
  function isOnSegment(p, q, r) {
    return Math.min(p.lat, q.lat) <= r.lat && r.lat <= Math.max(p.lat, q.lat) &&
      Math.min(p.lng, q.lng) <= r.lng && r.lng <= Math.max(p.lng, q.lng);
  }

  if (d1 === 0 && isOnSegment(p2, q2, p1)) return true;
  if (d2 === 0 && isOnSegment(p2, q2, q1)) return true;
  if (d3 === 0 && isOnSegment(p1, q1, p2)) return true;
  if (d4 === 0 && isOnSegment(p1, q1, q2)) return true;

  return false;
}

// 判断多边形是否有相交的边
function hasSelfIntersect(polygon) {
  const n = polygon.length;
  for (let i = 0; i < n; i++) {
    const p1 = polygon[i];
    const q1 = polygon[(i + 1) % n];
    for (let j = i + 1; j < n; j++) {
      const p2 = polygon[j];
      const q2 = polygon[(j + 1) % n];
      // 忽略相邻边的相交
      if (Math.abs(i - j) === 1 || (i === 0 && j === n - 1) || (i === n - 1 && j === 0)) {
        continue;
      }
      if (isIntersect(p1, q1, p2, q2)) {
        return true;
      }
    }
  }
  return false;
}

function polygonCheck(zones, zoneName) {
  for (let item of zones) {
    let { polygons, name } = item
    if (name != zoneName) continue
    if (polygons) {
      let flag = hasSelfIntersect(polygons)
      if (flag) return
    }
  }
  return true
}

function getDemandSupply(partner_id) {
  let supply_fleet_id = 45
  let demand_fleet_id = 15
  switch (partner_id) {
    case 2621:
      supply_fleet_id = 61654
      demand_fleet_id = 24337
      break;
    case 3:
      supply_fleet_id = 51488
      demand_fleet_id = 53422
      break;

    default:
      supply_fleet_id = 45
      demand_fleet_id = 15
      break;
  }

  return { supply_fleet_id, demand_fleet_id }
}


function getPatnerInfo(partnerId, stage) {
  let partnerInfo = {}
  let isProd = stage.toUpperCase() == 'PROD'
  switch (partnerId) {
    case 3:
      partnerInfo = {
        parentFleetId: isProd ? 51488 : 27672,
        parentFleetName: '3_elife',
        platform_name: 'Mozio',
        partner_id: 3,
        demand_fleet_id: 53422,
        supply_fleet_id: 51488
      }
      break;
    case 2621:
      partnerInfo = {
        parentFleetId: isProd ? 61654 : 60924,
        platform_name: 'China Ctrip API',
        parentFleetName: 'chinaCtripAPI',
        partner_id: 2621,
        demand_fleet_id: 24337,
        supply_fleet_id: 61654
      }
      break;
    case 2692:
      partnerInfo = {
        parentFleetId: isProd ? 67743 : 62294,
        platform_name: 'emergingTravelGroup',
        partner_id: 2692,
        demand_fleet_id: 57395,
        supply_fleet_id: 67743
      }
      break;
    case 28:
      partnerInfo = {
        parentFleetId: isProd ? 78568 : 64566,
        platform_name: 'klookSupply',
        partner_id: 28,
        demand_fleet_id: 1771,
        supply_fleet_id: 78568
      }
      break;
    case 5:
      partnerInfo = {
        parentFleetId: isProd ? 72105 : 63369,
        platform_name: 'cityAirportTaxis',
        parentFleetName: 'CityAirportTaxisSupply',
        partner_id: 5,
        demand_fleet_id: isProd ? 193 : 125,
        supply_fleet_id:  isProd ? 72105 : 63369,
      }
      break;
    case 2:
      partnerInfo = {
        parentFleetId: isProd ? 85191 : 65099,
        platform_name: 'booking',
        parentFleetName: 'bookingSupply',
        partner_id: 2,
        demand_fleet_id: 18,
        supply_fleet_id: 85191
      }
      break;
    case 4:
      partnerInfo = {
        parentFleetId: isProd ? 75362 : 63625,
        platform_name: 'Jayride',
        parentFleetName: 'jayrideSupply',
        partner_id: 4,
        demand_fleet_id: 194,
        supply_fleet_id: 75362
      }
      break;
    case 2690:
      partnerInfo = {
        parentFleetId: isProd ? 54928 : 45099,
        platform_name: 'Supply Cost',
        partner_id: 2690,
        demand_fleet_id: 56745,
        supply_fleet_id: 15
      }
      break;
    case 2588:
      partnerInfo = {
        parentFleetId: isProd ? 89496 : 65579,
        parentFleetName: 'hoppaSupply',
        platform_name: 'Hoppa',
        partner_id: 2588,
        demand_fleet_id: 11104,
        supply_fleet_id: 89496,
      }
      break;
    case 33:
      partnerInfo = {
        parentFleetId: isProd ? 82594 : 64935,
        platform_name: 'Almosafer',
        parentFleetName: 'almosaferSupply',
        partner_id: 33,
        demand_fleet_id: 78524,
        supply_fleet_id: 82594
      }
    case 2599:
      partnerInfo = {
        parentFleetId: isProd ? 15 : 40,
        platform_name: 'Servantrip',
        parentFleetName: 'Servantrip',
        partner_id: 2599,
        demand_fleet_id: 18426,
        supply_fleet_id: 15
      }
      break;
    case 2693:
      partnerInfo = {
        parentFleetId: isProd ? 15 : 40,
        platform_name: 'Traveloka',
        parentFleetName: 'TravelokaSupply',
        partner_id: 2693,
        demand_fleet_id: 58057,
        supply_fleet_id: 15
      }
      break;
    case 13:
      partnerInfo = {
        parentFleetId: isProd ? 15 : 40,
        platform_name: 'Elife',
        parentFleetName: 'Elife',
        partner_id: 13,
        demand_fleet_id: isProd ? 239 : 718,
        supply_fleet_id: isProd ? 15 : 40
      }
      break;
    default:
      break;
  }

  return partnerInfo
}

let _componentData = {
  caches: {}, // Cache data
  curPartnerSvcData: {}, // partner , current service area data
  predictionsCache: {}, // Cache search address
  originLatLng: { //initial bound lat and lng is sfo's
    boundLat: 37.6213129,
    boundLng: -122.3789554,
    boundRadius: 200000
  }
}

async function getAddrList(keywords = 'SFO') {
  if (!keywords) {
    return []
  }

  let list = _componentData.predictionsCache[keywords]
  if (list) {
    return list
  }

  let { boundLat, boundLng, sessionToken, boundRadius } = _componentData.originLatLng
  let url = `https://388bivap71.execute-api.us-east-2.amazonaws.com/prod/maps/places/auto-comp`

  let d = {
    input_text: keywords,
    location: `${boundLat},${boundLng}`,
    radius: boundRadius
  }
  if (sessionToken) {
    d[`&session_token`] = sessionToken
  }

  let res = await fetchData({
    url, data: d
  })
  if (!res) return
  let { session_token } = res
  _componentData.originLatLng.sessionToken = session_token
  list = res.predictions.predictions

  _componentData.predictionsCache[keywords] = list
  return list
}

async function getDetailByPlaceId(id) {
  if (_componentData.caches[id]) {
    return _componentData.caches[id]
  }
  let url = `https://388bivap71.execute-api.us-east-2.amazonaws.com/prod/maps/places/id`
  let { place_detail } = await fetchData({
    url,
    data: { google_place_id: id }
  })
  let { status } = place_detail

  if (status == 'OK') {
    let { result: { formatted_address, name: localName, geometry: { location } } } = place_detail

    let val = `${localName} ${formatted_address}`
    if (formatted_address.startsWith(localName)) {
      val = formatted_address
    }
    // this.elm.value = val

    let { lat, lng, } = location
    let t = typeof lat === 'number' ? lat : lat()
    let g = typeof lng === 'number' ? lng : lng()

    _componentData.originLatLng.boundLat = lat
    _componentData.originLatLng.boundLng = lng
    _componentData.caches[id] = { lat: t, lng: g, name: val }

    return { lat: t, lng: g, name: val }
  }

}

async function getPriceByLatLng(d) {
  let { from_lat,
    from_lng,
    to_lat,
    to_lng,
    demand_fleet_id,
    supply_fleet_id } = d

  let str = `${from_lat}-${from_lng}-${to_lat}-${to_lng}-${demand_fleet_id}-${supply_fleet_id}`
  let res = _componentData.caches[str]

  if (!res) {
    let url = 'https://k3zdvi12m6.execute-api.us-east-2.amazonaws.com/prod/ride-pricings'
    let results = await fetchData({
      url,
      method: 'GET',
      data: d
    })
    res = results?.fleets || []
    _componentData.caches[str] = res
  }

  return res
}


function fetchData({
  url = '',
  data = {},
  method = 'GET',
  // isShowLoading = true
} = {}) {
  method = method.toUpperCase();
  data['req_id'] = this.uuid()

  if (method == 'GET') {
    let dataStr = '';
    Object.keys(data).forEach(key => {
      dataStr += key + '=' + data[key] + '&';
    })
    if (dataStr !== '') {
      dataStr = dataStr.substring(0, dataStr.lastIndexOf('&'));
      url = url + '?' + dataStr;
    }
  }
  let requestConfig = {
    // credentials: 'same-origin',
    method,
    headers: {
      'Accept': 'application/json',
      // 'Content-method': 'application/json'
    },
    // mode: "cors", // same-origin，no-cors（default） cores;
    // cache: "force-cache" // default 、 no-store 、 reload 、 no-cache 、 force-cache 、 only-if-cached 
  }

  if (method == 'POST') {
    Object.defineProperty(requestConfig, 'body', {
      value: JSON.stringify(data)
    })
  }
  return fetch(url, requestConfig).then(async (response) => {
    const data = await response.json()
    if (response.ok && response.status === 200) {
      return Promise.resolve(data)
    } else {
      let { errMsg } = data
      return Promise.reject(null)
    }
  })
    .catch((error) => {
      console.log(error);
    })
}
function uuid() {
  function S4() {
    return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
  }
  return S4() + S4() + '-' + S4() + '-' + S4() + '-' + S4() + '-' + S4() + S4() + S4();
}


let urlProd = `https://ujrfp99zs9.execute-api.us-east-2.amazonaws.com/upncoming/sql-templates/run?ses=${ses}`
let urlDev = `https://jqwys3p5nk.execute-api.us-east-2.amazonaws.com/dev/sql-template/run?ses=${sesDev}`


let vehicleList = [
  {
    "vehicle_id": 1,
    "vehicle_name": "Sedan",
    "o_max_passenger": 3,
    "o_maker": "Toyota",
    "o_model": "Camry",
    "o_image_url": "https://elifelimo.s3.us-east-2.amazonaws.com/art/vehicle/sm/sedan.jpg",
    "o_image_url_2": "https://elifelimo.s3.us-east-2.amazonaws.com/art/home/vehicle-classes/sedan.png",
    "o_max_luggage": 3,
    "vm_id": 638,
    "maker": "Toyota",
    "model": "Corolla",
    "max_passenger": 3,
    "max_luggage": 3,
    "image_url_1": "",
    "image_url_2": "",
    "maker_txt_id": 3273,
    "model_txt_id": 3274,
    "seq_front": 1
  },
  {
    "vehicle_id": 121,
    "vehicle_name": "Premium Shared Shuttle",
    "o_max_passenger": 1,
    "o_maker": "Shared",
    "o_model": "Bus",
    "o_image_url": "https://elifelimo.s3.us-east-2.amazonaws.com/art/vehicle/sm/Toyota-Coaster.jpg",
    "o_image_url_2": "https://elifelimo.s3.us-east-2.amazonaws.com/art/home/vehicle-classes/Toyota-Coaster.jpg",
    "o_max_luggage": 1,
    "vm_id": null,
    "maker": null,
    "model": null,
    "max_passenger": null,
    "max_luggage": null,
    "image_url_1": null,
    "image_url_2": null,
    "maker_txt_id": null,
    "model_txt_id": null,
    "seq_front": 1
  },
  {
    "vehicle_id": 120,
    "vehicle_name": "Speedy Shared Shuttle",
    "o_max_passenger": 1,
    "o_maker": "Shared",
    "o_model": "Bus",
    "o_image_url": "https://elifelimo.s3.us-east-2.amazonaws.com/art/vehicle/sm/Toyota-Coaster.jpg",
    "o_image_url_2": "https://elifelimo.s3.us-east-2.amazonaws.com/art/home/vehicle-classes/Toyota-Coaster.jpg",
    "o_max_luggage": 1,
    "vm_id": null,
    "maker": null,
    "model": null,
    "max_passenger": null,
    "max_luggage": null,
    "image_url_1": null,
    "image_url_2": null,
    "maker_txt_id": null,
    "model_txt_id": null,
    "seq_front": 1
  },
  {
    "vehicle_id": 119,
    "vehicle_name": "Shared Shuttle",
    "o_max_passenger": 1,
    "o_maker": "Shared",
    "o_model": "Bus",
    "o_image_url": "https://elifelimo.s3.us-east-2.amazonaws.com/art/vehicle/sm/Toyota-Coaster.jpg",
    "o_image_url_2": "https://elifelimo.s3.us-east-2.amazonaws.com/art/home/vehicle-classes/Toyota-Coaster.jpg",
    "o_max_luggage": 1,
    "vm_id": null,
    "maker": null,
    "model": null,
    "max_passenger": null,
    "max_luggage": null,
    "image_url_1": null,
    "image_url_2": null,
    "maker_txt_id": null,
    "model_txt_id": null,
    "seq_front": 1
  },
  {
    "vehicle_id": 110,
    "vehicle_name": "shuttle-7",
    "o_max_passenger": 7,
    "o_maker": "minivan",
    "o_model": "7 pax",
    "o_image_url": "https://elifelimo.s3.us-east-2.amazonaws.com/art/vehicle/sm/Ford-Transit.jpg",
    "o_image_url_2": "https://elifelimo.s3.us-east-2.amazonaws.com/art/home/vehicle-classes/Ford-Transit.jpg",
    "o_max_luggage": 7,
    "vm_id": null,
    "maker": null,
    "model": null,
    "max_passenger": null,
    "max_luggage": null,
    "image_url_1": null,
    "image_url_2": null,
    "maker_txt_id": null,
    "model_txt_id": null,
    "seq_front": 1
  },
  {
    "vehicle_id": 109,
    "vehicle_name": "Mini Sedan",
    "o_max_passenger": 3,
    "o_maker": "Toyota",
    "o_model": "Corolla",
    "o_image_url": "https://elifelimo.s3.us-east-2.amazonaws.com/art/vehicle/sm/Toyota-Corolla-api.jpg",
    "o_image_url_2": "https://elifelimo.s3.us-east-2.amazonaws.com/art/home/vehicle-classes/Toyota-Corolla-home.jpg",
    "o_max_luggage": 3,
    "vm_id": null,
    "maker": null,
    "model": null,
    "max_passenger": null,
    "max_luggage": null,
    "image_url_1": null,
    "image_url_2": null,
    "maker_txt_id": null,
    "model_txt_id": null,
    "seq_front": 1
  },
  {
    "vehicle_id": 108,
    "vehicle_name": "Black Minibus-8",
    "o_max_passenger": 8,
    "o_maker": "Ford",
    "o_model": "Transit",
    "o_image_url": "https://elifelimo.s3.us-east-2.amazonaws.com/art/vehicle/sm/minibus-8.jpg",
    "o_image_url_2": "https://elifelimo.s3.us-east-2.amazonaws.com/art/home/vehicle-classes/minibus8.png",
    "o_max_luggage": 8,
    "vm_id": null,
    "maker": null,
    "model": null,
    "max_passenger": null,
    "max_luggage": null,
    "image_url_1": null,
    "image_url_2": null,
    "maker_txt_id": null,
    "model_txt_id": null,
    "seq_front": 1
  },
  {
    "vehicle_id": 107,
    "vehicle_name": "Black Business Minivan",
    "o_max_passenger": 5,
    "o_maker": "Toyota",
    "o_model": "Sienna",
    "o_image_url": "https://elifelimo.s3.us-east-2.amazonaws.com/art/vehicle/sm/businessminivan.jpg",
    "o_image_url_2": "https://elifelimo.s3.us-east-2.amazonaws.com/art/home/vehicle-classes/businessminivan.png",
    "o_max_luggage": 5,
    "vm_id": null,
    "maker": null,
    "model": null,
    "max_passenger": null,
    "max_luggage": null,
    "image_url_1": null,
    "image_url_2": null,
    "maker_txt_id": null,
    "model_txt_id": null,
    "seq_front": 1
  },
  {
    "vehicle_id": 12,
    "vehicle_name": "Comfort Sedan",
    "o_max_passenger": 3,
    "o_maker": "Toyota",
    "o_model": "Camry",
    "o_image_url": "https://elifelimo.s3.us-east-2.amazonaws.com/art/vehicle/sm/Toyota-Camry.jpg",
    "o_image_url_2": "https://elifelimo.s3.us-east-2.amazonaws.com/art/home/vehicle-classes/Toyota-Camry.jpg",
    "o_max_luggage": 3,
    "vm_id": null,
    "maker": null,
    "model": null,
    "max_passenger": null,
    "max_luggage": null,
    "image_url_1": null,
    "image_url_2": null,
    "maker_txt_id": null,
    "model_txt_id": null,
    "seq_front": 1
  },
  {
    "vehicle_id": 106,
    "vehicle_name": "Black MPV-5",
    "o_max_passenger": 5,
    "o_maker": "Toyota",
    "o_model": "Sienna",
    "o_image_url": "https://elifelimo.s3.us-east-2.amazonaws.com/art/vehicle/sm/mpv-5.jpg",
    "o_image_url_2": "https://elifelimo.s3.us-east-2.amazonaws.com/art/home/vehicle-classes/mpv5.png",
    "o_max_luggage": 5,
    "vm_id": null,
    "maker": null,
    "model": null,
    "max_passenger": null,
    "max_luggage": null,
    "image_url_1": null,
    "image_url_2": null,
    "maker_txt_id": null,
    "model_txt_id": null,
    "seq_front": 1
  },
  {
    "vehicle_id": 105,
    "vehicle_name": "Black MPV-4",
    "o_max_passenger": 4,
    "o_maker": "Toyota",
    "o_model": "Highlander",
    "o_image_url": "https://elifelimo.s3.us-east-2.amazonaws.com/art/vehicle/sm/mpv-4.jpg",
    "o_image_url_2": "https://elifelimo.s3.us-east-2.amazonaws.com/art/home/vehicle-classes/mpv4.png",
    "o_max_luggage": 4,
    "vm_id": null,
    "maker": null,
    "model": null,
    "max_passenger": null,
    "max_luggage": null,
    "image_url_1": null,
    "image_url_2": null,
    "maker_txt_id": null,
    "model_txt_id": null,
    "seq_front": 1
  },
  {
    "vehicle_id": 104,
    "vehicle_name": "Black Sedan",
    "o_max_passenger": 3,
    "o_maker": "Toyota",
    "o_model": "Camry",
    "o_image_url": "https://elifelimo.s3.us-east-2.amazonaws.com/art/vehicle/sm/sedan.jpg",
    "o_image_url_2": "https://elifelimo.s3.us-east-2.amazonaws.com/art/home/vehicle-classes/sedan.png",
    "o_max_luggage": 3,
    "vm_id": null,
    "maker": null,
    "model": null,
    "max_passenger": null,
    "max_luggage": null,
    "image_url_1": null,
    "image_url_2": null,
    "maker_txt_id": null,
    "model_txt_id": null,
    "seq_front": 1
  },
  {
    "vehicle_id": 111,
    "vehicle_name": "shuttle-9",
    "o_max_passenger": 9,
    "o_maker": "minivan",
    "o_model": "9 pax",
    "o_image_url": "https://elifelimo.s3.us-east-2.amazonaws.com/art/vehicle/sm/Ford-Transit.jpg",
    "o_image_url_2": "https://elifelimo.s3.us-east-2.amazonaws.com/art/home/vehicle-classes/Ford-Transit.jpg",
    "o_max_luggage": 9,
    "vm_id": null,
    "maker": null,
    "model": null,
    "max_passenger": null,
    "max_luggage": null,
    "image_url_1": null,
    "image_url_2": null,
    "maker_txt_id": null,
    "model_txt_id": null,
    "seq_front": 2
  },
  {
    "vehicle_id": 41,
    "vehicle_name": "EV Sedan",
    "o_max_passenger": 3,
    "o_maker": "Chevy",
    "o_model": "Bolt EUV",
    "o_image_url": "https://elifelimo.s3.us-east-2.amazonaws.com/art/home/vehicle-classes/ev-sedan.png",
    "o_image_url_2": "https://elifelimo.s3.us-east-2.amazonaws.com/art/home/vehicle-classes/ev-sedan.png",
    "o_max_luggage": 3,
    "vm_id": null,
    "maker": null,
    "model": null,
    "max_passenger": null,
    "max_luggage": null,
    "image_url_1": null,
    "image_url_2": null,
    "maker_txt_id": null,
    "model_txt_id": null,
    "seq_front": 2
  },
  {
    "vehicle_id": 2,
    "vehicle_name": "Business Sedan",
    "o_max_passenger": 3,
    "o_maker": "Lincoln",
    "o_model": "Continental",
    "o_image_url": "https://elifelimo.s3.us-east-2.amazonaws.com/art/vehicle/sm/besiness-sedan.jpg",
    "o_image_url_2": "https://elifelimo.s3.us-east-2.amazonaws.com/art/home/vehicle-classes/businesssedan.png",
    "o_max_luggage": 3,
    "vm_id": 639,
    "maker": "Mercedes",
    "model": "E Class",
    "max_passenger": 3,
    "max_luggage": 3,
    "image_url_1": "",
    "image_url_2": "",
    "maker_txt_id": 3281,
    "model_txt_id": 3282,
    "seq_front": 3
  },
  {
    "vehicle_id": 112,
    "vehicle_name": "shuttle-10",
    "o_max_passenger": 10,
    "o_maker": "minibus",
    "o_model": "10 pax",
    "o_image_url": "https://elifelimo.s3.us-east-2.amazonaws.com/art/vehicle/sm/Ford-Transit.jpg",
    "o_image_url_2": "https://elifelimo.s3.us-east-2.amazonaws.com/art/home/vehicle-classes/Ford-Transit.jpg",
    "o_max_luggage": 10,
    "vm_id": null,
    "maker": null,
    "model": null,
    "max_passenger": null,
    "max_luggage": null,
    "image_url_1": null,
    "image_url_2": null,
    "maker_txt_id": null,
    "model_txt_id": null,
    "seq_front": 3
  },
  {
    "vehicle_id": 14,
    "vehicle_name": "Luxury Sedan",
    "o_max_passenger": 3,
    "o_maker": "Mercedes Benz",
    "o_model": "e350",
    "o_image_url": "https://elifelimo.s3.us-east-2.amazonaws.com/art/vehicle/sm/Luxury-Sedan.png",
    "o_image_url_2": "https://elifelimo.s3.us-east-2.amazonaws.com/art/home/vehicle-classes/Luxury-Sedan.png",
    "o_max_luggage": 3,
    "vm_id": null,
    "maker": null,
    "model": null,
    "max_passenger": null,
    "max_luggage": null,
    "image_url_1": null,
    "image_url_2": null,
    "maker_txt_id": null,
    "model_txt_id": null,
    "seq_front": 3
  },
  {
    "vehicle_id": 42,
    "vehicle_name": "EV Business Sedan",
    "o_max_passenger": 3,
    "o_maker": "Tesla",
    "o_model": "Model 3",
    "o_image_url": "https://elifelimo.s3.us-east-2.amazonaws.com/art/home/vehicle-classes/ev-business-sedan.png",
    "o_image_url_2": "https://elifelimo.s3.us-east-2.amazonaws.com/art/home/vehicle-classes/ev-business-sedan.png",
    "o_max_luggage": 3,
    "vm_id": null,
    "maker": null,
    "model": null,
    "max_passenger": null,
    "max_luggage": null,
    "image_url_1": null,
    "image_url_2": null,
    "maker_txt_id": null,
    "model_txt_id": null,
    "seq_front": 4
  },
  {
    "vehicle_id": 113,
    "vehicle_name": "shuttle-14",
    "o_max_passenger": 14,
    "o_maker": "minibus",
    "o_model": "14 pax",
    "o_image_url": "https://elifelimo.s3.us-east-2.amazonaws.com/art/vehicle/sm/Toyota-Coaster.jpg",
    "o_image_url_2": "https://elifelimo.s3.us-east-2.amazonaws.com/art/home/vehicle-classes/Toyota-Coaster.jpg",
    "o_max_luggage": 14,
    "vm_id": null,
    "maker": null,
    "model": null,
    "max_passenger": null,
    "max_luggage": null,
    "image_url_1": null,
    "image_url_2": null,
    "maker_txt_id": null,
    "model_txt_id": null,
    "seq_front": 4
  },
  {
    "vehicle_id": 114,
    "vehicle_name": "shuttle-50",
    "o_max_passenger": 50,
    "o_maker": "bus",
    "o_model": "50 pax ",
    "o_image_url": "https://elifelimo.s3.us-east-2.amazonaws.com/art/vehicle/sm/Yutong-36.jpg",
    "o_image_url_2": "https://elifelimo.s3.us-east-2.amazonaws.com/art/home/vehicle-classes/Yutong-36.jpg",
    "o_max_luggage": 50,
    "vm_id": null,
    "maker": null,
    "model": null,
    "max_passenger": null,
    "max_luggage": null,
    "image_url_1": null,
    "image_url_2": null,
    "maker_txt_id": null,
    "model_txt_id": null,
    "seq_front": 5
  },
  {
    "vehicle_id": 40,
    "vehicle_name": "First Class Sedan",
    "o_max_passenger": 3,
    "o_maker": "Mercedes",
    "o_model": "S550",
    "o_image_url": "https://elifelimo.s3.us-east-2.amazonaws.com/art/vehicle/sm/first-class.jpg",
    "o_image_url_2": "https://elifelimo.s3.us-east-2.amazonaws.com/art/home/vehicle-classes/firstclass.png",
    "o_max_luggage": 3,
    "vm_id": 640,
    "maker": "Mercedes",
    "model": "S Class",
    "max_passenger": 3,
    "max_luggage": 3,
    "image_url_1": "",
    "image_url_2": "",
    "maker_txt_id": 3289,
    "model_txt_id": 3290,
    "seq_front": 5
  },
  {
    "vehicle_id": 101,
    "vehicle_name": "Black First Class Sedan",
    "o_max_passenger": 3,
    "o_maker": "Mercedes",
    "o_model": "S-Class",
    "o_image_url": "https://elifelimo.s3.us-east-2.amazonaws.com/art/vehicle/sm/first-class.jpg",
    "o_image_url_2": "https://elifelimo.s3.us-east-2.amazonaws.com/art/home/vehicle-classes/firstclass.png",
    "o_max_luggage": 3,
    "vm_id": null,
    "maker": null,
    "model": null,
    "max_passenger": null,
    "max_luggage": null,
    "image_url_1": null,
    "image_url_2": null,
    "maker_txt_id": null,
    "model_txt_id": null,
    "seq_front": 6
  },
  {
    "vehicle_id": 115,
    "vehicle_name": "speedy shuttle-7",
    "o_max_passenger": 7,
    "o_maker": "minivan",
    "o_model": "7 pax",
    "o_image_url": "https://elifelimo.s3.us-east-2.amazonaws.com/art/vehicle/sm/Ford-Transit.jpg",
    "o_image_url_2": "https://elifelimo.s3.us-east-2.amazonaws.com/art/home/vehicle-classes/Ford-Transit.jpg",
    "o_max_luggage": 7,
    "vm_id": null,
    "maker": null,
    "model": null,
    "max_passenger": null,
    "max_luggage": null,
    "image_url_1": null,
    "image_url_2": null,
    "maker_txt_id": null,
    "model_txt_id": null,
    "seq_front": 6
  },
  {
    "vehicle_id": 102,
    "vehicle_name": "Black Business Sedan",
    "o_max_passenger": 3,
    "o_maker": "Lincoln",
    "o_model": "Continental",
    "o_image_url": "https://elifelimo.s3.us-east-2.amazonaws.com/art/vehicle/sm/besiness-sedan.jpg",
    "o_image_url_2": "https://elifelimo.s3.us-east-2.amazonaws.com/art/home/vehicle-classes/businesssedan.png",
    "o_max_luggage": 3,
    "vm_id": null,
    "maker": null,
    "model": null,
    "max_passenger": null,
    "max_luggage": null,
    "image_url_1": null,
    "image_url_2": null,
    "maker_txt_id": null,
    "model_txt_id": null,
    "seq_front": 6
  },
  {
    "vehicle_id": 103,
    "vehicle_name": "Black Business SUV",
    "o_max_passenger": 5,
    "o_maker": "Lincoln",
    "o_model": "Navigator",
    "o_image_url": "https://elifelimo.s3.us-east-2.amazonaws.com/art/vehicle/sm/businessminivan.jpg",
    "o_image_url_2": "https://elifelimo.s3.us-east-2.amazonaws.com/art/home/vehicle-classes/businessmpv.png",
    "o_max_luggage": 5,
    "vm_id": null,
    "maker": null,
    "model": null,
    "max_passenger": null,
    "max_luggage": null,
    "image_url_1": null,
    "image_url_2": null,
    "maker_txt_id": null,
    "model_txt_id": null,
    "seq_front": 6
  },
  {
    "vehicle_id": 43,
    "vehicle_name": "EV First Class Sedan",
    "o_max_passenger": 3,
    "o_maker": "Tesla",
    "o_model": "Model S",
    "o_image_url": "https://elifelimo.s3.us-east-2.amazonaws.com/art/home/vehicle-classes/ev-firstclass.png",
    "o_image_url_2": "https://elifelimo.s3.us-east-2.amazonaws.com/art/home/vehicle-classes/ev-firstclass.png",
    "o_max_luggage": 3,
    "vm_id": null,
    "maker": null,
    "model": null,
    "max_passenger": null,
    "max_luggage": null,
    "image_url_1": null,
    "image_url_2": null,
    "maker_txt_id": null,
    "model_txt_id": null,
    "seq_front": 7
  },
  {
    "vehicle_id": 116,
    "vehicle_name": "speedy shuttle-9",
    "o_max_passenger": 9,
    "o_maker": "minivan",
    "o_model": "9 pax",
    "o_image_url": "https://elifelimo.s3.us-east-2.amazonaws.com/art/vehicle/sm/Ford-Transit.jpg",
    "o_image_url_2": "https://elifelimo.s3.us-east-2.amazonaws.com/art/home/vehicle-classes/Ford-Transit.jpg",
    "o_max_luggage": 9,
    "vm_id": null,
    "maker": null,
    "model": null,
    "max_passenger": null,
    "max_luggage": null,
    "image_url_1": null,
    "image_url_2": null,
    "maker_txt_id": null,
    "model_txt_id": null,
    "seq_front": 7
  },
  {
    "vehicle_id": 44,
    "vehicle_name": "Rolls Royce Ghost",
    "o_max_passenger": 2,
    "o_maker": "Rolls Royce",
    "o_model": "Ghost",
    "o_image_url": "https://elifelimo.s3.us-east-2.amazonaws.com/art/vehicle/sm/rolls-royce-ghost.jpg",
    "o_image_url_2": "https://elifelimo.s3.us-east-2.amazonaws.com/art/home/vehicle-classes/rolls-royce-ghost.png",
    "o_max_luggage": 2,
    "vm_id": null,
    "maker": null,
    "model": null,
    "max_passenger": null,
    "max_luggage": null,
    "image_url_1": null,
    "image_url_2": null,
    "maker_txt_id": null,
    "model_txt_id": null,
    "seq_front": 8
  },
  {
    "vehicle_id": 117,
    "vehicle_name": "speedy shuttle-10",
    "o_max_passenger": 10,
    "o_maker": "minibus",
    "o_model": "10 pax",
    "o_image_url": "https://elifelimo.s3.us-east-2.amazonaws.com/art/vehicle/sm/Ford-Transit.jpg",
    "o_image_url_2": "https://elifelimo.s3.us-east-2.amazonaws.com/art/home/vehicle-classes/Ford-Transit.jpg",
    "o_max_luggage": 10,
    "vm_id": null,
    "maker": null,
    "model": null,
    "max_passenger": null,
    "max_luggage": null,
    "image_url_1": null,
    "image_url_2": null,
    "maker_txt_id": null,
    "model_txt_id": null,
    "seq_front": 8
  },
  {
    "vehicle_id": 45,
    "vehicle_name": "Rolls Royce Phantom",
    "o_max_passenger": 2,
    "o_maker": "Rolls Royce",
    "o_model": "Phantom",
    "o_image_url": "https://elifelimo.s3.us-east-2.amazonaws.com/art/vehicle/sm/rolls-royce-phantom.jpg",
    "o_image_url_2": "https://elifelimo.s3.us-east-2.amazonaws.com/art/home/vehicle-classes/rolls-royce-phantom.png",
    "o_max_luggage": 2,
    "vm_id": null,
    "maker": null,
    "model": null,
    "max_passenger": null,
    "max_luggage": null,
    "image_url_1": null,
    "image_url_2": null,
    "maker_txt_id": null,
    "model_txt_id": null,
    "seq_front": 9
  },
  {
    "vehicle_id": 118,
    "vehicle_name": "speedy shuttle-14",
    "o_max_passenger": 14,
    "o_maker": "minibus",
    "o_model": "14 pax",
    "o_image_url": "https://elifelimo.s3.us-east-2.amazonaws.com/art/vehicle/sm/Toyota-Coaster.jpg",
    "o_image_url_2": "https://elifelimo.s3.us-east-2.amazonaws.com/art/home/vehicle-classes/Toyota-Coaster.jpg",
    "o_max_luggage": 14,
    "vm_id": null,
    "maker": null,
    "model": null,
    "max_passenger": null,
    "max_luggage": null,
    "image_url_1": null,
    "image_url_2": null,
    "maker_txt_id": null,
    "model_txt_id": null,
    "seq_front": 9
  },
  {
    "vehicle_id": 46,
    "vehicle_name": "Bentley",
    "o_max_passenger": 2,
    "o_maker": "Bentley",
    "o_model": "Bentley",
    "o_image_url": "https://elifelimo.s3.us-east-2.amazonaws.com/art/vehicle/sm/bentley.jpg",
    "o_image_url_2": "https://elifelimo.s3.us-east-2.amazonaws.com/art/home/vehicle-classes/bentley.png",
    "o_max_luggage": 2,
    "vm_id": null,
    "maker": null,
    "model": null,
    "max_passenger": null,
    "max_luggage": null,
    "image_url_1": null,
    "image_url_2": null,
    "maker_txt_id": null,
    "model_txt_id": null,
    "seq_front": 10
  },
  {
    "vehicle_id": 47,
    "vehicle_name": "ClassicCar",
    "o_max_passenger": 2,
    "o_maker": "Classic",
    "o_model": "Classic",
    "o_image_url": "https://elifelimo.s3.us-east-2.amazonaws.com/art/vehicle/sm/classic-car.jpg",
    "o_image_url_2": "https://elifelimo.s3.us-east-2.amazonaws.com/art/home/vehicle-classes/classic-car.png",
    "o_max_luggage": 2,
    "vm_id": null,
    "maker": null,
    "model": null,
    "max_passenger": null,
    "max_luggage": null,
    "image_url_1": null,
    "image_url_2": null,
    "maker_txt_id": null,
    "model_txt_id": null,
    "seq_front": 11
  },
  {
    "vehicle_id": 6,
    "vehicle_name": "MPV-4",
    "o_max_passenger": 4,
    "o_maker": "Toyota",
    "o_model": "Highlander",
    "o_image_url": "https://elifelimo.s3.us-east-2.amazonaws.com/art/vehicle/sm/mpv-4.jpg",
    "o_image_url_2": "https://elifelimo.s3.us-east-2.amazonaws.com/art/home/vehicle-classes/mpv4.png",
    "o_max_luggage": 4,
    "vm_id": null,
    "maker": null,
    "model": null,
    "max_passenger": null,
    "max_luggage": null,
    "image_url_1": null,
    "image_url_2": null,
    "maker_txt_id": null,
    "model_txt_id": null,
    "seq_front": 12
  },
  {
    "vehicle_id": 3,
    "vehicle_name": "MPV-5",
    "o_max_passenger": 5,
    "o_maker": "Toyota",
    "o_model": "Sienna",
    "o_image_url": "https://elifelimo.s3.us-east-2.amazonaws.com/art/vehicle/sm/mpv-5.jpg",
    "o_image_url_2": "https://elifelimo.s3.us-east-2.amazonaws.com/art/home/vehicle-classes/mpv5.png",
    "o_max_luggage": 5,
    "vm_id": null,
    "maker": null,
    "model": null,
    "max_passenger": null,
    "max_luggage": null,
    "image_url_1": null,
    "image_url_2": null,
    "maker_txt_id": null,
    "model_txt_id": null,
    "seq_front": 13
  },
  {
    "vehicle_id": 13,
    "vehicle_name": "Business MPV-4",
    "o_max_passenger": 4,
    "o_maker": "INFINITI",
    "o_model": "QX60",
    "o_image_url": "https://elifelimo.s3.us-east-2.amazonaws.com/art/vehicle/sm/Business-MPV-4.png",
    "o_image_url_2": "https://elifelimo.s3.us-east-2.amazonaws.com/art/home/vehicle-classes/Business-MPV-4.png",
    "o_max_luggage": 4,
    "vm_id": null,
    "maker": null,
    "model": null,
    "max_passenger": null,
    "max_luggage": null,
    "image_url_1": null,
    "image_url_2": null,
    "maker_txt_id": null,
    "model_txt_id": null,
    "seq_front": 14
  },
  {
    "vehicle_id": 7,
    "vehicle_name": "MPV-6",
    "o_max_passenger": 6,
    "o_maker": "Toyota",
    "o_model": "Sienna",
    "o_image_url": "https://elifelimo.s3.us-east-2.amazonaws.com/art/vehicle/sm/MPV-6.jpg",
    "o_image_url_2": "https://elifelimo.s3.us-east-2.amazonaws.com/art/home/vehicle-classes/MPV-6.jpg",
    "o_max_luggage": 6,
    "vm_id": null,
    "maker": null,
    "model": null,
    "max_passenger": null,
    "max_luggage": null,
    "image_url_1": null,
    "image_url_2": null,
    "maker_txt_id": null,
    "model_txt_id": null,
    "seq_front": 14
  },
  {
    "vehicle_id": 48,
    "vehicle_name": "EV SUV",
    "o_max_passenger": 4,
    "o_maker": "Tesla",
    "o_model": "Model Y",
    "o_image_url": "https://elifelimo.s3.us-east-2.amazonaws.com/art/vehicle/sm/ev-suv.jpg",
    "o_image_url_2": "https://elifelimo.s3.us-east-2.amazonaws.com/art/home/vehicle-classes/ev-suv.png",
    "o_max_luggage": 4,
    "vm_id": null,
    "maker": null,
    "model": null,
    "max_passenger": null,
    "max_luggage": null,
    "image_url_1": null,
    "image_url_2": null,
    "maker_txt_id": null,
    "model_txt_id": null,
    "seq_front": 15
  },
  {
    "vehicle_id": 49,
    "vehicle_name": "EV Business SUV",
    "o_max_passenger": 4,
    "o_maker": "Tesla",
    "o_model": "Model X",
    "o_image_url": "https://elifelimo.s3.us-east-2.amazonaws.com/art/vehicle/sm/ev-business-suv.jpg",
    "o_image_url_2": "https://elifelimo.s3.us-east-2.amazonaws.com/art/home/vehicle-classes/ev-business-suv.png",
    "o_max_luggage": 4,
    "vm_id": 756,
    "maker": "Tesla",
    "model": "Model Y",
    "max_passenger": 4,
    "max_luggage": 4,
    "image_url_1": "",
    "image_url_2": "",
    "maker_txt_id": 4161,
    "model_txt_id": 4162,
    "seq_front": 16
  },
  {
    "vehicle_id": 100,
    "vehicle_name": "SUV",
    "o_max_passenger": 4,
    "o_maker": "Toyota",
    "o_model": "RAV4",
    "o_image_url": "https://elifelimo.s3.us-east-2.amazonaws.com/art/vehicle/sm/SUV.png",
    "o_image_url_2": "https://elifelimo.s3.us-east-2.amazonaws.com/art/home/vehicle-classes/SUV.png",
    "o_max_luggage": 4,
    "vm_id": null,
    "maker": null,
    "model": null,
    "max_passenger": null,
    "max_luggage": null,
    "image_url_1": null,
    "image_url_2": null,
    "maker_txt_id": null,
    "model_txt_id": null,
    "seq_front": 17
  },
  {
    "vehicle_id": 4,
    "vehicle_name": "Business SUV",
    "o_max_passenger": 5,
    "o_maker": "Lincoln",
    "o_model": "Navigator",
    "o_image_url": "https://elifelimo.s3.us-east-2.amazonaws.com/art/vehicle/sm/businessminivan.jpg",
    "o_image_url_2": "https://elifelimo.s3.us-east-2.amazonaws.com/art/home/vehicle-classes/businessmpv.png",
    "o_max_luggage": 5,
    "vm_id": 416,
    "maker": "Mercedes",
    "model": "V 250class",
    "max_passenger": 4,
    "max_luggage": 4,
    "image_url_1": "",
    "image_url_2": "",
    "maker_txt_id": 2121,
    "model_txt_id": 2122,
    "seq_front": 17
  },
  {
    "vehicle_id": 20,
    "vehicle_name": "Minivan",
    "o_max_passenger": 5,
    "o_maker": "Toyota",
    "o_model": "Sienna",
    "o_image_url": "",
    "o_image_url_2": "",
    "o_max_luggage": 5,
    "vm_id": null,
    "maker": null,
    "model": null,
    "max_passenger": null,
    "max_luggage": null,
    "image_url_1": null,
    "image_url_2": null,
    "maker_txt_id": null,
    "model_txt_id": null,
    "seq_front": 18
  },
  {
    "vehicle_id": 36,
    "vehicle_name": "Business Minivan",
    "o_max_passenger": 5,
    "o_maker": "Buick",
    "o_model": "GL8",
    "o_image_url": "https://elifelimo.s3.us-east-2.amazonaws.com/art/vehicle/sm/businessminivan.jpg",
    "o_image_url_2": "https://elifelimo.s3.us-east-2.amazonaws.com/art/home/vehicle-classes/businessminivan.png",
    "o_max_luggage": 5,
    "vm_id": 641,
    "maker": "Mercedes",
    "model": "V 250class",
    "max_passenger": 5,
    "max_luggage": 5,
    "image_url_1": "",
    "image_url_2": "",
    "maker_txt_id": 3297,
    "model_txt_id": 3298,
    "seq_front": 19
  },
  {
    "vehicle_id": 52,
    "vehicle_name": "School Minivan",
    "o_max_passenger": 4,
    "o_maker": "Toyota",
    "o_model": "Sienna",
    "o_image_url": "https://elifelimo.s3.us-east-2.amazonaws.com/art/vehicle/sm/school-minivan.jpg",
    "o_image_url_2": "https://elifelimo.s3.us-east-2.amazonaws.com/art/home/vehicle-classes/school-minivan.png",
    "o_max_luggage": 4,
    "vm_id": null,
    "maker": null,
    "model": null,
    "max_passenger": null,
    "max_luggage": null,
    "image_url_1": null,
    "image_url_2": null,
    "maker_txt_id": null,
    "model_txt_id": null,
    "seq_front": 20
  },
  {
    "vehicle_id": 50,
    "vehicle_name": "Wheelchair Van",
    "o_max_passenger": 1,
    "o_maker": "Toyota",
    "o_model": "Sienna",
    "o_image_url": "https://elifelimo.s3.us-east-2.amazonaws.com/art/vehicle/sm/wheelchair-van.jpg",
    "o_image_url_2": "https://elifelimo.s3.us-east-2.amazonaws.com/art/home/vehicle-classes/wheelchair-van.png",
    "o_max_luggage": 1,
    "vm_id": 326,
    "maker": "Toyota",
    "model": "Sienna",
    "max_passenger": 2,
    "max_luggage": 2,
    "image_url_1": "",
    "image_url_2": "",
    "maker_txt_id": 1545,
    "model_txt_id": 1546,
    "seq_front": 22
  },
  {
    "vehicle_id": 21,
    "vehicle_name": "6 Passenger Stretch Sedan",
    "o_max_passenger": 6,
    "o_maker": "Liconln",
    "o_model": "MKT or Chrsley",
    "o_image_url": "https://elifelimo.s3.us-east-2.amazonaws.com/art/vehicle/sm/stretch-limo-6.jpg",
    "o_image_url_2": "https://elifelimo.s3.us-east-2.amazonaws.com/art/home/vehicle-classes/stretch-limo-6.png",
    "o_max_luggage": 6,
    "vm_id": null,
    "maker": null,
    "model": null,
    "max_passenger": null,
    "max_luggage": null,
    "image_url_1": null,
    "image_url_2": null,
    "maker_txt_id": null,
    "model_txt_id": null,
    "seq_front": 23
  },
  {
    "vehicle_id": 22,
    "vehicle_name": "8 Passenger Stretch Sedan",
    "o_max_passenger": 8,
    "o_maker": "Liconln",
    "o_model": "MKT or Chrsley",
    "o_image_url": "https://elifelimo.s3.us-east-2.amazonaws.com/art/vehicle/sm/stretch-limo-8.jpg",
    "o_image_url_2": "https://elifelimo.s3.us-east-2.amazonaws.com/art/home/vehicle-classes/stretch-limo-8.png",
    "o_max_luggage": 8,
    "vm_id": null,
    "maker": null,
    "model": null,
    "max_passenger": null,
    "max_luggage": null,
    "image_url_1": null,
    "image_url_2": null,
    "maker_txt_id": null,
    "model_txt_id": null,
    "seq_front": 24
  },
  {
    "vehicle_id": 23,
    "vehicle_name": "10 Passenger Stretch Sedan",
    "o_max_passenger": 10,
    "o_maker": "Liconln",
    "o_model": "MKT or Chrsley",
    "o_image_url": "https://elifelimo.s3.us-east-2.amazonaws.com/art/vehicle/sm/stretch-limo-10.jpg",
    "o_image_url_2": "https://elifelimo.s3.us-east-2.amazonaws.com/art/home/vehicle-classes/stretch-limo-10.png",
    "o_max_luggage": 10,
    "vm_id": null,
    "maker": null,
    "model": null,
    "max_passenger": null,
    "max_luggage": null,
    "image_url_1": null,
    "image_url_2": null,
    "maker_txt_id": null,
    "model_txt_id": null,
    "seq_front": 25
  },
  {
    "vehicle_id": 24,
    "vehicle_name": "12 Passenger Stretch SUV",
    "o_max_passenger": 12,
    "o_maker": "Liconln",
    "o_model": "Navigator",
    "o_image_url": "https://elifelimo.s3.us-east-2.amazonaws.com/art/vehicle/sm/stretch-limo-12.jpg",
    "o_image_url_2": "https://elifelimo.s3.us-east-2.amazonaws.com/art/home/vehicle-classes/stretch-limo-12.png",
    "o_max_luggage": 12,
    "vm_id": null,
    "maker": null,
    "model": null,
    "max_passenger": null,
    "max_luggage": null,
    "image_url_1": null,
    "image_url_2": null,
    "maker_txt_id": null,
    "model_txt_id": null,
    "seq_front": 26
  },
  {
    "vehicle_id": 27,
    "vehicle_name": "16 Passenger Stretch Limo",
    "o_max_passenger": 16,
    "o_maker": "Hummer",
    "o_model": "H2",
    "o_image_url": "https://elifelimo.s3.us-east-2.amazonaws.com/art/vehicle/sm/stretch-limo-16.jpg",
    "o_image_url_2": "https://elifelimo.s3.us-east-2.amazonaws.com/art/home/vehicle-classes/stretch-limo-16.png",
    "o_max_luggage": 16,
    "vm_id": null,
    "maker": null,
    "model": null,
    "max_passenger": null,
    "max_luggage": null,
    "image_url_1": null,
    "image_url_2": null,
    "maker_txt_id": null,
    "model_txt_id": null,
    "seq_front": 27
  },
  {
    "vehicle_id": 25,
    "vehicle_name": "12 Passenger Party Bus",
    "o_max_passenger": 12,
    "o_maker": "Mercedes",
    "o_model": "Sprinter",
    "o_image_url": "https://elifelimo.s3.us-east-2.amazonaws.com/art/vehicle/sm/party-bus-12.jpg",
    "o_image_url_2": "https://elifelimo.s3.us-east-2.amazonaws.com/art/home/vehicle-classes/party-bus-12.png",
    "o_max_luggage": 12,
    "vm_id": null,
    "maker": null,
    "model": null,
    "max_passenger": null,
    "max_luggage": null,
    "image_url_1": null,
    "image_url_2": null,
    "maker_txt_id": null,
    "model_txt_id": null,
    "seq_front": 28
  },
  {
    "vehicle_id": 26,
    "vehicle_name": "14 Passenger Party Bus",
    "o_max_passenger": 14,
    "o_maker": "Mercedes",
    "o_model": "Sprinter",
    "o_image_url": "https://elifelimo.s3.us-east-2.amazonaws.com/art/vehicle/sm/party-bus-14.jpg",
    "o_image_url_2": "https://elifelimo.s3.us-east-2.amazonaws.com/art/home/vehicle-classes/party-bus-14.png",
    "o_max_luggage": 14,
    "vm_id": null,
    "maker": null,
    "model": null,
    "max_passenger": null,
    "max_luggage": null,
    "image_url_1": null,
    "image_url_2": null,
    "maker_txt_id": null,
    "model_txt_id": null,
    "seq_front": 29
  },
  {
    "vehicle_id": 28,
    "vehicle_name": "23 Passenger Party Bus",
    "o_max_passenger": 23,
    "o_maker": "Ford",
    "o_model": "F-550",
    "o_image_url": "https://elifelimo.s3.us-east-2.amazonaws.com/art/vehicle/sm/party-bus-23.jpg",
    "o_image_url_2": "https://elifelimo.s3.us-east-2.amazonaws.com/art/home/vehicle-classes/party-bus-23.png",
    "o_max_luggage": 23,
    "vm_id": null,
    "maker": null,
    "model": null,
    "max_passenger": null,
    "max_luggage": null,
    "image_url_1": null,
    "image_url_2": null,
    "maker_txt_id": null,
    "model_txt_id": null,
    "seq_front": 30
  },
  {
    "vehicle_id": 8,
    "vehicle_name": "Minibus-7",
    "o_max_passenger": 7,
    "o_maker": "Ford",
    "o_model": "Transit",
    "o_image_url": "https://elifelimo.s3.us-east-2.amazonaws.com/art/vehicle/sm/Minibus-7.jpg",
    "o_image_url_2": "https://elifelimo.s3.us-east-2.amazonaws.com/art/home/vehicle-classes/Minibus-7.jpg",
    "o_max_luggage": 7,
    "vm_id": null,
    "maker": null,
    "model": null,
    "max_passenger": null,
    "max_luggage": null,
    "image_url_1": null,
    "image_url_2": null,
    "maker_txt_id": null,
    "model_txt_id": null,
    "seq_front": 31
  },
  {
    "vehicle_id": 5,
    "vehicle_name": "Minibus-8",
    "o_max_passenger": 8,
    "o_maker": "Ford",
    "o_model": "Transit",
    "o_image_url": "https://elifelimo.s3.us-east-2.amazonaws.com/art/vehicle/sm/minibus-8.jpg",
    "o_image_url_2": "https://elifelimo.s3.us-east-2.amazonaws.com/art/home/vehicle-classes/minibus8.png",
    "o_max_luggage": 8,
    "vm_id": null,
    "maker": null,
    "model": null,
    "max_passenger": null,
    "max_luggage": null,
    "image_url_1": null,
    "image_url_2": null,
    "maker_txt_id": null,
    "model_txt_id": null,
    "seq_front": 32
  },
  {
    "vehicle_id": 9,
    "vehicle_name": "Minibus-10",
    "o_max_passenger": 10,
    "o_maker": "Ford",
    "o_model": "Ford",
    "o_image_url": "https://elifelimo.s3.us-east-2.amazonaws.com/art/vehicle/sm/minibus-10.jpg",
    "o_image_url_2": "https://elifelimo.s3.us-east-2.amazonaws.com/art/home/vehicle-classes/minibus10.png",
    "o_max_luggage": 10,
    "vm_id": null,
    "maker": null,
    "model": null,
    "max_passenger": null,
    "max_luggage": null,
    "image_url_1": null,
    "image_url_2": null,
    "maker_txt_id": null,
    "model_txt_id": null,
    "seq_front": 33
  },
  {
    "vehicle_id": 10,
    "vehicle_name": "Minibus-12",
    "o_max_passenger": 12,
    "o_maker": "Toyota",
    "o_model": "Hiace",
    "o_image_url": "https://elifelimo.s3.us-east-2.amazonaws.com/art/vehicle/sm/Toyota-Hiace.jpg",
    "o_image_url_2": "https://elifelimo.s3.us-east-2.amazonaws.com/art/home/vehicle-classes/Toyota-Hiace.jpg",
    "o_max_luggage": 12,
    "vm_id": null,
    "maker": null,
    "model": null,
    "max_passenger": null,
    "max_luggage": null,
    "image_url_1": null,
    "image_url_2": null,
    "maker_txt_id": null,
    "model_txt_id": null,
    "seq_front": 33
  },
  {
    "vehicle_id": 11,
    "vehicle_name": "Minibus-14",
    "o_max_passenger": 14,
    "o_maker": "Toyota",
    "o_model": "Coaster",
    "o_image_url": "https://elifelimo.s3.us-east-2.amazonaws.com/art/vehicle/sm/Toyota-Coaster.jpg",
    "o_image_url_2": "https://elifelimo.s3.us-east-2.amazonaws.com/art/home/vehicle-classes/Toyota-Coaster.jpg",
    "o_max_luggage": 14,
    "vm_id": null,
    "maker": null,
    "model": null,
    "max_passenger": null,
    "max_luggage": null,
    "image_url_1": null,
    "image_url_2": null,
    "maker_txt_id": null,
    "model_txt_id": null,
    "seq_front": 34
  },
  {
    "vehicle_id": 51,
    "vehicle_name": "Wheelchair Minibus",
    "o_max_passenger": 2,
    "o_maker": "Ford",
    "o_model": "Transit",
    "o_image_url": "https://elifelimo.s3.us-east-2.amazonaws.com/art/vehicle/sm/wheelchair-minibus.jpg",
    "o_image_url_2": "https://elifelimo.s3.us-east-2.amazonaws.com/art/home/vehicle-classes/wheelchair-minibus.png",
    "o_max_luggage": 2,
    "vm_id": null,
    "maker": null,
    "model": null,
    "max_passenger": null,
    "max_luggage": null,
    "image_url_1": null,
    "image_url_2": null,
    "maker_txt_id": null,
    "model_txt_id": null,
    "seq_front": 36
  },
  {
    "vehicle_id": 56,
    "vehicle_name": "9-School Minibus",
    "o_max_passenger": 9,
    "o_maker": "Titan School",
    "o_model": "SRW 1",
    "o_image_url": "https://elifelimo.s3.us-east-2.amazonaws.com/art/vehicle/sm/school-minibus-9.jpg",
    "o_image_url_2": "https://elifelimo.s3.us-east-2.amazonaws.com/art/home/vehicle-classes/school-minibus-9.png",
    "o_max_luggage": 9,
    "vm_id": null,
    "maker": null,
    "model": null,
    "max_passenger": null,
    "max_luggage": null,
    "image_url_1": null,
    "image_url_2": null,
    "maker_txt_id": null,
    "model_txt_id": null,
    "seq_front": 37
  },
  {
    "vehicle_id": 57,
    "vehicle_name": "14-School Minibus",
    "o_max_passenger": 14,
    "o_maker": "Titan School",
    "o_model": "SRW 1",
    "o_image_url": "https://elifelimo.s3.us-east-2.amazonaws.com/art/vehicle/sm/school-minibus-14.jpg",
    "o_image_url_2": "https://elifelimo.s3.us-east-2.amazonaws.com/art/home/vehicle-classes/school-minibus-14.png",
    "o_max_luggage": 14,
    "vm_id": null,
    "maker": null,
    "model": null,
    "max_passenger": null,
    "max_luggage": null,
    "image_url_1": null,
    "image_url_2": null,
    "maker_txt_id": null,
    "model_txt_id": null,
    "seq_front": 38
  },
  {
    "vehicle_id": 29,
    "vehicle_name": "16-seat Bus",
    "o_max_passenger": 16,
    "o_maker": "Ford",
    "o_model": "E-450",
    "o_image_url": "https://elifelimo.s3.us-east-2.amazonaws.com/art/vehicle/sm/bus-16.jpg",
    "o_image_url_2": "https://elifelimo.s3.us-east-2.amazonaws.com/art/home/vehicle-classes/bus-16.png",
    "o_max_luggage": 16,
    "vm_id": null,
    "maker": null,
    "model": null,
    "max_passenger": null,
    "max_luggage": null,
    "image_url_1": null,
    "image_url_2": null,
    "maker_txt_id": null,
    "model_txt_id": null,
    "seq_front": 39
  },
  {
    "vehicle_id": 30,
    "vehicle_name": "20-seat Bus",
    "o_max_passenger": 20,
    "o_maker": "Ford",
    "o_model": "E-450",
    "o_image_url": "https://elifelimo.s3.us-east-2.amazonaws.com/art/vehicle/sm/bus-20.jpg",
    "o_image_url_2": "https://elifelimo.s3.us-east-2.amazonaws.com/art/home/vehicle-classes/bus-20.png",
    "o_max_luggage": 20,
    "vm_id": null,
    "maker": null,
    "model": null,
    "max_passenger": null,
    "max_luggage": null,
    "image_url_1": null,
    "image_url_2": null,
    "maker_txt_id": null,
    "model_txt_id": null,
    "seq_front": 40
  },
  {
    "vehicle_id": 31,
    "vehicle_name": "23-seat Bus",
    "o_max_passenger": 23,
    "o_maker": "Ford",
    "o_model": "F-550",
    "o_image_url": "https://elifelimo.s3.us-east-2.amazonaws.com/art/vehicle/sm/bus-23.jpg",
    "o_image_url_2": "https://elifelimo.s3.us-east-2.amazonaws.com/art/home/vehicle-classes/bus-23.png",
    "o_max_luggage": 23,
    "vm_id": null,
    "maker": null,
    "model": null,
    "max_passenger": null,
    "max_luggage": null,
    "image_url_1": null,
    "image_url_2": null,
    "maker_txt_id": null,
    "model_txt_id": null,
    "seq_front": 41
  },
  {
    "vehicle_id": 32,
    "vehicle_name": "27-seat Bus",
    "o_max_passenger": 27,
    "o_maker": "Ford",
    "o_model": "F-550",
    "o_image_url": "https://elifelimo.s3.us-east-2.amazonaws.com/art/vehicle/sm/bus-27.jpg",
    "o_image_url_2": "https://elifelimo.s3.us-east-2.amazonaws.com/art/home/vehicle-classes/bus-27.png",
    "o_max_luggage": 27,
    "vm_id": null,
    "maker": null,
    "model": null,
    "max_passenger": null,
    "max_luggage": null,
    "image_url_1": null,
    "image_url_2": null,
    "maker_txt_id": null,
    "model_txt_id": null,
    "seq_front": 42
  },
  {
    "vehicle_id": 38,
    "vehicle_name": "30-seat Bus",
    "o_max_passenger": 30,
    "o_maker": "IVECO",
    "o_model": "NEXT L9",
    "o_image_url": "",
    "o_image_url_2": "",
    "o_max_luggage": 30,
    "vm_id": null,
    "maker": null,
    "model": null,
    "max_passenger": null,
    "max_luggage": null,
    "image_url_1": null,
    "image_url_2": null,
    "maker_txt_id": null,
    "model_txt_id": null,
    "seq_front": 43
  },
  {
    "vehicle_id": 37,
    "vehicle_name": "40-seat Bus",
    "o_max_passenger": 40,
    "o_maker": "dont",
    "o_model": "know",
    "o_image_url": "",
    "o_image_url_2": "",
    "o_max_luggage": 40,
    "vm_id": null,
    "maker": null,
    "model": null,
    "max_passenger": null,
    "max_luggage": null,
    "image_url_1": null,
    "image_url_2": null,
    "maker_txt_id": null,
    "model_txt_id": null,
    "seq_front": 44
  },
  {
    "vehicle_id": 33,
    "vehicle_name": "36-seat Bus",
    "o_max_passenger": 36,
    "o_maker": "Ford",
    "o_model": "F-650 or smilar",
    "o_image_url": "https://elifelimo.s3.us-east-2.amazonaws.com/art/vehicle/sm/bus-36.jpg",
    "o_image_url_2": "https://elifelimo.s3.us-east-2.amazonaws.com/art/home/vehicle-classes/bus-36.png",
    "o_max_luggage": 36,
    "vm_id": null,
    "maker": null,
    "model": null,
    "max_passenger": null,
    "max_luggage": null,
    "image_url_1": null,
    "image_url_2": null,
    "maker_txt_id": null,
    "model_txt_id": null,
    "seq_front": 44
  },
  {
    "vehicle_id": 39,
    "vehicle_name": "50-seat Bus",
    "o_max_passenger": 50,
    "o_maker": "IRIZAR",
    "o_model": "I6",
    "o_image_url": "",
    "o_image_url_2": "",
    "o_max_luggage": 50,
    "vm_id": null,
    "maker": null,
    "model": null,
    "max_passenger": null,
    "max_luggage": null,
    "image_url_1": null,
    "image_url_2": null,
    "maker_txt_id": null,
    "model_txt_id": null,
    "seq_front": 45
  },
  {
    "vehicle_id": 53,
    "vehicle_name": "50 pax bus ",
    "o_max_passenger": 50,
    "o_maker": "IRIZAR",
    "o_model": "I6",
    "o_image_url": null,
    "o_image_url_2": "",
    "o_max_luggage": 50,
    "vm_id": null,
    "maker": null,
    "model": null,
    "max_passenger": null,
    "max_luggage": null,
    "image_url_1": null,
    "image_url_2": null,
    "maker_txt_id": null,
    "model_txt_id": null,
    "seq_front": 45
  },
  {
    "vehicle_id": 34,
    "vehicle_name": "44-seat Coach Bus",
    "o_max_passenger": 44,
    "o_maker": "Volvo",
    "o_model": "Coach bus",
    "o_image_url": "https://elifelimo.s3.us-east-2.amazonaws.com/art/vehicle/sm/bus-44.jpg",
    "o_image_url_2": "https://elifelimo.s3.us-east-2.amazonaws.com/art/home/vehicle-classes/bus-44.png",
    "o_max_luggage": 44,
    "vm_id": null,
    "maker": null,
    "model": null,
    "max_passenger": null,
    "max_luggage": null,
    "image_url_1": null,
    "image_url_2": null,
    "maker_txt_id": null,
    "model_txt_id": null,
    "seq_front": 46
  },
  {
    "vehicle_id": 35,
    "vehicle_name": "55-seat Coach Bus",
    "o_max_passenger": 55,
    "o_maker": "Prevost",
    "o_model": "Motorcoach or smilar",
    "o_image_url": "https://elifelimo.s3.us-east-2.amazonaws.com/art/vehicle/sm/bus-55.jpg",
    "o_image_url_2": "https://elifelimo.s3.us-east-2.amazonaws.com/art/home/vehicle-classes/bus-55.png",
    "o_max_luggage": 55,
    "vm_id": null,
    "maker": null,
    "model": null,
    "max_passenger": null,
    "max_luggage": null,
    "image_url_1": null,
    "image_url_2": null,
    "maker_txt_id": null,
    "model_txt_id": null,
    "seq_front": 47
  },
  {
    "vehicle_id": 58,
    "vehicle_name": "16-School Bus",
    "o_max_passenger": 16,
    "o_maker": "Titan School",
    "o_model": "SRW 1",
    "o_image_url": "https://elifelimo.s3.us-east-2.amazonaws.com/art/vehicle/sm/school-bus-16.jpg",
    "o_image_url_2": "https://elifelimo.s3.us-east-2.amazonaws.com/art/home/vehicle-classes/school-bus-16.png",
    "o_max_luggage": 16,
    "vm_id": null,
    "maker": null,
    "model": null,
    "max_passenger": null,
    "max_luggage": null,
    "image_url_1": null,
    "image_url_2": null,
    "maker_txt_id": null,
    "model_txt_id": null,
    "seq_front": 48
  },
  {
    "vehicle_id": 59,
    "vehicle_name": "20-School Bus",
    "o_max_passenger": 20,
    "o_maker": "Titan School",
    "o_model": "SRW 1",
    "o_image_url": "https://elifelimo.s3.us-east-2.amazonaws.com/art/vehicle/sm/school-bus-20.jpg",
    "o_image_url_2": "https://elifelimo.s3.us-east-2.amazonaws.com/art/home/vehicle-classes/school-bus-20.png",
    "o_max_luggage": 20,
    "vm_id": null,
    "maker": null,
    "model": null,
    "max_passenger": null,
    "max_luggage": null,
    "image_url_1": null,
    "image_url_2": null,
    "maker_txt_id": null,
    "model_txt_id": null,
    "seq_front": 49
  },
  {
    "vehicle_id": 60,
    "vehicle_name": "23-School Bus",
    "o_max_passenger": 23,
    "o_maker": "Titan School",
    "o_model": "DRW 2",
    "o_image_url": "https://elifelimo.s3.us-east-2.amazonaws.com/art/vehicle/sm/school-bus-23.jpg",
    "o_image_url_2": "https://elifelimo.s3.us-east-2.amazonaws.com/art/home/vehicle-classes/school-bus-23.png",
    "o_max_luggage": 23,
    "vm_id": null,
    "maker": null,
    "model": null,
    "max_passenger": null,
    "max_luggage": null,
    "image_url_1": null,
    "image_url_2": null,
    "maker_txt_id": null,
    "model_txt_id": null,
    "seq_front": 50
  },
  {
    "vehicle_id": 61,
    "vehicle_name": "30-School Bus",
    "o_max_passenger": 30,
    "o_maker": "Titan School",
    "o_model": "DRW 2",
    "o_image_url": "https://elifelimo.s3.us-east-2.amazonaws.com/art/vehicle/sm/school-bus-30.jpg",
    "o_image_url_2": "https://elifelimo.s3.us-east-2.amazonaws.com/art/home/vehicle-classes/school-bus-30.png",
    "o_max_luggage": 30,
    "vm_id": null,
    "maker": null,
    "model": null,
    "max_passenger": null,
    "max_luggage": null,
    "image_url_1": null,
    "image_url_2": null,
    "maker_txt_id": null,
    "model_txt_id": null,
    "seq_front": 51
  },
  {
    "vehicle_id": 62,
    "vehicle_name": "36-School Bus",
    "o_max_passenger": 36,
    "o_maker": "Micro Bird",
    "o_model": "G5",
    "o_image_url": "https://elifelimo.s3.us-east-2.amazonaws.com/art/vehicle/sm/school-bus-36.jpg",
    "o_image_url_2": "https://elifelimo.s3.us-east-2.amazonaws.com/art/home/vehicle-classes/school-bus-36.png",
    "o_max_luggage": 36,
    "vm_id": null,
    "maker": null,
    "model": null,
    "max_passenger": null,
    "max_luggage": null,
    "image_url_1": null,
    "image_url_2": null,
    "maker_txt_id": null,
    "model_txt_id": null,
    "seq_front": 52
  },
  {
    "vehicle_id": 63,
    "vehicle_name": "44-School Bus",
    "o_max_passenger": 44,
    "o_maker": "Bluebird Version",
    "o_model": "",
    "o_image_url": "https://elifelimo.s3.us-east-2.amazonaws.com/art/vehicle/sm/school-bus-44.jpg",
    "o_image_url_2": "https://elifelimo.s3.us-east-2.amazonaws.com/art/home/vehicle-classes/school-bus-44.png",
    "o_max_luggage": 44,
    "vm_id": null,
    "maker": null,
    "model": null,
    "max_passenger": null,
    "max_luggage": null,
    "image_url_1": null,
    "image_url_2": null,
    "maker_txt_id": null,
    "model_txt_id": null,
    "seq_front": 53
  },
  {
    "vehicle_id": 64,
    "vehicle_name": "72-School Bus",
    "o_max_passenger": 72,
    "o_maker": "International school bus",
    "o_model": "",
    "o_image_url": "https://elifelimo.s3.us-east-2.amazonaws.com/art/vehicle/sm/school-bus-72.jpg",
    "o_image_url_2": "https://elifelimo.s3.us-east-2.amazonaws.com/art/home/vehicle-classes/school-bus-72.png",
    "o_max_luggage": 72,
    "vm_id": null,
    "maker": null,
    "model": null,
    "max_passenger": null,
    "max_luggage": null,
    "image_url_1": null,
    "image_url_2": null,
    "maker_txt_id": null,
    "model_txt_id": null,
    "seq_front": 54
  }
]

let curVehicleList = [1, 12, 2, 6, 3, 36, 4, 5, 9, 10, 11]