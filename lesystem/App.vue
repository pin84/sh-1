<script>
	import http from 'common/js/http.js';
	import Config from 'common/js/config.js'
	export default {
		mixins: [http],
		onLaunch: function() {
			this.isWeixinCheck();
			Promise.race([this.checkSysConfig(Config.baseUrl), this.checkSysConfig(Config.baseUrl2), this.checkSysConfig(Config
				.baseUrl3)]).then(
				(res) => {
					//1.更新cdndomain
					this.setFastestCdndomain(res);
					//2.更新app
					//#ifdef APP-PLUS
					this.updateApp(res);
					//#endif
				});
			this.checkIpRestrict();
			// // #ifdef H5
			// uni.getSystemInfo({
			// 	success(e) {
			// 		/* 窗口宽度大于420px且不在PC页面且不在移动设备时跳转至 PC.html 页面 */
			// 		if (e.windowWidth > 920 && !window.top.isPC && !/iOS|Android/i.test(e.system)) {
			// 			window.location.pathname = '/static/';
			// 		}
			// 	}
			// })
			// // #endif

			// // 锁定屏幕方向
			//#ifdef APP-PLUS
		    plus.screen.lockOrientation('portrait-primary'); //锁定
			//plus.screen.lockOrientation('landscape-primary');
			//#endif

			this.checkUnreadMessage();
			this.unreadMessageTimer = setInterval(this.checkUnreadMessage, 20000);
			this.checkIndexParameter();
			this.indexParameterTimer = setInterval(this.checkIndexParameter, 5000);
		},
		onShow: function() {
			//#ifdef APP-PLUS
			let _this = this;
			uni.onNetworkStatusChange(function (res) {
				if(res.isConnected==true){
					Promise.race([_this.checkSysConfig(Config.baseUrl), _this.checkSysConfig(Config.baseUrl2), _this.checkSysConfig(Config
						.baseUrl3)]).then(
						(urlres) => {
							//1.更新cdndomain
							//console.log(urlres);
							_this.setFastestCdndomain(urlres);
						});
				}
						    
			});
			//#endif
			
			setTimeout(()=>{
				this.$store.commit('updateCountdown',new Date().getTime())
			},2000);
			
		},
		onHide: function() {
			// 当 uni-app 从前台进入后台
		},
		data() {
			return {
				fastestSpeed: 0,
				unreadMessageTimer: null,
				indexParameterTimer: null,

			};
		},
		globalData: {
			getNextOpentimeTimer: 1,
			getLastPanicBuyingOrdersTimer: 2
		},
		methods: {
			isWeixinCheck() {
				// #ifdef H5
				if (this.$util.isWeiXin()) {
					let currentURL = window.location.href;
					if (currentURL != undefined && currentURL != '' && currentURL.indexOf("wechatpage/wechatpage") == -1) {
						uni.redirectTo({
							url: "/pages/index/wechatpage/wechatpage?page=" + escape(currentURL)
						});
					}
				}
				// #endif
			},
			canotCloseWindow() {
				uni.showModal({
					title: '升级后才能使用',
					content: '此版本过旧已停止使用。请升级后再打开app,如果不能升级,请删除原app或者联系客服',
					showCancel: false,
					success: showResult => {
						this.canotCloseWindow();
					}
				});
			},
			checkIpRestrict() {
				this.sendRequest({
					url: 'System.IpRestrict.verifyIP',
					success: res => {
						if (res.code == 0) {
							let isRestrictIp = res.data.isRestrictIp;
							if (isRestrictIp == true) {
								//if (isRestrictIp==false) {
								uni.redirectTo({
									url: '/pages/index/iprestrict/iprestrict?ip=' + res.data.ip
								})
							}
						}
					}
				});
			},
			checkIndexParameter() {
				//console.log(uni.getStorageSync('cdndomain')+"-"+uni.getStorageSync('fastestSpeed'));
				let isInBuyingPage = uni.getStorageSync('isInBuyingPage');
				let req = {};
				if (isInBuyingPage != undefined && isInBuyingPage == 1) {
					req = {
						cata_id: uni.getStorageSync('shop_game_second'),
					};
				}
				this.sendRequest({
					url: 'System.Params.getIndexParams',
					data: req,
					success: res => {
						let data = res.data;
						let isMaintain = data.IsMaintain;
						let isLogout = data.isLogout;
						let message = data.msg != undefined ? data.msg : '';
						let isCategoryStop = data.isCategoryStop;
						let token = uni.getStorageSync('token');
						let isInBuyingPageNow = uni.getStorageSync('isInBuyingPage'); //再读一次
						let kefu_address = uni.getStorageSync('kefu'); //去seesion中的值
						let new_kefu_address = data.kefu_address;
						if (kefu_address == null || kefu_address == undefined || kefu_address == '' || new_kefu_address !=
							kefu_address) {
							if (new_kefu_address != null && new_kefu_address != undefined && new_kefu_address != '') {
								uni.setStorage({
									key: 'kefu',
									data: new_kefu_address,
									fail: function() {
										console.log("kefu address is wrong.");
									}
								});
							}
						}
						if (isMaintain == 1) { //
							let maintainTime = data.MaintainTime;

							if (maintainTime != undefined && maintainTime != '') {
								uni.setStorageSync("maintainTime", maintainTime);
							}
							let pages = getCurrentPages();
							let page = pages[pages.length - 1];
							if (page.route != undefined && page.route != 'pages/maintain/maintain') {
								uni.redirectTo({
									url: '/pages/maintain/maintain'
								});
							}
						} else if (token != undefined && token != '' && isLogout > 0) {
							this.handleLogoutAction(isLogout, message);

						} else if (isInBuyingPageNow != undefined && isInBuyingPageNow == 1 && isCategoryStop == 1) {
							uni.showModal({
								title: '提示',
								showCancel: false,
								content: '此购买类型暂时下架，请返回首页重新选择其他类型',
								success: function(res) {
									if (res.confirm) {
										uni.switchTab({
											url: '/pages/default/default'
										});
									}
								}
							});
						}
					}
				});
			},
			handleLogoutAction(isLogout, message) {
				if (isLogout == 1) { //超时。app不处理超时
					uni.removeStorageSync('token');
					uni.showModal({
						title: '超时退出提醒',
						content: '你已经超时退出系统，请重新登陆',
						showCancel: false,
						success: showResult => {
							if (showResult.confirm) {
								uni.redirectTo({
									url: '/pages/login/login/login'
								});
							} else {
								uni.redirectTo({
									url: '/pages/login/login/login'
								});
							}
						}
					});
				} else if (isLogout == 2) { //被管理踢下线
					uni.removeStorageSync('token');
					uni.showModal({
						title: '你已经下线',
						content: '你已经下线，请重新登陆',
						showCancel: false,
						success: showResult => {
							if (showResult.confirm) {
								uni.redirectTo({
									url: '/pages/login/login/login'
								});
							} else {
								uni.redirectTo({
									url: '/pages/login/login/login'
								});
							}
						}
					});
				} else if (isLogout == 3) { //被锁定
					uni.removeStorageSync('token');
					uni.showModal({
						title: '账户已经锁定',
						content: '账户已经锁定，请联系客服',
						showCancel: false,
						success: showResult => {
							if (showResult.confirm) {
								uni.redirectTo({
									url: '/pages/login/login/login'
								});
							} else {
								uni.redirectTo({
									url: '/pages/login/login/login'
								});
							}
						}
					});
				} else if (isLogout == 4) { //其他地方登陆了
					uni.removeStorageSync('token');
					uni.showModal({
						title: '你已经在其他设备登陆了',
						content: '请确定是否你本人操作，请重新登陆',
						showCancel: false,
						success: showResult => {
							if (showResult.confirm) {
								uni.redirectTo({
									url: '/pages/login/login/login'
								});
							} else {
								uni.redirectTo({
									url: '/pages/login/login/login'
								});
							}
						}
					});
				} else if (isLogout == 111) { //强制修改密码

					let pages = getCurrentPages();
					let page = pages[pages.length - 1];
					let currentpage = page.route ==undefined?"":page.route;
					//console.log(currentpage);
					currentpage =  currentpage.replace(/\//g, '_'); 
					 if (currentpage != "pages_member_editPassword_edit_edit" && currentpage !="pages_login_login_login")
					 {
						uni.removeStorageSync('token');
						if (message != undefined && message != '') {
							uni.showModal({
								title: "重要提示",
								content: message,
								showCancel: false,
								success: showResult => {
									if (showResult.confirm) {
										uni.redirectTo({
											url: '/pages/login/login/login'
										});
									} else {
										uni.redirectTo({
											url: '/pages/login/login/login'
										});
									}
								}
							});
						}
					}

				} 
				else if (isLogout == 110) { //自定义消息
					uni.removeStorageSync('token');
					if (message != undefined && message != '') {
						uni.showModal({
							title: message,
							content: message,
							showCancel: false,
							success: showResult => {
								if (showResult.confirm) {
									uni.redirectTo({
										url: '/pages/login/login/login'
									});
								} else {
									uni.redirectTo({
										url: '/pages/login/login/login'
									});
								}
							}
						});
					}

				}
			},
			checkUnreadMessage() {
				if (uni.getStorageSync('token')) {
					this.sendRequest({
						url: 'System.Message.queryMessages',
						success: res => {
							if (res.code == 0) {
								let important_msg_count = res.data.important_count; //重要未读消息
								let normal_msg_count = res.data.unreaded_count;
								this.$util.setupTabBarBadge(important_msg_count, normal_msg_count);
								let isTips = res.data.isTips;
								if (isTips != null && isTips != '' && isTips.title != undefined) {

									let messageType = isTips.flag;
									if (messageType == undefined || messageType == 0) {
										uni.showModal({
											title: isTips.title,
											content: isTips.content,
											showCancel: false,
											success: showResult => {
												//this.canotCloseWindow();
											}
										});
									} //系统消息
									else if (messageType == 1) {
										uni.showModal({
											title: '最新公告',
											content: isTips.title,
											showCancel: true,
											confirmText: '公告详情',
											success: function(res) {
												if (res.confirm) {
													uni.navigateTo({
														url: '/pages/article/gonggao/detail?id=' + isTips.mid
													})
												}
											}
										});
									} //网站公告
								}


							} else if (res.code == -11100) { //ip黑名单

								try {
									uni.removeStorageSync('token');
								} catch (e) {
									// error
								}
								//然后跳转到登陆页
								uni.showModal({
									title: '错误提示',
									content: res.title,
									showCancel: false
								});
								//this.showModal({ title: data.title });
							}


						}
					});
				}

			},
			updateApp(res) { //更新App. app 专用
			//console.log(res);
				if (res.data.status == 1) {
					let openUrl = plus.os.name === 'iOS' ? res.data.ios : res.data.android;
					//2.更新app

					if (res.data.mininum_version != undefined && res.data.mininum_version > Config.myversion) {
						//强制升级
						uni.showModal({
							title: '更新提示',
							content: res.data.note ? res.data.note : '请更新',
							showCancel: false,
							success: showResult => {

								if (showResult.confirm) {
									plus.runtime.openURL(openUrl);
								}
								this.canotCloseWindow();
							}
						});
					} else { //可选择的升级
						uni.showModal({
							//提醒用户更新
							title: '更新提示',
							content: res.data.note ? res.data.note : '是否选择更新',
							success: showResult => {
								if (showResult.confirm) {
									plus.runtime.openURL(openUrl);
								}
							}
						});
					}
				}

			},
			setFastestCdndomain(res) {
				//uni.removeStorageSync('cdndomain');
				uni.removeStorageSync('fastestSpeed');
				//var cdndomain = "api.bbscapi.com,";
				var cdndomain = res.data.cdndomain;
				//console.log("rescdndomain:"+cdndomain);
				if (cdndomain != undefined && cdndomain != '') {
					var urls = cdndomain.split(',');
					for (var i = 0; i < urls.length; i++) {
						//console.log(urls[i]);
						if (urls[i].length > 5) {
							this.checkApiSpeed(urls[i]);
						}
					}
				}else{
					uni.setStorageSync('cdndomain',Config.baseUrl);
				}
			},

			async checkApiSpeed(url) {
				var startTime = new Date().getTime();
				var cdndomain = "https://" + url;
				let res = await this.sendRequest({
					url: 'System.Speed.testSpeed',
					async: false,
					domainType: 1, //用自己配置的域名
					domain: cdndomain
				});
				//let _self = this;
				if (res.code == 0) {
					var endTime = new Date().getTime();
					var fastestSpeed = uni.getStorageSync('fastestSpeed');
					var speed = endTime - startTime;
					//console.log(cdndomain+"----|||||---current speed:"+Number(speed));
					if (fastestSpeed == undefined || fastestSpeed == ''||fastestSpeed == null || speed <= Number(fastestSpeed)) {
						//console.log(speed);
						//console.log(cdndomain);
						uni.setStorageSync('fastestSpeed',speed);
						uni.setStorageSync('cdndomain',cdndomain);
					}
				}
			},

			checkSysConfig(url) {
				//var startTime = new Date().getTime();
				//var cdndomain = url;
				let systemInfo = uni.getSystemInfoSync();
				let api = 'System.Version.update'; //检查更新地址
				let req = {
					//升级检测数据
					//#ifdef APP-PLUS
					platform: systemInfo.platform,
					brand: systemInfo.brand,
					model: systemInfo.model,
					//#endif
					appid: Config.myappid,
					version: Config.myversion
				};
				return new Promise((resolved, rejected) => {
					if (url != '' && url != undefined) {
						this.sendRequest({
							url: api,
							data: req,
							domainType: 1, //用自己配置的域名
							domain: url,
							success: res => {
								if (res.code == 0) {
									resolved(res);

								}
							}
						});
					} //end url!='' 


				});
			},

			/**
			 * 检测是否登录
			 * @param {function} callback 未登录时回调函数
			 */
			checkLogin(callback) {
				const token = uni.getStorageSync('token');
				if (!token) {
					typeof callback == 'function' && callback();
				}
			},
			// #ifdef MP

			/**
			 * 获取openid
			 */
			getOpenid(callback) {
				// 获取服务商
				var provider = [];
				uni.getProvider({
					service: 'oauth',
					success: res => {
						provider = res.provider;
					}
				});
				if (provider[0] != undefined) {
					uni.login({
						provider: provider[0],
						timeout: 3000,
						scopes: 'auth_user',
						success: res => {
							if (res.errMsg == 'login:ok') {
								switch (provider[0]) {
									// 微信小程序
									case 'weixin':
										this.sendRequest({
											url: 'System.Login.getWechatBasicInfo',
											data: {
												code: res.code
											},
											success: res => {
												if (res.data != undefined) {
													var data = JSON.parse(res.data);
													if (data.errcode == undefined) {
														Object.assign(data, {
															provider: 'weixin'
														});
														if (callback) callback(data);
													} else {
														this.$util.showToast({
															title: data.errmsg
														});
													}
												}
											}
										});
										break;
								}
							} else {
								this.$util.showToast({
									title: res.errMsg
								});
							}
						}
					});
				}
			},

			/**
			 * 自动登录
			 */
			checkOpenidIsExits(data) {
				this.sendRequest({
					url: 'System.UniApp.checkOpenidIsExits',
					data: data,
					success: res => {
						if (res.data.is_bound) {
							uni.setStorage({
								key: 'token',
								data: res.data.token,
								success: () => {
									// #ifdef H5
									let url = window.location.href,
										domain = url.split('?')[0],
										hash = url.split('#')[1];
									location.href = domain + '#' + hash;
									// #endif

									var page = getCurrentPages().pop();
									if (page == undefined || page == null) return;
									page.onShow();
								}
							});
						}
					}
				});
			},

			init() {
				var data = uni.getStorageSync('bind_data');
				if (data) {
					this.checkOpenidIsExits(data);
				} else {
					this.getOpenid(params => {
						let data = {};
						if (params.provider) data.provider = params.provider;
						if (params.openid) data.openid = params.openid;
						if (params.unionid) data.unionid = params.unionid;
						Object.assign(data, params);
						this.checkOpenidIsExits(data);
					});
				}
			},

			/**
			 * 是否开启自动登录
			 */
			openAutoLogin() {
				this.sendRequest({
					url: 'System.Login.getRegisterAndVisitInfo',
					success: res => {
						if (res.data.is_login == 1) {
							this.init();
						}
					}
				});
			}

			// #endif
		}
	};
</script>

<style lang="scss">
/* #ifndef APP-PLUS-NVUE */	
@import url('./common/css/colorui.css');
@import url('./common/css/main.css');
@import url('./common/css/iconfont.css');
/* #endif*/
</style>
