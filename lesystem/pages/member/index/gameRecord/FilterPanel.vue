<template>
	<view class="filter-panel bg-white padding-sm shadow" >
		<view class="flex align-center">
			<text class="form-label text-right">用户名：</text>
			<view class="border form-input flex-sub ">	
				<input type="text" v-model="username" placeholder-class="text-gray text-sub" placeholder="用户名" class="text-df " @/>
			</view>
		</view>
		<view class="flex align-center margin-top-sm">
			<text class="form-label text-right">彩种信息：</text>
			<view class="position-relative flex-sub">
				<view class="border form-input ">
					<input type="text" @focus="showInfoList" @blur="hideInfoList" v-model="info" placeholder-class="text-gray text-sub" placeholder="彩种信息" class="text-df " />
				</view>
				
				<scroll-view scroll-y class="info-list bg-white border" v-show="listShow">
					<view class="cu-list  menu ">
						<view class="cu-item" @tap="changeItem(0, '所有游戏')">
							<view class="content">
								所有游戏
							</view>
						</view>
						<view class="cu-item" :class="item.id == selectedId ? 'cur' : ''"
							v-for="(item,index) in listDropItems" 
							:key="index" 
							@tap="changeItem(item.id, item.gameName)">
							<view class="">
								{{item.gameName}} [{{item.groupId == 1 ? '官' : '信'}}]
							</view>
						</view>
					</view>
					
				</scroll-view>
			</view>
		</view>
		<view class="flex align-center">
			<text class="form-label text-right">包含下级：</text>
			<view class="flex-sub form-input">	
				<switch checked @change="changeSwitch" />
			</view>
		</view>
		<view class="flex flex-direction justify-center margin-top-sm">
			<button class="cu-btn text-white bg-red lg shadow-blur"  @tap="submit">搜索</button>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			username: '',
			info: '',
			selectedId: '',
			cantainStatus: true,
			listShow: false,
		};
	},
	props: {
		'listDropItems': {
			type: Array,
		}
	},
	methods: {
		showInfoList() {        //展示彩种信息
			this.listShow = true;
			this.$emit('showInfoList');
		},
		hideInfoList() {         //隐藏彩种信息
			setTimeout(()=>this.listShow = false,50);
		},
		changeItem(gameId, text) {
			this.info = text;
			this.selectedId = gameId;
		},
		changeSwitch(e) {
			this.cantainStatus = e.detail.value;
		},
		submit() {
			var formObj = {
				accountName: this.username,
				gameID: this.selectedId,
				isContainSub: this.cantainStatus
			};
			this.$emit('submit', formObj)
		}
	}
};	
</script>

<style lang="scss" scoped>
	.filter-panel {
		position: absolute;
		width: 100%;
		background-color: #fff;
		z-index: 10;
		.form-label {
			width: 22%;
		}
		.form-input {
			padding: 8px;
			border-radius: 4px;
		}
		.border {
			border: 1px solid #d6d6d6;
		}
		.info-list {
			margin-top: -1px;
			position: absolute;
			z-index: 10;
			height: calc(40vh);
			
		}
	}
</style>
