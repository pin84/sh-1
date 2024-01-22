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
  }
  initElms() {
    this.serviceAreaName = elmOfIdRel('set-svcname-input', this.rootElm);
    this.serviceAreaNameBox = new InputFieldTmpl(elmOfIdRel('set-svc-name-box', this.rootElm));
    this.handleInputStatusStyle(this.serviceAreaName, this.serviceAreaName, 'input');
    this.editSvcNameBtn = this.rootElm.querySelector('.set-name-icon');
    this.firstInit && this.editSvcNameBtn.addEventListener('click', () => {
      this.serviceAreaName.focus();
    });

    this.radius = new IntInputFieldTmpl(elmOfIdRel('set-radius-content', this.rootElm));
    this.radiusInput = elmOfIdRel('set-radius-input', this.mapRootElm);
    this.handleInputStatusStyle(this.radiusInput, this.radiusInput.parentElement, 'focus');
    this.handleInputStatusStyle(this.radiusInput, this.radiusInput.parentElement, 'blur');
    this.handleInputStatusStyle(this.radiusInput, this.radiusInput.parentElement, 'input');

    this.customMapFullBtn = this.mapRootElm.querySelector('.map-full-btn');
    this.firstInit && this.customMapFullBtn.addEventListener('click', () => {
      dataOfElm(this.mapRootElm).map.getDiv().requestFullscreen();
    });

    this.editContentShowBtn = this.mapRootElm.querySelector('.map-edit-btn');
    this.firstInit && this.editContentShowBtn.addEventListener('click', () => {
      let editContent = this.mapRootElm.querySelector('.map-edit-content-box');
      if (editContent.classList.contains('hide')) {
        editContent.classList.remove('hide');
      } else {
        editContent.classList.add('hide');
      }
    });

    this.setUrbanAreaBtn = elmOfIdRel('urban-area-shape-btn', this.mapRootElm);
    this.firstInit && this.setUrbanAreaBtn.addEventListener('click', () => {
      let circle = dataOfElm(mapBox().rootElm).circle || null;
      if (!dataOfElm(mapBox().rootElm).polygon && circle && circle.getCenter().lat()) {
        mapBox().setUrbanAreas(circle.getCenter().lat(), circle.getCenter().lng());
      }
    });

    this.deleteUrbanAreaBtn = elmOfIdRel('urban-area-delete-btn', this.mapRootElm);
    this.firstInit && this.deleteUrbanAreaBtn.addEventListener('click', () => {
      if (dataOfElm(mapBox().rootElm).polygon) {
        dataOfElm(mapBox().rootElm).polygon.setMap(null);
        dataOfElm(mapBox().rootElm).polygon = null;
        delete serviceArea.downtown_areas;
      }
    });

    this.distanceUnitElms = getElmsRelativeByName('distance-unit', this.rootElm);

    this.setCoordinateStringInput = this.mapRootElm.querySelector('#set-coordinate-string-input');
    this.firstInit && this.setCoordinateStringInput.addEventListener('click', (e) => {
      e.stopPropagation();
    });
    this.setCoordinateStringInput.addEventListener('input', (e) => {
      this.scriptUaData = this.parseStr(e.target.value);
    });

    this.drawUrbanAreaBtn = this.mapRootElm.querySelector('#draw-urban-area-btn');
    this.firstInit && this.drawUrbanAreaBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      console.log(this.scriptUaData, dataOfElm(mapBox().rootElm).polygon)
      if (!this.scriptUaData) return;
      if (dataOfElm(mapBox().rootElm).polygon) {
        mapBox().setUrbanAreas(1, 1, this.scriptUaData);
      }
    });

    this.initCountry();
    this.initCurrency();
    this.initAirportAdd();
    this.fill(serviceArea);
  }
  async initCountry() {
    let _this = this;
    if (_this.countryAutoComp instanceof TextAutoComp) return;
    _this.countryBox = elmOfIdRel('select-country', _this.rootElm);
    _this.countryElm = elmOfIdRel('slt-country-input', _this.mapRootElm);

    _this.countryAutoComp = new TextAutoComp(_this.countryElm, {
      str: (item) => {
        return [item.name, item.country];
      },
      sel: async (item) => {
        if (!item) return;
        _this.airportsClear();
        // _this.countryElm.focus();
        _d.countryCode = item.country;

        dU = item.country == 'USA' || item.country == 'GBR' ? 0 : 1;
        im = imByCountry(item.country);
        _this.distanceUnitElms.forEach((distanceUnitElm) => {
          distanceUnitElm.innerHTML = distUnitData[dU].abbr;
        });

        _this.countryAirports = await airportListCache(item.country);
        _this.airportAdd.objs().forEach((airportAutoComp) => {
          _this.curCountryAirports = _this.countryAirports;
          airportAutoComp.setItems(_this.countryAirports);
        });

        if (_d.isAddServiceAreaState) {
          let current = currencyCountries.find((o) => o.country == item.country);
          if (current) {
            serviceArea.currencyCode = current.currency;
            _this.currencyElm.value = current.currency;
          }
        }
      },
    });
    _this.countryAutoComp.setItems(cellCountryCodes);

    _this.handleInputStatusStyle(_this.countryElm, _this.countryElm.parentElement, 'focus');
    _this.handleInputStatusStyle(_this.countryElm, _this.countryElm.parentElement, 'blur');
    _this.handleInputStatusStyle(_this.countryElm, _this.countryElm.parentElement, 'input');
  }
  initCurrency() {
    let _this = this;
    if (_this.currencyAutoComp instanceof TextAutoCompSql) return;
    _this.currencyElm = elmOfIdRel('slt-currency-input', _this.rootElm);
    _this.currencyAutoComp = new TextAutoCompSql(
      _this.currencyElm,
      {
        str: (item) => {
          return [item.currency];
        },
        sel: (item) => {
          if (item) {
            _this.changeServiceAreaCurrencyCode(item.currency);
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
    _this.currencyAutoComp.runSql();
    _this.currencyAutoComp.filter = false;
  }
  initAirportAdd() {
    let _this = this;
    if (_this.airportAdd instanceof AddAnother) return;
    _this.airportPartBox = _this.mapRootElm.querySelector('#airports-roll-box');
    _this.airportBox0 = elmOfIdRel('airports-item-box-0', _this.mapRootElm);
    _this.airportInput0 = elmOfIdRel('airport-input', _this.airportBox0);

    _this.airportAdd = new AddAnother('airports-item-box', _this.rootElm, {
      prep: (i, elm, airportAutoComp) => {
        if (airportAutoComp) {
          return airportAutoComp;
        }

        let airportInput = elmOfIdRel('airport-input', elm);
        // console.log('_this.airportAdd========prep=====', i, elm, airportAutoComp);
        airportAutoComp = new TextAutoComp(airportInput, {
          str: (item) => {
            return [item.code, item.name];
          },
          sel: (item) => {
            if (item) {
              airportInput.setAttribute('code', item.code);
              setTimeout(() => {
                _this.adjustAirports();
              }, 100);
            }
          },
        });
        airportAutoComp.filter = true;
        airportAutoComp.setItems(_this.countryAirports);

        _this.handleInputStatusStyle(airportInput, airportInput.parentElement, 'focus');
        _this.handleInputStatusStyle(airportInput, airportInput.parentElement, 'blur');

        elmOfIdRel('airports-item-box-remove', elm).addEventListener('click', (e) => {
          _this.adjustAirports();
        });
        airportInput.value = '';
        return airportAutoComp;
      },
      fill: (i, elm, airportCode, airportAutoComp) => {
        // console.log('_this.airportAdd=============fill====', airportCode, airportAutoComp);
        if (airportCode) {
          // scan countryAirports to find airportCode its json then set it next row
          let airport = _this.countryAirports.find((item) => item.code == airportCode);
          airportAutoComp.set(airport);
        } else {
          airportAutoComp.set(null);
          // airportAutoComp.setItems([]);
        }
      },
      pour: (i, elm, airportAutoComp) => {
        return objValGetByKeys(airportAutoComp.get(), 'code');
      },
    });
  }
  show() {
    this.initElms();
    this.rootElm.classList.remove('hide');
    // remove empty warn
    this.rootElm.querySelectorAll('.fld-box-empty-warn').forEach((elm) => this.inputStatusStyle(elm, 'blur'));
    this.mapReset();
  }
  async fill(serviceAreaData) {
    let _this = this;
    _this.serviceAreaNameBox.set(objValGetByKeys(serviceAreaData, 'serviceArea.name'));
    dataOfElm(_this.rootElm).serviceAreaId = objNumGetByKeys(serviceAreaData, 'serviceArea.id');

    let { countryCode, airports } = serviceArea;
    if (countryCode) {
      _this.countryAirports = await airportListCache(countryCode);
    }
    let curCountry = cellCountryCodes.find((item) => item.country == countryCode);
    _this.countryAutoComp.set(curCountry);

    if (!serviceAreaData.currencyCode) {
      if (serviceAreaData.countryCode) {
        currencyCountries.forEach((currencyCountry) => {
          if (currencyCountry.country == serviceAreaData.countryCode) {
            serviceAreaData.currencyCode = currencyCountry.currency;
            _this.currencyElm.value = serviceAreaData.currencyCode;
          }
        });
      } else {
        _this.currencyElm.value = '';
      }
    } else {
      _this.currencyElm.value = serviceAreaData.currencyCode;
    }

    if (airports) {
      for (let airportCode of airports) {
        airportCache(airportCode);
      }
    }
    if (objNumGetByKeys(serviceAreaData, 'serviceArea.radius')) {
      async.done(() => {
        _this.radius.set(mtr2mkm(objNumGetByKeys(serviceAreaData, 'serviceArea.radius'), imByCountry(_this.countryAutoComp.get().country)));
      });
    } else {
      _this.radius.set(150);
    }

    _this.airportAdd.fill(airports);
  }
  hide() {
    if (JSON.stringify(serviceArea) != '{}') {
      this.pour(serviceArea);
    }
    this.mapRootElm.querySelector('.map-edit-content-box').classList.add('hide');
    this.rootElm.classList.add('hide');
    this.firstInit = false;
  }
  pour(serviceAreaData) {
    let _this = this;
    async.done(() => {
      if (!_this.validate()) return;

      if (!serviceAreaData.serviceArea) {
        serviceAreaData.serviceArea = {};
        serviceAreaData.serviceArea.parent_fleet_id = _d.fleet_id;
        serviceAreaData.airports = [];
      }
      serviceAreaData.serviceArea.name = _this.serviceAreaNameBox.get();
      serviceAreaData.countryCode = objValGetByKeys(_this.countryAutoComp.get(), 'country');

      let circle = dataOfElm(mapBox().rootElm).circle;

      if (circle) {
        serviceAreaData.serviceArea.lat = circle.getCenter().lat();
        serviceAreaData.serviceArea.lng = circle.getCenter().lng();
        serviceAreaData.serviceArea.radius = parseInt(circle.getRadius());
      }

      serviceAreaData.airports = _this.getAirports();
      // update zones' prices data based on airportsCodes
      this.dealZones(serviceAreaData);
      console.log('---airport---', serviceArea);
    });
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
    if (this.serviceAreaNameBox.get() == '') {
      this.inputStatusStyle(this.serviceAreaName, 'focus');
      return false;
    }
    if (!this.countryAutoComp.get() && _d.countryCode != this.countryElm.value.trim().substring(this.countryElm.value.indexOf(',') + 1)) {
      this.inputStatusStyle(this.countryBox, 'focus');
      return false;
    }

    if (!this.getAirports(true).length) return false;

    if (this.radius.get() == '') {
      this.inputStatusStyle(this.radiusInput.parentElement, 'focus');
      return false;
    }
    return true;
  }
  changeServiceAreaCurrencyCode(currencyCode) {
    serviceArea.currencyCode = currencyCode;
    this.currencyCode = currencyCode;
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
  adjustAirports() {
    let it = this;
    let svc = serviceArea.serviceArea;
    let oldLat, oldLng;
    if (svc) {
      oldLat = svc.lat;
      oldLng = svc.lng;
    }
    async.done(async () => {
      let airportCodes = it.getAirports();
      if (airportCodes.length > 0) {
        async.done(async () => {
          let lat = 0.0;
          let lng = 0.0;
          let idx = imByCountry(it.countryAutoComp.get().country);
          let radius = mkm2mtr(parseInt(it.radius.get()), idx);
          for (let code of airportCodes) {
            let airport = await airportCache(code);

            if (airport) {
              lat += airport.lat;
              lng += airport.lng;
            }
          }
          // console.log(lat, lng, idx, radius);
          lat = lat / airportCodes.length;
          lng = lng / airportCodes.length;

          if (oldLat || oldLng) {
            lat = oldLat;
            lng = oldLng;
          }
          mapBox().paintCircle(lat, lng, radius);
        });
      }
    });
  }
  getAirports(changeStyle) {
    let airportInput = this.rootElm.querySelectorAll('.airport-input');
    let airportsCodes = [];
    Array.from(airportInput).map((item) => {
      if (item.getAttribute('code') !== null) {
        airportsCodes.push(item.getAttribute('code'));
      } else {
        if (changeStyle) this.inputStatusStyle(item.parentElement, 'focus');
      }
    });
    return airportsCodes;
  }
  mapReset() {
    mapBox().reset();
  }
  airportsClear() {
    this.mapReset();
    var airportBoxes = getElmsRelativeByName('airports-item-box', this.mapRootElm);
    for (var i = 0; i < airportBoxes.length; i++) {
      if (i != 0) {
        airportBoxes[i].remove();
      }
    }
    this.airportInput0.value = '';
    this.airportAdd.fill([]);
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
  parseStr(str) {
    if (!str) return [];
    const arr = str.split('/');
    const result = arr.map((item) => {
      const [lat, lng] = item.split(',');
      return {
        lat: parseFloat(lat.split(':')[1]),
        lng: parseFloat(lng.split(':')[1]),
      };
    });
    return result;
  }
}
