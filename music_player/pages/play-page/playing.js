import PageModule from "../../lib/Page.js";
import { reqUrl1 } from "../../common/comList.js";
import AudioManager from "../../lib/AudioManager.js";

const $page = new PageModule({
  data:{
    coverUrl: '',
    songState: true
  },
  onLoad(o) {
    // 需要查询的歌单
    const sheet = o;
    // 显示导航标题
    wx.setNavigationBarTitle({
      title: sheet.name,
    })
   
    const DET = new Promise((resolve)=>{
      wx.request({
        url: 'http://localhost:4000/search?keywords=' + sheet.name,
        type: 'get',
        success: resolve
      })
    }).then((resolve)=>{
      let song = resolve.data.result.songs[0],
          songId = song.id;
          let H,
              retData;
      // reqUrl1('/song/detail?ids=', songId,H)
      const DETS = new Promise((resolve1)=>{
              wx.request({
                url: 'http://localhost:4000/song/detail?ids=' + songId,
                type: 'get',
                success: resolve1
              })
          }).then((resolve1)=>{
            this.setData({
              coverUrl: resolve1.data.songs[0].al.picUrl
            }) 
          })
    })
  },
  change_state(event){
    console.log(event)
    let sign = event.currentTarget.dataset.sign;
    if (sign){
      AudioManager.stopSong()
      this.setData({ songState: false})
    }else{
      AudioManager.playSong()
      this.setData({ songState: true })
    }
  }
})



$page.start()