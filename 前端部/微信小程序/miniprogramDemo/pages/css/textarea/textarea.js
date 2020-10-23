// pages/css/textarea/textarea.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    TCshow: false,
    message: "我的弹窗",
    visibility: "#333"
  },


  /**
   * @Description: 显示弹窗
   * @Author: LiSuwan
   * @Date: 2019-11-09 15:24:31
   * @return: 
   */
  showPopup(){
    this.setData({
      TCshow:true,
      visibility: "transparent"
    })
  },
  onMyEvent: function (e) {
    this.setData({
      visibility: e.detail.color,
    })
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