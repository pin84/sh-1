import buyDataHandler from '@/common/js/buyDataHandler.js'

export default {

	1385: {
		name: '奇偶盘',
		playType: "A",
		titleArr: ['奇偶盘'],
		originalDataHd: (arr) => {
			let dataArr = []
			arr.forEach(item => {

				item.N1 = item.N.split('_')[1].slice(0, 1)

				if (item.I == 21119) {
					item.N2 = '奇=偶'
				}
				if (item.I == 21283) {
					item.N2 = '奇>偶'
				}
				if (item.I == 21284) {
					item.N2 = '奇<偶'
				}
				dataArr.push(item)
			});

			return dataArr
		},
	},
	1384: {
		name: '上下盘',
		playType: "A",
		titleArr: ['上下盘'],
		originalDataHd: (arr) => {
			let dataArr = []
			arr.forEach(item => {

				item.N1 = item.N.split('_')[1].slice(0, 1)

				if (item.I == 21118) {
					item.N2 = '上=下'
				}
				if (item.I == 21281) {
					item.N2 = '上>下'
				}
				if (item.I == 21282) {
					item.N2 = '上<下'
				}
				dataArr.push(item)
			});

			return dataArr
		},
	},
	1383: {
		name: '和值大小单双',
		playType: "A",
		titleArr: ['大小单双'],
		originalDataHd: (arr) => {
			let dataArr = []
			arr.forEach(item => {
				item.N1 = item.N.split('_')[1].split('').join('.')
				dataArr.push(item)
			});
			return dataArr
		},
	},
	1382: {
		name: '和值大小',
		playType: "A",
		titleArr: ['和值大小'],
		originalDataHd: (arr) => {
			let dataArr = []
			arr.forEach(item => {
				if (item.I == 21116) {
					item.N1 = '和'
					item.N2 = '810'
				} else {
					item.N1 = item.N.split('_')[1]
				}
				if (item.I == 21276) {
					item.N2 = '811-1410'
				}
				if (item.I == 21277) {
					item.N2 = '210-809'
				}
				dataArr.push(item)
			});

			return dataArr
		},
	},

	1381: {
		name: '和值单双',
		playType: "A",
		titleArr: ['和值单双'],
		isShowOdds: false,
		originalDataHd: (arr) => {
			let dataArr = []
			arr.forEach(item => {
				item.N1 = item.N.split('_')[1]
				dataArr.push(item)
			});
			return dataArr
		},
	},

	1380: {
		name: '和值大小单双',
		playType: "A",
		titleArr: ['大小单双'],
		originalDataHd: (arr) => {
			let dataArr = []
			arr.forEach(item => {
				item.N1 = item.N.split('_')[1].split('').join('.')
				dataArr.push(item)
			});
			return dataArr
		},
	},
	1379: {
		name: '奇偶盘',
		playType: "A",
		titleArr: ['奇偶盘'],
		originalDataHd: (arr) => {
			let dataArr = []
			arr.forEach(item => {

				item.N1 = item.N.split('_')[1].slice(0, 1)

				if (item.I == 21113) {
					item.N2 = '奇=偶'
				}
				if (item.I == 21270) {
					item.N2 = '奇>偶'
				}
				if (item.I == 21271) {
					item.N2 = '奇<偶'
				}
				dataArr.push(item)
			});

			return dataArr
		},
	},
	1378: {
		name: '上下盘',
		playType: "A",
		titleArr: ['上下盘'],
		originalDataHd: (arr) => {
			let dataArr = []
			arr.forEach(item => {

				item.N1 = item.N.split('_')[1].slice(0, 1)

				if (item.I == 21112) {
					item.N2 = '上=下'
				}
				if (item.I == 21268) {
					item.N2 = '上>下'
				}
				if (item.I == 21269) {
					item.N2 = '上<下'
				}
				dataArr.push(item)
			});

			return dataArr
		},
	},
	1377: {
		name: '和值大小',
		playType: "A",
		titleArr: ['和值大小'],
		originalDataHd: (arr) => {
			let dataArr = []
			arr.forEach(item => {
				if (item.I == 21111) {
					item.N1 = '和'
					item.N2 = '810'
				} else {
					item.N1 = item.N.split('_')[1]
				}
				if (item.I == 21266) {
					item.N2 = '811-1410'
				}
				if (item.I == 21267) {
					item.N2 = '210-809'
				}
				dataArr.push(item)
			});

			return dataArr
		},
	},
	1376: {
		name: '和值单双',
		playType: "A",
		titleArr: ['和值单双'],
		isShowOdds: false,
		originalDataHd: (arr) => {
			let dataArr = []
			arr.forEach(item => {
				item.N1 = item.N.split('_')[1]
				dataArr.push(item)
			});
			return dataArr
		},
	},
	
	1375: {
		name: '任选七',
		playType: "B",
		cbLen: 7,
		isShowTitle: false,
		addToBasket:(arr)=>{
			let obj = buyDataHandler.createBuyObj();
			
			let s = buyDataHandler.combinatorialNumber(arr.length,7)
			obj.len = s
			obj.numStr = arr.join('|');
			obj.orderStr = arr.join('|');
			return obj
		},
		addToBasketRandom:(numArr)=>{
			let obj = buyDataHandler.createBuyObj()
			let rArr = buyDataHandler.createNoReaptRandomNum_2(7,numArr)
			obj.numStr = rArr.join('|')
			obj.orderStr = rArr.join('|')
			return obj
		}
	},
	
	
	
	1374: {
		name: '任选六',
		playType: "B",
		cbLen: 6,
		isShowTitle: false,
		addToBasket:(arr)=>{
			let obj = buyDataHandler.createBuyObj();
			
			let s = buyDataHandler.combinatorialNumber(arr.length,6)
			obj.len = s
			obj.numStr = arr.join('|');
			obj.orderStr = arr.join('|');
			return obj
		},
		addToBasketRandom:(numArr)=>{
			let obj = buyDataHandler.createBuyObj()
			let rArr = buyDataHandler.createNoReaptRandomNum_2(6,numArr)
			obj.numStr = rArr.join('|')
			obj.orderStr = rArr.join('|')
			return obj
		}
	},
	
	
	1373: {
		name: '任选五',
		playType: "B",
		cbLen: 5,
		isShowTitle: false,
		addToBasket:(arr)=>{
			let obj = buyDataHandler.createBuyObj();
			
			let s = buyDataHandler.combinatorialNumber(arr.length,5)
			obj.len = s
			obj.numStr = arr.join('|');
			obj.orderStr = arr.join('|');
			return obj
		},
		addToBasketRandom:(numArr)=>{
			let obj = buyDataHandler.createBuyObj()
			let rArr = buyDataHandler.createNoReaptRandomNum_2(5,numArr)
			obj.numStr = rArr.join('|')
			obj.orderStr = rArr.join('|')
			return obj
		}
	},
	
	
	
	1372: {
		name: '任选四',
		playType: "B",
		cbLen: 4,
		isShowTitle: false,
		addToBasket:(arr)=>{
			let obj = buyDataHandler.createBuyObj();
			
			let s = buyDataHandler.combinatorialNumber(arr.length,4)
			obj.len = s
			obj.numStr = arr.join('|');
			obj.orderStr = arr.join('|');
			return obj
		},
		addToBasketRandom:(numArr)=>{
			let obj = buyDataHandler.createBuyObj()
			let rArr = buyDataHandler.createNoReaptRandomNum_2(4,numArr)
			obj.numStr = rArr.join('|')
			obj.orderStr = rArr.join('|')
			return obj
		}
	},
	
	
	1371: {
		name: '任选三',
		playType: "B",
		cbLen: 3,
		isShowTitle: false,
		addToBasket:(arr)=>{
			let obj = buyDataHandler.createBuyObj();
			
			let s = buyDataHandler.combinatorialNumber(arr.length,3)
			obj.len = s
			obj.numStr = arr.join('|');
			obj.orderStr = arr.join('|');
			return obj
		},
		addToBasketRandom:(numArr)=>{
			let obj = buyDataHandler.createBuyObj()
			let rArr = buyDataHandler.createNoReaptRandomNum_2(3,numArr)
			obj.numStr = rArr.join('|')
			obj.orderStr = rArr.join('|')
			return obj
		}
	},


	1370: {
		name: '任选二',
		playType: "B",
		cbLen: 2,
		isShowTitle: false,
		addToBasket:(arr)=>{
			let obj = buyDataHandler.createBuyObj();
			
			let s = buyDataHandler.combinatorialNumber(arr.length,2)
			obj.len = s
			obj.numStr = arr.join('|');
			obj.orderStr = arr.join('|');
			return obj
		},
		addToBasketRandom:(numArr)=>{
			let obj = buyDataHandler.createBuyObj()
			let rArr = buyDataHandler.createNoReaptRandomNum_2(2,numArr)
			obj.numStr = rArr.join('|')
			obj.orderStr = rArr.join('|')
			return obj
		}
	},
	1369: {
		name: '任选一',
		playType: "B",
		cbLen: 1,
		isShowTitle: false,
		addToBasket:(arr)=>{
			let obj = buyDataHandler.createBuyObj();
			obj.len = arr.length
			obj.numStr = arr.join('|');
			obj.orderStr = arr.join('|');
			return obj
		},
		addToBasketRandom:(numArr)=>{
			let obj = buyDataHandler.createBuyObj()
			let rArr = buyDataHandler.createNoReaptRandomNum_2(1,numArr)
			obj.numStr = rArr.join('|')
			obj.orderStr = rArr.join('|')
			return obj
		}
	},

}

