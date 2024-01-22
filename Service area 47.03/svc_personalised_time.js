class PersonalisedTime {
    constructor(id) {
        this.rootElm = document.getElementById(id)

        this.settingIndex = 0
        this.weekList = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
        this.dList = [
            // {
            //     "vehicles": [
            //         1
            //     ],
            //     "d": [
            //         {
            //             "idxList": [
            //                 0,
            //                 7,
            //                 14
            //             ],
            //             "percent": 70,
            //             "delta_amount": 0,
            //             "inputValue": 70
            //         },
            //         {
            //             "idxList": [
            //                 329
            //             ],
            //             "percent": 70,
            //             "delta_amount": 0,
            //             "inputValue": 70
            //         },
            //         {
            //             "idxList": [
            //                 1,
            //                 8
            //             ],
            //             "percent": 70,
            //             "delta_amount": 0,
            //             "inputValue": 70
            //         },
            //         {
            //             "idxList": [
            //                 26
            //             ],
            //             "percent": 20,
            //             "delta_amount": 0,
            //             "inputValue": 20
            //         }
            //     ]
            // },
            // {
            //     "vehicles": [
            //         1
            //     ],
            //     "d": [
            //         {
            //             "idxList": [
            //                 6,
            //                 13
            //             ],
            //             "percent": 20,
            //             "delta_amount": 0,
            //             "inputValue": 20
            //         }
            //     ]
            // }
        ]


        this.vehiclesList = [] // has price vehicle

        this.allItemList = []
        this.selectBox = {}
        this.scrollTop = 0

        this.selectElm = []
        this.addToIndex = false
        this.currency = 'USD'
        this.kTestIsShiftDown = false
        this.kTestIds = []


        this.initUi()
        this.fillWeekSelectBox()

        this.selectHandler()


        this.kTestPersonalised()


    }

    kTestPersonalised() {
        let isKTestDelStart = false

        this.rootElm.querySelector('.k-test-persionalised-box .start-del-btn').addEventListener('click', () => {
            isKTestDelStart = !isKTestDelStart
        })

        let timeSelectBox = this.rootElm.querySelector('.time-select-box')

        timeSelectBox.addEventListener('click', (e) => {
            if (this.kTestIsShiftDown) {
                let pNode = this.findParentNode(e.target)
                if (!pNode) return
                let idx = Number(pNode.getAttribute('idx'))
                console.log(idx);


                console.log(this.dList[this.settingIndex]);
                for (let item of this.dList[this.settingIndex].d) {
                    if (item.idxList.includes(idx)) {
                        this.kTestAddTo = item
                        console.log('aasdfsf');
                        break
                    }
                }

                console.log('---this.addTo---', this.kTestAddTo);
                this.kTestIds.push(idx)
            }
            if (isKTestDelStart) {
                this.showDelBtn(e)
                isKTestDelStart = false
            }
            e.stopPropagation()
        }, false)
        this.rootElm.querySelector('.k-test-persionalised-box .select-start').addEventListener('click', (e) => {
            console.log('---select-start---');
            this.kTestIsShiftDown = true

        })

        this.rootElm.querySelector('.k-test-persionalised-box .select-end').addEventListener('click', (e) => {
            console.log('---select-end---', this.kTestIds);
            this.kTestIsShiftDown = false
            if (this.kTestIds.length) {
                if (this.kTestAddTo) {
                    this.addTo = this.kTestAddTo
                }
                this.coveredHandler(this.kTestIds)
            }
            this.kTestIds = []
            this.addTo = null
            this.kTestAddTo = null
            this.addToIndex = false
        })

        let toup = this.rootElm.querySelector('.k-test-persionalised-box .toup')
        let todown = this.rootElm.querySelector('.k-test-persionalised-box .todown')

        let step = 40
        toup.addEventListener('click', () => {
            if (this.scrollTop <= 0) {
                this.scrollTop = 0
                return
            }
            timeSelectBox.scrollTo(0, this.scrollTop -= step)
        })
        todown.addEventListener('click', () => {
            timeSelectBox.scrollTo(0, this.scrollTop += step)
        })

        let kTestStartDelSetting = false
        this.rootElm.querySelector('.start-del-setting-btn').addEventListener('click', (e) => {
            kTestStartDelSetting = !kTestStartDelSetting
        })

        this.rootElm.querySelector('.top-box').addEventListener('click', (e) => {
            if (!kTestStartDelSetting) return
            let { clientX, clientY } = e
            let idx = Number(e.target.getAttribute('page'))
            if (!idx) return
            idx = idx - 1
            let obj = {
                detail: {
                    idx,
                    clientX, clientY
                }
            }
            this.showDelSettingBtn(obj)
            kTestStartDelSetting = false
            e.stopPropagation()
        })

    }
    delOperator() {
        let list = this.dList[this.settingIndex].d
        let index = list.findIndex(obj => obj.idxList.includes(Number(this.curPNode.getAttribute('idx'))))
        if (index == -1) return
        let sList = list.splice(index, 1)
        if (!sList.length) return
        let elmList = Array.from(this.allItemList).filter(elm => sList[0].idxList.includes(Number(elm.getAttribute('idx'))))
        this.resetElm(elmList)
        this.delBtn.classList.add('hide-scale')
    }

    showDelBtn(e) {
        this.curPNode = this.findParentNode(e.target)
        if (this.curPNode.getAttribute('isselect') != 'true') return
        let { clientX, clientY } = e
        this.delBtn.classList.remove('hide-scale')
        this.delBtn.style.left = clientX + 'px'
        this.delBtn.style.top = (clientY) + 'px'
    }

    selectHandler() {
        this.bindHandler = this.mousemoveHandler.bind(this)

        this.timeSelectBox.oncontextmenu = function (e) {
            return false
        }
        this.timeSelectBox.addEventListener('mousedown', (e) => {
            if (e.button == 0) {
                let { clientX, clientY } = e
                this.startX = clientX
                this.selectBoxStartY = clientY
                this.startY = clientY + this.scrollTop
                this.selectBox.left = this.startX
                this.selectBox.top = this.startY


                let target = e.target
                let pNode = this.findParentNode(target)
                if (!pNode) return

                this.addTo = this.dList[this.settingIndex].d.find(item => item.idxList.includes(Number(pNode.getAttribute('idx'))))


                this.timeSelectBox.addEventListener('mousemove', this.bindHandler)
            } else {
                this.showDelBtn(e)
            }
        })




        this.timeSelectBox.addEventListener('mouseup', () => {
            this.mouseUpHandler()
        })


        this.timeSelectBox.addEventListener('mouseleave', () => {
            this.mouseUpHandler()
        })
        this.timeSelectBox.addEventListener('scroll', (e) => {
            this.scrollTop = this.timeSelectBox.scrollTop

        })
    }


    mouseUpHandler() {
        this.onceSelectBox.style.transform = `scale(${0})`
        this.timeSelectBox.removeEventListener('mousemove', this.bindHandler)
        this.covered()
        this.selectBox = {}
        this.addToIndex = false
        this.addTo = null
    }


    showSelectBox() {
        this.onceSelectBox.style.transform = `scale(${1})`
        let { left, top, width, height } = this.selectBox
        this.onceSelectBox.style.left = left + 'px'
        this.onceSelectBox.style.top = (top - this.scrollTop) + 'px'
        this.onceSelectBox.style.width = width + 'px'
        this.onceSelectBox.style.height = height + 'px'
    }

    mousemoveHandler(e) {

        let { clientX, clientY } = e
        let moveY = clientY + this.scrollTop
        // console.log(clientX, moveY);
        this.selectBox.left = Math.min(clientX, this.startX)
        this.selectBox.top = Math.min(moveY, this.startY)

        this.selectBox.width = Math.abs(this.startX - clientX)
        this.selectBox.height = Math.abs(this.startY - moveY)

        this.showSelectBox()
    }




    covered() {
        let boxL = this.selectBox.left
        let boxT = this.selectBox.top
        let boxW = this.selectBox.width
        let boxH = this.selectBox.height
        let list = []



        for (let elm of this.allItemList) {
            let { left, right, top, bottom, width, height } = elm.getBoundingClientRect()
            top = top + this.scrollTop
            if (left + width > boxL && top + height > boxT && left < boxL + boxW && top < boxT + boxH) {

                if (elm.getAttribute('isSelect') && !this.addTo) {
                    break
                }

                if (this.addTo) {
                    let weekIdx = Array.from(this.allItemList).find(elm => Number(elm.getAttribute('idx') == this.addTo.idxList[0])).getAttribute('week-idx')

                    if (Number(elm.getAttribute('week-idx')) < Number(weekIdx)) {
                        break
                    }


                    let addToIndex = this.dList[this.settingIndex].d.findIndex(item => item.idxList[0] == this.addTo.idxList[0])

                    let elmIndex = this.dList[this.settingIndex].d.findIndex(item => item.idxList.includes(Number(elm.getAttribute('idx'))))

                    //has selected
                    if (elmIndex != -1 && addToIndex != elmIndex) {
                        break
                    }

                    let addToFirstElm = Array.from(this.allItemList).find(item => item.getAttribute('idx') == this.addTo.idxList[0])
                    //mouse to up
                    if (Number(elm.getAttribute('idx')) < Number(addToFirstElm.getAttribute('idx'))) {
                        break
                    }
                }
                list.push(Number(elm.getAttribute('idx')))
            }
        }
        if (list.length) {
            console.log('list', list);
            this.coveredHandler(list)
        }
    }

    coveredHandler(list) {
        if (this.addTo) {
            let { minTIdx, maxTIdx, minWeekIdx, maxWeekIdx } = this.getMinAndMaxIdx()
            let addList = []
            for (let idx of list) {
                if (this.addTo.idxList.includes(idx)) continue
                let elm = Array.from(this.allItemList).find(item => item.getAttribute('idx') == idx)
                let elmTIdx = Number(elm.getAttribute('t-idx'))
                let elmWeekIdx = Number(elm.getAttribute('week-idx'))
                maxTIdx = maxTIdx > elmTIdx ? maxTIdx : elmTIdx
                maxWeekIdx = maxWeekIdx > elmWeekIdx ? maxWeekIdx : elmWeekIdx
                for (let item of this.allItemList) {
                    let itemTIdx = Number(item.getAttribute('t-idx'))
                    let itemWeekIdx = Number(item.getAttribute('week-idx'))
                    let idx = Number(item.getAttribute('idx'))
                    if (this.addTo.idxList.includes(idx)) continue

                    if (itemTIdx >= minTIdx && itemTIdx <= maxTIdx && itemWeekIdx >= minWeekIdx && itemWeekIdx <= maxWeekIdx) {
                        if (item.getAttribute('isselect') == 'true') {
                            addList = []
                            break
                        }
                        addList.push(Number(item.getAttribute('idx')))
                    }
                }
                this.addTo.idxList.push(...addList)
            }

            this.resetElm(Array.from(this.allItemList).filter(item => this.addTo.idxList.includes(Number(item.getAttribute('idx')))))
            let index = this.dList[this.settingIndex].d.findIndex(item => item.idxList[0] == this.addTo.idxList[0])
            this.addTo['ts'] = new Date().getTime()
            this.dList[this.settingIndex].d[index] = this.addTo

            this.elmListHandler(this.dList[this.settingIndex].d[index])

        } else {
            let { minTIdx, maxTIdx, minWeekIdx, maxWeekIdx } = this.getMinAndMaxIdx({ idxList: list })

            let arr = list
            for (let i = minTIdx + 1; i <= maxTIdx; i++) {
                let sameTIdxList = Array.from(this.allItemList).filter(item => item.getAttribute('t-idx') == i)

                let index = sameTIdxList.findIndex(item => item.getAttribute('isselect') == 'true' && Number(item.getAttribute('week-idx') <= maxWeekIdx) && Number(item.getAttribute('week-idx') >= minWeekIdx))
                if (index != -1) {
                    arr = list.filter(idx => idx < i * 7)

                }
            }


            let obj = {
                idxList: arr,
                percent: 0,
                inputValue: 0,
                ts: new Date().getTime()
            }
            this.elmListHandler(obj)
            this.dList[this.settingIndex].d.push(obj)
        }
    }

    getMinAndMaxIdx(list = this.addTo) {

        let tIdxArr = []
        let weekIdxArr = []
        list.idxList.forEach(idx => {
            let elm = Array.from(this.allItemList).find(item => item.getAttribute('idx') == idx)
            tIdxArr.push(Number(elm.getAttribute('t-idx')))
            weekIdxArr.push(Number(elm.getAttribute('week-idx')))
        })

        let minTIdx = Math.min(...tIdxArr)
        let maxTIdx = Math.max(...tIdxArr)

        let minWeekIdx = Math.min(...weekIdxArr)
        let maxWeekIdx = Math.max(...weekIdxArr)

        return { minTIdx, maxTIdx, minWeekIdx, maxWeekIdx }
    }




    elmListHandler(obj) {
        console.log('elmListHandler_obj=======', obj);
        let { idxList, percent, delta_amount, inputValue, classStr } = obj
        let list = Array.from(this.allItemList).filter(item => idxList.includes(Number(item.getAttribute('idx'))))
        // console.log('------handlerList=----', idxList);
        let randomClassStr = classStr
        if (!classStr) {
            randomClassStr = `mask-${this.getRandomNum()}`
            obj['classStr'] = randomClassStr
        }

        let first = list[0]
        let idx = Number(first.getAttribute('idx'))
        let tIdx = first.getAttribute('t-idx')

        first.querySelector('.mask').classList.add('first-mask')

        let addInput = this.rootElm.querySelector('.add-input').cloneNode(true)
        addInput.classList.remove('hide')
        addInput.value = inputValue
        first.appendChild(addInput)

        let dropdownBox = this.rootElm.querySelector('.dorpdown-box').cloneNode(true)
        dropdownBox.classList.remove('hide')

        first.appendChild(dropdownBox)


        let input = dropdownBox.querySelector('.input')

        addInput.addEventListener('input', (e) => {
            const regex = /^-?\d*(\.\d{0,2})?$/;
            const isValid = regex.test(e.target.value);
            if (!isValid) {
              e.target.value = e.target.value.slice(0, -1);
            } else if (parseFloat(e.target.value) < -90 && input.value == '%') {
              e.target.value = '-90';
            }

            obj.inputValue = e.target.value && inputValue != '-' ? e.target.value : ''
            if (input.value == '%') {
                obj.percent = e.target.value
            } else {
                obj.delta_amount = e.target.value
            }
            console.log(obj, input.value);
        })


        let currencyDropdown = new TextAutoComp(input, {
            str: (item) => {
                return [item.name];
            },

            sel: (item, hovElm) => {
                if (item) {
                    let { name } = item

                    if (name == '%') {
                        obj.percent = obj.inputValue
                        obj.delta_amount = 0
                        if (addInput.value < -90) {
                            addInput.value = 0
                            obj.percent = 0
                            obj.inputValue = 0
                        }
                    } else {
                        obj.delta_amount = obj.inputValue
                        obj.percent = 0
                    }
                }
            }
        })
        currencyDropdown.setItems([
            {
                name: '%',
            },
            {
                name: this.currency,
            },
        ])

        currencyDropdown.filter = false
        // }

        input.value = obj.delta_amount ? this.currency : '%'
        if (tIdx == 47) {
            dropdownBox.querySelector('.dropdown').style.top = '-95px'
        }

        // dropdownBox.querySelector('.icon').addEventListener('click', () => {
        //     input.focus()
        // })

        let weekIdx = first.getAttribute('week-idx')
        let end = list.findLast(item => item.getAttribute('week-idx') == weekIdx)
        end.querySelector('.mask').classList.add('last-mask')

        for (let elm of list) {
            let elmTIdx = elm.getAttribute('t-idx')
            let mask = elm.querySelector('.mask')
            mask.classList.remove('hide-scale')
            mask.classList.add(randomClassStr)
            elm.setAttribute('isSelect', true)

            let elmWeekIdx = elm.getAttribute('week-idx')
            if (elmWeekIdx == weekIdx) {
                mask.querySelector('.left-bg').classList.remove('hide')
            }
        }
    }


    resetElm(list) {

        for (let elm of list) {
            let mask = elm.querySelector('.mask')
            mask.className = 'mask hide-scale'
            mask.querySelector('.left-bg').classList.add('hide')
            elm.removeAttribute('isselect')


            let addInput = elm.querySelector('.add-input')
            if (addInput) {
                elm.removeChild(addInput)
            }
            let dropdownBox = elm.querySelector('.dorpdown-box')
            if (dropdownBox) {
                elm.removeChild(dropdownBox)
            }

            // dropdownBox.classList.add('hide')
            // let dropdown = dropdownBox.querySelector('.dropdown')
            // if (dropdown) {
            //     dropdownBox.removeChild(dropdown)
            // }
        }
    }

    getRandomNum() {
        let num = Math.floor(Math.random() * 5)
        return num
    }



    fillWeekSelectBox() {
        let timeSelectBox = this.rootElm.querySelector('.time-select-box')
        let timeSelectItem = this.rootElm.querySelector('.time-select-item')


        let hourItem = this.rootElm.querySelector('.hour-item')

        let fragment = document.createDocumentFragment()


        let firstItem = this.fillWeek(timeSelectItem, hourItem)

        fragment.appendChild(firstItem)
        let k = 0
        for (let i = 0; i < 48; i++) {
            let cTimeSelectItem = timeSelectItem.cloneNode(true)

            cTimeSelectItem.classList.add('other-item')
            cTimeSelectItem.classList.remove('hide')
            let time = cTimeSelectItem.querySelector('.time')

            let minutes = '30'
            if (i % 2 == 0) {
                minutes = '00'
            }
            let h = Math.floor(i / 2)
            let hour = h < 10 ? '0' + h : h
            time.innerText = `${hour}:${minutes}`



            let weekSelectBox = cTimeSelectItem.querySelector('.week-select-box')
            for (let j = 0; j < 7; j++) {
                let cHourItem = hourItem.cloneNode(true)

                cHourItem.id = `k-test-hour-item-${i}-${j}`
                cHourItem.classList.remove('hide')

                cHourItem.setAttribute('t-idx', i)
                cHourItem.setAttribute('week-idx', j)
                cHourItem.setAttribute('idx', k)
                k++


                weekSelectBox.appendChild(cHourItem)
                let mask = cHourItem.querySelector('.mask')
                // if (i == 1) {
                //     mask.classList.remove('hide-scale')
                // }
            }

            fragment.appendChild(cTimeSelectItem)
        }

        timeSelectBox.appendChild(fragment)

        this.timeSelectBox = timeSelectBox
        let div = document.createElement('DIV')
        div.classList.add('once-select-box')
        this.onceSelectBox = div
        this.timeSelectBox.appendChild(div)

        setTimeout(() => {
            this.allItemList = this.timeSelectBox.querySelectorAll('.other-item .hour-item')
        }, 200);
    }

    fillWeek(timeSelectItem, hourItem) {

        let cTimeSelectItem = timeSelectItem.cloneNode(true)
        cTimeSelectItem.classList.remove('hide')
        cTimeSelectItem.classList.add('first-item')

        let weekSelectBox = cTimeSelectItem.querySelector('.week-select-box')
        for (let day of this.weekList) {
            let cHourItem = hourItem.cloneNode(true)
            cHourItem.classList.remove('hide')

            cHourItem.innerText = day
            weekSelectBox.appendChild(cHourItem)


        }


        return cTimeSelectItem

    }

    showDelSettingBtn(e) {
        this.settingDelBtn.classList.remove('hide-scale')
        let { clientX, clientY, idx } = e.detail
        console.log(e.detail);
        this.settingDelBtn.style.left = clientX + 'px'
        this.settingDelBtn.style.top = clientY + 'px'
        this.delSettingIndex = idx
    }

    initUi() {
        let addSettingBtn = this.rootElm.querySelector('.i-add')

        addSettingBtn.addEventListener('click', () => {
            this.dList.push(
                {
                    d: [],
                    vehicles: []
                }
            )
            let len = this.dList.length
            this.settingIndex = len - 1
            // console.log(this.dList);


            this.initSettingList()
            this.settingEntity.changeIndex(len)

            this.renderPage()
        })


        let settingDelBtn = this.rootElm.querySelector('.setting-del-btn')
        this.settingDelBtn = settingDelBtn
        document.addEventListener('svc-delSetting', (e) => {
            this.showDelSettingBtn(e)
        })

        settingDelBtn.addEventListener('click', () => {
            this.dList.splice(this.delSettingIndex, 1)
            if (this.dList.length == 0) {
                this.dList = [
                    {
                        d: [],
                        vehicles: []
                    }
                ]
            }

            if (this.settingIndex > this.dList.length - 1) {
                this.settingIndex = this.dList.length - 1
            }

            this.initSettingList()
            this.renderPage()


            settingDelBtn.classList.add('hide-scale')
        })



        document.addEventListener('changePage', (e) => {
            this.settingIndex = e.detail
            this.renderPage()
        })
        document.addEventListener('svc-changeTitle', (e) => {
            let { inputValue, pageNo } = e.detail
            this.dList[pageNo - 1].sname = inputValue
        })

        this.delBtn = this.rootElm.querySelector('.del-btn')

        this.delBtn.addEventListener('click', () => {
            this.delOperator()
        }, false)

        document.addEventListener('click', () => {
            this.delBtn.classList.add('hide-scale')

            this.settingDelBtn.classList.add('hide-scale')
        })

        // document.querySelector('.add-new-rule-box').addEventListener('click', () => {
        //     console.log(this.dList);
        //     this.pour()
        // })
    }

    renderPage() {
        this.resetElm(this.allItemList)
        for (let item of this.dList[this.settingIndex].d) {
            this.elmListHandler(item)
        }

        this.initVehicleType()
    }

    initSettingList() {
        let titleList = []
        this.dList.forEach((item, index) => {
            let { sname } = item
            titleList.push(sname ? sname : `setting${index + 1}`)
        })
        let box = this.rootElm.querySelector('.select-box')
        this.settingEntity = new WcPageination({
            rootElm: box,
            // pageCount:1000,
            pageIndex: this.settingIndex + 1,
            titleList: titleList
        })


    }

    getActiveIds() {
        let upIndex = this.upIndex || this.startIndex
        let curWeekData = this.getCurWeekData()
        let curDayData = curWeekData.find(item => item.activeIds.includes(this.startIndex))
        let startIndex = this.startIndex
        if (curDayData) {
            startIndex = curDayData['activeIds'][0]
        }
        let arr = []
        for (let i = startIndex; i <= upIndex; i++) {
            arr.push(i)
        }
        if (this.upIndex == startIndex) {
            arr = [startIndex]
        }
        return arr
    }

    initVehicleType() {
        let rightBox = this.rootElm.querySelector('.right')
        rightBox.innerHTML = ''
        let cardsBox = this.rootElm.querySelector('.cards-box')

        let itemElm = cardsBox.querySelector('.item')

        let cardType = ['Small car', 'Lucury car', 'Large car']
        if (langCode == 'zho') {
            cardType = ['小型车', '豪华轿车', '大型汽车']
        }

        let fragment = document.createDocumentFragment()
        let fragmentActive = document.createDocumentFragment()
        let i = 1
        let idNum = 0
        let activeVehicle = []
        for (let obj of this.dList) {
            activeVehicle.push(...obj.vehicles)
        }

        for (let type of cardType) {
            let cCardsBox = cardsBox.cloneNode(true)
            cCardsBox.classList.remove('hide')
            cCardsBox.classList.add(`cards-box-${i}`)

            let top = cCardsBox.querySelector('.top')
            top.innerText = type

            let list = cCardsBox.querySelector('.list')

            let filterCards = this.vehiclesList.filter(item => item.carType == i)

            for (let card of filterCards) {
                let cItemElm = itemElm.cloneNode(true)
                cItemElm.id = `card-item-${idNum}`
                cItemElm.classList.add(`v-card-item-${idNum}`)
                idNum++
                cItemElm.classList.remove('hide')
                cItemElm.setAttribute('card-id', card.vehicle_id)
                cItemElm.setAttribute('card-type', i)
                let name = cItemElm.querySelector('.item-name')
                name.innerText = card.shortName || card.vehicle_name

                let del = cItemElm.querySelector('.del')
                del.addEventListener('click', (e) => {
                    this.recoverCard(e)
                })
                cItemElm.addEventListener("dragstart", dragstart_handler);

                let kItemMove = cItemElm.querySelector('.k-item-move')
                kItemMove.id = `card-item-${idNum}`
                kItemMove.addEventListener('click', e => {
                    this.setVihicleAdd(cItemElm)
                })


                if (this.dList[this.settingIndex].vehicles.includes(card.vehicle_id)) {
                    let del = cItemElm.querySelector('.del')
                    del.classList.remove('hide')
                    fragmentActive.appendChild(cItemElm)
                } else {
                    if (!activeVehicle.includes(card.vehicle_id)) {
                        list.appendChild(cItemElm)
                    }
                }
            }
            fragment.appendChild(cCardsBox)
            i++
        }
        rightBox.appendChild(fragment)

        let selectedVehiclesCards = this.rootElm.querySelector('.selected-vehicles-cards')
        selectedVehiclesCards.innerHTML = ''
        selectedVehiclesCards.appendChild(fragmentActive)
    }

    //this methos for Kevin's test.do not delete!
    setVihicleAdd(elm) {

        let id = Number(elm.getAttribute('card-id'))

        let del = elm.querySelector('.del')
        del.classList.remove('hide')

        let selectedVehiclesCards = this.rootElm.querySelector('.selected-vehicles-cards')
        selectedVehiclesCards.appendChild(elm)

        let activeArr = this.dList[this.settingIndex].vehicles
        let index = activeArr.findIndex(item => item == id)
        if (index == -1) {
            activeArr.push(id)
        }


        console.log(activeArr);

    }

    recoverCard(e) {
        let target = e.target
        target.classList.add('hide')

        let pNode = target.parentNode

        let typeNum = pNode.getAttribute('card-type')
        let id = Number(pNode.getAttribute('card-id'))

        let index = this.vehiclesList.findIndex(item => item.vehicle_id == id)

        if (index != -1) {
            let box = this.rootElm.querySelector(`.cards-box-${typeNum} .list`)
            box.appendChild(pNode)
        } else {
            pNode.parentNode.removeChild(pNode)
        }

        let activeArr = this.dList[this.settingIndex].vehicles
        activeArr.splice(activeArr.findIndex(item => item == id), 1)



    }


    fromTo2Id(from = '00:00', to = '01:30', weekday = 0) {
        let arr = []

        let f = Number(from.replace(':', '.').replace('30', '5'))
        let t = Number(to.replace(':', '.').replace('30', '5'))

        for (let i = f; i < t; i += 0.5) {

            arr.push((i * 2 * 7) + weekday)

        }

        return arr
    }

    idxToFromTo(idx = 0, weekdayIndex = 0, type = 'from') {
        let hour = '00'
        let minutes = '00'
        let t = (idx - weekdayIndex) / 7 / 2
        if (type == 'to') {
            t += 0.5
        }
        let arr = String(t).split('.')
        hour = Number(arr[0])
        if (hour < 10) {
            hour = '0' + hour
        }
        if (Number(arr[1]) == 5) {
            minutes = '30'
        }
        let time = `${hour}:${minutes}`
        if (time == '24:00') {
            time = '23:59'
        }
        return time
    }



    //Get the element with class name is template-time
    findParentNode(elm) {
        if (!elm) {
            return
        }
        let className = elm.className
        if (className == 'hour-item') {
            return elm
        } else {
            return this.findParentNode(elm.parentNode)
        }
    }




    pour() {
        let arr = []

        this.dList.forEach((item, index) => {
            let tem = {}
            // obj['notice_time_hint'] = []

            let temArr = [[], [], [], [], [], [], []]

            let { d, vehicles, sname } = item

            for (let obj of d) {
                let { percent, delta_amount, ts } = obj
                let weekObj = {}
                for (let idx of obj.idxList) {
                    let week = idx % 7
                    if (weekObj[week]) {
                        weekObj[week].push(idx)
                    } else {
                        weekObj[week] = [idx]
                    }
                }

                for (let [key, value] of Object.entries(weekObj)) {
                    value.sort((a, b) => a - b)

                    let item = {
                        "from": this.idxToFromTo(value[0], key, 'from'),
                        "to": this.idxToFromTo(value[value.length - 1], key, 'to'),
                        break: obj.break || false
                    }

                    if (percent) {
                        item['percent'] = percent
                    } else if (delta_amount) {
                        item['delta_amount'] = delta_amount
                    } else {
                        item['percent'] = 0
                    }

                    if (ts) {
                        item['ts'] = ts
                    }

                    temArr[key].push(item)
                }
            }

            let notice_time_hint = []
            for (let arr of temArr) {
                if (arr.length == 0) {
                    notice_time_hint.push('null')
                } else {
                    notice_time_hint.push(arr)
                }
            }

            tem['notice_time_hint'] = notice_time_hint
            tem['vehicles'] = vehicles
            tem['sname'] = sname

            arr.push(tem)
        })

        serviceArea['pricing_schedule_sum'] = arr
        console.log('===svc-personalised=====', serviceArea);
    }

    show() {
        this.resetElm(this.allItemList)
        let { pricing_schedule_sum, currencyCode, vehicleClasses: vehiclesList } = serviceArea
        this.currency = currencyCode
        if (!pricing_schedule_sum) {
            pricing_schedule_sum = []
        }

        if (!vehiclesList) {
            vehiclesList = []
        }

        this.vehiclesList = _filtSelectVehicles(vehiclesList)

        let pricingScheduleSum = JSON.parse(JSON.stringify(pricing_schedule_sum))
        let dList = []
        let findedTS = []
        pricingScheduleSum.forEach((schedule, idx) => {
            let { notice_time_hint, vehicles, sname } = schedule
            let obj = {}
            let i = 0
            let selectTimeList = []
            for (let arr of notice_time_hint) {
                if (!Array.isArray(arr)) {
                    i++
                    continue
                }
                for (let d of arr) {
                    let { percent, delta_amount, ts, } = d
                    let sameTSIndex = []
                    let k = 0
                    if (ts) {
                        let idx = findedTS.findIndex(tsItem => tsItem == ts)
                        if (idx != -1) continue
                        findedTS.push(ts)
                        for (let temArr of notice_time_hint) {
                            if (!Array.isArray(temArr)) {
                                k++
                                continue
                            }
                            let obj = temArr.find(o => o.ts == ts)
                            if (obj) {
                                sameTSIndex.push({
                                    idx: k,
                                    d: obj
                                })
                                k++
                                continue
                            }
                            k++
                        }
                    }
                    let idxList = []
                    if (sameTSIndex.length) {
                        for (let obj of sameTSIndex) {
                            idxList.push(...this.fromTo2Id(obj.d.from, obj.d.to, obj.idx))
                        }
                    } else {
                        idxList.push(...this.fromTo2Id(d.from, d.to, i))
                    }

                    idxList.sort((a, b) => a - b)

                    let stList = {
                        idxList,
                        inputValue: percent || delta_amount || 0,
                        percent: percent || 0,
                        delta_amount: delta_amount || 0,
                        break: d.break
                    }
                    if (ts) {
                        stList['ts'] = ts
                    }
                    selectTimeList.push(stList)
                }
                i++
            }

            obj['d'] = selectTimeList
            obj['vehicles'] = vehicles || []
            obj['sname'] = sname || ''

            dList.push(obj)
        })

        console.log('=------dList---', dList);

        if (dList.length == 0) {
            dList = [
                {
                    d: [],
                    vehicles: []
                }
            ]
        }


        this.dList = dList
        setTimeout(() => {
            for (let item of dList[this.settingIndex].d) {
                this.elmListHandler(item)
            }
        }, 500)

        this.initSettingList()

        this.initVehicleType()
        this.rootElm.classList.remove('hide')

    }



    hide() {
        this.pour()
        this.rootElm.classList.add('hide')
    }

    validate(){
        return true
    }
}


function dragstart_handler(ev) {
    // Add the target element's id to the data transfer object
    // ev.dataTransfer.setData("text/plain", ev.target.id);
    ev.dataTransfer.setData("text/plain", ev.target.classList[1]);
}

function dragover_handler(ev) {
    ev.dataTransfer.dropEffect = "move";
    ev.preventDefault();
}

function drop_handler(ev) {
    // Get the id of the target and add the moved element to the target's DOM
    if (ev.target.className == 'selected-vehicles-cards') {
        var data = ev.dataTransfer.getData("text/plain");
        // let elm = document.getElementById(data)
        let elm = document.querySelector(`.${data}`)

        let id = Number(elm.getAttribute('card-id'))
        let activeArr = personalisedTime().dList[personalisedTime().settingIndex].vehicles
        let del = elm.querySelector('.del')
        del.classList.remove('hide')
        ev.target.appendChild(elm);

        let index = activeArr.findIndex(item => item == id)
        if (index == -1) {
            activeArr.push(id)
        }
    }
    ev.preventDefault();
}


