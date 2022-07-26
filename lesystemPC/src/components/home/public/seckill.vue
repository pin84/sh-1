<template>
	<div class="caizhongCountdown">
		<el-tabs v-model="kaijiangTabs" type="border-card" @tab-click="tabClickHandler">
			<el-tab-pane v-for="(v,k) in gameList" :label="v.name" :name="v.id">
				<div class="content ">
					<div class="xiaqi">
						<div class="qihao"><span>当期第{{numberOfPeriod}}期 </span></div>
						<div class="daojishi" v-show="loadingStatus==0">
							<span>距离开盘还有：</span>
							<span class="date" v-show="hour>0">{{hour}}</span>
							<span v-show="hour>0">时</span>
							<span class="date">{{min}}</span>
							<span>分</span>
							<span class="date">{{secs}}</span>
							<span>秒</span>
						</div>
						<div class="daojishi" v-show="loadingStatus==1">
							<span style="color: red;">正在开奖中...</span>
						</div>
						<div class="daojishi" v-show="loadingStatus==2">
							<span style="color: red;">正在加载中...</span>
						</div>
					</div>
					<div class="haoma">
						<span v-for="(v) in previousResult">{{v}}</span>
					</div>
					<div class="huan">
						<a href="#" class="huanBtn">换一场</a>
						<a href="#" class="touBtn">立即投注</a>
					</div>
				</div>
			</el-tab-pane>
		</el-tabs>



	</div>
</template>

<script>
	export default {
		components: {},
		props: {
			list: {
				type: Array,
			},
			info: {
				type: Object,
			}
		},
		data() {
			return {
				gameList: [{
					id: '105',
					name: "广西快三"
				}, {
					id: '79',
					name: "腾讯分分彩"
				}, {
					id: '259',
					name: "首尔PK10"
				}, {
					id: '58',
					name: "山东11选5"
				}, {
					id: '118',
					name: "加拿大幸运28"
				}],
				defaultGameId: '105',
				kaijiangTabs: "105",
				hour: 0,
				min: 0,
				secs: 0,
				loadingStatus:2,//0倒计时 1 正在开奖 2 加载中
				intvalobj: null,
				getResultTimer:null,
				fontSkill: '开始',
				previousResult: [],
				numberOfPeriod: '',
				closeTime: ''
			}
		},
		watch: {

		},
		computed: {},
		methods: {
			getLotteryResult: function(id) {
				this.$get("Pc.HomePage.getLotteryResult", {
					gameId: id
				}).then(res => {
					//this.previousResult = res.data.previousResult;
					this.numberOfPeriod = res.data.numberOfPeriod;
					if(res.data.previousResult!=undefined && res.data.previousResult.length>0){
						this.previousResult=res.data.previousResult.split(",");
					}
					this.closeTime = res.data.closeTime;
					
					
				});
			},
			tabClickHandler:function(tab, event){
				let newTabId = parseInt(tab.name);
				if(newTabId!= this.defaultGameId){
				this.loadingStatus = 2;
				clearInterval(this.intvalobj);
				this.defaultGameId = newTabId;
				this.getLotteryResult(this.defaultGameId);
				this.intvalobj = setInterval(this.countDown, 1000);
				}
			},
			
			countDown: function() {
				let end_time = Math.floor(new Date(this.closeTime.replace(/-/g, "/")).getTime() / 1000);
				let timestamp = Date.parse(new Date()) / 1000;
				if (end_time > timestamp) {
					this.loadingStatus = 0
					let sec2 = end_time - timestamp;
					this.hour = Math.floor(sec2 / 3600);
					this.min = Math.floor((sec2 - (this.hour * 3600)) / 60);
					this.secs = sec2 - (this.hour * 60 + this.min) * 60;
				} else {
					//clearInterval(this.intvalobj);
					this.getLotteryResult(this.defaultGameId);
					this.hour = 0;
					this.min = 0;
					this.secs = 0;
					this.loadingStatus = 1;
					
				}
			}
			
			//

		},
		created() {
			// this.getLotteryResult(this.defaultGameId);
			// this.intvalobj = setInterval(this.countDown, 1000);
		},
	};
</script>
<style lang="scss" scoped>
	.caizhongCountdown {
		height: 252px;
	}

	.caizhongCountdown .title {
		height: 50px;
	}
.caizhongCountdown .qihao{float: left; margin-right: 20px;}
	.caizhongCountdown .title ul {
		float: left;
		margin-left: 25px;
		height: 50px;
	}

	.caizhongCountdown .title ul li {
		width: 95px;
		font-size: 14px;
		height: 50px;
		line-height: 50px;
	}

	.caizhongCountdown .title ul li.current {
		height: 48px;
		line-height: 50px;
	}

	.caizhongCountdown .content .xiaqi {
		margin-top: 22px;
		margin-left: 30px;
	}

	.caizhongCountdown .haoma {
		overflow: hidden;
		width: 262px;
		padding-top: 35px;
		margin: 0 auto;
	}

	.caizhongCountdown .haoma span {
		height: 40px;
		width: 40px;
		border-radius: 50%;
		line-height: 40px;
		color: white;
		margin-top: 5px;
		background-color: red;
		display: inline-block;
		text-align: center;
		float: left;
		margin-right: 12px;
		font-size: 18px;
	}

	.caizhongCountdown .huan {
		margin-top: 30px;
		margin-right: 16px;
		line-height: 35px;
		float: right;
	}

	.caizhongCountdown .huanBtn {
		display: inline-block;
		padding-left: 20px;
		background: url("/images/huan.png") center left no-repeat;
		color: #666;
	}

	.caizhongCountdown .touBtn {
		margin-left: 22px;
		background-color: #f15454;
		display: inline-block;
		width: 130px;
		height: 36px;
		line-height: 36px;
		text-align: center;
		color: white;
		border-radius: 5px;
	}
</style>
