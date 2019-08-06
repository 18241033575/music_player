import AppModule from "./lib/App.js"

const $app = new AppModule();

const audio = wx.getBackgroundAudioManager();

audio.onCanplay((event)=>{

})

// audio.src = 'http://ws.stream.qqmusic.qq.com/230907208.m4a?fromtag=46';

// $app.addEvent("oneEvent",function(){
//   AppModule.assign("song",{
//     a: "1"
//   })
// })



$app.start();
