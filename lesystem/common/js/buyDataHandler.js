import store from '@/store/index'
import ids from '@/pages/gamesIm/ids.js'
import MD5 from '@/common/js/md5.min.js'

export default {

  checkSameOrder(obj) {
    let { gameId, periodId, orderList,numberOfPeriod } = obj
    let list = JSON.parse(orderList)
    list.forEach(item => {
      item.timestamp = 0
      item.ts = 0
    })


    let orderData = MD5(gameId + numberOfPeriod + JSON.stringify(list))
    let md5Data = uni.getStorageSync('md5OrderData')
    if (orderData == md5Data) {
      return false
    } else {
      uni.setStorageSync('md5OrderData', orderData)
      return true
    }
  },

  arrayDivision(array, size) {
    const length = array.length
    if (!length || !size || size < 1) {
      return []
    }
    let index = 0
    let resIndex = 0
    let result = new Array(Math.ceil(length / size))
    while (index < length) {
      result[resIndex++] = array.slice(index, (index += size))
    }
    return result
  },



  creatList({ isAddZero = false, startNum = 0, endNum = 10 } = {}) {
    let i = startNum
    let arr = []
    while (i < endNum) {

      if (isAddZero) {
        if (i < 10) {
          i = '0' + i
        }
      }


      arr.push({ num: i })
      i++
    }
    return arr
  },

  changeGame(item) {


    let urlLink
    urlLink = item.urlLink || item.linkUrl
    console.log(urlLink);

    let token = uni.getStorageSync('token');
    if (token === '') {
      uni.redirectTo({
        url: '/pages/login/login/login'
      });
      return;
    }

    let obj = {
      id: item.gameId || Number(item.id),
      frontShowName: item.gameName || item.frontShowName,
      mobileIconUrl: item.mobileIconUrl || item.imgUrl
    }

    // let ids = [810, 79, 40, 57, 26, 64, 61, 137, 142, 67, 135, 65, 60, 136, 138, 68, 134, 59, 10, 7]

    let temid
    for (let [key, value] of Object.entries(ids)) {
      if (value.includes(Number(obj.id))) {
        temid = key
        break
      }
    }

    let idArr = [810, 40, 79, 10]



    if (idArr.includes(Number(temid))) {
      urlLink = urlLink.replace(/\gamesIm/, 'games')
    }


    uni.redirectTo({
      url: urlLink
    });
  },


  /**
   * 从数组中取出n个元素的所有排列组合
   * @param arr       待处理数组
   * @param n         要取出的元素个数
   * @param result    返回的结果
   * @param current   当前已经取出的元素
   * @returns {Array} 返回数组，数组元素是各种排列组合的情况
   */
  getCombine(arr, n, result = [], current = '') {
    // 如果只要取出一个元素，那么只需要将数组元素与已取出的元素一一组合即可
    if (n === 1) {
      result.push(...arr.map(v => `${current}${v}`))
      return result;
    }
    // 对当前数组进行遍历，剩余元素个数i等于要取出的元素个数时停止遍历
    for (let i = 0; i < arr.length - n + 1; i++) {
      // 取出当前的元素与已取出的元素组合
      const temp = `${current}${arr[i]}`;
      // 递归调用，数组剪切（相当于开始的索引前进），取出的个数减一
      this.getCombine(arr.slice(i + 1), n - 1, result, temp);
    }

    return result;
  },

  //数组所有的组合，返回数组
  combination(arr, size) {
    //定义数组保存结果
    var result = [];
    //selected数组包含已经选中的元素
    //arr数组包含未选中元素数组，size表示还需选取元素的个数
    function _combine(selected, arr, size) {
      //如果size===0，则一次组合完成，存入result数组并返回
      if (size === 0) {
        result.push(selected);
        return;
      }
      //遍历所有可能选中的元素，遍历的次数为数组长度减去(size-1)
      for (let i = 0; i < arr.length - (size - 1); i++) {
        //复制数组，避免对selected数组数据的更改
        let temp = selected.slice();
        temp.push(arr[i]);
        _combine(temp, arr.slice(i + 1), size - 1);
      }
    }
    _combine([], arr, size);
    return result;
  },



  threeSumSort(sum) {
    let arr = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
    let temArr = []
    if (sum < arr.length) {
      temArr = arr.slice(0, +sum + 1)
    } else {
      temArr = arr
    }
    let res = []
    let len = temArr.length
    for (let i = 0; i < len; i++) {
      for (let j = i; j < len; j++) {
        for (let k = len - 1; k >= j; k--) {
          if (Number(i) + Number(j) + Number(k) === sum) {
            let str = String(i) + String(j) + String(k)

            let aa = str.split('')
            let set = new Set(aa)
            if (set.size !== 1) {
              res.push(String(i) + String(j) + String(k))
            }
          }
        }
      }
    }
    return res
  },
  twoSumSort(sum) {
    let arr = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
    let temArr = []
    if (sum < arr.length) {
      temArr = arr.slice(0, +sum + 1)
    } else {
      temArr = arr
    }

    let res = []
    let len = temArr.length
    for (let i = 0; i < len; i++) {
      for (let k = len - 1; k >= i; k--) {
        if (Number(i) + Number(k) === sum) {
          let str = String(i) + String(k)
          let aa = str.split('')
          let set = new Set(aa)
          if (set.size !== 1) {
            res.push(String(i) + String(k))
          }
        }
      }
    }
    return res
  },
  twoSum(sum) {
    let arr = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
    let temArr = []
    if (sum < arr.length) {
      temArr = arr.slice(0, +sum + 1)
    } else {
      temArr = arr
    }

    let res = []
    for (let i in temArr) {
      for (let n in temArr) {
        if (Number(i) + Number(n) === sum) {
          res.push(i + n)
        }
      }
    }
    return res
  },

  threeSum(sum) {
    let arr = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
    let temArr = []
    if (sum < arr.length) {
      temArr = arr.slice(0, +sum + 1)
    } else {
      temArr = arr
    }

    let res = []
    for (let i in temArr) {
      for (let n in temArr) {
        for (let m in temArr) {
          if (Number(i) + Number(n) + Number(m) === sum) {
            res.push(i + n + m)
          }
        }
      }
    }
    return res
  },



  //组选处理，去掉重复的数字*组合 。添加到号码蓝
  addToBasketHandler(lenLimit = 2) {
    let obj = this.createBuyObj();
    let n = this.createRandomNum(0, 9);
    let m = [];
    let j = lenLimit
    let temArr = []
    for (let k = 0; k < 10; k++) {
      if (k === n) {
        continue
      }
      temArr.push(k)
    }

    while (j--) {
      let len = temArr.length
      let n1 = temArr[this.createRandomNum(0, len - 1)]
      m.push(n1);
      let idx = temArr.findIndex(num => num === n1)
      temArr.splice(idx, 1)
    }

    obj.numStr = n + '|' + m.join(',');
    obj.orderStr = n + '|' + m.join('');
    return obj
  },



  //组选处理，去掉重复的数字*组合
  zhuxuan(arr1, arr2, positionLen = 1, comLimit = 2) {
    let {
      rate,
      ratio
    } = store.state.GDV3.officialRate
    let len = arr2.length;
    let temArr = [];
    arr1.forEach(item => {
      let index = arr2.findIndex(n => n.num === item.num);
      if (index !== -1) {
        temArr.push(this.combinatorialNumber(len - 1, comLimit));
      } else {
        temArr.push(this.combinatorialNumber(len, comLimit));
      }
    });

    let s = temArr.reduce((accumulator, currentValue) => {
      return accumulator + currentValue;
    }, 0);
    let num = s * positionLen
    let money = this.handlerMoneyDecimal(num * 2 * rate * ratio);
    return {
      num,
      money
    };
  },



  //组合数的处理，上面有万千百等位置的选择
  combinNum({
    selectedObj,
    len,
    lenLimit,
    positionLen = 1,
    multiple = 1
  }) {
    let {
      rate,
      ratio
    } = store.state.GDV3.officialRate
    let s = (this.combinatorialNumber(len, lenLimit)) * positionLen * multiple
    let money = this.handlerMoneyDecimal(s * 2 * rate * ratio);

    let temArr = [];
    for (const [key, value] of Object.entries(selectedObj)) {
      value.forEach(item => {
        temArr.push(item.num);
      });
    }
    let obj = this.createBuyObj();

    obj.len = s
    obj.money = money;
    let {
      numStr,
      orderStr
    } = this.objFormatHandler(temArr, 1)
    obj.numStr = numStr
    obj.orderStr = orderStr

    return {
      obj,
      s,
      money
    }
  },



  //复式处理数据
  fushiHandler(arr) {
    let {
      rate,
      ratio
    } = store.state.GDV3.officialRate
    let len = Object.entries(arr).reduce((accumulator, currentValue) => {
      return accumulator * currentValue[1].length;
    }, 1);

    let money = this.handlerMoneyDecimal(len * 2 * rate * ratio);


    // let { I, N,C} = this.$store.state.gameData.curGame;

    let handlerStr = this.sortData(arr);

    let obj = this.createBuyObj()
    obj.numStr = handlerStr
    obj.orderStr = handlerStr
    obj.len = len
    obj.money = money

    return {
      len,
      money,
      obj
    }
  },

  // 单式处理数据 
  danshiDataHandler({
    str,
    lenLimit,
    type = 1
  }) {

    // console.log(str);
    str = str.replace(/\s/g,'')
    // console.log(str);

    let reg = /[0-9]/g;

    let arr = str.match(reg) || [];

    let len = Math.floor(arr.length / lenLimit);
    let spliceEl = arr.splice(lenLimit * len);

    let i = 0;
    let temArr = [];
    while (i++ < len) {
      temArr.push(arr.splice(0, lenLimit).join(''));
    }

    // 去重复，分几种情况
    let map = new Map();
    let repeatEl = [];

    temArr.forEach(item => {
      if (map.get(item)) {
        let v = map.get(item);
        v++;
        map.set(item, v);
      } else {
        map.set(item, 1);
      }
    });

    map.forEach((value, key, map) => {
      if (type === 1) {
        if (value > 1) {
          let v = value - 1;
          while (v--) {
            repeatEl.push(key);
          }
        }
      }
      if (type === 2) {
        // lenLimit
        let k = key[0]
        let temStr = ''
        let n = lenLimit
        while (n--) {
          temStr += k
        }

        if (temStr === key) {
          let v = value
          while (v--) {
            repeatEl.push(key);
          }
          map.delete(key)
        } else {
          if (value > 1) {
            let v = value - 1;
            while (v--) {
              repeatEl.push(key);
            }
          }
        }
      }
    });

    let handlerArr = Array.from(map.keys()).join(',');
    return {
      spliceEl,
      repeatEl,
      handlerArr
    };
  },





  // // 组合数，从N中选出M个数做为一注。无序，但注数会 * 2
  fn1({
    selectedObj,
    len,
    lenLimit
  }) {
    let {
      rate,
      ratio
    } = store.state.GDV3.officialRate
    let s = (this.combinatorialNumber(len, lenLimit)) * 2
    let money = this.handlerMoneyDecimal(s * 2 * rate * ratio);

    let temArr = [];
    for (const [key, value] of Object.entries(selectedObj)) {
      value.forEach(item => {
        temArr.push(item.num);
      });
    }
    let obj = this.createBuyObj();


    obj.len = s;
    obj.money = money;
    let {
      numStr,
      orderStr
    } = this.objFormatHandler(temArr, 1)
    obj.numStr = numStr
    obj.orderStr = orderStr

    return {
      obj,
      s,
      money
    }
  },

  // 组合数，从N中选出M个数做为 1 注。无序
  fn2({
    selectedObj,
    len,
    lenLimit
  }) {
    let {
      rate,
      ratio
    } = store.state.GDV3.officialRate
    let s = (this.combinatorialNumber(len, lenLimit))
    let money = this.handlerMoneyDecimal(s * 2 * rate * ratio);

    let temArr = [];
    for (const [key, value] of Object.entries(selectedObj)) {
      value.forEach(item => {
        temArr.push(item.num);
      });
    }
    let obj = this.createBuyObj();
    let obj1 = store.state.gameData.curGame
    obj.gName = obj1.N
    obj.I = obj1.C[0].I

    obj.len = s;
    obj.money = money;
    let {
      numStr,
      orderStr
    } = this.objFormatHandler(temArr, 1)
    obj.numStr = numStr
    obj.orderStr = orderStr

    return {
      obj,
      s,
      money
    }
  },

  objFormatHandler(temArr, type = 1) {
    let numStr, orderStr
    if (type === 1) {
      numStr = temArr.join('|');
      orderStr = temArr.join('');
    }
    return {
      numStr,
      orderStr
    }
  },


  sortData_1(basketObj) {
    let keyArr = ['万位', '千位', '百位', '十位', '个位'];
    let temArr = [];
    keyArr.forEach(k => {
      if (basketObj[k]) {
        temArr.push(basketObj[k]);
      }
    });

    let tem = []
    temArr.forEach(outArr => {
      let arr = []
      outArr.forEach(item => {
        arr.push(item.num)
      })
      tem.push(arr)
    })
    return tem
    // return tem.join('|')
  },



  sortData(basketObj) {
    let keyArr = ['万位', '千位', '百位', '十位', '个位'];
    let temArr = [];
    keyArr.forEach(k => {
      if (basketObj[k]) {
        temArr.push(basketObj[k]);
      }
    });

    let tem = []
    temArr.forEach(outArr => {
      let arr = []
      outArr.forEach(item => {
        arr.push(item.num)
      })
      tem.push(arr)
    })
    // return tem
    return tem.join('|')
  },

  createBuyObj() {
    let {
      odds,
      rate,
      ratio
    } = store.state.GDV3.officialRate

    let {
      radix
    } = store.state.GDV3.v3IndexGameAllData
    let {
      N,
      C,
    } = store.state.GDV3.v3CurGame

    let I
    if (C && C[0]) { // 信用玩法没有C[0]
      I = C[0].I
    } else {
      I = 0
    }
    let obj = {
      rate, // 模式
      ratio: Number(ratio), //倍数
      gName: N,
      gName_1: '',
      gType: '',
      numStr: '',
      orderStr: '',
      len: 1, //注数
      money: this.handlerMoneyDecimal(radix * ratio * rate),
      unitPrice: radix * rate,
      I,
      odds,
      ts: new Date().getTime() / 1000
    };

    return obj;
  },




  handlerMoneyDecimal(num) {
    let {
      rate
    } = store.state.GDV3.officialRate
    let decimal = rate === 0.001 ? 3 : 2
    let obj = {
      1: 10,
      2: 100,
      3: 1000
    }
    let n = Math.round(num * obj[decimal]) / obj[decimal]
    return n
  },


  addToBasketRandom(limitlen = 5) {
    let temArr = [];
    let obj = this.createBuyObj()
    let str = [];
    while (limitlen--) {
      str.push(this.createRandomNum(0, 9));
    }
    obj.numStr = str.join('|'); //显示的格式
    obj.orderStr = str.join('|'); //购买的格式

    return obj
  },

  //根据和来算出n个数的组合。可以重复，无序的


  //组合
  combinatorialNumber(n, k) { //从n个选出k个为一组，无顺序，总共有多少组
    if (n < k) {
      return 0
    }
    if (2 * k > n) {
      k = n - k
    };

    let s = 1;
    for (let i = 1, j = n; i <= k; i++, j--) {
      s = (s * j) / i;
    }
    return s;
  },


  
  //生成随机数
  createRandomNum(minInt, maxInt) {
    // 生成 [n,m)，包含n但不包含m的正整数： parseInt(Math.random()*(m-n)+n)
    // 生成 (n,m]，不包含n但包含m的正整数： parseInt(Math.random()*(m-n)+n)+1
    // 生成 [n,m]，包含n和m的随机数： parseInt(Math.random()*(m-n+1)+n)
    // 生成 (n,m)，不包含n和m的正整数：parseInt(Math.random()*(m-n-1)+n+1)
    return parseInt(Math.random() * (maxInt - minInt + 1) + minInt);
  },

  //生成0-9之间任意长度的不重复的数字字符串。长度不能超过10个
  createNoReaptRandomNum(j) {
    let arr = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
    let str = ''
    while (j--) {
      let i = this.createRandomNum(0, arr.length - 1)
      let s = arr[i]
      arr.splice(i, 1)
      str += s
    }
    return str
  },


  //生成0-9之间任意长度的不重复的数字字符串。长度不能超过10个 .返回数组
  createNoReaptRandomNumReArr(j) {
    let arr = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
    let strArr = []
    while (j--) {
      let i = this.createRandomNum(0, arr.length - 1)
      let s = arr[i]
      arr.splice(i, 1)
      strArr.push(s)
    }
    return strArr
  },

  //生成0-9之间任意长度的不重复的数字字符串。
  createNoReaptRandomNum_1(j) {
    let arr = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10']
    let temArr = []
    while (j--) {
      let i = this.createRandomNum(0, arr.length - 1)
      let s = arr[i]
      arr.splice(i, 1)
      temArr.push(s)
    }
    return temArr
  },
  createNoReaptRandomNum_2(j, numArr) {
    let temArr = []
    while (j--) {
      let i = this.createRandomNum(0, numArr.length - 1)
      let s = numArr[i]
      numArr.splice(i, 1)
      temArr.push(s)
    }
    return temArr
  },

  setNumDecimal_1(num, decimal = 2) {

    return Number(num.toFixed(decimal))
  },

  setNumDecimal(num, decimal = 100) {
    let obja = store.state.GDV3.officialRate
    if (!obja) {
    }
    let {
      rate
    } = obja

    decimal = rate == 0.001 ? 10000 : 1000

    let n = Math.round(num * decimal) / decimal
    return n
  },

  //-----------------以下方法为gamesIm文件夹内用到的方法-------
  getCombination(array) {
    let resultArr = [];
    array.forEach((arrItem) => {
      if (resultArr.length === 0) {
        let firstItem = [];
        arrItem.forEach(item => {
          firstItem.push([item]);
        })
        resultArr = firstItem
      } else {
        const emptyArray = [];
        resultArr.forEach((item) => {
          arrItem.forEach((value) => {
            let index = item.findIndex(str => str == value)
            if (index === -1) {
              emptyArray.push([...item, value])
            }
          })
        })
        resultArr = emptyArray
      }
    });
    return resultArr;
  },

  sortDataByTitleArr(selectedObj, titleArr) {
    let keyArr = ['万位', '千位', '百位', '十位', '个位'];
    let temArr = [];
    titleArr.forEach(k => {
      if (selectedObj[k]) {
        temArr.push(selectedObj[k]);
      }
    });

    let tem = []
    temArr.forEach(outArr => {
      let arr = []
      outArr.forEach(item => {
        arr.push(item.num)
      })
      tem.push(arr)
    })

    return tem
  },

  // 单式处理数据
  danshiDH({
    str,
    lenLimit = 2,
  }) {
    let reg = /[0-9]/g;

    let arr = str.match(reg) || [];
    let i = 0;
    let temArr = [];
    let spliceEl = []
    let repeatEl = []
    let len = arr.length
    while (i < len / 2) {
      let sliceArr = arr.slice(+0 + i * 2, +2 + i * 2)
      let s = sliceArr[0]
      let l = sliceArr.length

      if (s == 0 && l == 2) {
        temArr.push(sliceArr.join(''))
      }
      i++
    }

    let len1 = temArr.length
    spliceEl = temArr.splice(Math.floor(len1 / lenLimit) * lenLimit)

    let j = 0
    let handlerArr = []
    while (j < len1 / 2) {
      let arr = temArr.slice(+0 + j * lenLimit, +lenLimit + j * lenLimit)


      if (arr.length !== 0 && arr[0] !== arr[1]) {
        let str = arr.join('')
        let index = handlerArr.findIndex(item => item == str)
        if (index === -1) {
          handlerArr.push(str)
        } else {
          repeatEl.push(str)
        }
      }
      j++
    }
    return {
      handlerArr,
      spliceEl,
      repeatEl
    }
  },




  danshiDH_2({
    str,
    lenLimit = 3,
  }) {
    let reg = /[0-9]/g;

    let arr = str.match(reg) || [];
    let i = 0;
    let temArr = [];
    let spliceEl = []
    let repeatEl = []
    let len = arr.length
    while (i < len / 2) {
      let sliceArr = arr.slice(+0 + i * 2, +2 + i * 2)
      let n = sliceArr.join('')
      if (n.length == 2 && n < 12) {
        if (n < 10) {
          if (sliceArr[0] != sliceArr[1]) {
            temArr.push(n)
          }
        } else {
          temArr.push(n)
        }
      }
      i++
    }

    let len1 = temArr.length
    spliceEl = temArr.splice(Math.floor(len1 / lenLimit) * lenLimit)
    let handlerArr = []
    let tarr = []
    temArr.forEach(item => {
      let idx = tarr.findIndex(n => n == item)
      if (idx == -1) {
        tarr.push(item)
      }
      if (tarr.length === lenLimit) {
        handlerArr.push(tarr)
        tarr = []
      }
    })

    return {
      handlerArr,
      spliceEl,
      repeatEl
    }
  },
  danshiDH_1({
    str,
    lenLimit = 3,
  }) {
    let reg = /[0-9]/g;

    let arr = str.match(reg) || [];
    let i = 0;
    let temArr = [];
    let spliceEl = []
    let repeatEl = []
    let len = arr.length
    while (i < len / 2) {
      let sliceArr = arr.slice(+0 + i * 2, +2 + i * 2)
      let n = sliceArr.join('')
      if (n.length == 2 && n < 12) {
        if (n < 10) {
          if (sliceArr[0] != sliceArr[1]) {
            temArr.push(n)
          }
        } else {
          temArr.push(n)
        }
      }
      i++
    }

    let len1 = temArr.length
    spliceEl = temArr.splice(Math.floor(len1 / lenLimit) * lenLimit)
    let handlerArr = []
    let tarr = []
    temArr.forEach(item => {
      tarr.push(item)
      if (tarr.length === lenLimit) {
        handlerArr.push(tarr)
        tarr = []
      }
    })

    let hArr = []
    for (let outArr of handlerArr) {
      let set = new Set(outArr)
      let len = outArr.length
      if (set.size === len) {
        hArr.push(outArr)
      } else {
        spliceEl.push(outArr)
      }
    }

    let strArr = []
    let hArr1 = []
    hArr.forEach(item => {
      let str = item.join('')
      let idx = strArr.findIndex(s => s == str)
      if (idx === -1) {
        strArr.push(str)
        hArr1.push(item)
      } else {
        repeatEl.push(item)
      }
    })

    handlerArr = hArr1
    return {
      handlerArr,
      spliceEl,
      repeatEl
    }
  },

  //福彩3D的单式
  danshiDH_3({
    str,
    lenLimit = 3,
    deleteRepeat = false
  }) {
    let reg = /[0-9]/g;
    let arr = str.match(reg) || [];
    let i = 0;
    let handlerArr = [];
    let spliceEl = []
    let repeatEl = []
    let len = arr.length
    while (i < len / lenLimit) {
      let sliceArr = arr.slice(i * lenLimit, (i + 1) * lenLimit)
      if (sliceArr.length == lenLimit) {
        let size = new Set(sliceArr).size
        if (deleteRepeat && size === 1) {
          spliceEl.push(sliceArr)
          i++
          continue
        }

        let str = sliceArr.join()
        let index = handlerArr.findIndex(item => item == str)
        if (index == -1) {
          handlerArr.push(str)
        } else {
          repeatEl.push(str)
        }
      } else if (sliceArr.length !== 0) {
        spliceEl.push(sliceArr)
      }
      i++
    }


    return {
      handlerArr,
      spliceEl,
      repeatEl
    }
  },

  // handlerArr: "123,321"
  // repeatEl: []
  // spliceEl: []
  //五星混合组选单式
  danshiDH_4({
    str,
    lenLimit = 3,
    deleteRepeat = false
  }) {
    let reg = /[0-9]/g;
    let arr = str.match(reg) || [];
    let i = 0;
    let handlerArr = [];
    let spliceEl = []
    let repeatEl = []
    let len = arr.length
    while (i < len / lenLimit) {
      let sliceArr = arr.slice(i * lenLimit, (i + 1) * lenLimit)
      if (sliceArr.length == lenLimit) {
        let size = new Set(sliceArr).size
        if (deleteRepeat && size === 1) {
          spliceEl.push(sliceArr)
          i++
          continue
        }

        let flag = true
        for (let item of handlerArr) {
          let copyItem = item.slice()
          let copysliceArr = sliceArr.slice()

          let sortItemStr = copyItem.sort((a, b) => a - b).join('')
          let sortSliceStr = copysliceArr.sort((a, b) => a - b).join('')
          if (sortItemStr == sortSliceStr) {
            flag = false
            break
          }
        }
        if (flag) {
          handlerArr.push(sliceArr)
        } else {
          repeatEl.push(sliceArr.join(''))
        }
      } else if (sliceArr.length !== 0) {
        spliceEl.push(sliceArr.join(''))
      }
      i++
    }


    let temArr = []
    handlerArr.forEach(item => {
      temArr.push(item.join(''))
    })
    return {
      handlerArr: temArr.join(','),
      spliceEl,
      repeatEl
    }
  },


}
