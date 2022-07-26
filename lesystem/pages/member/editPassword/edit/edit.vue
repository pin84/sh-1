<template>
  <view class="page-body">
    <view id="tab-bar" class="edit-nav">
      <view
        v-for="(item, index) in editStatusList"
        :key="index"
        class="uni-tab-item"
        :data-current="index"
        @click="ontabtap"
      >
        <text
          class="uni-tab-item-title"
          :class="type == index ? 'uni-tab-item-title-active' : ''"
          >{{ item.name }}</text
        >
      </view>
    </view>
    <view class="content-box">
      <block v-if="type == 0">
        <view class="" v-if="firstSetting">
          <text class="title">旧密码：</text>
          <input
            class="uni-input"
            v-model="loginPsw.oldPwd"
            type="text"
            password="true"
            placeholder="旧密码"
          />
        </view>
        <view class="uni-input"> (由字母和数字组成6-13个字符) </view>
        <view class="">
          <text class="title">新登录密码：</text>
          <input
            class="uni-input"
            v-model="loginPsw.newPwd"
            type="text"
            password="true"
            placeholder="新登录密码"
          />
        </view>
        <view class="">
          <text class="title">确认新登录密码：</text>
          <input
            class="uni-input"
            v-model="loginPsw.okPwd"
            type="text"
            password="true"
            placeholder="确认新登录密码"
          />
        </view>
        <button @click="confirmLoginPsw">确认修改</button>
      </block>
      <block v-else>
        <view class="alignFlex whiteBg" v-if="firstSetting">
          <text class="title">旧提现密码：</text>
          <input
            class="uni-input"
            v-model="thPsw.oldPwd"
            type="text"
            password="true"
            placeholder="旧提现密码"
          />
        </view>
        <view class="alignFlex whiteBg"> (由字母和数字组成4-6个字符) </view>
        <view class="alignFlex whiteBg">
          <text class="title">新提现密码：</text>
          <input
            class="uni-input"
            v-model="thPsw.newPwd"
            type="text"
            password="true"
            placeholder="新提现密码"
          />
        </view>
        <view class="alignFlex whiteBg">
          <text class="title">确认新提现密码：</text>
          <input
            class="uni-input"
            v-model="thPsw.okPwd"
            type="text"
            password="true"
            placeholder="确认新提现密码"
          />
        </view>
        <button @click="confirmThPsw">确认修改</button>
      </block>
    </view>
  </view>
</template>

<script>
import http from "common/js/http.js";
export default {
  data() {
    return {
      fullPath: null,
      type: 0,
      editStatusList: [
        {
          type: 0,
          name: "修改登录密码",
        },
        {
          type: 1,
          name: "修改资金密码",
        },
      ],
      loginPsw: {
        oldPwd: "",
        newPwd: "",
        okPwd: "",
      },
      thPsw: {
        oldPwd: "",
        newPwd: "",
        okPwd: "",
      },
      firstSetting: "",
    };
  },
  methods: {
    getUserInfo() {
      this.sendRequest({
        url: "System.Member.memberInfo",
        data: {},
        success: (res) => {
          if (res.data.phoneno == "") {
            this.$util.redirectTo("/pages/user/bindPhone/bindPhone", {}, "");
          }
        },
      });
    },
    isSetPassword(type) {
      this.sendRequest({
        url: "System.Member.isSetPassword",
        data: {
          type: type,
        },
        success: (res) => {
          // console.log(res)
          if (res.code == 0) {
            if (res.data.firstSetting == 1) {
              this.firstSetting = false;
            } else {
              this.firstSetting = true;
            }
          }
        },
      });
    },
    ontabtap(e) {
      let index = e.target.dataset.current || e.currentTarget.dataset.current;
      this.switchTab(index);
    },
    switchTab(index) {
      if (this.type === index) {
        return;
      }
      this.type = index;
      this.isSetPassword(this.type);
    },
    confirmLoginPsw() {
      if (this.firstSetting && this.loginPsw.oldPwd == "") {
        this.$util.showToast({ title: "旧密码不能为空" });
        return false;
      }
      if (this.loginPsw.newPwd == "") {
        this.$util.showToast({ title: "新登录密码不能为空" });
        return false;
      }
      if (this.loginPsw.okPwd == "") {
        this.$util.showToast({ title: "确认新登录密码不能为空" });
        return false;
      }
      this.sendRequest({
        url: "System.Member.updateLoginPwd",
        method: "POST",
        data: {
          oldPwd: this.loginPsw.oldPwd,
          newPwd: this.loginPsw.newPwd,
          okPwd: this.loginPsw.okPwd,
        },
        success: (res) => {
          // console.log(res)
          if (res.code < 0) {
            this.$util.showToast({ title: res.message });
          } else if (res.code >= 1) {
            this.$util.showToast({ title: "密码修改成功" });
            let isNeedChangePassword = res.data.isNeedChangePassword;
            if (
              isNeedChangePassword != undefined &&
              isNeedChangePassword == 2
            ) {
              uni.showModal({
                title: "提示",
                showCancel: false,
                content: "您还需要重新修改资金密码才能正常使用",
                success: function (res) {
                  if (res.confirm) {
                    uni.redirectTo({
                      url: "/pages/member/editPassword/edit/edit?index=1",
                    });
                  }
                },
              });
            } else {
              this.$util.showToast({ title: "密码修改成功" });
              uni.switchTab({
                url: "/pages/member/index/index",
              });
            }
          }
        },
      });
    },
    confirmThPsw() {
      if (this.firstSetting && this.thPsw.oldPwd == "") {
        this.$util.showToast({ title: "旧密码不能为空" });
        return false;
      }
      if (this.thPsw.newPwd == "") {
        this.$util.showToast({ title: "新登录密码不能为空" });
        return false;
      }
      if (this.thPsw.okPwd == "") {
        this.$util.showToast({ title: "确认新登录密码不能为空" });
        return false;
      }
      this.sendRequest({
        url: "System.Member.updateWithdrawPwd",
        method: "POST",
        data: {
          oldPwd: this.thPsw.oldPwd,
          newPwd: this.thPsw.newPwd,
          okPwd: this.thPsw.okPwd,
        },
        success: async (res) => {
          console.log(res);

          if (res.code < 0) {
            this.$util.showToast({ title: res.message });
          } else if (res.code == 1) {
            // this.$util.showToast({ title: "密码修改成功" });
            await this.$util.showConfirm({
              content: "密码修改成功",
              showCancel: false,
            });

            if (this.fullPath) {
              uni.navigateTo({
                url: this.fullPath,
              });
            } else {
              uni.switchTab({
                url: "/pages/member/index/index",
              });
            }
          }
        },
      });
    },
  },
  onLoad(data) {
    console.log("----", data);
    let { tabType, fullPath } = data;
    if (!tabType) {
      tabType = 0;
    }

    this.type = tabType;
    this.fullPath = fullPath;

    this.getUserInfo();
    this.isSetPassword(0);
    if (data.index != undefined && data.index != "" && data.index == 1) {
      this.switchTab(1);
    }
  },
  mixins: [http],
};
</script>

<style lang="scss" scoped>
.page-body {
  min-height: 100vh;
  background-color: white;
  /* #ifdef H5 */
  min-height: calc(100vh - 44px);
  /* #endif */

  .edit-nav {
    box-sizing: border-box;
    width: 100%;
    height: 80rpx;
    flex-direction: row;
    background: #fff;
    border-bottom: 2rpx solid $ns-border-color-gray;

    .uni-tab-item {
      flex-wrap: nowrap;
      display: inline-block;
      width: 50%;
      box-sizing: border-box;
      text-align: center;
    }

    .uni-tab-item-title {
      color: #555;
      font-size: 30rpx;
      display: block;
      height: 76rpx;
      line-height: 76rpx;
      border-bottom: 2px solid #fff;
      padding: 0 10rpx;
      flex-wrap: nowrap;
    }

    .uni-tab-item-title-active {
      display: block;
      height: 76rpx;
      color: $base-color;
      border-bottom: 2px solid $base-color;
      padding: 0 10rpx;
    }
    ::-webkit-scrollbar {
      width: 0;
      height: 0;
      color: transparent;
    }
  }

  .content-box {
    > view {
      border-bottom: 2rpx solid #ddd;
      padding: 10rpx 30rpx;
      display: flex;
      align-items: center;
    }

    > button {
      width: 700rpx;
      margin: 0 auto;
      border: none;
      background-color: #d5001a;
      color: white;
      margin-top: 40rpx;
    }
  }
}
</style>
