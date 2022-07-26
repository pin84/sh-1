// let oddsIds = [3183, 1386, 3192, 3189, 3185, 3198, 3201, 3204, 3207, 3210]
/**
 * 做260的时候删除了1386 ，
 */
import store from '@/store.js'
import ids from '@/views/games/assets/ids.js'

let oddsIds = [3183, 3192, 3189, 3185, 3198, 3201, 3204, 3207, 3210]


export default (play) => {
  let { id } = store.state.gd.indexGame
  console.log('--oddsHandler play--', play.C)
  let { I } = play
  let oddsObj
  oddsObj = play.C[0];

  if (oddsIds.includes(I)) {
    oddsObj = play.C[0].C[0]
  }
  
  
  if (ids['260'].includes(Number(id))) {
    let num = 0
    let maxObj = {}
    play.C.forEach(item=>{
      if(item.I > num){
        num = item.I
        maxObj = item
      }
    })
    oddsObj = maxObj
  }

  

  
  // if (I == 1767) {//快3 和值
  //   oddsObj = play.C[0].C[0]
  // }


  console.log(oddsObj)
  return oddsObj
}