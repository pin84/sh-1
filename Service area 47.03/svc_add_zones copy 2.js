/**
 * @format
 * @FilePath: svc_add_zones.js
 * @Author: Joy
 * @Date: 2023-08-12 09:31:12
 * @LastEditors: Joy
 * @LastEditTime: 2023-08-21 10:08:31
 * @Descripttion: Fixed Price Zones
 */

class AddZones {
  constructor(id) {
    this.rootElm = elmOfId(id);
    this.currentZoneIndex = 0;
    this.zones = [];
    this.mapBox = elmOfIdRel('zones-map', this.rootElm);
    this.firstInit = true;
    this.zonesRootElm = document.querySelector('#zones-all-list-box');
    this.currentType = 'polygon';
  }
  initElms() {
    this.areaName = elmOfIdRel('svc-area-name', this.rootElm);
    this.areaName.innerHTML = serviceArea.serviceArea.name;

    this.zoneName = elmOfIdRel('zone-name', this.rootElm);

    if (this.firstInit) {
      let dropdown = new TextAutoComp(this.zoneName, {
        str: (item) => {
          return [item.name];
        },

        sel: (item, hovElm) => {
          if (item) {


            //     if (item.id === this.currentZoneIndex + 1) return;
            //     this.currentZoneIndex = Number(item.id) - 1;
            //     this.currentType = this.zones[this.currentZoneIndex].hasOwnProperty('polygons') ? 'polygon' : 'circle';
            //     this.multiLevelDropdown.resetDropdownMenu(this.zones[this.currentZoneIndex].p2p_t);
            //     this.clearAllWarn();

            //     zonesMap().pageMap.updateStyle(this.currentZoneIndex);
            //     this.updateElmsData(this.currentZoneIndex);
          }
        }
      })

      dropdown.setItems(this.zones)
      dropdown.filter = false
      this.dropdown = dropdown
    }



    this.firstInit &&
      this.zoneName.addEventListener('input', (e) => {
        this.updateDomStyle(this.zoneName);
        this.updateZonesData(this.currentZoneIndex, 'name', e.target.value);
        // this.dropdown.setOptionsData(this.zones, this.currentZoneIndex + 1);

      });
    this.firstInit &&
      this.zoneName.addEventListener('blur', (e) => {

        // if (!e.target.value) return;

        // let current = this.zones[this.currentZoneIndex];
        // if (!current.radius && this.currentType == 'circle') {
        //   current.radius = this.currentZoneIndex === 0 ? Number(serviceArea.serviceArea.radius) / 3 : (this.zones[this.currentZoneIndex - 1].radius ? this.zones[this.currentZoneIndex - 1].radius : Number(serviceArea.serviceArea.radius) / 3);
        // }
        // this.updateElmsData(this.currentZoneIndex);

        // if (!this.validate(true)) {
        //   if (this.currentType == 'circle') {
        //     zonesMap().pageMap.addCircleToMap({
        //       center: { lat: current.lat, lng: current.lng },
        //       radius: current.radius,
        //       idx: this.currentZoneIndex,
        //     });
        //   } else {
        //     this.zoneRadius.disabled = true;
        //     this.zoneRadius.value = '--';
        //     let arr = this.createPolygons();
        //     current.polygons = arr;
        //     zonesMap().pageMap.addPolygonToMap(arr, this.currentZoneIndex, true);
        //   }
        //   zonesMap().pageMap.updateStyle(this.currentZoneIndex);
        //   console.log(this.zones, current);
        // }
      });

    this.zoneCount = elmOfIdRel('zone-count', this.rootElm);

    this.zoneRadius = elmOfIdRel('zone-radius', this.rootElm);

    this.firstInit &&
      this.zoneRadius.addEventListener('input', (e) => {
        e.target.value = digitsOfStr(e.target.value);
        this.updateDomStyle(this.zoneRadius, this.zoneRadius.parentElement);
        // if (!this.zoneName) {
        //   this.updateZonesData(this.currentZoneIndex, 'radius', e.target.value);
        // }
      });

    this.firstInit &&
      this.zoneRadius.addEventListener('blur', (e) => {
        e.target.value = digitsOfStr(e.target.value);
        // console.log(Number(e.target.value), zonesMap().pageMap.mapList[this.currentZoneIndex]);
        if (zonesMap().pageMap.mapList[this.currentZoneIndex]) {
          zonesMap().pageMap.setRadius(this.currentZoneIndex, Number(e.target.value) * distUnitData[dU].measurement);
          this.updateZonesData(this.currentZoneIndex, 'radius', Number(e.target.value) * distUnitData[dU].measurement);
        }
      });
    this.zoneRadiusUnit = elmOfIdRel('zone-radius-unit', this.rootElm);
    this.zoneRadiusUnit.innerHTML = distUnitData[dU].abbr;

    this.zoneLat = elmOfIdRel('zone-lat', this.rootElm);
    this.zoneLng = elmOfIdRel('zone-lng', this.rootElm);

    this.zoneEditLatLng = elmOfIdRel('zone-lat-lng', this.rootElm);
    this.zoneEditLatLnOk = elmOfIdRel('zone-lat-lng-ok', this.rootElm);

    this.zoneEditLatLnOk.addEventListener('click', this.handleEditLatLngClick.bind(this));
    // this.zoneEditLat = elmOfIdRel('zone-edit-lat', this.rootElm);
    // this.zoneEditLng = elmOfIdRel('zone-edit-lng', this.rootElm);
    // this.zoneEditLat.addEventListener('input', (e) => {
    //   e.target.value = e.target.value.replace(/[^-0-9.]/g, '');
    // });
    // this.zoneEditLng.addEventListener('input', (e) => {
    //   e.target.value = e.target.value.replace(/[^-0-9.]/g, '');
    // });

    this.firstInit &&
      this.zoneEditLatLng.addEventListener('click', () => {
        if (!this.zones[this.currentZoneIndex].name) {
          svcUtils.msgBox({ msg: 'Please enter the name first' });
          return;
        }
        let zoneLatLngBox = elmOfIdRel('zone-lat-lng-box', this.rootElm);
        if (zoneLatLngBox.classList.contains('hide')) {
          zoneLatLngBox.classList.remove('hide');
        } else {
          zoneLatLngBox.classList.add('hide');
        }
      });

    this.zoneCurrency = elmOfIdRel('zone-currency', this.rootElm);
    this.zoneCurrency.innerHTML = `(${serviceArea.currencyCode})`;

    this.zonefixedPrice = elmOfIdRel('fixed-price-pick', this.rootElm);
    this.zoneCheckbox = elmOfIdRel('zone-checkbox', this.rootElm);
    this.firstInit &&
      this.zoneCheckbox.addEventListener('change', (e) => {
        this.updateZonesData(this.currentZoneIndex, 'p2p', e.target.checked);
        this.updateZonesData(this.currentZoneIndex, 'p2p_t', !e.target.checked ? '' : this.zones[this.currentZoneIndex].p2p_t || '');
        this.zonefixedPrice.innerHTML = e.target.checked ? this.zonefixedPrice.innerHTML : '--';
        this.multiLevelDropdown.resetDropdownMenu(null);
        this.updateDomStyle(this.zoneCheckbox, this.zoneCheckbox.parentElement, 'remove');
      });

    this.zoneEdit = elmOfIdRel('zone-edit', this.rootElm);
    this.firstInit &&
      this.zoneEdit.addEventListener('click', () => {
        let zoneEditBox = elmOfIdRel('zone-edit-box', this.rootElm);
        if (zoneEditBox.classList.contains('hide')) {
          zoneEditBox.classList.remove('hide');
        } else {
          zoneEditBox.classList.add('hide');
        }
      });

    this.mapFullBtn = elmOfIdRel('map-full', this.rootElm);
    this.firstInit &&
      this.mapFullBtn.addEventListener('click', () => {
        zonesMap().mapFullscreen();
      });

    this.zoneAddCircle = elmOfIdRel('zone-circle-btn', this.rootElm);
    this.zoneAddPentagon = elmOfIdRel('zone-pentagon-btn', this.rootElm);
    this.zoneDelete = elmOfIdRel('zone-delete-btn', this.rootElm);
    this.firstInit && this.zoneAddCircle.addEventListener('click', this.addZone.bind(this, 'circle'));
    this.firstInit && this.zoneAddPentagon.addEventListener('click', this.addZone.bind(this, 'polygon'));
    this.firstInit && this.zoneDelete.addEventListener('click', this.deleteZone.bind(this));

    const dealZones = this.dealZonesData(this.zones, 'id');
    // this.dropdown = new MultiLevelDropdown('select-zone', 'single', dealZones[0].id, dealZones, 'width: 300px', {
    //   handleOptionClick: (item) => {
    //     if (item.id === this.currentZoneIndex + 1) return;
    //     this.currentZoneIndex = Number(item.id) - 1;
    //     this.currentType = this.zones[this.currentZoneIndex].hasOwnProperty('polygons') ? 'polygon' : 'circle';
    //     this.multiLevelDropdown.resetDropdownMenu(this.zones[this.currentZoneIndex].p2p_t);
    //     this.clearAllWarn();

    //     zonesMap().pageMap.updateStyle(this.currentZoneIndex);
    //     this.updateElmsData(this.currentZoneIndex);
    //   },
    // });




    this.selectZoneBtn = elmOfIdRel('select-zone-switch', this.rootElm);

    this.firstInit &&
      this.selectZoneBtn.addEventListener('click', (e) => {
        // if (this.dropdown.dropdownMenu.classList.contains('hide')) {
        //   this.dropdown.show(e);
        // } else {
        //   this.dropdown.hide();
        // }
      });

    this.multiLevelDropdown = new MultiLevelDropdown('select-fixed-price', 'multi', this.zones[0].p2p_t, this.dealPricesData(this.zones[0].prices), '', {
      handleOptionClick: (item) => {
        // console.log(item)
        if (item.id.indexOf('.') === -1) return;
        this.zonefixedPrice.innerHTML = item.label;
        this.updateZonesData(this.currentZoneIndex, 'p2p_t', item.id);
        this.updateDomStyle(this.zonefixedPrice, this.zonefixedPrice.parentElement, 'remove');
      },
    });

    this.selectFixedBtn = elmOfIdRel('select-fixed-price-switch', this.rootElm);
    this.firstInit &&
      this.selectFixedBtn.addEventListener('click', (e) => {
        // console.log(JSON.parse(this.zones[this.currentZoneIndex].p2p)
        if (!this.zones[this.currentZoneIndex].p2p || !JSON.parse(this.zones[this.currentZoneIndex].p2p)) {
          this.updateDomStyle(this.zoneCheckbox, this.zoneCheckbox.parentElement, 'add');
          return;
        }
        if (this.multiLevelDropdown.dropdownMenu.classList.contains('hide')) {
          this.multiLevelDropdown.show(e);
        } else {
          this.multiLevelDropdown.hide();
        }
      });

    this.statusOverlay = document.querySelector('.status-overlay');
    this.zonesAllListBox = document.getElementById('zones-all-list-box');
    this.showChartPreviewBtn = this.rootElm.querySelector('#show-chart-preview-btn');
    this.firstInit &&
      this.showChartPreviewBtn.addEventListener('click', () => {
        this.drawChartPreview();
        this.zonesAllListBox.classList.add('status-drawer-container-show');
        this.statusOverlay.classList.add('status-overlay-show');
        this.statusOverlay = document.querySelector('.status-overlay');
      });
    this.firstInit &&
      this.statusOverlay.addEventListener('click', () => {
        this.statusOverlay.classList.remove('status-overlay-show');
        this.zonesAllListBox.classList.remove('status-drawer-container-show');
      });
  }

  drawChartPreview() {
    let { zones } = serviceArea;

    let headerZoneAirportBox = this.zonesRootElm.querySelector('#header-zone-airport-box');
    headerZoneAirportBox.innerHTML = '';
    if (zones && zones.length) {
      let headerAirTemplate = this.zonesRootElm.querySelector('.zone-airport-item-template');
      let hFragment = document.createDocumentFragment();
      zones[0].prices.map((p) => {
        let cHeaderAirTemplate = headerAirTemplate.cloneNode(true);
        cHeaderAirTemplate.classList.remove('hide', 'zone-airport-item-template');
        cHeaderAirTemplate.innerText = p.airport;
        hFragment.appendChild(cHeaderAirTemplate);
      });
      headerZoneAirportBox.appendChild(hFragment);
    }

    let zonesItemBox = this.zonesRootElm.querySelector('.zones-item-box');
    let zoneItemTemplate = this.zonesRootElm.querySelector('.zones-table-item-template');
    let fragment = document.createDocumentFragment();
    if (!zones || !zones.length) {
      zonesItemBox.innerHTML = '';
      zonesItemBox.appendChild(fragment);
      return;
    }
    zones.map((item, index) => {
      let cZoneItemTemplate = zoneItemTemplate.cloneNode(true);
      cZoneItemTemplate.classList.remove('hide', 'zones-table-item-template');
      cZoneItemTemplate.querySelector('.zone-seq').innerText = index + 1;
      cZoneItemTemplate.querySelector('.zone-name').innerText = item.name;
      cZoneItemTemplate.querySelector('.zone-radius').innerText = parseInt(item.radius / distUnitData[dU].measurement) + distUnitData[dU].abbr;

      let zoneAirportBox = cZoneItemTemplate.querySelector('.zone-airport-box');

      let zoneAirportTtemTemplate = cZoneItemTemplate.querySelector('.zone-airport-item-template');

      let fragment2 = document.createDocumentFragment();
      for (let obj of item.prices) {
        let cZoneAirportTtemTemplate = zoneAirportTtemTemplate.cloneNode(true);
        cZoneAirportTtemTemplate.classList.remove('hide');
        cZoneAirportTtemTemplate.classList.remove('zone-airport-item-template');
        let spanWidth = this.zonesRootElm.querySelector('#header-zone-airport-box').querySelector('.zone-airport-item').getBoundingClientRect().width;
        let pariceSpan = document.createElement('span');
        pariceSpan.innerText = obj.p_amt || '';
        let pariceSpan2 = document.createElement('span');
        pariceSpan2.innerText = obj.d_amt || '';
        // pariceSpan.style.width = spanWidth + 'px'
        // pariceSpan2.style.width = spanWidth + 'px'
        cZoneAirportTtemTemplate.innerHTML = '';
        cZoneAirportTtemTemplate.appendChild(pariceSpan);
        cZoneAirportTtemTemplate.appendChild(pariceSpan2);
        fragment2.appendChild(cZoneAirportTtemTemplate);
      }
      zoneAirportBox.innerHTML = '';
      zoneAirportBox.appendChild(fragment2);
      fragment.appendChild(cZoneItemTemplate);
    });
    zonesItemBox.innerHTML = '';
    zonesItemBox.appendChild(fragment);
  }

  updateElmsData(index) {
    // console.log('updateElmsData==============', index, this.zones[index]);
    let current = this.zones.find(item => item.id == index)
    let { name, lat, lng, radius, p2p, p2p_t, prices, polygons } = current
    this.zoneName.value = name;
    this.zoneCount.innerHTML = index + 1;
    if (polygons) {
      this.zoneRadius.value = '--';
      this.zoneRadius.disabled = true;
    } else {
      this.zoneRadius.value = Math.round(radius / distUnitData[dU].measurement);
      this.zoneRadius.disabled = false;
    }
    this.zoneLat.innerHTML = lat.toFixed(6);
    this.zoneLng.innerHTML = lng.toFixed(6);
    this.zoneCheckbox.checked = p2p ? JSON.parse(p2p) : '';
    this.zonefixedPrice.innerHTML = this.showFixedPriceHtml(p2p_t);
    this.updatePrices(prices, index);
  }

  showFixedPriceHtml(val) {
    if (!val) return '--';
    const value = val.split('.');
    let desc = value[1] == 'p' ? 'Pick up' : 'Drop off';
    return `${value[0]}-${desc}`;
  }

  updateZonesData(current, key, value, index, listKey) {
    if (listKey) {
      this.zones[current][key][index][listKey] = value || value === '0' ? Number(value) : value;
    } else {
      this.zones[current][key] = value;
    }
    // console.log('updateZonesData========', current, key, value, index, listKey, this.zones);
  }

  updateZonesObj(index, properties) {
    this.zones.map((item, i) => {
      if (i === index) {
        Object.assign(item, properties);
      }
    });
    // console.log('updateZonesObj==========', index, this.zones);
  }

  updatePrices(list, current) {
    let zonePricesList = elmOfIdRel('zone-prices-list', this.rootElm);
    zonePricesList.innerHTML = '';
    let fragment = document.createDocumentFragment();
    let zonePricesItem = elmOfIdRel('zone-prices-item', this.rootElm);
    list.map((item, index) => {
      let cZonePricesItem = zonePricesItem.cloneNode(true);
      cZonePricesItem.id = `zone-prices-item-${index}`;

      let zoneAirport = cZonePricesItem.querySelector('#zone-airport');
      zoneAirport.innerHTML = item.airport;

      let zoneItemName = cZonePricesItem.querySelector('#zone-item-name');
      zoneItemName.innerHTML = this.zones[current].name;

      let zonePickup = cZonePricesItem.querySelector('#zone-pickup');
      zonePickup.value = item.p_amt;
      zonePickup.addEventListener('input', (e) => {
        e.target.value = fldMoneyOnlyReg(e.target.value);
        this.updateDomStyle(zonePickup);
        this.updateZonesData(current, 'prices', e.target.value, index, 'p_amt');
      });

      let zoneDropoff = cZonePricesItem.querySelector('#zone-dropoff');
      zoneDropoff.value = item.d_amt;
      zoneDropoff.addEventListener('input', (e) => {
        e.target.value = fldMoneyOnlyReg(e.target.value);
        this.updateDomStyle(zoneDropoff);
        this.updateZonesData(current, 'prices', e.target.value, index, 'd_amt');
      });

      fragment.appendChild(cZonePricesItem);
    });
    zonePricesList.appendChild(fragment);
  }

  addZone(type) {
    // this.zones.push({ name: 'abc', id: i++ })

    // if (!this.validate(true)) return;
    this.currentType = type;
    let prices = JSON.parse(JSON.stringify(this.zones[this.zones.length - 1].prices));
    prices.map((item) => {
      item.p_amt = '';
      item.d_amt = '';
    });
    this.index++
    let id = this.index
    console.log(id, this.index);
    let item = {
      id,
      lat: serviceArea.serviceArea.lat,
      lng: serviceArea.serviceArea.lng,
      name: '',
      p2p: false,
      prices: prices,
      // radius: 0,
    };
    if (this.currentType == 'circle') {
      item.radius = Number(serviceArea.serviceArea.radius) / 3;
    }
    this.zones.push(item);
    this.dropdown.setItems(this.zones)

    this.addToMap(item)

    // this.currentZoneIndex = this.zones.length - 1;
    this.updateElmsData(id);
    // this.dropdown.setOptionsData(this.zones, this.zones.length);
  }

  addToMap(obj) {
    // let current = this.zones[this.currentZoneIndex];
    // if (!current.radius && this.currentType == 'circle') {
    //   current.radius = this.currentZoneIndex === 0 ? Number(serviceArea.serviceArea.radius) / 3 : (this.zones[this.currentZoneIndex - 1].radius ? this.zones[this.currentZoneIndex - 1].radius : Number(serviceArea.serviceArea.radius) / 3);
    // }
    // this.updateElmsData(this.currentZoneIndex);

    let { lat, lng, id, radius } = obj

    // if (!this.validate(true)) {
    if (this.currentType == 'circle') {
      zonesMap().pageMap.addCircleToMap({
        center: { lat, lng },
        radius,
        idx: id,
      });
    } else {
      this.zoneRadius.disabled = true;
      this.zoneRadius.value = '--';
      let arr = this.createPolygons();
      current.polygons = arr;
      zonesMap().pageMap.addPolygonToMap(arr, this.currentZoneIndex, true);
    }
    zonesMap().pageMap.updateStyle(id);
    // console.log(this.zones, current);
    // }
  }

  deleteZone() {
    svcUtils.msgBox({
      msg: `Are you sure you want to remove Fixed Price Zone:${this.zones[this.currentZoneIndex].name}?`,
      isShowCancel: true,
      cancelText: 'Cancel',
      submitText: 'Delete',
      submitFn: this.submitFn.bind(this),
    });




  }

  submitFn() {
    this.zones.splice(this.currentZoneIndex, 1);
    zonesMap().removeMapObject(this.currentZoneIndex);
    this.updateVehicleClasses(this.currentZoneIndex);
    if (!this.zones.length) {
      this.zones = this.initAddZones();
      this.currentZoneIndex = 0;
    } else {
      this.currentZoneIndex = this.currentZoneIndex - 1 > -1 ? this.currentZoneIndex - 1 : 0;
    }
    this.updateElmsData(this.currentZoneIndex);
    this.clearAllWarn();
    // this.dropdown.setOptionsData(this.dealZonesData(this.zones, 'id'), this.currentZoneIndex + 1);

  }

  validate(isAddZone) {
    // console.log(isAddZone, this.checkCurrentData(isAddZone), this.checkAllData())
    if (!this.checkCurrentData(isAddZone)) return false;
    if (!this.checkAllData()) {
      svcUtils.msgBox({ msg: 'Please complete all Fixed Price Zones information' });
      return false;
    }
    return true;
  }

  checkCurrentData(isAddZone) {
    let flag = true;
    const currentZone = this.zones[this.currentZoneIndex];
    if (currentZone.name) {
      flag = this.checkPriceData(currentZone.prices);
      if (currentZone.p2p && JSON.parse(currentZone.p2p) && !currentZone.p2p_t) {
        flag = false;
        this.updateDomStyle(this.zonefixedPrice, this.zonefixedPrice.parentElement, 'add');
      }
      if (!currentZone.radius && !currentZone.polygons) {
        flag = false;
        this.updateDomStyle(this.zoneRadius, this.zoneRadius.parentElement);
      }
    } else {
      if (isAddZone || this.zones.length > 1) {
        flag = false;
        this.updateDomStyle(this.zoneName);
      } else {
        flag = this.checkPriceData(currentZone.prices, this.zones.length === 1 ? true : false);
      }
    }
    return flag;
  }

  checkAllData() {
    let flag = true;
    if (this.zones.length < 2) return flag;
    for (let i = 0; i < this.zones.length; i++) {
      if (!this.zones[i].name) {
        flag = false;
        break;
      } else if (!this.zones[i].radius && !this.zones[i].polygons) {
        flag = false;
      } else {
        flag = this.checkPriceData(this.zones[i].prices);
      }
      if (this.zones[i].p2p && JSON.parse(this.zones[i].p2p) && !this.zones[i].p2p_t) {
        flag = false;
      }
    }
    return flag;
  }

  checkPriceData(prices, isOneZone) {
    // console.log(prices);
    let flag = true;
    for (let i = 0; i < prices.length; i++) {
      const priceItem = document.getElementById(`zone-prices-item-${i}`);
      if (isOneZone) {
        if (prices[i].p_amt || Object.is(prices[i].p_amt, 0)) {
          flag = false;
          break;
        }
        if (prices[i].d_amt || Object.is(prices[i].d_amt, 0)) {
          flag = false;
          break;
        }
      } else {
        if (!prices[i].p_amt && prices[i].p_amt !== 0) {
          flag = false;
          const priceItemPickup = elmOfIdRel('zone-pickup', priceItem);
          this.updateDomStyle(priceItemPickup);
          break;
        }
        if (!prices[i].d_amt && prices[i].d_amt !== 0) {
          flag = false;
          const priceItemDropoff = elmOfIdRel('zone-dropoff', priceItem);
          this.updateDomStyle(priceItemDropoff);
          break;
        }
      }
    }
    return flag;
  }

  updateDomStyle(ele, targetEle, type) {
    // console.log(ele, targetEle, type)
    if (!type) {
      if (ele.value === '') {
        if (targetEle) {
          targetEle.classList.add('fld-box-empty-warn');
        } else {
          ele.classList.add('fld-box-empty-warn');
        }
      } else {
        if (targetEle) {
          targetEle.classList.remove('fld-box-empty-warn');
        } else {
          ele.classList.remove('fld-box-empty-warn');
        }
      }
    } else {
      if (type === 'add') {
        if (targetEle) {
          targetEle.classList.add('fld-box-empty-warn');
        } else {
          ele.classList.add('fld-box-empty-warn');
        }
      } else {
        if (targetEle) {
          targetEle.classList.remove('fld-box-empty-warn');
        } else {
          ele.classList.remove('fld-box-empty-warn');
        }
      }
    }
  }

  clearAllWarn() {
    const inputElements = this.mapBox.querySelectorAll('input');
    Array.from(inputElements).map((item) => {
      item.classList.remove('fld-box-empty-warn');
      if (item.parentElement.classList.contains('fld-box-empty-warn')) {
        item.parentElement.classList.remove('fld-box-empty-warn');
      }
    });
    this.updateDomStyle(this.zonefixedPrice, this.zonefixedPrice.parentElement, 'remove');
    this.updateDomStyle(this.zoneCheckbox, this.zoneCheckbox.parentElement, 'remove');
  }

  dealZonesData(zones, key) {
    if (!zones.length) return [];
    zones.map((item, index) => {
      if (key === 'id') item.id = index;
      item.prices.map((el) => {
        if (!el.hasOwnProperty('p_amt')) {
          el.p_amt = el.amount;
        }
        if (!el.hasOwnProperty('d_amt')) {
          el.d_amt = el.amount;
        }
      });
    });
    return zones;
  }

  dealPricesData(prices) {
    let list = [];
    prices.map((item) => {
      let obj = {
        name: item.airport,
        id: item.airport,
        children: [
          {
            name: 'Pick up',
            id: `${item.airport}.p`,
          },
          {
            name: 'Drop off',
            id: `${item.airport}.d`,
          },
        ],
      };
      list.push(obj);
    });
    return list;
  }

  handleEditLatLngClick() {
    let editLat = elmOfIdRel('zone-edit-lat', this.rootElm).value;
    var editLng = elmOfIdRel('zone-edit-lng', this.rootElm).value;
    if (editLat && editLng) {
      zonesMap().pageMap.moveMapObject(this.currentZoneIndex, Number(editLat), Number(editLng));
      this.zoneLat.innerHTML = Number(editLat).toFixed(6);
      this.zoneLng.innerHTML = Number(editLng).toFixed(6);
      let obj = {
        lat: editLat,
        lng: editLng,
      };
      this.updateZonesObj(this.currentZoneIndex, obj);
    }
    elmOfIdRel('zone-lat-lng-box', this.rootElm).classList.add('hide');
    console.log(this.zones);
  }

  updateVehicleClasses(index) {
    if (index === undefined || index === null) return;
    if (!serviceArea.vehicleClasses) return;

    let current = `zones.${index}`;
    let vehicleClasses = serviceArea.vehicleClasses;
    vehicleClasses.map((item) => {
      if (item.percent_appendix && item.percent_appendix.length) {
        const sortAppendix = item.percent_appendix.length > 1 ? item.percent_appendix.sort(this.sortArray) : item.percent_appendix;
        item.percent_appendix = this.deleteAndShiftZones(sortAppendix, current);
      }
    });
    serviceArea.vehicleClasses = vehicleClasses;
  }

  sortArray(a, b) {
    const ax = a.field.split('.');
    const bx = b.field.split('.');
    const al = ax.length;
    const bl = bx.length;

    for (let i = 0, len = Math.min(al, bl); i < len; i++) {
      const an = parseInt(ax[i]) || ax[i];
      const bn = parseInt(bx[i]) || bx[i];

      if (an < bn) return -1;
      if (an > bn) return 1;
    }

    return al - bl;
  }

  deleteAndShiftZones(array, zoneToDelete) {
    const newArray = array.filter((obj) => !obj.field.includes(zoneToDelete));
    for (let i = 0; i < newArray.length; i++) {
      const field = newArray[i].field;
      const parts = field.split('.');

      if (parts[0] === 'zones') {
        const zoneNumber = parseInt(parts[1]);

        if (zoneNumber > parseInt(zoneToDelete.slice(6))) {
          parts[1] = (zoneNumber - 1).toString();
        }

        newArray[i].field = parts.join('.');
      }
    }
    return newArray;
  }

  initAddZones() {
    let list = [];
    let pricesList = [];
    // console.log('initAddZones=====', Number(serviceArea.serviceArea.radius));
    serviceArea.airports.map((item) => {
      let obj = {
        airport: item,
        amount: '',
        p_amt: '',
        d_amt: '',
        currency: serviceArea.currencyCode,
      };
      pricesList.push(obj);
    });
    let item = {
      lat: serviceArea.serviceArea.lat,
      lng: serviceArea.serviceArea.lng,
      name: '',
      p2p: false,
      prices: pricesList,
      radius: 0,
    };
    list.push(item);

    return list;
  }

  createPolygons() {
    let arr = [];

    let { lat, lng } = serviceArea.serviceArea;
    let r = 1;
    let len = 6;
    for (let i = 0; i < len; i++) {
      let h = ((2 * Math.PI) / 360) * (360 / len) * i;
      let x = lat + Math.sin(h) * r;
      let y = lng - Math.cos(h) * r;

      arr.push({ lat: x, lng: y });
    }
    return arr;
  }

  show() {
    this.rootElm.classList.remove('hide');
    if (serviceArea.zones && serviceArea.zones.length) {
      this.zones = this.dealZonesData(serviceArea.zones);
    } else {
      this.zones = this.initAddZones();
    }

    this.index = this.zones.length
    // console.log('Fixed Price Zones show===========', serviceArea.zones);
    this.currentZoneIndex = 0;
    this.initElms();
    this.clearAllWarn();
    zonesMap().show();
  }

  pour() {
    let pourZones = [];
    if (this.zones.length === 1) {
      if (this.zones[0].name) pourZones = this.zones;
    } else {
      pourZones = this.zones;
    }
    serviceArea.zones = pourZones;
  }

  hide() {
    console.log('add-zones=====', serviceArea);
    this.firstInit = false;
    this.pour();
    zonesMap().hide();
    this.rootElm.classList.add('hide');
  }
}
