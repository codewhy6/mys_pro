// pages/often/components/components.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    TCshow:false,
    message:"我是父组件给子组件传递参数"

  },
  showPopup(){
    this.setData({
      TCshow:true
    })
  },
  //接收子组件给父组件传递的参数
  onMyEvent(e){
    console.log("我是子组件给父组件传递的参数："+ e.detail.color)

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