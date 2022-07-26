export default {
    /**
     * 开奖结果
     * @param
     * gameId,pageSize,pageIndex,startDate,endDate,period,
     */
    getLotteryResultList: 'System.Result.getLotteryResultList',

    /**
     * 开奖结果 冷热遗漏 头部列表
     * @param
     * gameId,periodId
     */
    ResultGetCodeRank: "System.Result.getCodeRank",

    /**
     * 开奖结果，获取游戏列表
     */
    getSimpleCpGameList: "System.HomePage.getSimpleCpGameList",



    //获取游戏结果列表
    getGameResultList: 'System.GameIndex.getGameResultList',

    // getNavListJson:'System.OffcialOtherGame.getNavListJson',

    /**
     * 首页面游戏数据
     * @param {id}  
     */
    // getIndexData:'System.OffcialOtherGame.getIndexData',
    getIndexData: 'System.GameIndex.getIndexData',




    //获取头部的玩法列表（官）
    getOfficialNavListJson: 'System.OffcialOtherGame.getOfficialNavListJson',
    //获取头部的玩法列表（信）
    getCreditNavListJson: 'System.CreditOtherGame.getCreditNavListJson',
    //官方玩法下单
    addOrders: 'System.OffcialOtherGame.addOrders',
    //信用玩法下单
    sscAddOrders: 'System.CreditOtherGame.addOrders',
    //信用玩法下单，六合彩
    addSixOrders: 'System.CreditOtherGame.addSixOrders',

    getHistoryOrdersForMobile: 'System.GameIndex.getHistoryOrdersForMobile',

    //获取订单详情  
    // getOrderDetail:'System.OffcialOtherGame.getOrderDetail',
    getOrderDetail: 'System.GameIndex.getOrderDetail',
    //撤单
    // revokeOrder:'System.OffcialOtherGame.revokeOrder'
    revokeOrder: 'System.GameIndex.revokeOrder',

    //冷热数据
    getCodeRank: 'System.GameIndex.getCodeRank',
    //问路  问路玩法数据
    G_wenlu: 'System.CreditOtherGame.getGameData',
    //时时彩出码排行
    chuma: 'System.CreditOtherGame.getResult',
    //时时彩遗漏排行
    yilou: 'System.CreditOtherGame.getForgetOrderData',


    /**
     * 获取 游戏列表
     * 
     */
    getCpGameList: 'System.HomePage.getCpGameList',


    /**
     * 游戏入口数据 
     */
    //循环请求，获取实时的游戏数据 
    getNewPeriod: 'System.GameIndex.getNewPeriod',

    /**
     * @method:POST
     * @param {gameids}  
     */
    addUserGames: 'System.GameIndex.addUserGames',

    // 规则说明
    /**
     * @param:gameId
     */
    getGameRuleContent: 'System.Help.getGameRuleContent',


    /**
     * 会员信息
     */
    memberInfo: 'System.Member.memberInfo',

    /**
     * 获取USDT地址列表
     * count表示目前地址数
     */
    getUserAddressList: 'System.UsdtAddress.getUserAddressList',
    /**
     * 初始化主网协议
     */
    getUsdtProtocol: 'System.UsdtAddress.getUsdtProtocol',

    /**
     * 添加USDT地址
     * @method:POST,
     * @param:bankId 网络协议必填,address 地址 必填 remark  备注 必填
     */
    usdtAddressAdd: 'System.UsdtAddress.usdtAddressAdd',

    /**
     * 获取实时汇率
     */
    getPayCnyRate: 'System.Recharge.getPayCnyRate',

    /**
     * USDT 充值提交订单
     */
    saveOfflinePayment: 'System.Recharge.saveOfflinePayment',


	/**
	 * 查看提款进度
	 */
	 getWithdrawList:'System.Withdraw.getWithdrawList'

}