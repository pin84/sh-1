<template>
	<div class="bg">
		<div>
			<image class="logo" src="/static/images/2020/yougou_logo.png" />
	   </div>
	   <div class="timer-box">
	               <h5>正在升级，将在{{maintainTime}}后开启:</h5>
	               <div id="countdown">
					   <FlipCountdown :deadline="maintainTime"></FlipCountdown>
	               </div>
	   </div>
	</div>
</template>

<script>
	import FlipCountdown from "@/components/home/public/FlipCountdown.vue";
	export default {
		components: {
			FlipCountdown,
		},
		data() {
			return {
				height:1175,
				maintainTime:"",
				kefu_address:"",
				timer:null
			}
		},
		methods: {
			getWapPageLayout() {
				this.maintainTime = this.getMaintainTime();
				this.$get("Pc.Params.getIndexParams").then((res) => {
				  let data = res.data;
				  let isMaintain = data.IsMaintain;
				  
				  if(isMaintain==1||isMaintain=="1"){
					//console.log(isMaintain);
				  	let maintainTime = data.MaintainTime;
				  	this.setMaintainTime(maintainTime);
				  }else{
				     this.removeMaintainTime();
				     clearInterval(this.timer);
				     this.timer=null;
				     this.$router.push("/");
				  }
				  
				  });
			},
			getMaintainTime() {
				let maintainTime = localStorage.getItem("maintainTime");
				return maintainTime;
			},
			setMaintainTime(val) {
				if (val != undefined && val != '') {
					localStorage.setItem('maintainTime', val);
				}
			},
			removeMaintainTime() {
				localStorage.removeItem("maintainTime");
			}
			
		},
		created(data) {
			this.getWapPageLayout();
			this.timer = setInterval(this.getWapPageLayout, 30000);//30秒去读一次
		}
			
	}
</script>

<style>

.bg{height: 100vh; background-color:#add4f5;background: url(/images/2021/download_bg.jpg) no-repeat center top;background-size: cover;
    padding: 130px 0px;
    margin: 0 auto;
    text-align: center;
}
.logo{width:750px; height:118px;padding-top:60px;}
.maintain-pic{width:626px; height:182px}
	.timer-box {
	width:650px;padding: 70px 10px;
	background: #f5f5f5;
	text-align: center;
	-webkit-border-radius: 10px;
	-moz-border-radius: 10px;
	border-radius: 10px;
	    margin: 0 auto;
	-moz-box-shadow: 0 0 5px #000;
	-webkit-box-shadow: 0 0 5px#000;
	box-shadow: 0 0 5px #000;
	border: 1px solid #fff;
	}
	.timer-box h5 {
       padding-bottom: 20px;
	}
</style>
