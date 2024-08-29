

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




function exportCSV(title, jsonData) {
  let str = ``;
  for (let i of title) {
    let nameStr = i.toString().replace(/\,/g, ' ');
    str += nameStr + ',';
  }
  str += '\n';
  for (let item of jsonData) {
    for (let el in item) {
      str += `${item[el] + '\t'},`;
    }
    str += '\n';
  }
  const url = 'data:text/csv;charset=utf-8,\ufeff' + encodeURIComponent(str);
  const link = document.createElement('a');
  link.href = url;
  let dateName = new Date().getTime();
  link.download = dateName + '.csv';
  link.click();
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



async function insertAndUpdate(url, svcJson, newFleetId) {
  let updateD = {
    sql: 134678780,
    version: '1.0',
    pricing_str: JSON.stringify(svcJson),
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