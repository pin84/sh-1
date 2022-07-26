<template>
  <div class="dashi">
    <div class="main-body">
      <textarea
        v-model="text"
        @input="inputText"
        id="textarea"
        cols="30"
        rows="12"
      ></textarea>

      <div class="btn-box">
        <span @click="deleteRepeat(false)">
          <el-button class="btn" type="warning">删除重复号</el-button>
        </span>
        <span>
          <label class="label pointer" for="input-file">导入文件</label>
          <input
            @change="inputFile"
            type="file"
            id="input-file"
            style="display: none"
            multiple="multiple"
          />
          <!-- <el-button class="btn" type="warning" @click="inputFile">导入文件</el-button> -->
        </span>
        <span @click="clearText">
          <el-button class="btn" type="warning">清空</el-button>
        </span>
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
import Tips from "@/views/games/components/tips";
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
      lenLimit: 5,
      hd: {}, //处理后的数据
    };
  },
  components: {
    Tips,
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
    async inputFile() {
      let res = await this.$BDH.inputFile();
      this.text = res;
      this.inputText();
    },

    addRandom(val) {
      let { n } = val;
      let objArr = [];
      while (n--) {
        let obj = this.config.addRandom(n);
        obj.money = obj.times * obj.radix * obj.moneyMode;
        obj.num = 1;
        objArr.push(obj);
      }

      this.$store.commit("basketList", objArr);
      this.$store.commit("footMoney", {});
    },
    async toBuy() {
      let flag = await this.addToBasket();
      if (!flag) return;

      let ts = new Date().getTime();
      this.$store.commit("toBuyNext", ts);
    },
    async addToBasket() {
      // let flag = await this.deleteRepeat(true);
      // if (!flag) return;

      let { handlerArr, repeatEl, spliceEl } = this.hd;
      let flag = await this.tips(repeatEl, spliceEl, true);
      if (!flag) {
        return;
      }
      let obj = this.config.addToBasket(handlerArr);

      this.$store.commit("basketList", obj);
      this.$store.commit("footMoney", {});

      this.clearText();
      return true;
    },

    async deleteRepeat(isShowCancel = false) {
      if (this.text == "") {
        this.$gutils.confirm({ text: "您还没有输入号码" });
        return;
      }
      let { handlerArr, repeatEl, spliceEl } = this.hd;


      let flag = await this.tips(repeatEl, spliceEl, isShowCancel);

      this.hd.repeatEl = [];
      this.hd.spliceEl = [];

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
      let { radix } = this.$store.state.gd.indexGameData;
      let { mode, times } = this.$store.state.gd.footRate;
      this.radix = radix;
      this.mode = mode;
      this.times = times;
      let rateObj = this.$store.state.gd.footRate;
      this.rateObj = rateObj;

      let { lenLimit } = this.config;
      this.lenLimit = lenLimit;
    },
    inputText() {
      this.hd = this.config.dataHandler(this.text);

      let { handlerArr } = this.hd;
      let len = handlerArr.length;
      if (len) {
        let { times, mode } = this.rateObj;
        let money = this.$BDH.setNumDecimal(len * this.radix * times * mode);
        this.$store.commit("footMoney", { num: len, money });
      }
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
  // display: flex;
  .main-body {
    display: flex;
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
      .label {
        display: inline-block;
        width: 200px;
        height: 40px;
        line-height: 40px;
        border-radius: 3px;
        font-size: 20px;
        color: #fff;
        background-color: #e6a23c;
        text-align: center;
        &:hover {
          background-color: #ebb563;
        }
      }
    }
  }
  .tips {
    margin-top: 5px;
    font-size: 14px;
  }
}
</style>