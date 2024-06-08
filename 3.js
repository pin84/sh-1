class PartnerAmenity {
  constructor() {
    this.rootElm = document.querySelector('.content-switch-box')

    this.currencyCode = 'USD'


  }

  async insertHtml() {
    let dom = this.rootElm.querySelector('#partner-amenity')
    if (!dom) {
      let data = await fetch(_path + '/partner/amenity.html')
      let html = await data.text()
      this.rootElm.innerHTML = ''
      this.rootElm.innerHTML = html
    }
  }


  fill(parentBox, data, type) {
    let template = this.rootElm.querySelector('.child-set-template')

    let fragment = document.createDocumentFragment()
    for (let item of data) {
      let cTemplate = template.cloneNode(true)
      cTemplate.classList.remove('hide', 'child-set-template')

      let leftText = cTemplate.querySelector('.left-text')
      leftText.innerText = item.title

      let titleTips = cTemplate.querySelector('.title-tips')
      titleTips.innerText = item.desc

      let { val, isClose, isSvcClose } = item
      let switchBox = cTemplate.querySelector('.switch-box')
      switchBox.checked = isClose

      let enterInput = cTemplate.querySelector('.input')
      enterInput.value = val || 0
      if (!isClose) {
        enterInput.setAttribute('disabled', true)
        enterInput.value = ''
        enterInput.placeholder = 'close'
      }

      enterInput.addEventListener('change', async (e) => {
        let val = e.target.value
        item.val = val
        let partnerEdit = await svcPartnerEdit()
        partnerEdit.svpcSabeBtn.classList.add('active')
        this.pour()
      })

      switchBox.addEventListener('change', async (e) => {
        let val = e.target.checked
        item.isClose = val
        if (!val) {
          enterInput.value = ''
          enterInput.placeholder = 'close'
          enterInput.setAttribute('disabled', true)
          item.val = ''
        } else {
          enterInput.value = 0
          enterInput.placeholder = 'Please enter'
          enterInput.removeAttribute('disabled')
          item.val = 0
        }
        let partnerEdit = await svcPartnerEdit()
        partnerEdit.svpcSabeBtn.classList.add('active')

        this.pour()
      })

      let mask = cTemplate.querySelector('.mask')
      if (isSvcClose) {
        mask.classList.add('hide')
      }

      let icon = cTemplate.querySelector('.icon')
      icon.classList.add(item.icon)

      let unit = cTemplate.querySelector('.unit')
      unit.innerText = this.currencyCode


      fragment.appendChild(cTemplate)
    }

    parentBox.innerHTML = ''
    parentBox.appendChild(fragment)
  }

  validate() {
    return true
  }

  pour() {
    let { cs_p, is_p, ts_p } = this.curSvc
    let { mag_delta, ads_delta } = _p.curPartnerData.pricing_json.service_areas

    let isKlook = this.partnerId == 28
    let ads = {
      "id": this.svcId,
    }
    for (let o of this.childSettingData) {
      let { title, val } = o

      let v = 0
      switch (title) {
        case "children":
          if (cs_p == undefined && isKlook) continue
          v = val - (cs_p || 0)
          break;
        case "Toddler":
          if (ts_p == undefined && isKlook) continue
          v = val - (ts_p || 0)
          break;
        case "Infant":
          if (is_p == undefined && isKlook) continue
          v = val - (is_p || 0)
          break;
        default:
          break;
      }
      if (!o.isClose && isKlook) { 
        continue
      }

      ads[o.title.toLowerCase()] = {
        delta: v,
        currency: this.currencyCode,
        switch: o.isClose ? 'on' : 'off',
      }
    }


    if (ads_delta) {
      let index = ads_delta.findIndex(item => item.id == this.svcId)
      if (index != -1) {
        ads_delta[index] = ads
      } else {
        ads_delta.push(ads)
      }
    } else {
      _p.curPartnerData.pricing_json.service_areas['ads_delta'] = [ads]
    }


    let { mngAmount } = this.curSvc
    if (!mngAmount) {
      mngAmount = 0
    }

    let { val, isClose } = this.mngSettingData[0]
    let mng = {
      "id": this.svcId,
      "delta": val - mngAmount,
      "currency": this.currencyCode,
      "switch": isClose ? 'on' : 'off',
    }

    
    if (mag_delta) {
      let index = mag_delta.findIndex(item => item.id == this.svcId)
      if (isKlook) {
        if(isClose){
          if(index == -1){
            mag_delta.push(mng)
          } else {
            mag_delta[index]= mng
          }
        } else {
          if(index != -1){
            mag_delta.splice(index, 1)
          }
        }
      } else {
        if (index != -1) {
          mag_delta[index] = mng
        } else {
          mag_delta.push(mng)
        }
      }
    } else {
      if (isKlook) {
        if(!isClose){
          _p.curPartnerData.pricing_json.service_areas['mag_delta'] = [mng]
        }
      } else {
        _p.curPartnerData.pricing_json.service_areas['mag_delta'] = [mng]
      }

    }
    console.log('---amenity pour---', _p.curPartnerData.pricing_json);
  }

  async show(id, dList) {
    this.svcId = id
    let { partner_id } = _p.curPartnerData
    this.partnerId = partner_id


    let index = dList.findIndex(item => item.service_area_id == id)
    let arr = await this.getCurrencyandMeet([dList[index]])
    // dList.push(arr[0])
    // dList.splice(index, 1)
    dList[index] = arr[0]

    this.curSvc = dList.find(item => item.service_area_id == id)
    let { currency } = this.curSvc
    this.currencyCode = currency
    await this.insertHtml()
    this.childSeatHandler(id)
    this.mngHandler(id)

    this.rootElm.classList.remove('hide')
  }

 

  childSeatHandler(id) {
    let { cs_p, is_p, ts_p } = this.curSvc
    let { ads_delta } = _p.curPartnerData.pricing_json?.service_areas || {}
    let curSvcAds = (ads_delta || []).find(item => item.id == id)
    // curSvcAds = {
    //   "id": "26486",
    //   "infant": {
    //     "delta": "3",
    //     "currency": "USD",
    //     "switch": "on"
    //   },
    //   "toddler": {
    //     "delta": "3",
    //     "currency": "USD",
    //     "switch": "on"
    //   },
    //   "child": {
    //     "delta": "3",
    //     "currency": "USD",
    //     "switch": "on"
    //   }
    // }



    let { infant, toddler, child: childOld, children } = curSvcAds || {}

    let child = 0
    if (children != undefined) {
      child = children
    } else {
      child = childOld
    }

    this.childSettingData = [
      {
        title: 'Infant',
        desc: '0 to 1 years old.',
        // isClose: infant?.switch == 'off' ? false : true,
        isClose: is_p == undefined ? false : infant?.switch == 'off' ? false : true,
        isSvcClose: is_p == undefined ? false : true,
        val: Number(is_p || 0) + Number(infant?.delta || 0),
        icon: 'i-infant',
        inputType: 'is_p',
      },
      {
        title: 'Toddler',
        desc: '1 to 3 years old.',
        // isClose: toddler?.switch == 'off' ? false : true,
        isClose: ts_p == undefined ? false : toddler?.switch == 'off' ? false : true,
        isSvcClose: ts_p == undefined ? false : true,
        val: Number(ts_p || 0) + Number(toddler?.delta || 0),
        icon: 'i-Toddler',
        inputType: 'ts_p',
      },
      {
        title: 'children',
        desc: '3 to 12 years old.',
        isClose: cs_p == undefined ? false : child?.switch == 'off' ? false : true,
        isSvcClose: cs_p == undefined ? false : true,
        val: Number(cs_p || 0) + Number(child?.delta || 0),
        icon: 'i-child',
        inputType: 'cs_p',
      },
    ]
    let childSetBox = this.rootElm.querySelector('.child-set-box')
    this.fill(childSetBox, this.childSettingData, '2')
  }

  mngHandler(id) {
    let { mag_delta } = _p.curPartnerData.pricing_json?.service_areas || {}
    let { mngAmount: mng } = this.curSvc

    let isHasMng = mng != undefined
    let { delta, switch: pMngIsClose } = (mag_delta || []).find(item => item.id == id) || {}
    if (!pMngIsClose) {
      pMngIsClose = 'off'
    }

    let isClose = false
    if (pMngIsClose == 'on') {
      isClose = true
    }

    if (!delta) {
      delta = 0
    }
    if (!mng) {
      mng = 0
    }



    this.mngSettingData = [
      {
        title: 'Meet And Greet',
        desc: 'Airport placard service',
        isClose,
        isSvcClose: isHasMng,
        val: Number(mng) + Number(delta),
        icon: 'i-meet'
      }
    ]

    let mngSetBox = this.rootElm.querySelector('.mng-set-box')

    this.fill(mngSetBox, this.mngSettingData, '1')
  }
  hide() {

    this.rootElm.classList.add('hide')
  }


  async getCurrencyandMeet(list) {
    let sapids = [];
    let ids = [];
    for (let obj of list) {
      if (obj.service_area_pricing_id) {
        sapids.push(obj.service_area_pricing_id);
      } else {
        ids.push(obj.service_area_id);
      }
    }


    let url = api[stage].sqlTemplatesRun_3 + `?ses=${_d.ses}`
    let data = {
      sql: 134677954,
      service_area_pricing_ids: sapids,
      service_area_ids: ids,
      version: '1.1'
    }

    let res = await svcUtils.fetchData({
      url,
      method: 'POST',
      data
    })

    let results = res.results
    let arr = []
    for (let obj of list) {
      let cur = results.find(item => item.service_area_id == obj.service_area_id) || {}

      let curPricing = cur['pricing']

      let pricingObj = {}
      if (curPricing) {
        pricingObj = JSON.parse(curPricing)
      }

      let { currencyCode, pricing, add_service } = pricingObj
      let { cs_p, is_p, ts_p } = add_service || {}
      let { meet_n_greet } = pricing || {}

      let o = {
        currency: currencyCode,
        mngAmount: meet_n_greet,
        cs_p: cs_p,
        is_p: is_p,
        ts_p: ts_p,
      }

      arr.push(Object.assign({}, o, obj))
    }

    return arr
  }
}

