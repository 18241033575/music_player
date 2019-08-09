import PageModule from "../../lib/Page.js";
import {
  reqUrl1
} from "../../common/comList.js";
import AudioManager from "../../lib/AudioManager.js";
import SongState from "../../module/getSongState.js";
import ListenSong from "../../module/listenSongs.js";


const $listen_songs = new ListenSong(); 

const $page = new PageModule({
  data: {
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
    let song = {},
        songs = {};
    const DET = new Promise((resolve) => {
      wx.request({
        url: 'http://localhost:4000/search?keywords=' + sheet.name,
        type: 'get',
        success: resolve
      })
    }).then((resolve) => {
      let songMsg = resolve.data.result.songs[0],
        songId = songMsg.id;
      song.name = songMsg.name;
      songs.name = songMsg.album.artist.name; // 播放歌单
      song.singer = sheet.singer; // 歌手
      song.cover = sheet.picUrl1 + sheet.picUrl2 + '==/' + sheet.picUrl3 + sheet.picUrl4;     
      this.setData({ coverUrl: song.cover})
      const DETS = new Promise((resolve1) => {
        wx.request({
          url: 'http://localhost:4000/song/url?id=' + songId,
          type: 'get',
          success: resolve1
        })
      }).then((resolve1) => {
        song.url = resolve1.data.data[0].url;
        if (song.url){
          // 设置当前播放歌曲、 歌单
          AudioManager.setSong(song, songs);
          $listen_songs.add(song);
          this.setData({songState: true})
          SongState.setState(true)
        }else{
          // 提示地址错误
          wx.showToast({
            title: '音乐地址错误',
            // icon: 'error',
            duration: 2000
          })
          SongState.setState(false)
        }
      })
    })
  },
  onShow() {
    let state = SongState.getState()
    this.setData({
      songState: state
    })
  },
  change_state(event) {
    let sign = event.currentTarget.dataset.sign;
    if (sign) {
      AudioManager.stopSong()
      this.setData({
        songState: false
      })
    } else {
      AudioManager.playSong()
      this.setData({
        songState: true
      })
    }
    SongState.setState(sign)
  }
})



$page.start()