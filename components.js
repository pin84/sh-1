

async function getPricingJsonBySvcId(url, id) {
  //  select pricing from fleet left join service_area_pricing s on  s.id = fleet.service_area_pricing_id where fleet.id = {{svc_id}}
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
  return JSON.parse(res.pricing)
}

async function getAirportInfo(url, code) {
  // select a.code3,ad.lat,ad.lng,a.radius from address ad left join airport a on code3 = '{{airport_code}}' where ad.id = a.address_id
  let res = await fetchData({
    url,
    method: 'POST',
    data: {
      sql: 134678945,
      version: '1.0',
      airport_code: code
    }
  })
  return res
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





function jsonAddPercent(svcJson, partnerJson = {}) {

  let oldJson = JSON.parse(JSON.stringify(svcJson))

  let mag_delta = partnerJson.service_areas?.mag_delta || []
  let ads_delta = partnerJson.service_areas?.ads_delta || []
  let sas_percent = partnerJson.service_areas?.sas_percent || []
  let { serviceArea: { id: svcId } } = svcJson


  let partnerPercent = 22

  let sas = sas_percent.find(item => item.id == svcId)
  let vcs = sas?.vcs || []
  let percent = sas?.percent || 0
  let svcPercent = percent || partnerPercent

  { // meet_n_greet
    let mng = mag_delta.find(item => item.id == svcId)
    let { switch: isClose, delta } = mng || {}
    let meet_n_greet = svcJson.pricing?.meet_n_greet || 0

    if (isClose != 'on') {
      delta = 0
    }
    svcJson.pricing.meet_n_greet = addPicies(Number(meet_n_greet) + Number(delta), svcPercent)

  }

  { //add_service
    let { is_p, ts_p, cs_p } = svcJson.add_service || {}
    let ads = ads_delta.find(item => item.id == svcId)

    if (is_p != undefined) {
      // let { infant: { delta, switch: isClose } } = ads
      let delta = ads?.infant?.delta || 0
      let isClose = ads?.infant?.switch || 'off'

      if (isClose != 'on') {
        delta = 0
      }
      // svcJson.add_service.is_p = (Number(is_p) + Number(delta)) * partnerPercent
      svcJson.add_service.is_p = addPicies(Number(is_p) + Number(delta), svcPercent)
    }
    if (ts_p != undefined) {
      // let { toddler: { delta, switch: isClose } } = ads
      let delta = ads?.toddler?.delta || 0
      let isClose = ads?.toddler?.switch || 'off'

      if (isClose != 'on') {
        delta = 0
      }
      // svcJson.add_service.ts_p = (Number(ts_p) + Number(delta)) * partnerPercent
      svcJson.add_service.ts_p = addPicies(Number(ts_p) + Number(delta), svcPercent)
    }
    if (cs_p != undefined) {
      // let { child: { delta, switch: isClose } } = ads
      let delta = ads?.child?.delta || 0
      let isClose = ads?.child?.switch || 'off'
      if (isClose != 'on') {
        delta = 0
      }
      // svcJson.add_service.cs_p = (Number(cs_p) + Number(delta)) * partnerPercent
      svcJson.add_service.cs_p = addPicies(Number(cs_p) + Number(delta), svcPercent)
    }
  }



  { // sas_percent


    { // pricing
      let { ranges, meet_n_greet, min_amount } = svcJson.pricing || {}
      // if (meet_n_greet != undefined) {
      //   svcJson.pricing.meet_n_greet = addPicies(meet_n_greet, svcPercent)
      // }
      if (min_amount != undefined) {
        svcJson.pricing.min_amount = addPicies(min_amount, svcPercent)
      }

      for (let rang of (ranges || [])) {
        rang.amount = addPicies(rang.amount, svcPercent)
      }
    }

    { // downtown_areas
      let { ranges, min_amount } = svcJson.downtown_areas || {}
      if (min_amount != undefined) {
        svcJson.downtown_areas.min_amount = addPicies(min_amount, svcPercent)
      }
      for (let rang of (ranges || [])) {
        rang.amount = addPicies(rang.amount, svcPercent)
      }
    }

    { //hourly_pricing

      let min_amount = svcJson.hourly_pricing?.min_amount || undefined
      if (min_amount != undefined) {
        svcJson.hourly_pricing.min_amount = addPicies(min_amount, svcPercent)
      }



      let rules = svcJson.hourly_pricing?.rules || []
      let ranges = svcJson.hourly_pricing?.ranges || []
      for (let r of ranges) {
        let amount = r.amount
        r.amount = addPicies(amount, svcPercent)
      }

      for (let r of rules) {
        let { min_amount, ranges } = r
        r.min_amount = addPicies(min_amount, svcPercent)

        for (let range of (ranges || [])) {
          range.amount = addPicies(range.amount, svcPercent)
        }
      }
    }


    { // zones
      let zones = svcJson.zones || []
      for (let z of zones) {
        for (let p of (z.prices || [])) {
          let { p_amt, d_amt, amount } = p
          if (p_amt && d_amt) {
            p.p_amt = addPicies(p_amt, svcPercent)
            p.d_amt = addPicies(d_amt, svcPercent)
          }

          if (amount) {
            p.amount = addPicies(amount, svcPercent)
          }
        }
      }
    }

    { //zone2zone
      let zone2zone = svcJson.zone2zone?.prices || []
      for (let item of zone2zone) {
        let { amount, reverse } = item
        item.amount = addPicies(amount, svcPercent)
      }
    }


    { //notice_time_rules
      let noticeTime = svcJson.notice_time_rules || []
      for (let item of noticeTime) {
        let ps = item.ps || []
        for (let p of ps) {
          let notice_time = p.notice_time || []
          for (let n of notice_time) {

            let { delta_amount, percent } = n
            if (delta_amount != undefined) {
              n['delta_amount'] = addPicies(n['delta_amount'], svcPercent)
            } else {
            }
          }
        }
      }

    }

    { // pricing_schedule_sum
      let pricingScheduleSum = svcJson.pricing_schedule_sum || []
      for (let item of pricingScheduleSum) {
        let noticeTimeHint = item.notice_time_hint || []

        for (let n of noticeTimeHint) {
          if (n == 'null') continue
          for (let o of n) {
            let { delta_amount, percent } = o
            if (delta_amount != undefined) {
              o.delta_amount = addPicies(o.delta_amount, svcPercent)
            } else {
            }
          }

        }
      }
    }

    { //specific_date_surcharge
      let specificDateSurcharge = svcJson.specific_date_surcharge || []
      for (let item of specificDateSurcharge) {
        let vehicleClasses = item.vehicle_classes || []
        for (let v of vehicleClasses) {
          let { percent, delta_amount } = v
          if (delta_amount != 0) {
            v.delta_amount = addPicies(v.delta_amount, svcPercent)
          } else {
          }
        }
      }
    }


    {//add_service
      let add_service = svcJson.add_service || {}
      let keys = Object.keys(add_service)
      for (let k of keys) {
        add_service[k] = addPicies(add_service[k], svcPercent)
      }
    }

    { //vehicleClasses
      let vehicleClasses = svcJson.vehicleClasses || []
      // let aa = [vehicleClasses[0]]
      for (let v of vehicleClasses) {
        let percent_appendix = v.percent_appendix || []
        for (let p of percent_appendix) {
          let { delta_amount } = p
          if (!delta_amount) continue
          p.delta_amount = addPicies(delta_amount, svcPercent)
        }
        let { vehicle_class_id, percent: svcVehiclePercent } = v

        let partnerVehiclePercent = (vcs.find(o => o.id == vehicle_class_id) || {}).percent || undefined
        if (partnerVehiclePercent == undefined) {
          continue
        }

        partnerVehiclePercent = Number(partnerVehiclePercent)


        v['percent'] = addPercent_2(partnerVehiclePercent, svcVehiclePercent, svcPercent)
        v['hourly_percent'] = addPercent_2(partnerVehiclePercent, svcVehiclePercent, svcPercent)
        let i = 0
        for (let p of percent_appendix) {
          let { delta_amount, field } = p
          if (!delta_amount) {
            i++
            continue
          }

          let oldVal = 0
          switch (field) {
            case "pricing.min_amount":
              oldVal = oldJson.pricing?.min_amount || 0
              break;
            case "downtown_areas.min_amount":
              oldVal = oldJson.downtown_areas?.min_amount || 0
              break;
            default:
              let oField = JSON.stringify(field)
              let keyArr = field.split('.')
              let getValueByKey = (oldJson, keyArr) => {
                let k = keyArr.shift()
                let val = oldJson[k]
                if (!val) {
                  return
                }
                if (keyArr.length) {
                  return getValueByKey(val, keyArr)
                }
                return val
              }

              let amountOrObj = getValueByKey(oldJson, keyArr)
              if (amountOrObj == undefined) {
                continue
              }
              let { amount } = amountOrObj
              oldVal = amount || amountOrObj
              break;
          }
          // (52.97 + 11 ) * 1.0 - 52.97  * 1.1 = 5.703
          oldVal = Number(oldVal)
          let oldVehicleClasses = oldJson['vehicleClasses'].find(v => v.vehicle_class_id == vehicle_class_id)
          let { delta_amount: oldDeltaAmount } = oldVehicleClasses['percent_appendix'].find(p => p.field == field)

          let newDeltaAmount = (oldVal + Number(oldDeltaAmount)) * percentTranslate(partnerVehiclePercent) - oldVal * percentTranslate(svcPercent)

          p.delta_amount = Number(newDeltaAmount.toFixed(2))
          i++
        }

      }
    }
  }


  // svcJson.serviceArea['parent_fleet_id'] = stage == 'DEV' ? 60924 : 61654
  // svcJson.serviceArea['parent_fleet_name'] = 'chinaCtripAPI'
  // svcJson.serviceArea['id'] = newFleetId
  svcJson['service_area_pricing_id'] = null

  // let { name } = svcJson.serviceArea
  // svcJson.serviceArea['name'] = name.replace(/\,/g, ' ')
  return svcJson
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

function polygonCheck(zones,zoneName) {
  for (let item of zones) {
    let { polygons,name } = item
    if(name != zoneName) continue
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


let ses = 'YM9zkRVEF7DYYr1JFhgAyKobXMYWYgnfuBRqEX8y5ePR7hykxUVrSdXVM9rrIWXB9IwfUBQFMVeS7bCHMTwXNy0UqpSR9DFXnayZVBCkgGmXn0fGFhtNT8g729VBq4CO'
let urlProd = `https://ujrfp99zs9.execute-api.us-east-2.amazonaws.com/upncoming/sql-templates/run?ses=${ses}`

let sesDev = 'UEc1L5eErGh7DFkDh6wrQ46IVQt0d8QYQfquN6udTq7t0ETpcA7lmlXrUXJC2t66teluAqg47qpGznRfaVc6d4b9OHAJilwsE1e3wMYhvDdkfEgCJzYAaCe59gRYg8Sm'
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
    "vehicle_id": 40,
    "vehicle_name": "First Class Sedan",
    "o_max_passenger": 3,
    "o_maker": "Mercedes",
    "o_model": "S550",
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
    "seq_front": 5
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
    "vm_id": null,
    "maker": null,
    "model": null,
    "max_passenger": null,
    "max_luggage": null,
    "image_url_1": null,
    "image_url_2": null,
    "maker_txt_id": null,
    "model_txt_id": null,
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
    "vm_id": null,
    "maker": null,
    "model": null,
    "max_passenger": null,
    "max_luggage": null,
    "image_url_1": null,
    "image_url_2": null,
    "maker_txt_id": null,
    "model_txt_id": null,
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
    "vm_id": 316,
    "maker": "Toyota",
    "model": "Sienna",
    "max_passenger": 1,
    "max_luggage": 1,
    "image_url_1": "",
    "image_url_2": "",
    "maker_txt_id": 1473,
    "model_txt_id": 1474,
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
    "vm_id": 88,
    "maker": "Liconln",
    "model": "MKT ",
    "max_passenger": 9,
    "max_luggage": 8,
    "image_url_1": "",
    "image_url_2": "",
    "maker_txt_id": 657,
    "model_txt_id": 658,
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
    "vm_id": 15,
    "maker": "Hummer",
    "model": "H2",
    "max_passenger": 15,
    "max_luggage": 10,
    "image_url_1": "",
    "image_url_2": "",
    "maker_txt_id": 113,
    "model_txt_id": 114,
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
    "vehicle_id": 11,
    "vehicle_name": "Minibus-14",
    "o_max_passenger": 14,
    "o_maker": "Mercedes",
    "o_model": "Sprinter",
    "o_image_url": "https://elifelimo.s3.us-east-2.amazonaws.com/art/vehicle/sm/minibus-14.jpg",
    "o_image_url_2": "https://elifelimo.s3.us-east-2.amazonaws.com/art/home/vehicle-classes/minibus14.png",
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
    "vehicle_id": 10,
    "vehicle_name": "Minibus-12",
    "o_max_passenger": 12,
    "o_maker": "Mercedes",
    "o_model": "Sprinter",
    "o_image_url": "https://elifelimo.s3.us-east-2.amazonaws.com/art/vehicle/sm/minibus-12.jpg",
    "o_image_url_2": "https://elifelimo.s3.us-east-2.amazonaws.com/art/home/vehicle-classes/minibus12.png",
    "o_max_luggage": 12,
    "vm_id": 87,
    "maker": "Mercedes",
    "model": "Sprinter",
    "max_passenger": 11,
    "max_luggage": 11,
    "image_url_1": "",
    "image_url_2": "",
    "maker_txt_id": 649,
    "model_txt_id": 650,
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