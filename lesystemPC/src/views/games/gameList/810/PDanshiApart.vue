<template>
  <div class="dashi">
    <div class="main-body">
      <div style="margin-bottom:10px;">
        <PositionList @toggleCheck="toggleCheck" :limitLen="limitLen" />
      </div>
      <div style="display:flex;">
        <textarea v-model="text" @input="inputText" id="textarea" cols="30" rows="10"></textarea>

        <div class="btn-box">
          <span @click="deleteRepeat(false)">
            <el-button class="btn" type="warning">删除重复号</el-button>
          </span>
          <span>
            <el-button class="btn" type="warning">导入文件</el-button>
          </span>
          <span @click="clearText">
            <el-button class="btn" type="warning">清空</el-button>
          </span>
        </div>
      </div>
    </div>

    <div class="tips">
      程序会自动过滤掉不合法的号码。您也可以点击
      <strong>"删除重复号"</strong>
      按钮对输入内容进行格式化。
    </div>
  </div>
</template>
<script>
import PositionList from "@/views/games/components/PositionList";
export default {
  props: {
    config: {
      type: Object,
      defaule: () => {},
    },
  },
  data() {
    return {
      rateObj: {},
      radix: 2,
      text: "",
      limitLen: 2, //位置长度限制
      hd: {}, //处理后的数据
      randomArr: [],
      positionArr: [],
      selectLen:0,
      positionArrLength:1,
      handlerArr:[],
    };
  },
  components: {
    PositionList,
  },

  watch: {
    "$store.state.gd.footRate": {
      handler: function (val) {
        this.rateObj = val;
        if (this.text == "") return;
        this.inputText();
      },
      deep: true,
    },
    "$store.state.gd.addRandom": {
      handler: function (val) {
        this.addRandom(val);
      },
      deep: true,
    },
    "$store.state.gd.addToBasket": function (val) {
      this.addToBasket();
    },
    "$store.state.gd.toBuy": function (val) {
      this.toBuy();
    },
  },

  created() {
    this.initData();


  },

  methods: {
    toggleCheck(arr) {
      this.positionArr = arr;
      this.positionArrLength = arr.length
      this.selectLen = this.positionArrLength * this.handlerArr.length
      this.handlerMoney()
      console.log(arr.length);
    },
    addRandom(val) {
      let { n } = val;
      let obj = this.config.addRandom(n, this.randomArr);
      obj.forEach(item=>{
        item.num = 1
        item.money = item.times * item.radix * item.moneyMode;
      })

      this.$store.commit("basketList", obj);
      this.$store.commit("footMoney", {});
    },
    async toBuy() {
      await this.addToBasket();
      let ts = new Date().getTime();
      this.$store.commit("toBuyNext", ts);
    },
    async addToBasket() {
      let flag = await this.deleteRepeat(true);
      if (!flag) return;
      let { handlerArr } = this.hd;
      let obj = this.config.addToBasket(
        handlerArr,
        this.positionArr,
        this.randomArr
      );
      this.$store.commit("basketList", obj);
      this.$store.commit("footMoney", {});
      this.clearText();
    },

    async deleteRepeat(isShowCancel = false) {
      if (this.text == "") {
        this.$gutils.confirm({ text: "您还没有输入号码" });
        return;
      }
      let { handlerArr, repeatEl, spliceEl } = this.hd;

      let flag = await this.tips(repeatEl, spliceEl, isShowCancel);

      if (isShowCancel) {
        if (!flag) return false;
      }

      this.text = handlerArr.join("|").replace(/\,/g, "").replace(/\|/g, ",");
      return true;
    },

    async tips(repeatEl, spliceEl, showCancelButton = false) {
      let rlen = repeatEl.length;
      let slen = spliceEl.length;
      let sign = ",";
      if (rlen == 0 || slen == 0) {
        sign = "";
      }
      let text = `已经为您过滤了${rlen}个重复号，1个无效号，过滤内容为：${repeatEl}${sign}${spliceEl}`;

      let flag = false;
      if (rlen == 0 && slen == 0) {
        text = `没有重复号码`;
        flag = true;
      }

      let res = true;
      if (showCancelButton && flag) {
        return res;
      }
      res = await this.$gutils.confirm({ text, showCancelButton });

      return res;
    },

    initData() {
      let { C } = this.$store.state.gd.curGame;
      this.randomArr = C;
      let { radix } = this.$store.state.gd.indexGameData;
      let { mode, times } = this.$store.state.gd.footRate;
      this.radix = radix;
      this.mode = mode;
      this.times = times;
      let rateObj = this.$store.state.gd.footRate;
      this.rateObj = rateObj;

      let { limitLen } = this.config;
      this.limitLen = limitLen 
    },
    inputText() {
      this.hd = this.config.dataHandler(this.text);
      let { handlerArr } = this.hd;
      this.handlerArr = handlerArr
      let len = handlerArr.length * this.positionArrLength 
      this.selectLen = len 
      if (len) {
        // let { times, mode } = this.rateObj;
        // let money = this.$BDH.setNumDecimal(len * this.radix * times * mode);
        // this.$store.commit("footMoney", { num: len, money });
        this.handlerMoney()
      }
    },


    handlerMoney(){
       let { times, mode } = this.rateObj;
        let money = this.$BDH.setNumDecimal(this.selectLen  * this.radix * times * mode  );
        this.$store.commit("footMoney", { num: this.selectLen , money });
    },

    clearText() {
      this.text = "";
      this.$store.commit("footMoney", {});
    },
  },
};
</script>
<style lang="scss" scoped>
.dashi {
  .main-body {
    #textarea {
      width: 100%;
      resize: none;
      border: 1px solid #ccc;
      outline: none;
      border-radius: 10px;
      padding: 10px;
    }
    .btn-box {
      flex: 0 0 240px;
      display: flex;
      align-items: center;
      flex-direction: column;
      justify-content: space-around;
      .btn {
        width: 200px;
        font-size: 20px;
      }
    }
  }
  .tips {
    margin-top: 5px;
  }
}
</style>