<template>
  <view class="fandian">
    <view>
      <view
        v-show="item.play_type == 0"
        class="cu-form-group"
        v-for="(item, index) in games"
        :key="index"
      >
        <view class="title" style="width: 180rpx">{{ item.name }}</view>
        <input
          v-if="isDisabled"
          :placeholder="item.placeholder"
          v-model="games[index].kickbak"
          type="text"
        />
        <input
          v-else
          :placeholder="item.placeholder"
          v-model="games[index].kickbak"
          disabled
        />
        <button
          v-if="index === 0 && isShowSetAll"
          class="cu-btn bg-green shadow sm"
          style="margin: 0"
          @click="setAllValue"
        >
          一键设置
        </button>
      </view>
    </view>

    <view class="title-box">请先为下级设置第三方游戏返点：</view>
    <view>
      <view
        v-show="item.play_type == 1"
        class="cu-form-group"
        v-for="(item, index) in games"
        :key="index"
      >
        <view class="title" style="width: 180rpx">{{ item.name }}</view>
        <input
          :disabled="item.isDisabled"
          :placeholder="item.placeholder"
          v-model="games[index].kickbak"
          type="text"
        />
        <!-- <input
          v-else
           :disabled='item.isDisabled'
          :placeholder="item.placeholder"
          v-model="games[index].kickbak"
        /> -->
        <button
          v-if="index === 0 && isShowSetAll"
          class="cu-btn bg-green shadow sm"
          style="margin: 0"
          @click="setAllValue"
        >
          一键设置
        </button>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  props: {
    isDisabled: {
      type: Boolean,
      default: function () {
        return true;
      },
    },
    isShowSetAll: {
      type: Boolean,
      default: function () {
        return true;
      },
    },
    games: {
      type: Array,
      default: function () {
        return [
          // {
          // 	kickbak: '',
          // 	name: '11选5',
          // 	placeholder: '可设置返点0.0-9.0'
          // }
        ];
      },
    },
  },

  created() {
    console.log(this.games);
  },

  methods: {
    setAllValue() {
      let v = this.games[0];
      let flag = this.checkV(v, 0, this.games);

      if (!flag) {
        return;
      }

      this.games.forEach((item, index) => {
        if (item.play_type == 0) {
          item.kickbak = v.kickbak;
        }
      });
      this.games.push({});
      this.games.pop();
    },

    checkV(obj, i, checkArr) {
      let v = obj.kickbak;
      let str = `${checkArr[i].name} 奖金组返点只能为数字且最多保留1位小数`;
      if (v === "" || v === null) {
        this.showToast(str);
        return false;
      }
      if (isNaN(v)) {
        this.showToast(str);
        return false;
      }

      if (String(v).split(".")[1] && String(v).split(".")[1].length > 1) {
        this.showToast(str);
        return false;
      }
      if (
        Number(v) > Number(obj.maxKickback) ||
        Number(v) < Number(obj.minKickback)
      ) {
        this.showToast(`${checkArr[i].name} 奖金组返点范围错误`);
        return false;
      }
      return true;
    },

    checkVa(checkV, i, checkArr) {
      let str = `${checkArr[i].name} 奖金组返点只能为数字且最多保留1位小数`;
      let arr = checkV.split("-");
      if (arr.length !== 2) {
        this.showToast(`${checkArr[i].name} 奖金组返点范围错误`);
        return false;
      }

      for (let v of arr) {
        if (v === "" || v === null) {
          this.showToast(str);
          return false;
        }
        if (isNaN(v)) {
          this.showToast(str);
          return false;
        }

        if (String(v).split(".")[1] && String(v).split(".")[1].length > 1) {
          this.showToast(str);
          return false;
        }
        if (Number(v) > 9) {
          this.showToast(`${checkArr[i].name} 奖金组返点范围错误`);
          return false;
        }
      }

      return true;
    },
    showToast(str) {
      this.$util.showToast({
        title: str,
      });
    },
  },
};
</script>
<style lang="scss" scoped>
.title-box {
  border-top: 1px solid #f1f1f1;
  padding: 40rpx 30rpx;
  font-weight: 600;
}
</style>
