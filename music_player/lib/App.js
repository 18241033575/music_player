import Event from './Event.js'

// 因为 app方法还没有被执行，所以getApp会是一个undefined
let app;

// 公共数据的发送和保存
export default class AppModule extends Event{

  // 全局数据
  globalData = {};

  constructor(){
    super();
  }

  // 给当前页面设置数据,不要在实际显示的页面设置数据，通过assign代理直接给当前页设置
  assign(key,val){
    // 拿到当前显示的页面实例
    const page = app.page.page,
          kType = typeof key;
          if(/string/i.test(kType) && val !== undefined){
            page.setData({
              [key]: val
            })
          } else if (/object/i.test(kType)){
            page.setData(key);
          }
  }


  // 用于修改全局数据
  // data()->直接返回全局数据这个对象
  // data('number')=>返回全局数据中的number属性值
  // data('number',123)=>设置
  // data(num:1,a:2)=>设置
  data(...arg){
    // 没有参数直接返回
    if(arg.length === 0){
      return this.globalData;
    } else if (arg.length === 1){

      // 获取第一个参数类型
      const kType = typeof arg[0];

      // 如果是字符串
      if(/string/i.test(kType)){

        // 获取某一项
        return this.globalData[arg[0]]
      }
      // 如果是对象
      if (/object/i.test(kType)) {

        const data = arg[0];
        for(let key in data){
          this.data(key,data[key]);
        }
      }
    }else if(arg.length === 2){
      this.globalData[arg[0]] = arg[1];
    }
  }

  // 初始化方法
  start() {

    const appExample = this;
    // 监听一个app的加载事件
    this.oneEvent('onLauch',function(){
       Reflect.set(this,'example',appExample);
      
      //  拿到app实例
      app = this;
    })

    // App方法调用的时候回接收一个对象，会通过浅拷贝的方法将数据添加到app方法里 
    App(this);
  }
}