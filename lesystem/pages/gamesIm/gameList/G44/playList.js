import buyDataHandler from '@/common/js/buyDataHandler.js'

export default {
	3377: {
		name: '百家乐',
		playType: "E2",
		titleArr: ['百家乐','百家乐'],
	},
	
	3375: {
		name: '牛牛',
		playType: "E1",
		titleArr: ['牛牛'],
	},
	

	
	3183: {
		name: '龙虎万千',
		playType: "E",
		titleArr: ['龙虎', '和值'],
	},
	
	
	
	2542: {
		name: '任四组选12',
		playType: "F1",
		titleArr: ['二重号', '单号'],
		isShowSort: false,
		positonLenLimit:4,
		dataHandler: (d, sortArr) => {
			let arr = Object.values(d)
			if (arr.length < 2 || arr[0].length < 1 || arr[1].length < 2) return
			let allArr = buyDataHandler.sortDataByTitleArr(d, sortArr)
			let obj = zhuxuanHandler(allArr[0], allArr[1],2)
			obj.numStr = allArr.join('|')
			obj.orderStr = allArr.join('|').replace(/\,/g, '').replace(/\|/g, ',')
			return obj
		},
		addToBasketRandom: (randomArr) => {
			let len = randomArr.length -1
			let obj = buyDataHandler.createBuyObj()
			let {N,I} = randomArr[buyDataHandler.createRandomNum(0,len)]
			let arr = buyDataHandler.createNoReaptRandomNumReArr(3)
			obj.numStr = arr[0] + '|' + arr.slice(1).join(',')
			obj.orderStr = arr[0] + ',' + arr.slice(1).join('')
			obj.gName = N
			obj.I = I
			return obj
		}
	},
	
	2540: {
		name: '任四组选4',
		playType: "F1",
		titleArr: ['三重号', '单号'],
		isShowSort: false,
		positonLenLimit:4,
		dataHandler: (d, sortArr) => {
			let arr = Object.values(d)
			if (arr.length < 2 || arr[0].length < 1 || arr[1].length < 1) return
			let allArr = buyDataHandler.sortDataByTitleArr(d, sortArr)
			let obj = zhuxuanHandler(allArr[0], allArr[1],1)
			obj.numStr = allArr.join('|')
			obj.orderStr = allArr.join('|').replace(/\,/g, '').replace(/\|/g, ',')
			return obj
		},
		addToBasketRandom: (randomArr) => {
			let len = randomArr.length -1
			let obj = buyDataHandler.createBuyObj()
			let {N,I} = randomArr[buyDataHandler.createRandomNum(0,len)]
			let arr = buyDataHandler.createNoReaptRandomNumReArr(2)
			obj.numStr = arr[0] + '|' + arr.slice(1).join(',')
			obj.orderStr = arr[0] + ',' + arr.slice(1).join('')
			obj.gName = N
			obj.I = I
			return obj
		}
	},
	
	2538: {
		name: '任四直选复式',
		playType: "F",
		titleArr: ['万位', '千位', '百位', '十位', '个位'],
		isShowSort: false,
		dataHandler: (d, sortArr, randomArr) => {
			let objArr = fushiRepeatHandler(d, sortArr, randomArr, 4)
			return objArr
		},
		addToBasketRandom: (randomArr) => {
			let obj =  fushiAddRandom(randomArr,4)
			return obj
		}
	},
	
	1363: {
		name: '任三直选复式',
		playType: "F",
		titleArr: ['万位', '千位', '百位', '十位', '个位'],
		isShowSort: false,
		dataHandler: (d, sortArr, randomArr) => {
			let objArr = fushiRepeatHandler(d, sortArr, randomArr, 3)
			return objArr
		},
		addToBasketRandom: (randomArr) => {
			let obj =  fushiAddRandom(randomArr,3)
			return obj
		}
	},

	1356: {
		name: '任二直选复式',
		playType: "F",
		titleArr: ['万位', '千位', '百位', '十位', '个位'],
		isShowSort: false,
		dataHandler: (d, sortArr, randomArr) => {
			let objArr = fushiRepeatHandler(d, sortArr, randomArr, 2)
			return objArr
		},
		addToBasketRandom: (randomArr) => {
			let obj =  fushiAddRandom(randomArr)
			return obj
		}
	},

	1351: {
		name: '前二大小单双',
		playType: "D",
		titleArr: ['百位', '十位'],
		lenLimit: 2,
	},

	1350: {
		name: '后二大小单双',
		playType: "D",
		titleArr: ['十位', '个位'],
		lenLimit: 2,
	},

	1345: {
		name: '定位胆',
		playType: "A",
		titleArr: ['万位', '千位', '百位', '十位', '个位'],
		isShowSort: false,
	},

	2531: {
		name: '前四组合',
		playType: "F",
		titleArr: ['万位', '千位', '百位', '十位'],
		isShowSort: true,
		dataHandler: (d, sortArr) => {
			let obj = fushiHandler(d, sortArr, 4)
			if (!obj) return
			obj.len = obj.len * 4
			obj.money = obj.money * 4
			return obj
		},
	},

	2530: {
		name: '前四复式',
		playType: "F",
		titleArr: ['万位', '千位', '百位', '十位'],
		isShowSort: true,
		dataHandler: (d, sortArr) => {
			return fushiHandler(d, sortArr, 4)
		},
		addToBasketRandom: () => {
			let obj = buyDataHandler.createBuyObj()
			let arr = buyDataHandler.createNoReaptRandomNumReArr(4)
			let str = arr.join(',')
			obj.numStr = str
			obj.orderStr = str
			return obj
		}
	},

	1335: {
		name: '前二直选复式',
		playType: "F",
		titleArr: ["万位", '千位'],
		isShowSort: true,
		dataHandler: (d, sortArr) => {
			return fushiHandler(d, sortArr, 2)
		},
		addToBasketRandom: () => {
			let obj = buyDataHandler.createBuyObj()
			let arr = buyDataHandler.createNoReaptRandomNumReArr(2)
			let str = arr.join(',')
			obj.numStr = str
			obj.orderStr = str
			return obj
		}
	},

	1333: {
		name: '后二直选复式',
		playType: "F",
		titleArr: ['十位', '个位'],
		isShowSort: true,
		dataHandler: (d, sortArr) => {
			return fushiHandler(d, sortArr, 2)
		},
		addToBasketRandom: () => {
			let obj = buyDataHandler.createBuyObj()
			let arr = buyDataHandler.createNoReaptRandomNumReArr(2)
			let str = arr.join(',')
			obj.numStr = str
			obj.orderStr = str
			return obj
		}
	},

	1327: {
		name: '前三直选复式',
		playType: "F",
		titleArr: ['千位', '百位', '十位'],
		isShowSort: true,
		dataHandler: (d, sortArr) => {
			return fushiHandler(d, sortArr, 3)
		},
		addToBasketRandom: () => {
			let obj = buyDataHandler.createBuyObj()
			let arr = buyDataHandler.createNoReaptRandomNumReArr(3)
			let str = arr.join(',')
			obj.numStr = str
			obj.orderStr = str
			return obj
		}
	},

	1320: {
		name: '前三直选复式',
		playType: "F",
		titleArr: ["万位", '千位', '百位'],
		isShowSort: true,
		dataHandler: (d, sortArr) => {
			return fushiHandler(d, sortArr, 3)
		},
		addToBasketRandom: () => {
			let obj = buyDataHandler.createBuyObj()
			let arr = buyDataHandler.createNoReaptRandomNumReArr(3)
			let str = arr.join(',')
			obj.numStr = str
			obj.orderStr = str
			return obj
		}
	},

	1313: {
		name: '后三直选复式',
		playType: "F",
		titleArr: ['百位', '十位', '个位'],
		isShowSort: true,
		dataHandler: (d, sortArr) => {
			return fushiHandler(d, sortArr, 3)
		},
		addToBasketRandom: () => {
			let obj = buyDataHandler.createBuyObj()
			let arr = buyDataHandler.createNoReaptRandomNumReArr(3)
			let str = arr.join(',')
			obj.numStr = str
			obj.orderStr = str
			return obj
		}
	},


	1306: {
		name: '后四复式',
		playType: "F",
		titleArr: ['千位', '百位', '十位', '个位'],
		isShowSort: true,
		dataHandler: (d, sortArr) => {
			return fushiHandler(d, sortArr, 4)
		},
		addToBasketRandom: () => {
			let obj = buyDataHandler.createBuyObj()
			let arr = buyDataHandler.createNoReaptRandomNumReArr(4)
			let str = arr.join(',')
			obj.numStr = str
			obj.orderStr = str
			return obj
		}
	},

	1307: {
		name: '后四组合',
		playType: "F",
		titleArr: ['千位', '百位', '十位', '个位'],
		isShowSort: true,
		dataHandler: (d, sortArr) => {
			let obj = fushiHandler(d, sortArr, 4)
			if (!obj) return
			console.log(obj);
			obj.len = obj.len * 4
			obj.money = obj.money * 4
			return obj
		},
	},

	1298: {
		name: '五星组合',
		playType: "F",
		titleArr: ["万位", '千位', '百位', '十位', '个位'],
		isShowSort: true,
		dataHandler: (d, sortArr) => {
			let obj = fushiHandler(d, sortArr)
			if (!obj) return
			console.log(obj);
			obj.len = obj.len * 5
			obj.money = obj.money * 5
			return obj
		},
	},

	1297: {
		name: '五星复式',
		playType: "F",
		titleArr: ["万位", '千位', '百位', '十位', '个位'],
		isShowSort: true,
		dataHandler: (d, sortArr) => {
			return fushiHandler(d, sortArr)
		},
		addToBasketRandom: () => {
			let obj = buyDataHandler.createBuyObj()
			let arr = buyDataHandler.createNoReaptRandomNumReArr(5)
			let str = arr.join(',')
			obj.numStr = str
			obj.orderStr = str
			return obj
		}
	},

	2535: {
		name: '前四组选4',
		playType: "F",
		titleArr: ["三重号", '单号'],
		isShowSort: false,
		dataHandler: (d, sortArr) => {
			let arr = Object.values(d)
			if (arr.length < 2 || arr[0].length < 1 || arr[1].length < 1) return
			let allArr = buyDataHandler.sortDataByTitleArr(d, sortArr)
			let obj = zhuxuanHandler(allArr[0], allArr[1], 1)
			obj.numStr = allArr[0].join(',') + '|' + allArr[1].join(',')
			obj.orderStr = allArr[0].join('') + ',' + allArr[1].join('')
			return obj
		},
		addToBasketRandom: () => {
			let obj = buyDataHandler.createBuyObj()
			let arr = buyDataHandler.createNoReaptRandomNumReArr(2)
			obj.numStr = arr[0] + '|' + arr.slice(1).join(',')
			obj.orderStr = arr[0] + ',' + arr.slice(1).join('')
			return obj
		}
	},

	2533: {
		name: '前四组选12',
		playType: "F",
		titleArr: ["二重号", '单号'],
		isShowSort: false,
		dataHandler: (d, sortArr) => {
			let arr = Object.values(d)
			if (arr.length < 2 || arr[0].length < 1 || arr[1].length < 2) return
			let allArr = buyDataHandler.sortDataByTitleArr(d, sortArr)
			let obj = zhuxuanHandler(allArr[0], allArr[1], 2)
			obj.numStr = allArr[0].join(',') + '|' + allArr[1].join(',')
			obj.orderStr = allArr[0].join('') + ',' + allArr[1].join('')
			return obj
		},
		addToBasketRandom: () => {
			let obj = buyDataHandler.createBuyObj()
			let arr = buyDataHandler.createNoReaptRandomNumReArr(3)
			obj.numStr = arr[0] + '|' + arr.slice(1).join(',')
			obj.orderStr = arr[0] + ',' + arr.slice(1).join('')
			return obj
		}
	},

	1311: {
		name: '后四组选4',
		playType: "F",
		titleArr: ["三重号", '单号'],
		isShowSort: false,
		dataHandler: (d, sortArr) => {
			let arr = Object.values(d)
			if (arr.length < 2 || arr[0].length < 1 || arr[1].length < 2) return
			let allArr = buyDataHandler.sortDataByTitleArr(d, sortArr)
			let obj = zhuxuanHandler(allArr[0], allArr[1], 1)
			obj.numStr = allArr[0].join(',') + '|' + allArr[1].join(',')
			obj.orderStr = allArr[0].join('') + ',' + allArr[1].join('')
			return obj
		},
		addToBasketRandom: () => {
			let obj = buyDataHandler.createBuyObj()
			let arr = buyDataHandler.createNoReaptRandomNumReArr(2)
			obj.numStr = arr[0] + '|' + arr.slice(1).join(',')
			obj.orderStr = arr[0] + ',' + arr.slice(1).join('')
			return obj
		}
	},

	1309: {
		name: '后四组选12',
		playType: "F",
		titleArr: ["二重号", '单号'],
		isShowSort: false,
		dataHandler: (d, sortArr) => {
			let arr = Object.values(d)
			if (arr.length < 2 || arr[0].length < 1 || arr[1].length < 2) return
			let allArr = buyDataHandler.sortDataByTitleArr(d, sortArr)
			let obj = zhuxuanHandler(allArr[0], allArr[1], 2)
			obj.numStr = allArr[0].join(',') + '|' + allArr[1].join(',')
			obj.orderStr = allArr[0].join('') + ',' + allArr[1].join('')
			return obj
		},
		addToBasketRandom: () => {
			let obj = buyDataHandler.createBuyObj()
			let arr = buyDataHandler.createNoReaptRandomNumReArr(3)
			obj.numStr = arr[0] + '|' + arr.slice(1).join(',')
			obj.orderStr = arr[0] + ',' + arr.slice(1).join('')
			return obj
		}
	},


	1304: {
		name: '组选5',
		playType: "F",
		titleArr: ["四重号", '单号'],
		isShowSort: false,
		dataHandler: (d, sortArr) => {
			let arr = Object.values(d)
			if (arr.length < 2 || arr[0].length < 1 || arr[1].length < 1) return
			let allArr = buyDataHandler.sortDataByTitleArr(d, sortArr)
			let obj = zhuxuanHandler(allArr[0], allArr[1], 1)
			obj.numStr = allArr[0].join(',') + '|' + allArr[1].join(',')
			obj.orderStr = allArr[0].join('') + ',' + allArr[1].join('')
			return obj
		},
		addToBasketRandom: () => {
			let obj = buyDataHandler.createBuyObj()
			let arr = buyDataHandler.createNoReaptRandomNumReArr(2)
			obj.numStr = arr[0] + '|' + arr.slice(1).join(',')
			obj.orderStr = arr[0] + ',' + arr.slice(1).join('')
			return obj
		}
	},


	1303: {
		name: '组选10',
		playType: "F",
		titleArr: ["三重号", '二重号'],
		isShowSort: false,
		dataHandler: (d, sortArr) => {
			let arr = Object.values(d)
			if (arr.length < 2 || arr[0].length < 1 || arr[1].length < 1) return
			let allArr = buyDataHandler.sortDataByTitleArr(d, sortArr)
			let obj = zhuxuanHandler(allArr[0], allArr[1], 1)
			obj.numStr = allArr[0].join(',') + '|' + allArr[1].join(',')
			obj.orderStr = allArr[0].join('') + ',' + allArr[1].join('')
			return obj
		},
		addToBasketRandom: () => {
			let obj = buyDataHandler.createBuyObj()
			let arr = buyDataHandler.createNoReaptRandomNumReArr(2)
			obj.numStr = arr[0] + '|' + arr.slice(1).join(',')
			obj.orderStr = arr[0] + ',' + arr.slice(1).join('')
			return obj
		}
	},


	1302: {
		name: '组选20',
		playType: "F",
		titleArr: ["三重号", '单号'],
		isShowSort: false,
		dataHandler: (d, sortArr) => {
			let arr = Object.values(d)
			if (arr.length < 2 || arr[0].length < 1 || arr[1].length < 2) return
			let allArr = buyDataHandler.sortDataByTitleArr(d, sortArr)
			let obj = zhuxuanHandler(allArr[0], allArr[1], 2)
			obj.numStr = allArr[0].join(',') + '|' + allArr[1].join(',')
			obj.orderStr = allArr[0].join('') + ',' + allArr[1].join('')
			return obj
		},
		addToBasketRandom: () => {
			let obj = buyDataHandler.createBuyObj()
			let arr = buyDataHandler.createNoReaptRandomNumReArr(3)
			obj.numStr = arr[0] + '|' + arr.slice(1).join(',')
			obj.orderStr = arr[0] + ',' + arr.slice(1).join('')
			return obj
		}
	},

	1301: {
		name: '组选30',
		playType: "F",
		titleArr: ["二重号", '单号'],
		isShowSort: false,
		dataHandler: (d, sortArr) => {
			let arr = Object.values(d)
			if (arr.length < 2 || arr[0].length < 2 || arr[1].length < 1) return
			let allArr = buyDataHandler.sortDataByTitleArr(d, sortArr)
			let obj = zhuxuanHandler(allArr[1], allArr[0], 2)
			obj.numStr = allArr[0].join(',') + '|' + allArr[1].join(',')
			obj.orderStr = allArr[0].join('') + ',' + allArr[1].join('')
			return obj
		},
		addToBasketRandom: () => {
			let obj = buyDataHandler.createBuyObj()
			let arr = buyDataHandler.createNoReaptRandomNumReArr(3)
			obj.numStr = arr.slice(1).join(',') + '|' + arr[0]
			obj.orderStr = arr.slice(1).join('') + ',' + arr[0]
			return obj
		}
	},

	1300: {
		name: '组选60',
		playType: "F",
		titleArr: ["二重号", '单号'],
		isShowSort: false,
		dataHandler: (d, sortArr) => {
			let arr = Object.values(d)
			if (arr.length < 2 || arr[0].length < 1 || arr[1].length < 3) return
			let allArr = buyDataHandler.sortDataByTitleArr(d, sortArr)
			let obj = zhuxuanHandler(allArr[0], allArr[1])
			obj.numStr = allArr.join('|')
			obj.orderStr = allArr.join('|').replace(/\,/g, '').replace(/\|/g, ',')
			return obj
		},
		addToBasketRandom: () => {
			let obj = buyDataHandler.createBuyObj()
			let arr = buyDataHandler.createNoReaptRandomNumReArr(4)
			console.log(arr);
			obj.numStr = arr[0] + '|' + arr.slice(1).join(',')
			obj.orderStr = arr[0] + ',' + arr.slice(1).join('')
			return obj
		}
	},

	1355: {
		name: '四季发财',
		playType: "B",
		titleArr: ['四季发财'],
		lenLimit: 1,
		numLen: 10,
		isShowTitle: true,
		dataHandler: (selectedArr) => {
			let s = selectedArr.length
			let obj = buyDataHandler.createBuyObj()
			obj.len = s
			obj.money = buyDataHandler.handlerMoneyDecimal(s * 2 * obj.rate * obj.ratio);
			obj.numStr = selectedArr.join('|')
			obj.orderStr = selectedArr.join(',')
			return obj
		},

		addToBasketRandom: (randomArr) => {
			let obj = buyDataHandler.createBuyObj()
			let arr = buyDataHandler.createNoReaptRandomNumReArr(1)
			obj.len = obj.len
			obj.money = obj.money
			obj.numStr = arr.join('|')
			obj.orderStr = arr.join('')
			return obj
		}
	},



	1354: {
		name: '三星报喜',
		playType: "B",
		titleArr: ['三星报喜'],
		lenLimit: 1,
		numLen: 10,
		isShowTitle: true,
		dataHandler: (selectedArr) => {
			let s = selectedArr.length
			let obj = buyDataHandler.createBuyObj()
			obj.len = s
			obj.money = buyDataHandler.handlerMoneyDecimal(s * 2 * obj.rate * obj.ratio);
			obj.numStr = selectedArr.join('|')
			obj.orderStr = selectedArr.join(',')
			return obj
		},

		addToBasketRandom: (randomArr) => {
			let obj = buyDataHandler.createBuyObj()
			let arr = buyDataHandler.createNoReaptRandomNumReArr(1)
			obj.len = obj.len
			obj.money = obj.money
			obj.numStr = arr.join('|')
			obj.orderStr = arr.join('')
			return obj
		}
	},




	1353: {
		name: '好事成双',
		playType: "B",
		titleArr: ['好事成双'],
		lenLimit: 1,
		numLen: 10,
		isShowTitle: true,
		dataHandler: (selectedArr) => {
			let s = selectedArr.length
			let obj = buyDataHandler.createBuyObj()
			obj.len = s
			obj.money = buyDataHandler.handlerMoneyDecimal(s * 2 * obj.rate * obj.ratio);
			obj.numStr = selectedArr.join('|')
			obj.orderStr = selectedArr.join(',')
			return obj
		},

		addToBasketRandom: (randomArr) => {
			let obj = buyDataHandler.createBuyObj()
			let arr = buyDataHandler.createNoReaptRandomNumReArr(1)
			obj.len = obj.len
			obj.money = obj.money
			obj.numStr = arr.join('|')
			obj.orderStr = arr.join('')
			return obj
		}
	},


	1352: {
		name: '一帆风顺',
		playType: "B",
		titleArr: ['一帆风顺'],
		lenLimit: 1,
		numLen: 10,
		isShowTitle: true,
		dataHandler: (selectedArr) => {
			let s = selectedArr.length
			let obj = buyDataHandler.createBuyObj()
			obj.len = s
			obj.money = buyDataHandler.handlerMoneyDecimal(s * 2 * obj.rate * obj.ratio);
			obj.numStr = selectedArr.join('|')
			obj.orderStr = selectedArr.join(',')
			return obj
		},

		addToBasketRandom: (randomArr) => {
			let obj = buyDataHandler.createBuyObj()
			let arr = buyDataHandler.createNoReaptRandomNumReArr(1)
			obj.len = obj.len
			obj.money = obj.money
			obj.numStr = arr.join('|')
			obj.orderStr = arr.join('')
			return obj
		}
	},


	2534: {
		name: '前四组选6',
		playType: "B",
		titleArr: ['组选6'],
		lenLimit: 2,
		numLen: 10,
		isShowTitle: true,
		dataHandler: (selectedArr) => {
			let s = buyDataHandler.combinatorialNumber(selectedArr.length, 2)
			let obj = buyDataHandler.createBuyObj()
			obj.len = s
			obj.money = buyDataHandler.handlerMoneyDecimal(s * 2 * obj.rate * obj.ratio);
			obj.numStr = selectedArr.join('|')
			obj.orderStr = selectedArr.join(',')
			return obj
		},

		addToBasketRandom: (randomArr) => {
			let obj = buyDataHandler.createBuyObj()
			let arr = buyDataHandler.createNoReaptRandomNumReArr(2)
			obj.len = obj.len
			obj.money = obj.money
			obj.numStr = arr.join('|')
			obj.orderStr = arr.join(',')
			return obj
		}
	},


	2532: {
		name: '前四组选24',
		playType: "B",
		titleArr: ['组选24'],
		lenLimit: 4,
		numLen: 10,
		isShowTitle: true,
		dataHandler: (selectedArr) => {
			let s = buyDataHandler.combinatorialNumber(selectedArr.length, 4)
			let obj = buyDataHandler.createBuyObj()
			obj.len = s
			obj.money = buyDataHandler.handlerMoneyDecimal(s * 2 * obj.rate * obj.ratio);
			obj.numStr = selectedArr.join('|')
			obj.orderStr = selectedArr.join(',')
			return obj
		},

		addToBasketRandom: (randomArr) => {
			let obj = buyDataHandler.createBuyObj()
			let arr = buyDataHandler.createNoReaptRandomNumReArr(4)
			obj.len = obj.len
			obj.money = obj.money
			obj.numStr = arr.join('|')
			obj.orderStr = arr.join(',')
			return obj
		}
	},


	1341: {
		name: '前二组选复式',
		playType: "B",
		titleArr: ['组选'],
		lenLimit: 2,
		numLen: 10,
		isShowTitle: true,
		dataHandler: (selectedArr) => {
			let s = buyDataHandler.combinatorialNumber(selectedArr.length, 2)
			let obj = buyDataHandler.createBuyObj()
			obj.len = s
			obj.money = buyDataHandler.handlerMoneyDecimal(s * 2 * obj.rate * obj.ratio);
			obj.numStr = selectedArr.join('|')
			obj.orderStr = selectedArr.join('')
			return obj
		},

		addToBasketRandom: (randomArr) => {
			let obj = buyDataHandler.createBuyObj()
			let arr = buyDataHandler.createNoReaptRandomNumReArr(2)
			obj.len = obj.len
			obj.money = obj.money
			obj.numStr = arr.join('|')
			obj.orderStr = arr.join('')
			return obj
		}
	},

	1339: {
		name: '后二组选复式',
		playType: "B",
		titleArr: ['组选'],
		lenLimit: 2,
		numLen: 10,
		isShowTitle: true,
		dataHandler: (selectedArr) => {
			let s = buyDataHandler.combinatorialNumber(selectedArr.length, 2)
			let obj = buyDataHandler.createBuyObj()
			obj.len = s
			obj.money = buyDataHandler.handlerMoneyDecimal(s * 2 * obj.rate * obj.ratio);
			obj.numStr = selectedArr.join('|')
			obj.orderStr = selectedArr.join('')
			return obj
		},

		addToBasketRandom: (randomArr) => {
			let obj = buyDataHandler.createBuyObj()
			let arr = buyDataHandler.createNoReaptRandomNumReArr(2)
			obj.len = obj.len
			obj.money = obj.money
			obj.numStr = arr.join('|')
			obj.orderStr = arr.join('')
			return obj
		}
	},

	1349: {
		name: '前三二码不定胆',
		playType: "B",
		titleArr: ['不定胆'],
		lenLimit: 2,
		numLen: 10,
		isShowTitle: true,
		dataHandler: (selectedArr) => {
			let s = buyDataHandler.combinatorialNumber(selectedArr.length, 2)
			let obj = buyDataHandler.createBuyObj()
			obj.len = s
			obj.money = buyDataHandler.handlerMoneyDecimal(s * 2 * obj.rate * obj.ratio);
			obj.numStr = selectedArr.join('|')
			obj.orderStr = selectedArr.join(',')
			return obj
		},

		addToBasketRandom: (randomArr) => {
			let obj = buyDataHandler.createBuyObj()
			let arr = buyDataHandler.createNoReaptRandomNumReArr(2)
			obj.len = obj.len
			obj.money = obj.money
			obj.numStr = arr.join('|')
			obj.orderStr = arr.join(',')
			return obj
		}
	},

	1348: {
		name: '前三一码不定胆',
		playType: "B",
		titleArr: ['不定胆'],
		lenLimit: 1,
		numLen: 10,
		isShowTitle: true,
		dataHandler: (selectedArr) => {
			let s = selectedArr.length
			let obj = buyDataHandler.createBuyObj()
			obj.len = s
			obj.money = buyDataHandler.handlerMoneyDecimal(s * 2 * obj.rate * obj.ratio);
			obj.numStr = selectedArr.join('|')
			obj.orderStr = selectedArr.join('')
			return obj
		},

		addToBasketRandom: (randomArr) => {
			let obj = buyDataHandler.createBuyObj()
			let arr = buyDataHandler.createNoReaptRandomNumReArr(1)
			obj.len = obj.len
			obj.money = obj.money
			obj.numStr = arr.join('|')
			obj.orderStr = arr.join('')
			return obj
		}
	},

	1347: {
		name: '后三二码不定胆',
		playType: "B",
		titleArr: ['不定胆'],
		lenLimit: 2,
		numLen: 10,
		isShowTitle: true,
		dataHandler: (selectedArr) => {
			let s = buyDataHandler.combinatorialNumber(selectedArr.length, 2)
			let obj = buyDataHandler.createBuyObj()
			obj.len = s
			obj.money = buyDataHandler.handlerMoneyDecimal(s * 2 * obj.rate * obj.ratio);
			obj.numStr = selectedArr.join('|')
			obj.orderStr = selectedArr.join(',')
			return obj
		},

		addToBasketRandom: (randomArr) => {
			let obj = buyDataHandler.createBuyObj()
			let arr = buyDataHandler.createNoReaptRandomNumReArr(2)
			obj.len = obj.len
			obj.money = obj.money
			obj.numStr = arr.join('|')
			obj.orderStr = arr.join(',')
			return obj
		}
	},

	1346: {
		name: '后三一码不定胆',
		playType: "B",
		titleArr: ['不定胆'],
		lenLimit: 1,
		numLen: 10,
		isShowTitle: true,
		dataHandler: (selectedArr) => {
			let s = selectedArr.length
			let obj = buyDataHandler.createBuyObj()
			obj.len = s
			obj.money = buyDataHandler.handlerMoneyDecimal(s * 2 * obj.rate * obj.ratio);
			obj.numStr = selectedArr.join('|')
			obj.orderStr = selectedArr.join('')
			return obj
		},

		addToBasketRandom: (randomArr) => {
			let obj = buyDataHandler.createBuyObj()
			let arr = buyDataHandler.createNoReaptRandomNumReArr(1)
			obj.len = obj.len
			obj.money = obj.money
			obj.numStr = arr.join('|')
			obj.orderStr = arr.join('')
			return obj
		}
	},


	1344: {
		name: '前二组选和值',
		playType: "B",
		titleArr: ['和值'],
		lenLimit: 1,
		listStart: 1,
		numLen: 18,
		isShowTitle: false,
		dataHandler: (selectedArr) => {
			let sumArr = []
			selectedArr.forEach(n => {
				let arr = buyDataHandler.twoSumSort(n)
				sumArr.push(arr.length)
			})

			let s = sumArr.reduce((accumulator, currentValue) => {
				return accumulator + currentValue
			}, 0)

			let obj = buyDataHandler.createBuyObj()
			obj.len = s
			obj.money = buyDataHandler.handlerMoneyDecimal(s * 2 * obj.rate * obj.ratio);
			obj.numStr = selectedArr.join('|')
			obj.orderStr = selectedArr.join(',')
			return obj
		}
	},

	1343: {
		name: '后二组选和值',
		playType: "B",
		titleArr: ['和值'],
		lenLimit: 1,
		listStart: 1,
		numLen: 18,
		isShowTitle: false,
		dataHandler: (selectedArr) => {
			let sumArr = []
			selectedArr.forEach(n => {
				let arr = buyDataHandler.twoSumSort(n)
				sumArr.push(arr.length)
			})

			let s = sumArr.reduce((accumulator, currentValue) => {
				return accumulator + currentValue
			}, 0)

			let obj = buyDataHandler.createBuyObj()
			obj.len = s
			obj.money = buyDataHandler.handlerMoneyDecimal(s * 2 * obj.rate * obj.ratio);
			obj.numStr = selectedArr.join('|')
			obj.orderStr = selectedArr.join(',')
			return obj
		}
	},

	1338: {
		name: '后二直选和值',
		playType: "B",
		titleArr: ['和值'],
		lenLimit: 1,
		numLen: 19,
		isShowTitle: false,
		dataHandler: (selectedArr) => {
			let sumArr = []
			selectedArr.forEach(n => {
				let arr = buyDataHandler.twoSum(n)
				sumArr.push(arr.length)
			})

			let s = sumArr.reduce((accumulator, currentValue) => {
				return accumulator + currentValue
			}, 0)

			let obj = buyDataHandler.createBuyObj()
			obj.len = s
			obj.money = buyDataHandler.handlerMoneyDecimal(s * 2 * obj.rate * obj.ratio);
			obj.numStr = selectedArr.join('|')
			obj.orderStr = selectedArr.join(',')
			return obj
		}
	},

	1337: {
		name: '后二直选和值',
		playType: "B",
		titleArr: ['和值'],
		lenLimit: 1,
		numLen: 19,
		isShowTitle: false,
		dataHandler: (selectedArr) => {
			let sumArr = []
			selectedArr.forEach(n => {
				let arr = buyDataHandler.twoSum(n)
				sumArr.push(arr.length)
			})

			let s = sumArr.reduce((accumulator, currentValue) => {
				return accumulator + currentValue
			}, 0)

			let obj = buyDataHandler.createBuyObj()
			obj.len = s
			obj.money = buyDataHandler.handlerMoneyDecimal(s * 2 * obj.rate * obj.ratio);
			obj.numStr = selectedArr.join('|')
			obj.orderStr = selectedArr.join(',')
			return obj
		}
	},


	1328: {
		name: '中三直选和值',
		playType: "B",
		titleArr: ['直选和值'],
		lenLimit: 1,
		numLen: 28,
		isShowTitle: false,
		dataHandler: (selectedArr) => {
			let sumArr = []
			selectedArr.forEach(n => {
				let arr = buyDataHandler.threeSum(n)
				sumArr.push(arr.length)
			})

			let s = sumArr.reduce((accumulator, currentValue) => {
				return accumulator + currentValue
			}, 0)

			let obj = buyDataHandler.createBuyObj()
			obj.len = s
			obj.money = buyDataHandler.handlerMoneyDecimal(s * 2 * obj.rate * obj.ratio);
			obj.numStr = selectedArr.join('|')
			obj.orderStr = selectedArr.join(',')
			return obj
		}
	},

	1332: {
		name: '中三组选和值',
		playType: "B",
		titleArr: ['组选和值'],
		lenLimit: 1,
		listStart: 1,
		numLen: 27,
		isShowTitle: false,
		dataHandler: (selectedArr) => {
			let sumArr = []
			selectedArr.forEach(n => {
				let arr = buyDataHandler.threeSumSort(n)
				sumArr.push(arr.length)
			})

			let s = sumArr.reduce((accumulator, currentValue) => {
				return accumulator + currentValue
			}, 0)

			let obj = buyDataHandler.createBuyObj()
			obj.len = s
			obj.money = buyDataHandler.handlerMoneyDecimal(s * 2 * obj.rate * obj.ratio);
			obj.numStr = selectedArr.join('|')
			obj.orderStr = selectedArr.join(',')
			return obj
		}
	},

	1330: {
		name: '中三组六',
		playType: "B",
		titleArr: ['组六'],
		lenLimit: 1,
		numLen: 10,
		isShowTitle: true,
		dataHandler: (selectedArr) => {
			let s = buyDataHandler.combinatorialNumber(selectedArr.length, 3)
			if (s == 0) return
			let obj = buyDataHandler.createBuyObj()
			obj.len = s
			obj.money = s * 2
			obj.numStr = selectedArr.join('|')
			obj.orderStr = selectedArr.join('')
			return obj
		},
		addToBasketRandom: (randomArr) => {
			let obj = buyDataHandler.createBuyObj()
			let arr = buyDataHandler.createNoReaptRandomNumReArr(3)
			obj.numStr = arr.join('|')
			obj.orderStr = arr.join('')
			return obj
		}
	},

	1329: {
		name: '中三组三',
		playType: "B",
		titleArr: ['组三'],
		lenLimit: 1,
		numLen: 10,
		isShowTitle: true,
		dataHandler: (selectedArr) => {
			let s = buyDataHandler.combinatorialNumber(selectedArr.length, 2)
			if (s == 0) return
			let obj = buyDataHandler.createBuyObj()
			obj.len = s * 2
			obj.money = s * 2 * 2
			obj.numStr = selectedArr.join('|')
			obj.orderStr = selectedArr.join('')
			return obj
		},
		addToBasketRandom: (randomArr) => {
			let obj = buyDataHandler.createBuyObj()
			let arr = buyDataHandler.createNoReaptRandomNumReArr(2)
			obj.len = obj.len * 2
			obj.money = obj.money * 2
			obj.numStr = arr.join('|')
			obj.orderStr = arr.join('')
			return obj
		}
	},

	1323: {
		name: '前三组六',
		playType: "B",
		titleArr: ['组六'],
		lenLimit: 1,
		numLen: 10,
		isShowTitle: true,
		dataHandler: (selectedArr) => {
			let s = buyDataHandler.combinatorialNumber(selectedArr.length, 3)
			if (s == 0) return
			let obj = buyDataHandler.createBuyObj()
			obj.len = s
			obj.money = s * 2
			obj.numStr = selectedArr.join('|')
			obj.orderStr = selectedArr.join('')
			return obj
		},
		addToBasketRandom: (randomArr) => {
			let obj = buyDataHandler.createBuyObj()
			let arr = buyDataHandler.createNoReaptRandomNumReArr(3)
			obj.numStr = arr.join('|')
			obj.orderStr = arr.join('')
			return obj
		}
	},

	1322: {
		name: '前三组三',
		playType: "B",
		titleArr: ['组三'],
		lenLimit: 1,
		numLen: 10,
		isShowTitle: true,
		dataHandler: (selectedArr) => {
			let s = buyDataHandler.combinatorialNumber(selectedArr.length, 2)
			if (s == 0) return
			let obj = buyDataHandler.createBuyObj()
			obj.len = s * 2
			obj.money = s * 2 * 2
			obj.numStr = selectedArr.join('|')
			obj.orderStr = selectedArr.join('')
			return obj
		},
		addToBasketRandom: (randomArr) => {
			let obj = buyDataHandler.createBuyObj()
			let arr = buyDataHandler.createNoReaptRandomNumReArr(2)
			obj.len = obj.len * 2
			obj.money = obj.money * 2
			obj.numStr = arr.join('|')
			obj.orderStr = arr.join('')
			return obj
		}
	},

	1321: {
		name: '前三直选和值',
		playType: "B",
		titleArr: ['直选和值'],
		lenLimit: 1,
		numLen: 28,
		isShowTitle: false,
		dataHandler: (selectedArr) => {
			let sumArr = []
			selectedArr.forEach(n => {
				let arr = buyDataHandler.threeSum(n)
				sumArr.push(arr.length)
			})

			let s = sumArr.reduce((accumulator, currentValue) => {
				return accumulator + currentValue
			}, 0)

			let obj = buyDataHandler.createBuyObj()
			obj.len = s
			obj.money = buyDataHandler.handlerMoneyDecimal(s * 2 * obj.rate * obj.ratio);
			obj.numStr = selectedArr.join('|')
			obj.orderStr = selectedArr.join(',')
			return obj
		}
	},

	1325: {
		name: '前三组选和值',
		playType: "B",
		titleArr: ['组选和值'],
		lenLimit: 1,
		listStart: 1,
		numLen: 27,
		isShowTitle: false,
		dataHandler: (selectedArr) => {
			let sumArr = []
			selectedArr.forEach(n => {
				let arr = buyDataHandler.threeSumSort(n)
				sumArr.push(arr.length)
			})

			let s = sumArr.reduce((accumulator, currentValue) => {
				return accumulator + currentValue
			}, 0)

			let obj = buyDataHandler.createBuyObj()
			obj.len = s
			obj.money = buyDataHandler.handlerMoneyDecimal(s * 2 * obj.rate * obj.ratio);
			obj.numStr = selectedArr.join('|')
			obj.orderStr = selectedArr.join(',')
			return obj
		}
	},

	1318: {
		name: '后三组选和值',
		playType: "B",
		titleArr: ['组选和值'],
		lenLimit: 1,
		listStart: 1,
		numLen: 27,
		isShowTitle: false,
		dataHandler: (selectedArr) => {
			let sumArr = []
			selectedArr.forEach(n => {
				let arr = buyDataHandler.threeSumSort(n)
				sumArr.push(arr.length)
			})

			let s = sumArr.reduce((accumulator, currentValue) => {
				return accumulator + currentValue
			}, 0)

			let obj = buyDataHandler.createBuyObj()
			obj.len = s
			obj.money = buyDataHandler.handlerMoneyDecimal(s * 2 * obj.rate * obj.ratio);
			obj.numStr = selectedArr.join('|')
			obj.orderStr = selectedArr.join(',')
			return obj
		}
	},

	1314: {
		name: '后三直选和值',
		playType: "B",
		titleArr: ['直选和值'],
		lenLimit: 1,
		numLen: 28,
		isShowTitle: false,
		dataHandler: (selectedArr) => {
			let sumArr = []
			selectedArr.forEach(n => {
				let arr = buyDataHandler.threeSum(n)
				sumArr.push(arr.length)
			})

			let s = sumArr.reduce((accumulator, currentValue) => {
				return accumulator + currentValue
			}, 0)

			let obj = buyDataHandler.createBuyObj()
			obj.len = s
			obj.money = buyDataHandler.handlerMoneyDecimal(s * 2 * obj.rate * obj.ratio);
			obj.numStr = selectedArr.join('|')
			obj.orderStr = selectedArr.join(',')
			return obj
		}
	},

	1316: {
		name: '后三组六',
		playType: "B",
		titleArr: ['组六'],
		lenLimit: 1,
		numLen: 10,
		isShowTitle: true,
		dataHandler: (selectedArr) => {
			let s = buyDataHandler.combinatorialNumber(selectedArr.length, 3)
			if (s == 0) return
			let obj = buyDataHandler.createBuyObj()
			obj.len = s
			obj.money = s * 2
			obj.numStr = selectedArr.join('|')
			obj.orderStr = selectedArr.join('')
			return obj
		},
		addToBasketRandom: (randomArr) => {
			let obj = buyDataHandler.createBuyObj()
			let arr = buyDataHandler.createNoReaptRandomNumReArr(3)
			obj.numStr = arr.join('|')
			obj.orderStr = arr.join('')
			return obj
		}
	},

	1315: {
		name: '后三组三',
		playType: "B",
		titleArr: ['组三'],
		lenLimit: 1,
		numLen: 10,
		isShowTitle: true,
		dataHandler: (selectedArr) => {
			let s = buyDataHandler.combinatorialNumber(selectedArr.length, 2)
			if (s == 0) return
			let obj = buyDataHandler.createBuyObj()
			obj.len = s * 2
			obj.money = s * 2 * 2
			obj.numStr = selectedArr.join('|')
			obj.orderStr = selectedArr.join('')
			return obj
		},
		addToBasketRandom: (randomArr) => {
			let obj = buyDataHandler.createBuyObj()
			let arr = buyDataHandler.createNoReaptRandomNumReArr(2)
			obj.len = obj.len * 2
			obj.money = obj.money * 2
			obj.numStr = arr.join('|')
			obj.orderStr = arr.join('')
			return obj
		}
	},

	1310: {
		name: '后四组选6',
		playType: "B",
		titleArr: ['二重号'],
		lenLimit: 1,
		numLen: 10,
		isShowTitle: true,
		dataHandler: (selectedArr) => {
			let s = buyDataHandler.combinatorialNumber(selectedArr.length, 2)
			if (s == 0) return
			let obj = buyDataHandler.createBuyObj()
			obj.len = s
			obj.money = s * 2
			obj.numStr = selectedArr.join('|')
			obj.orderStr = selectedArr.join(',')
			return obj
		},
		addToBasketRandom: (randomArr) => {
			let obj = buyDataHandler.createBuyObj()
			let arr = buyDataHandler.createNoReaptRandomNumReArr(2)
			obj.numStr = arr.join('|')
			obj.orderStr = arr.join(',')
			return obj
		}
	},

	1308: {
		name: '后四组选24',
		playType: "B",
		titleArr: ['组选24'],
		lenLimit: 1,
		numLen: 10,
		isShowTitle: true,
		dataHandler: (selectedArr) => {
			let s = buyDataHandler.combinatorialNumber(selectedArr.length, 4)
			if (s == 0) return
			let obj = buyDataHandler.createBuyObj()
			obj.len = s
			obj.money = s * 2
			obj.numStr = selectedArr.join('|')
			obj.orderStr = selectedArr.join(',')
			return obj
		},
		addToBasketRandom: (randomArr) => {
			let obj = buyDataHandler.createBuyObj()
			let arr = buyDataHandler.createNoReaptRandomNumReArr(4)
			obj.numStr = arr.join('|')
			obj.orderStr = arr.join(',')
			return obj
		}
	},

	1299: {
		name: '组选120',
		playType: "B",
		titleArr: ['组选120'],
		lenLimit: 1,
		numLen: 10,
		isShowTitle: true,
		dataHandler: (selectedArr) => {
			let s = buyDataHandler.combinatorialNumber(selectedArr.length, 5)
			if (s == 0) return
			let obj = buyDataHandler.createBuyObj()
			obj.len = s
			obj.money = s * 2
			obj.numStr = selectedArr.join('|')
			obj.orderStr = selectedArr.join(',')
			return obj
		},
		addToBasketRandom: (randomArr) => {
			let obj = buyDataHandler.createBuyObj()
			let arr = buyDataHandler.createNoReaptRandomNumReArr(5)
			obj.numStr = arr.join('|')
			obj.orderStr = arr.join(',')
			return obj
		}
	},
	2541: {
		name: '组选6',
		playType: "B1",
		titleArr: ['二重号'],
		lenLimit: 1,
		numLen: 10,
		positonLenLimit: 4,
		isShowTitle: true,
		dataHandler: (selectedArr) => {
			let s = buyDataHandler.combinatorialNumber(selectedArr.length, 2)
			if (s == 0) return
			let obj = buyDataHandler.createBuyObj()
			obj.len = s
			obj.money = s * 2
			obj.numStr = selectedArr.join('|')
			obj.orderStr = selectedArr.join(',')
			return obj
		},
		addToBasketRandom: (randomArr) => {
			let obj = buyDataHandler.createBuyObj()
			let len = randomArr.length - 1
			let i = buyDataHandler.createRandomNum(0, len)
			let obj1 = randomArr[i]
			let arr = buyDataHandler.createNoReaptRandomNumReArr(2)
			obj.I = obj1.I
			obj.gName = obj1.N
			obj.numStr = arr.join('|')
			obj.orderStr = arr.join(',')
			return obj
		}
	},

	2543: {
		name: '组选24',
		playType: "B1",
		titleArr: ['单号'],
		lenLimit: 1,
		numLen: 10,
		positonLenLimit: 4,
		isShowTitle: true,
		dataHandler: (selectedArr) => {
			let s = buyDataHandler.combinatorialNumber(selectedArr.length, 4)
			if (s == 0) return
			let obj = buyDataHandler.createBuyObj()
			obj.len = s
			obj.money = s * 2
			obj.numStr = selectedArr.join('|')
			obj.orderStr = selectedArr.join(',')
			return obj
		},
		addToBasketRandom: (randomArr) => {
			let obj = buyDataHandler.createBuyObj()
			let len = randomArr.length - 1
			let i = buyDataHandler.createRandomNum(0, len)
			let obj1 = randomArr[i]
			let arr = buyDataHandler.createNoReaptRandomNumReArr(4)
			obj.I = obj1.I
			obj.gName = obj1.N
			obj.numStr = arr.join('|')
			obj.orderStr = arr.join(',')
			return obj
		}
	},

	1366: {
		name: '任三组六',
		playType: "B1",
		titleArr: ['组六'],
		lenLimit: 1,
		numLen: 10,
		positonLenLimit: 3,
		isShowTitle: true,
		dataHandler: (selectedArr) => {
			let s = buyDataHandler.combinatorialNumber(selectedArr.length, 3)
			if (s == 0) return
			let obj = buyDataHandler.createBuyObj()
			obj.len = s
			obj.money = s * 2
			obj.numStr = selectedArr.join('|')
			obj.orderStr = selectedArr.join('')
			return obj
		},
		addToBasketRandom: (randomArr) => {
			let obj = buyDataHandler.createBuyObj()
			let len = randomArr.length - 1
			let i = buyDataHandler.createRandomNum(0, len)
			let obj1 = randomArr[i]
			let arr = buyDataHandler.createNoReaptRandomNumReArr(3)
			obj.I = obj1.I
			obj.gName = obj1.N
			obj.numStr = arr.join('|')
			obj.orderStr = arr.join('')
			return obj
		}
	},

	1365: {
		name: '任三组三',
		playType: "B1",
		titleArr: ['组三'],
		lenLimit: 1,
		numLen: 10,
		positonLenLimit: 3,
		isShowTitle: true,
		dataHandler: (selectedArr) => {
			let s = buyDataHandler.combinatorialNumber(selectedArr.length, 2)
			if (s == 0) return
			let obj = buyDataHandler.createBuyObj()
			obj.len = s * 2
			obj.money = s * 2 * 2
			obj.numStr = selectedArr.join('|')
			obj.orderStr = selectedArr.join('')
			return obj
		},
		addToBasketRandom: (randomArr) => {
			let obj = buyDataHandler.createBuyObj()
			let len = randomArr.length - 1
			let i = buyDataHandler.createRandomNum(0, len)
			let obj1 = randomArr[i]
			let arr = buyDataHandler.createNoReaptRandomNumReArr(2)
			obj.I = obj1.I
			obj.gName = obj1.N
			obj.numStr = arr.join('|')
			obj.orderStr = arr.join('')
			obj.len = 2
			obj.money = 4
			return obj
		}
	},

	1368: {
		name: '任三组选和值',
		playType: "B1",
		titleArr: ['组选和值'],
		lenLimit: 1,
		listStart: 1,
		numLen: 27,
		positonLenLimit: 3,
		isShowTitle: false,
		dataHandler: (selectedArr) => {
			let sumArr = []
			selectedArr.forEach(n => {
				let arr = buyDataHandler.threeSumSort(n)
				sumArr.push(arr.length)
			})

			let s = sumArr.reduce((accumulator, currentValue) => {
				return accumulator + currentValue
			}, 0)

			let obj = buyDataHandler.createBuyObj()
			obj.len = s
			obj.money = buyDataHandler.handlerMoneyDecimal(s * 2 * obj.rate * obj.ratio);
			obj.numStr = selectedArr.join('|')
			obj.orderStr = selectedArr.join(',')
			return obj
		}
	},

	1364: {
		name: '任三直选和值',
		playType: "B1",
		titleArr: ['组选'],
		lenLimit: 1,
		listStart: 0,
		numLen: 28,
		positonLenLimit: 3,
		isShowTitle: false,
		dataHandler: (selectedArr) => {
			let sumArr = []
			selectedArr.forEach(n => {
				let arr = buyDataHandler.threeSum(n)
				sumArr.push(arr.length)
			})

			let s = sumArr.reduce((accumulator, currentValue) => {
				return accumulator + currentValue
			}, 0)

			let obj = buyDataHandler.createBuyObj()
			obj.len = s
			obj.money = buyDataHandler.handlerMoneyDecimal(s * 2 * obj.rate * obj.ratio);
			obj.numStr = selectedArr.join('|')
			obj.orderStr = selectedArr.join(',')
			return obj
		}
	},


	1359: {
		name: '任二组选复式',
		playType: "B1",
		titleArr: ['组选'],
		lenLimit: 1,
		numLen: 10,
		isShowTitle: true,
		dataHandler: (selectedArr) => {
			let s = buyDataHandler.combinatorialNumber(selectedArr.length, 2)
			if (s == 0) return
			let obj = buyDataHandler.createBuyObj()
			obj.len = s
			obj.money = s * 2
			obj.numStr = selectedArr.join('|')
			obj.orderStr = selectedArr.join('')
			return obj
		},
		addToBasketRandom: (randomArr) => {
			let obj = buyDataHandler.createBuyObj()
			let len = randomArr.length - 1
			let i = buyDataHandler.createRandomNum(0, len)
			let obj1 = randomArr[i]
			let arr = buyDataHandler.createNoReaptRandomNumReArr(2)
			obj.I = obj1.I
			obj.gName = obj1.N
			obj.numStr = arr.join('|')
			obj.orderStr = arr.join('')
			return obj
		}
	},

	1361: {
		name: '任二组选和值',
		playType: "B1",
		titleArr: ['组选'],
		lenLimit: 1,
		listStart: 1,
		numLen: 18,
		isShowTitle: false,
		dataHandler: (selectedArr) => {
			return twoSumSortObj(selectedArr)
		}
	},

	1358: {
		name: '任二直选和值',
		playType: "B1",
		titleArr: ['直选和值'],
		lenLimit: 1,
		numLen: 19,
		isShowTitle: false,
		dataHandler: (selectedArr) => {
			return twoSumObj(selectedArr)
		}
	},

	2537: {
		name: '任四直选单式',
		playType: "C1",
		positonLenLimit: 4,
		dataHandler: (str) => {
			let res = buyDataHandler.danshiDH_3({
				str,
				lenLimit: 4,
				deleteRepeat: false
			})
			return res
		},
		createObj: (handlerArr, unHandlerArr) => {
			let orderArr = renxuanOrderStrHandler(handlerArr, unHandlerArr)

			let obj = buyDataHandler.createBuyObj()
			obj.numStr = handlerArr.join('|');
			obj.orderStr = orderArr.join('|')
			return obj
		},
		addToBasketRandom: () => {
			let obj = dashiAddRandom(4, false)
			return obj
		}
	},

	1367: {
		name: '任三混合组选',
		playType: "C1",
		positonLenLimit: 3,
		dataHandler: (str) => {
			let res = buyDataHandler.danshiDH_3({
				str,
				lenLimit: 3,
				deleteRepeat: true
			})
			return res
		},
		createObj: (handlerArr, unHandlerArr) => {
			let orderArr = renxuanOrderStrHandler(handlerArr, unHandlerArr)

			let obj = buyDataHandler.createBuyObj()
			obj.numStr = handlerArr.join('|');
			obj.orderStr = orderArr.join('|')
			return obj
		},
		addToBasketRandom: () => {
			let obj = dashiAddRandom(3, true)
			return obj
		}
	},

	1362: {
		name: '任三直选单式',
		playType: "C1",
		positonLenLimit: 3,
		dataHandler: (str) => {
			let res = buyDataHandler.danshiDH_3({
				str,
				lenLimit: 3,
				deleteRepeat: false
			})
			return res
		},
		createObj: (handlerArr, unHandlerArr) => {
			let orderArr = renxuanOrderStrHandler(handlerArr, unHandlerArr)

			let obj = buyDataHandler.createBuyObj()
			obj.numStr = handlerArr.join('|');
			obj.orderStr = orderArr.join('|')
			return obj
		},
		addToBasketRandom: () => {
			let obj = dashiAddRandom(3, false)
			return obj
		}
	},

	1360: {
		name: '任二组选单式',
		playType: "C1",
		dataHandler: (str) => {
			let res = buyDataHandler.danshiDH_3({
				str,
				lenLimit: 2,
				deleteRepeat: true
			})
			return res
		},
		createObj: (handlerArr) => {
			let obj = buyDataHandler.createBuyObj()
			obj.numStr = handlerArr.join('|');
			obj.orderStr = handlerArr.join('|');
			return obj
		},
		addToBasketRandom: () => {
			let obj = dashiAddRandom(2, true)
			return obj
		}
	},


	1357: {
		name: '任二直选单式',
		playType: "C1",
		dataHandler: (str) => {
			let res = buyDataHandler.danshiDH_3({
				str,
				lenLimit: 2,
				deleteRepeat: false
			})
			return res
		},
		createObj: (handlerArr) => {
			let obj = buyDataHandler.createBuyObj()
			obj.numStr = handlerArr.join('|');
			obj.orderStr = handlerArr.join('|');
			return obj
		},
		addToBasketRandom: () => {
			let obj = dashiAddRandom(2, false)
			return obj
		}
	},


	1336: {
		name: '前二直选(单式)',
		playType: "C",
		dataHandler: (str) => {
			let res = buyDataHandler.danshiDH_3({
				str,
				lenLimit: 2,
				deleteRepeat: false
			})
			return res
		},
		createObj: (handlerArr) => {
			let obj = buyDataHandler.createBuyObj()
			obj.numStr = handlerArr.join('|');
			obj.orderStr = handlerArr.join('|');
			return obj
		},
		addToBasketRandom: () => {
			let obj = dashiAddRandom(2, false)
			return obj
		}
	},

	1334: {
		name: '后二直选(单式)',
		playType: "C",
		dataHandler: (str) => {
			let res = buyDataHandler.danshiDH_3({
				str,
				lenLimit: 2,
				deleteRepeat: false
			})
			return res
		},
		createObj: (handlerArr) => {
			let obj = buyDataHandler.createBuyObj()
			obj.numStr = handlerArr.join('|');
			obj.orderStr = handlerArr.join('|');
			return obj
		},
		addToBasketRandom: () => {
			let obj = dashiAddRandom(2, false)
			return obj
		}
	},

	1331: {
		name: '中三混合组选',
		playType: "C",
		dataHandler: (str) => {
			let res = buyDataHandler.danshiDH_3({
				str,
				lenLimit: 3,
				deleteRepeat: true
			})
			return res
		},
		createObj: (handlerArr) => {
			console.log(handlerArr);
			let obj = buyDataHandler.createBuyObj()
			obj.numStr = handlerArr.join('|');
			obj.orderStr = handlerArr.join('|').replace(/\,/g, '').replace(/\|/g, ',')
			return obj
		},
		addToBasketRandom: () => {
			let obj = dashiAddRandom(3, true)
			obj.orderStr = obj.orderStr.replace(/\,/g, '')
			return obj
		}
	},


	1342: {
		name: '前二组选(单式)',
		playType: "C",
		dataHandler: (str) => {
			let res = buyDataHandler.danshiDH_3({
				str,
				lenLimit: 2,
				deleteRepeat: true
			})
			return res
		},
		createObj: (handlerArr) => {
			console.log(handlerArr);
			let obj = buyDataHandler.createBuyObj()
			obj.numStr = handlerArr.join('|');
			obj.orderStr = handlerArr.join('|')
			return obj
		},
		addToBasketRandom: () => {
			let obj = dashiAddRandom(2, true)
			return obj
		}
	},


	1340: {
		name: '后二组选(单式)',
		playType: "C",
		dataHandler: (str) => {
			let res = buyDataHandler.danshiDH_3({
				str,
				lenLimit: 2,
				deleteRepeat: true
			})
			return res
		},
		createObj: (handlerArr) => {
			console.log(handlerArr);
			let obj = buyDataHandler.createBuyObj()
			obj.numStr = handlerArr.join('|');
			obj.orderStr = handlerArr.join('|')
			return obj
		},
		addToBasketRandom: () => {
			let obj = dashiAddRandom(2, true)
			return obj
		}
	},

	1324: {
		name: '前三混合组选',
		playType: "C",
		dataHandler: (str) => {
			let res = buyDataHandler.danshiDH_3({
				str,
				lenLimit: 3,
				deleteRepeat: true
			})
			return res
		},
		createObj: (handlerArr) => {
			let obj = buyDataHandler.createBuyObj()
			obj.numStr = handlerArr.join('|');
			obj.orderStr = handlerArr.join('|').replace(/\,/g, '').replace(/\|/g, ',')
			return obj
		},
		addToBasketRandom: () => {
			let obj = dashiAddRandom(3, true)
			obj.orderStr = obj.orderStr.replace(/\,/g, '')
			return obj
		}
	},

	1317: {
		name: '后三混合组选',
		playType: "C",
		dataHandler: (str) => {
			let res = buyDataHandler.danshiDH_3({
				str,
				lenLimit: 3,
				deleteRepeat: true
			})
			return res
		},
		createObj: (handlerArr) => {
			let obj = buyDataHandler.createBuyObj()
			obj.numStr = handlerArr.join('|');
			obj.orderStr = handlerArr.join('|').replace(/\,/g, '').replace(/\|/g, ',')
			return obj
		},
		addToBasketRandom: () => {
			let obj = dashiAddRandom(3, true)
			obj.orderStr = obj.orderStr.replace(/\,/g, '')
			return obj
		}
	},

	1326: {
		name: '中三直选单式',
		playType: "C",
		dataHandler: (str) => {
			let res = buyDataHandler.danshiDH_3({
				str,
				lenLimit: 3,
				deleteRepeat: false
			})
			return res
		},
		createObj: (handlerArr) => {
			let obj = buyDataHandler.createBuyObj()
			obj.numStr = handlerArr.join('|');
			obj.orderStr = handlerArr.join('|');
			return obj
		},
		addToBasketRandom: () => {
			let obj = dashiAddRandom(3, false)
			return obj
		}
	},

	1319: {
		name: '前三直选单式',
		playType: "C",
		dataHandler: (str) => {
			let res = buyDataHandler.danshiDH_3({
				str,
				lenLimit: 3,
				deleteRepeat: false
			})
			return res
		},
		createObj: (handlerArr) => {
			let obj = buyDataHandler.createBuyObj()
			obj.numStr = handlerArr.join('|');
			obj.orderStr = handlerArr.join('|');
			return obj
		},
		addToBasketRandom: () => {
			let obj = dashiAddRandom(3, false)
			return obj
		}
	},


	1312: {
		name: '后三直选单式',
		playType: "C",
		dataHandler: (str) => {
			let res = buyDataHandler.danshiDH_3({
				str,
				lenLimit: 3,
				deleteRepeat: false
			})
			return res
		},
		createObj: (handlerArr) => {
			let obj = buyDataHandler.createBuyObj()
			obj.numStr = handlerArr.join('|');
			obj.orderStr = handlerArr.join('|');
			return obj
		},
		addToBasketRandom: () => {
			let obj = dashiAddRandom(3, false)
			return obj
		}
	},
	1305: {
		name: '后四单式',
		playType: "C",
		dataHandler: (str) => {
			let res = buyDataHandler.danshiDH_3({
				str,
				lenLimit: 4,
				deleteRepeat: false
			})
			return res
		},
		createObj: (handlerArr) => {
			let obj = buyDataHandler.createBuyObj()
			obj.numStr = handlerArr.join('|');
			obj.orderStr = handlerArr.join('|');
			return obj
		},
		addToBasketRandom: () => {
			let obj = dashiAddRandom(4, false)
			return obj
		}
	},

	2529: {
		name: '前四单式',
		playType: "C",
		dataHandler: (str) => {
			let res = buyDataHandler.danshiDH_3({
				str,
				lenLimit: 4,
				deleteRepeat: false
			})
			return res
		},
		createObj: (handlerArr) => {
			let obj = buyDataHandler.createBuyObj()
			obj.numStr = handlerArr.join('|');
			obj.orderStr = handlerArr.join('|');
			return obj
		},
		addToBasketRandom: () => {
			let obj = dashiAddRandom(4, false)
			return obj
		}
	},


	1296: {
		name: '五星单式',
		playType: "C",
		dataHandler: (str) => {
			let res = buyDataHandler.danshiDH_3({
				str,
				lenLimit: 5,
				deleteRepeat: false
			})
			return res
		},
		createObj: (handlerArr) => {
			let obj = buyDataHandler.createBuyObj()
			obj.numStr = handlerArr.join('|');
			obj.orderStr = handlerArr.join('|');
			return obj
		},
		addToBasketRandom: () => {
			let obj = dashiAddRandom(5, false)
			return obj
		}
	}
}


	//---------------------------------------------------------------------------


function fushiAddRandom(randomArr,lenLimit=2){
	let arr = []
	while (lenLimit--) {
		arr.push(buyDataHandler.createRandomNum(0, 9))
	}
	let obj = buyDataHandler.createBuyObj()
	let len = randomArr.length - 1
	let i = buyDataHandler.createRandomNum(0, len)
	let obj1 = randomArr[i]
	
	let keyArr = ['万', '千', '百', '十', '个']
	let orderArr = []
	let n = 0
	keyArr.forEach(s =>{
		if(obj1.N.includes(s)){
			orderArr.push(arr[n])
			n++
		}else {
			orderArr.push('-')
		}
	})
	
	obj.I = obj1.I
	obj.gName = obj1.N
	obj.numStr =  arr.join('|')
	obj.orderStr = orderArr.join(',')
	return obj
}

function fushiRepeatHandler(d, sortArr, randomArr, lenLimit = 2) {
	let keyArr = []
	Object.keys(d).forEach(str => keyArr.push(str.slice(0, 1)))
	let combindKey = buyDataHandler.getCombine(keyArr, lenLimit)
	if (combindKey.length == 0) return
	let objArr = []
	combindKey.forEach(key => {
		let obj = buyDataHandler.createBuyObj()
		let robj = randomArr.find(item => item.N.includes(key))
		let orderArr = [],
			numArr = []

		let handlerKeyArr = []
		key.split('').forEach(k => {
			handlerKeyArr.push(k + '位')
		})
		sortArr.forEach(str => {
			if (handlerKeyArr.includes(str)) {
				let s = d[str].map(item => item.num).join('')
				orderArr.push(s)
				numArr.push(s)
			} else {
				orderArr.push('-')
			}
		})

		let len = numArr.reduce((accumulator, currentValue) => {
			return accumulator * currentValue.length
		}, 1)
		obj.gName = robj.N
		obj.len = len
		obj.money = len * 2
		obj.I = robj.I
		obj.numStr = numArr.join('|')
		obj.orderStr = orderArr.join(',')
		objArr.push(obj)
	})
	return objArr
}

function fushiHandler(d, sortArr, lenLimit = 5) {
	let allArr = buyDataHandler.sortDataByTitleArr(d, sortArr)
	let len = allArr.length
	if (len < lenLimit) return
	let obj = buyDataHandler.createBuyObj()
	let s = allArr.reduce((accumulator, currentValue) => {
		return accumulator * currentValue.length
	}, 1)

	obj.len = s
	obj.money = 2 * s
	let str = allArr.join('|').replace(/\,/g, '').replace(/\|/g, ',')
	obj.numStr = str
	obj.orderStr = str

	return obj
}

/**
 * arr1:循环的数组，得出的结果相加得到len
 * arr2:组合的数组,
 * lenLimit:组合的K
 */
function zhuxuanHandler(arr1, arr2, lenLimit = 3) {
	let len = arr2.length
	let countArr = []
	arr1.forEach(num => {
		let flag = arr2.includes(num)
		let s
		if (flag) {
			s = buyDataHandler.combinatorialNumber(len - 1, lenLimit)
		} else {
			s = buyDataHandler.combinatorialNumber(len, lenLimit)
		}
		countArr.push(s)
	})

	let sum = countArr.reduce((accumulator, currentValue) => {
		return accumulator + currentValue
	}, 0)

	let obj = buyDataHandler.createBuyObj()
	obj.len = sum
	obj.money = sum * 2
	return obj
}


function twoSumSortObj(selectedArr) {
	let sumArr = []
	selectedArr.forEach(n => {
		let arr = buyDataHandler.twoSumSort(n)
		sumArr.push(arr.length)
	})

	let s = sumArr.reduce((accumulator, currentValue) => {
		return accumulator + currentValue
	}, 0)

	let obj = buyDataHandler.createBuyObj()
	obj.len = s
	obj.money = buyDataHandler.handlerMoneyDecimal(s * 2 * obj.rate * obj.ratio);
	obj.numStr = selectedArr.join('|')
	obj.orderStr = selectedArr.join(',')
	return obj
}

function twoSumObj(selectedArr) {
	let sumArr = []
	selectedArr.forEach(n => {
		let arr = buyDataHandler.twoSum(n)
		sumArr.push(arr.length)
	})

	let s = sumArr.reduce((accumulator, currentValue) => {
		return accumulator + currentValue
	}, 0)

	let obj = buyDataHandler.createBuyObj()
	obj.len = s
	obj.money = buyDataHandler.handlerMoneyDecimal(s * 2 * obj.rate * obj.ratio);
	obj.numStr = selectedArr.join('|')
	obj.orderStr = selectedArr.join(',')
	return obj
}

function renxuanOrderStrHandler(handlerArr, unHandlerArr) {
	let titleArr = ['万', '千', '百', '十', '个']
	let orderStrArr = []
	handlerArr.forEach(item => {
		let arr = item.split(',')
		let i = 0
		let tem = []
		titleArr.forEach(str => {
			if (unHandlerArr.includes(str)) {
				tem.push(arr[i])
				i++
			} else {
				tem.push('-')
			}
		})
		orderStrArr.push(tem)
	})

	return orderStrArr
}






function dashiAddRandom(m, isProhibitRepeat = false) {
	let i = m
	let arr = []
	while (i--) {
		arr.push(buyDataHandler.createRandomNum(0, 9))
	}
	if (isProhibitRepeat) {
		console.log('isProhibitRepeat');
		let size = new Set(arr).size
		while (size == 1) {
			i = m
			arr = []
			while (i--) {
				arr.push(buyDataHandler.createRandomNum(0, 9))
			}
			size = new Set(arr).size
		}
	}

	let obj = buyDataHandler.createBuyObj()
	obj.numStr = arr.join(',')
	obj.orderStr = arr.join(',')
	return obj
}
