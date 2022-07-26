<template>
  <div class="c-games">
    <div class="shop_top">
    	<template v-if="SiteConfig.theme == 'blue'">
    		<ShopHeader> </ShopHeader>
    	</template>
    	<template v-if="SiteConfig.theme == 'ylc'">
    		<shop-top :subnav_show="false" :change_color="true"></shop-top>
    	</template>
    </div>
    <div class="width_center_1190">
      <div class="c-games-box">
        <!-- 游戏 -->
        <el-row>
          <el-col :span="20">
            <el-button
              class="no-border-bottom"
			  v-show="item.gameId == gameId"
              :type="item.gameId == gameId ? 'primary' : ''"
              v-for="item in gameCategory"
              :key="item.index"
              size="medium"
              @click="changeGameTypeTabs(item.gameId)"
              >{{ item.gameName }}</el-button
            >
          </el-col>
          <el-col :span="4">
            <el-input
              placeholder="请输入内容"
              v-model="searchResult"
              class="input-with-select"
            >
              <el-button
                @click.native="fuzzyQuery(allGameList, searchResult)"
                slot="append"
                icon="el-icon-search"
              ></el-button>
            </el-input>
          </el-col>
        </el-row>
        <div class="c-game-cont">
          <el-row>
            <el-col :span="24">
              <span>游戏种类：</span>
              <el-button
                :type="curSelectGameType == 'all' ? 'primary' : ''"
                @click="curSelectGameType = 'all'"
              >
                全部
              </el-button>
              <el-button
                v-for="item in gameChannelList"
                :key="item.index"
                size="small"
                :type="curSelectGameType == item.gameType ? 'primary' : ''"
                @click="curSelectGameType = item.gameType"
              >
                {{ item.gameTypeName }}
              </el-button>
              <el-button v-if="curSelectGameType == 'search'" type="primary">
                搜索结果
              </el-button>
            </el-col>
          </el-row>
          <el-row style="margin: 15px 0">
            <div v-if="curSelectGameType !== 'search'">
              <el-col
                :span="3"
                v-for="item in curGameList"
                :key="item.index"
                class="image-box"
              >
                <img
                  :src="item.imgurl"
                  :onerror="defaultImg"
                   @click="$router.push(item.url)"
                />
                <div class="item-game">{{ item.gameName }}</div>
              </el-col>
            </div>
            <div v-else>
              <el-col
                :span="3"
                v-for="item in searchGameList"
                :key="item.index"
                class="image-box"
              >
                <img
                  :src="item.imgurl"
                  :onerror="defaultImg"
                   @click="$router.push(item.url)"
                />
                <div class="item-game">{{ item.gameName }}</div>
              </el-col>
            </div>
          </el-row>
        </div>
      </div>
    </div>
    <!--main end-->
    <template v-if="SiteConfig.theme == 'blue'">
    <blueShopFoot></blueShopFoot>
    </template>
    <template v-if="SiteConfig.theme == 'ylc'">
    	<shop-foot></shop-foot>
    </template>
  </div>
</template>

<script>
	import ShopTop from "@/components/home/public/head.vue";
	import ShopFoot from "@/components/home/public/shop_foot.vue";
	import ShopHeader from "@/views/NewHome/components/head.vue";
	import blueShopFoot from "@/views/NewHome/components/shop_foot.vue";
// import ShopHeader from "@/components/home/public/head.vue";
// import ShopFoot from "@/components/home/public/shop_foot.vue";
export default {
  data() {
    return {
      gameId: 166,
	  channelId:'DZYX',
      gameCategory: "",
      gameChannelList: [],
      searchResult: "",
      curSelectGameType: "all",
      searchGameList: [],
      allGameList: [],
      defaultImg: 'this.src="/images/defaultImg.png"', //默认图地址
    };
  },
  components: {
    ShopTop,
    ShopFoot,
    ShopHeader,
    blueShopFoot
  },
  computed: {
    curGameList() {
      let _curGameList = [];
      if (this.curSelectGameType == "all") {
        this.gameChannelList.forEach((item) => {
          item.gameList.forEach((ite) => {
            _curGameList.push(ite);
          });
        });
      } else {
        this.gameChannelList.forEach((item) => {
          if (item.gameType == this.curSelectGameType) {
            _curGameList = item.gameList;
          }
        });
      }
      return _curGameList;
    },
  },
  methods: {
    getUrl(item) {
      return;
    },
	changeGameTypeTabs(curGameId){
		this.gameId=curGameId;
		console.log(curGameId);
		this.get_game_typename();
	},
    // 获取全部游戏列表
    get_allGameList() {
      this.gameChannelList.forEach((item) => {
        item.gameList.forEach((ite) => {
          this.allGameList.push(ite);
        });
      });
    },
    // 初始化游戏列表
    get_game_category() {
      this.$get("Pc.ThirdPartyGame.getThirdPartyGameList", {
        gameType: this.channelId,
      }).then((res) => {
        if (res.code == 0) {
          this.gameCategory = res.data;
          //console.log(this.gameCategory);
          this.get_game_typename();
        } else {
          return this.$message.error(res.msg);
        }
      });
    },

    // 获取游戏种类
    get_game_typename() {
		const loading = this.$loading({
		          lock: false,
		          text: 'Loading',
		          spinner: 'el-icon-loading',
		          background: 'rgba(0, 0, 0, 0.1)'
		        });
      this.$get("Pc.ElectronicGame.getGameChannelList", {
        gameId: this.gameId, 
      }).then((res) => {
        if (res.code == 0) {
          let _gameChannelList = res.data;
          this.gameChannelList = Object.values(_gameChannelList);
          this.get_allGameList();
		  loading.close();
          //console.log(this.gameChannelList);
        } else {
			loading.close();
          return this.$message.error(res.msg);
        }
      });
    },
    /**
     * 使用match方法实现模糊查询
     * @param  {Array}  list     进行查询的数组
     * @param  {String} keyWord  查询的关键词
     * @return {Array}           查询的结果
     */
    fuzzyQuery(list, keyWord) {
      this.curSelectGameType = "search";
      let arr = [];
      for (var i = 0; i < list.length; i++) {
        if (list[i].gameName.match(keyWord) != null) {
          arr.push(list[i]);
        }
      }
      //console.log(arr);
      this.searchGameList = arr;
    },
  },
  created() {
	  let token = localStorage.getItem("token");
	  if (token == undefined || token == "" || token == null) {
	    this.$router.push({ path: "/user/login" });
	    return;
	  }
	  let {gameId,channelId} = this.$route.query;
	  //console.log(channelId);
	  if(gameId!=undefined&& gameId>0){
		  this.gameId=gameId;
	  }
	  if(channelId!=undefined&& channelId!=""){
	  		  this.channelId=channelId;
	  }
	  //console.log(this.current_game);
	  
    this.get_game_category();
  },
  mounted() {},
};
</script>

<style lang="scss" scoped>
.c-games {
  .c-games-box {
    margin: 25px 0;
	min-height: 500px;
    .no-border-bottom {
      border-bottom-left-radius: 0;
      border-bottom-right-radius: 0;
    }
    .c-game-cont {
      padding: 15px;
      border: 1px solid #eee;
      .item-game {
        margin: 10px 0;
      }
      .image-box {
        text-align: center;
        margin: 20px 0;
        img {
          border-radius: 30%;
          width: 60%;
          height: 60%;
          transition: All 0.4s ease-in-out;
          -webkit-transition: All 0.4s ease-in-out;
          -moz-transition: All 0.4s ease-in-out;
          -o-transition: All 0.4s ease-in-out;
        }
        img:hover {
          transform: rotate(360deg) scale(1.7);
          -webkit-transform: rotate(360deg) scale(1.7);
          -moz-transform: rotate(360deg) scale(1.7);
          -o-transform: rotate(360deg) scale(1.67);
          -ms-transform: rotate(360deg) scale(1.7);
        }
      }
    }
  }
}
</style>