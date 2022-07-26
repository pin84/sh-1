<template>
  <view class="account-open bg-white">
    <view
      class="cu-form-group margin-top"
      v-if="agencyBelowDisabledUserTypeUpdate === 1"
    >
      <view class="title padding-right-xs">用户类型：</view>
      <picker @change="PickerChange" :value="index" :range="userType">
        <view class="picker">{{ userType[index] }}</view>
      </picker>
      <i
        class="iconfont icon-icon-test4"
        style="font-size: 48rpx; font-weight: 400"
      ></i>
    </view>
    <view class="cu-form-group margin-top">
      <view class="title">用户昵称：</view>
      <input placeholder="请输入昵称,2-6字符" name="input" v-model="nickName" />
    </view>
    <view class="cu-form-group margin-top">
      <view class="title">登录账户：</view>
      <input
        placeholder="账号只能是数字和字母，长度为3-15位"
        name="input"
        v-model="accountName"
      />
    </view>
    <view class="cu-form-group margin-top">
      <view class="title">登录密码：</view>
      <input
        placeholder="密码由字母和数字组成6-13个字符"
        type="password"
        name="input"
        v-model="password"
      />
    </view>
    <view class="cu-form-group margin-top">
      <view class="title">重复密码：</view>
      <input
        placeholder="再次输入密码"
        name="input"
        type="password"
        v-model="okpassword"
      />
    </view>
    <view class="cu-form-group margin-top">
      <view class="title">出款通知：</view>
      <switch
        class="green"
        @change="changeFis"
        :class="fismsghigherups ? 'checked' : ''"
        :checked="fismsghigherups ? true : false"
      ></switch>
    </view>
    <view class="cu-form-group margin-top">
      <view class="title" style="font-weight: 600"
        >请先为下级设置彩票返点：</view
      >
      <!-- <input placeholder="再次输入密码" name="input" /> -->
    </view>

    <Fandian v-if="games.length !== 0" :games="games" />

    <view
      class="padding flex flex-direction"
      style="border-top: 1px solid #f1f1f1"
      ><button class="cu-btn bg-red margin-tb-sm lg" @click="reguste">
        注册
      </button></view
    >
  </view>
</template>

<script>
import http from "common/js/http.js";
import Fandian from "./Fandian.vue";
import commonFn from "./commonFn.js";
export default {
  mixins: [http],
  data() {
    return {
      timeout: 1,
      agencyBelowDisabledUserTypeUpdate: 1,
      accountName: "",
      nickName: "",
      password: "",
      okpassword: "",
      fismsghigherups: false,
      index: 0,
      userType: ["会员", "代理"],
      games: [
        // {
        // 	kickbak: '',
        // 	name: '11选5',
        // 	placeholder: '可设置返点0.0-9.0'
        // },
      ],
    };
  },
  components: {
    Fandian,
  },

  onShow() {
    console.log("onshow--22");
  },

  onLoad() {
    console.log("onshow--22");
  },

  onReady() {
    console.log("onshow--22");
  },

  created() {
    this.initData();
  },

  methods: {
    initData() {
      this.sendRequest({
        url: "System.Member.getGameTypeSetting",
        success: (res) => {
          let { data } = res;
          data.forEach((item) => {
            item.kickbak = "";
            item.placeholder = `可设置返点 ${item.minKickback}-${item.maxKickback}`;
          });
          try {
            uni.setStorageSync("gameList", data);
          } catch (e) {
            console.log("存储游戏列表出错：", e);
          }

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

      let hierarchy = uni.getStorageSync("hierarchy");

      if (hierarchy > 1) {
        this.sendRequest({
          url: "System.Member.getAgencyBelowDisabledUserTypeUpdate",
          success: (res) => {
            let { agencyBelowDisabledUserTypeUpdate } = res.data;

            this.agencyBelowDisabledUserTypeUpdate =
              agencyBelowDisabledUserTypeUpdate;
          },
        });
      }
    },
    reguste() {
      if (this.timeout === 0) {
        return;
      }
      this.timeout = 0;

      setTimeout(() => {
        this.timeout = 1;
      }, 5000);

      let nickNameLength = this.nickName.length;
      if (nickNameLength < 2 || nickNameLength > 6) {
        this.$util.showToast({
          title: "昵称长度为2-6个字符",
        });
        return;
      }
      let accountChcek = this.$util.limitLetterNumber(
        this.accountName,
        3,
        15,
        "账号只能是数字和字母，长度为3-15位"
      );
      if (!accountChcek) {
        return;
      }

      let passwordChcek = this.$util.limitLetterNumber(
        this.password,
        6,
        13,
        "密码由字母和数字组成6-13个字符"
      );
      if (!passwordChcek) {
        return;
      }

      if (this.password !== this.okpassword) {
        this.$util.showToast({
          title: "两次密码不一致",
        });
        return;
      }

      let flag = commonFn.checkFandian(this.games);
      if (!flag) {
        return;
      }
      let arr = this.games.map((item, index) => {
        return {
          typeId: item.fid,
          kickback: item.kickbak,
        };
      });

      let obj = {
        isAgent: this.index,
        accountName: this.accountName,
        nickName: this.nickName,
        password: this.password,
        okpassword: this.okpassword,
        fismsghigherups: this.fismsghigherups ? 1 : 0,
        userKickbacks: JSON.stringify(arr),
      };

      this.sendRequest({
        url: "System.Member.addMember",
        method: "post",
        data: obj,
        success: (res) => {
          if (res.code === -1) {
            this.$util.showToast({
              title: res.message,
            });
            return;
          }

          this.$util.showToast({
            title: "注册成功",
          });

          setTimeout(() => {
            this.$util.redirectTo("/pages/member/index/index", {}, "tabbar");
          }, 2000);
        },
      });
    },
    PickerChange(e) {
      this.index = e.detail.value;
    },
    changeFis(e) {
      this.fismsghigherups = e.detail.value;
    },
  },
};
</script>

<style lang="scss" scoped>
.cu-form-group uni-picker,
.title {
  padding-right: 0;
}
.cu-form-group uni-picker::after,
uni-switch::after,
uni-switch::before {
  display: none;
}
</style>
