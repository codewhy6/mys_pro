// pages/often/updateBackground/updateBackground.js

// 说明：1、需要配置在后台使用的能力 requiredBackgroundModes 2、需配置地理位置用途说明 scope.userLocation
        

Page({

  /**
   * 页面的初始数据
   */
  data: {
    longitude:"",//经度
    latitude:"",//纬度
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this;
    wx.startLocationUpdateBackground({
      success(res) {
        console.log('开启后台定位', res)
      },
      fail(res) {
        console.log('开启后台定位失败', res)
      }
    })


    const _locationChangeFn = function (res) {
      console.log('location change', res)
      that.setData({
        longitude: res.longitude,
        latitude: res.latitude
      })

    }
    wx.onLocationChange(_locationChangeFn)

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