<template>
  <div class="style-gray">
    <div class="shop_top">
      <ShopHeader :caizhongleftbar_allways_show="caizhongleftbar_allways_show">
      </ShopHeader>
    </div>
	
	<div class="content">
	    <div class="mainlunbo_area">
	      <el-carousel height="433px">
	        <el-carousel-item  v-for="(item,idx) in banner_list" :interval="5000" :key="idx" >
	          <a @click="toLik(item)" class="small"><img  :src="item.src"></a>
	        </el-carousel-item>
	      </el-carousel>
	    </div>
		<div class="notice_area">
		<div class="width_center_1190 notice_area_content">
			<div class="left">
		    <i class="iconfont icon-gonggao" style="font-size: 25px; margin-right: 10px;"></i>
			</div>
			<div class="center">最新公告:
			</div>
			<div class="right">
		    <marquee direction="left" scrollamount="5">
		        <span v-for="(item,idx) in notice" :key="idx">{{item["notice"]}}</span>
		    </marquee>
			</div>
			
		</div>
		</div>
		
	</div>
   
   
   <div class="home-platform">
	   <div class="line"></div> 
	   <ul class="platform">
		   <li class="home-sports"><a class="ROUTER_SPORT_NEW"></a></li>
		   <li class="home-lottery"><a class="BIND_LOTTERYNEW"></a></li>
		   <li class="home-agent"><a class="ROUTER_AGENCY"></a></li>
	    </ul>
   </div>
   <div class="home-mobile width_center_1190">
	   <div class="qrCodeHome">
		   <div>
			   <img src="/images/ylc/zhqrcode.png" width="100" height="100" class="">
			</div>
	    </div>
	   <div class="mobilebox"></div>
   </div>
   
   
   
    <shop-foot></shop-foot>
    <!-- vue 回到顶部 -->
    <el-backtop></el-backtop>
    <!-- 弹出框 -->
    <el-dialog :visible.sync="noticeDialogVisible" :title="'公告'" center>
      <div class="home_form_main">
        <el-tabs tab-position="left" style="max-height: 250px">
          <el-tab-pane v-for="(v, k) in popupNotice" :key="k" :label="v.notice_title">
            <div v-html="v.notice_content"></div>
          </el-tab-pane>
        </el-tabs>
      </div>
    </el-dialog>
	
	
  </div>
</template>

<script>
import ShopHeader from "@/components/home/public/head.vue";

import banner from "@/components/home/public/banner.vue";
import BannerBottomAdv from "@/components/home/public/banner_bottom_adv.vue";
import ShopFoot from "@/components/home/public/shop_foot.vue";
import diyNotice from "@/components/home/public/diy-notice.vue";
export default {
  components: {
    ShopHeader,
    banner,
    BannerBottomAdv,
    ShopFoot,
    diyNotice,
  },
  props: {},
  data() {
    return {
      banner_list: [], // 幻灯片
      banner_bottom_adv: [], // 三联广告图片
      caizhongleftbar_allways_show: true,
      notice: "",
      popupNotice: [],
      showNoticeId: 0, //默认显示弹出公告的第一条
      noticeDialogVisible: false,

    };
  },

  methods: {
    toLik(item){
       window.location.href=`${item.href}`;
    },
    toGame(gv) {
      this.$store.commit("indexGame", gv);
      localStorage.setItem("indexGame", JSON.stringify(gv));
      this.$router.push({ path: "/games" });
      // this.$router.push('games')
    },
    // 获取首页信息
    get_index_info: function () {
      this.$get("Pc.HomePage.getYLCData").then((res) => {
        //console.log(res);
        this.banner_list = res.data.img_ad;
        console.log('....',this.banner_list);
        //this.xinyong_game_list = res.data.gameType0;
        //this.guanfang_game_list = res.data.gameType1;
        //this.popupNotice = res.data.popupNotice.items;
		this.notice = res.data.notice.items;
        //this.notice = res.data.notice.items[0].notice;
        if (this.popupNotice != undefined && this.popupNotice.length > 0) {
          //console.log(this.popupNotice);
          this.noticeDialogVisible = true;
        }
      });
      // this.$get("Pc.News.getNewsList").then((res) => {
      //   this.news_list = res.data.list;
      // });
    },
    showNoticeDetail(index) {
      this.showNoticeId = index;
    },
  },
  created() {
    this.get_index_info();
	// const loading = this.$loading({
	//             lock: true,//lock的修改符--默认是false
	//             text: 'Loading',//显示在加载图标下方的加载文案
	//             spinner: 'el-icon-loading',//自定义加载图标类名
	//             background: 'rgba(0, 0, 0, 0.7)',//遮罩层颜色
	//             target: document.querySelector('.notice_area')//loadin覆盖的dom元素节点
	//     });
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
.el-carousel__indicators--horizontal {
    bottom: 65px;
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
	.style-gray{background: #1b1b1b!important;}
	.content{
	    width: 100%;
	    height: 433px;
	    background-color: #ccc;
	    position: relative;
	    min-width: 1000px;
	}
	.mainlunbo_area{
	    width: 100%;
	    height: 433px;
	    background-color: #ccc;
	    position: relative;
	    min-width: 1000px;
	}
	.home-platform{background:#212121;height:294px;padding-top:30px;position:relative}
	.home-platform .line{position:absolute;top:230px;left:0;width:100%;height:1px;background-color:#282828}
	.home-platform .platform{width:1000px;margin:0 auto}
	.home-platform .platform li{display:inline;float:left;width:310px;height:265px;cursor:pointer;position:relative}
	.home-platform .platform li a{display:block;width:100%;height:100%}
	.home-platform .home-sports a{background:url(/images/ylc/btn_sport_1.png) no-repeat}
	.home-platform .home-sports a:hover{background:url(/images/ylc/btn_sport_2.png) no-repeat}
	.home-platform .home-lottery{margin:0 35px}
	.home-platform .home-lottery a{background:url(/images/ylc/btn_lottery_1.png) no-repeat}
	.home-platform .home-lottery a:hover{background:url(/images/ylc/btn_lottery_2.png) no-repeat}
	.home-platform .home-agent a{background:url(/images/ylc/btn_agent.png) no-repeat}
	.home-platform .home-agent a:hover{background:url(/images/ylc/btn_agent_h.png) no-repeat}
	.home-mobile .mobilebox{width:1000px;margin:0 auto;position:relative}
	.home-mobile .mobilebox a{cursor:pointer;position:absolute;left:710px;top:273px;display:block;width:109px;height:29px;background:url(/images/ylc/btn_mobile_1.png) no-repeat}
	.home-mobile .mobilebox a:hover{background:url(/images/ylc/btn_mobile_2.png) no-repeat}
	.home-mobile{background:url(/images/ylc/home_mobile.png) no-repeat 50%;position: relative;height:381px;border-bottom:1px solid #282828}
	.qrCodeHome{position: absolute;right: 142px;bottom: 189px;}
	.qrCodeHome div{overflow:hidden;width:100px;height:100px}
	.qrCodeHome div img{width:100%;top:0;left:0}
	.mobile-newskin .inside-wrapper{display:none}
	.mobile-newskin .mobile-main{margin-top:0!important;padding:0}
	
	.notice_area {
	    background-image: url(/images/my/notice_area_bg.png);
	    background-position: center;
	    background-repeat: no-repeat;
	    background-color: rgba(0,0,0,0.7);
	    position: absolute;
	    height: 50px;
		line-height:50px; 
	    bottom: 0px;
	    width: 100%;
		z-index: 900;
	}
	.notice_area_content{color:#fff;   font-size: 14px;}
	.notice_area_content .left{float: left;width: 30px;color: #bbbbbb;}
	.notice_area_content .center{float: left;width: 80px;color: #bbbbbb;}
	.notice_area_content .right{float: left; width: 850px;}
	.gametype_content {
	    width: 1000px;
		height: 250px;
	    margin: 0 auto;
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
