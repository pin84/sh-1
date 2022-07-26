
import BDH from '@/views/games/assets/buyDataHandler'
export default {

  1345: {
    name: '定位胆',
    type: 'D',
    titleArr: ['万位', '千位', '百位', '十位', '个位'],
    dataHandler: (selectArr) => {
      let str = selectArr.join('|').replace(/\,/g, '').replace(/\|/g, ',')
      let numStr = str
      let orderStr = str
      return { numStr, orderStr }
    },
    addRandom: () => {
      let obj = BDH.createBuyObj()
      let arr = BDH.createRandomNumArr(1)
      obj.numStr = arr.join(',')
      obj.orderStr = arr.join(',')
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

  2529: {
    name: '前四单式',
    type: 'B',
    dataHandler: (str) => {
      let obj = BDH.danshiDH({
        str,
        lenLimit: 4,
        deleteRepeat: false
      })
      return obj
    },
    addRandom: () => {
      let obj = BDH.createBuyObj()
      let arr = BDH.createNoRepeatNumberArr(4)
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

  2537: {
    name: '任四直选单式',
    type: 'B1',
    limitLen: 4,
    dataHandler: (str) => {
      let obj = BDH.danshiDH({
        str,
        lenLimit: 4,
        deleteRepeat: false
      })
      return obj
    },
    addRandom: (n, randomArr) => {
      let len = randomArr.length
      let objArr = []
      while (n--) {
        let robj = randomArr[BDH.createRandomNum(0, len - 1)]
        let arr = BDH.createNoRepeatNumberArr(4)
        let temArr = ['-', '-', '-', '-', '-',]
        let sarr =  robj.N.split('')
        sarr.forEach((s, idx) => {
          if (titleArr[s] != undefined) {
            temArr[titleArr[s]] = arr[idx]
          }
        })
        let obj = BDH.createBuyObj()
        obj.I = robj.I
        obj.gName = robj.N
        obj.numStr = arr.join(',')
        obj.orderStr = temArr.join(',')
        objArr.push(obj)
      }
      return objArr
    },
    addToBasket: (handlerArr, positionArr, randomArr) => {
      let objArr = []
      positionArr.forEach(str => {
        let sarr = str.split('')
        let strArr = []
        handlerArr.forEach(arr => {
          let temArr = ['-', '-', '-', '-', '-',]
          sarr.forEach((s, idx) => {
            temArr[titleArr[s]] = arr[idx]
          })
          strArr.push(temArr)
        })
        let robj = randomArr.find(item => item.N.includes(str))
        let obj = BDH.createBuyObj()
        obj.I = robj.I
        obj.gName = robj.N
        obj.numStr = handlerArr.join(',')
        obj.orderStr = strArr.join('|')
        objArr.push(obj)
      })
      return objArr
    }
  },


  1367: {
    name: '任三组选单式',
    type: 'B1',
    limitLen: 3,
    dataHandler: (str) => {
      let obj = BDH.danshiDH({
        str,
        lenLimit: 3,
        deleteRepeat: true
      })
      return obj
    },
    addRandom: (n, randomArr) => {
      let len = randomArr.length
      let objArr = []
      while (n--) {
        let robj = randomArr[BDH.createRandomNum(0, len - 1)]
        let obj = BDH.createBuyObj()
        obj.I = robj.I
        obj.gName = robj.N
        let arr = BDH.createNoRepeatNumberArr(3)
        obj.numStr = arr.join(',')
        obj.orderStr = arr.join('')
        objArr.push(obj)
      }
      return objArr
    },
    addToBasket: (handlerArr, positionArr, randomArr) => {
      let objArr = []
      positionArr.forEach(str => {
        let robj = randomArr.find(item => item.N.includes(str))
        let obj = BDH.createBuyObj()
        obj.I = robj.I
        obj.gName = robj.N
        obj.numStr = handlerArr.join(',')
        obj.orderStr = handlerArr.join('|').replace(/\,/g,'').replace(/\|/g,',')
        objArr.push(obj)
      })
      return objArr
    }
  },


  1362: {
    name: '任三直选单式',
    type: 'B1',
    limitLen: 3,
    dataHandler: (str) => {
      let obj = BDH.danshiDH({
        str,
        lenLimit: 3,
        deleteRepeat: false
      })
      return obj
    },
    addRandom: (n, randomArr) => {
      let len = randomArr.length
      let objArr = []
      while (n--) {
        let robj = randomArr[BDH.createRandomNum(0, len - 1)]
        let arr = BDH.createNoRepeatNumberArr(3)
        let temArr = ['-', '-', '-', '-', '-',]
        let sarr =  robj.N.split('')
        sarr.forEach((s, idx) => {
          if (titleArr[s] != undefined) {
            temArr[titleArr[s]] = arr[idx]
          }
        })
        let obj = BDH.createBuyObj()
        obj.I = robj.I
        obj.gName = robj.N
        obj.numStr = arr.join(',')
        obj.orderStr = temArr.join(',')
        objArr.push(obj)
      }
      return objArr
    },
    addToBasket: (handlerArr, positionArr, randomArr) => {
      let objArr = []
      positionArr.forEach(str => {
        let sarr = str.split('')
        let strArr = []
        handlerArr.forEach(arr => {
          let temArr = ['-', '-', '-', '-', '-',]
          sarr.forEach((s, idx) => {
            temArr[titleArr[s]] = arr[idx]
          })
          strArr.push(temArr)
        })
        let robj = randomArr.find(item => item.N.includes(str))
        let obj = BDH.createBuyObj()
        obj.I = robj.I
        obj.gName = robj.N
        obj.numStr = handlerArr.join(',')
        obj.orderStr = strArr.join('|')
        objArr.push(obj)
      })
      return objArr
    }
  },

  1360: {
    name: '任二组选单式',
    type: 'B1',
    dataHandler: (str) => {
      let obj = BDH.danshiDH({
        str,
        lenLimit: 2,
        deleteRepeat: true
      })
      return obj
    },
    addRandom: (n, randomArr) => {
      let len = randomArr.length
      let objArr = []
      while (n--) {
        let robj = randomArr[BDH.createRandomNum(0, len - 1)]
        let obj = BDH.createBuyObj()
        obj.I = robj.I
        obj.gName = robj.N
        let arr = BDH.createNoRepeatNumberArr(2)
        obj.numStr = arr.join(',')
        obj.orderStr = arr.join(',')
        objArr.push(obj)
      }
      return objArr
    },
    addToBasket: (handlerArr, positionArr, randomArr) => {
      let objArr = []
      positionArr.forEach(str => {
        let robj = randomArr.find(item => item.N.includes(str))
        let obj = BDH.createBuyObj()
        obj.I = robj.I
        obj.gName = robj.N
        obj.numStr = handlerArr.join(',')
        obj.orderStr = handlerArr.join('|')
        objArr.push(obj)
      })
      return objArr
    }
  },


  1357: {
    name: '任二直选单式',
    type: 'B1',
    dataHandler: (str) => {
      let obj = BDH.danshiDH({
        str,
        lenLimit: 2,
        deleteRepeat: false
      })
      return obj
    },
    addRandom: (n, randomArr) => {
      let len = randomArr.length
      let objArr = []
      while (n--) {
        let robj = randomArr[BDH.createRandomNum(0, len - 1)]
        let obj = BDH.createBuyObj()
        obj.I = robj.I
        obj.gName = robj.N
        let arr = BDH.createNoRepeatNumberArr(2)
        obj.numStr = arr.join(',')
        obj.orderStr = arr.join(',')
        objArr.push(obj)
      }
      return objArr
    },
    addToBasket: (handlerArr, positionArr, randomArr) => {
      let objArr = []
      positionArr.forEach(str => {
        let robj = randomArr.find(item => item.N.includes(str))
        let obj = BDH.createBuyObj()
        obj.I = robj.I
        obj.gName = robj.N
        obj.numStr = handlerArr.join(',')
        obj.orderStr = handlerArr.join('|')
        objArr.push(obj)
      })
      return objArr
    }
  },

  1342: {
    name: '前二组选单式',
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
      let arr = BDH.createNoRepeatNumberArr(2)
      obj.numStr = arr.join(',')
      obj.orderStr = arr.join(',')
      return obj
    },
    addToBasket: (handlerArr) => {
      let obj = BDH.createBuyObj()
      obj.numStr = handlerArr.join(',')
      obj.orderStr = handlerArr.join('|')
      return obj
    }
  },
  1336: {
    name: '前二直选单式',
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
      let arr = BDH.createNoRepeatNumberArr(2)
      obj.numStr = arr.join(',')
      obj.orderStr = arr.join(',')
      return obj
    },
    addToBasket: (handlerArr) => {
      let obj = BDH.createBuyObj()
      obj.numStr = handlerArr.join(',')
      obj.orderStr = handlerArr.join('|')
      return obj
    }
  },

  1340: {
    name: '后二组选单式',
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
      let arr = BDH.createNoRepeatNumberArr(2)
      obj.numStr = arr.join(',')
      obj.orderStr = arr.join(',')
      return obj
    },
    addToBasket: (handlerArr) => {
      let obj = BDH.createBuyObj()
      obj.numStr = handlerArr.join(',')
      obj.orderStr = handlerArr.join('|')
      return obj
    }
  },
  1334: {
    name: '后二直选单式',
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
      let arr = BDH.createNoRepeatNumberArr(2)
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

  1331: {
    name: '中三混合组选',
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
      let arr = BDH.createNoRepeatNumberArr(3)
      obj.numStr = arr.join(',')
      obj.orderStr = arr.join('')
      return obj
    },
    addToBasket: (handlerArr) => {
      let obj = BDH.createBuyObj()
      obj.numStr = handlerArr.join(',')
      obj.orderStr = handlerArr.join('|').replace(/\,/g, '').replace(/\|/g, ',')
      return obj
    }
  },
  1326: {
    name: '中三直选单式',
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
      let arr = BDH.createNoRepeatNumberArr(3)
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

  1324: {
    name: '前三混合组选',
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
      let arr = BDH.createNoRepeatNumberArr(3)
      obj.numStr = arr.join(',')
      obj.orderStr = arr.join('')
      return obj
    },
    addToBasket: (handlerArr) => {
      let obj = BDH.createBuyObj()
      obj.numStr = handlerArr.join(',')
      obj.orderStr = handlerArr.join('|').replace(/\,/g, '').replace(/\|/g, ',')
      return obj
    }
  },
  1319: {
    name: '前三直选单式',
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
      let arr = BDH.createNoRepeatNumberArr(3)
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

  1317: {
    name: '后三混合组选',
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
      let arr = BDH.createNoRepeatNumberArr(3)
      obj.numStr = arr.join(',')
      obj.orderStr = arr.join('')
      return obj
    },
    addToBasket: (handlerArr) => {
      let obj = BDH.createBuyObj()
      obj.numStr = handlerArr.join(',')
      obj.orderStr = handlerArr.join('|').replace(/\,/g, '').replace(/\|/g, ',')
      return obj
    }
  },
  1312: {
    name: '后三直选单式',
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
      let arr = BDH.createNoRepeatNumberArr(3)
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


  1305: {
    name: '后四单式',
    type: 'B',
    dataHandler: (str) => {
      let obj = BDH.danshiDH({
        str,
        lenLimit: 4,
        deleteRepeat: false
      })
      return obj
    },
    addRandom: (n) => {
      let obj = BDH.createBuyObj()
      let arr = BDH.createNoRepeatNumberArr(4)
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

  1296: {
    name: '五星单式',
    type: 'B',
    dataHandler: (str) => {
      let obj = BDH.danshiDH({
        str,
        lenLimit: 5,
        deleteRepeat: false
      })
      return obj
    },
    addRandom: (n) => {
      let obj = BDH.createBuyObj()
      let arr = BDH.createNoRepeatNumberArr(5)
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

  3377: {
    name: '百家乐',
    type: 'C2',
    titleArr: ['百家乐', '百家乐'],
  },

  3375: {
    name: '牛牛',
    type: 'C1',
    titleArr: ['牛牛'],
  },

  3183: {
    name: '龙虎万千',
    type: 'C',
    titleArr: ['龙虎', '和值'],
  },

  1344: {
    name: '前二组选和值',
    type: 'A3',
    title: '和值',
    isShowPosition: false,
    numLimit: 18,
    startNum: 1,
    dataHandler: (selectArr) => {
      let str = selectArr.join('')
      return { numStr: str, orderStr: selectArr.join(',') }
    },
    moneyHandler: (selectArr) => {
      if (selectArr.length < 1) return
      let i = 0
      selectArr.forEach(n => {
        i += BDH.twoSumSort(n).length
      })
      return i
    }
  },
  1343: {
    name: '后二组选和值',
    type: 'A3',
    title: '和值',
    isShowPosition: false,
    numLimit: 18,
    startNum: 1,
    dataHandler: (selectArr) => {
      let str = selectArr.join('')
      return { numStr: str, orderStr: selectArr.join(',') }
    },
    moneyHandler: (selectArr) => {
      if (selectArr.length < 1) return
      let i = 0
      selectArr.forEach(n => {
        i += BDH.twoSumSort(n).length
      })
      return i
    }
  },

  1338: {
    name: '前二直选和值',
    type: 'A3',
    title: '和值',
    isShowPosition: false,
    numLimit: 19,
    startNum: 0,
    dataHandler: (selectArr) => {
      let str = selectArr.join('')
      return { numStr: str, orderStr: selectArr.join(',') }
    },
    moneyHandler: (selectArr) => {
      if (selectArr.length < 1) return
      let i = 0
      selectArr.forEach(n => {
        i += BDH.twoSum(n).length
      })
      return i
    }
  },


  1337: {
    name: '后二直选和值',
    type: 'A3',
    title: '和值',
    isShowPosition: false,
    numLimit: 19,
    startNum: 0,
    dataHandler: (selectArr) => {
      let str = selectArr.join('')
      return { numStr: str, orderStr: selectArr.join(',') }
    },
    moneyHandler: (selectArr) => {
      if (selectArr.length < 1) return
      let i = 0
      selectArr.forEach(n => {
        i += BDH.twoSum(n).length
      })
      return i
    }
  },


  1332: {
    name: '中三组选和值',
    type: 'A3',
    title: '组选和值',
    isShowPosition: false,
    numLimit: 27,
    startNum: 1,
    dataHandler: (selectArr) => {
      let str = selectArr.join('')
      return { numStr: str, orderStr: selectArr.join(',') }
    },
    moneyHandler: (selectArr) => {
      if (selectArr.length < 1) return
      let i = 0
      selectArr.forEach(n => {
        i += BDH.threeSumSort(n).length
      })
      return i
    }
  },

  1328: {
    name: '中三直选和值',
    type: 'A3',
    title: '直选和值',
    isShowPosition: false,
    numLimit: 28,
    startNum: 0,
    dataHandler: (selectArr) => {
      let str = selectArr.join('')
      return { numStr: str, orderStr: selectArr.join(',') }
    },
    moneyHandler: (selectArr) => {
      if (selectArr.length < 1) return
      let i = 0
      selectArr.forEach(n => {
        i += BDH.threeSum(n).length
      })
      return i
    }
  },


  1325: {
    name: '前三组选和值',
    type: 'A3',
    title: '组选和值',
    isShowPosition: false,
    numLimit: 27,
    startNum: 1,
    dataHandler: (selectArr) => {
      let str = selectArr.join('')
      return { numStr: str, orderStr: selectArr.join(',') }
    },
    moneyHandler: (selectArr) => {
      if (selectArr.length < 1) return
      let i = 0
      selectArr.forEach(n => {
        i += BDH.threeSumSort(n).length
      })
      return i
    }
  },

  1321: {
    name: '前三直选和值',
    type: 'A3',
    title: '直选和值',
    isShowPosition: false,
    numLimit: 28,
    startNum: 0,
    dataHandler: (selectArr) => {
      let str = selectArr.join('')
      return { numStr: str, orderStr: selectArr.join(',') }
    },
    moneyHandler: (selectArr) => {
      if (selectArr.length < 1) return
      let i = 0
      selectArr.forEach(n => {
        i += BDH.threeSum(n).length
      })
      return i
    }
  },

  1318: {
    name: '后三组选和值',
    type: 'A3',
    title: '组选和值',
    isShowPosition: false,
    numLimit: 27,
    startNum: 1,
    dataHandler: (selectArr) => {
      let str = selectArr.join('')
      return { numStr: str, orderStr: selectArr.join(',') }
    },
    moneyHandler: (selectArr) => {
      if (selectArr.length < 1) return
      let i = 0
      selectArr.forEach(n => {
        i += BDH.threeSumSort(n).length
      })
      return i
    }
  },

  1314: {
    name: '后三直选和值',
    type: 'A3',
    title: '直选和值',
    isShowPosition: false,
    numLimit: 28,
    startNum: 0,
    dataHandler: (selectArr) => {
      let str = selectArr.join('')
      return { numStr: str, orderStr: selectArr.join(',') }
    },
    moneyHandler: (selectArr) => {
      if (selectArr.length < 1) return
      let i = 0
      selectArr.forEach(n => {
        i += BDH.threeSum(n).length
      })
      return i
    }
  },
  1364: {
    name: '任三直选和值',
    type: 'A3',
    title: '直选和值',
    isShowPosition: true,
    numLimit: 28,
    limitLen: 3,
    dataHandler: (selectArr) => {
      let str = selectArr.join('')
      return { numStr: str, orderStr: selectArr.join(',') }
    },
    addRandom: (randomArr = []) => {
      let len = randomArr.length
      let randomObj = randomArr[BDH.createRandomNum(0, len - 1)]
      let arr = BDH.createRandomNumArr(2)
      let obj = BDH.createBuyObj()
      obj.I = randomObj.I
      obj.gName = randomObj.N
      obj.numStr = arr.join('')
      obj.orderStr = arr.join('')
      return obj
    },
    moneyHandler: (selectArr) => {
      if (selectArr.length < 1) return
      let i = 0
      selectArr.forEach(n => {
        i += BDH.threeSum(n).length
      })
      return i
    }
  },

  2540: {
    name: '任4组选4',
    type: 'A2',
    titleArr: ['三重号', '单号'],
    limitLen: 4,
    isShowPosition: true,
    dataHandler: (selectArr, positionArr, randomArr, radix) => {

      let objArr = []
      positionArr.forEach(str => {
        let randomOjb = randomArr.find(item => item.N.includes(str))
        let obj = BDH.createBuyObj()
        obj.I = randomOjb.I;
        obj.gName = randomOjb.N;
        obj.num = obj.num / positionArr.length
        obj.money = obj.money / positionArr.length
        obj.numStr = selectArr[0].join('') + ',' + selectArr[1].join('')
        obj.orderStr = selectArr[0].join('') + ',' + selectArr[1].join('')
        objArr.push(obj)
      })
      return objArr
    },
    addRandom: (randomArr = []) => {
      let len = randomArr.length
      let randomObj = randomArr[BDH.createRandomNum(0, len - 1)]
      let arr = BDH.createRandomNumArr(2)
      let arr1 = arr.slice(0, 1)
      let arr2 = arr.slice(1)
      let obj = BDH.createBuyObj()
      obj.I = randomObj.I
      obj.gName = randomObj.N
      obj.numStr = arr1.join('') + ',' + arr2.join('')
      obj.orderStr = arr1.join('') + ',' + arr2.join('')
      return obj
    },
    moneyHandler: (selectArr) => {
      if (selectArr.length < 2) return
      let len1 = selectArr[0].length
      let len2 = selectArr[1].length
      if (len1 < 1 || len2 < 1) return

      let temArr = [];
      selectArr[0].forEach(item => {
        let index = selectArr[1].findIndex(n => n === item);
        if (index !== -1) {
          temArr.push(BDH.combinatorialNumber(len2 - 1, 1));
        } else {
          temArr.push(BDH.combinatorialNumber(len2, 1));
        }
      });

      let s = temArr.reduce((accumulator, currentValue) => {
        return accumulator + currentValue;
      }, 0);


      return s
    }
  },


  2542: {
    name: '任4组选12',
    type: 'A2',
    titleArr: ['二重号', '单号'],
    limitLen: 4,
    isShowPosition: true,
    dataHandler: (selectArr, positionArr, randomArr, radix) => {

      let objArr = []
      positionArr.forEach(str => {
        let randomOjb = randomArr.find(item => item.N.includes(str))
        let obj = BDH.createBuyObj()
        obj.I = randomOjb.I;
        obj.gName = randomOjb.N;
        obj.num = obj.num / positionArr.length
        obj.money = obj.money / positionArr.length
        obj.numStr = selectArr[0].join('') + ',' + selectArr[1].join('')
        obj.orderStr = selectArr[0].join('') + ',' + selectArr[1].join('')
        objArr.push(obj)
      })
      return objArr
    },
    addRandom: (randomArr = []) => {
      let len = randomArr.length
      let randomObj = randomArr[BDH.createRandomNum(0, len - 1)]
      let arr = BDH.createRandomNumArr(3)
      let arr1 = arr.slice(0, 1)
      let arr2 = arr.slice(1)
      let obj = BDH.createBuyObj()
      obj.I = randomObj.I
      obj.gName = randomObj.N
      obj.numStr = arr1.join('') + ',' + arr2.join('')
      obj.orderStr = arr1.join('') + ',' + arr2.join('')
      return obj
    },
    moneyHandler: (selectArr) => {
      if (selectArr.length < 2) return
      let len1 = selectArr[0].length
      let len2 = selectArr[1].length
      if (len1 < 1 || len2 < 2) return

      let temArr = [];
      selectArr[0].forEach(item => {
        let index = selectArr[1].findIndex(n => n === item);
        if (index !== -1) {
          temArr.push(BDH.combinatorialNumber(len2 - 1, 2));
        } else {
          temArr.push(BDH.combinatorialNumber(len2, 2));
        }
      });

      let s = temArr.reduce((accumulator, currentValue) => {
        return accumulator + currentValue;
      }, 0);


      return s
    }
  },

  2541: {
    name: '任4组选6',
    type: 'A2',
    titleArr: ['二重号'],
    limitLen: 4,
    isShowPosition: true,
    dataHandler: (selectArr, positionArr, randomArr, radix) => {
      let len = selectArr[0].length
      let n = BDH.combinatorialNumber(len, 2)
      let objArr = []
      positionArr.forEach(str => {
        let randomOjb = randomArr.find(item => item.N.includes(str.replace(/\,/, '')))
        let obj = BDH.createBuyObj()
        obj.I = randomOjb.I;
        obj.gName = randomOjb.N;
        obj.num = n
        obj.money = n * radix
        obj.numStr = selectArr[0].join('')
        obj.orderStr = selectArr[0].join(',')
        objArr.push(obj)
      })
      return objArr
    },
    addRandom: (randomArr = []) => {
      let len = randomArr.length
      let randomObj = randomArr[BDH.createRandomNum(0, len - 1)]
      let arr = BDH.createNoRepeatNumberArr(2)
      let obj = BDH.createBuyObj()
      obj.I = randomObj.I
      obj.gName = randomObj.N
      obj.numStr = arr.join('')
      obj.orderStr = arr.join(',')
      return obj
    },
    moneyHandler: (selectArr) => {
      if (selectArr[0].length < 2) return
      let s = BDH.combinatorialNumber(selectArr[0].length, 2)
      return s
    }
  },

  2543: {
    name: '任4组选24',
    type: 'A2',
    titleArr: ['单号'],
    limitLen: 4,
    isShowPosition: true,
    dataHandler: (selectArr, positionArr, randomArr, radix) => {
      let len = selectArr[0].length
      let n = BDH.combinatorialNumber(len, 4)
      let objArr = []
      positionArr.forEach(str => {
        let randomOjb = randomArr.find(item => item.N.includes(str.replace(/\,/, '')))
        let obj = BDH.createBuyObj()
        obj.I = randomOjb.I;
        obj.gName = randomOjb.N;
        obj.num = n
        obj.money = n * radix
        obj.numStr = selectArr[0].join('')
        obj.orderStr = selectArr[0].join(',')
        objArr.push(obj)
      })
      return objArr
    },
    addRandom: (randomArr = []) => {
      let len = randomArr.length
      let randomObj = randomArr[BDH.createRandomNum(0, len - 1)]
      let arr = BDH.createRandomNumArr(4)
      let obj = BDH.createBuyObj()
      obj.I = randomObj.I
      obj.gName = randomObj.N
      obj.numStr = arr.join('')
      obj.orderStr = arr.join(',')
      return obj
    },
    moneyHandler: (selectArr) => {
      if (selectArr[0].length < 3) return
      let s = BDH.combinatorialNumber(selectArr[0].length, 4)
      return s
    }
  },



  1366: {
    name: '任三组六',
    type: 'A2',
    titleArr: ['组六'],
    limitLen: 3,
    isShowPosition: true,
    dataHandler: (selectArr, positionArr, randomArr, radix) => {
      let len = selectArr[0].length
      let n = BDH.combinatorialNumber(len, 3)
      let objArr = []
      positionArr.forEach(str => {
        let randomOjb = randomArr.find(item => item.N.includes(str.replace(/\,/, '')))
        let obj = BDH.createBuyObj()
        obj.I = randomOjb.I;
        obj.gName = randomOjb.N;
        // obj.num = n 
        // obj.money = n * radix
        obj.numStr = selectArr[0].join('')
        obj.orderStr = selectArr[0].join('')
        objArr.push(obj)
      })
      return objArr
    },
    addRandom: (randomArr = []) => {
      let len = randomArr.length
      let randomObj = randomArr[BDH.createRandomNum(0, len - 1)]
      let arr = BDH.createRandomNumArr(3)
      let obj = BDH.createBuyObj()
      obj.I = randomObj.I
      obj.gName = randomObj.N
      obj.numStr = arr.join('')
      obj.orderStr = arr.join('')
      return obj
    },
    moneyHandler: (selectArr) => {
      if (selectArr[0].length < 3) return
      let s = BDH.combinatorialNumber(selectArr[0].length, 3)
      return s
    }
  },
  1365: {
    name: '任三组三',
    type: 'A2',
    titleArr: ['组三'],
    limitLen: 3,
    isShowPosition: true,
    dataHandler: (selectArr, positionArr, randomArr, radix) => {
      let len = selectArr[0].length
      let n = BDH.combinatorialNumber(len, 2)
      let objArr = []
      positionArr.forEach(str => {
        let randomOjb = randomArr.find(item => item.N.includes(str.replace(/\,/, '')))
        let obj = BDH.createBuyObj()
        obj.I = randomOjb.I;
        obj.gName = randomOjb.N;
        obj.num = n * 2
        obj.money = n * radix * 2
        obj.numStr = selectArr[0].join('')
        obj.orderStr = selectArr[0].join('')
        objArr.push(obj)
      })
      return objArr
    },
    addRandom: (randomArr = []) => {
      let len = randomArr.length
      let randomObj = randomArr[BDH.createRandomNum(0, len - 1)]
      let arr = BDH.createRandomNumArr(2)
      let obj = BDH.createBuyObj()
      obj.I = randomObj.I
      obj.gName = randomObj.N
      obj.numStr = arr.join('')
      obj.orderStr = arr.join('')
      obj.num = obj.num * 2
      obj.money = obj.money * 2
      return obj
    },
    moneyHandler: (selectArr) => {
      if (selectArr[0].length < 2) return
      let s = BDH.combinatorialNumber(selectArr[0].length, 2)
      return s * 2
    }
  },


  1368: {
    name: '任三组选和值',
    type: 'A3',
    title: '组选和值',
    isShowPosition: true,
    numLimit: 27,
    startNum: 1,
    limitLen: 3,
    dataHandler: (selectArr) => {
      let str = selectArr.join('')
      return { numStr: str, orderStr: selectArr.join(',') }
    },
    addRandom: (randomArr = []) => {
      let len = randomArr.length
      let randomObj = randomArr[BDH.createRandomNum(0, len - 1)]
      let arr = BDH.createRandomNumArr(2)
      let obj = BDH.createBuyObj()
      obj.I = randomObj.I
      obj.gName = randomObj.N
      obj.numStr = arr.join('')
      obj.orderStr = arr.join('')
      return obj
    },
    moneyHandler: (selectArr) => {
      if (selectArr.length < 1) return
      let i = 0
      selectArr.forEach(n => {
        i += BDH.threeSumSort(n).length
      })
      return i
    }
  },
  1364: {
    name: '任三直选和值',
    type: 'A3',
    title: '直选和值',
    isShowPosition: true,
    numLimit: 28,
    limitLen: 3,
    dataHandler: (selectArr) => {
      let str = selectArr.join('')
      return { numStr: str, orderStr: selectArr.join(',') }
    },
    addRandom: (randomArr = []) => {
      let len = randomArr.length
      let randomObj = randomArr[BDH.createRandomNum(0, len - 1)]
      let arr = BDH.createRandomNumArr(2)
      let obj = BDH.createBuyObj()
      obj.I = randomObj.I
      obj.gName = randomObj.N
      obj.numStr = arr.join('')
      obj.orderStr = arr.join('')
      return obj
    },
    moneyHandler: (selectArr) => {
      if (selectArr.length < 1) return
      let i = 0
      selectArr.forEach(n => {
        i += BDH.threeSum(n).length
      })
      return i
    }
  },
  1361: {
    name: '任二组选和值',
    type: 'A3',
    title: '组选和值',
    isShowPosition: true,
    numLimit: 18,
    startNum: 1,
    dataHandler: (selectArr) => {
      let str = selectArr.join('')
      return { numStr: str, orderStr: selectArr.join(',') }
    },
    addRandom: (randomArr = []) => {
      let len = randomArr.length
      let randomObj = randomArr[BDH.createRandomNum(0, len - 1)]
      let arr = BDH.createRandomNumArr(2)
      let obj = BDH.createBuyObj()
      obj.I = randomObj.I
      obj.gName = randomObj.N
      obj.numStr = arr.join('')
      obj.orderStr = arr.join('')
      return obj
    },
    moneyHandler: (selectArr) => {
      if (selectArr.length < 1) return
      let i = 0
      selectArr.forEach(n => {
        i += BDH.twoSumSort(n).length
      })
      return i
    }
  },
  1358: {
    name: '任二直选和值',
    type: 'A3',
    title: '直选和值',
    isShowPosition: true,
    numLimit: 19,
    dataHandler: (selectArr) => {
      let str = selectArr.join('')
      return { numStr: str, orderStr: selectArr.join(',') }
    },
    addRandom: (randomArr = []) => {
      let len = randomArr.length
      let randomObj = randomArr[BDH.createRandomNum(0, len - 1)]
      let arr = BDH.createRandomNumArr(2)
      let obj = BDH.createBuyObj()
      obj.I = randomObj.I
      obj.gName = randomObj.N
      obj.numStr = arr.join('')
      obj.orderStr = arr.join('')
      return obj
    },
    moneyHandler: (selectArr) => {
      if (selectArr.length < 1) return
      let i = 0
      selectArr.forEach(n => {
        i += BDH.twoSum(n).length
      })
      return i
    }
  },



  2538: {
    name: '任四直选复式',
    type: 'A1',
    titleArr: ['万位', '千位', '百位', '十位', '个位'],
    isShowPosition: false,
    dataHandler: (selectArr, nameArr, randomArr, radix) => {
      let hNameArr = []
      nameArr.forEach(str=>{
        str = str.replace(/位/g,'')
        hNameArr.push(str)
      })
      let titleArr = ['万', '千', '百', '十', '个']
      let titleList = BDH.getCombine(hNameArr, 4)


      let objArr = []
      titleList.forEach(str=>{
        let temArr = []
        let arr = str.split('')
        arr.forEach(title=>{
          let index =  hNameArr.findIndex(s=>s==title)
          let sArr = selectArr[index]
          temArr.push(sArr)
        })
        let curobj = randomArr.find(item=>item.N.includes(str))
        let obj = BDH.createBuyObj()
        obj.I = curobj.I
        obj.gName = curobj.N
        let s = temArr.reduce((accumulator,currentValue)=>{
          return accumulator * currentValue.length
        },1)
        obj.num = s
        obj.money = s * radix
        obj.numStr = temArr.join('|')

        let orderArr = []
        let i = 0
        titleArr.forEach((str,index)=>{
          if(arr.includes(str)){
            orderArr.push(temArr[i])
            i++
          } else {
            orderArr.push('-')
          }
        })

        let orderStr = []
        orderArr.forEach(item=>{
          if(Array.isArray(item)){
            orderStr.push(item.join(''))
          }else {
            orderStr.push(item)
          }
        })

        obj.orderStr = orderStr.join(',')
        objArr.push(obj)
      })

      return objArr
      // let nameList = BDH.getCombine(nameArr, 4)
      // let titleArr = ['万', '千', '百', '十', '个']
      // let objArr = []
      // nameList.forEach((str, index) => {
      //   let robj = randomArr.find(item => item.N.includes(str))
      //   let obj = BDH.createBuyObj()
      //   obj.I = robj.I
      //   obj.gName = robj.N
      //   let arr = str.split('')
      //   let tem = []
      //   let tem1 = []
      //   titleArr.forEach(title => {
      //     if (arr.includes(title)) {
      //       let idx = nameArr.findIndex(s => s == title)
      //       tem.push(selectArr[idx].join(''))
      //       tem1.push(selectArr[idx].join(''))
      //     } else {
      //       tem.push('-')
      //     }
      //   })
      //   obj.num = tem1[0].length * tem1[1].length * tem1[2].length * tem1[3].length
      //   obj.money = tem1[0].length * tem1[1].length * tem1[2].length * tem1[3].length * radix
      //   obj.numStr = tem1.join('|')
      //   obj.orderStr = tem.join(',')
      //   objArr.push(obj)
      // })
      // return objArr
    },
    addRandom: (randomArr = []) => {
      let len = randomArr.length
      let randomObj = randomArr[BDH.createRandomNum(0, len - 1)]
      let arr = BDH.createRandomNumArr(4)

      let titleArr = ['万', '千', '百', '十', '个']
      let orderArr = []
      let i = 0
      titleArr.forEach(title => {
        if (randomObj.N.includes(title)) {
          orderArr.push(arr[i])
          i++
        } else {
          orderArr.push('-')
        }
      })
      let obj = BDH.createBuyObj()
      obj.I = randomObj.I
      obj.gName = randomObj.N
      obj.numStr = arr.join(',')
      obj.orderStr = orderArr.join(',')
      return obj
    },
    moneyHandler: (selectArr, nameArr) => {
      if (nameArr.length < 4) return
      let tem = []
      let i = 0
      while (i < selectArr.length) {
        tem.push(i)
        i++
      }

      let list = BDH.getCombine(tem, 4)
      let lenArr = []
      list.forEach(str => {
        let arr = str.split('')
        let n = selectArr[arr[0]].length * selectArr[arr[1]].length * selectArr[arr[2]].length * selectArr[arr[3]].length
        lenArr.push(n)
      })

      let s = lenArr.reduce((accumulator, currentValue) => {
        return accumulator + currentValue
      }, 0)
      return s
    }
  },
  1363: {
    name: '任三直选复式',
    type: 'A1',
    titleArr: ['万位', '千位', '百位', '十位', '个位'],
    isShowPosition: false,
    dataHandler: (selectArr, nameArr, randomArr, radix) => {
      let hNameArr = []
      nameArr.forEach(str=>{
        str = str.replace(/位/g,'')
        hNameArr.push(str)
      })
      let titleArr = ['万', '千', '百', '十', '个']
      let titleList = BDH.getCombine(hNameArr, 3)


      let objArr = []
      titleList.forEach(str=>{
        let temArr = []
        let arr = str.split('')
        arr.forEach(title=>{
          let index =  hNameArr.findIndex(s=>s==title)
          let sArr = selectArr[index]
          temArr.push(sArr)
        })
        let curobj = randomArr.find(item=>item.N.includes(str))
        let obj = BDH.createBuyObj()
        obj.I = curobj.I
        obj.gName = curobj.N
        let s = temArr.reduce((accumulator,currentValue)=>{
          return accumulator * currentValue.length
        },1)
        obj.num = s
        obj.money = s * radix
        obj.numStr = temArr.join('|')

        let orderArr = []
        let i = 0
        titleArr.forEach((str,index)=>{
          if(arr.includes(str)){
            orderArr.push(temArr[i])
            i++
          } else {
            orderArr.push('-')
          }
        })

        let orderStr = []
        orderArr.forEach(item=>{
          if(Array.isArray(item)){
            orderStr.push(item.join(''))
          }else {
            orderStr.push(item)
          }
        })

        obj.orderStr = orderStr.join(',')
        objArr.push(obj)
      })

      return objArr

      // let nameList = BDH.getCombine(nameArr, 3)
      // let titleArr = ['万', '千', '百', '十', '个']
      // let objArr = []
      // nameList.forEach((str, index) => {
      //   let robj = randomArr.find(item => item.N.includes(str))
      //   let obj = BDH.createBuyObj()
      //   obj.I = robj.I
      //   obj.gName = robj.N
      //   let arr = str.split('')
      //   let tem = []
      //   let tem1 = []
      //   titleArr.forEach(title => {
      //     if (arr.includes(title)) {
      //       let idx = nameArr.findIndex(s => s == title)
      //       tem.push(selectArr[idx].join(''))
      //       tem1.push(selectArr[idx].join(''))
      //     } else {
      //       tem.push('-')
      //     }
      //   })
      //   obj.num = tem1[0].length * tem1[1].length * tem1[2].length
      //   obj.money = tem1[0].length * tem1[1].length * tem1[2].length * radix
      //   obj.numStr = tem1.join('|')
      //   obj.orderStr = tem.join(',')
      //   objArr.push(obj)
      // })
      // return objArr
    },
    addRandom: (randomArr = []) => {
      let len = randomArr.length
      let randomObj = randomArr[BDH.createRandomNum(0, len - 1)]
      let arr = BDH.createRandomNumArr(3)

      let titleArr = ['万', '千', '百', '十', '个']
      let orderArr = []
      let i = 0
      titleArr.forEach(title => {
        if (randomObj.N.includes(title)) {
          orderArr.push(arr[i])
          i++
        } else {
          orderArr.push('-')
        }
      })
      let obj = BDH.createBuyObj()
      obj.I = randomObj.I
      obj.gName = randomObj.N
      obj.numStr = arr.join(',')
      obj.orderStr = orderArr.join(',')
      return obj
    },
    moneyHandler: (selectArr, nameArr) => {
      if (nameArr.length < 3) return
      let tem = []
      let i = 0
      while (i < selectArr.length) {
        tem.push(i)
        i++
      }

      let list = BDH.getCombine(tem, 3)
      let lenArr = []
      list.forEach(str => {
        let arr = str.split('')
        let n = selectArr[arr[0]].length * selectArr[arr[1]].length * selectArr[arr[2]].length
        lenArr.push(n)
      })

      let s = lenArr.reduce((accumulator, currentValue) => {
        return accumulator + currentValue
      }, 0)
      return s
    }
  },

  1359: {
    name: '任二组选复式',
    type: 'A2',
    titleArr: ['组选'],
    isShowPosition: true,
    dataHandler: (selectArr, positionArr, randomArr, radix) => {
      let len = selectArr[0].length
      let n = BDH.combinatorialNumber(len, 2)
      let objArr = []
      positionArr.forEach(str => {
        let randomOjb = randomArr.find(item => item.N.includes(str.replace(/\,/, '')))
        let obj = BDH.createBuyObj()
        obj.I = randomOjb.I;
        obj.gName = randomOjb.N;
        obj.num = n
        obj.money = n * radix
        obj.numStr = selectArr[0].join('')
        obj.orderStr = selectArr[0].join('')
        objArr.push(obj)
      })
      return objArr
    },
    addRandom: (randomArr = []) => {
      let len = randomArr.length
      let randomObj = randomArr[BDH.createRandomNum(0, len - 1)]
      let arr = BDH.createRandomNumArr(2)
      let obj = BDH.createBuyObj()
      obj.I = randomObj.I
      obj.gName = randomObj.N
      obj.numStr = arr.join('')
      obj.orderStr = arr.join('')
      return obj
    },
    moneyHandler: (selectArr) => {
      if (selectArr[0].length < 2) return
      let s = BDH.combinatorialNumber(selectArr[0].length, 2)
      return s
    }
  },

  1356: {
    name: '任二直选复式',
    type: 'A1',
    titleArr: ['万位', '千位', '百位', '十位', '个位'],
    isShowPosition: false,
    dataHandler: (selectArr, nameArr, randomArr, radix) => {

      let hNameArr = []
      nameArr.forEach(str=>{
        str = str.replace(/位/g,'')
        hNameArr.push(str)
      })
      let titleArr = ['万', '千', '百', '十', '个']
      let titleList = BDH.getCombine(hNameArr, 2)


      let objArr = []
      titleList.forEach(str=>{
        let temArr = []
        let arr = str.split('')
        arr.forEach(title=>{
          let index =  hNameArr.findIndex(s=>s==title)
          let sArr = selectArr[index]
          temArr.push(sArr)
        })
        let curobj = randomArr.find(item=>item.N.includes(str))
        let obj = BDH.createBuyObj()
        obj.I = curobj.I
        obj.gName = curobj.N
        let s = temArr.reduce((accumulator,currentValue)=>{
          return accumulator * currentValue.length
        },1)
        obj.num = s
        obj.money = s * radix
        obj.numStr = temArr.join('|')

        let orderArr = []
        let i = 0
        titleArr.forEach((str,index)=>{
          if(arr.includes(str)){
            orderArr.push(temArr[i])
            i++
          } else {
            orderArr.push('-')
          }
        })

        let orderStr = []
        orderArr.forEach(item=>{
          if(Array.isArray(item)){
            orderStr.push(item.join(''))
          }else {
            orderStr.push(item)
          }
        })

        obj.orderStr = orderStr.join(',')
        objArr.push(obj)
      })

      return objArr
      // let nameList = BDH.getCombine(nameArr, 2)
      // let titleArr = ['万', '千', '百', '十', '个']
      // let objArr = []
      // nameList.forEach((str, index) => {
      //   let robj = randomArr.find(item => item.N.includes(str))
      //   let obj = BDH.createBuyObj()
      //   obj.I = robj.I
      //   obj.gName = robj.N
      //   let arr = str.split('')
      //   let tem = []
      //   let tem1 = []
      //   console.log(titleArr);
      //   titleArr.forEach(title => {
      //     if (arr.includes(title)) {
      //       let idx = nameArr.findIndex(s => s == title)
      //       tem.push(selectArr[idx].join(''))
      //       tem1.push(selectArr[idx].join(''))
      //     } else {
      //       tem.push('-')
      //     }
      //   })
      //   obj.num = tem1[0].length * tem1[1].length
      //   obj.money = tem1[0].length * tem1[1].length * radix
      //   obj.numStr = tem1.join('|')
      //   obj.orderStr = tem.join(',')
      //   objArr.push(obj)
      // })
      // return objArr
    },
    addRandom: (randomArr = []) => {
      let len = randomArr.length
      let randomObj = randomArr[BDH.createRandomNum(0, len - 1)]
      let arr = BDH.createRandomNumArr(2)

      let titleArr = ['万', '千', '百', '十', '个']
      let orderArr = []
      let i = 0
      titleArr.forEach(title => {
        if (randomObj.N.includes(title)) {
          orderArr.push(arr[i])
          i++
        } else {
          orderArr.push('-')
        }
      })
      let obj = BDH.createBuyObj()
      obj.I = randomObj.I
      obj.gName = randomObj.N
      obj.numStr = arr.join(',')
      obj.orderStr = orderArr.join(',')
      return obj
    },
    moneyHandler: (selectArr, nameArr) => {
      if (nameArr.length < 2) return
      let tem = []
      let i = 0
      while (i < selectArr.length) {
        tem.push(i)
        i++
      }

      let list = BDH.getCombine(tem, 2)
      let lenArr = []
      list.forEach(str => {
        let arr = str.split('')
        let n = selectArr[arr[0]].length * selectArr[arr[1]].length
        lenArr.push(n)
      })

      let s = lenArr.reduce((accumulator, currentValue) => {
        return accumulator + currentValue
      }, 0)
      return s
    }
  },

  1354: {
    name: '三星报喜',
    type: 'A',
    titleArr: ['三星报喜'],
    dataHandler: (selectArr) => {
      let str = selectArr[0].join(',')
      let numStr = str
      let orderStr = str
      return { numStr, orderStr }
    },
    addRandom: () => {
      let obj = BDH.createBuyObj()
      let arr = BDH.createNoRepeatNumberArr(1)
      obj.numStr = arr.join(',')
      obj.orderStr = arr.join('')
      return obj
    },
    moneyHandler: (selectArr) => {
      let len = selectArr[0].length
      if (len < 1) return
      let s = BDH.combinatorialNumber(len, 1)
      return { num: s, money: s }
    }
  },
  1355: {
    name: '四季发财',
    type: 'A',
    titleArr: ['四季发财'],
    dataHandler: (selectArr) => {
      let str = selectArr[0].join(',')
      let numStr = str
      let orderStr = str
      return { numStr, orderStr }
    },
    addRandom: () => {
      let obj = BDH.createBuyObj()
      let arr = BDH.createNoRepeatNumberArr(1)
      obj.numStr = arr.join(',')
      obj.orderStr = arr.join('')
      return obj
    },
    moneyHandler: (selectArr) => {
      let len = selectArr[0].length
      if (len < 1) return
      let s = BDH.combinatorialNumber(len, 1)
      return { num: s, money: s }
    }
  },
  1353: {
    name: '好事成双',
    type: 'A',
    titleArr: ['好事成双'],
    dataHandler: (selectArr) => {
      let str = selectArr[0].join(',')
      let numStr = str
      let orderStr = str
      return { numStr, orderStr }
    },
    addRandom: () => {
      let obj = BDH.createBuyObj()
      let arr = BDH.createNoRepeatNumberArr(1)
      obj.numStr = arr.join(',')
      obj.orderStr = arr.join('')
      return obj
    },
    moneyHandler: (selectArr) => {
      let len = selectArr[0].length
      if (len < 1) return
      let s = BDH.combinatorialNumber(len, 1)
      return { num: s, money: s }
    }
  },
  1352: {
    name: '一帆风顺',
    type: 'A',
    titleArr: ['一帆风顺'],
    dataHandler: (selectArr) => {
      let str = selectArr[0].join(',')
      let numStr = str
      let orderStr = str
      return { numStr, orderStr }
    },
    addRandom: () => {
      let obj = BDH.createBuyObj()
      let arr = BDH.createNoRepeatNumberArr(1)
      obj.numStr = arr.join(',')
      obj.orderStr = arr.join('')
      return obj
    },
    moneyHandler: (selectArr) => {
      let len = selectArr[0].length
      if (len < 1) return
      let s = BDH.combinatorialNumber(len, 1)
      return { num: s, money: s }
    }
  },

  1351: {
    name: '后二大小单双',
    type: 'A',
    titleArr: ['十位', '个位'],
    Nlist: [
      {
        isSelected: false,
        num: '大'
      },
      {
        isSelected: false,
        num: '小'
      },
      {
        isSelected: false,
        num: '单'
      },
      {
        isSelected: false,
        num: '双'
      },
    ],
    Tlist: [
      {
        isSelected: false,
        text: "全",
      },
      {
        isSelected: false,
        text: "清",
      },
    ],
    dataHandler: (arr) => {
      let str = arr[0].join('')
      let str1 = arr[1].join('')
      let numStr = str + '|' + str1
      let orderStr = str + ',' + str1

      return { numStr, orderStr }
    },
    addRandom: () => {
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
  1350: {
    name: '前二大小单双',
    type: 'A',
    titleArr: ['万位', '千位'],
    Nlist: [
      {
        isSelected: false,
        num: '大'
      },
      {
        isSelected: false,
        num: '小'
      },
      {
        isSelected: false,
        num: '单'
      },
      {
        isSelected: false,
        num: '双'
      },
    ],
    Tlist: [
      {
        isSelected: false,
        text: "全",
      },
      {
        isSelected: false,
        text: "清",
      },
    ],
    dataHandler: (arr) => {
      let str = arr[0].join('')
      let str1 = arr[1].join('')
      let numStr = str + '|' + str1
      let orderStr = str + ',' + str1

      return { numStr, orderStr }
    },
    addRandom: () => {
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
  1349: {
    name: '前三二码不定胆',
    type: 'A',
    titleArr: ['不定胆'],
    dataHandler: (selectArr) => {
      let str = selectArr[0].join(',')
      let numStr = str
      let orderStr = str
      return { numStr, orderStr }
    },
    addRandom: () => {
      let obj = BDH.createBuyObj()
      let arr = BDH.createNoRepeatNumberArr(2)
      obj.numStr = arr.join(',')
      obj.orderStr = arr.join(',')
      return obj
    },
    moneyHandler: (selectArr) => {
      let len = selectArr[0].length
      if (len < 2) return
      let s = BDH.combinatorialNumber(len, 2)
      return { num: s, money: s }
    }
  },
  1348: {
    name: '前三一码不定胆',
    type: 'A',
    titleArr: ['不定胆'],
    dataHandler: (selectArr) => {
      let str = selectArr[0].join('')
      let numStr = str
      let orderStr = str
      return { numStr, orderStr }
    },
    addRandom: () => {
      let obj = BDH.createBuyObj()
      let arr = BDH.createNoRepeatNumberArr(1)
      obj.numStr = arr.join(',')
      obj.orderStr = arr.join('')
      return obj
    },
    moneyHandler: (selectArr) => {
      let len = selectArr[0].length
      if (len < 1) return
      let s = BDH.combinatorialNumber(len, 1)
      return { num: s, money: s }
    }
  },
  1347: {
    name: '后三二码不定胆',
    type: 'A',
    titleArr: ['不定胆'],
    dataHandler: (selectArr) => {
      let str = selectArr[0].join(',')
      let numStr = str
      let orderStr = str
      return { numStr, orderStr }
    },
    addRandom: () => {
      let obj = BDH.createBuyObj()
      let arr = BDH.createNoRepeatNumberArr(2)
      obj.numStr = arr.join(',')
      obj.orderStr = arr.join(',')
      return obj
    },
    moneyHandler: (selectArr) => {
      let len = selectArr[0].length
      if (len < 2) return
      let s = BDH.combinatorialNumber(len, 2)
      return { num: s, money: s }
    }
  },
  1346: {
    name: '后三一码不定胆',
    type: 'A',
    titleArr: ['不定胆'],
    dataHandler: (selectArr) => {
      let str = selectArr[0].join('')
      let numStr = str
      let orderStr = str
      return { numStr, orderStr }
    },
    addRandom: () => {
      let obj = BDH.createBuyObj()
      let arr = BDH.createNoRepeatNumberArr(1)
      obj.numStr = arr.join(',')
      obj.orderStr = arr.join('')
      return obj
    },
    moneyHandler: (selectArr) => {
      let len = selectArr[0].length
      if (len < 1) return
      let s = BDH.combinatorialNumber(len, 1)
      return { num: s, money: s }
    }
  },


  1341: {
    name: '前二组选复式',
    type: 'A',
    titleArr: ['组选'],
    dataHandler: (selectArr) => {
      let str = selectArr[0].join('')
      let numStr = str
      let orderStr = str
      return { numStr, orderStr }
    },
    addRandom: () => {
      let obj = BDH.createBuyObj()
      let arr = BDH.createNoRepeatNumberArr(2)
      obj.numStr = arr.join(',')
      obj.orderStr = arr.join('')
      return obj
    },
    moneyHandler: (selectArr) => {
      let len = selectArr[0].length
      if (len < 2) return
      let s = BDH.combinatorialNumber(len, 2)
      return { num: s, money: s }
    }
  },
  1339: {
    name: '后二组选复式',
    type: 'A',
    titleArr: ['组选'],
    dataHandler: (selectArr) => {
      let str = selectArr[0].join('')
      let numStr = str
      let orderStr = str
      return { numStr, orderStr }
    },
    addRandom: () => {
      let obj = BDH.createBuyObj()
      let arr = BDH.createNoRepeatNumberArr(2)
      obj.numStr = arr.join(',')
      obj.orderStr = arr.join('')
      return obj
    },
    moneyHandler: (selectArr) => {
      console.log(selectArr);
      let len = selectArr[0].length

      if (len < 2) return
      let s = BDH.combinatorialNumber(len, 2)
      return { num: s, money: s }
    }
  },

  1335: {
    name: '前二直选复式',
    type: 'A',
    titleArr: ['万位', '千位'],
    dataHandler: (arr) => {
      let str = arr[0].join('')
      let str1 = arr[1].join('')
      let numStr = str + '|' + str1
      let orderStr = str + ',' + str1
      return { numStr, orderStr }
    },
    addRandom: () => {
      let obj = BDH.createBuyObj()
      let list = BDH.createNoRepeatNumberArr(2)
      let arr = list.slice(0, 1)
      let arr2 = list.slice(1)
      obj.numStr = arr.join('') + '|' + arr2.join('')
      obj.orderStr = arr.join('') + ',' + arr2.join('')
      return obj
    },
    moneyHandler: (arr) => {
      if (arr.length < 2) return
      let len1 = arr[0].length
      let len2 = arr[1].length
      if (len1 < 1 || len2 < 1) return
      let obj = BDH.zhuxuan(arr[0], arr[1], 1, false)
      let { num } = obj
      if (!num) return
      return obj
    }
  },
  1333: {
    name: '后二直选复式',
    type: 'A',
    titleArr: ['十位', '个位'],
    dataHandler: (arr) => {
      let str = arr[0].join('')
      let str1 = arr[1].join('')
      let numStr = str + '|' + str1
      let orderStr = str + ',' + str1
      return { numStr, orderStr }
    },
    addRandom: () => {
      let obj = BDH.createBuyObj()
      let list = BDH.createNoRepeatNumberArr(2)
      let arr = list.slice(0, 1)
      let arr2 = list.slice(1)
      obj.numStr = arr.join('') + '|' + arr2.join('')
      obj.orderStr = arr.join('') + ',' + arr2.join('')
      return obj
    },
    moneyHandler: (arr) => {
      if (arr.length < 2) return
      let len1 = arr[0].length
      let len2 = arr[1].length
      if (len1 < 1 || len2 < 1) return
      let obj = BDH.zhuxuan(arr[0], arr[1], 1, false)
      let { num } = obj
      if (!num) return
      return obj
    }
  },



  2535: {
    name: '前四组选4',
    type: 'A',
    titleArr: ['三重号', '单号'],
    dataHandler: (arr) => {
      let str = arr[0].join('')
      let str1 = arr[1].join('')
      let numStr = str + '|' + str1
      let orderStr = str + ',' + str1
      return { numStr, orderStr }
    },
    addRandom: () => {
      let obj = BDH.createBuyObj()
      let list = BDH.createNoRepeatNumberArr(2)
      let arr = list.slice(0, 1)
      let arr2 = list.slice(1)
      obj.numStr = arr.join('') + '|' + arr2.join('')
      obj.orderStr = arr.join('') + ',' + arr2.join('')
      return obj
    },
    moneyHandler: (arr) => {
      if (arr.length < 2) return
      let len1 = arr[0].length
      let len2 = arr[1].length
      if (len1 < 1 || len2 < 1) return
      let obj = BDH.zhuxuan(arr[0], arr[1], 1)
      let { num } = obj
      if (!num) return
      return obj
    }
  },
  2534: {
    name: '后四组选6',
    type: 'A',
    titleArr: ['二重号'],
    dataHandler: (selectArr) => {
      let str = selectArr.join(',')
      let numStr = str
      let orderStr = str
      return { numStr, orderStr }
    },
    addRandom: () => {
      let obj = BDH.createBuyObj()
      let arr = BDH.createNoRepeatNumberArr(2)
      obj.numStr = arr.join(',')
      obj.orderStr = arr.join(',')
      return obj
    },
    moneyHandler: (selectArr) => {
      let len = selectArr[0].length
      if (len < 2) return
      let s = BDH.combinatorialNumber(len, 2)
      return { num: s, money: s }
    }
  },
  2533: {
    name: '后四组选12',
    type: 'A',
    titleArr: ['二重号', '单号'],
    dataHandler: (arr) => {
      let str = arr[0].join('')
      let str1 = arr[1].join('')
      let numStr = str + '|' + str1
      let orderStr = str + ',' + str1
      return { numStr, orderStr }
    },
    addRandom: () => {
      let obj = BDH.createBuyObj()
      let list = BDH.createNoRepeatNumberArr(3)
      let arr = list.slice(0, 1)
      let arr2 = list.slice(1)
      obj.numStr = arr.join('') + '|' + arr2.join('')
      obj.orderStr = arr.join('') + ',' + arr2.join('')
      return obj
    },
    moneyHandler: (arr) => {
      if (arr.length < 2) return
      let len1 = arr[0].length
      let len2 = arr[1].length
      if (len1 < 1 || len2 < 2) return
      let obj = BDH.zhuxuan(arr[0], arr[1], 2)
      let { num } = obj
      if (!num) return
      return obj
    }
  },
  2532: {
    name: '前四组选24',
    type: 'A',
    titleArr: ['组选24'],
    dataHandler: (selectArr) => {
      let str = selectArr.join(',')
      let numStr = str
      let orderStr = str
      return { numStr, orderStr }
    },
    addRandom: () => {
      let obj = BDH.createBuyObj()
      let arr = BDH.createNoRepeatNumberArr(4)
      obj.numStr = arr.join(',')
      obj.orderStr = arr.join(',')
      return obj
    },
    moneyHandler: (selectArr) => {
      let len = selectArr[0].length
      if (len < 4) return
      let s = BDH.combinatorialNumber(len, 4)
      return { num: s, money: s }
    }
  },
  2531: {
    name: '前四组合',
    type: 'A',
    titleArr: ['万位', '千位', '百位', '十位'],
    dataHandler: (selectArr) => {
      let str = selectArr.join('|').replace(/\,/g, '').replace(/\|/g, ',')
      let numStr = str
      let orderStr = str
      return { numStr, orderStr }
    },
    moneyHandler: (selectArr) => {
      if (selectArr.length < 4) return
      let s = selectArr.reduce((accumulator, currentValue) => {
        return accumulator * currentValue.length
      }, 1)
      s = s * 4
      return { num: s, money: s }
    }
  },

  2530: {
    name: '前四复式',
    type: 'A',
    titleArr: ['万位', '千位', '百位', '十位'],
    dataHandler: (selectArr) => {
      let str = selectArr.join('|').replace(/\,/g, '').replace(/\|/g, ',')
      let numStr = str
      let orderStr = str
      return { numStr, orderStr }
    },
    addRandom: () => {
      let obj = BDH.createBuyObj()
      let arr = BDH.createRandomNumArr(4)
      obj.numStr = arr.join(',')
      obj.orderStr = arr.join(',')
      return obj
    },
    moneyHandler: (selectArr) => {
      if (selectArr.length < 4) return
      let s = selectArr.reduce((accumulator, currentValue) => {
        return accumulator * currentValue.length
      }, 1)

      return { num: s, money: s }
    }
  },



  1330: {
    name: '中三组六',
    type: 'A',
    titleArr: ['组六'],
    dataHandler: (selectArr) => {
      let numStr = selectArr[0].join(',')
      let orderStr = selectArr[0].join('')
      return { numStr, orderStr }
    },
    addRandom: () => {
      let obj = BDH.createBuyObj()
      let arr = BDH.createNoRepeatNumberArr(3)
      obj.numStr = arr.join(',')
      obj.orderStr = arr.join('')
      return obj
    },
    moneyHandler: (selectArr) => {
      let len = selectArr[0].length
      if (len < 3) return
      let s = BDH.combinatorialNumber(len, 3)
      return { num: s, money: s }
    }
  },
  1329: {
    name: '中三组三',
    type: 'A',
    titleArr: ['组三'],
    dataHandler: (selectArr) => {
      let numStr = selectArr[0].join(',')
      let orderStr = selectArr[0].join('')
      return { numStr, orderStr }
    },
    addRandom: () => {
      let obj = BDH.createBuyObj()
      let arr = BDH.createNoRepeatNumberArr(2)
      obj.num = 2
      obj.money = 4
      obj.numStr = arr.join(',')
      obj.orderStr = arr.join('')
      return obj
    },
    moneyHandler: (selectArr) => {
      let len = selectArr[0].length
      if (len < 2) return
      let s = BDH.combinatorialNumber(len, 2)
      return { num: s * 2, money: s * 2 }
    }
  },

  1327: {
    name: '中三直选复式',
    type: 'A',
    titleArr: ['千位', '百位', '十位'],
    dataHandler: (selectArr) => {
      let str = selectArr.join('|').replace(/\,/g, '').replace(/\|/g, ',')
      let numStr = str
      let orderStr = str
      return { numStr, orderStr }
    },
    addRandom: () => {
      let obj = BDH.createBuyObj()
      let arr = BDH.createRandomNumArr(3)
      obj.numStr = arr.join(',')
      obj.orderStr = arr.join(',')
      return obj
    },
    moneyHandler: (selectArr) => {
      if (selectArr.length < 3) return
      let s = selectArr.reduce((accumulator, currentValue) => {
        return accumulator * currentValue.length
      }, 1)

      return { num: s, money: s }
    }
  },

  1323: {
    name: '前三组六',
    type: 'A',
    titleArr: ['组六'],
    dataHandler: (selectArr) => {
      let numStr = selectArr[0].join(',')
      let orderStr = selectArr[0].join('')
      return { numStr, orderStr }
    },
    addRandom: () => {
      let obj = BDH.createBuyObj()
      let arr = BDH.createNoRepeatNumberArr(3)
      obj.numStr = arr.join(',')
      obj.orderStr = arr.join('')
      return obj
    },
    moneyHandler: (selectArr) => {
      let len = selectArr[0].length
      if (len < 3) return
      let s = BDH.combinatorialNumber(len, 3)
      return { num: s, money: s }
    }
  },
  1322: {
    name: '前三组三',
    type: 'A',
    titleArr: ['组三'],
    dataHandler: (selectArr) => {
      let numStr = selectArr[0].join(',')
      let orderStr = selectArr[0].join('')
      return { numStr, orderStr }
    },
    addRandom: () => {
      let obj = BDH.createBuyObj()
      let arr = BDH.createNoRepeatNumberArr(2)
      obj.num = 2
      obj.money = 4
      obj.numStr = arr.join(',')
      obj.orderStr = arr.join('')
      return obj
    },
    moneyHandler: (selectArr) => {
      let len = selectArr[0].length
      if (len < 2) return
      let s = BDH.combinatorialNumber(len, 2)
      return { num: s * 2, money: s * 2 }
    }
  },

  1320: {
    name: '前三直选复式',
    type: 'A',
    titleArr: ['万位', '千位', '百位'],
    dataHandler: (selectArr) => {
      let str = selectArr.join('|').replace(/\,/g, '').replace(/\|/g, ',')
      let numStr = str
      let orderStr = str
      return { numStr, orderStr }
    },
    addRandom: () => {
      let obj = BDH.createBuyObj()
      let arr = BDH.createRandomNumArr(3)
      obj.numStr = arr.join(',')
      obj.orderStr = arr.join(',')
      return obj
    },
    moneyHandler: (selectArr) => {
      if (selectArr.length < 3) return
      let s = selectArr.reduce((accumulator, currentValue) => {
        return accumulator * currentValue.length
      }, 1)

      return { num: s, money: s }
    }
  },

  1316: {
    name: '后三组六',
    type: 'A',
    titleArr: ['组六'],
    dataHandler: (selectArr) => {
      let numStr = selectArr[0].join(',')
      let orderStr = selectArr[0].join('')
      return { numStr, orderStr }
    },
    addRandom: () => {
      let obj = BDH.createBuyObj()
      let arr = BDH.createNoRepeatNumberArr(3)
      obj.numStr = arr.join(',')
      obj.orderStr = arr.join('')
      return obj
    },
    moneyHandler: (selectArr) => {
      let len = selectArr[0].length
      if (len < 3) return
      let s = BDH.combinatorialNumber(len, 3)
      return { num: s, money: s }
    }
  },
  1315: {
    name: '后三组三',
    type: 'A',
    titleArr: ['组三'],
    dataHandler: (selectArr) => {
      let numStr = selectArr[0].join(',')
      let orderStr = selectArr[0].join('')
      return { numStr, orderStr }
    },
    addRandom: () => {
      let obj = BDH.createBuyObj()
      let arr = BDH.createNoRepeatNumberArr(2)
      obj.num = 2
      obj.money = 4
      obj.numStr = arr.join(',')
      obj.orderStr = arr.join('')
      return obj
    },
    moneyHandler: (selectArr) => {
      let len = selectArr[0].length
      if (len < 2) return
      let s = BDH.combinatorialNumber(len, 2)
      return { num: s * 2, money: s * 2 }
    }
  },
  1313: {
    name: '后三直选复式',
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
      let arr = BDH.createRandomNumArr(3)
      obj.numStr = arr.join(',')
      obj.orderStr = arr.join(',')
      return obj
    },
    moneyHandler: (selectArr) => {
      if (selectArr.length < 3) return
      let s = selectArr.reduce((accumulator, currentValue) => {
        return accumulator * currentValue.length
      }, 1)

      return { num: s, money: s }
    }
  },

  1311: {
    name: '后四组选4',
    type: 'A',
    titleArr: ['三重号', '单号'],
    dataHandler: (arr) => {
      let str = arr[0].join('')
      let str1 = arr[1].join('')
      let numStr = str + '|' + str1
      let orderStr = str + ',' + str1
      return { numStr, orderStr }
    },
    addRandom: () => {
      let obj = BDH.createBuyObj()
      let list = BDH.createNoRepeatNumberArr(2)
      let arr = list.slice(0, 1)
      let arr2 = list.slice(1)
      obj.numStr = arr.join('') + '|' + arr2.join('')
      obj.orderStr = arr.join('') + ',' + arr2.join('')
      return obj
    },
    moneyHandler: (arr) => {
      if (arr.length < 2) return
      let len1 = arr[0].length
      let len2 = arr[1].length
      if (len1 < 1 || len2 < 1) return
      let obj = BDH.zhuxuan(arr[0], arr[1], 1)
      let { num } = obj
      if (!num) return
      return obj
    }
  },
  1310: {
    name: '后四组选6',
    type: 'A',
    titleArr: ['二重号'],
    dataHandler: (selectArr) => {
      let str = selectArr.join(',')
      let numStr = str
      let orderStr = str
      return { numStr, orderStr }
    },
    addRandom: () => {
      let obj = BDH.createBuyObj()
      let arr = BDH.createNoRepeatNumberArr(2)
      obj.numStr = arr.join(',')
      obj.orderStr = arr.join(',')
      return obj
    },
    moneyHandler: (selectArr) => {
      let len = selectArr[0].length
      if (len < 2) return
      let s = BDH.combinatorialNumber(len, 2)
      return { num: s, money: s }
    }
  },
  1309: {
    name: '后四组选12',
    type: 'A',
    titleArr: ['二重号', '单号'],
    dataHandler: (arr) => {
      let str = arr[0].join('')
      let str1 = arr[1].join('')
      let numStr = str + '|' + str1
      let orderStr = str + ',' + str1
      return { numStr, orderStr }
    },
    addRandom: () => {
      let obj = BDH.createBuyObj()
      let list = BDH.createNoRepeatNumberArr(3)
      let arr = list.slice(0, 1)
      let arr2 = list.slice(1)
      obj.numStr = arr.join('') + '|' + arr2.join('')
      obj.orderStr = arr.join('') + ',' + arr2.join('')
      return obj
    },
    moneyHandler: (arr) => {
      if (arr.length < 2) return
      let len1 = arr[0].length
      let len2 = arr[1].length
      if (len1 < 1 || len2 < 2) return
      let obj = BDH.zhuxuan(arr[0], arr[1], 2)
      let { num } = obj
      if (!num) return
      return obj
    }
  },
  1308: {
    name: '后四组选24',
    type: 'A',
    titleArr: ['组选24'],
    dataHandler: (selectArr) => {
      let str = selectArr.join(',')
      let numStr = str
      let orderStr = str
      return { numStr, orderStr }
    },
    addRandom: () => {
      let obj = BDH.createBuyObj()
      let arr = BDH.createNoRepeatNumberArr(4)
      obj.numStr = arr.join(',')
      obj.orderStr = arr.join(',')
      return obj
    },
    moneyHandler: (selectArr) => {
      let len = selectArr[0].length
      if (len < 4) return
      let s = BDH.combinatorialNumber(len, 4)
      return { num: s, money: s }
    }
  },
  1307: {
    name: '后四组合',
    type: 'A',
    titleArr: ['千位', '百位', '十位', '个位'],
    dataHandler: (selectArr) => {
      let str = selectArr.join('|').replace(/\,/g, '').replace(/\|/g, ',')
      let numStr = str
      let orderStr = str
      return { numStr, orderStr }
    },

    moneyHandler: (selectArr) => {
      if (selectArr.length < 4) return
      let s = selectArr.reduce((accumulator, currentValue) => {
        return accumulator * currentValue.length
      }, 1)
      s = s * 4
      return { num: s, money: s }
    }
  },

  1304: {
    name: '组选5',
    type: 'A',
    titleArr: ['四重号', '单号'],
    dataHandler: (arr) => {
      let str = arr[0].join('')
      let str1 = arr[1].join('')
      let numStr = str + '|' + str1
      let orderStr = str + ',' + str1
      return { numStr, orderStr }
    },
    addRandom: () => {
      let obj = BDH.createBuyObj()
      let list = BDH.createNoRepeatNumberArr(2)
      let arr = list.slice(0, 1)
      let arr2 = list.slice(1)
      obj.numStr = arr.join('') + '|' + arr2.join('')
      obj.orderStr = arr.join('') + ',' + arr2.join('')
      return obj
    },
    moneyHandler: (arr) => {
      if (arr.length < 2) return
      let len1 = arr[0].length
      let len2 = arr[1].length
      if (len1 < 1 || len2 < 1) return
      let obj = BDH.zhuxuan(arr[0], arr[1], 1)
      let { num } = obj
      if (!num) return
      return obj
    }
  },
  1303: {
    name: '组选10',
    type: 'A',
    titleArr: ['三重号', '二重号'],
    dataHandler: (arr) => {
      let str = arr[0].join('')
      let str1 = arr[1].join('')
      let numStr = str + '|' + str1
      let orderStr = str + ',' + str1
      return { numStr, orderStr }
    },
    addRandom: () => {
      let obj = BDH.createBuyObj()
      let list = BDH.createNoRepeatNumberArr(2)
      let arr = list.slice(0, 1)
      let arr2 = list.slice(1)
      obj.numStr = arr.join('') + '|' + arr2.join('')
      obj.orderStr = arr.join('') + ',' + arr2.join('')
      return obj
    },
    moneyHandler: (arr) => {
      if (arr.length < 2) return
      let len1 = arr[0].length
      let len2 = arr[1].length
      if (len1 < 1 || len2 < 1) return
      let obj = BDH.zhuxuan(arr[0], arr[1], 1)
      let { num } = obj
      if (!num) return
      return obj
    }
  },
  1302: {
    name: '组选20',
    type: 'A',
    titleArr: ['三重号', '单号'],
    dataHandler: (arr) => {
      let str = arr[0].join('')
      let str1 = arr[1].join('')
      let numStr = str + '|' + str1
      let orderStr = str + ',' + str1
      return { numStr, orderStr }
    },
    addRandom: () => {
      let obj = BDH.createBuyObj()

      let list = BDH.createNoRepeatNumberArr(3)
      let arr = list.slice(0, 1)
      let arr2 = list.slice(1)
      obj.numStr = arr.join('') + '|' + arr2.join('')
      obj.orderStr = arr.join('') + ',' + arr2.join('')
      return obj
    },
    moneyHandler: (arr) => {
      if (arr.length < 2) return
      let len1 = arr[0].length
      let len2 = arr[1].length
      if (len1 < 1 || len2 < 2) return
      let obj = BDH.zhuxuan(arr[0], arr[1], 2)
      let { num } = obj
      if (!num) return
      return obj
    }
  },
  1301: {
    name: '组选30',
    type: 'A',
    titleArr: ['二重号', '单号'],
    dataHandler: (arr) => {
      let str = arr[0].join('')
      let str1 = arr[1].join('')
      let numStr = str + '|' + str1
      let orderStr = str + ',' + str1
      return { numStr, orderStr }
    },
    addRandom: () => {
      let obj = BDH.createBuyObj()
      let list = BDH.createNoRepeatNumberArr(3)
      let arr = list.slice(0, 2)
      let arr2 = list.slice(2)
      obj.numStr = arr.join('') + '|' + arr2.join('')
      obj.orderStr = arr.join('') + ',' + arr2.join('')
      return obj
    },
    moneyHandler: (arr) => {
      if (arr.length < 2) return
      let len1 = arr[0].length
      let len2 = arr[1].length
      if (len1 < 2 || len2 < 1) return
      let obj = BDH.zhuxuan(arr[1], arr[0], 2)
      let { num } = obj
      if (!num) return
      return obj
    }
  },

  1300: {
    name: '组选60',
    type: 'A',
    titleArr: ['二重号', '单号'],
    dataHandler: (arr) => {
      let str = arr[0].join('')
      let str1 = arr[1].join('')
      let numStr = str + '|' + str1
      let orderStr = str + ',' + str1
      return { numStr, orderStr }
    },
    addRandom: () => {
      let obj = BDH.createBuyObj()
      let list = BDH.createNoRepeatNumberArr(4)
      let arr = list.slice(0, 1)
      let arr2 = list.slice(1)
      obj.numStr = arr.join('') + '|' + arr2.join('')
      obj.orderStr = arr.join('') + ',' + arr2.join('')
      return obj
    },
    moneyHandler: (arr) => {
      if (arr.length < 2) return
      let len1 = arr[0].length
      let len2 = arr[1].length
      if (len1 < 1 || len2 < 3) return
      let obj = BDH.zhuxuan(arr[0], arr[1], 3)
      let { num } = obj
      if (!num) return
      return obj
    }
  },


  1306: {
    name: '后四复式',
    type: 'A',
    titleArr: ['千位', '百位', '十位', '个位'],
    dataHandler: (selectArr) => {
      let str = selectArr.join('|').replace(/\,/g, '').replace(/\|/g, ',')
      let numStr = str
      let orderStr = str
      return { numStr, orderStr }
    },
    addRandom: () => {
      let obj = BDH.createBuyObj()
      let arr = BDH.createRandomNumArr(4)
      obj.numStr = arr.join(',')
      obj.orderStr = arr.join(',')
      return obj
    },
    moneyHandler: (selectArr) => {
      if (selectArr.length < 4) return
      let s = selectArr.reduce((accumulator, currentValue) => {
        return accumulator * currentValue.length
      }, 1)

      return { num: s, money: s }
    }
  },



  1299: {
    name: '组选120',
    type: 'A',
    titleArr: ['组选120'],
    dataHandler: (selectArr) => {
      let str = selectArr.join(',')
      let numStr = str
      let orderStr = str
      return { numStr, orderStr }
    },
    addRandom: () => {
      let obj = BDH.createBuyObj()
      let arr = BDH.createNoRepeatNumberArr(5)
      obj.numStr = arr.join(',')
      obj.orderStr = arr.join(',')
      return obj
    },
    moneyHandler: (selectArr) => {
      let len = selectArr[0].length
      if (len < 5) return
      let s = BDH.combinatorialNumber(len, 5)
      return { num: s, money: s }
    }
  },
  1297: {
    name: '五星复式',
    type: 'A',
    titleArr: ['万位', '千位', '百位', '十位', '个位'],
    dataHandler: (selectArr) => {
      let str = selectArr.join('|').replace(/\,/g, '').replace(/\|/g, ',')
      let numStr = str
      let orderStr = str
      return { numStr, orderStr }
    },
    addRandom: () => {
      let obj = BDH.createBuyObj()
      let arr = BDH.createRandomNumArr(5)
      obj.numStr = arr.join(',')
      obj.orderStr = arr.join(',')
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
  1298: {
    name: '五星组合',
    type: 'A',
    titleArr: ['万位', '千位', '百位', '十位', '个位'],
    dataHandler: (selectArr) => {
      let str = selectArr.join('|').replace(/\,/g, '').replace(/\|/g, ',')
      let numStr = str
      let orderStr = str
      return { numStr, orderStr }
    },

    moneyHandler: (selectArr) => {
      if (selectArr.length < 5) return
      let s = selectArr.reduce((accumulator, currentValue) => {
        return accumulator * currentValue.length
      }, 1)

      s = s * 5

      return { num: s, money: s }
    }
  },

}

let titleArr = {
  '万': 0,
  '千': 1,
  '百': 2,
  '十': 3,
  '个': 4,
}

let Nlist = [
  {
    isSelected: false,
    num: '大'
  },
  {
    isSelected: false,
    num: '小'
  },
  {
    isSelected: false,
    num: '单'
  },
  {
    isSelected: false,
    num: '双'
  },
]

let Tlist = [
  {
    isSelected: false,
    text: "全",
  },
  {
    isSelected: false,
    text: "清",
  },
]