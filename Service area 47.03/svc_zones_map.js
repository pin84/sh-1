/**
 * @format
 * @FilePath: svc_zones_map.js
 * @Author: Joy
 * @Date: 2023-08-12 09:31:12
 * @LastEditors: Joy
 * @LastEditTime: 2023-08-22 09:18:59
 * @Descripttion: Fixed Price Zones map
 */

class ZonesMap {
  constructor(id) {
    this.rootElm = elmOfId(id);
    this.zones = [];
    this.isGoogleMap = false;
    this.pageMap = null;
  }

  initElms() {
    this.mapElm = elmOfIdRel('map', this.rootElm);
    this.zoneRelocFld = elmOfIdRel('zone-reloc-fld', this.rootElm);
    this.zoneRelocAddr = elmOfIdRel('zone-reloc-addr', this.rootElm);
  }

  paintMap(lat, lng, radius) {
    this.pageMap.initMap(this.mapElm);
    this.pageMap.addBasicCircleToMap({ lat, lng }, radius);
    this.addMapEvents();
    if (!this.zones.length) return;
    this.zones.map((item, index) => {
      if (item.hasOwnProperty('polygons')) {
        this.pageMap.addPolygonToMap(item.polygons, index, true);
      } else {
        this.pageMap.addCircleToMap({
          center: { lat: item.lat, lng: item.lng },
          radius: item.radius,
          idx: index,
        });
      }
    });
    this.pageMap.updateStyle(0, true);
    
    // this.pageMap.addPolygonToMap({ lat, lng });
  }

  addMapEvents() {
    // console.log('addMapEvents')
    document.addEventListener('circleTap', (e) => {
      // console.log(e.detail);
      this.changeCurrentCircleData(e.detail.index);
    });

    this.bindCircleDrag = this.circleDrag.bind(this);
    document.addEventListener('circleDrag', this.bindCircleDrag);

    document.addEventListener('circleRadiusChange', this.circleRadiusChange);
    document.addEventListener('polygonTap', (e) => {
      this.changeCurrentCircleData(e.detail.index);
    });

    document.addEventListener('changePolygon', this.changePolygon);
  }

  circleDrag(e) {
    let { evt, index } = e.detail;
    let circleCenter = this.isGoogleMap ? evt.getCenter() : evt.target.getCenter();
    const latitude = this.isGoogleMap ? circleCenter.lat() : circleCenter.lat;
    const longitude = this.isGoogleMap ? circleCenter.lng() : circleCenter.lng;
    addZones().zoneLat.innerHTML = latitude.toFixed(6);
    addZones().zoneLng.innerHTML = longitude.toFixed(6);

    let obj = {
      lat: latitude,
      lng: longitude,
    }
    addZones().updateZonesObj(index, obj);
    // addZones().updateZonesData(index, 'lat', latitude);
    // addZones().updateZonesData(index, 'lng', longitude);
  }

  circleRadiusChange(e) {
    let { radius, index } = e.detail;
    const ra = Math.round(radius / distUnitData[dU].measurement);
    addZones().zoneRadius.value = ra;
    addZones().updateZonesData(index, 'radius', ra * distUnitData[dU].measurement);
  }

  changePolygon(e) {
    console.log('changePolygon===========')
    let obj = {
      lat: e.detail.center.lat,
      lng: e.detail.center.lng,
      polygons: e.detail.list
    }
    addZones().zoneLat.innerHTML = e.detail.center.lat.toFixed(6);
    addZones().zoneLng.innerHTML = e.detail.center.lng.toFixed(6);
    addZones().updateZonesObj(e.detail.index, obj);
    // console.log(addZones().zones)
  }

  removeMapObject(index) {
    this.pageMap.removeMapObject(index);
  }

  mapFullscreen() {
    if (this.mapElm.requestFullscreen) {
      this.mapElm.requestFullscreen();
    } else if (this.mapElm.mozRequestFullScreen) {
      this.mapElm.mozRequestFullScreen();
    } else if (this.mapElm.webkitRequestFullscreen) {
      this.mapElm.webkitRequestFullscreen();
    } else if (this.mapElm.msRequestFullscreen) {
      this.mapElm.msRequestFullscreen();
    }
  }
  fill(serviceAreaData) {
    this.zones = serviceAreaData.zones || [];
    this.zoneRelocPlaceAndTime = new PlaceAndTime3(this.zoneRelocFld, this.zoneRelocAddr);
    elmDataSetPostAdd(this.zoneRelocFld, 'glePlaceId', () => {
      const curCircleLat = dataOfElm(this.zoneRelocFld).lat;
      const curCircleLng = dataOfElm(this.zoneRelocFld).lng;
      const glePlace = dataOfElm(this.zoneRelocFld).glePlace.name || '';
      const currentIndex = addZones().currentZoneIndex;
      addZones().zones[currentIndex].lat = curCircleLat;
      addZones().zones[currentIndex].lng = curCircleLng;
      if (!addZones().zones[currentIndex].name) {
        addZones().zones[currentIndex].name = glePlace;
        addZones().zones[currentIndex].radius = Number(serviceArea.serviceArea.radius) / 3;
        this.pageMap.addCircleToMap({
          center: { lat: curCircleLat, lng: curCircleLng },
          radius: Number(serviceArea.serviceArea.radius) / 3,
          idx: currentIndex,
        });
        addZones().updateElmsData(currentIndex);
      }
      if (this.pageMap.mapList.length) {
        this.pageMap.moveMapObject(currentIndex, curCircleLat, curCircleLng);
      }
      addZones().updateElmsData(currentIndex);
    });

    // init basic map
    this.paintMap(
      objNumGetByKeys(serviceAreaData, 'serviceArea.lat'),
      objNumGetByKeys(serviceAreaData, 'serviceArea.lng'),
      objNumGetByKeys(serviceAreaData, 'serviceArea.radius')
    );

    this.changeCurrentCircleData();
  }

  changeCurrentCircleData(index = 0) {
    addZones().currentZoneIndex = index;
    addZones().clearAllWarn();
    addZones().dropdown.resetDropdownMenu(addZones().zones[index].id);
    addZones().updateElmsData(index);
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
    this.isGoogleMap = _d.isGoogleMap;
    if (this.isGoogleMap) {
      this.pageMap = new GoogleMap();
    } else {
      this.pageMap = new HereMap();
    }
    this.initElms();
    this.fill(serviceArea);
    this.rootElm.classList.add('show');
  }
  hide() {
    document.removeEventListener('circleDrag', this.bindCircleDrag);
    document.removeEventListener('circleRadiusChange', this.circleRadiusChange);
    document.removeEventListener('changePolygon', this.changePolygon);
    this.pageMap.dispose();
    this.reset();
    this.rootElm.classList.remove('show');
  }
}
