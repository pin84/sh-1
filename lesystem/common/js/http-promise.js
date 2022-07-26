import Config from './config.js'
import encrypt from './parameter_encrypt.js'
export default function http(params) {
  /*params.domainType
   0.没有定义默认用storeage保存的cdn api 域名 
   1.表示用参数里传递的domain域名
   2 或者其他,都用config.js 里配置的域名
  */

  if (!params) {
    params = {}
  }


  if (params.domainType == undefined || params.domainType == "") {
    params.domainType = 0;
  }
  let cdndomain;
  //
  if(params.domainType == 0 && uni.getStorageSync('cdndomain')!=""&&uni.getStorageSync('cdndomain')!=undefined){
  	cdndomain = uni.getStorageSync('cdndomain'); 
  }
  else if (params.domainType == 1 && params.domain != undefined && params.domain != "") {
    cdndomain = params.domain;
  } else {
    cdndomain = Config.baseUrl;
  }
  // #ifdef H5
  var domain = window.location.hostname;
  // #endif

	//let pmethod = params.data != undefined ? 'POST' : 'GET', // 请求方式
	let method = params.method != undefined ? params.method : "GET", //如果默认没有特殊请求,就用GET的方法
		url = cdndomain + '/api.php?method=' + params.url, // 请求路径
		data = {
			token: uni.getStorageSync('token'),
			private_key: Config.privateKey,
			//is_uniapp: 1,
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
  let sign = {bsign: encrypt(data)};
  Object.assign(data, sign);
  
  let isShowLoading = true
  if(params.isShowLoading === false){
  	isShowLoading = params.isShowLoading
  }

  params.async = false //强制使用Promise
  if (params.async === false) {
    //同步
    if (isShowLoading) {
      uni.showLoading({
        title: '加载中'
      })
    }

    return new Promise((resolve, reject) => {
      uni.request({
        url: url,
        method: method,
        // timeout:15000,
        data: data,
        sslVerify: false,
        header: params.header || {
          'content-type': 'application/x-www-form-urlencoded;application/json'
        },
        dataType: params.dataType || 'json',
        responseType: params.responseType || 'text',
        // success: (res) => {
        //   if (isShowLoading) {
        //     uni.hideLoading();
        //   }
        //   resolve(JSON.parse(res.data));
        // },
        // fail: (res) => {
        //   if (isShowLoading) {
        //     uni.hideLoading();
        //   }
        //   console.log('-fail--',res);
        //   reject(res);
        // },
        // complete: (res) => {
        //   if (isShowLoading) {
        //     uni.hideLoading();
        //   }
        //   console.log('-complete--',res);
        //   reject(res);
        // }
      }).then(res => {
        if(isShowLoading){
          uni.hideLoading();
        }
        if (res[1]) {
          resolve(JSON.parse(res[1].data))
        } else {
          // uni.showLoading({
          //   title: '加载中'
          // })

          resolve({
            code: -4000, res
          })
        }
      }).catch((e)=>{
        uni.hideLoading();
        resolve(false)
      })
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
