// 国家地区
export const region = [
  { name: "全部", id: 0 },
  { name: "内地", id: 7 },
  { name: "日本", id: 8 },
  { name: "韩国", id: 16 },
  { name: "欧美", id: 96 }
];

// 推荐歌单

export const sheet = [
  { name: "推荐歌单", id: 1 },
  { name: "新歌专辑", id: 0 },
  { name: "网络歌曲", id: 15 }
];

// 请求url
const host = "http://localhost:4000/";

function reqUrl(type,id){
  let url = '';
  switch(type){
    case 'list':
      url = host + "/top/song?ctypeat=" + id;
      break;
    default:
      break;
      
  }
  const P = new Promise((resolve)=>{
    wx.request({
      url: url,
      success: resolve
    }).then(()=>{
      console.log(resolve);
    })
  })
  
}

export const request = {
  // 服务器主机
  host: "http://localhost:4000/"
};
request.topid = request.host + "/artist/list?cat=";//歌单
request.query = request.host + "query/";//搜索
request.lyrics = request.host + "lyrics/";//歌词
