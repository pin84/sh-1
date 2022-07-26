<template>
  <div class="shop_head">
    <head-top
      :loginDialogVisible="loginDialogVisible"
      :isInLoginPage="isInLoginPage"
    ></head-top>
    <!---top结束-->
    <div style="clear: both"></div>
    <div class="header width_center_1190">
      <div class="logo-container">
        <div class="logo"></div>
      </div>
      <div class="right">
        <div class="menu">
          <ul class="ul_menu-main">
            <li>
              <router-link
                to="/"
                :class="[activeIndex == '/' ? 'active' : '', 'menuA']"
                >首页
                <p>HOME</p>
              </router-link>
            </li>
            <li
              v-if="DZYX_list"
              @mouseover="dianziyouxiSubnav = true"
              @mouseleave="dianziyouxiSubnav = false"
            >
              <a class="menuA"
                ><span class="iconfont icon-luckyturning"></span>电子游戏
                <p>ELECTRONIC</p>
              </a>
              <transition>
                <div class="second" v-show="dianziyouxiSubnav">
                  <div class="zonghe_games_item_content">
                    <ul>
                      <li v-for="(gv, gk) in DZYX_list.gameList" :key="gk">
                        <a target="_blank" @click="toUrlLink(gv)">
                          <img
                            style="vertical-align: middle"
                            :src="gv.picUrl"
                            width="80"
                            height="80"
                          />
                          <span class="text-box">
                            <span v-if="gv.isMaintain" class="g_status"></span>
                            <span
                              style="vertical-align: middle; padding-left: 5px"
                              >{{ gv.showName }}
                            </span>
                          </span>
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              </transition>
            </li>
            <li></li>
            <li
              v-if="ZRSP_list"
              @mouseover="zhenrenSubnav = true"
              @mouseleave="zhenrenSubnav = false"
            >
              <a class="menuA"
                ><span class="iconfont icon-meinv" style="color: #e89abe"></span
                >真人视讯
                <p>LIVE</p>
              </a>
              <transition>
                <div class="second" v-show="zhenrenSubnav">
                  <div class="zonghe_games_item_content">
                    <ul>
                      <li v-for="(gv, gk) in ZRSP_list.gameList" :key="gk">
                        <a target="_blank" @click="toUrlLink(gv)">
                          <img
                            style="vertical-align: middle"
                            :src="gv.picUrl"
                            width="80"
                            height="80"
                          />
                          <span class="text-box">
                            <span v-if="gv.isMaintain" class="g_status"></span>
                            <span
                              style="vertical-align: middle; padding-left: 5px"
                              >{{ gv.showName }}
                            </span>
                          </span>
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              </transition>
            </li>

            <li></li>
            <li
              v-if="TYJJ_list"
              @mouseover="sportSubnav = true"
              @mouseleave="sportSubnav = false"
            >
              <a class="menuA"
                ><span class="iconfont icon-yundong"></span>体育竞技
                <p>SPORTS</p>
              </a>
              <transition>
                <div class="second" v-show="sportSubnav">
                  <div class="zonghe_games_item_content">
                    <ul>
                      <li v-for="(gv, gk) in TYJJ_list.gameList" :key="gk">
                        <a target="_blank" @click="toUrlLink(gv)">
                          <img
                            style="vertical-align: middle"
                            :src="gv.picUrl"
                            width="80"
                            height="80"
                          />
                          <span class="text-box">
                            <span v-if="gv.isMaintain" class="g_status"></span>
                            <span
                              style="vertical-align: middle; padding-left: 5px"
                              >{{ gv.showName }}
                            </span>
                          </span>
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              </transition>
            </li>
            <li></li>

            <li
              v-if="QPYX_list"
              @mouseover="qipaiyouxiSubnav = true"
              @mouseleave="qipaiyouxiSubnav = false"
            >
              <a class="menuA"
                ><span class="iconfont icon-kapai"></span>棋牌对战
                <p>CARDS</p></a
              >
              <transition>
                <div class="second" v-show="qipaiyouxiSubnav">
                  <div class="zonghe_games_item_content">
                    <ul>
                      <li v-for="(gv, gk) in QPYX_list.gameList" :key="gk">
                        <a target="_blank" @click="toUrlLink(gv)">
                          <img
                            style="vertical-align: middle"
                            :src="gv.picUrl"
                            width="80"
                            height="80"
                          />
                          <span class="text-box">
                            <span v-if="gv.isMaintain" class="g_status"></span>
                            <span
                              style="vertical-align: middle; padding-left: 5px"
                              >{{ gv.showName }}
                            </span>
                          </span>
                        </a>
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
              <a class="menuA"
                ><span class="iconfont icon-zuqiu2"></span>反波胆
                <p>FOOTBALL</p>
              </a>
              <transition>
                <div class="second" v-show="fanbodanSubnav">
                  <div class="zonghe_games_item_content">
                    <ul>
                      <li v-for="(gv, gk) in FBD_list.gameList" :key="gk">
                        <a target="_blank" @click="toUrlLink(gv)">
                          <img
                            style="vertical-align: middle"
                            :src="gv.picUrl"
                            width="80"
                            height="80"
                          />
                          <span class="text-box">
                            <span v-if="gv.isMaintain" class="g_status"></span>
                            <span
                              style="vertical-align: middle; padding-left: 5px"
                              >{{ gv.showName }}
                            </span>
                          </span>
                        </a>
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
              <a class="menuA"
                ><span class="iconfont icon-yu1"></span>捕鱼游戏
                <p>FISH</p>
              </a>
              <transition>
                <div class="second" v-show="buyuyouxiSubnav">
                  <div class="zonghe_games_item_content">
                    <ul>
                      <li v-for="(gv, gk) in BYYX_list.gameList" :key="gk">
                        <a target="_blank" @click="toUrlLink(gv)">
                          <img
                            style="vertical-align: middle"
                            :src="gv.picUrl"
                            width="80"
                            height="80"
                          />
                          <span class="text-box">
                            <span v-if="gv.isMaintain" class="g_status"></span>
                            <span
                              style="vertical-align: middle; padding-left: 5px"
                              >{{ gv.showName }}
                            </span>
                          </span>
                        </a>
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
              <a class="menuA"
                ><span class="iconfont icon-jieji"></span>街机
                <p>ARCADE</p>
              </a>
              <transition>
                <div class="second" v-show="jiejiSubnav">
                  <div class="zonghe_games_item_content">
                    <ul>
                      <li v-for="(gv, gk) in JJYX_list.gameList" :key="gk">
                        <a target="_blank" @click="toUrlLink(gv)">
                          <img
                            style="vertical-align: middle"
                            :src="gv.picUrl"
                            width="80"
                            height="80"
                          />
                          <span class="text-box">
                            <span v-if="gv.isMaintain" class="g_status"></span>
                            <span
                              style="vertical-align: middle; padding-left: 5px"
                              >{{ gv.showName }}
                            </span>
                          </span>
                        </a>
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
              <a class="menuA"
                ><span class="iconfont icon-caipiao1"></span>乐彩彩票
                <p>LOTTERY</p></a
              >

              <transition>
                <div class="second" v-show="caipiaosubnav">
                  <div class="creditPlay menu-child">
                    <h1>信用玩法</h1>
                    <div class="color">信</div>
                    <div class="menu-child-content">
                      <ul>
                        <li v-for="(v, k) in xinyong_game_list" :key="k">
                          <a target="_blank" @click="toUrlLink(v)">
                            <img :src="v.picUrl" width="60" height="60" />
                            <span>{{ v.showName }} </span>
                            <span v-if="v.isMaintain" class="lc"></span>
                          </a>
                        </li>
                      </ul>
                    </div>
                  </div>
                  <div class="officalPlay menu-child">
                    <h1>官方玩法</h1>
                    <div class="color">官</div>
                    <div class="menu-child-content">
                      <ul>
                        <li v-for="(gv, gk) in guanfang_game_list" :key="gk">
                          <a target="_blank" @click="toUrlLink(gv)">
                            <img :src="gv.picUrl" width="60" height="60" />
                            <span>{{ gv.showName }} </span>
                            <span v-if="gv.isMaintain" class="lc"></span>
                          </a>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </transition>
            </li>
            <li>
              <router-link
                to="/activity"
                :class="[activeIndex == '/activity' ? 'active' : '', 'menuA']"
                ><span class="iconfont icon-youhuiquan1"></span>优惠活动
                <p>PROMOTIONS</p>
              </router-link>
            </li>
            <li></li>
            <li>
              <router-link
                to="/phone"
                :class="[activeIndex == '/phone' ? 'active' : '', 'menuA']"
                ><span class="iconfont icon-shouji"></span>手机下注
                <p>APP</p>
              </router-link>
            </li>
            <li></li>
            <li>
              <a class="menuA" :href="kefuUrl" target="_blank">
                <span class="iconfont icon-kefu"></span>在线客服
                <p>SERVICE</p>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div style="clear: both"></div>
  </div>

  <!--header结束---->
</template>
<script>
import HeadTop from "@/components/home/public/head_top.vue";
export default {
  components: {
    HeadTop,
  },
  props: {
    caizhongleftbar_allways_show: {
      type: Boolean,
      default: false,
    },
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
	  kefutimer:null,
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
    };
  },
  computed: {},
  methods: {
    toUrlLink(obj) {
      //console.log(obj);
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
      let kefu_address = localStorage.getItem("kefu");
	  if (kefu_address != null && kefu_address != undefined && kefu_address != '' && kefu_address !=this.kefuUrl) {
		  this.kefuUrl = kefu_address;
	   }
    },
    getMenuNavInfo: function () {
      this.$get("Pc.HomePage.getYLCNavInfoList").then((res) => {
        if (res.code >= 0) {
          // console.log(res.data);
          // res.data.DZYX.gameList[0].isMaintain = 1
          // res.data.gameType0[0].isMaintain = 1
          // res.data.gameType1[1].isMaintain = 1
          this.xinyong_game_list = res.data.gameType0;
          this.guanfang_game_list = res.data.gameType1;
          this.DZYX_list = res.data.DZYX;
          this.ZRSP_list = res.data.ZRSP;
          this.FBD_list = res.data.FBD;
          this.BYYX_list = res.data.BYYX;
          this.JJYX_list = res.data.JJYX;
          this.QPYX_list = res.data.QPYX;
          this.TYJJ_list = res.data.TYJJ;

          //console.log(this.DZYX_list);
        }

        //this.popupNotice = res.data.popupNotice.items;
      });
    },
  },
  beforeUpdate() {
    let path = this.$route.path;
    this.activeIndex = path;
  },
  created() {
    //console.log(this.$route.path)
    let token = localStorage.getItem("token");
    if (!this.$isEmpty(token)) {
      this.isLogin = true;
    }
    this.getMenuNavInfo();
    this.setupKefu();//每秒钟去更新一下客服地址
	this.kefutimer = setInterval(() => {
	  this.setupKefu();
	}, 100);
	
    // 监听滚动条
    // if (this.caizhongleftbar_allways_show) {
    // 	this.caizhongleftbar_allways_show = true;
    // }
    window.addEventListener(
      "scroll",
      () => {
        var scrollTop =
          window.pageYOffset ||
          document.documentElement.scrollTop ||
          document.body.scrollTop;
        if (scrollTop > 210) {
          this.center_top = false;
        } else {
          this.center_top = true;
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
  background-color: #020001;
}

.header {
  position: relative;
  height: 85px;
}

.header .left {
  display: inline-block;
  width: 250px;
}

.header .logo {
  height: 85px;
  width: 223px;
  background: url(/images/ylc/zlogo.png) no-repeat;
  background-size: 100% 100%;
}

.menu .second {
  -webkit-box-shadow: 2px 2px 5px #ff9000;
  box-shadow: 2px 2px 5px #e9d477;
  color: black;
  position: absolute;
  left: 0px;
  top: 86px;
  width: 1190px;
  z-index: 999;
  height: auto;
  background-color: white;
  border: 1px solid #020001;
  border-top: none;
}

.creditPlay {
  display: inline-block;
  *display: inline;
  *zoom: 1;
  width: 590px;
  zoom: 1;
  font-size: 0;
  float: left;
  border-right: 1px solid #ff9000;
}

.menu-child h1 {
  width: 70px;
  height: 20px;
  font-size: 16px;
  display: inline-block;
  margin-left: 26px;
  margin-top: 2px;
  float: left;
  color: #000;
  line-height: 50px;
}

.menu-child .color {
  width: 23px;
  height: 23px;
  text-align: center;
  float: left;
  line-height: 22px;
  font-size: 15px;
  display: block;
  margin-left: 12px;
  margin-top: 10px;
  color: #fff;
  border-radius: 5px;
  background-color: #f56c6c;
}

.menu-child .menu-child-content {
  margin-top: 60px;
  border-top: 1px solid #f56c6c;
  padding-top: 20px;
}

.officalPlay {
  display: inline-block;
  *display: inline;
  *zoom: 1;
  width: 590px;
  zoom: 1;
  font-size: 0;
  float: left;
}

.menu-child ul li {
  float: left;
  position: relative;
  line-height: 28px;
  margin: 5px 0;
  height: 90px;
  width: 95px;
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
  color: #000;
  display: block;
  position: relative;
}

.zonghe_games_item_content {
  text-align: center;
  padding: 40px;
}

.second .zonghe_games_item_content ul li a {
  color: #000;
  width: 185px;
  display: flex;
}
.second .zonghe_games_item_content ul li a .text-box {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-end;
}
.second .zonghe_games_item_content ul li a .g_status {
  //  // border: 1px solid red;
  //  width: 60px;
  //  font-size: 10px;
  //  // background-color: #f4f4f4;
  //  color: red;
  // font-weight: 600;
  //  padding: 1px 5px;
  //  border-radius: 3px;

  background-image: url(/images/2021/maintaining.png);
  background-size: 100% auto;

  position: absolute;
  top: -5px;
  left: -15px;
  z-index: 101;
  background-repeat: no-repeat;
  background-position: center;
  width: 170px;
  height: 90px;
}

.second .zonghe_games_item_content ul li a span {
  color: #000;
}

.menu-child .menu-child-content ul li {
  position: relative;
}

.menu-child ul li span {
  font-size: 12px;
  display: block;
  color: #000;
  position: absolute;
  left: 0;
  bottom: -30px;
  width: 100%;
  height: 28px;
  line-height: 28px;
  overflow: hidden;
}

.header .right {
}

.logo-container {
  position: absolute;
}

.ul_menu-main {
  padding-top: 30px;
  display: block;
  margin: auto;
  text-align: right;
}

.menuA {
  font-size: 13px;
  float: left;
  width: 100%;
  min-width: 80px;
  color: #555;
  text-align: center;
  cursor: pointer;
  box-sizing: border-box;
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
  border-bottom: 2px solid #e8d77c;
  color: #f1eda9;
  background: none;
  text-shadow: 2px 2px rgba(0, 0, 0, 0.5);
  font-weight: 400;
}

.ul_menu-main li a {
  width: 80px;
  height: 55px;
  color: #fff;
  font: 13px;
  float: left;
  position: relative;
  text-align: center;
  display: block;
  box-sizing: border-box;
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
  zoom: 1;
}

.menu {
  position: relative;
}
</style>
