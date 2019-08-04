
import PageModule from "../../lib/Page.js"

const $page = new PageModule({

  data: {
    url: '', // 请求的url
    page: 1, // 查询第几页
    row: 20, // 每页多少条数据
    songs: [], // 数据容器数组
    sheet_id: '', // 歌单的id
    sheet_name: '' // 歌曲区域名称
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
  },

  // 加载数据
  loadPage(){

    // 加载开始显示加载图标
    wx.showLoading();

    // 发送请求
    const res_data = new Promise((resolve,reject)=>{

      // 请求数据
      wx.request({
        url: 'http://localhost:4000/mv/all?area=' + this.data.sheet_name,
        type: 'get',
        success: resolve
      })
    });
    // 数据加载完毕
    res_data.then(this.codePage.bind(this))
  },

  // 处理数据
  codePage(res){
    console.log(res);
    // 隐藏加载图标
    wx.hideLoading();
    this.data.songs.push(...res.data.data);
    this.data.songs.forEach((item,index)=>{
      item.picUrl = item.cover
    })
    this.setData({ songs: this.data.songs })
  }
})


// 调用page
$page.start();