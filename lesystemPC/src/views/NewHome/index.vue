<template>
  <div class="newhome">
    <div class="shop_top">
      <ShopHeader :gameList="gameListData" @loginsuccessUserInfo="loginsuccessUserInfo"></ShopHeader>
    </div>
    <div class="content">
      <div class="mainlunbo_area">
		  <div class="block">
        <el-carousel height="450px">
          <el-carousel-item  v-for="(item,idx) in banner_list" :interval="5000" :key="idx" >
            <a @click="toLik(item)" class="small"><img  :src="item.src"></a>
          </el-carousel-item>
        </el-carousel>
		</div>
<!-- 		<div class="block">
		    <el-carousel trigger="click" height="450px">
		      <el-carousel-item v-for="item in 4" :key="item">
		        <h3 class="small">{{ item }}</h3>
		      </el-carousel-item>
		    </el-carousel>
		  </div> -->
      </div>
    </div>
    <!-- notice -->
    <div class="notice_area">
      <div class="width_center_1190 notice_area_content">
        <div class="left">
          <img
            src="data:image/png;base64,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"
          />
        </div>
        <div class="right">
          <marquee direction="left" scrollamount="5">
            <span v-for="(item, index) in notice" :key="index">{{
              item["notice"]
            }}</span>
          </marquee>
        </div>
      </div>
    </div>
    <!-- app 下载 -->
    <qrCode></qrCode>
    <!-- 热门游戏 -->
    <hotGame :gameList="gameListData"></hotGame>
    <!-- service -->
    <service></service>

    <!-- footer -->
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
      </div>
    </el-dialog>
    <HomeMessageBox   />
	<el-dialog class="chatroomDialog" title="聊天室" :visible.sync="chatroomDialogVisible" width="450px" height="500px" center>
			  <iframe :src="chatRoomUrl" id="mobsf" scrolling="no" frameborder="0" width="375px" height="620px">
			  </iframe>
	</el-dialog>
	<div class="chatroom" @click="openChatroom" v-show="chatRoomUrl!=''">
		<i class="iconfont icon-liuyanguanli" style="font-size: 22px;"></i> 聊天室
	</div>
	
  </div>
</template>

<script>
  import ShopHeader from "./components/head.vue";
  import ShopFoot from "./components/shop_foot.vue";
  import qrCode from "./components/QRcode.vue";
  import hotGame from "./components/hot_game.vue";
  import service from "./components/services.vue";
  // import diyNotice from '@/components/home/public/diy-notice.vue'
  import HomeMessageBox from '@/views/Home/homeMessageBox/index.vue'
  export default {
    components: {
      ShopHeader,
      ShopFoot,
      qrCode,
      hotGame,
      service,
      HomeMessageBox
      // diyNotice
    },
    props: {},
    data() {
      return {
		chatRoomUrl: "",
        banner_list: [], // 幻灯片
        banner_bottom_adv: [], // 三联广告图片
        notice: "",
        popupNotice: [],
        showNoticeId: 0, //默认显示弹出公告的第一条
        noticeDialogVisible: false,
		chatroomDialogVisible:false,
        gameListData: [],
      };
    },
    watch: {},
    computed: {},
    methods: {
	  loginsuccessUserInfo(userinfo){
		        //console.log(userinfo.chatRoomIndex);
	  			if(userinfo && userinfo.chatRoomIndex!=undefined&&userinfo.chatRoomIndex!=''){
					this.chatRoomUrl=userinfo.chatRoomIndex;
				}
	  			
	  },
	  openChatroom(){
		  this.chatroomDialogVisible=true;
	  },
      toGame(gv) {
        this.$store.commit("indexGame", gv);
        localStorage.setItem("indexGame", JSON.stringify(gv));
        this.$router.push({ path: "/games" });
        // this.$router.push('games')
      },
      // 获取首页信息
      get_index_info: function () {
        this.$get("Pc.HomePage.getBlueData").then((res) => {
          //console.log(res);
          this.banner_list = res.data.img_ad;
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
      getMenuNavInfo() {
        this.$get("Pc.HomePage.getBlueNavInfoList").then((res) => {
          if (res.code >= 0) {
            this.gameListData = res.data;
          }
        });
      },
	  getChatroomIndex(){
		  let chatRoomIndex = localStorage.getItem("chatRoomIndex");
		  		if(chatRoomIndex !=undefined ){
		  			this.chatRoomUrl=chatRoomIndex;
		  			//console.log(this.chatRoomUrl);
		    }
	  }
    },
    created() {
      this.getMenuNavInfo();
      this.get_index_info();
	  this.getChatroomIndex();
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
      // 初始化swiper
      new Swiper(".swiper-container", {
        loop: true,
        autoplay: true,
        pagination: {
          el: ".swiper-pagination",
        },
        paginationClickable: true,
        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        },
      });
    },
  };
</script>
<style lang="css">
	
	.el-carousel__item h3 {
	    color: #475669;
	    font-size: 14px;
	    opacity: 0.75;
	    line-height: 450px;
	    margin: 0;
	  }
  .el-tabs--border-card > .el-tabs__content {
    padding: 10px 3px;
  }
  .el-dialog--center .el-dialog__body{padding-top: 5px;}
  .chatroomDialog .el-dialog__body {
	    padding: 3px 30px;
	    overflow-y: auto;
	    max-height: calc(100vh - 140px);
  }
  .el-carousel__button{height: 4px;}
  .el-carousel__indicators--horizontal {
    bottom: 30px;
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
@keyframes banner_fadeIn__fUESK {
    0% {
        -webkit-transform: scale(.8);
        transform: scale(.8);
        opacity: 0
    }

    to {
        -webkit-transform: scale(1);
        transform: scale(1);
        opacity: 1
    }
}
@keyframes banner_fadeout__1HIly {
    0% {
        -webkit-transform: scale(1);
        transform: scale(1);
        opacity: 1
    }

    to {
        -webkit-transform: scale(1.2);
        transform: scale(1.2);
        opacity: 0
    }
}
  .content {
    width: 100%;
    background-color: #ccc;
    position: relative;
    min-width: 1000px;
  }
  .mainlunbo_area {
    width: 100%;
	height: 450px;
    background-color: #ccc;
    position: relative;
    min-width: 1000px;
    // .swiper-slide-active{
    //    animation: banner_fadeIn__fUESK .5s ease-out forwards;
    // }
    // .swiper-slide-prev{
    //   animation: banner_fadeout__1HIly .5s ease-out forwards
    // }
  }
  .home-platform {
    background: #212121;
    height: 294px;
    padding-top: 30px;
    position: relative;
  }
  .home-platform .line {
    position: absolute;
    top: 230px;
    left: 0;
    width: 100%;
    height: 1px;
    background-color: #282828;
  }
  .home-platform .platform {
    width: 1000px;
    margin: 0 auto;
  }
  .home-platform .platform li {
    display: inline;
    float: left;
    width: 310px;
    height: 265px;
    cursor: pointer;
    position: relative;
  }
  .home-platform .platform li a {
    display: block;
    width: 100%;
    height: 100%;
  }
  .home-platform .home-sports a {
    background: url(/images/ylc/btn_sport_1.png) no-repeat;
  }
  .home-platform .home-sports a:hover {
    background: url(/images/ylc/btn_sport_2.png) no-repeat;
  }
  .home-platform .home-lottery {
    margin: 0 35px;
  }
  .home-platform .home-lottery a {
    background: url(/images/ylc/btn_lottery_1.png) no-repeat;
  }
  .home-platform .home-lottery a:hover {
    background: url(/images/ylc/btn_lottery_2.png) no-repeat;
  }
  .home-platform .home-agent a {
    background: url(/images/ylc/btn_agent.png) no-repeat;
  }
  .home-platform .home-agent a:hover {
    background: url(/images/ylc/btn_agent_h.png) no-repeat;
  }

  .notice_area {
    height: 40px;
    line-height: 40px;
    bottom: 0px;
    width: 100%;
  }
  .notice_area_content {
    color: #fff;
    font-size: 14px;
  }

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
<style lang="scss">
	.chatroom{
	  font-size: 18px;
	  position: fixed;
	  left: 40px;
	  bottom: 60px;
	  width: 150px;
	  height: 60px;
	  line-height: 60px;
	  border-radius: 10px;
	  text-align: center;
	  display: block;
	  color: #fff;
	  background-color: #FF5555;
	  box-shadow: inset 0 0 0 1px rgba(168, 112, 0, 0.2),
	    0 2px 6px rgba(0, 0, 0, 0.4);
	  opacity: 0.95;
	  cursor: pointer;
	  z-index: 1000;
	}
  @font-face {
    font-family: "DinPro";
    src: url("./font/DINPro.ttf");
  }
  * {
    outline: 0 none;
    box-sizing: border-box;
    word-break: break-all;
    -webkit-tap-highlight-color: transparent;
    font-family: DinPro, dinpro, PingFangSC-Regular, PingFang SC, SF Pro SC,
      SF Pro Text, Microsoft Yahei, Helvetica Neue, Helvetica, Arial, sans-serif;
  }
  .newhome {
    background: #fffdf8;
    // background-image: url('./assets/main-background@2x-fcdc365463aab458cba652cc7f33e301.jpg');
    // background-size: cover;
    // background-position: center;
    .swiper-container {
      height: 100%;
      .swiper-slide .imgbox {
        width: 100%;
        height: 450px;
        background-size: cover;
        background-position: center;
      }
    }
    .swiper-button-prev {
      left: 0;
      &:after {
        content: "";
        width: 39px;
        height: 80px;
        opacity: 0.7;
        background-color: #fed488;
        position: absolute;
        left: 0;
        z-index: 1;
        background-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAE4AAACgCAYAAACi5FrvAAAC7UlEQVR4nO3avWsUQRiA8VUTLZScGsGPIIiFgiAYC4kg2NlZCKns7fxvrESwtrMINsFCQSSFSOAkopBKzu8DjVqEaJQRFjThcpcHdmZ2eJ7mWK55+fHmbjO3O+7dvjlX2bbbKRlLOJhwMOFgwsGEgwkHEw4mHEw4mHAw4WDCwYSDCQcTDiYcTDiYcDDhYMLBhIMJBxMOJhxMOJhwMOFgwsGEgwkHEw4mHEw4mHAw4WDCwYSDCQcTDiYcTDiYcDDhYMLBhIMJBxMOJhxMOJhwMOFgwsGEgwkHEw4mHEw4mHAw4WDCwYSDCQcby22gw1OnO+dmrp3ZN3Fo4vvK55XFhftLH3qvvmYw2n9ltXEB7dKVGzP7J6cmw3V4DdfpJ9tcNnA12tj4nvFw/e/rqbOXjyUfcENZwG1Ea0PJ4Yah/VxbXXvdffw2/mRblxRuFLTus7lu/MmGlwxulD/PgJbjtlWpbkdG3bRc0aoUG9f2TauLunElbFpdtI0rZdPqomxcSZtW1/jGlbZpdY1uXImbVtfoxpW4aXWNbVzYthI3rS7Jfw7v3iz12oxWpYI7fnL6RI5HRdupMbhwavul3+sPen/64uz5NuM1unHh2Dt8ng16v814jcKFrXsyf2ehRLzGP+NKxYvy5VAiXrRv1dLwot6OlIQX/T6uFLwkN8Al4CX7sabteEl/HhwVLxwYxJ1seMl/kB4Fr3PwyN64Uw0vi0cgRsHLrWweuhmEFw4KcjyC2jV79cL1DOb4249v/dWXi/PLnQNHd/9eX//16f3yx0cPbj3PYLRNZfdgYejpw7svMhhjy3yUFSYcTDiYcDDhYMLBhIMJBxMOJhxMOJhwMOFgwsGEgwkHEw4mHEw4mHAw4WDCwYSDCQcTDiYcTDiYcDDhYMLBhIMJBxMOJhxMOJhwMOFgwsGEgwkHEw4mHEw4mHAw4WDCwYSDCQcTDiYcTDiYcDDhYMLBhIMJBxMOJhxMOJhwMOFgwpGqqvoD4TBNIA0hnmIAAAAASUVORK5CYII=");
        background-size: cover;
      }
    }
    .swiper-button-next {
      right: 0;
      &:after {
        content: "";
        width: 39px;
        height: 80px;
        opacity: 0.7;
        background-color: #fed488;
        position: absolute;
        right: 0;
        cursor: pointer;
        background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAE4AAACgCAYAAACi5FrvAAAClUlEQVR4nO3dv2oUcRRH8WsQNCkkhUTyB7QRQcFKGyWdpEjtewg+gI/gK9ha2AkWYidaWQlWaaIYxWARUiRaKTNVkCyuB9b9XjgHFnZmih0+TDG/uwNz5tfLredl/9yCZCzhYMLBhIMJBxMOJhxMOJhwMOFgwsGEgwkHEw4mHEw4mHAw4WDCwYSDCQcTDiYcTDiYcDDhYMLBhIMJBxMOJhxMOJhwMOFgwsGEgwkHEw4mHEw4mHAw4WDCwYSDCQcTDiYcTDiYcDDhYMLBhIMJBxMOJhxMOJhwMOFgwsGEgwkHEw4mHOxs3Bkt37hQNx/dHr9/f/u5dp99rKO9H3M/rz/KuuKW1s+PaOeWF8fP+vbVuvX47ogZVhbcyubKCHayYXvADMMLu+IuLZ66PxAvC+7Lq68Tj4XhZcEdfDisnSfvJx4Pwsu7Hdl9+qkDXuZ9XAO83BvgcLzslUMwXv6SKxSvx1o1EK/PIj8Mr9d0JAiv31hpWrwZ13MeNw3eMGmZYX0HmQPe3oudef18X7jrD66N87o51RPub2g/D45nPTXuBzcN2ruHb2Z9Gr3gpkX7D/9R9IELQqs2cGFo1QIuEK3i4ULRKhouGK1i4cLRKhKuAVrFwQ3joAZoFQe3dm914rEgtIqDO/p2fOr+MLSKg9t/vT8inSwQbSjv/arDAPLK/ct18c5G8vNxvpgW5qOsMOFgwsGEgwkHEw4mHEw4mHAw4WDCwYSDCQcTDiYcTDiYcDDhYMLBhIMJBxMOJhxMOJhwMOFgwsGEgwkHEw4mHEw4mHAw4WDCwYSDCQcTDiYcTDiYcDDhYMLBhIMJBxMOJhxMOJhwMOFgwsGEgwkHEw4mHEw4mHAw4WDCwYSDCQcTjlRVvwEBXupYB7Zx1gAAAABJRU5ErkJggg==);
        background-size: cover;
      }
    }
    .swiper-pagination {
      .swiper-pagination-bullet {
        position: relative;
        margin: 0 30px 0 0;
        width: 20px;
        height: 20px;
        width: 19px;
        height: 19px;
        background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACYAAAAmCAMAAACf4xmcAAAACXBIWXMAAAsTAAALEwEAmpwYAAAANlBMVEVHcEz////////////////////////////////////+/v7////09ffo6u7Z2+K9wc6ytsalqrw8PWPaAAAAC3RSTlMADSQ/QmaJsNDn+/1y0NAAAAB7SURBVHja7ZNLDoAgDEQV5Tv8ev/LGlxgIkITF27wrV/aSdpZJkZoLVhpVQ5wah1b0gIxAlYOpM0AIRPlAJitGwrwiU6SB7TohHKRKtE9RRQlVCa6yCXifeBe9lXq5r3RAjWEX/tU44/Fn55/pBdvyT85Xxm+gHyd5+UAHd8Z8f9sXKUAAAAASUVORK5CYII=);
        background-color: initial;
        background-size: 100% 100%;
        -webkit-transition: 0.2s;
        transition: 0.2s;
        color: transparent;
        opacity: 1;
        cursor: pointer;
      }
      .swiper-pagination-bullet-active {
        background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACYAAAAmCAMAAACf4xmcAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAOVBMVEVHcExgn/9YlP9Jj/9Hjf9JjP9Ii/9Ii/9HjP9Giv9Gi/9Hi/9Gi/9Gi/9Gi/9Hiv9Gi/9Gi/9Giv/mZMa1AAAAEnRSTlMACAwhNEJUXWZ0goyfsMrf5/d4qWy2AAAAtklEQVR42u2UzQ6DMAyDA6H8FUrr93/YqcyHMiqyHiftuyCQq9oisdzQfVex6H0Cku/lkTkC2wbE+UHkAhAGkSE/ndTRHThGORkPoGqxXxPS2gnpztebxSmb0jKpZouTlAw0VSQtvhKeY9IMk/IO5jtdMCl5J6VjJ5kFgaZwgRYDFso8z13hHb6UaUSFqB8yhyruL/tdmf3r7UFqGUt7yFtWxl5Ae53by8GuGru47BpsL9UvK/oFsbguhb7b4KEAAAAASUVORK5CYII=);
        background-repeat: no-repeat;
        background-size: 100% 100%;
      }
    }
    .notice_area_content .left {
      float: left;
      width: 53px;
      height: 63px;
    }
    .notice_area_content .right {
      float: left;
      width: 100%;
      padding-right: 150 px;
      font-family: FZLTHK-GBK1-0;
      white-space: nowrap;
      display: inline-block;
      height: 100%;
      letter-spacing: -0.35px;
      color: #9da5bb;
      cursor: pointer;
      font-size: 16px;
      letter-spacing: -0.4px !important;
      color: #595859 !important;
    }
    .notice_area_content {
      display: flex;
      align-items: center;
      height: 40px;
      padding: 0 10px 0 18px;
      margin-top: 31px;
      border-radius: 20px;
      background-image: linear-gradient(
        180deg,
        #fff 14%,
        #f9e19c70 54%,
        #f9e19c24 98%
      );
      box-shadow: 0 6px 12px 0 rgba(228, 192, 132, 0.9);
      img {
        box-sizing: border-box;
        padding: 0;
        border: none;
        margin: auto;
        display: block;
        min-width: 100%;
        max-width: 100%;
        min-height: 100%;
        max-height: 100%;
        object-fit: contain;
      }
    }
  }
</style>
