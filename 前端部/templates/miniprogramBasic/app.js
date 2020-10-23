const wxRequest = require('./utils/http.js')

App({
  onLaunch(options) {
    // Do something initial when launch.
  },
  onShow(options) {
    // Do something when show.
  },
  onHide() {
    // Do something when hide.
  },
  onError(msg) {
    console.log(msg)
  },
  globalData: {
    url: "",
    imgUrl: "https://mini.mubensheji.com/wxres/",//静态图片路径
    wxRequest: wxRequest,//调用接口方法
  }
})