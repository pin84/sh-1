
import BDH from '@/views/games/assets/buyDataHandler'
export default {
  1777: {
    name: '三不同号',
    type: 'A',
    titleArr: ['标准'],
    createNumList: () => {
      let arr = []
      let i = 1
      let tem2 = []
      while (i < 7) {
        tem2.push({
          num: +i
        })
        i++
      }
      arr.push(tem2)
      return arr
    },
    dataHandler: (selectArr) => {
      let str = selectArr[0].join('|')
      let numStr = str
      let orderStr = str
      return { numStr, orderStr }
    },
    addRandom: () => {
      let obj = BDH.createBuyObj()
      let arr = BDH.createNoRepeatNumberArrIm(3, 1, 6)
      let str = String(arr[0]) +'|'+ String(arr[1])+'|'+ String(arr[2])
      obj.numStr = str
      obj.orderStr = str
      return obj
    },
    moneyHandler: (selectArr) => {
      let len = selectArr[0].length
      let s = BDH.combinatorialNumber(len, 3)
      if (!s) return
      return { num: s, money: s }
    }
  },

  1776: {
    name: '二不同号',
    type: 'A',
    titleArr: ['标准'],
    createNumList: () => {
      let arr = []
      let i = 1
      let tem2 = []
      while (i < 7) {
        tem2.push({
          num: i
        })
        i++
      }
      arr.push(tem2)
      return arr
    },
    dataHandler: (selectArr) => {
      let str = selectArr[0].join('|')
      let numStr = str
      let orderStr = str
      return { numStr, orderStr }
    },
    addRandom: () => {
      let obj = BDH.createBuyObj()
      let arr = BDH.createNoRepeatNumberArrIm(2, 1, 6)
      obj.numStr = String(arr[0]) + '|' + String(arr[1])
      obj.orderStr = String(arr[0]) + '|' + String(arr[1])
      return obj
    },
    moneyHandler: (selectArr) => {
      let len = selectArr[0].length
      let s = BDH.combinatorialNumber(len, 2)
      if (!s) return
      return { num: s, money: s }
    }
  },

  1775: {
    name: '三连号',
    type: 'A',
    titleArr: ['三连号'],
    createNumList: () => {
      return [[{ num: '三连号通选' }]]
    },
    dataHandler: (selectArr) => {
      let str = '123,234,345,456'
      let numStr = '三连号通选'
      let orderStr = str
      return { numStr, orderStr }
    },
    moneyHandler: (selectArr) => {
      let s = selectArr[0].length
      return { num: s, money: s }
    }
  },

  1767: {
    name: '和值',
    type: 'B',
    titleArr: ['两面', '和值'],
    createNumList: () => {
      let arr = []
      let i = 1
      let tem2 = []
      while (i < 7) {
        tem2.push({
          num: String(i) + i + i
        })
        i++
      }
      arr.push(tem2)
      return arr
    },
    dataHandler: (selectArr) => {
      let str = selectArr[0].join('|')
      let numStr = str
      let orderStr = str
      return { numStr, orderStr }
    },
    addRandom: () => {
      let obj = BDH.createBuyObj()
      let arr = BDH.createNoRepeatNumberArrIm(1, 1, 6)
      obj.numStr = String(arr[0]) + String(arr[0]) + String(arr[0])
      obj.orderStr = String(arr[0]) + String(arr[0]) + String(arr[0])
      return obj
    },
    moneyHandler: (selectArr) => {
      let s = selectArr[0].length
      return { num: s, money: s }
    }
  },

  1773: {
    name: '三同号复选',
    type: 'A',
    titleArr: ['三同复选'],
    createNumList: () => {
      return [[{ num: '三同号通选' }]]
    },
    dataHandler: (selectArr) => {
      let str = '111,222,333,444,555,666'
      let numStr = '三同号通选'
      let orderStr = str
      return { numStr, orderStr }
    },
    moneyHandler: (selectArr) => {
      let s = selectArr[0].length
      return { num: s, money: s }
    }
  },

  1772: {
    name: '三同单选',
    type: 'A',
    titleArr: ['三同单选'],
    createNumList: () => {
      let arr = []
      let i = 1
      let tem2 = []
      while (i < 7) {
        tem2.push({
          num: String(i) + i + i
        })
        i++
      }
      arr.push(tem2)
      return arr
    },
    dataHandler: (selectArr) => {
      let str = selectArr[0].join('|')
      let numStr = str
      let orderStr = str
      return { numStr, orderStr }
    },
    addRandom: () => {
      let obj = BDH.createBuyObj()
      let arr = BDH.createNoRepeatNumberArrIm(1, 1, 6)
      obj.numStr = String(arr[0]) + String(arr[0]) + String(arr[0])
      obj.orderStr = String(arr[0]) + String(arr[0]) + String(arr[0])
      return obj
    },
    moneyHandler: (selectArr) => {
      let s = selectArr[0].length
      return { num: s, money: s }
    }
  },

  1766: {
    name: '二同号复选',
    type: 'A',
    titleArr: ['二同复选'],
    createNumList: () => {
      let arr = []
      let i = 1
      let tem2 = []
      while (i < 7) {
        tem2.push({
          num: String(i) + i
        })
        i++
      }
      arr.push(tem2)
      return arr
    },
    dataHandler: (selectArr) => {
      let str = selectArr[0].join('|')
      let numStr = str
      let orderStr = str
      return { numStr, orderStr }
    },
    addRandom: () => {
      let obj = BDH.createBuyObj()
      let arr = BDH.createNoRepeatNumberArrIm(1, 1, 6)
      obj.numStr = String(arr[0]) + String(arr[0])
      obj.orderStr = String(arr[0]) + String(arr[0])
      return obj
    },
    moneyHandler: (selectArr) => {
      let s = selectArr[0].length
      return { num: s, money: s }
    }
  },

  1765: {
    name: '二同号单选',
    type: 'A',
    titleArr: ['同号', '不同号'],
    isRadio: 1,  //选中则index对应的会取消选中
    createNumList: () => {
      let arr = []
      let i = 1
      let tem1 = []
      let tem2 = []
      while (i < 7) {
        tem1.push({
          num: i
        })
        tem2.push({
          num: String(i) + i
        })
        i++
      }
      arr.push(tem2, tem1)
      return arr
    },
    dataHandler: (selectArr) => {
      let str = selectArr.join('|')
      let numStr = str
      let orderStr = str
      return { numStr, orderStr }
    },
    addRandom: () => {
      let obj = BDH.createBuyObj()
      let arr = BDH.createNoRepeatNumberArrIm(2, 1, 6)
      obj.numStr = String(arr[0]) + String(arr[0]) + '|' + arr[1]
      obj.orderStr = String(arr[0]) + String(arr[0]) + '|' + arr[1]
      return obj
    },
    moneyHandler: (selectArr) => {

      if (selectArr.length < 2) return
      let s = selectArr.reduce((accumulator, currentValue) => {
        return accumulator * currentValue.length
      }, 1)

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