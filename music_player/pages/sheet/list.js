import PageModule from "../../lib/Page.js"
import AudioManager from "../../lib/AudioManager.js";
import SongState from "../../module/getSongState.js";
import ListenSong from "../../module/listenSongs.js";


const $listen_songs = new ListenSong(); 


const $page = new PageModule({

  data: {
    url: '', // 请求的url
    page: 1, // 查询第几页
    row: 20, // 每页多少条数据
    songs: [], // 数据容器数组
    sheet_id: '', // 歌单的id
    sheet_name: '', // 歌曲区域名称
    oldlist: [], // 历史播放记录
    songState: false,
  },

  onLoad(o) {
    // 需要查询的歌单
    const sheet = o;

    this.setData({
      sheet_id: sheet.id,
      sheet_name: sheet.name
    });

    // 显示导航标题
    wx.setNavigationBarTitle({
      title: sheet.name,
    })

    this.loadPage();
    
    // 请求歌曲历史记录
    this.updata();

    
  },

  // 加载数据
  loadPage() {

    // 加载开始显示加载图标
    wx.showLoading();

    // 发送请求
    const res_data = new Promise((resolve, reject) => {

      // 请求数据
      if (this.data.sheet_id > 100) {
        wx.request({
          url: 'http://localhost:4000/playlist/detail?id=' + this.data.sheet_id,
          type: 'get',
          success: resolve
        })
      } else {
        wx.request({
          url: 'http://localhost:4000/mv/all?area=' + this.data.sheet_name,
          type: 'get',
          success: resolve
        })
      }

    });
    // 数据加载完毕
    res_data.then(this.codePage.bind(this))
  },

  // 处理数据
  codePage(res) {
    console.log(res)
    // 隐藏加载图标
    wx.hideLoading();
    if (this.data.sheet_id < 100) {
      this.data.songs.push(...res.data.data);
      this.data.songs.forEach((item, index) => {
        item.picUrl = item.cover
      })
      this.setData({
        songs: this.data.songs
      })
    }else{
      this.data.songs.push(...res.data.playlist.tracks);
      this.data.songs.forEach((item, index) => {
        item.picUrl = item.al.picUrl
      })
      this.setData({
        songs: this.data.songs
      })
    }
  },


  // 播放歌曲
  // onPlayer(event) {
  //   let songId = event.target.dataset.song.al.id,
  //       songName = event.target.dataset.song.name,
  //     songCover = event.target.dataset.song.al.picUrl;
  //   let song = {},
  //     songs = {};
  //   if (songId){
  //     const ID = new Promise((resolve)=>{
  //       wx.request({
  //         url: 'http://localhost:4000/search?keywords=' + songName,
  //         type: 'get',
  //         success: resolve
  //       })
  //     }).then((resolve)=>{
  //       let flag = true;
  //       resolve.data.result.songs.forEach((item)=>{
  //         if ((item.name == songName) && flag){
  //           flag = false;
  //           song.name = item.name; // 播放歌曲
  //           song.cover = songCover; // 封面
  //           songs.name = songName; // 播放歌单
  //           song.singer = item.artists[0].name; // 歌手
  //           const URL = new Promise((resolve1)=>{
  //             wx.request({
  //               url: 'http://localhost:4000/song/url?id=' + item.id,
  //               type: 'get',
  //               success: resolve1
  //             })
  //           }).then((resolve1) => {
  //             song.url = resolve1.data.data[0].url;

  //              // 设置当前播放歌曲、歌单
  //             AudioManager.setSong(song, songs);
  //             $listen_songs.add(song)
  //             flag = false;
  //           })
  //         }
  //       })
  //     })
  //   }
  // },
  updata() {
    const data = $listen_songs.all();
    this.setData({ oldlist: data});

    let state = SongState.getState()
    this.setData({songState: state})
  },
  onShow(){
    this.updata()
  },
  // 播放、暂停音乐
  operateSongs(event) {
    let sign = event.currentTarget.dataset.sign;
    if (sign) {
      AudioManager.stopSong()
      this.setData({ songState: false })
    } else {
      console.log(this.data.oldlist[0])
      AudioManager.setSong(this.data.oldlist[0])
      AudioManager.playSong()
      this.setData({ songState: true })
    }
    SongState.setState(sign)
  }
})


// 调用page
$page.start();