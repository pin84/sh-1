import buyDataHandler from '@/common/js/buyDataHandler.js'

/**
 * A : 单列表，n 选 m
 * B : 两个列表。组合
 */


export default {

	"猜前九单式": {
		"playType": "C",
		lenLimit: 4,
		dataHandler: (str) => {
			return buyDataHandler.danshiDH({
				str,
				lenLimit: 9,
			})
		},
		addToBasket: (arr) => {
			let obj = buyDataHandler.createBuyObj()
			obj.numStr = arr.join('|')
			obj.orderStr = arr.join('_')
			return obj
		},
		addToBasketRandom: () => {
			return dashiAddRandom(9)
		}
	},

	"猜前八单式": {
		"playType": "C",
		lenLimit: 4,
		dataHandler: (str) => {
			return buyDataHandler.danshiDH({
				str,
				lenLimit: 8,
			})
		},
		addToBasket: (arr) => {
			let obj = buyDataHandler.createBuyObj()
			obj.numStr = arr.join('|')
			obj.orderStr = arr.join('_')
			return obj
		},
		addToBasketRandom: () => {
			return dashiAddRandom(8)
		}
	},


	"猜前七单式": {
		"playType": "C",
		lenLimit: 4,
		dataHandler: (str) => {
			return buyDataHandler.danshiDH({
				str,
				lenLimit: 7,
			})
		},
		addToBasket: (arr) => {
			let obj = buyDataHandler.createBuyObj()
			obj.numStr = arr.join('|')
			obj.orderStr = arr.join('_')
			return obj
		},
		addToBasketRandom: () => {
			return dashiAddRandom(7)
		}
	},


	"猜前六单式": {
		"playType": "C",
		lenLimit: 4,
		dataHandler: (str) => {
			return buyDataHandler.danshiDH({
				str,
				lenLimit: 6,
			})
		},
		addToBasket: (arr) => {
			let obj = buyDataHandler.createBuyObj()
			obj.numStr = arr.join('|')
			obj.orderStr = arr.join('_')
			return obj
		},
		addToBasketRandom: () => {
			return dashiAddRandom(6)
		}
	},

	"猜前十复式": {
		"playType": "D",
		"titleArr": ['第一', '第二', '第三', '第四', '第五', '第六', '第七', '第八', '第九', '第十'],
		isShowSort: false,
		dataHandler: (d, sortArr) => {
			let obj = buyDataHandler.createBuyObj()
			let arr = buyDataHandler.sortDataByTitleArr(d, sortArr)
			let handlerArr = buyDataHandler.getCombination(arr)
			obj.len = handlerArr.length
			obj.money = obj.len * 2 * obj.rate * obj.ratio
			obj.numStr = arr.join('|')
			obj.orderStr = arr.join('|')
			if (handlerArr.length !== 0 && handlerArr[0].length === 10) {
				return obj
			}
		},
		addToBasketRandom: () => {
			let obj = buyDataHandler.createBuyObj()
			let temArr = buyDataHandler.createNoReaptRandomNum_1(10)
			obj.numStr = temArr.join('|')
			obj.orderStr = temArr.join('|')
			return obj
		}
	},
	"猜前九复式": {
		"playType": "D",
		"titleArr": ['第一', '第二', '第三', '第四', '第五', '第六', '第七', '第八', '第九'],
		isShowSort: false,
		dataHandler: (d, sortArr) => {
			let obj = buyDataHandler.createBuyObj()
			let arr = buyDataHandler.sortDataByTitleArr(d, sortArr)
			let handlerArr = buyDataHandler.getCombination(arr)
			obj.len = handlerArr.length
			obj.money = obj.len * 2 * obj.rate * obj.ratio
			obj.numStr = arr.join('|')
			obj.orderStr = arr.join('|')
			if (handlerArr.length !== 0 && handlerArr[0].length === 9) {
				return obj
			}
		},
		addToBasketRandom: () => {
			let obj = buyDataHandler.createBuyObj()
			let temArr = buyDataHandler.createNoReaptRandomNum_1(9)
			obj.numStr = temArr.join('|')
			obj.orderStr = temArr.join('|')
			return obj
		}
	},
	"猜前八复式": {
		"playType": "D",
		"titleArr": ['第一', '第二', '第三', '第四', '第五', '第六', '第七', '第八'],
		isShowSort: false,
		dataHandler: (d, sortArr) => {
			let obj = buyDataHandler.createBuyObj()
			let arr = buyDataHandler.sortDataByTitleArr(d, sortArr)
			let handlerArr = buyDataHandler.getCombination(arr)
			obj.len = handlerArr.length
			obj.money = obj.len * 2 * obj.rate * obj.ratio
			obj.numStr = arr.join('|')
			obj.orderStr = arr.join('|')
			if (handlerArr.length !== 0 && handlerArr[0].length === 8) {
				return obj
			}
		},
		addToBasketRandom: () => {
			let obj = buyDataHandler.createBuyObj()
			let temArr = buyDataHandler.createNoReaptRandomNum_1(8)
			obj.numStr = temArr.join('|')
			obj.orderStr = temArr.join('|')
			return obj
		}
	},
	"猜前七复式": {
		"playType": "D",
		"titleArr": ['第一', '第二', '第三', '第四', '第五', '第六', '第七'],
		isShowSort: false,
		dataHandler: (d, sortArr) => {
			let obj = buyDataHandler.createBuyObj()
			let arr = buyDataHandler.sortDataByTitleArr(d, sortArr)
			let handlerArr = buyDataHandler.getCombination(arr)
			obj.len = handlerArr.length
			obj.money = obj.len * 2 * obj.rate * obj.ratio
			obj.numStr = arr.join('|')
			obj.orderStr = arr.join('|')
			if (handlerArr.length !== 0 && handlerArr[0].length === 7) {
				return obj
			}
		},
		addToBasketRandom: () => {
			let obj = buyDataHandler.createBuyObj()
			let temArr = buyDataHandler.createNoReaptRandomNum_1(7)
			obj.numStr = temArr.join('|')
			obj.orderStr = temArr.join('|')
			return obj
		}
	},
	"猜前六复式": {
		"playType": "D",
		"titleArr": ['第一', '第二', '第三', '第四', '第五', '第六'],
		isShowSort: false,
		dataHandler: (d, sortArr) => {
			let obj = buyDataHandler.createBuyObj()
			let arr = buyDataHandler.sortDataByTitleArr(d, sortArr)
			let handlerArr = buyDataHandler.getCombination(arr)


			obj.len = handlerArr.length
			obj.money = obj.len * 2 * obj.rate * obj.ratio
			obj.numStr = arr.join('|')
			obj.orderStr = arr.join('|')
			if (handlerArr.length !== 0 && handlerArr[0].length === 6) {
				return obj
			}
		},
		addToBasketRandom: () => {
			let obj = buyDataHandler.createBuyObj()
			let temArr = buyDataHandler.createNoReaptRandomNum_1(6)
			obj.numStr = temArr.join('|')
			obj.orderStr = temArr.join('|')
			return obj
		}
	},




	"猜冠军": {
		playType: 'A',
		titleArr: ['猜冠军'],
		addToBasketRandom: () => {
			let obj = buyDataHandler.createBuyObj()
			let n = buyDataHandler.createRandomNum(1, 10)

			if (n < 10) {
				n = '0' + n
			}
			obj.orderStr = n
			obj.numStr = n

			return obj
		},
		handlerData: (selected) => {
			let temArr = []
			for (let [key, value] of Object.entries(selected)) {
				value.forEach(item => temArr.push(item.num))
			}
			let len = temArr.length

			let obj = buyDataHandler.createBuyObj()
			obj.len = len
			obj.money = buyDataHandler.handlerMoneyDecimal(len * obj.ratio * obj.rate * 2)
			obj.numStr = temArr.join(',')
			obj.orderStr = temArr.join(',')
			return obj
		}
	},
	"猜前二复式": {
		"playType": "B",
		"titleArr": ["冠军", '亚军'],
		limit1: 1,
		limit2: 1,
		dataHandler: ({
			arr1,
			arr2,
			positionLen
		}) => {
			let res = buyDataHandler.zhuxuan(arr1, arr2, 1, 1)
			return res
		},
		addToBasketRandom: () => {
			let obj = buyDataHandler.createBuyObj()
			let numArr = buyDataHandler.createNoReaptRandomNum_1(2)

			obj.numStr = numArr.join('|')
			obj.orderStr = numArr.join('|')
			return obj
		}
	},

	"猜前二单式": {
		"playType": "C",
		lenLimit: 4,
		dataHandler: (str) => {
			return buyDataHandler.danshiDH({
				str,
				lenLimit: 2,
			})
		},
		addToBasket: (arr) => {
			let obj = buyDataHandler.createBuyObj()
			obj.numStr = arr.join('|')
			obj.orderStr = arr.join('_')
			return obj
		},
		addToBasketRandom: () => {
			return dashiAddRandom(2)
		}
	},

	"猜前三复式": {
		"playType": "D",
		"titleArr": ['冠军', '亚军', '季军'],
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
			let temArr = buyDataHandler.createNoReaptRandomNum_1(3)
			obj.numStr = temArr.join('|')
			obj.orderStr = temArr.join('|')
			return obj
		}
	},

	"猜前三单式": {
		"playType": "C",
		lenLimit: 4,
		dataHandler: (str) => {
			return buyDataHandler.danshiDH({
				str,
				lenLimit: 3,
			})
		},
		addToBasket: (arr) => {
			let obj = buyDataHandler.createBuyObj()
			obj.numStr = arr.join('|')
			obj.orderStr = arr.join('_')
			return obj
		},
		addToBasketRandom: () => {
			return dashiAddRandom(3)
		}
	},

	"猜前四复式": {
		"playType": "D",
		"titleArr": ['第一', '第二', '第三', '第四'],
		isShowSort: false,
		dataHandler: (d, sortArr) => {
			let obj = buyDataHandler.createBuyObj()
			let arr = buyDataHandler.sortDataByTitleArr(d, sortArr)
			let handlerArr = buyDataHandler.getCombination(arr)
			obj.len = handlerArr.length
			obj.money = obj.len * 2 * obj.rate * obj.ratio
			obj.numStr = arr.join('|')
			obj.orderStr = arr.join('|')
			if (handlerArr.length !== 0 && handlerArr[0].length === 4) {
				return obj
			}
		},
		addToBasketRandom: () => {
			let obj = buyDataHandler.createBuyObj()
			let temArr = buyDataHandler.createNoReaptRandomNum_1(4)
			obj.numStr = temArr.join('|')
			obj.orderStr = temArr.join('|')
			return obj
		}
	},


	"猜前四单式": {
		"playType": "C",
		lenLimit: 4,
		dataHandler: (str) => {
			return buyDataHandler.danshiDH({
				str,
				lenLimit: 4,
			})
		},
		addToBasket: (arr) => {
			let obj = buyDataHandler.createBuyObj()
			obj.numStr = arr.join('|')
			obj.orderStr = arr.join('_')
			return obj
		},
		addToBasketRandom: () => {
			return dashiAddRandom(4)
		}
	},
	"猜前五复式": {
		"playType": "D",
		"titleArr": ['第一', '第二', '第三', '第四', '第五'],
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
		addToBasketRandom: () => {
			let obj = buyDataHandler.createBuyObj()
			let temArr = buyDataHandler.createNoReaptRandomNum_1(5)
			obj.numStr = temArr.join('|')
			obj.orderStr = temArr.join('|')
			return obj
		}
	},

	"猜前五单式": {
		"playType": "C",
		lenLimit: 4,
		dataHandler: (str) => {
			return buyDataHandler.danshiDH({
				str,
				lenLimit: 5,
			})
		},
		addToBasket: (arr) => {
			let obj = buyDataHandler.createBuyObj()
			obj.numStr = arr.join('|')
			obj.orderStr = arr.join('_')
			return obj
		},
		addToBasketRandom: () => {
			return dashiAddRandom(5)
		}
	},

	"定位胆": {
		"playType": "E",
		"titleArr": ['第一', '第二', '第三', '第四', '第五', '第六', '第七', '第八', '第九', '第十'],
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

}


function dashiAddRandom(m) {
	let obj = buyDataHandler.createBuyObj()
	let temArr = buyDataHandler.createNoReaptRandomNum_1(m)
	obj.numStr = temArr.join(',')
	obj.orderStr = temArr.join('')
	return obj
}