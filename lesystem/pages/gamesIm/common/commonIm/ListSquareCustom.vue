<template>
	<view class="list-wrapper">
		<view class="flex list-box align-start padding-top-sm" >
			<view class="title-box flex flex-direction">
				<view class="title text-white text-center">{{ title }}</view>
			</view>
			<view class="select-box margin-left-xl" style="width: 100%;">
				<view class="flex" v-if="isShowTitle">
					<text
						@click="selsectType(text)"
						:class="{ 'select-type-active': text.active }"
						class="select-type radius margin-right-sm "
						v-for="(text, index) in selectTypeArr"
						:key="index"
					>
						{{ text.type }}
					</text>
				</view>
				<view class="num-box">
					<view @click="selectedNum(i)"  class="item-box" :class="{'active':i.active}" v-for="(i, index) in numArr" :key="index">
							<view class="name" >
								<text>{{ i.N1 }}</text>
								<text>{{ i.N2 }}</text>
							</view>
							<text v-if="isShowOdds" class="MxO" >{{ i.odds }}</text>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	props: {
		isShowOdds:{
			type:Boolean,
			default:()=>true
		},
		title: {
			type: String,
			default: 'aa'
		},
		numArr: {
			type: Array,
			default: () => [{ num: 0 }, { num: 1 }]
		},
		selectTypeArr: {
			type: Array,
			default: () => [{ type: '全' }, { type: '清' }]
		},
		isShowTitle:{
			type:Boolean,
			default:()=>true
		}
	},

	watch: {
		'$store.state.GDV3.clearSelected': function(val) {
			this.resetData();
		}
	},

	created() {
		this.initPage();
	},

	methods: {
		initPage() {
			// this.titleArr.forEach((item, idx) => {
			// 	this.typeArr.push(JSON.parse(JSON.stringify(this.selectTypeArr)));
			// 	this.numArr1.push(JSON.parse(JSON.stringify(this.numArr)));
			// });
		},
		selsectType(obj) {
			this.selectTypeArr.forEach(item => (item.active = false));
			if (obj.type !== '清') {
				obj.active = true;
			}

			// this.numArr.forEach(item => (item.active = false));
			switch (obj.type) {
				case '全':
					this.numArr.forEach(item => (item.active = true));
					break;
				case '清':
					this.numArr.forEach(item => (item.active = false));
					break;
				default:
					this.numArr.forEach(item => (item.active = false));
					break;
			}
			this.refreshView();
			this.$emit('selectedNum')
		},

		selectedNum(obj) {
			obj.active = !obj.active;
			this.refreshView();
			this.$emit('selectedNum')
		},

		resetData() {
			this.selectTypeArr.forEach(item => {
				if(item.active){
					item.active = false
				}
			});
			this.numArr.forEach(item => {
				if(item.active){
					item.active = false
				}
			});
			this.refreshView();
			this.$emit('selectedNum')
		},

		refreshView() {
			this.numArr.push({});
			this.numArr.pop();
			this.selectTypeArr.push({});
			this.selectTypeArr.pop();
		}
	}
};
</script>

<style lang="scss" scoped>
.list-wrapper {
	padding: 10rpx;
	.list-box {
		border-top: 1px solid #d0d0d0;
		.title-box {
			flex: 0 0 120rpx;
			padding: 0;
			font-size: 24rpx;
			.title {
				position: relative;
				background-color: #b62929;
				// padding: 0 30rpx;
				height: 60rpx;
				line-height: 60rpx;
			}
			.title:after {
				position: absolute;
				right: -30rpx;
				top: 50%;
				margin-top: -30rpx;
				content: '';
				display: block;
				width: 0;
				height: 0;
				border-top: 30rpx solid transparent;
				border-left: 30rpx solid #b62929;
				border-bottom: 30rpx solid transparent;
			}
			.select {
				border: none;
				outline: none;
				background-color: #f1f1f1;
				font-size: 20rpx;
			}
		}

		.select-type {
			font-size: 32rpx;
			padding: 0 20rpx;
			color: #3b3a3a;
			background: #fff;
			border: 1px solid #bfbfbf;
		}

		.select-type-active {
			border: 1px solid #b62929;
			background-color: #b62929;
			color: #fff;
		}
		.num-box {
			flex-wrap: wrap;
			display: flex;
			// justify-content: space-between;
			margin-top: 20rpx;
			.item-box{
				min-width: 33.3%;
				// width: 100%;
				padding-right: 20rpx;
				margin-bottom: 20rpx;
				text-align: center;
				.name{
					border :1px solid #bfbfbf;
					border-radius: 5rpx;
					background-color: #fff;
					text-align: center;
					color: #000;
					display: flex;
					flex-direction: column;
					font-size:32rpx;
					line-height: 42rpx;
					padding:15rpx 0;
				}
				.MxO{
					color: #C42133;
				}
			}
			.active{
				.name{
					background-color: #b62929;
					color: #fff;
				}
			}
		}
	}
}
</style>
