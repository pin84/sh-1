<template>
  <view class="invitation-manage">
    <view class="cu-form-group flex bg-gray">
      <view
        v-for="(item, index) in title"
        :key="index"
        class="flex-sub text-center"
        :class="{ 'flex-twice': item === '生成时间' }"
      >
        <text>{{ item }}</text>
      </view>
    </view>

    <view class="padding-xs">
      <view class="flex list">
        <view
          v-for="(item, index) in codes"
          :key="index"
          class="item flex-sub text-center flex justify-around"
          style="width: 100%"
        >
          <view
            class="flex-sub flex justify-center align-center"
            @click="showModel(item)"
          >
            <text class="text-blue text-sx">{{ item.invitationCode }}</text>
          </view>

          <view class="flex-twice flex justify-center align-center">
            <text class="text-sx" style="line-height: 36rpx">{{
              item.add_time
            }}</text>
          </view>
          <view class="flex-sub flex justify-center align-center">
            <text>{{ item.customerValue }}</text>
          </view>
        </view>
      </view>
    </view>

    <view class="padding-xs flex flex-direction">
      <view v-if="isShowedAll" class="text-center"
        ><text class="text-sm text-blue">已全部显示~</text></view
      >
      <button
        v-if="isShowPrePageBtn"
        class="cu-btn bg-red margin-tb-sm lg"
        @tap="prePage"
      >
        上一页
      </button>
      <view class="margin-top-sm"></view>
      <button
        v-if="isShowLoadMoreBtn"
        class="cu-btn bg-red margin-tb-sm lg"
        @tap="loadMore"
      >
        加载更多
      </button>
    </view>

    <view
      class="cu-modal bottom-modal"
      :class="isShowModel ? 'show' : ''"
      @click.self="hideModal"
    >
      <view class="cu-dialog" v-if="!isShowFandian">
        <view class="cu-bar bg-white">
          <view class="action text-green"></view>
          <view class="action text-blue" @tap="hideModal"
            ><i class="iconfont icon-iconclose"></i
          ></view>
        </view>
        <view
          class="padding-xl flex"
          style="flex-direction: column; padding: 5px 0"
        >
          <text
            @click="invitationOption(item)"
            v-for="(item, index) in invitationOptions"
            :key="index"
            style="border-bottom: 1px solid #f1f1f1"
            >{{ item }}</text
          >
        </view>
      </view>
    </view>

    <view class="cu-modal" :class="isShowQrCode ? 'show' : ''">
      <view class="cu-dialog">
        <view
          class="bg-img"
          :style="{
            backgroundImage: 'url(' + qrCodeUrl + ')',
            backgroundSize: 'contain',
            height: '600rpx',
          }"
        >
          <view class="cu-bar justify-end text-white">
            <view class="action" @tap="hideModal"
              ><text class="cuIcon-close"></text
            ></view>
          </view>
        </view>
        <view class="cu-bar bg-white"
          ><view
            class="action margin-0 flex-sub solid-left"
            @tap="isShowQrCode = false"
            >关闭</view
          ></view
        >
      </view>
    </view>

    <view
      class="cu-modal bottom-modal"
      :class="isShowFandian ? 'show' : ''"
      @click.self="isShowFandian = false"
    >
      <view class="cu-dialog">
        <view class="cu-form-group margin-top bg-gray" style="padding: 0 30rpx">
          <view class="title">返点详情</view>
          <i class="iconfont icon-iconclose" @click="isShowFandian = false"></i>
        </view>
        <view style="height: 60vh; overflow: scroll"
          ><Fandian :games="fandian" :isShowSetAll="false" :isDisabled="false"
        /></view>
      </view>
    </view>

    <view class="cu-modal" :class="isShowDeleteModal ? 'show' : ''">
      <view class="cu-dialog">
        <view class="padding-xl">确定要删除吗？</view>
        <view class="cu-bar bg-white justify-end">
          <view class="action">
            <button
              class="cu-btn line-green text-green"
              @tap="isShowDeleteModal = false"
            >
              取消
            </button>
            <button class="cu-btn bg-green margin-left" @tap="deleteCode">
              确定
            </button>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
import http from "common/js/http.js";
import Fandian from "./Fandian.vue";
export default {
  mixins: [http],
  data() {
    return {
      isShowedAll: false,
      isShowPrePageBtn: false,
      isShowLoadMoreBtn: false,
      invitationOptions: [
        "生成二维码图片",
        "复制推广链接",
		"复制备用推广链接",
        "查看返点",
        "查看详情",
        "编辑",
        "删除",
      ],
      isShowModel: false,
      title: ["邀请码", "生成时间", "开户类型"],
      codes: [],
      curPage: 1,
      curCode: {},
      qrCodeUrl: "",
      isShowQrCode: false,
      isShowFandian: false,
      isShowDeleteModal: false,
      fandian: [],
      gameList: [],
    };
  },
  components: {
    Fandian,
  },

  onLoad() {
    //console.log("onLoad");
  },

  created() {
    this.initData();
    this.gameList = uni.getStorageSync("gameList");
  },

  methods: {
    invitationOption(name) {
      switch (name) {
        case "生成二维码图片":
          this.sendRequest({
            url: "System.MemberAdregister.getQrcode",
            data: {
              createLink: this.curCode.createLink,
            },
            success: (res) => {
              if (res.code === 0) {
                this.qrCodeUrl = res.data;
                this.isShowQrCode = true;
              }
            },
          });
          break;
        case "复制推广链接":
          this.$util.multiPlatformCopy(this.curCode.createLink);
          break;
		case "复制备用推广链接":
		  this.$util.multiPlatformCopy(this.curCode.createLink2);
		  break;
        case "查看返点":
          let kickback = JSON.parse(this.curCode.kickback);
          kickback.forEach((item) => {
            this.gameList.forEach((i) => {
              if (Number(item.typeId) == Number(i.fid)) {
                i.kickbak = item.kickback;
              }
            });
          });
          this.fandian = this.gameList;
          this.isShowFandian = true;
          break;

        case "查看详情":
          // redirectTo
          this.$util.redirectTo(
            "/pages/member/user/registerManage/InvitationCodeDetail"
          );
          break;

        case "编辑":
          uni.navigateTo({
            url: "/pages/member/user/registerManage/InvitationCodeEdit",
          });

          break;
        case "删除":
          this.isShowDeleteModal = true;
          break;
        default:
          this.$util.showToast({ title: "aaa" });
          break;
      }
      this.isShowModel = false;
    },

    deleteCode() {
      let id = this.curCode.id;
      this.sendRequest({
        url: "System.MemberAdregister.deleteMemberAdregister",
        method: "POST",
        data: {
          id,
        },
        success: (res) => {
          if (Number(res.code) == -1) {
            this.isShowDeleteModal = false;
            this.initData();
            this.$util.showToast({
              title: "删除成功",
            });
          }
        },
      });
    },

    hideModal() {
      this.isShowModel = false;
    },
    initData() {
      this.sendRequest({
        url: "System.MemberAdregister.getMemberAdregisterList",
        data: {
          pagesize: 10,
          pageindex: this.curPage,
        },
        success: (res) => {
          let { data } = res;
          this.codes = data.list;

          let { total_count, page_count } = data;

          if (this.curPage * 10 < total_count) {
            this.isShowLoadMoreBtn = true;
          } else {
            this.isShowLoadMoreBtn = false;
          }

          if (this.curPage * 10 > 10) {
            this.isShowPrePageBtn = true;
          } else {
            this.isShowPrePageBtn = false;
          }
          if (this.curPage * 10 >= total_count) {
            this.isShowedAll = true;
          } else {
            this.isShowedAll = false;
          }
        },
      });
    },

    prePage() {
      this.curPage--;
      this.initData();
    },

    loadMore() {
      this.curPage++;
      this.initData();
    },
    showModel(obj) {
      this.isShowModel = true;
      this.curCode = obj;
      uni.setStorageSync("curInvitationCodeInfo", this.curCode);
    },
  },
};
</script>

<style lang="scss" scoped>
.cu-form-group {
  min-height: 80rpx;
  padding: 0.5px 0;
}
.list {
  flex-direction: column;
  .item {
    min-height: 80rpx;
    border-bottom: 1px solid #f1f1f1;
  }
}
</style>
