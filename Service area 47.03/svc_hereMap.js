/**
 * @format
 * @FilePath: svc_hereMap.js
 * @Author: Joy
 * @Date: 2023-09-25 11:34:21
 * @LastEditors: Joy
 * @LastEditTime: 2023-10-08 17:37:38
 * @Descripttion: here map
 */

class HereMap {
  constructor(center) {
    this.svgCircle = '<svg width="20" height="20" version="1.1" xmlns="http://www.w3.org/2000/svg">' + '<circle cx="10" cy="10" r="5" fill="#ffffff" stroke="#fe7a1f" stroke-width=".5"/>' + '</svg>';
    this.svgCircleN = '<svg width="20" height="20" version="1.1" xmlns="http://www.w3.org/2000/svg">' + '<circle cx="10" cy="10" r="5" fill="#ffffff" stroke="blue" stroke-width=".5"/>' + '</svg>';
    this.center = center ? center : { lat: 0, lng: 0 };
    this.prePoint = null;
    this.nextPoint = null;
    this.count = 0;
    // this.curIndex = 0;
    this.basicCircleColor = 'rgba(21, 115, 255, 0.3)';
    this.circleColor = 'rgba(76, 75, 103, 0.3)';
    this.circleColorBorder = 'rgb(255, 18, 18)';

    // this.polygonColor = 'rgba(76, 75, 103, 0.30)';
    this.polygonColorAreas = 'rgba(254, 122, 31, 0.4)';
    this.polygonColorBorder = 'rgb(254, 122, 31)';

    this.mapList = []; // all mapObject
  }

  initMap(mapElm) {
    // this.map && this.map.dispose();
    //Step 1: initialize communication with the platform
    // In your own code, replace variable window.apikey with your own apikey
    let platform = new H.service.Platform({
      apikey: 'iRsfgnlRJ5BaikxxrbXWcDBKuTrQeb1M-93gY0CU3Fc',
    });

    const defaultLayers = platform.createDefaultLayers();
    //Step 2: initialize a map - this map is centered over Europe
    let map = new H.Map(mapElm, defaultLayers.vector.normal.map, {
      center: this.center,
      zoom: 2,
      pixelRatio: window.devicePixelRatio || 1,
    });
    // add a resize listener to make sure that the map occupies the whole container
    this.bindResize = this.resize.bind(this, map);
    window.addEventListener('resize', this.bindResize);

    //Step 3: make the map interactive
    // MapEvents enables the event system
    // Behavior implements default interactions for pan/zoom (also on mobile touch environments)
    let behavior = new H.mapevents.Behavior(new H.mapevents.MapEvents(map));

    // Create the default UI components
    // let ui = H.ui.UI.createDefault(map, defaultLayers);

    this.map = map;
  }

  resize(map) {
    map.getViewPort().resize();
  }

  setRadius(index = 0, radius = 5000) {
    let current = this.mapList.find((item) => item.idx == index);
    if (!current || !radius) return;
    current.mapObject.setRadius(radius);
    var outlineLinestring = current.mapObject.getGeometry().getExterior();

    outlineLinestring.pushPoint(outlineLinestring.extractPoint(0));
    current.ol.setGeometry(outlineLinestring);
  }

  setCircleCenter(index = 0, center = { lat: 0, lng: 0 }) {
    let current = this.mapObject.find((item) => item.idx == index);
    current.mapObject.setCenter(center);

    // use circle's updated geometry for outline polyline
    var outlineLinestring = current.c.getGeometry().getExterior();

    // extract first point of the outline LineString and push it to the end, so the outline has a closed geometry
    outlineLinestring.pushPoint(outlineLinestring.extractPoint(0));
    current.ol.setGeometry(outlineLinestring);
  }

  circleOutlineStyle = (circleOutline, type = 0) => {
    let currentStyle = circleOutline.getStyle();
    let strokeColor = type ? '#e60012' : 'rgba(255, 0, 0, 0)';
    let newStyle = currentStyle.getCopy({
      strokeColor,
      lineWidth: type ? 2 : 0,
    });

    return newStyle;
  };

  addCircleToMap({ center = this.center, radius = 80000, idx = 0, isClick = true, isBasicCircle = false } = param) {
    let map = this.map;
    let circle = new H.map.Circle(center, radius, {
        style: {
          lineWidth: 0,
          fillColor: isBasicCircle ? this.basicCircleColor : this.circleColor, // Color of the circle
        },
      }),
      circleOutline = new H.map.Polyline(circle.getGeometry().getExterior(), {
        style: { lineWidth: 0 },
      }),
      circleGroup = new H.map.Group({
        volatility: true, // mark the group as volatile for smooth dragging of all it's objects
        objects: [circle, circleOutline],
      });

    circle.zIndex = 10;
    circle.index = idx;
    circleGroup.index = idx;
    circle.isBasicCircle = isBasicCircle;
    let { lat, lng } = circle.getCenter();

    this.mapList.push({
      idx,
      radius: circle.getRadius(),
      center: { lat, lng },
      mapObject: circle,
      ol: circleOutline,
      group: circleGroup,
      type: 'circle',
    });

    // ensure that the objects can receive drag events
    // circle.draggable = true;
    circleOutline.draggable = true;

    // extract first point of the circle outline polyline's LineString and
    // push it to the end, so the outline has a closed geometry
    circleOutline.getGeometry().pushPoint(circleOutline.getGeometry().extractPoint(0));

    // add group with circle and it's outline (polyline)
    map.addObject(circleGroup);

    if (!isClick) {
      return;
    }
    // event listener for circle group to show outline (polyline) if moved in with mouse (or touched on touch devices)
    circle.addEventListener(
      'tap',
      (evt) => {
        evt.stopPropagation();
        // this.curIndex = evt.target.index;

        this.updateStyle(idx);
        // show outline
        document.dispatchEvent(
          new CustomEvent('circleTap', {
            detail: { evt, index: circle.index },
          })
        );
      },
      true
    );

    // add event listeners for circle object
    circle.addEventListener('dragstart', (evt) => {
      var pointer = evt.currentPointer,
        object = evt.target,
        screenPositon = map.geoToScreen(object.getCenter()),
        offset = new H.math.Point(pointer.viewportX - screenPositon.x, pointer.viewportY - screenPositon.y);

      // store difference between starting mouse position and circle's center
      object.setData({
        offset: offset,
      });

      evt.stopPropagation();
    });

    circle.addEventListener('drag', (evt) => {
      // console.log('circle drag==============', evt, circle.index);
      var pointer = evt.currentPointer,
        object = evt.target,
        offset = object.getData()['offset'];

      object.setCenter(map.screenToGeo(pointer.viewportX - offset.x, pointer.viewportY - offset.y));

      // use circle's updated geometry for outline polyline
      var outlineLinestring = circle.getGeometry().getExterior();

      // extract first point of the outline LineString and push it to the end, so the outline has a closed geometry
      outlineLinestring.pushPoint(outlineLinestring.extractPoint(0));
      circleOutline.setGeometry(outlineLinestring);

      evt.stopPropagation();
      document.dispatchEvent(
        new CustomEvent('circleDrag', {
          detail: { evt, index: circle.index },
        })
      );
    });

    // event listener for circle group to resize the geo circle object if dragging over outline polyline
    circleGroup.addEventListener(
      'drag',
      (evt) => {
        // console.log('circleGroup drag==============', evt);
        var pointer = evt.currentPointer,
          distanceFromCenterInMeters = circle.getCenter().distance(map.screenToGeo(pointer.viewportX, pointer.viewportY));

        // if resizing is alloved, set the circle's radius
        if (evt.target instanceof H.map.Polyline) {
          circle.setRadius(distanceFromCenterInMeters);

          // use circle's updated geometry for outline polyline
          var outlineLinestring = circle.getGeometry().getExterior();

          // extract first point of the outline LineString and push it to the end, so the outline has a closed geometry
          outlineLinestring.pushPoint(outlineLinestring.extractPoint(0));
          circleOutline.setGeometry(outlineLinestring);
          // console.log('circleGroup drag==============', distanceFromCenterInMeters, outlineLinestring);

          // prevent event from bubling, so map doesn't receive this event and doesn't pan
          evt.stopPropagation();

          document.dispatchEvent(
            new CustomEvent('circleRadiusChange', {
              detail: { radius: distanceFromCenterInMeters, index: evt.currentTarget.index },
            })
          );
        }
      },
      true
    );
  }

  addBasicCircleToMap(center = this.center, radius = 80000) {
    const circle = new H.map.Circle(center, radius, {
      style: {
        lineWidth: 0,
        fillColor: this.basicCircleColor, // Color of the circle
      },
    });
    circle.zIndex = 1;
    this.map.addObject(circle);
    this.map.getViewModel().setLookAtData({
      bounds: circle.getBoundingBox(),
    });
  }

  addPolygonToMap(latLngs, idx = 0, isClick = true) {
    if (!latLngs) return;
    let lineString = this.latLngAltsHandler(latLngs);
    console.log(latLngs, idx);
    let style = {
      fillColor: this.circleColor,
      lineWidth: 0,
    };

    let polygon = new H.map.Polygon(lineString, { style });
    let verticeGroup = new H.map.Group({
      visibility: idx == 'UrbanArea',
    });

    polygon.draggable = true;
    polygon.zIndex = 20;
    polygon.index = idx;

    let mainGroup = new H.map.Group({
      volatility: true, // mark the group as volatile for smooth dragging of all it's objects
      objects: [polygon, verticeGroup],
    });

    this.createMarkers(polygon, verticeGroup);
    mainGroup.index = idx;
    this.map.addObject(mainGroup);
    this.mapList.push({
      idx,
      mapObject: polygon,
      group: mainGroup,
      verticeGroup,
      type: 'polygon',
    });
    // console.log(this.mapList, this.mapList[0].mapObject.zIndex, polygon.zIndex);

    this.updateStyle(idx, isClick);
    if (!isClick) {
      return;
    }
    // ensure that the polygon can receive drag events
    polygon.draggable = true;

    // event listener for main group to show markers if moved in with mouse (or touched on touch devices)
    mainGroup.addEventListener(
      'tap',
      (evt) => {
        if (idx == 'UrbanArea') {
          let flag = verticeGroup.getVisibility();
          verticeGroup.setVisibility(flag ? false : true);
        } else {
          this.updateStyle(mainGroup.index);
          document.dispatchEvent(
            new CustomEvent('polygonTap', {
              detail: { evt, index: mainGroup.index },
            })
          );
        }
      },
      true
    );

    this.dragVerticeGroup(polygon, verticeGroup);
    this.dragPolygon(polygon, verticeGroup);
  }

  latLngAltsHandler(latLngs) {
    let arr = [];
    for (let item of latLngs) {
      let { lat, lng } = item;
      arr.push(lat, lng, 0);
    }
    return new H.geo.LineString(arr, 'values lat lng alt');
  }

  dragPolygon(polygon, verticeGroup) {
    // add event listeners for polygon object
    polygon.addEventListener('dragstart', (evt) => {
      verticeGroup.setVisibility(false);
      var pointer = evt.currentPointer,
        object = evt.target;

      // store the starting geo position
      object.setData({
        startCoord: this.map.screenToGeo(pointer.viewportX, pointer.viewportY),
      });
      evt.stopPropagation();
    });

    polygon.addEventListener('drag', (evt) => {
      var pointer = evt.currentPointer,
        object = evt.target,
        startCoord = object.getData()['startCoord'],
        newCoord = this.map.screenToGeo(pointer.viewportX, pointer.viewportY),
        outOfMapView = false;

      if (!newCoord.equals(startCoord)) {
        var currentLineString = object.getGeometry().getExterior(),
          newLineString = new H.geo.LineString();

        // create new LineString with updated coordinates
        currentLineString.eachLatLngAlt(function (lat, lng, alt) {
          var diffLat = lat - startCoord.lat,
            diffLng = lng - startCoord.lng,
            newLat = newCoord.lat + diffLat,
            newLng = newCoord.lng + diffLng;

          // prevent dragging to latitude over 90 or -90 degrees to prevent loosing altitude values
          if (newLat >= 90 || newLat <= -90) {
            outOfMapView = true;
            return;
          }

          newLineString.pushLatLngAlt(newLat, newLng, 0);
        });

        if (!outOfMapView) {
          object.setGeometry(new H.geo.Polygon(newLineString));
          object.setData({
            startCoord: newCoord,
          });
        }
      }
      evt.stopPropagation();
    });

    polygon.addEventListener('dragend', (evt) => {
      this.createMarkers(polygon, verticeGroup);
      verticeGroup.setVisibility(true);
      evt.stopPropagation();
    });
  }

  dragVerticeGroup(polygon, verticeGroup) {
    // event listener for vertice markers group to resize the geo polygon object if dragging over markers
    let pLng, pLat, nLng, nLat;

    verticeGroup.addEventListener(
      'drag',
      (evt) => {
        var pointer = evt.currentPointer,
          geoLineString = polygon.getGeometry().getExterior(),
          geoPoint = this.map.screenToGeo(pointer.viewportX, pointer.viewportY);

        // set new position for vertice marker
        evt.target.setGeometry(geoPoint);

        // set new position for polygon's vertice
        let index = evt.target.getData()['verticeIndex'];

        geoLineString.removePoint(index);
        geoLineString.insertPoint(index, geoPoint);

        let geoJSON = geoLineString.toGeoJSON().coordinates;
        let len = geoJSON.length;
        let preIndex, nextIndex;

        let num = index % 2 == 1 ? 1 : 2;

        if (this.count == 0) {
          preIndex = index - num < 0 ? len - 1 : index - num;
          nextIndex = index + num >= len ? 0 : index + num;
          let [p0, p1] = geoJSON[preIndex];
          pLng = p0;
          pLat = p1;
          let [n0, n1] = geoJSON[nextIndex];
          nLng = n0;
          nLat = n1;
        }

        let { lat, lng } = geoPoint;
        this.prePoint = {
          lat: (pLat + lat) / 2,
          lng: (pLng + lng) / 2,
        };
        this.nextPoint = {
          lat: (nLat + lat) / 2,
          lng: (nLng + lng) / 2,
        };

        if (index % 2 == 0) {
          let preIdx = index - 1 < 0 ? len - 1 : index - 1;
          let nextIdx = index + 1 > len ? 0 : index + 1;
          geoLineString.removePoint(preIdx);
          geoLineString.insertPoint(preIdx, this.prePoint);

          geoLineString.removePoint(nextIdx);
          geoLineString.insertPoint(nextIdx, this.nextPoint);
        }
        this.count++;

        polygon.setGeometry(new H.geo.Polygon(geoLineString));
        // stop propagating the drag event, so the map doesn't move
        evt.stopPropagation();
      },
      true
    );

    verticeGroup.addEventListener(
      'dragend',
      (evt) => {
        let index = evt.target.getData()['verticeIndex'];
        if (index % 2 == 1) {
          let geoLineString = polygon.getGeometry().getExterior();
          geoLineString.insertPoint(index, this.prePoint);
          geoLineString.insertPoint(index + 2, this.nextPoint);
        }

        this.createMarkers(polygon, verticeGroup);
        this.count = 0;
        evt.stopPropagation();
      },
      true
    );
  }

  createMarkers(polygon, verticeGroup) {
    console.log(polygon, verticeGroup);
    verticeGroup.removeAll();

    let list = [];
    // create markers for each polygon's vertice which will be used for dragging
    polygon
      .getGeometry()
      .getExterior()
      .eachLatLngAlt((lat, lng, alt, index) => {
        let flag = index % 2 == 0 ? true : false;
        var vertice = new H.map.Marker(
          { lat, lng },
          {
            icon: new H.map.Icon(flag ? this.svgCircle : this.svgCircleN, { anchor: { x: 10, y: 10 } }),
          }
        );
        vertice.draggable = true;
        vertice.setData({ verticeIndex: index });
        verticeGroup.addObject(vertice);

        list.push({ lat, lng });
      });
    let polygonBounds = polygon.getBoundingBox();
    document.dispatchEvent(
      new CustomEvent('changePolygon', {
        detail: { list, index: polygon.index, center: polygonBounds.getCenter() },
      })
    );
  }

  setLookAtData(idx) {
    let mapObject = this.mapList[idx].mapObject;
    this.map.getViewModel().setLookAtData({
      bounds: mapObject.getBoundingBox(),
    });
  }

  removeMapObject(index) {
    if (!this.mapList.length) return;
    let current = this.mapList[index];
    if (!current) {
      this.updateStyle(this.mapList.length - 1);
    } else {
      this.map.removeObject(current.group);
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
      item.mapObject.index = index;
      item.group.index = index;
    });
    return list;
  }

  removeAll() {
    for (let obj of this.mapList) {
      this.map.removeObject(obj.group);
    }
    this.mapList = [];
  }

  // for svc_servicing_airports
  removeObject(index) {
    let list = this.map.getObjects();
    let currentIndex = this.mapList.findIndex((item) => item.idx == index);
    if (currentIndex > -1) {
      this.map.removeObject(this.mapList[currentIndex].group);
      this.mapList.splice(currentIndex, 1);
    }
  }

  updateStyle(index, flag = true) {
    let current = this.mapList[index];

    if (index == 'UrbanArea') {
      current = this.mapList.find((item) => item.idx == index);
    }
    // console.log('updateStyle=========', index, flag, current);
    let { isBasicCircle } = current.mapObject;

    if (isBasicCircle) {
      current.ol.setStyle(this.circleOutlineStyle(current.mapObject, 1));
      current.mapObject.draggable = true;
    } else {
      this.mapList.map((item, i) => {
        if (item.type == 'circle') {
          item.ol.setStyle(this.circleOutlineStyle(item.ol, 0));
          item.mapObject.draggable = false;
        } else {
          item.mapObject.setStyle({
            fillColor: this.circleColor,
            lineWidth: 0,
          });
          item.verticeGroup.setVisibility(false);
        }
      });
      if (!flag) return;
      if (current.type == 'circle') {
        current.ol.setStyle(this.circleOutlineStyle(current.mapObject, 1));
        current.mapObject.draggable = true;
      } else {
        current.mapObject.setStyle({
          fillColor: index == 'UrbanArea' ? this.polygonColorAreas : this.circleColor,
          strokeColor: this.polygonColorBorder,
          lineWidth: 2,
        });
        current.verticeGroup.setVisibility(true);
      }
    }
  }

  moveMapObject(index, lat, lng) {
    let current = this.mapList[index];
    // console.log('moveMapObject====', index, current);
    if (current.type == 'circle') {
      current.mapObject.setCenter({ lat, lng });
      var outlineLinestring = current.mapObject.getGeometry().getExterior();
      outlineLinestring.pushPoint(outlineLinestring.extractPoint(0));
      current.ol.setGeometry(outlineLinestring);
    } else {
      this.updatePolygonPosition(current, lat, lng);
    }
  }

  updatePolygonPosition(current, lat, lng) {
    const newCenter = {
      lat,
      lng,
    };

    const latOffset = newCenter.lat - current.group.getBoundingBox().getCenter().lat;
    const lngOffset = newCenter.lng - current.group.getBoundingBox().getCenter().lng;

    const polygonGeometry = current.mapObject.getGeometry().getExterior();
    const newPolygonStrip = new H.geo.LineString();
    polygonGeometry.eachLatLngAlt((lat, lng, alt, index) => {
      const newLatLng = new H.geo.Point(lat + latOffset, lng + lngOffset, alt);
      newPolygonStrip.pushPoint(newLatLng);
    });
    current.mapObject.setGeometry(new H.geo.Polygon(newPolygonStrip));

    const verticeGroupObjects = current.verticeGroup.getObjects();
    for (let i = 0; i < verticeGroupObjects.length; i++) {
      const object = verticeGroupObjects[i];
      // console.log(object, object.getGeometry(), object instanceof H.map.Marker);
      // console.log(object.getGeometry().getPosition())
      if (object instanceof H.map.Marker) {
        const markerPosition = object.getGeometry();
        const newMarkerPosition = {
          lat: markerPosition.lat + latOffset,
          lng: markerPosition.lng + lngOffset,
        };
        object.setGeometry(newMarkerPosition);
      }
    }

    current.group.removeAll();
    current.group.addObjects([current.mapObject, current.verticeGroup]);
  }

  // for Kevin's test
  updatePolygon(latLngs, index) {
    let current = this.mapList[index];
    if (current.type != 'polygon') return;
    let newLineString = this.latLngAltsHandler(latLngs);
    current.mapObject.setGeometry(new H.geo.Polygon(newLineString));
  }

  dispose() {
    window.removeEventListener('resize', this.bindResize);
    this.removeAll();
    this.map.dispose();
  }
}
