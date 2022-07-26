import Vue from 'vue'
import App from './App'
import store from './store/index.js'
import Util from './common/js/util.js'
import api from './common/api/api.js'
import http from './common/js/http-promise.js'
import buyDataHandler from './common/js/buyDataHandler.js'
import dataHandler from './common/js/dataHandler.js'
import buyOptions from '@/pages/gamesIm/gameList/buyOptions.js'
import SiteConfig from './common/js/config.js'

//声音
import myAudio from './common/js/audio.js' 
Vue.prototype.$store = store
Vue.prototype.SiteConfig = SiteConfig; 

Vue.config.productionTip = false


console.log('999ffffsdf99');


Vue.prototype.$util = Util;
Vue.prototype.$api = api;
Vue.prototype.$http = http;
Vue.prototype.$buyDataHandler  = buyDataHandler;
Vue.prototype.$dataHandler  = dataHandler;
Vue.prototype.$buyOptions  = buyOptions;
Vue.prototype.$myAudio  = myAudio;


// console.log('--svn-');


// Vue.prototype.checkIsWebsiteOpen = function(){
// 	this.sendRequest({
// 		url: 'System.Params.getIndexParams',
// 		success: res => {
// 			let data = res.data;
// 			this.isMaintain = data.IsMaintain;
// 			if(this.isMaintain==1){
// 				this.$util.redirectTo('/pages/maintain/maintain',{},'','reLaunch');
// 			}
// 		}
// 	});
	
// }

console.log(store)



App.mpType = 'app'

const app = new Vue({
	...App
})
app.$mount()
