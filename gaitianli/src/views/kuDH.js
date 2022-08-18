export default {

    getKuData: ({ d = {}, kuHao = 23, tcd = {}, lie = 43, ceng = 16, start = 0 } = {}) => {
        let kuArr = d.filter(item => item.KuHao == kuHao)
        let arr = []
        for (let i = 1; i < lie; i++) {
            let lieArr = kuArr.filter(item => item.Lie == i)
            let Ceng_Num = tcd[`Ceng_Num${i}`]
            let block = []
            for (let j = 1; j < 18; j++) {
                let curobj = lieArr.find(o => o.Ceng == j)
                if (!curobj) {
                    curobj = {
                        Ceng: j,
                        Lie: i
                    }
                }
                if (j <= Ceng_Num) {
                    curobj['isHas'] = true
                }
                block.push(curobj)
            }
            arr.push(block)
        }

        return arr
    },

    createTCStyle:(d)=>{
        let arr = []
        let sum  = 159760 + 140204
         for(let obj of d){
            let  y = obj.Y1 / 19024 * 100 


            let x = (obj.X1 + 140204) / sum * 100
            let o = {
                ZSZT:obj.ZhuaShouZhuangTai,
                TCZT:obj.YunXingZhuangTai,
                styleTC:{
                    transform:`translateX(${x}%)`
                    // transform:`translateX(0%)`
                },
                styleZS:{
                    transform:`translateX(${x}%) translateY(${y}%)`
                    // transform:`translateX(0%) translateY(0%)`
                }
            }
            arr.push(o)
         }

        return arr
    },
    createTCStyle_4:(d)=>{
        let arr = []
        let sum  = 159760 + 189724
         for(let obj of d){
            let  y = obj.Y1 / 19024 * 100 


            let x = (obj.X1 + 189724) / sum * 100
            let o = {
                ZSZT:obj.ZhuaShouZhuangTai,
                TCZT:obj.YunXingZhuangTai,
                styleTC:{
                    transform:`translateX(${x}%)`
                    // transform:`translateX(0%)`
                },
                styleZS:{
                    transform:`translateX(${x}%) translateY(${y}%)`
                    // transform:`translateX(0%) translateY(0%)`
                }
            }
            arr.push(o)
         }

        return arr
    },
}

function compare(a, b) {
    if (a.Ceng !== b.Ceng) {
        return a.Ceng - b.Ceng;
    } else if (a.Lie !== b.Lie) {
        return a.Lie - b.Lie;
    }
}