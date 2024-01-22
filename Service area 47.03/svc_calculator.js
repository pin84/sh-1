class Calculator {
    vehicleList = []
    constructor(id) {
        this.rootElm = document.getElementById(id)
        this.isShowCalculator = false
        this.distance = 0
        this.duration = 3 * 60;
        this.isDis = 0;
        this.warnIndex = 0
        this.warnElmList = []

        this.downloadVehicleList = null
        this.creatType = 1
        // this.initData()
        this.initElms()

        this.initUi()
        this.handleKeyDown = this.handleKeyDown.bind(this);
        this.drawerRootElm = document.getElementById('status-drawer-container')
        this.downloadJsonData = null
        this.downloadRequestId = null
        this.downloadQuoteId = null
        this.isRepeated = false
        this._ComLoading = new ComLoading()
        this.lastTimeParams = null
        this.transferType = 1

        this.selectPartner = null
        this.partnerId = 0

        this.caleTimeout = 0
        this.interval = null

        this.isExchange = false

        this.from = {}
        this.to = {}
        this.fromDate = ''
        this.fromHour = ''
        this.fromMinute = ''

    }


    initUi() {
        let kTestBox = this.rootElm.querySelector('.k-text-box')
        this.kDateInput = kTestBox.querySelector('.k-text-input')
        let kTestSubmit = kTestBox.querySelector('.k-text-submit')
        kTestSubmit.addEventListener('click', () => {
            this.fromDate = this.kDateInput.value
        })
        let kHoursBox = this.rootElm.querySelector('.k-hours-box')
        this.kHoursInput = kHoursBox.querySelector('.k-text-input')
        let kHoursSubmit = kHoursBox.querySelector('.k-submit')
        kHoursSubmit.addEventListener('click', () => {
            this.fromHour.value = this.kHoursInput.value
        })

        let kMinuteBox = this.rootElm.querySelector('.k-minute-box')
        this.kMinuteInput = kMinuteBox.querySelector('.k-text-input')
        let kMinuteSubmit = kMinuteBox.querySelector('.k-submit')
        kMinuteSubmit.addEventListener('click', () => {
            this.fromMinute.value = this.kMinuteInput.value
        })

        let calcSwitchBtn = this.rootElm.querySelector('.calc-switch-box')
        this.calcInfoWwitchBox = this.rootElm.querySelector('.calc-info-switch-box')
        this.calcInfoWwitchBox2 = this.rootElm.querySelector('.calc-info-switch-box-2')
        calcSwitchBtn.addEventListener('click', () => {
            this.calcInfoWwitchBox.style.display = ''
            this.calcInfoWwitchBox2.style.display = 'none'
        })


        this.saveBtn = this.rootElm.querySelector('.save-input')
        this.saveBtn.addEventListener('click', async () => {
            if (this.saveBtn.classList.contains('not-allowed')) return
            (await savePage()).show()
        })

        this.exchange = this.rootElm.querySelector('.exchange')
        this.exchange.addEventListener('click', () => {
            this.changeAddr()
        })

        let fromInput = this.rootElm.querySelector('.from-place')
        // fromInput.addEventListener('change',()=>{
        //     console.log('change');
        //     // if(fromInput.value == ''){
        //         this.from = {}
        //     // }
        // })
        this.fromAC = new addrTextAutoComp(fromInput, (item) => {
            this.from = item
            this.showLocalTime(item)
            console.log(item);
        })

        let toInput = this.rootElm.querySelector('.to-place')
        // toInput.addEventListener('change',()=>{
        //     // if(toInput.value == ''){
        //         this.to = {}
        //     // }
        // })
        this.toAC = new addrTextAutoComp(toInput, (item) => {
            this.to = item
            console.log(item);
        })

        this.calFromDateInput = this.rootElm.querySelector('#cal-from-date')
        let calendar = new Calendar(this.calFromDateInput, (y, m, d) => {
            m += 1
            if (m < 10) {
                m = `0${m}`
            }
            if (d < 10) {
                d = `0${d}`
            }

            this.fromDate = `${y}-${m}-${d}`
            console.log(y, m, d);
        })

        this.fromHourInput = this.rootElm.querySelector('.from-hour')
        let hourAC = new TextAutoComp(this.fromHourInput, {
            str: (item) => {
                return [item]
            },
            sel: (item) => {
                if (item) {
                    this.fromHour = item
                    if (this.fromMinuteInput.value == '') {
                        this.fromMinute = '00'
                        this.fromMinuteInput.value = '00'
                    }

                }
            }
        })
        let hours = []
        for (let h = 0; h < 24; h++) {
            hours.push(h.toString().padStart(2, 0))
        }
        hourAC.filter = false
        hourAC.setItems(hours)

        this.fromMinuteInput = this.rootElm.querySelector('.from-minute')
        let minuteAc = new TextAutoComp(this.fromMinuteInput, {
            str: (item) => {
                return [item]
            },
            sel: (item) => {
                if (item) {
                    this.fromMinute = item
                }
            }

        })
        let minuts = []
        for (let h = 0; h < 60; h += 5) {
            minuts.push(h.toString().padStart(2, 0))
        }
        minuteAc.filter = false
        minuteAc.setItems(minuts)
    }


    async showLocalTime(obj) {
        let { lat, lng } = obj
        if (!lat || !lng) return
        let dateStr = getStandardDateTime()
        let url = `${api[stage].maps}/timezones/location/date-time?loc=${lat},${lng}&dt=${dateStr}`
        let res = await svcUtils.fetchData({ url, isShowLoading: false })
        let { utc, timezone: { dstOffset, rawOffset, timeZoneId, timeZoneName } } = res
        showLocalDateTime(rawOffset, dstOffset, this.fromPlaceLocalTimeBox);
        showLocalDateTime(rawOffset, dstOffset, this.calcLocalTimeBox);
    }


    changeAddr() {
        this.isExchange = !this.isExchange
        let fv = this.fromPlace.value
        let tv = this.toPlace.value
        this.fromPlace.value = tv
        this.toPlace.value = fv

        let tem = this.to
        this.to = this.from
        this.from = tem

        this.exchange.classList.toggle('rotate')
    }

    async initElms() {
        var it = this;
        it.fromPlaceBox = elmOfIdRel('from-place-box', it.rootElm);
        it.toPlaceBox = elmOfIdRel('to-place-box', it.rootElm);
        it.dateTimeBox = elmOfIdRel('date-time-box', it.rootElm);

        it.distanceBox = elmOfIdRel('distance-box', it.rootElm);
        it.distanceFld = elmOfIdRel('distance-fld', it.rootElm);
        it.timeFld = elmOfIdRel('time-fld', it.rootElm);
        it.timeFld.innerText = ''

        it.fromPlace = elmOfIdRel('from-place', it.rootElm);


        it.toPlace = elmOfIdRel('to-place', it.rootElm);
        it.fromTimezone = elmOfIdRel('from-timezone', it.rootElm);
        it.fromDaylight = elmOfIdRel('from-daylight', it.rootElm);
        it.fromPlaceLocalTimeBox = elmOfIdRel('from-place-local-time-box', it.rootElm);
        it.calcLocalTimeBox = elmOfIdRel('calc-local-time', it.rootElm);


        it.calcBtn = elmOfIdRel('calc-loading-box', it.rootElm);
        it.calcBtn.onclick = async () => {
            if (this.caleTimeout) return
            this.caleTimeout = 5
            this.interval = setInterval(() => {
                this.caleTimeout--
                if (this.caleTimeout <= 0) {
                    clearInterval(this.interval)
                }

            }, 1000)

            let { countryCode, currencyCode } = serviceArea
            if (!countryCode || !currencyCode) {
                await svcUtils.msgBox({
                    msg: 'Missing required parameters'
                })
                return
            }

            if (!serviceArea.serviceArea.id) {
                serviceArea.serviceArea.id = 0
            }
            if (!curSvcAeaDetailClass.validate()) {
                return
            }
            if (curSvcAeaDetailClass) {
                curSvcAeaDetailClass.pour(serviceArea, 'calc');
            }
            if (it.isDis) {
                it.comDropdownHourly.set(it.duration / 60)
            }
            let filterVehicleInput = it.rootElm.querySelector('#filter-vehicle')
            filterVehicleInput.value = 'ALL'
            it.combinaData()
            it.noticeTimeHintConvert();


            let flag = JSON.stringify(this.from) != '{}' && JSON.stringify(this.to) != '{}'
            if (this.isDis == 1 && JSON.stringify(this.from) != '{}') {
                it.calcPrice()
            } else if (flag) {
                it.calcPrice()
            } else if (JSON.stringify(this.from) == '{}' && JSON.stringify(this.to) == '{}' && serviceArea.zones && serviceArea.zones.length) {
                it.circularPrice()
            } else {
                return showErr('Incalculable')
            }
            it.switchCalcInfoBox()
        }
        it.calculateTypeBtnClick()

        this.toDownArrow = this.rootElm.querySelector('.to-down-arrow')
        this.toDownArrow.addEventListener('click', () => {
            this.toWarnPosition()

        })



        it.filterVehicleBtn = elmOfIdRel('filter-vehicle', it.rootElm);
        it.filterVehicle = new TextAutoComp(it.filterVehicleBtn, {
            str: (item) => {
                return [item.name];
            },
            sel: async (item, hovElm) => {
                if (item) {
                    let percentage = 0
                    switch (item.type) {
                        case 1:
                            percentage = 0
                            break;
                        case 2:
                            percentage = 5
                            break;
                        case 3:
                            percentage = 10
                            break;
                        case 4:
                            percentage = 20
                            break;
                    }
                    if (it.calcFormCheck()) {

                        console.log(it.vehicleList);


                        let newVehicleList = it.vehicleList.filter((vitem, index) => {
                            if (!vitem.amount || !vitem.elifePrice) return true
                            return it.calculatePercentageDifference(vitem.amount, vitem.elifePrice) >= percentage
                        })
                        console.log('newVehicleList-1', newVehicleList);
                        it.createFormElms(newVehicleList)
                    } else {
                        let newVehicleList = it.vehicleList.filter((vitem) => {
                            if (!vitem['Price'] || !vitem['Elife Price']) return true
                            return it.compareObjects(vitem.Price, vitem['Elife Price'], percentage, item.type)
                        })
                        console.log('newVehicleList-2', newVehicleList);
                        it.createFormElms(newVehicleList)
                    }
                }
            }
        });
        let percentages = [{ name: 'ALL', type: 1 }, { name: '≥5%', type: 2 }, { name: '≥10%', type: 3 }, { name: '≥20%', type: 4 }]
        it.filterVehicle.setItems(percentages)
        it.filterVehicle.filter = false

        it.svcFullScreenTableBox = document.getElementById('svc-full-screen-table')
        it.fullScreenExitBtn = it.svcFullScreenTableBox.querySelector('.full-table-exit-btn')
        it.fullScreenExitBtn.addEventListener('click', () => {
            it.svcFullScreenTableBox.classList.add('hide')
            this.rootElm.querySelector('#filter-vehicle').value = document.querySelector('#full-filter-vehicle').value
        })
        it.fullScreenDownloadBtn = it.svcFullScreenTableBox.querySelector('.full-table-download-btn')
        it.fullScreenDownloadBtn.addEventListener('click', () => {
            it.downloadVehicleListFun()
        })
        it.fullScreenTabContent = it.svcFullScreenTableBox.querySelector('.full-screen-tab-content')
        it.goFullTableBtn = it.rootElm.querySelector('.go-full-table-btn')
        it.goFullTableBtn.addEventListener('click', () => {
            window.addEventListener('keydown', this.handleKeyDown);
            let cFilterVehicleBox = it.rootElm.querySelector('.filter-vehicle-box').cloneNode(true)
            let fullFilterVehicleBtn = cFilterVehicleBox.querySelector('.control-value')
            fullFilterVehicleBtn.id = 'full-filter-vehicle'
            cFilterVehicleBox.querySelector('.show-result').id = 'full-show-result'
            let cNestExportBox = it.rootElm.querySelector('.nest-export-box').cloneNode(true)
            cNestExportBox.querySelector('.export-template').id = 'full-export-template'
            let fragment = document.createDocumentFragment()
            fragment.appendChild(cFilterVehicleBox)
            fragment.appendChild(cNestExportBox)
            it.fullScreenTabContent.innerHTML = ''
            it.fullScreenTabContent.appendChild(fragment)
            it.svcFullScreenTableBox.classList.remove('hide')

            it.fullFilterVehicle = new TextAutoComp(fullFilterVehicleBtn, {
                str: (item) => {
                    return [item.name];
                },
                sel: async (item, hovElm) => {
                    if (item) {
                        let percentage = 0
                        switch (item.type) {
                            case 1:
                                percentage = 0
                                break;
                            case 2:
                                percentage = 5
                                break;
                            case 3:
                                percentage = 10
                                break;
                            case 4:
                                percentage = 20
                                break;
                        }
                        if (it.calcFormCheck()) {
                            console.log(it.vehicleList);
                            let newVehicleList = it.vehicleList.filter((vitem, index) => {
                                if (!vitem.amount || !vitem.elifePrice) return true
                                return it.calculatePercentageDifference(vitem.amount, vitem.elifePrice) >= percentage
                            })
                            console.log('newVehicleList-1', newVehicleList);
                            it.createFormElms(newVehicleList, true)
                        } else {
                            let newVehicleList = it.vehicleList.filter((vitem) => {
                                if (!vitem['Price'] || !vitem['Elife Price']) return true
                                return it.compareObjects(vitem.Price, vitem['Elife Price'], percentage, item.type)
                            })
                            console.log('newVehicleList-2', newVehicleList);
                            it.createFormElms(newVehicleList, true)
                        }
                    }
                }
            });
            let percentages = [{ name: 'ALL', type: 1 }, { name: '≥5%', type: 2 }, { name: '≥10%', type: 3 }, { name: '≥20%', type: 4 }]
            it.fullFilterVehicle.setItems(percentages)
            it.fullFilterVehicle.filter = false

        })
        it.statusDetailsBtn = it.rootElm.querySelector('.status-details')

        it.statusDrawerContainer = document.getElementById('status-drawer-container')

        it.statusOverlay = document.querySelector('.status-overlay')
        it.drawerContent = it.statusDrawerContainer.querySelector('.drawer-content')
        it.drawerHeaderTitle = it.statusDrawerContainer.querySelector('.drawer-header-title')
        it.drawerHeaderIcon = it.statusDrawerContainer.querySelector('.left-icon')

        it.drawerDownload = it.statusDrawerContainer.querySelector('.drawer-header-download')

        it.statusDetailsBtn.addEventListener('click', () => {
            if (this.from.lat && this.to.lat) {
                it.initStatusDrawer()
            } else {
                showErr('Please enter required infomation');
            }

        })

        it.drawerHeaderIcon.addEventListener('click', () => {
            it.drawerHeaderIcon.classList.add('hide')
            it.drawerHeaderTitle.innerText = 'Call Details'
            it.drawerContent.classList.remove('next-page')
        })


        it.statusOverlay.addEventListener('click', () => {
            if (it.statusOverlay.classList.contains('calculatorDrawer')) {
                it.statusDrawerContainer.classList.remove('status-drawer-container-show')
                it.statusDrawerContainer.querySelector('.drawer-content').classList.remove('next-page')
                it.statusOverlay.classList.remove('status-overlay-show')
                it.statusOverlay.classList.remove('calculatorDrawer')
                it.drawerHeaderIcon.classList.add('hide')
                it.drawerHeaderTitle.innerText = 'Call Details'
            }
        })

        setTimeout(() => {
            it.initPartnerDropdown()
        }, 500)
    }

    handleBlurEvent = (ele) => {
        const reg = /^(-?\d{1,2}\.\d+?),\s*(-?1[0-7]\d\.\d+)$/; // Calibrate latitude and longitude
        ele.addEventListener('blur', () => {
            if (reg.test(ele.value)) {
                dataOfElm(ele).lat = this.dealLatOrLng(ele.value)[0].trim();
                dataOfElm(ele).lng = this.dealLatOrLng(ele.value)[1].trim();
                dataOfElm(ele).placeInput = ele.value
            }
            if (!dataOfElm(ele).lat) {
                ele.value = '';
                this.distanceFld.innerHTML = '';
                this.timeFld.innerText = '';
            }
        })
    }

    dealLatOrLng(eleValue) {
        let list = []
        if (eleValue.includes(',')) {
            list = eleValue.split(',')
        } else if (eleValue.includes(' ')) {
            list = eleValue.split(' ')
        }
        return list
    }

    async initStatusDrawer() {
        let it = this
        let detailsPartnerName = this.drawerRootElm.querySelector('.details-partner-name')
        let detailsPartnerFrom = this.drawerRootElm.querySelector('.details-partner-from')
        let detailsPartnerTo = this.drawerRootElm.querySelector('.details-partner-to')
        let detailsPartnerCity = this.drawerRootElm.querySelector('.details-partner-city')
        let partenerName = this.selectPartner?.partner_name || ''
        detailsPartnerName.innerText = `${this.partnerId}-${partenerName}`
        detailsPartnerFrom.innerText = dataOfElm(this.fromPlace).placeInput
        detailsPartnerTo.innerText = dataOfElm(this.toPlace).placeInput
        detailsPartnerCity.innerText = serviceArea?.serviceArea?.name || ''

        this._ComLoading.show('loading')

        let from_lat = this.from.lat
        let from_lng = this.from.lng
        let to_lat = this.to.lat
        let to_lng = this.to.lng

        // get fcall history data
        let url = api[stage].callHistory
        let params = {
            ses,
            from_lat,
            from_lng,
            to_lat,
            to_lng,
            limit: 20,
            time_limit: 12,
            time_limit_unit: 'hour',
            partner_id: this.partnerId,
        }
        if (it.checkRequestParams(this.lastTimeParams, params)) {
            it._ComLoading.hidden()
            it.statusDrawerContainer.classList.add('status-drawer-container-show')
            it.statusOverlay.classList.add('status-overlay-show')
            it.statusOverlay.classList.add('calculatorDrawer')
            return
        }
        let { res, code } = await svcUtils.get(url, params, 'get call history data')
        if (code != 0) {
            it._ComLoading.hidden()
            return
        }
        this.lastTimeParams = params
        console.log('get call history data====', res)
        // it.createCallList(res.data)
        it._ComLoading.hidden()
        it.statusDrawerContainer.classList.add('status-drawer-container-show')
        it.statusOverlay.classList.add('status-overlay-show')
        it.statusOverlay.classList.add('calculatorDrawer')


        // it.drawerDownload.classList.remove('hide')

        // it.drawerDownload.onclick = () => {
        //     let time = new Date().getTime();
        //     this.downloadQuote(res.data, `${partnerId}-${partenerName}-${time}`)
        //     console.log('drawerDownload click')
        // }
    }

    downloadQuote(list, name) {
        if (!list && !list.length) return
        let header = ['request_time', 'time', 'return_time', 'time_local', 'return_time_local', 'offset', 'from', 'to', 'from_fleet_id', 'partner_id', 'currency', 'number_of_passengers', 'number_of_luggages', 'request_id', 'vehicle_classes', 'meet_and_greet', 'service_area_id', 'request_id_1', 'quote_id', 'request_time_1', 'currency_1']
        let jsonData = [];
        const from = dataOfElm(this.fromPlace).placeInput
        const to = dataOfElm(this.toPlace).placeInput
        let current = {}
        for (let i = 0; i < list.length; i++) {
            const currentFrom = list[i].from.name;
            const currentTo = list[i].from.to;
            if (currentFrom == from && currentTo == to) {
                current = list[i]
                break
            } else if (currentFrom == from) {
                current = list[i]
                break
            } else if (currentFrom == to) {
                current = list[i]
                break
            }
        }
        console.log(from, dataOfElm(this.fromPlace), to, dataOfElm(this.toPlace), current);
        jsonData.push([
            current.request_time || '',
            current.time || '',
            current.return_time || '',
            current.time_local || '',
            current.offset || '',
            current.from || '',
            current.to || '',
            current.from_fleet_id || '',
            current.partner_id || '',
            current.currency || '',
            current.number_of_passengers || '',
            current.number_of_luggages || '',
            current.request_id || '',
            current.vehicle_classes || '',
            current.meet_and_greet || '',
            current.service_area_id || '',
            current.request_id || '',
            current.quote_id || '',
            current.request_time_1 || '',
            current.currency || ''
        ])
        this.exportQuote(header, jsonData, name)
    }

    exportQuote(title, jsonData, name) {
        let str = ``;
        for (let i of title) {
            str += i + ',';
        }
        str += '\n';
        for (let item of jsonData) {
            for (let el in item) {
                str += `${item[el] + '\t'},`;
            }
            str += '\n';
        }
        // console.log('str-----', str);
        const url = 'data:text/csv;charset=utf-8,\ufeff' + encodeURIComponent(str);
        const link = document.createElement('a');
        link.href = url;
        link.download = name + '.csv';
        link.click();
    }

    checkRequestParams(obj1, obj2) {
        if (!obj1) {
            return false;
        }
        const keys1 = Object.keys(obj1);
        const keys2 = Object.keys(obj2);
        if (keys1.length !== keys2.length) {
            return false;
        }
        for (let key of keys1) {
            if (obj1[key] !== obj2[key]) {
                return false;
            }
        }
        return true;
    }

    createCallList(data) {
        let it = this
        this.callListBox = this.drawerRootElm.querySelector('.call-list-box')
        this.downloadJsonBox = this.drawerRootElm.querySelector('.download-json-box')
        this.callDetailsCopy = this.drawerRootElm.querySelector('.call-details-copy')
        this.callDetailsDownload = this.drawerRootElm.querySelector('.call-details-download')
        this.closeFlag = false
        let template = this.drawerRootElm.querySelector('.call-item-box-template').cloneNode(true)
        let fragment = document.createDocumentFragment()

        template.classList.remove('hide')
        template.classList.remove('call-item-box-template')

        for (let obj of data) {
            let cTemplate = template.cloneNode(true)
            cTemplate.setAttribute('request-id', obj.request_id)
            let { vehicle_classes, time_local, request_time } = obj
            let samplePrives = cTemplate.querySelectorAll('.sample-v-prive'),
                carTimeInfo = cTemplate.querySelector('.car-time-info'),
                requestTime = cTemplate.querySelector('.request-time'),
                quoteStatusBox = cTemplate.querySelector('.quote-status'),
                itemRequestStatusBox = cTemplate.querySelector('.item-request-status-box')

            const priceIds = [1, 6, 5]
            const filteredData = vehicle_classes.filter(item => priceIds.includes(item.vehicle_class_id));

            priceIds.forEach((item, i) => {
                samplePrives[i].innerText = '$ -'
                filteredData.forEach(fil => {
                    if (item == fil.vehicle_class_id) {
                        samplePrives[i].innerText = `$${fil.price.amount_usd}`
                    }
                })
            })

            let moreVehicleBtn = cTemplate.querySelector('.more-vehicle-btn')
            moreVehicleBtn.addEventListener('click', () => {
                this.initCallNextpage(vehicle_classes)
            })

            itemRequestStatusBox.addEventListener('mouseenter', e => {
                this.closeFlag = true
                this.statusBoxHover(e, itemRequestStatusBox, obj)
            })
            itemRequestStatusBox.addEventListener('mouseleave', () => {
                this.closeFlag = false
                this.statusBoxClose()
            })
            this.downloadJsonBox.addEventListener('mouseenter', () => {
                this.closeFlag = true
                this.downloadJsonBox.classList.remove('hide')
            })
            this.downloadJsonBox.addEventListener('mouseleave', () => {
                this.closeFlag = false
                this.downloadJsonBox.classList.add('hide')
            })

            carTimeInfo.innerText = 'Car Time(UTC):' + time_local
            requestTime.innerText = 'Request Time(UTC):' + it.timeFormatConversion(request_time)

            if (vehicle_classes.length) {
                quoteStatusBox.classList.remove('quote-status-warn')
            } else {
                quoteStatusBox.classList.add('quote-status-warn')
            }

            fragment.appendChild(cTemplate)
        }
        this.callListBox.innerHTML = ''
        this.callListBox.appendChild(fragment)

        this.callDetailsCopy.addEventListener('click', async () => {
            let data = await this.getCallRawData(this.downloadJsonData)
            if (!data) return
            this.isRepeated = true
            var textarea = document.createElement('textarea');
            textarea.value = JSON.stringify(data);
            document.body.appendChild(textarea);
            textarea.select();
            document.execCommand('copy');
            document.body.removeChild(textarea);
            svcUtils.toast({
                tips: 'copy success'
            })
        })

        this.callDetailsDownload.addEventListener('click', async () => {
            let data = await this.getCallRawData(this.downloadJsonData)
            if (!data) return
            this.isRepeated = true
            var blob = new Blob([JSON.stringify(data)], { type: 'application/json' });
            var downloadLink = document.createElement('a');
            downloadLink.href = URL.createObjectURL(blob);
            downloadLink.download = 'R&Q.json';
            downloadLink.click();
        })
    }

    async getCallRawData(data) {
        if (this.isRepeated) return this.callRawData

        this._ComLoading.show('loading')

        let url = api[stage].callRawData,
            { request_time, request_id, quote_id } = data
        let params = {
            date: this.timeFormatConversion(request_time, true),
            request_id,
            quote_id
            // date: '2023-08-01',
            // request_id: '001825b83e47406eb9bd62f5c1ad29e0-1691484282',
            // quote_id: '6eff54c593184cdbbca3cdb89914fbca'
        }

        let { res, code } = await svcUtils.get(url, params, 'get call history data')
        if (code != 0) {
            this._ComLoading.hidden()
            return false
        }
        this.callRawData = res
        console.log('---------res-------', res);
        this._ComLoading.hidden()
        return res
    }

    timeFormatConversion(timestamp, onlyDaily) {
        const date = new Date(timestamp * 1000);
        const [year, month, day, hour, minute, second] = [
            date.getFullYear(),
            String(date.getMonth() + 1).padStart(2, '0'),
            String(date.getDate()).padStart(2, '0'),
            String(date.getHours()).padStart(2, '0'),
            String(date.getMinutes()).padStart(2, '0'),
            String(date.getSeconds()).padStart(2, '0')
        ];
        if (onlyDaily) {
            return `${year}-${month}-${day}`;
        } else {
            return `${year}-${month}-${day} ${hour}:${minute}:${second}`;
        }
    }

    initCallNextpage(vehicle_classes) {
        // to do ...
        // Find the vehicle with the corresponding ID in _d["vehicleList"] and get the name
        let vehicleClasses = this.findVehicleName(vehicle_classes)

        let callCehicleListBox = this.drawerRootElm.querySelector('.call-vehicle-list-box')
        let template = this.drawerRootElm.querySelector('.call-vehicle-item-box-template').cloneNode(true)
        template.classList.remove('hide')
        template.classList.remove('call-vehicle-item-box-template')
        let fragment = document.createDocumentFragment()
        for (let obj of vehicleClasses) {
            let cTemplate = template.cloneNode(true)
            let spans = cTemplate.querySelectorAll('span')
            spans[0].innerText = `${obj?.vehicle_name || ' - '}(${obj?.vehicle_class_id || '-'})`
            spans[1].innerText = `$${obj?.price?.amount_usd || ' - '}`
            fragment.appendChild(cTemplate)
        }
        callCehicleListBox.innerHTML = ''
        callCehicleListBox.appendChild(fragment)
        this.drawerHeaderIcon.classList.remove('hide')
        this.drawerHeaderTitle.innerText = 'Vehicle Details'
        this.drawerContent.classList.add('next-page')
    }

    findVehicleName(vehicle_classes) {
        let { countryCode } = serviceArea,
            vehicleList = _d.vehicleList[countryCode]

        for (let i = 0; i < vehicle_classes.length; i++) {
            vehicle_classes[i].vehicle_name = '-'
            for (let j = 0; j < vehicleList.length; j++) {
                if (vehicle_classes[i].vehicle_class_id === vehicleList[j].vehicle_id) {
                    vehicle_classes[i].vehicle_name = vehicleList[j].vehicle_name;
                    break;
                }
            }
        }
        return vehicle_classes
    }

    statusBoxHover(e, box, jsonData) {
        this.downloadJsonData = jsonData
        this.downloadRequestId = jsonData.request_id
        this.downloadQuoteId = jsonData.quote_id
        this.isRepeated = false
        let target = e.target,
            requestId = target.getAttribute('request-id'),
            rect = box.getBoundingClientRect(),
            top = rect.top,
            left = rect.left,
            boxY = top + 30,
            remainingSpace = window.innerHeight - (top + 30 + 92)

        if (remainingSpace < 0) {
            boxY = top - 10 - 92
        }

        this.downloadJsonBox.style.top = boxY + 'px'
        this.downloadJsonBox.style.left = (left - 30) + 'px'
        this.downloadJsonBox.classList.remove('hide')
        e.stopPropagation()
    }
    statusBoxClose() {
        if (this.closeFlag) return
        setTimeout(() => {
            if (!this.closeFlag) {
                this.downloadJsonBox.classList.add('hide')
            }
        }, 1000);
    }

    async initPartnerDropdown() {
        let it = this
        it.partnerSelectBtn = elmOfIdRel('pertner-select-box', it.rootElm);
        it.partnerSelect = new TextAutoComp(it.partnerSelectBtn, {
            str: (item) => {
                return [item.partner_id, item.partner_name];
            },

            sel: async (item, hovElm) => {
                if (item) {
                    console.log(item);
                    let { partner_id } = item
                    this.partnerId = partner_id || 0
                    it.selectPartner = item
                }
            }
        });
        let partnerList = await calc_partnerCache_fn().get()

        partnerList.unshift({ partner_id: 0, partner_name: 'none' })

        it.partnerSelect.setItems(partnerList)
        it.partnerSelect.filter = false

        it.selectTransferInput = elmOfIdRel('select-transfer-input', it.rootElm);
        it.selectTransfer = new TextAutoComp(it.selectTransferInput, {
            str: (item) => {
                return [item.name];
            },

            sel: async (item, hovElm) => {
                if (item) {
                    it.transferType = item.type
                }
            }
        });
        let transferTypes = [{ name: 'Pick up', type: 1 }, { name: 'Drop off', type: 2 }]
        it.selectTransfer.setItems(transferTypes)
        it.selectTransfer.filter = false
    }

    handleKeyDown(event) {
        if (event.keyCode === 27 || event.key === 'Escape') {
            console.log('-----esc------');
            this.rootElm.querySelector('#filter-vehicle').value = document.querySelector('#full-filter-vehicle').value
            this.svcFullScreenTableBox.classList.add('hide')
            window.removeEventListener('keydown', this.handleKeyDown);
        }
    }

    compareObjects(obj1, obj2, threshold, type) {
        if (type === 1) return true
        const keys = obj1 ? Object.keys(obj1) : [];

        for (let i = 0; i < keys.length; i++) {
            const key = keys[i];
            if (obj2.hasOwnProperty(key)) {
                const percentage = this.calculatePercentageDifference(obj1[key], obj2[key]);
                return percentage >= threshold
            }
        }
        return false;
    }


    calculatePercentageDifference(num1, num2) {
        // const difference = Math.abs(num1 - num2);
        // const percentage = (difference / ((num1 + num2) / 2)) * 100;
        // return percentage.toFixed(2);
        const percentage = (num2 - num1) / num2 * 100;
        const fluctuation = Math.abs(percentage);
        return fluctuation.toFixed(0) + '.' + (fluctuation % 1 * 10000).toFixed(0);
    }

    changeHour() {
        document.getElementById('com-dropdown-hourly').addEventListener('dorpdownChange', (e) => {
            console.log(e);
            this.duration = Number(e.detail) * 60
        })
    }

    combinaData() {
        let { hourly_pricing, currencyCode, countryCode, pricing } = serviceArea
        if (hourly_pricing) {
            hourly_pricing['currency'] = currencyCode
            let hourlyPricingRanges = hourly_pricing.ranges || []
            hourlyPricingRanges.forEach(item => {
                item['currency'] = currencyCode
            })
        }
        let prcingRanges = pricing?.ranges || []
        for (let item of prcingRanges) {
            item.per_unit = imByCountry(countryCode)
        }
    }


    async timeZoneHandler(calcPostData) {
        let { tz } = serviceArea
        let d = this.fromDate
        let h = this.fromHour
        let m = this.fromMinute
        let flag = d && h && m
        let date = new Date()
        let dayNum = date.getDate()

        //curDate == 1 : Timezone is updated on the 1st of every month
        if (!tz || flag || dayNum == 1) {
            let { airports } = serviceArea
            if (!airports) return {}
            let { lat, lng } = serviceArea.serviceArea
            // let { serviceArea: { lat, lng } } = serviceArea
            let dateStr = getStandardDateTime()
            if (flag) {
                dateStr = `${d.trim()} ${h.trim()}:${m.trim()}:00`
            }
            // get fake local utc
            let url = `${api[stage].maps}/timezones/location/date-time?loc=${lat},${lng}&dt=${dateStr}`
            let { code, res } = await svcUtils.get(url)
            if (code != 0) return {}

            let { utc, timezone: { dstOffset, rawOffset, timeZoneId, timeZoneName } } = res

            if (flag) {
                calcPostData['from_utc'] = utc
                calcPostData['from_time_str'] = dateStr
            }
            serviceArea['tz'] = {
                dos: dstOffset,
                ros: rawOffset,
                tzid: timeZoneId
            }
        }

    }

    async calcPrice() {
        let it = this
        if (!this.calcFormCheck()) return
        document.querySelector('.calc-loading').classList.remove('hide')
        let { lat: from_lat, lng: from_lng } = this.from
        let { lat: to_lat, lng: to_lng } = this.to
        let comData = {
            from_lat,
            from_lng,
            to_lat: to_lat ? to_lat : from_lat,
            to_lng: to_lng ? to_lng : from_lng
        }

        let calcPostData = {
            partner_id: this.partnerId ? this.partnerId : 45
        }
        if (it.isDis == 1) {
            calcPostData.duration = it.duration
        }

        calcPostData = Object.assign({}, comData, calcPostData)
        await this.timeZoneHandler(calcPostData)
        if (!serviceArea['date_surcharge_method']) {
            serviceArea['date_surcharge_method'] = 'sum'
        }

        calcPostData['service_area'] = serviceArea

        if (!it.isDis) {
            let { distance, time } = await this.distCalc(from_lat, from_lng, to_lat, to_lng)
            it.distanceBox.style.display = '';
            it.distanceFld.innerHTML = Number(parseFloat(distance / distUnitData[dU].measurement)).toFixed(1) + distUnitData[dU].abbr;
            it.distance = distance
            it.timeFld.innerText = Math.round(time / 60) + 'min'

            calcPostData['distance'] = distance
        } else {
            it.distanceBox.style.display = 'none';
        }
        async.done(async () => {

            if (_d.isEmployee) {
                let { currencyCode } = serviceArea
                let calcGetData = Object.assign({}, comData, {
                    ses: _d.ses,
                    currency: currencyCode,
                    demand_fleet_id: elifeFleetId,
                    distance: it.distance < 1 ? 1 : it.distance,
                })

                if (calcPostData['from_time_str']) {
                    calcGetData['from_time_str'] = calcPostData['from_time_str']
                    calcGetData['from_utc'] = calcPostData['from_utc']
                }

                if (it.isDis) {
                    calcGetData['duration'] = it.duration
                    delete calcGetData.distance
                }
                if (it.partnerId) {
                    calcGetData['partner_id'] = it.partnerId
                    delete calcGetData.demand_fleet_id
                }
                let str = ''
                for (let [key, value] of Object.entries(calcGetData)) {
                    str += `&${key}=${value}`
                }
                let url = api[stage].ridePricings + '?' + str.substring(1)
                it.vehicleList.forEach(item => {
                    item['elifePrice'] = ''
                    item['minAmount'] = ''
                    item['maxAmount'] = ''
                    item['averagePrice'] = ''
                })


                rest.get('service area and airports search', url,
                    (res) => {
                        let fleets = res.fleets || []

                        // let elifePrice = fleets.find(item => item.parent_fleet_id == elifeFleetId)
                        // if (elifePrice) {
                        //     let { fleet_name, fleet_id } = elifePrice
                        //     if (fleet_id != serviceArea.serviceArea.id) {
                        //         svcUtils.msgBox({
                        //             msg: `Attention!Current prices are based on ${fleet_name} service area.`
                        //         })
                        //     }
                        // }


                        let priceObj = {}
                        for (let item of fleets) {
                            for (let obj of item.vehicle_classes) {
                                let id = obj.vehicle_class_id
                                if (!id) continue
                                let amount = obj.price.amount
                                if (item.parent_fleet_id == elifeFleetId) {
                                    let vehicleObj = it.vehicleList.find(item => item.vehicle_id == obj.vehicle_class_id)
                                    vehicleObj['elifePrice'] = amount
                                } else {
                                    let arr = priceObj[id]
                                    if (arr) {
                                        arr.push(amount)
                                    } else {
                                        priceObj[id] = [amount]
                                    }

                                }
                            }

                        }
                        for (let [key, value] of Object.entries(priceObj)) {
                            let obj = it.vehicleList.find(item => item.vehicle_id == key)
                            obj['minAmount'] = Math.min(...value)
                            obj['maxAmount'] = Math.max(...value)
                            obj['averagePrice'] = (value.reduce((sum, item) => sum + item, 0) / value.length).toFixed(2) || ''
                        }
                    },

                    err => {
                        this.saveBtn.classList.add('not-allowed')
                    }
                )
            }

            console.log('--calc post data--', calcPostData);

            let url = `${api[stage].ridePricings}?ses=${_d.ses}`
            let res = await svcUtils.fetchData({ url, data: calcPostData, method: 'POST' })
            let list = objValGetByKeys(res, 'fleets.0.vehicle_classes') || [];
            for (let obj of it.vehicleList) {
                let curVehicle = list.find(item => item.vehicle_class_id == obj.vehicle_id)

                if (curVehicle) {
                    obj['amount'] = curVehicle.price.amount
                    obj['currency'] = curVehicle.price.currency
                } else {
                    obj['amount'] = ''
                    obj['currency'] = ''
                }
            }
            async.done(() => {
                this.saveBtn.classList.remove('not-allowed')
                document.querySelector('.calc-loading').classList.add('hide')
                it.createFormElms()
            })


        })

    }



    async limitRequest(parameList, limit, fn) {
        return new Promise((resolve, reject) => {
            let count = 0;
            const getData = async () => {
                while (count < limit && parameList.length > 0) {
                    const parameArr = parameList.shift();
                    count++;
                    await fn(parameArr[0], parameArr[1])
                    count--;
                }

                //check if done
                if (count === 0 && parameList.length === 0) {
                    resolve();
                }
            };

            for (let i = 0; i < limit; i++) {
                getData();
            }
        })
    }

    async circularPrice(fromList, toList) {
        document.querySelector('.calc-loading').classList.remove('hide')
        let pAirports = []
        for (let item of this.airports) {
            let airport = await airportCache(item)
            pAirports.push(airport)
        }
        let parames = []
        pAirports.forEach((air, i) => {
            serviceArea.zones.forEach((zone, k) => {
                parames.push([air, zone])
            });
        });

        const limit = 10;
        await this.limitRequest(JSON.parse(JSON.stringify(parames)), limit, this.allAirportPricePost.bind(this));
        // if(_d.isEmployee){
        await this.limitRequest(JSON.parse(JSON.stringify(parames)), limit, this.allAirportPriceGet.bind(this));
        // }

        this.vehicleList.forEach(item => {
            item.showBadgeKeys = this.checkElifePrice(item['Price'], item['Elife Price'])
        })
        this.saveBtn.classList.remove('not-allowed')
        this.createFormElms()
        document.querySelector('.calc-loading').classList.add('hide')
    }



    checkElifePrice(obj1, obj2) {
        let differentKeys = [];
        for (let key in obj1) {
            if (key in obj2 && obj1[key] !== obj2[key]) {
                differentKeys.push(key);
            }
        }
        return differentKeys;
    }

    async distCalc(fromLat, fromLng, toLat, toLng) {
        let url = api[stage].maps + '/routes/distance-time'
        let d = {
            from_lat: fromLat,
            from_lng: fromLng,
            to_lat: toLat,
            to_lng: toLng
        }
        let isShowTips = false
        let { code, res } = await svcUtils.fetchData({ url, data: d, isShowTips }) //false: don't show tips
        if (!res) {
            res = {
                distance: distCalcDirect(fromLat, fromLng, toLat, toLng),
                time: 0
            }
        }
        return res
    }

    async allAirportPriceGet(from, to) {
        let it = this
        let fromLng = this.transferType == 1 ? from : to
        let toLng = this.transferType == 1 ? to : from
        let { distance } = await it.distCalc(fromLng.lat, fromLng.lng, toLng.lat, toLng.lng)
        if (_d.isEmployee) {
            let { currencyCode } = serviceArea
            let calcGetData = {
                ses: _d.ses,
                from_lat: fromLng.lat,
                from_lng: fromLng.lng,
                to_lat: toLng.lat,
                to_lng: toLng.lng,
                currency: currencyCode,
                demand_fleet_id: elifeFleetId,
                distance: distance,
                test: fromLng.code + '_' + toLng.name
            }


            if (it.isDis) {
                calcGetData['duration'] = it.duration
                delete calcGetData.distance
            }
            let str = ''
            for (let [key, value] of Object.entries(calcGetData)) {
                str += `&${key}=${value}`
            }
            let url = api[stage].ridePricings + '?' + str.substring(1)

            let kName;
            if (this.transferType == 1) {
                kName = fromLng.code + '_' + toLng.name
            } else {
                kName = toLng.code + '_' + fromLng.name
            }
            it.vehicleList.forEach(item => {
                if (!item.hasOwnProperty('Elife Price')) {
                    item['Elife Price'] = {}
                }
                if (!item.hasOwnProperty('Fleet Range')) {
                    item['Fleet Range'] = {}
                }
                if (!item.hasOwnProperty('Average Price')) {
                    item['Average Price'] = {}
                }
                item['Elife Price'][kName] = ''
                item['Fleet Range'][kName] = ''
                item['Average Price'][kName] = ''

            })
            return new Promise((resolve, reject) => {
                rest.get('service area and airports search', url,
                    (res) => {
                        let fleets = res.fleets || []
                        let priceObj = {}
                        for (let item of fleets) {

                            for (let obj of item.vehicle_classes) {
                                let id = obj.vehicle_class_id
                                if (!id) continue
                                let amount = obj.price.amount
                                if (item.parent_fleet_id == elifeFleetId) {
                                    let vehicleObj = it.vehicleList.find(item => item.vehicle_id == obj.vehicle_class_id)
                                    vehicleObj['Elife Price'][kName] = amount
                                } else {
                                    let arr = priceObj[id]
                                    if (arr) {
                                        arr.push(amount)
                                    } else {
                                        priceObj[id] = [amount]
                                    }

                                }
                            }

                        }
                        for (let [key, value] of Object.entries(priceObj)) {
                            let obj = it.vehicleList.find(item => item.vehicle_id == key)
                            let min = Math.min(...value)
                            let max = Math.max(...value)
                            obj['Fleet Range'][kName] = `${min}~${max}`
                            obj['Average Price'][kName] = (value.reduce((sum, item) => sum + item, 0) / value.length).toFixed(2) || ''

                            // obj['Fleet Range'][kName] = `3~4`
                            // obj['Average Price'][kName] = 'a90'
                        }
                        resolve()
                    },

                    err => {
                        this.saveBtn.classList.add('not-allowed')
                        reject(err)
                    }
                )
            })

        }
    }

    async allAirportPricePost(from, to) {
        let fromLng = this.transferType == 1 ? from : to
        let toLng = this.transferType == 1 ? to : from
        let calcPostData = {
            from_lat: fromLng.lat,
            from_lng: fromLng.lng,
            to_lat: toLng.lat,
            to_lng: toLng.lng,
            service_area: serviceArea,
            partner_id: listOfDictsSearchDict(partners, 'name', 'ServiceAreaApp').id,
            // test: fromLng.code + '_' + toLng.name + '-2'
        };
        let kName;
        if (this.transferType == 1) {
            kName = fromLng.code + '_' + toLng.name
        } else {
            kName = toLng.code + '_' + fromLng.name
        }
        return new Promise((resolve, reject) => {
            rest.post(
                'service area and airports search',
                api[stage].ridePricings + '?ses=' + ses,
                calcPostData,
                result => {
                    let list = objValGetByKeys(result, 'fleets.0.vehicle_classes') || [];
                    this.updateVehicleList(this.vehicleList, list, '', kName)
                    resolve(list);
                },
                error => {
                    showErr(objValGetByKeys(error, 'responseJSON.errMsg'));
                    this.saveBtn.classList.add('not-allowed');
                    reject(error);
                }
            );
        });
    }

    updateVehicleList(vlist, plist, name, kName) {

        for (let i = 0; i < vlist.length; i++) {
            if (!vlist[i].hasOwnProperty(`${name}Price`)) {
                vlist[i][`${name}Price`] = {};
            }
            let found = false;
            for (let j = 0; j < plist.length; j++) {
                if (vlist[i].vehicle_id === plist[j].vehicle_class_id) {
                    vlist[i][`${name}Price`][kName] = plist[j].price.amount;
                    found = true;
                    break;
                }
            }
            if (!found) {
                vlist[i][`${name}Price`][kName] = ''
            }
        }
    }



    // average price
    createFormElms(vehicleList, isFull) {

        let cVehicleList = vehicleList || this.vehicleList
        let rootElm = document.getElementById('vehicle-price-calculator')
        let template = rootElm.querySelector('.template')
        let exportBox = rootElm.querySelector('.export-box')
        let resultsBox = rootElm.querySelector('.show-result')
        resultsBox.innerText = `Results: ${cVehicleList.length}`
        this.exportBox = exportBox
        // exportBox.innerHTML = ''
        let fragment = document.createDocumentFragment()

        this.downloadVehicleList = cVehicleList

        let tableHeader = this.createTitle()


        fragment.appendChild(tableHeader)


        cVehicleList.forEach((item, index) => {
            let cTemplate = template.cloneNode(true)
            cTemplate.classList.add('item')
            cTemplate.style.display = ''
            // if (index == 2 || index == 45 || index == 30) {
            //     cTemplate.classList.add('warn')
            // }
            let itemName = cTemplate.querySelector('.item-name')
            itemName.innerText = `${item.shortName || item.vehicle_name}(${item.vehicle_id})`
            if (item.amount) {
                let itemCurrency = cTemplate.querySelector('.item-currency')
                itemCurrency.innerText = item.amount
                if (_d.isEmployee) {
                    let elifePrice = cTemplate.querySelector('.elife-price')

                    elifePrice.classList.remove('hide')
                    elifePrice.innerText = item.elifePrice || ''

                    if (item.elifePrice != item.amount) {
                        cTemplate.classList.add('warn')
                    }
                }
                if (_d.isEmployee) {
                    let itemRangeBox = cTemplate.querySelector('.item-range-box')
                    itemRangeBox.classList.remove('hide')
                    let itemAmounts = cTemplate.querySelector('.item-amounts')
                    if (!item.minAmount) {
                        itemRangeBox.style.transform = 'scale(0)'
                    }
                    itemAmounts.innerText = `${item.minAmount}~${item.maxAmount}`

                    let averagePrice = cTemplate.querySelector('.average-price')
                    averagePrice.innerText = item.averagePrice || ''
                }

            }
            fragment.appendChild(cTemplate)
        })

        let fragment2 = document.createDocumentFragment()
        if (serviceArea.zones && serviceArea.zones.length) {
            let tableHeader2 = this.createTitle2()
            fragment2.appendChild(tableHeader2)
            cVehicleList.forEach(item => {
                let bodyTitle = this.createBodyTitle2(item)
                // let cTemplate2 = template2.cloneNode(true)
                let priceTemplate = this.createPriceTemplate(item, 'Price')
                let elifePriceTemplate = this.createPriceTemplate(item, 'Elife Price')
                let AveragePriceTemplate = this.createPriceTemplate(item, 'Average Price')
                let FleetRangeTemplate = this.createPriceTemplate(item, 'Fleet Range')
                let vFragment = document.createDocumentFragment()
                vFragment.appendChild(bodyTitle)
                vFragment.appendChild(priceTemplate)
                vFragment.appendChild(elifePriceTemplate)
                vFragment.appendChild(AveragePriceTemplate)
                vFragment.appendChild(FleetRangeTemplate)
                fragment2.appendChild(vFragment)
            })
        }
        exportBox.innerHTML = ''
        let fullFragment2;
        let fullExportBox = document.getElementById('full-export-template')

        if (this.calcFormCheck()) {
            if (isFull) fullFragment2 = fragment.cloneNode(true)
            exportBox.appendChild(fragment)
            this.creatType = 1
        } else if (serviceArea.zones && serviceArea.zones.length) {
            if (isFull) fullFragment2 = fragment2.cloneNode(true)
            exportBox.appendChild(fragment2)
            this.creatType = 2
            setTimeout(() => {
                let uniformWidthBoxs = exportBox.querySelectorAll('.uniform-width')
                let maxWidth = 0;
                uniformWidthBoxs.forEach(element => {
                    let width = element.getBoundingClientRect().width
                    if (width > maxWidth) {
                        maxWidth = width;
                    }
                });
                if (maxWidth > 168) exportBox.querySelectorAll('.uniform-width').forEach(element => { element.style.width = `${maxWidth}px`; });

                if (maxWidth > 168 && isFull) fullExportBox.querySelectorAll('.uniform-width').forEach(element => { element.style.width = `${maxWidth}px`; });

            }, 500);
        } else {
            if (isFull) fullFragment2 = fragment.cloneNode(true)
            exportBox.appendChild(fragment)
            this.creatType = 1
        }

        if (isFull) {
            let fullResultsBox = document.getElementById('full-show-result')
            fullResultsBox.innerText = `Results: ${cVehicleList.length}`
            fullExportBox.innerHTML = ''
            fullExportBox.appendChild(fullFragment2)
        }


        setTimeout(async () => {
            this.warnElmList = this.rootElm.querySelectorAll('.warn')
            let indexArr = []
            this.warnElmList.forEach(async (elm, index) => {
                let flag = await this.isInViewPort(elm, this.exportBox)
                if (!flag) {
                    this.toDownArrow.classList.remove('hide')
                    indexArr.push(index)
                    this.warnIndex = indexArr[0]
                }
            })
        }, 500)
    }

    downloadVehicleListFun() {
        console.log('this.creatType=====', this.creatType);
        console.log('downloadehicleList=====', this.downloadVehicleList);
        if (this.creatType == 1) {
            this.oldTableDownloadFun()
        } else {
            this.newTableDownloadFun()
        }
    }

    oldTableDownloadFun() {
        let titleArr = [{
            tableName: 'vehicleName',
            tableText: 'vehicleName'
        }, {
            tableName: 'Price',
            tableText: 'Price'
        }, {
            tableName: 'Elife Price',
            tableText: 'Elife Price'
        }, {
            tableName: 'Average Price',
            tableText: 'Average Price'
        }, {
            tableName: 'Fleet Range',
            tableText: 'Fleet Range'
        }]
        let jsonData = []
        this.downloadVehicleList.forEach(item => {
            let vehicleItem = {}
            vehicleItem.vehicleName = `${item.vehicle_name}(${item.vehicle_id})`
            vehicleItem.price = item.amount || ''
            vehicleItem.elifePrice = item.elifePrice || ''
            vehicleItem.averagePrice = item.averagePrice || ''
            vehicleItem.fleetRange = item.minAmount && item.maxAmount ? `${item.minAmount}~${item.maxAmount}` : ''
            jsonData.push(vehicleItem)
        })
        let dateName = new Date().getTime()
        this.exportCSV(titleArr, jsonData, dateName)
    }

    newTableDownloadFun() {
        let d = JSON.parse(JSON.stringify(serviceArea))
        // let d = JSON.parse(JSON.stringify(pvg))
        let { airports, zones } = d
        let titleArr = [{
            tableName: 'vehicleName',
            tableText: 'vehicleName'
        }]
        let jsonData = []
        zones.forEach(zone => {
            airports.forEach(air => {
                titleArr.push({
                    tableName: `${air}_${zone.name}`,
                    tableText: `${air}-${zone.name}`
                })
            })
        })
        this.downloadVehicleList.forEach((item, index) => {
            let vehicleId = `${item.vehicle_name}(${item.vehicle_id})`
            let vehiclePriceItem = {}
            let vehicleElifePriceItem = {}
            let vehicleAveragePriceItem = {}
            let vehicleFleetRangeItem = {}
            vehiclePriceItem.vehicleName = vehicleId + '-Price'
            vehicleElifePriceItem.vehicleName = vehicleId + '-Elife Price'
            vehicleAveragePriceItem.vehicleName = vehicleId + '-Average Price'
            vehicleFleetRangeItem.vehicleName = vehicleId + '-Fleet Range'
            titleArr.forEach(title => {
                if (title.tableName === 'vehicleName') return
                vehiclePriceItem[title.tableText] = item['Price'] ? item['Price'][title.tableName] : ''
                vehicleElifePriceItem[title.tableText] = item['Elife Price'] ? item['Elife Price'][title.tableName] : ''
                vehicleAveragePriceItem[title.tableText] = item['Average Price'] ? item['Average Price'][title.tableName] : ''
                vehicleFleetRangeItem[title.tableText] = item['Fleet Range'] ? item['Fleet Range'][title.tableName] : ''

            })
            jsonData.push(vehiclePriceItem)
            jsonData.push(vehicleElifePriceItem)
            jsonData.push(vehicleAveragePriceItem)
            jsonData.push(vehicleFleetRangeItem)
        })
        console.log('jsonData', jsonData);
        console.log('titleArr', titleArr);
        let dateName = new Date().getTime()
        this.exportCSV(titleArr, jsonData, dateName)
    }

    exportCSV(title, jsonData, name) {
        let str = ``;
        for (let i of title) {
            str += i.tableText + ","
        }
        str += "\n"
        for (let item of jsonData) {
            for (const key in item) {
                str += `${item[key] + "\t"},`;
            }
            str += "\n";
        }
        const url =
            "data:text/csv;charset=utf-8,\ufeff" + encodeURIComponent(str);
        const link = document.createElement("a");
        link.href = url;
        link.download = name + ".csv";
        link.click();
    }

    switchCalcInfoBox() {
        let calcInfoWwitchBox = this.rootElm.querySelector('.calc-info-switch-box')
        let calcInfoWwitchBox2 = this.rootElm.querySelector('.calc-info-switch-box-2')
        let calcFromBox = this.rootElm.querySelector('.calc-from-data')
        let calcToBox = this.rootElm.querySelector('.calc-to-data')
        let selectCalcTimeBox = this.rootElm.querySelector('.calc-select-time')
        let partnerInfoBox = this.rootElm.querySelector('.partner-info-box')
        let partnerinfoStatusBox = this.rootElm.querySelector('.partnerinfo-status-box')
        let partnerStatusBox = this.rootElm.querySelector('.partner-status-box')
        partnerStatusBox.classList.remove('hide')
        if (this.selectPartner && this.selectPartner.partner_id) {
            partnerinfoStatusBox.style.display = ''
            if (!this.calcFormCheck()) partnerStatusBox.classList.add('hide')
            let { partner_id, partner_name, pricing_json } = this.selectPartner
            partnerInfoBox.innerText = `${partner_id} ${partner_name} +${pricing_json ? JSON.parse(pricing_json).percent : '0'}%`
        } else {
            partnerinfoStatusBox.style.display = 'none'
        }
        if (this.calcFormCheck()) {
            calcFromBox.innerText = this.fromPlace.value
            calcToBox.innerText = this.toPlace.value
        } else {
            calcFromBox.innerText = 'All airport'
            calcToBox.innerText = 'All location'
            partnerinfoStatusBox.style.display = 'none'
        }
        if (this.fromDate && this.fromHour && this.fromMinute) {
            let selectCalcTimeStr = `Time: ${this.fromDate} ${this.fromHour} ${this.fromMinute}`
            selectCalcTimeBox.innerText = selectCalcTimeStr || ''
        } else {
            selectCalcTimeBox.innerText = 'Time:  - - :'
        }
        if (this.isDis) {
            calcToBox.innerHTML = (this.duration / 60) + 'hour'
        }
        calcInfoWwitchBox.style.display = 'none'
        calcInfoWwitchBox2.style.display = ''
    }

    createPriceTemplate(item, name) {
        let rootElm = document.getElementById('vehicle-price-calculator')
        let contentTemplate = rootElm.querySelector('.calc-table-clo-content').cloneNode(true)
        let priceItem = contentTemplate.querySelector('.title-td').cloneNode(true)
        priceItem.innerText = name
        contentTemplate.innerHTML = ''
        contentTemplate.appendChild(priceItem)
        let fragment = document.createDocumentFragment()
        serviceArea.zones.forEach((aitem, index) => {
            let priceContent = contentTemplate.querySelector('.title-td').cloneNode(true)
            priceContent.innerHTML = ''
            priceContent.classList.add('uniform-width')
            this.airports.forEach(fItem => {
                let pariceSpan = document.createElement('span')
                // pariceSpan.innerText = `${item.vehicle_id}_${fItem.name}`
                pariceSpan.innerText = item[name] ? item[name][`${fItem}_${aitem.name}`] : false || '-'
                if (item.showBadgeKeys && item.showBadgeKeys.includes(`${fItem}_${aitem.name}`) && name == 'Price') {
                    pariceSpan.classList.add('span-badge')
                }
                // pariceSpan.innerText = '56'
                priceContent.appendChild(pariceSpan)
            })
            contentTemplate.appendChild(priceContent)
        })
        fragment.appendChild(contentTemplate)

        return fragment
    }

    createBodyTitle2(item) {
        let rootElm = document.getElementById('vehicle-price-calculator')
        let titleBox = rootElm.querySelector('.calc-table-clo-title2')
        let ctitleBox = titleBox.cloneNode(true)
        let template = rootElm.querySelector('.calc-table-clo-title2 .title-td')
        let vehicleNameBox = rootElm.querySelector('.calc-table-clo-title2 .vehicle-name-2')
        let vehiclepriceTitle = rootElm.querySelector('.calc-table-clo-title2 .vehicle-Price-2').cloneNode(true)
        let fragment = document.createDocumentFragment()
        let cVehicleName = vehicleNameBox.cloneNode(true)
        cVehicleName.querySelector('span').innerText = `${item.vehicle_name}(${item.vehicle_id})`
        vehiclepriceTitle.innerHTML = ''
        serviceArea.airports.forEach((airItem, airIndex) => {
            let cTemplate = document.createElement("span")
            cTemplate.innerText = airItem
            vehiclepriceTitle.appendChild(cTemplate)
            if (airIndex === serviceArea.airports.length - 1) {
                vehiclepriceTitle.classList.add('uniform-width')
                fragment.appendChild(vehiclepriceTitle)
                ctitleBox.innerHTML = ''
                ctitleBox.appendChild(cVehicleName)
                // ctitleBox.appendChild(fragment)
                serviceArea.zones.forEach(() => {
                    let cfragment = fragment.cloneNode(true)
                    ctitleBox.appendChild(cfragment)
                })
            }
        })
        return ctitleBox
    }

    async toWarnPosition() {

        let elm = this.warnElmList[this.warnIndex]
        elm.scrollIntoView({ behavior: "smooth", block: "end", inline: "nearest" });
        this.warnIndex++
        let len = this.warnElmList.length - 1
        if (this.warnIndex > len) {
            this.warnIndex = 0
            setTimeout(() => {
                this.toDownArrow.classList.add('hide')
            }, 500)
        }
    }

    isInViewPort(elm, root) {
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


    createTitle() {
        let rootElm = document.getElementById('vehicle-price-calculator')
        let template = rootElm.querySelector('.template')
        let cTemplate = template.cloneNode(true)

        cTemplate.classList.add('item')
        cTemplate.style.display = ''
        cTemplate.querySelector('.item-name').innerText = ``

        // show average price and fleet ranges
        if (_d.isEmployee) {
            let itemRangeBox = cTemplate.querySelector('.item-range-box')
            itemRangeBox.classList.remove('hide')
            let firstItemAmounts = itemRangeBox.querySelector('.item-amounts')
            firstItemAmounts.setAttribute('tr', '')
            firstItemAmounts.innerText = langCode == 'zho' ? '供应商价格' : ' Fleet Range'
            firstItemAmounts.id = `item-amounts-0`
            let tipsBox = itemRangeBox.querySelector('.tips')
            tipsBox.style.display = ''
            let tipsTitle = tipsBox.querySelector('.tips-title')
            tipsBox.addEventListener('click', () => {
                console.log('test');
                tipsTitle.classList.contains('hide') ? tipsTitle.classList.remove('hide') : tipsTitle.classList.add('hide')
            })
            tipsBox.addEventListener('mouseleave', () => {
                setTimeout(() => {
                    tipsTitle.classList.add('hide')
                }, 1500);
            })

            let averagePrice = cTemplate.querySelector('.average-price')
            averagePrice.innerText = 'Average Price'
        }


        let firstCurrency = cTemplate.querySelector('.item-currency')
        firstCurrency.innerText = langCode == 'zho' ? '自营价格' : 'Price'
        firstCurrency.setAttribute('tr', '')
        firstCurrency.id = `item-currency-0`


        if (_d.isEmployee) {
            let elifePrice = cTemplate.querySelector('.elife-price')
            elifePrice.classList.remove('hide')
            elifePrice.innerText = 'Elife Price'
        }



        return cTemplate
    }

    createTitle2() {
        let rootElm = document.getElementById('vehicle-price-calculator')
        let titleBox = rootElm.querySelector('.calc-table-clo-title')
        let template = rootElm.querySelector('.calc-table-clo-title .title-td')
        let fragment = document.createDocumentFragment()
        let cTitleBox = titleBox.cloneNode(true)
        cTitleBox.innerText = ''
        cTitleBox.appendChild(template.cloneNode(true))
        serviceArea.zones.forEach((zonesItem, airIndex) => {
            let cTemplate = template.cloneNode(true)
            cTemplate.innerText = zonesItem.name
            cTemplate.classList.add('uniform-width')
            fragment.appendChild(cTemplate)
            cTitleBox.appendChild(fragment)
        })

        return cTitleBox
    }

    calculateTypeBtnClick() {
        let it = this
        let btnDis = it.rootElm.querySelector('.calculator .btn-dis')
        let btnHourly = it.rootElm.querySelector('.calculator .btn-hourly')
        let toPlaceBox = it.rootElm.querySelector('#to-place-box')
        let timeSelectBox = it.rootElm.querySelector('#time-select-box')

        btnDis.addEventListener('click', (e) => {
            it.isDis = 0
            let target = e.target
            target.parentNode.classList.add('active')
            btnHourly.classList.remove('active')
            toPlaceBox.classList.remove('mt_10')
            timeSelectBox.style.display = 'none'
            this.calcInfoWwitchBox.style.display = ''
            this.calcInfoWwitchBox2.style.display = 'none'

            this.exchange.classList.remove('hide')
        })
        btnHourly.addEventListener('click', (e) => {
            it.isDis = 1
            let target = e.target
            target.parentNode.classList.add('active')
            btnDis.classList.remove('active')
            toPlaceBox.classList.add('mt_10')
            timeSelectBox.style.display = ''
            this.calcInfoWwitchBox.style.display = ''
            this.calcInfoWwitchBox2.style.display = 'none'

            it.comDropdownHourlyInput = elmOfIdRel('dropdown-hourly', it.rootElm);
            it.comDropdownHourly = new TextAutoComp(it.comDropdownHourlyInput, {
                str: (item) => {
                    return [item];
                },
                sel: async (item, hovElm) => {
                    if (item) {
                        this.duration = Number(item) * 60
                    }
                }
            });
            let hourlyList = it.createHour() || []
            it.comDropdownHourly.setItems(hourlyList)
            it.comDropdownHourly.filter = false

            if (!it.comDropdownHourlyInput.value) {
                it.comDropdownHourly.set(3)
            }
            this.exchange.classList.add('hide')
        })

    }

    createHour() {
        let arr = []
        for (let i = 6; i < 49; i++) {
            arr.push(i * 0.5)
        }
        return arr
    }

    calcFormCheck() {
        let it = this;
        console.log('----calcFormCheck--');
        if (!this.from.lat && !it.fromPlace.value) {
            return false;
        }

        if (!this.to.lat && !it.isDis && !it.toPlace.value) {
            // it.toPlaceBox.classList.add('fld-box-empty-warn');
            // showErr('Please enter required infomation');
            return false;
        }

        return true;
    }
    calcJsonLargeCheck(json, maxLength) {
        let jsonData = JSON.stringify(json);
        if (jsonData.length > maxLength) {
            return false
        }
        return true
    }
    noticeTimeHintConvert() {

        let { vehicleClasses: vehicles } = serviceArea
        if (vehicles) {
            for (let obj of vehicles) {
                if (obj['notice_time']) {
                    delete obj['notice_time']
                }
            }
        }

        // reserve time hint
        let noticeTimeHints = objValGetByKeys(serviceArea, 'hint');

        if (noticeTimeHints && (noticeTimeHints.length > 0)) {
            noticeTimeHints.forEach(noticeTimeHint => {
                let notice_time = [];
                noticeTimeHint.notice_time_hint.forEach(noticeTimeJson => {
                    if (noticeTimeJson.notice_time) {
                        notice_time.push(noticeTimeJson.notice_time);
                    } else {
                        notice_time.push(noticeTimeJson);
                    }
                })

                if (noticeTimeHint.vehicles && (noticeTimeHint.vehicles.length > 0)) {
                    noticeTimeHint.vehicles.forEach(vehicleId => {
                        objValGetByKeys(serviceArea, 'vehicleClasses').forEach(vehicleClass => {
                            if (vehicleClass.vehicle_class_id == vehicleId) {
                                vehicleClass.notice_time = notice_time;
                            }
                        })
                    })
                }
            })
        } else {

        }
        // personalised time hint

        let { pricing_schedule_sum, vehicleClasses } = serviceArea


        if (!pricing_schedule_sum) {
            pricing_schedule_sum = []
        }


        if (vehicleClasses && pricing_schedule_sum.length) {
            for (let obj of vehicleClasses) {
                let { vehicle_class_id } = obj
                let index = pricing_schedule_sum.findIndex(item => item.vehicles?.includes(vehicle_class_id) || false)
                if (index != -1) {
                    obj['surcharge_schedule'] = pricing_schedule_sum[index].notice_time_hint
                } else {
                    if (obj['surcharge_schedule']) {
                        delete obj.surcharge_schedule
                    }
                }
            }
        }


        // let pricingSchedules = objValGetByKeys(serviceArea, 'pricing_schedule_sum');
        // if (pricingSchedules && (pricingSchedules.length > 0)) {
        //     pricingSchedules.forEach(pricingSchedule => {
        //         for (var j = 0; j < pricingSchedule.notice_time_hint.length; j++) {
        //             if (!pricingSchedule.notice_time_hint[j].length) {
        //                 pricingSchedule.notice_time_hint[j] = 'null';
        //             }
        //         }
        //         if (pricingSchedule.vehicles && (pricingSchedule.vehicles.length > 0)) {
        //             pricingSchedule.vehicles.forEach(vehicleId => {
        //                 objValGetByKeys(serviceArea, 'vehicleClasses').forEach(vehicleClass => {
        //                     if (vehicleClass.vehicle_class_id == vehicleId) {
        //                         vehicleClass.surcharge_schedule = pricingSchedule.notice_time_hint;
        //                     }
        //                 })
        //             })
        //         }
        //     })
        // }
    }

    resetPlacesAndTime() {
        let it = this;
        it.fromPlace.value = '';
        it.toPlace.value = '';
        dataOfElmClear(it.fromPlace);
        dataOfElmClear(it.toPlace);
        it.fromPlaceLocalTimeBox.style.display = '';
        it.distanceFld.innerHTML = '';


        this.kMinuteInput.value = ''
        this.kHoursInput.value = ''
        this.kDateInput.value = ' '
        this.saveBtn.classList.add('not-allowed')

        this.from = {}
        this.to = {}
        this.fromDate = ''
        this.fromHour = ''
        this.fromMinute = ''

        this.calFromDateInput.value = ''
        this.fromHourInput.value = ''
        this.fromMinuteInput.value = ''
    }

    async show() {
        let { airports, vehicleClasses } = serviceArea
        this.airports = airports

        this.saveBtn.classList.add('not-allowed')
        this.calcInfoWwitchBox.style.display = ''
        this.calcInfoWwitchBox2.style.display = 'none'
        if (!this.isShowCalculator) {
            this.isShowCalculator = true
            let vehicleList = await _getVehicleList(serviceArea.countryCode)

            this.vehicleList = sortVehicleListHandler(vehicleList, vehicleClasses)

            this.createFormElms()
            this.rootElm.classList.remove('hide')
        }
    }

    hide() {
        this.isShowCalculator = false
        this.rootElm.classList.add('hide')
    }

}

