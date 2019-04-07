import Event from "./Event.js";

// 获取全局的app对象
const app = getApp();

// 方法的共用 方法的导出

export default class PageModule extends Event{
  // 全局数据
  globalData = {};

  // 数据筛选方法
  static select(obj){
    const events = {},
          data = {};

    Object.keys(obj).forEach(key=>{

      if(/function/i.test(typeof obj[key])){
        events[key] = obj[key];
      }else{
        data[key] = obj[key];
      }

    });
    return {events,data}
  }

  constructor(data) {

    super();


    const appExample = this;
    // 监听一个app的加载事件
    this.oneEvent('onLoad', function () {
      Reflect.set(app, 'page', {
        example: appExample,
        page: this,
        route: this.route
      });
    });

    // 判断是否传入data
    data && this.extend(data);
  }

  // 导出实例
  exports(...arg){

    // 需要导出的事件
    arg = arg.length ? arg : Object.keys(this.event);

    // 
    const events = {};
    arg.forEach(eType=>{
      if(/function/i.test(typeof this[eType])){
        events[eType] = this[eType];
      }else{
        throw new Error(`不存在 ${eType}事件`);
      }
    })
  }

  // 导入
  extend(obj){
    // 筛选事件和属性
    const {events,data} = PageModule.select(obj);

    for(let eType in obj){
      this.addEvent(eType,obj[eType]);
    }

    // 添加属性
    Object.assign(this,data);
  }

  // 初始方法

  start(data) {
    data && this.extend(data);
  
    // App方法调用的时候回接收一个对象，会通过浅拷贝的方法将数据添加到app方法里 
    Page(this);
  }
}