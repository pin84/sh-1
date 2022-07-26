<template>
  <view class="rank-a flex">
    <view
      @click="showRank('出码排行')"
      class="title flex align-center justify-center"
    >
      <text class="iconfont icon-fenxiang"></text>
      <text class="margin-left-sm text-bold">出码排行</text>
    </view>
    <view
      @click="showRank('遗漏排行')"
      class="title flex align-center justify-center"
    >
      <text class="iconfont icon-bianji"></text>
      <text class="margin-left-sm text-bold">遗漏排行</text>
    </view>

    <view v-if="isShowRank" class="cu-modal" :class="true ? 'show' : ''">
      <view class="cu-dialog">
        <view class="cu-bar bg-white justify-end">
          <view class="contenta">
            <!-- <select class="select" v-model="curTitle" @change="changeTitle">
              <option
                :value="item"
                :selected="item === curTitle"
                v-for="(item, index) in titleList"
                :key="index"
              >
                {{ item }}
              </option>
            </select> -->

            <view class="uni-list-cell-db">
              <picker
                @change="changeTitle"
                :value="titleIndex"
                :range="titleList"
              >
                <view class="uni-input">{{ titleList[titleIndex] }}</view>
              </picker>

              <text class="iconfont icon-xiangxia"></text>
            </view>
          </view>
          <view class="action" @tap="closeRank"
            ><text class="iconfont icon-cuo text-red"></text
          ></view>
        </view>
        <view class="cona">
          <view class="type flex justify-between">
            <view class="text-white">{{
              curTitle === "出码排行" ? "次数" : "类型"
            }}</view>
            <select class="select" v-model="curType" @change="initData">
              <option
                :value="item.label"
                v-for="(item, index) in typeList"
                :key="index"
              >
                {{ item.label }}
              </option>
            </select>
          </view>
          <view class="list-box">
            <view v-if="curDataList.length" class="list">
              <view
                class="item flex justify-between"
                v-for="(item, idx) in curDataList"
                :key="idx"
              >
                <view>
                  <text class="text-sm">{{ item.name || item.GameName }}</text>
                  <text class="text-red text-sm">@{{ item.itemName }}</text>
                </view>
                <view class="text-sm"
                  >{{ item.count > 300 ? "大于300" : item.count }}期</view
                >
              </view>
            </view>

            <view class="padding" v-else>暂无数据</view>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
import typeObj from "./typeObj";
import idobj from "@/pages/gamesIm/ids.js";
export default {
  data() {
    return {
      titleIndex: 0,
      isShowRank: false,
      curTitle: "出码排行",
      titleList: ["出码排行", "遗漏排行"],
      curType: "",
      typeList: [],
      cishu: ["2期", "3期", "4期", "5期", "6期"],

      curDataList: [],
    };
  },
  methods: {
    closeRank() {
      this.isShowRank = false;
    },

    async changeTitle(e) {
      let index = e.target.value
      this.titleIndex = index
      this.curTitle = this.titleList[index]
      await this.initPage();
      this.initData();
    },
    async initData() {
      let routes = getCurrentPages();
      let { id } = routes[routes.length - 1].options;
      id = Number(id);
      let res;
      if (this.curTitle === "出码排行") {
        let d = {
          url: this.$api.chuma,
          data: {
            gameId: id,
            // value:''
          },
        };
        res = await this.$http(d);
      } else {
        let temid;
        for (let [key, value] of Object.entries(idobj)) {
          if (value.includes(Number(id))) {
            temid = key;
            break;
          }
        }

        let value = typeObj[temid].find((item) => item.label == this.curType)
          .value;

        let d = {
          url: this.$api.yilou,
          data: {
            gameId: id,
            partialName: value,
          },
        };
        res = await this.$http(d);
      }
      this.handlerData(res.data);
    },

    handlerData(arr) {
      let list = [];
      if (this.curTitle === "出码排行") {
        let num = Number(this.curType.substring(0, 1));
        list = arr.filter((item) => item.count >= num);
      } else {
        list = arr;
      }
      this.curDataList = list;
    },

    async showRank(text) {
      this.curTitle = text;
      await this.initPage();
      this.initData();
      this.isShowRank = true;
    },

    initPage() {
      this.typeList = [];
      let routes = getCurrentPages();
      let { id } = routes[routes.length - 1].options;
      id = Number(id);
      if (this.curTitle == "出码排行") {
        this.cishu.forEach((str, idx) => {
          this.typeList.push({
            value: str,
            label: str,
          });
        });
      } else {
        let temid;
        for (let [key, value] of Object.entries(idobj)) {
          if (value.includes(Number(id))) {
            temid = key;
            break;
          }
        }
        this.typeList = typeObj[temid];
      }
      this.curType = this.typeList[0].label;
      return true;
    },
  },
};
</script>


<style lang="scss">
.uni-list-cell-db {
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 26rpx;
  font-weight: 600;
  padding-left: 100rpx ;
  .uni-input {
    padding: 0;
    margin-right: 20rpx;
  }
}
</style>

<style lang="scss" scoped>
.cu-modal {
  z-index: 10;
}
.title {
  width: 100%;
  padding: 15rpx 0;
  .iconfont {
    color: #b62929;
  }
}

.contenta {
  width: 100%;
  box-sizing: border-box;
  .select {
    padding: 10rpx;
    box-sizing: border-box;
    transform: translateX(50rpx);
    border: none;
    outline: none;
    height: 100rpx;
    font-size: 40rpx;
  }
}
.cona {
  .type {
    padding: 15rpx 20rpx;
    background-color: #b62929;
    .select {
      width: 200rpx;
      border: none;
      outline: none;
      border-radius: 5rpx;
      background-color: rgba(255, 255, 255, 0.6);
      padding: 0 10rpx;
    }
  }
  .list-box {
    height: 60vh;
    .list {
      overflow: scroll;
      .item {
        width: 100%;
        padding: 5rpx 20rpx;
      }
    }
  }
}
</style>
