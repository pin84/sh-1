export default {




  /**
   * 获取用户信息
   */
  memberInfo: "Pc.Member.memberInfo",

  getIndexData: 'Pc.GameIndex.getIndexData',

  // getNavListJson:  'Pc.OffcialOtherGame.getOfficialNavListJson',


  //获取头部的玩法列表（官）
  getOfficialNavListJson: 'Pc.OffcialOtherGame.getOfficialNavListJson',
  //获取头部的玩法列表（信）
  getCreditNavListJson: 'Pc.CreditOtherGame.getCreditNavListJson',

  addOrders: 'Pc.OffcialOtherGame.addOrders',
  addOrdersCredit: 'Pc.CreditOtherGame.addOrders',

  /**
   * 提交订单 六合彩
   */
  addSixOrders: 'Pc.CreditOtherGame.addSixOrders',

  getNewPeriod: 'Pc.GameIndex.getNewPeriod',

  getCodeRank: 'Pc.GameIndex.getCodeRank',

  /**
   * 问路数据
   * gameId,topSize(默认100),site:index,type:'longhu' || index
   */
  G_wenlu: 'Pc.CreditOtherGame.getGameData',


  /**
   * 历史订单
   */
  // getHistoryOrdersForMobile: 'Pc.GameIndex.getHistoryOrdersForMobile',
  getHistoryOrdersForPc: 'Pc.GameIndex.getHistoryOrdersForPc',

  /**
   *  出码
   */
  chuma: 'Pc.CreditOtherGame.getResult',
  /**
   * 遗漏
   */
  yilou: 'Pc.CreditOtherGame.getForgetOrderData',

  /**
   * 撤单
   * @param
   * gameId: id,
   * ids: item.orderId,
   */
  revokeOrder: 'Pc.GameIndex.revokeOrder',

  /**
   * 侧边栏游戏列表
   * 
   */
  getGameList: 'Pc.HomePage.getGameList',


  /**
   * 更新开奖结果
   * @param
   * gameId
   */
  getGameResultList: 'Pc.GameIndex.getGameResultList',

  /**
   * 信用的开奖结果
   * @param
   * gameId,pageSize,pageIndex,startDate,endDate,period,
   */

  getLotteryResultList: 'Pc.Result.getLotteryResultList',



  //-----------走势图API----------

  /**
   * 初始化，获取彩种信息
   */
  getSimpleCpGameList: 'Pc.HomePage.getSimpleCpGameList',

  /**
   * 初始化最后一期结果
   * @param: 
   * gameId,
   * pageIndex:当前请求的页面
   * pageSize：请求每页的第数
   */
  getLotteryResultList: 'Pc.Result.getLotteryResultList',

  /**
   * 走势图数据
   */
  ResultGetCodeRank: 'Pc.Result.getCodeRank',


  // 规则说明
  /**
   * @param:gameId
   */
  getGameRuleContent: 'Pc.Help.getGameRuleContent',


  //------------以为用户中心API-------

  // 用户登录注册
  "homeLogin": "user/login", // 登录
  "homeLogout": "user/logout", // 注销账号
  "homeGetOauthConfig": "user/get_oauth_config", // 获取OAUTH
  "homeRegister": "user/register", // 注册
  "homeForgetPassword": "user/forget_password", // 忘记密码
  "homeSendSms": "user/send_sms", // 发送短信
  "homeSendEmail": "user/send_email", // 发送邮件

  "homeGetUserInfo": "user/get_user_info",// 获取用户信息
  "homeEditUserInfo": "user/edit_user_info",// 修改用户信息
  "homeCheckPayPassword": "user/check_pay_password",// 验证支付密码
  "homeGetFavList": "user/get_fav_list",// 修改收藏关注列表
  "homeDelFav": "user/del_fav",// 删除收藏关注
  "homeGetMoneyLog": "user/get_money_log",// 获取用户资金变更日志
  "homeAvatar": "user/avatar",// 用户头像上传

  //-------用户中心 新----------
  /**
   * 获取用户USDT地址列表
   */
  getUserAddressList: 'Pc.UsdtAddress.getUserAddressList',

  /**
   * 初始化主网协议
   */
  getUsdtProtocol: 'Pc.UsdtAddress.getUsdtProtocol',

  /**
   * 添加USDT地址
   * @method:POST
   * @param:bankId 网络协议必填,address 地址 必填 remark  备注 必填
   */
  usdtAddressAdd: 'Pc.UsdtAddress.usdtAddressAdd',

  /**
   * 获取实时汇率
   */
  getPayCnyRate: 'Pc.Recharge.getPayCnyRate',

  /**
   * USDT 充值
   * 参数同 src/views/Home/user/recharge/onlineTransfer.vue下的 Pc.Recharge.goToPay 接口
   */
  saveOfflinePayment: 'Pc.Recharge.saveOfflinePayment',
  /**
   * 获取银行卡列表
   * @param:bankDepositIdStr
   */
  getOfflinePayments: "Pc.Recharge.getOfflinePayments",

  /**
   *  提现
   */
  verifyAndGetWithdrawData: 'Pc.Withdraw.verifyAndGetWithdrawData',

  /**
   * 获取首页面公告
   * @param: page ,page_size
   */

  getNoticeList: 'Pc.Notice.getNoticeList',
  /**
   * 获取公告详情
   * @param : id
   */

  getNoticeInfo: 'Pc.Notice.getNoticeInfo'
}