class ReserveTime {
    constructor(id) {
        this.rootElm = document.getElementById(id)
        this.currencyCode = 'USD'
        this.dList = [
            // {
            //       normal_reserve_value: 1280,
            //       activeCarIds: [1, 2, 40],
            //       notice_time_hint: [{
            //           percent: 100,
            //           delta_amount: 0,
            //           "advance_time_start": "10",
            //           "advance_time_end": "72",
            //           extraValue: 1280,
            //       }, ]
            //   },
        ]

        this.selectedVehicleBox = null
        this.vehiclesList = []

        this.initUi()
    }

    setVihicleAdd(elm) {
        let id = Number(elm.getAttribute('card-id'))
        let del = elm.querySelector('.del')
        del.classList.remove('hide')
        let len = this.dList.length - 1
        this.dList[len].activeCarIds.push(id)
        this.selectedVehicleBox.appendChild(elm)
    }

    getOriginData() {
        return {
            activeCarIds: [],
            normal_reserve_value: '',
            notice_time_hint: [{
                extraValue: '',
                percent: 0,
                curUnit: '%',
                advance_time_start: "",
                advance_time_end: ""
            },]
        }
    }


    initUi() {
        this.cardsBox = this.rootElm.querySelector('.cards-box')
        this.cardItemElm = this.cardsBox.querySelector('.item')

        // this.rootElm.querySelector('.extra-charge-box').setAttribute('currency', this.currencyCode)
        this.rootElm.querySelector('.add-new-rule-btn').addEventListener('click', () => {

            this.dList.push(this.getOriginData())
            this.fillLeft()
            let leftContentBox = this.rootElm.querySelector('.left-content-box')
            leftContentBox.scrollTo(0, 9999)
        })


    }

    fillTimeItem(pNode, list = []) {
        let box = pNode.querySelector('.left-content-item-time-box')
        box.innerHTML = ''
        let idx = pNode.getAttribute('idx')
        let fragment = document.createDocumentFragment()

        let timeItem = this.rootElm.querySelector('.template-time-item')

        let len = list.length - 1
        let prewStartInputValue = ''
        list.forEach((obj, index) => {
            let cTimeItem = timeItem.cloneNode(true)

            cTimeItem.classList.add(`reserve-time-item-${idx}-${index}`)

            cTimeItem.classList.remove('hide')
            let startInput = cTimeItem.querySelector('.start-input')
            startInput.classList.add(`start-input-${index}`)
            let endInput = cTimeItem.querySelector('.end-input')
            endInput.classList.add(`end-input-${index}`)
            startInput.value = obj.advance_time_start
            endInput.value = obj.advance_time_end
            prewStartInputValue = obj.advance_time_start

            if (index >= 1) {
                startInput.placeholder = 0
                endInput.placeholder = prewStartInputValue || 0
            }


            let nextObj = list[index + 1]
            startInput.addEventListener('input', () => {
                obj.advance_time_start = startInput.value
                if (nextObj) {
                    nextObj.advance_time_end = startInput.value
                    cTimeItem.nextElementSibling.querySelector('.end-input').value = startInput.value
                }

            })

            let extraChargeBox = cTimeItem.querySelector('.extra-charge-box')

            let input = extraChargeBox.querySelector('.wc-input')
            input.classList.add(`wc-input-${index}`)
            input.value = obj.extraValue


            let inputSelectUnit = extraChargeBox.querySelector('.input-select-unit')
            inputSelectUnit.value = obj.curUnit
            let select = new TextAutoComp(inputSelectUnit, {
                str: (item) => {
                    return [item.name];
                },

                sel: (item, hovElm) => {
                    if (item) {
                        let unit = item.name
                        if (unit == '%') {
                            obj.percent = obj.extraValue || ''
                            delete obj.delta_amount
                        } else {
                            obj.delta_amount = obj.extraValue || ''
                            delete obj.percent
                        }
                        obj['curUnit'] = unit
                    }
                }
            })
            let downTriangel = extraChargeBox.querySelector('.i-arrow-down')
            downTriangel.addEventListener('click', () => {
                inputSelectUnit.focus()
            })

            select.setItems([
                { name: '%' },
                { name: this.currencyCode || 'USD' },
            ])
            select.filter = false



            input.addEventListener('input', (e) => {
                obj.extraValue = input.value
                console.log(this.dList);
            })


            let iconDel = cTimeItem.querySelector('.icon-del')
            if (len == index) {
                iconDel.classList.remove('hide')
            }
            iconDel.addEventListener('click', () => {
                if (list.length == 1) {
                    list[0].percent = 0
                    list[0].extraValue = ''
                    list[0].delta_amount = 0
                    list[0].advance_time_start = ''
                    list[0].advance_time_end = ''
                    this.fillTimeItem(pNode, list)

                } else {
                    list.pop()
                    this.fillTimeItem(pNode, list)
                }
            })

            fragment.appendChild(cTimeItem)
        })

        box.appendChild(fragment)
    }

    fillLeft() {
        let leftContentBox = this.rootElm.querySelector('.left-content-box')
        leftContentBox.innerHTML = ''
        let dateItem = this.rootElm.querySelector('.left-content-item')

        let fragment = document.createDocumentFragment()

        let i = 0
        for (let obj of this.dList) {
            let cDateItem = dateItem.cloneNode(true)
            cDateItem.classList.remove('hide')
            cDateItem.classList.add(`left-content-item-${i}`)
            cDateItem.setAttribute('idx', i)

            this.selectedVehicleBox = cDateItem.querySelector('.reserve-selected-vehicles-cards')
            this.fillTimeItem(cDateItem, obj.notice_time_hint)

            let normalReserveinput = cDateItem.querySelector('.normal-reserve-input')
            let normalValue = obj.normal_reserve_value
            normalReserveinput.value = normalValue
            obj.notice_time_hint[0].advance_time_end = normalValue


            let endInput = cDateItem.querySelector('.left-content-item-time-box .end-input')
            let addBtn = cDateItem.querySelector('.add-persionalised-time-btn')
            addBtn.addEventListener('click', () => {
                let { advance_time_start } = obj.notice_time_hint.slice(-1)[0]
                obj.notice_time_hint.push({
                    extraValue: '',
                    percent: 0,
                    curUnit: '%',
                    advance_time_start: "",
                    advance_time_end: advance_time_start
                })

                this.fillTimeItem(cDateItem, obj.notice_time_hint)

                endInput = cDateItem.querySelector('.left-content-item-time-box .end-input')
            })

            endInput.value = normalValue
            normalReserveinput.addEventListener('input', () => {
                let v = normalReserveinput.value
                obj.normal_reserve_value = v
                obj.notice_time_hint[0].advance_time_end = v
                endInput.value = v
            })


            let activeVehicleList = this.vehiclesList.filter(item => obj.activeCarIds.includes(item.vehicle_id))
            let activeVehicleBox = cDateItem.querySelector('.reserve-selected-vehicles-cards')

            activeVehicleBox.appendChild(this.getCarItemList(activeVehicleList))
            activeVehicleBox.setAttribute('index', i)


            let leftContentItemDel = cDateItem.querySelector('.left-content-item-del')
            if (i == this.dList.length - 1) {
                leftContentItemDel.classList.remove('hide')
            }
            leftContentItemDel.addEventListener('click', () => {
                if (this.dList.length == 1) {
                    this.dList = [{
                        normal_reserve_value: '',
                        activeCarIds: [],
                        notice_time_hint: [{
                            percent: 0,
                            curUnit: '%',
                            advance_time_start: "",
                            advance_time_end: "",
                            extraValue: '',
                            // time:0,
                            // allowance:0
                        }]
                    }

                    ]
                } else {
                    this.dList.pop()
                }
                this.initVehicleType()
                this.fillLeft()
            })

            fragment.appendChild(cDateItem)
            i++
        }
        leftContentBox.appendChild(fragment)
    }

    getCarItemList(vehicleList, type = 'active') {
        let fragment = document.createDocumentFragment()
        for (let vehicle of vehicleList) {
            let cItemElm = this.cardItemElm.cloneNode(true)
            cItemElm.id = `reserve-card-item-${vehicle.vehicle_id}`
            cItemElm.classList.remove('hide')
            cItemElm.setAttribute('card-id', vehicle.vehicle_id)
            cItemElm.setAttribute('card-type', vehicle.carType)

            let name = cItemElm.querySelector('.item-name')
            name.innerText = vehicle.shortName || vehicle.vehicle_name

            let del = cItemElm.querySelector('.del')

            if (type == 'active') {
                del.classList.remove('hide')
            }
            del.addEventListener('click', (e) => {
                this.recoverCard(e)
            })
            cItemElm.addEventListener("dragstart", reserve_dragstart_handler);

            //do not delete this for K'test
            let KTestMove = cItemElm.querySelector('.k-item-move')
            KTestMove.id = `reserve-card-item-${vehicle.vehicle_id}`
            KTestMove.addEventListener('click', (e) => {
                this.setVihicleAdd(cItemElm)
            })

            fragment.appendChild(cItemElm)
        }
        return fragment
    }

    initVehicleType() {
        let rightBox = this.rootElm.querySelector('.right')
        rightBox.innerHTML = ''
        let cardsBox = this.rootElm.querySelector('.cards-box')

        let cardType = ['Small car', 'Lucury car', 'Large car']
        if (langCode == 'zho') {
            cardType = ['小型车', '豪华轿车', '大型汽车']
        }

        let fragment = document.createDocumentFragment()
        let i = 1

        let activeIds = this.dList.reduce((previousValue, currentValue) => previousValue.concat(...currentValue.activeCarIds), [])
        for (let type of cardType) {
            let cCardsBox = cardsBox.cloneNode(true)
            cCardsBox.classList.remove('hide')
            cCardsBox.classList.add(`special-cards-box-${i}`)

            cCardsBox.querySelector('.top').innerText = type
            let filterCards = this.vehiclesList.filter(item => item.carType == i && !activeIds.includes(item.vehicle_id))
            cCardsBox.querySelector('.list').appendChild(this.getCarItemList(filterCards, 'unActive'))
            fragment.appendChild(cCardsBox)
            i++
        }
        rightBox.appendChild(fragment)
    }

    recoverCard(e) {
        let target = e.target
        target.classList.add('hide')
        let pNode = target.parentNode
        let typeNum = pNode.getAttribute('card-type')
        let id = Number(pNode.getAttribute('card-id'))

        let index = this.vehiclesList.findIndex(item => item.vehicle_id == id)
        if (index != -1) {
            let box = this.rootElm.querySelector(`.special-cards-box-${typeNum} .list`)
            box.appendChild(pNode)
        } else {
            pNode.parentNode.removeChild(pNode)
        }
        for (let i = 0; i < this.dList.length; i++) {
            let arr = this.dList[i].activeCarIds
            let len = arr.length
            for (let j = 0; j < len; j++) {
                if (arr[j] == id) {
                    arr.splice(j, 1)
                    break
                }
            }
        }
        console.log(this.dList);
    }

    async initData() {
        let { currencyCode, vehicleClasses: vehiclesList, hint } = serviceArea
        this.currencyCode = currencyCode

        if (!vehiclesList) {
            vehiclesList = []
        }

        this.vehiclesList = await _filtSelectVehicles(vehiclesList)

        // let {vehicleList:vList,countryCode} = _d


        // this.vehiclesList =vList[countryCode].filter(item => vehiclesList.findIndex(o => o.vehicle_class_id == item.vehicle_id) != -1)

        // this.vehiclesList.forEach(item=>{
        //     let localVehicleData = vehicleClasses.find(obj=>obj.id == item.vehicle_id)
        //     if(localVehicleData){
        //         item['carType'] = localVehicleData.carType || 3
        //     } else {
        //         item['carType'] = 3
        //     }
        // })


        if (!hint) {
            hint = []
        }
        let dList = []
        for (let obj of hint) {
            let notice_time_hint = []
            for (let item of obj.notice_time_hint) {
                if (!item['advance_time_start'] || !item['advance_time_end']) continue
                let obj = {
                    advance_time_start: item.advance_time_start || 0,
                    advance_time_end: item.advance_time_end || 0,
                    extraValue: item.notice_time.percent || item.notice_time.delta_amount || '',
                }
                let { percent, delta_amount } = item.notice_time

                if (percent) {
                    obj['percent'] = percent
                    obj['curUnit'] = '%'
                } else if (delta_amount) {
                    obj['delta_amount'] = percent
                    obj['curUnit'] = this.currencyCode
                } else {
                    obj['percent'] = 0
                    obj['curUnit'] = '%'
                }
                notice_time_hint.push(obj)
            }

            dList.push({
                normal_reserve_value: obj.normal_reserve_value,
                activeCarIds: obj.vehicles || [],
                notice_time_hint
            })
        }

        let list = []
        for (let obj of dList) {
            if (!obj['notice_time_hint'] || !obj.notice_time_hint.length || !obj.activeCarIds.length) {
                continue
            }
            list.push(obj)
        }
        if (!list.length) {
            list = [this.getOriginData()]
        }
        this.dList = list
        console.log('--dList--', list);
    }

    pour() {
        let hint = []

        for (let obj of this.dList) {
            let notice_time_hint = []
            let minValue = 999999
            for (let item of obj.notice_time_hint) {

                let { curUnit, extraValue, advance_time_start, advance_time_end } = item
                if (!advance_time_end && !advance_time_start) continue

                if (Number(advance_time_start) < minValue) {
                    minValue = Number(advance_time_start)
                }

                let notice_time = {
                    time: (Number(advance_time_end) || 0) * 60,
                }

                if (curUnit == '%') {
                    notice_time['percent'] = extraValue || 0
                } else {
                    notice_time['delta_amount'] = extraValue || 0
                }



                notice_time_hint.push({
                    advance_time_start,
                    advance_time_end,
                    notice_time
                })
            }


            for (let obj of notice_time_hint) {
                obj.notice_time['allowance'] = minValue * 60
            }

            if (!notice_time_hint.length) {
                notice_time_hint = [{
                    curUnit: '%',
                    advance_time_start: "",
                    advance_time_end: "",
                    extraValue: '',
                    notice_time: {
                        percent: 0,
                        time: 0,
                        allowance: 0
                    }
                }]
            }



            hint.push({
                normal_reserve_value: obj.normal_reserve_value,
                vehicles: obj.activeCarIds,
                notice_time_hint
            })
        }


        serviceArea['hint'] = hint

        console.log('==========reservi_time =======', serviceArea);
    }
    async show() {
        await this.initData()
        this.fillLeft()
        this.initVehicleType()
        this.rootElm.classList.remove('hide')
    }

    hide() {
        this.pour()
        this.rootElm.classList.add('hide')
    }
    validate() {
        return true
    }
}



function reserve_dragstart_handler(ev) {
    // Add the target element's id to the data transfer object
    ev.dataTransfer.setData("text/plain", ev.target.id);
}

function reserve_dragover_handler(ev) {
    ev.dataTransfer.dropEffect = "move";
    ev.preventDefault();
}

function reserve_drop_handler(ev) {
    // Get the id of the target and add the moved element to the target's DOM

    if (ev.target.classList.contains('reserve-selected-vehicles-cards')) {
        var data = ev.dataTransfer.getData("text/plain");
        let elm = document.getElementById(data)
        let id = Number(elm.getAttribute('card-id'))
        let del = elm.querySelector('.del')
        del.classList.remove('hide')
        ev.target.appendChild(elm);
        let idx = Number(ev.target.getAttribute('index'))

        reserveTime().dList.forEach(obj => {
            let index = obj.activeCarIds.findIndex(i => i == id)
            if(index != -1){
                obj.activeCarIds.splice(index, 1)
            }
        })
        reserveTime().dList[idx].activeCarIds.push(id)
    }
    ev.preventDefault();
}
