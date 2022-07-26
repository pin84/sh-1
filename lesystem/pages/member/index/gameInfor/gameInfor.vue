<template>
	<view class="gameinfor">
		<view class="flex align-center bg-white">
			<view class="bg-gray padding-sm margin-sm inputbox">
				<view class="border form-input">
					<input type="text" @focus="showInfoList" @blur="hideInfoList" v-model="info" placeholder-class="text-gray text-sub"
					 placeholder="选择彩种信息" class="text-df" />
					<i class="iconfont icon-icon-test4 text-grey"></i>
				</view>
				<scroll-view scroll-y class="info-list bg-white border" v-show="listShow">
					<view class="cu-list  menu">
						<view class="cu-item" v-for="(item,index) in curCzlist" :key="index" @tap="changeItem(item.gameId, item.gameName, item.groupId)">
							<view class="">
								{{item.gameName}} [{{item.groupId == 1 ? '官' : '信'}}]
							</view>
						</view>
					</view>
				</scroll-view>
			</view>
		</view>
		<!-- 折叠面板 -->
		<view class="flex">
			<view class="flex-sub padding-sm bg-black ">玩法类型</view>
			<view class="flex-sub padding-sm bg-black ">最高奖金</view>
			<view class="flex-sub padding-sm bg-black ">返点</view>
		</view>
		<view v-if='playlist' class="bg-white  margin-top solid-bottom">
			<Collapse :selected="false" v-for="(item,index) in playlist" :key="item.index">
				<div slot="collapse-header">
					<view class="flex" style="width:100%">
						<view class="flex-sub padding-sm ">{{item.playName}}</view>
						<view class="flex-sub padding-sm ">{{item.children[0].maxBonus}}</view>
						<view class="flex-sub padding-sm ">{{item.children[0].maxKickback}}</view>
					</view>
				</div>
				<div slot="collapse-body">
					<view v-for="(value,index) in item.children" :key="value.index" class="flex">
						<view class="flex-sub padding-sm ">{{value.itemName}}</view>
						<view class="flex-sub padding-sm ">{{value.maxBonus}}</view>
						<view class="flex-sub padding-sm ">{{value.maxKickback}}</view>
					</view>
				</div>
			</Collapse>
		</view>
		<view v-else>
			<p class='text-center padding-lg text-grey'>当前没有数据</p>
		</view>
	</view>
</template>

<script>
	import http from 'common/js/http.js'
	import Collapse from './collapse.vue'

	export default {
		data() {
			return {
				info: '',
				listShow: false,
				curCzlist: [],
				playlist: [],
				activenamese: ['1'],
				selectedId:''
			}
		},
		components: {
			Collapse
		},
		computed: {
			// 玩法请求参数
			setPostData: function() {
				return {
					gameId: this.selectedId
				}
			}
		},
		methods: {
			showInfoList() { //展示彩种信息
				this.listShow = true;
				this.showCzList();
			},
			hideInfoList() { //隐藏彩种信息
				setTimeout(() => this.listShow = false, 50);
			},
			changeItem(gameId, text, groupId) {
				if (groupId == 1) {
					this.info = text + ' [官]'
				} else {
					this.info = text + ' [信]'
				}
				this.selectedId = gameId;
				this.getPalydata()
			},
			showCzList() { //请求彩种数据
				if (this.curCzlist.length > 0)
					return;
				this.sendRequest({
					url: 'System.HomePage.getCpGameList',
					success: res => {
						if (res.code == 0) {
							//let mylistdata = res.data
							let mylistdata = Object.values(res.data)
							let firlist = []; //存放第一层遍历的值
							let seclist = []; //存放第二层遍历的值
							let lastlist = [];
							for (let i = 0; i < mylistdata.length; i++) {
								firlist.push(mylistdata[i].gameCateList)
								for (let j = 0; j < firlist[i].length; j++) {
									seclist.push(firlist[i][j]);
								}
							}
							for (let k = 0; k < seclist.length; k++) {
								if (seclist[k].channelCode == 'CPYX') {
									for (let m = 0; m < seclist[k].gameInfoList.length; m++) {
										lastlist.push(seclist[k].gameInfoList[m])
									}
								}

							}
							this.curCzlist = lastlist;
						} else {
							this.$util.showToast({
								title: res.message
							});
						}
					}
				});
			},

			// 获取对应玩法数据
			getPalydata() {
				//请求前清空数据
				this.playlist = ''
				let postData = this.setPostData;
				this.requestData('System.Member.getGameInfomation', postData, res => {
					this.playlist = res.data
				});
			},

			requestData(url, data, callback, failCallback) {
				uni.showLoading({
					title: '加载中...'
				});
				this.sendRequest({
					url: url,
					data: data,
					success: res => {
						if (res.code == 0) { //成功返回
							if (callback)
								callback(res);
						} else {
							this.$util.showToast({
								title: res.message
							});
						}
					},
					fail: () => {
						if (failCallback) {
							failCallback();
						}
					},
					complete: () => {
						uni.hideLoading();
					}
				});
			},
		},
		created() {
			//页面初始化加载数据
			this.showCzList();
		},
		mounted() {

		},
		mixins: [http]
	}
</script>

<style lang="scss">
	.gameinfor {
		.inputbox {
			width: 100%;
			border-radius: 4px;
			position: relative;
		}

		.info-list {
			height: 300px;
			border: 1px solid #eeeeee;
			position: absolute;
			top: 0;
			left: 0;
			z-index: 99;
		}

		.uni-input-input {
			border: 1px solid #dddddd;
			height: 36px;
			line-height: 36px;
		}

		.form-input .iconfont {
			font-size: 24px;
			position: absolute;
			right: 6px;
			top: 0
		}
	}

</style>
