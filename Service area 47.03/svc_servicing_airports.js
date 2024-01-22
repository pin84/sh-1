/**
 * @format
 * @Description: servicing_airports
 * @Author: Joy
 * @Date: 2023-07-07 15:00:51
 * @LastEditTime: 2023-07-07 15:00:51
 * @LastEditors: Joy
 */

class ServicingAirports {
  constructor(id) {
    this.rootElm = elmOfId(id);
    this.mapRootElm = elmOfId('map-box');
    this.countryAirports = []; // airports select data
    this.scriptUaData = null; // for test
    this.firstInit = true;

    this.map = null
    this.center = null
    this.isHasBasicCircle = false
    this.isSetUrbanArea = false

  }

  initMapElm() {
    let { serviceArea: { lat, lng, radius } } = serviceArea
    this.center = { lat, lng }
    this.radius = radius
    if (_d.isGoogleMap) {
      this.map = new GoogleMap(this.center)
    } else {
      this.map = new HereMap(this.center)
    }
    let mapElm = this.mapRootElm.querySelector('#map')
    this.mapElm = mapElm
    mapElm.innerHTML = ''
    this.map.initMap(mapElm)
  }

  paintBasicCircle() {
    let { countryCode, serviceArea: { lat, lng, radius }, airports } = serviceArea

    if (airports.length == 1 && !airports[0]) return
    if (!countryCode) return

    this.map.addCircleToMap({ center: { lat, lng }, radius: radius || 150000, idx: 0, isBasicCircle: true })
    this.isHasBasicCircle = true

    document.addEventListener('circleDrag', this.circleDrag)

    this.map.setLookAtData(0)

    let { zones } = serviceArea
    if (!zones) return
    zones.forEach((zone, index) => {
      let { lat, lng, radius } = zone
      if (zone.hasOwnProperty('polygons')) {
        this.map.addPolygonToMap(zone.polygons, index + 1, false);
      } else {
        this.map.addCircleToMap({ center: { lat, lng }, radius: radius, idx: index + 1, isClick: false })
      }
      
    })
  }

  circleDrag(e) {
    let { evt, index } = e.detail;
    let circleCenter = _d.isGoogleMap ? evt.getCenter() : evt.target.getCenter();
    const latitude = _d.isGoogleMap ? circleCenter.lat() : circleCenter.lat;
    const longitude = _d.isGoogleMap ? circleCenter.lng() : circleCenter.lng;

    serviceArea.serviceArea.lat = latitude
    serviceArea.serviceArea.lng = longitude
  }

  radiusHandler() {
    let { serviceArea: { radius }, countryCode, req_id } = serviceArea
    if (!countryCode) return
    // console.log('------111--');


    let im = imByCountry(countryCode)

    let radiusVal = mtr2mkm(radius, im) || 150
    this.radiusInput.value = radiusVal
    this.distanceUnitElms.innerText = im ? 'km' : 'M'

    this.radiusInput.onchange = () => {
      let val = mkm2mtr(this.radiusInput.value, im)

      serviceArea.serviceArea.radius = val
      this.map.setRadius(0, val)
    }

    // this.radiusInput.addEventListener('change', () => {

    // },{once})

    this.bindCircleRadiusChange = this.circleRadiusChange.bind(this)

    document.addEventListener('circleRadiusChange', this.bindCircleRadiusChange)
  }

  circleRadiusChange(e) {
    console.log('----circleRadiusChange=======', e);
    let radius = parseInt(e.detail.radius)

    this.radiusInput.value = mtr2mkm(radius, im)
    serviceArea.serviceArea.radius = radius
  }


  async airportsHandler() {
    let { countryCode, airports } = serviceArea
    let box = this.rootElm.querySelector('.airports-roll-box')
    box.innerHTML = ''

    if (!countryCode) return
    let allAirportOfCountry = await airportListCache(countryCode)

    let rollItem = this.rootElm.querySelector('.airports-item-box')
    let fragm = document.createDocumentFragment()

    airports.forEach((airportCode, index) => {
      let cItem = rollItem.cloneNode(true)
      cItem.classList.remove('hide')
      let input = cItem.querySelector('.airport-input')
      input.setAttribute('idx', index)

      input.addEventListener('focus', () => {
        this.inputStatusStyle(input.parentElement, 'focus');
      })
      input.addEventListener('blur', () => {
        this.inputStatusStyle(input.parentElement);
      })

      let airportDropdown = new TextAutoComp(input, {
        str: (item) => {
          return [item.code, item.name];
        },
        sel: async (item, hovElm) => {
          if (item) {
            let idx = input.getAttribute('idx')
            await this.changeAirport(idx, item)
            this.inputStatusStyle(input.parentElement);
          }
        }
      })




      airportDropdown.setItems(allAirportOfCountry)
      let airportData = allAirportOfCountry.find(item => item.code == airportCode)
      let delBtn = cItem.querySelector('.i-icon-delete')
      delBtn.setAttribute('idx', index)

      if (airportData) {
        let { code, name } = airportData
        input.value = `${code},${name}`
        delBtn.setAttribute('code', code)
      } else {
        delBtn.setAttribute('code', '')
      }

      delBtn.addEventListener('click', this.deleteAirport.bind(this))
      fragm.appendChild(cItem)
    })

    box.appendChild(fragm)
  }

  async changeAirport(idx, item) {
    let { airports } = serviceArea
    let { code } = item
    airports.splice(idx, 1, code)
    await this.adjustAirports()
  }

  deleteAirport(e) {
    let airport = e.target.getAttribute('code')
    // let idx = e.target.getAttribute('idx')
    let { airports } = serviceArea
    if (airports.length == 1) return

    let filter = airports.filter(item => item !== airport)
    serviceArea.airports = filter
    this.airportsHandler()
    this.adjustAirports()
  }

  async addAirport() {
    let { airports } = serviceArea
    if (airports.includes('')) {
      await svcUtils.msgBox({
        msg: 'Please select an airport first !'
      })
      return
    }
    serviceArea.airports.push('')
    this.airportsHandler()
  }

  svcNameHandler() {
    let svcNameInput = this.rootElm.querySelector('#set-svcname-input')
    this.svcNameInput = svcNameInput
    let { serviceArea: { name } } = serviceArea
    svcNameInput.value = name
    svcNameInput.addEventListener('change', () => {
      serviceArea.serviceArea.name = svcNameInput.value
      this.inputStatusStyle(svcNameInput)
    })


  }

  setUrbanArea() {
    let area_geometry = serviceArea.downtown_areas?.area_geometry
    // console.log(area_geometry)
    if (!area_geometry) return
    this.map.addPolygonToMap(area_geometry, 'UrbanArea', true)

    document.addEventListener('changePolygon', this.changePolygon)
    this.isSetUrbanArea = true
  }

  changePolygon(e) {
    serviceArea['downtown_areas']['area_geometry'] = e.detail.list

    console.log('changePolygon===', e.detail);
  }



  createCircle() {
    let arr = [];

    let { lat, lng } = serviceArea.serviceArea
    let r = 1;
    let len = 6;
    for (let i = 0; i < len; i++) {
      let h = ((2 * Math.PI) / 360) * (360 / len) * i;
      let x = lat + Math.sin(h) * r;
      let y = lng - Math.cos(h) * r;

      arr.push({ 'lat': x, 'lng': y });
    }
    return arr;
  }


  async initElms() {
    // this.radius = new IntInputFieldTmpl(elmOfIdRel('set-radius-content', this.rootElm));
    this.radiusInput = elmOfIdRel('set-radius-input', this.mapRootElm);
    this.handleInputStatusStyle(this.radiusInput, this.radiusInput.parentElement, 'focus');
    this.handleInputStatusStyle(this.radiusInput, this.radiusInput.parentElement, 'blur');
    this.handleInputStatusStyle(this.radiusInput, this.radiusInput.parentElement, 'input');

    this.customMapFullBtn = this.mapRootElm.querySelector('.map-full-btn');
    this.firstInit && this.customMapFullBtn.addEventListener('click', () => {
      this.mapElm.requestFullscreen();
    });

    let editContentShowBtn = this.mapRootElm.querySelector('.map-edit-btn');
    let editContent = this.mapRootElm.querySelector('.map-edit-content-box');
    this.firstInit && editContentShowBtn.addEventListener('click', () => {
      editContent.classList.toggle('hide')
    });

    this.setUrbanAreaBtn = elmOfIdRel('urban-area-shape-btn', this.mapRootElm);
    this.firstInit && this.setUrbanAreaBtn.addEventListener('click', () => {
      if (this.isSetUrbanArea) return
      let arr = this.createCircle()
      serviceArea['downtown_areas'] = {
        area_geometry: arr
      }
      this.setUrbanArea()
    });

    this.deleteUrbanAreaBtn = elmOfIdRel('urban-area-delete-btn', this.mapRootElm);
    this.firstInit && this.deleteUrbanAreaBtn.addEventListener('click', () => {
      this.deleteDowntownAreas()
    });

    // this.distanceUnitElms = getElmsRelativeByName('distance-unit', this.rootElm);
    this.distanceUnitElms = this.mapRootElm.querySelector('.radius-unit')


    this.setCoordinateStringInput = this.mapRootElm.querySelector('#set-coordinate-string-input');
    this.firstInit && this.setCoordinateStringInput.addEventListener('click', (e) => {
      e.stopPropagation();
    });
    this.setCoordinateStringInput.addEventListener('input', (e) => {
      this.scriptUaData = e.target.value
    });


    //this elm for Kevin's test
    this.drawUrbanAreaBtn = this.mapRootElm.querySelector('#draw-urban-area-btn');


    this.firstInit && this.drawUrbanAreaBtn.addEventListener('click', (e) => {
      // let testd = 'lat:29.78862653994462,lng:106.45039636349755/lat:29.79696289214775,lng:106.66190222505718/lat:29.75743841382531,lng:106.8624077671749/lat:29.36912623216081,lng:106.68513718755375/lat:29.42892238632746,lng:106.3912602599859/lat:29.627225839339633,lng:106.38154681038917'

      let arr = []
      for (let str of this.scriptUaData.split('/')) {
        let obj = {}
        str.split(',').forEach(item => {
          let [a1, a2] = item.split(':')
          obj[a1] = Number(a2)
        })
        arr.push(obj)
      }
      this.deleteDowntownAreas()
      serviceArea['downtown_areas'] = {
        area_geometry: arr
      }
      this.setUrbanArea()
    });

    let addAirportBtn = this.rootElm.querySelector('#airports-item-box-add')
    this.firstInit && addAirportBtn.addEventListener('click', this.addAirport.bind(this))

    await this.fill(serviceArea);
  }

  deleteDowntownAreas() {
    this.map.removeObject('UrbanArea')
    delete serviceArea.downtown_areas
    this.isSetUrbanArea = false
  }

  async initCountry() {
    let _this = this;

    let { countryCode } = serviceArea;
    _this.countryBox = elmOfIdRel('select-country', _this.rootElm);
    let countryElm = this.rootElm.querySelector('#slt-country-input')
    this.countryElm = countryElm
    let countryObj = cellCountryCodes.find((item) => item.country == countryCode);
    let str = ''
    if (countryObj) {
      str = `${countryObj.country},${countryObj.name}`
    }
    countryElm.value = str

    if (_this.countryAutoComp instanceof TextAutoComp) return;
    _this.countryAutoComp = new TextAutoComp(countryElm, {
      str: (item) => {
        return [item.name, item.country];
      },
      sel: async (item) => {
        console.log('======', item);
        if (!item) return;
        let { country } = item
        _d.countryCode = country;
        dU = country == 'USA' || country == 'GBR' ? 0 : 1;
        im = imByCountry(country);
        _d.im = imByCountry(country)
        _d.unit = _d.im ? 'KM' : 'M'
        _d.isGoogleMap = isGoogleMap(country)

        serviceArea.countryCode = country
        this.distanceUnitElms.innerText = im ? 'km' : 'M'

        console.log('-------_d.unit,_d.im----------',  _d.unit,_d.im);
        if (this.map) {
          this.clearMap()
        }
        this.initMapElm()
        this.airportsHandler()
        this.radiusHandler()


        this.inputStatusStyle(this.countryElm);
        if (_d.isAddServiceAreaState) {
          let current = currencyCountries.find((o) => o.country == country);
          if (current) {
            serviceArea.currencyCode = current.currency;
            _this.currencyElm.value = current.currency;
          }
        }
      },
    });
    _this.countryAutoComp.setItems(cellCountryCodes);
  }
  initCurrency() {
    let currencyElm = elmOfIdRel('slt-currency-input', this.rootElm);
    this.currencyElm = currencyElm
    currencyElm.value = serviceArea.currencyCode || ''
    if (this.currencyAutoComp instanceof TextAutoCompSql) return;
    this.currencyAutoComp = new TextAutoCompSql(
      currencyElm,
      {
        str: (item) => {
          return [item.currency];
        },
        sel: (item) => {
          if (item) {
            this.changeServiceAreaCurrencyCode(item.currency);
          }
        },
        matchExact: (item, val) => {
          if (item.currency == val.trim()) {
            return true;
          } else {
            return false;
          }
        },
      },
      { sql: 134677628 }
    );
    this.currencyAutoComp.runSql();
    this.currencyAutoComp.filter = false;
  }

  clearMap() {
    this.map.removeAll()
    this.isHasBasicCircle = false
    serviceArea.airports = ['']
  }



  async fill(serviceAreaData) {
    let { countryCode, airports } = serviceArea;
    if (airports) {
      for (let airportCode of airports) {
        if (airportCode == '') continue
        airportCache(airportCode);
      }
    }
    this.radiusHandler()


    this.svcNameHandler()
    this.initCountry();
    this.initCurrency();

    this.initMapElm()

    this.airportsHandler()
    this.paintBasicCircle()
    this.setUrbanArea()
  }

  dealZones(serviceAreaData) {
    serviceAreaData.zones &&
      serviceAreaData.zones.map((zone) => {
        let prices = [];
        if (zone.p2p == 'true' && !zone.p2p_t) {
          zone.p2p_t = `${serviceAreaData.airports[0]}.p`;
        }
        serviceAreaData.airports.map((airport) => {
          let newPrice = {
            airport: airport,
            amount: 0,
            currency: serviceArea.currencyCode,
            p_amt: 0,
            d_amt: 0,
          };
          zone.prices.forEach((price) => {
            if (airport == price.airport) {
              newPrice = price;
              newPrice.p_amt = price.p_amt || price.amount;
              newPrice.d_amt = price.d_amt || price.amount;
              if (!newPrice.amount && newPrice.amount !== 0) newPrice.amount = price.p_amt;
            }
          });
          prices.push(newPrice);
        });
        zone.prices = prices;
      });
  }
  validate() {
    // this.radiusInput.dispatchEvent(new Event('change'));

    let { airports, countryCode, serviceArea: { name, radius } } = serviceArea
    let im = imByCountry(countryCode)
    let val = mkm2mtr(this.radiusInput.value, im)
    serviceArea.serviceArea.radius = val

    if (!name) {
      this.inputStatusStyle(this.svcNameInput, 'focus');
      return;
    }
    if (!countryCode) {
      this.inputStatusStyle(this.countryElm, 'focus');
      return;
    }
    // if (!radius) {
    //   this.inputStatusStyle(this.radiusInput.parentElement, 'focus');
    //   return false;
    // }
    let selectAirportsBoxs = this.rootElm.querySelectorAll('.select-airports-box')
    let i = 0
    for (let airport of airports) {
      if (!airport) {
        this.inputStatusStyle(selectAirportsBoxs[i + 1], 'focus');
        return
      }
      i++
    }
    return true;
  }
  changeServiceAreaCurrencyCode(currencyCode) {
    serviceArea.currencyCode = currencyCode;
    // this.currencyCode = currencyCode;
    if (serviceArea.hasOwnProperty('pricing')) {
      serviceArea.pricing.currency = currencyCode;
      if (serviceArea.pricing.hasOwnProperty('ranges') && serviceArea.pricing.ranges.length !== 0) {
        serviceArea.pricing.ranges.forEach((item) => {
          item.currency = currencyCode;
        });
      }
    }
    if (serviceArea.hasOwnProperty('hourly_pricing')) {
      serviceArea.hourly_pricing.currency = currencyCode;
      if (serviceArea.hourly_pricing.hasOwnProperty('ranges') && serviceArea.hourly_pricing.ranges.length !== 0) {
        serviceArea.hourly_pricing.ranges.forEach((item) => {
          item.currency = currencyCode;
        });
      }
    }
    if (serviceArea.hasOwnProperty('zones') && serviceArea.zones.length !== 0) {
      serviceArea.zones.forEach((item) => {
        if (item.hasOwnProperty('prices') && item.prices.length !== 0) {
          item.prices.forEach((p) => {
            p.currency = currencyCode;
          });
        }
      });
    }
  }

  // async adjustAirports() {
  //   let { airports } = serviceArea
  //   let lat = 0;
  //   let lng = 0;

  //   for (let code of airports) {
  //     let airport = await airportCache(code);
  //     lat += airport.lat
  //     lng += airport.lng
  //   }

  //   let len = airports.length

  //   lat = lat / len
  //   lng = lng / len

  //   serviceArea.serviceArea.lat = lat
  //   serviceArea.serviceArea.lng = lng

  //   if (this.isHasBasicCircle) {
  //     let { serviceArea: { lat, lng } } = serviceArea
  //     this.map.setCircleCenter(0, { lat, lng })
  //   } else {
  //     this.paintBasicCircle()
  //   }
  // }
  async adjustAirports() {
    if (!this.isHasBasicCircle) {
      let { airports } = serviceArea
      let airport = await airportCache(airports[0]);
      let {lat,lng} = airport
      serviceArea.serviceArea.lat = lat
      serviceArea.serviceArea.lng = lng
      this.paintBasicCircle()
    }
  }

  airportsClear() {
    var airportBoxes = getElmsRelativeByName('airports-item-box', this.mapRootElm);
    for (var i = 0; i < airportBoxes.length; i++) {
      if (i != 0) {
        airportBoxes[i].remove();
      }
    }
    this.airportInput0.value = '';
  }
  /**
   * addEventListener
   * @param ele element
   * @param eleNext need handle style element
   * @param type 'focus' 'blur' 'input'
   * @param callback callback
   */
  handleInputStatusStyle(ele, eleNext, type, callback) {
    ele.addEventListener(type, () => {
      this.inputStatusStyle(eleNext, type);
      if (callback) {
        callback();
      }
    });
  }
  /**
   * changeInputStyle
   * @param ele element
   * @param status 'focus' 'blur' 'input'
   */
  inputStatusStyle(ele, status) {
    if (status === 'focus') {
      ele.addEventListener;
      ele.classList.add('fld-box-empty-warn');
    } else {
      ele.classList.remove('fld-box-empty-warn');
    }
  }

  async show() {
    // serviceArea = {
    //   "currencyCode": "",
    //   "serviceArea": {
    //     "name": "",
    //     "lat": 0,
    //     "lng": 0,
    //     "radius": 150000,
    //   },
    //   "airports": [''],
    //   "countryCode": "",
    // }
    // _d.isAddServiceAreaState = true

    this.rootElm.classList.remove('hide');
    await this.initElms();
    // remove empty warn
    this.rootElm.querySelectorAll('.fld-box-empty-warn').forEach((elm) => this.inputStatusStyle(elm, 'blur'));
  }

  hide() {
    if (JSON.stringify(serviceArea) != '{}') {
      this.pour();
    }
    this.mapRootElm.querySelector('.map-edit-content-box').classList.add('hide');
    this.rootElm.classList.add('hide');
    this.firstInit = false;
    this.isHasBasicCircle = false
    this.isSetUrbanArea = false

    document.removeEventListener('circleDrag', this.circleDrag)
    document.removeEventListener('circleRadiusChange', this.bindCircleRadiusChange)
    document.removeEventListener('changePolygon', this.changePolygon)
  }
  pour() {

    // if (!this.validate()) return;

    // update zones' prices data based on airportsCodes
    this.dealZones(serviceArea);
    console.log('---airport---', serviceArea);
  }
}
