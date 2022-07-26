<template>
  <div class="user_index">
    <div class="shop_top">
      <template v-if="SiteConfig.theme == 'blue'">
        <ShopHeader> </ShopHeader>
      </template>
      <template v-if="SiteConfig.theme == 'ylc'">
        <shop-top :subnav_show="false" :change_color="true"></shop-top>
      </template>
    </div>
    <div
      class="user_body"
      :class="SiteConfig.theme == 'blue' ? 'withbackground' : ''"
    >
      <div class="width_center_1320" style="padding-bottom: 40px">
        <div class="user_left">
          <div class="user_info_block">
            <dl>
              <dt>
                <img
                  width="60px"
                  height="60px"
                  :src="user_info.avatar || '/pc/default_avatar.png'"
                  alt=""
                />
              </dt>
              <dd style="width: 90px; overflow: hidden">
                {{ user_info.nickname || "神秘人" }}
              </dd>
              <dd class="edit_user_info">
                <router-link @click.native="showRouter" to="/user/user_info"
                  >编辑信息</router-link
                >
              </dd>
            </dl>
            <div class="other_user_info_step">
              <font>账号资料：</font>
              <div style="width: 50%; float: left">
                <el-progress :percentage="bfb"></el-progress>
              </div>
              <div class="clear"></div>
            </div>
            <div class="other_user_info_step" style="margin-top: 10px">
              <font>账户安全：</font>
              <div class="user_aq" style="width: 50%; float: left">
                <el-tooltip
                  class="item"
                  effect="dark"
                  content="邮箱认证"
                  placement="bottom"
                  ><i
                    :class="
                      user_info.email == ''
                        ? 'icon iconfont'
                        : 'icon iconfont font_color'
                    "
                    >&#xe6eb;</i
                  ></el-tooltip
                >
                <el-tooltip
                  class="item"
                  effect="dark"
                  content="手机认证"
                  placement="bottom"
                  ><i
                    :class="
                      user_info.phone == ''
                        ? 'icon iconfont'
                        : 'icon iconfont font_color'
                    "
                    >&#xe650;</i
                  ></el-tooltip
                >
                <el-tooltip
                  class="item"
                  effect="dark"
                  content="真实身份认证"
                  placement="bottom"
                  ><i
                    :class="
                      is_check == ''
                        ? 'icon iconfont'
                        : 'icon iconfont font_color'
                    "
                    class="icon iconfont"
                    >&#xeb9a;</i
                  ></el-tooltip
                >
              </div>
              <div class="clear"></div>
            </div>
          </div>
          <div class="user_cat">
            <div class="user_cat_title">
              <i class="iconfont icon-jilu"></i>投注记录
            </div>
            <div class="user_cat_list">
              <ul>
                <li><router-link to="/user/order">游戏记录</router-link></li>
                <!-- <li><router-link to="/user/address">收货地址</router-link></li>
                <li><router-link to="/">退换货订单</router-link></li> 
                <li>
                  <router-link
                    @click.native="showRouter"
                    to="/user/comment/index"
                    >评论列表</router-link
                  >
                </li>-->
              </ul>
            </div>
            <div class="user_cat_title">
              <i class="iconfont icon-yonghu"></i>账号管理
            </div>
            <div class="user_cat_list">
              <ul>
                <!--<li><router-link to="/user/index">个人中心</router-link></li>-->
                <li>
                  <router-link @click.native="showRouter" to="/user/user_info"
                    >用户资料</router-link
                  >
                </li>
                <li>
                  <router-link
                    @click.native="showRouter"
                    to="/user/withdraw/changepassword"
                    >密码修改</router-link
                  >
                </li>
                <!-- <li><router-link to="/">实名认证</router-link></li> 
                <li>
                  <router-link @click.native="showRouter" to="/user/user_bind"
                    >账号绑定</router-link
                  >
                </li>
				
                <!-- <li><router-link to="/user/fav">收藏/关注</router-link></li>
                <li><router-link to="/">我的留言</router-link></li> -->
                <li>
                  <router-link @click.native="showRouter" to="/user/ct_center"
                    >充提中心</router-link
                  >
                </li>
                <li>
                  <router-link
                    @click.native="showRouter"
                    to="/user/withdraw/withdraw"
                    >提现</router-link
                  >
                </li>
                <li>
                  <router-link
                    @click.native="showRouter"
                    to="/user/recharge/recharge"
                    >充值</router-link
                  >
                </li>
                <li>
                  <router-link @click.native="showRouter" to="/user/usdtAddr"
                    >USDT地址管理</router-link
                  >
                </li>
              </ul>
            </div>
            <div class="user_cat_title">
              <i class="iconfont icon-bank_b2c1"></i>银行账户
            </div>
            <div class="user_cat_list">
              <ul>
                <li>
                  <router-link
                    @click.native="showRouter"
                    to="/user/Personal_overview"
                    >个人总览</router-link
                  >
                </li>

                <li><router-link to="/user/safe">账户安全</router-link></li>
                <li>
                  <router-link @click.native="showRouter" to="/user/bank_manage"
                    >银行卡管理</router-link
                  >
                </li>
                <li>
                  <router-link
                    @click.native="showRouter"
                    to="/user/caizhong_info"
                    >彩种信息</router-link
                  >
                </li>
                <li>
                  <router-link
                    @click.native="showRouter"
                    to="/user/caizhong_limit"
                    >彩种限额</router-link
                  >
                </li>
              </ul>
            </div>
            <!--<div class="user_cat_title">
              <i class="icon iconfont">&#xe629;</i>积分商城
            </div>
            <div class="user_cat_list">
              <ul>
                <li>
                  <router-link
                    @click.native="showRouter"
                    to="/user/integral_order"
                    >积分订单</router-link
                  >
                </li>
              </ul>
            </div>
			
            <div class="user_cat_title">
              <i class="icon iconfont">&#xe8cc;</i>资产记录
            </div>
            <div class="user_cat_list">
              <ul>
                <li>
                  <router-link
                    @click.native="showRouter"
                    to="/user/get_money_log/money"
                    >平台余额</router-link
                  >
                </li>
                <li>
                  <router-link
                    @click.native="showRouter"
                    to="/user/get_money_log/freeze_money"
                    >冻结余额</router-link
                  >
                </li>
                <li>
                  <router-link
                    @click.native="showRouter"
                    to="/user/get_money_log/integral"
                    >平台积分</router-link
                  >
                </li>
              </ul>
            </div>

            <div class="user_cat_title">
              <i class="icon iconfont">&#xe618;</i>分销分佣
            </div>
            <div class="user_cat_list">
              <ul>
                <li>
                  <router-link
                    @click.native="showRouter"
                    to="/user/inviter/inviter_info"
                    >分销信息</router-link
                  >
                </li>
                <li>
                  <router-link
                    @click.native="showRouter"
                    to="/user/inviter/inviter_member"
                    >分销会员</router-link
                  >
                </li>
                <li>
                  <router-link
                    @click.native="showRouter"
                    to="/user/inviter/inviter_money"
                    >分销佣金</router-link
                  >
                </li>
                <li>
                  <router-link @click.native="showRouter" to="/user/cash/index"
                    >资金提现</router-link
                  >
                </li>
              </ul>
            </div>
			-->
            <div class="user_cat_title">
              <i class="iconfont icon-baobiao"></i>报表管理
            </div>
            <div class="user_cat_list">
              <ul>
                <li>
                  <router-link
                    @click.native="showRouter"
                    to="/user/report/report_bills"
                    >账变报表</router-link
                  >
                </li>
                <li>
                  <router-link
                    @click.native="showRouter"
                    to="/user/report/report_personal"
                    >个人报表</router-link
                  >
                </li>
              </ul>
            </div>
            <div class="user_cat_title" v-if="user_info.hierarchy > 0">
              <i class="iconfont icon-V"></i>代理管理
            </div>
            <div class="user_cat_list" v-if="user_info.hierarchy > 0">
              <ul>
                <li>
                  <router-link
                    @click.native="showRouter"
                    to="/user/report/report_team"
                    >团队报表</router-link
                  >
                </li>
                <li>
                  <router-link
                    @click.native="showRouter"
                    to="/user/team_overview"
                    >团队总览</router-link
                  >
                </li>
                <li>
                  <router-link @click.native="showRouter" to="/user/user_list"
                    >用户列表</router-link
                  >
                </li>
                <li>
                  <router-link
                    @click.native="showRouter"
                    to="/user/proxy/register_management"
                    >注册管理</router-link
                  >
                </li>
                <li>
                  <router-link
                    @click.native="showRouter"
                    to="/user/proxy/register_expand"
                    >推广注册</router-link
                  >
                </li>
              </ul>
            </div>
            <div class="user_cat_title">
              <i class="iconfont icon-mail"></i>短信公告
            </div>
            <div class="user_cat_list">
              <ul>
                <li>
                  <router-link
                    @click.native="showRouter"
                    to="/user/message/instation_notice"
                    >站内信息</router-link
                  >
                </li>
                <li>
                  <router-link
                    @click.native="showRouter"
                    to="/user/message/web_notice"
                    >网站公告</router-link
                  >
                </li>
                <!-- <li>
				  <router-link
				    @click.native="showRouter"
				    to="/user/help/rules"
				    >游戏规则说明</router-link
				  >
				</li> -->
              </ul>
            </div>
          </div>
        </div>

        <div class="user_right">
          <keep-alive>
            <router-view v-if="isShow"></router-view>
          </keep-alive>
        </div>

        <div class="clear"></div>
      </div>
    </div>
     <template v-if="SiteConfig.theme == 'blue'">
       <blueShopFoot></blueShopFoot>
      </template>
      <template v-if="SiteConfig.theme == 'ylc'">
        <shop-foot></shop-foot>
      </template>
    <!-- vue 回到顶部 -->
    <el-backtop></el-backtop>
  </div>
</template>

<script>
import ShopTop from "@/components/home/public/head.vue";
import ShopFoot from "@/components/home/public/shop_foot.vue";
import ShopHeader from "@/views/NewHome/components/head.vue";
import blueShopFoot from "@/views/NewHome/components/shop_foot.vue";
export default {
  components: {
    ShopTop,
    ShopFoot,
    ShopHeader,
    blueShopFoot
  },
  props: {},
  data() {
    return {
      user_info: {},
      bfb: 0,
      is_check: false,
      isShow: true,
      gameListData: [],
    };
  },
  // 提供可注入子组件属性
  provide() {
    return {
      reload: this.reload,
    };
  },

  watch: {},
  computed: {
    key() {
      if (
        this.$route.fullPath == "/user/order/order_detail" ||
        this.$route.fullPath == "/user/recharge/recharge" ||
        this.$route.fullPath == "/user/withdraw/withdraw"
      ) {
        return this.$route.fullPath + new Date();
      } else {
        return this.$route.fullPath;
      }
    },
  },
  methods: {
    showRouter() {
      // 先隐藏
      this.isShow = false;
      this.$nextTick(() => {
        this.isShow = true;
      });
    },
    // // 点击刷新路由
    // reloadRouter(path) {
    //   this.$router.replace({
    //     path: "/user/redirect",
    //     query: {
    //       path: encodeURI(path),
    //     },
    //   });
    // },

    // get_user_info: function () {
    //   this.$get(this.$api.homeGetUserInfo).then((res) => {
    //     this.user_info = res.data;
    //     let arr = Object.keys(this.user_info);
    //     let len = arr.length;
    //     let bfb = 0;
    //     arr.forEach((userRes) => {
    //       if (userRes != "") {
    //         bfb += 1;
    //       }
    //     });
    //     this.bfb = Math.ceil(bfb / len) * 100;
    //   });
    // },
    // get_user_check_info: function () {
    //   this.$get(this.$api.homeGetUserCheckInfo).then((res) => {
    //     if (res.code == 200) {
    //       this.is_check = true;
    //     }
    //   });
    // },
  },
  created() {
    let { username } = this.$store.state.gd.userInfo;

    if (username != undefined && username != "") {
      this.user_info = this.$store.state.gd.userInfo
    } else {
      this.$get("Pc.Member.memberInfo").then((res) => {
        if (res.code == 0) {
          this.user_info = res.data;
          this.$store.commit("userInfo", this.user_info);
        } else {
          this.$message.error(res.message);
        }
      });
    }
    //this.get_user_info();
    //this.get_user_check_info();
  },
  mounted() {},
};
</script>
<style lang="scss" scoped>
.user_body {
  background: #f1f1f1;
}
.user_body .withbackground {
  background: #f0f6ff;
  padding-top: 10px;
}
.user_body:after {
  content: "";
  display: block;
  clear: both;
}
.user_left {
  float: left;
  width: 190px;
  margin-right: 10px;
  padding-top: 30px;
  .user_info_block {
    background: #fff;
    padding: 20px 5px 20px 10px;
    border-radius: 5px;
    dl:after {
      content: "";
      display: block;
      clear: both;
    }
    dl dt img {
      border-radius: 50%;
      border: 1px solid #efefef;
      box-sizing: border-box;
    }
    dl dt {
      float: left;
      margin-right: 15px;
      width: 60px;
      height: 60px;
      border: 1px solid #f4f4f4;
      border-radius: 50%;
    }
    dl dd {
      font-size: 14px;
      float: left;
      margin-top: 10px;
    }
    dl dd.edit_user_info {
      border: 1px solid $--color-primary;
      line-height: 20px;
      text-align: center;
      color: $--color-primary;
      padding: 0 15px;
      margin-top: 5px;
      a {
        color: $--color-primary;
      }
    }
  }
  .user_info_block:after {
    content: "";
    display: block;
    clear: both;
  }
  .user_cat {
    border-radius: 5px;
    margin-top: 20px;
    background: #fff;
    padding: 20px;
    font-size: 14px;
    .user_cat_title {
      font-size: 16px;
      padding-left: 20px;
    }
    .user_cat_title i {
      margin-right: 10px;
      font-size: 14px;
      color: $--color-primary;
    }
    .user_cat_list {
      padding-left: 45px;
      margin-bottom: 12px;
      padding-bottom: 5px;
      border-bottom: 1px solid #efefef;
      ul li {
        margin: 10px 0;
        a {
          color: #666;
        }
        a:hover {
          color: $--color-primary;
        }
      }
    }
    .user_cat_list:last-child {
      border-bottom: none;
    }
  }
  .other_user_info_step {
    margin-top: 20px;
    clear: both;
    font {
      float: left;
      width: 40%;
      font-size: 14px;
    }
    .user_aq i {
      margin-right: 10px;
      margin-left: 5px;
      line-height: 20px;
    }
    .user_aq i.font_color {
      color: #67c23a;
    }
  }
}
.user_right {
  float: left;
  width: 1115px;
  padding-top: 30px;
}
</style>