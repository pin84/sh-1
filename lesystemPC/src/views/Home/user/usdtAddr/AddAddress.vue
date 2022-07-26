<template>
  <div class="add-addr">
    <ul class="list">
      <li class="item" v-for="(item, index) in tableData" :key="index">
        <span class="label">{{ item.label }}：</span>
        <el-select
          class="input-1"
          v-if="index == 0"
          @change="changeSelect(item)"
          v-model="value"
          placeholder="请选择"
        >
          <el-option
            v-for="elItem in options"
            :key="elItem"
            :label="elItem"
            :value="elItem"
          >
          </el-option>
        </el-select>
        <input
          v-else
          :placeholder="item.placeholder"
          class="input"
          v-model="item.inputText"
          type="text"
        />

        <span class="remarks">{{ item.remarks }}</span>
      </li>
    </ul>

    <div class="btn-box">
      <el-button type="danger" @click="submit">提交</el-button>
      <el-button type="danger" @click="reset">重置</el-button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tableData: [
        // {
        //   label: "USDT地址",
        //   remarks:
        //     "备注：增加USDT地址需提供最近一次绑定的使用中的USDT地址信息！",
        // },
        {
          label: "主网协议",
          remarks:
            "*提示：主网协议必须跟提现钱包或者交易所的协议一致！否则无法到账！",
        },

        {
          label: "地址",
          placeholder: "钱包或交易所的充值地址",
        },
        {
          label: "备注",
          placeholder: "关于此地址的一些备注,便于区分",
        },
      ],

      options: ["aa", "bb"],
      value: "请选择主网协议",
    };
  },

  created() {
    this.initPage();
    this.initData();
  },

  methods: {
    async submit() {
      for (let obj of this.tableData) {
        if (obj.inputText == "" && obj.label != "USDT地址") {
          this.$gutils.confirm({
            text: `请把${obj.label}的信息补充完整`,
          });
          return
        }
      }

      let d = {
        bankId: this.value,
        address: this.tableData[1].inputText,
        remark: this.tableData[2].inputText,
      };
      console.log(d);
      let res = await this.$post(this.$gapi.usdtAddressAdd, d);
      let { code, message } = res;

      this.$gutils.confirm({
        text: message,
      });

      if (code > 0) {
        this.reset();
        this.$router.push("/user/usdtAddr");
      }
    },
    changeSelect(obj) {
      obj.inputText = this.value;

      this.tableData.push({});
      this.tableData.pop();
    },
    async initData() {
      let res = await this.$get(this.$gapi.getUsdtProtocol);
      let arr = Object.values(res);
      arr.unshift("请选择主网协议");
      this.options = arr;
    },
    initPage() {
      this.tableData.forEach((item) => {
        item.inputText = "";
      });
    },

    reset() {
      this.tableData.forEach((item) => {
        item.inputText = "";
      });
      this.value = "请选择主网协议";
      this.tableData.push({});
      this.tableData.pop();
    },
  },
};
</script>

<style lang="scss" scoped>
$w: 250px;
.add-addr {
  background-color: #fff;
  font-size: 14px;
  padding: 20px 0;
  .list {
    .item {
      border-bottom: 1px solid #ccc;
      padding: 8px 0 8px 120px;
      .label {
        display: inline-block;
        width: 80px;
        text-align: right;
      }
      .input {
        width: $w;
        height: 32px;
        padding: 0 10px;
        outline: none;
        border-radius: 3px;
        border: 1px solid rgb(220, 223, 230);
        box-sizing: border-box;
        font-size: 12px;
      }
      .input-1 {
        width: $w;
      }
      .remarks {
        margin-left: 10px;
        color: red;
      }
    }
  }
  .btn-box {
    display: flex;
    margin-top: 20px;
    justify-content: center;
  }
}
</style>