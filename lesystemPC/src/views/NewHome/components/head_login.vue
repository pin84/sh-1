<template>
  <div class="head-login">
    <el-form v-if="isLogin == false && isInLoginPage==false" :model="info" ref="info">
      <el-row :gutter="10">
        <el-col :span="8"
          ><el-input
            size="mini"
            type="text"
            v-model="info.username"
            placeholder="账号"
            @blur="changeUserName"
          ></el-input
        ></el-col>
        <el-col :span="8"
          ><el-input
            size="mini"
            type="password"
            v-model="info.password"
            placeholder="密码"
            autocomplete="new-password"
          ></el-input
        ></el-col>
        <el-col :span="8"
          ><el-input
            size="mini"
            type="text"
            v-model="info.validateCode"
            placeholder="验证码"
          >
            <img
              v-show="verifycode_img != ''"
              class="verifycode_img"
              slot="suffix"
              :src="'data:image/jpeg;base64,' + verifycode_img"
              @click="load_verifycode" /></el-input
        ></el-col>
      </el-row>
    </el-form>
    <el-link v-if="isLogin == false&& isInLoginPage==false" class="login" @click="to_login"
      >登录</el-link
    >
    <el-link
      v-if="isLogin == false&& isInLoginPage==false"
      class="register"
      @click="$router.push('/user/register')"
      >注册</el-link
    >

    <!-- 已经登录 -->
    <div v-show="isLogin && !isLoading" class="user-info">
      <div class="manifestList_manifestList">
        <div
          class="manifestList_manifest_item"
          @click="$router.push('/user/recharge/recharge')"
        >
          <p class="manifestList_icon first"></p>
          <p class="manifestList_toolName">存款</p>
        </div>
<!--        <div class="manifestList_manifest_item">
          <p class="manifestList_icon second"></p>
          <p class="manifestList_toolName">转账</p>
        </div> -->
        <div
          class="manifestList_manifest_item"
          @click="$router.push('/user/withdraw/withdraw')"
        >
          <p class="manifestList_icon third"></p>
          <p class="manifestList_toolName">取款</p>
        </div>
      </div>
      <div
        class="popoverCon"
        @mouseover="showDropDown = true"
        @mouseleave="showDropDown = false"
      >
        <div>
          <div class="userInfo_user_warp userInfo_pointer">
            <div class="userInfo_userinfo">
              <div class="userInfo_username_warp">
                <p>{{ user_info.username }}</p>
                <div
                  class="image_imageContainer image_cover userInfo_vipGradImg"
                  style="cursor: inherit"
                ></div>
              </div>
              <div class="userInfo_userinfo_bottom">
                <p>{{ "¥" + user_info.coin }}</p>
                <img
                  width="14"
                  height="14"
                  src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwBAMAAAClLOS0AAAACXBIWXMAAAsTAAALEwEAmpwYAAAALVBMVEVHcEy4uL+rrLiprreorLWmq7WmqrSlqrSmqrSmqrSmqrSmqrSmqrSlqrOlqbPiJfN2AAAADnRSTlMACRchOFJgfIqnvs3j84ZdyggAAAFRSURBVHjanZS/SsRAEMb3jJ4Xba60SGHpI4houCcIeRIRLOyOiJVNsLQKgn24FzDgC9iIlZBmw2nuz/cMQnYms2GJgZsmk53dyW8m36za1c7fQPb9YK+fwLJ7JZbj+Y7sEStZn+BVXi6QtH5Em+h4Je6nHbhqtx3gxg4cIiYv2EztwOjjnbz5UnXs+sc898pFN3C8PW2ePmbdwD6eDGxNC5df5GRVF7YwEAQssGMgEWALNgC0AFuwKVALsMB6qFPMWmCB9aEDLAQ45OMRkjGWDKxVqi3YgmpW4a8qXozb7I4Y+GitSnKb/D4DT7ZtoCHyyhUHOJVnapgj5lSpZlhKyB8Pa4YlBMLlAvPNlKCpQG5JRqVFa2oJN/EspmbcUhOl7Y5ORFW2suTXOloUMYhlVa98egXXJ9EhUbtj8N/guKM2yquB4XTHeeACcK+MXa+dP3Va109s+jZ/AAAAAElFTkSuQmCC"
                  alt="icon"
                  class="userInfo_arrowRotate"
                  style="cursor: pointer"
                />
              </div>
            </div>
            <div class="userInfo_photo_warp">
              <img
                src="/images/2021/1601284979717349.png"
                alt="icon"
                style="cursor: pointer"
              />
            </div>
          </div>
        </div>
        <div class="info-dropDown" v-show="showDropDown">
          <ul>
            <li>
              <a href="javascript:;" @click="$router.push('/user/user_info')"
                ><span class="icon icon1"></span>个人资料</a
              >
            </li>
            <li>
              <a href="javascript:;" @click="$router.push('/user/order')"
                ><span class="icon icon2"></span>投注记录</a
              >
            </li>
            <li>
              <a
                href="javascript:;"
                @click="$router.push('user/Personal_overview')"
                ><span class="icon icon3"></span>交易记录</a
              >
            </li>
            <li>
              <a
                href="javascript:;"
                @click="$router.push('/user/message/instation_notice')"
                ><span class="icon icon4"></span>消息中心</a
              >
            </li>
          </ul>
          <a class="log-out" @click="logout">退出登录</a>
        </div>
      </div>
    </div>
    <!-- <ul v-show="isLogin && isLoading" class="top_user_info">
      <li><i class="el-icon-loading"></i>用户资料加载中...</li>
    </ul>
    <ul v-show="isLogin && !isLoading" class="top_user_info">
      <li>
        <i class="iconfont icon-zhenshixingming"></i
        ><router-link to="/user/index"> {{ user_info.username }}</router-link>
      </li>
      <li class="axis">|</li>
      <li>
        <i class="iconfont icon-qiandai"></i
        ><router-link to="/user/Personal_overview"
          >{{ user_info.coin }}
        </router-link>
        <i
          @click="loadUserInfo"
          class="refreshUserInfo iconfont icon-shuaxin1"
        ></i>
      </li>
      <li class="axis">|</li>
      <li>
        <router-link to="/user/recharge/recharge">
          <i
            class="iconfont icon-chongzhi0101"
            style="font-size: 24px; color: #56c9ff"
          ></i
        ></router-link>
      </li>
      <li>
        <router-link to="/user/withdraw/withdraw">
          <i
            class="iconfont icon-tixian1"
            style="font-size: 24px; color: #ee9900"
          ></i
        ></router-link>
      </li>

      <li class="axis">|</li>
      <li @click="logout" class="logoutli">
        <i class="iconfont icon-tuichu1"></i>退出
      </li>
    </ul> -->
  </div>
</template>

<script>
export default {
  props: {
    isInLoginPage: {
      type: Boolean,
      default: false,
    }
  },
  data() {
    return {
      timeout: 0,
      getCodeText: "获取验证码",
      ifShowPhoneCode: false,
      info: {
        phone: "",
        code: "",
        record_id: "",
        username: "",
        password: "",
        validateCode: "",
        uuid: "",
      },
      verifycode_img: "",
      canPcRegister: false,
      isLogin: false,
      isLoading: false,
      user_info: {},
      registDialogVisible: false,
      showDropDown: false,
    };
  },
  methods: {
    async changeUserName() {
      let res = await this.$get("Pc.Login.checkUser", {
        username: this.info.username,
      });

      let { code } = res;
      if (code == -3333) {
        this.ifShowPhoneCode = true;
      } else {
        this.ifShowPhoneCode = false;
      }
    },
    async send_sms() {
      if (this.$isEmpty(this.info.phone)) {
        return this.$message.error("请先填写手机号码");
      }
      let res = await this.$post("Pc.SendMsg.sendVeryCode", {
        phone: this.info.phone,
      });
      if (res.code != 0) {
        this.$message.error(res.message);
        return;
      }
      this.$message.success("短信发送成功");

      this.info.record_id = res.data.record_id;
      this.timeout = 60;
      let interval = setInterval(() => {
        this.timeout--;
        if (this.timeout == 0) {
          clearInterval(interval);
          this.getCodeText = "获取验证码";
          return;
        }
        this.getCodeText = "秒后再发送";
      }, 1000);

      // .then((res) => {
      //   this.info.record_id = res.data.record_id;
      // });
    },
    to_login: function () {
      if (
        this.$isEmpty(this.info.username) ||
        this.$isEmpty(this.info.password)
      ) {
        return this.$message.error("账号密码不能为空");
      } else if (this.$isEmpty(this.info.validateCode)) {
        return this.$message.error("验证码不能为空");
      }

      console.log(this.info);

      this.$post("Pc.Login.login", this.info).then((res) => {
        if (res.code == -3333) {
          this.ifShowPhoneCode = true;
        } else {
          this.ifShowPhoneCode = false;
        }
        if (res.code < 0) {
          this.load_verifycode();
          return this.$message.error(res.message);
        } else {
          this.isLogin = true;
          this.loadUserInfo();
          this.$message.success("登录成功");
          localStorage.setItem("token", res.data.token);

          
          //   localStorage.setItem("user_info", JSON.stringify(res.user_info));
          //   localStorage.removeItem("login_error_num");
          //this.$router.push("/");
        }
      });
    },
    //生成图形验证码
    load_verifycode() {
      this.$get("Pc.Login.vcode").then((res) => {
        this.verifycode_img = res.data.img;
        this.info.uuid = res.data.uuid;
      });
    },
    // 初始化加载数据
    load_logindata() {
      this.$get("Pc.HomePage.getData").then((res) => {
        //this.init_data = res.data;
        this.canPcRegister = res.data.canPcRegister;
        //this.notice = res.data.notice.items
      });
    },

    // 加载用户信息
    loadUserInfo() {
      this.isLoading = true;
      this.$get("Pc.Member.memberInfo").then((res) => {
        if (res.code == 0) {
          this.user_info = res.data;
          this.$store.commit("userInfo", this.user_info);
		  if(this.user_info && this.user_info.chatRoomIndex!=undefined&&this.user_info.chatRoomIndex!=''){
		  	localStorage.setItem("chatRoomIndex",this.user_info.chatRoomIndex);
		  }
          this.isLoading = false;
		  this.$emit("loginsuccess", this.user_info);
        } else {
          localStorage.removeItem("token");
		  localStorage.removeItem("chatRoomIndex");
          this.$message.error(res.message);
        }
      });
    },

    loginsuccessAction(res) {
      //console.log(res);
      if (
        res.data.isNeedChangePassword != undefined &&
        res.data.isNeedChangePassword != "" &&
        res.data.isNeedChangePassword > 0
      ) {
        this.dealwithPasswordchangeNotice(res.data.isNeedChangePassword);
      } else {
        this.loginDialogVisible = false;
        this.isLogin = true;
        this.loadUserInfo();
      }
    },
    dealwithPasswordchangeNotice(isNeedChangePassword) {
      if (isNeedChangePassword == 1) {
        this.$alert("您需要重新设置登陆密码才能正常使用", "重要提示", {
          confirmButtonText: "确定跳转修改",
          callback: (action) => {
            this.$router.push("/user/withdraw/changepassword?index=1");
          },
        });
      } else if (isNeedChangePassword == 2) {
        this.$alert("您需要重新设置资金密码才能正常使用", "重要提示", {
          confirmButtonText: "确定跳转修改",
          callback: (action) => {
            this.$router.push("/user/withdraw/changepassword?index=2");
          },
        });
      } else if (isNeedChangePassword == 3) {
        this.$alert(
          "您需要同时修改设置登陆密码和资金密码才能正常使用",
          "重要提示",
          {
            confirmButtonText: "确定跳转修改",
            callback: (action) => {
              this.$router.push("/user/withdraw/changepassword?index=1");
            },
          }
        );
      }
    },
    logout() {
      this.$get("Pc.Login.logout").then(() => {
        localStorage.removeItem("user_info");
        localStorage.removeItem("token");
		localStorage.removeItem("chatRoomIndex");
        this.isLogin = false;
		this.$router.push({ path: "/user/login" });
      });
    },
  },
  mounted() {},
  created() {
    this.load_verifycode(); //加载图形验证码
    // 验证是否登录
    let token = localStorage.getItem("token");
    if (!this.$isEmpty(token)) {
      this.isLogin = true;
      this.loadUserInfo();
      //this.user_info = JSON.parse(user_info);
    }
  },
};
</script>

<style lang="scss" scoped>
.head-login {
  display: flex;
  justify-content: space-between;
   .el-input {
    width: 100px;
    position: relative;
   ::v-deep input {
      border-radius: 14px;
      background: rgba(108, 123, 168, 0.1);
      padding: 0 10px;
      box-shadow: inset 0 0 0 100px rgba(108, 123, 168, 0.5) !important;
      outline: none;
      border-color: rgba(108, 123, 168, 0.5);
      &:focus {
        border-color: rgba(108, 123, 168, 0.5);
        background: rgba(108, 123, 168, 0.5);
      }
      color: rgba(255, 255, 255, 0.8);
    }
  }
  .verifycode_img {
    width: 48px;
    height: 28px;
    position: absolute;
    top: 0;
    right: -5px;
    border-top-right-radius: 8px;
    border-bottom-right-radius: 8px;
  }
  .el-link {
    width: 54px;
    height: 28px;
    line-height: 28px;
    text-align: center;
    border-radius: 4px;
    margin-left: 6px;
    display: inline-block;
    &:after {
      display: none;
    }
  }
  .login {
    margin-left: 10px;
    background-image: url("../assets/logbtn.png");
    background-size: cover;
    color: #fff;
    border-radius: 25px;
    box-shadow: 0 4px 8px 0 rgba(194, 211, 222, 0.5);
  }
  .register {
    background-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGwAAAA4BAMAAADqVwAfAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAHlBMVEVHcEzQ4f/P4P/O3//O3//O3//3+v/z9//v9P/R4f/Q7VIgAAAABnRSTlMAKlODteN/rdyeAAAC50lEQVR42p2Wv07cQBDGN4Tr01DQUSQFHRKKBB2KFAm6I0TieIDswgNkZ6jhmHHJf+dts5/H6zsbHz7z097YMzufh531HesWfNr/efFvJc+/97+4Hr5elPouxfMP94bvpbC+i3Bx5jp8K3UQluJXV0UkOgRRW/e5ZIgGISn23IITobV0wvzkGrZeSdaqxkJXp82GzSJx0+Y0YEozZXd1cZ63byJEtHq7tCyymllIp3lllBBdBxR4qtv4Eoh4PRVkV9bMXQJMOghTItKDA7MQiNZqJUPn/RyqjZfoI1XYjnI3F2CGhBIhXO+gj3feoxwjWl37MVWM3l+il4dJ5UOgTKA+Qv3xPukek+zcg+BjAurYIngMD1t5hOQ/WJoH0feDOBSthKsdt3nnR3N55CbRjyZM3bb/APdo5Hhu3EG7fK/XjYQbdxxxUzXfxyYzwAu4IApr80a4dTNTeZsN0MOmD3lkxjrazCN/7s4jZMnNQbNUPZ/IRwB9PQ/or3utBFRRJVBcvGLwq9jyfEovXAkHt1kcqsByxJxm3hNduxmFSBno7WYpklj2MOZJNp4kO6bx8K07YBqN3LhDFQLM0MNIGmwWEerMJ/TRbatI8qSCyQy0wvDgK4vaPSyxyL2bqDICBhJYFX4O2hMyihSduk1VTY6JVSHJapAji3lKnyO3UUIn2kKaay/FjnOzOgNaVIWFZw6igPMdzBw/eNqCW0X7wQ/eREczdc4W1/yhb6qK2e7SsDiDWBnNxsAukTXU9hpB+ODZgd3m6USmqtLIBCRiIlERkz3UpwtrFXKQDiqVdP+XsIJ8xjixPRW2uaaC1apfTosh88kZk0pFg5iqmDYHDCwN5QZUjJcMBwxjq1SloXJC6AgXp67hxKoJM1OGMYBZYQibleVmkto0lHVDJO+XBQSXYq9znBThxbfaVHYPxJ6oPQdKJs7CXAiVlr/1UL059JqKAbHJk22GaHG24ohNK2kfsT94oP8PXdIJdHYeTw8AAAAASUVORK5CYII=");
    background-size: cover;
    color: #fff;
    border-radius: 25px;
    color: #595859;
    box-shadow: 0 4px 8px 0 rgba(194, 211, 222, 0.5);
  }
}
// .top_user_info {
//   li {
//     float: left;
//   }
// }
.user-info {
  display: flex;
  align-items: center;
  .manifestList_manifestList {
    width: 70px;
    border-radius: 12px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-right: 16px;
    position: sticky;
    .manifestList_manifest_item {
      cursor: pointer;
      color: #fff;
      font-size: 12px;
      white-space: nowrap;
      text-align: center;
      .manifestList_icon {
        width: 28px;
        height: 28px;
        margin: 0 auto;
        &.first {
          background-image: url("../assets/qianbao.png");
          background-size: cover;
        }
        &.second {
          background-image: url("../assets/zhuangzhang.png");
          background-size: cover;
        }
        &.third {
          background-image: url("../assets/qukuan.png");
          background-size: cover;
        }
      }
      .manifestList_toolName {
        color: #595859;
        line-height: 20px;
        font-size: 14px;
      }
    }
  }
  .userInfo_username_warp {
    display: flex;
    -webkit-align-items: center;
    align-items: center;
    height: 12px;
    color: #595859;
    font-weight: bold;
  }
  .userInfo_user_warp {
    display: flex;
    align-items: center;
  }
  .userInfo_userinfo_bottom {
    display: flex;
    height: 20px;
    align-items: center;
    margin-top: 4px;
    .userInfo_arrowRotate {
      transform: rotate(-180deg);
      width: 14px;
      height: 14px;
      margin-left: 8px;
      transition: all 0.3s ease;
      margin-top: 1px;
    }
    p {
      font-size: 13px;
      color: #595859;
      transition: color 0.2s ease-out;
    }
  }
  .userInfo_photo_warp {
    width: 48px;
    height: 48px;
    border-radius: 50%;
    position: relative;
    margin-left: 16px;
    img {
      width: 100%;
      height: 100%;
    }
  }
  .popoverCon {
    position: relative;
    .info-dropDown {
      position: absolute;
      right: 0px;
      top: 48px;
      z-index: 999;
      border-radius: 8px;
      background: #fff;
      width: 200px;
      height: 370px;
      padding: 10px;
      box-shadow: 0 3px 6px -4px rgba(0, 0, 0, 0.12),
        0 6px 16px 0 rgba(0, 0, 0, 0.18), 0 9px 28px 8px rgba(0, 0, 0, 0.15);
      ul {
        li {
          height: 60px;
          line-height: 60px;
          margin-bottom: 10px;
          a {
            .icon {
              display: inline-block;
              width: 24px;
              height: 24px;
              margin-top: -4px;
              margin-right: 10px;
              vertical-align: middle;
              background-image: url("../assets/sprite-76d75d55cfd338b59b065897ff0a49a0.png");
              background-size: 232px 24px;
              background-repeat: no-repeat;
              &.icon1 {
                background-position: -104px 0;
              }
              &.icon2 {
                background-position: 0 0;
              }
              &.icon3 {
                background-position: -156px 0;
              }
              &.icon4 {
                background-position: -78px 0;
              }
            }
            &:hover {
              color: #3181ff;
            }
          }
        }
      }
      .log-out {
        display: block;
        width: 100%;
        text-align: center;
        outline: none;
        border: 1px solid #e2e7ef;
        font-size: 14px;
        color: #cbced8;
        background-color: #fff;
        padding: 11px 0;
        transition: all 0.2s ease-out;
        border-radius: 4px;
        cursor: pointer;
      }
    }
  }
}
</style>
<style>
.el-input__inner::-webkit-input-placeholder {
  color: rgba(255, 255, 255, 0.7) !important;
}
.el-input__inner::-moz-placeholder {
  /* Mozilla Firefox 4 to 18 */
  color: rgba(255, 255, 255, 0.7);
}
.el-input__inner::-ms-input-placeholder {
  /* Internet Explorer 10-11 */
  color: rgba(255, 255, 255, 0.7);
}
</style>