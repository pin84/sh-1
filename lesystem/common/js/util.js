import Config from './config.js'
import store from '@/store/index.js'

export default {
	// moneyNumHandler(num) {
	// 	if (!num) {
	// 		num = '0'
	// 	}
	// 	let str = num.replace(/[^\d.]/g, '')
	// 	setTimeout(() => {
	// 		return Number(str)
	// 	}, 10)
	// },

	inputDataHandler(str) {
		let arr = ['+', '-', '*', '/']
		for (let s of arr) {
			if (str.includes(s)) {
				return 0
			}
		}
		if (str == '') {
			return 0
		}
		str = str.replace(/^(0+)|[^\d]+/g, "");


		return str
	},
	//小数位的处理，decimal 为1 表示保留一个小数
	handlerNum(num, decimal = 1) {
		let { rate } = store.state.GDV3.officialRate
		// let  decimal = rate === 0.001 ? 3 : 2
		let obj = {
			1: 10,
			2: 100,
			3: 1000
		}
		let n = Math.round(num * obj[decimal]) / obj[decimal]
		return n
	},
	handlerMoneyDecimal(num) {
		let { rate } = store.state.GDV3.officialRate
		let decimal = rate === 0.001 ? 3 : 2
		let obj = {
			1: 10,
			2: 100,
			3: 1000
		}
		let n = Math.round(num * obj[decimal]) / obj[decimal]
		return n
	},
	//确认窗口
	showConfirm({
		title = '',
		content = '这是一个模态弹窗',
		confirmText = '确定',
		cancelText = '取消',
		showCancel = true
	} = {}) {
		return new Promise((resolve, reject) => {
			uni.showModal({
				confirmText,
				cancelText,
				showCancel,
				title,
				content,
				success: function (res) {
					if (res.confirm) {
						resolve(true)
					} else if (res.cancel) {
						resolve(false)
					}
				}
			});
		})


	},

	//生成随机数
	createRandomNum(minInt, maxInt) {
		// 生成 [n,m)，包含n但不包含m的正整数： parseInt(Math.random()*(m-n)+n)
		// 生成 (n,m]，不包含n但包含m的正整数： parseInt(Math.random()*(m-n)+n)+1
		// 生成 [n,m]，包含n和m的随机数： parseInt(Math.random()*(m-n+1)+n)
		// 生成 (n,m)，不包含n和m的正整数：parseInt(Math.random()*(m-n-1)+n+1)
		return parseInt(Math.random() * (maxInt - minInt + 1) + minInt);
	},

	//只能是字母和数字。限制长度
	limitLetterNumber(data, minLength, maxLength, error) {
		let length = data.length
		if (length < minLength || length > maxLength) {
			this.showToast({
				title: error
			});
			return false
		}
		let reg = /[~!@#$%^&*()/\|,.<>?"'();:_+=\[\]{}-]|[\u4e00-\u9fa5]/
		if (reg.test(data)) {
			this.showToast({
				title: error
			});
			return false
		}
		return true
	},

	//验证手机号码
	checkPhone(phone) {
		if (!phone) {
			this.showToast({
				title: '请输入手机号码'
			});
			return false
		}

		if (!(/^1[3456789]\d{9}$/.test(phone))) {
			this.showToast({
				title: '手机号码格式不正确'
			});
			return false
		}
		return true
	},

	// QQ验证
	checkQq(qq) {
		if (!qq) {
			this.showToast({
				title: '请输入qq号码'
			});
			return false
		}

		if (!/^[1-9][0-9]{4,11}$/.test(qq)) {
			this.showToast({
				title: 'qq格式不正确'
			});
			return false
		}
		return true
	},
	// 邮箱验证
	checkEmail(email) {
		if (!email) {
			this.showToast({
				title: '请输入邮箱号码'
			});
			return false
		}

		if (!/^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/.test(email)) {
			this.showToast({
				title: '邮箱格式不正确'
			});
			return false
		}
		return true
	},


	/**
	 * 页面跳转
	 * @param {string} to 跳转链接 /pages/idnex/index
	 * @param {Object} param 参数 {key : value, ...}
	 * @param {string} mode 模式 
	 */
	redirectTo(to, param, urlType, mode) {
		let url = to;
		if (param != undefined) {
			Object.keys(param).forEach(function (key) {
				if (url.indexOf('?') != -1) {
					url += "&" + key + "=" + param[key];
				} else {
					url += "?" + key + "=" + param[key];
				}
			});
		}
		if (urlType == 'tabbar') {
			uni.switchTab({
				url: url
			})
		} else {
			switch (mode) {
				case 'redirectTo':
					// 关闭当前页面，跳转到应用内的某个页面。
					uni.redirectTo({
						url: url
					});
					break;
				case 'reLaunch':
					// 关闭所有页面，打开到应用内的某个页面。
					uni.reLaunch({
						url: url
					});
					break;
				default:
					// 保留当前页面，跳转到应用内的某个页面
					uni.navigateTo({
						url: url
					});
			}
		}
	},
	checkLogin() {
		let token = uni.getStorageSync('token');
		if (!token) {
			uni.redirectTo({
				url: "/pages/login/login/login"
			})
		}

		return
	},
	/**
	 * 图片路径转换
	 * @param {Object} img_path
	 */
	img(img_path) {
		var path = "";
		if (img_path != undefined && img_path != "") {
			if (img_path.indexOf("http://") == -1 && img_path.indexOf("https://") == -1) {
				path = Config.baseUrl + "/" + img_path;
			} else {
				path = img_path;
			}
		}
		return path;
	},
	// bbsc_2020 项目的 baseUrl
	image(img_path) {
		var path = "";
		if (img_path != undefined && img_path != "") {
			if (img_path.indexOf("http://") == -1 && img_path.indexOf("https://") == -1) {
				path = Config.order_baseUrl + "/" + img_path;
			} else {
				path = img_path;
			}
		}
		return path;
	},
	orderImg(img_path) {
		var path = "";
		if (img_path != undefined && img_path != "") {
			if (img_path.indexOf("http://") == -1 && img_path.indexOf("https://") == -1) {
				path = Config.order_baseUrl + "/" + img_path;
			} else {
				path = img_path;
			}
		}
		return path;
	},
	getMaintainTime() {
		let maintainTime = uni.getStorageSync("maintainTime");
		return maintainTime;
	},
	setMaintainTime(val) {
		if (val != undefined && val != '') {
			uni.setStorageSync('maintainTime', val);
		}
	},
	removeMaintainTime() {
		uni.removeStorageSync("maintainTime");
	},
	getKefuURL() {
		let kefuUrl = uni.getStorageSync("kefu");
		return kefuUrl;
	},
	setupInBuyingPage() {
		uni.setStorageSync('isInBuyingPage', 1);
	},
	setupOutofBuyingPage() {
		uni.setStorageSync('isInBuyingPage', 0);
	},
	setupTabBarBadge(important_count, unreaded_count) {
		uni.setStorageSync('normal_msg_count', unreaded_count);
		uni.setStorageSync('important_msg_count', important_count);
		if (important_count > 0) {
			let ic = important_count > 99 ? "99+" : important_count + "";
			uni.setTabBarBadge({
				text: ic,
				index: 4
			});
		} else if (unreaded_count > 0) {
			if (important_count == 0) {
				uni.removeTabBarBadge({
					index: 4
				})
			}
			uni.showTabBarRedDot({
				index: 4
			})

		} else {
			uni.removeTabBarBadge({
				index: 4
			})
			uni.hideTabBarRedDot({
				index: 4
			})
		}



	},
	/**
	 * 时间戳转日期格式
	 * @param {Object} timeStamp
	 */
	timeStampTurnTime(timeStamp) {
		if (timeStamp > 0) {
			var date = new Date();
			date.setTime(timeStamp * 1000);
			var y = date.getFullYear();
			var m = date.getMonth() + 1;
			m = m < 10 ? ('0' + m) : m;
			var d = date.getDate();
			d = d < 10 ? ('0' + d) : d;
			var h = date.getHours();
			h = h < 10 ? ('0' + h) : h;
			var minute = date.getMinutes();
			var second = date.getSeconds();
			minute = minute < 10 ? ('0' + minute) : minute;
			second = second < 10 ? ('0' + second) : second;
			return y + '-' + m + '-' + d + ' ' + h + ':' + minute + ':' + second;
		} else {
			return "";
		}
	},
	/** 转成当天的2点钟
	 * @param {Object} currentDate 当天的日期
	 */
	dateToTwoClock(currentDate) {
		var y = currentDate.getFullYear();
		var m = currentDate.getMonth() + 1;
		var d = currentDate.getDate();
		var date2clok = y + '/' + m + '/' + d + ' 02:00:00';
		return date2clok;
	},
	firstDayTwoClockOfLastMonth() {
		var currentDate = new Date();
		var y = currentDate.getFullYear();
		var m = currentDate.getMonth();
		if (m == 0) {
			y = y - 1;
			m = 12;
		}
		if (m < 10) {
			m = "0" + m;
		}

		var d = "01";
		var firstDate = y + '/' + m + '/' + d + ' 02:00:00';
		return firstDate;
	},
	lastDayTwoClockOfLastMonth() {
		//相当于本月第一天的2点
		var currentDate = new Date();
		var y = currentDate.getFullYear();
		var m = currentDate.getMonth() + 1;
		var d = "01";
		var firstDate = y + '/' + m + '/' + d + ' 02:00:00';
		return firstDate;
	},

	firstDayTwoClockOfThisMonth() {
		var currentDate = new Date();
		var y = currentDate.getFullYear();
		var m = currentDate.getMonth() + 1;
		var d = "01";
		var firstDate = y + '/' + m + '/' + d + ' 02:00:00';
		return firstDate;
	},
	/**
	 * 倒计时
	 * @param {Object} seconds 秒
	 */
	countDown(seconds) {
		let [day, hour, minute, second] = [0, 0, 0, 0]
		if (seconds > 0) {
			day = Math.floor(seconds / (60 * 60 * 24))
			hour = Math.floor(seconds / (60 * 60)) - (day * 24)
			minute = Math.floor(seconds / 60) - (day * 24 * 60) - (hour * 60)
			second = Math.floor(seconds) - (day * 24 * 60 * 60) - (hour * 60 * 60) - (minute * 60)
		}
		if (day < 10) {
			// day = '0' + day
		}
		if (hour < 10) {
			// hour = '0' + hour
		}
		if (minute < 10) {
			// minute = '0' + minute
		}
		if (second < 10) {
			// second = '0' + second
		}
		return {
			d: day,
			h: hour,
			i: minute,
			s: second
		};
	},
	countDownMsecond(mseconds) {
		let [minute, second, msecond] = [0, 0, 0]
		if (mseconds > 0) {
			minute = Math.floor(mseconds / (60 * 1000))
			second = Math.floor(mseconds / 1000) - (minute * 60)
			msecond = Math.floor(mseconds) - (minute * 60 * 1000) - (second * 1000)
		}
		return {
			m: minute,
			s: second,
			ms: msecond
		};
	},
	/**
	 * 数值去重
	 * @param {Object} arr
	 */
	unique(arr) {
		return Array.from(new Set(arr))
	},
	/**
	 * 判断值是否在数组中
	 * @param {Object} elem
	 * @param {Object} arr
	 * @param {Object} i
	 */
	inArray: function (elem, arr) {
		return arr == null ? -1 : arr.indexOf(elem);
	},
	/**
	 * 获取某天日期
	 * @param {Object} day
	 */
	getDay: function (day) {
		var today = new Date();
		var targetday_milliseconds = today.getTime() + 1000 * 60 * 60 * 24 * day;
		today.setTime(targetday_milliseconds);

		const doHandleMonth = function (month) {
			var m = month;
			if (month.toString().length == 1) {
				m = "0" + month;
			}
			return m
		}

		var tYear = today.getFullYear();
		var tMonth = today.getMonth();
		var tDate = today.getDate();
		var tWeek = today.getDay();
		var time = parseInt(today.getTime() / 1000);
		tMonth = doHandleMonth(tMonth + 1);
		tDate = doHandleMonth(tDate);

		const week = ['周日', '周一', '周二', '周三', '周四', '周五', '周六']
		return {
			't': time,
			'y': tYear,
			'm': tMonth,
			'd': tDate,
			'w': week[tWeek]
		};
	},


	/**
	 * 图片选择加上传
	 * @param number num
	 * @param {Object} params
	 * @param {Object} callback
	 * return array
	 */
	upload: function (num, params, callback) {
		var data = {
			token: uni.getStorageSync('token'),
			private_key: Config.privateKey
		}
		data = Object.assign(data, params);
		var imgs_num = num;
		var _self = this;
		uni.chooseImage({
			count: imgs_num,
			sizeType: ['compressed'], //可以指定是原图还是压缩图，默认二者都有
			sourceType: ['album', 'camera'], //从相册或者拍照
			success: async function (res) {
				const tempFilePaths = res.tempFilePaths;
				var _data = data;
				var imgs = [];
				for (var i = 0; i < tempFilePaths.length; i++) {
					var path = await _self.upload_file_server(tempFilePaths[i], _data);
					imgs.push(path);
				}
				typeof callback == 'function' && callback(imgs);
			}
		});
	},
	//上传
	upload_file_server(tempFilePath, data) {
		return new Promise((resolve, reject) => {
			uni.uploadFile({
				url: Config.baseUrl + '/api.php?method=System.Upload.uploadImage',
				filePath: tempFilePath,
				name: 'filePath',
				formData: data,
				success: function (res) {
					var path_str = JSON.parse(res.data);
					var path = JSON.parse(path_str);
					if (path.data.code == 1) {
						resolve(path.data.data);
					} else {
						reject("error");
					}
				}
			});

		});

	},


	/**
	 * 复制
	 * @param {Object} message
	 * @param {Object} callback
	 */
	copy(value, callback) {
		var oInput = document.createElement('input'); //创建一个隐藏input（重要！）
		oInput.value = value; //赋值
		document.body.appendChild(oInput);
		oInput.select(); // 选择对象
		document.execCommand("Copy"); // 执行浏览器复制命令
		oInput.className = 'oInput';
		oInput.style.display = 'none';

		typeof callback == 'function' && callback();
	},


	/**
	 * 多平台复制。
	 * 依赖于util下的copy()、showToast()
	 */
	multiPlatformCopy(value) {
		// #ifdef H5
		this.copy(value, () => {
			this.showToast({
				title: '复制成功'
			});
		})
		// #endif

		// #ifdef APP-PLUS
		uni.setClipboardData({
			data: value,
			success: () => {
				this.showToast({
					title: '复制成功'
				});
			}
		})
		// #endif

	},



	/**
	 * 是否是微信浏览器
	 */
	isWeiXin() {
		var ua = navigator.userAgent.toLowerCase();
		if (ua.match(/MicroMessenger/i) == "micromessenger") {
			return true;
		} else {
			return false;
		}
	},
	//显示消息提示框
	showToast(params = {}) {
		params.title = params.title || "";
		params.icon = params.icon || "none";
		params.position = params.position || 'bottom';
		uni.showToast(params);
	}



	/**
	 * 将图片格式转换为base64 适应微信小程序
	 */
	// ifdef MP-WEIXIN
	// picConversion(tempFilePaths){
	// 	for(let i = 0; i < tempFilePaths.length; i++){
	// 		wx.getFileSystemManager().readFile({
	// 			filePath: tempFilePaths[i], //图片路径
	// 			encoding: 'base64', //图片格式转换
	// 		})
	// 	}
	// }
	// endif
}
