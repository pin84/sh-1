



function jsonHandler3(pricing, from_place, to_place, isPickup, airportInfo, vid) {
  let { zones, vehicleClasses } = pricing
  if (!zones || !zones.length) return {
    code: 1
  }


  let flag = polygonCheck(zones, isPickup ? to_place : from_place)
  if (!flag) {
    return {
      code: 2
    }
  }
  let { prices } = zones[0]
  let index = zones.findIndex(item => item.name == (isPickup ? to_place : from_place))
  let idx = prices.findIndex(o => o.airport == (isPickup ? from_place : to_place))
  if (index == -1 || idx == -1) {
    return {
      code: 1
    }
  }
  let adjJson = {}
  if (isPickup) {
    adjJson['p_amt'] = `zones.${index}.prices.${idx}.p_amt`
  } else {
    adjJson['d_amt'] = `zones.${index}.prices.${idx}.d_amt`
  }
  let zone = zones[index]
  let pAmt = null
  if (vid) {
    let { p_amt, d_amt, amount } = zones[index].prices[idx]
    let pa = vehicleClasses.find(item => item.vehicle_class_id == vid)

    if (pa) {
      let percent_appendix = pa?.percent_appendix || []
      // let percent = pa?.percent_appendix || 0
      let field = null
      let n = null

      if (p_amt != undefined && d_amt != undefined) {
        let pamtOrDamt = isPickup ? 'p_amt' : 'd_amt'
        field = percent_appendix.find(item => item.field == `zones.${index}.prices.${idx}.${pamtOrDamt}`)
        n = Number(isPickup ? p_amt : d_amt)
      } else {
        field = percent_appendix.find(item => item.field == `zones.${index}.prices.${idx}`)
        n = Number(amount)
      }


      let delta_amount = field?.delta_amount || 0



      if (!field) {
        let percent = pa?.percent
        if (!percent) {
          pAmt = Number(n.toFixed(2))
        } else {
          pAmt = Number((n + n * (percent / 100)).toFixed(2))
        }
      } else {
        pAmt = Number((n + Number(delta_amount)).toFixed(2))
      }
    }
  }

  let res = {
    adjJson,
    from_place_lat_lng: isPickup ? airportInfo : zone,
    to_place_lat_lng: isPickup ? zone : airportInfo,
    code: 0
  }

  if (pAmt) {
    res['pAmt'] = pAmt
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

async function getCurrencyRates(fromCur, toCur) {
  let url = 'https://btdcrg5tsc.execute-api.us-east-2.amazonaws.com/prod/cur-exch-rates/cur'
  let res = await fetchData({
    url,
    method: 'GET',
    data: {
      from_cur: fromCur,
      to_cur: toCur,
    }
  })

  let rate = res.exch_rates[0].amount
  return rate
}

async function getAirport(from_place, to_place) {

  let fromAirportInfo = caches[from_place]

  if (!fromAirportInfo) {
    fromAirportInfo = await getAirportInfo(urlProd, from_place)
    caches[from_place] = fromAirportInfo
  }
  let toAirportInfo = caches[to_place]

  if (!toAirportInfo) {
    toAirportInfo = await getAirportInfo(urlProd, to_place)
    caches[to_place] = toAirportInfo
  }



  if (fromAirportInfo.code3 && toAirportInfo.code3) {
    return { code: 2 }
  }

  if (!fromAirportInfo.code3 && !toAirportInfo.code3) {
    return { code: 1 }
  }

  let isPickup = fromAirportInfo.code3 ? true : false // from place is airport : true 

  let airportInfo = fromAirportInfo
  if (!isPickup) {
    airportInfo = toAirportInfo
  }
  return { isPickup, airportInfo, code: 0 }
}

async function insertSppRouteV2(url, route) {
  // INSERT INTO ride.spp_route (from_place, to_place, service_area_id, json, name,from_place_lat_lng, to_place_lat_lng, strategy_id, platform_name, partner_id, service_area_id_elife,from_address,to_address)VALUES ('{{from_place}}', '{{to_place}}',  {{service_area_id}}, '{{json}}', '{{name}}', '{{from_place_lat_lng}}', '{{to_place_lat_lng}}', {{strategy_id}}, '{{platform_name}}', {{partner_id}}, {{service_area_id_elife}},'{{from_address}}','{{to_address}}') limit 1;

  let d = Object.assign({}, {
    sql: 134679330,
    version: '4.078',
  },
    route
  )
  let res = await fetchData({
    url,
    method: "POST",
    data: d
  })

  let row = res['Affected rows']
  let lastId = res['Lastrow id']

  if (row == 0) {
    return
  }
  return { lastId }
}

function getPartnerMarkup(partnerPricingJson, svcId, vId) {
  //parner markup
  let sasPercent = partnerPricingJson.service_areas?.sas_percent || []
  let partnerMarkup = 0
  let vcs = []
  let sas = sasPercent.find(item => item.id == svcId)
  if (sas) {
    partnerMarkup = sas.percent
    vcs = sas.vcs || []
  }

  let vehiclePercent = vcs.find(item => item.id == vId)
  let pm = vehiclePercent?.percent || partnerMarkup
  return pm
}


function getMng(pricingJson, partnerPricingJson) {
  let mng = pricingJson?.pricing?.meet_n_greet
  let { id: svcId } = pricingJson.serviceArea
  //meetAndGreet
  let magDelta = partnerPricingJson.service_areas?.mag_delta || []
  let curSvcCharge = magDelta.find(item => item.id == svcId)
  if (curSvcCharge) {
    let { switch: isClose, delta } = curSvcCharge
    if (isClose == 'on') {
      mng += delta
    }
  }
  return mng
}

async function getPartnerPricingJson(url, state) {
  let mngCach = {}
  let fd = {
    "demand_fleet_id": 18,
    "supply_fleet_id": 15
  }
  if (stage == 'DEV') {
    fd = {
      "demand_fleet_id": 46,
      "supply_fleet_id": 40
    }
  }
  let d = Object.assign({}, fd, {
    sql: 134679330,
    version: '4.001',
  })
  let partnerJsonStr = await fetchData({
    url,
    method: "POST",
    data: d
  })

  let partnerJson = JSON.parse(partnerJsonStr.json)

  return partnerJson
}


async function createRoute(obj) {

  return
}
async function getCostProfit(url, routeId) {
  let res = await fetchData({
    url,
    method: "POST",
    data: {
      sql: 134679330,
      version: '4.005',
      route_id: routeId,
    }
  })
  return res
}

async function insertAdj(url, prices) {
  let res = await fetchData({
    url,
    method: "POST",
    data: {
      sql: 134679330,
      version: '4.007',
      prices
    }
  })

  return res

}

async function insertCost(url, costs) {
  let res = await fetchData({
    url,
    method: 'POST',
    data: {
      sql: 134679330,
      version: '4.012',
      costs
    }
  })
  return res
}




async function getFleetByName(url, name, parentFleetId) {
  let str = `${parentFleetId}-${name}`
  let res = caches[str]

  if (!res) {
    res = await fetchData({
      url,
      method: 'POST',
      data: {
        sql: 134679330,
        version: '2.2',
        fleet_name: name,
        parent_fleet_id: parentFleetId
      }
    })

    caches[str] = res
  }
  return res
}


function downLoadCSV(jsonData = [], fileName = 'TEST') {
  let i = 0
  let titles = []
  let data = []
  for (let item of jsonData) {
    let tem = []
    for (let [key, value] of Object.entries(item)) {
      if (i == 0) {
        titles.push(key)
      }
      tem.push(value)
    }
    i++
    data.push(tem)
  }

  console.log(titles);
  console.log(data);

  saveCSV(fileName, titles, data)
}


function addressHandler(addr) {
  let newAddr = addr.replace(/\'/g, "\\\'")
  return newAddr
}

async function getRoute(url, from, to, partner_id) {
  let res = await fetchData({
    url,
    method: 'POST',
    data: {
      sql: 134679330,
      version: '4.026',
      from_place: from,
      to_place: to,
      partner_id
    }
  })

  return res
}





async function getLatPricingJsonAndFleeNotJsonId(url, svcId) {
  // select * from service_area_pricing where service_area_id = {{svcId}} order by  id desc
  let d = {
    sql: 134679330,
    version: '4.024',
    svcId
  }

  let { pricing } = await fetchData({
    url,
    method: 'POST',
    data: d,
  })

  if (pricing) {
    return pricing
  }
}

async function getFleetIdByAirport(url, airport, parent_fleet_id) {
  let res = await fetchData({
    url,
    method: "POST",
    data: {
      sql: 134679330,
      version: '2.0',
      airport,
      parent_fleet_id,
    }
  })

  return res
}

function getVehicles() {
  let vehicles = [
    {
      name: 'Sedan',
      id: 1
    },

    {
      name: 'Comfort Sedan',
      id: 12
    },

    {
      name: 'Business Sedan',
      id: 2
    },

    {
      name: 'MPV-4',
      id: 6
    },

    {
      name: 'MPV-5',
      id: 3
    },

    {
      name: 'Business Minivan',
      id: 36
    },
    {
      name: 'Business SUV',
      id: 4
    },
    {
      name: 'MPV-6',
      id: 7
    },
    {
      name: 'Minibus-7',
      id: 8
    },
    {
      name: 'Minibus-8',
      id: 5
    },
    {
      name: 'Minibus-10',
      id: 9
    },
    {
      name: 'Minibus-12',
      id: 10
    },
    {
      name: 'Minibus-14',
      id: 11
    }

  ]

  return vehicles
}

async function timeZoneHandler(pricing, airportInfo) {
  let { tzid } = pricing?.tz || {}
  if (tzid == undefined) {
    let dateStr = getStandardDateTime()
    if (!airportInfo) {
      airportInfo = await getAirportInfo(urlProd, pricing.airports[0])
    }

    console.log('--------调用了时区API---------',airportInfo);
    
    let { lat, lng } = airportInfo
    let url = `https://388bivap71.execute-api.us-east-2.amazonaws.com/prod/maps/timezones/location/date-time`
    let res = await fetchData({
      url,
      method: 'GET',
      data: {
        loc: `${lat},${lng}`,
        dt: `${dateStr}`
      }
    })
    tzid = res?.timezone?.timeZoneId
  }
  return tzid
}