<template>
  <view class="bg-white invitation-code">
    <scroll-view scroll-x class="bg-white nav">
      <view class="flex text-center">
        <view
          class="cu-item flex-sub"
          :class="index == TabCur ? 'text-orange cur' : ''"
          v-for="(item, index) in tabName"
          :key="index"
          @tap="tabSelect"
          :data-id="index"
          style="height: 60rpx; line-height: 60rpx"
        >
          <text class="text-lg">{{ item }}</text>
        </view>
      </view>
    </scroll-view>

    <view v-if="TabCur == 0">
      <view class="cu-form-group margin-top flex">
        <view class="title" style="flex: 0 0 190rpx">推广域名：</view>
        <picker @change="domainChange" :value="domainIndex" :range="domains">
          <view class="picker">{{ this.domains[this.domainIndex] }}</view>
        </picker>
        <i
          class="iconfont icon-icon-test4"
          style="font-size: 42rpx; font-weight: 400"
        ></i>
      </view>
      <view class="cu-form-group margin-top flex" v-if="isShowAgency">
        <view class="title" style="flex: 0 0 190rpx">用户类型：</view>
        <picker
          @change="userTypeChange"
          :value="userTypeIndex"
          :range="userType"
        >
          <view class="picker">{{ this.userType[this.userTypeIndex] }}</view>
        </picker>
        <i
          class="iconfont icon-icon-test4"
          style="font-size: 42rpx; font-weight: 400"
        ></i>
      </view>

      <view class="cu-form-group margin-top flex">
        <view class="title" style="flex: 0 0 190rpx">链接有效期：</view>
        <picker
          @change="expirationChange"
          :value="expirationIndex"
          :range="expiration"
        >
          <view class="picker">{{
            this.expiration[this.expirationIndex]
          }}</view>
        </picker>
        <i
          class="iconfont icon-icon-test4"
          style="font-size: 42rpx; font-weight: 400"
        ></i>
      </view>
      <view class="cu-form-group margin-top">
        <view class="title">
          邀请码
          <span style="color: #c10000">(非必填):</span>
        </view>
        <input
          v-model="code"
          @blur="codeOnblur"
          :placeholder="invitationCodePlaceholder"
          :type="inputType"
          name="input"
          class="uni-input margin-left-xs"
          style="
            padding: 0;
            padding-left: 10rpx;
            background-color: #f1f1f1;
            height: 95rpx;
            outline: none;
            border: none;
          "
        />
      </view>

      <view class="cu-form-group margin-top">
        <view class="title">请为下级设置代理返点</view>
        <!-- <input placeholder="再次输入密码" name="input" /> -->
      </view>

      <Fandian v-if="games.length !== 0" :games="games" />
      <view
        class="padding flex flex-direction"
        style="border-top: 1px solid #f1f1f1"
      >
        <button
          v-if="isDisableBtn"
          class="cu-btn bg-green margin-tb-sm lg"
          @tap="generatorInvitation"
        >
          生成邀请码
        </button>
        <button v-else class="cu-btn bg-green margin-tb-sm lg" disabled>
          1s后再生成邀请码
        </button>
      </view>
    </view>

    <view v-if="TabCur == 1"><InvitationManage /></view>

    <view class="cu-modal" :class="{ show: isCodeUsed }">
      <view class="cu-dialog">
        <view class="padding-xl">
          <text class="text-red"
            >邀请码[{{ this.code }}]已被注册，请重新输入</text
          >
        </view>
        <view class="cu-bar bg-white justify-end">
          <view class="action"
            ><button class="cu-btn bg-green margin-left" @tap="hideModal">
              确定
            </button></view
          >
        </view>
      </view>
    </view>
  </view>
</template>

<script>
import http from "common/js/http.js";
import Fandian from "./Fandian.vue";
import InvitationManage from "./InvitationManage.vue";
import commonFn from "./commonFn.js";
export default {
  mixins: [http],
  data() {
    return {
      isDisableBtn: true,
      canUseInvitationCode: false,
      timeout: 1,
      inputType: "text",
      invitationCodePlaceholder: "只能是4-11位数字与字母组合",
      isCodeUsed: false,
      code: "",
      // agencyBelowDisabledUserTypeUpdate:0,
      // hierarchy:1,
      isShowAgency: true,
      games: [],
      TabCur: "0",
      tabName: ["生成邀请码", "邀请码管理"],
      domains: [],
      domainIndex: 0,
      userType: ["会员", "代理"],
      userTypeIndex: 0,
      expiration: [],
      expirationIndex: 0,
    };
  },
  components: {
    Fandian,
    InvitationManage,
  },
  created() {
    this.initData();
    let routes = getCurrentPages();
    let { tabCur } = routes[routes.length - 1].options;
    if (tabCur) {
      this.TabCur = tabCur;
    }
  },

  methods: {
    //生成邀请码
    generatorInvitation() {
      let flag = commonFn.checkFandian(this.games);
      if (!flag) {
        this.isDisableBtn = false;
        setTimeout(() => {
          this.isDisableBtn = true;
        }, 1500);
        return;
      }

      let domainNo = this.domains[this.domainIndex] === "本站" ? 1 : "";
      let arr = this.games.map((item, index) => {
        return {
          typeId: item.fid,
          kickback: item.kickbak,
        };
      });
      let obj = {
        createLink: domainNo,
        customerType: this.userTypeIndex,
        linkValidityPeriod: this.expirationIndex,
        invitationCode: this.code,
        kickBack: JSON.stringify(arr),
      };

      this.sendRequest({
        url: "System.MemberAdregister.addMemberAdregister",
        method: "POST",
        data: obj,
        success: (res) => {
          if (res.code == -1) {
            this.$util.showToast({ title: res.message });
            return;
          }

          this.$util.showToast({
            title: "邀请码添加成功",
          });

          setTimeout(() => {
            this.initData();
            // this.$util.redirectTo('/pages/member/index/index', {}, 'tabbar');
          }, 2000);
        },
      });
    },
    checkCode(code) {
      if (this.code === "") {
        return false;
      }
      let length = this.code.length;

      if (length < 4 || length > 11) {
        this.$util.showToast({ title: "邀请码长度为4-11位" });
        return false;
      }

      let reg = /[~!@#$%^&*()/\|,.<>?"'();:_+=\[\]{}-]|[\u4e00-\u9fa5]/;
      if (reg.test(this.code)) {
        this.$util.showToast({
          title: `邀请码${this.invitationCodePlaceholder}`,
        });
        return false;
      }

      return true;
    },
    codeOnblur() {
      if (!this.checkCode(this.code)) {
        return;
      }
      this.sendRequest({
        url: "System.MemberAdregister.checkInviteCode",
        data: {
          inviteCode: this.code,
        },
        success: (res) => {
          if (Number(res.code) === -1) {
            this.isCodeUsed = true;
            this.canUseInvitationCode = false;
          } else {
            this.canUseInvitationCode = true;
          }
        },
      });
    },
    initData() {
      this.sendRequest({
        url: "System.Member.getGameTypeSetting",
        success: (res) => {
          let { data } = res;

          data.forEach((item) => {
            item.kickbak = "";
            item.placeholder = `可设置返点 ${item.minKickback}-${item.maxKickback}`;
          });
          data.forEach((item) => {
            if (item.play_type == 1) {
              item.isDisabled = true;
              if (item.kickbak == "") {
                item.kickbak = 0;
              }
            }
          });
          this.games = data;
        },
      });

      this.sendRequest({
        url: "System.MemberAdregister.getPageData",
        success: (resault) => {
          let {
            linkValidityPeriod,
            generalizeDomain,
            agencyBelowDisabledUserTypeUpdate,
            invitationCodeTip,
            invitationCodeType,
          } = resault.data;
          let hierarchy = Number(uni.getStorageSync("hierarchy"));
          for (let [key, value] of Object.entries(linkValidityPeriod)) {
            this.expiration.push(value);
          }

          for (let [key, value] of Object.entries(generalizeDomain)) {
            this.domains.push(value);
          }

          this.invitationCodePlaceholder = invitationCodeTip;
          if (invitationCodeType == 1) {
            this.inputType = "number";
          }
          if (hierarchy > 1 && agencyBelowDisabledUserTypeUpdate == 0) {
            this.isShowAgency = false;
          }
        },
      });
    },
    domainChange(e) {
      this.domainIndex = e.detail.value;
    },
    userTypeChange(e) {
      this.userTypeIndex = e.detail.value;
    },
    expirationChange(e) {
      this.expirationIndex = e.detail.value;
    },

    tabSelect(e) {
      this.TabCur = e.currentTarget.dataset.id;
      // this.scrollLeft = (e.currentTarget.dataset.id - 1) * 60;
    },
    hideModal() {
      this.isCodeUsed = false;
    },
  },
};
</script>

<style lang="scss" scoped>
.title,
uni-picker {
  padding-right: 0;
}
uni-picker::after {
  display: none;
}
.cur {
  color: #c42133;
}
</style>
