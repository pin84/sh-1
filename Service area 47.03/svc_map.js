/**
 * @format
 * @FilePath: svc_map.js
 * @Author: Joy
 * @Date: 2023-06-17 11:48:28
 * @LastEditors: Joy
 * @LastEditTime: 2023-09-25 17:04:53
 * @Descripttion:google map
 */

class GoogleMap {
  constructor(center) {
    this.center = center ? center : { lat: 0, lng: 0 };
    // this.curIndex = 0;
    this.basicCircleColor = 'rgba(21, 115, 255, 0.7)';
    this.circleColor = 'rgba(76, 75, 103, 0.9)';
    this.circleColorBorder = 'rgb(255, 18, 18)';

    // this.polygonColor = 'rgba(76, 75, 103, 0.30)';
    this.polygonColorAreas = 'rgba(254, 122, 31, 0.7)';
    this.polygonColorBorder = 'rgb(254, 122, 31)';

    this.mapList = [];
  }

  initMap(mapElm) {
    this.map = new google.maps.Map(mapElm, {
      zoom: 2,
      center: this.center,
      mapTypeControl: false,
      fullscreenControl: false,
      zoomControl: false,
      streetViewControl: false,
    });
  }

  addCircleToMap({ center, radius = 80000, idx = 0, isClick = true, isBasicCircle = false } = param) {
    let circle = new google.maps.Circle({
      map: this.map,
      center: center,
      radius,
      editable: false,
      draggable: false,
      fillColor: isBasicCircle ? this.basicCircleColor : this.circleColor,
      strokeWeight: 0,
      zIndex: 5,
    });
    circle.index = idx;
    circle.isBasicCircle = isBasicCircle;

    this.mapList.push({
      idx,
      radius,
      center,
      mapObject: circle,
      type: 'circle',
    });

    this.updateStyle(idx, isClick);

    if (!isClick) {
      return;
    }

    google.maps.event.addListener(circle, 'click', () => {
      console.log('click=====', circle.index);
      circle.setEditable(true);
      // this.curIndex = circle.index;
      this.updateStyle(circle.index);
      document.dispatchEvent(
        new CustomEvent('circleTap', {
          detail: { evt: circle, index: circle.index },
        })
      );
    });

    google.maps.event.addListener(circle, 'center_changed', svcUtils.debounce(this.centerChanged.bind(this, circle), 500));
    google.maps.event.addListener(circle, 'radius_changed', svcUtils.debounce(this.radiusChanged.bind(this, circle), 500));
  }

  addPolygonToMap(data, idx, isClick = true) {
    let polygon = new google.maps.Polygon({
      map: this.map,
      paths: data,
      draggable: true,
      geodesic: false,
      editable: true,
      zIndex: 10,
    });

    polygon.index = idx;
    this.polygon = polygon;

    this.mapList.push({
      idx,
      mapObject: polygon,
      type: 'polygon',
    });

    this.updateStyle(idx, isClick);

    if (!isClick) {
      polygon.setEditable(false);
      polygon.setDraggable(false);

      return;
    }

    google.maps.event.addListener(polygon, 'click', () => {
      console.log('polygon=====', polygon.index);
      if (idx == 'UrbanArea') {
        polygon.setEditable(true);
      } else {
        // this.curIndex = idx;
        this.updateStyle(polygon.index);
        document.dispatchEvent(
          new CustomEvent('polygonTap', {
            detail: { evt: polygon, index: polygon.index },
          })
        );
      }
    });

    const vertices = polygon.getPath();
    google.maps.event.addListener(vertices, 'set_at', svcUtils.debounce(this.getPointArray.bind(this, vertices, polygon), 500));
    google.maps.event.addListener(vertices, 'insert_at', svcUtils.debounce(this.getPointArray.bind(this, vertices, polygon), 500));
  }

  radiusChanged(circle) {
    // console.log('---circleRadiusChange----');
    document.dispatchEvent(
      new CustomEvent('circleRadiusChange', {
        detail: { radius: circle.getRadius(), index: circle.index },
      })
    );
  }

  centerChanged(circle) {
    // console.log('---centerChanged----', this, circle);
    document.dispatchEvent(
      new CustomEvent('circleDrag', {
        detail: { evt: circle, index: circle.index },
      })
    );
  }

  removeMapObject(index) {
    if (!this.mapList.length) return;
    let current = this.mapList[index];
    if (!current) {
      this.updateStyle(this.mapList.length - 1);
    } else {
      current.mapObject.setMap(null);
      google.maps.event.clearInstanceListeners(current.mapObject);
      this.mapList.splice(index, 1);

      if (!this.mapList.length) return;
      this.mapList = this.sortMapList(this.mapList);
      // console.log(index, circle);
      if (index == 0) {
        this.updateStyle(index, true, true);
      } else {
        this.updateStyle(index - 1, true, true);
      }
    }
  }

  sortMapList(list) {
    list.map((item, index) => {
      item.idx = index;
    });
    return list;
  }

  addBasicCircleToMap(center, radius = 80000) {
    let circle = new google.maps.Circle({
      map: this.map,
      center,
      radius,
      editable: false,
      draggable: false,
      strokeWeight: 0,
      fillColor: this.basicCircleColor,
      zIndex: 1,
    });
    this.map.fitBounds(circle.getBounds());
  }

  setLookAtData(idx) {
    let mapObject = this.mapList[idx].mapObject;
    this.map.fitBounds(mapObject.getBounds());
  }

  setCircleCenter(index = 0, center = { lat: 0, lng: 0 }) {
    let { lat, lng } = center;
    this.moveMapObject(index, lat, lng);
  }

  removeAll() {
    for (let item of this.mapList) {
      item.mapObject.setMap(null);
    }

    this.mapList = [];
  }

  // for svc_servicing_airports
  removeObject(index) {
    let currentIndex = this.mapList.findIndex((item) => item.idx == index);
    if (currentIndex > -1) {
      this.mapList[currentIndex].mapObject.setMap(null);
      this.mapList.splice(currentIndex, 1);
    }
  }

  getPointArray(vertices, polygon) {
    // console.log(vertices, polygon);
    let pointArr = [];
    for (let i = 0; i < vertices.getLength(); i++) {
      const xy = vertices.getAt(i);
      pointArr.push({ lat: xy.lat(), lng: xy.lng() });
    }
    document.dispatchEvent(
      new CustomEvent('changePolygon', {
        detail: { list: pointArr, index: polygon.index, center: this.getPolygonCenter(polygon) },
      })
    );
  }

  getPolygonCenter(polygon) {
    var bounds = new google.maps.LatLngBounds();
    polygon.getPath().forEach((path) => {
      bounds.extend(path);
    });
    var center = bounds.getCenter();
    return {
      lat: center.lat(),
      lng: center.lng(),
    };
  }

  setRadius(index = 0, radius = 5000) {
    let current = this.mapList.find((item) => item.idx == index);
    current.mapObject.setRadius(radius);
  }

  updateStyle(index, flag = true, isDelete) {
    let current = this.mapList[index];

    if (index == 'UrbanArea') {
      current = this.mapList.find((item) => item.idx == index);
    }

    let { isBasicCircle } = current.mapObject;

    if (isBasicCircle) {
      current.mapObject.setOptions({ fillColor: this.basicCircleColor });
      current.mapObject.setOptions({ draggable: true });
    } else {
      this.mapList.map((item, i) => {
        if (!item.mapObject.isBasicCircle) {
          isDelete && item.mapObject.setOptions({ index: i });
          if (item.type == 'circle') {
            item.mapObject.setOptions({ fillColor: this.circleColor });
            item.mapObject.setOptions({ strokeWeight: 0 });
            item.mapObject.setOptions({ editable: false });
            item.mapObject.setOptions({ draggable: false });
          } else {
            item.mapObject.setOptions({ fillColor: this.circleColor });
            item.mapObject.setOptions({ strokeWeight: 0 });
            item.mapObject.setEditable(false);
          }
        }
      });
      if (!flag) return;
      if (current.type == 'circle') {
        current.mapObject.setOptions({ strokeColor: '#e60012' });
        current.mapObject.setOptions({ strokeWeight: 1 });
        current.mapObject.setOptions({ editable: true });
        current.mapObject.setOptions({ draggable: true });
      } else {
        current.mapObject.setOptions({ strokeColor: this.polygonColorBorder });
        current.mapObject.setOptions({ fillColor: index == 'UrbanArea' ? this.polygonColorAreas : this.circleColor });
        current.mapObject.setOptions({ strokeWeight: 1 });
        current.mapObject.setEditable(true);
      }
    }
  }

  moveMapObject(index, lat, lng) {
    let current = this.mapList[index];
    current.mapObject.setCenter({ lat, lng });
  }

  // for Kevin's test
  updatePolygon(latLngs, index) {
    console.log(latLngs, index)
    let current = this.mapList[index];
    if (current.type != 'polygon') return;
    current.mapObject.setPaths(latLngs);
  }

  dispose() {
    this.removeAll();
    google.maps.event.clearInstanceListeners(this.map);
    google.maps.event.clearInstanceListeners(window);
    this.map = null;
  }
}
