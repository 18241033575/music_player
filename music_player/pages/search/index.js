import PageModul from "../../lib/Page.js";
import searchSongs from "../../module/searchSongs.js";

// 歌曲列表缓存类
const $search_songs = new searchSongs(); 

const $page = new PageModul({
  data:{
    q: '',
    list: []
  },

  onLoad(){
    this.updata();
  },

  query(e){
    // 获取数据
    const q = e.detail.value.q.trim();
    // 判断是否全是空格
    if(!q){
      return wx.showToast({
        icon: 'none',
        title: '不能全是空格'
      })
    }

    // 保存到数据库
    $search_songs.add(q);
    // 更新数据
    this.updata();
    // 跳转播放页面
    this.search_song();
  },

  del(event){

    // 获取歌曲名
    const songName = event.currentTarget.dataset.song;

    // 删除数据库数据
    $search_songs.del(songName);

    // 更新数据库
    this.updata();
  },

  updata(){
    const data = $search_songs.all();
    this.setData({ list: data, q: '' });
    data.forEach((item) => {
      let SEARCH = new Promise((resolve) => {
        wx.request({
          url: 'http://localhost:4000/search?keywords=' + item.name,
          type: 'get',
          success: resolve
        })
      }).then((resolve) => {
        let songId = resolve.data.result.songs[0].id;
        let SONGDET = new Promise((resolve1) => {
          wx.request({
            url: 'http://localhost:4000/song/detail?ids=' + songId,
            type: 'get',
            success: resolve1
          })
        }).then((resolve1) => {
          item.picUrl = resolve1.data.songs[0].al.picUrl;
          item.artistName = resolve1.data.songs[0].ar[0].name;
          this.setData({ list: data, q: '' });
        })
      })
    })
  },
  search_song(){
    
  }
});


$page.start();