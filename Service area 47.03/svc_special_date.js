

class SpecialDate {
    constructor(id) {
        this.rootElm = document.getElementById(id)
        this.currencyCode = 'USD'
        this.dList = []

        this.curIndex = 0
        this.vehiclesList = []
        this.activeVehiclesList = []
        this.settingList = []
        this.timestamp = []
        this.isAddNew = false
        this.flagArr = [0, 0]

        this.startTime = null
        this.endTime = null
        this.initUi()
    }

    resetData() {
        this.curIndex = 0
        this.vehiclesList = []
        this.activeVehiclesList = []
        // this.select.options.length = 0;
    }

    initUi() {
        this.cardsBox = this.rootElm.querySelector('.cards-box')
        this.cardItemElm = this.cardsBox.querySelector('.item')
        this.rootElm.querySelector('.spc-add-new-rule').addEventListener('click', () => {
            this.curDataHandler()
            this.resetTime()

            this.dList.push(this.originValue())
            this.curIndex = this.dList.length - 1


            this.fillLeft()
            this.initVehicleType()
            this.settingInput.value = this.settingList[this.settingList.length - 1].name
            this.isAddNew = true

        })
    }



    resetTime() {
        this.startTime = null
        this.endTime = null
    }


    initSelect() {
        let list = []
        let timestamp = []
        this.dList.forEach((item, index) => {
            let { from_date, to_date } = item
            let str = `${from_date}/${to_date}`
            if (!from_date || !to_date) {
                str = `setting${index + 1}`
            } else {
                timestamp.push(
                    [new Date(from_date).getTime(), new Date(to_date).getTime()]
                )
            }
            list.push({ name: str, index })
        })

        this.timestamp = timestamp

        this.settingList = list
        // console.log('--select list--', this.settingList);
        this.settingSelect.clear()
        this.settingSelect.setItems(list)
        this.settingInput.value = this.settingList[this.curIndex].name

    }

    monthHandler(m) {
        m += 1
        if (m > 12) {
            m = 1
        }
        if (m < 10) {
            m = '0' + m
        }
        return m
    }

    dateHandler(y, m, d) {
        let prefix = d < 10 ? '0' : ''
        return `${y}-${this.monthHandler(m)}-${prefix + d}`
    }

    // check exsist overlapping time
    timeCheck() {
        if (!this.isAddNew) return
        if (!this.startTime || !this.endTime) return
        let tip = {
            msg: 'time overlap'
        }
        for (let [start, end] of this.timestamp) {
            if (this.startTime >= start && this.startTime <= end) {
                svcUtils.msgBox(tip)
                return true
            }
            if (this.endTime <= end && this.endTime >= start) {
                svcUtils.msgBox(tip)
                return true
            }

            if (this.startTime < start && this.endTime > end) {
                svcUtils.msgBox(tip)
                return true
            }
        }
    }


    curDataHandler() {
        let unitElms = this.leftContentBox.querySelectorAll('.ex-box .wc-select')
        let valElms = this.leftContentBox.querySelectorAll('.ex-box .wc-input')

        let curData = this.dList[this.curIndex]
        let { vehicle_classes } = curData
        vehicle_classes.forEach((item, index) => {
            let unit = unitElms[index].value
            let val = valElms[index].value
            item.percent = 0
            item.delta_amount = 0
            if (unit == '%') {
                item.percent = val
            } else {
                item.delta_amount = val
            }
        })
        console.log(this.dList);
    }

    async fillLeft() {
        let leftContentBox = this.rootElm.querySelector('.left-content-box')
        leftContentBox.innerHTML = ''

        this.leftContentBox = leftContentBox

        let dateItem = this.rootElm.querySelector('.date-item').cloneNode(true)
        dateItem.classList.remove('hide')

        let curData = this.dList[this.curIndex]

        // console.log('----curData----', curData, this.curIndex);
        let fromDateInput = dateItem.querySelector('#from-date')
        fromDateInput.value = curData['from_date']

        let fromDate = new Calendar(fromDateInput, (y, m, d) => {
            let date = this.dateHandler(y, m, d)
            curData['from_date'] = date
            this.startTime = date
            this.initSelect()
        })


        let toDateInput = dateItem.querySelector('#to-date')
        toDateInput.value = curData['to_date']
        let toDate = new Calendar(toDateInput, (y, m, d) => {
            let date = this.dateHandler(y, m, d)
            curData['to_date'] = date
            this.endTime = date
            this.initSelect()
        })



        this.settingInput = dateItem.querySelector('.select-setting')
        this.settingSelect = new TextAutoComp(this.settingInput, {
            str: (item) => {
                return [item.name];
            },

            sel: (item, hovElm) => {
                if (item) {
                    this.curDataHandler()
                    this.curIndex = item.index

                    this.fillLeft()
                    this.initVehicleType()
                }
            }
        })
        this.settingSelect.filter = false
        this.initSelect()


        let downTriangle = dateItem.querySelector('.i-arrow-down')
        downTriangle.addEventListener('click', () => {
            this.settingInput.focus()
        })

        let templateBoxEx = dateItem.querySelector('.template-box-ex')
        let fragment = document.createDocumentFragment()
        let i = 0

        let { vehicle_classes } = curData
        for (let obj of vehicle_classes) {
            let cTemplateBoxEx = templateBoxEx.cloneNode(true)
            cTemplateBoxEx.id = `template-box-ex-${i}`
            cTemplateBoxEx.classList.remove('hide')

            let activeVehicleList = this.vehiclesList.filter(item => obj.vehicle_class_ids.includes(item.vehicle_id))

            let activeVehicleBox = cTemplateBoxEx.querySelector('.selected-vehicles-cards')
            activeVehicleBox.appendChild(this.getCarItemList(activeVehicleList))
            activeVehicleBox.setAttribute('index', i)

            let wcInput = cTemplateBoxEx.querySelector('.wc-input')
            wcInput.value = Number(obj.delta_amount) || Number(obj.percent) || 0

            // wcInput.addEventListener('input', (e) => {
            // const regex = /^-?\d*(\.\d{0,2})?$/;
            // const isValid = regex.test(e.target.value);
            // if (!isValid) {
            //     e.target.value = e.target.value.slice(0, -1);
            // } else if (parseFloat(e.target.value) < -90 && selectInput.value == '%') {
            //     e.target.value = '-90';
            // }
            // let value = e.target.value && e.target.value != '-' ? Number(e.target.value) : ''

            // if (obj.delta_amount) {
            //     obj.delta_amount = value
            // } else {
            //     obj.percent = value
            // }

            // })

            let selectInput = cTemplateBoxEx.querySelector('.wc-select')


            this.selectInit(selectInput, obj, wcInput)

            let downTriangle2 = cTemplateBoxEx.querySelector('.i-arrow-down')
            downTriangle2.addEventListener('click', () => {
                selectInput.focus()
            })

            selectInput.value = '%'
            if (obj.delta_amount) {
                selectInput.value = this.currencyCode
            }

            let iconDel = cTemplateBoxEx.querySelector('.icon-del')
            iconDel.setAttribute('index', i)

            if (vehicle_classes.length == 1) {
                iconDel.classList.add('scale')
            }

            iconDel.addEventListener('click', () => {

                this.curDataHandler()
                let index = Number(iconDel.getAttribute('index'))
                vehicle_classes.splice(index, 1)



                this.fillLeft()
                this.initVehicleType()
            })

            fragment.appendChild(cTemplateBoxEx)
            i++
        }


        let addNewPercent = dateItem.querySelector('.add-new-percent')
        addNewPercent.addEventListener('click', () => {
            this.curDataHandler()
            vehicle_classes.push({
                "vehicle_class_ids": [],
                "percent": 0,
                "delta_amount": 0,
            })

            this.fillLeft()
        })


        let settingDelBtn = dateItem.querySelector('.setting-del')
        settingDelBtn.addEventListener('click', () => {
            this.settingDelBtnHandler()

        })

        let exBox = dateItem.querySelector('.ex-box')
        exBox.appendChild(fragment)

        leftContentBox.appendChild(dateItem)
    }

    selectInit(selectInput, vehicleObj, wcInput) {

        let select = new TextAutoComp(selectInput, {
            str: (item) => {
                return [item.name];
            },
            sel: (item, hovElm) => {
                if (item) {
                    // let value = item.name
                    // console.log(vehicleObj);
                    // if (value == '%') {
                    //     vehicleObj.percent = vehicleObj.inputValue
                    //     vehicleObj.delta_amount = 0
                    //     // if (wcInput.value < -90) {
                    //     //     wcInput.value = 0
                    //     //     vehicleObj.percent = 0
                    //     //     vehicleObj.inputValue = 0
                    //     // }
                    // } else {
                    //     vehicleObj.delta_amount = vehicleObj.inputValue
                    //     vehicleObj.percent = 0
                    // }
                }
            }
        })

        select.filter = false

        select.setItems([
            { name: '%' },
            { name: this.currencyCode },
        ])
    }

    settingDelBtnHandler() {
        if (this.dList.length == 1) {
            this.dList = [this.originValue()]
        } else {
            this.dList.splice(this.curIndex, 1)
        }
        this.curIndex -= 1
        if (this.curIndex < 0) {
            this.curIndex = 0
        }
        this.initSelect()
        this.fillLeft()
        this.initVehicleType()

        this.settingInput.value = this.settingList[this.curIndex].name
    }



    getCarItemList(vehicleList, type = 'active') {
        let fragment = document.createDocumentFragment()
        let i = 0
        for (let vehicle of vehicleList) {
            let cItemElm = this.cardItemElm.cloneNode(true)
            let vid = vehicle.vehicle_id
            cItemElm.id = `special-card-item-${vid}`
            cItemElm.classList.remove('hide')
            cItemElm.setAttribute('card-id', vid)
            cItemElm.setAttribute('card-type', vehicle.carType)


            let kItemMove = cItemElm.querySelector('.k-item-move')
            kItemMove.id = `spc-card-item-${vid}`
            kItemMove.addEventListener('click', e => {
                this.setVihicleAdd(cItemElm)
            })
            i++

            let name = cItemElm.querySelector('.item-name')
            name.innerText = vehicle.shortName || vehicle.vehicle_name

            let del = cItemElm.querySelector('.del')

            if (type == 'active') {
                del.classList.remove('hide')
            }
            del.addEventListener('click', (e) => {
                this.recoverCard(e)
            })
            cItemElm.addEventListener("dragstart", special_dragstart_handler);

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

        let { vehicle_classes } = this.dList[this.curIndex] || []
        if (!vehicle_classes) {
            vehicle_classes = []
        }
        let activeIds = []
        for (let obj of vehicle_classes) {
            activeIds.push(...obj.vehicle_class_ids)
        }

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

    //this methos for Kevin's test.do not delete!
    setVihicleAdd(elm) {
        let id = Number(elm.getAttribute('card-id'))
        let del = elm.querySelector('.del')
        del.classList.remove('hide')
        let len = this.dList.length - 1
        let { vehicle_classes } = this.dList[len]
        let l = vehicle_classes.length - 1
        vehicle_classes[l].vehicle_class_ids.push(id)
        let list = Array.from(this.rootElm.querySelectorAll('.ex-box .special-selected-vehicles-cards'))

        let boxLen = list.length - 1

        list[boxLen].appendChild(elm)
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

        let { vehicle_classes } = this.dList[this.curIndex]
        for (let i = 0, len = vehicle_classes.length; i < len; i++) {
            let list = vehicle_classes[i].vehicle_class_ids
            let index = list.findIndex(item => item == id)
            if (index != -1) {
                list.splice(index, 1)
                break
            }
        }
    }

    dataHandler(list) {
        let dList = []
        for (let obj of list) {
            let { vehicle_classes, from_date, to_date, currency } = obj
            if (!from_date || !to_date) continue


            if (!vehicle_classes) {
                vehicle_classes = []
            }
            let temArr = []
            for (let item of vehicle_classes) {
                let { vehicle_class_ids } = item
                if (!vehicle_class_ids || !vehicle_class_ids.length) continue
                temArr.push(item)
            }
            if (!temArr.length) continue
            let tem = {
                from_date,
                to_date,
                currency,
                vehicle_classes: temArr
            }
            dList.push(tem)
        }
        if (!dList.length) {
            dList = [this.originValue()]
        }
        return dList
    }

    isTimeOverlap(startA, endA, startB, endB) {
        if (new Date(endA) < new Date(startB)) {
            return false;
        }
        if (new Date(endB) < new Date(startA)) {
            return false;
        }
        return true;
    }

    async checkData(arr) {
        let cList = JSON.parse(JSON.stringify(arr))
        let flag = true
        while (cList.length) {
            let item = cList.shift()
            let { from_date: ifd, to_date: itt } = item

            if (ifd > itt) {
                await svcUtils.msgBox({
                    msg: 'End time cannot be earlier than start time, please check settings'
                })
                flag = false
                break
            }

            for (let obj of cList) {
                let { from_date, to_date } = obj
                let flag = this.isTimeOverlap(ifd, itt, from_date, to_date)
                if (flag) {
                    await svcUtils.msgBox({
                        msg: 'Time overlap, please check settings'
                    })
                    flag = true
                    return
                }
            }
        }
        return flag
    }

    originValue() {
        return {
            "from_date": '',
            "to_date": '',
            "currency": this.currencyCode,
            "vehicle_classes": [{
                "vehicle_class_ids": [],
                "percent": 0,
                "delta_amount": 0,
            }]
        }
    }

    initData() {
        let { currencyCode, vehicleClasses: vehiclesList, specific_date_surcharge } = serviceArea
        this.currencyCode = currencyCode
        if (!vehiclesList) {
            vehiclesList = []
        }
        this.vehiclesList = _filtSelectVehicles(vehiclesList)
        if (!specific_date_surcharge) {
            specific_date_surcharge = []
        }
        this.dList = this.dataHandler(specific_date_surcharge)
        // console.log('------this.dList-----', this.dList);
    }

    async pour() {
        this.curDataHandler()
        let list = this.dataHandler(this.dList)
        console.log('-------special date-----', list);
        serviceArea['specific_date_surcharge'] = list
        return true
    }
    show() {
        this.resetData()
        this.resetTime()
        this.initData()


        this.fillLeft()
        this.initVehicleType()
        this.rootElm.classList.remove('hide')
    }

    hide() {
        if (!this.pour()) return

        this.resetTime()
        this.rootElm.classList.add('hide')
    }

    async validate() {
        let flag = await this.checkData(this.dList)
        if (!flag) return
        return true
    }
}



function special_dragstart_handler(ev) {
    // Add the target element's id to the data transfer object
    ev.dataTransfer.setData("text/plain", ev.target.id);
}

function special_dragover_handler(ev) {
    ev.dataTransfer.dropEffect = "move";
    ev.preventDefault();
}

async function special_drop_handler(ev) {
    // Get the id of the target and add the moved element to the target's DOM

    let parentNode = ev.target.parentNode.parentNode
    let wrapper = null

    if (ev.target.classList.contains('selected-vehicles-cards')) {
        wrapper = ev.target
    } else if (parentNode.classList.contains('selected-vehicles-cards')) {
        wrapper = parentNode
    } else {
        return
    }

    // if (ev.target.classList.contains('selected-vehicles-cards') || parentNode.classList.contains('selected-vehicles-cards') ) {
    var data = ev.dataTransfer.getData("text/plain");
    let elm = document.getElementById(data)
    let id = Number(elm.getAttribute('card-id'))
    let del = elm.querySelector('.del')
    del.classList.remove('hide')
    wrapper.appendChild(elm);

    let idx = Number(wrapper.getAttribute('index'))
    let { dList, curIndex } = await specialDate()
    dList[curIndex].vehicle_classes.forEach(obj => {
        let index = obj.vehicle_class_ids.findIndex(i => i == id)
        if (index != -1) {
            obj.vehicle_class_ids.splice(index, 1)
        }
    })

    dList[curIndex].vehicle_classes[idx].vehicle_class_ids.push(id)
    // }
    ev.preventDefault();
}

