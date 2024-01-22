class PartnerPreview {

  constructor(id) {
    this.rootElm = document.getElementById(id)
    // return
    this.curPartnerData = {}
    this.curPartnerList = []
    this.selectedPartner = null
    this.searchInput = null // dropdown input
    this.partnerDropdown = null
    this.svcSearchInput = null
    this.isInitPartnerDropdown = false
    this.isInitSvcDropdown = false
    this.sasPercentList = []
    this.magDeltaList = []
    this.spliceList = []
    this.svcType = 1 // 1: settgin service area , 2: setting service area percent
    this.allCountryList = []

    this.svcList = JSON.parse(JSON.stringify(_d.svcList))

    this.titleBarData = new Proxy(['Preview'], {
      set: (target, key, val, receiver) => {
        target[key] = val
        this.initTitleBar()
        return true
      }
    })
    this.initUi()
    this.initTitleBar()
  }

  initTitleBar() {
    let framgent = document.createDocumentFragment()
    for (let title of this.titleBarData) {
      let span = document.createElement('SPAN')
      // span.classList.add('')
      span.innerText = title
      framgent.appendChild(span)
    }
    this.titleBar.innerHTML = ''
    this.titleBar.appendChild(framgent)

    this.titleBar.children[0].addEventListener('click', () => {
      this.resetPageData()
    })
  }


  resetPageData() {
    this.titleBarData.splice(1)
    // this.prevOrNextPage.state.isFirst = true
    // this.paginationBox.classList.remove('hide')
    this.partnerContent.classList.remove('hide')
    this.partnerSearchBox.classList.remove('hide')
    this.threeTableInOneContentBox.classList.add('hide')
    if (this.svcSearchInput) {
      this.svcSearchInput.value = ''
    }
    this.spliceList = []
    this.fillPartnerList(this.selectedPartner ? [this.selectedPartner] : this.curPartnerList)
  }
  initUi() {
    this.titleBar = this.rootElm.querySelector('#partner-pre-set-svc-title-bar')
    this.partnerListBox = this.rootElm.querySelector('.partner-list')
    // this.paginationBox = this.rootElm.querySelector('.partner-pagination-box')

    this.partnerItemBox = this.rootElm.querySelector('.partner-item')
    this.serviceItemBox = this.rootElm.querySelector('.service-item')


    this.partnerSearchBox = this.rootElm.querySelector('.partner-search-box')

    this.partnerContent = this.rootElm.querySelector('.partner-list-box')
    this.threeTableInOneContentBox = this.rootElm.querySelector('.three-table-in-one-content-box')
    this.partnerListClickEvent()
    //delete service areea
  }

  async partnerListClickEvent() {
    let radioList = this.rootElm.querySelectorAll('.radio')

    this.partnerListBox.addEventListener('click', async (e) => {
      let target = e.target

      let toIndex = target.getAttribute('to-index')
      if (!toIndex) return

      let partnerId = Number(target.getAttribute('partner-id'))
      let curPartnerData = this.curPartnerList.find(item => item.partner_id == partnerId)
      this.curPartnerData = JSON.parse(JSON.stringify(curPartnerData))

      this.partnerSearchBox.classList.add('hide')
      this.partnerContent.classList.add('hide')

      console.log('---this.curPartnerData---', curPartnerData);
      let addOnText = this.curPartnerData.partner_name
      let titleArr = [`>Set area`]


      toIndex = Number(toIndex)
      switch (toIndex) {

        case 4:
          this.svcType = 3
          titleArr = [`> View`]
          this.threeTableInOneContentBox.classList.remove('hide')
          // to do ...
          let ptnCountryList = this.partnerDataInit(curPartnerData)
          console.log('----ptnCountryList-----', ptnCountryList);
          this.initPartnerDetailsUi(curPartnerData, ptnCountryList)
          break

        default:
          break;
      }

      this.titleBarData.push(...titleArr)


      let backBtn = document.getElementById('svc-aea-edit-container-show-btn')
      backBtn.style.display = 'none'
    })
  }

  initPartnerDetailsUi(curPartnerData, ptnCountryList) {
    console.log('view---curPartnerData', curPartnerData);
    let partnerNameBox = this.rootElm.querySelector('.partner-name-box')
    let svcCountryNum = this.rootElm.querySelector('.svc-country-num')
    let countryCodeListStr = this.rootElm.querySelector('.svc-country-code-list')

    let countryCodes = ''

    partnerNameBox.innerText = `${curPartnerData.partner_name} +${curPartnerData.percent}%`
    if (curPartnerData.hasOwnProperty('pricing_json') && curPartnerData.pricing_json.hasOwnProperty('country') && curPartnerData.pricing_json.country.hasOwnProperty('include')) {
      svcCountryNum.innerText = `Service country （${curPartnerData.pricing_json.country.include.length}）`
    } else {
      svcCountryNum.innerText = `Service country （0）`
    }

    let thrTableBox = this.rootElm.querySelector('#thr-table-info-item')

    if (ptnCountryList.length !== 0) {
      ptnCountryList.forEach(item => {
        countryCodes += item.countryCode + '/'
      })
      countryCodes = countryCodes.slice(0, -1)

      let framgent = document.createDocumentFragment()
      let thrTableTemplate = this.rootElm.querySelector('.thr-table-info-item-template')
      let cThrTableTemplate = thrTableTemplate.cloneNode(true)
      // cThrTableTemplate.classList.remove('hide', 'template')
      // cThrTableTemplate.innerHTML = ''
      for (let obj of ptnCountryList) {
        let cCountryTemplate = cThrTableTemplate.querySelector('.thr-tab-scv-item').cloneNode(true)
        cCountryTemplate.querySelector('.thr-svc-name-info').innerText = `${obj.countryName} (${obj.countryCode})`
        if (obj.isExclude) {
          cCountryTemplate.classList.add('exclude-country-activy')
        } else {
          cCountryTemplate.querySelectorAll('.thr-svc-info-item')[2].innerText = `${obj.percent}%`
        }
        let framgentInfo = document.createDocumentFragment()
        if (obj.svcList && obj.svcList.length !== 0) {
          obj.svcList.forEach(item => {
            let cSvcTemplate = cThrTableTemplate.querySelector('.thr-tab-country-item').cloneNode(true)
            cSvcTemplate.querySelectorAll('.thr-country-info-item')[0].innerText = item.svcName
            let airCodes = ''
            if (item.airports.length) {
              item.airports.forEach(air => {
                airCodes += air.airport + ','
              })
              airCodes = airCodes.slice(0, -1)
            }
            cSvcTemplate.querySelectorAll('.thr-country-info-item')[1].innerText = airCodes
            cSvcTemplate.querySelectorAll('.thr-country-info-item')[2].innerText = item.svcPercent ? `${item.svcPercent}%` : ''
            cSvcTemplate.querySelectorAll('.thr-country-info-item')[3].innerText = item.svcMag ? `+${item.svcMag} ${item.svcMagCurrency}` : ''
            framgentInfo.appendChild(cSvcTemplate)
          })
        }
        framgent.appendChild(cCountryTemplate)
        framgent.appendChild(framgentInfo)
      }
      thrTableBox.innerHTML = ''
      thrTableBox.appendChild(framgent)
    } else {
      thrTableBox.innerHTML = ''
    }
    countryCodeListStr.innerText = countryCodes
  }

  partnerDataInit(curPartnerData) {
    let it = this
    let countryList = []
    let svcList = []

    // let pricing_json = curPartnerData?.pricing_json || {}
   

    // let {country , service_areas} = pricing_json


    // if(service_areas){
    //   let   {include,exclude} = service_areas

    //   if(include){

    //     include.forEach(()=>{

    //     })
        
    //   }
    //   if(exclude){

    //   }

    // }

    // if(country){
    //   let   {include,exclude} = country

    //   if(include){
        
    //   }
    //   if(exclude){

    //   }

    // }



    if (curPartnerData.hasOwnProperty('pricing_json') && curPartnerData.pricing_json && curPartnerData.pricing_json.hasOwnProperty('service_areas') && curPartnerData.pricing_json.service_areas.hasOwnProperty('include')) {
      curPartnerData.pricing_json.service_areas.include.forEach(item => {
        let svcItem = it.svcList.find(svc => svc.service_area_id == item.id)
        let svcItemPercentObj = null
        if (curPartnerData.pricing_json.service_areas.hasOwnProperty('sas_percent')) {
          svcItemPercentObj = curPartnerData.pricing_json.service_areas.sas_percent.find(sasPnt => sasPnt.id == item.id)
          console.log('qqqqqqqq', svcItemPercentObj);
        }
        let svcItemMagObj = null
        if (curPartnerData.pricing_json.service_areas.hasOwnProperty('mag_delta')) {
          svcItemMagObj = curPartnerData.pricing_json.service_areas.mag_delta.find(sasMag => sasMag.id == item.id)
          console.log('qqqqqqqq', svcItemMagObj);
        }
        if (svcItem) {
          svcList.push({
            id: item['id'],
            countryCode: svcItem['alpha_3'],
            airports: svcItem.airports,
            countryName: svcItem.country_name,
            svcName: svcItem.service_area_name,
            svcPercent: svcItemPercentObj ? svcItemPercentObj.percent : '',
            svcMag: svcItemMagObj ? svcItemMagObj.delta : '',
            svcMagCurrency: svcItemMagObj ? svcItemMagObj.currency : '',
          })
        }
      })
    }
    if (curPartnerData.hasOwnProperty('pricing_json') && curPartnerData.pricing_json.hasOwnProperty('country') && curPartnerData.pricing_json.country.hasOwnProperty('include')) {
      curPartnerData.pricing_json.country.include.forEach(item => {
        let cSvc = svcList.filter(svc => svc.countryCode == item['alpha_'])
        let countryObj = this.allCountryList.find(cuty => cuty.country == item['alpha_'])
        console.log('countryObj', countryObj);
        let cItem = {
          countryCode: item['alpha_'],
          percent: curPartnerData.percent,
          svcList: cSvc
        }
        cItem.countryName = countryObj ? countryObj.name : ''
        countryList.push(cItem)
      });
    }
    if (curPartnerData.hasOwnProperty('pricing_json') && curPartnerData.pricing_json.hasOwnProperty('country') && curPartnerData.pricing_json.country.hasOwnProperty('exclude')) {
      curPartnerData.pricing_json.country.exclude.forEach(item => {
        let countryObj = this.allCountryList.find(cuty => cuty.country == item['alpha_'])
        countryList.push({
          countryCode: item['alpha_'],
          isExclude: true,
          countryName: countryObj ? countryObj.name : ''
        })
      })
    }
    return countryList
  }

  createSVCListFirstItem() {

    let firstItem = this.serviceItemBox.cloneNode(true)
    firstItem.classList.remove('hide', 'template')
    firstItem.classList.add('svc-list-first-item')

    let name = firstItem.querySelector('.item-partner-name')
    // name.innerText = 'Service area'
    name.classList.add('font-wei-600')
    // firstItem.querySelector('.item-add-on').innerText = 'Country/Code'
    this.stateSwitch(firstItem, 'firstItem')
    return firstItem
  }


  stateSwitch(pNode, type) {
    if (type == 'firstItem') {
      pNode.querySelector('.item-last').classList.add('hide-scale')
    }
    let percentBox = pNode.querySelector('.item-percent-box')
    let iMinusCircle = pNode.querySelector('.i-minus-circle')


    switch (this.svcType) {
      case 1:
        percentBox.classList.add('hide')
        // iMinusCircle.classList.add('hide-scale')
        break;
      case 2:
        percentBox.innerText = 'Percent'
        break;
      case 3:
        percentBox.classList.add('hide')
        let general = pNode.querySelector('.item-general')
        let delta = pNode.querySelector('.item-delta')
        let finalPrice = pNode.querySelector('.item-final-price')

        general.classList.remove('hide')
        delta.classList.remove('hide')
        finalPrice.classList.remove('hide')
        finalPrice.classList.add('font-wei-600')



        break;

      default:
        break;
    }
  }


  fill(list = []) {
    let framgent = document.createDocumentFragment()
    framgent.appendChild(this.createSVCListFirstItem())

    let input = document.createElement('INPUT')
    let span = document.createElement('SPAN')
    span.innerText = '%'

    for (let obj of list) {
      let cItem = this.serviceItemBox.cloneNode(true)
      cItem.classList.remove('hide', 'template')
      let svcName = cItem.querySelector('.item-partner-name')
      svcName.innerText = obj.service_area_name

      cItem.querySelector('.item-airport-code').innerText = obj.airports.map(o => o.airport).join(',')

      let code = cItem.querySelector('.item-add-on')
      code.innerText = obj.country_name + '   ' + obj.alpha_3

      let percentBox = cItem.querySelector('.item-percent-box')

      this.stateSwitch(cItem)


      switch (this.svcType) {
        case 2:
          percentBox.innerHTML = ''
          let cInput = input.cloneNode(true)
          cInput.setAttribute('placeholder', 0)
          cInput.classList.add('input')
          cInput.setAttribute('oninput', "value=value.match(/^\\d+(?:\\.\\d{0,2})?/)")

          percentBox.appendChild(cInput)
          let cSpan = span.cloneNode()
          cSpan.innerText = '%'
          percentBox.appendChild(cSpan)
          cInput.value = obj.percent
          cInput.addEventListener('change', e => {
            console.log(list);
            obj.percent = cInput.value
            this.saveBtn.classList.remove('not-allowed')
          })
          break;

        case 3:
          let general = cItem.querySelector('.item-general')
          let delta = cItem.querySelector('.item-delta')
          let finalPrice = cItem.querySelector('.item-final-price')

          let { currency, mngAmount } = obj

          if (!currency) {
            currency = 'undefined'
          }

          let originAmount = mngAmount ? Number(mngAmount) : 0
          general.innerText = originAmount + currency

          delta.innerHTML = ''
          let cDeltaInput = input.cloneNode(true)
          cDeltaInput.setAttribute('placeholder', 0)
          cDeltaInput.setAttribute('type', 'number')
          // cDeltaInput.setAttribute('step', '0.01')
          // cDeltaInput.setAttribute('max', '1000')
          // cDeltaInput.setAttribute('min', '0')

          // cDeltaInput.setAttribute('onkeyup', "value=value.replace(/[^\\-?\\d{0,2}.]/g,'')")
          // cDeltaInput.setAttribute('maxlength', "6")
          cDeltaInput.classList.add('input')

          cDeltaInput.value = obj.delta

          delta.appendChild(cDeltaInput)
          let cDeltaSpan = span.cloneNode()
          cDeltaSpan.innerText = currency
          delta.appendChild(cDeltaSpan)

          let finalValue = originAmount + Number(obj.delta)
          if (finalValue < 0) {
            finalValue = 0
          }

          finalPrice.innerText = (finalValue.toFixed(2)) + currency

          cDeltaInput.addEventListener('change', (e) => {
            let val = Number(Number(e.target.value).toFixed(2))
            e.target.value = val
            obj.delta = val
            let v = val + originAmount
            if (!v || v < 0) {
              v = 0
            }
            finalPrice.innerText = (v.toFixed(2)) + currency
            this.saveBtn.classList.remove('not-allowed')
          })

          break


        default:
          break;
      }

      // if (this.svcType == 1) {
      //   percentBox.classList.add('hide')
      // } else {

      // }

      let itemLast = cItem.querySelector('.item-last')
      itemLast.setAttribute('id', obj.service_area_id)
      framgent.appendChild(cItem)
    }


  }


  fillPartnerListFirstItem() {
    let titleList = ['id', 'Partner Name', 'Add on', 'Operation']
    let framgent = document.createDocumentFragment()
    for (let title of titleList) {
      let div = document.createElement('DIV')
      div.classList.add('item')
      if (title == 'Operation') div.classList.add('just-c-end')
      div.innerText = title
      framgent.appendChild(div)
    }

    let firstItemBox = this.rootElm.querySelector('.first-itme')
    firstItemBox.innerHTML = ''
    firstItemBox.appendChild(framgent)

  }

  fillPartnerList(list = []) {
    let framgent = document.createDocumentFragment()
    let cItemTitle = this.partnerItemBox.cloneNode(true)
    cItemTitle.classList.remove('hide', 'template')
    for (let obj of list) {
      let cItem = this.partnerItemBox.cloneNode(true)
      cItem.classList.remove('hide', 'template')
      let partnerId = cItem.querySelector('.item-partner-id');
      partnerId.innerText = obj.partner_id

      let partnerName = cItem.querySelector('.item-partner-name');
      partnerName.innerText = obj.partner_name_svc
      // partnerName.innerText = '***'



      // let len = 'All'
      // if (obj.dataType == 1) {
      //   len = obj.service_area_list.length
      //   let sLen = obj.service_area_list.length
      //   if (sLen) {
      //     len = sLen
      //   } else {
      //     len = 'All'
      //   }
      // } else {
      //   len = obj.service_area_list.length ? 'All-' + obj.service_area_list.length : 'All'
      // }
      // cItem.querySelector('.item-svc-num').innerText = len

      // itemSvcNum.setAttribute('partner-id', obj.partner_id)
      // itemSvcNum.setAttribute('fleet-id', obj.fleet_id)
      // itemSvcNum.setAttribute('to-service-area-btn', obj.fleet_id)

      let addOnText = cItem.querySelector('.item-add-on');
      addOnText.innerText = obj.percent ? `${obj.percent}%` : ''

      let settingBtns = cItem.querySelectorAll('.icon')
      for (let elm of settingBtns) {
        elm.setAttribute('partner-id', obj.partner_id)
        elm.setAttribute('fleet-id', obj.fleet_id)
      }


      framgent.appendChild(cItem)
    }

    // if (this.curPartnerList.length < this.pageCount) {
    //   this.prevOrNextPage.state.isLast = true
    // } else {
    //   this.prevOrNextPage.state.isLast = false
    // }

    this.partnerListBox.innerHTML = ''
    this.partnerListBox.appendChild(framgent)
  }



  async getPartnerList() {
    let postData = {
      // sql: 134676601,
      sql: 134678213,
      supply_fleet_id: _d.fleet_id,
      rows_to_fetch: 61,
      partner_id: 0,
      version:'1.0'
      // partner_id: 20,
      // partner_name: this.keyword.startsWith('s') ? '\\' + this.keyword : this.keyword
    }
    let { results } = await this.getDataBySqlV3(postData)
    if (results.length == 0) {
      return
    }
    this.curPartnerList = this.dataHandler(results)

    // this.curPartnerList[3].pricing_json.service_areas['mag_delta'] = [{ id: 2649, delta: 10, currency: 'CNY' }]

    console.log('----------- this.curPartnerList-----', this.curPartnerList);

  }

  getDataBySqlV3(d) {
    // this.prevOrNextPage.state.isLast = true
    return new Promise((resolve, reject) => {
      rest.post('partners has price pct list search',
        api[stage].sqlTemplatesRun_3 + '?ses=' + ses, d,
        result => {
          resolve(result)
        },
        err => {
          reject(err)
        })
    })
  }

  dataHandler(list) {
    for (let item of list) {
      if (Object.prototype.toString.call(item.pricing_json) === '[object String]') {
        item.pricing_json = JSON.parse(item.pricing_json.replace(/'/g, '"'))
      }
      if (item.pricing_json) {
        let { service_areas, percent } = item.pricing_json
        if (item.partner_id == 13) {
        }
        item['service_area_list'] = []
        if (service_areas) {
          let { exclude, include } = service_areas
          item['service_area_list'] = exclude || include || []
        }
        item['percent'] = percent
      } else {
        item['service_area_list'] = []
      }
    }
    return list
  }



  initPartnerSearchBox() {

    let input = this.partnerSearchBox.querySelector('.input')


    let dropdown = new TextAutoComp(input, {
      str: (item) => {
        return [item.partner_name_svc];
      },

      sel: (item, hovElm) => {
        if (item) {
          this.selectedPartner = item
          console.log('---item-----', item);
          this.fillPartnerList([item])
        } else {
          input.value = ''
          this.fillPartnerList(this.curPartnerList)
          this.selectedPartner = null
        }
      }
    })

    dropdown.filter = false
    this.partnerSearchBox.querySelector('.icon').addEventListener('click', () => {
      input.focus()
    })

    this.searchInput = input
    this.partnerDropdown = dropdown
    dropdown.setItems(this.curPartnerList)

  }



  getDataBySql(d) {
    // this.prevOrNextPage.state.isLast = true
    return new Promise((resolve, reject) => {
      rest.post('partners has price pct list search',
        api[stage].sqlTemplatesRun + '?ses=' + ses, d,
        result => {
          resolve(result)
        },
        err => {
          reject(err)
        })
    })
  }

  async show() {
    this.rootElm.classList.remove('hide')
    // return
    await this.getPartnerList()
    if (!this.isInitPartnerDropdown) {
      this.initPartnerSearchBox()
      this.isInitPartnerDropdown = true
    }

    this.fillPartnerList(this.selectedPartner ? [this.selectedPartner] : this.curPartnerList)

    this.fillPartnerListFirstItem()

    if (!_allCountryList) {
      let countryRes = await postData(api[stage].sqlTemplatesRun + '?ses=' + ses, { sql: 134677630 })
      this.allCountryList = countryRes.results
      _allCountryList = countryRes.results
      console.log('----allCountryList----', this.allCountryList);
    } else {
      this.allCountryList = _allCountryList
    }
  }




  hide() {
    this.rootElm.classList.add('hide')
  }



  // async getServiceAreaData() {
  //   let d = {
  //     sql: 134677810,
  //     // service_name: this.keyword.startsWith('s') ? '\\' + this.keyword : this.keyword,
  //     // rows_to_fetch: 61,
  //     // fleet_id: this.lastFleetId
  //   }

  //   let { results } = await this.getDataBySql(d)

  //   // await this.getCurrencyandMeet(results)

  //   this.serviceAreaList = results
  //   console.log('----------serviceAreaList- preview-----', this.serviceAreaList);
  // }


  async getCurrencyandMeet(list) {
    let sapids = []
    let ids = []
    for (let obj of list) {
      if (obj.service_area_pricing_id) {
        sapids.push(obj.service_area_pricing_id)
      } else {
        ids.push(obj.service_area_id)
      }
    }




    let res = await this.getDataBySql({
      sql: 134677954,
      service_area_pricing_ids: sapids,
      service_area_ids: ids
    })

    for (let svc of res.results) {

      let obj = list.find((o) => o.service_area_id == svc.service_area_id)
      obj['currency'] = svc.currency.replace(/\"/g, '')
      obj['mngAmount'] = svc.mng_amount
    }
  }

}

