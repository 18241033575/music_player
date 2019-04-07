// 类的私有方法
const whereCompare ={
  // 等于
  "=" : function(that,value){
    return that == value;
  },

  // 大于
  ">": function (that, value) {
    return that > value;
  },

  // 小于
  "<": function (that, value) {
    return that < value;
  },

  // 大于等于
  ">=": function (that, value) {
    return that >= value;
  },

  // 小于等于
  "<=": function (that, value) {
    return that <= value;
  },
  // 不等
  "!=": function (that, value) {
    return that != value;
  },
  // 模糊查询
  "like": function (that, value) {
    return new RegExp(value, 'i').test(that);
  },
}


// 数据库的操作
export default class Storage{

  // 构造函数
  constructor(dbname){

    Object.assign(this,{
      dbname, // 数据库名
      cache: {
        add: {
          data: []
        }
      }
    })
  }



  // 实时获取类中数据库的数据
  static getDb(dbname){

    return wx.getStorageSync(dbname) || [];

  }

  // 获取where函数
  static getWhere(action){

    if(this.whereFn){
      return this.whereFn;
    }else{
      throw new Error(`调用 ${action} 方法时请先调用where方法查询`)
    }

  }

  // 构建查询语句
  where(...args){

    let [key ,compare ,value] = args;
    if(value === undefined){
      value = compare;
      compare = "=";
    }

    // 获取对比函数
    const compareFn = whereCompare[compare];

    // 用户传递进来的是否为当前支持的对比方式
    if(compareFn){

      // 构建where 查询函数
      this.whereFn = (item)=>{
        return compareFn(item[key],value);
      }
    }else{

      throw new Error("where 不支持" + compare + "对比方式")
    }
    return this;
  }
  
  // 添加数据
  add(data){
    // 如果是数组
    if (Array.isArray(data)){
      data.forEach((item)=>{
        this.add(item);
      })
      // 如果是对象
    }else if(/object/.test(typeof data)){
      // 添加到新增缓存
      this.cache.add.data.push(data);
    }else{
      throw new Error("add 方法接受对象为参数");
    }
    return this;
  }

  // 删除数据
  del(){

    this.cache.del = {
      where: Storageaa.getWhere.call(this,"del")
    }
  }

  // 修改数据

  updata(data){

    if(/object/i.test(typeof data)){

      this.cache.updata = {
        data,
        where: Storage.getWhere.call(this,"updata")
      }

    }else{
      throw new Error("updata 仅接收对象参数")
    }
  }
  // 查找一条数据
  find(){

    // 先拿本地数据，与缓存合并保存
    const db =Storage.getDb(this.dbname);

    return db.find(Storage.getWhere.call(this,"find"));
  }

  // 查询多条
  select(){

    // 先拿本地数据，与缓存合并保存
    const db = Storage.getDb(this.dbname),
      data = db.filter(Storage.getWhere.call(this, "select"));

    // 如果需要排序
    this.sortFn && data.sort(this.sortFn)
    return this.sliceArg ? data.slice(...this.sliceArg) : data;
  };

 

  // 排序 默认正序
  order(key,sort="ssc"){

    this.sortFn = (a,b)=>{

      return /desc/i.test(sort)?b[key] - a[key]:a[key] - b[key];
    }
    return this;
  }

  // 数据截取
  limit(s,e){

    if(e === undefined){
      e = s;
      s = 0;
    }else{
      --s;
      e+=s;
    }

    this.sliceArg = [s,e];
    return this;

  }

  // 将缓存更新到本地数据
  save(){

    let db = Storage.getDb(this.dbname);

    // 删除数据
    if(this.cache.del){
      db = db.filter((item)=>{
        
        return !this.cache.del.where(item);
      });
    }

    // 更新数据
    if(this.cache.updata){
      db.forEach((item)=>{
        if(this.cache.updata.where(item)){
          Object.assign(item, this.updata.where.data);
        }
      })
    }

    // 是否存在add数据缓存
    if(this.cache.add){
      db.push(...this.cache.add.data);
    }

    // 更新本地缓存
    wx.setStorageSync(this.dbname, db);

    // 更新类的缓存
    this.cache = {
      add: {
        data: []
      }
    }
    return this;
  }
  
}