
import bgcolor from './bgcolor'
export default {
  weishuList: () => {
    let arr = []
    for (let i = 0; i < 10; i++) {
      let j = 1
      let tem = []
      while (j < 50) {

        if (String(j).endsWith(String(i))) {
          let bc;
          for (let [key, value] of Object.entries(bgcolor)) {
            if (value.includes(Number(j))) {
              bc = key;
              break;
            }
          }
          tem.push({ num: j, bc });
        }
        j++
      }
      arr.push(tem)
    }
    return arr
  },


  ShengXiaoList: () => {
    let i = 3;
    let arr = [];
    for (let k = 0; k < 12; k++) {
      let tem = [];
      let j = 0
      while (i + j * 12 <= 49) {
        let num = i + j * 12;
        let bc;
        for (let [key, value] of Object.entries(bgcolor)) {
          if (value.includes(num)) {
            bc = key;
            break;
          }
        }
        tem.push({ num, bc });
        j++;
      }
      i--;
      if (i == 0) {
        i = 12;
      }
      arr.push(tem);
    }

    // console.log(arr);
    return arr
  },


  shengXiaoClassify() {
    let arr = this.shengXiaoName()
    let arr1 = this.ShengXiaoList()

    let obj = {}
    arr.forEach((element, idx) => {
      obj[element] = arr1[idx]

    });
    return obj

  },

  shengXiaoName: () => {
    let arr = [
      "鼠",
      "牛",
      "虎",
      "兔",
      "龙",
      "蛇",
      "马",
      "羊",
      "猴",
      "鸡",
      "狗",
      "猪",
    ]

    return arr
  },

  typeList: () => {
    let type = [
      "大",
      "小",
      "单",
      "双",
      "大单",
      "大双",
      "小单",
      "小双",
      "合单",
      "合双",
      "家禽",
      "野兽",
    ]
    return type
  },

  colorType: () => {
    let ct = [
      '红大', '红小', '红单', '红双', '蓝大', '蓝小', '蓝单', '蓝双', '绿大', '绿小', '绿单', '绿双', '红波', '蓝波', '绿波'
    ]
    return ct
  },




  shengXiaoType: () => {

    let jiaQin = [1, 13, 25, 37, 49, 8, 20, 32, 44, 7, 19, 31, 43, 5, 17, 29, 41, 4, 16, 28, 40, 3, 15, 27, 39]
    let yeShou = [2, 14, 26, 38, 12, 24, 36, 48, 11, 23, 35, 47, 10, 22, 34, 46, 9, 21, 33, 45, 6, 18, 30, 42]

    return { A: jiaQin, B: yeShou }
  },

  shengxiaoFenLei: () => {
    let yeshou = ['鼠', '虎', '龙', '猴', '兔', '蛇']
    let jiaqin = ['马', '狗', '牛', '羊', '鸡', '猪']
    let qianxiao = ['鼠', '虎', '龙', '牛', '兔', '蛇']
    let houxiao = ['马', '狗', '猴', '羊', '鸡', '猪']
    let tianxiao = ['龙', '猴', '马', '牛', '兔', '猪']
    let dixiao = ['鼠', '虎', '狗', '蛇', '羊', '鸡']

    return { jiaqin, yeshou,qianxiao,houxiao,tianxiao,dixiao }
  },

  bgColor: () => {
    return {
      '#c42133': [1, 2, 7, 8, 12, 13, 18, 19, 23, 24, 29, 30, 34, 35, 40, 45, 46],
      '#2373d6': [3, 4, 9, 10, 14, 15, 20, 25, 26, 31, 36, 37, 41, 42, 47, 48],
      '#38b81b': [5, 6, 11, 16, 17, 21, 22, 27, 28, 32, 33, 38, 39, 43, 44, 49]
    }
  }


}