


async function _getVehicleList(countryCode, isReflash = false) {

    let curVehicleList = _d['vehicleList'][countryCode]

    if (curVehicleList && !isReflash) {
        return curVehicleList
    } else {
        let url = api[stage].sqlTemplatesRun_3 + '?ses=' + ses
        let d = {
            sql: 134678012,
            version: '1.2',
            country_code: countryCode
        }
        let res = await postData(url, d, 'get vehicle list')
        let txtIdList = []
        for (let vehicle of res.results) {
            let { model_txt_id, maker_txt_id } = vehicle
            if (model_txt_id) {
                txtIdList.push(model_txt_id)
            }
            if (maker_txt_id) {
                txtIdList.push(maker_txt_id)
            }
        }
        let mnmRes = {}

        if (txtIdList.length) {
            mnmRes = await postData(url, {
                sql: 134678021,
                version: '1.0',
                txt_id_list: txtIdList.join(',')
            }, 'get maker and model ')
        }


        let langList = mnmRes.results || []

        for (let vehicle of res.results) {
            let { model_txt_id, maker_txt_id, o_maker, o_model } = vehicle

            let list = langList.filter(item => item.txt_id == model_txt_id || item.txt_id == maker_txt_id)
            // let arr = []
            let lang = {
                eng: {
                    maker: o_maker,
                    model: o_model,
                }
            }
            for (let langObj of list) {
                let { nat_lang, txt, txt_id } = langObj
                let prefix = 'maker'
                if (txt_id == model_txt_id) {
                    prefix = 'model'
                }
                if (!lang[nat_lang]) {
                    lang[nat_lang] = {}
                }
                if (txt) {
                    lang[nat_lang][prefix] = txt
                }
            }

            for (let [key, value] of Object.entries(lang)) {
                if (JSON.stringify(value) == '{}') {
                    delete lang[key]
                }
            }
            vehicle['lang'] = lang
        }

        // console.log(res.results);
        _d['vehicleList'][countryCode] = res.results
        return res.results
    }
}

function _filtSelectVehicles(selectVehicle) {
    let list = []
    let { vehicleList: vList, countryCode } = _d
    list = vList[countryCode].filter(item => selectVehicle.findIndex(o => o.vehicle_class_id == item.vehicle_id) != -1)

    list.forEach(item => {
        let localVehicleData = vehicleClasses.find(obj => obj.id == item.vehicle_id)
        if (localVehicleData) {
            item['carType'] = localVehicleData.carType || 3
        } else {
            item['carType'] = 3
        }
    })
    return list
}

// let  vehicleIds = [
// 	1, 41, 2, 42, 40, 43, 44, 45, 46, 47, 6, 3, 48, 49, 4, 36, 52, 50, 21, 22, 23, 24, 27, 25, 26, 28, 5, 9, 10, 11, 51, 56, 57, 29, 30, 31, 32, 33, 34, 35, 58, 59, 60, 61, 62, 63, 64
// ]

let vehicleIds = [
    1, 41, 2, 42, 40, 18, 43, 44, 45, 46, 47, 6, 3, 7, 48, 49, 4, 20, 36, 52, 19, 50, 21, 22, 23, 24, 27, 25, 26, 28, 8, 5, 9, 10, 11, 51, 56, 57, 29, 30, 31, 32, 38, 33, 37, 39, 34, 35, 58, 59, 60, 61, 62, 63, 64
]

// let ids = [1, 41, 42, 2, 43, 40, 44, 45, 46, 47, 18, 6, 19, 3, 7, 20, 48, 49, 4, 36, 50, 51, 52, 21, 22, 23, 24, 27, 25, 26, 28, 8, 5, 9, 37, 10, 38, 11, 56, 39, 57, 29, 30, 31, 32, 33, 34, 35, 58, 59, 60, 61, 62, 63, 64, 99]



function _isInViewPort(elm, root) {
    return new Promise((resolve, reject) => {
        let options = {
            root,
            rootMargin: '0px',
            threshold: 1.0
        }
        let callback = (entries, observer) => {
            entries.forEach(entry => {
                resolve(entry.isIntersecting)
                // Each entry describes an intersection change for one observed target element:
                // entry.boundingClientRect
                // entry.intersectionRatio
                // entry.intersectionRect
                // entry.isIntersecting
                // entry.rootBounds
                // entry.target
                // entry.time
            });
        };
        let observer = new IntersectionObserver(callback, options);
        observer.observe(elm);

    })
}

async function changeAirport() {
    let flag = false
    let { name, radius, lat, lng } = serviceArea.serviceArea
    let { airports, service_area_pricing_id } = serviceArea
    let serviceAreaAirportsData = {
        name,
        radius,
        lat,
        lng,
        airports,
    };
    console.log('airports', airports);

    let url
    let jsonId = 0
    // if is existed service area,use put;else use post
    // if (isExistedServiceArea) { // if it is a old service area,do put;if it is a new one,do post
    if (!_d.isAddServiceAreaState) { // if it is a old service area,do put;if it is a new one,do post
        serviceAreaAirportsData['service_area_pricing_id'] = service_area_pricing_id
        url = api[stage].serviceAreaByAirport + '/id'
        let query = {
            service_area_id: objNumGetByKeys(serviceArea, 'serviceArea.id')
        }
        let { code, res } = await svcUtils.put(url, serviceAreaAirportsData, 'service area airports put', query)
        if (code == 0) {
            flag = true
            jsonId = res.service_area_pricing_id || 0
        }
    } else {
        let url = api[stage].serviceAreaByAirport
        let { code, res } = await svcUtils.post(url, serviceAreaAirportsData, 'service area airports post')
        if (code != -1) {
            flag = true
            _d.isAddServiceAreaState = false
            serviceArea.serviceArea.id = res.service_area.id;
        }
    }

    serviceArea['service_area_pricing_id'] = jsonId
    return flag
}

// sort - Show selected data first
function sortVehicleListHandler(list, checkedList) {
    if (!checkedList) return list;
    let arr = JSON.parse(JSON.stringify(list));
    function compare(a, b) {
        let aSelected = checkedList.some((obj) => obj.vehicle_class_id === a.vehicle_id);
        let bSelected = checkedList.some((obj) => obj.vehicle_class_id === b.vehicle_id);

        if (aSelected && !bSelected) {
            return -1;
        } else if (!aSelected && bSelected) {
            return 1;
        } else {
            return 0;
        }
    }
    return arr.sort(compare);
}

function getStandardDateTime() {
    let date = new Date()
    let t = date.toLocaleString('zh-CN')
    let arr = t.split(' ')
    let dateArr = arr[0].split('/')
    let [y, m, d] = dateArr
    if (m < 10) {
        m = `0${m}`
    }
    if (d < 10) {
        d = `0${d}`
    }
    let str = `${y}-${m}-${d} ${arr[1]}`
    return str
}

