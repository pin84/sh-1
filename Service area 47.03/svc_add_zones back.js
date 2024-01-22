/** @format */

class AddZones extends Container {
  constructor(id) {
    super(id);

    this.zonesIndexItems = [];
  }
  initElms() {
    var it = this;
    // it.checkbox = elmOfId('add-zone-checkbox');
    // it.checkbox.addEventListener('')
    it.svcAeaNameFld = elmOfIdRel('svc-aea-name-fld', it.rootElm);
    it.zonesPreviewChart = elmOfIdRel('zones-preview-chart', it.rootElm);
    it.previewChartZoneAirportAdd = new AddAnother('zone-airport', it.zonesPreviewChart, {
      fill: (i, elm, airportName) => {
        if (airportName) {
          elm.innerHTML = airportName;
        }
      },
      pour: (i, elm) => {},
    });

    it.previewChartZoneDetailRowAdd = new AddAnother('zone-detail-row', it.zonesPreviewChart, {
      fill: (i, elm, zoneData) => {
        var zoneAirportPrices = getElmsRelativeByName('zone-airport-price', elm);
        for (var n = 0; n < zoneAirportPrices.length; n++) {
          if (n != 0) {
            zoneAirportPrices[n].remove();
          } else {
            elmOfIdRel('price-fld', zoneAirportPrices[n]).innerHTML = '';
            elmOfIdRel('cur-fld', zoneAirportPrices[n]).innerHTML = '';
          }
        }

        if (zoneData) {
          elmOfIdRel('seq', elm).innerHTML = i + 1;
          elmOfIdRel('zone-name-fld', elm).innerHTML = objValGetByKeys(zoneData, 'name');
          elmOfIdRel('zone-radius-fld', elm).innerHTML = parseInt(objNumGetByKeys(zoneData, 'radius') / distUnitData[dU].measurement) + distUnitData[dU].abbr;

          let airportPriceAdd = new AddAnother('zone-airport-price', elm, {
            fill: (j, Elm, priceData) => {
              if (priceData) {
                elmOfIdRel('price-fld', Elm).innerHTML = objNumGetByKeys(priceData, 'amount');
                elmOfIdRel('cur-fld', Elm).innerHTML = objValGetByKeys(priceData, 'currency');
              }
            },
            pour: (j, Elm) => {},
          });

          airportPriceAdd.fill(objValGetByKeys(zoneData, 'prices'));
          dataOfElm(elm).airportPriceAdd = airportPriceAdd;
        }
      },
      pour: (i, elm) => {},
    });

    it.isZoneChartShowing = false;
    it.showChartPreviewBtn = elmOfIdRel('show-chart-preview-btn', it.rootElm);
    it.closeChartPreviewBtn = elmOfIdRel('modal-close', it.zonesPreviewChart);
    it.showChartPreviewBtn.onclick = function () {
      if (it.isZoneDataMissing()) {
        return;
      }

      it.isZoneChartShowing = true;
      // clear old preview data firstly
      var zoneAirportElms = getElmsRelativeByName('zone-airport', it.rootElm);
      for (var n = 0; n < zoneAirportElms.length; n++) {
        if (n != 0) {
          zoneAirportElms[n].remove();
        } else {
          zoneAirportElms[n].innerHTML = '';
        }
      }

      var zoneDetailRows = getElmsRelativeByName('zone-detail-row', it.rootElm);
      for (var j = 0; j < zoneDetailRows.length; j++) {
        if (j != 0) {
          zoneDetailRows[j].remove();
        } else {
          var zoneAirportPrices = getElmsRelativeByName('zone-airport-price', zoneDetailRows[j]);
          for (var n = 0; n < zoneAirportPrices.length; n++) {
            if (n != 0) {
              zoneAirportPrices[n].remove();
            } else {
              elmOfIdRel('price-fld', zoneAirportPrices[n]).innerHTML = '';
              elmOfIdRel('cur-fld', zoneAirportPrices[n]).innerHTML = '';
            }
          }
        }
      }

      it.pour(serviceArea);

      it.previewChartZoneAirportAdd.fill(objValGetByKeys(serviceArea, 'airports'));
      it.previewChartZoneDetailRowAdd.fill(objValGetByKeys(serviceArea, 'zones'));

      it.zonesPreviewChart.style.display = '';
      it.isZoneChartShowing = false;
    };

    it.closeChartPreviewBtn.onclick = function () {
      it.zonesPreviewChart.style.display = 'none';
    };
    it.zoneAdd = new WcAddAnother('zone', it.rootElm, {
      prep: (i, elm, zoneFields) => {
        if (zoneFields) {
          return zoneFields;
        }
        let zoneName = new InputFieldTmpl(elmOfIdRel('zone-name', elm));

        let zoneRadius = new IntInputFieldTmpl(elmOfIdRel('zone-radius', elm));
        let zoneLat = new DecimalInputFieldTmpl(elmOfIdRel('zone-lat', elm));
        let zoneLng = new DecimalInputFieldTmpl(elmOfIdRel('zone-lng', elm));
        let zoneCheckbox = new SwitchButtonTmpl(elmOfIdRel('zone-checkbox', elm));

        elmOnChangingPostAdd(elmOfIdRel('input-', elmOfIdRel('zone-name', elm)), () => {
          if (!dataOfElm(elm).circle) {
            dataOfElm(elm).circle = zonesMap().paintZoneCircle2(
              i,
              serviceArea.serviceArea.lat,
              serviceArea.serviceArea.lng,
              mkm2mtr(5, im),
              elmOfIdRel('input-', elmOfIdRel('zone-radius', elm)),
              elmOfIdRel('input-', elmOfIdRel('zone-lat', elm)),
              elmOfIdRel('input-', elmOfIdRel('zone-lng', elm))
            );
            zoneLat.set(dataOfElm(zonesMap().rootElm).circle.getCenter().lat());
            zoneLng.set(dataOfElm(zonesMap().rootElm).circle.getCenter().lng());
            console.log(dataOfElm(elm), elm)
            it.currentCircleUiChange(dataOfElm(elm).circle, i);
          }

          it.updateZonesIndexItems();
        });

        zoneFields = {
          name: zoneName,
          radius: zoneRadius,
          lat: zoneLat,
          lng: zoneLng,
          p2p: zoneCheckbox,
        };

        dataOfElm(elm).zoneFields = zoneFields;
        return zoneFields;
      },
      fill: async (i, elm, zoneData, zoneFields) => {
        dataOfElm(elm).zoneName = zoneFields.name;
        // getElmsRelativeByName('zone-index', elm).forEach(zoneIndexElm => {
        //     zoneIndexElm.value = i + 1;
        // });
        getElmsRelativeByName('airport-price-box', elm).forEach((airportPriceBoxElm) => {
          elmOfIdRel('airport-price', airportPriceBoxElm).value = '';
        });

        var airportDistancePops = [];
        var airportDistanceBoxes = getElmsRelativeByName('airport-distance-box', elm);
        for (var j = 0; j < airportDistanceBoxes.length; j++) {
          let airportDistancePop = {};
          airportDistancePop.field = elmOfIdRel('airport-distance', airportDistanceBoxes[j]);
          fldDigitsOnly(airportDistancePop.field);

          if (!zoneData) {
            airportDistancePop.field.value = '';
          }

          airportDistancePop.unitElm = elmOfIdRel('airport-distance-unit', airportDistanceBoxes[j]);
          airportDistancePop.unitElm.innerHTML = distUnitData[dU].abbr;

          airportDistancePop.airport = objValGetByKeys(zoneData, 'prices.' + j + '.airport');
          airportDistancePops.push(airportDistancePop);
        }

        var airportPriceBoxes = getElmsRelativeByName('airport-price-box', elm);

        if (!zoneData) {
          // clear all data and remove circle
          zoneFields.name.setLblAInput(i + 1, '');
          zoneFields.radius.set('');
          zoneFields.lat.set('');
          zoneFields.lng.set('');
          zoneFields.p2p.fill('');

          // zonesMap().updateZoneIndexDropdown();
          getElmsRelativeByClass('airport-price', elm).forEach((airportPriceElm) => {
            airportPriceElm.value = '';
          });
          if (dataOfElm(elm).circle) {
            zonesMap().removeZoneCircle(dataOfElm(elm).circle);
            dataOfElm(elm).circle = null;
          }

          for (var j = 0; j < airportPriceBoxes.length; j++) {
            fldMoneyOnly(elmOfIdRel('airport-price', airportPriceBoxes[j]));
            elmOfIdRel('airport-price', airportPriceBoxes[j]).value = '';
            elmOfIdRel('airport-price-unit', airportPriceBoxes[j]).innerHTML = serviceArea.currencyCode;
          }
        } else {
          dataOfElm(elm).airportDatas = [];

          airportDistancePops.forEach((airportDistancePop) => {
            airportCacheOld().get(airportDistancePop.airport, (data) => {
              dataOfElm(elm).airportDatas.push(data);
            });
          });

          if (!dataOfElm(elm).circle) {
            //change it to dataofelm(elm).circle
            let circle = zonesMap().paintZoneCircle(i, objNumGetByKeys(zoneData, 'lat'), objNumGetByKeys(zoneData, 'lng'), objNumGetByKeys(zoneData, 'radius'));
            dataOfElm(elm).circle = circle;
          } else {
            it.adjustAirportsForZoneCircle(i, objNumGetByKeys(zoneData, 'radius'));
          }

          for (var j = 0; j < airportPriceBoxes.length; j++) {
            fldMoneyOnly(elmOfIdRel('airport-price', airportPriceBoxes[j]));
            elmOfIdRel('airport-price', airportPriceBoxes[j]).value = objNumGetByKeys(zoneData, 'prices.' + j + '.amount');
            elmOfIdRel('airport-price-unit', airportPriceBoxes[j]).innerHTML = objValGetByKeys(zoneData, 'prices.' + j + '.currency');
          }

          zoneFields.name.setLblAInput(i + 1, objValGetByKeys(zoneData, 'name'));
          zoneFields.radius.set(parseInt(objNumGetByKeys(zoneData, 'radius') / distUnitData[dU].measurement));
          elmOfIdRel('zone-radius-unit', elm).innerHTML = distUnitData[dU].abbr;

          dataOfElm(elm).zoneName = zoneFields.name;

          let zoneLat = zoneFields.lat;
          zoneLat.set(objNumGetByKeys(zoneData, 'lat'));
          dataOfElm(elm).zoneLat = zoneLat;

          let zoneLng = zoneFields.lng;
          zoneLng.set(objNumGetByKeys(zoneData, 'lng'));
          dataOfElm(elm).zoneLng = zoneLng;

          let zoneP2p = zoneFields.p2p;
          zoneP2p.fill(zoneData.p2p ? eval(zoneData.p2p) : false);
        }

        it.limitInputValue();
      },
      pour: (i, elm, zoneFields) => {
        //return one zone json
        let zone = {};

        if ((!dataOfElm(elm).circle && !it.isZoneChartShowing) || !zoneFields.name.get()) {
          return null;
        }

        zone.name = zoneFields.name.get();

        let circle = dataOfElm(elm).circle;
        if (circle) {
          zone.lat = circle.getCenter().lat();
          zone.lng = circle.getCenter().lng();
          zone.radius = parseInt(circle.getRadius());
        }

        zone.prices = [];

        var airportNameBoxes = getElmsRelativeByName('airport-name-box', elm);
        for (var m = 0; m < airportNameBoxes.length; m++) {
          let price = {};
          price.airport = elmOfIdRel('airport-name', airportNameBoxes[m]).value;
          price.amount = parseFloat(elmOfIdRel('airport-price', elmOfIdRel('airport-price-box-' + m, elm)).value);
          // price.currency = elmOfIdRel('airport-price-unit', elmOfIdRel('airport-price-box-' + m, elm)).innerHTML;
          price.currency = serviceArea.currencyCode;
          zone.prices.push(price);
        }
        zone.p2p = zoneFields.p2p.pour();
        return zone;
      },
      focusIndexChanged: (index, idxToRemove) => {
        // console.log('focusIndexChanged===============', index, idxToRemove);
        it.updateZonesIndexItems();
        it.updateVehicleClasses(idxToRemove);
        // sel the drop down to the item index + 1, as string, that should trigger the display of the zone, both on the left (zone-index element) and on the right map, zone circle, etc.
        it.zoneIndexAutoComp.items.forEach((zonesIndexItem) => {
          if (zonesIndexItem.index == index + 1) {
            it.zoneIndexAutoComp.set(zonesIndexItem);
          }
        });

        // when you display zone-index, change the number displayed to index + 1
        // hide all the other zones. When you hide zone, do not worry about the number it should display
        // remove all other code that deal with display of the zone index
        // this fucction will be called AFTER prep/fill and pour are all done and sompleted,
        // so zone cirlce and everything should already be set up properly by the time this function is called
      },
    });

    // zone index autocomp stuff
    it.zoneIndexFld = elmOfIdRel('zone-index', it.rootElm);

    it.zoneIndexAutoComp = new TextAutoComp(it.zoneIndexFld, {
      str: (item, selected) => {
        if (selected) {
          return [item.index.toString()];
        } else {
          return [item.index + ' ' + item.name];
        }
      },
      sel: (item) => {
        if (item) {
          //  // such is zone index
          let curZoneIndex = item.index;

          let curZoneElm = elmOfIdRel('zone-' + (curZoneIndex - 1), addZones().rootElm);
          // only show current zone part and circle
          getElmsRelativeByName('zone', addZones().rootElm).forEach((zoneElm) => {
            zoneElm.style.display = 'none';
            if (dataOfElm(zoneElm).circle) {
              dataOfElm(zoneElm).circle.setOptions({ fillColor: '#333' });
              dataOfElm(zoneElm).circle.setOptions({ fillOpacity: 0.3 });
              dataOfElm(zoneElm).circle.setOptions({ strokeWeight: 0 });
              dataOfElm(zoneElm).circle.setOptions({ editable: false });
              dataOfElm(zoneElm).circle.setOptions({ draggable: false });
            }
          });

          curZoneElm.style.display = '';
          if (dataOfElm(curZoneElm).circle) {
            dataOfElm(curZoneElm).circle.setOptions({ strokeColor: '#e60012' });
            dataOfElm(curZoneElm).circle.setOptions({ fillColor: '#e60012' });
            dataOfElm(curZoneElm).circle.setOptions({ fillOpacity: 0.1 });
            dataOfElm(curZoneElm).circle.setOptions({ strokeWeight: '2' });
            dataOfElm(curZoneElm).circle.setOptions({ editable: true });
            dataOfElm(curZoneElm).circle.setOptions({ draggable: true });
          }

          // correct corresponding zone box index
          if (dataOfElm(curZoneElm).zoneName) {
            dataOfElm(curZoneElm).zoneName.setLbl(curZoneIndex);
          }

          // chagne airport index also
          // getElmsRelativeByName('zone-index', curZoneElm).forEach(zoneIndexElm => {
          //     zoneIndexElm.value = curZoneIndex;
          // })
        }
      },
    });

    it.zoneIndexAutoComp.filter = false;
    it.zoneIndexAutoComp.moreDown = false;
    it.zoneIndexAutoComp.moreUp = false;

    it.zoneIndexDownBtn = elmOfIdRel('zone-index-down', it.rootElm);
    it.zoneIndexDownBtn.onclick = function () {
      it.zoneIndexFld.focus();
    };
  }
  isZoneDataMissing() {
    let it = this;
    let isZoneDataMissing = false;
    let zoneElms = getElmsRelativeByName('zone', addZones().rootElm);
    for (var i = 0; i < zoneElms.length; i++) {
      if (it.isZoneEmpty(zoneElms[i])) {
        break;
      }
      // if (it.isZoneNameMis(zoneElms[i]) || it.isZonePriceMis(zoneElms[i])) {
      if ((!it.isZoneNameMis(zoneElms[i]) && it.isZonePriceMis(zoneElms[i])) || (it.isZoneNameMis(zoneElms[i]) && !it.isZonePriceMis(zoneElms[i]))) {
        zoneElms.forEach((zoneElm) => {
          zoneElm.style.display = 'none';
        });
        it.zoneIndexAutoComp.set(it.zonesIndexItems[i]);
        zoneElms[i].style.display = '';

        isZoneDataMissing = true;
        break;
      }
    }
    return isZoneDataMissing;
  }
  isZoneEmpty(zoneElm) {
    let isZoneNameEmpty = false;
    let isZonePriceEmpty = false;
    let isZoneEmpty = false;

    if (!dataOfElm(zoneElm).zoneName.get()) {
      isZoneNameEmpty = true;
    }

    let zonePriceFlds = getElmsRelativeByClass('airport-price', zoneElm);
    for (var i = 0; i < zonePriceFlds.length; i++) {
      if (!zonePriceFlds[i].value.trim()) {
        isZonePriceEmpty = true;
      }
    }

    if (isZoneNameEmpty && isZonePriceEmpty) {
      isZoneEmpty = true;
    }

    return isZoneEmpty;
  }
  isZoneNameMis(zoneElm) {
    let zoneNameBox = elmOfIdRel('zone-name-box', zoneElm);
    let zoneNameFld = dataOfElm(zoneElm).zoneName.inputElm;
    let zoneNameWarnIcon = elmOfIdClosest('error-icon', zoneNameFld);

    zoneNameFld.addEventListener('input', function () {
      zoneNameBox.classList.remove('fld-box-empty-warn');
      zoneNameWarnIcon.style.display = 'none';
    });
    if (!dataOfElm(zoneElm).zoneName.get()) {
      zoneNameBox.classList.add('fld-box-empty-warn');
      zoneNameWarnIcon.style.display = '';
      return true;
    }

    return false;
  }
  isZonePriceMis(zoneElm) {
    let isZonePriceMissing = false;

    let zonePriceFlds = getElmsRelativeByClass('airport-price', zoneElm);
    for (var i = 0; i < zonePriceFlds.length; i++) {
      let zonePriceBox = zonePriceFlds[i].parentElement;
      let zonePriceWarnIcon = elmOfIdClosest('error-icon', zonePriceFlds[i]);

      zonePriceFlds[i].addEventListener('input', function () {
        zonePriceBox.classList.remove('fld-box-empty-warn');
        zonePriceWarnIcon.style.display = 'none';
      });
      if (!zonePriceFlds[i].value.trim()) {
        zonePriceBox.classList.add('fld-box-empty-warn');
        zonePriceWarnIcon.style.display = '';
        isZonePriceMissing = true;
      }
    }

    return isZonePriceMissing;
  }
  updateZonesIndexItems() {
    let it = this;
    let n = getElmsRelativeByName('zone', it.rootElm).length;
    // set the drop down items from 1 through n, in string.
    it.zonesIndexItems = [];
    for (var a = 0; a < n; a++) {
      let zonesIndexItem = {
        index: a + 1,
        name: dataOfElm(elmOfIdRel('zone-' + a, it.rootElm)).zoneFields.name.get(),
      };
      it.zonesIndexItems.push(zonesIndexItem);
    }

    it.zoneIndexAutoComp.setItems(it.zonesIndexItems);
  }
  adjustAirportsForZoneCircle(i, radius) {
    let it = this;

    async.done(() => {
      let airports = dataOfElm(elmOfIdRel('zone-' + i, it.rootElm)).airportDatas;

      let lat = 0.0;
      let lng = 0.0;

      airports.forEach((airport) => {
        lat += objNumGetByKeys(airport, 'airports.0.lat');
        lng += objNumGetByKeys(airport, 'airports.0.lng');
      });
      lat = lat / airports.length;
      lng = lng / airports.length;

      zonesMap().paintZoneCircle(i, lat, lng, radius);
    });
  }
  currentCircleUiChange(curCircle, zoneIndex) {
    console.log('currentCircleUiChange========', curCircle, zoneIndex)
    if (curCircle) {
      getElmsRelativeByName('zone', this.rootElm).forEach((zoneElm) => {
        console.log(zoneElm);
        if (dataOfElm(zoneElm).circle) {
          dataOfElm(zoneElm).circle.setOptions({ fillColor: '333' });
          dataOfElm(zoneElm).circle.setOptions({ fillOpacity: 0.3 });
          dataOfElm(zoneElm).circle.setOptions({ strokeWidth: 0 });
          dataOfElm(zoneElm).circle.setOptions({ editable: false });
          dataOfElm(zoneElm).circle.setOptions({ draggable: false });
        }
      });
      curCircle.setOptions({ strokeColor: '#e60012' });
      curCircle.setOptions({ fillColor: 'e60012' });
      curCircle.setOptions({ fillOpacity: 0.1 });
      curCircle.setOptions({ strokeWeight: 2 });
      curCircle.setOptions({ editable: true });
      curCircle.setOptions({ draggable: true });
      this.zoneIndexAutoComp.items.forEach((zonesIndexItem) => {
        if (zonesIndexItem.index == zoneIndex + 1) {
          this.zoneIndexAutoComp.set(zonesIndexItem);
        }
      });
    }
  }
  fill(serviceAreaData) {
    console.log('serviceAreaData=======', serviceAreaData);

    serviceAreaData.zones &&
      serviceAreaData.zones.map((item) => {
        if (!item.hasOwnProperty('p2p')) item.p2p = '';
      });
    var it = this;
    it.reset();
    dataOfElm(it.rootElm).serviceAreaId = objNumGetByKeys(serviceAreaData, 'serviceArea.id');
    it.svcAeaNameFld.innerHTML = objValGetByKeys(serviceAreaData, 'serviceArea.name');

    let airports = objValGetByKeys(serviceAreaData, 'airports');

    let airportAdd = new AddAnother('airport-name-box', elmOfIdRel('zone-0', it.rootElm), {
      fill: (i, elm, airportCode) => {
        elmOfIdRel('airport-name', elm).value = airportCode;
      },
    });

    airportAdd.fill(airports);

    let distanceAdd = new AddAnother('airport-distance-box', elmOfIdRel('zone-0', it.rootElm), {
      fill: (i, elm, airport) => {},
    });
    distanceAdd.fill(airports);

    let priceAdd = new AddAnother('airport-price-box', elmOfIdRel('zone-0', it.rootElm), {
      fill: (i, elm, airport) => {},
    });
    priceAdd.fill(airports);

    it.zoneAdd.fill(serviceAreaData.zones);

    if (!serviceAreaData.zones) {
    }
  }
  pour(serviceAreaData) {
    let it = this;

    serviceAreaData.serviceArea.name = it.svcAeaNameFld.innerHTML;

    var zones = [];
    zones = it.zoneAdd.pour();

    serviceAreaData.zones = zones;
    // this.setAppendixValue('deltaAmount')
  }
  reset() {
    var it = this;
    it.svcAeaNameFld.innerHTML = '';
    dataOfElmClear(it.rootElm);

    var zones = getElmsRelativeByName('zone', it.rootElm);
    console.log('reset====', zones);

    for (var i = 0; i < zones.length; i++) {
      dataOfElmClear(zones[i]);
      if (i != 0) {
        zones[i].remove();
      } else {
        if (dataOfElm(zones[i]).zoneName) {
          dataOfElm(zones[i]).zoneName.set('');
          elmOfIdRel('zone-name-box', zones[i]).classList.remove('fld-box-empty-warn');
          elmOfIdClosest('error-icon', dataOfElm(zones[i]).zoneName.inputElm).style.display = 'none';
        }

        if (dataOfElm(zones[i]).zoneRadius) {
          dataOfElm(zones[i]).zoneRadius.set('');
        }

        getElmsRelativeByName('airport-name-box', zones[i]).forEach((airportNameBoxElm) => {
          if (indexOfElm(airportNameBoxElm) != 0) {
            airportNameBoxElm.remove();
          } else {
            // elmOfIdRel('zone-index', airportNameBoxElm).value = '';
            elmOfIdRel('airport-name', airportNameBoxElm).value = '';
          }
        });

        let airportPriceFld = elmOfIdRel('airport-price', zones[i]);
        airportPriceFld.value = '';
        airportPriceFld.parentElement.classList.remove('fld-box-empty-warn');
        elmOfIdClosest('error-icon', airportPriceFld).style.display = 'none';
      }
    }
  }

  initData() {
    let zones = serviceArea.zones || [];
    let zonesIndexItems = [];
    zones.forEach((item, idx) => {
      zonesIndexItems.push({
        index: idx + 1,
        name: item.name,
      });
    });

    this.zonesIndexItems = zonesIndexItems;
  }
  show() {
    // this.setAppendixValue()
    // this.initData()
    this.init();
    zonesMap().show();
    zonesMap().fill(serviceArea);
    this.fill(serviceArea);
    this.rootElm.classList.remove('hide');

    this.limitInputValue();
  }

  limitInputValue() {
    this.rootElm.querySelectorAll('#airport-price').forEach((elm) => {
      elm.addEventListener('input', (e) => {
        e.target.value = fldMoneyOnlyReg(e.target.value);
      });
    });
  }

  setAppendixValue(type = 'curAmount') {
    let { vehicleClasses, zones } = serviceArea;

    if (!zones || zones.length == 0 || !vehicleClasses) return;

    let zoneLen = zones.length - 1;
    let priceLen = zones[0].prices?.length - 1;

    for (let obj of vehicleClasses) {
      let { percent_appendix } = obj;
      if (!percent_appendix) {
        percent_appendix = [];
      }
      for (let item of percent_appendix) {
        let arr = item.field.split('.');
        let startStr = arr[0];
        if (startStr == 'zones') {
          let zoneNo = Number(arr[1]);
          if (zoneNo > zoneLen) {
            continue;
          }

          let priceNo = Number(arr[3]);
          if (priceNo > priceLen) {
            // let index = percent_appendix.findIndex(o=>o.field == item.field)
            // percent_appendix.splice(index,1)
            // console.log(percent_appendix);
            continue;
          }

          let cAmount = zones[zoneNo].prices[priceNo].amount;
          let price;
          if (type == 'curAmount') {
            if (item.delta_amount < 0 && Math.abs(item.delta_amount) > cAmount) {
              item.delta_amount = -cAmount;
            }
            price = cAmount + item.delta_amount;
            item['curAmount'] = Number(price.toFixed(2));
          }
          if (type == 'deltaAmount') {
            price = item.curAmount - cAmount;
            item['delta_amount'] = Number(price.toFixed(2));
          }
        }
      }
    }
    console.log('---add zone---', serviceArea);
  }
  hide() {
    this.pour(serviceArea);
    zonesMap().reset();
    zonesMap().hide();
    this.rootElm.classList.add('hide');
  }

  validate() {
    return true;
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
}
