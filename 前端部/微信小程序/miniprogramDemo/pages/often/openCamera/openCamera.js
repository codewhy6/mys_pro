// pages/often/openCamera/openCamera.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    showCamera: true
  },
  /**
   * @Description: 获取屏幕的尺寸
   * @Author: LiSuwan
   * @Date: 2020-04-20 13:45:33
   */
  getMobileSystemInfo() {
    const windowWidth = wx.getSystemInfoSync().windowWidth;
    const windowHeight = wx.getSystemInfoSync().windowHeight;
    this.setData({
      height: windowHeight,
      width: windowWidth
    })
  },
  /**
   * @Description: 摄像头打开出错
   * @Author: LiSuwan
   * @Date: 2020-04-21 11:39:19
   */
  error() {
    let that = this;

    that.setData({
      showCamera: false
    })
    wx.showModal({
      title: '提示',
      content: "您已拒绝授权将无法使用AR实景选窗帘功能,是否重新授权",
      showCancel: true,
      success(res) {
        if (res.confirm) {
          wx.openSetting({})
        } else {
          that.exitCamera()
        }
      }
    })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    this.getMobileSystemInfo()
    let that = this;
    /**
     * @Description: 获取是否授权打开摄像头
     * @Author: LiSuwan
     * @Date: 2020-04-21 11:39:19
     */
    wx.getSetting({
      success(res) {
        if (res.authSetting['scope.camera']) {
          that.setData({
            showCamera: true
          })
        }
      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },



  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})