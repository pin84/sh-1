/** @format */

class ZonesMap extends Container {
  constructor(id) {
    super(id);
  }

  initElms() {
    let it = this;
    it.mapElm = elmOfIdRel('map', it.rootElm);

    it.zoneRelocFld = elmOfIdRel('zone-reloc-fld', it.rootElm);
    it.zoneRelocAddr = elmOfIdRel('zone-reloc-addr', it.rootElm);
  }
  removeZoneCircle(circle) {
    if (circle) {
      circle.setMap(null);
    }
  }
  paintZoneCircle2(i, lat, lng, radius, fieldRadius, fieldLat, fieldLng) {
    let it = this;
    let circle = new google.maps.Circle({
      map: dataOfElm(it.rootElm).map,
      center: { lat: lat, lng: lng },
      radius: radius,
      // title: airport.code,
      editable: false,
      draggable: false,
      fillColor: '#333',
      fillOpacity: 0.7,
      strokeWeight: 0,
      zIndex: 5,
    });
    it.linkCircleRadiusField(circle, fieldRadius, fieldLat, fieldLng);

    return circle;
  }
  paintZoneCircle(i, lat, lng, radius) {
    let it = this;
    let circle = null;
    let zoneElm = elmOfIdRel('zone-' + i, addZones().rootElm);
    if (dataOfElm(elmOfIdRel('zone-' + i, addZones().rootElm)).circle) {
      circle = dataOfElm(elmOfIdRel('zone-' + i, addZones().rootElm)).circle;
      var oldLat = circle.getCenter().lat();
      var oldLng = circle.getCenter().lng();

      if (Math.abs(lat - oldLat) >= 0.00001 || Math.abs(lng - oldLng) >= 0.00001) {
        dataOfElm(it.rootElm).circle.setCenter({ lat: lat, lng: lng });
      }
    } else {
      var center = { lat: lat, lng: lng };
      circle = new google.maps.Circle({
        map: dataOfElm(it.rootElm).map,
        center: center,
        radius: radius,
        editable: false,
        draggable: false,
        fillColor: '#333',
        fillOpacity: 0.7,
        strokeWeight: 0,
        zIndex: 5,
      });
      dataOfElm(elmOfIdRel('zone-' + i, addZones().rootElm)).circle = circle;
    }

    if (i == 0) {
      circle.setOptions({ strokeColor: '#e60012' });
      circle.setOptions({ fillColor: '#e60012' });
      circle.setOptions({ fillOpacity: 0.1 });
      circle.setOptions({ editable: true });
      circle.setOptions({ draggable: true });
    }
    it.linkCircleRadiusField(
      dataOfElm(elmOfIdRel('zone-' + i, addZones().rootElm)).circle,
      elmOfIdRel('input-', elmOfIdRel('zone-radius', zoneElm)),
      elmOfIdRel('input-', elmOfIdRel('zone-lat', zoneElm)),
      elmOfIdRel('input-', elmOfIdRel('zone-lng', zoneElm))
    );

    return circle;
  }
  paintBasicCircle(lat, lng, radius) {
    // 1.Creating a new service area: change circle's center
    //
    let it = this;
    it.paintMap(lat, lng);
    // 0.Showing an existed service area:update circle's center or radius,compare lat and lng,radius
    if (dataOfElm(it.rootElm).circle) {
      var oldLat = dataOfElm(it.rootElm).circle.getCenter().lat();
      var oldLng = dataOfElm(it.rootElm).circle.getCenter().lng();
      dataOfElm(it.rootElm).circle.setRadius(radius);
      if (Math.abs(lat - oldLat) >= 0.00001 || Math.abs(lng - oldLng) >= 0.00001) {
        dataOfElm(it.rootElm).circle.setCenter({ lat: lat, lng: lng });
      }
    } else {
      var center = { lat: lat, lng: lng };
      dataOfElm(it.rootElm).circle = new google.maps.Circle({
        map: dataOfElm(it.rootElm).map,
        center: center,
        radius: radius,
        // title: airport.code,
        editable: false,
        draggable: false,
        strokeWeight: 0,
        fillColor: '#00a6f8',
        fillOpacity: 0.3,
        zIndex: 1,
      });
    }

    if (it.zoneRelocAutoComplete) {
      it.zoneRelocAutoComplete.setBounds(dataOfElm(it.rootElm).circle.getBounds());
    }
  }

  linkCircleRadiusField(circle, fieldRadius, fieldLat, fieldLng) {
    var it = this;
    fieldRadius.value = parseInt(circle.getRadius() / distUnitData[dU].measurement);

    fieldRadius.onblur = function () {
      var valInt = parseInt(fieldRadius.value);
      if (valInt) circle.setRadius(valInt * distUnitData[dU].measurement);
    };

    if (fieldLat) {
      fieldLat.onblur = function () {
        var valLat = parseFloat(fieldLat.value);
        var valLng = parseFloat(fieldLng.value);
        if (valLat && valLng) {
          circle.setCenter({ lat: valLat, lng: valLng });
        }
      };
    }

    if (fieldLng) {
      fieldLng.onblur = function () {
        var valLat = parseFloat(fieldLat.value);
        var valLng = parseFloat(fieldLng.value);
        if (valLat && valLng) {
          circle.setCenter({ lat: valLat, lng: valLng });
        }
      };
    }

    google.maps.event.addListener(circle, 'click', function () {
      addZones().currentCircleUiChange(circle, it.findZoneIndex(fieldRadius));
    });

    google.maps.event.addListener(circle, 'radius_changed', function () {
      addZones().currentCircleUiChange(circle, it.findZoneIndex(fieldRadius));
      fieldRadius.value = Math.round(circle.getRadius() / distUnitData[dU].measurement, 0);
    });

    google.maps.event.addListener(circle, 'center_changed', function () {
      addZones().currentCircleUiChange(circle, it.findZoneIndex(fieldLat));

      let center = circle.getCenter();

      if (fieldLat) {
        fieldLat.value = center.lat();
      }
      if (fieldLng) {
        fieldLng.value = center.lng();
      }
    });
  }
  findZoneIndex(elm) {
    if (elm.id && elm.id.startsWith('zone-') && elm.id.length > 5 && '0' <= elm.id[5] && elm.id[5] <= '9') {
      return indexOfId(elm.id);
    }
    return this.findZoneIndex(elm.parentElement);
  }
  paintMap(lat, lng) {
    // console.log('paintMap=====', lat, lng, dataOfElm(this.rootElm).map);
    let it = this;
    if (!dataOfElm(it.rootElm).map) {
      dataOfElm(it.rootElm).map = new google.maps.Map(it.mapElm, {
        zoom: 7,
        center: { lat: lat, lng: lng }
      });
    } else {
      // compare the map center and recenter
      var oldLat = dataOfElm(it.rootElm).map.getCenter().lat();
      var oldLng = dataOfElm(it.rootElm).map.getCenter().lng();
      if (Math.abs(lat - oldLat) >= 0.00001 || Math.abs(lng - oldLng) >= 0.00001) {
        dataOfElm(it.rootElm).map.setCenter({ lat: lat, lng: lng });
      }
    }
    this.show();
  }
  fill(serviceAreaData) {
    // init basic map
    var it = this;
    it.zoneRelocPlaceAndTime = new PlaceAndTime3(it.zoneRelocFld, it.zoneRelocAddr);
    elmDataSetPostAdd(it.zoneRelocFld, 'glePlaceId', () => {
      var curCircleLat = dataOfElm(it.zoneRelocFld).lat;
      var curCircleLng = dataOfElm(it.zoneRelocFld).lng;
      var glePlace = dataOfElm(it.zoneRelocFld).glePlace;
      // if the circle exists,recenter it;else create a circle and fill the zone name
      let curZoneElm = elmOfIdRel('zone-' + (Number(addZones().zoneIndexFld.value) - 1), addZones().rootElm);

      if (!dataOfElm(curZoneElm).circle) {
        dataOfElm(curZoneElm).circle = it.paintZoneCircle2(
          Number(addZones().zoneIndexFld.value) - 1,
          serviceArea.serviceArea.lat,
          serviceArea.serviceArea.lng,
          mkm2mtr(5, im),
          elmOfIdRel('input-', elmOfIdRel('zone-radius', curZoneElm)),
          elmOfIdRel('input-', elmOfIdRel('zone-lat', curZoneElm)),
          elmOfIdRel('input-', elmOfIdRel('zone-lng', curZoneElm))
        );
        dataOfElm(curZoneElm).zoneFields.lat.set(dataOfElm(it.rootElm).circle.getCenter().lat());
        dataOfElm(curZoneElm).zoneFields.lng.set(dataOfElm(it.rootElm).circle.getCenter().lng());

        addZones().updateZonesIndexItems();
      }
      if (!dataOfElm(curZoneElm).zoneFields.name.get()) {
        dataOfElm(curZoneElm).zoneFields.name.set(objValGetByKeys(glePlace, 'name'));

        let zoneNameBox = elmOfIdRel('zone-name-box', curZoneElm);
        let zoneNameFld = dataOfElm(curZoneElm).zoneName.inputElm;
        let zoneNameWarnIcon = elmOfIdClosest('error-icon', zoneNameFld);

        zoneNameBox.classList.remove('fld-box-empty-warn');
        zoneNameWarnIcon.style.display = 'none';
      }

      dataOfElm(curZoneElm).circle.setCenter({ lat: curCircleLat, lng: curCircleLng });
    });

    it.paintBasicCircle(
      objNumGetByKeys(serviceAreaData, 'serviceArea.lat'),
      objNumGetByKeys(serviceAreaData, 'serviceArea.lng'),
      objNumGetByKeys(serviceAreaData, 'serviceArea.radius')
    );
  }
  reset() {
    getElmsRelativeByName('zone', addZones().rootElm).forEach((zoneElm) => {
      if (dataOfElm(zoneElm).circle) {
        dataOfElm(zoneElm).circle.setMap(null);
        // dataOfElmClear(zoneElm);
      }
    });
    this.zoneRelocFld.value = '';
  }
  show() {
    this.init();
    this.rootElm.classList.add('show');
  }
  hide() {
    this.reset();
    this.rootElm.classList.remove('show');
  }
}
