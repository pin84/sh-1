import htmlParser from '@/common/js/html-parser';
export default {
	data() {
		return {
	
			poster: "-1", //海报
			posterMsg: "", //海报错误信息
			posterHeight: 0,



			uid: 0 // 登录用户id
		};
	},
	onLoad(data) {

	},	
	async onShow() {

		//登录后查询
		this.token = uni.getStorageSync('token');


		this.getGoodsPoster();

	},
	methods: {

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

	



			//活动海报信息
			this.sendRequest({
				url: "System.Share.getQrcode",
				data:{
					token: this.token
				},
				success: res => {
					if (res.code == 0) {
		
						this.poster = res.data;
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
