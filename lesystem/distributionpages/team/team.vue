<template>
	<view>
		<view class="cf-container ns-border-color-gray">
			<view class="tab">
				<view @click="selected('promoter')"><text :class="type == 'promoter' ? 'ns-text-color active' : ''">推广员</text></view>
				<view @click="selected('member')"><text :class="type == 'member' ? 'ns-text-color active' : ''">会员</text></view>
			</view>
		</view>

		<view class="item" v-for="(item, index) in list" :key="index">
			<image :src="item.user_headimg ? $util.img(item.user_headimg) : '/static/images/default_head.png'" mode="aspectFill" />
			<view class="info">
				<view class="nack-info">
					<view class="name-wrap">
						<view class="nick-name ns-text-color-black">{{ item.nick_name }}</view>
						<view class="role-name" v-if="item.is_partner == 1">股东</view>
						<view class="role-name" v-else-if="item.is_promoter == 1">推广员</view>
						<view class="role-name" v-else>会员</view>
					</view>
					<view class="role-user ns-text-color-gray" v-if="item.recommender_name">推荐人：{{ item.recommender_name }}</view>
				</view>
				<view class="time ns-text-color-gray">注册时间：{{ $util.timeStampTurnTime(item.reg_time) }}</view>
			</view>
		</view>

		<uni-load-more :status="status" :content-text="contentText" v-if="list.length > 0 && pageCount > 1" />
		<!-- 数据为空 -->
		<view v-if="isEmpty && list.length == 0" class="empty"><view class="ns-text-color-gray ns-font-size-base">您当前还没有团队哦</view></view>
		<ns-login ref="login" href="distribution"></ns-login>
	</view>
</template>

<script>
import http from 'common/js/http.js';
import uniLoadMore from '@/components/uni-load-more/uni-load-more.vue';
import nsLogin from 'components/ns-login/ns-login.vue';
export default {
	components: {
		uniLoadMore,
		nsLogin
	},
	data() {
		return {
			type: 'promoter',
			promoterId: 0,
			pageIndex: 1,
			pageCount: 0,
			list: [],
			isEmpty: false,
			status: 'loading',
			contentText: {
				contentdown: '上拉加载更多',
				contentrefresh: '加载中',
				contentnomore: '没有更多了'
			},
			ident: false //防止初始化时，触发上拉加载
		};
	},
	mixins: [http],
	onLoad(data) {
		this.promoterId = data.promoter_id || 0;
	},
	onShow() {
		var isLogin = false;
		// #ifdef H5
		getApp().checkLogin(() => {
			isLogin = true;
			setTimeout(() => {
				this.$refs.login.clickLogin();
			}, 100);
		});
		// #endif
		// #ifdef MP
		getApp().$vm.checkLogin(() => {
			isLogin = true;
			this.$refs.login.clickLogin();
		});
		// #endif

		if (isLogin) return;

		this.selected('promoter');
	},
	methods: {
		selected(type) {
			this.pageIndex = 1;
			this.status = 'loading';
			this.type = type;
			this.list = [];
			this.getTeamList('refresh');
		},
		getTeamList(type = 'refresh') {
			this.sendRequest({
				url: 'System.Distribution.myTeam',
				data: {
					promoter_id: this.promoterId,
					page: this.pageIndex,
					type: this.type
				},
				success: res => {
					if (res.code == 0) {
						let data = res.data.data;
						this.pageCount = res.data.page_count;
						if (this.pageCount == 0) {
							this.status = 'nomore';
							this.isEmpty = true;
							this.contentText.contentnomore = '';
						} else {
							if (this.pageIndex < this.pageCount) {
								this.status = 'more';
							} else {
								this.status = 'nomore';
								this.contentText.contentnomore = '没有更多了';
							}
							this.isEmpty = false;

							if (data.length > 0) {
								if (type == 'refresh') {
									this.list = data;
								} else {
									this.list = this.list.concat(data);
								}
								this.pageIndex++;
							}
						}
					}
				}
			});
		},
		clickLogin() {
			this.$refs.login.clickLogin();
		},
		onReachBottom() {
			if (!this.ident) return;
			this.getTeamList();
		}
	}
};
</script>

<style lang="scss">
.cf-container {
	max-width: 1280rpx;
	background: #fff;
	overflow: hidden;
	border-bottom: 2rpx solid;
	margin-bottom: 20rpx;
}

.tab {
	display: flex;
	justify-content: space-between;
}

.tab > view {
	text-align: center;
	flex: 1;
	text {
		display: inline-block;
		line-height: 88rpx;
	}
}
.active {
	border-bottom: 4rpx solid $base-color;
}

.item {
	padding: 30rpx;
	margin-bottom: 30rpx;
	background: #fff;
	display: flex;
	justify-content: flex-start;
	align-items: center;
	image {
		width: 100rpx;
		height: 100rpx;
	}
	.info {
		flex: 1;
		width: calc(100vw - 180rpx);
		margin-left: 20rpx;
		.nack-info {
			width: 100%;
			display: flex;
			justify-content: space-between;
			align-items: center;
			overflow: hidden;
			white-space: nowrap;
			text-overflow: ellipsis;
			.name-wrap {
				display: flex;
				max-width: 65%;
				.nick-name {
					max-width: 50%;
					overflow: hidden;
					white-space: nowrap;
					text-overflow: ellipsis;
				}
				.role-name {
					padding: 0 20rpx;
					line-height: 50rpx;
					border-radius: 25rpx;
					background: $base-color;
					margin-left: 30rpx;
					color: #ffffff;
					display: inline-block;
				}
			}
			.role-user {
				max-width: 35%;
				overflow: hidden;
				white-space: nowrap;
				text-overflow: ellipsis;
				font-size: $ns-font-size-sm;
			}
		}

		.time {
		}
	}
}
</style>
