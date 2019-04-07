 import Storage from "../lib/Storage.js"

  // 对象传 url 参数
  function objDeUcode(obj){
    
    return Object.keys(obj).map(item=>item + "=" + obj[item]).join("&");

  }

  // 发送一个 http 的 get 请求
  function httpGet(url,uData){

    const db = new Storage("http_get");
    console.log(db)
    const data = db.where("url",url).find();
    const deUrl = url + '?' + objDeUcode(uData);


    if(data && new Date(data.time).getDate() >= new Date.getDate()){

      return new Promise((resolve)=>{
        resolve(data.data);
      })
    }else{

      return new Promise((resolve,reject)=>{

        wx.request({
          url: deUrl,
          success: (res) => {

            // 添加到本地
            db.add({
              data: res.data,
              url: deUrl,
              time: new Date().getTime()
            }).save();
            resolve(res);
          },
          fail: reject
        })
      })
    }
  }
  
//   const formatTime = date => {
//   const year = date.getFullYear()
//   const month = date.getMonth() + 1
//   const day = date.getDate()
//   const hour = date.getHours()
//   const minute = date.getMinutes()
//   const second = date.getSeconds()

//   return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
// }

// const formatNumber = n => {
//   n = n.toString()
//   return n[1] ? n : '0' + n
// }

// module.exports = {
//   formatTime: formatTime
// }
