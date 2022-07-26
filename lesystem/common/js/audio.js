

const audio = uni.createInnerAudioContext();
// audio.autoplay = true;
// audio.src = 'https://bjetxgzv.cdn.bspapp.com/VKCEYUGU-hello-uniapp/2cc220e0-c27a-11ea-9dfb-6da8e309e0d8.mp3';
audio.onPlay(() => {
  // console.log('开始播放');
  // audio.play()
});
audio.onError((res) => {
  console.log(res);
});



export default {

  setSrc(src) {
    audio.src = src
  },

  play() {
    // let route  = route
    // audio.src = 'https://bjetxgzv.cdn.bspapp.com/VKCEYUGU-hello-uniapp/2cc220e0-c27a-11ea-9dfb-6da8e309e0d8.mp3';
    let src = audio.src
    if (!src) return
    // audio.onCanplay(() => {
      audio.play()
    // })
  },

  pause() {
    audio.pause()
  }



}