<template>
	<view class="bg-white invitation-code">
		<scroll-view scroll-x class="bg-white nav text-center">
			<view class="cu-item" :class="0 == TabCur ? 'text-white cur' : ''" @tap="tabSelect" data-id="0">
				<text class="cuIcon-camerafill"></text>
				手动开户
			</view>
			<view class="cu-item" :class="1 == TabCur ? 'text-white cur' : ''" @tap="tabSelect" data-id="1">
				<text class="cuIcon-upstagefill"></text>
				邀请码
			</view>
		</scroll-view>
		
		<view >
			
			
			<view class="cu-form-group margin-top flex">
				<view class="title" style="flex :0 0 190rpx;">推广域名：</view>
				<select class="padding flex-sub " name="" id="" style="border: 0; outline: none; background-color: #f1f1f1;">
					<option style="border: none;" value="" v-for="(item, index) in domains" :key="index">{{ item }}</option>
				</select>
			</view>
			<view class="cu-form-group margin-top flex">
				<view class="title" style="flex :0 0 190rpx;">用户类型：</view>
				<select class="padding flex-sub " name="" id="" style="border: 0; outline: none; background-color: #f1f1f1;">
					<option value="" v-for="(item, index) in userType" :key="index">{{ item }}</option>
				</select>
			</view>
			<view class="cu-form-group margin-top flex">
				<view class="title" style="flex :0 0 190rpx;">链接有效期：</view>
				<select class="padding flex-sub " name="" id="" style="border: 0; outline: none; background-color: #f1f1f1;">
					<option value="" v-for="(item, index) in Expiration" :key="index">{{ item }}</option>
				</select>
			</view>
			<view class="cu-form-group margin-top">
				<view class="title">
					邀请码
					<span style="color: #C10000;">(非必填):</span>
				</view>
				<input placeholder="只能是4-11位数字与字母组合" name="input" class="padding-xl margin-left-xs" style="padding-left:10rpx; background-color: #f1f1f1;" />
			</view>
			
			<view class="cu-form-group margin-top">
				<view class="title">请为下级设置代理返点</view>
				<!-- <input placeholder="再次输入密码" name="input" /> -->
			</view>
	
		</view>
		

		<view class="padding flex flex-direction" style="border-top: 1px solid #f1f1f1;"><button class="cu-btn bg-green margin-tb-sm lg">生成邀请码</button></view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			TabCur:'0',
			domains: ['本站', 'aa', 'bb'],
			userType: ['会员', '代理'],
			Expiration: ['一天', '两天', '三天', '永久有效']
		};
	},
	methods: {
		tabSelect(e) {
			this.TabCur = e.currentTarget.dataset.id;
			// this.scrollLeft = (e.currentTarget.dataset.id - 1) * 60;
		}
	}
};
</script>

<style lang="scss" scoped>
.cu-form-group,
.title {
	padding-right: 0;
}
</style>
