import Storage from "../lib/Storage.js";

// 数据库名字
const dbname = "song-state"

export default class searchSongs extends Storage {

  constructor() {
    super(dbname);
  }
  // 设置歌曲播放状态
  static setState(state){
    wx.setStorage({
      key: 'songState',
      data: state,
    })
  }

  // 获取歌曲播放状态
  static getState(){
    let value = wx.getStorageSync('songState');
    return value || false
  } 
}