import htmlParser from '@/common/js/html-parser';

export default {
	data() {
		return {
			goodsId: 0,

		};
	},

	},
	methods: {
		//底部右侧操作功能
		choseTimezoneClick(e) {
			if(this.goodsDetail['state'] != 1){
				return;
			}

			this.maskLayerOpen = true;
			this.$refs.skuPopup.open(() => {
				this.maskLayerOpen = false;
			});
		},
		closeSkuPopup() {
			this.$refs.skuPopup.close();
		},

		//提交
		confirm() {
			if (this.token != '') {

				//纠正数量
				this.keyInput();
				if (this.selectedSkuInfo.stock == 0) {
					this.$util.showToast({
						title: '商品已售罄',
					});
					return;
				}
				if (this.btnSwitch == false) {
					return;
				}
				this.btnSwitch = false;
				if (this.payWay == "add_cart") {

					var cart_detail = {
						goods_id: this.goodsId,
						count: this.number,
						goods_name: this.goodsDetail.goods_name,
						sku_id: this.skuId,
						sku_name: this.selectedSkuInfo.sku_name,
						price: this.selectedSkuInfo.price,
						picture_id: this.pictureId,
						shop_name: ''
					};

					this.sendRequest({
						url: "System.Goods.addCart",
						data: {
							"cart_detail": JSON.stringify(cart_detail)
						},
						success: res => {
							var data = res.data;
							this.$refs.skuPopup.close();
							if (data.code > 0) {
								this.$util.showToast({
									title: '加入购物车成功',
								});
								this.getCartCount();
							} else if (data.code == -1) {
								this.$util.showToast({
									title: '只有会员登录之后才能购买，请进入会员中心注册或登录。',
								});
							} else if (data.code == 0) {
								this.$util.showToast({
									title: data.message,
								});
							}
							this.btnSwitch = true;
						}


					});
				} else if (this.payWay == "buy_now") {

					//检测商品限购，是否允许购买
					this.getGoodsPurchaseRestrictionForCurrentUser(purchase => {

						if (purchase.code > 0) {

							var data = JSON.stringify({
								order_type: this.orderType, // 1 普通订单	4 拼团订单	6 预售订单	7 砍价订单
								goods_sku_list: this.skuId + ":" + this.number,
								promotion_type: this.promotionType, //1 组合套餐	2 团购	3 砍价	4 积分兑换
								promotion_info: {
									tuangou_group_id: this.groupId
								}
							});

							uni.setStorage({
								key: 'orderCreateData',
								data: data,
								success: () => {
									this.$util.redirectTo('/pages/order/payment/payment');
								}
							});

						} else {
							this.$util.showToast({
								title: purchase.message,
							});
						}

					});
				} else if (this.payWay == "bargain") {

					this.$refs.skuPopup.close();
					this.$refs.bargainPopup.open();

				}

			} else {
				this.$refs.login.clickLogin();

			}
		},

		getUserId() {
			if (uni.getStorageSync('token')) {
				this.sendRequest({
					url: 'System.Member.getUserId',
					success: res => {
						if (res.data) this.uid = res.data;
					}
				})
			}
		}
	}
};
