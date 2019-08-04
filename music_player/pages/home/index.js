import pageModule from "../../lib/Page.js";
import  Banner from "../../module/banner.js";
import { region, sheet, request} from "../../common/comList.js";
import AudioManager from "../../lib/AudioManager.js";

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
    // region.forEach(item=>{

      const p = new Promise((resolve)=>{

        // 请求数据
        wx.request({
          url: 'http://localhost:4000/personalized',
          type: 'get',
          success: resolve
        })
      })
      sheetPromise.push(p);
    // });

    return{
      nameSpace: $namespace,
      data: Promise.all(sheetPromise)
    }
  },
  

  // 设置歌单信息
  setSheet(arg){
    const sheetData = [];
    arg.forEach((res,key)=>{
      sheetData.push(Object.assign({
        songs: res.data.result,
      },sheet[key])
      )
    });

    this.setData({ sheets: sheetData})
  },
  // 播放歌曲
  onPlayer(event) {
    
    const song = event.target.dataset.song,  // 播放歌曲
      songs = event.currentTarget.dataset.songs; // 播放歌单

    // 可能有外边距
    if(song){

      // 设置当前播放歌曲、歌单
      AudioManager.setSong(song,songs);
    }

  }
});




// 调用page
$page.start();