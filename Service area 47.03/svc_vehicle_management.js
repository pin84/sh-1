class SvcVehicle {

  constructor() {
    this._rootElm = document.getElementById('vehicle-manage-wrapper')
    // this._comTable = this._rootElm.querySelector('.com-table')
    this.sections = this._rootElm.querySelectorAll('.main-body .section')
    this.vehicleList = []
    this.vehicleElmList = []
    this.sqlRunURL = api[stage].sqlTemplatesRun + '?ses=' + ses
    this.apiBase64URL = null
    this.homeBase64URL = null
    this.countryCode = 'CHN'
    this.isHasImg = false
    this.langTr = {
      eng: 'English',
      zho: 'Chinese',
      spa: 'Spanish',
      jpn: 'Janpenese',
    }
    this.curVehicle = {
      // "vehicle_id": 1,
      // "vehicle_name": "Sedan",
      // "o_max_passenger": 3,
      // "o_maker": "Toyota",
      // "o_model": "Camry",
      // "o_image_url": "https://elifelimo.s3.us-east-2.amazonaws.com/art/vehicle/sm/sedan.jpg",
      // "o_image_url_2": "https://elifetransfer.s3.us-east-2.amazonaws.com/art/icon/consumer_pc/sedan.png",
      // "o_max_luggage": 3,
      // "vm_id": 11,
      // "maker": "大众a",
      // "model": "大众朗逸a",
      // "max_passenger": 4,
      // "max_luggage": 6,
      // "image_url_1": "https://elifelimo.s3.us-east-2.amazonaws.com/art/vehicle/sm/sedan.jpg",
      // "image_url_2": "https://elifetransfer.s3.us-east-2.amazonaws.com/art/icon/consumer_pc/sedan.png",
      // "maker_txt_id": 1615,
      // "model_txt_id": 1616,
      // "lang": {
      //   "eng": {
      //     "maker": "Toyota",
      //     "model": "Camry"
      //   },
      //   "jpn": {
      //     "maker": "aaa",
      //     "model": "ad"
      //   },
      //   "spa": {
      //     "maker": "aa",
      //     "model": "33"
      //   },
      //   "zho": {
      //     "maker": "a1",
      //     "model": "a2"
      //   }
      // }
    }
    this.tabList = [
      {
        eng: 'Vehicle Management',
        zho: '车辆管理',
      }
    ]

    this.initElm()
    this.getCoutryList()
    this.initTab()

    this._rootElm.addEventListener('click', e => {
      this.changeSection(e)
    })
    // this.switchSection(2)

    this.events()

    this.backBtn = document.getElementById('svc-aea-edit-container-show-btn')
    this.backBtnDisplay = this.backBtn.style.display
  }

  initElm() {
    this.apiImgShowBox = this._rootElm.querySelector('.api-img-show')
    this.homeImgShowBox = this._rootElm.querySelector('.home-img-show')
  }

  async getCoutryList() {
    let data = null
    if (!_allCountryList) {
      let res = await postData(this.sqlRunURL, { sql: 134677630 })
      data = res.results
      _allCountryList = res.results
    } else {
      data = _allCountryList
    }
    let input = this._rootElm.querySelector('.coutry-dropdown-input')
    let dorpdown = new TextAutoComp(input, {
      str: (item) => {
        return [item.name, item.country];
      },

      sel: async (item, hovElm) => {
        if (item) {
          console.log(item);
          let { country } = item
          this.countryCode = country
          this.vehicleList = await _getVehicleList(this.countryCode, true)
          this.switchSection(1)
          input.value = ''
        }
      }
    })
    dorpdown.setItems(data)

    console.log('-res-', data);
  }

  events() {
    let apiImgInput = this._rootElm.querySelector('#api-img-uplod')
    apiImgInput.addEventListener('change', async e => {
      homeImgInput.classList.remove('warn-border')
      let file = e.target.files[0]
      let base64URL = await svcUtils.fileToBase64(file)
      // let url = api[stage].blobs + `?ses=${ses}&resource_type=134283280&resource_id=${this.curVehicle.vm_id}`
      // let res = await utils.base64Upload(base64URL, url)
      // this.curVehicle.image_url_1 = res.url

      this.apiBase64URL = base64URL

      let imgStr = `<img class="img" src="${base64URL}" alt="uploaded img">`
      this.apiImgShowBox.innerHTML = imgStr

      this.apiImgShowBox.classList.remove('warn-border')
    })

    let homeImgInput = this._rootElm.querySelector('#home-img-uplod')
    homeImgInput.addEventListener('change', async e => {
      homeImgInput.classList.remove('warn-border')
      let file = e.target.files[0]
      let base64URL = await svcUtils.fileToBase64(file)
      // let url = api[stage].blobs + `?ses=${ses}&resource_type=134283280&resource_id=${this.curVehicle.vm_id}`
      // let res = await utils.base64Upload(base64URL, url)
      // this.curVehicle.image_url_2 = res.url

      this.homeBase64URL = base64URL

      let imgStr = `<img class="img" src="${base64URL}" alt="uploaded img">`
      this.homeImgShowBox.innerHTML = imgStr
      this.homeImgShowBox.classList.remove('warn-border')
    })


    this._rootElm.querySelector('.cancel').addEventListener('click', e => {
      this.switchSection(1)
    })
    this._rootElm.querySelector('.save').addEventListener('click', e => this.saveData())
  }

  check() {
    let inputs = this._rootElm.querySelectorAll('.vehicle-info .input')
    for (let input of Array.from(inputs)) {
      if (!input.value) {
        input.classList.add('warn-border')
        return
      }
    }

    if (!this.isHasImg) {
      if (!this.apiBase64URL) {
        this.apiImgShowBox.classList.add('warn-border')
        return
      }
      if (!this.homeBase64URL) {
        this.homeImgShowBox.classList.add('warn-border')
        return
      }
    }

    return true
  }

  async saveData() {
    console.log(this.curVehicle);
    if (!this.check()) return
    let lang = {}
    let inputs = this._rootElm.querySelectorAll('.language-list input')
    for (let input of Array.from(inputs)) {
      let langCode = input.getAttribute('lang')
      let type = input.getAttribute('inputType')
      if (!lang[langCode]) {
        lang[langCode] = {}
      }
      lang[langCode][type] = input.value
    }

    let { vm_id, maker, model, max_passenger, max_luggage, image_url_1, image_url_2, vehicle_id, maker_txt_id, model_txt_id, o_maker, o_model, o_max_passenger, o_max_luggage, o_image_url, o_image_url_2 } = this.curVehicle

    let langList = []
    for (let [key, value] of Object.entries(lang)) {
      let { maker, model } = value
      langList.push({
        maker,
        model,
        model_txt_id,
        maker_txt_id,
        lang_code: key
      })
    }

    let d = {
      sql: 134678022,
      country: this.countryCode,
      maker: maker,
      model: model,
      min_passenger: 1,
      min_luggage: 1,
      max_passenger,
      max_luggage,
      // image_url_1,
      // image_url_2 ,
      vehicle_id,
      langList
    }
    if (vm_id) {
      d['vm_id'] = vm_id
    }
    console.log('----save data----', d);

    let res = await postData(this.sqlRunURL, d)


    let url = api[stage].blobs + `?ses=${ses}&resource_type=134283280&resource_id=${res.vm_id ? res.vm_id : vm_id}`


    if (this.apiBase64URL) {
      svcUtils.base64Upload(this.apiBase64URL, url, 'apiImg' + new Date())
      // this.curVehicle.image_url_1 = res.url
      // d['image_url_1'] = res.url
    }

    if (this.homeBase64URL) {
      svcUtils.base64Upload(this.homeBase64URL, url, 'homeImg' + new Date())
      // this.curVehicle.image_url_2 = res.url
      // d['image_url_2'] = res.url
    }
    this.vehicleList = await _getVehicleList(this.countryCode, true)


    svcUtils.toast()

    let oVehicle = this.vehicleList.find(item => item.vehicle_id == vehicle_id)
    oVehicle = this.curVehicle


    // console.log('------res-----',res);
  }


  async changeSection(e) {
    let target = e.target
    let type = target.getAttribute('type')
    switch (type) {
      // case 'country':
      //   this.vehicleList = await _getVehicleList(this.countryCode,true)
      //   this.switchSection(1)
      //   break;
      case 'vehicle':
        let id = Number(target.getAttribute('id'))
        this.curVehicle = JSON.parse(JSON.stringify(this.vehicleList.find(item => item.vehicle_id == id)))
        let { vehicle_name, vehicle_id } = this.curVehicle
        console.log('---- this.curVehicle--', this.curVehicle);
        this.tabList.push({
          eng: `${vehicle_name}`,
          zho: '',
        })
        this.switchSection(2)
        break;

      default:
        break;
    }
  }



  switchSection(idx) {
    for (let elm of this.sections) {
      elm.classList.add('hide')
    }
    this.sections[idx].classList.remove('hide')
    switch (idx) {
      case 0:
        this.tabList.length = 1

        this.backBtn.style.display = this.backBtnDisplay
        break;
      case 1:
        this.tabList.push({
          eng: `Setting(${this.countryCode})`,
          zho: '设置',
        })
        this.tabList.length = 2


        let vehicleList = JSON.parse(JSON.stringify(this.vehicleList))
        vehicleList.unshift({})
        let d = {
          titles: ['Vehicle class', 'Maker', 'Model', 'Passanger(s)', 'Luggage(s)', 'API image', 'Home page', 'Language'],
          keys: ['vehicle_name', 'maker', 'model', 'max_passenger', 'max_luggage', 'image_url', 'image_url_2', ''],
          data: vehicleList,
          elm: this._rootElm.querySelector('.vehicle-list'),
          type: 'vehicle'
        }

        this.fill(d)
        this.backBtn.style.display = this.backBtnDisplay
        break;
      case 2:
        this.isHasImg = false
        let { vehicle_name, vehicle_id, vm_id, o_maker, o_model, o_max_passenger, o_max_luggage } = this.curVehicle


        let innerText = `${vehicle_name}(${vehicle_id})-${o_maker}-${o_model}-passenger(s):${o_max_passenger}-luggage(s):${o_max_luggage}`

        this._rootElm.querySelector('.cur-vehicle-name').innerText = innerText

        this.tabList.length = 3


        // let apiImg = '<span class="icon i-img1"></span>'
        // if (image_url_1) {
        //   apiImg = `<img class="img" src="${image_url_1}" alt="uploaded img">`
        // }
        this.apiImgShowBox.innerHTML = '<span class="icon i-img1"></span>'

        // let homeImg = '<span class="icon i-img1"></span>'
        // if (image_url_2) {
        //   homeImg = `<img class="img" src="${image_url_2}" alt="uploaded img">`
        // }
        this.homeImgShowBox.innerHTML = '<span class="icon i-img1"></span>'
        if (vm_id) {
          this.getImg(vm_id, this.apiImgShowBox, this.homeImgShowBox)
          this.isHasImg = true
        }
        this.fillVehicleDetail()
        this.fillLanguage()


        this.backBtn.style.display = 'none'
        break;

      default:
        break;
    }

    this.initTab()
  }


  initTab() {
    let topBox = this._rootElm.querySelector('.tab-box')
    topBox.innerHTML = ''
    let fragment = document.createDocumentFragment()
    let len = this.tabList.length - 1
    this.tabList.forEach((obj, index) => {
      let span = document.createElement('SPAN')
      span.classList.add('pointer')
      let innerText = _d.langCode == 'eng' ? obj.eng : obj.zho
      if (len != index) {
        innerText += ' - '
      }
      span.innerText = innerText
      span.setAttribute('idx', index)

      span.addEventListener('click', e => {
        this.switchSection(Number(e.target.getAttribute('idx')))
      })
      fragment.appendChild(span)
    })

    topBox.appendChild(fragment)
  }


  fillVehicleDetail() {
    let curVehicle = this.curVehicle
    let info = this._rootElm.querySelector('.vehicle-info')
    info.innerHTML = ''

    let titles = ['Maker*', 'Passenger(s)*', 'Model*', 'Luggage(s)*']
    let keys = ['maker', 'max_passenger', 'model', 'max_luggage']
    let infoFragment = document.createDocumentFragment()
    let vehicleInfoItem = this._rootElm.querySelector('.template .vehicle-info-item')
    titles.forEach((title, index) => {
      let cItem = vehicleInfoItem.cloneNode(true)
      cItem.querySelector('.item-title').innerText = title

      let input = cItem.querySelector('.input')
      input.setAttribute('placeholder', titles[index])

      if (index == 1 || index == 3) {
        input.setAttribute('oninput', 'value=value.match(/^\\d+(?:\\.\\d)?/)')
      }


      let val = curVehicle[keys[index]] ? curVehicle[keys[index]] : ''
      input.value = val
      input.addEventListener('input', e => {
        curVehicle[keys[index]] = input.value
        input.classList.remove('warn-border')
      })
      infoFragment.appendChild(cItem)

    })

    info.appendChild(infoFragment)

    let { image_url_1, image_url_2, o_image_url, o_image_url_2 } = curVehicle

    // let apiImg = '<span class="icon i-img1"></span>'
    // if (image_url_1) {
    //   apiImg = `<img class="img" src="${image_url_1}" alt="uploaded img">`
    // }
    // this.apiImgShowBox.innerHTML = apiImg
    this.apiImgShowBox.classList.remove('warn-border')

    // let homeImg = '<span class="icon i-img1"></span>'
    // if (image_url_2) {
    //   homeImg = `<img class="img" src="${image_url_2}" alt="uploaded img">`
    // }
    // this.homeImgShowBox.innerHTML = homeImg
    this.homeImgShowBox.classList.remove('warn-border')

    let apiImgInput = this._rootElm.querySelector('#api-img-uplod')
    apiImgInput.value = ''

    let homeImgInput = this._rootElm.querySelector('#home-img-uplod')
    homeImgInput.value = ''


    this.apiBase64URL = null
    this.homeBase64URL = null
  }

  fillLanguage() {
    let { lang } = this.curVehicle
    let info = this._rootElm.querySelector('.language-list')
    info.innerHTML = ''
    let titles = ['eng', 'jpn', 'zho', 'spa']
    let infoFragment = document.createDocumentFragment()
    let vehicleInfoItem = this._rootElm.querySelector('.template .language-item')
    titles.forEach((title, index) => {
      let cItem = vehicleInfoItem.cloneNode(true)
      cItem.querySelector('.item-title').innerText = this.langTr[title]
      let makerInput = cItem.querySelector('.maker-input')
      makerInput.value = lang[title]?.maker || ''
      makerInput.setAttribute('lang', title)

      let modelInput = cItem.querySelector('.model-input')
      modelInput.value = lang[title]?.model || ''
      modelInput.setAttribute('lang', title)



      infoFragment.appendChild(cItem)
    })

    info.appendChild(infoFragment)

  }



  async fill({
    titles = [],
    data = [],
    keys = [],
    elm = null,
    type = 'country'
  } = {}) {
    if (!elm) return
    this.vehicleElmList = []
    elm.innerHTML = ''
    let fragment = document.createDocumentFragment()
    for (let index = 0, len = data.length; index < len; index++) {
      let item = data[index]
      let tableItemBox = document.createElement('DIV')
      tableItemBox.classList.add('table-item-box')
      tableItemBox.setAttribute('vm_id', item.vm_id || 0)
      if (index == 0) {
        tableItemBox.classList.add('title')
      }
      titles.forEach((title, idx) => {
        let div = document.createElement('DIV')
        div.classList.add('item', item.vehicle_id)
        if (index == 0) {
          div.innerText = title
        } else {
          let elm = document.createElement('SPAN')
          let innerText = item[`${keys[idx]}`] || item[`o_${keys[idx]}`]

          if (idx == 0) {
            elm.classList.add('pointer', 'name-container')
            elm.setAttribute('type', type == 'country' ? `country` : 'vehicle')
            elm.setAttribute('id', item.vehicle_id)
          }

          if (idx == 0 && type == 'vehicle') {
            innerText += `(${item.vehicle_id})`
          }
          if (idx == 5 || idx == 6) {
            let parser = new DOMParser();
            elm = parser
              .parseFromString('<div  class="icon i-img1"></div>', 'text/html')
              .querySelector('.i-img1')

            if (innerText) {
              elm = document.createElement('img')
              elm.src = innerText

              elm.setAttribute('loading', 'lazy')

              // if (item.vm_id) {
              if (idx == 5) {
                elm.className = 'apiImg'
              } else {
                elm.className = 'homeImg'
              }
              // }
            }
          } else if (idx == 7) {
            let { lang } = item
            let arr = []
            for (let [key, value] of Object.entries(lang)) {
              arr.push(this.langTr[key])
            }
            elm.innerText = arr.join(',')
          } else {
            elm.innerText = innerText
          }
          div.appendChild(elm)
        }
        tableItemBox.appendChild(div)
      })

      this.vehicleElmList.push(tableItemBox)
      fragment.appendChild(tableItemBox)
    }
    elm.appendChild(fragment)
    setTimeout(() => {
      this.getImgList()
    }, 200)
  }



  async getImgList() {
    for (let elm of Array.from(this.vehicleElmList)) {
      let vmId = Number(elm.getAttribute('vm_id'))
      if (!vmId) continue
      console.log(elm);
      let apiImg = elm.querySelector('.apiImg')?.parentNode || elm.querySelectorAll('.item')[5]
      let homeImg = elm.querySelector('.homeImg')?.parentNode || elm.querySelectorAll('.item')[6]
      await this.getImg(vmId, apiImg, homeImg)
    }
  }


  async getImg(vm_id, apiImgBox, homeImgBox) {
    let url1 = api[stage].blobs + '/key'
    let { res, code: resultCode } = await svcUtils.get(url1, { resource_id: vm_id, ses, resource_type: 134283280 })
    if (resultCode != 0) return
    let apiObj = res.files.find(item => item.url.includes('apiImg'))
    let homeObj = res.files.find(item => item.url.includes('homeImg'))

    if (!apiObj || !homeObj) return
    let url2 = api[stage].blobs + '/id/urls'

    if (apiImgBox) {
      postData(url2, { id: apiObj.url, ses }).then(res => {
        apiImgBox.innerHTML = '<img class="apiImg" style="max-width:100%;" src="' + res.url + '" >'

      })
    }
    if (homeImgBox) {
      postData(url2, { id: homeObj.url, ses }).then(res => {
        homeImgBox.innerHTML = '<img class="homeImg" style="max-width:100%; " src="' + res.url + '" >'
      })
    }
  }

  async show() {
    this.switchSection(0)
  }

}

var _svcVehicle = null

function getSvcVehicle() {
  if (!_svcVehicle) {

    _svcVehicle = new SvcVehicle()
  }
  return _svcVehicle
}