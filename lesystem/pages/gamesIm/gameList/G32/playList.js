import buyDataHandler from '@/common/js/buyDataHandler.js'

/**
 * A : 单列表，n 选 m
 * B : 两个列表。组合
 */


export default {

	"2249": {
		name:'前二直选复式',
		playType: "F",
		titleArr: ["第一位", '第二位'],
		isShowSort: false,
		dataHandler: (d, sortArr) => {
			let obj = buyDataHandler.createBuyObj()
			let arr = buyDataHandler.sortDataByTitleArr(d, sortArr)
			let handlerArr = buyDataHandler.getCombination(arr)
			obj.len = handlerArr.length
			obj.money = obj.len * 2 * obj.rate * obj.ratio
			obj.numStr = arr.join('|')
			obj.orderStr = arr.join('|')
			if (handlerArr.length !== 0 && handlerArr[0].length === 2) {
				return obj
			}
		},
		addToBasketRandom: () => {
			let obj = buyDataHandler.createBuyObj()
			let numArr = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11']

			let arr = buyDataHandler.createNoReaptRandomNum_2(2, numArr)
			obj.numStr = arr.join('|')
			obj.orderStr = arr.join('|')
			return obj
		}
	},


	"2250": {
		playType: "C",
		dataHandler: (str) => {
			return buyDataHandler.danshiDH_1({
				str,
				lenLimit: 2,
			})
		},
		createObj: (handlerArr) => {
			let obj = buyDataHandler.createBuyObj()
			obj.numStr = handlerArr
				.join('|')
				.replace(/\,/g, '')
				.replace(/\|/g, ',');
			obj.orderStr = handlerArr.join('|');
			return obj
		},
		addToBasket: (arr) => {
			let obj = buyDataHandler.createBuyObj()

			obj.numStr = arr.join('|')
			obj.orderStr = arr.join('|')
			return obj
		},
		addToBasketRandom: () => {
			let numArr = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11']
			let arr = buyDataHandler.createNoReaptRandomNum_2(2, numArr)
			let obj = buyDataHandler.createBuyObj()
			obj.numStr = arr.join(',')
			obj.orderStr = arr.join(',')
			return obj
		}
	},

	"2251": {
		name: '组选',
		playType: "D",
		titleArr: ['组选'],
		lenLimit: 2,
		dataHandler: ({
			selectedObj,
			len
		}) => {
			let res = buyDataHandler.fn2({
				selectedObj,
				len,
				lenLimit: 2
			})

			let obj = buyDataHandler.createBuyObj()
			let temArr = [];
			for (const [key, value] of Object.entries(selectedObj)) {
				value.forEach(item => {
					temArr.push(item.num);
				});
			}
			obj.numStr = temArr.join('|')
			obj.orderStr = temArr.join('|')
			let s = buyDataHandler.combinatorialNumber(len, 2)
			let money = buyDataHandler.handlerMoneyDecimal(s * 2 * obj.rate * obj.ratio);
			obj.len = s
			obj.money = money

			return obj
		},
		addToBasketRandom: () => {
			let numArr = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11']
			let obj = buyDataHandler.createBuyObj();
			let {
				rate,
				ratio
			} = obj;
			let arr = buyDataHandler.createNoReaptRandomNum_2(2, numArr)
			obj.numStr = arr.join('|')
			obj.orderStr = arr.join('|')
			obj.len = 1;
			obj.money = buyDataHandler.handlerMoneyDecimal(2 * rate * ratio);

			return obj
		}
	},


	"2252": {
		playType: "C",
		dataHandler: (str) => {
			return buyDataHandler.danshiDH_1({
				str,
				lenLimit: 2,
			})
		},
		addToBasket: (arr) => {
			let obj = buyDataHandler.createBuyObj()

			obj.numStr = arr.join('|')
			obj.orderStr = arr.join('|')
			return obj
		},
		createObj: (handlerArr) => {
			let obj = buyDataHandler.createBuyObj()
			obj.numStr = handlerArr
				.join('|')
				.replace(/\,/g, '')
				.replace(/\|/g, ',');
			obj.orderStr = handlerArr.join('|');
			return obj
		},
		addToBasketRandom: () => {
			let numArr = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11']
			let arr = buyDataHandler.createNoReaptRandomNum_2(2, numArr)
			let obj = buyDataHandler.createBuyObj()
			obj.numStr = arr.join(',')
			obj.orderStr = arr.join(',')
			return obj
		}
	},


	"2253": {
		name:'不定胆',
		playType: "D",
		titleArr: ['前三位'],
		lenLimit: 1,
		dataHandler: ({
			selectedObj,
			len
		}) => {

			let obj = buyDataHandler.createBuyObj()

			let arr = Object.values(selectedObj)
			let temArr = []
			arr[0].forEach(item => {
				temArr.push(item.num)
			})

			let {
				rate,
				ratio
			} = obj

			let money = len * 2 * rate * ratio
			let s = len
			obj.money = money
			obj.len = s
			obj.numStr = temArr.join('|')
			obj.orderStr = temArr.join('|')

			return obj
		},
		addToBasketRandom: () => {
			let obj = FB(1)
			return obj
		}
	},

	"2254": {
		name:'定位胆',
		playType: "A",
		titleArr: ['第一位', '第二位', '第三位', '第四位', '第五位'],
		isShowSort: false,
		
		dataHandler: (d, sortArr) => {
			let obj = buyDataHandler.createBuyObj()
			let arr = buyDataHandler.sortDataByTitleArr(d, sortArr)

			let handlerArr = buyDataHandler.getCombination(arr)
			obj.len = handlerArr.length
			obj.money = obj.len * 2 * obj.rate * obj.ratio
			obj.numStr = arr.join('|')
			obj.orderStr = arr.join('|')
			if (handlerArr.length !== 0 && handlerArr[0].length === 5) {
				return obj
			}
		},
	},


	"2255": {
		name:'定单双',
		playType: "E",
		titleArr: ['定单双'],
		divideData: (arr) => {
			let dataArr = []
			arr.forEach(item => {
				item.N1 = item.N.split('_')[1]
				dataArr.push(item)
			});
			dataArr.sort((a, b) => b.N1.slice(0, 1) - a.N1.slice(0, 1))
			return dataArr
		}
	},
	"2256": {
		name:'猜中位',
		playType: "E",
		titleArr: ['猜中位'],
		divideData: (arr) => {
			let temArr = []
			arr.forEach(item => {
				let innerArr = item.N.split('_')[1].split(',')
				innerArr.forEach(n => {
					let obj = JSON.parse(JSON.stringify(item))
					obj.N1 = '0' + n
					temArr.push(obj)
				})
			})
			temArr.sort((a, b) => a.N1 - b.N1)
			return temArr
		}
	},

	"2257": {
		playType: "C",
		dataHandler: (str) => {
			return buyDataHandler.danshiDH_1({
				str,
				lenLimit: 1,
			})
		},
		createObj: (handlerArr) => {
			let obj = buyDataHandler.createBuyObj()
			obj.numStr = handlerArr
				.join('|')
				.replace(/\,/g, '')
				.replace(/\|/g, ',');
			obj.orderStr = handlerArr.join('|');
			return obj
		},
		addToBasket: (arr) => {
			let obj = buyDataHandler.createBuyObj()
			obj.numStr = arr.join('|')
			obj.orderStr = arr.join('|')
			return obj
		},
		addToBasketRandom: () => {
			let numArr = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11']
			let arr = buyDataHandler.createNoReaptRandomNum_2(1, numArr)
			let obj = buyDataHandler.createBuyObj()
			obj.numStr = arr.join(',')
			obj.orderStr = arr.join(',')
			return obj
		}
	},
	"2258": {
		playType: "C",
		dataHandler: (str) => {
			return buyDataHandler.danshiDH_1({
				str,
				lenLimit: 2,
			})
		},
		createObj: (handlerArr) => {
			let obj = buyDataHandler.createBuyObj()
			obj.numStr = handlerArr
				.join('|')
				.replace(/\,/g, '')
				.replace(/\|/g, ',');
			obj.orderStr = handlerArr.join('|');
			return obj
		},
		addToBasket: (arr) => {
			let obj = buyDataHandler.createBuyObj()
			obj.numStr = arr.join('|')
			obj.orderStr = arr.join('|')
			return obj
		},
		addToBasketRandom: () => {
			let numArr = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11']
			let arr = buyDataHandler.createNoReaptRandomNum_2(2, numArr)
			let obj = buyDataHandler.createBuyObj()
			obj.numStr = arr.join(',')
			obj.orderStr = arr.join(',')
			return obj
		}
	},
	"2259": {
		playType: "C",
		dataHandler: (str) => {
			let obj = buyDataHandler.danshiDH_1({
				str,
				lenLimit: 3,
			})
			return obj
		},
		createObj: (handlerArr) => {
			let obj = buyDataHandler.createBuyObj()
			obj.numStr = handlerArr
				.join('|')
				.replace(/\,/g, '')
				.replace(/\|/g, ',');
			obj.orderStr = handlerArr.join('|');
			return obj
		},

		addToBasketRandom: () => {
			let numArr = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11']
			let arr = buyDataHandler.createNoReaptRandomNum_2(3, numArr)
			let obj = buyDataHandler.createBuyObj()
			obj.numStr = arr.join(',')
			obj.orderStr = arr.join(',')
			return obj
		}
	},
	"2260": {
		playType: "C",
		dataHandler: (str) => {
			return buyDataHandler.danshiDH_1({
				str,
				lenLimit: 4,
			})
		},
		createObj: (handlerArr) => {
			let obj = buyDataHandler.createBuyObj()
			obj.numStr = handlerArr
				.join('|')
				.replace(/\,/g, '')
				.replace(/\|/g, ',');
			obj.orderStr = handlerArr.join('|');
			return obj
		},
		addToBasket: (arr) => {
			let obj = buyDataHandler.createBuyObj()
			obj.numStr = arr.join('|')
			obj.orderStr = arr.join('|')
			return obj
		},
		addToBasketRandom: () => {
			let numArr = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11']
			let arr = buyDataHandler.createNoReaptRandomNum_2(4, numArr)
			let obj = buyDataHandler.createBuyObj()
			obj.numStr = arr.join(',')
			obj.orderStr = arr.join(',')
			return obj
		}
	},
	"2261": {
		playType: "C",
		dataHandler: (str) => {
			return buyDataHandler.danshiDH_1({
				str,
				lenLimit: 5,
			})
		},
		createObj: (handlerArr) => {
			let obj = buyDataHandler.createBuyObj()
			obj.numStr = handlerArr
				.join('|')
				.replace(/\,/g, '')
				.replace(/\|/g, ',');
			obj.orderStr = handlerArr.join('|');
			return obj
		},
		addToBasket: (arr) => {
			let obj = buyDataHandler.createBuyObj()
			obj.numStr = arr.join('|')
			obj.orderStr = arr.join('|')
			return obj
		},
		addToBasketRandom: () => {
			let numArr = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11']
			let arr = buyDataHandler.createNoReaptRandomNum_2(5, numArr)
			let obj = buyDataHandler.createBuyObj()
			obj.numStr = arr.join(',')
			obj.orderStr = arr.join(',')
			return obj
		}
	},
	"2262": {
		playType: "C",
		dataHandler: (str) => {
			return buyDataHandler.danshiDH_1({
				str,
				lenLimit: 6,
			})
		},
		createObj: (handlerArr) => {
			let obj = buyDataHandler.createBuyObj()
			obj.numStr = handlerArr
				.join('|')
				.replace(/\,/g, '')
				.replace(/\|/g, ',');
			obj.orderStr = handlerArr.join('|');
			return obj
		},
		addToBasket: (arr) => {
			let obj = buyDataHandler.createBuyObj()
			obj.numStr = arr.join('|')
			obj.orderStr = arr.join('|')
			return obj
		},
		addToBasketRandom: () => {
			let numArr = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11']
			let arr = buyDataHandler.createNoReaptRandomNum_2(6, numArr)
			let obj = buyDataHandler.createBuyObj()
			obj.numStr = arr.join(',')
			obj.orderStr = arr.join(',')
			return obj
		}
	},

	"2263": {
		playType: "C",
		dataHandler: (str) => {
			return buyDataHandler.danshiDH_1({
				str,
				lenLimit: 7,
			})
		},
		createObj: (handlerArr) => {
			let obj = buyDataHandler.createBuyObj()
			obj.numStr = handlerArr
				.join('|')
				.replace(/\,/g, '')
				.replace(/\|/g, ',');
			obj.orderStr = handlerArr.join('|');
			return obj
		},
		addToBasket: (arr) => {
			let obj = buyDataHandler.createBuyObj()
			obj.numStr = arr.join('|')
			obj.orderStr = arr.join('|')
			return obj
		},
		addToBasketRandom: () => {
			let numArr = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11']
			let arr = buyDataHandler.createNoReaptRandomNum_2(7, numArr)
			let obj = buyDataHandler.createBuyObj()
			obj.numStr = arr.join(',')
			obj.orderStr = arr.join(',')
			return obj
		}
	},

	"2264": {
		playType: "C",
		dataHandler: (str) => {
			return buyDataHandler.danshiDH_1({
				str,
				lenLimit: 8,
			})
		},
		createObj: (handlerArr) => {
			let obj = buyDataHandler.createBuyObj()
			obj.numStr = handlerArr
				.join('|')
				.replace(/\,/g, '')
				.replace(/\|/g, ',');
			obj.orderStr = handlerArr.join('|');
			return obj
		},
		addToBasket: (arr) => {
			let obj = buyDataHandler.createBuyObj()
			obj.numStr = arr.join('|')
			obj.orderStr = arr.join('|')
			return obj
		},
		addToBasketRandom: () => {
			let numArr = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11']
			let arr = buyDataHandler.createNoReaptRandomNum_2(8, numArr)
			let obj = buyDataHandler.createBuyObj()
			obj.numStr = arr.join(',')
			obj.orderStr = arr.join(',')
			return obj
		}
	},

	"2265": {
		"playType": "D",
		"titleArr": ['选一中一'],
		dataHandler: ({
			selectedObj,
			len
		}) => {
			let obj = buyDataHandler.createBuyObj()
			let arr = Object.values(selectedObj)
			let temArr = []
			arr[0].forEach(item => {
				temArr.push(item.num)
			})
			let {
				rate,
				ratio
			} = obj
			let money = buyDataHandler.handlerMoneyDecimal(len * 2 * rate * ratio)
			obj.money = money
			obj.len = len
			obj.numStr = temArr.join('|')
			obj.orderStr = temArr.join('|')
			return obj
		},
		addToBasketRandom: () => {
			let numArr = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11']
			let obj = buyDataHandler.createBuyObj();
			let {
				rate,
				ratio
			} = obj;
			let str = buyDataHandler.createNoReaptRandomNum_2(1, numArr);
			obj.len = 1;
			obj.money = buyDataHandler.handlerMoneyDecimal(2 * rate * ratio);
			obj.numStr = str.join('');
			obj.orderStr = str.join('');
			return obj
		}
	},
	"2266": {
		name: '二中二',
		playType: "D",
		titleArr: ['选二中二'],
		lenLimit: 2,
		dataHandler: ({
			selectedObj,
			len
		}) => {
			let obj = FA(selectedObj, len, 2)
			return obj
		},
		addToBasketRandom: () => {
			let obj = FB(2)
			return obj
		}
	},
	"2267": {
		name: '三中三',
		playType: "D",
		titleArr: ['选三中三'],
		lenLimit: 3,
		dataHandler: ({
			selectedObj,
			len
		}) => {
			let obj = FA(selectedObj, len, 3)
			return obj
		},
		addToBasketRandom: () => {
			let obj = FB(3)
			return obj
		}
	},
	"2268": {
		name: '四中四',
		playType: "D",
		titleArr: ['选四中四'],
		lenLimit: 4,
		dataHandler: ({
			selectedObj,
			len
		}) => {
			let obj = FA(selectedObj, len, 4)
			return obj
		},
		addToBasketRandom: () => {
			let obj = FB(4)
			return obj
		}
	},

	"2269": {
		name: '五中五',
		playType: "D",
		titleArr: ['选五中五'],
		lenLimit: 5,
		dataHandler: ({
			selectedObj,
			len
		}) => {
			let obj = FA(selectedObj, len, 5)
			return obj
		},
		addToBasketRandom: () => {
			let obj = FB(5)
			return obj
		}
	},
	"2270": {
		name: '六中五',
		playType: "D",
		titleArr: ['选六中五'],
		lenLimit: 6,
		dataHandler: ({
			selectedObj,
			len
		}) => {
			let obj = FA(selectedObj, len, 6)
			return obj
		},
		addToBasketRandom: () => {
			let obj = FB(6)
			return obj
		}
	},
	"2271": {
		name: '七中五',
		playType: "D",
		titleArr: ['选七中五'],
		lenLimit: 7,
		dataHandler: ({
			selectedObj,
			len
		}) => {
			let obj = FA(selectedObj, len, 7)
			return obj
		},
		addToBasketRandom: () => {
			let obj = FB(7)
			return obj
		}
	},

	"2272": {
		name: '八中五',
		playType: "D",
		titleArr: ['选八中五'],
		lenLimit: 8,
		dataHandler: ({
			selectedObj,
			len
		}) => {
			let obj = FA(selectedObj, len, 8)
			return obj
		},
		addToBasketRandom: () => {
			let obj = FB(8)
			return obj
		}
	},






	"2245": {
		name:'前三直选复式',
		playType: "F",
		titleArr: ["第一位", '第二位', '第三位'],
		isShowSort: false,
		dataHandler: (d, sortArr) => {
			let obj = buyDataHandler.createBuyObj()
			let arr = buyDataHandler.sortDataByTitleArr(d, sortArr)
			let handlerArr = buyDataHandler.getCombination(arr)
			obj.len = handlerArr.length
			obj.money = obj.len * 2 * obj.rate * obj.ratio
			obj.numStr = arr.join('|')
			obj.orderStr = arr.join('|')
			
			if (handlerArr.length !== 0 && handlerArr[0].length === 3) {
				
				
				return obj
			}
		},
		addToBasketRandom: () => {
			let obj = buyDataHandler.createBuyObj()
			let numArr = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11']

			let arr = buyDataHandler.createNoReaptRandomNum_2(3, numArr)
			obj.numStr = arr.join('|')
			obj.orderStr = arr.join('|')
			return obj
		}
	},
	"2247": {
		"playType": "D",
		"titleArr": ['组选'],
		lenLimit: 3,
		dataHandler: ({
			selectedObj,
			len
		}) => {
			let res = buyDataHandler.fn2({
				selectedObj,
				len,
				lenLimit: 3
			})

			let obj = buyDataHandler.createBuyObj()
			let temArr = [];
			for (const [key, value] of Object.entries(selectedObj)) {
				value.forEach(item => {
					temArr.push(item.num);
				});
			}
			obj.numStr = temArr.join('|')
			obj.orderStr = temArr.join('|')
			let s = buyDataHandler.combinatorialNumber(len, 3)
			let money = buyDataHandler.handlerMoneyDecimal(s * 2 * obj.rate * obj.ratio);
			obj.len = s
			obj.money = money

			return obj
		},
		addToBasketRandom: () => {
			let numArr = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11']
			let obj = buyDataHandler.createBuyObj();
			let {
				rate,
				ratio
			} = obj;
			let arr = buyDataHandler.createNoReaptRandomNum_2(3, numArr)
			obj.numStr = arr.join('|')
			obj.orderStr = arr.join('|')
			obj.len = 1;
			obj.money = buyDataHandler.handlerMoneyDecimal(2 * rate * ratio);

			return obj
		}
	},
	"2246": {
		playType: "C",
		dataHandler: (str) => {
			return buyDataHandler.danshiDH_1({
				str,
				lenLimit: 3,
			})
		},
		createObj: (handlerArr) => {
			let obj = buyDataHandler.createBuyObj()
			obj.numStr = handlerArr
				.join('|')
				.replace(/\,/g, '')
				.replace(/\|/g, ',');
			obj.orderStr = handlerArr.join('|');
			return obj
		},
		addToBasket: (arr) => {
			let obj = buyDataHandler.createBuyObj()

			obj.numStr = arr.join('|')
			obj.orderStr = arr.join('|')
			return obj
		},
		addToBasketRandom: () => {
			let numArr = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11']
			let arr = buyDataHandler.createNoReaptRandomNum_2(3, numArr)
			let obj = buyDataHandler.createBuyObj()
			obj.numStr = arr.join(',')
			obj.orderStr = arr.join(',')
			return obj
		}
	},


	"2248": {
		playType: "C",
		// lenLimit: 6,
		dataHandler: (str) => {
			return buyDataHandler.danshiDH_1({
				str,
				lenLimit: 3,
			})
		},
		createObj: (handlerArr) => {
			let obj = buyDataHandler.createBuyObj()
			obj.numStr = handlerArr
				.join('|')
				.replace(/\,/g, '')
				.replace(/\|/g, ',');
			obj.orderStr = handlerArr.join('|');
			return obj
		},
		addToBasket: (arr) => {
			let obj = buyDataHandler.createBuyObj()

			obj.numStr = arr.join('|')
			obj.orderStr = arr.join('|')
			return obj
		},
		addToBasketRandom: () => {
			let numArr = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11']
			let arr = buyDataHandler.createNoReaptRandomNum_2(3, numArr)
			let obj = buyDataHandler.createBuyObj()
			obj.numStr = arr.join(',')
			obj.orderStr = arr.join(',')
			return obj
		}
	},


}

let numArr = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11']

function dashiAddRandom(m) {
	let obj = buyDataHandler.createBuyObj()
	let i = m
	let temArr = []
	while (i--) {
		let n = buyDataHandler.createNoReaptRandomNum_1(1)
		temArr.push(n)
	}
	obj.numStr = temArr.join(',')
	obj.orderStr = temArr.join('')
	return obj
}


function FA(selectedObj, len, n) {
	let obj = buyDataHandler.createBuyObj()
	let temArr = [];
	for (const [key, value] of Object.entries(selectedObj)) {
		value.forEach(item => {
			temArr.push(item.num);
		});
	}
	obj.numStr = temArr.join('|')
	obj.orderStr = temArr.join('|')
	let s = buyDataHandler.combinatorialNumber(len, n)
	let money = buyDataHandler.handlerMoneyDecimal(s * 2 * obj.rate * obj.ratio);
	obj.len = s
	obj.money = money
	return obj
}

function FB(n) {
	let numArr = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11']
	let obj = buyDataHandler.createBuyObj();
	let {
		rate,
		ratio
	} = obj;
	let arr = buyDataHandler.createNoReaptRandomNum_2(n, numArr)
	obj.numStr = arr.join('|')
	obj.orderStr = arr.join('|')
	obj.len = 1;
	obj.money = buyDataHandler.handlerMoneyDecimal(2 * rate * ratio);
	return obj
}
