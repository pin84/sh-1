<template>
  <div class="zhenghe">
    <div class="top-box">
      <ul class="title-list" v-for="n in 5" :key="n">
        <li
          v-for="(title, idx) in bettingType"
          class="title-item"
          :class="[
            { f: idx == 0 },
            { border: idx == 1 || idx == 2 },
            { w: idx == 2 },
          ]"
          :key="idx"
        >
          {{ title }}
        </li>
      </ul>
    </div>
    <div class="content">
      <div v-for="(item, index) in list" :key="index">
        <div class="title">{{ item.N }}</div>
        <ZhengHeList :list="item.C" />
      </div>
    </div>
  </div>
</template>
<script>
import ZhengHeList from "@/views/games/components/list/Cr_list";
export default {
  data() {
    return {
      commonMoney: "",
      isShowInput: true,
      curIndex: 0,
      lenLimit: 5,
      selectedArr: [],
      rateObj: { times: 1, mode: 1 },
      listCache: [],
      list: [],
      titleList: ["三军", "全骰、围骰", "短牌", "点数", "长牌"],
      titleList1: ["前三", "中三", "后三"],
      bettingType: ["号码", "赔率", "金额"],
    };
  },

  components: {
    ZhengHeList,
    // Input,
    // Tips
  },

  watch: {
    "$store.state.gd.addToBasket": function () {
      this.addToBasket();
    },
    "$store.state.gd.bettingType": {
      handler: function (val) {
        if (val == 0) {
          this.isShowInput = true;
        } else {
          this.isShowInput = false;
        }
      },
      deep: true,
    },
    "$store.state.gd.footOdds": {
      handler: function (val) {
        this.changeOdds(val);
      },
      deep: true,
    },
  },

  created() {
    this.initData();
  },

  methods: {
    // changeBettingType(val) {
    //   if (val == 0) {
    //     this.isShowInput = true;
    //     this.bettingType = ["号码", "赔率", "金额"];
    //   } else {
    //     this.isShowInput = false;
    //     this.bettingType = ["号码", "赔率"];
    //   }
    // },
    inputValue(n) {
      this.commonMoney = n;
    },


    initData() {
      // let type = this.$store.state.gd.bettingType;
      // this.changeBettingType(type);

      let arr = JSON.parse(JSON.stringify(this.$store.state.gd.curGame.C))
      let { percentage } = this.$store.state.gd.footOdds;

      let obj1 = {
        N:'三军',
        C:[],
        ids:[899,902,907]
      }
      let obj2 = {
        N:"全骰,围骰",
        C:[],
        ids:[900,901]
      }

      let exids = [899,902,907,900,901]
      let list = []

        let arr1 = arr.filter(item=>obj1.ids.includes(item.Id))
        let arr2 = arr.filter(item=>obj2.ids.includes(item.Id))
        let arr3 = arr.filter(item=>!exids.includes(item.Id))

        arr1.forEach(item=>{
          obj1.C.push(...item.C)
        })
        arr2.forEach(item=>{
          obj2.C.push(...item.C)
        })

        list.push(obj1,obj2,...arr3)


      list.forEach((item) => {
        item.C.forEach((obj) => {
          obj.odds = obj.MxO - (obj.MxO - obj.MiO) * percentage;
          if (obj.N > 7 || !Number(obj.N)) {
            obj.showPoint = true;
          }

          if(item.N == '短牌' && !Array.isArray(obj.N)){
            obj.N = obj.N.split('')
          }
          obj.N1 = item.N
        });
      });

      this.list = list;
    },

    changeOdds(val) {
      let { percentage } = val;

      this.list.forEach((obj) => {
        obj.C.forEach((item) => {
          item.odds = this.$BDH.setNumDecimal(
            item.MxO - (item.MxO - item.MiO) * percentage,
            3
          );
        });

        obj.C.push({});
        obj.C.pop();
      });
    },

    // toBuy() {
    //   this.addToBasket();
    //   let ts = new Date().getTime();
    //   this.$store.commit("toBuyNext", ts);
    // },

    addToBasket() {
      let commonMoney = this.$store.state.gd.inputMoney;

      if (!this.isShowInput && commonMoney == "") {
        this.$gutils.confirm({ text: "请填写下注金额" });
        return;
      }

      let tem = [];
      this.list.forEach(obj => {
        obj.C.forEach((item) => {
          if (item.active || item.money) {
            if (!this.isShowInput) {
              item.money = commonMoney;
            }
            tem.push(item);
          }
        });
      });

      if (tem.length == 0) {
        this.$gutils.confirm({ text: "请选择号码" });
        return;
      }

      let ts = new Date().getTime();
      // this.$store.commit("clearSelect", ts);  //购买成功后再清除。共用一个Object,提前清除数据也会跟着清除
      this.$store.commit("basketList", tem);

      setTimeout(() => {
        this.$store.commit("showCreditBasket", ts);
      }, 100);
    },
  },
};
</script>
<style lang="scss" scoped>
.zhenghe {
  height: 100%;
  .top-box {
    display: flex;
    .title-list {
      display: flex;
      background-color: #f0f0f0;
      padding: 10px 5px;
      box-sizing: border-box;
      width: 20%;
      font-size: 13px;
      .title-item {
        width: 33.3%;
        text-align: center;
      }

      .border {
        border-left: 1px solid gray;
      }
    }
  }

  .content {
    // border: 1px solid red;
    .title {
      background-color: #cf271e;
      color: #fff;
      text-align: center;
      font-size: 12px;
      padding: 5px 0;
    }
  }

  // .list {
  //   width: 100%;
  //   display: flex;
  //   justify-content: space-between;
  //   .item {
  //     width: 100%;
  //     .name {
  //       border-right: 1px solid #fff;
  //       color: #fff;
  //       background-color: #cf271e;
  //       padding: 6px 0;
  //       text-align: center;
  //       font-size: 14px;
  //     }
  //     .bcy {
  //       background-color: #f69c11;
  //     }
  //   }
  // }
  // .list2 {
  //   display: flex;
  // }
  // .btn-box {
  //   display: flex;
  //   align-items: center;
  //   justify-content: center;
  //   width: 50%;
  //   margin: 10px auto;
  //   .input-box {
  //     width: 80px;
  //     margin-right: 5px;
  //   }
  //   .btn {
  //     width: 65px;
  //   }
  // }
}
</style>