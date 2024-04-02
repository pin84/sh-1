class VehicleMapping {
  constructor() {
    this.rootElm = document.getElementById('vm-wrapper')
    this.curPartner = {}
    this.curActiveItem = null

    this.curIndex = 0
    this.isMousemove = false
    this.initUI()
  }

  initUI() {
    this.content = this.rootElm.querySelector('.content')
    this.content.addEventListener('click', (e) => {
      e.stopPropagation();
    })
    this.rootElm.addEventListener('click', (e) => {
      this.hide()
    })

    this.countryBox = this.rootElm.querySelector('.contruy-list')
    this.countryBox.addEventListener('click', (e) => {
      if (this.isMousemove) return
      console.log('click');
      let target = e.target
      if (!target.classList.contains('name')) return



      this.curActiveItem.classList.remove('active')
      target.classList.add('active')
      this.curActiveItem = target

      this.curIndex = target.getAttribute('index')
      console.log(this.curIndex);
      this.fillMapping()

    })

    // this.countryBox.addEventListener('mousedown', (e) => {
    //  this.isMousemove = false
    //   console.log('mousedown');
    // })
    // this.countryBox.addEventListener('mousemove', (e) => {
    //   console.log('mousemove');

    //   this.isMousemove = true

    // })
    // this.countryBox.addEventListener('mouseup', (e) => {
    //   setTimeout(()=>{
    //     this.isMousemove = false
    //   },100)
    //   console.log('mouseup');
    // })

  }
  fillCountryList() {
    let fragment = document.createDocumentFragment()
    let arr = []
    let i = 0
    console.log(this.dList);

    this.dList.forEach((obj, index) => {
      let div = document.createElement('DIV')
      div.classList.add('name')

      div.setAttribute('index', index)
      if (index == this.curIndex) {
        div.classList.add('active')
        this.curActiveItem = div
      }



      let { countries } = obj
      div.innerText = countries.join(',')
      fragment.appendChild(div)
      arr.push(div)
    })


    this.countryBox.innerHTML = ''
    this.countryBox.appendChild(fragment)
  }

  async fillMapping() {
    let mb = this.rootElm.querySelector('.mapping-box')

    let { partner_name } = this.curPartner
    let fragment = document.createDocumentFragment()
    let first = this.rootElm.querySelector('.first').cloneNode(true)



    first.querySelector('.item-partner').innerText = partner_name
    first.querySelector('.item-partner-passanger').innerText = ''
    // 
    let { countries, mapping } = this.dList[this.curIndex]

    let vehicleList = await _getVehicleList(countries[0]);

    mapping.forEach((obj, index) => {
      let cItem = first.cloneNode(true)
      cItem.classList.remove('first')

      let { elife } = obj
      // let ve = vehicleList.find(item => item.vehicle_id == elife)

      let { vehicle_name, max_luggage, max_passenger, o_max_luggage, o_max_passenger } = vehicleList.find(item => item.vehicle_id == elife)
      let maxLuggage = max_luggage || o_max_luggage
      let maxPassenger = max_passenger || o_max_passenger

      // cItem.querySelector('.item-partner').innerText = obj[`${this.curPartner.partner_name}`]
      cItem.querySelector('.item-partner').innerText = obj[`booking`]
      cItem.querySelector('.item-elife').innerText = vehicle_name
      cItem.querySelector('.item-passanger').innerText = `${maxPassenger}/${maxLuggage}`
      // cItem.querySelector('.item-partner-passanger').innerText = `Configure in the partner portal`
      // cItem.querySelector('.item-partner-passanger').classList.add('hide')

      if (index == 0) {
        let firstElm = cItem.querySelector('.item-partner-passanger')
        firstElm.classList.remove('hide')
        firstElm.innerText = 'Configure in the partner portal'
        firstElm.style.height = '38.5px'
      }

      fragment.appendChild(cItem)
    })

    mb.innerHTML = ''
    mb.appendChild(fragment)
  }

  async commonMapping(id) {

    let elifeVehicle = await _getVehicleList('USA')

    let common = null
    switch (id) {
      case 2:
        common = {
          1: ['STANDARD'],
          2: ['EXECUTIVE'],
          6: ['PEOPLECARRIER'],
          3: ['PEOPLECARRIER'],
          4: ['EXECUTIV]E', 'EXECUTIVEPEOPLECARRIER'],
          5: ['PEOPLECARRIER', 'LARGEPEOPLECARRIER'],
          9: ['MINIBUS'],
          10: ['MINIBUS'],
          11: ['MINIBUS'],
          // 29: ['MINIBUS'],
          41: ['ELECTRICSTANDARD'],
          43: ['ELECTRICLUXURY']
        }
        break;
      default:
        break;
    }



    let tem = {
      countries: [],
      mapping: []
    }

    for (let [key, value] of Object.entries(common)) {
      let { vehicle_name, o_max_luggage, o_max_passenger, max_luggage } = elifeVehicle.find(item => item.vehicle_id == key)
      if (!vehicle_name) continue
      tem['countries'] = ['COMMON']
      value.forEach(v => {
        tem.mapping.push({
          "elife": key,
          "booking": v,
          "max": max_luggage || o_max_luggage
        })

      })
    }

    return tem
  }


  async show(id = 1) {
    let curPartner = _p.partnerList.find(item => item.partner_id == id)
    let { partner_id } = curPartner
    this.curPartner = curPartner

    let dList = curPartner?.pricing_json?.vehicle_type_mapping || []
    let common = await this.commonMapping(partner_id)


    let dListTem = []
    dList.forEach(item => {
      let { countries, mapping } = item
      for (let c of countries) {
        dListTem.push({
          countries: [c],
          mapping
        })
      }

    })

    if (dListTem.findIndex(item => item.countries.includes('COMMON')) == -1) {
      dListTem.unshift(common)
    }
    if (!dListTem.length) return
    this.dList = dListTem
    console.log('---', dListTem);


    this.fillMapping()
    this.fillCountryList()
    this.rootElm.classList.remove('hide')
  }
  hide() {
    this.rootElm.classList.add('hide')
  }
}

let vmMapping = new VehicleMapping()