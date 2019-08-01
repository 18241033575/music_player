import pageModule from "../../lib/Page.js"
import  Banner from "../../module/banner.js"
import { region, sheet, request} from "../../common/comList.js"

// 当前页面的命名空间
const $namespace = "home/index";

// 实例page模型

const $page = new pageModule({

  // 监听一个加载事件
  onLoad(o){

    // 加载banner图信息
    const banner = new Banner(this);
    
    banner.getBanner()
    .then(data=>{
      
      this.setData({banner :data});
    });

    // 设置国家地区
    this.setData({ region });

    // 获取歌单信息
    this.getSheet()
    .findNameSpace($namespace)
    .then(this.setSheet.bind(this));

  },

  // 获取歌单信息
  getSheet(){

    const sheetPromise = [];

    // 循环歌单
    sheet.forEach(item=>{

      const p = new Promise((resolve)=>{

        const url = request.topid + item.id;

        wx.request({
          url: url,
          success: resolve
        })
      })
      sheetPromise.push(p);
    });

    return{
      nameSpace: $namespace,
      data: Promise.all(sheetPromise)
    }
  },

  // 设置歌单信息
  setSheet(arg){
   
    const sheetData = [];
    console.log(arg);
    arg.forEach(res=>{

      sheetData.push(Object.assign({
        songs: res.data.artists
      }, sheet[key]));
    });

    this.setData({ sheets: sheetData})
  }
});

// 调用page
$page.start();