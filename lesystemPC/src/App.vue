<template>
  <div id="app" @click="playBgm">
    <keep-alive v-if="$route.meta.keepAlive">
      <router-view></router-view>
    </keep-alive>
    <router-view v-else></router-view>
    <!-- <HelloWorld msg="Welcome to Your Vue.js App" /> -->
  </div>
</template>

<script>
// import HelloWorld from "./components/HelloWorld.vue";
import Config from '@/plugins/config.js'
export default {
  name: "app",
  components: {
    // HelloWorld
  },
  data() {
    return {
      indexParameterTimer: null,
    };
  },
  methods: {
    playBgm() {
      let status = this.$myAudio.audio().paused;
      if (!status) return;
      this.$myAudio.playBgm();
    },
    checkIndexParameter() {
      this.$get("Pc.Params.getIndexParams").then((res) => {
        let data = res.data;
        let isMaintain = data.IsMaintain;
        let isLogout = data.isLogout;
        let message = data.msg != undefined ? data.msg : "";
        let kefu_address = localStorage.getItem("kefu"); //去seesion中的值
        let token = localStorage.getItem("token");
        let new_kefu_address = data.kefu_address;
        if (
          kefu_address == null ||
          kefu_address == undefined ||
          kefu_address == "" ||
          new_kefu_address != kefu_address
        ) {
          if (
            new_kefu_address != null &&
            new_kefu_address != undefined &&
            new_kefu_address != ""
          ) {
            localStorage.setItem("kefu", new_kefu_address);
          }
        }
        if (isMaintain == 1) { //
        	let maintainTime = data.MaintainTime;
        
        	if (maintainTime != undefined && maintainTime != '') {
        		localStorage.setItem("maintainTime", maintainTime);
        	}
        	let currentpage = this.$route.path;
        	currentpage = currentpage.replace(/\//g, "_");
			console.log(currentpage);
        	if (currentpage != '_pages_maintain_maintain') {
				this.$router.push("/pages/maintain/maintain");
        	}
        }
        else if (token != undefined && token != "" && isLogout > 0) {
          this.handleLogoutAction(isLogout, message);
        }
      });
    },
    handleLogoutAction(isLogout, message) {
      let currentpage = this.$route.path;
      currentpage = currentpage.replace(/\//g, "_");
	  //console.log(currentpage);
      if (isLogout == 1) {
        //超时。app不处理超时
        localStorage.removeItem("token");
        this.$alert("你已经超时退出系统，请重新登陆", "超时退出提醒", {
          confirmButtonText: "确定",
          callback: (action) => {
            this.$router.push("/user/login");
          },
        });
      } else if (isLogout == 2) {
        //被管理踢下线
        localStorage.removeItem("token");
        this.$alert("你已经下线，请重新登陆", "你已经下线", {
          confirmButtonText: "确定",
          callback: (action) => {
            this.$router.push("/user/login");
          },
        });
      } else if (isLogout == 3) {
        //被锁定
        localStorage.removeItem("token");
        this.$alert("账户已经锁定，请联系客服", "账户已经锁定", {
          confirmButtonText: "确定",
          callback: (action) => {
            this.$router.push("/user/login");
          },
        });
      } else if (isLogout == 4) {
        //其他地方登陆了
        localStorage.removeItem("token");
        this.$alert(
          "请确定是否你本人操作，请重新登陆",
          "你已经在其他设备登陆了",
          {
            confirmButtonText: "确定",
            callback: (action) => {
              this.$router.push("/user/login");
            },
          }
        );
      } else if (isLogout == 111) {
		 //console.log(currentpage);
        //强制修改密码
        if (
          currentpage != "_user_withdraw_changepassword" &&
          currentpage != "_user_login"
        ) {
          localStorage.removeItem("token");
          if (message != undefined && message != "") {
            this.$alert(message, "强制退出重要提示", {
              confirmButtonText: "确定",
              callback: (action) => {
                this.$router.push("/user/login");
              },
            });
          }
        }
      } else if (isLogout == 110) {
        //自定义消息
        localStorage.removeItem("token");
        if (message != undefined && message != "") {
          if (message != undefined && message != "") {
            this.$alert(message, "重要提示", {
              confirmButtonText: "确定",
              callback: (action) => {
                this.$router.push("/user/login");
              },
            });
          }
        }
      }
    },
    checkUnreadMessage() {
      let token = localStorage.getItem("token");

      if (token != undefined && token != "") {
        this.$get("Pc.Message.queryMessages").then((res) => {
          if (res.code == 0) {
            let resultArray = res.data;
            let jishi_msg_count = resultArray[0].count;
            let jishi_msg_id = resultArray[0].id;

            let gonggao_msg_count = resultArray[1].count; //重要未读消息
            let gonggao_msg_id = resultArray[1].id;

            if (jishi_msg_count > 0) {
              let unread_jishi_msg_id = localStorage.getItem(
                "unread_jishi_msg_id"
              );
              if (
                unread_jishi_msg_id == undefined ||
                unread_jishi_msg_id == "" ||
                unread_jishi_msg_id != jishi_msg_id
              ) {
                localStorage.setItem("unread_jishi_msg_id", jishi_msg_id);
                this.$notify({
                  title: "重要提醒",
                  dangerouslyUseHTMLString: true,
                  message:
                    "<a href='/user/message/instation_notice'>你有<i style='color:red'>" +
                    jishi_msg_count +
                    "</i>条重要消息</a>",
                  duration: 0,
                  position: "bottom-right",
                  //onClose: function() {
                  //}
                });
              }
            }
            if (gonggao_msg_count > 0) {
              let unread_gonggao_msg_id = localStorage.getItem(
                "unread_gonggao_msg_id"
              );
              if (
                unread_gonggao_msg_id == undefined ||
                unread_gonggao_msg_id == "" ||
                unread_gonggao_msg_id != gonggao_msg_id
              ) {
                localStorage.setItem("unread_gonggao_msg_id", gonggao_msg_id);
                this.$notify({
                  title: "公告提醒",
                  dangerouslyUseHTMLString: true,
                  message:
                    "<a href='/user/message/web_notice'>你有<i style='color:red'>" +
                    gonggao_msg_count +
                    "</i>条公告消息</a>",
                  duration: 0,
                  position: "bottom-right",
                  //onClose: function() {
                  //}
                });
              }
            }

            //this.$util.setupTabBarBadge(important_msg_count, normal_msg_count);
          }
        });
      }
    },
	checkSysConfig(url) {
		let api = 'System.Speed.testSpeed'; //检查更新地址
		let req = {
			domainType: 1,
			domain: url
		};
		let startTime = new Date().getTime();
		return new Promise((resolved, rejected) => {
			if (url != '' && url != undefined) {
				this.$get(api,req).then((res) => {
					if (res.code == 0) {
						resolved(url);
					}
					});
			} 
		});
	},
	
	
  },
  created() {
    this.checkUnreadMessage();
    this.unreadMessageTimer = setInterval(this.checkUnreadMessage, 20000);
    this.checkIndexParameter();
    this.indexParameterTimer = setInterval(this.checkIndexParameter, 10000);

    Promise.race([this.checkSysConfig(Config.baseUrl), this.checkSysConfig(Config.baseUrl2), this.checkSysConfig(Config
    	.baseUrl3)]).then(
    	(res) => {
    		//console.log(res);
			localStorage.setItem("cdndomain", res);
    	});
    // this.indexParameterTimer = setInterval(this.checkIndexParameter, 5000);
  },
};
</script>

<style>
html,
body,
#app {
  height: 100%;
  margin: 0;
  font-family: "Avenir", Helvetica, Arial, sans-serif;
}

ol,
ul {
  list-style: none;
}

a {
  text-decoration: none;
  color: #333;
}

.qingwu {
  height: 100%;
}

/* .el-autocomplete-suggestion__list li {
  padding: 0 !important;
  text-align: center;
} */
/* .el-dialog__header{
  display:none !important;
}
.el-dialog__body{
  padding:0 !important;
} */
</style>
