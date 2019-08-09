// pages/search/list.js
import PageModule from "../../lib/Page.js"

const $page = new PageModule()

// 调用page
$page.start({
  onLoad(query){
    this.setData({

    })
    // const songName = query.q || '小小少年'
    // console.log(query)
    // 显示导航标题
    wx.setNavigationBarTitle({
      title: query.name,
    })
    const LIST = new Promise((resolve)=>{

    })
    const L = new Promise((resolve) => {
      wx.request({
        url: 'http://localhost:4000/playlist/detail?id=' + query.id,
        success: resolve
      })
    }).then((resolve) => {
      
    })
  }
});