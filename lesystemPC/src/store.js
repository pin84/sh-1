import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

// const india = {
//   state: {
//     selectedArr: [],
//     quickBet: 0,
//     isShowDialog: 0
//   },
//   mutations: {
//     isShowDialog(state, params) {
//       state.isShowDialog = params
//     },
//     quickBet(state, params) {
//       state.quickBet = params
//     },
//     selectedArr(state, params) {
//       state.selectedArr = params
//     },
//   }
// }

const gd = {
  state: {
    updateUserInfo: 0, //更新用户信息
    userInfo: {},
    updateRecord: 0, //
    playTypeDone: 0, //navList 请求完成
    curGame: {}, //当前选择的玩法
    curPlayType: {}, //给Tips用，保存当前的玩法大类
    curPlayList: {}, //当前游戏的报有玩法
    indexGame: {},
    indexGameData: {}, //当前游戏的所有数据
    latestPriodData: {},
    footMoney: { num: 0, money: 0 },
    footRate: { times: 1, mode: 1 },
    footOdds: { percentage: 0, selectBack: 7 },
    addToBasket: 0,
    toBuy: 0,
    toBuyNext: 0,
    basketList: [],
    odds: { //其他组件传给foot
      MB: 9,
      MxO: 198000,
      MiO: 180000
    },
    clearSelect: 0,
    clearInput: 0,
    codeRank: {}, //显示冷热信息
    settlefId: 0, //更新冷热
    addRandom: { ts: 0, n: 1 },
    isDoneCurGame: 0, //当前id的头部数据请求完成

    //龙虎，牛牛,快3
    moneyDeviation: 0, //MxO相加时，计算盈利时需要用到的变量

    //信用专用
    bettingType: 0,
    showCreditBasket: 0,
    showSetMoney: 0,
    inputMoney: '',

    //声音
    click: false,
    tips: false,
    bgm: false,
  },
  mutations: {

    tips(state, params) {
      state.tips = params
    },
    bgm(state, params) {
      state.bgm = params
    },
    click(state, params) {
      state.click = params
    },
    updateUserInfo(state, params) {
      state.updateUserInfo = params
    },
    userInfo(state, params) {
      state.userInfo = params
    },
    updateRecord(state, params) {
      state.updateRecord = params
    },
    curPlayType(state, params) {
      state.curPlayType = params
    },
    inputMoney(state, params) {
      state.inputMoney = params
    },
    playTypeDone(state, params) {
      state.playTypeDone = params
    },
    moneyDeviation(state, params) {
      state.moneyDeviation = params
    },
    showSetMoney(state, params) {
      state.showSetMoney = params
    },
    showCreditBasket(state, params) {
      state.showCreditBasket = params
    },
    bettingType(state, params) {
      state.bettingType = params
    },
    isDoneCurGame(state, params) {
      state.isDoneCurGame = params
    },
    codeRank(state, params) {
      state.codeRank = params
    },
    addRandom(state, params) {
      state.addRandom = params
    },
    clearSelect(state, params) {
      state.clearSelect = params
    },
    clearInput(state, params) {
      state.clearInput = params
    },
    settlefId(state, params) {
      state.settlefId = params
    },
    curGame(state, params) {
      state.curGame = params
    },
    curPlayList(state, params) {
      state.curPlayList = params
    },
    odds(state, params) {
      state.odds = params
    },
    indexGameData(state, params) {
      state.indexGameData = params
    },
    latestPriodData(state, params) {
      state.latestPriodData = params
    },
    indexGame(state, params) {
      state.indexGame = params
    },
    footMoney(state, params) {
      state.footMoney = params
    },
    footRate(state, params) {
      state.footRate = params
    },
    footOdds(state, params) {
      state.footOdds = params
    },
    addToBasket(state, params) {
      state.addToBasket = params
    },
    toBuy(state, params) {
      state.toBuy = params
    },
    toBuyNext(state, params) {
      state.toBuyNext = params
    },
    basketList(state, params) {
      if (params == 'clearBasket') {
        state.basketList = []
        return
      }
      if (Array.isArray(params)) {
        params.forEach(item => {
          state.basketList.push(item)
        })
        return
      }
      state.basketList.push(params)
    },

  },

}

// const user = {
//   state: {
//     isLogin: false,
//     userInfo: {},
//     permission: [],
//   },
//   mutations: {
//     isLogin(state, userInfo, permission) {
//       state.isLogin = true;
//       state.userInfo = userInfo;
//       state.permission = permission;
//     }
//   },
//   actions: {

//   }
// }


export default new Vuex.Store({

  modules: {
    // user,
    gd,
    // india
  }

})