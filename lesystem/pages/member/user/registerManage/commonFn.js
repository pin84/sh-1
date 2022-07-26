import util from '../../../../common/js/util.js'


export default {
	checkV(obj, i, checkArr) {
		let v = obj.kickbak
		let str = `${checkArr[i].name} 奖金组返点只能为数字且最多保留1位小数`;
		if (v === '' || v === null) {
			util.showToast({
				title: str
			});
			return false;
		}
		if (isNaN(v)) {
			util.showToast({
				title: str
			});
			return false;
		}

		if (String(v).split('.')[1] && String(v).split('.')[1].length > 1) {
			util.showToast({
				title: str
			});
			return false;
		}
		if (Number(v) > Number(obj.maxKickback) || Number(v) < Number(obj.minKickback)) {
			util.showToast({
				title:`${checkArr[i].name} 奖金组返点范围错误`
			});
			return false;

		}
		return true;
	},

	//返点检查 
	checkFandian(obj) {
		let flag = true
		
		try{
			obj.forEach((item, index) => {
				let {
					kickbak,
					maxKickback,
					minKickback
				} = item
				let f =  this.checkV(item, index, obj)
				if (!f) {
					flag = false
					console.log(forEach.break)
				}
			
			})
		}catch(e){
		}
		
	
		return flag
	}
}
