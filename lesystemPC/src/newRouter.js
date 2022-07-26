import Vue from 'vue'
import Router from 'vue-router'
import Config from './plugins/config.js'
import bluetheme from './blueTheme.js'
import ylctheme from './ylcTheme.js'

Vue.use(Router)

let RouteList = [
    //游戏列表
    {
        path: '/games',
        name: 'games',
        component: () =>
            import ('./views/games/index.vue'),
        meta: {
            keepAlive: true, //需要被缓存
        },
    },

    {
        path: '/pages/register/generalizeRegister',
        name: 'generalizeRegister',
        component: () =>
            import ('./views/Home/generalizeRegister.vue')
    },
    {
        path: '/pages/maintain/maintain',
        name: 'maintain',
        component: () =>
            import ('./views/Home/maintain.vue')
    },
    {
        path: '/user/forget_password',
        name: 'user_forget_password',
        component: () =>
            import ('./views/Home/forget_password.vue')
    }, // 忘记密码
    {
        path: '/news',
        name: 'news',
        component: () =>
            import ('./views/Home/news.vue')
    }, //新闻
    {
        path: '/news_info/:id',
        name: 'news_info',
        component: () =>
            import ('./views/Home/news_info.vue')
    }, //新闻内容
    {
        path: '/result/',
        name: 'result',
        component: () =>
            import ('./views/Home/gameResults')
    }, //走势图
    {
        path: '/phone/',
        name: 'phone',
        component: () =>
            import ('./views/Home/phone')
    }, //手机版
    {
        path: '/activity/',
        name: 'activity',
        component: () =>
            import ('./views/Home/activity')
    }, //优惠活动

    {
        path: '/pages/games/thirdparty/thirdparty/',
        name: 'thirdparty',
        component: () =>
            import ('./views/Home/thirdparty/thirdparty')
    },
    // 入驻
    {
        path: '/store/join',
        name: 'store_join',
        component: () =>
            import ('./views/Home/store/join.vue')
    },
    {
        path: '/store/join_1',
        name: 'store_join_1',
        component: () =>
            import ('./views/Home/store/join_1.vue')
    },
    {
        path: '/store/join_2',
        name: 'store_join_2',
        component: () =>
            import ('./views/Home/store/join_2.vue')
    },
    {
        path: '/store/join_3',
        name: 'store_join_3',
        component: () =>
            import ('./views/Home/store/join_3.vue')
    }, // 审核通过
    {
        path: '/store/join_4',
        name: 'store_join_4',
        component: () =>
            import ('./views/Home/store/join_4.vue')
    }, // 审核中

    // 店铺首页
    {
        path: '/store/:id',
        name: 'home_store_index',
        component: () =>
            import ('./views/Home/store/index.vue')
    },
    {
        path: '/store/:id/class/:class_id',
        name: 'home_store_goods_list',
        component: () =>
            import ('./views/Home/store/store_goods_list.vue')
    },

    // 产品列表
    {
        path: '/goods/params/:info',
        name: 'goods_index',
        component: () =>
            import ('./views/Home/goods/index.vue')
    },

    // 秒杀列表
    {
        path: '/goods/seckill',
        name: 'goods_seckill',
        component: () =>
            import ('./views/Home/goods/seckill.vue')
    },

    // 产品详情
    {
        path: '/goods/info/:goods_id',
        name: 'home_goods_info',
        component: () =>
            import ('./views/Home/goods/info.vue')
    },

    // 用户中心
    {
        path: '/user/index',
        name: 'user_index',
        component: () =>
            import ('./views/Home/user/index.vue'),
        //import('./views/Home/user/totalOverview/Personal_overview.vue'),
        children: [{
                path: '/user/index',
                name: 'user_default',
                component: () =>
                    //import('./views/Home/user/default.vue')
                    import ('./views/Home/user/totalOverview/Personal_overview.vue'),
            },
            {
                path: '/user/address',
                name: 'user_address',
                component: () =>
                    import ('./views/Home/user/address.vue')
            },
            {
                path: '/user/order',
                name: 'user_order',
                component: () =>
                    import ('./views/Home/user/order/order.vue')
            },
            {
                path: '/user/order/order_detail',
                name: 'user_order_detail',
                component: () =>
                    import ('./views/Home/user/order/order_detail.vue')
            },
            {
                path: '/user/user_info',
                name: 'home_user_info',
                component: () =>
                    import ('./views/Home/user/user_info.vue')
            },
            {
                path: '/user/fav',
                name: 'home_fav',
                component: () =>
                    import ('./views/Home/user/fav.vue')
            }, // 收藏关注
            {
                path: '/user/fav_store',
                name: 'home_fav_store',
                component: () =>
                    import ('./views/Home/user/fav_store.vue')
            }, // 收藏关注
            {
                path: '/user/get_money_log/money',
                name: 'home_get_money_log',
                component: () =>
                    import ('./views/Home/user/log.vue')
            }, // 资金变更日志
            {
                path: '/user/get_money_log/freeze_money',
                name: 'home_get_money_log1',
                component: () =>
                    import ('./views/Home/user/log_1.vue')
            }, // 资金变更日志
            {
                path: '/user/get_money_log/integral',
                name: 'home_get_money_log2',
                component: () =>
                    import ('./views/Home/user/log_2.vue')
            }, // 资金变更日志
            {
                path: '/user/ct_center',
                name: 'ct_center',
                component: () =>
                    import ('./views/Home/user/ct_center.vue')
            }, // 充提中心


            {
                path: '/user/safe/password',
                name: 'home_user_safe_password',
                component: () =>
                    import ('./views/Home/user//safe/password.vue')
            }, // 密码修改
            {
                path: '/user/safe/pay_password',
                name: 'home_user_safe_pay_password',
                component: () =>
                    import ('./views/Home/user//safe/pay_password.vue')
            }, // 支付密码修改

            {
                path: '/user/user_bind',
                name: 'home_user_bind',
                component: () =>
                    import ('./views/Home/user/user_bind.vue')
            }, // 账号绑定
            {
                path: '/user/safe/card',
                name: 'home_user_card',
                component: () =>
                    import ('./views/Home/user/safe/card.vue')
            }, // 身份认证

            // 账户管理
            {
                path: '/user/Personal_overview',
                name: 'Personal_overview',
                component: () =>
                    import ('./views/Home/user/totalOverview/Personal_overview.vue')
            }, // 个人总览
            {
                path: '/user/team_overview',
                name: 'team_overview',
                component: () =>
                    import ('./views/Home/user/totalOverview/team_overview.vue')
            }, // 团队总览
            {
                path: '/user/user_list',
                name: 'user_list',
                component: () =>
                    import ('./views/Home/user/user_list/user_list.vue')
            }, // 用户列表
            {
                path: '/user/user_list_kickback',
                name: 'user_list_kickback',
                component: () =>
                    import ('./views/Home/user/user_list/user_list_kickback.vue')
            }, // 用户列表返点设定
            {
                path: '/user/user_list_detail',
                name: 'user_list_detail',
                component: () =>
                    import ('./views/Home/user/user_list/user_list_detail.vue')
            }, // 用户列表详情
            {
                path: '/user/user_transfer_account',
                name: 'user_transfer_account',
                component: () =>
                    import ('./views/Home/user/user_list/user_transfer_account.vue')
            }, // 用户转账

            {
                path: '/user/safe',
                name: 'home_user_safe',
                component: () =>
                    import ('./views/Home/user/safe/safe.vue')
            }, // 账号安全
            {
                path: '/user/bank_manage',
                name: 'bank_manage',
                component: () =>
                    import ('./views/Home/user/bank_manage.vue')
            }, // 银行卡管理
            {
                path: '/user/bank_manage_add',
                name: 'bank_manage_add',
                component: () =>
                    import ('./views/Home/user/bank_manage_add.vue')
            }, // 银行卡管理
            {
                path: '/user/caizhong_info',
                name: 'caizhong_info',
                component: () =>
                    import ('./views/Home/user/caizhong_info.vue')
            }, // 彩种信息
            {
                path: '/user/caizhong_limit',
                name: 'caizhong_limit',
                component: () =>
                    import ('./views/Home/user/caizhong_limit.vue')
            }, // 彩种限额

            // 评论列表
            {
                path: '/user/comment/add/:order_id',
                name: 'home_comment_add',
                component: () =>
                    import ('./views/Home/user/comment/add.vue')
            }, // 订单添加评论
            {
                path: '/user/comment/index',
                name: 'home_comment_index',
                component: () =>
                    import ('./views/Home/user/comment/index.vue')
            }, // 订单添加评论

            // 分销信息
            {
                path: '/user/inviter/inviter_info',
                name: 'home_inviter_info',
                component: () =>
                    import ('./views/Home/user/inviter/inviter_info.vue')
            },
            {
                path: '/user/inviter/inviter_member',
                name: 'home_inviter_member',
                component: () =>
                    import ('./views/Home/user/inviter/inviter_member.vue')
            },
            {
                path: '/user/inviter/inviter_money',
                name: 'home_inviter_money',
                component: () =>
                    import ('./views/Home/user/inviter/inviter_money.vue')
            },

            // 报表管理
            {
                path: '/user/report/report_bills',
                name: 'home_report_bills',
                component: () =>
                    import ('./views/Home/user/report_bills.vue')
            },
            {
                path: '/user/report/report_personal',
                name: 'home_report_personal',
                component: () =>
                    import ('./views/Home/user/report_personal/report_personal.vue')
            },
            {
                path: '/user/report/report_team',
                name: 'home_report_team',
                component: () =>
                    import ('./views/Home/user/report_team/report_team.vue')
            },
            {
                path: '/user/report/report_team_detail',
                name: 'home_report_team_detail',
                component: () =>
                    import ('./views/Home/user/report_team/report_team_detail.vue')
            },

            // 积分订单
            {
                path: '/user/integral_order',
                name: 'integral_order',
                component: () =>
                    import ('./views/Home/user/integral_order.vue')
            },

            // 提现列表页面
            {
                path: '/user/cash/index',
                name: 'home_cash_index',
                component: () =>
                    import ('./views/Home/user/cash/index.vue')
            },

            // 代理管理
            {
                path: '/user/proxy/register_management',
                name: 'home_register_management',
                component: () =>
                    import ('./views/Home/user/proxy/register_management.vue')
            },
            {
                path: '/user/proxy/register_expand',
                name: 'home_register_expand',
                component: () =>
                    import ('./views/Home/user/proxy/register_expand.vue')
            },

            // 短信公告
            {
                path: '/user/message/instation_notice',
                name: 'instation_notice',
                component: () =>
                    import ('./views/Home/user/message/instation_notice.vue')
            },
            {
                path: '/user/message/web_notice',
                name: 'web_notice',
                component: () =>
                    import ('./views/Home/user/message/web_notice.vue')
            },
            {
                path: '/user/help/rules',
                name: 'helprules',
                component: () =>
                    import ('./views/Home/user/help/rules.vue')
            },
            {
                path: '/user/help/help_info/:id',
                name: 'helpinfo',
                component: () =>
                    import ('./views/Home/user/help/help_info.vue')
            }, //新闻内容

            // 提现
            {
                path: '/user/withdraw/withdraw',
                name: 'withdraw',
                component: () =>
                    import ('./views/Home/user/withdraw/withdraw.vue')
            },
            {
                path: '/user/withdraw/withdraw_detail',
                name: 'withdraw_detail',
                component: () =>
                    import ('./views/Home/user/withdraw/withdraw_detail.vue')
            },
            {
                path: '/user/withdraw/withdraw_turnover',
                name: 'withdraw_turnover',
                component: () =>
                    import ('./views/Home/user/withdraw/withdraw_turnover.vue')
            },
            {
                path: '/user/withdraw/changepassword',
                name: 'changepassword',
                component: () =>
                    import ('./views/Home/user/withdraw/changepassword.vue')
            },

            // 充值
            {
                path: '/user/recharge/recharge',
                name: 'recharge',
                component: () =>
                    import ('./views/Home/user/recharge/recharge.vue')
            },
            // USDT地址管理
            {
                path: '/user/usdtAddr',
                name: 'usdtAddr',
                component: () =>
                    import ('@/views/Home/user/usdtAddr/index.vue')
            },
            {
                path: '/user/usdtAddr/AddAddress',
                name: 'addaddress',
                component: () =>
                    import ('@/views/Home/user/usdtAddr/AddAddress.vue')
            },

        ]
    },



    // // 购物车
    // {
    //   path: '/cart/index',
    //   name: 'cart_index',
    //   component: () =>
    //     import('./views/Home/cart/index.vue')
    // },

    // 生成订单页面  或者选择物流地址
    {
        path: '/order/create_order/:type/:info',
        name: 'create_order_index',
        component: () =>
            import ('./views/Home/order/create_order.vue')
    },
    {
        path: '/order/chose_pay/:order_no/:type/:info',
        name: 'home_chose_pay',
        component: () =>
            import ('./views/Home/order/chose_pay.vue')
    },
    {
        path: '/order/pay_success',
        name: 'home_pay_success',
        component: () =>
            import ('./views/Home/order/pay_success.vue')
    },

    // 积分商城
    {
        path: '/integral/index',
        name: 'home_integral_index',
        component: () =>
            import ('./views/Home/integral/index.vue')
    },
    {
        path: '/integral/goods/index/:info',
        name: 'home_integral_goods_index',
        component: () =>
            import ('./views/Home/integral/goods/index.vue')
    },
    {
        path: '/integral/goods/info/:id',
        name: 'home_integral_goods_info',
        component: () =>
            import ('./views/Home/integral/goods/info.vue')
    },

    // 积分商城订单
    {
        path: '/integral/order/create_order/:info',
        name: 'home_integral_order_create_order',
        component: () =>
            import ('./views/Home/integral/order/create_order.vue')
    },
    {
        path: '/integral/order/pay_success',
        name: 'home_integral_order_pay_success',
        component: () =>
            import ('./views/Home/integral/order/pay_success.vue')
    }, // 积分兑换成功

    // 拼团商品列表页面
    {
        path: '/groupbuy/list/:info',
        name: 'home_groupbuy_list',
        component: () =>
            import ('./views/Home/goods/groupbuy.vue')
    },

    // 综合游戏
    {
        path: '/comprehensiveGames/CQ9',
        name: 'comprehensiveGames',
        component: () =>
            import ('./views/games/comprehensiveGames/CQ9/index.vue')
    },



    // {
    //   path: '*',
    //   name: 'notfound',
    //   component: Config.theme == 'default' ? () => import(`@/views/Home/index.vue`) : () => import(`@/views/Home/index_ylc.vue`)
    // },
    // {
    //   path: '/about',
    //   name: 'about',
    //   // route level code-splitting
    //   // this generates a separate chunk (about.[hash].js) for this route
    //   // which is lazy-loaded when the route is visited.
    //   component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    // }
]

if (Config.theme == 'blue') {
    RouteList = RouteList.concat(bluetheme)
} else if (Config.theme == 'ylc') {
    RouteList = RouteList.concat(ylctheme)
}
export default new Router({ mode: 'history', routes: RouteList })