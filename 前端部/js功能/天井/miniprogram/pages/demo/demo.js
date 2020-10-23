const utils = require('../../utils/util.js')

Page({

  /**
   * 页面的初始数据
   */
  data: {

  },
  showModal2:function(){
    utils.showModal("确认、取消两个按钮", true);
  },
  showModal1: function () {
    utils.showModal("只有确认一个按钮");
  },
  //get方式请求参数
  getAjax(){

    let url = "接口路径";
    //Url 接口路径 
    //data 参数
    //contentType: 参数传递方式是"application/json"则不需要传递，当参数传递方式form-data时，则需要传值"application/x-www-form-urlencoded;charset=utf-8"
    app.globalData.wxRequest.getRequest(url, data, "application/x-www-form-urlencoded;charset=utf-8").then(res => {
      console.log(res)
    });

  },
  //get方式请求参数
  postAjax() {
    let url = "接口路径";
    //Url 接口路径 
    //data 参数
    app.globalData.wxRequest.postRequest(url, data, ).then(res => {
      console.log(res)
    });

  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})