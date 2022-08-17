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

    // getKuData: ({ d = {}, kuHao = 23, lie = 42, ceng = 16, start = 0, mr40Arr = [] } = {}) => {
    //     let kuArr = d.filter(item => item.KuHao == kuHao)
    //     let arr = []
    //     let lielen = lie - Math.abs(start)
    //     for (let i = 1; i < 17; i++) {
    //         let temArr = []
    //         let cengArr = kuArr.filter(item => item.Ceng == i)
    //         cengArr.sort((a, b) => a.Lie - b.Lie)

    //         let k = 0
    //         let k1 = 0
    //         for (let j = start; j < lielen; j++) {
    //             k++
    //             k1++
    //             let curobj = cengArr.find(o => o.Lie == j)
    //             if (!curobj) {
    //                 curobj = {
    //                     Ceng: i,
    //                     Lie: j
    //                 }
    //             }
    //             if (k == 7) {
    //                 k = 0
    //                 curobj['mr_20'] = true
    //             }


    //             if (mr40Arr.includes(k1)) {
    //                 curobj['mr_40'] = true
    //             }



    //             temArr.push(curobj)

    //         }

    //         arr.push(temArr)
    //     }

    //     return arr
    // },


    getKuDataSort: (d) => {

    },

}

function compare(a, b) {
    if (a.Ceng !== b.Ceng) {
        return a.Ceng - b.Ceng;
    } else if (a.Lie !== b.Lie) {
        return a.Lie - b.Lie;
    }
}