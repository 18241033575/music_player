// pages/search/list.js
import PageModule from "../../lib/Page.js"

const $page = new PageModule()

// 调用page
$page.start({
  onLoad(query){
    const songName = query.q || '小小少年'
    console.log(1)
  }
});