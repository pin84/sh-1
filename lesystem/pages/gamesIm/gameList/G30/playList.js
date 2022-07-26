import buyDataHandler from '@/common/js/buyDataHandler.js'

/**
 * A : 单列表，n 选 m
 * B : 两个列表。组合
 */


export default {

    1416: {
        name: '前二大小单双',
        playType: "E",
        titleArr: ['百位', '十位'],
        lenLimit: 2,
    },

    1417: {
        name: '后二大小单双',
        playType: "E",
        titleArr: ['十位', '个位'],
        lenLimit: 2,
    },


    "1415": {
        name: '定位胆',
        playType: "A",
        titleArr: ['百位', '十位', '个位'],
        isShowSort: true,
    },

    "1411": {
        name: '后二直选复式',
        playType: "F",
        titleArr: ['十位', '个位'],
        isShowSort: false,
        dataHandler: (d, sortArr) => {
            let arr = buyDataHandler.sortDataByTitleArr(d, sortArr)
            if (arr.length < 2) return
            let obj = buyDataHandler.createBuyObj()
            let len = arr.reduce((accumulator, currentValue) => {
                return accumulator * currentValue.length
            }, 1)
            obj.len = len
            obj.money = buyDataHandler.handlerMoneyDecimal(len * 2 * obj.rate * obj.ratio)
            obj.numStr = arr.join('|')
            obj.orderStr = arr.join('|').replace(/\,/g, '').replace(/\|/g, ',')
            return obj
        },
        addToBasketRandom: () => {
            let obj = buyDataHandler.createBuyObj()
            let i = 2
            let arr = []
            while (i--) {
                arr.push(buyDataHandler.createRandomNum(0, 9))
            }
            obj.numStr = arr.join('|')
            obj.orderStr = arr.join(',')
            return obj
        }
    },

    "1407": {
        name: '前二直选复式',
        playType: "F",
        titleArr: ["百位", '十位'],
        isShowSort: false,
        dataHandler: (d, sortArr) => {
            let arr = buyDataHandler.sortDataByTitleArr(d, sortArr)
            if (arr.length < 2) return
            let obj = buyDataHandler.createBuyObj()
            let len = arr.reduce((accumulator, currentValue) => {
                return accumulator * currentValue.length
            }, 1)
            obj.len = len
            obj.money = buyDataHandler.handlerMoneyDecimal(len * 2 * obj.rate * obj.ratio)
            obj.numStr = arr.join('|')
            obj.orderStr = arr.join('|').replace(/\,/g, '').replace(/\|/g, ',')
            return obj
        },
        addToBasketRandom: () => {
            let obj = buyDataHandler.createBuyObj()
            let i = 2
            let arr = []
            while (i--) {
                arr.push(buyDataHandler.createRandomNum(0, 9))
            }
            obj.numStr = arr.join('|')
            obj.orderStr = arr.join(',')
            return obj
        }
    },

    "1397": {
        name: '复式',
        playType: "F",
        titleArr: ["百位", '十位', '个位'],
        isShowSort: false,
        dataHandler: (d, sortArr) => {
            let arr = buyDataHandler.sortDataByTitleArr(d, sortArr)
            if (arr.length < 3) return
            let obj = buyDataHandler.createBuyObj()
            let len = arr.reduce((accumulator, currentValue) => {
                return accumulator * currentValue.length
            }, 1)

            obj.len = len
            obj.money = buyDataHandler.handlerMoneyDecimal(len * 2 * obj.rate * obj.ratio)
            obj.numStr = arr.join('|')
            obj.orderStr = arr.join('|').replace(/\,/g,'').replace(/\|/g,',')
            return obj
        },
        addToBasketRandom: () => {
            let obj = buyDataHandler.createBuyObj()
            let i = 3
            let arr = []
            while (i--) {
                arr.push(buyDataHandler.createRandomNum(0, 9))
            }
            obj.numStr = arr.join('|')
            obj.orderStr = arr.join(',')
            return obj
        }
    },

    "1404": {
        name: '组选和值',
        playType: "D",
        titleArr: ['组选和值'],
        lenLimit: 1,
        numLen: 27,
        listStart: 1,
        isShowTitle: false,
        dataHandler: (selectedArr) => {
            let sumArr = []
            selectedArr.forEach(n => {
                let arr = buyDataHandler.threeSumSort(n)
                sumArr.push(arr.length)
            })

            let s = sumArr.reduce((accumulator, currentValue) => {
                return accumulator + currentValue
            }, 0)

            let obj = buyDataHandler.createBuyObj()
            obj.len = s
            obj.money = buyDataHandler.handlerMoneyDecimal(s * 2 * obj.rate * obj.ratio);
            obj.numStr = selectedArr.join('|')
            obj.orderStr = selectedArr.join(',')
            return obj
        }
    },

    "1398": {
        name: '直选和值',
        playType: "D",
        titleArr: ['直选和值'],
        lenLimit: 1,
        numLen: 28,
        isShowTitle: false,
        dataHandler: (selectedArr) => {
            let sumArr = []
            selectedArr.forEach(n => {
                let arr = buyDataHandler.threeSum(n)
                sumArr.push(arr.length)
            })

            let s = sumArr.reduce((accumulator, currentValue) => {
                return accumulator + currentValue
            }, 0)

            let obj = buyDataHandler.createBuyObj()
            obj.len = s
            obj.money = buyDataHandler.handlerMoneyDecimal(s * 2 * obj.rate * obj.ratio);
            obj.numStr = selectedArr.join('|')
            obj.orderStr = selectedArr.join(',')
            return obj
        }
    },

    "1413": {
        name: '后二组选复式',
        playType: "D",
        titleArr: ['组选'],
        lenLimit: 2,
        dataHandler: (selectedArr) => {
            let s = buyDataHandler.combinatorialNumber(selectedArr.length, 2)
            let obj = buyDataHandler.createBuyObj()
            obj.len = s
            obj.money = buyDataHandler.handlerMoneyDecimal(s * 2 * obj.rate * obj.ratio);
            obj.numStr = selectedArr.join('|')
            obj.orderStr = selectedArr.join('')
            return obj
        },
        addToBasketRandom: () => {
            let obj = buyDataHandler.createBuyObj()
            let arr = buyDataHandler.createNoReaptRandomNumReArr(2)
            obj.numStr = arr.join("|")
            obj.orderStr = arr.join("")
            return obj
        }
    },

    "1409": {
        name: '前二组选复式',
        playType: "D",
        titleArr: ['组选'],
        lenLimit: 2,
        dataHandler: (selectedArr) => {
            let s = buyDataHandler.combinatorialNumber(selectedArr.length, 2)
            let obj = buyDataHandler.createBuyObj()
            obj.len = s
            obj.money = buyDataHandler.handlerMoneyDecimal(s * 2 * obj.rate * obj.ratio);
            obj.numStr = selectedArr.join('|')
            obj.orderStr = selectedArr.join('')
            return obj
        },
        addToBasketRandom: () => {
            let obj = buyDataHandler.createBuyObj()
            let arr = buyDataHandler.createNoReaptRandomNumReArr(2)
            obj.numStr = arr.join("|")
            obj.orderStr = arr.join("")
            return obj
        }
    },

    "1406": {
        name: '二码不定胆',
        playType: "D",
        titleArr: ['不定胆'],
        lenLimit: 2,
        dataHandler: (selectedArr) => {
            let s = buyDataHandler.combinatorialNumber(selectedArr.length, 2)
            let obj = buyDataHandler.createBuyObj()
            obj.len = s
            obj.money = buyDataHandler.handlerMoneyDecimal(s * 2 * obj.rate * obj.ratio);
            obj.numStr = selectedArr.join('|')
            obj.orderStr = selectedArr.join('|')
            return obj
        },
        addToBasketRandom: () => {
            let obj = buyDataHandler.createBuyObj()
            let arr = buyDataHandler.createNoReaptRandomNumReArr(2)
            obj.numStr = arr.join("|")
            obj.orderStr = arr.join("|")
            return obj
        }
    },

    "1405": {
        name: '一码不定胆',
        playType: "D",
        titleArr: ['不定胆'],
        lenLimit: 1,
        dataHandler: (selectedArr) => {
            let s = buyDataHandler.combinatorialNumber(selectedArr.length, 1)
            let obj = buyDataHandler.createBuyObj()
            obj.len = s
            obj.money = buyDataHandler.handlerMoneyDecimal(s * 2 * obj.rate * obj.ratio);
            obj.numStr = selectedArr.join('|')
            obj.orderStr = selectedArr.join('')
            return obj
        },
        addToBasketRandom: () => {
            let obj = buyDataHandler.createBuyObj()
            let arr = buyDataHandler.createNoReaptRandomNumReArr(1)
            obj.numStr = arr.join("|")
            obj.orderStr = arr.join("")
            return obj
        }
    },

    "1401": {
        name: '组六',
        playType: "D",
        titleArr: ['组六'],
        lenLimit: 3,
        dataHandler: (selectedArr) => {
            let s = buyDataHandler.combinatorialNumber(selectedArr.length, 3)
            let obj = buyDataHandler.createBuyObj()
            obj.len = s
            obj.money = buyDataHandler.handlerMoneyDecimal(s * 2 * obj.rate * obj.ratio);
            obj.numStr = selectedArr.join('|')
            obj.orderStr = selectedArr.join('')
            return obj
        },
        addToBasketRandom: () => {
            let obj = buyDataHandler.createBuyObj()
            let arr = buyDataHandler.createNoReaptRandomNumReArr(3)
            obj.numStr = arr.join("|")
            obj.orderStr = arr.join("")
            return obj
        }
    },

    "1399": {
        name: '组三',
        playType: "D",
        titleArr: ['组三'],
        lenLimit: 2,
        dataHandler: (selectedArr) => {
            let s = buyDataHandler.combinatorialNumber(selectedArr.length, 2)
            let obj = buyDataHandler.createBuyObj()
            obj.len = 2 * s
            obj.money = buyDataHandler.handlerMoneyDecimal(s * 2 * 2 * obj.rate * obj.ratio);
            obj.numStr = selectedArr.join('|')
            obj.orderStr = selectedArr.join('')
            return obj
        },
    },

    "1414": {
        name: '后二组选单式',
        playType: "C",
        dataHandler: (str) => {
            let res = buyDataHandler.danshiDH_3({
                str,
                lenLimit: 2,
                deleteRepeat: true
            })
            return res
        },
        createObj: (handlerArr) => {
            let obj = buyDataHandler.createBuyObj()
            obj.numStr = handlerArr.join('|');
            obj.orderStr = handlerArr.join('|');
            return obj
        },
        addToBasketRandom: () => {
            let obj = dashiAddRandom(2, true)
            return obj
        }
    },
    "1412": {
        name: '后二直选单式',
        playType: "C",
        dataHandler: (str) => {
            let res = buyDataHandler.danshiDH_3({
                str,
                lenLimit: 2,
            })
            return res
        },
        createObj: (handlerArr) => {
            let obj = buyDataHandler.createBuyObj()
            obj.numStr = handlerArr.join('|');
            obj.orderStr = handlerArr.join('|');
            return obj
        },
        addToBasketRandom: () => {
            let obj = dashiAddRandom(2)
            return obj
        }
    },
    "1410": {
        name: '前二组选单式',
        playType: "C",
        dataHandler: (str) => {
            let res = buyDataHandler.danshiDH_3({
                str,
                lenLimit: 2,
                deleteRepeat: true
            })
            return res
        },
        createObj: (handlerArr) => {
            let obj = buyDataHandler.createBuyObj()
            obj.numStr = handlerArr.join('|');
            obj.orderStr = handlerArr.join('|');
            return obj
        },
        addToBasketRandom: () => {
            let obj = dashiAddRandom(2, true)
            return obj
        }
    },
    "1408": {
        name: '前二直选单式',
        playType: "C",
        dataHandler: (str) => {
            let res = buyDataHandler.danshiDH_3({
                str,
                lenLimit: 2,
            })
            return res
        },
        createObj: (handlerArr) => {
            let obj = buyDataHandler.createBuyObj()
            obj.numStr = handlerArr.join('|');
            obj.orderStr = handlerArr.join('|');
            return obj
        },
        addToBasketRandom: () => {
            let obj = dashiAddRandom(2)
            return obj
        }
    },

    "1396": {
        name: '单式',
        playType: "C",
        dataHandler: (str) => {
            let res = buyDataHandler.danshiDH_3({
                str,
                lenLimit: 3,
            })
            return res
        },
        createObj: (handlerArr) => {
            let obj = buyDataHandler.createBuyObj()
            obj.numStr = handlerArr.join('|');
            obj.orderStr = handlerArr.join('|');
            return obj
        },
        addToBasketRandom: () => {
            let obj = dashiAddRandom(3)
            return obj
        }
    },
    "1403": {
        name: '混合组选',
        playType: "C",
        dataHandler: (str) => {
            let res = buyDataHandler.danshiDH_3({
                str,
                lenLimit: 3,
                deleteRepeat: true
            })
            return res
        },
        createObj: (handlerArr) => {
            let obj = buyDataHandler.createBuyObj()
            obj.numStr = handlerArr.join('|');
            obj.orderStr = handlerArr.join('|').replace(/\,/g, '').replace(/\|/g, ',')
            return obj
        },
        addToBasketRandom: () => {
            let obj = dashiAddRandom(3, true)
            obj.orderStr = obj.orderStr.replace(/\,/g, '')
            return obj
        }
    },

}


function dashiAddRandom(m, isProhibitRepeat = false) {
    let i = m
    let arr = []
    while (i--) {
        arr.push(buyDataHandler.createRandomNum(0, 9))
    }
    if (isProhibitRepeat) {
        let size = new Set(arr).size
        while (size == 1) {
            i = m
            arr = []
            while (i--) {
                arr.push(buyDataHandler.createRandomNum(0, 9))
            }
            size = new Set(arr).size
        }
    }

    let obj = buyDataHandler.createBuyObj()
    obj.numStr = arr.join(',')
    obj.orderStr = arr.join(',')
    return obj
}