import pageModule from "../../lib/Page.js";
// import Banner from "../../module/banner.js";
import {
  region,
  sheet,
  request
} from "../../common/comList.js";
import AudioManager from "../../lib/AudioManager.js";
import ListenSongs from "../../module/listenSongs.js";
import SongState from "../../module/getSongState.js";
const $listen_song = new ListenSongs();

// 当前页面的命名空间
const $namespace = "home/index";

// 实例page模型

const $page = new pageModule({
  data: {
    oldlist: [],
    songState: false,
    flag: true,
    bannerFlag : true
  },
  // 监听一个加载事件
  onLoad(o) {

    // 加载banner图信息

    if (this.data.bannerFlag){
      let bannerData = [];

      const BAN = new Promise((resolve) => {
        wx.request({
          url: 'http://localhost:4000/banner?type=2', // type - 2 - iphone
          type: 'get',
          success: resolve
        })
      }).then((resolve) => {
        for (let i = 0; i < 3; i++) {
          bannerData.push({
            img: resolve.data.banners[i].pic,
            title: resolve.data.banners[i].typeTitle
          })
        }
        this.setData({
          banner: bannerData
        });
      })
      this.setData({ bannerFlag: false })
    }
    


    // 设置国家地区
    this.setData({
      region
    });

    // 获取歌单信息
    this.getSheet()
      .findNameSpace($namespace)
      .then(this.setSheet.bind(this));

    // 获取歌曲播放历史 获取播放状态
    this.updata();
    if (this.data.flag) {
      // 第一次进入页面停止播放音乐
      SongState.setState(false)
      this.setData({
        flag: false
      })
    }
  },

  // 获取歌单信息
  getSheet() {

    const sheetPromise = [];
    // 循环歌单
    // region.forEach(item=>{

    const p = new Promise((resolve) => {

      // 请求数据
      wx.request({
        url: 'http://localhost:4000/personalized',
        type: 'get',
        success: resolve
      })
    })
    sheetPromise.push(p);
    // });

    return {
      nameSpace: $namespace,
      data: Promise.all(sheetPromise)
    }
  },


  // 设置歌单信息
  setSheet(arg) {
    const sheetData = [];
    arg.forEach((res, key) => {
      sheetData.push(Object.assign({
        songs: res.data.result,
      }, sheet[key]))
    });

    this.setData({
      sheets: sheetData
    })
  },
  onShow() {
    let data = $listen_song.all();
    this.setData({
      oldlist: data
    });
  },
  updata() {
    let data = $listen_song.all();
    this.setData({
      oldlist: data
    });

    let state = SongState.getState()
    this.setData({
      songState: state
    })
  },
  // 播放、暂停音乐
  operateSongs(event) {
    let sign = event.currentTarget.dataset.sign;
    if (sign) {
      AudioManager.stopSong()
      this.setData({
        songState: false
      })
    } else {
      if (this.data.oldlist[0]){
        AudioManager.setSong(this.data.oldlist[0])
        AudioManager.playSong()
        this.setData({
          songState: true
        })
      }
    }
    SongState.setState(!sign)
  }
});

// 调用page
$page.start();