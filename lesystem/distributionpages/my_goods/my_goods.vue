<template>
	<view>
		<view class="category-content-section">
			<!-- #ifdef H5 -->
			<text class="del_btn" v-if="isEdit" @click="delShow">删除</text>
			<text class="del_btn" v-else @click="delShow">完成</text>
			<!-- #endif -->

			<view class="fixed_top_wrap">
				<view class="goods-search ns-border-color-gray">
					<text class="search-img iconfont iconsearch_light" @click="getgoodlist(1)"></text>
					<input
						type="text"
						id="search_text"
						class="uni-input"
						placeholder-class="seachIcon"
						confirm-type="search"
						@confirm="getgoodlist(1)"
						v-model="searchText"
						placeholder="请输入商品名称"
					/>
				</view>
				<view class="filtrate-term">
					<view class="drop_wrap">
						<view class="drop_down ns-border-color-gray" @click="toggleType(1)">
							<text class="ns-text-color-black">
								分类
								<text class="iconfont" :class="popupType == 1 && isPopup ? 'iconfold' : 'iconunfold'" aria-hidden="true"></text>
							</text>
						</view>
						<view class="drop_down ns-border-color-gray" @click="toggleType(2)">
							<text class="ns-text-color-black">
								排序
								<text class="iconfont" :class="popupType == 2 && isPopup ? 'iconfold' : 'iconunfold'" aria-hidden="true"></text>
							</text>
						</view>
						<!-- <view class="drop_down" v-if="categoryId != ''" @click="toggleType(3)">
							<text class="ns-text-color-black">
								筛选
								<text class="iconfont" :class="popupType == 3 && isPopup?'iconfold':'iconunfold'" aria-hidden="true"></text>
							</text>
						</view> -->
					</view>
					<view class="popup_wrap" v-if="isPopup">
						<view class="category-popup-layer" v-if="popupType == 1">
							<view class="primary-classification ns-bg-color-gray-fadeout-60 ns-border-color-gray">
								<view @click="firstCategory(-1)" :class="classId == -1 ? 'active' : ''">全部分类</view>
								<block v-for="(vo, index) in goodsCategoryList" :key="index">
									<view @click="firstCategory(index)" class="uni-ellipsis ns-text-color-black" :class="classId == index ? 'active' : ''">
										{{ vo.category_name }}
									</view>
								</block>
							</view>
							<view class="two_stage_classification">
								<block v-for="(vo, index) in goodsCategoryList" :key="index">
									<view @click="fxCategoryGoods(index, tindex)" v-for="(to, tindex) in vo.child_list" :key="tindex">
										<view v-show="classId == index" class="uni-ellipsis">{{ to.category_name }}</view>
									</view>
								</block>
							</view>
						</view>
						<view class="filtrate-more" v-if="popupType == 2">
							<view class="ns-text-color-black ns-border-color-gray" @click="filtrateSort">默认</view>
							<view class="ns-text-color-black ns-border-color-gray" @click="filtrateSort" data-order-type="ng.sales" :data-sort="sortType ? 'asc' : 'desc'">
								销售量
							</view>
							<view class="ns-text-color-black ns-border-color-gray" @click="filtrateSort" data-order-type="ng.is_new" :data-sort="sortType ? 'asc' : 'desc'">
								新品
							</view>
							<view
								class="ns-text-color-black ns-border-color-gray"
								@click="filtrateSort"
								data-order-type="ng.promotion_price"
								:data-sort="sortType ? 'asc' : 'desc'"
							>
								价格
							</view>
						</view>
					</view>
				</view>
			</view>
			<!-- 商品列表 -->
			<view class="goods-list-grid open-list">
				<view class="tablelist-append">
					<view class="goods-info ns-border-color-gray" v-for="(item, index) in goodsList" :key="index">
						<view class="goods_select" v-if="!isEdit">
							<text
								class="checkbox iconfont"
								:class="item.checked ? 'iconyuan_checked ns-text-color' : 'iconyuan_checkbox ns-text-color-gray'"
								data-is_del="no"
								@click="checkbox(index)"
							></text>
						</view>
						<view class="goods-img">
							<navigator :url="'/pages/goods/detail/detail?goods_id=' + item.goods_id">
								<image :src="$util.img(item.pic_cover_small)" class="pic" mode="widthFix"></image>
							</navigator>
						</view>
						<navigator class="data-info" :url="'/pages/goods/detail/detail?goods_id=' + item.goods_id">
							<view class="goods-name ns-text-color-black">{{ item.goods_name }}</view>
							<view class="data-goods-sales-info">
								<text v-if="item.shipping_fee == 0" class="shipping-fee ">包邮</text>
								<text class="data-sales">销量：{{ item.sales }}</text>
							</view>
							<view class="data-goods-sales-info flex-item" v-if="item.goods_commission != null && item.goods_commission != ''">
								<text class="data-sales">佣金：{{ item.goods_commission.distribution_commission }}</text>
								<text class="price">{{ item.promotion_price }}</text>
							</view>
						</navigator>
					</view>
				</view>
			</view>
			<view style="height: 100rpx;" v-if="goodsList.length > 3" :class="isIphoneX ? 'iponex' : ''"></view>
			<!-- 底部添加 -->
			<view class="footer ns-border-color-gray" :class="isIphoneX ? 'iponex' : ''">
				<view v-if="!isEdit" class="foot_wrap">
					<view class="select-all">
						<view>
							<text
								class="checkbox iconfont"
								:class="checkAll ? 'iconyuan_checked ns-text-color' : 'iconyuan_checkbox ns-text-color-gray'"
								@click="allElection"
							></text>
							<text>全选</text>
						</view>

						<!-- #ifdef MP -->
						<button type="default" class="defau_btn" @click="delShow()">取消</button>
						<!-- #endif -->
					</view>
					<button type="primary" class="add-btn" @click="delSave()">删除</button>
				</view>
				<view v-else class="foot_wrap">
					<!-- #ifdef MP -->
					<button type="default" class="defau_btn" @click="delShow()">编辑</button>
					<!-- #endif -->
					<button type="primary" class="add_shop" @click="$util.redirectTo('/distributionpages/goods/goods')">添加推荐商品</button>
				</view>
			</view>
		</view>
		<view v-if="isEmpty && goodsList.length == 0" class="empty">
			<view class="iconfont iconwenzhangchaxun"></view>
			<view class="ns-text-color-gray">Sorry！没有找到您想要的商品…</view>
		</view>
		<loading-cover ref="loadingCover"></loading-cover>
	</view>
</template>

<script>
import http from 'common/js/http.js';
import loadingCover from '@/components/loading/loading.vue';
import nsLogin from 'components/ns-login/ns-login.vue';
export default {
	components: {
		nsLogin,
		loadingCover
	},
	data() {
		return {
			categoryId: '',
			popupType: 0, //筛选框类型。1：分类，2：排序，3筛选
			page: 1, //商品页数
			pageSize: 10,
			pageCount: 0, //总页数
			goodsList: [
				{
					goods_commission: {
						distribution_commission: ''
					}
				}
			], //商品信息
			goodsCategoryList: [], //分类信息
			order: '', //排序方式
			st: '', //排序
			sortType: true, // true为asc false为desc
			minPrice: '', //价格区间 最小
			maxPrice: '', //价格区间 最大
			attr: '', //筛选属性值
			spec: '', //筛选规格
			brandId: '', //品牌id
			searchText: '', //搜索关键词
			isEdit: true,
			isLoad: true, //防止重复加载
			isEmpty: false, //是否显示空页面
			isPopup: false, //是否显示筛选框
			checkAll: false, //是否全选
			classId: -1, //一级菜单选中
			ident: false, //防止初始化时，触发上拉加载
			isIphoneX: false //判断手机是否是iphoneX以上
		};
	},
	onLoad(event) {
		this.categoryId = event.category_id || '';
		uni.getSystemInfo({
			success: res => {
				if (res.model.search('iPhone X') != -1) {
					this.isIphoneX = true;
				}
			}
		});
		this.getGoodsCategoryList();
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
		this.getgoodlist(1);
	},
	//加载更多
	onReachBottom() {
		if (!this.ident) return;
		if (this.page <= this.pageCount) {
			this.getgoodlist(this.page);
		}
	},
	mixins: [http],

	methods: {
		/**
		 * 获取商品列表
		 */
		getgoodlist(page) {
			this.isPopup = false;
			var params = {
				category_id: this.categoryId,
				brand_id: this.brandId,
				obyzd: this.order,
				st: this.st,
				page: page,
				mipe: this.minPrice,
				mape: this.maxPrice,
				attr: this.attr,
				spec: this.spec,
				page_size: this.pageSize,
				search_text: this.searchText,
				type: 'selected'
			};
			if (this.isLoad) {
				this.isLoad = false;
				this.sendRequest({
					url: 'System.Distribution.distributionGoodsList',
					data: params,
					success: res => {
						if (res.code == 0) {
							this.ident = true;
							var list = res.data.data;
							this.pageCount = res.data.page_count; //总页数

							if (list.length > 0) {
								if (page == 1) {
									this.goodsList = list;
								} else if (page > 1) {
									this.goodsList = this.goodsList.concat(list);
								}
								this.page++;
								this.goodsList.forEach(function(item) {
									item.goods_commission.distribution_commission = parseFloat(item.goods_commission.distribution_commission).toFixed(2);
								});
							} else if (list.length == 0 && page == 1) {
								this.goodsList = [];
								this.isEmpty = true;
							}
							this.isLoad = true;
							if (this.$refs.loadingCover == undefined) return;
							this.$refs.loadingCover.hide();
						}
					}
				});
			}
		},
		// 获取分类信息
		getGoodsCategoryList() {
			this.sendRequest({
				url: 'System.Goods.goodsCategoryTree',
				success: res => {
					if (res.code == 0) {
						var list = res.data;
						list.forEach((item, index) => {
							if (item.child_list.length > 0) {
								item.child_list.forEach((em, dex) => {
									if (this.categoryId == item.category_id || this.categoryId == em.category_id) {
										this.classId = index;
									}
								});
							}
						});
						this.goodsCategoryList = res.data;
					}
				}
			});
		},
		delSave() {
			var goods_id_str = '';
			this.goodsList.forEach(function(item) {
				if (item.checked) {
					goods_id_str += item.goods_id + ',';
				}
			});
			goods_id_str = goods_id_str.substring(0, goods_id_str.length - 1);
			if (goods_id_str == '') {
				this.$util.showToast({
					title: '请选择推广商品'
				});
				return;
			}
			if (this.isLoad) {
				this.isLoad = false;
				this.sendRequest({
					url: 'System.Distribution.deletePromoterGoods',
					data: { goods_id_str: goods_id_str },
					success: res => {
						if (res.code == 0) {
							this.$util.showToast({ title: '删除成功' });
							for (var i = 0; i < this.goodsList.length; ) {
								if (this.goodsList[i].checked) {
									this.goodsList.splice(i, 1);
									if (this.goodsList.length == 0) {
										this.goodsList = [];
										this.isEmpty = true;
									}
									i = 0;
									continue;
								}
								i++;
							}
						} else {
							this.$util.showToast({ title: '删除失败' });
						}
						this.isLoad = true;
					}
				});
			}
		},
		// 排序
		filtrateSort(event) {
			var sort = event.currentTarget.dataset.sort;
			var order_type = event.currentTarget.dataset.orderType;
			if (order_type != undefined && sort != undefined) {
				this.sortType = !this.sortType;
				this.st = sort;
				this.order = order_type;
			} else {
				this.st = '';
				this.order = '';
			}
			this.isPopup = !this.isPopup;
			this.getgoodlist(1);
		},
		checkbox(index) {
			this.goodsList[index].checked = !this.goodsList[index].checked;
			this.goodsList.push({});
			this.goodsList.pop();
			let checkedNUm = 0;
			this.goodsList.forEach(item => {
				if (item.checked) checkedNUm += 1;
			});
			this.checkAll = checkedNUm == this.goodsList.length;
		},
		/**
		 * 全选
		 */
		allElection(checked) {
			if (typeof checked == 'boolean') {
				this.checkAll = checked;
			} else {
				this.checkAll = !this.checkAll;
			}
			if (this.goodsList.length) {
				this.goodsList.forEach(item => {
					item.checked = this.checkAll;
				});
			}
		},
		checkboxno() {
			this.$util.showToast({
				title: '该商品已在推广商城中'
			});
		},
		toggleType(type) {
			if (this.popupType == type) {
				this.isPopup = !this.isPopup;
			} else {
				this.popupType = type;
				this.isPopup = true;
			}
		},
		delShow() {
			this.isEdit = !this.isEdit;
		},
		//推广店铺点击一级分类
		firstCategory(index) {
			if (index == -1) {
				this.categoryId = '';
				this.classId = -1;
				this.getgoodlist(1);
			} else {
				this.classId = index;
			}
		},
		//点击二级分类
		fxCategoryGoods(one, two) {
			this.categoryId = this.goodsCategoryList[one].child_list[two].category_id;
			this.getgoodlist(1);
		}
	}
};
</script>

<style lang="scss">
@import '../public/css/goods.scss';
</style>
