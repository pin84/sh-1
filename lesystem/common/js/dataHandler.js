export default {


	zhuhe(arr = ['万', '千', '百', '十', '个']) {
		let res = []
		let len = arr.length
		for(let i = 0 ;i<len;i++){
			for(let j=i+1;j<len;j++){
				res.push(arr[i]+arr[j])
			}
		}
		return res
	},
	zhuhe_1(arr = ['万', '千', '百', '十', '个']) {
		let res = []
		let len = arr.length
		for(let i = 0 ;i<len;i++){
			for(let j=i+1;j<len;j++){
			for(let m=j+1;m<len;m++){
				res.push(arr[i]+arr[j]+arr[m])
			}
				
			}
		}
		return res
	},


}
