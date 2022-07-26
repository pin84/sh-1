<template>
	<view class="list-wrapper">
		<view class="flex list-box align-start padding-top-sm" v-for="(item, idx) in titleArr" :key="idx">
			<view class="title-box flex flex-direction">
				<view class="title text-white text-center">{{ item }}</view>
			</view>
			<view class="select-box margin-left-xl" style="width: 100%;">
				<view class="flex">
					<text
						@click="selsectType(text, idx)"
						:class="{ 'select-type-active': text.active }"
						class="select-type radius margin-right-sm "
						v-for="(text, index) in typeArr[idx]"
						:key="index"
					>
						{{ text.type }}
					</text>
				</view>
				<view class="num-box">
					<view @click="selectedNum(i, idx)"  class="item-box" :class="{'active':i.active}" v-for="(i, index) in numArr1[idx]" :key="index">
							<view class="name" >{{ i.N }}</view>
							<text class="MxO" >{{ i.odds }}</text>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	props: {
		titleArr: {
			type: Array,
			default: () => ['a', 'b', 'c', 'a', 'b']
		},
		numArr: {
			type: Array,
			default: () => [{ num: 0 }, { num: 1 }]
		},
		selectTypeArr: {
			type: Array,
			default: () => [{ type: '全' }, { type: '清' }]
		}
	},
	data() {
		return {
			typeArr: [],
			numArr1: [],
		};
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
			this.titleArr.forEach((item, idx) => {
				this.typeArr.push(JSON.parse(JSON.stringify(this.selectTypeArr)));
				this.numArr1.push(JSON.parse(JSON.stringify(this.numArr)));
			});
		},
		selsectType(obj, idx) {
			this.typeArr[idx].forEach(item => (item.active = false));
			if (obj.type !== '清') {
				obj.active = true;
			}

			this.numArr1[idx].forEach(item => (item.active = false));
			switch (obj.type) {
				case '全':
					this.numArr1[idx].forEach(item => (item.active = true));
					break;
				case '清':
					this.numArr1[idx].forEach(item => (item.active = false));
					break;
				default:
					this.numArr1[idx].forEach(item => (item.active = false));
					break;
			}

			this.refreshView();
			this.handlerData(idx);
		},

		selectedNum(obj, idx) {
			obj.active = !obj.active;
			this.refreshView();
			this.handlerData(idx);
		},

		handlerData(idx) {
			let title = this.titleArr[idx];
			let temArr = [];
			this.numArr1[idx].forEach(item => {
				if (item.active) {
					temArr.push(item);
				}
			});

			let obj = {};
			obj[title] = temArr;
			this.$emit('selectedNum', obj);
			this.isHasSelected();
		},

		isHasSelected() {
			let len = this.numArr1.length;
			let len1 = this.numArr1[0].length;
			;
			for (let i = 0; i < len; i++) {
				for (let j = 0; j < len1; j++) {
					if (this.numArr1[i][j].active) {
						this.$store.commit('v3IsHasSelected', true);
						i = len;
						j = len1;
					} else {
						this.$store.commit('v3IsHasSelected', false);
					}
				}
			}
		},

		resetData() {
			this.typeArr.forEach(outItem => {
				outItem.forEach(inItem => (inItem.active = false));
			});
			this.numArr1.forEach(outItem => {
				outItem.forEach(inItem => (inItem.active = false));
			});
			this.refreshView();
		},

		refreshView() {
			this.numArr1.push({});
			this.numArr1.pop();
			this.typeArr.push({});
			this.typeArr.pop();
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
			margin-top: 20rpx;
			.item-box{
				width: 33.33%;
				padding-right: 20rpx;
				margin-bottom: 20rpx;
				text-align: center;
				.name{
					border :1px solid #bfbfbf;
					border-radius: 5rpx;
					background-color: #fff;
					text-align: center;
					padding: 15rpx 0;
					color: #000;
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
