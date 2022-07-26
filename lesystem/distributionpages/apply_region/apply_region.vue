<template>
	<view>
		<!-- 功能未开启 -->
		<view class="not-open" v-if="shopConfig && shopConfig.is_regional_agent == 0">
			<view class="iconfont iconwenzhangchaxun"></view>
			<view>区域代理功能暂未开启，请联系管理人员。</view>
		</view>

		<template v-else>
			<!-- 步骤条 -->
			<view class="step ns-margin-top ns-padding-top ns-padding-bottom ns-margin-bottom">
				<view class="step-title">
					<view class="ns-font-size-sm ns-text-color">申请区域代理</view>
					<view class="ns-font-size-sm step-2" :class="agentType == 0 || agentType == 1 ? 'ns-text-color' : 'ns-text-color-gray'">待审核</view>
					<view class="ns-font-size-sm" :class="agentType == 1 ? 'ns-text-color' : 'ns-text-color-gray'">申请成功</view>
				</view>
				<view class="step-icon">
					<view class="num base-color base-circle">1</view>
					<view class="num" :class="agentType == 0 || agentType == 1 ? 'base-color base-circle' : 'grey'">2</view>
					<view class="num" :class="agentType == 1 ? 'base-color base-circle' : 'grey'">3</view>
					<view class="line" :style="'left:' + stepLeft">
						<view class="red"></view>
						<view class="grey"></view>
					</view>
				</view>
			</view>

			<template v-if="agentType == -1">
				<!-- 没申请过 -->
				<view class="apply-wrap">
					<view class="ns-text-color tips">用户消费金额：{{ userMoney }}元</view>
					<view class="input-box">
						<view class="item">
							<text class="iconfont iconliebiao1 ns-font-size-lg"></text>
							<text class="label long-label">区域代理类型：</text>
							<text class="picker type-picker" @click="showAgentRegionPicker()">
								<text>{{ agentRegionTypeLabel }}</text>
								<text :class="typePickerSwitch ? 'icontriangleupfill' : 'icontriangledownfill'" class="iconfont ns-text-color-gray ns-font-size-base"></text>
							</text>
						</view>
						<view class="item">
							<text class="iconfont iconmy_fill_light ns-font-size-base"></text>
							<text class="label">真实姓名：</text>
							<input class="uni-input" type="text" v-model="userName" placeholder="请输入真实姓名" />
						</view>
						<view class="item">
							<text class="iconfont icondianhua ns-font-size-base"></text>
							<text class="label">联系电话：</text>
							<input class="uni-input" type="number" v-model="userMobile" placeholder="请输入联系电话" />
						</view>
						<view class="item">
							<text class="iconfont iconlocationfill ns-font-size-base"></text>
							<text class="label">联系地址：</text>
							<text class="picker" @click="showAddressPicker()">{{ address }}</text>
						</view>
					</view>

					<view class="ns-text-color tips ns-margin-left">最低消费{{ applyMoney }}元，才可成为{{ agentRegionTypeLabel }}</view>
					<button type="primary" @click="applySubmit()">申请区域代理</button>
				</view>
			</template>

			<template v-else-if="agentType == 0">
				<!-- 审核中 -->
				<view class="frog">
					<image src="/static/images/distribution/agent_apply.png" mode="widthFix" />
					<text>申请正在审核中......</text>
					<button type="primary" @click="goBack()">返回推广中心</button>
				</view>
			</template>
		</template>

		<mpvue-picker
			ref="agentRegionPicker"
			:mode="mode"
			:pickerValueDefault="pickerAgentRegionValueDefault"
			@onConfirm="onConfirmAgentRegion"
			@onCancel="onCancelAgentRegion"
			:pickerValueArray="pickerAgentRegionArray"
		></mpvue-picker>
		<mpvue-picker
			ref="addressPicker"
			:mode="addressMode"
			:deepLength="deepLength"
			:pickerValueDefault="pickerAddressValueDefault"
			@onChange="onChangeAddress"
			@onConfirm="onConfirmAddress"
			@onCancel="onCancelAddress"
			:pickerValueArray="pickerAddressArray"
		></mpvue-picker>
		<loading-cover ref="loadingCover"></loading-cover>
	</view>
</template>

<script>
import http from 'common/js/http.js';
import mpvuePicker from 'components/mpvue-picker/mpvuePicker.vue';
import loadingCover from '@/components/loading/loading.vue';
export default {
	components: {
		mpvuePicker,
		loadingCover
	},
	mixins: [http],
	data() {
		return {
			regionConfig: null,
			shopConfig: null,
			agentType: -1,
			mode: 'selector',

			// 区域代理类型选择
			pickerAgentRegionValueDefault: [0],
			pickerAgentRegionArray: [],

			//联系地址选择
			addressMode: 'dynamicData',
			deepLength: 3,
			pickerAddressValueDefault: [0, 0, 0],
			pickerAddressArray: [],
			address: '',

			agentRegionType: '',
			agentRegionTypeLabel: '',

			userMoney: 0,
			applyMoney: 0,
			userName: '',
			userMobile: '',

			flag: false, //防重复标识
			stepLeft: '-75%',
			typePickerSwitch: false
		};
	},
	onLoad() {
		this.getProvince();
	},
	onShow() {
		this.init();
		this.getRegionAgentConfig();
		this.getUserConsume();
		this.getRegionAgentInfo();
		this.getShopConfig();
	},
	methods: {
		init() {
			this.pickerAgentRegionArray = [];
		},
		//获取区域代理信息
		getRegionAgentConfig() {
			this.sendRequest({
				url: 'System.Distribution.regionAgentConfig',
				success: res => {
					let data = res.data;
					this.regionConfig = data;

					this.pickerAgentRegionArray.push(
						{
							value: this.regionConfig.application_require_province,
							label: '省代'
						},
						{
							value: this.regionConfig.application_require_city,
							label: '市代'
						},
						{
							value: this.regionConfig.application_require_district,
							label: '区代'
						}
					);
					this.applyMoney = this.regionConfig.application_require_province;
					this.agentRegionTypeLabel = this.pickerAgentRegionArray[0].label;
					this.agentRegionType = 1;
				}
			});
		},
		// 用户店铺消费
		async getUserConsume() {
			let res = await this.sendRequest({
				url: 'System.Distribution.userConsume',
				async: false,
				success: res => {}
			});
			let data = res.data;
			if (data) this.userMoney = data;
		},
		//代理详情
		getRegionAgentInfo() {
			this.sendRequest({
				url: 'System.Distribution.regionAgentInfo',
				success: res => {
					let data = res.data;
					if (data) {
						this.agentType = data.is_audit;
						if (this.agentType == 1) {
							this.$util.redirectTo('/distributionpages/index/index', {}, '', 'redirectTo');
							return;
						}

						if (this.agentType == 0 || this.agentType == 1) {
							this.stepLeft = '-25%';
						} else if (this.agentType == 1) {
							this.stepLeft = '0';
						}
					} else {
						this.agentType = -1;
						this.stepLeft = '-75%';
					}
				}
			});
		},
		/**
		 * 获取店铺推广设置
		 */
		getShopConfig() {
			this.sendRequest({
				url: 'System.Distribution.shopConfig',
				success: res => {
					this.shopConfig = res.data;
				}
			});
		},
		goBack() {
			this.$util.redirectTo('/distributionpages/index/index', {}, '', 'redirectTo');
		},
		showAgentRegionPicker() {
			if (!this.typePickerSwitch) {
				this.typePickerSwitch = true;
			}
			this.$refs.agentRegionPicker.show();
		},
		/* 选择区域代理类型 */
		onConfirmAgentRegion(e) {
			this.agentRegionTypeLabel = e.label;
			this.agentRegionType = parseInt(e.index) + 1;
			this.applyMoney = e.value[0];
			this.typePickerSwitch = false;
		},
		/* 取消选择区域代理类型 */
		onCancelAgentRegion(e) {
			this.pickerAgentRegionValueDefault = [0];
			this.typePickerSwitch = false;
		},
		//选择地址
		showAddressPicker() {
			this.$refs.addressPicker.show();
		},
		onConfirmAddress(e) {
			this.address = e.label;
		},
		onChangeAddress(e) {
			var index = e.index,
				cityData = this.pickerAddressArray;
			if (index[0] != this.pickerAddressValueDefault[0]) {
				this.getCity(cityData[0][index[0]].value);
			} else if (index[1] != this.pickerAddressValueDefault[1]) {
				this.getDistrict(cityData[0][index[0]].value, cityData[1][index[1]].value);
			}
			this.pickerAddressValueDefault = index;
		},
		onCancelAddress(e) {
			this.pickerAddressValueDefault = [0, 0, 0];
		},

		/* 获取省 */
		getProvince(province, city, district) {
			this.sendRequest({
				url: 'System.Address.province',
				success: res => {
					if (res.code == 0) {
						var provinceData = [];
						res.data.forEach((item, index) => {
							if (province == undefined && index == 0) {
								province = item.province_id;
							} else if (province == item.province_id) {
								this.pickerAddressValueDefault[0] = index;
							}
							provinceData.push({
								value: item.province_id,
								label: item.province_name
							});
						});
						this.pickerAddressArray[0] = provinceData;
						this.getCity(province, city, district);
					}
				}
			});
		},
		/* 获取市 */
		getCity(province, city, district) {
			this.sendRequest({
				url: 'System.Address.city',
				data: { province_id: province },
				success: res => {
					if (res.code == 0) {
						var cityData = [];
						res.data.forEach((item, index) => {
							if (city == undefined && index == 0) {
								city = item.city_id;
							} else if (city == item.city_id) {
								this.pickerAddressValueDefault[1] = index;
							}
							cityData.push({
								value: item.city_id,
								label: item.city_name
							});
						});
						this.pickerAddressArray[1] = cityData;
						this.getDistrict(province, city, district);
					}
				}
			});
		},
		/* 获取区或县 */
		getDistrict(province, city, district) {
			this.sendRequest({
				url: 'System.Address.district',
				data: { city_id: city },
				success: res => {
					if (res.code == 0) {
						var districtData = [];
						if (res.data.length) {
							res.data.forEach((item, index) => {
								if (district != undefined && district == item.district_id) {
									this.pickerAddressValueDefault[2] = index;
								}
								districtData.push({
									value: item.district_id,
									label: item.district_name
								});
							});
						}
						this.pickerAddressArray[2] = districtData;
						if (this.$refs.addressPicker) this.$refs.addressPicker.initPicker(this.pickerAddressArray);
						this.initAddress();
					}
				}
			});
		},
		initAddress() {
			let pickerAddressValueDefault = this.pickerAddressValueDefault,
				pickerAddressArray = this.pickerAddressArray;

			this.address = '';
			this.address += pickerAddressArray[0][pickerAddressValueDefault[0]] != undefined ? pickerAddressArray[0][pickerAddressValueDefault[0]].label : '';
			this.address += pickerAddressArray[1][pickerAddressValueDefault[1]] != undefined ? '-' + pickerAddressArray[1][pickerAddressValueDefault[1]].label : '';
			this.address += pickerAddressArray[2][pickerAddressValueDefault[2]] != undefined ? '-' + pickerAddressArray[2][pickerAddressValueDefault[2]].label : '';
			if (this.$refs.loadingCover == undefined) return;
			this.$refs.loadingCover.hide();
		},
		//申请区域代理
		applySubmit() {
			if (this.userName == '') {
				this.$util.showToast({
					title: '姓名不能为空'
				});
				return;
			}
			if (this.userMobile == '') {
				this.$util.showToast({
					title: '联系电话不能为空'
				});
				return;
			}
			var reg = /^\d{11}$/;
			if (!reg.test(this.userMobile)) {
				this.$util.showToast({
					title: '请输入正确的手机号码'
				});
				return;
			}
			if (this.address == '' || this.address == '请选择省选择市选择区/县') {
				this.$util.showToast({
					title: '联系地址不能为空'
				});
				return;
			}
			if (parseFloat(this.userMoney) < parseFloat(this.applyMoney)) {
				this.$util.showToast({
					title: '用户消费不可小于申请区域代理最低消费'
				});
				return;
			}
			if (!this.flag) {
				this.flag = false;
				this.sendRequest({
					url: 'System.Distribution.applyRegionalAgent',
					data: {
						agent_type: this.agentRegionType,
						real_name: this.userName,
						mobile: this.userMobile,
						address: this.address
					},
					success: res => {
						if (res.data > 0) {
							this.$util.showToast({
								title: '区域代理申请成功'
							});
							setTimeout(() => {
								this.$util.redirectTo('/distributionpages/index/index', {}, '', 'redirectTo');
							}, 1000);
						} else {
							this.flag = true;
							this.$util.showToast({
								title: '区域代理申请失败'
							});
						}
					}
				});
			} else {
				this.$util.showToast({
					title: '正在申请中,不可重复提交!'
				});
			}
		}
	}
};
</script>

<style lang="scss">
/* 审核中 */
.frog {
	text-align: center;
	padding-bottom: 20rpx;
	image {
		width: 250rpx;
		display: block;
		margin: 80rpx auto 30rpx;
	}
	text {
		font-size: $ns-font-size-base;
	}
	button {
		margin-top: 80rpx;
		margin-bottom: 20rpx;
	}
}

/* 区域推广申请 */
.not-open {
	margin-top: 40px;
	text-align: center;
	.iconfont {
		font-size: 180rpx;
		margin-bottom: 10px;
		line-height: 1;
	}
	> view {
		color: darken($ns-bg-color-gray, 30%);
	}
}

// 步骤条
.base-color {
	background: $base-color;
}

.grey {
	background: darken($ns-bg-color-gray, 20%);
}

.step-title {
	margin: 0 30rpx;
	display: flex;
	justify-content: space-between;
	overflow: hidden;
}

.step-2 {
	margin-left: -40rpx;
}

.step-icon {
	margin: 0 30rpx;
	display: flex;
	justify-content: space-between;
	position: relative;
	overflow: hidden;

	.line {
		position: absolute;
		width: 200%;
		height: 4rpx;
		display: flex;
		top: 22rpx;
		z-index: 1;
		transition: left 0.8s;

		.red {
			width: 50%;
			height: 100%;
			background: $base-color;
		}

		.grey {
			width: 50%;
			height: 100%;
			background: darken($ns-bg-color-gray, 20%);
		}
	}

	.num {
		width: 32rpx;
		height: 32rpx;
		border-radius: 50%;
		transition: background 0.8s;
		line-height: 32rpx;
		text-align: center;
		color: #fff;
		font-weight: bold;
		z-index: 99;
		border: 8rpx solid;
		border-color: lighten($ns-border-color-gray, 1%);
	}
	.base-circle {
		border-color: lighten($base-color, 35%);
	}
}

.apply-wrap {
	.input-box {
		background: #fff;
		margin: 0 $ns-margin;
		border-radius: 10rpx;
	}
	.item {
		padding: 20rpx;
		background: #ffffff;
		margin-bottom: 20rpx;
		border-radius: 10rpx;
		.label {
			width: 150rpx;
			display: inline-block;
			text-align: right;
			margin-right: 20rpx;
		}
		& > .iconfont {
			color: $base-color;
			margin-right: $ns-margin;
		}
		.long-label {
			width: 200rpx !important;
			margin-left: 4rpx;
		}
		input {
			display: inline-block;
			vertical-align: middle;
			padding: 0;
		}
	}
	.tips {
		padding: 20rpx;
	}
	button {
		margin-top: 40rpx;
	}
}
.type-picker {
	display: inline-block;
	position: relative;
	width: 360rpx;
	.iconfont {
		margin-left: 266rpx !important;
	}
}
</style>
