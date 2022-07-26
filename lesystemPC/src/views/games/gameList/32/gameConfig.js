
import BDH from '@/views/games/assets/buyDataHandler'
export default {

  2255: {
    name: '定单双',
    type: 'A2',
    titleArr: ['定单双'],
    textArr:["全",  "清"],
    isSquare:true,
    dataHandler: (selectArr) => {
      let str = selectArr[0].join('|')
      let numStr = str
      let orderStr = str
      return { numStr, orderStr }
    },
    moneyHandler: (selectArr) => {
      let s = selectArr[0].length
      return { num: s, money: s }
    },
    sortList:(list)=>{
      list.sort((a, b) => b.N.slice(0,1) - a.N.slice(0,1));
      return list
    }
  },

  2256: {
    name: '猜中位',
    type: 'A1',
    titleArr: ['猜中位'],
    textArr:["全", "大", "小", "单", "双", "清"],
    dataHandler: (selectArr) => {
      let str = selectArr[0].join('|')
      let numStr = str
      let orderStr = str
      return { numStr, orderStr }
    },
    moneyHandler: (selectArr) => {
      let s = selectArr[0].length
      return { num: s, money: s }
    },
    sortList:(list)=>{
      list.sort((a, b) => a.N - b.N);
      return list
    }
  },



  2264: {
    name: '单式八中五',
    type: 'B',
    dataHandler: (str) => {
      let obj = BDH.danshiDH_260({
        str,
        lenLimit: 8,
        deleteRepeat: true
      })
      return obj
    },
    addRandom: () => {
      let obj = BDH.createBuyObj()
      let arr = BDH.createNoRepeatNumberArrIm(8, 1, 11)
      let tem = []
      arr.forEach(n => {
        if (n < 10) {
          n = '0' + n
        }
        tem.push(n)
      })
      obj.numStr = tem.join(',')
      obj.orderStr = tem.join(',')
      return obj
    },
    addToBasket: (handlerArr) => {
      let tem=[]
      let reg = /(\d{2})/
      handlerArr.forEach(arr=>{
        tem.push(arr.split(reg).filter(item=>item))
      })
      let obj = BDH.createBuyObj()
      obj.numStr = tem.join('|')
      obj.orderStr = tem.join('|')
      return obj
    }
  },

  2263: {
    name: '单式七中五',
    type: 'B',
    dataHandler: (str) => {
      let obj = BDH.danshiDH_260({
        str,
        lenLimit: 7,
        deleteRepeat: true
      })
      return obj
    },
    addRandom: () => {
      let obj = BDH.createBuyObj()
      let arr = BDH.createNoRepeatNumberArrIm(7, 1, 11)
      let tem = []
      arr.forEach(n => {
        if (n < 10) {
          n = '0' + n
        }
        tem.push(n)
      })
      obj.numStr = tem.join(',')
      obj.orderStr = tem.join(',')
      return obj
    },
    addToBasket: (handlerArr) => {
      let tem=[]
      let reg = /(\d{2})/
      handlerArr.forEach(arr=>{
        tem.push(arr.split(reg).filter(item=>item))
      })
      let obj = BDH.createBuyObj()
      obj.numStr = tem.join('|')
      obj.orderStr = tem.join('|')
      return obj
    }
  },

  2262: {
    name: '单式六中五',
    type: 'B',
    dataHandler: (str) => {
      let obj = BDH.danshiDH_260({
        str,
        lenLimit: 6,
        deleteRepeat: true
      })
      return obj
    },
    addRandom: () => {
      let obj = BDH.createBuyObj()
      let arr = BDH.createNoRepeatNumberArrIm(6, 1, 11)
      let tem = []
      arr.forEach(n => {
        if (n < 10) {
          n = '0' + n
        }
        tem.push(n)
      })
      obj.numStr = tem.join(',')
      obj.orderStr = tem.join(',')
      return obj
    },
    addToBasket: (handlerArr) => {
      let tem=[]
      let reg = /(\d{2})/
      handlerArr.forEach(arr=>{
        tem.push(arr.split(reg).filter(item=>item))
      })
      let obj = BDH.createBuyObj()
      obj.numStr = tem.join('|')
      obj.orderStr = tem.join('|')
      return obj
    }
  },

  2261: {
    name: '单式五中五',
    type: 'B',
    dataHandler: (str) => {
      let obj = BDH.danshiDH_260({
        str,
        lenLimit: 5,
        deleteRepeat: true
      })
      return obj
    },
    addRandom: () => {
      let obj = BDH.createBuyObj()
      let arr = BDH.createNoRepeatNumberArrIm(5, 1, 11)
      let tem = []
      arr.forEach(n => {
        if (n < 10) {
          n = '0' + n
        }
        tem.push(n)
      })
      obj.numStr = tem.join(',')
      obj.orderStr = tem.join(',')
      return obj
    },
    addToBasket: (handlerArr) => {
      let tem=[]
      let reg = /(\d{2})/
      handlerArr.forEach(arr=>{
        tem.push(arr.split(reg).filter(item=>item))
      })
      let obj = BDH.createBuyObj()
      obj.numStr = tem.join('|')
      obj.orderStr = tem.join('|')
      return obj
    }
  },

  2260: {
    name: '单式四中四',
    type: 'B',
    dataHandler: (str) => {
      let obj = BDH.danshiDH_260({
        str,
        lenLimit: 4,
        deleteRepeat: true
      })
      return obj
    },
    addRandom: () => {
      let obj = BDH.createBuyObj()
      let arr = BDH.createNoRepeatNumberArrIm(4, 1, 11)
      let tem = []
      arr.forEach(n => {
        if (n < 10) {
          n = '0' + n
        }
        tem.push(n)
      })
      obj.numStr = tem.join(',')
      obj.orderStr = tem.join(',')
      return obj
    },
    addToBasket: (handlerArr) => {
      let tem=[]
      let reg = /(\d{2})/
      handlerArr.forEach(arr=>{
        tem.push(arr.split(reg).filter(item=>item))
      })
      let obj = BDH.createBuyObj()
      obj.numStr = tem.join('|')
      obj.orderStr = tem.join('|')
      return obj
    }
  },

  2259: {
    name: '单式三中三',
    type: 'B',
    dataHandler: (str) => {
      let obj = BDH.danshiDH_260({
        str,
        lenLimit: 3,
        deleteRepeat: true
      })
      return obj
    },
    addRandom: () => {
      let obj = BDH.createBuyObj()
      let arr = BDH.createNoRepeatNumberArrIm(3, 1, 11)
      let tem = []
      arr.forEach(n => {
        if (n < 10) {
          n = '0' + n
        }
        tem.push(n)
      })
      obj.numStr = tem.join(',')
      obj.orderStr = tem.join(',')
      return obj
    },
    addToBasket: (handlerArr) => {
      let tem=[]
      let reg = /(\d{2})/
      handlerArr.forEach(arr=>{
        tem.push(arr.split(reg).filter(item=>item))
      })
      let obj = BDH.createBuyObj()
      obj.numStr = tem.join('|')
      obj.orderStr = tem.join('|')
      return obj
    }
  },

  2258: {
    name: '单式二中二',
    type: 'B',
    dataHandler: (str) => {
      let obj = BDH.danshiDH_260({
        str,
        lenLimit: 2,
        deleteRepeat: true
      })
      return obj
    },
    addRandom: () => {
      let obj = BDH.createBuyObj()
      let arr = BDH.createNoRepeatNumberArrIm(2, 1, 11)
      let tem = []
      arr.forEach(n => {
        if (n < 10) {
          n = '0' + n
        }
        tem.push(n)
      })
      obj.numStr = tem.join(',')
      obj.orderStr = tem.join(',')
      return obj
    },
    addToBasket: (handlerArr) => {
      let tem=[]
      let reg = /(\d{2})/
      handlerArr.forEach(arr=>{
        tem.push(arr.split(reg).filter(item=>item))
      })
      let obj = BDH.createBuyObj()
      obj.numStr = tem.join('|')
      obj.orderStr = tem.join('|')
      return obj
    }
  },

  2257: {
    name: '单式一中一',
    type: 'B',
    dataHandler: (str) => {
      let obj = BDH.danshiDH_260({
        str,
        lenLimit: 1,
        deleteRepeat: true
      })
      return obj
    },
    addRandom: () => {
      let obj = BDH.createBuyObj()
      let arr = BDH.createNoRepeatNumberArrIm(1, 1, 11)
      let tem = []
      arr.forEach(n => {
        if (n < 10) {
          n = '0' + n
        }
        tem.push(n)
      })
      obj.numStr = tem.join(',')
      obj.orderStr = tem.join(',')
      return obj
    },
    addToBasket: (handlerArr) => {
      let tem=[]
      let reg = /(\d{2})/
      handlerArr.forEach(arr=>{
        tem.push(arr.split(reg).filter(item=>item))
      })
      let obj = BDH.createBuyObj()
      obj.numStr = tem.join('|')
      obj.orderStr = tem.join('|')
      return obj
    }
  },

  2252: {
    name: '前二组选单式',
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
      let arr = BDH.createNoRepeatNumberArrIm(2, 1, 11)
      let tem = []
      arr.forEach(n => {
        if (n < 10) {
          n = '0' + n
        }
        tem.push(n)
      })
      obj.numStr = tem.join(',')
      obj.orderStr = tem.join(',')
      return obj
    },
    addToBasket: (handlerArr) => {
      let tem=[]
      let reg = /(\d{2})/
      handlerArr.forEach(arr=>{
        tem.push(arr.split(reg).filter(item=>item))
      })
      let obj = BDH.createBuyObj()
      obj.numStr = tem.join('|')
      obj.orderStr = tem.join('|')
      return obj
    }
  },

  2250: {
    name: '前二直选单式',
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
      let arr = BDH.createNoRepeatNumberArrIm(2, 1, 11)
      let tem = []
      arr.forEach(n => {
        if (n < 10) {
          n = '0' + n
        }
        tem.push(n)
      })
      obj.numStr = tem.join(',')
      obj.orderStr = tem.join(',')
      return obj
    },
    addToBasket: (handlerArr) => {
      let tem=[]
      let reg = /(\d{2})/
      handlerArr.forEach(arr=>{
        tem.push(arr.split(reg).filter(item=>item))
      })
      let obj = BDH.createBuyObj()
      obj.numStr = tem.join('|')
      obj.orderStr = tem.join('|')
      return obj
    }
  },

  2248: {
    name: '前三组选单式',
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
      let arr = BDH.createNoRepeatNumberArrIm(3, 1, 11)
      let tem = []
      arr.forEach(n => {
        if (n < 10) {
          n = '0' + n
        }
        tem.push(n)
      })
      obj.numStr = tem.join(',')
      obj.orderStr = tem.join(',')
      return obj
    },
    addToBasket: (handlerArr) => {
      let tem=[]
      let reg = /(\d{2})/
      handlerArr.forEach(arr=>{
        tem.push(arr.split(reg).filter(item=>item))
      })
      let obj = BDH.createBuyObj()
      obj.numStr = tem.join('|')
      obj.orderStr = tem.join('|')
      return obj
    }
  },

  2246: {
    name: '前三直选单式',
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
      let arr = BDH.createNoRepeatNumberArrIm(3, 1, 11)
      let tem = []
      arr.forEach(n => {
        if (n < 10) {
          n = '0' + n
        }
        tem.push(n)
      })
      obj.numStr = tem.join(',')
      obj.orderStr = tem.join(',')
      return obj
    },
    addToBasket: (handlerArr) => {
      let tem=[]
      let reg = /(\d{2})/
      handlerArr.forEach(arr=>{
        tem.push(arr.split(reg).filter(item=>item))
      })
      let obj = BDH.createBuyObj()
      obj.numStr = tem.join('|')
      obj.orderStr = tem.join('|')
      return obj
    }
  },

  

  2254: {
    name: '定位胆',
    type: 'D',
    titleArr: ['第一位', '第二位', '第三位', '第四位', '第五位'],
    addRandom: (arr) => {
      let obj = BDH.createBuyObj()
      let i = BDH.createRandomNum(1, 11)
      let j = BDH.createRandomNum(0, arr.length - 1)
      let { I, N } = arr[j]
      obj.I = I
      obj.gName = obj.gName + N
      let str = i < 10 ? '0' + i : i
      obj.numStr = str
      obj.orderStr = str
      return obj
    },
  },

  2272: {
    name: '八中五',
    type: 'A',
    titleArr: ['选八中五'],
    dataHandler: (selectArr) => {
      let str = selectArr[0].join('|')
      let numStr = str
      let orderStr = str
      return { numStr, orderStr }
    },
    addRandom: () => {
      let obj = BDH.createBuyObj()
      let arr = BDH.createNoRepeatNumberArrIm(8, 1, 11)
      let tem = []
      arr.forEach(n => {
        tem.push(n < 10 ? '0' + n : n)
      })
      obj.numStr = tem.join('|')
      obj.orderStr = tem.join('|')
      return obj
    },
    moneyHandler: (selectArr) => {
      let len = selectArr[0].length
      if (len < 8) return
      let s = BDH.combinatorialNumber(len, 8)
      return { num: s, money: s }
    }
  },

  2271: {
    name: '七中五',
    type: 'A',
    titleArr: ['选七中五'],
    dataHandler: (selectArr) => {
      let str = selectArr[0].join('|')
      let numStr = str
      let orderStr = str
      return { numStr, orderStr }
    },
    addRandom: () => {
      let obj = BDH.createBuyObj()
      let arr = BDH.createNoRepeatNumberArrIm(7, 1, 11)
      let tem = []
      arr.forEach(n => {
        tem.push(n < 10 ? '0' + n : n)
      })
      obj.numStr = tem.join('|')
      obj.orderStr = tem.join('|')
      return obj
    },
    moneyHandler: (selectArr) => {
      let len = selectArr[0].length
      if (len < 7) return
      let s = BDH.combinatorialNumber(len, 7)
      return { num: s, money: s }
    }
  },

  2270: {
    name: '六中五',
    type: 'A',
    titleArr: ['选六中五'],
    dataHandler: (selectArr) => {
      let str = selectArr[0].join('|')
      let numStr = str
      let orderStr = str
      return { numStr, orderStr }
    },
    addRandom: () => {
      let obj = BDH.createBuyObj()
      let arr = BDH.createNoRepeatNumberArrIm(6, 1, 11)
      let tem = []
      arr.forEach(n => {
        tem.push(n < 10 ? '0' + n : n)
      })
      obj.numStr = tem.join('|')
      obj.orderStr = tem.join('|')
      return obj
    },
    moneyHandler: (selectArr) => {
      let len = selectArr[0].length
      if (len < 6) return
      let s = BDH.combinatorialNumber(len, 6)
      return { num: s, money: s }
    }
  },

  2269: {
    name: '五中五',
    type: 'A',
    titleArr: ['选五中五'],
    dataHandler: (selectArr) => {
      let str = selectArr[0].join('|')
      let numStr = str
      let orderStr = str
      return { numStr, orderStr }
    },
    addRandom: () => {
      let obj = BDH.createBuyObj()
      let arr = BDH.createNoRepeatNumberArrIm(5, 1, 11)
      let tem = []
      arr.forEach(n => {
        tem.push(n < 10 ? '0' + n : n)
      })
      obj.numStr = tem.join('|')
      obj.orderStr = tem.join('|')
      return obj
    },
    moneyHandler: (selectArr) => {
      let len = selectArr[0].length
      if (len < 5) return
      let s = BDH.combinatorialNumber(len, 5)
      return { num: s, money: s }
    }
  },

  2268: {
    name: '四中四',
    type: 'A',
    titleArr: ['选四中四'],
    dataHandler: (selectArr) => {
      let str = selectArr[0].join('|')
      let numStr = str
      let orderStr = str
      return { numStr, orderStr }
    },
    addRandom: () => {
      let obj = BDH.createBuyObj()
      let arr = BDH.createNoRepeatNumberArrIm(4, 1, 11)
      let tem = []
      arr.forEach(n => {
        tem.push(n < 10 ? '0' + n : n)
      })
      obj.numStr = tem.join('|')
      obj.orderStr = tem.join('|')
      return obj
    },
    moneyHandler: (selectArr) => {
      let len = selectArr[0].length
      if (len < 4) return
      let s = BDH.combinatorialNumber(len, 4)
      return { num: s, money: s }
    }
  },

  2267: {
    name: '三中三',
    type: 'A',
    titleArr: ['选三中三'],
    dataHandler: (selectArr) => {
      let str = selectArr[0].join('|')
      let numStr = str
      let orderStr = str
      return { numStr, orderStr }
    },
    addRandom: () => {
      let obj = BDH.createBuyObj()
      let arr = BDH.createNoRepeatNumberArrIm(3, 1, 11)
      let tem = []
      arr.forEach(n => {
        tem.push(n < 10 ? '0' + n : n)
      })
      obj.numStr = tem.join('|')
      obj.orderStr = tem.join('|')
      return obj
    },
    moneyHandler: (selectArr) => {
      let len = selectArr[0].length
      if (len < 3) return
      let s = BDH.combinatorialNumber(len, 3)
      return { num: s, money: s }
    }
  },

  2266: {
    name: '二中二',
    type: 'A',
    titleArr: ['选二中二'],
    dataHandler: (selectArr) => {
      let str = selectArr[0].join('|')
      let numStr = str
      let orderStr = str
      return { numStr, orderStr }
    },
    addRandom: () => {
      let obj = BDH.createBuyObj()
      let arr = BDH.createNoRepeatNumberArrIm(2, 1, 11)
      let tem = []
      arr.forEach(n => {
        tem.push(n < 10 ? '0' + n : n)
      })
      obj.numStr = tem.join('|')
      obj.orderStr = tem.join('|')
      return obj
    },
    moneyHandler: (selectArr) => {
      let len = selectArr[0].length
      if (len < 2) return
      let s = BDH.combinatorialNumber(len, 2)
      return { num: s, money: s }
    }
  },



  2265: {
    name: '一中一',
    type: 'A',
    titleArr: ['选一中一'],
    dataHandler: (selectArr) => {
      let str = selectArr[0].join('|')
      let numStr = str
      let orderStr = str
      return { numStr, orderStr }
    },
    addRandom: () => {
      let obj = BDH.createBuyObj()
      let arr = BDH.createNoRepeatNumberArrIm(1, 1, 11)
      let tem = []
      arr.forEach(n => {
        tem.push(n < 10 ? '0' + n : n)
      })
      obj.numStr = tem.join('|')
      obj.orderStr = tem.join('|')
      return obj
    },
    moneyHandler: (selectArr) => {
      let len = selectArr[0].length
      if (len < 1) return
      let s = BDH.combinatorialNumber(len, 1)
      return { num: s, money: s }
    }
  },

  2253: {
    name: '不定胆',
    type: 'A',
    titleArr: ['前三位'],
    dataHandler: (selectArr) => {
      let str = selectArr[0].join('|')
      let numStr = str
      let orderStr = str
      return { numStr, orderStr }
    },
    addRandom: () => {
      let obj = BDH.createBuyObj()
      let arr = BDH.createNoRepeatNumberArrIm(1, 1, 11)
      let tem = []
      arr.forEach(n => {
        tem.push(n < 10 ? '0' + n : n)
      })
      obj.numStr = tem.join('|')
      obj.orderStr = tem.join('|')
      return obj
    },
    moneyHandler: (selectArr) => {
      let len = selectArr[0].length
      if (len < 1) return
      let s = BDH.combinatorialNumber(len, 1)
      return { num: s, money: s }
    }
  },

  2245: {
    name: '前三直选复式',
    type: 'A',
    titleArr: ['第一位', '第二位', '第三位'],
    dataHandler: (selectArr) => {
      let str = selectArr.join('|')
      let numStr = str
      let orderStr = str
      return { numStr, orderStr }
    },
    addRandom: () => {
      let obj = BDH.createBuyObj()
      let arr = BDH.createNoRepeatNumberArrIm(3, 1, 11)
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
      let s = arr.length
      return { num: s, money: s }
    }
  },

  2247: {
    name: '前三组选复式',
    type: 'A',
    titleArr: ['组选'],
    dataHandler: (selectArr) => {
      let str = selectArr[0].join('|')
      let numStr = str
      let orderStr = str
      return { numStr, orderStr }
    },
    addRandom: () => {
      let obj = BDH.createBuyObj()
      let arr = BDH.createNoRepeatNumberArrIm(3, 1, 11)
      let tem = []
      arr.forEach(n => {
        tem.push(n < 10 ? '0' + n : n)
      })
      obj.numStr = tem.join('|')
      obj.orderStr = tem.join('|')
      return obj
    },
    moneyHandler: (selectArr) => {
      let len = selectArr[0].length
      if (len < 3) return
      let s = BDH.combinatorialNumber(len, 3)
      return { num: s, money: s }
    }
  },

  2251: {
    name: '前二组选复式',
    type: 'A',
    titleArr: ['组选'],
    dataHandler: (selectArr) => {
      let str = selectArr[0].join('|')
      let numStr = str
      let orderStr = str
      return { numStr, orderStr }
    },
    addRandom: () => {
      let obj = BDH.createBuyObj()
      let arr = BDH.createNoRepeatNumberArrIm(2, 1, 11)
      let tem = []
      arr.forEach(n => {
        tem.push(n < 10 ? '0' + n : n)
      })
      obj.numStr = tem.join('|')
      obj.orderStr = tem.join('|')
      return obj
    },
    moneyHandler: (selectArr) => {
      let len = selectArr[0].length
      if (len < 2) return
      let s = BDH.combinatorialNumber(len, 2)
      return { num: s, money: s }
    }
  },

  2249: {
    name: '前二直选复式',
    type: 'A',
    titleArr: ['第一位', '第二位'],
    dataHandler: (selectArr) => {
      let str = selectArr.join('|')
      let numStr = str
      let orderStr = str
      return { numStr, orderStr }
    },
    addRandom: () => {
      let obj = BDH.createBuyObj()
      let arr = BDH.createNoRepeatNumberArrIm(2, 1, 11)
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
      let s = arr.length
      return { num: s, money: s }
    }
  },

  




}
