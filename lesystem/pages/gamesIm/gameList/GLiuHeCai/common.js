
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


  shengxiaoFenLei: () => {
    let yeshou = ['鼠', '虎', '龙', '猴', '兔', '蛇']
    let jiaqin = ['马', '狗', '牛', '羊', '鸡', '猪']
    let qianxiao = ['鼠', '虎', '龙', '牛', '兔', '蛇']
    let houxiao = ['马', '狗', '猴', '羊', '鸡', '猪']
    let tianxiao = ['龙', '猴', '马', '牛', '兔', '猪']
    let dixiao = ['鼠', '虎', '狗', '蛇', '羊', '鸡']

    return { jiaqin, yeshou,qianxiao,houxiao,tianxiao,dixiao }
  },


  shengXiaoType: () => {

    let jiaQin = [1, 13, 25, 37, 8, 20, 32, 44, 7, 19, 31, 43, 5, 17, 29, 41, 4, 16, 28, 40, 3, 15, 27, 39]
    let yeShou = [2, 14, 26, 38, 12, 24, 36, 48, 11, 23, 35, 47, 10, 22, 34, 46, 9, 21, 33, 45, 6, 18, 30, 42]

    let jiaQin1 = ['牛', '马', '羊', '鸡', '狗', '猪']
    let yeShou1 = ['鼠', '虎', '兔', '龙', '蛇', '猴']

    return { A: jiaQin, A1: jiaQin1, B: yeShou, B1: yeShou1 }
  }


}