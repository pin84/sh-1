/**
 * this file will remove soon
 */

class MapBox extends Container {
    constructor(id) {
        super(id);
    }
    initElms() {
        let it = this;
        it.mapElm = elmOfIdRel('map', it.rootElm);
        it.zonesMapFlag = null
    }
    setWorldMap() {
        let it = this
        if (!it.mapElm) {
            it.mapElm = elmOfIdRel('map', it.rootElm);
        }
        if (!dataOfElm(it.rootElm).map) {
            dataOfElm(it.rootElm).map = new google.maps.Map(
                it.mapElm, {
                zoom: 2, center: { lat: 0, lng: 0 }, mapTypeControl: false, fullscreenControl: false, zoomControl: false,
                streetViewControl: false
            });
        } else {
            dataOfElm(it.rootElm).map.setCenter({ lat: 0, lng: 0 });
            // Set the zoom level of the map to 2 to display the world map
            dataOfElm(it.rootElm).map.setZoom(2);
        }
        this.show();
        it.mapElm.style.display = '';
    }
    async paintCircle(lat, lng, radius) {
        // 1.Creating a new service area: change circle's center
        if (!lat || !lng || !radius) {
            this.setWorldMap()
            return;
        }
        let it = this;
        it.paintMap(lat, lng);

        // to do ...
        // If the Downtown Area has already been set, draw irregular polygons
        if (serviceArea.downtown_areas?.area_geometry?.length) {
            it.setUrbanAreas(lat, lng, serviceArea.downtown_areas.area_geometry)
        }

        it.setFixedPriceArea()

        // 0.Showing an existed service area:update circle's center or radius,compare lat and lng,radius   
        if (dataOfElm(it.rootElm).circle) {
            var oldLat = dataOfElm(it.rootElm).circle.getCenter().lat();
            var oldLng = dataOfElm(it.rootElm).circle.getCenter().lng();
            dataOfElm(it.rootElm).circle.setRadius(radius)
            if (Math.abs(lat - oldLat) >= 0.00001 || Math.abs(lng - oldLng) >= 0.00001) {
                dataOfElm(it.rootElm).circle.setCenter({ lat: lat, lng: lng });
            }
        } else {
            var center = { lat: parseFloat(lat), lng: parseFloat(lng) };
            dataOfElm(it.rootElm).circle = new google.maps.Circle({
                map: dataOfElm(it.rootElm).map,
                center: center,
                radius: radius,
                editable: true,
                draggable: false,
                // strokeWeight: 0,
                // fillColor: '#333',
                // fillOpacity: 0.4,
                strokeWeight: 0,
                fillColor: '#1573FF',
                fillOpacity: 0.3,
            });
        }
        it.linkCircleRadiusField(dataOfElm(it.rootElm).circle, (await servicingAirports()).radius.inputElm);
    }

    setFixedPriceArea() {

        let it = this
        let { zones } = serviceArea
        if (zones) {
            zones.forEach((item, index) => {
                if (dataOfElm(it.rootElm)[`zones_${index}`]) return
                let center = { lat: parseFloat(item.lat), lng: parseFloat(item.lng) };
                dataOfElm(it.rootElm)[`zones_${index}`] = new google.maps.Circle({
                    map: dataOfElm(it.rootElm).map,
                    center: center,
                    radius: item.radius,
                    editable: false,
                    draggable: false,
                    // strokeWeight: 0,
                    // fillColor: '#333',
                    // fillOpacity: 0.4,
                    strokeWeight: 0,
                    fillColor: '#4C4B67',
                    fillOpacity: 0.3,
                });
                it.zonesMapFlag = true
            });
        }
    }
    linkCircleRadiusField(circle, field) {

        field.onblur = function () {
            var valInt = parseInt(field.value);
            if (valInt)
                circle.setRadius(valInt * distUnitData[dU].measurement);
        }

        google.maps.event.addListener(circle, 'radius_changed', function () {
            field.value = Math.round(circle.getRadius() * 1.0 / distUnitData[dU].measurement, 0);
        });
    }
    setUrbanAreas(lat, lng, arrData = null) {

        let it = this
        // let testBox = it.rootElm.querySelector('.test-weizhi-box')
        // console.log('testBox', testBox);
        // testBox.addEventListener('click', function () {
        //     dataOfElm(it.rootElm).map.controls[google.maps.ControlPosition.TOP_RIGHT].getAt(0).element.click();
        // })
        let arr = []
        let xStart = lat
        let yStart = lng
        let r = 1
        let len = 6
        for (let i = 0; i < len; i++) {
            let h = 2 * Math.PI / 360 * (360 / len) * i
            let lat = xStart + Math.sin(h) * r
            let lng = yStart - Math.cos(h) * r

            arr.push({ lat, lng })
        }
        if (dataOfElm(it.rootElm).polygon) {
            dataOfElm(it.rootElm).polygon.setMap(null);
        }
        if (serviceArea?.downtown_areas) {
            serviceArea.downtown_areas.area_geometry = arrData || arr;
        } else {
            serviceArea.downtown_areas = {
                area_geometry: arrData || arr
            }
        }
        console.log('setUrbanAreas=====', arr);
        dataOfElm(it.rootElm).polygon = new google.maps.Polygon({
            map: dataOfElm(this.rootElm).map,
            paths: arrData || arr,
            strokeColor: "#FE7A1F",
            strokeOpacity: 0.8,
            strokeWeight: 1,
            fillColor: "#FE7A1F",
            fillOpacity: 0.35,
            draggable: true,
            geodesic: false,
            editable: true,
            zIndex: 1
        });
        const vertices = dataOfElm(it.rootElm).polygon.getPath();
        google.maps.event.addListener(vertices, 'set_at', this.getPointArray);
        google.maps.event.addListener(vertices, 'insert_at', this.getPointArray);
        google.maps.event.addListener(dataOfElm(it.rootElm).polygon, 'click', function (e) {
            if (google.maps.geometry.poly.containsLocation(e.latLng, dataOfElm(it.rootElm).polygon) && dataOfElm(it.rootElm).polygon) {
                dataOfElm(it.rootElm).polygon.setEditable(!dataOfElm(it.rootElm).polygon.getEditable());
                dataOfElm(it.rootElm).circle.setEditable(false)
            }
        });
        if (dataOfElm(it.rootElm).circle) {
            dataOfElm(it.rootElm).circle.setEditable(false)
            google.maps.event.addListener(dataOfElm(it.rootElm).circle, 'click', function (e) {
                if (dataOfElm(it.rootElm).polygon) dataOfElm(it.rootElm).polygon.setEditable(false);
                dataOfElm(it.rootElm).circle.setEditable(true)
            });
        }
    }
    getPointArray(event) {
        let pointArr = []
        for (let i = 0; i < this.getLength(); i++) {
            const xy = this.getAt(i);
            pointArr.push({ lat: xy.lat(), lng: xy.lng() })
        }
        // console.log(pointArr);
        if (serviceArea?.downtown_areas) {
            serviceArea.downtown_areas.area_geometry = pointArr
        } else {
            serviceArea.downtown_areas = {
                area_geometry: pointArr
            }
        }
    }
    paintMap(lat, lng) {

        let it = this;
        if (!it.mapElm) {
            it.mapElm = elmOfIdRel('map', it.rootElm);
        }
        if (!dataOfElm(it.rootElm).map) {
            dataOfElm(it.rootElm).map = new google.maps.Map(
                it.mapElm, {
                zoom: 7, center: { lat: parseFloat(lat), lng: parseFloat(lng) }, mapTypeControl: false, fullscreenControl: false, zoomControl: false,
                streetViewControl: false
            });
        } else {
            dataOfElm(it.rootElm).map.setZoom(7);
            // compare the map center and recenter
            var oldLat = dataOfElm(it.rootElm).map.getCenter().lat();
            var oldLng = dataOfElm(it.rootElm).map.getCenter().lng();
            if (Math.abs(lat - oldLat) >= 0.00001 || Math.abs(lng - oldLng) >= 0.00001) {
                dataOfElm(it.rootElm).map.setCenter({ lat: parseFloat(lat), lng: parseFloat(lng) });
            }
        }
        this.show();
        it.mapElm.style.display = '';
    }
    fill(serviceAreaData) {
        // init basic map

        var it = this;
        it.reset();
        var uluru = { lat: objNumGetByKeys(serviceAreaData, 'serviceArea.lat'), lng: objNumGetByKeys(serviceAreaData, 'serviceArea.lng') };
        it.paintCircle(objNumGetByKeys(serviceAreaData, 'serviceArea.lat'), objNumGetByKeys(serviceAreaData, 'serviceArea.lng'), objNumGetByKeys(serviceAreaData, 'serviceArea.radius'));
    }
    reset() {

        let it = this;

        if (dataOfElm(it.rootElm).circle) {
            dataOfElm(it.rootElm).circle.setMap(null);
            dataOfElm(it.rootElm).circle = null
        }
        if (dataOfElm(it.rootElm).polygon) {
            dataOfElm(it.rootElm).polygon.setMap(null);
            dataOfElm(it.rootElm).polygon = null
        }
        // let { zones } = serviceArea
        // if (zones) {
        //     zones.forEach((item, index) => {
        //         if (dataOfElm(it.rootElm)[`zones_${index}`]) {
        //             dataOfElm(it.rootElm)[`zones_${index}`].setMap(null);
        //             dataOfElm(it.rootElm)[`zones_${index}`] = null
        //         }
        //     })
        // } else {
        //     console.log('^^^^^^^^^^^^^^^^^', dataOfElm(it.rootElm));
        // }
        for (var key in dataOfElm(it.rootElm)) {
            if (key.startsWith('zones')) {
                if (dataOfElm(it.rootElm)[key]) {
                    dataOfElm(it.rootElm)[key].setMap(null);
                    dataOfElm(it.rootElm)[key] = null
                }
            }
        }
        it.zonesMapFlag = null
        // dataOfElmClear(it.rootElm);
        // elmOfIdRel('map', it.rootElm).style.display = 'none';
        it.setWorldMap()
    }
    show() {
        let it = this;
        it.init();
        $('#' + it.rootId).collapse('show');
    }
    hide() {
        $('#' + this.rootId).collapse('hide');
    }
}