import Config from './config.js'
import md5 from './md5.min.js'

export default {
  methods: {
	parameter_encrypt(arys) {
	  		let newkey = Object.keys(arys).sort();
	  		let newObj = {};
	  		let str_data = '';
	  		//let md5_mi = ''
	  		for (let i = 0; i < newkey.length; i++) {
	  			newObj[newkey[i]] = arys[newkey[i]];
	  			if (i == 0) {
	  				str_data = newkey[i] + '=' + arys[newkey[i]]
	  			} else if (i == newkey.length - 1) {
	  				str_data += '&' + newkey[i] + '=' + arys[newkey[i]] + `&${Config.privateKey}`
	  			} else {
	  				str_data += '&' + newkey[i] + '=' + arys[newkey[i]]
	  			}
	  			
	  		}
	  
	  		return md5(str_data);
	  
	 },
    sendRequest(params) {

      /*params.domainType
       0.没有定义默认用storeage保存的cdn api 域名 
       1.表示用参数里传递的domain域名
       2 或者其他,都用config.js 里配置的域名
      */
     
      if(params.domainType==undefined || params.domainType ==""){
			   params.domainType =0;
		   }
      let cdndomain;
      			if(params.domainType == 0 && uni.getStorageSync('cdndomain')!=""&&uni.getStorageSync('cdndomain')!=undefined){
      				cdndomain = uni.getStorageSync('cdndomain'); 
      			}
      			else if(params.domainType == 1 && params.domain!=undefined &&params.domain!=""){
      				 //cdndomain = "https://"+params.domain;
      				 cdndomain = params.domain;
      			}
      			else{
      			 cdndomain = Config.baseUrl;
      			}
      			// #ifdef H5
      var domain = window.location.hostname;
      // #endif

      //let pmethod = params.data != undefined ? 'POST' : 'GET', // 请求方式
      let method = params.method != undefined ? params.method : "GET",//如果默认没有特殊请求,就用GET的方法

        url = cdndomain + '/api.php?method=' + params.url, // 请求路径
        data = {
          token: uni.getStorageSync('token'),
          //private_key: Config.privateKey,
          v_:Config.myversion,
          t_:new Date().getTime(),
          // #ifdef H5
          is_h5: 1,
          //apidomain: cdndomain,
          domain: domain,
          // #endif
          // #ifdef APP-PLUS
          is_app: 1,
          // #endif
        };
      // 参数
	  if (params.data != undefined) Object.assign(data, params.data);
	  let sign = {bsign: this.parameter_encrypt(data)};
	  Object.assign(data, sign);
      if (params.async === false) {
        //同步
        return new Promise((resolve, reject) => {
          uni.request({
            url: url,
            method: method,
            data: data,
            sslVerify: false,
            header: params.header || {
              'content-type': 'application/x-www-form-urlencoded;application/json'
            },
            dataType: params.dataType || 'json',
            responseType: params.responseType || 'text',
            success: (res) => {
              resolve(JSON.parse(res.data));
            },
            fail: (res) => {
              reject(res);
            },
            complete: (res) => {
              reject(res);
            }
          });
        });
      } else {
        //异步
        uni.request({
          url: url,
          method: method,
          sslVerify: false,
          data: data,
          header: params.header || {
            //'content-type': 'application/x-www-form-urlencoded;application/json'
            'Content-Type': 'application/x-www-form-urlencoded'
          },
          dataType: params.dataType || 'json',
          responseType: params.responseType || 'text',
          success: (res) => {
            // console.log('-=========res-====',res.data);
            typeof params.success == 'function' && params.success(JSON.parse(res.data));
          },
          fail: (res) => {
            typeof params.fail == 'function' && params.fail(res);
          },
          complete: (res) => {
            typeof params.complete == 'function' && params.complete(res);
          }
        });
      }
    }
  }
}
