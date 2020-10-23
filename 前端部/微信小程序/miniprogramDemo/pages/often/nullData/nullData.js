// mine/components/nullData/nullData.js
var app = getApp()
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    text:{
      type:String,
      value:"暂无记录",
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    imgurl: app.globalData.offlineImgUrl,//静态图片的路径
    // text:"暂无申请记录",//文字提示
  },

  /**
   * 组件的方法列表
   */
  methods: {

  }
})
