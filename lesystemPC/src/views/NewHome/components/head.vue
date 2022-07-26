<template>
  <div class="shop_head" :class="HeaderBackgroundWhite ? 'whiteBG' : ''">
    <div class="header width_center_1190">
      <div class="logo"></div>
      <div class="h-left">
        <div class="menu">
          <ul class="ul_menu-main">
            <li>
              <router-link
                to="/"
                :class="[activeIndex == '/' ? 'active' : '', 'menuA']"
                >首页
              </router-link>
            </li>
            <li
              v-if="DZYX_list"
              @mouseover="dianziyouxiSubnav = true"
              @mouseleave="dianziyouxiSubnav = false"
            >
              <a class="menuA">电子</a>
              <transition name="slide-fade">
                <div class="second" v-show="dianziyouxiSubnav">
                  <div class="zonghe_games_item_content">
                    <ul>
                      <li v-for="(gv, gk) in DZYX_list.gameList" :key="gk">
                        <a target="_blank" @click="toUrlLink(gv)">
                          <img :src="gv.picUrl" width="80" height="80" />
                          <span class="text-box">
                            <span>{{ gv.showName }}</span>
                            
                          </span>
                        </a>
						<div class="isMaintain" v-if="gv.isMaintain"></div>
                        <div class="img-box" @click="toUrlLink(gv)"><img :src="gv.skinImgPc" /></div>
                      </li>
                    </ul>
                  </div>
                </div>
              </transition>
            </li>
            <li
              v-if="ZRSP_list"
              @mouseover="zhenrenSubnav = true"
              @mouseleave="zhenrenSubnav = false"
            >
              <a class="menuA">真人</a>
              <transition name="slide-fade">
                <div class="second" v-show="zhenrenSubnav">
                  <div class="zonghe_games_item_content">
                    <ul>
                      <li v-for="(gv, gk) in ZRSP_list.gameList" :key="gk">
                        <a target="_blank" @click="toUrlLink(gv)">
                          <img :src="gv.picUrl" width="80" height="80" />
                          <span class="text-box">
                            <span>{{ gv.showName }}</span>
                            
                          </span>
                        </a>
						<div class="isMaintain" v-if="gv.isMaintain"></div>
                        <div class="img-box" @click="toUrlLink(gv)"><img :src="gv.skinImgPc" /></div>
                      </li>
                    </ul>
                  </div>
                </div>
              </transition>
            </li>
            <li
              v-if="TYJJ_list"
              @mouseover="sportSubnav = true"
              @mouseleave="sportSubnav = false"
            >
              <a class="menuA">体育</a>
              <transition name="slide-fade">
                <div class="second" v-show="sportSubnav">
                  <div class="zonghe_games_item_content">
                    <ul>
                      <li v-for="(gv, gk) in TYJJ_list.gameList" :key="gk">
                        <a target="_blank" @click="toUrlLink(gv)">
                          <img :src="gv.picUrl" width="80" height="80" />
                          <span class="text-box">
                            <span
                              >{{ gv.showName }}
                              
                            </span>
                          </span>
                        </a>
						<div v-if="gv.isMaintain"  class="isMaintain"></div>
                        <div class="img-box" @click="toUrlLink(gv)"><img :src="gv.skinImgPc" /></div>
                      </li>
                    </ul>
                  </div>
                </div>
              </transition>
            </li>
            <li
              v-if="QPYX_list"
              @mouseover="qipaiyouxiSubnav = true"
              @mouseleave="qipaiyouxiSubnav = false"
            >
              <a class="menuA">棋牌</a>
              <transition name="slide-fade">
                <div class="second" v-show="qipaiyouxiSubnav">
                  <div class="zonghe_games_item_content">
                    <ul>
                      <li v-for="(gv, gk) in QPYX_list.gameList" :key="gk">
                        <a target="_blank" @click="toUrlLink(gv)">
                          <img :src="gv.picUrl" width="80" height="80" />
                          <span class="text-box">
                            <span
                              >{{ gv.showName }}
                              
                            </span>
                          </span>
                        </a>
						<div v-if="gv.isMaintain"  class="isMaintain"></div>
                        <div class="img-box" @click="toUrlLink(gv)"><img :src="gv.skinImgPc" /></div>
                      </li>
                    </ul>
                  </div>
                </div>
              </transition>
            </li>
            <li
              v-if="FBD_list"
              @mouseover="fanbodanSubnav = true"
              @mouseleave="fanbodanSubnav = false"
            >
              <a class="menuA">反波胆 </a>
              <transition name="slide-fade">
                <div class="second" v-show="fanbodanSubnav">
                  <div class="zonghe_games_item_content">
                    <ul>
                      <li v-for="(gv, gk) in FBD_list.gameList" :key="gk">
                        <a target="_blank" @click="toUrlLink(gv)">
                          <img :src="gv.picUrl" width="80" height="80" />
                          <span class="text-box">
                            <span
                              >{{ gv.showName }}
                             
                            </span>
                          </span>
                        </a>
						<div v-if="gv.isMaintain"  class="isMaintain"></div>
                        <div class="img-box" @click="toUrlLink(gv)"><img :src="gv.skinImgPc" /></div>
                      </li>
                    </ul>
                  </div>
                </div>
              </transition>
            </li>
            <li
              v-if="BYYX_list"
              @mouseover="buyuyouxiSubnav = true"
              @mouseleave="buyuyouxiSubnav = false"
            >
              <a class="menuA">捕鱼 </a>
              <transition name="slide-fade">
                <div class="second" v-show="buyuyouxiSubnav">
                  <div class="zonghe_games_item_content">
                    <ul>
                      <li v-for="(gv, gk) in BYYX_list.gameList" :key="gk">
                        <a target="_blank" @click="toUrlLink(gv)">
                          <img :src="gv.picUrl" width="80" height="80" />
                          <span class="text-box">
                            <span>{{ gv.showName }}</span>
                            
                          </span>
                        </a>
						<div class="isMaintain" v-if="gv.isMaintain"></div>
                        <div class="img-box" @click="toUrlLink(gv)"><img :src="gv.skinImgPc" /></div>
                      </li>
                    </ul>
                  </div>
                </div>
              </transition>
            </li>
            <li
              v-if="JJYX_list"
              @mouseover="jiejiSubnav = true"
              @mouseleave="jiejiSubnav = false"
            >
              <a class="menuA">街机 </a>
              <transition name="slide-fade">
                <div class="second" v-show="jiejiSubnav">
                  <div class="zonghe_games_item_content">
                    <ul>
                      <li v-for="(gv, gk) in JJYX_list.gameList" :key="gk">
                        <a target="_blank" @click="toUrlLink(gv)">
                          <img :src="gv.picUrl" width="80" height="80" />
                          <span class="text-box">
                            <span>{{ gv.showName }}</span>
                            
                          </span>
                        </a>
						<div class="isMaintain" v-if="gv.isMaintain"></div>
                        <div class="img-box" @click="toUrlLink(gv)"><img :src="gv.skinImgPc" /></div>
                      </li>
                    </ul>
                  </div>
                </div>
              </transition>
            </li>
            <li
              @mouseover="caipiaosubnav = true"
              @mouseleave="caipiaosubnav = false"
            >
              <a class="menuA">乐彩彩票 </a>
              <transition name="slide-fade">
                <div class="second big-background" v-show="caipiaosubnav">
                  <div class="zonghe_games_item_content">
                    <div class="creditPlay menu-child">
                      <div class="sub-title">
                        <div class="color">信</div>
                        <h1>信用玩法</h1>
                      </div>

                      <div class="menu-child-content caipiaocontent">
                        <ul>
                          <li v-for="(v, k) in xinyong_game_list" :key="k">
                            <a target="_blank" @click="toUrlLink(v)">
                              <img :src="v.picUrl" width="60" height="60" />
                              <span class="text-box">
                                <span>{{ v.showName }} </span>
                                <span
                                  v-if="v.isMaintain"
                                  class="isMaintain"
                                ></span>
                              </span>
                            </a>
                          </li>
                        </ul>
                      </div>
                    </div>
                    <div class="officalPlay menu-child">
                      <div class="sub-title">
                        <div class="color">官</div>
                        <h1>官方玩法</h1>
                      </div>
                      <div class="menu-child-content caipiaocontent">
                        <ul>
                          <li v-for="(gv, gk) in guanfang_game_list" :key="gk">
                            <a target="_blank" @click="toUrlLink(gv)">
                              <img :src="gv.picUrl" width="60" height="60" />
                              <span class="text-box">
                                <span>{{ gv.showName }} </span>
                                <span
                                  v-if="gv.isMaintain"
                                  class="isMaintain"
                                ></span>
                              </span>
                            </a>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </transition>
            </li>
          </ul>
        </div>
      </div>
      <div class="h-right">
        <div class="menu">
          <ul class="ul_menu-main">
            <li>
              <router-link
                to="/activity"
                :class="[activeIndex == '/activity' ? 'active' : '', 'menuA']"
                ><span class="iconfont icon-youhuiquan1"></span>优惠
              </router-link>
            </li>
            <li>
              <router-link
                to="/phone"
                :class="[activeIndex == '/phone' ? 'active' : '', 'menuA']"
                ><span class="iconfont icon-appxiazai"></span>APP
              </router-link>
            </li>
            <li>
              <a class="menuA" :href="kefuUrl" target="_blank">
                <span class="iconfont icon-kefu"></span>客服
              </a>
            </li>
          </ul>
        </div>
      </div>
      <HeadLogin :isInLoginPage="isInLoginPage" @loginsuccess="loginsuccess"></HeadLogin>
    </div>
  </div>
  <!--header结束---->
</template>
<script>
import HeadLogin from "./head_login.vue";
export default {
  components: {
    HeadLogin,
  },
  props: {
    change_color: {
      type: Boolean,
      default: false,
    },
    isInLoginPage: {
      type: Boolean,
      default: false,
    },
    cart_change: {
      type: Number,
    },
	  gameList: {
	    default: () => [],
	  },
  },
  data() {
    return {
      activeIndex: "/",
      caipiaosubnav: false,
      zhenrenSubnav: false,
      sportSubnav: false,
      jiejiSubnav: false,
      fanbodanSubnav: false,
      dianziyouxiSubnav: false,
      buyuyouxiSubnav: false,
      qipaiyouxiSubnav: false,
      loginDialogVisible: false,
      userInfo: {
        username: "",
        password: "",
        validateCode: "",
        uuid: "",
      },
      kefuUrl: "",
      //token:'',
      isLogin: false,
      xinyong_game_list: [],
      guanfang_game_list: [],
      FBD_list: [],
      DZYX_list: [],
      ZRSP_list: [],
      QPYX_list: [],
      BYYX_list: [],
      JJYX_list: [],
      TYJJ_list: [],
      zhenrenshow: false,
      verifycodeImg: "",
      cart_count: 0,
      center_top: true,
      HeaderBackgroundWhite: false,
      //gameListData: [],
      //BlueNavInfoList: [],
    };
  },
  watch: {
    gameList: {
      handler(newval, oldval) {
        
          this.setupNavValue(newval);
      },
    },
  },
  computed: {},
  methods: {
    // getMenuNavInfo() {
    //   this.$get("Pc.HomePage.getYLCNavInfoList").then((res) => {
    //     if (res.code >= 0) {
    //       this.gameListData = res.data;
    //     }
    //   });
    // },
	loginsuccess(val){
		this.$emit("loginsuccessUserInfo",val)
	},
	setupNavValue(val){
		this.xinyong_game_list = val.gameType0;
		this.guanfang_game_list = val.gameType1;
		this.FBD_list = val.FBD;
		this.DZYX_list = val.DZYX;
		this.ZRSP_list = val.ZRSP;
		this.QPYX_list = val.QPYX;
		this.BYYX_list = val.BYYX;
		this.JJYX_list = val.JJYX;
		this.TYJJ_list = val.TYJJ;
	},
    getBlueNavInfoList() {
      this.$get("Pc.HomePage.getBlueNavInfoList").then((res) => {
        if (res.code >= 0) {
          let gameNavListData = res.data;
		  this.setupNavValue(gameNavListData);
          //console.log(this.BlueNavInfoList);
        }
      });
    },
    toUrlLink(obj) {
      let { isMaintain } = obj;
      if (isMaintain) {
        return;
      } else if (!this.isLogin) {
        //console.log(obj.urlLink);
        let gobackurl = encodeURIComponent(obj.urlLink);
        this.$router.push({ name: "user_login", query: { goback: gobackurl } });
        return;
      } else {
        this.$router.push(obj.urlLink);
      }

      setTimeout(() => {
        location.reload();
      }, 100);
    },
    goLottery() {
      if (this.$isEmpty(localStorage.getItem("token"))) {
        this.loginDialogVisible = true;
      } else {
        this.$router.push("/games-india");
      }
    },
    setupKefu: function () {
      let kefu = localStorage.getItem("kefu");
      this.kefuUrl = kefu;
    },
  },
  beforeUpdate() {
    let path = this.$route.path;
    this.activeIndex = path;
  },
  created() {
    let token = localStorage.getItem("token");
    if (!this.$isEmpty(token)) {
      this.isLogin = true;
    }
    this.setupKefu();
    //this.getMenuNavInfo();
	if(this.gameNavList==undefined||this.gameNavList==null||this.gameNavList.length<=0){
		this.getBlueNavInfoList();
	}
    
    window.addEventListener(
      "scroll",
      () => {
        var scrollTop =
          window.pageYOffset ||
          document.documentElement.scrollTop ||
          document.body.scrollTop;
        if (scrollTop >= 50) {
          this.HeaderBackgroundWhite = true;
          // this.center_top = false;
        } else {
          // this.center_top = true;
          this.HeaderBackgroundWhite = false;
        }
      },
      true
    );
  },
  mounted() {},
};
</script>
<style lang="scss" scoped>
.shop_head {
  // position: absolute;
  height: 85px;
  width: 100%;
  z-index: 999;
  background-image: linear-gradient(
    180deg,
    rgba(253, 215, 144, 0.22),
    rgba(255, 213, 139, 0),
    rgba(254, 213, 142, 0) 200%
  );
  &.whiteBG {
    background: #fff;
    position: fixed;
    left: 0;
    top: 0;
    z-index: 99;
    box-shadow: 0 2px 4px 0 rgba(203, 206, 216, 0.2);
  }
}

.header {
  height: 90px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.header .logo {
  height: 85px;
  width: 100px;
  background: url("../assets/zlogo.png") no-repeat;
  background-size: contain;
  background-position: center;
  position: sticky;
  z-index: 10;
}
.header .h-left {
  height: 90px;
  line-height: 90px;
  margin-right: auto;
  margin-left:8px;
  .ul_menu-main {
    li {
      a.menuA {
        position: sticky;
        z-index: 99;
        transition: all 2s ease;
        &:hover {
          &:after {
            content: "";
            width: 100%;
            height: 2px;
            background: #ffb024;
            position: absolute;
            left: 0;
            bottom: 24px;
            transition: all 2s ease;
          }
        }
      }
      a.active {
        &:after {
          content: "";
          width: 100%;
          height: 2px;
          background: #ffb024;
          position: absolute;
          left: 0;
          bottom: 24px;
        }
      }
    }
  }
  .second {
    .zonghe_games_item_content {
	  .caipiaocontent{
		  ul{
		  li {
			  background: none;
		    a {
		      width: 52px;
		      height: 52px;
			  font-size: 12px;
			  }
			img {
			  width: 40px;
			  height: 40px;
			  margin: 5px;
			}
		  }
		  }
	  }
      li {
        a {
          width: 80px;
          height: 80px;
          margin: 0 auto;
          margin-bottom: 8px;
          border-radius: 12.7px;
          box-shadow: 0 4px 8px 0 rgba(112, 146, 215, 0.14);
          position: relative;
          text-align: center;
          cursor: pointer;
          &:after {
            content: "";
            width: 100%;
            height: 100%;
            position: absolute;
            left: 0;
            top: 0;
            background: url("../assets/gamebtnbg.png")
              no-repeat 0 0 / cover;
            z-index: 0;
          }
          &:hover {
            box-shadow: 0 4px 8px 0 #b6bfdb;
            &:after {
              background: url("../assets/gamebtnbgactive.png")
                no-repeat 0 0 / cover;
              animation: hotTemplate_iconAnimationIn__3fttE 0.5s ease forwards;
            }
          }
          img {
            width: 60px;
            height: 60px;
            margin: 9px;
            position: absolute;
            left: 0;
            z-index: 1;
          }
          .text-box {
            position: absolute;
            top: 100%;
            left: auto;
            right: auto;
            line-height: 18px;
            width: 120%;
            .isMaintain {
              display: block;
              line-height: 10px;
              width: 100%;
              color: #f0142f;
            }
          }
        }
      }
      .img-box {
        width: 231px;
        height: 231px;
        cursor: pointer;
        transform: translateZ(0);
        transition: all .3s;
        margin-top: 20px;
        &:hover{
              transform: scale(1.1) translateZ(0);
        }
        img {
          width: 190px;
          height: 230px;
        }
      }
    }
  }
}
.header .h-right {
  width: 140px;
  height: 90px;
  line-height: 90px;
  .ul_menu-main {
    display: flex;
    align-items: center;
    height: 90px;
    li {
      line-height: 24px;
      margin-right: 12px;
      a {
        text-align: center;
        font-size: 14px;
        .iconfont {
          display: block;
          font-size: 24px;
        }
      }
    }
  }
}

.menu .second {
  color: black;
  position: absolute;
  left: 0px;
  top: 85px;
  width: 100%;
  height: 450px;
  z-index: 10;
  &:after {
    content: "";
    width: 100%;
    height: 100%;
    position: absolute;
    left: 0;
    top: 0;
    z-index: -1;
    background: url("../assets/background-navbar.png") repeat;
  }
}
.menu .big-background {
  height: auto;
  min-height: 450px;
  .zonghe_games_item_content {
    display: flex;
    justify-content: space-between;
    padding: 10px 5px;
    width: 1190px;
    margin: 0 auto;

    .sub-title {
      display: flex;
      align-items: center;
      height: 50px;
      margin-left: 10px;
    }
    .creditPlay {
      width: 50%;
    }
    .officalPlay {
      width: 50%;
    }
    .menu-child-content {
      float: left;
    }
  }
}

.menu-child h1 {
  font-size: 16px;
  color: #303030;
  font-weight: 600;
}

.menu-child .color {
  width: 23px;
  height: 23px;
  text-align: center;
  line-height: 22px;
  font-size: 15px;
  display: block;
  color: #fff;
  border-radius: 4px;
  background-color: #f56c6c;
  margin-right: 10px;
}

.menu-child ul li {
  float: left;
  position: relative;
  line-height: 28px;
  margin: 5px 0;
  height: 80px;
  width: 70px;
  text-align: center;
}

.menu-child ul li .lc {
  position: absolute;
  top: -10px;
  text-align: right;
  font-size: 10px;
  box-sizing: border-box;
  border-radius: 3px;
  font-weight: 600;
  color: red;
}

.menu-child ul li a {
  color: #303030;
  display: block;
  position: relative;
}

.zonghe_games_item_content {
  text-align: center;
  padding: 40px 40px 40px 40px;
}

.second .zonghe_games_item_content ul li a {
  color: #303030;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  font-size: 14px;
  img {
    width: 40px;
    height: 40px;
    // margin-bottom: 10px;
  }
}
.second .zonghe_games_item_content ul li{background-color: #fffcf585;
    padding: 10px;
    border-radius: 10px; position: relative;
}
.second .zonghe_games_item_content ul li a .text-box {
  display: block;
  width: 100%;
  position: relative;
}
.second .zonghe_games_item_content ul li a .g_status {
  background-image: url(../assets/maintaining.png);
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  width: 200px;
  height: 230px;
  display: block;
  margin: 0 auto;
}
.second .zonghe_games_item_content .isMaintain{
	background-image: url(../assets/maintaining.png);
	background-size: cover;
	background-repeat: no-repeat;
	background-position: center;
	width: 210px;
	height: 330px;
	display: block;
	margin: 0 auto;
	position: absolute;
	top: 10px;
	left: 20px;
	z-index: 1000;
}

.second .zonghe_games_item_content ul li a span {
  color: #303030;
  line-height: 24px;
}

.menu-child .menu-child-content ul li {
  position: relative;
}

.menu-child ul li span {
  width: 100%;
  display: block;
}

.menuA {
  float: left;
  width: 100%;
  color: #555;
  cursor: pointer;
  text-decoration: none;
}

.menuA {
  position: relative;
}

.bg_menuShadow {
  width: 100%;
  position: absolute;
  border: 1px solid #ccc;
  top: 0px;
  z-index: 40;
}

.menuSubList {
  margin: 0 auto;
  position: absolute;
  left: 0;
  right: 0;
  top: 85px;
  z-index: 901;
}

.subList {
  margin: 0 auto;
  position: relative;
  width: 1000px;
}

.ul_menu-main .active,
.menuA:hover {
  color: #ffb024;
  background: none;
  font-weight: 400;
}

.ul_menu-main li a {
  color: #595859;
  font-size: 18px;
  display: block;
  cursor: pointer;
  text-decoration: none;
}

.menu > ul li > span {
  color: #dadada;
}

.ul_menu-main li a p {
  font-size: 10px;
  color: #949494;
  margin-top: 8px;
  text-align: center;
  white-space: nowrap;
  display: -ms-flexbox;
  display: flex;
  -ms-flex-pack: center;
  justify-content: center;
}

.menu ul li {
  display: inline-block;
  margin-right: 10px;
}
.slide-fade-enter-active {
  transition: all 0.3s ease;
}
// .slide-fade-leave-active {
//   transition: all 0.3s cubic-bezier(1, 0.5, 0.8, 1);
// }
.slide-fade-enter,
.slide-fade-leave-to {
  transform: translateY(-300px);
  opacity: 0;
}
</style>
