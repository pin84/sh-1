import store from '@/store'
import ids from './ids'


export default {

  md5orderdata(){
    return false
  },

  async inputFile() {
    return new Promise((resolve, reject) => {
      const input = document.querySelector("input[type=file]");
      let file = input.files[0];
      let reader = new FileReader();
      reader.readAsText(file, "utf8");
      reader.onload = (evt) => {
        let res = evt.target.result;
        input.value = ''
        resolve(res)
      };
    })
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

  changeOdds(arr) {
    let { percentage } = store.state.gd.footOdds
    let { mode } = store.state.gd.footRate
    arr.forEach((item) => {
      item.odds = this.setNumDecimal(
        (item.MxO - (item.MxO - item.MiO) * percentage) * mode,
        3
      );
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



  //组选处理，去掉重复的数字*组合  (保留，但不使用，用 getCombination 代替)
  zhuxuan(arr1, arr2, comLimit, isDelRepeat = true) {
    let len = arr2.length;
    let temArr = [];
    arr1.forEach(item => {
      let index = arr2.findIndex(n => n === item);
      if (index !== -1 && isDelRepeat) {
        temArr.push(this.combinatorialNumber(len - 1, comLimit));
      } else {
        temArr.push(this.combinatorialNumber(len, comLimit));
      }
    });

    let num = temArr.reduce((accumulator, currentValue) => {
      return accumulator + currentValue;
    }, 0);
    return {
      num,
      money: num
    };
  },



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

  //五星混合组选单式
  danshiDH({
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

          // let sortItemStr = copyItem.sort((a, b) => a - b).join('')
          // let sortSliceStr = copysliceArr.sort((a, b) => a - b).join('')

          let sortItemStr = copyItem.join('')
          let sortSliceStr = copysliceArr.join('')
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
    return {
      handlerArr,
      spliceEl,
      repeatEl
    }
  },

  // 单式处理数据,前面带0 如0102
  danshiDH_260({
    str,
    lenLimit = 2,
    deleteRepeat = true
  }) {
    let reg = /[0-9]/g;
    let arr = str.match(reg) || [];
    let temArr = []
    while (true) {
      let slArr = arr.splice(0, 2)
      if (slArr.length == 2) {
        let str = slArr.join('')
        if (str > 10 || str < 1) continue
        temArr.push(str)
      } else {
        break
      }
    }

    let handlerArr = [];
    let repeatEl = []
    let spliceEl = []
    while (true) {
      let slArr = temArr.splice(0, lenLimit)
      let len = slArr.length
      if (len < lenLimit) {
        if (len != 0) {
          spliceEl.push(slArr)
        }
        break
      }

      let set = new Set(slArr)
      if (set.size < lenLimit) {
        spliceEl.push(slArr)
        continue
      }

      let str = slArr.join().replace(/\,/g, '')
      if (!handlerArr.includes(str)) {
        handlerArr.push(str)
      } else {
        repeatEl.push(str)
      }
    }
    return {
      spliceEl, handlerArr, repeatEl
    }
  },

  //生成随机数
  createRandomNum(minInt, maxInt) {
    // 生成 [n,m)，包含n但不包含m的正整数： parseInt(Math.random()*(m-n)+n)
    // 生成 (n,m]，不包含n但包含m的正整数： parseInt(Math.random()*(m-n)+n)+1
    // 生成 [n,m]，包含n和m的随机数： parseInt(Math.random()*(m-n+1)+n)
    // 生成 (n,m)，不包含n和m的正整数：parseInt(Math.random()*(m-n-1)+n+1)
    return parseInt(Math.random() * (maxInt - minInt + 1) + minInt);
  },
  //生成随机0-9数组
  createRandomNumArr(n) {
    let arr = []
    while (n--) {
      arr.push(this.createRandomNum(0, 9))
    }
    return arr
  },
  //生成随机0-9数组
  createNoRepeatNumberArrIm(j, minInt, maxInt) {
    let strArr = []
    let arr = []
    let i = minInt
    while (i <= maxInt) {
      arr.push(i)
      i++
    }
    while (j--) {
      let i = this.createRandomNum(0, arr.length - 1)
      let s = arr[i]
      arr.splice(i, 1)
      strArr.push(s)
    }
    return strArr
  },


  //生成0-9之间任意长度的不重复的数字字符。长度不能超过10个 .返回数组
  createNoRepeatNumberArr(j, arr = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]) {
    let strArr = []
    while (j--) {
      let i = this.createRandomNum(0, arr.length - 1)
      let s = arr[i]
      arr.splice(i, 1)
      strArr.push(s)
    }
    return strArr
  },


  

  createBuyObj() {
    let { mode, times } = store.state.gd.footRate
    let { num, money } = store.state.gd.footMoney
    let { selectBack } = store.state.gd.footOdds
    let curGame = store.state.gd.curGame
    let { radix,latestPriodData:{gameID} } = store.state.gd.indexGameData
    let tem = {
      1: '元',
      0.1: '角',
      0.01: '分',
      0.001: '厘',
    }
    let tem1 = {
      1: '1',
      0.1: '2',
      0.01: '3',
      0.001: '4',
    }

    let I = curGame.C[0].I

    if(ids['260'].includes(Number(gameID))){
      let num = 0
      curGame.C.forEach(item=>{
        if(item.I > num){
          num = item.I
          I = item.I
        }
      })
    }

    let obj = {
      I,
      radix,
      gName: curGame.N,
      modeName: tem[mode],
      mode: tem1[mode],
      moneyMode: mode,
      times,
      selectBack,
      money: money || radix * mode * times,
      num: num || 1,
      ts: new Date().getTime() / 1000
    }


    return obj
  },


  setNumDecimal(num, decimal) {
    if (!decimal) {
      let { mode } = store.state.gd.footRate
      mode == 0.001 ? decimal = 3 : decimal = 2
    }
    let obj = {
      1: 10,
      2: 100,
      3: 1000,
      4: 10000,
      5: 10000,
    }
    let n = Number(num.toFixed(decimal))
    return n
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

}


