<template>
  <div class="qingwu">
    <div class="shop_top">
      <ShopHeader :caizhongleftbar_allways_show="caizhongleftbar_allways_show">
      </ShopHeader>
    </div>
	<div class="gongyibg">
    <div class="main width_center_1320">
      <div class="mainLeft width_280">
        <div class="gameTypeTabs">
          <el-tabs v-model="gameTypesTabs" type="border-card">
            <el-tab-pane label="高频" name="gameTypesTabs1">
              <div class="content">
                <ul class="xylist">
                  <li
                    @click="toGame(gv)"
                    v-for="(gv, gk) in guanfang_game_list"
                    :key="gk"
                  >
                    {{ gv.showName }}
                  </li>

                  <!-- <li v-for="(gv,gk) in guanfang_game_list" :key="gk">
										<a href="#">
											<span>{{gv.showName}} </span>
										</a>
									</li> -->
                </ul>
              </div>
            </el-tab-pane>
            <el-tab-pane label="信用" name="gameTypesTabs2">
              <div class="content">
                <ul class="xylist">
                  <li
                    @click="toGame(gv)"
                    v-for="(gv, gk) in xinyong_game_list"
                    :key="gk"
                  >
                    {{ gv.showName }}
                  </li>
                  <!-- <li v-for="(gv, gk) in xinyong_game_list" :key="gk">
                    <a href="#">
                      <span>{{ gv.showName }} </span>
                    </a>
                  </li> -->
                </ul>
              </div>
            </el-tab-pane>
            <el-tab-pane label="官方" name="gameTypesTabs3">
              <div class="content">
                <ul class="xylist">
                  <li
                    @click="toGame(gv)"
                    v-for="(gv, gk) in guanfang_game_list"
                    :key="gk"
                  >
                    {{ gv.showName }}
                  </li>
                  <!-- <li v-for="(gv, gk) in guanfang_game_list" :key="gk">
                    <a href="#">
                      <span>{{ gv.showName }} </span>
                    </a>
                  </li> -->
                </ul>
              </div>
            </el-tab-pane>
          </el-tabs>
        </div>
        <!---tabs结束-->

        <div class="newGuide">
          <h3>新手指南</h3>
          <ul class="newitem">
            <li><a href="/Register?Intr=">如何注册成为网站会员？</a></li>
            <li>
              <a href="javascript:;" id="forgetBtn">忘记登录密码了怎么办？</a>
            </li>
            <li><a href="/Help/Teller">怎么取款？</a></li>
            <li><a href="/Help/Generalq">为什么我们无法撤单？</a></li>
            <li><a href="/Recharge/Index">如何充值？</a></li>
            <li><a href="/Help/Techq">如何下注？</a></li>
          </ul>
        </div>
      </div>
      <!--mainLeft结束-->
      <div class="mainCenter width_700">
        <div v-if="marqueeNotice">
          <diyNotice :noticeText="marqueeNotice"></diyNotice>
        </div>

        <div class="lunbo">
          <banner :list="banner_list" ></banner>
        </div>
        <!--lunbo end-->
        <div>
          <seckill></seckill>
        </div>
        <!--centerTab结束-->
        <div class="zoushi">
          <h3 class="title">走势图表</h3>
          <div class="left">
            <a href="#"><img src="images/tubiao.png" /></a>
          </div>
          <div class="right">
            <ul>
              <li>
                <a href="#"
                  ><img src="/images/beijingpk.png" />
                  <div>北京PK拾</div>
                </a>
              </li>
              <li>
                <a href="#"
                  ><img src="/images/cz-cqssc.png" />
                  <div>重庆时时彩</div>
                </a>
              </li>
              <li>
                <a href="#"
                  ><img src="/images/txffc.png" />
                  <div>腾讯分分彩</div>
                </a>
              </li>
              <li>
                <a href="#"
                  ><img src="/images/bjkl8.png" />
                  <div>北京快乐8</div>
                </a>
              </li>
              <li>
                <a href="#"
                  ><img src="/images/ahk3.png" />
                  <div>江苏快3</div>
                </a>
              </li>
              <li>
                <a href="#"
                  ><img src="/images/gaungdong11x5.png" />
                  <div>广东11选5</div>
                </a>
              </li>
              <li>
                <a href="#"
                  ><img src="/images/FC3D.png" />
                  <div>福彩3D</div>
                </a>
              </li>
              <li>
                <a href="#"
                  ><img src="/images/lhc.png" />
                  <div>六合彩</div>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div class="mainRight width_300">
        <!--
        <div class="lrbox">
          <router-link class="login" to="/user/login">登录</router-link>
          <router-link class="regin" to="/user/register">免费注册</router-link>
        </div>
		-->
		<!--
        <div class="notice">
          <el-tabs v-model="noticeActiveTabName" type="border-card">
            <el-tab-pane label="最新公告" name="noticeActiveTabName01">
              <div class="content">
                <ul>
                  <li>
                    <a href="#">关于假冒乐彩彩票名义授权的声明</a
                    ><span>06.10</span>
                  </li>
                  <li>
                    <a href="#">竞彩6月不寂寞五大杯赛齐来袭</a
                    ><span>06.06</span>
                  </li>
                  <li>
                    <a href="#">竞彩6、7月销售截止时间调整的公告</a
                    ><span>05.31</span>
                  </li>
                  <li>
                    <a href="#">关于变更超级大乐透游戏规则的公告</a
                    ><span>02.18</span>
                  </li>
                </ul>
              </div>
            </el-tab-pane>
            <el-tab-pane label="赛事公告" name="noticeActiveTabName02">
              <div class="content">
                <ul>
                  <li><a href="#">赛事公告</a><span>06.10</span></li>
                  <li><a href="#">赛事公告2</a><span>06.06</span></li>
                </ul>
              </div>
            </el-tab-pane>
          </el-tabs>
        </div>
-->
        <!--notice end-->

        <div class="tuijian">
          <div class="titleBox">
            <h3>乐彩彩票推荐</h3>
          </div>
          <div class="tcontent">
            <ul>
              <li v-for="(v, k) in news_list" :key="k">
                <span :class="k <= 3 ? 'red' : 'blue'">{{ k+1 }}</span
                ><router-link :to="{name:'news_info',params:{id:v.id}}">{{ v.title }}</router-link>
              </li>
            </ul>
          </div>
        </div>
        <!--tuijian end-->

        <div class="gongyi">
          <div class="titleBox">
            <h3>乐彩公益</h3>
          </div>
          <div class="tcontent">
            <img src="images/mengxiang.png" />
          </div>
        </div>
      </div>
    </div>
    <div style="clear:both"></div>
	</div>
	<!--main end-->
    <shop-foot></shop-foot>
    <!-- vue 回到顶部 -->
    <el-backtop></el-backtop>
    <!-- 弹出框 -->
    <el-dialog :visible.sync="noticeDialogVisible" :title="'公告'" center>
      <div class="home_form_main">
        <el-tabs tab-position="left" style="max-height: 250px">
          <el-tab-pane
            v-for="(v, k) in popupNotice"
            :label="v.notice_title"
            :key="k"
          >
            <div v-html="v.notice_content"></div>
          </el-tab-pane>
        </el-tabs>
        <!--<el-scrollbar>
                	<div class="notice-item-box">
                		<div class="notice-item" v-for="(item,index) in popupNotice" :key='index' @click="showNoticeDetail(index)">
                			<div class="content-item-title">{{item.notice_title}}</div>
                			<div v-show="showNoticeId == index">
                				<div v-html="item.notice_content"></div>
                			</div>
                			<div class="content-item-time">{{item.create_time}}</div>
                		</div>
                	</div>
                 </el-scrollbar>
				 -->
      </div>
    </el-dialog>

    <HomeMessageBox   />
  </div>
</template>

<script>
import ShopHeader from "@/components/home/public/head.vue";
import banner from "@/components/home/public/banner.vue";
import BannerBottomAdv from "@/components/home/public/banner_bottom_adv.vue";
import seckill from "@/components/home/public/seckill.vue";
import ShopIndexAdv from "@/components/home/public/shop_index_adv.vue";
import ShopProductBlock from "@/components/home/public/shop_product_block.vue";
import ShopFoot from "@/components/home/public/shop_foot.vue";
import diyNotice from "@/components/home/public/diy-notice.vue";
import HomeMessageBox from '@/views/Home/homeMessageBox/index.vue'
export default {
  components: {
    ShopHeader,
    banner,
    BannerBottomAdv,
    seckill,
    ShopIndexAdv,
    ShopProductBlock,
    ShopFoot,
    diyNotice,
    HomeMessageBox
  },
  props: {},
  data() {
    return {
      banner_list: [], // 幻灯片
      banner_bottom_adv: [], // 三联广告图片
      caizhongleftbar_allways_show: true,
      xinyong_game_list: [],
      guanfang_game_list: [],
      news_list: [],
      marqueeNotice: "",
      //goods_list_left_adv:[],
      //goods_list_bottom_adv:[],

      gameTypesTabs: "gameTypesTabs1",
      noticeActiveTabName: "noticeActiveTabName01",
      seckill_goods_list: [],
      seckill_info: {},
      popupNotice: [],
      showNoticeId: 0, //默认显示弹出公告的第一条
      noticeDialogVisible: false,
    };
  },
  watch: {},
  computed: {},
  methods: {
    toGame(gv) {
      // console.log(gv.id);
      // return
      let token = localStorage.getItem("token");
      if (!token) {
        this.$router.push({ path: "/user/login" });
      } else {
        this.$router.push({ path: "/games", query: { id: gv.id } });
      }
    },
    // 获取首页信息
    get_index_info: function () {
      this.$get("Pc.HomePage.getData").then((res) => {
        //console.log(res);
        this.banner_list = res.data.img_ad;
        this.xinyong_game_list = res.data.gameType0;
        this.guanfang_game_list = res.data.gameType1;
        //this.popupNotice = res.data.popupNotice.items;
        this.marqueeNotice = res.data.notice.items[0].notice;
        if (this.popupNotice != undefined && this.popupNotice.length > 0) {
          //console.log(this.popupNotice);
          this.noticeDialogVisible = true;
        }
      });
      this.$get("Pc.News.getNewsList").then((res) => {
        this.news_list = res.data.list;
      });
    },
    showNoticeDetail(index) {
      this.showNoticeId = index;
    },
  },
  created() {
    this.get_index_info();
  },
  mounted() {
    // 监听滚动条
    window.addEventListener(
      "scroll",
      () => {
        var scrollTop =
          window.pageYOffset ||
          document.documentElement.scrollTop ||
          document.body.scrollTop;
        if (scrollTop > 20) {
          this.subnav_show = false;
        } else {
          this.subnav_show = true;
        }
      },
      true
    );
  },
};
</script>
<style lang="css">
.el-tabs--border-card > .el-tabs__content {
  padding: 10px 3px;
}

.el-dialog__header {
  border-bottom: none;
  color: #fff;
  background: #f13131;
  background-image: -webkit-gradient(
    linear,
    left top,
    left bottom,
    from(#b31515),
    to(#f13131)
  );
  background-image: -moz-linear-gradient(top, #b31515, #f13131);
  background-image: -o-linear-gradient(top, #b31515, #f13131);
  background-image: -webkit-linear-gradient(top, #b31515, #f13131);
  background-image: linear-gradient(to bottom, #b31515, #f13131);
  -ms-filter: "progid:DXImageTransform.Microsoft.gradient(startColorstr='#b31515', endColorstr='#f13131')";
  filter: progid:DXImageTransform.Microsoft.gradient(startColorstr='#b31515', endColorstr='#f13131');
  zoom: 1;
}

.el-dialog__headerbtn .el-dialog__close {
  color: #ffffff;
}

.el-dialog__title {
  font-weight: bold;
  color: #ffffff;
}

.gameTypeTabs ul li {
  display: inline-block;
}

.gameTypeTabs ul li a {
  display: inline-block;
  width: 73px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
</style>
<style lang="scss" scoped>
.shop_content {
  background: #f5f5f5;
  padding: 20px 0 60px 0;
  margin-top: 40px;
}
.main {
  position: relative;
}
.main .mainLeft {
  float: left;
  margin-top: 355px;
}
.gameTypeTabs {
  margin-top: 10px;
}

.gameTypeTabs ul li {
  display: inline-block;
  width: 73px;
}
.gameTypeTabs ul li:hover {
  cursor: pointer;
  color: red;
}
.tabs {
  border: 1px solid #ecf0f4;
  width: 100%;
  height: 244px;
  margin-top: 9px;
}
.tabs .title {
  height: 32px;
  width: 100%;
  border-bottom: 1px solid #ecf0f4;
  line-height: 32px;
}
.tabs .title ul {
  float: right;
}
.tabs .title ul li {
  text-align: center;
  float: left;
  width: 50px;
  cursor: pointer;
}
.tabs .title ul li.current {
  height: 30px;
  line-height: 32px;
  border-bottom: 2px solid #1e7ddf;
  font-weight: bold;
  text-align: center;
}
.hide {
  display: none;
}
.tabs .content .xylist {
  margin-top: 10px;
  margin-left: 10px;
}
.tabs .content .xylist li {
  width: 72px;
  overflow: hidden;
  float: left;
  height: 23px;
}
.tabs .content .xylist li a {
  color: #807e7f;
  height: 23px;
  line-height: 23px;
  font-size: 12px;
}
.newGuide {
  width: 100%;
  height: 160px;
  border: 1px solid #ecf0f4;
  margin-top: 10px;
}
.newGuide h3 {
  height: 44px;
  line-height: 44px;
  margin-left: 10px;
}
.newGuide a {
  font-size: 12px;
  margin-left: 5px;
}
.newGuide a .title {
  color: #99b5d7;
  margin-right: 5px;
}
.mainCenter {
  float: left;
  margin-left: 15px;
}
.newGuide a .content {
  color: #333333;
}
.el-tabs__content ul li {
  color: #555;
  font-size: 12px;
  margin-left: 3px;
  line-height: 25px;
  height: 25px;
}
.zoushi {
  margin-top: 37px;
  height: 252px;
  width: 100%;
  border: 1px solid #ecf0f4;
}
.zoushi .title {
  margin-top: 16px;
  margin-left: 19px;
  font-size: 14px;
}
.zoushi .left {
  float: left;
  margin-left: 19px;
  margin-top: 30px;
}
.zoushi .right {
  float: left;
  width: 300px;
}
.zoushi .right ul {
  margin-top: 30px;
  margin-left: 10px;
}
.zoushi .right ul li {
  float: left;
  width: 72px;
  text-align: center;
}
.zoushi .right ul li img {
  width: 43px;
  height: 43px;
}
.zoushi .right ul li div {
  font-size: 12px;
  text-align: center;
  color: #333;
}
.mainRight {
  float: right;
}
.mainRight .lrbox a.login,
.mainRight a.regin {
  display: inline-block;
  width: 120px;
  height: 40px;
  text-align: center;
  line-height: 40px;
  margin-right: 5px;
  margin-left: 5px;
  margin-top: 10px;
  border-radius: 5px;
  border: 1px solid #ccc;
  color: black;
}
.mainRight a.login:hover,
.mainRight a.regin:hover {
  color: white;
  background-color: #f13131;
  border-color: #f13131;
}
.notice {
  margin-top: 10px;
}
.tabs3 {
  height: 160px;
}
.tabs3 .title ul {
  float: left;
  width: 100%;
}
.tabs3 .title ul li {
  width: 45%;
}
.tabs3 .content ul li a {
  margin-left: 10px;
  float: left;
  display: inline-block;
  overflow: hidden;
  height: 29px;
  line-height: 29px;
  width: 210px;
  font-size: 12px;
  color: #333;
}
.tabs3 .content ul li span {
  display: inline-block;
  float: left;
  height: 29px;
  line-height: 29px;
  font-size: 12px;
  color: #999999;
}
.tuijian {
  margin-top: 10px;
  width: 100%;
  height: auto;
  border: 1px solid #ecf0f4;
}
.tuijian .titleBox {
  height: 38px;
  background-color: #eaf5fa;
}
.tuijian .titleBox h3 {
  font-size: 12px;
  line-height: 38px;
  margin-left: 15px;
}
.tuijian ul {
  margin-top: 5px;
}
.tuijian ul li {
  height: 25px;
  line-height: 25px;
}
.tuijian .tcontent span {
  margin-left: 15px;
  text-align: center;
  border-radius: 3px;
  display: inline-block;
  color: white;
  width: 17px;
  height: 17px;
  line-height: 17px;
  font-size: 13px;
}
.tuijian .tcontent .red {
  background-color: #da5a5a;
}

.tuijian .tcontent .blue {
  background-color: #3a6796;
}

.tuijian .tcontent a {
  color: #555;
  font-size: 12px;
  margin-left: 11px;
  overflow: hidden;
}

.gongyi {
  width: 100%;
  height: 218px;
  border: 1px solid #ecf0f4;
  margin-top: 18px;
}

.gongyi .titleBox {
  height: 36px;
  line-height: 36px;
  background-color: #f7f9fa;
}

.gongyi h3 {
  font-size: 16px;
  margin-left: 15px;
}

.gongyi .tcontent {
  width: 268px;
  display: table-cell;
  height: 180px;
  text-align: center;
  vertical-align: middle;
}

.gongyi .tcontent img {
}

.lunbo {
  height: auto;
  width: 100%;
  margin: 0px auto 20px;
}

.notice-item-box {
  padding: 0 16upx 20upx;

  .notice-item {
    border: 1upx solid #ddd;
    border-radius: 16upx;
    margin: 16upx 0;
    padding-bottom: 10upx;

    .content-item-time {
      font-size: 26upx;
      height: 50upx;
      line-height: 50upx;
      color: #999;
    }

    .content-item-title {
      width: 450upx;
      font-size: 32upx;
      height: 80upx;
      line-height: 80upx;
      color: #555;
    }

    .content-item-content {
      .item-content-text {
        width: 450upx;
        font-size: 28upx;
        line-height: 40upx;
        color: #666;
      }

      .item-content-img {
        width: 450upx;
        padding: 0 10upx;

        image {
          width: 430upx;
        }
      }

      .content-hidden {
        width: 0;
        height: 0;
        display: none;
      }
    }
  }
}

.popnotice-title {
  background-color: #fd7986;
  height: 80rpx;
  line-height: 80rpx;
  font-weight: bold;
  font-size: 30rpx;
  color: #fff;
  box-shadow: 0 2rpx 4rpx rgba(0, 0, 0, 0.2);
}
</style>
