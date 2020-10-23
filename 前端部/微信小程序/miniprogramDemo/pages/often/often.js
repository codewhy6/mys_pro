// pages/often/often.js

Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  skippingComponent() {
    wx.navigateTo({
      url: './components/components',
    })
  },
  skippingSendSms() {
    wx.navigateTo({
      url: './sendSms/sendSms',
    })
  },
  skippingMoreLoadingData() {
    wx.navigateTo({
      url: './moreLoding/moreLoding',
    })
  },
  skippingCallPhone() {
    wx.navigateTo({
      url: './callPhone/callPhone',
    })
  },
  skippingUpdateBackground() {
    wx.navigateTo({
      url: './updateBackground/updateBackground',
    })
  },
  skippingUploadImg(){
    wx.navigateTo({
      url: './uploadImg/uploadImg',
    })
  },
  anchorPoint(){
    wx.navigateTo({
      url: './anchorPoint/anchorPoint',
    })
  },
  nullData(){
    wx.navigateTo({
      url: './nullData/nullData',
    })
  },
  openCamera(){
    wx.navigateTo({
      url: './openCamera/openCamera',
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