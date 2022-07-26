<template>
  <div class="add-reducea">
    <i class="iconfont icon-jian pointer" @click="addReduce('0')"></i>
    <div class="input-box">
      <input
        @click="isShowList = !isShowList"
        class="input"
        v-model="num"
        @input="inputText"
      />
      <ul class="list" v-if="isShowList">
        <li @click="selectNum(num)" v-for="(num, idx) in list" :key="idx">
          {{ num }}
        </li>
      </ul>
    </div>

    <i class="iconfont icon-tianjia pointer" @click="addReduce('1')"></i>
  </div>
</template>

<script>
export default {
  props: {
    ratio: {
      type: Number,
      default: () => 1,
    },
  },
  data() {
    return {
      num: 1,
      isShowList: false,
      list: [1, 5, 10, 15, 20, 50, 100, 200, 500, 1000, 2000],
    };
  },

  created() {
    this.num = this.ratio;
  },

  methods: {
    selectNum(num) {
      this.num = num;
      this.isShowList = false;
      this.$emit("addReduce", this.num);
    },
    inputText() {
      let val = this.num;
      if (val.indexOf(".") != -1) {
        val = val.replace(".", "");
      }
      if (!val) {
        val = 1;
      }
      this.isShowList = false;
      this.num = val;
      this.$emit("addReduce", this.num);
    },
    addReduce(type) {
      if (type === "0") {
        if (this.num == 1) {
          return;
        }
        this.num--;
      }

      if (type === "1") {
        this.num++;
      }
      this.isShowList = false;
      this.$emit("addReduce", this.num);
    },
  },
};
</script>

<style lang="scss" scoped>
$height: 26px;
.add-reducea {
  // width: 100px;
  height: $height;
  display: flex;
  align-items: center;
  border: 1px solid gray;
  .input-box {
    position: relative;
    .list {
      position: absolute;
      width: 100%;
      bottom:  24px;
      background-color: #fff;
      text-align: center;
      border: 1px solid #ccc;
      li {
        border-bottom: 1px solid #ccc;
        padding: 3px 0;
      }
    }
    .input {
      width: 100%;
      border: none;
      outline: none;
      padding: 1px 5px;
      text-align: center;
      box-sizing: border-box;
    }
  }

  .iconfont {
    flex: 0 0 22px;
    // font-size: 18px;
    color: #929292;
    text-align: center;
  }
  .icon-jian {
    border-right: 1px solid gray;
  }
  .icon-tianjia {
    border-left: 1px solid gray;
  }
}
</style>
