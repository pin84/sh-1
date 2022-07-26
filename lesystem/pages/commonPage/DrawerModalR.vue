<template>
  <view
    class="cu-modal drawer-modal justify-end"
    :class="isShow ? 'show' : ''"
    @tap="hideModal"
  >
    <view
      class="cu-dialog basis-lg"
      @tap.stop=""
      :style="[
        { top: CustomBar + 'px', height: 'calc(100vh - ' + CustomBar + 'px)' },
      ]"
    >
      <view class="cu-list menu text-left">
        <view class="lebg text-xl">
          <view class="text-center">
            <image
              src="/static/images/le/userico.png"
              style="width: 220rpx"
              class="radius"
              mode="widthFix"
            ></image>
          </view>
          <view class="padding-xs text-center">
            <view class="padding-xs text-bold text-white">{{ username }}</view>
            <view class="padding-xs text-white text-xl">
              余额:{{ balance }}
              <text
                @click="refreshUserInfo"
                class="iconfont icon-fresh margin-left-xs"
              ></text>
            </view>
          </view>
        </view>
        <view class="cu-list menu">
          <view class="cu-item">
            <view
              class="content solid-right"
              v-for="(item, idx) in moneyOptions"
              :key="idx"
            >
              <navigator :url="item.url">
                <text
                  class="iconfont margin sefticon text-yellow"
                  :class="item.icon"
                ></text>
                <text class="">{{ item.name }}</text>
              </navigator>
            </view>
          </view>
          <view v-show="item.isShow" v-for="(item, index) in textList" :key="index">
            <view class="cu-item arrow" @click="showSubmenuOrUrl(index)">
              <view class="content">
                <text
                  class="iconfont margin sefticon text-red"
                  :class="[item.icon, item.iconColor]"
                ></text>
                <text class="">{{ item.title }}</text>
              </view>
            </view>
            <view v-for="(sub,n) in item.subMenu" :key="n">
              <view
                v-show="showShowMenuId == index"
                @click="gotosubmenuUrl(sub.url)"
                class="solid-bottom padding-xs"
              >
                <text
                  class="iconfont margin sefticon icon-dian margin-left-xxxl"
                ></text>
                <text class="">{{ sub.title }}</text>
              </view>
            </view>
          </view>
          <view class="cu-item arrow" @click="toggleAccount">
            <view class="content">
              <text
                class="iconfont margin sefticon icon-tuichu text-gray"
              ></text>
              <text class="">退出登录</text>
            </view>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
import http from "common/js/http.js";
export default {
  mixins: [http],
  props: {
    isShow: {
      type: Boolean,
      default: () => {
        return false;
      },
    },
  },
  data() {
    return {
      userInfo: {},
      isAgent: false,
      balance: "",
      username: "",
      showShowMenuId: -1,
      moneyOptions: [
        {
          name: "充值",
          icon: "icon-chongzhi",
          url: "/pages/member/recharge/recharge",
        },
        {
          name: "提现",
          icon: "icon-tixian",
          url: "/pages/member/pickGoods/index/index",
        },
      ],
      textList: [
        {
          title: "投注记录",
          icon: "icon-gouwuche2",
          iconColor: "text-red",
          isShow: true,
          url: "/pages/member/index/gameRecord/GameRecord",
        },
        {
          title: "报表管理",
          icon: "icon-04",
          iconColor: "text-green",
          isShow: true,
          url: "/pages/member/index/userAccount/UserAccount",
        },
        {
          title: "账户管理",
          icon: "icon-zhanghuguanli",
          iconColor: "text-mauve",
          isShow: true,
          url: "",
          subMenu: [
            {
              title: "个人总览",
              icon: "icon-dailishang",
              iconColor: "text-yellow",
              url: "/pages/member/personalOverview/index",
            },
            {
              title: "修改密码",
              icon: "icon-dailishang",
              iconColor: "text-yellow",
              url: "/pages/member/editPassword/edit/edit",
            },
            {
              title: "银行卡管理",
              icon: "icon-dailishang",
              iconColor: "text-yellow",
              url: "/pages/member/bankCard/bankCardList/bankCardList",
            },
            {
              title: "资料修改",
              icon: "icon-dailishang",
              iconColor: "text-yellow",
              url: "/pages/member/user/userDetail/userDetail",
            },
            {
              title: "彩种信息",
              icon: "icon-dailishang",
              iconColor: "text-yellow",
              url: "/pages/member/index/gameInfor/gameInfor",
            },
          ],
        },
        {
          title: "代理管理",
          icon: "icon-dailishang",
          iconColor: "text-yellow",
          isShow: this.isAgent,
          subMenu: [
            {
              title: "团队总览",
              icon: "icon-dailishang",
              iconColor: "text-yellow",
              url: "/pages/member/agency/index",
            },
            {
              title: "用户列表",
              icon: "icon-dailishang",
              iconColor: "text-yellow",
              url: "/pages/member/memberList/index",
            },
            {
              title: "注册管理",
              icon: "icon-dailishang",
              iconColor: "text-yellow",
              url: "/pages/member/user/registerManage/registerManage",
            },
            {
              title: "推广注册",
              icon: "icon-dailishang",
              iconColor: "text-yellow",
              url: "/pages/member/user/registerManage/registerManage?action=1",
            },
          ],
        },
        {
          title: "站内短信",
          icon: "icon-mail",
          iconColor: "text-blue",
          isShow: true,
          url: "/pages/member/message/message",
        },
      ],
      CustomBar: this.CustomBar,
    };
  },
  beforeCreate() {
    let hierarchy = uni.getStorageSync("hierarchy");
    //console.log(hierarchy);
    if (hierarchy != undefined && hierarchy != "" && hierarchy > 0) {
      this.isAgent = true;
    }
  },
  created() {
    this.initData();
  },
  methods: {
    initData() {
      this.userInfo = uni.getStorageSync("userInfo");
      this.balance = this.userInfo.coin;
      this.username = this.userInfo.username;
    },
    refreshUserInfo() {
      this.balance = "正在刷新...";
      this.sendRequest({
        url: "System.Member.memberInfo",
        success: (res) => {
          this.userInfo = res.data;
          uni.setStorageSync("userInfo", res.data);
          this.balance = res.data.coin;
        },
      });
    },
    gotosubmenuUrl(url) {
      if (url != undefined && url != "") {
        uni.navigateTo({
          url: url,
        });
      }
    },
    showSubmenuOrUrl(id) {
      let menu = this.textList[id];
      if (this.showShowMenuId == id) {
        this.showShowMenuId = -1;
      } else {
        this.showShowMenuId = id;
      }

      if (menu.subMenu == undefined || menu.subMenu == "") {
        //console.log(menu.url);
        let gotourl = menu.url;
        if (gotourl != undefined && gotourl != "") {
          uni.navigateTo({
            url: gotourl,
          });
        }
      }
    },
    hideModal() {
      this.$emit("hideModal");
    },
    toggleAccount() {
      this.hideModal();
      uni.showModal({
        title: "注意！",
        content: "确定退出当前账号吗？",
        success: (res) => {
          if (res.confirm) {
            uni.removeStorageSync("token");
            uni.removeStorageSync("userInfo");
            uni.removeStorageSync("hierarchy");
            uni.redirectTo({
              url: "/pages/login/login/login",
            });
          } else if (res.cancel) {
          }
        },
      });
    },
  },
};
</script>

<style lang="scss">
@import "/common/css/bg.css";
</style>
