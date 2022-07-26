
import BDH from '@/views/games/assets/buyDataHandler'
export default {

  1395: {
    name: '猜前十复式',
    type: 'A',
    titleArr: ['第一', '第二', '第三', '第四', '第五', '第六', '第七', '第八', '第九', '第十'],
    dataHandler: (selectArr) => {
      let str = selectArr.join('|')
      let numStr = str
      let orderStr = str
      return { numStr, orderStr }
    },
    addRandom: () => {
      let obj = BDH.createBuyObj()
      let arr = BDH.createNoRepeatNumberArrIm(10, 1, 10)
      let tem = []
      arr.forEach(n => {
        tem.push(n < 10 ? '0' + n : n)
      })
      obj.numStr = tem.join('|')
      obj.orderStr = tem.join('|')
      return obj
    },
    moneyHandler: (selectArr) => {
      if (selectArr.length < 10) return
      let arr = BDH.getCombination(selectArr)
      if(arr.length ==1 && arr[0].length <10) return 
      let len = arr.length
      return { num: len, money: len }
    }
  },


  1394: {
    name: '猜前九复式',
    type: 'A',
    titleArr: ['第一', '第二', '第三', '第四', '第五', '第六', '第七', '第八', '第九'],
    dataHandler: (selectArr) => {
      let str = selectArr.join('|')
      let numStr = str
      let orderStr = str
      return { numStr, orderStr }
    },
    addRandom: () => {
      let obj = BDH.createBuyObj()
      let arr = BDH.createNoRepeatNumberArrIm(9, 1, 10)
      let tem = []
      arr.forEach(n => {
        tem.push(n < 10 ? '0' + n : n)
      })
      obj.numStr = tem.join('|')
      obj.orderStr = tem.join('|')
      return obj
    },
    moneyHandler: (selectArr) => {
      if (selectArr.length < 9) return
      let arr = BDH.getCombination(selectArr)
      if(arr.length ==1 && arr[0].length <9) return 
      let len = arr.length
      return { num: len, money: len }
    }
  },

  1393: {
    name: '猜前八复式',
    type: 'A',
    titleArr: ['第一', '第二', '第三', '第四', '第五', '第六', '第七', '第八'],
    dataHandler: (selectArr) => {
      let str = selectArr.join('|')
      let numStr = str
      let orderStr = str
      return { numStr, orderStr }
    },
    addRandom: () => {
      let obj = BDH.createBuyObj()
      let arr = BDH.createNoRepeatNumberArrIm(8, 1, 10)
      let tem = []
      arr.forEach(n => {
        tem.push(n < 10 ? '0' + n : n)
      })
      obj.numStr = tem.join('|')
      obj.orderStr = tem.join('|')
      return obj
    },
    moneyHandler: (selectArr) => {
      if (selectArr.length < 8) return
      let arr = BDH.getCombination(selectArr)
      if(arr.length ==1 && arr[0].length <8) return 
      let len = arr.length
      return { num: len, money: len }
    }
  },

  1392: {
    name: '猜前七复式',
    type: 'A',
    titleArr: ['第一', '第二', '第三', '第四', '第五', '第六', '第七'],
    dataHandler: (selectArr) => {
      let str = selectArr.join('|')
      let numStr = str
      let orderStr = str
      return { numStr, orderStr }
    },
    addRandom: () => {
      let obj = BDH.createBuyObj()
      let arr = BDH.createNoRepeatNumberArrIm(7, 1, 10)
      let tem = []
      arr.forEach(n => {
        tem.push(n < 10 ? '0' + n : n)
      })
      obj.numStr = tem.join('|')
      obj.orderStr = tem.join('|')
      return obj
    },
    moneyHandler: (selectArr) => {
      if (selectArr.length < 7) return
      let arr = BDH.getCombination(selectArr)
      if(arr.length ==1 && arr[0].length <7) return 
      let len = arr.length
      return { num: len, money: len }
    }
  },

  1391: {
    name: '猜前六复式',
    type: 'A',
    titleArr: ['第一', '第二', '第三', '第四', '第五', '第六'],
    dataHandler: (selectArr) => {
      let str = selectArr.join('|')
      let numStr = str
      let orderStr = str
      return { numStr, orderStr }
    },
    addRandom: () => {
      let obj = BDH.createBuyObj()
      let arr = BDH.createNoRepeatNumberArrIm(6, 1, 10)
      let tem = []
      arr.forEach(n => {
        tem.push(n < 10 ? '0' + n : n)
      })
      obj.numStr = tem.join('|')
      obj.orderStr = tem.join('|')
      return obj
    },
    moneyHandler: (selectArr) => {
      if (selectArr.length < 6) return
      let arr = BDH.getCombination(selectArr)
      if(arr.length ==1 && arr[0].length <6) return 
      let len = arr.length
      return { num: len, money: len }
    }
  },

  
  1390: {
    name: '猜前五复式',
    type: 'A',
    titleArr: ['第一', '第二', '第三', '第四', '第五'],
    dataHandler: (selectArr) => {
      let str = selectArr.join('|')
      let numStr = str
      let orderStr = str
      return { numStr, orderStr }
    },
    addRandom: () => {
      let obj = BDH.createBuyObj()
      let arr = BDH.createNoRepeatNumberArrIm(5, 1, 10)
      let tem = []
      arr.forEach(n => {
        tem.push(n < 10 ? '0' + n : n)
      })
      obj.numStr = tem.join('|')
      obj.orderStr = tem.join('|')
      return obj
    },
    moneyHandler: (selectArr) => {
      if (selectArr.length < 5) return
      let arr = BDH.getCombination(selectArr)
      if(arr.length ==1 && arr[0].length <5) return 
      let len = arr.length
      return { num: len, money: len }
    }
  },


  2793: {
    name: '猜前九单式',
    type: 'B',
    dataHandler: (str) => {
      let obj = BDH.danshiDH_260({
        str,
        lenLimit: 9,
        deleteRepeat: true
      })
      return obj
    },
    addRandom: (n) => {
      let obj = BDH.createBuyObj()
      let arr = BDH.createNoRepeatNumberArrIm(9, 1, 10)
      let tem = []
      arr.forEach(n => {
        if (n < 10) {
          n = '0' + n
        }
        tem.push(n)
      })
      obj.numStr = tem.join(',')
      obj.orderStr = tem.join('')
      return obj
    },
    addToBasket: (handlerArr) => {
      let obj = BDH.createBuyObj()
      obj.numStr = handlerArr.join(',')
      obj.orderStr = handlerArr.join('_')
      return obj
    }
  },

  2792: {
    name: '猜前八单式',
    type: 'B',
    dataHandler: (str) => {
      let obj = BDH.danshiDH_260({
        str,
        lenLimit: 8,
        deleteRepeat: true
      })
      return obj
    },
    addRandom: (n) => {
      let obj = BDH.createBuyObj()
      let arr = BDH.createNoRepeatNumberArrIm(8, 1, 10)
      let tem = []
      arr.forEach(n => {
        if (n < 10) {
          n = '0' + n
        }
        tem.push(n)
      })
      obj.numStr = tem.join(',')
      obj.orderStr = tem.join('')
      return obj
    },
    addToBasket: (handlerArr) => {
      let obj = BDH.createBuyObj()
      obj.numStr = handlerArr.join(',')
      obj.orderStr = handlerArr.join('_')
      return obj
    }
  },

  2791: {
    name: '猜前七单式',
    type: 'B',
    dataHandler: (str) => {
      let obj = BDH.danshiDH_260({
        str,
        lenLimit: 7,
        deleteRepeat: true
      })
      return obj
    },
    addRandom: (n) => {
      let obj = BDH.createBuyObj()
      let arr = BDH.createNoRepeatNumberArrIm(7, 1, 10)
      let tem = []
      arr.forEach(n => {
        if (n < 10) {
          n = '0' + n
        }
        tem.push(n)
      })
      obj.numStr = tem.join(',')
      obj.orderStr = tem.join('')
      return obj
    },
    addToBasket: (handlerArr) => {
      let obj = BDH.createBuyObj()
      obj.numStr = handlerArr.join(',')
      obj.orderStr = handlerArr.join('_')
      return obj
    }
  },


  2790: {
    name: '猜前六单式',
    type: 'B',
    dataHandler: (str) => {
      let obj = BDH.danshiDH_260({
        str,
        lenLimit: 6,
        deleteRepeat: true
      })
      return obj
    },
    addRandom: (n) => {
      let obj = BDH.createBuyObj()
      let arr = BDH.createNoRepeatNumberArrIm(6, 1, 10)
      let tem = []
      arr.forEach(n => {
        if (n < 10) {
          n = '0' + n
        }
        tem.push(n)
      })
      obj.numStr = tem.join(',')
      obj.orderStr = tem.join('')
      return obj
    },
    addToBasket: (handlerArr) => {
      let obj = BDH.createBuyObj()
      obj.numStr = handlerArr.join(',')
      obj.orderStr = handlerArr.join('_')
      return obj
    }
  },

  2789: {
    name: '猜前五单式',
    type: 'B',
    dataHandler: (str) => {
      let obj = BDH.danshiDH_260({
        str,
        lenLimit: 5,
        deleteRepeat: true
      })
      return obj
    },
    addRandom: (n) => {
      let obj = BDH.createBuyObj()
      let arr = BDH.createNoRepeatNumberArrIm(5, 1, 10)
      let tem = []
      arr.forEach(n => {
        if (n < 10) {
          n = '0' + n
        }
        tem.push(n)
      })
      obj.numStr = tem.join(',')
      obj.orderStr = tem.join('')
      return obj
    },
    addToBasket: (handlerArr) => {
      let obj = BDH.createBuyObj()
      obj.numStr = handlerArr.join(',')
      obj.orderStr = handlerArr.join('_')
      return obj
    }
  },

  2788: {
    name: '猜前四单式',
    type: 'B',
    dataHandler: (str) => {
      let obj = BDH.danshiDH_260({
        str,
        lenLimit: 4,
        deleteRepeat: true
      })
      return obj
    },
    addRandom: (n) => {
      let obj = BDH.createBuyObj()
      let arr = BDH.createNoRepeatNumberArrIm(4, 1, 10)
      let tem = []
      arr.forEach(n => {
        if (n < 10) {
          n = '0' + n
        }
        tem.push(n)
      })
      obj.numStr = tem.join(',')
      obj.orderStr = tem.join('')
      return obj
    },
    addToBasket: (handlerArr) => {
      let obj = BDH.createBuyObj()
      obj.numStr = handlerArr.join(',')
      obj.orderStr = handlerArr.join('_')
      return obj
    }
  },

  2787: {
    name: '猜前三单式',
    type: 'B',
    dataHandler: (str) => {
      let obj = BDH.danshiDH_260({
        str,
        lenLimit: 3,
        deleteRepeat: true
      })
      return obj
    },
    addRandom: (n) => {
      let obj = BDH.createBuyObj()
      let arr = BDH.createNoRepeatNumberArrIm(3, 1, 10)
      let tem = []
      arr.forEach(n => {
        if (n < 10) {
          n = '0' + n
        }
        tem.push(n)
      })
      obj.numStr = tem.join(',')
      obj.orderStr = tem.join('')
      return obj
    },
    addToBasket: (handlerArr) => {
      let obj = BDH.createBuyObj()
      obj.numStr = handlerArr.join(',')
      obj.orderStr = handlerArr.join('_')
      return obj
    }
  },

  1389: {
    name: '猜前四复式',
    type: 'A',
    titleArr: ['第一', '第二', '第三', '第四'],
    dataHandler: (selectArr) => {
      let str = selectArr.join('|')
      let numStr = str
      let orderStr = str
      return { numStr, orderStr }
    },
    addRandom: () => {
      let obj = BDH.createBuyObj()
      let arr = BDH.createNoRepeatNumberArrIm(4, 1, 10)
      let tem = []
      arr.forEach(n => {
        tem.push(n < 10 ? '0' + n : n)
      })
      obj.numStr = tem.join('|')
      obj.orderStr = tem.join('|')
      return obj
    },
    moneyHandler: (selectArr) => {
      if (selectArr.length < 4) return
      let arr = BDH.getCombination(selectArr)
      if(arr.length ==1 && arr[0].length <4) return 
      let len = arr.length
      return { num: len, money: len }
    }
  },


  1388: {
    name: '猜前三复式',
    type: 'A',
    titleArr: ['冠军', '亚军', '季军'],
    dataHandler: (selectArr) => {
      let str = selectArr.join('|')
      let numStr = str
      let orderStr = str
      return { numStr, orderStr }
    },
    addRandom: () => {
      let obj = BDH.createBuyObj()
      let arr = BDH.createNoRepeatNumberArrIm(3, 1, 10)
      let tem = []
      arr.forEach(n => {
        tem.push(n < 10 ? '0' + n : n)
      })
      obj.numStr = tem.join('|')
      obj.orderStr = tem.join('|')
      return obj
    },
    moneyHandler: (selectArr) => {
      if (selectArr.length < 3) return
      let arr = BDH.getCombination(selectArr)
      if(arr.length ==1 && arr[0].length <3) return 
      let len = arr.length
      return { num: len, money: len }
    }
  },


  2786: {
    name: '猜前二单式',
    type: 'B',
    dataHandler: (str) => {
      let obj = BDH.danshiDH_260({
        str,
        lenLimit: 2,
        deleteRepeat: true
      })
      return obj
    },
    addRandom: (n) => {
      let obj = BDH.createBuyObj()
      let arr = BDH.createNoRepeatNumberArrIm(2, 1, 10)
      let tem = []
      arr.forEach(n => {
        if (n < 10) {
          n = '0' + n
        }
        tem.push(n)
      })
      obj.numStr = tem.join(',')
      obj.orderStr = tem.join('')
      return obj
    },
    addToBasket: (handlerArr) => {
      let obj = BDH.createBuyObj()
      obj.numStr = handlerArr.join(',')
      obj.orderStr = handlerArr.join('_')
      return obj
    }
  },

  1387: {
    name: '猜前二复式',
    type: 'A',
    titleArr: ['冠军', '亚军'],
    dataHandler: (selectArr) => {
      let str = selectArr.join('|')
      let numStr = str
      let orderStr = str
      return { numStr, orderStr }
    },
    addRandom: () => {
      let obj = BDH.createBuyObj()
      let arr = BDH.createNoRepeatNumberArrIm(2, 1, 10)
      let tem = []
      arr.forEach(n => {
        tem.push(n < 10 ? '0' + n : n)
      })
      obj.numStr = tem.join('|')
      obj.orderStr = tem.join('|')
      return obj
    },
    moneyHandler: (selectArr) => {
      if (selectArr.length < 2) return
      let arr = BDH.getCombination(selectArr)
      let len = arr.length
      return { num: len, money: len }
    }
  },

  1386: {
    name: '猜冠军',
    type: 'A',
    titleArr: ['猜冠军'],
    dataHandler: (selectArr) => {
      let str = selectArr[0].join(',')
      let numStr = str
      let orderStr = str
      return { numStr, orderStr }
    },
    addRandom: () => {
      let obj = BDH.createBuyObj()
      let n = BDH.createRandomNum(1, 10)
      n = n < 10 ? '0' + n : n
      obj.numStr = n
      obj.orderStr = n
      return obj
    },
    moneyHandler: (selectArr) => {
      let s = selectArr[0].length
      if (selectArr[0].length < 1) return
      return { num: s, money: s }
    }
  },





  2650: {
    name: '定位胆',
    type: 'D',
    titleArr: ['第一', '第二', '第三', '第四', '第五', '第六', '第七', '第八', '第九', '第十',],
    dataHandler: (selectArr) => {

      let str = selectArr.join('|').replace(/\,/g, '').replace(/\|/g, ',')
      let numStr = str
      let orderStr = str
      return { numStr, orderStr }
    },
    addRandom: (arr) => {
      let obj = BDH.createBuyObj()
      let i = BDH.createRandomNum(0, 9)
      let j = BDH.createRandomNum(0, 9)
      let { I, N } = arr[j]
      obj.I = I
      obj.gName = obj.gName + N
      let str = i < 10 ? '0' + i : i
      obj.numStr = str
      obj.orderStr = str

      

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



}
