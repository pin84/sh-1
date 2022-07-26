import buyDataHandler from '@/common/js/buyDataHandler.js'
import dataHandler from '@/common/js/dataHandler.js'
// A b  c d  e  m n  
export default {
  "五星复式": {
    "playType": "A",
    "titleArr": ['万位', '千位', '百位', '十位', '个位']
  },
  "五星单式": {
    "playType": "B",
    lenLimit: 5,
    dataHandler: (str) => {
      return buyDataHandler.danshiDataHandler({
        str,
        lenLimit: 5
      })
    },
    addToBasketRandom: () => {
      return danshiRandom(5)
    }
  },
  "五星组合": {
    "playType": "M", //A 复式 ， B 单式 C 和值  D 组合
    "titleArr": ["万位", "千位", "百位", '十位', '个位'],
    dataHandler: () => {
      return buyDataHandler.zhuheHandler()
    }
  },


  "组选120": {
    "playType": "D",
    "titleArr": ["组选120"],
    lenLimit: 5,
    dataHandler: ({
      selectedObj,
      len
    }) => {
      let {
        obj,
        s,
        money
      } = buyDataHandler.fn2({
        selectedObj,
        len,
        lenLimit: 5
      })

      obj.orderStr = obj.orderStr.split('').join(',')


      return {
        obj,
        s,
        money
      }
    },
    addToBasketRandom: () => {
      let obj = buyDataHandler.createBuyObj()
      let str = buyDataHandler.createNoReaptRandomNum(5)
      obj.numStr = str.split('').join('|')
      obj.orderStr = str.split('').join(',')
      return obj
    }
  },

  "组选60": {
    "playType": "N",
    "titleArr": ["二重号", '单号'],
    limit1: 1,
    limit2: 3,
    dataHandler: ({
      arr1,
      arr2,
      positionLen
    }) => {
      return buyDataHandler.zhuxuan(arr1, arr2, 1, 3)
    },
    addToBasketRandom: () => {
      return buyDataHandler.addToBasketHandler(3)
    }
  },
  "组选30": {
    "playType": "N",
    "titleArr": ["二重号", '单号'],
    limit1: 2,
    limit2: 1,
    dataHandler: ({
      arr1,
      arr2,
      positionLen
    }) => {
      return buyDataHandler.zhuxuan(arr2, arr1, 1, 2)
    },
    addToBasketRandom: () => {
      let obj = buyDataHandler.addToBasketHandler(2)
      obj.numStr = obj.numStr.split('|')
      obj.numStr = obj.numStr.reverse().join('|')
      obj.orderStr = obj.orderStr.split('|').reverse().join(',')
      return obj
    }
  },
  "组选20": {
    "playType": "N",
    "titleArr": ["三重号", '单号'],
    limit1: 1,
    limit2: 2,
    dataHandler: ({
      arr1,
      arr2,
      positionLen
    }) => {
      return buyDataHandler.zhuxuan(arr1, arr2, 1, 2)
    },
    addToBasketRandom: () => {
      return buyDataHandler.addToBasketHandler(2)
    }
  },
  "组选10": {
    "playType": "N",
    "titleArr": ["三重号", '二重号'],
    limit1: 1,
    limit2: 1,
    dataHandler: ({
      arr1,
      arr2,
      positionLen
    }) => {
      return buyDataHandler.zhuxuan(arr1, arr2, 1, 1)
    },
    addToBasketRandom: () => {
      return buyDataHandler.addToBasketHandler(1)
    }
  },
  "组选5": {
    "playType": "N",
    "titleArr": ["四重号", '单号'],
    limit1: 1,
    limit2: 1,
    dataHandler: ({
      arr1,
      arr2,
      positionLen
    }) => {
      return buyDataHandler.zhuxuan(arr1, arr2, 1, 1)
    },
    addToBasketRandom: () => {
      return buyDataHandler.addToBasketHandler(1)
    }
  },


  "后四单式": {
    "playType": "B",
    lenLimit: 4,
    dataHandler: (str) => {
      return buyDataHandler.danshiDataHandler({
        str,
        lenLimit: 4
      })
    },
    addToBasketRandom: () => {
      return danshiRandom(4)
    }
  },

  "后四复式": {
    "playType": "A",
    "titleArr": ['千位', '百位', '十位', '个位']
  },

  "后四组合": {
    "playType": "M", //A 复式 ， B 单式 C 和值  D 组合
    "titleArr": ["千位", "百位", '十位', '个位'],
    dataHandler: () => {
      return buyDataHandler.zhuheHandler()
    }
  },
  "后四组选24": {
    "playType": "D",
    "titleArr": ["组选24"],
    lenLimit: 4,
    dataHandler: ({
      selectedObj,
      len
    }) => {
      let {
        obj,
        s,
        money
      } = buyDataHandler.fn2({
        selectedObj,
        len,
        lenLimit: 4
      })

      obj.orderStr = obj.orderStr.split('').join(',')
      return {
        obj,
        s,
        money
      }
    },
    addToBasketRandom: () => {
      let obj = buyDataHandler.createBuyObj();
      let {
        rate,
        ratio
      } = obj;
      let str = buyDataHandler.createNoReaptRandomNum(4);
      obj.len = 1;
      obj.money = buyDataHandler.handlerMoneyDecimal(2 * rate * ratio);
      obj.numStr = str.split('').join('|');
      obj.orderStr = str.split('').join(',');

      return obj
    }
  },


  "后四组选12": {
    "playType": "N",
    "titleArr": ["二重号", '单号'],
    limit1: 1,
    limit2: 2,
    dataHandler: ({
      arr1,
      arr2,
      positionLen
    }) => {
      return buyDataHandler.zhuxuan(arr1, arr2, 1, 2)
    },
    addToBasketRandom: () => {
      return buyDataHandler.addToBasketHandler(2)
    }
  },
  "后四组选6": {
    "playType": "D",
    "titleArr": ["二重号"],
    lenLimit: 2,
    dataHandler: ({
      selectedObj,
      len
    }) => {
      let {
        obj,
        s,
        money
      } = buyDataHandler.fn2({
        selectedObj,
        len,
        lenLimit: 2
      })

      obj.orderStr = obj.orderStr.split('').join(',')
      return {
        obj,
        s,
        money
      }
    },
    addToBasketRandom: () => {
      let obj = buyDataHandler.createBuyObj();
      let {
        rate,
        ratio
      } = obj;
      let str = buyDataHandler.createNoReaptRandomNum(2);
      obj.len = 1;
      obj.money = buyDataHandler.handlerMoneyDecimal(2 * rate * ratio);
      obj.numStr = str.split('').join('|');
      obj.orderStr = str.split('').join(',');

      return obj
    }
  },
  "后四组选4": {
    "playType": "N",
    "titleArr": ["三重号", '单号'],
    limit1: 1,
    limit2: 1,
    dataHandler: ({
      arr1,
      arr2,
      positionLen
    }) => {
      return buyDataHandler.zhuxuan(arr1, arr2, 1, 1)
    },
    addToBasketRandom: () => {
      return buyDataHandler.addToBasketHandler(1)
    }
  },

  "后三直选复式": {
    "playType": "A",
    "titleArr": ['百位', '十位', '个位']
  },
  "后三直选单式": {
    "playType": "B",
    lenLimit: 3,
    dataHandler: (str) => {
      return buyDataHandler.danshiDataHandler({
        str,
        lenLimit: 3
      })
    },
    addToBasketRandom: () => {
      return danshiRandom(3)
    }
  },

  "后三直选和值": {
    "playType": "C",
    "titleArr": ["直选和值"],
    len: 28,
    dataHandler: (sum) => {
      let res = buyDataHandler.threeSum(sum)
      return res.length
    }
  },

  "后三组三": {
    "playType": "D",
    "titleArr": ["组三"],
    lenLimit: 2,
    dataHandler: ({
      selectedObj,
      len
    }) => {
      return buyDataHandler.fn1({
        selectedObj,
        len,
        lenLimit: 2
      })
    },
    addToBasketRandom: () => {
      let obj = buyDataHandler.createBuyObj();
      let {
        rate,
        ratio
      } = obj;
      let str = buyDataHandler.createNoReaptRandomNum(2);
      obj.len = 2;
      obj.money = buyDataHandler.handlerMoneyDecimal(4 * rate * ratio);
      obj.numStr = str.split('').join('|');
      obj.orderStr = str.split('').join('');

      return obj
    }
  },
  "后三组六": {
    "playType": "D",
    "titleArr": ["组六"],
    lenLimit: 3,
    randomLen: 3,
    dataHandler: ({
      selectedObj,
      len
    }) => {
      return buyDataHandler.fn2({
        selectedObj,
        len,
        lenLimit: 3
      })
    },
    addToBasketRandom: () => {
      let obj = buyDataHandler.createBuyObj();
      let {
        rate,
        ratio
      } = obj;
      let str = buyDataHandler.createNoReaptRandomNum(3);
      obj.len = 1;
      obj.money = buyDataHandler.handlerMoneyDecimal(2 * rate * ratio);
      obj.numStr = str.split('').join('|');
      obj.orderStr = str.split('').join('');

      return obj
    }
  },

  "后三混合组选": {
    "playType": "B",
    lenLimit: 3,
    dataHandler: (str) => {
      return buyDataHandler.danshiDH_4({
        str,
        lenLimit: 3,
        deleteRepeat: true
      })
    },
    createBuyObject: (str) => {
      return danshiCreateBuyObj(str)
    },
    addToBasketRandom: () => {
      let obj = danshiRandom(3)
      obj.numStr = obj.numStr.replace(/\|/g, ',')
      obj.orderStr = obj.orderStr.replace(/\,/g, '')

      return obj
    }
  },
  "后三组选和值": {
    "playType": "C",
    "titleArr": ["组选和值"],
    start: 1,
    len: 27,
    dataHandler: (sum) => {
      // console.log(sum);
      let res = buyDataHandler.threeSumSort(sum)
      return res.length
    }
  },

  "前三直选复式": {
    "playType": "A",
    "titleArr": ['万位', '千位', '百位']
  },

  "前三直选单式": {
    "playType": "B",
    lenLimit: 3,
    dataHandler: (str) => {
      return buyDataHandler.danshiDataHandler({
        str,
        lenLimit: 3
      })
    },
    addToBasketRandom: () => {
      let obj = danshiRandom(3)
      obj.numStr = obj.numStr.replace(/\|/g, ',')

      return obj
    }
  },
  "前三直选和值": {
    "playType": "C",
    "titleArr": ["直选和值"],
    len: 28,
    dataHandler: (sum) => {
      let res = buyDataHandler.threeSum(sum)
      return res.length
    }
  },

  "前三组三": {
    "playType": "D",
    "titleArr": ["组三"],
    lenLimit: 2,
    dataHandler: ({
      selectedObj,
      len
    }) => {
      return buyDataHandler.fn1({
        selectedObj,
        len,
        lenLimit: 2
      })
    },
    addToBasketRandom: () => {
      let obj = buyDataHandler.createBuyObj();
      let {
        rate,
        ratio
      } = obj;
      let str = buyDataHandler.createNoReaptRandomNum(2);
      obj.len = 2;
      obj.money = buyDataHandler.handlerMoneyDecimal(4 * rate * ratio);
      obj.numStr = str.split('').join('|');
      obj.orderStr = str.split('').join('');

      return obj
    }
  },

  "前三组六": {
    "playType": "D",
    "titleArr": ["组六"],
    lenLimit: 3,
    dataHandler: ({
      selectedObj,
      len
    }) => {
      return buyDataHandler.fn2({
        selectedObj,
        len,
        lenLimit: 3
      })
    },
    addToBasketRandom: () => {
      let obj = buyDataHandler.createBuyObj();
      let {
        rate,
        ratio
      } = obj;
      let str = buyDataHandler.createNoReaptRandomNum(3);
      obj.len = 1;
      obj.money = buyDataHandler.handlerMoneyDecimal(2 * rate * ratio);
      obj.numStr = str.split('').join('|');
      obj.orderStr = str.split('').join('');

      return obj
    }
  },

  "前三混合组选": {
    "playType": "B",
    lenLimit: 3,
    dataHandler: (str) => {
      return buyDataHandler.danshiDH_4({
        str,
        lenLimit: 3,
        deleteRepeat: true
      })
    },
    createBuyObject: (str) => {
      return danshiCreateBuyObj(str)
    },
    addToBasketRandom: () => {
      let obj = danshiRandom(3)
      obj.numStr = obj.numStr.replace(/\|/g, ',')
      obj.orderStr = obj.orderStr.replace(/\,/g, '')
      return obj
    }
  },


  "前三组选和值": {
    "playType": "C",
    "titleArr": ["组选和值"],
    start: 1,
    len: 27,
    dataHandler: (sum) => {
      let res = buyDataHandler.threeSumSort(sum)
      return res.length
    }
  },




  中三直选复式: {
    "playType": "A", //A 复式 ， B 单式 C 和值  D 组合
    "titleArr": ["千位", "百位", '十位']
  },
  "中三直选单式": {
    "playType": "B",
    lenLimit: 3,
    dataHandler: (str) => {
      return buyDataHandler.danshiDataHandler({
        str,
        lenLimit: 3
      })
    },
    createBuyObject: (str) => {
      let obj = danshiCreateBuyObj(str)
      obj.orderStr = obj.numStr
      return obj
    },
    addToBasketRandom: () => {
      let obj = danshiRandom(3)
      obj.numStr = obj.numStr.replace(/\|/g, ',')
      // obj.orderStr = obj.orderStr.replace(/\,/g, '')
      return obj
    }
  },

  "中三直选和值": {
    "playType": "C",
    "titleArr": ["直选和值"],
    start: 0,
    len: 28,
    dataHandler: (sum) => {
      let res = buyDataHandler.threeSum(sum)
      return res.length
    }

  },
  "中三组三": {
    "playType": "D",
    "titleArr": ["组三"],
    lenLimit: 2,
    dataHandler: ({
      selectedObj,
      len
    }) => {
      let {
        obj,
        s,
        money
      } = buyDataHandler.fn1({
        selectedObj,
        len,
        lenLimit: 2
      })
      obj.orderStr = obj.orderStr.replace(/\,/g, '')
      return {
        obj,
        s,
        money
      }
    },

    addToBasketRandom: () => {
      let obj = buyDataHandler.createBuyObj()
      let {
        rate,
        ratio
      } = obj
      let str = buyDataHandler.createNoReaptRandomNum(2)
      obj.len = 2
      obj.money = buyDataHandler.handlerMoneyDecimal(4 * rate * ratio)
      obj.numStr = str.split('').join('|')
      obj.orderStr = str.split('').join('')
      return obj
    }
  },

  "中三组六": {
    "playType": "D",
    "titleArr": ["组六"],
    lenLimit: 3,
    dataHandler: ({
      selectedObj,
      len
    }) => {
      let {
        money,
        s,
        obj
      } = buyDataHandler.fn2({
        selectedObj,
        len,
        lenLimit: 3
      })
      obj.orderStr = obj.orderStr.replace(/\,/g, '')
      return {
        money,
        s,
        obj
      }
    },
    addToBasketRandom: () => {
      let obj = buyDataHandler.createBuyObj()
      let str = buyDataHandler.createNoReaptRandomNum(3)
      obj.numStr = str.split('').join('|')
      obj.orderStr = str.split('').join('')
      return obj
    }
  },
  "中三混合组选": {
    "playType": "B",
    lenLimit: 3,
    dataHandler: (str) => {
      return buyDataHandler.danshiDH_4({
        str,
        lenLimit: 3,
        deleteRepeat: true
      })
    },
    addToBasketRandom: () => {
      let obj = buyDataHandler.createBuyObj()
      let str = buyDataHandler.createNoReaptRandomNum(3)
      obj.numStr = str.split('').join('|')
      obj.orderStr = str
      return obj
    },
    createBuyObject: (str) => {
      return danshiCreateBuyObj(str)
    },

  },
  "中三组选和值": {
    "playType": "C",
    "titleArr": ["组选和值"],
    start: 1,
    len: 27,
    dataHandler: (sum) => {
      let res = buyDataHandler.threeSumSort(sum)
      return res.length
    }

  },
  "后二直选(复式)": {
    "playType": "A",
    "titleArr": ['十位', '个位']
  },
  "后二直选(单式)": {
    "playType": "B",
    lenLimit: 2,
    dataHandler: (str) => {
      return buyDataHandler.danshiDataHandler({
        str,
        lenLimit: 2
      })
    }
  },
  "前二直选(复式)": {
    "playType": "A",
    "titleArr": ['万位', '千位']
  },
  "前二直选(单式)": {
    "playType": "B",
    lenLimit: 2,
    dataHandler: (str) => {
      return buyDataHandler.danshiDataHandler({
        str,
        lenLimit: 2
      })
    }
  },
  "后二直选和值": {
    "playType": "C",
    start: 0,
    len: 19,
    "titleArr": ['和值'],
    dataHandler: (sum) => {
      let res = buyDataHandler.twoSum(sum)
      return res.length
    }
  },
  "前二直选和值": {
    "playType": "C",
    len: 19,
    "titleArr": ['和值'],
    dataHandler: (sum) => {
      let res = buyDataHandler.twoSum(sum)
      return res.length
    }
  },
  "后二组选(复式)": {
    "playType": "D",
    "titleArr": ['组选'],
    lenLimit: 2,
    dataHandler: ({
      selectedObj,
      len
    }) => {
      return buyDataHandler.fn2({
        selectedObj,
        len,
        lenLimit: 2
      })
    },
    addToBasketRandom: () => {
      let obj = buyDataHandler.createBuyObj();
      let {
        rate,
        ratio
      } = obj;
      let str = buyDataHandler.createNoReaptRandomNum(2);
      obj.len = 1;
      obj.money = buyDataHandler.handlerMoneyDecimal(2 * rate * ratio);
      obj.numStr = str.split('').join('|');
      obj.orderStr = str.split('').join('');

      return obj
    }
  },

  "后二组选(单式)": {
    "playType": "B",
    lenLimit: 2,
    dataHandler: (str) => {
      return buyDataHandler.danshiDH_4({
        str,
        lenLimit: 2,
        deleteRepeat: true
      })
    }
  },
  "前二组选(复式)": {
    "playType": "D",
    "titleArr": ['组选'],
    lenLimit: 2,
    dataHandler: ({
      selectedObj,
      len
    }) => {
      return buyDataHandler.fn2({
        selectedObj,
        len,
        lenLimit: 2
      })
    },
    addToBasketRandom: () => {
      let obj = buyDataHandler.createBuyObj();
      let {
        rate,
        ratio
      } = obj;
      let str = buyDataHandler.createNoReaptRandomNum(2);
      obj.len = 1;
      obj.money = buyDataHandler.handlerMoneyDecimal(2 * rate * ratio);
      obj.numStr = str.split('').join('|');
      obj.orderStr = str.split('').join('');

      return obj
    }
  },
  "前二组选(单式)": {
    "playType": "B",
    lenLimit: 2,
    dataHandler: (str) => {
      return buyDataHandler.danshiDH_4({
        str,
        lenLimit: 2,
        deleteRepeat: true
      })
    }
  },

  "后二组选和值": {
    "playType": "C",
    start: 1,
    len: 18,
    "titleArr": ['和值'],
    dataHandler: (sum) => {
      let res = buyDataHandler.twoSumSort(sum)
      return res.length
    }
  },
  "前二组选和值": {
    "playType": "C",
    start: 1,
    len: 18,
    "titleArr": ['和值'],
    dataHandler: (sum) => {
      let res = buyDataHandler.twoSumSort(sum)
      return res.length
    }
  },

  "定位胆": {
    "playType": "A1",
    "titleArr": ['万位', '千位', '百位', '十位', '个位'],

  },

  "后三一码不定胆": {
    "playType": "D",
    "titleArr": ['不定胆'],
    lenLimit: 1,
    dataHandler: ({
      selectedObj,
      len
    }) => {
      return buyDataHandler.fn2({
        selectedObj,
        len,
        lenLimit: 1
      })
    },
    addToBasketRandom: () => {
      let obj = buyDataHandler.createBuyObj();
      let {
        rate,
        ratio
      } = obj;
      let str = buyDataHandler.createNoReaptRandomNum(1);
      obj.len = 1;
      obj.money = buyDataHandler.handlerMoneyDecimal(2 * rate * ratio);
      obj.numStr = str.split('').join('|');
      obj.orderStr = str.split('').join('');

      return obj
    }
  },
  "后三二码不定胆": {
    "playType": "D",
    "titleArr": ['不定胆'],
    lenLimit: 2,
    dataHandler: ({
      selectedObj,
      len
    }) => {
      let {
        s,
        obj,
        money
      } = buyDataHandler.fn2({
        selectedObj,
        len,
        lenLimit: 2
      })
      obj.orderStr = obj.orderStr.split('').join(',')
      return {
        s,
        obj,
        money
      }
    },
    addToBasketRandom: () => {
      let obj = buyDataHandler.createBuyObj();
      let {
        rate,
        ratio
      } = obj;
      let str = buyDataHandler.createNoReaptRandomNum(2);
      obj.len = 1;
      obj.money = buyDataHandler.handlerMoneyDecimal(2 * rate * ratio);
      obj.numStr = str.split('').join('|');
      obj.orderStr = str.split('').join(',');

      return obj
    }
  },
  "前三一码不定胆": {
    "playType": "D",
    "titleArr": ['不定胆'],
    lenLimit: 1,
    dataHandler: ({
      selectedObj,
      len
    }) => {
      return buyDataHandler.fn2({
        selectedObj,
        len,
        lenLimit: 1
      })
    },
    addToBasketRandom: () => {
      let obj = buyDataHandler.createBuyObj();
      let {
        rate,
        ratio
      } = obj;
      let str = buyDataHandler.createNoReaptRandomNum(1);
      obj.len = 1;
      obj.money = buyDataHandler.handlerMoneyDecimal(2 * rate * ratio);
      obj.numStr = str.split('').join('|');
      obj.orderStr = str.split('').join(',');

      return obj
    }
  },
  "前三二码不定胆": {
    "playType": "D",
    "titleArr": ['不定胆'],
    lenLimit: 2,
    dataHandler: ({
      selectedObj,
      len
    }) => {

      let {
        s,
        money,
        obj
      } = buyDataHandler.fn2({
        selectedObj,
        len,
        lenLimit: 2
      })

      obj.orderStr = obj.orderStr.split('').join(',')

      return {
        s,
        money,
        obj
      }
    },
    addToBasketRandom: () => {
      let obj = buyDataHandler.createBuyObj();
      let {
        rate,
        ratio
      } = obj;
      let str = buyDataHandler.createNoReaptRandomNum(2);
      obj.len = 1;
      obj.money = buyDataHandler.handlerMoneyDecimal(2 * rate * ratio);
      obj.numStr = str.split('').join('|');
      obj.orderStr = str.split('').join(',');
      return obj
    }
  },

  "后二大小单双": {
    "playType": "E",
    "titleArr": ['十位', '个位'],
    lenLimit: 2,
    numArr: [{
      num: '大'
    }, {
      num: '小'
    }, {
      num: '单'
    }, {
      num: '双'
    }],
    dataHandler: (arr) => {
      let {
        len,
        money,
        obj
      } = buyDataHandler.fushiHandler(arr)
      obj.orderStr = obj.orderStr.replace(/\,/g, '').replace(/\|/, ',')
      return {
        len,
        money,
        obj
      }
    },

    addToBasketRandom: () => {
      let obj = buyDataHandler.createBuyObj()
      let arr = ['大', '小', '单', '双']
      let str = ''
      let i = 2
      while (i--) {
        str += arr[buyDataHandler.createRandomNum(0, 3)]
      }
      obj.numStr = str.split('').join('|')
      obj.orderStr = str.split('').join(',')
      return obj
    }
  },
  "前二大小单双": {
    "playType": "E",
    "titleArr": ['万位', '千位'],
    lenLimit: 2,
    numArr: [{
      num: '大'
    }, {
      num: '小'
    }, {
      num: '单'
    }, {
      num: '双'
    }],
    dataHandler: (arr) => {
      let {
        len,
        money,
        obj
      } = buyDataHandler.fushiHandler(arr)
      obj.orderStr = obj.orderStr.replace(/\,/g, '').replace(/\|/, ',')
      return {
        len,
        money,
        obj
      }

    },
    addToBasketRandom: () => {
      let obj = buyDataHandler.createBuyObj()
      let arr = ['大', '小', '单', '双']
      let str = ''
      let i = 2
      while (i--) {
        str += arr[buyDataHandler.createRandomNum(0, 3)]
      }
      obj.numStr = str.split('').join('|')
      obj.orderStr = str.split('').join(',')
      return obj
    }
  },
  "一帆风顺": {
    "playType": "D",
    "titleArr": ['一帆风顺'],
    lenLimit: 1,
    dataHandler: ({
      selectedObj,
      len
    }) => {

      let {
        obj,
        s,
        money
      } = buyDataHandler.fn2({
        selectedObj,
        len,
        lenLimit: 1
      })

      obj.orderStr = obj.orderStr.split('').join(',')

      return {
        obj,
        s,
        money
      }
    }
  },
  "好事成双": {
    "playType": "D",
    "titleArr": ['好事成双'],
    lenLimit: 1,
    dataHandler: ({
      selectedObj,
      len
    }) => {
      let {
        obj,
        s,
        money
      } = buyDataHandler.fn2({
        selectedObj,
        len,
        lenLimit: 1
      })

      obj.orderStr = obj.orderStr.split('').join(',')

      return {
        obj,
        s,
        money
      }
    }
  },
  "三星报喜": {
    "playType": "D",
    "titleArr": ['三星报喜'],
    lenLimit: 1,
    dataHandler: ({
      selectedObj,
      len
    }) => {
      let {
        obj,
        s,
        money
      } = buyDataHandler.fn2({
        selectedObj,
        len,
        lenLimit: 1
      })

      obj.orderStr = obj.orderStr.split('').join(',')

      return {
        obj,
        s,
        money
      }
    },

  },
  "四季发财": {
    "playType": "D",
    "titleArr": ['四季发财'],
    lenLimit: 1,
    dataHandler: ({
      selectedObj,
      len
    }) => {
      let {
        obj,
        s,
        money
      } = buyDataHandler.fn2({
        selectedObj,
        len,
        lenLimit: 1
      })

      obj.orderStr = obj.orderStr.split('').join(',')

      return {
        obj,
        s,
        money
      }
    }
  },
  "任二直选复式": {
    "playType": "E1",
    "titleArr": ['万位', '千位', '百位', '十位', '个位'],
    numArr: [{
      num: '0'
    }, {
      num: '1'
    }, {
      num: '2'
    }, {
      num: '3'
    }, {
      num: '4'
    }, {
      num: '5'
    }, {
      num: '6'
    }, {
      num: '7'
    }, {
      num: '8'
    }, {
      num: '9'
    }],
    selectTypeArr: [{
      type: '全'
    }, {
      type: '大'
    }, {
      type: '小'
    }, {
      type: '单'
    }, {
      type: '双'
    }, {
      type: '清'
    }],
    lenLimit: 2,
    dataHandler: (obj) => {
      return r2(obj)
    },

    addToBasketRandom: (arr) => {
      return r2R(arr)
    }
  },



  "任二直选单式": {
    "playType": "F",
    lenLimit: 2,
    positionLimit: 2,
    dataHandler: (str) => {
      return buyDataHandler.danshiDataHandler({
        str,
        lenLimit: 2,
      })
    },
    titleHandler: (titleArr) => {
      let len = titleArr.length
      let temArr = []
      for (let i = 0; i < len; i++) {
        for (let j = +i + 1; j < len; j++) {
          temArr.push(titleArr[i] + titleArr[j] + '直选单式')
        }
      }
      return temArr
    },
    addToBasketHandler: (I, N, handlerArr) => {
      let obj = buyDataHandler.createBuyObj()
      let temArr = []
      handlerArr.split(',').forEach(str => {
        temArr.push(str.split('').join(','))
      })
      handlerArr = temArr.join('|')
      obj.I = I
      obj.gName = N
      obj.numStr = handlerArr
      obj.orderStr = handlerArr
      let len = handlerArr.split('|').length;

      obj.len = len
      obj.money = buyDataHandler.handlerMoneyDecimal(len * 2 * obj.ratio * obj.rate);
      return obj
    },
    addToBasketRandom: (ramdomArr) => {
      let obj = buyDataHandler.createBuyObj()
      let {
        I,
        N
      } = ramdomArr[buyDataHandler.createRandomNum(0, ramdomArr.length - 1)]
      obj.I = I
      obj.gName = N
      let i = 2
      let str = ''
      while (i--) {
        str += buyDataHandler.createRandomNum(0, 9)
      }
      str = str.split('').join(',')
      obj.numStr = str
      obj.orderStr = str
      return obj
    }
  },


  "任二直选和值": {
    "playType": "P",
    "titleArr": ["直选和值"],
    len: 19,
    positionNum: 10,
    dataHandler: (sum) => {
      let res = buyDataHandler.twoSum(sum)
      return res.length
    },
    countLen: (arr) => {
      return buyDataHandler.combinatorialNumber(arr.length, 2);
    },
    zhuhe: (arr) => {
      return dataHandler.zhuhe(arr)
    }

  },
  "任二组选复式": {
    "playType": "G",
    "titleArr": ['组选'],
    lenLimit: 2,
    positionLimit: 2,
    dataHandler: ({
      selectedObj,
      len,
      positionLen
    }) => {
      return buyDataHandler.combinNum({
        selectedObj,
        len,
        lenLimit: 2,
        positionLen
      })
    },
    titleHandler: (titleArr) => {


      let len = titleArr.length
      let temArr = []
      for (let i = 0; i < len; i++) {
        for (let j = +i + 1; j < len; j++) {
          temArr.push(titleArr[i] + titleArr[j] + '组选复式')
        }
      }
      return temArr
    },
    addToBasketRandom: (ramdomArr) => {
      let obj = r2Danshi(ramdomArr)
      let str = buyDataHandler.createNoReaptRandomNum(2)
      obj.numStr = str.split('').join('|')
      obj.orderStr = str
      return obj
    }
  },
  "任二组选单式": {
    "playType": "F",
    lenLimit: 2,
    positionLimit: 2,
    dataHandler: (str) => {
      return buyDataHandler.danshiDataHandler({
        str,
        lenLimit: 2,
        type: 2
      })
    },

    titleHandler: (titleArr) => {
      let len = titleArr.length
      let temArr = []
      for (let i = 0; i < len; i++) {
        for (let j = +i + 1; j < len; j++) {
          temArr.push(titleArr[i] + titleArr[j] + '组选单式')
        }
      }
      return temArr
    },
    addToBasketHandler: (I, N, handlerArr) => {
      let obj = buyDataHandler.createBuyObj()
      let temArr = []
      handlerArr.split(',').forEach(str => {
        temArr.push(str.split('').join(','))
      })
      handlerArr = temArr.join('|')
      obj.I = I
      obj.gName = N
      obj.numStr = handlerArr
      obj.orderStr = handlerArr
      let len = handlerArr.split('|').length;

      obj.len = len
      obj.money = buyDataHandler.handlerMoneyDecimal(len * 2 * obj.ratio * obj.rate);
      return obj
    },
    addToBasketRandom: (ramdomArr) => {
      let obj = buyDataHandler.createBuyObj()
      let {
        I,
        N
      } = ramdomArr[buyDataHandler.createRandomNum(0, ramdomArr.length - 1)]
      obj.I = I
      obj.gName = N
      let i = 2
      let str = buyDataHandler.createNoReaptRandomNum(2)
      str = str.split('').join(',')
      obj.numStr = str
      obj.orderStr = str
      return obj
    }

  },
  "任二组选和值": {
    "playType": "P",
    "titleArr": ["组选"],
    start: 1,
    len: 18,
    positionNum: 10,
    dataHandler: (sum) => {
      let res = buyDataHandler.twoSumSort(sum)
      return res.length
    },

    countLen: (arr) => {
      return buyDataHandler.combinatorialNumber(arr.length, 2);
    },
    zhuhe: (arr) => {
      return dataHandler.zhuhe(arr)
    }
  },
  "任三直选单式": {
    "playType": "F1",
    lenLimit: 3,
    positionLimit: 3,
    dataHandler: (str) => {
      return buyDataHandler.danshiDataHandler({
        str,
        lenLimit: 3
      })
    },
    titleHandler: (titleArr) => {
      let len = titleArr.length
      let temArr = []
      for (let i = 0; i < len; i++) {
        for (let j = +i + 1; j < len; j++) {
          for (let n = +j + 1; n < len; n++) {
            temArr.push(titleArr[i] + titleArr[j] + titleArr[n] + '直选单式')
          }
        }
      }
      return temArr
    },
    addToBasketHandler: (I, N, handlerArr) => {
      let obj = buyDataHandler.createBuyObj()
      let arr1 = [
        ['万', 0],
        ['千', 1],
        ['百', 2],
        ['十', 3],
        ['个', 4],
      ]
      let map = new Map(arr1)
      let temArr = handlerArr.split(',')
      let strArr = []
      temArr.forEach((str, idx) => {
        let i = 0
        let arr = ['-', '-', '-', '-', '-']
        let strA = str.split('')
        map.forEach((value, key, map) => {
          if (N.includes(key)) {
            arr[value] = strA[i]
            i++
          }
        })
        strArr.push(arr)
      })

      obj.I = I
      obj.gName = N

      obj.numStr = handlerArr.replace(/\,/g, '|')
      obj.orderStr = strArr.join('|')
      let len = strArr.length;

      obj.len = len
      obj.money = buyDataHandler.handlerMoneyDecimal(len * 2 * obj.ratio * obj.rate);
      return obj
    },
    addToBasketRandom: (ramdomArr) => {
      let obj = r2R(ramdomArr)
      obj.numStr = obj.numStr.replace(/\|/g, ',')


      return obj
    }
  },

  "任三直选复式": {
    "playType": "E1",
    isShowSort: false,
    lenLimit: 3,
    numArr: [{
      num: '0'
    }, {
      num: '1'
    }, {
      num: '2'
    }, {
      num: '3'
    }, {
      num: '4'
    }, {
      num: '5'
    }, {
      num: '6'
    }, {
      num: '7'
    }, {
      num: '8'
    }, {
      num: '9'
    }],
    selectTypeArr: [{
      type: '全'
    }, {
      type: '大'
    }, {
      type: '小'
    }, {
      type: '单'
    }, {
      type: '双'
    }, {
      type: '清'
    }],
    "titleArr": ['万位', '千位', '百位', '十位', '个位'],
    dataHandler: (obj) => {
      let map = r3(obj)
      return map
    },
    addToBasketRandom: (arr) => {
      return r2R(arr)
    }
  },

  "任三直选和值": {
    "playType": "P",
    "titleArr": ["直选和值"],
    len: 28,
    positionNum: 10,
    limitLen: 3,
    dataHandler: (sum) => {
      let res = buyDataHandler.threeSum(sum)
      return res.length
    },
    countLen: (arr) => {
      return buyDataHandler.combinatorialNumber(arr.length, 3);
    },
    zhuhe: (arr) => {
      return dataHandler.zhuhe_1(arr)
    }
  },
  "任三组三": {
    "playType": "G",
    "titleArr": ["组三"],
    lenLimit: 2,
    dataHandler: ({
      selectedObj,
      len,
      positionLen
    }) => {
      return buyDataHandler.combinNum({
        selectedObj,
        len,
        lenLimit: 2,
        positionLen,
        multiple: 2
      })
    },
    titleHandler: (titleArr) => {
      let len = titleArr.length
      let temArr = []
      for (let i = 0; i < len; i++) {
        for (let j = +i + 1; j < len; j++) {
          for (let n = +j + 1; n < len; n++) {
            temArr.push(titleArr[i] + titleArr[j] + titleArr[n] + '组三')
          }
        }
      }
      return temArr
    },
    addToBasketRandom: (ramdomArr) => {
      let obj = r2Danshi(ramdomArr)
      let str = buyDataHandler.createNoReaptRandomNum(2)
      obj.numStr = str.split('').join('|')
      obj.orderStr = str
      obj.len = 2
      obj.money = 4
      return obj
    }
  },
  "任三组六": {
    "playType": "G",
    "titleArr": ["组三"],
    lenLimit: 3,
    dataHandler: ({
      selectedObj,
      len,
      positionLen
    }) => {
      return buyDataHandler.combinNum({
        selectedObj,
        len,
        lenLimit: 3,
        positionLen
      })
    },
    titleHandler: (titleArr) => {

      let len = titleArr.length
      let temArr = []
      for (let i = 0; i < len; i++) {
        for (let j = +i + 1; j < len; j++) {
          for (let n = +j + 1; n < len; n++) {
            temArr.push(titleArr[i] + titleArr[j] + titleArr[n] + '组六')
          }
        }
      }
      return temArr
    },
    addToBasketRandom: (ramdomArr) => {
      let obj = r2Danshi(ramdomArr)
      let str = buyDataHandler.createNoReaptRandomNum(3)
      obj.numStr = str.split('').join('|')
      obj.orderStr = str
      // obj.len = 2
      // obj.money = 4
      return obj
    }
  },
  "任三混合组选": {
    "playType": "F1",
    lenLimit: 3,
    dataHandler: (str) => {
      return buyDataHandler.danshiDataHandler({
        str,
        lenLimit: 3,
        type: 2
      })
    },
    titleHandler: (titleArr) => {
      let len = titleArr.length
      let temArr = []
      for (let i = 0; i < len; i++) {
        for (let j = +i + 1; j < len; j++) {
          for (let n = +j + 1; n < len; n++) {
            temArr.push(titleArr[i] + titleArr[j] + titleArr[n] + '_混合')
          }
        }
      }
      return temArr
    },
    addToBasketHandler: (I, N, handlerArr) => {
      let obj = buyDataHandler.createBuyObj()

      obj.I = I
      obj.gName = N

      obj.numStr = handlerArr
      obj.orderStr = handlerArr
      let len = handlerArr.split(',').length

      obj.len = len
      obj.money = buyDataHandler.handlerMoneyDecimal(len * 2 * obj.ratio * obj.rate);
      return obj
    },
    addToBasketRandom: (ramdomArr) => {
      let obj = r2R(ramdomArr)

      let str = buyDataHandler.createNoReaptRandomNum(3)
      obj.orderStr = str
      obj.numStr = str.split('').join(',')

      return obj
    }
  },

  "任三组选和值": {
    "playType": "P",
    "titleArr": ["组选和值"],
    start: 1,
    len: 27,
    positionNum: 10,
    limitLen: 3,
    dataHandler: (sum) => {
      let res = buyDataHandler.threeSumSort(sum)
      return res.length
    },
    countLen: (arr) => {
      return buyDataHandler.combinatorialNumber(arr.length, 3);
    },
    zhuhe: (arr) => {
      return dataHandler.zhuhe_1(arr)
    }
  },

  "任四直选单式": {
    "playType": "F1",
    lenLimit: 4,
    positionLimit: 4,
    dataHandler: (str) => {
      return buyDataHandler.danshiDataHandler({
        str,
        lenLimit: 4
      })
    },
    titleHandler: (titleArr) => {
      let len = titleArr.length
      let temArr = []
      for (let i = 0; i < len; i++) {
        for (let j = +i + 1; j < len; j++) {
          for (let n = +j + 1; n < len; n++) {
            for (let m = +n + 1; m < len; m++) {
              temArr.push(titleArr[i] + titleArr[j] + titleArr[n] + titleArr[m] + '直选单式')
            }
          }
        }
      }
      return temArr
    },
    addToBasketHandler: (I, N, handlerArr) => {
      let obj = buyDataHandler.createBuyObj()
      let arr1 = [
        ['万', 0],
        ['千', 1],
        ['百', 2],
        ['十', 3],
        ['个', 4],
      ]
      let map = new Map(arr1)
      let temArr = handlerArr.split(',')
      let strArr = []
      let numStr = []
      temArr.forEach((str, idx) => {
        let i = 0
        let arr = ['-', '-', '-', '-', '-']
        let strA = str.split('')
        numStr.push(strA)
        map.forEach((value, key, map) => {
          if (N.includes(key)) {
            arr[value] = strA[i]
            i++
          }
        })
        strArr.push(arr)
      })

      obj.I = I
      obj.gName = N

      obj.numStr = numStr.join('|')
      obj.orderStr = strArr.join('|')
      let len = strArr.length;
      obj.len = len
      obj.money = buyDataHandler.handlerMoneyDecimal(len * 2 * obj.ratio * obj.rate);
      return obj
    },
    addToBasketRandom: (ramdomArr) => {
      let obj = r2R(ramdomArr)
      obj.numStr = obj.numStr.replace(/\|/g, ',')
      return obj
    }
  },
  "任四直选复式": {
    "playType": "E1",
    isShowSort: false,
    lenLimit: 4,
    numArr: [{
      num: '0'
    }, {
      num: '1'
    }, {
      num: '2'
    }, {
      num: '3'
    }, {
      num: '4'
    }, {
      num: '5'
    }, {
      num: '6'
    }, {
      num: '7'
    }, {
      num: '8'
    }, {
      num: '9'
    }],
    selectTypeArr: [{
      type: '全'
    }, {
      type: '大'
    }, {
      type: '小'
    }, {
      type: '单'
    }, {
      type: '双'
    }, {
      type: '清'
    }],
    "titleArr": ['万位', '千位', '百位', '十位', '个位'],
    dataHandler: (selectObj) => {

      let temObj = {}
      for (const [key, value] of Object.entries(selectObj)) {
        let tem = []
        value.forEach(item => {
          tem.push(item.num)
        })
        temObj[key.slice(0, 1)] = tem.join('')
      }
      let handlerArr = []
      let sortArr = ['万', '千', '百', '十', '个']
      sortArr.forEach(key => {
        if (temObj[key]) {
          handlerArr.push(key)
        }
      })
      let len = handlerArr.length
      let map = new Map()
      for (let i = 0; i < len; i++) {
        for (let j = +i + 1; j < len; j++) {
          for (let n = +j + 1; n < len; n++) {
            for (let m = +n + 1; m < len; m++) {
              let k = handlerArr[i] + handlerArr[j] + handlerArr[n] + handlerArr[m]
              let v = temObj[handlerArr[i]] + '|' + temObj[handlerArr[j]] + '|' + temObj[handlerArr[n]] + '|' + temObj[
                handlerArr[m]]
              map.set(k, v)
            }
          }
        }
      }

      return map
    },
    addToBasketRandom: (arr) => {
      return r2R(arr)
    }
  },
  "组选24": {
    "playType": "G",
    "titleArr": ["单号"],
    lenLimit: 4,
    positionLimit: 4,
    dataHandler: ({
      selectedObj,
      len,
      positionLen
    }) => {
      let { obj, s, money } = buyDataHandler.combinNum({
        selectedObj,
        len,
        lenLimit: 4,
        positionLen
      })

      obj.orderStr = obj.orderStr.split('').join(',')


      return { obj, s, money }
    },
    titleHandler: (titleArr) => {

      let len = titleArr.length
      let temArr = []
      for (let i = 0; i < len; i++) {
        for (let j = +i + 1; j < len; j++) {
          for (let n = +j + 1; n < len; n++) {
            for (let m = +n + 1; m < len; m++) {
              temArr.push(titleArr[i] + titleArr[j] + titleArr[n] + titleArr[m] + '组24')
            }
          }
        }
      }
      return temArr
    },
    addToBasketRandom: (ramdomArr) => {
      let obj = r2Danshi(ramdomArr)

      let str = buyDataHandler.createNoReaptRandomNum(4)
      obj.numStr = str.split('').join('|')
      obj.orderStr = str.split('').join(',')
      // obj.len = 2
      // obj.money = 4
      return obj
    }
  },
  "组选12": {
    "playType": "H",
    "titleArr": ["二重号", '单号'],
    // lenLimit: 4,
    positionLimit: 4,
    dataHandler: ({
      arr1,
      arr2,
      positionLen
    }) => {
      return buyDataHandler.zhuxuan(arr1, arr2, positionLen)
    },
    titleHandler: (titleArr) => {
      let len = titleArr.length
      let temArr = []
      for (let i = 0; i < len; i++) {
        for (let j = +i + 1; j < len; j++) {
          for (let n = +j + 1; n < len; n++) {
            for (let m = +n + 1; m < len; m++) {
              temArr.push(titleArr[i] + titleArr[j] + titleArr[n] + titleArr[m] + '组12')
            }
          }
        }
      }
      return temArr
    },

    addToBasketRandom: (randomArr) => {
      let obj = buyDataHandler.createBuyObj()
      let {
        I,
        N
      } = randomArr[buyDataHandler.createRandomNum(0, randomArr.length - 1)]

      obj.I = I
      obj.gName = N

      let n1 = buyDataHandler.createRandomNum(0, 9)
      let str = buyDataHandler.createNoReaptRandomNum(2)

      obj.numStr = n1 + '|' + str
      obj.orderStr = n1 + ',' + str

      return obj
    }
  },
  "组选6": {
    "playType": "G",
    "titleArr": ["二重号"],
    lenLimit: 2,
    positionLimit: 4,
    dataHandler: ({
      selectedObj,
      len,
      positionLen
    }) => {
      let { obj, s, money } = buyDataHandler.combinNum({
        selectedObj,
        len,
        lenLimit: 2,
        positionLen
      })
      obj.orderStr = obj.orderStr.split('').join(',')
      return { obj, s, money }
    },
    titleHandler: (titleArr) => {

      let len = titleArr.length
      let temArr = []
      for (let i = 0; i < len; i++) {
        for (let j = +i + 1; j < len; j++) {
          for (let n = +j + 1; n < len; n++) {
            for (let m = +n + 1; m < len; m++) {
              temArr.push(titleArr[i] + titleArr[j] + titleArr[n] + titleArr[m] + '组六')
            }
          }
        }
      }
      return temArr
    },
    addToBasketRandom: (ramdomArr) => {
      let obj = r2Danshi(ramdomArr)

      let str = buyDataHandler.createNoReaptRandomNum(2)
      obj.numStr = str.split('').join('|')
      obj.orderStr = str.split('').join(',')
      // obj.len = 2
      // obj.money = 4
      return obj
    }
  },
  "组选4": {
    "playType": "H",
    "titleArr": ["二重号", '单号'],
    limit1: 1,
    limit2: 1,
    positionLimit: 4,
    dataHandler: ({
      arr1,
      arr2,
      positionLen
    }) => {
      return buyDataHandler.zhuxuan(arr1, arr2, positionLen, 1)
    },
    addToBasketRandom: () => {
      return buyDataHandler.addToBasketHandler()
    },
    titleHandler: (titleArr) => {
      let len = titleArr.length
      let temArr = []
      for (let i = 0; i < len; i++) {
        for (let j = +i + 1; j < len; j++) {
          for (let n = +j + 1; n < len; n++) {
            for (let m = +n + 1; m < len; m++) {
              temArr.push(titleArr[i] + titleArr[j] + titleArr[n] + titleArr[m] + '组四')
            }
          }
        }
      }
      return temArr
    },

    addToBasketRandom: (randomArr) => {

      let obj = buyDataHandler.createBuyObj()
      let {
        I,
        N
      } = randomArr[buyDataHandler.createRandomNum(0, randomArr.length - 1)]

      obj.I = I
      obj.gName = N

      let n1 = buyDataHandler.createRandomNum(0, 9)
      let str = buyDataHandler.createNoReaptRandomNum(1)

      obj.numStr = n1 + '|' + str
      obj.orderStr = n1 + ',' + str
      return obj
    }
  },



  "前四单式": {
    "playType": "B",
    lenLimit: 4,
    dataHandler: (str) => {
      return buyDataHandler.danshiDataHandler({
        str,
        lenLimit: 4
      })
    },
    addToBasketRandom: () => {
      return danshiRandom(4)
    },

  },

  "前四复式": {
    "playType": "A",
    "titleArr": ["万位", "千位", "百位", '十位']
  },


  "前四组合": {
    "playType": "M",
    "titleArr": ["万位", "千位", "百位", '十位'],
    dataHandler: () => {
      return buyDataHandler.zhuheHandler()
    }
  },
  "前四组选24": {
    "playType": "D",
    "titleArr": ["组选24"],
    lenLimit: 4,
    positionLimit: 4,
    dataHandler: ({
      selectedObj,
      len,
      positionLen
    }) => {
      let {
        obj,
        s,
        money
      } = buyDataHandler.combinNum({
        selectedObj,
        len,
        lenLimit: 4,
        positionLen
      })

      obj.orderStr = obj.orderStr.split('').join(',')
      return {
        obj,
        s,
        money
      }
    },
    addToBasketRandom: () => {
      let obj = buyDataHandler.createBuyObj();
      let {
        rate,
        ratio
      } = obj;
      let str = buyDataHandler.createNoReaptRandomNum(4);
      obj.len = 1;
      obj.money = buyDataHandler.handlerMoneyDecimal(2 * rate * ratio);
      obj.numStr = str.split('').join('|');
      obj.orderStr = str.split('').join(',');

      return obj
    }
  },

  "前四组选12": {
    "playType": "N",
    "titleArr": ["二重号", '单号'],
    limit1: 1,
    limit2: 2,
    positionLimit: 4,
    dataHandler: ({
      arr1,
      arr2,
      positionLen
    }) => {
      return buyDataHandler.zhuxuan(arr1, arr2, 1, 2)
    },
    addToBasketRandom: () => {
      return buyDataHandler.addToBasketHandler()
    },

    dataHandler: ({
      arr1,
      arr2,
      positionLen
    }) => {
      return buyDataHandler.zhuxuan(arr1, arr2, 1, 2)
    },

  },

  "前四组选6": {
    "playType": "D",
    "titleArr": ["二重号"],
    lenLimit: 2,
    positionLimit: 2,
    dataHandler: ({
      selectedObj,
      len,
      positionLen
    }) => {

      let {
        obj,
        s,
        money
      } = buyDataHandler.combinNum({
        selectedObj,
        len,
        lenLimit: 2,
        positionLen
      })

      obj.orderStr = obj.orderStr.split('').join(',')
      return {
        obj,
        s,
        money
      }
    },
    addToBasketRandom: () => {
      let obj = buyDataHandler.createBuyObj();
      let {
        rate,
        ratio
      } = obj;
      let str = buyDataHandler.createNoReaptRandomNum(2);
      obj.len = 1;
      obj.money = buyDataHandler.handlerMoneyDecimal(2 * rate * ratio);
      obj.numStr = str.split('').join('|');
      obj.orderStr = str.split('').join(',');

      return obj
    }
  },


  "前四组选4": {
    "playType": "N",
    "titleArr": ["二重号", '单号'],
    limit1: 1,
    limit2: 1,
    positionLimit: 4,
    dataHandler: ({
      arr1,
      arr2,
      positionLen
    }) => {
      return buyDataHandler.zhuxuan(arr1, arr2, positionLen, 1)
    },
    addToBasketRandom: () => {

      let obj = buyDataHandler.addToBasketHandler()

      let str = buyDataHandler.createNoReaptRandomNum(2)

      obj.numStr = str.split('').join('|')
      obj.orderStr = str.split('').join('|')

      return obj
    }
  },

  "万千": {
    "playType": "J",
  },
  "万百": {
    "playType": "J",
  },
  "万十": {
    "playType": "J",
  },
  "万个": {
    "playType": "J",
  },
  "千百": {
    "playType": "J",
  },
  "千十": {
    "playType": "J",
  },
  "千个": {
    "playType": "J",
  },
  "百十": {
    "playType": "J",
  },
  "百个": {
    "playType": "J",
  },
  "十个": {
    "playType": "J",
  },

  "牛牛": {
    "playType": "K",
  },
  "百家乐": {
    "playType": "L",
  },

}



function danshiRandom(n) {
  let obj = buyDataHandler.createBuyObj()
  let str = buyDataHandler.createNoReaptRandomNum(n)
  // obj.len = 2
  // obj.money = 4
  obj.numStr = str.split('').join('|')
  obj.orderStr = str.split('').join(',')

  return obj
}

function danshiCreateBuyObj(str) {
  let obj = buyDataHandler.createBuyObj()
  let {
    rate,
    ratio
  } = obj
  let arr = str.split(',')
  let temArr = []
  arr.forEach(item => {
    temArr.push(item.split(''))
  })
  obj.numStr = temArr.join('|')
  obj.orderStr = str
  obj.len = temArr.length
  obj.money = temArr.length * 2 * rate * ratio
  return obj
}
//任2  任3 任4  直选单式 复式 随机处理 
function r2Danshi(ramdomArr) {
  let obj = buyDataHandler.createBuyObj()
  let {
    I,
    N
  } = ramdomArr[buyDataHandler.createRandomNum(0, 9)]
  let str = ''
  let i = 2
  while (i--) {
    str += buyDataHandler.createRandomNum(0, 9)
  }
  obj.I = I
  obj.gName = N
  obj.numStr = str.split('').join(',')

  let arr1 = [
    ['万', 0],
    ['千', 1],
    ['百', 2],
    ['十', 3],
    ['个', 4],
  ]
  let map = new Map(arr1)

  let arr = ['-', '-', '-', '-', '-']
  let j = 0
  map.forEach((value, key, map) => {
    if (N.includes(key)) {
      arr[value] = str.split('')[j]
      j++
    }
  })

  obj.orderStr = arr.join(',')
  return obj
}



//任2  任3 任4  直选复式处理 随机
function r2R(arr) {
  let obj = buyDataHandler.createBuyObj();
  let res = arr[buyDataHandler.createRandomNum(0, arr.length - 1)]
  let arr1 = ['万', '千', '百', '十', '个']
  let s = []
  let str = ''
  arr1.forEach((key, index) => {
    if (res.N.includes(key)) {
      let n = buyDataHandler.createRandomNum(0, 9)
      str += n
      s.push(n)
    } else {
      s.push('-')
    }
  })

  obj.numStr = str.split('').join('|')
  obj.orderStr = s.join(',')
  obj.gName = res.N
  obj.I = res.I

  return obj
}


//任2 直选复式处理
function r2(selectObj) {
  let temObj = {}
  for (const [key, value] of Object.entries(selectObj)) {
    let tem = []
    value.forEach(item => {
      tem.push(item.num)
    })
    temObj[key.slice(0, 1)] = tem.join('')
  }
  let handlerArr = []
  let sortArr = ['万', '千', '百', '十', '个']
  sortArr.forEach(key => {
    if (temObj[key]) {
      handlerArr.push(key)
    }
  })
  let len = handlerArr.length
  let map = new Map()
  for (let i = 0; i < len; i++) {
    for (let j = +i + 1; j < len; j++) {
      let k = handlerArr[i] + handlerArr[j]
      let v = temObj[handlerArr[i]] + '|' + temObj[handlerArr[j]]
      map.set(k, v)
    }
  }
  return map
}

//任3 直选复式处理
function r3(selectObj) {
  let temObj = {}
  for (const [key, value] of Object.entries(selectObj)) {
    let tem = []
    value.forEach(item => {
      tem.push(item.num)
    })
    temObj[key.slice(0, 1)] = tem.join('')
  }
  let handlerArr = []
  let sortArr = ['万', '千', '百', '十', '个']
  sortArr.forEach(key => {
    if (temObj[key]) {
      handlerArr.push(key)
    }
  })
  let len = handlerArr.length
  let map = new Map()
  for (let i = 0; i < len; i++) {
    for (let j = +i + 1; j < len; j++) {
      for (let n = +j + 1; n < len; n++) {
        let k = handlerArr[i] + handlerArr[j] + handlerArr[n]
        let v = temObj[handlerArr[i]] + '|' + temObj[handlerArr[j]] + '|' + temObj[handlerArr[n]]
        map.set(k, v)
      }
    }
  }
  return map
}
