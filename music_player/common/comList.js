// 国家地区
export const region = [
  { name: "欧美", id: 1001 },
  { name: "内地", id: 1001 },
  { name: "港台", id: 1001 },
  { name: "韩国", id: 1001 },
  { name: "日本", id: 1001 }
];

// 推荐歌单

export const sheet = [
  { name: "热门歌曲", id: 1001 },
  { name: "新歌专辑", id: 1001 },
  { name: "网络歌曲", id: 1001 }
];

// 请求url

export const request = {
  // 服务器主机
  host: "http://localhost:4000"
  // host: "http://api.atoz.ink/"
};
request.topid = request.host + "/artist/list?";//歌单
// request.query = request.host + "query/";//搜索
// request.lyrics = request.host + "lyrics/";//歌词
