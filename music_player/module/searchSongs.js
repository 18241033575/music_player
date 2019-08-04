import Storage from "../lib/Storage.js";

// 数据库名字
const dbname = "search-song"

export default class searchSongs extends Storage{

  constructor(){
    super(dbname);
  }

  // 添加歌曲缓存
  add(songName){
    // 如果当前数据不存在-保存
    if(!this.where('name',songName).find()){
      // 添加到缓存
      super.add({
        name: songName,
        time: new Date().getTime()
      }).save();
    }
  }
  // 获取所有歌曲缓存
  all(){

    // 将数据倒序
    this.order("time","desc");

    // 获取所有数据
    const db = super.all();

    // 截取数据
    const data = db.splice(0,10);

    // 多余数据删除
    db.forEach(songItem =>{

      this.del(songItem.name);
    })
    return data;
  }
  // 删除歌曲
  del(songName){

    // 构建查询方法
    this.where("name",songName);

    // 删除 调用父级方法
    super.del().save();
  }
}