<template>
	<view class="cu-modal" :class="isShow ? 'show' : ''">
		<!-- <view v-if="isShow" class="cu-modal show"> -->
		<view class="cu-dialog">
			<view v-if="isShowTitle" class="cu-bar bg-white justify-end">
				<view class="content">Modal标题</view>
				<view class="action" @tap="hideModal"><text class="cuIcon-close text-red"></text></view>
			</view>
			<view class="padding-xl">
				<view>{{preNumberOfPeriod}} 期已截止</view>
				<view>{{numberOfPeriod}}  期即将开售。</view>
				<view>投注时请注意期号！</view>
			</view>
			<view class="cu-bar bg-white justify-end">
				<view class="action">
					<!-- <button v-if="isShowLeftBtn" class="cu-btn line-green text-green" @tap="$emit('leftBtnEvent')">{{leftText}}</button> -->
					<button class="cu-btn bg-green margin-left" @tap="closeDialog">{{ rightText }}</button>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	props: {
		isShowLeftBtn: {
			type: Boolean,
			default: () => true
		},
		isShowTitle: {
			type: Boolean,
			default: () => false
		},
		leftText: {
			type: String,
			default: () => '取消'
		},
		rightText: {
			type: String,
			default: () => '确定'
		}
	},
	data() {
		return {
			isShow: 0,
			preNumberOfPeriod:0,
			numberOfPeriod:0
		};
	},

	watch: {
		'$store.state.GDV3.v3IsShowTimeOutDialog': function(val) {
			this.isShow = val;
			this.initData()
		},	
		
	},

	methods: {
		initData(){
			let {numberOfPeriod}  = this.$store.state.GDV3.v4latestPriodData
			this.numberOfPeriod = numberOfPeriod
			this.preNumberOfPeriod = numberOfPeriod-1
		},
		closeDialog() {
			this.$store.commit('v3IsShowTimeOutDialog', 0);
		}
	}
};
</script>

<style lang="scss" scoped>
.action {
	width: 100%;
}
</style>
