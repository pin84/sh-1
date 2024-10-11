      // async jsonHandler2(pricing, from_place, to_place, vid,) {
      //   let { zones, vehicleClasses } = pricing
      //   if (!zones) return
      //   let { prices } = zones[0]
      //   let fromAirportInfo = await getAirportInfo(urlProd, from_place)
      //   let toAirportInfo = await getAirportInfo(urlProd, to_place)

      //   let flag = fromAirportInfo.code3 ? true : false // from place is airport : true 

      //   from_place = from_place.trim()
      //   to_place = to_place.trim()


      //   let index = zones.findIndex(item => (String(item.name).trim()) == (flag ? to_place : from_place))
      //   let idx = prices.findIndex(o => o.airport == (flag ? from_place : to_place))

      //   if (index == -1 || idx == -1) {
      //     return
      //   }

      //   let adjJson = {}
      //   if (flag) {
      //     adjJson['p_amt'] = `zones.${index}.prices.${idx}.p_amt`
      //   } else {
      //     adjJson['d_amt'] = `zones.${index}.prices.${idx}.d_amt`
      //   }
      //   let zone = zones[index]

      //   let pAmt = null
      //   if (vid) {
      //     let { p_amt, d_amt } = zones[index].prices[idx]
      //     let pa = vehicleClasses.find(item => item.vehicle_class_id == vid)

      //     if (pa) {
      //       let percent_appendix = pa?.percent_appendix || []
      //       let percent = pa?.percent_appendix || 0
      //       let pamtOrDamt = flag ? 'p_amt' : 'd_amt'
      //       let field = percent_appendix.find(item => item.field == `zones.${index}.prices.${idx}.${pamtOrDamt}`)

      //       let delta_amount = field?.delta_amount || 0

      //       let n = Number(flag ? p_amt : d_amt)
      //       if (!field) {
      //         let percent = pa?.percent || 0
      //         pAmt = Number((n + n * (percent / 100)).toFixed(2))
      //       } else {
      //         pAmt = Number((n + Number(delta_amount)).toFixed(2))
      //       }
      //     }
      //   }

      //   //mng



      //   let res = {
      //     adjJson,
      //     from_place_lat_lng: flag ? fromAirportInfo : zone,
      //     to_place_lat_lng: flag ? zone : toAirportInfo,
      //   }

      //   if (pAmt) {
      //     res['pAmt'] = pAmt
      //   }
      //   return res
      // }