<template>
  <view class="play" v-if="isDoneData">
    <ListCircleLiuHeCai :list="list1" :limitLen="limetObj[curType]" />
  </view>
</template>


<script>
import ListCircleLiuHeCai from "@/pages/gamesIm/common/list/ListCircleLiuHeCai.vue";
import bgcolor from "./bgcolor";
export default {
  data() {
    return {
      list1: [],
      list2: [],
      curType: "五不中",
      limetObj: {
        五不中: 5,
        六不中: 6,
        七不中: 7,
        八不中: 8,
        九不中: 9,
        十不中: 10,
        十一不中: 11,
        十二不中: 12,
      },
      isDoneData: false,
    };
  },
  components: {
    ListCircleLiuHeCai,
  },
  watch: {
    "$store.state.GDV3.officialRate": {
      handler: function (val) {
        this.changeRate(val);
      },
      deep: true,
    },

    "$store.state.GDV3.v3AddRandom": {
      handler: function (val) {
        this.addToBasketRandom(val);
      },
      deep: true,
    },
    "$store.state.GDV3.addToBasket": {
      handler: function (val) {
        this.addToBasket();
      },
      deep: true,
    },
    "$store.state.GDV3.v3ToBuy": function (val) {
      this.v3ToBuy();
    },
    "$store.state.GDV3.temValue": function (val) {
      this.curType = val;
      this.initData('1');
    },
  },

  created() {
    this.initData();
  },

  methods: {
    addToBasketRandom(val) {
      let { n } = val;
      let randomArr = [];
      randomArr.push(...this.list1, ...this.list2);
      this.$buyOptions.addToBasketRandomCredit(randomArr, n);
    },
    async v3ToBuy() {
      let flag = await this.addToBasket(false);
      if (!flag) return;
      //触发购买的方法，在@/pages/gamesIm/gameList/index.vue里监听
      let ts = new Date().getTime();
      this.$store.commit("v3ToBuyNext", ts);
    },

    addToBasket(isShowBasket = true) {
      let selectArr = [];
      let idList = [];
      let nameList = [];
      let money = this.$store.state.GDV3.v3InputMoney;
      this.list1.forEach((item) => {
        if (item.active) {
          item.money = money;
          selectArr.push(item);
          idList.push(item.I);
          nameList.push(item.N);
        }
      });

      let basketArr = this.$store.state.GDV3.numBasket;

      let len = selectArr.length;
      if (len < this.limetObj[this.curType] && basketArr.length == 0) {
        this.$util.showConfirm({
          content: `必须勾选${this.limetObj[this.curType]}个号码`,
          showCancel: false,
        });
        return;
      }

      if (len == 0 && basketArr.length === 0) {
        this.$util.showConfirm({
          content: "您还没有勾选",
          showCancel: false,
        });
        return;
      }

      if (len == this.limetObj[this.curType]) {
        let obj = selectArr[0];

        if (obj) {
          let cobj = JSON.parse(JSON.stringify(obj));
          cobj["goal"] = idList.join(",");
          cobj.N = nameList.join(",");
          this.$store.commit("v3NumBasket", cobj);
        }
      }

      if (isShowBasket) {
        this.$store.commit("v3IsShowNumBaket", true);
      }
      this.$store.commit("v3ClearSelected", new Date().getTime());

      return true;
    },

    changeRate(val) {
      let { percentage } = val;
      this.$buyOptions.changeRateOption(this.list1, percentage);
      this.$buyOptions.changeRateOption(this.list2, percentage);
    },

    initData(type) {
      console.log(this.curType);
      this.isDoneData = false;
      let { percentage, selectBack } = this.$store.state.GDV3.officialRate;

      let arr = this.$store.state.GDV3.v3CurGame.C;
      arr.sort((a, b) => a.Id - b.Id);
      if(!type){
        this.curType = arr[0].N;
      }

      let curObj = arr.find((obj) => obj.N == this.curType);
      let list = JSON.parse(JSON.stringify(curObj.C));

      list.sort((a, b) => a.N - b.N);

      list.forEach((item) => {
        item.N1 = curObj.N;
        item.odds = this.$buyDataHandler.setNumDecimal(
          item.MxO - (item.MxO - item.MiO) * percentage,
          3
        );

        for (let [key, value] of Object.entries(bgcolor)) {
          if (value.includes(Number(item.N))) {
            item.bc = key;
            break;
          }
        }
      });

      this.list1 = list;
      setTimeout(() => {
        this.isDoneData = true;
      });
    },
  },
};
</script>

