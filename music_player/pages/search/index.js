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
    console.log(data);
    data.forEach((item)=>{
        console.log(item)
        let SEARCH = new Promise((resolve)=>{
            wx.request({
              url: '',
            })
        })
    })
    this.setData({ list: data, q: '' });
  }
});


$page.start();