/** @format */

let _allCountryList = null;

function timeStrAddHalfHour(originTimeStr) {
  let first2Chars = originTimeStr.substring(0, 2);
  let last2Chars = originTimeStr.slice(-2);
  if (last2Chars == '00') {
    last2Chars = '30';
  } else {
    first2Chars = Number(first2Chars) + 1;
    if (first2Chars.toString().length == 1) {
      first2Chars = '0' + first2Chars;
    }
    last2Chars = '00';
  }
  return first2Chars + ':' + last2Chars;
}

function isReadOnly() {
  return serviceArea.isReadOnly ? true : false;
  // return Math.random() < 0.5;
}

class PlaceAndTime3 {
  constructor(place, addr, date, hour, minute, /*time, */ timezone, daylight) {
    this.place = place;
    this.addr = addr;
    this.date = date;
    // this.time = time;
    this.hour = hour;
    // if (this.hour) {
    //     this.beforeNoonTimePeriodMark = elmOfIdRel('beforenoon-time-period-mark', this.hour.parentElement.parentElement);
    //     this.afterNoonTimePeriodMark = elmOfIdRel('afternoon-time-period-mark', this.hour.parentElement.parentElement);
    // }

    this.minute = minute;
    this.timezone = timezone;
    this.daylight = daylight;
    this.dateTimeBox = elmOfIdClosest('date-time-box', this.date);
    this.dateEmptyWarnIcon = elmOfIdClosest('date-empty-warn-icon', this.date);
    this.hourMinEmptyWarnIcon = elmOfIdClosest('hour-min-empty-warn-icon', this.date);

    var it = this;

    if (it.date) {
      // it.date.addEventListener('focus', function() {
      //     it.dateTimeBox.classList.remove('fld-box-empty-warn');
      //     it.dateEmptyWarnIcon.style.display = 'none';
      // })
      it.calendar = new Calendar(this.date, (year, month, date) => {
        it.timeUpdate();
      });
    }

    if (it.hour) {
      it.hourAC = new TextAutoComp(it.hour, {
        str: (item, selected) => {
          let s = item.toString().padStart(2, 0);
          return [s];
        },
        sel: (hour) => {
          if (it.minute.value.length == 0) {
            it.minute.value = '00';
          }
          it.timeUpdate();
          if (window.screen.width < 768) {
            var message = { enableScroll: '...' };
            window.parent.postMessage(message, '*');
          }

          if (hour != undefined && it.beforeNoonTimePeriodMark && it.afterNoonTimePeriodMark) {
            if (Number(hour) < 12) {
              it.beforeNoonTimePeriodMark.style.display = '';
              it.afterNoonTimePeriodMark.style.display = 'none';
            } else {
              it.afterNoonTimePeriodMark.style.display = '';
              it.beforeNoonTimePeriodMark.style.display = 'none';
            }
          }

          // if (it.date.value && it.minute.value) {
          //     it.dateTimeBox.classList.remove('fld-box-empty-warn');
          //     it.hourMinEmptyWarnIcon.style.display = 'none';
          // }
        },
      });
      {
        let hours = [];
        for (let hour = 0; hour < 24; hour++) {
          hours.push(hour);
        }
        it.hourAC.setItems(hours);
        it.hourAC.itemCnt = 7;
        it.hourAC.filter = false;
        it.hourAC.moreUp = true;
        it.hourAC.moreDown = true;
        if (window.screen.width < 768) {
          it.hour.addEventListener('focus', function () {
            frontBodyIndexElm.scrollIntoView();
            var message = { disableScroll: '...' };
            window.parent.postMessage(message, '*');
          });
        }
      }
    }

    if (it.minute) {
      it.minuteAC = new TextAutoComp(it.minute, {
        str: (item, selected) => {
          let s = item.toString().padStart(2, 0);
          return [s];
        },
        sel: (minute) => {
          it.timeUpdate();
          if (window.screen.width < 768) {
            var message = { enableScroll: '...' };
            window.parent.postMessage(message, '*');
          }
          // if (it.hour.value && it.date.value) {
          //     it.dateTimeBox.classList.remove('fld-box-empty-warn');
          //     it.hourMinEmptyWarnIcon.style.display = 'none';
          // }
        },
      });
      {
        let minutes = [];
        for (let minute = 0; minute < 60; minute += 5) {
          minutes.push(minute);
        }
        it.minuteAC.setItems(minutes);
        it.minuteAC.itemCnt = 7;
        it.minuteAC.filter = false;
        it.minuteAC.moreUp = true;
        it.minuteAC.moreDown = true;
        if (window.screen.width < 768) {
          it.minute.addEventListener('focus', function () {
            frontBodyIndexElm.scrollIntoView();
            var message = { disableScroll: '...' };
            window.parent.postMessage(message, '*');
          });
        }
      }
    }
    it.addrAutoComp = new WcMapPlaceAutoComp(it.place, (prediction) => {
      if (prediction) {
        let url = api[stage].maps + '/places/id?google_place_id=' + prediction.place_id;
        rest.get('place auto comp', url, (data) => {
          boundLat = objNumGetByKeys(data, 'place_detail.result.geometry.location.lat');
          boundLng = objNumGetByKeys(data, 'place_detail.result.geometry.location.lng');
          it.fillByGooglePlaceDetail(data.place_detail.result);
        });
      }
    });

    //  young note,comment it,maybe it is needed
    // it.place.onblur = function() {
    //
    //     if (dataOfElm(it.place).placeInput == it.place.value) {
    //         return;
    //     }
    //     dataOfElm(it.place).isInvalid = true;
    //     window.setTimeout(() => {
    //             if (dataOfElm(it.place).isInvalid) {
    //
    //                 // dataOfElmClear(it.place);
    //                 elmDataSet(it.place, 'glePlaceId', '');
    //             }
    //         },
    //         1000
    //     );
    // }

    elmDataSetPostAdd(it.place, 'glePlaceId', () => {
      it.timeUpdate();
    });

    elmsOnChangePostAdd([it.date /*, it.time*/], () => {
      it.timeUpdate();
    });
  }

  fillByGooglePlaceDetail(glePlace) {
    var it = this;
    var loc = glePlace.geometry.location;

    if (glePlace.formatted_address.startsWith(glePlace.name)) {
      it.place.value = glePlace.formatted_address;
    } else {
      it.place.value = glePlace.name + ' ' + glePlace.formatted_address;
    }

    dataOfElm(it.place).placeId = undefined;
    dataOfElm(it.place).glePlace = glePlace;

    let glePlaceIdRom = glePlace.place_id;

    dataOfElm(it.place).glePlaceId = glePlaceIdRom;

    if (typeof loc.lat === 'number') {
      dataOfElm(it.place).lat = loc.lat;
      dataOfElm(it.place).lng = loc.lng;
    } else {
      dataOfElm(it.place).lat = loc.lat();
      dataOfElm(it.place).lng = loc.lng();
    }

    dataOfElm(it.place).placeInput = it.place.value;

    if (it.addr) {
      it.addr.value = glePlace.formatted_address;
    }

    elmDataSet(it.place, 'glePlaceId', glePlace.place_id);
  }
  fillByGooglePlaceId(googlePlaceId) {
    var it = this;
    let url = api[stage].maps + '/places/id?google_place_id=' + googlePlaceId;

    rest.get(
      'get place detail by gle id',
      url,
      (data) => {
        it.fillByGooglePlaceDetail(data.place_detail.result);
      },
      (error) => { }
    );
  }
  reset() {
    var it = this;
    this.place.value = '';
    dataOfElm(this.place);
    this.addr.value = '';

    if (this.hourAC) {
      this.hourAC.set();
    }
    if (this.minuteAC) {
      this.minuteAC.set();
    }

    if (this.hour) {
      dataOfElmClear(this.hour);
    }
    if (this.timezone) {
      this.timezone.value = '';
      dataOfElmClear(this.timezone);
    }
    if (this.daylight) {
      this.daylight.checked = false;
    }
  }

  timeUpdate() {
    var it = this;
    if (it.date /*&& displayedInForm(it.date) */ && it.date.value && dataOfElm(it.place).lat && dataOfElm(it.place).lng) {
      {
        if (it.date.value.trim().length == 10) {
          let dateTimeValue = it.date.value.trim() + ' ';

          if (it.hour.value && it.minute.value) {
            dateTimeValue += it.hour.value + ':' + it.minute.value;
          } else {
            return;
          }

          let url = api[stage].maps + '/timezones/location/date-time?loc=' + dataOfElm(it.place).lat + ',' + dataOfElm(it.place).lng + '&dt=' + dateTimeValue;

          rest.get(
            'get time zone data',
            url,
            (data) => {
              dataOfElm(it.timezone).tz = data.timezone;
              it.timezone.value = data.timezone.timeZoneName;
              it.daylight.checked = data.timezone.dstOffset > 0;
              dataOfElm(it.hour).ts = data.utc; //must be the big one
              let timeDiff = Number(data.utc) - Math.floor(new Date().getTime() / 1000);
            },
            (error) => { }
          );
        }
      }
    }
  }

  getData() {
    var it = this;

    var data = {
      place_id: dataOfElm(it.place).placeId,
    };

    if (displayedInForm(it.time)) {
      data.utc = dataOfElm(it.time).ts;
      data.time_str = /*it.time.value*/ it.hour.value + ':' + it.minute.value;
      data.timezone_str = it.timezone.value;
      data.daylight = it.daylight.checked;
    }

    return data;
  }

  getDataPlaceAndTime() {
    var it = this;

    if (dataOfElm(it.place).glePlace == undefined) {
      return false;
    }

    var data = {
      name: it.place.value,
      google_place_id: dataOfElm(it.place).glePlaceId,
      lat: dataOfElm(it.place).lat,
      lng: dataOfElm(it.place).lng,
      address: {
        formatted_address: it.addr.value,
        address_components: dataOfElm(it.place).glePlace.address_components,
      },
    };

    let time_str = '';
    if (displayedInForm(it.date) && it.date.value) {
      time_str = it.date.value;
    }

    if (it.hour && displayedInForm(it.hour)) {
      if (time_str) {
        time_str += ' ' + it.hour.value + ':' + it.minute.value;
      }
    }
    if (time_str) {
      data.time_str = time_str;
      data.utc = dataOfElm(it.hour).ts;
    }

    let timezone_str = '';
    if (it.date && it.timezone.value) {
      // as long as date is displayed, even though timezone may or may not
      timezone_str = it.timezone.value;
    }
    if (timezone_str) {
      data.timezone_str = timezone_str;
    }

    let daylight = undefined;
    if (it.date) {
      daylight = it.daylight.checked;
    }
    if (daylight != undefined) {
      data.daylight = daylight;
    }

    return data;
  }
}

function scrollToTop(node) {
  node.scrollTop = 0;
}

function scrollToBottom(node) {
  node.scrollTop = node.scrollHeight;
}

function suppleTimeStr(timePartStr) {
  timePartStr += '';
  if (timePartStr.length == 1) {
    timePartStr = '0' + timePartStr;
  }
  return timePartStr;
}

function showLocalDateTime(rawOffset, dstOffset, elm) {
  showLocalDateTimeLoop(rawOffset, dstOffset, elm);
  clearInterval(dataOfElm(elm).localTimeLoop);
  dataOfElm(elm).localTimeLoop = setInterval(() => {
    showLocalDateTimeLoop(rawOffset, dstOffset, elm);
    clearInterval(dataOfElm(elm).localTimeLoop);
    dataOfElm(elm).localTimeLoop = setInterval(() => {
      showLocalDateTimeLoop(rawOffset, dstOffset, elm);
    }, 60000);
  }, 1000);
}

function showLocalDateTimeLoop(rawOffset, dstOffset, elm) {
  var d2 = new Date();
  var utcMilli = d2.getTime();
  var utcMilliAdj = utcMilli + (rawOffset + dstOffset) * 1000;
  var d3 = new Date();
  d3.setTime(utcMilliAdj);

  elmOfIdRel('year', elm).innerHTML = d3.getUTCFullYear();
  elmOfIdRel('month', elm).innerHTML = d3.getUTCMonth() + 1;
  elmOfIdRel('day', elm).innerHTML = d3.getUTCDate();
  elmOfIdRel('hour', elm).innerHTML = d3.getUTCHours();
  elmOfIdRel('minute', elm).innerHTML = d3.getUTCMinutes();
  getElmsRelativeByName('time-item', elm).forEach((timeItemElm) => {
    if (timeItemElm.innerHTML.length == 1) {
      timeItemElm.innerHTML = '0' + timeItemElm.innerHTML;
    }
  });
}

var modalBgc = elmOfId('modal-bgc');
var modalShadow = elmOfId('modal-shadow');
var svcAeaEditContaienr = elmOfId('svc-aea-edit-container');
var svcAeaEditContaienrShowBtn = elmOfId('svc-aea-edit-container-show-btn');

// err warn modal
var errWarnModal = elmOfId('err-warn-modal');
var errWarnModalCloseBtn = elmOfId('err-warn-modal-close-btn');
errWarnModalCloseBtn.onclick = function () {
  hideErr();
};

function showErr(errWarnStatement) {
  elmOfIdRel('error-statement', errWarnModal).innerHTML = errWarnStatement;
  errWarnModal.style.display = '';
  modalBgc.style.display = '';
}

function hideErr() {
  elmOfIdRel('error-statement', errWarnModal).innerHTML = '';
  errWarnModal.style.display = 'none';
  modalBgc.style.display = 'none';
}

modalBgc.onclick = async function () {
  getElmsRelativeByName('price-adjuster', document.body).forEach((elm) => {
    elm.style.display = 'none';
  });
  if (!elmOfId('service-area-json').style.display == '') {
    this.style.display = 'none';
  }
  hideErr();
  (await calculator()).saveVerifyModal.style.display = 'none';
};

function tabRequiredFldEmptyCheck(tabElm) {
  let isFldEmpty = false;
  getElmsRelativeByClass('required-fld', tabElm).forEach((requiredFld) => {
    if (requiredFld.style.display == '' && requiredFld.value.trim() == '') {
      requiredFld.parentElement.parentElement.classList.add('fld-box-empty-warn');
      isFldEmpty = true;
      showErr('Please enter required infomation');
    }
  });
  return isFldEmpty;
}

function requiredFldWarnAutoClear(elm) {
  elm.addEventListener('input', function () {
    elm.parentElement.parentElement.classList.remove('fld-box-empty-warn');
  });
}

function requiredFldWarnClear(elm) {
  elm.parentElement.parentElement.classList.remove('fld-box-empty-warn');
}

// calendar paging arrow posi suit
// var calendarPrev = elmOfIdRel('prev', elmOfId('date-calendar-'));
// var calendarNext = elmOfIdRel('next', elmOfId('date-calendar-'));

// if (calendarPrev) {
//     if (window.screen.width < 540) {
//         calendarPrev.style.marginLeft = document.documentElement.clientWidth * 0.192 + 'px';
//         calendarNext.style.marginLeft = document.documentElement.clientWidth * 0.6033 + 'px';
//     } else {
//         calendarPrev.style.marginLeft = 131 + 'px';
//         calendarNext.style.marginLeft = 285 + 'px';
//     }
// }

var ses = '';

// elmOfId('sign-in-email').addEventListener('blur', function () {
//     var isemployee = '@elifetransfer.com';

//     if (this.value.indexOf(isemployee) !== -1) {
//         signIn.setApi('loginsEmployee', 'loginSesesEmployee');
//     } else {
//         signIn.setApi('loginsFleetEmp', 'loginSesesFleetEmp');
//     }
//     this.value = this.value.trim();
// })
// signIn.show();
// signIn.setFun((Ses) => {
//     ses = Ses;
//     // svcAeaSidebarTab.show();
// });
// signIn.setFunErr((errMsg) => {
//     showErr(errMsg);
// })

// download text file function
// function downloadTextFile(name, data) {
// 	var urlObject = window.URL || window.webkitURL || window;
// 	var export_blob = new Blob([data]);
// 	var save_link = document.createElementNS("http://www.w3.org/1999/xhtml", "a")
// 	save_link.href = urlObject.createObjectURL(export_blob);
// 	save_link.download = name;
// 	var ev = document.createEvent("MouseEvents");
// 	ev.initMouseEvent("click", true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
// 	save_link.dispatchEvent(ev);
// }

// service area json stuff
var svcAeaJsonElm = elmOfId('service-area-json');
var svcAeaJsonCntElm = elmOfIdRel('service-area-json-cnt', svcAeaJsonElm);

var svcAeaJsonVerifyNumBox = elmOfIdRel('service-area-json-verify-num-box', svcAeaJsonElm);
var svcAeaJsonVerifyNumSign = elmOfIdRel('verify-num-sign', svcAeaJsonVerifyNumBox);
var svcAeaJsonVerifyNumFld = elmOfIdRel('verify-num-fld', svcAeaJsonVerifyNumBox);

var svcAeaJsonChangeBtn = elmOfIdRel('change-service-area', svcAeaJsonVerifyNumBox);
var svcAeaModalCloseBtn = elmOfIdRel('modal-close', svcAeaJsonElm);

elmOfId('elife-logo').onclick = function () {
  svcAeaJsonCntElm.value = JSON.stringify(serviceArea);

  var text = svcAeaJsonCntElm.value; //get json format cnt
  var result = JSON.stringify(JSON.parse(text), null, 2); // transf to json object

  svcAeaJsonCntElm.value = result;

  svcAeaJsonElm.style.display = '';

  svcAeaJsonVerifyNumSign.innerHTML = Math.floor(10000000 + Math.random() * 90000000);
  svcAeaJsonVerifyNumFld.value = '';

  modalBgc.style.display = '';
};

svcAeaJsonChangeBtn.onclick = function () {
  if (parseInt(svcAeaJsonVerifyNumFld.value) == parseInt(svcAeaJsonVerifyNumSign.innerHTML)) {
    // update service area json based on the current ui content
    serviceArea = JSON.parse(svcAeaJsonCntElm.value.replaceAll('<br>', ''));

    svcAeaJsonElm.style.display = 'none';
    modalBgc.style.display = 'none';
  }
};

svcAeaModalCloseBtn.onclick = function () {
  svcAeaJsonElm.style.display = 'none';
  modalBgc.style.display = 'none';
};

// to judge current service area is already existed or a new one
// var isExistedServiceArea;

// basic distUnit setting
var distUnitData = [
  {
    abbr: 'M',
    name: 'Mile',
    names: 'Miles',
    measurement: 1609.34,
  },
  {
    abbr: 'km',
    name: 'Kilometer',
    names: 'Kilometers',
    measurement: 1000,
  },
];
var dU = 1;

// basic cur setting
var cur = 'USD';
var curFraction = 2;

var serviceArea = {};
var countryAirports = {};

var afterSignInElm = elmOfId('after-sign-in');
var sidebarTabClasses = [];

//svc aea titles switch stuff
var svcAeaTabTitlesBar = elmOfId('svc-aea-tab-titles-bar');
let svcAeaTabBox = elmOfId('sidebar-tab-titles-bar-box');

// im, 0, 1, imperial or metric
var im = 0;
var imperialMetric = [1609.34, 1000.0];

function imByCountry(code) {
  if (code == 'USA' || code == 'GBR') {
    return 0;
  } else {
    return 1;
  }
}

function mtr2mkm(meter, im) {
  return Math.round((meter * 1.0) / imperialMetric[im]);
}

function mkm2mtr(mkm, im) {
  return Math.round(mkm * 1.0 * imperialMetric[im]);
}

async function airportCache(code) {
  let airport = _d.airports[code];
  if (!airport) {
    let url = api[stage].airports;
    let res = await svcUtils.fetchData({ url, data: { code } });
    airport = res.airports[0];
    _d.airports[code] = airport;
  }
  return airport;
}

async function airportListCache(countryCode) {
  let list = _d.countryAirport[countryCode];
  if (!list) {
    let url = api[stage].sqlTemplatesRun;
    let { code, res } = await svcUtils.post(url, { sql: 134676482 }, '', { country: countryCode });
    list = res.results;
    _d.countryAirport[countryCode] = list;
  }

  return list;
}

async function changeSvc(serviceAreaId, onlyGet) {
  // let url = api[stage].serviceAreaPricings + '/id?ses=' + signIn.getSes() + '&service_area_id=' + serviceAreaId

  let url = api[stage].serviceAreaPricings + '/id';
  let { code: resultCode, res } = await svcUtils.get(url, { ses, service_area_id: serviceAreaId });
  let jsonId = null;
  if (resultCode == 0) {
    jsonId = objNumGetByKeys(res, 'id_list.0');
  }
  let svc = null;
  if (jsonId) {
    let url = api[stage].serviceAreaPricings + '/id/jsons/id';
    let {
      res: { service_area_pricing_json },
    } = await svcUtils.get(url, { ses, json_id: jsonId });
    let { id, pricing } = service_area_pricing_json;

    pricing.service_area_pricing_id = id;
    svc = pricing;

    // svc = objValGetByKeys(svcAeaResult, 'service_area_pricing_json.pricing');
  } else {
    let { res: svcAeaResult } = await svcUtils.get(api[stage].serviceAreas + '/' + serviceAreaId, { ses }, 'get service area by id');
    let { serviceArea, airports } = svcAeaResult;
    let airportList = serviceArea.airports;
    let cSvc = JSON.parse(JSON.stringify(serviceArea));
    delete cSvc.airports;
    let countryCode = airports[0].country;
    // let aa = {
    //   "serviceArea": {
    //     "id": 26365,
    //     "parent_fleet_id": 40,
    //     "name": "Regression Test Cancun MEX",
    //     "lat": 29.7264,
    //     "lng": -85.024696,
    //     "radius": 160934,
    //     "airports": [
    //       "AAF"
    //     ]
    //   },
    //   "airports": [
    //     {
    //       "code": "AAF",
    //       "name": "Apalachicola Regional Airport",
    //       "lat": 29.7264,
    //       "lng": -85.024696,
    //       "google_place_id": "ChIJdfRC8nC2lIgRGjuPB8GdlOw",
    //       "region": "Florida",
    //       "town": "Franklin County",
    //       "country": "USA"
    //     }
    //   ]
    // }

    let serviceAreaJson = {
      serviceArea: cSvc,
      airports: airportList,
      countryCode,
      service_area_pricing_id: 0,
      parent_fleet_id: _d.fleet_id,
    };
    // let serviceAreaJson = {
    //   serviceArea: {
    //     parent_fleet_id: objValGetByKeys(svcAeaResult, 'serviceArea.parent_fleet_id'),
    //     name: objValGetByKeys(svcAeaResult, 'serviceArea.name'),
    //     lat: objValGetByKeys(svcAeaResult, 'serviceArea.lat'),
    //     lng: objValGetByKeys(svcAeaResult, 'serviceArea.lng'),
    //     radius: objValGetByKeys(svcAeaResult, 'serviceArea.radius'),
    //     id: serviceAreaId,
    //   },
    //   airports: objValGetByKeys(svcAeaResult, 'serviceArea.airports'),
    //   countryCode: objValGetByKeys(svcAeaResult, 'airports.0.country'),
    // };
    svc = serviceAreaJson;
  }

  console.log('--changeSvc---', svc);

  if (onlyGet) {
    return svc;
  } else {
    serviceArea = svc;
  }

  _d.isGoogleMap = this.isGoogleMap(serviceArea.countryCode);
}

function isGoogleMap(countryCode) {
  let flag = false;
  _d.googleMapCountryList.map((item) => {
    if (item == countryCode) {
      flag = true;
    }
  });
  return flag;
}

let _svcSearch = null;
async function svcSearch() {
  await svcUtils.loadJs(_path + '/svc-search/' + 'svc_search.js');
  if (!_svcSearch) {
    _svcSearch = new Search();
  }
  return _svcSearch;
}

var _servicingAirports = null;
async function servicingAirports() {
  await svcUtils.loadJs(_path + '/' + 'svc_servicing_airports.js');
  if (!_servicingAirports) {
    _servicingAirports = new ServicingAirports('servicing-airports');
  }
  return _servicingAirports;
}

var _mapBox = null;
function mapBox() {
  loadJsSync('svc_map_box');
  if (!_mapBox) {
    // _mapBox = new MapBox('map-box');
  }
  return _mapBox;
}

var _basicPricing = null;
function basicPricing() {
  loadJsSync('svc_basic_pricing');
  if (!_basicPricing) {
    _basicPricing = new BasicPricing('basic-pricing');
  }
  return _basicPricing;
}

var _hourlyPrices = null;
async function hourlyPrices() {
  await svcUtils.loadJs(_path + '/hourly-prices/' + 'index.js');
  if (!_hourlyPrices) {
    _hourlyPrices = new HourlyPrices('hourly-pricing-wrapper');
  }
  return _hourlyPrices;
}

// let _BasicPricingHourly = null;

// function hourlyBasicPricing() {
//     loadJsSync('svc_hourly_basic_pricing');
//     if (!_BasicPricingHourly) {
//         _BasicPricingHourly = new BasicPricingHourly('hourly-pricing');
//     }

//     return _BasicPricingHourly;
// }

// hourlyBasicPricing().show()
var _addZones = null;

function addZones() {
  loadJsSync('svc_add_zones');
  if (!_addZones) {
    _addZones = new AddZones('add-zones');
  }
  return _addZones;
}

var _zonesMap = null;

function zonesMap() {
  loadJsSync('svc_zones_map');
  if (!_zonesMap) {
    _zonesMap = new ZonesMap('zones-map');
  }
  return _zonesMap;
}

var _vehiclesPricing = null;

function vehiclesPricing() {
  loadJsSync('svc_vehicles_pricing');
  if (!_vehiclesPricing) {
    _vehiclesPricing = new VehiclesPricing('vehicles-pricing');
  }
  return _vehiclesPricing;
}

var _reserveTime = null;
function reserveTime() {
  loadJsSync('svc_reserve_time');
  if (!_reserveTime) {
    _reserveTime = new ReserveTime('reserve-time');
  }
  return _reserveTime;
}

var _personalisedTime = null;
function personalisedTime() {
  loadJsSync('svc_personalised_time');
  if (!_personalisedTime) {
    _personalisedTime = new PersonalisedTime('personalised-time');
  }
  return _personalisedTime;
}

var _calculator = null;
async function calculator() {
  await svcUtils.loadJs(_path + '/' + 'svc_calculator.js');

  if (!_calculator) {
    _calculator = new Calculator('calculator');
  }
  return _calculator;
}

var _svcAmenity = null;
async function amenity() {
  await svcUtils.loadJs(_path + '/' + 'svc_amenity.js');
  if (!_svcAmenity) {
    _svcAmenity = new Amenity();
  }
  return _svcAmenity;
}

var _AdditionalOption = null;
function additionalOption() {
  loadJsSync('svc_additional_option');
  if (!_AdditionalOption) {
    _AdditionalOption = new AdditionalOption();
  }
  return _AdditionalOption;
}

var _save = null;
async function savePage() {
  await svcUtils.loadJs(_path + '/' + 'svc_save.js');
  if (!_save) {
    _save = new Save();
  }
  return _save;
}

var _history = null;
async function history() {
  await svcUtils.loadJs(_path + '/' + 'svc_history.js');
  if (!_history) {
    _history = new History();
  }
  return _history;
}

var _svcSpecialDate = null;
async function specialDate() {
  await svcUtils.loadJs(_path + '/' + 'svc_special_date.js');
  if (!_svcSpecialDate) {
    _svcSpecialDate = new SpecialDate('special-date-setting');
  }
  return _svcSpecialDate;
}

var _svcPartner = null;
function svcPartner() {
  loadJsSync('svc_partner_add_price');
  if (!_svcPartner) {
    _svcPartner = new PartnerPriceSidebarTab('partner-add-price');
    sidebarTabClasses.push(_svcPartner);
  }
  return _svcPartner;
}
var _svcPartnerEdit = null;
async function svcPartnerEdit() {
  await svcUtils.loadJs(_path + '/' + 'svc_partner.js');
  if (!_svcPartnerEdit) {
    _svcPartnerEdit = new Partner('partner-set-svc');
    sidebarTabClasses.push(_svcPartnerEdit);
  }
  return _svcPartnerEdit;
}

var _svcPartnerPreview = null;
function svcPartnerPreview() {
  loadJsSync('svc_partner_preview');
  if (!_svcPartnerPreview) {
    _svcPartnerPreview = new PartnerPreview('partner-preview-content');
    sidebarTabClasses.push(_svcPartnerPreview);
  }
  return _svcPartnerPreview;
}

var _svcPartnerHistory = null;
function svcPartnerHistory() {
  loadJsSync('svc_partner_history');
  if (!_svcPartnerHistory) {
    _svcPartnerHistory = new PartnerHistory('partner-history-content');
    sidebarTabClasses.push(_svcPartnerHistory);
  }
  return _svcPartnerHistory;
}

class AddServiceAreaDetail {
  constructor(id) {
    this.rootElm = document.getElementById(id);
    this.initElms();
  }
  initElms() {
    var it = this;

    it.serviceAreaAutoComp = new TextAutoComp(elmOfIdRel('service-area-search-fld', it.rootElm), {
      str: (item) => {
        // var airports = '';
        // for (var i = 0; i < item.airports.length; i++) {
        // 	if (i != (item.airports.length - 1)) {
        // 		airports += item.airports[i].code3 + ',';
        // 	} else {
        // 		airports += item.airports[i].code3;
        // 	}
        // }

        let airports = item.airports?.map((item) => item.airport) || [];
        return [item.service_area_name, airports.join(',')];
      },
    });

    it.serviceAreaAutoComp.fung.sel = async function (item) {
      _d.isAddServiceAreaState = false;
      _d.originalSelectedVids = [];
      if (item == undefined) {
        return;
      }
      it.addServiceAreaBtn.classList.add('unclickable');
      it.addSvcAeaIcon.classList.add('unclickable-add-icon');
      await changeSvc(item.service_area_id);
      let { currencyCode, vehicleClasses, countryCode,service_area_pricing_id } = serviceArea;

      _d.lastSvcPricingId = service_area_pricing_id

      cur = currencyCode;
      _d.countryCode = countryCode;

      _d.im = imByCountry(countryCode);
      im = imByCountry(countryCode);
      _d.unit = _d.im ? 'KM' : 'M';

      if (vehicleClasses) {
        for (let obj of vehicleClasses) {
          if (obj['hourly_percent']) continue;
          obj['hourly_percent'] = obj['percent'];
          _d.originalSelectedVids.push(obj['vehicle_class_id']);
        }
      }
      it.hide();
      await it.svcAeaEditContainerInitShow();


      if (curSvcAeaDetailClass) {
        curSvcAeaDetailClass.rootElm.classList.remove('show');
        curSvcAeaDetailClass = null;
      }
      (await calculator()).resetPlacesAndTime();

      getCreated().curIndex = undefined;
      getCreated().changeTabTitlesBar(0);
    };

    it.addServiceAreaBtn = elmOfIdRel('add-service-area', it.rootElm);
    it.addSvcAeaIcon = elmOfIdRel('add-svc-aea-icon', it.rootElm);

    it.addServiceAreaBtn.onclick = async function () {
      _d.isAddServiceAreaState = true;
      // serviceArea = {};
      serviceArea = {
        currencyCode: '',
        serviceArea: {
          name: '',
          lat: 0,
          lng: 0,
          radius: 0,
          parent_fleet_id: _d.fleet_id
        },
        airports: [''],
        countryCode: '',
      };
      it.hide();
      if (curSvcAeaDetailClass) {
        curSvcAeaDetailClass.rootElm.classList.remove('show');
        curSvcAeaDetailClass = null;
      }
      getCreated().curIndex = undefined;
      await getCreated().changeTabTitlesBar(0);
      await it.svcAeaEditContainerInitShow();

      // mapBox().show();
    };

    this.serviceAreaSearch = elmOfIdRel('service-area-search', this.rootElm);

    if (_d.isEmployee) {
      this.serviceAreaSearch.classList.remove('hide');
    }
    this.serviceAreaSearch.onclick = async () => {
      this.rootElm.classList.add('hide');
      svcAeaTabTitlesBar.style.display = 'none';
      svcAeaTabBox.style.display = 'none';
      (await svcSearch()).show();
      // svcSearch().show();
      console.log('service-area-search click', svcSearch());
    };
  }

  async svcAeaEditContainerInitShow() {
    svcAeaEditContaienr.classList.remove('hide');
    svcAeaEditContaienrShowBtn.style.display = 'none';
    (await calculator()).hide();
  }

  reset() {
    elmOfIdRel('service-area-search-fld', this.rootElm).value = '';
    this.addServiceAreaBtn.classList.remove('unclickable');
    this.addSvcAeaIcon.classList.remove('unclickable-add-icon');
  }
  async show() {
    svcAeaTabTitlesBar.style.display = 'none';
    // this.init();

    afterSignInElm.style.display = '';
    this.rootElm.classList.remove('hide');
    this.reset();
  }
  hide() {
    svcAeaTabTitlesBar.style.display = '';
    this.rootElm.classList.add('hide');
  }
}

async function getLatestServiceArea() {
  var url = api[stage].sqlTemplatesRun_3;
  let {
    res: { results },
  } = await svcUtils.post(url, {
    sql: 134678258,
    version: '1.0',
  });
  _d.svcList = results;
  addServiceAreaDetail.serviceAreaAutoComp.setItems(results);
}

var curSvcAeaDetailClass = null;
class Created {
  constructor() {
    this.rootElm = document.getElementById('after-sign-in');
    this.preTitle = null;
    this.curIndex = undefined;
    this.TabTitlesBarList = [];

    // this.serviceAreaList = []
    this.savePageIndex = 10;
    this.hideCalculatorIdnex = [10];

    this.initUi();

    this.initTabTitle();
    getLatestServiceArea();

    this.initSideBar();
    this.tabTitleClick();
    this.setVersion();
    this.initUserInfo();
    this.dropdownEvent();
    this.prevNextBtnClick();
  }

  initUi() {
    // this.svcaeaSidebarTab = document.getElementById('svc-aea-sidebar-tab')
    // this.svcaeaSidebarTab.style.display = ''
    addServiceAreaDetail.show();
    let svcContainerBox = this.rootElm.querySelector('.svc-aea-container-box');
    svcContainerBox.addEventListener('mousedown', async (e) => {
      (await calculator()).saveBtn.classList.add('not-allowed');
    });
    this.rootElm.querySelector('.sidebar-tab-titles-bar-box').addEventListener('mousedown', async () => {
      (await calculator()).saveBtn.classList.add('not-allowed');
    });
  }
  prevNextBtnClick() {
    this.prewNextBox = document.getElementById('prew-next-btn-box');

    let nextBtn = this.prewNextBox.querySelector('.next-btn');
    let prevBtn = this.prewNextBox.querySelector('.prev-btn');

    prevBtn.addEventListener('click', async () => {
      // if (!this.pageInputCheck(this.curIndex)) return
      if (!(await curSvcAeaDetailClass.validate())) return;
      this.toPrev(this.curIndex);
    });
    nextBtn.addEventListener('click', async () => {
      if (!(await curSvcAeaDetailClass.validate())) return;
      this.toNext(this.curIndex);
    });
  }

  initTabTitle() {
    let titleList = [
      {
        title: 'Service Area >',
      },
      {
        title: 'Range Prices >',
      },
      {
        title: 'Hourly Prices >',
      },
      {
        title: 'Fixed Price Zones >',
      },
      {
        title: 'Vehicles Pricing >',
      },
      {
        title: 'Reserve Time >',
      },
      {
        title: 'Service Time >',
      },
      {
        title: 'Special Date >',
      },
      {
        title: 'Amenity >',
      },
      {
        title: 'Additional option >',
      },
      {
        title: 'History >',
      },
    ];

    let box = this.rootElm.querySelector('#svc-aea-tab-titles-bar');
    let frag = document.createDocumentFragment();

    titleList.forEach((item, index) => {
      let span = document.createElement('SPAN');

      span.classList.add('tab-title');
      span.id = item.title;
      span.innerText = item.title;

      span.setAttribute('data-tab-index', index);
      frag.appendChild(span);
    });

    box.appendChild(frag);
  }

  initSideBar() {
    let sideBar = this.rootElm.querySelector('.side-bar');
    var sidebarTabs = getElmsRelativeByClass('sidebar-tab', document.body);
    sidebarTabs[0].classList.remove('hide');

    _d.sidebarTabs = sidebarTabs;

    let sidebarItems = sideBar.querySelectorAll('.sidebar-item');
    this.sidebarItems = sidebarItems;

    sideBar.addEventListener('click', async (e) => {
      if (this.clickTimeout) {
        return;
      }
      this.clickTimeout = 1;
      setTimeout(() => {
        this.clickTimeout = 0;
      }, 500);
      (await calculator()).saveBtn.classList.add('not-allowed');
      let pNode = e.target;
      if (!pNode.classList.contains('sidebar-item')) {
        pNode = e.target.parentNode;
      }

      if (!pNode.classList.contains('sidebar-item')) return;

      if (pNode.classList.contains('main-item')) {
        let box = pNode.nextElementSibling;
        box.classList.toggle('hide');
        let triangleDown = pNode.querySelector('.i-arrow-down');
        triangleDown.classList.toggle('rotate-90');
        // svcPartnerEdit().getServiceAreaData()
        // svcPartnerPreview().getServiceAreaData()
        return;
      }
      svcAeaTabBox.style.display = '';
      (await svcSearch()).hide();
      svcAeaEditContaienr.classList.add('hide');

      for (let item of sidebarItems) {
        item.classList.remove('cur-sidebar-title');
      }
      pNode.classList.add('cur-sidebar-title');

      for (let sidebarTabClass of sidebarTabClasses) {
        sidebarTabClass.hide();
      }

      for (let sidebarTab of sidebarTabs) {
        sidebarTab.classList.add('hide');
      }

      switch (pNode.id) {
        case 'svc-aea-btn':
          console.log('svc-aea-btn');

          addServiceAreaDetail.show();
          sidebarTabs[0].classList.remove('hide');
          getLatestServiceArea();
          break;

        case 'vehicle-manage':
          let content = document.querySelector('.vehicle-manage-content');
          if (!content) {
            fetch('./svc_vehicle_management.html')
              .then((data) => data.text())
              .then(async (data) => {
                document.getElementById('vehicle-manage-wrapper').innerHTML = data;
                sidebarTabs[1].classList.remove('hide');
                await svcUtils.loadJsList(['svc_vehicle_management.js']);
                getSvcVehicle().show();
                this.clickTimeout = 0;
              })
              .then(() => {
                console.log('aaa');
              });
          } else {
            sidebarTabs[1].classList.remove('hide');
            getSvcVehicle().show();
          }
          break;
        case 'partner-add-price-btn':
          svcPartner().show();
          sidebarTabs[2].classList.remove('hide');
          break;
        case 'partner-setting-area-btn':
          let svcEdit = await svcPartnerEdit();
          svcEdit.resetPageData();
          svcEdit.show();
          sidebarTabs[2].classList.remove('hide');
          break;
        case 'partner-preview-btn':
          svcPartnerPreview().resetPageData();
          svcPartnerPreview().show();
          sidebarTabs[2].classList.remove('hide');
          break;
        case 'partner-history-btn':
          svcPartnerHistory().getData();
          svcPartnerHistory().show();
          sidebarTabs[2].classList.remove('hide');
          break;
        default:
          break;
      }

      if (curSvcAeaDetailClass) {
        curSvcAeaDetailClass.hide();
        (await calculator()).hide();
        svcAeaEditContaienrShowBtn.style.display = '';
      }
    });

    svcAeaEditContaienrShowBtn.addEventListener('click', async () => {
      await this.svcAeaEditContaienrShowBtnClick();
    });
  }

  async svcAeaEditContaienrShowBtnClick() {
    svcAeaTabBox.style.display = '';
    (await svcSearch()).hide();
    let svcAeaSidebarTab = document.getElementById('svc-aea-sidebar-tab');
    svcAeaSidebarTab.classList.remove('hide');

    let partner = document.getElementById('partner-wrapper');
    partner.classList.add('hide');

    for (let item of this.sidebarItems) {
      item.classList.remove('cur-sidebar-title');
    }
    this.sidebarItems[0].classList.add('cur-sidebar-title');

    svcAeaEditContaienr.classList.remove('hide');

    // svcPartner().hide()
    addServiceAreaDetail.hide();
    svcAeaEditContaienrShowBtn.style.display = 'none';

    _d.sidebarTabs.forEach((elm, index) => {
      if (index != 0) {
        elm.classList.add('hide');
      }
    });

    if (curSvcAeaDetailClass) {
      curSvcAeaDetailClass.show();
      if (!this.hideCalculatorIdnex.includes(this.curIndex)) {
        (await calculator()).show();
      }
    }
  }

  initUserInfo() {
    let userInfoEntry = document.getElementById('user-info-entry');
    let userInfo = _d.empEmail;
    if (_d.fleetEmail) {
      userInfo += `*${_d.fleetEmail}`;
    }
    userInfoEntry.innerText = userInfo;
  }

  dropdownEvent() {
    // let comDropdown = document.getElementById('com-dropdown');
    // comDropdown.addEventListener('dorpdownChange', (e) => {
    //   let iso3 = e.detail == 'English' ? 'eng' : 'zho';
    //   _d.langCode = iso3;
    //   langSelected({ iso3 });
    // });

    let input = document.querySelector('.lang-box .input')

    input.value = 'English'
    let langAC = new TextAutoComp(input, {
      str: (item) => {
        return [item.name]
      },
      sel: (item) => {
        let iso3 =item.name == 'English' ? 'eng' : 'zho';
        _d.langCode = iso3;
        langSelected({ iso3 });
      }
    })


    langAC.setItems([{ name: 'English' }, { name: '中文' }])
    langAC.filter = false

    let toDownd = document.querySelector('.lang-box .icon')
    toDownd.addEventListener('click', () => {
      input.focus()
    })
  }

  isShowPrewNextBtn(index) {
    if (index == this.savePageIndex) {
      this.prewNextBox.classList.add('hide');
    } else {
      this.prewNextBox.classList.remove('hide');
    }
  }

  showRangErrorTips() {
    let msg = 'Please enter "Range Prices Setting"  first';
    if (langCode == 'zho') {
      msg = '请先点击"按里程计价规则设置"';
    }
    getDialog().confirm({ msg });
  }
  showUrbanAreaErrorTips() {
    let msg = 'Please enter Downtown Area range prices first';
    if (langCode == 'zho') {
      msg = '请先点击"价格范围中的市区范围"';
    }
    getDialog().confirm({ msg });
  }
  tabTitleClick() {
    let svcAeaTabTitlesBar = document.getElementById('svc-aea-tab-titles-bar');
    let firstChild = svcAeaTabTitlesBar.firstElementChild;

    this.TabTitlesBarList = svcAeaTabTitlesBar.querySelectorAll('.tab-title');
    firstChild.classList.add('cur-tab-title');
    this.preTitle = firstChild;

    svcAeaTabTitlesBar.addEventListener('click', async (e) => {
      let target = e.target;
      if (!target.classList.contains('tab-title')) return;
      let index = Number(target.getAttribute('data-tab-index'));

      // if (!this.pageInputCheck(this.curIndex)) return
      if (!(await curSvcAeaDetailClass.validate())) return;
      let { pricing, downtown_areas } = serviceArea;
      if (this.curIndex < 1 && index > 1) {
        if (!pricing) {
          this.showRangErrorTips();
          return;
        }
        let { min_distance, ranges } = pricing;
        if (!ranges || !ranges.length) {
          this.showRangErrorTips();
          return;
        }
        if (ranges[0].to < 1) {
          this.showRangErrorTips();
          return;
        }
      }
      if (this.curIndex <= 1 && index > 1) {
        if (downtown_areas && downtown_areas?.area_geometry && !downtown_areas?.ranges?.length) {
          this.showUrbanAreaErrorTips();
          return;
        }
      }

      if (this.curIndex == 1) {
        if (!curSvcAeaDetailClass.validate()) return;
        if (tabRequiredFldEmptyCheck(curSvcAeaDetailClass.rootElm)) return;
      }
      if (this.curIndex == 2) {
        if (!curSvcAeaDetailClass.validate()) return;
      }
      if (this.curIndex < 4 && index > 4) {
        let msg = 'Please enter vehicle pricing  first';
        if (langCode == 'zho') {
          msg = '请先点击"按车型设置计价标准"';
        }
        getDialog().confirm({ msg });
        return;
      }

      this.changeTabTitlesBar(index);
    });
  }

  toPrev(index) {
    index -= 1;
    if (index < 0) return;
    this.changeTabTitlesBar(index);
  }
  toNext(index) {
    index += 1;
    this.changeTabTitlesBar(index);
  }

  async changeTabTitlesBar(index, target = null) {
    let prevBtn = this.prewNextBox.querySelector('.prev-btn');
    if (index === 0) {
      prevBtn.classList.add('hide');
    } else {
      prevBtn.classList.remove('hide');
    }

    if (this.preTitle) {
      this.preTitle.classList.remove('cur-tab-title');
    }
    this.TabTitlesBarList[index].classList.add('cur-tab-title');

    this.preTitle = this.TabTitlesBarList[index];
    if (this.curIndex == index) return;

    this.curIndex = index;

    if (curSvcAeaDetailClass) {
      curSvcAeaDetailClass.hide();
    }

    if (this.hideCalculatorIdnex.includes(index)) {
      (await calculator()).hide();
    } else {
      if (JSON.stringify(serviceArea) != '{}') {
        (await calculator()).show();
      }
    }
    switch (index) {
      case 0:
        (await servicingAirports()).show();
        curSvcAeaDetailClass = await servicingAirports();
        break;
      case 1:
        basicPricing().show();
        curSvcAeaDetailClass = basicPricing();
        break;
      case 2:
        (await hourlyPrices()).show();
        curSvcAeaDetailClass = await hourlyPrices();
        break;
      case 3:
        addZones().show();
        curSvcAeaDetailClass = addZones();
        break;
      case 4:
        vehiclesPricing().show();
        curSvcAeaDetailClass = vehiclesPricing();
        break;
      case 5:
        reserveTime().show();
        curSvcAeaDetailClass = reserveTime();
        break;
      case 6:
        personalisedTime().show();
        curSvcAeaDetailClass = personalisedTime();
        break;
      case 7:
        (await specialDate()).show();
        curSvcAeaDetailClass = await specialDate();
        break;
      case 8:
        (await amenity()).show();
        curSvcAeaDetailClass = await amenity();
        break;
      case 9:
        additionalOption().show();
        curSvcAeaDetailClass = additionalOption();
        break;
      case 10:
        (await history()).show();
        curSvcAeaDetailClass = await history();
        break;
      default:
        break;
    }

    this.isShowPrewNextBtn(index);
  }

  setVersion() {
    let version = document.querySelector('.version');
    _d.envAndVersionNum = stage == 'dev' ? 'dev' : 'prod';
    version.innerText = _d.envAndVersionNum + _ver;
  }
}

var _created = null;
function getCreated() {
  if (!_created) {
    _created = new Created();
  }
  return _created;
}

function isAllowLogin() {
  return new Promise(async (resolve, reject) => {
    let url = api[stage].sqlTemplatesRun;
    let d = {
      sql: 134678041,
      appVersion: _ver,
    };

    let { res } = await svcUtils.post(url, d);
    let { permission } = res;
    if (!permission) {
      // if (true) {
      await getDialog().confirm({
        msg: 'Sorry, your account is not allowed to login.',
      });
      resolve(false);
      location.reload();
    } else {
      resolve(true);
    }
  });
}

var langCode = 'eng';
function langSelected(lang) {
  let idArr = ['after-sign-in'];
  langCode = lang.iso3;
  //eng zho spa
  idArr.forEach((str) => {
    translate2(str, lang.iso3);
  });
}

var addServiceAreaDetail;
document.addEventListener('loginSuccess', async (e) => {
  let { ses: section } = e.detail;
  ses = section;

  if (stage == 'upncoming') {
    api[stage].sqlTemplatesRun_3 = 'https://ujrfp99zs9.execute-api.us-east-2.amazonaws.com/upncoming/sql-templates/run';
  }

  await svcUtils.loadJsList(['com_currency_countries.js']);

  addServiceAreaDetail = new AddServiceAreaDetail('add-service-area-detail');
  sidebarTabClasses.push(addServiceAreaDetail);

  getCreated();

  svcUtils.loadCssList(['common.css', 'com_dialog.css', 'hourly-prices/index.css', 'svc_amenity.css', 'svc-search/svc_search.css', 'svc-com-template.css']);
  svcUtils.loadJsListAsync(['service_area_2nd.js', 'com-dropdown.js', 'com_partners.js', 'com_Dialog.js', 'com_vehicle.js', 'svc_hereMap.js', 'svc_map.js', 'classManager.js']);
});

var calc_partnerCache = null;
function calc_partnerCache_fn() {
  if (!calc_partnerCache) {
    calc_partnerCache = new SvcPartnerCache();
  }
  return calc_partnerCache;
}

class SvcPartnerCache {
  constructor() {
    this.partnersList = null;
  }
  async get() {
    if (!this.partnersList) {
      this.partnersList = await this.getPartnersList();
    }
    return this.partnersList;
  }

  getPartnersList() {
    return new Promise((resolve, reject) => {
      rest.post(
        'partners list search',
        api[stage].sqlTemplatesRun_3 + '?ses=' + ses,
        {
          sql: 134678213,
          version: '1.0',
        },
        (result) => {
          let list = objValGetByKeys(result, 'results');
          resolve(list);
        },
        (error) => {
          showErr(objValGetByKeys(error, 'responseJSON.errMsg'));
          resolve(null);
        }
      );
    });
  }
}

let testD ={
  "serviceArea": {
      "id": 43,
      "parent_fleet_id": 15,
      "name": "Tokyo, Japan",
      "lat": 36.02770019977952,
      "lng": 138.94298566044048,
      "radius": 178000,
      "parent_fleet_name": "Elife"
  },
  "pricing": {
      "ranges": [
          {
              "seq": 0,
              "amount": 3.8,
              "currency": "USD",
              "distance": 30000,
              "from": 20000,
              "to": 50000,
              "distanceIn": 30,
              "per_unit": 1
          },
          {
              "seq": 1,
              "amount": 2.7,
              "currency": "USD",
              "distance": 50000,
              "from": 50000,
              "to": 100000,
              "distanceIn": 50,
              "per_unit": 1
          },
          {
              "seq": 2,
              "amount": 5,
              "currency": "USD",
              "distance": 400000,
              "from": 100000,
              "to": 500000,
              "distanceIn": 400,
              "per_unit": 1
          }
      ],
      "min_amount": 350,
      "currency": "USD",
      "min_distance": 20000,
      "meet_n_greet": 0
  },
  "zones": [],
  "airports": [
      "NRT",
      "HND"
  ],
  "vehicleClasses": [
      {
          "vehicle_class_id": 1,
          "delta_amount": 0,
          "percent": 0,
          "percent_appendix": [
              {
                  "field": "downtown_areas.ranges.0",
                  "delta_amount": -0.5
              },
              {
                  "field": "hourly_pricing.min_amount",
                  "delta_amount": -599,
                  "hasChanged": true
              },
              {
                  "field": "hourly_pricing.ranges.0",
                  "delta_amount": -18,
                  "hasChanged": true
              },
              {
                  "field": "hourly_pricing.ranges.1",
                  "delta_amount": -37,
                  "hasChanged": true
              },
              {
                  "field": "pricing.min_amount",
                  "delta_amount": 40
              }
          
          ],
          "hourly_percent": 0,
          "surcharge_schedule": [
              [
                  {
                      "from": "00:00",
                      "to": "07:30",
                      "break": "false",
                      "delta_amount": 4.34,
                      "ts": 1702025429357
                  },
                  {
                      "from": "22:00",
                      "to": "23:59",
                      "break": "false",
                      "delta_amount": 4.34,
                      "ts": 1702025674397
                  }
              ],
              [
                  {
                      "from": "00:00",
                      "to": "07:30",
                      "break": "false",
                      "delta_amount": 4.34,
                      "ts": 1702025429357
                  },
                  {
                      "from": "22:00",
                      "to": "23:59",
                      "break": "false",
                      "delta_amount": 4.34,
                      "ts": 1702025674397
                  }
              ],
              [
                  {
                      "from": "00:00",
                      "to": "07:30",
                      "break": "false",
                      "delta_amount": 4.34,
                      "ts": 1702025429357
                  },
                  {
                      "from": "22:00",
                      "to": "23:59",
                      "break": "false",
                      "delta_amount": 4.34,
                      "ts": 1702025674397
                  }
              ],
              [
                  {
                      "from": "00:00",
                      "to": "07:30",
                      "break": "false",
                      "delta_amount": 4.34,
                      "ts": 1702025429357
                  },
                  {
                      "from": "22:00",
                      "to": "23:59",
                      "break": "false",
                      "delta_amount": 4.34,
                      "ts": 1702025674397
                  }
              ],
              [
                  {
                      "from": "00:00",
                      "to": "07:30",
                      "break": "false",
                      "delta_amount": 4.34,
                      "ts": 1702025429357
                  },
                  {
                      "from": "22:00",
                      "to": "23:59",
                      "break": "false",
                      "delta_amount": 4.34,
                      "ts": 1702025674397
                  }
              ],
              [
                  {
                      "from": "00:00",
                      "to": "07:30",
                      "break": "false",
                      "delta_amount": 4.34,
                      "ts": 1702025429357
                  },
                  {
                      "from": "22:00",
                      "to": "23:59",
                      "break": "false",
                      "delta_amount": 4.34,
                      "ts": 1702025674397
                  }
              ],
              [
                  {
                      "from": "00:00",
                      "to": "07:30",
                      "break": "false",
                      "delta_amount": 4.34,
                      "ts": 1702025429357
                  },
                  {
                      "from": "22:00",
                      "to": "23:59",
                      "break": "false",
                      "delta_amount": 4.34,
                      "ts": 1702025674397
                  }
              ]
          ],
          "notice_time": [
              {
                  "time": 1800,
                  "delta_amount": 5.8,
                  "allowance": 720
              },
              {
                  "time": 720,
                  "delta_amount": 34.93,
                  "allowance": 720
              }
          ]
      }
  ],
  "countryCode": "JPN",
  "currencyCode": "USD",
  "hint": [
      {
          "normal_reserve_value": 30,
          "vehicles": [
              1,
              12
          ],
          "notice_time_hint": [
              {
                  "advance_time_start": 12,
                  "advance_time_end": 30,
                  "notice_time": {
                      "time": 1800,
                      "delta_amount": 5.8,
                      "allowance": 720
                  }
              },
              {
                  "advance_time_start": 12,
                  "advance_time_end": 12,
                  "notice_time": {
                      "time": 720,
                      "delta_amount": 34.93,
                      "allowance": 720
                  }
              }
          ]
      },
      {
          "normal_reserve_value": 30,
          "vehicles": [
              10,
              11,
              29,
              9
          ],
          "notice_time_hint": [
              {
                  "advance_time_start": 12,
                  "advance_time_end": 30,
                  "notice_time": {
                      "time": 1800,
                      "delta_amount": 10,
                      "allowance": 720
                  }
              },
              {
                  "advance_time_start": 12,
                  "advance_time_end": 12,
                  "notice_time": {
                      "time": 720,
                      "delta_amount": 13.8,
                      "allowance": 720
                  }
              }
          ]
      },
      {
          "normal_reserve_value": 30,
          "vehicles": [
              30,
              31,
              34,
              32,
              33,
              35
          ],
          "notice_time_hint": [
              {
                  "advance_time_start": 12,
                  "advance_time_end": 30,
                  "notice_time": {
                      "time": 1800,
                      "delta_amount": 50,
                      "allowance": 720
                  }
              }
          ]
      },
      {
          "normal_reserve_value": 30,
          "vehicles": [
              3,
              6
          ],
          "notice_time_hint": [
              {
                  "advance_time_start": 12,
                  "advance_time_end": 30,
                  "notice_time": {
                      "time": 1800,
                      "delta_amount": 7.19,
                      "allowance": 720
                  }
              },
              {
                  "advance_time_start": 12,
                  "advance_time_end": 12,
                  "notice_time": {
                      "time": 720,
                      "delta_amount": 45.98,
                      "allowance": 720
                  }
              }
          ]
      },
      {
          "normal_reserve_value": 30,
          "vehicles": [
              36,
              4
          ],
          "notice_time_hint": [
              {
                  "advance_time_start": 12,
                  "advance_time_end": 30,
                  "notice_time": {
                      "time": 1800,
                      "percent": 0,
                      "allowance": 720
                  }
              },
              {
                  "advance_time_start": 12,
                  "advance_time_end": 12,
                  "notice_time": {
                      "time": 720,
                      "delta_amount": 44.98,
                      "allowance": 720
                  }
              }
          ]
      },
      {
          "normal_reserve_value": 30,
          "vehicles": [
              7,
              8,
              5
          ],
          "notice_time_hint": [
              {
                  "advance_time_start": 12,
                  "advance_time_end": 30,
                  "notice_time": {
                      "time": 1800,
                      "delta_amount": 7.92,
                      "allowance": 720
                  }
              },
              {
                  "advance_time_start": 12,
                  "advance_time_end": 12,
                  "notice_time": {
                      "time": 720,
                      "delta_amount": 7.92,
                      "allowance": 720
                  }
              }
          ]
      },
      {
          "normal_reserve_value": 30,
          "vehicles": [
              2
          ],
          "notice_time_hint": [
              {
                  "advance_time_start": 12,
                  "advance_time_end": 30,
                  "notice_time": {
                      "time": 1800,
                      "percent": 0,
                      "allowance": 720
                  }
              },
              {
                  "advance_time_start": 12,
                  "advance_time_end": 12,
                  "notice_time": {
                      "time": 720,
                      "delta_amount": 43.77,
                      "allowance": 720
                  }
              }
          ]
      }
  ],
  "pricing_schedule_sum": [
      {
          "notice_time_hint": [
              [
                  {
                      "from": "00:00",
                      "to": "07:30",
                      "break": "false",
                      "percent": 30
                  },
                  {
                      "from": "22:00",
                      "to": "23:59",
                      "break": "false",
                      "percent": 30
                  }
              ],
              [
                  {
                      "from": "00:00",
                      "to": "07:30",
                      "break": "false",
                      "percent": 30
                  },
                  {
                      "from": "22:00",
                      "to": "23:59",
                      "break": "false",
                      "percent": 30
                  }
              ],
              [
                  {
                      "from": "00:00",
                      "to": "07:30",
                      "break": "false",
                      "percent": 30
                  },
                  {
                      "from": "22:00",
                      "to": "23:59",
                      "break": "false",
                      "percent": 30
                  }
              ],
              [
                  {
                      "from": "00:00",
                      "to": "07:30",
                      "break": "false",
                      "percent": 30
                  },
                  {
                      "from": "22:00",
                      "to": "23:59",
                      "break": "false",
                      "percent": 30
                  }
              ],
              [
                  {
                      "from": "00:00",
                      "to": "07:30",
                      "break": "false",
                      "percent": 30
                  },
                  {
                      "from": "22:00",
                      "to": "23:59",
                      "break": "false",
                      "percent": 30
                  }
              ],
              [
                  {
                      "from": "00:00",
                      "to": "07:30",
                      "break": "false",
                      "percent": 30
                  },
                  {
                      "from": "22:00",
                      "to": "23:59",
                      "break": "false",
                      "percent": 30
                  }
              ],
              [
                  {
                      "from": "00:00",
                      "to": "07:30",
                      "break": "false",
                      "percent": 30
                  },
                  {
                      "from": "22:00",
                      "to": "23:59",
                      "break": "false",
                      "percent": 30
                  }
              ]
          ],
          "vehicles": []
      },
      {
          "notice_time_hint": [
              [
                  {
                      "from": "00:00",
                      "to": "07:30",
                      "break": "false",
                      "delta_amount": 4.34,
                      "ts": 1702025429357
                  },
                  {
                      "from": "22:00",
                      "to": "23:59",
                      "break": "false",
                      "delta_amount": 4.34,
                      "ts": 1702025674397
                  }
              ],
              [
                  {
                      "from": "00:00",
                      "to": "07:30",
                      "break": "false",
                      "delta_amount": 4.34,
                      "ts": 1702025429357
                  },
                  {
                      "from": "22:00",
                      "to": "23:59",
                      "break": "false",
                      "delta_amount": 4.34,
                      "ts": 1702025674397
                  }
              ],
              [
                  {
                      "from": "00:00",
                      "to": "07:30",
                      "break": "false",
                      "delta_amount": 4.34,
                      "ts": 1702025429357
                  },
                  {
                      "from": "22:00",
                      "to": "23:59",
                      "break": "false",
                      "delta_amount": 4.34,
                      "ts": 1702025674397
                  }
              ],
              [
                  {
                      "from": "00:00",
                      "to": "07:30",
                      "break": "false",
                      "delta_amount": 4.34,
                      "ts": 1702025429357
                  },
                  {
                      "from": "22:00",
                      "to": "23:59",
                      "break": "false",
                      "delta_amount": 4.34,
                      "ts": 1702025674397
                  }
              ],
              [
                  {
                      "from": "00:00",
                      "to": "07:30",
                      "break": "false",
                      "delta_amount": 4.34,
                      "ts": 1702025429357
                  },
                  {
                      "from": "22:00",
                      "to": "23:59",
                      "break": "false",
                      "delta_amount": 4.34,
                      "ts": 1702025674397
                  }
              ],
              [
                  {
                      "from": "00:00",
                      "to": "07:30",
                      "break": "false",
                      "delta_amount": 4.34,
                      "ts": 1702025429357
                  },
                  {
                      "from": "22:00",
                      "to": "23:59",
                      "break": "false",
                      "delta_amount": 4.34,
                      "ts": 1702025674397
                  }
              ],
              [
                  {
                      "from": "00:00",
                      "to": "07:30",
                      "break": "false",
                      "delta_amount": 4.34,
                      "ts": 1702025429357
                  },
                  {
                      "from": "22:00",
                      "to": "23:59",
                      "break": "false",
                      "delta_amount": 4.34,
                      "ts": 1702025674397
                  }
              ]
          ],
          "vehicles": [
              1
          ]
      },
      {
          "notice_time_hint": [
              [
                  {
                      "from": "22:00",
                      "to": "23:59",
                      "break": "false",
                      "delta_amount": 6.83,
                      "ts": 1702025490232
                  },
                  {
                      "from": "00:00",
                      "to": "07:30",
                      "break": "false",
                      "delta_amount": 6.83,
                      "ts": 1702025484975
                  }
              ],
              [
                  {
                      "from": "22:00",
                      "to": "23:59",
                      "break": "false",
                      "delta_amount": 6.83,
                      "ts": 1702025490232
                  },
                  {
                      "from": "00:00",
                      "to": "07:30",
                      "break": "false",
                      "delta_amount": 6.83,
                      "ts": 1702025484975
                  }
              ],
              [
                  {
                      "from": "22:00",
                      "to": "23:59",
                      "break": "false",
                      "delta_amount": 6.83,
                      "ts": 1702025490232
                  },
                  {
                      "from": "00:00",
                      "to": "07:30",
                      "break": "false",
                      "delta_amount": 6.83,
                      "ts": 1702025484975
                  }
              ],
              [
                  {
                      "from": "22:00",
                      "to": "23:59",
                      "break": "false",
                      "delta_amount": 6.83,
                      "ts": 1702025490232
                  },
                  {
                      "from": "00:00",
                      "to": "07:30",
                      "break": "false",
                      "delta_amount": 6.83,
                      "ts": 1702025484975
                  }
              ],
              [
                  {
                      "from": "22:00",
                      "to": "23:59",
                      "break": "false",
                      "delta_amount": 6.83,
                      "ts": 1702025490232
                  },
                  {
                      "from": "00:00",
                      "to": "07:30",
                      "break": "false",
                      "delta_amount": 6.83,
                      "ts": 1702025484975
                  }
              ],
              [
                  {
                      "from": "22:00",
                      "to": "23:59",
                      "break": "false",
                      "delta_amount": 6.83,
                      "ts": 1702025490232
                  },
                  {
                      "from": "00:00",
                      "to": "07:30",
                      "break": "false",
                      "delta_amount": 6.83,
                      "ts": 1702025484975
                  }
              ],
              [
                  {
                      "from": "22:00",
                      "to": "23:59",
                      "break": "false",
                      "delta_amount": 6.83,
                      "ts": 1702025490232
                  },
                  {
                      "from": "00:00",
                      "to": "07:30",
                      "break": "false",
                      "delta_amount": 6.83,
                      "ts": 1702025484975
                  }
              ]
          ],
          "vehicles": []
      },
      {
          "notice_time_hint": [
              [
                  {
                      "from": "00:00",
                      "to": "07:30",
                      "break": "false",
                      "delta_amount": 10,
                      "ts": 1689042701263
                  },
                  {
                      "from": "22:00",
                      "to": "23:59",
                      "break": "false",
                      "delta_amount": 2.3,
                      "ts": 1695040466707
                  }
              ],
              [
                  {
                      "from": "00:00",
                      "to": "07:30",
                      "break": "false",
                      "delta_amount": 10,
                      "ts": 1689042701263
                  },
                  {
                      "from": "22:00",
                      "to": "23:59",
                      "break": "false",
                      "delta_amount": 2.3,
                      "ts": 1695040466707
                  }
              ],
              [
                  {
                      "from": "00:00",
                      "to": "07:30",
                      "break": "false",
                      "delta_amount": 10,
                      "ts": 1689042701263
                  },
                  {
                      "from": "22:00",
                      "to": "23:59",
                      "break": "false",
                      "delta_amount": 2.3,
                      "ts": 1695040466707
                  }
              ],
              [
                  {
                      "from": "00:00",
                      "to": "07:30",
                      "break": "false",
                      "delta_amount": 10,
                      "ts": 1689042701263
                  },
                  {
                      "from": "22:00",
                      "to": "23:59",
                      "break": "false",
                      "delta_amount": 2.3,
                      "ts": 1695040466707
                  }
              ],
              [
                  {
                      "from": "00:00",
                      "to": "07:30",
                      "break": "false",
                      "delta_amount": 10,
                      "ts": 1689042701263
                  },
                  {
                      "from": "22:00",
                      "to": "23:59",
                      "break": "false",
                      "delta_amount": 2.3,
                      "ts": 1695040466707
                  }
              ],
              [
                  {
                      "from": "00:00",
                      "to": "07:30",
                      "break": "false",
                      "delta_amount": 10,
                      "ts": 1689042701263
                  },
                  {
                      "from": "22:00",
                      "to": "23:59",
                      "break": "false",
                      "delta_amount": 2.3,
                      "ts": 1695040466707
                  }
              ],
              [
                  {
                      "from": "00:00",
                      "to": "07:30",
                      "break": "false",
                      "delta_amount": 10,
                      "ts": 1689042701263
                  },
                  {
                      "from": "22:00",
                      "to": "23:59",
                      "break": "false",
                      "delta_amount": 2.3,
                      "ts": 1695040466707
                  }
              ]
          ],
          "vehicles": []
      },
      {
          "notice_time_hint": [
              [
                  {
                      "from": "22:00",
                      "to": "23:59",
                      "break": "false",
                      "delta_amount": 12.3,
                      "ts": 1699316827567
                  },
                  {
                      "from": "00:00",
                      "to": "07:30",
                      "break": "false",
                      "delta_amount": 19.36,
                      "ts": 1700267566788
                  }
              ],
              [
                  {
                      "from": "22:00",
                      "to": "23:59",
                      "break": "false",
                      "delta_amount": 12.3,
                      "ts": 1699316827567
                  },
                  {
                      "from": "00:00",
                      "to": "07:30",
                      "break": "false",
                      "delta_amount": 19.36,
                      "ts": 1700267566788
                  }
              ],
              [
                  {
                      "from": "22:00",
                      "to": "23:59",
                      "break": "false",
                      "delta_amount": 12.3,
                      "ts": 1699316827567
                  },
                  {
                      "from": "00:00",
                      "to": "07:30",
                      "break": "false",
                      "delta_amount": 19.36,
                      "ts": 1700267566788
                  }
              ],
              [
                  {
                      "from": "22:00",
                      "to": "23:59",
                      "break": "false",
                      "delta_amount": 12.3,
                      "ts": 1699316827567
                  },
                  {
                      "from": "00:00",
                      "to": "07:30",
                      "break": "false",
                      "delta_amount": 19.36,
                      "ts": 1700267566788
                  }
              ],
              [
                  {
                      "from": "22:00",
                      "to": "23:59",
                      "break": "false",
                      "delta_amount": 12.3,
                      "ts": 1699316827567
                  },
                  {
                      "from": "00:00",
                      "to": "07:30",
                      "break": "false",
                      "delta_amount": 19.36,
                      "ts": 1700267566788
                  }
              ],
              [
                  {
                      "from": "22:00",
                      "to": "23:59",
                      "break": "false",
                      "delta_amount": 12.3,
                      "ts": 1699316827567
                  },
                  {
                      "from": "00:00",
                      "to": "07:30",
                      "break": "false",
                      "delta_amount": 19.36,
                      "ts": 1700267566788
                  }
              ],
              [
                  {
                      "from": "22:00",
                      "to": "23:59",
                      "break": "false",
                      "delta_amount": 12.3,
                      "ts": 1699316827567
                  },
                  {
                      "from": "00:00",
                      "to": "07:30",
                      "break": "false",
                      "delta_amount": 19.36,
                      "ts": 1700267566788
                  }
              ]
          ],
          "vehicles": []
      },
      {
          "notice_time_hint": [
              [
                  {
                      "from": "00:00",
                      "to": "08:00",
                      "break": "false",
                      "delta_amount": 20,
                      "ts": 1701676018579
                  },
                  {
                      "from": "22:00",
                      "to": "23:59",
                      "break": "false",
                      "delta_amount": 20,
                      "ts": 1701676373669
                  }
              ],
              [
                  {
                      "from": "00:00",
                      "to": "08:00",
                      "break": "false",
                      "delta_amount": 20,
                      "ts": 1701676018579
                  },
                  {
                      "from": "22:00",
                      "to": "23:59",
                      "break": "false",
                      "delta_amount": 20,
                      "ts": 1701676373669
                  }
              ],
              [
                  {
                      "from": "00:00",
                      "to": "08:00",
                      "break": "false",
                      "delta_amount": 20,
                      "ts": 1701676018579
                  },
                  {
                      "from": "22:00",
                      "to": "23:59",
                      "break": "false",
                      "delta_amount": 20,
                      "ts": 1701676373669
                  }
              ],
              [
                  {
                      "from": "00:00",
                      "to": "08:00",
                      "break": "false",
                      "delta_amount": 20,
                      "ts": 1701676018579
                  },
                  {
                      "from": "22:00",
                      "to": "23:59",
                      "break": "false",
                      "delta_amount": 20,
                      "ts": 1701676373669
                  }
              ],
              [
                  {
                      "from": "00:00",
                      "to": "08:00",
                      "break": "false",
                      "delta_amount": 20,
                      "ts": 1701676018579
                  },
                  {
                      "from": "22:00",
                      "to": "23:59",
                      "break": "false",
                      "delta_amount": 20,
                      "ts": 1701676373669
                  }
              ],
              [
                  {
                      "from": "00:00",
                      "to": "08:00",
                      "break": "false",
                      "delta_amount": 20,
                      "ts": 1701676018579
                  },
                  {
                      "from": "22:00",
                      "to": "23:59",
                      "break": "false",
                      "delta_amount": 20,
                      "ts": 1701676373669
                  }
              ],
              [
                  {
                      "from": "00:00",
                      "to": "08:00",
                      "break": "false",
                      "delta_amount": 20,
                      "ts": 1701676018579
                  },
                  {
                      "from": "22:00",
                      "to": "23:59",
                      "break": "false",
                      "delta_amount": 20,
                      "ts": 1701676373669
                  }
              ]
          ],
          "vehicles": []
      },
      {
          "notice_time_hint": [
              [
                  {
                      "from": "00:00",
                      "to": "06:30",
                      "break": "false",
                      "delta_amount": 22.76,
                      "ts": 1701676061090
                  },
                  {
                      "from": "22:00",
                      "to": "23:59",
                      "break": "false",
                      "delta_amount": 22.76,
                      "ts": 1701676422103
                  }
              ],
              [
                  {
                      "from": "00:00",
                      "to": "06:30",
                      "break": "false",
                      "delta_amount": 22.76,
                      "ts": 1701676061090
                  },
                  {
                      "from": "22:00",
                      "to": "23:59",
                      "break": "false",
                      "delta_amount": 22.76,
                      "ts": 1701676422103
                  }
              ],
              [
                  {
                      "from": "00:00",
                      "to": "06:30",
                      "break": "false",
                      "delta_amount": 22.76,
                      "ts": 1701676061090
                  },
                  {
                      "from": "22:00",
                      "to": "23:59",
                      "break": "false",
                      "delta_amount": 22.76,
                      "ts": 1701676422103
                  }
              ],
              [
                  {
                      "from": "00:00",
                      "to": "06:30",
                      "break": "false",
                      "delta_amount": 22.76,
                      "ts": 1701676061090
                  },
                  {
                      "from": "22:00",
                      "to": "23:59",
                      "break": "false",
                      "delta_amount": 22.76,
                      "ts": 1701676422103
                  }
              ],
              [
                  {
                      "from": "00:00",
                      "to": "06:30",
                      "break": "false",
                      "delta_amount": 22.76,
                      "ts": 1701676061090
                  },
                  {
                      "from": "22:00",
                      "to": "23:59",
                      "break": "false",
                      "delta_amount": 22.76,
                      "ts": 1701676422103
                  }
              ],
              [
                  {
                      "from": "00:00",
                      "to": "06:30",
                      "break": "false",
                      "delta_amount": 22.76,
                      "ts": 1701676061090
                  },
                  {
                      "from": "22:00",
                      "to": "23:59",
                      "break": "false",
                      "delta_amount": 22.76,
                      "ts": 1701676422103
                  }
              ],
              [
                  {
                      "from": "00:00",
                      "to": "06:30",
                      "break": "false",
                      "delta_amount": 22.76,
                      "ts": 1701676061090
                  },
                  {
                      "from": "22:00",
                      "to": "23:59",
                      "break": "false",
                      "delta_amount": 22.76,
                      "ts": 1701676422103
                  }
              ]
          ],
          "vehicles": []
      }
  ],
  "hourly_pricing": {
      "min_amount": 600,
      "min_duration": 4,
      "currency": "USD",
      "ranges": [
          {
              "seq": 0,
              "amount": 20,
              "currency": "USD",
              "duration": 4,
              "from": 4,
              "to": 8
          },
          {
              "seq": 1,
              "amount": 40,
              "currency": "USD",
              "duration": 4,
              "from": 8,
              "to": 12
          }
      ]
  },
  "specific_date_surcharge": [
      {
          "from_date": "2024-03-01",
          "to_date": "2024-12-31",
          "currency": "USD",
          "vehicle_classes": [
              {
                  "vehicle_class_ids": [
                      1,
                      2,
                      4,
                      10,
                      5,
                      36,
                      12,
                      29,
                      7,
                      31,
                      32,
                      8,
                      30,
                      35,
                      33,
                      34,
                      9,
                      6,
                      3,
                      11
                  ],
                  "percent": 80,
                  "delta_amount": 0
              }
          ]
      },
      {
          "from_date": "2024-02-01",
          "to_date": "2024-02-29",
          "currency": "USD",
          "vehicle_classes": [
              {
                  "vehicle_class_ids": [
                      1,
                      3,
                      2,
                      5,
                      9,
                      10,
                      11,
                      36,
                      12,
                      7,
                      30,
                      8,
                      32,
                      33,
                      29,
                      31,
                      34,
                      35,
                      6,
                      4
                  ],
                  "percent": 50,
                  "delta_amount": 0
              }
          ]
      }
  ],
  "date_surcharge_method": "sum",
  "service_area_pricing_id": 108625,
  "req_id": "e42b9aec-a9f3-444c-86b4-94a20fbf6069",
  "tz": {
      "dos": 0,
      "ros": 32400,
      "tzid": "Asia/Tokyo"
  }
}
async function devTest() {
  ses = 'I0lb7VZv7z5EwzOKuJvLXQvO72LW49fMfnsf2ctN72zRil4l0kbWFwPYyWrAiA3R8CrR4dmHqOmt1mEJ0kLMIVAeWSUMovi5DAcqRcJtAVrWEjFBcOUMp5xH5VBz70bP';

  _d.ses = ses;

  svcUtils.loadCssList(['common.css', 'hourly-prices/index.css', 'svc_amenity.css', 'svc-com-template.css']);

  await svcUtils.loadJsList(['service_area_2nd.js', 'com-dropdown.js', 'com_partners.js', 'com_Dialog.js', 'com_vehicle.js']);

  await svcUtils.loadJsList(['com_currency_countries.js', 'svc_hereMap.js', 'svc_map.js', 'classManager.js']);

  addServiceAreaDetail = new AddServiceAreaDetail('add-service-area-detail');
  sidebarTabClasses.push(addServiceAreaDetail);

  serviceArea = testD;
  let { airports } = serviceArea;

  for (let airport of airports) {
    await airportCache(airport);
  }

  await _getVehicleList('USA');
  _d.fleet_id = 40

  curSvcAeaDetailClass = await amenity();
  await getLatestServiceArea()
  
  // let curClass = await vehiclesPricing();
  let curClass = await svcPartnerEdit()
  curClass.show()


}

// devTest();
