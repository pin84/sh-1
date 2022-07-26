import Vue from 'vue'
import router from './newRouter'
// import router from './router' //切换旧页面
import store from './store' // VUEX
import App from './App.vue'

import './plugins/vueamap.js' //  vue-amap 高德地图
import './plugins/element.js' //  elemnt组件
import { post, get, put, deletes, toJson, isEmpty } from './plugins/http.js' // 请求方式中间件
//import {api} from './plugins/api.js'  // API 链接
import gapi from '@/views/games/assets/api.js'
import { formatDate, formatGoods } from './plugins/function.js' // 公共方法
import '../public/fonts/iconfont.css' // 阿里图标
import '../public/fonts/iconfont.js' // 阿里图标
import '../public/style.css' // 公共CSS
import SiteConfig from './plugins/config.js'

// import '../public/iconCss.css' // 公共CSS
// import '../public/common.css' // 公共CSS


import '../public/element-variables.scss'

import skeleton from 'vue-skeleton-component' // 骨架


import md5 from 'js-md5'; // md5

import myAudio from '@/plugins/audio.js'


let d = new Date().getDate() + 1
console.log('------', d, new Date());
//buyhandler
import buyOptions from '@/views/games/assets/buyOptions.js'
import buyDataHandler from '@/views/games/assets/buyDataHandler.js'
import gutils from '@/views/games/assets/utils.js'

//定义全局变量
//Vue.prototype.$api=api;
Vue.prototype.$post = post;
Vue.prototype.$get = get;
Vue.prototype.$put = put;
Vue.prototype.$delete = deletes;
Vue.prototype.$toJson = toJson;
Vue.prototype.$isEmpty = isEmpty;
Vue.prototype.$md5 = md5;
Vue.prototype.$formatGoods = formatGoods;
Vue.prototype.$buyOptions = buyOptions;
Vue.prototype.$BDH = buyDataHandler;
Vue.prototype.$gapi = gapi;
Vue.prototype.$gutils = gutils;
Vue.prototype.SiteConfig = SiteConfig;

Vue.prototype.$myAudio = myAudio;


// 时间格式化
Vue.filter('formatDate', function(time) {
    var date = new Date(time * 1000);
    return formatDate(date, 'yyyy-MM-dd hh:mm');
});

Vue.filter('formatDateAuto', function(time, str) {
    var date = new Date(time * 1000);
    return formatDate(date, str);
});

Vue.config.productionTip = false

Vue.use(skeleton); // 骨架

//const defaultTitle = '乐彩彩票-最安全的网上购彩平台'; 
const defaultTitle = 'ZH-最安全可靠的娱乐城';
router.beforeEach((to, from, next) => {
    if (to.matched.length == 0) {
        next({ path: "/" })
    }
    document.title = to.meta.title ? to.meta.title : defaultTitle;
    next();
});

// 跳转后返回顶部
router.afterEach(() => {
    window.scrollTo(0, 0);
})

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')