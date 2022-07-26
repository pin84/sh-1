<template>
  <view class="lebg" style="min-height: 100vh">
    <view class="padding-xl">
      <!-- 用户名，手机号，密码，手机验证码 -->
      <view class="cu-form-group flex justify-center padding-xl text-white"
        ><h1>注册账户</h1></view
      >
      <view>
        <text class="text-xs text-white">如果你已拥有本公司账户，</text>
        <a href="" class="text-xs text-yellow" @click="loginClick"
          >点击此处登录</a
        >
      </view>

      <view
        class="search-form radius flex align-center padding-sm margin-top-df bg"
      >
        <i class="iconfont icon-yonghu text-black margin-right-sm text-df"></i>
        <input
          v-model="submitData.userName"
          placeholder-class="text-gray text-sm"
          placeholder="请输入3-15个字母或数字组合"
          name="input"
          class="text-black text-df flex-sub"
        />
      </view>
      <view
        class="search-form radius flex align-center padding-sm margin-top-df bg"
      >
        <i class="iconfont icon-mima text-black margin-right-sm text-df"></i>
        <input
          v-model="submitData.userPwd"
          placeholder-class="text-gray text-sm"
          placeholder="请输入密码（6-14个字母或数字组合）"
          name="input"
          type="password"
          class="text-black text-df flex-sub"
        />
      </view>

      <block v-for="(item, index) in registerList" :key="index">
        <view class="list-input">
          <view
            class="search-form radius flex align-center padding-sm margin-top-xs bg"
          >
            <i
              class="iconfont text-black text-bold margin-right-sm" :class="item.icon"
            ></i>
            <input
              v-model="item.inputText"
              placeholder-class="text-gray text-sub"
              :placeholder="item.placeholder"
              :name="item.name"
              class="text-black text-df flex-sub"
            />
          </view>

          <view
            v-if="item.name == 'verifycode'"
            class="right margin-top-sm margin-left-sm"
          >
            <imgcode width="80" height="22" ref="imgcode"></imgcode>
          </view>
          <view
            v-if="item.name == 'code'"
            class="right margin-top-sm margin-left-sm"
          >
            <button class="cu-btn bg-green round" @tap="getCodeClick">
              {{ btnVal }}
            </button>
          </view>
        </view>
      </block>

      <view class="flex margin-top-df"
        ><button  @click="register" class="flex-sub cu-btn lg btn"  :class="{error:btn1Disable,primary:!btn1Disable}" :disabled="btn1Disable">{{btn1Name}}</button></view
      >
    </view>
  </view>
</template>

<script>
import http from "common/js/http.js";
import imgcode from "components/imgcode/imgcode.vue";
export default {
  data() {
    return {
		btn1Disable: false,
		btn1CountDown: 3, //按钮提交倒计时
		btn1CountDownInterval: null,
		btn1Name: "立即注册",
      originalInviteCode: "",
      date: "",
      registerList: [],
      submitData: {
        userName: "",
        userPwd: "",
        // userPhone: "",
        // phoneCode: "",
        // record_id: "",
        // verifycode: "",
      },
      count: 0,
      isClick: true,
      btnVal: "获取验证码",
      Interval: null,
      isCheck: false,
      isShowModal: false,
      isTimeOut: true,
    };
  },
  components: {
    imgcode,
  },
  onUnload() {
    if (this.Interval != null) {
      clearInterval(this.Interval);
    }
  },

  created() {
     let routes = getCurrentPages()
      let { inviteCode } = routes[routes.length - 1].options
    this.originalInviteCode = inviteCode;
    // this.registerList[7].value = inviteCode
    this.initData();
  },
  methods: {
	  lockBtn() {
	      if (!this.btn1Disable) {
	        this.btn1Disable = true;
	        this.btn1Name = "立即注册(" + this.btn1CountDown-- + ")";
	        this.btn1CountDownInterval = setInterval(() => {
	          if (this.btn1CountDown < 1) {
	            this.unlockBtn();
	          } else {
	            this.btn1Disable = true;
	            this.btn1Name = "立即注册(" + this.btn1CountDown-- + ")";
	          }
	        }, 1000);
	      }
	  },
	  unlockBtn() {
	      this.btn1Disable = false;
	      this.btn1CountDown = 3;
	      this.btn1Name = "立即注册";
	      clearInterval(this.btn1CountDownInterval);
	      this.btn1CountDownInterval = null;
	  },
    initData() {
       let routes = getCurrentPages()
      let { inviteCode } = routes[routes.length - 1].options
      this.sendRequest({
        url: "System.MemberAdregister.generalizeRegistered",
        data: { inviteCode },
        success: (res) => {
			
			if(res.code>=0){
				let { list } = res.data;
				list.forEach((item) => {
				  item.inputText = "";
				});


				
				list.sort((a, b) => a.sort - b.sort);
				console.log(list);
				this.registerList = list;
			}
			else{
				uni.showModal({
					title:'出错了',
					content:res.message,
					showCancel:false,
					success() {
						uni.switchTab({
								url:"/pages/index/index/index"
							});
					}
				})
			}
          

          // icon: "icon-mail"
          // name: "email"
          // name_cn: "邮箱"
          // needed: 1
          // placeholder: "邮箱"
          // sort: 6
          // value: 3
        },
      });
    },
    showModal() {
      this.isShowModal = true;
    },
    hideModal() {
      this.isShowModal = false;
    },
    CheckboxChange() {
      this.isCheck = !this.isCheck;
    },
    setTime() {
      clearInterval(this.Interval);
      this.isClick = false;
      this.count = 60;
      this.Interval = setInterval(() => {
        this.count--;
        if (this.count > 0) {
          this.btnVal = this.count + "s后重新获取";
        } else {
          this.btnVal = "重新发送";
          this.isClick = true;
          clearInterval(this.Interval);
        }
      }, 1000);

      let obj = this.registerList.find((item) => item.name == "phone");

      this.sendRequest({
        url: "System.SendMsg.sendVeryCode",
        method: "POST",
        data: {
          phone: obj.inputText,
        },
        success: (res) => {
          if (res.code == 0) {
            this.submitData.record_id = res.data.record_id;
            let now = new Date().getTime();
            uni.setStorageSync("phoneRecordId", {
              time: now,
              reordId: res.data.record_id,
            });
          }
        },
      });
    },
    getCodeClick() {
      if (this.count !== 0) {
        return;
      }
      let obj = this.registerList.find((item) => item.name == "phone");
      if (!/^1[0-9]{10}$/.test(obj.inputText)) {
        this.$util.showToast({
          title: "手机号不正确",
        });
      } else {
        this.setTime();
      }
    },
    registerCheck() {
      let now = new Date().getTime();
      let { time, reordId } = uni.getStorageSync("phoneRecordId");
      if (now > time + 5 * 60 * 1000) {
        this.$util.showToast({
          title: "验证码已过期，请重新获取",
        });
        return false;
      }

      if (this.submitData.userName == "") {
        this.$util.showToast({
          title: "用户名不能为空",
        });
        return false;
      }

      if (!/^1[3|4|5|8|7|6|9][0-9]\d{4,8}$/.test(this.submitData.userPhone)) {
        this.$util.showToast({
          title: "手机号不正确",
        });
        return false;
      }
      if (this.submitData.userPwd == "") {
        this.$util.showToast({
          title: "密码不能为空",
        });
        return false;
      }
      if (this.submitData.userPwd.length < 6) {
        this.$util.showToast({
          title: "密码不能少于6个字符",
        });
        return false;
      }
      if (this.submitData.phoneCode == "") {
        this.$util.showToast({
          title: "请填写验证码",
        });
        return false;
      }

      // if (this.registerList[5].value !== '') {
      // 	if (!this.$util.checkEmail(this.registerList[5].value)) {
      // 		return false;
      // 	}
      // }

      // if (!this.isCheck) {
      // 	this.$util.showToast({
      // 		title: '请同意用户协议'
      // 	});
      // 	return false;
      // }

      return true;
    },
    register() {
      // let flag = this.registerCheck();
      // if (!flag) {
      //   return;
      // }
this.lockBtn();
       let routes = getCurrentPages()
      let { inviteCode } = routes[routes.length - 1].options

      let qq = this.registerList.find((item) => item.name == "qq");
      let realname = this.registerList.find((item) => item.name == "realname");
      let verifycode = this.registerList.find(
        (item) => item.name == "verifycode"
      );
      let phone = this.registerList.find((item) => item.name == "phone");
      let code = this.registerList.find((item) => item.name == "code");

      let obj = {
        username: this.submitData.userName,
        password: this.submitData.userPwd,
        record_id: uni.getStorageSync("phoneRecordId").reordId,
        originalInviteCode: inviteCode,

        // qq: qq ? qq.inputText : "",
        // realname: realname ? realname.inputText : "",
        // verifycode: verifycode ? verifycode.inputText : "",
        // phone: phone ? phone.inputText : "",
        // code: code ? code.inputText : " ",
      };

      
      let obj1 = {}
       this.registerList.forEach(item=>{
         obj1[item.name] = item.inputText
       })

       let obj2 = Object.assign({},obj,obj1)


      //console.log("---", obj2);
      //注册接口
	  
      this.sendRequest({
        url: "System.Login.generalizeRegisteredMemberAdd",
        method: "POST",
        data: obj2,
        success: (res) => {
          if (res.code == -1) {
            this.$util.showToast({
              title: res.message,
            });
			this.unlockBtn();
            return false;
          }
          if (res.code == 1) {
            this.$util.showToast({
              title: "注册成功",
            });
            uni.setStorageSync("token",res.token);
            setTimeout(() => {
              this.$util.redirectTo("/pages/login/login/login", {}, "");
            }, 1000);
          }
        },
      });
    },

    DateChange(e) {
      this.date = e.detail.value;
    },

    // this.$util.showToast({title:'注册成功'})
    // setTimeout(()=>{
    // 	uni.redirectTo({
    // 	    url: 'test?id=1'
    // 	});
    // },2000)
    loginClick() {
      this.$util.redirectTo("/pages/login/login/login", {}, "");
    },
    resetClick() {
      this.$util.redirectTo("/pages/login/reset/reset", {}, "");
    },
  },
  mixins: [http],
};
</script>

<style lang="scss" scoped>
@import "/common/css/bg.css";
.primary{    background-color: #F43F3B;
    color: #ffffff;}
.list-input {
  // border: 1px solid red;
  display: flex;
  margin-top: 10rpx;
  justify-content: space-between;
  padding-right: 10rpx;
  .search-form {
    width: 100%;
  }
  .right {
    flex: 0 0 200rpx;
    // border: 1px solid red;
    .cu-btn {
      font-size: 24rpx;
      margin: 0;
      padding: 0;
      width: 200rpx;
    }
  }
}

.lebg {
  .bg {
        background-color: #e8f0fe;
  }

  .btn {
    margin: 0;
    padding: 45rpx 10rpx;
  }

  .iconfont {
    font-size: 24rpx;
  }
}

a {
  text-decoration: none;
}

.cu-form-group {
  background-color: rgba(0, 0, 0, 0);
  padding: 0;
}
</style>
