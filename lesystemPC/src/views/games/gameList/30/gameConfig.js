
import BDH from '@/views/games/assets/buyDataHandler'
export default {

  1414: {
    name: '单式',
    type: 'B',
    dataHandler: (str) => {
      let obj = BDH.danshiDH({
        str,
        lenLimit: 2,
        deleteRepeat: true
      })
      return obj
    },
    addRandom: (n) => {
      let obj = BDH.createBuyObj()
      let arr = BDH.createRandomNumArr(2)
      obj.numStr = arr.join(',')
      obj.orderStr = arr.join(',')
      return obj
    },
    addToBasket: (handlerArr) => {
      let obj = BDH.createBuyObj()
      obj.numStr = handlerArr.join('|')
      obj.orderStr = handlerArr.join('|')
      return obj
    }
  },

  1410: {
    name: '单式',
    type: 'B',
    dataHandler: (str) => {
      let obj = BDH.danshiDH({
        str,
        lenLimit: 2,
        deleteRepeat: true
      })
      return obj
    },
    addRandom: (n) => {
      let obj = BDH.createBuyObj()
      let arr = BDH.createRandomNumArr(2)
      obj.numStr = arr.join(',')
      obj.orderStr = arr.join(',')
      return obj
    },
    addToBasket: (handlerArr) => {
      let obj = BDH.createBuyObj()
      obj.numStr = handlerArr.join('|')
      obj.orderStr = handlerArr.join('|')
      return obj
    }
  },

  1412: {
    name: '单式',
    type: 'B',
    dataHandler: (str) => {
      let obj = BDH.danshiDH({
        str,
        lenLimit: 2,
        deleteRepeat: false
      })
      return obj
    },
    addRandom: (n) => {
      let obj = BDH.createBuyObj()
      let arr = BDH.createRandomNumArr(2)
      obj.numStr = arr.join(',')
      obj.orderStr = arr.join(',')
      return obj
    },
    addToBasket: (handlerArr) => {
      let obj = BDH.createBuyObj()
      obj.numStr = handlerArr.join('|')
      obj.orderStr = handlerArr.join('|')
      return obj
    }
  },



  1408: {
    name: '单式',
    type: 'B',
    dataHandler: (str) => {
      let obj = BDH.danshiDH({
        str,
        lenLimit: 2,
        deleteRepeat: false
      })
      return obj
    },
    addRandom: (n) => {
      let obj = BDH.createBuyObj()
      let arr = BDH.createRandomNumArr(2)
      obj.numStr = arr.join(',')
      obj.orderStr = arr.join(',')
      return obj
    },
    addToBasket: (handlerArr) => {
      let obj = BDH.createBuyObj()
      obj.numStr = handlerArr.join('|')
      obj.orderStr = handlerArr.join('|')
      return obj
    }
  },



  1417: {
    name: '前二大小单双',
    type: 'A2',
    titleArr: ['十位', '个位'],
    dataHandler: (arr) => {
      let str = arr[0].join('')
      let str1 = arr[1].join('')
      let numStr = str + '|' + str1
      let orderStr = str + ',' + str1

      return { numStr, orderStr }
    },
    addRandom: (Nlist) => {
      let len = Nlist.length
      let obj = BDH.createBuyObj()
      let i = BDH.createRandomNum(0, len - 1)
      let j = BDH.createRandomNum(0, len - 1)
      obj.numStr = Nlist[i].num + '|' + Nlist[j].num
      obj.orderStr = Nlist[i].num + ',' + Nlist[j].num
      return obj
    },
    moneyHandler: (arr) => {
      if (arr.length < 2) return
      let len1 = arr[0].length
      let len2 = arr[1].length
      if (len1 < 1 || len2 < 1) return
      let num = len1 * len2
      return { num, money: num }
    }
  },

  1416: {
    name: '前二大小单双',
    type: 'A2',
    titleArr: ['百位', '十位'],
    dataHandler: (arr) => {
      let str = arr[0].join('')
      let str1 = arr[1].join('')
      let numStr = str + '|' + str1
      let orderStr = str + ',' + str1

      return { numStr, orderStr }
    },
    addRandom: (Nlist) => {
      let len = Nlist.length
      let obj = BDH.createBuyObj()
      let i = BDH.createRandomNum(0, len - 1)
      let j = BDH.createRandomNum(0, len - 1)
      obj.numStr = Nlist[i].num + '|' + Nlist[j].num
      obj.orderStr = Nlist[i].num + ',' + Nlist[j].num
      return obj
    },
    moneyHandler: (arr) => {
      if (arr.length < 2) return
      let len1 = arr[0].length
      let len2 = arr[1].length
      if (len1 < 1 || len2 < 1) return
      let num = len1 * len2
      return { num, money: num }
    }
  },

  1415: {
    name: '定位胆',
    type: 'D',
    titleArr: ['百位', '十位', '个位',],
    dataHandler: (selectArr) => {
      let str = selectArr.join('|').replace(/\,/g, '').replace(/\|/g, ',')
      let numStr = str
      let orderStr = str
      return { numStr, orderStr }
    },
    addRandom: (arr) => {
      let obj = BDH.createBuyObj()
      let i = BDH.createRandomNum(0, 9)
      let j = BDH.createRandomNum(0, arr.length -1)
      let { I, N } = arr[j]
      obj.I = I
      obj.gName = obj.gName + N
      obj.numStr = i
      obj.orderStr = i
      return obj
    },
    moneyHandler: (selectArr) => {
      if (selectArr.length < 5) return
      let s = selectArr.reduce((accumulator, currentValue) => {
        return accumulator * currentValue.length
      }, 1)

      return { num: s, money: s }
    }
  },



  1413: {
    name: '后二组选复式',
    type: 'A',
    titleArr: ['组选'],
    dataHandler: (selectArr) => {
      let str = selectArr.join('|').replace(/\,/g,'').replace(/\|/g,',')
      let numStr = str
      let orderStr = str
      return { numStr, orderStr }
    },
    addRandom: () => {
      let obj = BDH.createBuyObj()
      let arr = BDH.createNoRepeatNumberArrIm(2, 0, 9)
      obj.numStr = arr.join('')
      obj.orderStr = arr.join('')
      return obj
    },
    moneyHandler: (selectArr) => {
      if (selectArr.length < 0) return
      let len = BDH.combinatorialNumber(selectArr[0].length, 2)
      return { num: len, money: len }
    }
  },

  1409: {
    name: '前二组选复式',
    type: 'A',
    titleArr: ['组选'],
    dataHandler: (selectArr) => {
      let str = selectArr.join('|').replace(/\,/g,'').replace(/\|/g,',')
      let numStr = str
      let orderStr = str
      return { numStr, orderStr }
    },
    addRandom: () => {
      let obj = BDH.createBuyObj()
      let arr = BDH.createNoRepeatNumberArrIm(2, 0, 9)
      obj.numStr = arr.join('')
      obj.orderStr = arr.join('')
      return obj
    },
    moneyHandler: (selectArr) => {
      if (selectArr.length < 0) return
      let len = BDH.combinatorialNumber(selectArr[0].length, 2)
      return { num: len, money: len }
    }
  },

  1411: {
    name: '后二直选复式',
    type: 'A',
    titleArr: ['十位', '个位'],
    dataHandler: (selectArr) => {
      let str = selectArr.join('|').replace(/\,/g,'').replace(/\|/g,',')
      let numStr = str
      let orderStr = str
      return { numStr, orderStr }
    },
    addRandom: () => {
      let obj = BDH.createBuyObj()
      let arr = BDH.createNoRepeatNumberArrIm(2, 0, 9)
      obj.numStr = arr.join(',')
      obj.orderStr = arr.join(',')
      return obj
    },
    moneyHandler: (selectArr) => {
      if (selectArr.length < 2) return
      let len = selectArr.reduce((accumulator, currentValue) => {
        return accumulator * currentValue.length
      }, 1)
      return { num: len, money: len }
    }
  },

  1407: {
    name: '前二直选复式',
    type: 'A',
    titleArr: ['百位', '十位'],
    dataHandler: (selectArr) => {
      let str = selectArr.join('|').replace(/\,/g,'').replace(/\|/g,',')
      let numStr = str
      let orderStr = str
      return { numStr, orderStr }
    },
    addRandom: () => {
      let obj = BDH.createBuyObj()
      let arr = BDH.createNoRepeatNumberArrIm(2, 0, 9)
      obj.numStr = arr.join(',')
      obj.orderStr = arr.join(',')
      return obj
    },
    moneyHandler: (selectArr) => {
      if (selectArr.length < 2) return
      let len = selectArr.reduce((accumulator, currentValue) => {
        return accumulator * currentValue.length
      }, 1)
      return { num: len, money: len }
    }
  },

  1406: {
    name: '二码不定胆',
    type: 'A',
    titleArr: ['不定胆'],
    dataHandler: (selectArr) => {

      let str = selectArr[0].join('|')
      let numStr = str
      let orderStr = str
      return { numStr, orderStr }
    },
    addRandom: () => {
      let obj = BDH.createBuyObj()
      let arr = BDH.createNoRepeatNumberArrIm(2, 0, 9)
      obj.numStr = arr.join('|')
      obj.orderStr = arr.join('|')
      return obj
    },
    moneyHandler: (selectArr) => {
      if (selectArr.length < 0) return
      let len = BDH.combinatorialNumber(selectArr[0].length, 2)
      return { num: len, money: len }
    }
  },

  1405: {
    name: '一码不定胆',
    type: 'A',
    titleArr: ['不定胆'],
    dataHandler: (selectArr) => {
      let str = selectArr.join('|').replace(/\,/g, '').replace(/\|/g, ',')
      let numStr = str
      let orderStr = str
      return { numStr, orderStr }
    },
    addRandom: () => {
      let obj = BDH.createBuyObj()
      let arr = BDH.createNoRepeatNumberArrIm(1, 0, 9)
      obj.numStr = arr.join('|')
      obj.orderStr = arr.join('')
      return obj
    },
    moneyHandler: (selectArr) => {
      if (selectArr.length < 0) return
      let len = BDH.combinatorialNumber(selectArr[0].length, 1)
      return { num: len, money: len }
    }
  },

  1403: {
    name: '混合组选',
    type: 'B',
    dataHandler: (str) => {
      let obj = BDH.danshiDH({
        str,
        lenLimit: 3,
        deleteRepeat: true
      })
      return obj
    },
    addRandom: (n) => {
      let obj = BDH.createBuyObj()
      let arr = BDH.createRandomNumArr(3)
      obj.numStr = arr.join('')
      obj.orderStr = arr.join('')
      return obj
    },
    addToBasket: (handlerArr) => {
      let obj = BDH.createBuyObj()
      let str = handlerArr.join('|').replace(/\,/g, '').replace(/\|/g, ',')
      obj.numStr = str
      obj.orderStr = str
      return obj
    }
  },

  1396: {
    name: '单式',
    type: 'B',
    dataHandler: (str) => {
      let obj = BDH.danshiDH({
        str,
        lenLimit: 3,
        deleteRepeat: false
      })
      return obj
    },
    addRandom: (n) => {
      let obj = BDH.createBuyObj()
      let arr = BDH.createRandomNumArr(3)
      obj.numStr = arr.join(',')
      obj.orderStr = arr.join(',')
      return obj
    },
    addToBasket: (handlerArr) => {
      let obj = BDH.createBuyObj()
      obj.numStr = handlerArr.join('|')
      obj.orderStr = handlerArr.join('|')
      return obj
    }
  },

  1404: {
    name: '组选和值',
    type: 'A1',
    titleArr: ['组选和值'],
    startNum: 1,
    endNum: 27,
    dataHandler: (selectArr) => {
      let str = selectArr[0].join(',')
      let numStr = str
      let orderStr = str
      return { numStr, orderStr }
    },
    moneyHandler: (selectArr) => {
      if (selectArr.length < 0) return
      let resArr = []
      selectArr[0].forEach(n => {
        resArr.push(BDH.threeSumSort(n).length)
      })
      let len = resArr.reduce((accumulator, currentValue) => {
        return accumulator + currentValue
      }, 0)
      return { num: len, money: len }
    }
  },


  1398: {
    name: '直选和值',
    type: 'A1',
    titleArr: ['直选和值'],
    dataHandler: (selectArr) => {
      let str = selectArr[0].join(',')
      let numStr = str
      let orderStr = str
      return { numStr, orderStr }
    },
    moneyHandler: (selectArr) => {
      if (selectArr.length < 0) return

      let resArr = []
      selectArr[0].forEach(n => {
        resArr.push(BDH.threeSum(n).length)
      })

      let len = resArr.reduce((accumulator, currentValue) => {
        return accumulator + currentValue
      }, 0)

      return { num: len, money: len }
    }
  },

  1401: {
    name: '三码组六',
    type: 'A',
    titleArr: ['组六'],
    dataHandler: (selectArr) => {
      let str = selectArr.join('|').replace(/\,/g, '').replace(/\|/g, ',')
      let numStr = str
      let orderStr = str
      return { numStr, orderStr }
    },
    addRandom: () => {
      let obj = BDH.createBuyObj()
      let arr = BDH.createNoRepeatNumberArrIm(3, 0, 9)
      obj.numStr = arr.join('|')
      obj.orderStr = arr.join('')
      return obj
    },
    moneyHandler: (selectArr) => {
      if (selectArr.length < 0) return
      let len = BDH.combinatorialNumber(selectArr[0].length, 3)
      return { num: len, money: len }
    }
  },

  1399: {
    name: '三码组三',
    type: 'A',
    titleArr: ['组三'],
    dataHandler: (selectArr) => {
      let str = selectArr.join('|').replace(/\,/g, '').replace(/\|/g, ',')
      let numStr = str
      let orderStr = str
      return { numStr, orderStr }
    },
    moneyHandler: (selectArr) => {
      if (selectArr.length < 0) return
      let len = BDH.combinatorialNumber(selectArr[0].length, 2) * 2
      return { num: len, money: len }
    }
  },


  1397: {
    name: '三码复式',
    type: 'A',
    titleArr: ['百位', '十位', '个位'],
    dataHandler: (selectArr) => {
      let str = selectArr.join('|').replace(/\,/g, '').replace(/\|/g, ',')
      let numStr = str
      let orderStr = str
      return { numStr, orderStr }
    },
    addRandom: () => {
      let obj = BDH.createBuyObj()
      let arr = BDH.createNoRepeatNumberArrIm(3, 0, 9)
      obj.numStr = arr.join('|')
      obj.orderStr = arr.join(',')
      return obj
    },
    moneyHandler: (selectArr) => {
      if (selectArr.length < 3) return
      let len = selectArr.reduce((accumulator, currentValue) => {
        return accumulator * currentValue.length
      }, 1)
      return { num: len, money: len }
    }
  },

  //------------------------------------------------------------------------




}
