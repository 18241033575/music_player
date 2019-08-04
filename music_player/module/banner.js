/* 获取广告图信息 */ 

export default class Banner{
  
  constructor(page){

    // 监听一个广告图的动作信息
    Reflect.set(page,"actionBanner",Banner.actionBanner);
  }

  // 跳转方法
  static actionBanner(event){

    const action = event.currentTarget.dataset.action;

    // 是否为专题跳转
    if (action.atype === 0){

      wx.navigateTo({
        url: '/pages/sheet/list?id=' + action.data.id + "&name=" + action.data.name,
      })
    }
  }
  
  // 获取banner图信息,多种类型，跳转专题、单曲推荐

  getBanner(){
    const data = [];
    // 专题
    data.push({
      img: "http://p1.music.126.net/cfcmKhUZHOB-SiTKmbmFuw==/109951163956028440.jpg",
      atype: 0, //专题
      data: {
        id: 26,
        name: "热歌榜"
      }
    });

    // 单曲推荐
    data.push({
      img: "http://p1.music.126.net/5dQZxhChU-f7zbZLgGaFyA==/109951163956031123.jpg",
      atype: 1 //单曲推荐
    });

    // 单曲推荐
    data.push({
      img: "http://p1.music.126.net/GL4z3ludIHnVHpcuIwsFYQ==/109951163955952779.jpg",
      atype: 1 //单曲推荐
    });

    // 用promise模拟后台请求返回数据
    return new Promise((resolve)=>{
      resolve(data);
    });
  } 
}