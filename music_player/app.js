import AppModule from "./lib/App.js"

const $app = new AppModule();

const audio = wx.getBackgroundAudioManager();

audio.onCanplay(function(){
  console.log(1)
})

// audio.src = 'http://ws.stream.qqmusic.qq.com/230907208.m4a?fromtag=46';

console.log(audio);

$app.start();
