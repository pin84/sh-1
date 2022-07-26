import store from '@/store/index'
import util from '@/common/js/util'
import buyDataHandler from '@/common/js/buyDataHandler'


export default {

  filteActive: (arr) => {
    let list = []
    arr.forEach(item => {
      if (item.active) {
        list.push(item)
      }
    })
    return list
  },

  addToBasket: ({
    selectArr = [],
    isShowBasket = true
  } = {}) => {
    let basketArr = store.state.GDV3.numBasket;
    if (selectArr.length === 0 && basketArr.length === 0) {
      util.showConfirm({
        content: '您还没有勾选',
        showCancel: false
      });
      return false
    }
    let money = store.state.GDV3.v3InputMoney;

    let ts = new Date().getTime()

    selectArr.forEach(item => {
      item.money = money;
      item.ts = ts
      store.commit('v3NumBasket', item);
    });
    if (isShowBasket) {
      store.commit('v3IsShowNumBaket', true);
    }
    store.commit('v3ClearSelected', new Date().getTime());
    store.commit("v3IsHasSelected", false);
    return true
  },

  addToBasketRandomCredit: (arr, n) => {
    let len = arr.length - 1
    while (n--) {
      let i = buyDataHandler.createRandomNum(0, len);
      store.commit('v3NumBasket', arr[i]);
    }
    store.commit('v3IsShowNumBaket', true);
  },

  addToBasketRandomCreditLongHuDou: (arr, n) => {
    let len = arr.length - 1
    while (n--) {
      let i = buyDataHandler.createRandomNum(0, len);
      let j = buyDataHandler.createRandomNum(0, 1);
      let obj = arr[i].C[j]
      store.commit('v3NumBasket', obj);
    }
    store.commit('v3IsShowNumBaket', true);
  },

  changeRateOption(arr, percentage) {
    arr.forEach(item => {
      item.odds = buyDataHandler.setNumDecimal(item.MxO - (item.MxO - item.MiO) * percentage, 3);
    });
    arr.push({});
    arr.pop();
  },

}
