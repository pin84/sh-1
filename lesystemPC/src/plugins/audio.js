// let src = require('@/assets/music/sound/clickNum.mp3')

let audio = new Audio();
let source = document.createElement('source')
// source.src = src;
audio.appendChild(source)
audio.autoplay = true;
// audio.controls = true
audio.load();


//播报
let audio1 = new Audio();
let source1 = document.createElement('source')
audio1.appendChild(source1)
audio1.autoplay = true;

//点击
let audio2 = new Audio();
let source2 = document.createElement('source')
audio2.appendChild(source2)
audio2.autoplay = true;

//已开奖
let audio3 = new Audio();
let source3 = document.createElement('source')
audio3.appendChild(source3)
audio3.autoplay = true;

//ogm
let audio4 = new Audio();
let source4 = document.createElement('source')
audio4.appendChild(source4)
audio4.autoplay = true;


import store from '../store'


export default {

  // playogm(){
  //   if (!store.state.gd.click) return
  //   source4.src = require(`@/assets/music/sound/2.ogm`)
  //   audio4.load()
  // },
  
  async playTips1(list) {
    if (!store.state.gd.tips) return false
    let isPause = audio1.paused
    if (!isPause) return

    let i = 0
    let src = require(`@/assets/music/num-sound/${list[i]}.mp3`)
    source3.src = src
    audio3.load()
    audio3.addEventListener('ended', () => {
      if (i >= list.length - 1) return
      i++
      src = require(`@/assets/music/num-sound/${list[i]}.mp3`)
      source3.src = src
      audio3.load()
    })

  },



  async playTips(url) {

    if (!store.state.gd.tips) return
    let isPause = audio3.paused
    if (!isPause) return


    let src = require(`@/assets/music/${url}.mp3`)
    source1.src = src
    audio1.load()
    // audio1.play()
  },

  playClick() {
    if (!store.state.gd.click) return
    source2.src = require('@/assets/music/sound/clickNum.mp3')
    audio2.load()
    // audio2.play()
  },

  playBgm() {
    if (!store.state.gd.bgm) return
    let src = require('@/assets/music/sound/bgmGame.mp3')
    source.src = src
    audio.load()
    // audio.addEventListener('oncanplay', () => {
    // audio.play()
    // })
  },



  pause() {
    audio.pause()
  },


  audio() {
    return audio
  }



}


