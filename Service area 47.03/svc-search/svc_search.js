/**
 * @format
 * @Description: Attribution Service Area Search
 * @Author: Joy
 * @Date: 2023-07-26 15:09:12
 * @LastEditTime: 2023-07-27 15:50:11
 * @LastEditors: Joy
 */

class Search {
  constructor() {
    this.rootElm = elmOfId('service-area-search-wrapper');
  }

  async insertHtml() {
    let dom = elmOfIdRel('scv-search', this.rootElm);
    if (!dom) {
      let data = await fetch('./svc-search/svc_search.html');
      let html = await data.text();
      this.rootElm.innerHTML = html;
    }
  }

  initElms() {
    const _this = this;
    _this.fromEle = elmOfIdRel('from-place', _this.rootElm);
    // _this.fromAddr = elmOfIdRel('from-addr', _this.rootElm);
    _this.fromEle.addEventListener('input', () => {
      dataOfElmClear(_this.fromEle);
    });
    _this.handleBlurEvent(_this.fromEle);
    _this.fromPlace = new Place(_this.fromEle);

    _this.toEle = elmOfIdRel('to-place', _this.rootElm);
    _this.toEle.addEventListener('input', () => {
      dataOfElmClear(_this.toEle);
    });
    _this.handleBlurEvent(_this.toEle);
    _this.toPlace = new Place(_this.toEle);

    _this.exchange = elmOfIdRel('exchange', _this.rootElm);
    _this.exchange.addEventListener('click', _this.handleExchange.bind(this));

    _this.searchBtn = elmOfIdRel('search-btn', _this.rootElm);
    _this.searchBtn.addEventListener('click', _this.handleSearch.bind(this));
    _this.searchLoading = elmOfIdRel('search-loading', _this.rootElm);
    _this.searchResult = elmOfIdRel('search-result', _this.rootElm);
  }

  initMap() {
    // initialize communication with the platform
    const platform = new H.service.Platform({
      apikey: 'iRsfgnlRJ5BaikxxrbXWcDBKuTrQeb1M-93gY0CU3Fc',
    });
    this.platform = platform;

    const defaultLayers = platform.createDefaultLayers();

    // initialize a map - this map is centered over New Delhi
    const map = new H.Map(elmOfId('svc-search-map'), defaultLayers.vector.normal.map, {
      center: { lat: 0, lng: 0 },
      zoom: 2.5,
      pixelRatio: window.devicePixelRatio || 1,
    });
    this.map = map;

    // add a resize listener to make sure that the map occupies the whole container
    window.addEventListener('resize', () => map.getViewPort().resize());

    // make the map interactive
    const behavior = new H.mapevents.Behavior(new H.mapevents.MapEvents(map));

    // Create the default UI components
    const ui = H.ui.UI.createDefault(map, defaultLayers);
  }

  destroyMap() {
    // this.map.removeEventListener('tap', handleTap);
    // this.map.removeObjects(map.getObjects());
    this.map && this.map.dispose();
    this.map = null;
  }

  mapCalculateRouteFromAtoB(origin, destination) {
    const _this = this;
    const router = _this.platform.getRoutingService(null, 8);
    const routeRequestParams = {
      routingMode: 'fast',
      transportMode: 'car',
      origin,
      destination,
      return: 'polyline,turnByTurnActions,actions,instructions,travelSummary',
    };

    const onSuccess = (result) => {
      console.log(result, origin, destination);
      if (result.routes && result.routes.length) {
        const route = result.routes[0];
        _this.mapAddRouteShapeToMap(route);
        _this.mapAddManueversToMap(route);
      } else {
        svcUtils.msgBox({ msg: result.notices[0].title || 'error' });
      }
    };

    const onError = () => {
      alert("Can't reach the remote server");
    };

    router.calculateRoute(routeRequestParams, onSuccess, onError);
  }

  mapAddRouteShapeToMap(route) {
    route.sections.forEach((section) => {
      // decode LineString from the flexible polyline
      let linestring = H.geo.LineString.fromFlexiblePolyline(section.polyline);

      // Create a polyline to display the route:
      let polyline = new H.map.Polyline(linestring, {
        style: {
          lineWidth: 5,
          strokeColor: '#23CD94',
        },
      });

      // Add the polyline to the map
      this.map.addObject(polyline);
      // And zoom to its bounding rectangle
      const boundingBox = polyline.getBoundingBox();
      this.map.getViewModel().setLookAtData({
        bounds: boundingBox,
      });
    });
  }

  mapAddManueversToMap(route) {
    const svgMarkup = this.svgMarkup('#23CD94', 24);
    const svgMarkup1 = this.svgMarkup('#F57474', 20);

    const dotIcon = new H.map.Icon(svgMarkup, { anchor: { x: 10, y: 10 } });
    const dotIcon1 = new H.map.Icon(svgMarkup1, { anchor: { x: 14, y: 14 } });
    const group = new H.map.Group();

    route.sections.forEach((section) => {
      let poly = H.geo.LineString.fromFlexiblePolyline(section.polyline).getLatLngAltArray();

      let actions = section.actions;
      // Add a marker for each maneuver
      for (let i = 0; i < actions.length; i += 1) {
        if (i === 0 || i === actions.length - 1) {
          let action = actions[i];
          var marker = new H.map.Marker(
            {
              lat: poly[action.offset * 3],
              lng: poly[action.offset * 3 + 1],
            },
            { icon: i === 0 ? dotIcon : dotIcon1 }
          );
          // marker.instruction = action.instruction;
          group.addObject(marker);
        }
      }

      group.addEventListener(
        'tap',
        (evt) => {
          map.setCenter(evt.target.getGeometry());
        },
        false
      );

      // Add the maneuvers group to the map
      this.map.addObject(group);
      // this.group = group
    });
  }

  addCircleToMap(lat, lng, radius) {
    const circle = new H.map.Circle(
      // The central point of the circle
      { lat, lng },
      // The radius of the circle in meters
      radius,
      {
        style: {
          strokeColor: 'rgba(21, 115, 255, 0.10)', // Color of the perimeter
          lineWidth: 2,
          fillColor: 'rgba(21, 115, 255, 0.10)', // Color of the circle
        },
      }
    );
    // console.log(circle.getBoundingBox())
    this.map.addObject(circle);
    this.map.getViewModel().setLookAtData({
      bounds: circle.getBoundingBox()
    });
  }

  svgMarkup(color, size) {
    return `<svg width="${size}" height="${size}" xmlns="http://www.w3.org/2000/svg">
      <circle cx="${size / 2}" cy="${size / 2}" r="${size / 2}" fill="${color}" stroke="white" stroke-width="1" />
    </svg>`;
  }

  handleBlurEvent = (ele) => {
    const reg = /^(-?\d{1,2}\.\d+?),\s*(-?1[0-7]\d\.\d+)$/; // Calibrate latitude and longitude
    ele.addEventListener('blur', () => {
      // console.log(this, ele.value, reg.test(ele.value));
      if (reg.test(ele.value)) {
        dataOfElm(ele).lat = this.dealLatOrLng(ele.value)[0].trim();
        dataOfElm(ele).lng = this.dealLatOrLng(ele.value)[1].trim();
      }
      if (!dataOfElm(ele).lat) {
        ele.value = '';
      }
    });
  };

  handleExchange() {
    if (!this.fromEle.value && !this.toEle.value) return;
    const tempFromVal = this.fromEle.value;
    const tempToVal = this.toEle.value;
    const tempFromData = dataOfElm(this.fromEle);
    const tempToData = dataOfElm(this.toEle);
    this.fromEle.value = tempToVal;
    this.toEle.value = tempFromVal;
    this.fromEle.data = { ...tempToData };
    this.toEle.data = { ...tempFromData };
    // console.log(dataOfElm(this.fromEle), dataOfElm(this.toEle));
  }

  handleSearch() {
    let classList = Array.from(this.searchLoading.classList);
    if (!classList.includes('hide')) return;

    if (!this.validate()) {
      // return showErr('Please enter the address first');
      return svcUtils.msgBox({
        msg: 'Please enter the address first',
      });
    }
    this.searchLoading.classList.remove('hide');
    let from_lat = dataOfElm(this.fromEle).lat;
    let from_lng = dataOfElm(this.fromEle).lng;
    let to_lat = dataOfElm(this.toEle).lat;
    let to_lng = dataOfElm(this.toEle).lng;

    let params = {
      ses: _d.ses,
      from_lat,
      from_lng,
      to_lat,
      to_lng,
      currency: 'USD',
      demand_fleet_id: elifeFleetId,
      distance: 1,
    };
    let url = api[stage].ridePricings;

    svcUtils.get(url, params).then((result) => {
      let { code, res } = result;
      if (code == 0) {
        if (res.fleets && res.fleets.length) {
          let result = res.fleets.find((item) => item.parent_fleet_id == _d.elifeFleetId);
          this.searchResult.innerHTML = `Result:${result.fleet_name}`;
          this.getZone(result.fleet_id, `${from_lat},${from_lng}`, `${to_lat},${to_lng}`);
        } else {
          svcUtils.msgBox({ msg: 'No result' });
          this.searchLoading.classList.add('hide');
        }
      } else {
        this.searchLoading.classList.add('hide');
      }
    });
  }

  async getZone(fleet_id, origin, destination) {
    let svc = await changeSvc(fleet_id, true);
    let {
      serviceArea: { lat, lng, radius },
    } = svc;
    this.searchLoading.classList.add('hide');

    this.removeObjects();
    this.addCircleToMap(lat, lng, radius);
    this.mapCalculateRouteFromAtoB(origin, destination);
  }

  removeObjects() {
    let list = this.map.getObjects();
    list.length && list.map((item) => {
      this.map.removeObject(item)
    });
  }

  validate() {
    if (!dataOfElm(this.fromEle).lat && !this.fromEle.value) {
      return false;
    }
    if (!dataOfElm(this.toEle).lat && !this.toEle.value) {
      return false;
    }
    return true;
  }

  async show() {
    await this.insertHtml();
    this.rootElm.classList.remove('hide');
    this.initElms();
    this.initMap();
  }

  hide() {
    this.destroyMap();
    this.rootElm.classList.add('hide');
  }
}

class Place {
  constructor(place) {
    this.place = place;
    const _this = this;

    _this.addrAutoComp = new MapPlaceAutoComp(_this.place, (prediction) => {
      if (prediction) {
        let url = api[stage].maps + '/places/id?google_place_id=' + prediction.place_id;
        rest.get('place auto comp', url, (data) => {
          boundLat = objNumGetByKeys(data, 'place_detail.result.geometry.location.lat');
          boundLng = objNumGetByKeys(data, 'place_detail.result.geometry.location.lng');
          _this.fillByGooglePlaceDetail(data.place_detail.result);
        });
      }
    });
  }

  fillByGooglePlaceDetail(glePlace) {
    var _this = this;
    var loc = glePlace.geometry.location;
    if (glePlace.formatted_address.startsWith(glePlace.name)) {
      _this.place.value = glePlace.formatted_address;
    } else {
      _this.place.value = glePlace.name + ' ' + glePlace.formatted_address;
    }
    dataOfElm(_this.place).glePlace = glePlace;

    let glePlaceIdRom = glePlace.place_id;

    dataOfElm(_this.place).glePlaceId = glePlaceIdRom;

    if (typeof loc.lat === 'number') {
      dataOfElm(_this.place).lat = loc.lat;
      dataOfElm(_this.place).lng = loc.lng;
    } else {
      dataOfElm(_this.place).lat = loc.lat();
      dataOfElm(_this.place).lng = loc.lng();
    }

    dataOfElm(_this.place).placeInput = _this.place.value;

    elmDataSet(_this.place, 'glePlaceId', glePlace.place_id);

  }
}

// // err warn modal
// var errWarnModal = elmOfId('err-warn-modal');
// var errWarnModalCloseBtn = elmOfId('err-warn-modal-close-btn');
// errWarnModalCloseBtn.onclick = function () {
//   hideErr();
// };

// function showErr(errWarnStatement) {
//   elmOfIdRel('error-statement', errWarnModal).innerHTML = errWarnStatement;
//   errWarnModal.style.display = '';
// }

// function hideErr() {
//   elmOfIdRel('error-statement', errWarnModal).innerHTML = '';
//   errWarnModal.style.display = 'none';
// }

var search = new Search('scv-search');
