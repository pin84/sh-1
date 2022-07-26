import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const YB = {
  state: {
    yb_userinfo: {}
  },
  mutations: {
    yb_userinfo(state, params) {
      state.yb_userinfo = params
    },
  },
}

const userInfo = {
  state: {
    userinfo: {}
  },

  mutations: {
    setUserInfo(state, params) {
      state.userinfo = params
    },
  },

}

const GDV3 = {
  state: {
    updateCountdown:0,
    curPlayIndex:'',
    curPlayIndexnm:{n:0,m:0},
    gameResultId:0, // 缓存用记从游戏页面去到开奖结果页面的id
    v4latestPriodData:{},
    loadmore: 0,
    updateRecord: 0,
    userGames: [],
    latestPriodData: {}, //previousResult 改变就保存
    v4latestPriodData: {}, //在gamesIm/index 下设置，只是一部份
    v3IndexGameAllData: {}, //在gamesIm/index 下设置,所有的数据
    v3CountDownTime: {}, //倒计时条
    v3ChangeLongHu: 0, //专门为龙虎做的触发比率条的更新
    clearSelected: 0, //清除当前所有选择号码。
    selectedNum: {}, //已选择
    v3IsShowNumBaket: false, //记录当前是否显示号码蓝，用于隐藏倒计时条
    numBasket: [], //号码蓝
    footMoney: {
      num: 0,
      money: 0
    }, // 多少注多少钱
    officialRate: {
      rate: 1, // 元角分 角为0.1，分为0.01
      ratio: 1, //多少倍,
      odds: 0, //赔率,最小为0
      percentage: 0, // 百分比 ,从广西快3后新增的字段
      selectBack: 0, // 信用 ， 
    },
    v3RatioInitValue: { //初始化时比率条的值
      MB: 0,
      MxO: 0,
      MiO: 0
    },
    sumBonus: 0, //相加的odds
    /**
     * 当前的值
     * sumBonus:所有类目的总资金
     */
    v3RatioCurValue: {},
    addToBasket: 0, //触发当前玩法添加到号码蓝的操作
    v3AddRandom: {
      n: 1,
      timestamp: 0
    }, //触发当前玩法随机添加到号码蓝的操作,并把要随机的注数存到store
    v3ToBuy: 0, // 触发当前玩法把所选择的添加到号蓝，购买用下一个
    v3ToBuyNext: 0, //触发当前玩法购买，在@/pages/gamesIm/gameList/index.vue里监听
    v3IsHasSelected: false, //是否有选中，弃用，但保留，之前的写法需要
    v3SelectedCount: 0, //是否有选中上，功能同上
    v3ShowRecord: false, //显示当前游戏的投注记录
    v3playList: {}, //当前id所有的玩法列表
    v3CurPlayList: {}, // 信用游戏当前玩法的数据列表。
    v3CurGame: {}, //当前和具体游戏，第二行
    v3IndexGame: {}, //同storage里的indexGame,在PlayType里存
    v3GameResultList: {
      list: [],
      total: 0
    },
    v3IsShowTimeOutDialog: 0, //销售时间到后，跳出的圣诞框
    //以下单独用于信用玩法
    v3BasketShowFrom: 0, //在Basket里显示全部输入金额后的表单
    v3InputMoney: '', //信用玩法当前输入的钱数
    v3InputMoneyBasket: '', //信用玩法当前输入的钱数,号码蓝里的input
    v3AllCurPlayList: [], //保存当前游戏所有玩法列表
    v3IsHasMoney: 0, //所有购买项都有金额时直接显示下注按钮

    //专门给六合彩用
    showCombinationType:0,
    curSelectedType:'',
    temValue:{}, //记录临时的内容,
  },

  mutations: {
    updateCountdown(state, params) {
      state.updateCountdown = params
    },
    curPlayIndexnm(state, params) {
      state.curPlayIndexnm = params
    },
    curPlayIndex(state, params) {
      state.curPlayIndex = params
    },
    gameResultId(state, params) {
      state.gameResultId = params
    },
    v4latestPriodData(state, params) {
      state.v4latestPriodData = params
    },
    temValue(state, params) {
      state.temValue = params
    },
    curSelectedType(state, params) {
      state.curSelectedType = params
    },
    showCombinationType(state, params) {
      state.showCombinationType = params
    },
    loadmore(state, params) {
      state.loadmore = params
    },
    updateRecord(state, params) {
      state.updateRecord = params
    },
    userGames(state, params) {
      state.userGames = params
    },
    latestPriodData(state, params) {
      state.latestPriodData = params
    },
    sumBonus(state, params) {
      state.sumBonus = params
    },
    v3IsHasMoney(state, params) {
      state.v3IsHasMoney = params
    },
    v3IsShowTimeOutDialog(state, params) {
      state.v3IsShowTimeOutDialog = params
    },
    v3AllCurPlayList(state, params) {
      state.v3AllCurPlayList = params
    },

    v3playList(state, params) {
      state.v3playList = params
    },
    v3RatioInitValue(state, params) {
      state.v3RatioInitValue = params
    },
    v3RatioCurValue(state, params) {
      state.v3RatioCurValue = params
    },
    v3CurGame(state, params) {
      state.v3CurGame = params
    },
    v3GameResultList(state, params) {
      state.v3GameResultList = params
    },
    v3BasketShowFrom(state, params) {
      state.v3BasketShowFrom = params
    },
    v3IndexGame(state, params) {
      state.v3IndexGame = params
    },
    v3InputMoney(state, params) {
      state.v3InputMoney = params
    },
    v3InputMoneyBasket(state, params) {
      state.v3InputMoneyBasket = params
    },

    v3ClearSelected(state, params) {
      state.clearSelected = params
    },
    v3CurPlayList(state, params) {
      state.v3CurPlayList = params
    },
  
    v3SetIndexGameData(state, params) {
      state.v4latestPriodData = params
    },
    v3IndexGameAllData(state, params) {
      state.v3IndexGameAllData = params
    },
    v3ChangeLongHu(state, params) {
      state.v3ChangeLongHu = params
    },
    v3IsShowNumBaket(state, params) {
      state.v3IsShowNumBaket = params
    },
    v3ShowRecord(state, params) {
      state.v3ShowRecord = params
    },
    v3IsHasSelected(state, params) {
      state.v3IsHasSelected = params
    },
    v3SelectedCount(state, params) {
      if (params == 'clearAll') {
        state.v3SelectedCount = 0
      } else {
        state.v3SelectedCount += params
      }
    },
    v3ToBuy(state, params) {
      state.v3ToBuy = params
    },
    v3ToBuyNext(state, params) {
      state.v3ToBuyNext = params
    },
    setAddToBasket(state, params) {
      state.addToBasket = params
    },
    v3AddRandom(state, params) {
      state.v3AddRandom = params
    },
    v3OfficialRate(state, params) {
      
      state.officialRate = params
    },

    v3selectedNum(state, params) {
      state.selectedNum = params
    },

    v3FootMoney(state, params) {
      state.footMoney = params
    },
    v3NumBasket(state, params) {
      if (params === 'clearAll') {
        state.numBasket = []
      } else {
        state.numBasket.push(params)
      }
    },

    V3SetCountDownTime(state, params) {
      state.v3CountDownTime = params
    },


  }

}


//游戏数据共享第二版（相对于第一版的思路有改变）, 第一版的必须保留。还用到其中的一些字段 
const gameDataV2 = {
  state: {
    titleLineName: {
      firstLint: 'a',
      secondLint: 'b'
    },
    rate: {
      rate: 1,
      ratio: 1,
      percentage: 1, //百分比，用来算球下面的数
      selectBack: 1, //赔率 
    },
    isHasSelected: 0, //是否有选中的号码
    cancelAll: 0, //取消所有选择的号码
    d1: [], //游戏的选号数据
    numBasket: [], //号码框
    numFormData: [], //号码蓝的数据确认金额后形成的表单
    isShowRecord: false,
    indexGame: {}, // 同storage里的indexGame,存在这里只是便于watch
    updataWenLu: 0, //用于更新问路和数据,
  },
  mutations: {
    setTitleLineName(state, params) {
      state.titleLineName = params
    },
    setUpdataWenLu(state, params) {
      state.updataWenLu = params
    },
    setIndexGame(state, params) {
      state.indexGame = params
    },

    setCancelAll(state, params) {
      state.cancelAll = params
    },
    setIsHasSelected(state, params) {
      state.isHasSelected += params
    },
    setD1(state, params) {
      state.d1 = params
    },
    setNumBasket(state, params) {
      state.numBasket = params
    },
    setNumFormData(state, params) {
      state.numFormData = params
    },

    setRate(state, params) {
      state.rate = params
    },



  },



}

//游戏数据共享
const gameData = {
  state: {
    curGame: {}, //后台拿回的游戏玩法列表
    NumberBasket: [], //放入到号码蓝中的号码
    selectedNum: [], //当前选择的号码
    curRate: { //游戏比率
      rate: 1,
      ratio: 1
    },
    indexGameData: {}, // offcialOtherGame/index 获取当前游戏数据
    // idxGameData:{}, // games/index  当前游戏所有的数据 ，包括indexGameData 
    curGameRule: {}, //gameList.json 中当前选择的玩法规则
    gameResultList: {}, //游戏结果列表
    postGameData: {}, //  要传到后台的数据,不包括投注号码
    curPlayList: {}, //当前选中的二级菜单中的游戏数据，在localStorage中也存有一份，这里只是做为方便其他页面watch页保存了一份，和localStorage中是同步的
  },

  mutations: {
    setCurGame(state, params) {
      state.curGame = params
    },

    setNumberBasket(state, params) {
      state.NumberBasket.push(...params)
    },

    clearNumberBasket(state, params) {
      state.NumberBasket = params
    },
    setSelectedNum(state, params) {
      state.selectedNum = params
    },
    setIndexGameData(state, params) {
      state.indexGameData = params
    },
    // setIdxGameData(state, params) {
    // 	state.idxGameData = params
    // },
    setCurGameRule(state, params) {
      state.curGameRule = params
    },


    setCurRate(state, params) {
      state.curRate = params
    },
    setGameResultList(state, params) {
      state.gameResultList = params
    },

    setCurPlayList(state, params) {
      state.curPlayList = params
    },
    setPostGameData(state, params) {
      if (Object.prototype.toString.call(params) !== '[object Object]') {
        throw Error(` params must be a Object !`)
      }
      state.postGameData = Object.assign(state.postGameData, params)
    }
  }
}

export default new Vuex.Store({

  modules: {
    YB,
    userInfo,
    gameData,
    gameDataV2,
    GDV3
  }

})
