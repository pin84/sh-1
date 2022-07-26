<template>
  <div class="lmenu">
    <div class="info">
      <div class="info-item">
        <i class="iconfont icon-yonghu"></i>
        <p>
          <span>账号:</span><span class="yuan">{{ username }}</span>
        </p>
        <!-- <p class="num">0</p> -->
      </div>
      <div class="info-item">
        <i class="iconfont icon-qiandai" style="color: #dc1404"></i>
        <p><span>余额:</span><span class="yuan"> </span></p>
        <p class="num">{{ coin }}(元)</p>
      </div>
    </div>
    <!-- <div class="clear" style="border-bottom: 1px solid #ececec"></div> -->
    <ul class="list">
      <li
        class="item pointer"
        @click="toPage(item)"
        v-for="(item, index) in list"
        :key="index"
      >
        <img width="40" height="40" :src="item.url" />
        <p>{{ item.name }}</p>
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  data() {
    return {
      coin: 0,
      username: "",
      list: [
        {
          url: "/images/games/icon_chongzhi.png",
          name: "充值",
          path: "/user/recharge/recharge",
        },
        {
          url: "/images/games/icon_tixian.png",
          name: "提现",
          path: "/user/withdraw/withdraw",
        },
        {
          url: "/images/games/icon_zhangbian.png",
          name: "账变记录",
          path: "/user/report/report_bills",
        },
        {
          url: "/images/games/icon_youxi.png",
          name: "游戏记录",
          path: "/user/order",
        },
        {
          url: "/images/games/icon_zhanghu.png",
          name: "账户管理",
          path: "/user/Personal_overview",
        },
        {
          url: "/images/games/icon_huiyuan.png",
          name: "会员中心",
          path: "/user/index",
        },
      ],
    };
  },

  watch:{
    '$store.state.gd.updateUserInfo':function(val){
      this.initData()
    }
  },

  created() {
    this.initData();
  },

  mounted(){
    this.interval = setInterval(()=>{
       this.initData();
    },60000)
  },

  methods: {
    async initData() {


      let res = await this.$get(this.$gapi.memberInfo);
      this.$store.commit('userInfo',res.data)
      let { username, coin } = res.data;
      this.username = username;
      this.coin = coin;
    },
    toPage(item) {
      this.$router.push({ path: item.path });
    },
  },

  
  beforeDestroy() {
    clearInterval(this.interval);
  },
};
</script>
<style lang="scss" scoped>
.lmenu {
  background-color: #f1f1f1;
  .info {
    font-size: 14px;
    .info-item {
      display: flex;
      align-items: center;
      padding: 3px 8px;
      border: 2px solid #dc1404;
      margin-top: 5px;
      border-radius: 5px;
      .iconfont {
        margin-right: 10px;
      }
      // justify-content: center;
    }
  }
}
.list {
  background-color: #f1f1f1;
  // border: 1px solid red;
  display: flex;
  flex-wrap: wrap;
  .item {
    border-bottom: 1px solid #fff;
    border-right: 1px solid #fff;
    width: 33.3%;
    height: 75px;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    &:hover {
      background-color: #ccc;
    }
    p {
      font-size: 12px;
    }
  }
}
</style>
