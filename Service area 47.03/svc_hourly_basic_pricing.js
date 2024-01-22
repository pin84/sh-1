class BasicPricingHourly extends Container {
    constructor(id = 'hourly-pricing') {
        super()
        this.rootElm = document.getElementById(id)
        this.startPrice = this.rootElm.querySelector('#start-price')
        this.lowPriceEnd = this.rootElm.querySelector('#low-price-end')
        
        this.addRangeBtn = this.rootElm.querySelector("#add-range-button");
        console.log('startPrice', this.startPrice);
        let calcBtn = this.rootElm.querySelector('.calc-btn');
        let resultBox = this.rootElm.querySelector('.result-num')
        let it = this
        calcBtn.onclick = function () {
            let calcCount = it.rootElm.querySelector('.couter-input').value - 0
            if (!it.checkRangeNumFn()) {
                it.initElms()
                return
            }
            it.initElms()
            console.log('calcCount======', calcCount);
            if (!calcCount) {
                resultBox.textContent = 0
                console.log('resultBox.textContent_1', resultBox.textContent);
            } else if (calcCount <= it.defaultData.min_duration) {
                resultBox.textContent = it.defaultData.min_amount
                console.log('resultBox.textContent_2', resultBox.textContent);
            } else {
                resultBox.textContent = ((it.defaultData.min_amount - 0) + it.calcFee(calcCount - it.defaultData.min_duration)).toFixed(2)
                console.log('resultBox.textContent_3', resultBox.textContent);
            }
        }


    }
    validate() {
        let it = this
        if (!it.checkRangeNumFn()) {
            it.initElms()
            return false
        }
        it.initElms()
        return true
    }

    initElms() {
        // console.log('this', this);
        let it = this
        this.startPrice.value = this.defaultData.min_amount
        it.lowPriceEnd.value = this.defaultData.min_duration
        let getData = this.defaultData.ranges
        let rangeList = this.rootElm.querySelector('#range-list')
        let itemContent = this.rootElm.querySelector('.range-item-box')
        let fragment = document.createDocumentFragment()
        let priceUnits = this.rootElm.querySelectorAll('.price-unit')
        if (isReadOnly()) {
            this.startPrice.readOnly = 'readonly'
            this.lowPriceEnd.readOnly = 'readonly'
        } else {
            this.startPrice.readOnly = false
            this.lowPriceEnd.readOnly = false
        }
        let resultUnitInput = this.rootElm.querySelector('.result-unit')

        resultUnitInput.textContent = serviceArea.currencyCode
        priceUnits.forEach(item => {
            item.textContent = serviceArea.currencyCode
        })
        // let rangeUnits = this.rootElm.querySelectorAll('.range-unit')
        // rangeUnits.forEach(item => {
        // item.textContent = 'hour'
        // })

        this.startPrice.addEventListener('focus', (e) => {
            // inputEl.classList.add('focused');
            this.rootElm.querySelector('.start-price-box').classList.add('start-price-box-entering')
        });
        this.startPrice.addEventListener('blur', () => {
            // inputEl.classList.remove('focused');
            this.rootElm.querySelector('.start-price-box').classList.remove('start-price-box-entering')
        });
        this.lowPriceEnd.addEventListener('focus', (e) => {
            // inputEl.classList.add('focused');
            this.rootElm.querySelector('.endrange-num-box').classList.add('endrange-num-box-entering')
        });

        this.lowPriceEnd.addEventListener('blur', () => {
            // inputEl.classList.remove('focused');
            this.rootElm.querySelector('.endrange-num-box').classList.remove('endrange-num-box-entering')
        });

        this.startPrice.onblur = function (e) {
            it.checkRangeNumFn()
            it.initElms()
        }
        it.lowPriceEnd.onblur = function (e) {
            it.defaultData.min_duration = e.target.value ? e.target.value - 0 : ''
            if (it.defaultData.ranges.length) {
                it.defaultData.ranges[0].from = e.target.value || ''
            }
            it.checkRangeNumFn()
            it.initElms()
        }
        it.startPrice.addEventListener('input', function (e) {
            it.defaultData.min_amount = e.target.value ? e.target.value - 0 : 0
        })

        let k = 0
        for (let obj of getData) {
            // console.log('obj', obj);
            // console.log('mtr2mkm(123123, it.countryIm)', mtr2mkm(123123, it.countryIm));
            let cItemContent = itemContent.cloneNode(true)
            cItemContent.style.display = ''
            cItemContent.querySelector('.del-item-box').style.visibility = "hidden";
            let startInput = cItemContent.querySelector('.range-item-startnum')
            let endInput = cItemContent.querySelector('.range-item-endnum')
            let unitInput = cItemContent.querySelector('.unit-num')
            startInput.value = obj.from
            endInput.value = obj.to
            unitInput.value = it.lowPriceEnd.value ? obj.amount : 0;

            if (isReadOnly()) {
                unitInput.readOnly = 'readonly'
                endInput.readOnly = 'readonly'
            } else {
                unitInput.readOnly = false
                endInput.readOnly = false
            }
            if (obj.fromActivy || obj.fromActivy_2) {
                startInput.parentNode.classList.add('range-input-activy');
            } else {
                startInput.parentNode.classList.remove('range-input-activy');
            }
            if (obj.toActivy || obj.toActivy_2) {
                endInput.parentNode.classList.add('range-input-activy');
            } else {
                endInput.parentNode.classList.remove('range-input-activy');
            }
            if (obj.amountActivy) {
                unitInput.parentNode.classList.add('unitnum-box-activy');
            } else {
                unitInput.parentNode.classList.remove('unitnum-box-activy');
            }
            // range-input-activy
            (function (k) {
                endInput.onfocus = function (e) {
                    e.target.parentNode.classList.add('range-input-activy2')
                    e.target.parentNode.classList.add('range-input-entering')
                }
                endInput.onblur = function (e) {
                    e.target.parentNode.classList.remove('range-input-activy2')
                    e.target.parentNode.classList.remove('range-input-entering')
                    // console.log('it.defaultData.ranges[i].to', it.defaultData.ranges[k]);
                    // console.log('it.defaultData.ranges[i].to', k);
                    it.defaultData.ranges[k].to = e.target.value - 0
                    if (k < getData.length - 1) {
                        it.defaultData.ranges[k + 1].from = e.target.value - 0
                    }
                    it.checkRangeNumFn()
                    it.initElms()
                }
                unitInput.onfocus = function (e) {
                    e.target.parentNode.classList.add('unitnum-box-activy2')
                    e.target.parentNode.classList.add('unitnum-box-entering')
                }
                unitInput.onblur = function (e) {
                    e.target.parentNode.classList.remove('unitnum-box-activy2')
                    e.target.parentNode.classList.remove('unitnum-box-entering')
                    it.defaultData.ranges[k].amount = e.target.value ? e.target.value - 0 : ''
                    it.checkRangeNumFn()
                    it.initElms()
                }
                // && getData.length > 1
                if (k == getData.length - 1) {
                    let delBox = cItemContent.querySelector('.del-item-box')
                    delBox.style.visibility = "visible";
                    delBox.onclick = function () {
                        if (k === 0) {
                            it.defaultData.ranges[0].to = 0
                            it.defaultData.ranges[0].amount = 0
                            it.initElms()
                        } else {
                            it.defaultData.ranges.splice(k, 1)
                            it.initElms()
                        }
                    }
                }
            })(k);
            fragment.appendChild(cItemContent);
            k++
        }
        rangeList.innerHTML = ''
        rangeList.appendChild(fragment)
        it.addRangeBtn.onclick = function () {
            console.log('checkRangeNumFn()_return', it.checkRangeNumFn());
            if (!it.checkRangeNumFn()) {
                it.initElms()
                return
            }
            it.initElms()
            console.log('it.defaultData.ranges', it.defaultData.ranges);
            let index = it.defaultData.ranges.length
            let newItem = {
                "seq": index,
                "amount": '',
                "currency": serviceArea.currencyCode,
                "duration": 0,
                "from": index == 0 ? it.defaultData.min_duration : it.defaultData.ranges[index - 1].to,
                "to": '',
            }
            it.defaultData.ranges.push(newItem)
            let item = itemContent.cloneNode(true)
            item.querySelector('.range-item-startnum').value = newItem['from']
            item.querySelector('.range-item-endnum').value = newItem['to']
            item.querySelector('.unit-num').value = newItem['amount']
            rangeList.appendChild(item)
            it.initElms()
        }
        // content += '<div id="add-range-button" class="add-item-btn">Add Distance and Price</div>'
        // rangeList.insertAdjacentHTML('afterbegin', content)

    }

    calcFee(duration) {
        let totalFee = 0;
        for (let i = 0; i < this.defaultData.ranges.length; i++) {
            if (duration <= 0) {
                break;
            }
            const range = this.defaultData.ranges[i].to - this.defaultData.ranges[i].from;
            const feePerKm = this.defaultData.ranges[i].amount;
            const kmInThisRange = Math.min(range, duration);
            const feeInThisRange = kmInThisRange * feePerKm;
            totalFee += feeInThisRange;
            duration -= kmInThisRange;
            console.log('totalFee', totalFee);
        }
        if (duration > 0) {
            const lastFeePerKm = this.defaultData.ranges[this.defaultData.ranges.length - 1].amount;
            totalFee += duration * lastFeePerKm;
        }
        return totalFee;
    }
    checkRangeNumFn() {
        let getData = this.defaultData.ranges
        // console.log('this.defaultData', this.defaultData);
        let startPriceBox = this.rootElm.querySelector('.start-price-box')
        let endrangeNumBox = this.rootElm.querySelector('.endrange-num-box')
        let priceFlag = true
        if (this.lowPriceEnd.value < 0) {
            priceFlag = false
            endrangeNumBox.classList.add('endrange-num-box-activy')
        } else {
            endrangeNumBox.classList.remove('endrange-num-box-activy')
        }
        if (this.startPrice.value < 0) {
            priceFlag = false
            startPriceBox.classList.add('start-price-box-activy')
        } else {
            startPriceBox.classList.remove('start-price-box-activy')
        }
        if (this.defaultData.ranges && this.defaultData.ranges.lenth != 0) {
            let showFlag = false
            this.defaultData.ranges.forEach((item, index) => {
                if (item.from && item.to <= item.from) {
                    this.defaultData.ranges[index]['toActivy'] = true
                    if (index < this.defaultData.ranges.length - 1) this.defaultData.ranges[index + 1]['fromActivy'] = true;
                } else {
                    item['toActivy'] = false
                    if (index < this.defaultData.ranges.length - 1) this.defaultData.ranges[index + 1]['fromActivy'] = false
                }
                item['amountActivy'] = Boolean(item.amount < 0) || item.amount === ''
                item['fromActivy_2'] = Boolean(item.from < 0)
                item['toActivy_2'] = Boolean(item.to < 0)
                if (!(this.lowPriceEnd.value - 0)) item['amountActivy'] = false
                showFlag = item['amountActivy'] || item['fromActivy_2'] || item['fromActivy_2']
            });
            if (showFlag) return false
            return this.defaultData.ranges.every(item => item.amount >= 0 && item.from >= 0 && item.to >= 0 && item.from > 0 ? item.from < item.to : true) && priceFlag
        } else {
            return false
        }
    }
    pour(serviceAreaData) {
        let pourData = JSON.parse(JSON.stringify(this.defaultData))
        let { ranges, min_duration, currency } = pourData
        pourData.currency = serviceAreaData.currencyCode
        if (ranges) {
            for (let item of ranges) {
                item.currency = serviceAreaData.currencyCode
                item.duration = item.to - item.from
                delete item.amountActivy
                delete item.fromActivy
                delete item.fromActivy_2
                delete item.toActivy
                delete item.toActivy_2
            }
        }
        if (pourData.min_duration) {
            serviceAreaData.hourly_pricing = pourData
        } else {
            delete serviceAreaData.hourly_pricing
        }

    }
    show() {
        let it = this
        console.log('-----serviceArea-rangePrices-------', serviceArea);
        this.countryIm = imByCountry(serviceArea.countryCode)
        if (serviceArea.hourly_pricing) {
            let cData = JSON.parse(JSON.stringify(serviceArea.hourly_pricing))
            let { ranges } = cData
            if (ranges) {
                for (let item of ranges) {
                    delete item.amountActivy
                    delete item.fromActivy
                    delete item.fromActivy_2
                    delete item.toActivy
                    delete item.toActivy_2
                }
            }
            this.defaultData = JSON.parse(JSON.stringify(cData))
            this.initElms(true)
        } else {
            let cData = {}
            cData.ranges = [{
                "seq": 0,
                "amount": '',
                "currency": serviceArea.currencyCode,
                "duration": 0,
                "from": '',
                "to": '',
            }]
            cData.currency = serviceArea.currencyCode
            cData.min_amount = ''
            cData.min_duration = ''
            this.defaultData = JSON.parse(JSON.stringify(cData))
            console.log('no-pricing', this.defaultData);
            this.initElms(true)
        }
        this.rootElm.classList.remove('hide')
    }
    hide() {
        this.pour(serviceArea)
        this.rootElm.classList.add('hide')
    }
}

// var lowPriceStart = document.getElementById('low-price-start')


// 初始化页面内容
// initElms();


// function findRange(num) {
//     for (let i = 0; i < this.defaultData.ranges.length; i++) {
//         if (num >= this.defaultData.ranges[i].from && num <= this.defaultData.ranges[i].to) {
//             return i;
//         }
//     }
//     return -1;
// }
// const _fixPrice = new fixPrice()
// _fixPrice.show()
