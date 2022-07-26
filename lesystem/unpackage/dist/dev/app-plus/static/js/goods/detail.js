import htmlParser from '@/common/js/html-parser';

export default {
	data() {
		return {
			goodsId: 0,
			skuId: 0,
			groupId: 0,
			bargainId: 0,
			goodsDetail: {},
			shippingFeeName: '免邮',
			fromSource: '',
			showPrice: 0,
			promotionCount: 0, //活动数量
			comboPackage: {
				main_goods: {
					pic_cover_mid: '',
					price: '',
				},
				goods_array: []
			},
			switchMedia: 'img',

			couponCount: 0, //优惠券数量

			ladderPreferentialCount: 0, //阶梯优惠数量

			merchantServiceList: [], //商家服务

			attributeCount: 0, //属性数量

			//评价数量
			badCount: 0,
			centerCount: 0,
			evaluateCount: 0,
			imgsCount: 0,
			praiseCount: 0,
			commentsType: 0, //评价类型：0 全部评价,4 晒图,1 好评,2 中评,3 差评
			commentList: [], //评价列表
			firstCommentInfo: {}, //第一条评价信息
			status: 'loading', //加载更多状态
			pageIndex: 1,
			pageSize: 0,
			pageCount: 0,

			systemInfo: {}, //系统信息

			description: '', //商品详情

			leftOperation: [{
					icon: 'https://img-cdn-qiniu.dcloud.net.cn/uniapp/uni-ui/goodsnav/dianpu.png',
					text: '首页'
				},
				{
					icon: 'https://img-cdn-qiniu.dcloud.net.cn/uniapp/uni-ui/goodsnav/kefu.png',
					text: '客服',
					customerService: true,
					serviceAddr: ""
				},
				{
					icon: 'https://img-cdn-qiniu.dcloud.net.cn/uniapp/uni-ui/goodsnav/carts.png',
					text: '购物车',
					info: 0
				}
			],
			rightOperation: [],

			skuList: [],
			selectedSkuInfo: {
				picCoverSmall: "", //预览图
				stock: 0,
				displayPrice: 0,
			},
			currentGoodsSkuName: [], //当前选中的规格名称集合

			number: 1, //购买数量
			number1: 0,
			minBuy: 0,
			maxBuy: 0,

			pictureId: 0,

			token: "",
			whetherCollection: 0,
			goTop: false,

			payWay: "", //下单方式，购物车、立即购买

			currentTime: 0,
			poster: "-1", //海报
			posterMsg: "", //海报错误信息
			posterHeight: 0,

			btnSwitch: true, //提交按钮防止重复提交
			couponBtnSwitch: true, //获取优惠券防止重复提交
			addressList: [],

			isIphoneX: false, //判断手机是否是iphoneX以上
			maskLayerOpen: false, //防止页面穿透

			uid: 0 // 登录用户id
		};
	},
	onLoad(data) {
		this.goodsId = data.goods_id || 0;
		this.skuId = data.sku_id || 0;
		this.groupId = data.group_id || 0;
		this.bargainId = data.bargain_id || 0;
		this.fromSource = data.from_source || '';

		if (data.source_uid) uni.setStorageSync('source_uid', data.source_uid);

		uni.getSystemInfo({
			success: res => {
				if (res.model.search('iPhone X') != -1) {
					this.isIphoneX = true;
				}
			}
		});

		// 小程序扫海报进入
		if (data.scene) {
			var sceneParams = decodeURIComponent(data.scene);
			sceneParams = sceneParams.split('&');
			if (sceneParams.length) {
				sceneParams.forEach(item => {
					if (item.indexOf('source_uid') != -1) uni.setStorageSync('source_uid', item.split('-')[1]);
					if (item.indexOf('goods_id') != -1) this.goodsId = item.split('-')[1];
					if (item.indexOf('bargain_id') != -1) this.bargainId = item.split('-')[1];
					if (item.indexOf('group_id') != -1) this.groupId = item.split('-')[1];
				})
			}
		}


	},
	async onShow() {
		this.rightOperation = [];

		this.systemInfo = uni.getSystemInfoSync();

		//登录后查询
		this.token = uni.getStorageSync('token');

		//同步获取商品详情
		await this.getGoodsDetail();

		//商家服务
		this.getMerchantService();

		//评论数量
		this.getGoodsEvaluateCount();

		//商品评论
		this.getGoodsComments(0);

		//修改商品信息
		this.modifyGoodsInfo();

		if (this.token != '') {

			this.getWhetherCollection();
			this.getCartCount();
		}

		this.getGoodsPoster();

		this.getCustomService();

		this.getUserId();
	},
	onPageScroll(e) {
		if (e.scrollTop > this.systemInfo.screenWidth) {
			this.goTop = true;
		} else {
			this.goTop = false;
		}
	},
	onHide() {
		this.btnSwitch = true;
		this.couponBtnSwitch = true;
	},
	methods: {
		async getGoodsDetail() {
			let res = await this.sendRequest({
				url: 'System.Goods.goodsDetail',
				async: false,
				data: {
					goods_id: this.goodsId,
					sku_id: this.skuId,
					group_id: this.groupId,
					bargain_id: this.bargainId
				}
			});
			let data = res.data;
			if (data != null && data.goods_detail) {
				this.goodsDetail = data.goods_detail;
				if (this.goodsId == 0) this.goodsId = this.goodsDetail.goods_id;

				this.currentTime = this.goodsDetail.current_time / 1000;

				uni.setNavigationBarTitle({
					title: this.goodsDetail.goods_name
				});

				this.description = htmlParser(this.goodsDetail.description);
				this.promotionCount = Object.keys(this.goodsDetail.promotion_detail).length;
				if (this.goodsDetail.promotion_price < this.goodsDetail.member_price) {
					this.showPrice = this.goodsDetail.promotion_price;
				} else {
					this.showPrice = this.goodsDetail.member_price;
				}
				// 优惠券数量
				this.couponCount = Object.keys(this.goodsDetail.goods_coupon_list).length;

				// 阶梯优惠数量
				this.ladderPreferentialCount = Object.keys(this.goodsDetail.goods_ladder_preferential_list).length;

				// 属性数量
				this.attributeCount = Object.keys(this.goodsDetail.goods_attribute_list).length;

				if (this.goodsDetail['shipping_fee'] > 0) {
					this.shippingFeeName = this.goodsDetail.shipping_fee_name[0].company_name;
				}

				// 组合套餐
				if (this.goodsDetail['promotion_detail']['combo_package'] != null) {

					this.comboPackage = this.goodsDetail['promotion_detail']['combo_package']['data'][0];

					//组合套餐只显示两个商品
					this.comboPackage['goods_array'] = this.comboPackage['goods_array'].slice(0, 2);

				}

				//砍价
				if (this.goodsDetail['promotion_detail']['bargain'] != null) {
					this.bargainTimeMachine = this.$util.countDown(this.goodsDetail['promotion_detail']['bargain']['data'][
						'end_time'
					] - this.currentTime);
				}

				//拼团
				if (this.goodsDetail['promotion_detail']['pintuan'] != null) {
					if (parseFloat(this.goodsDetail['promotion_detail']['pintuan']['data']['tuangou_money']) < parseFloat(this.goodsDetail[
							'price'])) {
						this.isTuangouMoneyLtPrice = true;
					} else {
						this.isTuangouMoneyLtPrice = false;
					}
				}

				//团购
				if (this.goodsDetail['promotion_detail']['group_buy'] != null) {
					this.groupBuyTimeMachine = this.$util.countDown(this.goodsDetail['promotion_detail']['group_buy']['data'][
						'end_time'
					] - this.currentTime);
				}

				// 限时折扣
				if (this.goodsDetail['promotion_detail']['discount_detail'] != null) {
					this.discountTimeMachine = this.$util.countDown(this.goodsDetail['promotion_detail']['discount_detail'][
						'end_time'
					] - this.currentTime);
				}

				this.skuList = this.goodsDetail.sku_list;

				if (this.goodsDetail['stock'] > 0) {
					if (this.goodsDetail['min_buy'] > 0) {
						this.number = this.goodsDetail['min_buy'];
						this.minBuy = this.number;
					} else {
						this.number = 1;
					}
				} else {
					this.number = 0;
				}

				if (this.goodsDetail.max_buy == 0 || this.goodsDetail.max_buy > this.goodsDetail.stock) {
					this.maxBuy = this.goodsDetail.stock;
				} else {
					this.maxBuy = this.goodsDetail.max_buy;
				}

				if (this.goodsDetail['point_exchange_type'] == 1 || (this.goodsDetail['point_exchange_type'] == 2 && this.fromSource ==
						'point') || this.goodsDetail['point_exchange_type'] == 3) {
					this.promotionType = 4;
					this.showPrice = 0;
				}

				//刷新规格数据
				this.refreshSku();

				if (this.goodsDetail['state'] == 1) {

					//预售
					if (this.goodsDetail.is_open_presell == 1) {
						this.showPrice = this.goodsDetail.presell_price;
						this.orderType = 6;
						this.rightOperation.push({
							text: '立即预定',
							classStr: 'ns-bg-color',
							color: '#fff',
							tag: "buy_now"
						});


					} else if (this.bargainId != 0 && this.goodsDetail['promotion_detail']['bargain'] != null) {
						//砍价
						this.showPrice = this.goodsDetail.presell_price;
						this.orderType = 6;
						this.rightOperation.push({
							text: '发起砍价',
							classStr: 'ns-bg-color',
							color: '#fff',
							tag: "bargain"
						});

					} else if (this.goodsDetail['promotion_detail']['pintuan'] != null) {
						//拼团

						if (this.goodsDetail['promotion_detail']['pintuan']['data']['tuangou_group_count'] == 0) {

							this.rightOperation.push({
								text: `¥${(this.goodsDetail.promotion_price < this.goodsDetail.member_price) ? this.goodsDetail.promotion_price : this.goodsDetail.member_price}<br/>单独购买`,
								classStr: 'goods-detail-add-cart',
								color: '#fff',
								tag: "buy_now",
								topPermissions: 1,
								orderType: 1
							});

							this.rightOperation.push({
								text: `¥${this.goodsDetail['promotion_detail']['pintuan']['data']['tuangou_money']}<br/>发起拼单`,
								classStr: 'ns-bg-color',
								color: '#fff',
								tag: "buy_now",
								topPermissions: 0,
								orderType: 4
							});

						} else {

							this.rightOperation.push({
								text: `¥${this.goodsDetail['promotion_detail']['pintuan']['data']['tuangou_money']}<br/>参与拼单`,
								classStr: 'ns-bg-color',
								color: '#fff',
								tag: "buy_now",
								topPermissions: 0,
								orderType: 4
							});
						}
					} else {

						// 只有普通商品可以加入购物车
						if (
							this.goodsDetail.is_virtual == 0 &&
							(this.goodsDetail.point_exchange_type == 0 || (this.goodsDetail.point_exchange_type == 2 && this.fromSource !=
								'point')) && this.promotionCount == 0
						) {
							this.rightOperation.push({
								text: '加入购物车',
								classStr: 'goods-detail-add-cart',
								color: '#fff',
								tag: "add_cart"
							});
						}

						if (
							this.goodsDetail['point_exchange_type'] == 1 ||
							(this.goodsDetail['point_exchange_type'] == 2 && this.fromSource == 'point') ||
							this.goodsDetail['point_exchange_type'] == 3
						) {
							this.rightOperation.push({
								text: '积分兑换',
								classStr: 'ns-bg-color',
								color: '#fff',
								tag: "buy_now"
							});
						} else {
							this.rightOperation.push({
								text: '立即购买',
								classStr: 'ns-bg-color',
								color: '#fff',
								tag: "buy_now"
							});
						}
					}

				} else {
					this.leftOperation = [];
					this.rightOperation.push({
						text: '商品已下架',
						classStr: 'goods-detail-lower',
						color: '#fff'
					});
				}
				if (this.$refs.loadingCover == undefined) return;
				this.$refs.loadingCover.hide();
			} else {
				this.$util.redirectTo('/pages/index/index/index', {}, 'tabbar');
			}
		},


		//-------------------------------------服务-------------------------------------


		//-------------------------------------优惠券-------------------------------------

		// 打开优惠券弹出层
		openCouponPopup() {
			this.maskLayerOpen = true;
			this.$refs.couponPopup.open(() => {
				this.maskLayerOpen = false;
			});
		},
		// 关闭优惠券弹出层
		closeCouponPopup() {
			this.$refs.couponPopup.close();
		},
		// 领取优惠券
		receiveGoodsCoupon(couponTypeId) {
			if (this.couponBtnSwitch === false) {
				return;
			}
			this.couponBtnSwitch = false;
			if (this.token != '') {
				this.sendRequest({
					url: 'System.Goods.receiveGoodsCoupon',
					data: {
						coupon_type_id: couponTypeId
					},
					success: res => {
						var data = res.data;
						this.$refs.couponPopup.close();
						let msg = res.message;
						if (data > 0) {
							msg = '领取成功';
						} else if (data == -2010) {
							msg = '您已领取最大上限！';
						} else if (data == -2011) {
							msg = '来迟了，已经领完了';
						} else if (data == -2019) {
							msg = '您已领取最大上限！';
						}
						this.$util.showToast({
							title: msg,
						});
						this.couponBtnSwitch = true;
					},
				});
			} else {
				this.$refs.login.clickLogin();
			}
		},

		//-------------------------------------优惠券-------------------------------------


		//-------------------------------------阶梯优惠-------------------------------------

		openLadderPreferentialPopup() {
			this.maskLayerOpen = true;
			this.$refs.ladderPreferentialPopup.open(() => {
				this.maskLayerOpen = false;
			});
		},
		closeLadderPreferentialPopup() {
			this.$refs.ladderPreferentialPopup.close();
		},

		//-------------------------------------阶梯优惠-------------------------------------


		//-------------------------------------服务-------------------------------------

		// 获取商家服务
		getMerchantService() {
			this.sendRequest({
				url: 'System.Config.merchantService',
				success: res => {
					this.merchantServiceList = res.data;
				}
			});
		},
		openMerchantsServicePopup() {
			this.maskLayerOpen = true;
			this.$refs.merchantsServicePopup.open(() => {
				this.maskLayerOpen = false;
			});
		},
		closeMerchantsServicePopup() {
			this.$refs.merchantsServicePopup.close();
		},

		//-------------------------------------服务-------------------------------------


		//-------------------------------------属性-------------------------------------

		openAttributePopup() {
			this.maskLayerOpen = true;
			this.$refs.attributePopup.open(() => {
				this.maskLayerOpen = false;
			});
		},
		closeAttributePopup() {
			this.$refs.attributePopup.close();
		},

		//-------------------------------------属性-------------------------------------


		//-------------------------------------评价-------------------------------------

		//获取评价数量
		getGoodsEvaluateCount() {
			let res = this.sendRequest({
				url: 'System.Goods.goodsEvaluateCount',
				data: {
					goods_id: this.goodsId
				},
				success: res => {
					let data = res.data;
					this.badCount = data.bad_count;
					this.centerCount = data.center_count;
					this.evaluateCount = data.evaluate_count;
					this.imgsCount = data.imgs_count;
					this.praiseCount = data.praise_count;
				}
			});
		},

		//商品评论列表
		getGoodsComments(commentsType = 0) {
			this.commentsType = commentsType;

			this.sendRequest({
				url: 'System.Goods.goodsComments',
				data: {
					comments_type: this.commentsType,
					goods_id: this.goodsId,
					page_index: this.pageIndex,
					page_size: this.pageSize
				},
				success: res => {
					let data = res.data;
					if (data != null) {
						let commentList = data.data;
						this.pageCount = data.page_count;
						for (let i = 0; i < commentList.length; i++) {
							let item = commentList[i];
							item.member_name =
								item['is_anonymous'] == 1 ? item.member_name.replace(item.member_name.substring(1, item.member_name.length),
									'***') + '匿名评价' : item.member_name;

							if (item.image != '') {
								commentList[i].image = item.image.split(',');
							}

							if (item.again_image != '') {
								commentList[i].again_image = item.again_image.split(',');
							}

							if (i == 0) {
								this.firstCommentInfo = item;
							};
						}

						// this.commentList = this.commentList.concat(commentList);
						this.commentList = commentList;
						if (this.pageCount == 0 || this.pageCount == 1) {
							this.status = 'nomore';
						} else {
							//判断是否还有下一页，有是more  没有是nomore
							if (this.pageIndex <= this.pageCount) {
								this.pageIndex++;
								this.status = 'more';
							} else {
								this.status = 'nomore';
							}
						}
					}
				}
			});
		},
		openCommentsPopup() {
			this.maskLayerOpen = true;
			this.$refs.commentsPopup.open(() => {
				this.maskLayerOpen = false;
			});
		},
		closeCommentsPopup() {
			this.$refs.commentsPopup.close();
		},
		loadMoreComment(e) {
			// console.log(e);
			// this.old.scrollTop = e.detail.scrollTop
		},

		//-------------------------------------评价-------------------------------------


		//-------------------------------------底部操作-------------------------------------

		//底部左侧操作功能
		leftOperationClick(e) {
			switch (e.index) {
				case 0:
					//首页
					this.$util.redirectTo('/pages/index/index/index', {}, 'tabbar');
					break;
				case 1:
					//客服
					// #ifdef H5
					if (this.leftOperation[1].serviceAddr) {
						location.href = this.leftOperation[1].serviceAddr;
					}
					// #endif
					break;
				case 2:
					//购物车
					this.$util.redirectTo('/pages/goods/cart/cart', {}, 'tabbar');
					break;
			}
		},

		//底部右侧操作功能
		rightOperationClick(e) {
			if(this.goodsDetail['state'] != 1){
				return;
			}
			this.payWay = e.content.tag;
			if (e.content.orderType != null) {
				this.orderType = e.content.orderType;
			}
			if (e.content.topPermissions != null) {
				this.topPermissions = e.content.topPermissions;
				this.refreshSku();
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

		/**
		 * 查询当前用户所购买的商品限购，是否能够继续购买
		 * @param {Object} callBack
		 */
		getGoodsPurchaseRestrictionForCurrentUser(callBack) {
			this.sendRequest({
				url: 'System.Goods.goodsPurchaseRestriction',
				data: {
					"goods_id": this.goodsId,
					"num": this.number
				},
				success: res => {
					if (res.code == 0) {
						if (callBack) callBack(res.data);
					} else {
						this.$util.showToast({
							title: res.message,
						});
					}
				}
			});
		},
		changeNum(tag) {

			if (this.selectedSkuInfo.stock == 0) return;

			if (tag == '+') {
				// 加
				if (this.number < this.maxBuy) {
					this.number++;
				} else {
					return;
				}
			} else if (tag == '-') {
				// 减
				if ((this.number > this.minBuy && this.minBuy > 0) || (this.number > 1 && this.minBuy == 0)) {
					this.number -= 1;
				} else {
					return;
				}
			}

		},
		//输入数量
		keyInput() {
			setTimeout(() => {
				if (this.selectedSkuInfo.stock == 0) {
					this.number = 0;
					return;
				}

				this.number = parseInt(this.number);


				if (this.minBuy > 0 && this.number < this.minBuy) {
					this.number = this.minBuy;
					return;
				}
				if (this.maxBuy > 0 && this.number > this.maxBuy) {
					this.number = this.maxBuy;
				}
			}, 0)
		},
		//选择规格
		selectedSku(info) {

			for (let i = 0; i < this.goodsDetail['spec_list'].length; i++) {
				let item = this.goodsDetail['spec_list'][i];
				if (info.spec_id == item.spec_id) {
					for (let j = 0; j < item.value.length; j++) {
						this.goodsDetail['spec_list'][i].value[j].selected = (info.spec_value_id == item.value[j].spec_value_id) ? true :
							false;
					}
				}
			}
			this.refreshSku();
		},
		//刷新规格数据
		refreshSku() {

			//匹配当前选中的商品规格，找到sku_id
			var sku_length = this.goodsDetail['spec_list'].length; //应选中规格数量

			this.pictureId = this.goodsDetail.picture;
			if (this.skuList.length > 1) {

				for (let i = 0; i < this.skuList.length; i++) {
					let item = this.skuList[i];
					let value = item.attr_value_items;
					let match_sku_count = 0; //匹配规格数量
					this.currentGoodsSkuName = []; //每次匹配时都要清空

					for (let j = 0; j < this.goodsDetail['spec_list'].length; j++) {
						let spec = this.goodsDetail['spec_list'][j];
						for (let k = 0; k < spec.value.length; k++) {

							if (spec.value[k].selected && !spec.value[k].disabled) {
								let index = value.indexOf(spec.value[k].spec_id + ":" + spec.value[k].spec_value_id);
								if (index > -1) {
									match_sku_count++;
									this.currentGoodsSkuName.push(spec.value[k].spec_name + ":" + spec.value[k].spec_value_name);
								}
							}

						}
					}

					if (sku_length == match_sku_count) {

						this.skuId = item.sku_id;
						this.selectedSkuInfo = item;
						break;

					}

				}

			} else {
				this.skuId = this.skuList[0].sku_id;
				this.selectedSkuInfo = this.skuList[0];
			}

			if (this.selectedSkuInfo.picture > 0) {
				this.pictureId = this.selectedSkuInfo.picture;
				this.selectedSkuInfo.picCoverSmall = this.selectedSkuInfo.sku_img_main.pic_cover_small;
			} else {
				this.selectedSkuInfo.picCoverSmall = this.goodsDetail['img_list'][0]['pic_cover_small'];
			}

			this.selectedSkuInfo.displayPrice = this.selectedSkuInfo.promote_price;
			if (this.token != '') {

				if (parseFloat(this.selectedSkuInfo.member_price) < parseFloat(this.selectedSkuInfo.promote_price)) {
					this.selectedSkuInfo.displayPrice = this.selectedSkuInfo.member_price;
				}

			}

			if (this.selectedSkuInfo.stock > 0) {
				this.maxBuy = (this.maxBuy > 0 && this.maxBuy < this.selectedSkuInfo.stock) ? this.maxBuy : this.selectedSkuInfo.stock;
				this.minBuy = this.minBuy > 0 ? this.minBuy : 1;
			} else {
				this.maxBuy = 0;
				this.minBuy = 0;
			}

			// 预售、团购、、积分等活动不需要改变价格
			if ((this.topPermissions == 1) || (this.goodsDetail.point_exchange_type != 2 && this.goodsDetail.point_exchange_type !=
					3 && this.promotionType != 2 && this.orderType != 4 && this.orderType != 6 && this.promotionType != 7)) {

				if (this.promotionType == 3) {
					//砍价活动取原价
					this.selectedSkuInfo.displayPrice = this.selectedSkuInfo.price;
				}

				var pointText = "";
				if (this.goodsDetail.point_exchange_type == 1 && this.goodsDetail.point_exchange > 0) {
					pointText = "+" + this.goodsDetail.point_exchange + "积分";
				}
				this.selectedSkuInfo.displayPrice = "¥" + this.selectedSkuInfo.displayPrice + pointText;
			}

			// 如果是拼团活动
			if (this.orderType == 4 && this.goodsDetail['promotion_detail']['pintuan'] != null) {

				for (let i in this.goodsDetail['promotion_detail']['pintuan']['data']['sku_list']) {
					let curr = this.goodsDetail['promotion_detail']['pintuan']['data']['sku_list'][i];
					if (curr.sku_id == this.skuId) {
						this.selectedSkuInfo.displayPrice = "¥" + curr.tuangou_price;
					}
				}
			}

			this.number = this.minBuy;

		},

		//-------------------------------------底部操作-------------------------------------


		//获取用户是否收藏
		getWhetherCollection() {
			this.sendRequest({
				url: "System.Goods.whetherCollection",
				data: {
					'fav_id': this.goodsId,
					'fav_type': 'goods'
				},
				success: res => {
					this.whetherCollection = res.data;
				}
			});
		},
		editCollection() {

			if (this.token != "") {

				//未收藏添加收藏
				if (this.whetherCollection == 0) {
					this.sendRequest({
						url: "System.Member.addCollection",
						data: {
							"fav_id": this.goodsId,
							"fav_type": "goods",
							"log_msg": this.goodsDetail.goods_name
						},
						success: res => {
							var data = res.data;
							if (data > 0) {
								this.whetherCollection = 1;
								this.$util.showToast({
									title: "收藏成功",
								});
							}
						}
					});
				} else {
					//已收藏取消收藏
					this.sendRequest({
						url: "System.Member.cancelCollection",
						data: {
							"fav_id": this.goodsId,
							"fav_type": "goods"
						},
						success: res => {
							var data = res.data;
							if (data > 0) {
								this.whetherCollection = 0;
								this.$util.showToast({
									title: "取消收藏成功",
								});
							}
						}
					});
				}
			} else {
				this.$refs.login.clickLogin();
			}
		},
		//获取购物车数量
		getCartCount() {
			this.sendRequest({
				url: "System.Goods.cartCount",
				data: {},
				success: res => {
					if(this.leftOperation.length>1){
						this.leftOperation[2].info = res.data;
					}
				}
			});
		},
		//返回顶部
		goTopClick() {
			uni.pageScrollTo({
				duration: 200,
				scrollTop: 0
			});
		},
		//更新商品信息
		modifyGoodsInfo() {
			//更新商品点击量
			this.sendRequest({
				url: "System.Goods.modifyGoodsClicks",
				data: {
					goods_id: this.goodsId
				},
				success: res => {}
			});
			//添加足迹
			this.sendRequest({
				url: "System.Goods.addGoodsBrowse",
				data: {
					goods_id: this.goodsId
				},
				success: res => {}
			});
		},

		//-------------------------------------海报-------------------------------------

		// 打开海报弹出层
		openPosterPopup() {
			this.$refs.sharePopup.close();
			this.maskLayerOpen = true;
			this.$refs.posterPopup.open(() => {
				this.maskLayerOpen = false;
			});
			if (this.poster != '-1') {
				setTimeout(() => {
					let view = uni.createSelectorQuery().in(this).select(".poster-layer .image-wrap");
					view.fields({
						size: true,
					}, data => {
						let posterWhith = data.width;
						let ratio = parseFloat((740 / posterWhith).toFixed(2));
						if (this.token != '') {
							this.posterHeight = parseInt(1240 / ratio);
						} else {
							this.posterHeight = parseInt(1100 / ratio);
						}
					}).exec();
				}, 100);
			}
		},
		// 关闭海报弹出层
		closePosterPopup() {
			this.$refs.posterPopup.close();
		},
		//生成海报
		getGoodsPoster() {

			var promotionPosterInfo = {
				promotion_flag: ""
			};

			if (this.goodsDetail['promotion_detail'] != null) {

				//砍价
				if (this.bargainId > 0 && this.goodsDetail['promotion_detail']['bargain'] != null) {
					promotionPosterInfo = {
						promotion_flag: "bargain",
						bargain_id: this.bargainId
					};
				}

				//拼团
				else if (this.goodsDetail['promotion_detail']['pintuan'] != null) {
					promotionPosterInfo = {
						promotion_flag: "pintuan",
						group_id: this.groupId
					};
				}

				//团购
				else if (this.goodsDetail['promotion_detail']['group_buy'] != null) {
					promotionPosterInfo = {
						promotion_flag: "group_buy"
					};
				}
			}

			//活动海报信息
			this.sendRequest({
				url: "System.Goods.getGoodsPoster",
				data: {
					goods_id: this.goodsId,
					promotion_info: JSON.stringify(promotionPosterInfo)
				},
				success: res => {
					if (res.code == 0) {
						let data = res.data;
						this.poster = data.path;
					} else {
						this.posterMsg = res.message;
					}

				}
			});
		},
		// 预览图片
		preview(index) {
			var paths = [];
			for (let i = 0; i < this.goodsDetail.img_list.length; i++) {
				paths.push(this.$util.img(this.goodsDetail.img_list[i].pic_cover_big));
			}
			uni.previewImage({
				current: index,
				urls: paths,
				// longPressActions: {
				// 	itemList: ['发送给朋友', '保存图片', '收藏'],
				// 	success: function(data) {
				// 		console.log('选中了第' + (data.tapIndex + 1) + '个按钮,第' + (data.index + 1) + '张图片');
				// 	},
				// 	fail: function(err) {
				// 		console.log(err.errMsg);
				// 	}
				// }
			});
		},
		//-------------------------------------分享-------------------------------------
		// 打开海报弹出层
		openSharePopup() {
			this.maskLayerOpen = true;
			this.$refs.sharePopup.open(() => {
				this.maskLayerOpen = false;
			});
		},
		// 关闭海报弹出层
		closeSharePopup() {
			this.$refs.sharePopup.close();
		},
		//获取客服链接
		getCustomService() {
			this.sendRequest({
				url: "System.Config.customService",
				success: res => {
					let data = res.data;
					if (data.value != null && data.value.service_addr != null&&this.leftOperation.length>0) {
						this.leftOperation[1].serviceAddr = data.value.service_addr;
					}
				}
			});
		},
		// #ifdef MP
		//小程序中保存海报
		saveGoodsPoster() {

			let url = this.$util.img(this.poster);
			// this.$util.showToast({
			// 	title: "saveGoodsPoster:"+ url
			// });
			uni.downloadFile({
				url: url,
				success: (res) => {
					if (res.statusCode === 200) {
						uni.saveImageToPhotosAlbum({
							filePath: res.tempFilePath,
							success: () => {
								this.$util.showToast({
									title: "保存成功"
								});
							},
							fail: () => {
								this.$util.showToast({
									title: "保存失败，请稍后重试"
								});
							}
						});
					}
				},

				fail: (e) => {
					// this.$util.showToast({
					// 	title: "fail:" + JSON.stringify(e)
					// });
				}
			});
		},
		// #endif
		/**
		 * 获取当前用户id
		 */
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
