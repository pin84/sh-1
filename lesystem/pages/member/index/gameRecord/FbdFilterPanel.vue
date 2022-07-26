<template>
	<view class="filter-panel bg-white padding-sm shadow" >
		<view class="flex align-center">
			<text class="form-label text-right">用户名：</text>
			<view class="border form-input flex-sub ">	
				<input type="text" v-model="username" placeholder-class="text-gray text-sub" placeholder="用户名" class="text-df " @/>
			</view>
		</view>
		<view class="flex align-center margin-top-sm">
			<text class="form-label text-right">游戏平台：</text>
			<view class="position-relative flex-sub">
				<view class="border form-input ">
					<input type="text" @focus="showInfoList" @blur="hideInfoList" v-model="info" placeholder-class="text-gray text-sub" placeholder="全部" class="text-df " />
				</view>
				
				<scroll-view scroll-y class="info-list bg-white border" v-show="listShow">
					<view class="cu-list  menu ">
						<view class="cu-item" :class="item.id == selectedId ? 'cur' : ''"
							v-for="(item,index) in listDropItems" 
							:key="index" 
							@tap="changeItem(item.gameId, item.gameName)">
							<view class="">
								{{item.gameName}}
							</view>
						</view>
					</view>
				</scroll-view>
			</view>
		</view>
		<!-- <view class="flex align-center margin-top-sm">
			<text class="form-label text-right">球类名称：</text>
			<view class="position-relative flex-sub">
				<view class="border form-input ">
					<input type="text" @focus="showBalltype" @blur="hideBalltype" v-model="curballtype" placeholder-class="text-gray text-sub" placeholder="全部" class="text-df " />
				</view>
				<scroll-view scroll-y class="info-list bg-white border" v-show="typeShow">
					<view class="cu-list  menu ">
						<view class="cu-item" 
							v-for="(item,index) in ballTypeItems" 
							:class="index == ballSelectedType ? 'cur' : ''"
							:key="index" 
							@tap="changeballTypeItems(item, index)">
							<view class="">
								{{item}}
							</view>
						</view>
					</view>
				</scroll-view>
			</view>
		</view> -->
		<view class="flex align-center margin-top-sm">
			<text class="form-label text-right">注单状态：</text>
			<view class="position-relative flex-sub">
				<view class="border form-input ">
					<input type="text" @focus="showBallStatus" @blur="hideBallStatus" v-model="curballStatus" placeholder-class="text-gray text-sub" placeholder="全部" class="text-df " />
				</view>
				<scroll-view scroll-y class="info-list bg-white border" v-show="statusShow">
					<view class="cu-list  menu ">
						<view class="cu-item" 
							v-for="(item,index) in ballStatusItems" 
							:class="index == ballSelectedStatus ? 'cur' : ''"
							:key="index" 
							@tap="changeballStatusItems(item, index)">
							<view class="">
								{{item}}
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
			types:'',
			selectedId: '',
			selectedTypeId:0,
			cantainStatus: 1,
			listShow: false,
			typeShow: false,
			statusShow:false,
			curballtype:'',
			curballStatus:'',
			ballSelectedType:'',
			ballSelectedStatus:'',
		};
	},
	props: {
		'listDropItems': {
			type: Array,
		},
		'ballTypeItems':{
			type: Array
		},
		'ballStatusItems':{
			type: Array
		}
	},
	methods: {
		showInfoList() {        //展示平台
			this.listShow = true;
			this.$emit('showInfoList');
		},
		hideInfoList() {         //隐藏平台
			setTimeout(()=>this.listShow = false,50);
		},
		changeItem(gameId, text) {
			this.info = text;
			this.selectedId = gameId;
		},
		showBalltype() {        //展示类型
			this.typeShow = true;
			this.$emit('showBalltype');
		},
		hideBalltype() {         //隐藏类型
			setTimeout(()=>this.typeShow = false,50);
		},
		changeballTypeItems(val, ide) {
			this.curballtype = val;
			this.ballSelectedType = ide;
		},
		
		showBallStatus() {        //展示类型
			this.statusShow = true;
			this.$emit('showBallStatus');
		},
		hideBallStatus() {         //隐藏类型
			setTimeout(()=>this.statusShow = false,50);
		},
		changeballStatusItems(val, ide) {
			this.curballStatus = val;
			this.ballSelectedStatus = ide;
		},
		
		changeSwitch(e) {
			if(e.target.value){
				this.cantainStatus = 1
			}else{
				this.cantainStatus = 0
			}
			
			
		},
		submit() {
			var formObj = {
				accountName: this.username,
				gameID: this.selectedId,
				isContainSub: this.cantainStatus,
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
