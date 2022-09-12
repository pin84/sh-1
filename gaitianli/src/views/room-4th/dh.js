const d1 = ['1']
const d1GD = ['4']

const d2 = ['2', '3', '5', '6', '7']
const d2GD = ['5', '7', '6', '12', '14']

const d3 = [8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18]
const d3GD = [20, 21, 22, 23, 24, 25, 26, 27, 30, 31, 32]
const d4_1 = [31, 25, 30, 24, 29, 23, 28, 22, 27, 21, 26, 20]
const d4GD_1 = [
    [63, 62, 61], 60, [57, 56, 55], 54, [53, 52, 51], 50, [47, 46, 45], 44, [43, 42, 41], 40, [37, 36, 35],
    [34, 33]
]


const d4 = [32, 33, 34, 35, 36, 37, 38, 39, 40]
const d4GD = [undefined, 64, 65, undefined, 66, 67, undefined, 70, 71]

const d5 = [41, [42, 43, 44], 1, 2, 3, 4]
const d5GD = [72, [73, 74],
    [75, 76], 5, 6, 7
]
const d6 = [5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18]
const d6GD = [10, 11, 12, 13, 14, 15, 20, 21, 22, 23, 24, 25, 26, 27]
const d7 = [19]
const d7GD = [
    [30, 31, 32]
]



const d8 = [1]
const d8GD = [4]
const d9 = [2, [4, 5], 6, 7]
const d9GD = [5, [7, 10], 13, 14]
const d10 = [8, 9, 10, 11]
const d10GD = [15, 20, 21, 22]
const d11 = [23, 17, 22, 16, 21, 15, 20, 14, 19, 13, 18, 12]
const d11GD = [
    [
        51,
        52,
        53
    ],
    50, [
        45,
        46,
        47
    ],
    44, [
        41,
        42,
        43
    ],
    40, [
        35,
        36,
        37
    ],
    34, [
        31,
        32,
        33
    ],
    30, [
        25,
        26,
        27
    ],
    [
        23,
        24
    ]
]



const d12 = [24, 25, 26, 27, 28, 29, 30, 31, 32]
const d12GD = [undefined, 60, 57, undefined, 56, 55, undefined, 54, undefined]
const d13 = [33, 34, 35, 36, 37, 38, 39, 40, 41, 42,[45,43],44,1,2,3]
const d13GD = [61,62,63,64,65,66,67,70,71,72,[73,74],75,4,5,6]
const d14 = [4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16]
const d14GD = [7,10,11,12,13,14,15,20,21,22,23,24,25]
const d15 = [17]
const d15GD = [[26,27,30]]

let str = 'DianJiQ'
let strGD = 'GuangDianI'
let getD1 = (d) => {
    let res = dataHandler_1(d, d1, d1GD)
    return res
}
let getD2 = (d) => {
    let res = dataHandler_1(d, d2, d2GD)
    return res
}
let getD3 = (d) => {
    let res = dataHandler_1(d, d3, d3GD)
    return res
}
let getD4_1 = (d) => {
    let res = dataHandler_1(d, d4_1, d4GD_1)
    return res
}
let getD4 = (d) => {
    let res = dataHandler_1(d, d4, d4GD)
    return res
}
let getD5 = (d) => {
    let res = dataHandler_1(d, d5, d5GD)
    return res
}
let getD6 = (d) => {
    let res = dataHandler_1(d, d6, d6GD)
    return res
}
let getD7 = (d) => {
    let res = dataHandler_1(d, d7, d7GD)
    return res
}

let getD8 = (d) => {
    let res = dataHandler_1(d, d8, d8GD)
    return res
}
let getD9 = (d) => {
    let res = dataHandler_1(d, d9, d9GD)
    return res
}
let getD10 = (d) => {
    let res = dataHandler_1(d, d10, d10GD)
    return res
}
let getD11 = (d) => {
    let res = dataHandler_1(d, d11, d11GD)
    return res
}
let getD12 = (d) => {
    let res = dataHandler_1(d, d12, d12GD)
    return res
}
let getD13 = (d) => {
    let res = dataHandler_1(d, d13, d13GD)
    return res
}
let getD14 = (d) => {
    let res = dataHandler_1(d, d14, d14GD)
    return res
}
let getD15 = (d) => {
    let res = dataHandler_1(d, d15, d15GD)
    return res
}




// function dataHandler_1(d, motorArr, photoelectricArr) {
//     let arr = []
//     let arrGd = []
//     motorArr.forEach((n, idx) => {
//         arr.push(d['M' + n] || 0)
//     })

//     photoelectricArr.forEach(n => {
//         arrGd.push(d['X' + n] || 0)
//     })

//     return [arr, arrGd]
// }

function dataHandler_1(d, motorArr, photoelectricArr) {
    let arr = []
    let arrGd = []
    motorArr.forEach((n, idx) => {
        if (Array.isArray(n)) {
            let j = 0
            n.forEach(k => {
                if (d['M' + k]) {
                    j = 1
                }
            })
            arr.push(j)
        } else {
            arr.push(d['M' + n] || 0)
        }
    })

    photoelectricArr.forEach((n, idx) => {
        if (Array.isArray(n)) {
            let j = 0
            n.forEach(k => {
                if (d['X' + k]) {
                    j = 1
                }
            })
            arrGd.push(j)
        } else {
            arrGd.push(d['X' + n] || 0)
        }
    })

    return [arr, arrGd]
}




export default {
    getD1,
    getD2,
    getD3,
    getD4_1,
    getD4,
    getD5,
    getD6,
    getD7,
    getD8,
    getD9,
    getD10,
    getD11,
    getD12,
    getD13,
    getD14,
    getD15
}