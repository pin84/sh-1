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


const getL1D4 = (d) => {
    let arr = dataHandler(d, 1, 1, [42, 43, 44, 45, 46])
    return arr
}
const getL1D4GD = (d) => {
    let arr = dataHandler(d, 1, 2, [42, 43, 44, 45, 46])
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
  let arr =   getTPData(d,['Z01YZ03','Z01MB04','Z01MB05'])
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
const getL10301 = (d)=>{
  let arr =   getTPData(d,['Z03YZ01','Z03MB02','Z03MB03'])
  return arr
}
const getL10302 = (d)=>{
  let arr =   getTPData(d,['Z03YZ04','Z03MB05','Z03MB06','Z03MB07'])
  return arr
}




export default {
    getL1D1,
    getL1D1GD,
    getL1D2,
    getL1D2GD,

    getL1D4,
    getL1D4GD,
   

    getL2D1,
    getL2D1GD,
    getL2D2,
    getL2D2GD,

    getL1D5,
    getL1D6,
    getL1D7,
    getL10301,
    getL10302,
}

// Z01YZ06_PXS1_STP_ZhengShuSongDaoWei: 1
// Z01YZ06_PXS3_STP_FanShuSongDaoWei: 1
// Z01YZ06_PXS3_STP_ZhengShuSongDaoWei2: 1
// Z01YZ06_ShuSongFanZhuanShuChu: 1
// Z01YZ06_ShuSongZhengZhuanShuChu: 1
// Z01YZ06_YiZaiFanZhuanShuChu: 1
// Z01YZ06_YiZaiZhengZhuanShuChu: 1
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