<template>
  <view>
    <scroll-view scroll-x class="bg-white solid-top nav text-center padding-xs">
      <view
        class="cu-item radius-left-lg"
        :class="1 == gameTypeTabCur ? 'text-green cur' : 'uncur'"
        @tap="gameTypeTabSelect"
        data-id="1"
      >
        <text class="iconfont icon-guanfang margin-right-xs"></text>
        官方
      </view>
      <view
        class="cu-item radius-right-lg"
        :class="0 == gameTypeTabCur ? 'text-green cur' : 'uncur'"
        @tap="gameTypeTabSelect"
        data-id="0"
      >
        <text class="iconfont icon-xin margin-right-xs"></text>
        信用
      </view>
    </scroll-view>
    <view class="VerticalBox">
      <scroll-view
        class="VerticalNav nav"
        scroll-y
        scroll-with-animation
        :scroll-top="verticalNavTop"
        style="height: calc(100vh - 375upx)"
      >
        <view
          class="cu-item"
          :class="index == tabCur ? 'text-green cur' : ''"
          v-for="(item, index) in list"
          :key="index"
          @tap="TabSelect"
          :data-id="index"
        >
          {{ item.categoryName }}
        </view>
      </scroll-view>
      <scroll-view
        class="VerticalMain"
        scroll-y
        scroll-with-animation
        style="height: calc(100vh - 375upx)"
        :scroll-into-view="'main-' + mainCur"
        @scroll="VerticalMain"
      >
        <view
          class="padding-top padding-lr"
          v-for="(item, index) in list"
          :key="index"
          :id="'main-' + index"
        >
          <view class="cu-bar solid-bottom bg-white">
            <view class="action">
              <text class="cuIcon-title text-green"></text>
              {{ item.categoryName }}
            </view>
          </view>
          <view class="cu-list menu-avatar">
            <view
              @click="toGame(subitem)"
              class="cu-item"
              v-for="(subitem, subindex) in item.gameInfoList"
              :key="subindex"
            >
              <view
                class="cu-avatar round lg"
                :style="{
                  'background-image': 'url(' + subitem.mobileIconUrl + ')',
                }"
              >
                <view class="cu-tag badge" v-show="1 == subitem.hot">hot</view>
              </view>
              <view class="content">
                <view class="text-grey">{{ subitem.gameName }}</view>
              </view>
              <view class="action"
                ><view class="text-grey text-xs"></view
              ></view>
            </view>
          </view>
        </view>
      </scroll-view>
    </view>
  </view>
</template>

<script>
import http from "common/js/http.js";
export default {
  mixins: [http],
  data() {
    return {
      gameTypeTabCur: 1,
      list: [],
      xinyongGameList: [],
      guanfangGameList: [],
      tabCur: 0,
      mainCur: 0,
      verticalNavTop: 0,
      load: true,
    };
  },
  onLoad() {
    uni.showLoading({
      title: "加载中...",
      mask: true,
    });
    this.initGameList();
    // let list = [{}];
    // for (let i = 0; i < 26; i++) {
    // 	list[i] = {};
    // 	list[i].name = String.fromCharCode(65 + i);
    // 	list[i].id = i;
    // }
    // this.list = list;
    // this.listCur = list[0];
  },
  onReady() {
    uni.hideLoading();
  },
  methods: {
    toGame(game) {
      this.$buyDataHandler.changeGame(game);
    },

    initGameList() {
      this.sendRequest({
        url: "System.HomePage.getCpGameList",
        success: (res) => {

          console.log(res);
          if (res.code === 0) {
            this.guanfangGameList = res.data[1].gameCateList;
            this.xinyongGameList = res.data[0].gameCateList;
            //console.log(this.guanfangGameList);
            //console.log(this.xinyongGameList);
            if (this.gameTypeTabCur == 1) {
              this.list = this.guanfangGameList;
            } else {
              this.list = this.xinyongGameList;
            }

            // for (let i = 0; i < this.list.length; i++) {
            // 	this.list[i].id = i;
            // }

            this.listCur = this.list[0];
          }
        },
      });
    },
    gameTypeTabSelect(e) {
      this.gameTypeTabCur = e.currentTarget.dataset.id;
      if (this.gameTypeTabCur == 1) {
        this.list = this.guanfangGameList;
      } else {
        this.list = this.xinyongGameList;
      }
      this.listCur = this.list[0];
    },
    TabSelect(e) {
      this.tabCur = e.currentTarget.dataset.id;
      this.mainCur = e.currentTarget.dataset.id;
      this.verticalNavTop = (e.currentTarget.dataset.id - 1) * 50;
    },
    VerticalMain(e) {
      let that = this;
      let tabHeight = 0;
      if (this.load) {
        for (let i = 0; i < this.list.length; i++) {
          let view = uni.createSelectorQuery().select("#main-" + i);
          //console.log(this.list[i].id);
          view
            .fields(
              {
                size: true,
              },
              (data) => {
                this.list[i].top = tabHeight;
                tabHeight = tabHeight + data.height;
                this.list[i].bottom = tabHeight;
              }
            )
            .exec();
        }
        this.load = false;
      }
      let scrollTop = e.detail.scrollTop + 10;
      for (let i = 0; i < this.list.length; i++) {
        if (scrollTop > this.list[i].top && scrollTop < this.list[i].bottom) {
          this.verticalNavTop = (i - 1) * 50;
          this.tabCur = i;
          //console.log(scrollTop)
          return false;
        }
      }
    },
  },
};
</script>

<style>
.cur {
  background-color: #166bd8;
  color: #fff;
}
.VerticalNav .cur {
  color: #e47708;
  line-height: 50px;
}
.uncur {
  background-color: #f0f0f0;
}
.nav .cu-item {
  margin: 6px 0px;
  padding: 0px 50rpx;
}
.nav .cu-item.cur {
  border-bottom: none;
}

.fixed {
  position: fixed;
  z-index: 99;
}

.VerticalNav.nav {
  width: 200upx;
  white-space: initial;
}

.VerticalNav.nav .cu-item {
  width: 100%;
  text-align: center;
  background-color: #fff;
  margin: 0;
  border: none;
  height: 50px;
  position: relative;
}

.VerticalNav.nav .cu-item.cur {
  background-color: #f1f1f1;
}

.VerticalNav.nav .cu-item.cur::after {
  content: "";
  width: 8upx;
  height: 30upx;
  border-radius: 10upx 0 0 10upx;
  position: absolute;
  background-color: currentColor;
  top: 0;
  right: 0upx;
  bottom: 0;
  color: #e47708;
  margin: auto;
}

.VerticalBox {
  display: flex;
}

.VerticalMain {
  background-color: #f1f1f1;
  flex: 1;
}
</style>
