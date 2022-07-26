import Config from './config.js'
import md5 from './md5.min.js'
export default function parameter_encrypt(arys) {
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
}