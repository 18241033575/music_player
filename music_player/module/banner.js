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

    
   
  } 
}