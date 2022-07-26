<template>
	<view v-if="messageList!=null" class="message">
		<view class="message-content">
			<view class="message-content-item" v-for="(item,index) in messageList" :key='item.create_time' @click="showDetail(index)">
				<view class="content-item-top">
					<text class="content-item-top-sender" :class="{isRead:!item.isRead}">{{item.sender}}</text>
					<text class="content-item-top-time">{{item.create_time}}</text>
				</view>
				<view class="content-item-title" :class="{isRead:!item.isRead}">{{item.title}}</view>
				<view class="content-item-content" v-if='item.isShow' v-html="item.content"></view>
				<view class="content-item-delete" @click.stop="deleteMessage(index)">
					<icon class="iconfont iconiconclose" type=""></icon>
				</view>
			</view>
		</view>
		
		<view>
			<uni-load-more :status="loading_status" 
							:contentText="contentText">
			</uni-load-more>
		</view>

	</view>
</template>

<script>
	import http from '../../../common/js/http.js';
	import uniLoadMore from '@/components/uni-load-more/uni-load-more.vue';
	
	export default{
		mixins:[http],
		components:{
			uniLoadMore
			
		},
		data(){
			return{
				token:'',
				page:1,
				page_size:10,
				messageList:null,
				none_flag:false,
				showIcon:true,
				
				loading_status:'noMore',
				contentText:{
					contentdown: "上拉加载更多",
					contentrefresh: "正在加载...",
					contentnomore: "没有更多数据了"}
				
			}
			
		},
		onShow() {
			
		},
		onLoad() {
			this.token = uni.getStorageSync('token')
			this.getMessageList();
		},
		onPullDownRefresh() {
			this.getMessageList();
		},
		onReachBottom() {
			this.getMessageList(true);
		},
		methods:{
			// 获取消息列表
			getMessageList(isLoadMore){
				if(isLoadMore){
					this.page++
					this.loading_status = 'loading'
				}else{
					this.page = 1
					this.messageList = []
				}
				this.sendRequest({
					url:'System.Message.getMessageList',
					data:{
						type_id:1,
						token:this.token,
						is_uniapp:1,
						page:this.page,
						page_size:this.page_size
						
					},
					success:res=>{
						// console.log(res)
						let unreaded_count=0;
						res.data.list.forEach((item,index)=>{
							item.isShow = false
							this.messageList.push(item);
							if(item.isRead==0){
								unreaded_count++;
							}
						})
						if(res.data.total_count > this.messageList.length){
							this.loading_status = 'more'
							this.contentText.contentnomore = '没有更多数据了'
						}else if(this.messageList.length == 0){
							this.loading_status = 'noMore'
							this.contentText.contentnomore = '暂无消息'
						}else if(res.data.total_count == this.messageList.length){
							this.loading_status = 'noMore'
							this.contentText.contentnomore = '没有更多数据了'
						}
						
						this.$util.setupTabBarBadge(0,unreaded_count);
						 //console.log(unreaded_count);
					},
					complete:()=>{
						 uni.stopPullDownRefresh();
					}
				})
			},
			// 点击 显示消息详情
			showDetail(index){
				this.messageList[index].isShow = !this.messageList[index].isShow
				this.sendRequest({
					url:'System.Message.readMessage',
					data:{
						type_id:1,
						is_uniapp:1,
						token:this.token,
						msgId:this.messageList[index].id
					},
					success:res=>{
						// console.log(res)
						this.sendRequest({
							url:'System.Message.queryMessages',
							data:{
								token:this.token
							},
							success:res=>{
								// console.log(res.data)
								this.$util.setupTabBarBadge(res.data.important_count,res.data.unreaded_count)
							}
						})
						this.messageList[index].isRead = 1
						
					}
				})
				
			},
			// 删除消息
			deleteMessage(index){
				this.sendRequest({
					url:'System.Message.deleteMessage',
					data:{
						type_id:1,
						token:this.token,
						is_uniapp:1,
						msgId:this.messageList[index].id
					},
					success:res=>{
						// console.log(res)
						this.sendRequest({
							url:'System.Message.queryMessages',
							data:{
								token:this.token
							},
							success:res=>{
								// console.log(res.data)
								this.$util.setupTabBarBadge(res.data.important_count,res.data.unreaded_count)
							}
						})
						this.messageList.splice(index,1)
						if(this.messageList.length == 0){
							this.loading_status = 'noMore'
							this.contentText.contentnomore = '暂无消息'
						}
						
						this.$util.showToast({
							title:'删除成功'
						})
						
					}
				})
			}
			
		}
	}
</script>

<style lang="scss">
	@import "static/css/message.scss"
</style>
