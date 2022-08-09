const getL1D1 = (d) => {
    let arr = dataHandler(d, 1, 1, [26, 27, 28, 29, 30])
    return arr
}
const getL1D1GD = (d) => {
    let arr = dataHandler(d, 1, 2, [26, 27, 28, 29, 30])
    return arr
}
const getL1D2 = (d) => {
    let arr = dataHandler(d,1,1, [31, 32]);
    return arr
}
const getL1D2GD = (d) => {
  let arr = dataHandler(d, 1, 2, [31, 32])
  return arr
}
const getL1D3 = (d) => {
    let arr = dataHandler(d,1,1, [41,35, 34,33]);
    return arr
}
const getL1D3GD = (d) => {
  let arr = dataHandler(d, 1, 2, [41,35, 34,33])
  return arr
}
const getL1D4 = (d) => {
    let arr = dataHandler(d, 1, 1, [42, 43, 44, 45, 46])
    return arr
}
const getL1D4GD = (d) => {
    let arr = dataHandler(d, 1, 2, [42, 43, 44, 45, 46])
    return arr
}





const getL2D3 = (d) => {
  let arr = dataHandler(d,2,1, [16,15, 14,13]);
  return arr
}
const getL2D3GD = (d) => {
let arr = dataHandler(d, 2, 2, [16,15, 14,13])
return arr
}
const getL2D4 = (d) => {
  let arr = dataHandler(d,2,1, [49,47]);
  return arr
}
const getL2D4GD = (d) => {
let arr = dataHandler(d, 2, 2, [49,47])
return arr
}





const getL2D1 = (d) => {
    let arr = dataHandler(d,2,1, [1, 2, 3, 4, 5, 6]);
    return arr
}
const getL2D1GD = (d) => {
    let arr = dataHandler(d, 2, 2, [1, 2, 3, 4, 5, 6])
    return arr
}


const getL2D2 = (d) => {
    let arr = dataHandler(d,2,1, [7, 8, 9, 10, 11]);
    return arr
}
const getL2D2GD = (d) => {
    let arr = dataHandler(d, 2, 2, [7, 8, 9, 10, 11])
    return arr
}



const getL1D5 = (d)=>{
  let arr =   getTPData(d,['Z01MB05','Z01MB04','Z01YZ03'])
  return arr
}
const getL1D5_1 = (d)=>{
  let arr =   getTPData(d,['Z02YZ04','Z02MB05','Z02MB06','Z02MB07','Z02YZ08'])
  return arr
}

const getL1D6 = (d)=>{
  let arr =   getTPData(d,['Z01YZ06','Z01MB07','Z01MB08','Z01MB09','Z01YZ10'])
  return arr
}

const getL1D7 = (d)=>{
  let arr =   getTPData(d,['Z01MB11','Z01MB12','Z01YZ13'])
  return arr
}
const getL1D7_1 = (d)=>{
  let arr =   getTPData(d,['Z02YZ15','Z02MB14','Z02MB13'])
  return arr
}


const getL10301 = (d)=>{
  let arr =   getTPData(d,['Z03YZ01','Z03MB02','Z03MB03','Z03YZ04'])
  return arr
}
const getL10301_1 = (d)=>{
  let arr =   getTPData(d,['Z04YZ04','Z04MB03','Z04MB02','Z04YZ01'])
  return arr
}
const getL10302 = (d)=>{
  let arr =   getTPData(d,['Z03MB05','Z03MB06','Z03MB07'])
  return arr
}
const getL10302_1 = (d)=>{
  let arr =   getTPData(d,['Z04MB07', 'Z04MB06','Z04MB05'])
  return arr
}

const getD10 = (d)=>{
  let arr =   getTPData(d,['Z01MB02'])
  return arr
}
const getD10_1 = (d)=>{
  let arr =   getTPData(d,['Z02MB03'])
  return arr
}

const getD11 = (d)=>{
  let arr =   getTPData(d,['Z01YZ01'])
  return arr
}
const getD11_1 = (d)=>{
  let arr =   getTPData(d,['Z05YZ12','Z02MB01','Z02YZ02'])
  return arr
}
const getD12 = (d)=>{
  let arr =   getTPData(d,['Z02YZ12','Z02MB11','Z02MB10','Z02MB09'])
  return arr
}
const getD13 = (d)=>{
  let arr =   getTPData(d,['Z05MB11','Z05MB10','Z05CP09','Z05MB08','Z05MB07','Z05DP06','Z05MB05','Z05MB04','Z05MB03','Z05MB02'])
  return arr
}
const getD14 = (d)=>{
  let arr =   getTPData(d,['Z03YZ08',])
  return arr
}
const getD14_1 = (d)=>{
  let arr =   getTPData(d,['Z05YZ01','Z05MB14','Z05MB13','Z04YZ08'])
  return arr
}

const getLQJd1 = (d)=>{
  let moveState =  getLQData(d,['A9','A10_1','A10_2','A10_3','A10_4','HuJiu2','B10_4','B10_3','B10_2','B10_1','B9'])
  let isHas = getLQDataGD(d,['12_1',['12_2','12_3'],'12_4','12_5',['12_6','12_7'],'24_1',['17_7','17_6'],'17_5','17_4',['17_3','17_2'],'17_1'])
  return  {lqj1:moveState,lqj1GD:isHas}
}

const getLQJd2 = (d)=>{
  // let moveState =  getLQData(d,['A2','A3','A6','A7','A8'])
  let moveState =  getLQData(d,['B2','B3','B6','B7','B8'])
  let isHas = getLQDataGD(d,['13_1','13_3','16_5','16_6','16_7'])
  return  {lqj2:moveState,lqj2GD:isHas}
}

const getLQJd3 = (d)=>{
  let moveState =  getLQData(d,['A2','A3','A6','A7','A8'])
  let isHas = getLQDataGD(d,['8_1','8_3','9_5','9_6','9_7'])
  return  {lqj3:moveState,lqj3GD:isHas}
}

const getLQJd4 = (d)=>{
  let moveState =  getLQData(d,['A4','A5_1','A5_2','A5_3','A5_4','HuJiu1','B5_4','B5_3','B5_2','B5_1','B4'])
  let isHas = getLQDataGD(d,[['8_6','8_7'],'9_0','9_1','9_2',['9_3','9_4'],'24_0',['16_4','16_3'],'16_2','16_1','16_0',['13_7','13_6']])
  return  {lqj4:moveState,lqj4GD:isHas}
}
const getLQJd5 = (d)=>{
  let moveState =  getLQData_1(d,['A5_2','A5_1','HuanXiang_2','B5_1','B5_2'])
  let isHas = getLQDataGD(d,['8_7','8_6','13_6','12_3','12_4'])

  // console.log(moveState,isHas);
  return  {lqc5:moveState,lqc5GD:isHas}
}
const getLQJd6 = (d)=>{
  let moveState =  getLQData_1(d,['A2','A1_2','A1_1','HuanXiang_1','B1_1','B1_2','B2'])
  let isHas = getLQDataGD(d,['8_2','8_1','8_0','13_5','9_5','9_6','9_7'])
  return  {lqc6:moveState,lqc6GD:isHas}
}
const getLQJd7 = (d)=>{
  let moveState =  getLQData_1(d,['A10','YiZai1','YiZai2','YiZai3','YiZai4','B13','B12','B11','B10'])
  let isHas = getLQDataGD(d,['9_4',['16_3','16_0'],['16_6','17_0'],'17_5','20_2','13_4','13_3','13_2','13_1'])
  return  {lqc7:moveState,lqc7GD:isHas}
}

const getLQJd8 = (d)=>{
  let moveState =  getLQData_1(d,['B3','B6','B7','B8','B9'])
  let isHas = getLQDataGD(d,['12_0','12_1','12_6','12_7','13_0'])
  return  {lqc8:moveState,lqc8GD:isHas}
}
const getLQJd9 = (d)=>{
  let moveState =  getLQData_1(d,['A3','A4','A7','A8','A9'])
  let isHas = getLQDataGD(d,['8_3','8_4','9_1','9_2','9_3'])
  return  {lqc9:moveState,lqc9GD:isHas}
}

export default {
    getL1D1,
    getL1D1GD,
    getL1D2,
    getL1D2GD,
    getL1D3,
    getL1D3GD,
    getL1D4,
    getL1D4GD,

    getL2D3,
    getL2D3GD,
    getL2D4,
    getL2D4GD,

    getL2D1,
    getL2D1GD,
    getL2D2,
    getL2D2GD,

    getL1D5,
    getL1D5_1,
    getL1D6,
    getL1D7,
    getL1D7_1,
    getL10301,
    getL10301_1,
    getL10302,
    getL10302_1,

    getD10,
    getD10_1,
    getD11,
    getD11_1,
    getD12,
    getD13,
    getD14,
    getD14_1,

    getLQJd1,
    getLQJd2,
    getLQJd3,
    getLQJd4,
    getLQJd5,
    getLQJd6,
    getLQJd7,
    getLQJd8,
    getLQJd9
}

function getLQDataGD(d,Arr){
  let str = 'GuangDianI'
  let res = []
  for(let item of Arr){
    let flag = Array.isArray(item)
    if(flag){
      let n = 0
      for(let inItem of item){
        let s = str + inItem
        if(d[s]){
          n = d[s]
        }
      }
      res.push(n)
    } else {
      res.push(d[str + item] || 0)
    }
  }

  return res
}

//主要处理转向电机1 转向电机2
function getLQData_1(d,nameArr){
  let moveState = []
  for(let name of nameArr){
    let v = 0

    if(name.includes('HuanXiang')){
      let [k1,k2] = name.split('_')
      // HuanXiangDianJi1FanQ HuanXiangDianJi1ZhengQ
      let key1 = `HuanXiangDianJi${k2}FanQ`
      let key2 = `HuanXiangDianJi${k2}ZhengQ`
      let f = d[key1]
      let z = d[key2]
      v = z ? z : f ? 2 : 0
    } else  if(name.includes('_')){
      let z = d[name+'DianJiZhengQ'] 
      let f = d[name+'DianJiFanQ']
      v =  z ? z : f ? 2 : 0
    } else {
      v = d[name + 'DianJiQ'] || 0
    }
    moveState.push(v)
  }

  return  moveState
}

function getLQData(d,nameArr){
  let moveState = []
  for(let name of nameArr){
    let v = 0
    if(name.includes('_') || name.includes('HuJiu')){
      let z = d[name+'DianJiZhengQ'] 
      let f = d[name+'DianJiFanQ']
      v =  z ? z : f ? 2 : 0
    } else {
      v = d[name + 'DianJiQ'] || 0
    }
    moveState.push(v)
  }

  return  moveState
}



function getTPData(d,nameArr){
    let isHas = []
    let moveState = []

    nameArr.forEach(str => {
        let mKey = str + '_PXS1_STP_ZhengShuSongDaoWei'
        isHas.push(d[mKey] || 0)
        let sf = d[str + '_ShuSongFanZhuanShuChu'] || 0
        let sz = d[str + '_ShuSongZhengZhuanShuChu'] || 0
        let yf = d[str + '_YiZaiFanZhuanShuChu'] || 0
        let yz = d[str + '_YiZaiZhengZhuanShuChu'] || 0

        if(sf == 0 && sz == 0 && yf ==0 && yz ==0 ){
            moveState.push(0) 
        } else if(sz == 1 || yz == 1)  {
            moveState.push(1) 
        } else if(sf == 1 || yf == 1) {
            moveState.push(2) 
        }
    });
    return [isHas,moveState]
}


//dType 1 :电机，2:光电
function dataHandler(d, lineNo = 1, dType = 1, numArr = [26]) {
    let arr = [];
    let s1 = lineNo == 1 ? "Xian1" : "Xian2";
    let s2 = dType == 1 ? "DianJi" : "GuangDian";
    let s3 = dType == 1 ? "JingXiang" : "";

    for (let num of numArr) {
        
        let str = s1 + s2 + num + s3;
        let n = d[str] || 0;
        // let n = 2
        // let n = Math.random() > 0.5 ? 0 : 1;
        arr.push(n);
    }
    // console.log(arr);
    return arr;
}