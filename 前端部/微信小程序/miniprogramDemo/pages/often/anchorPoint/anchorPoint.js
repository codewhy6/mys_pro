/*
 * @Description: 
 * @fileName: 
 * @Author: FengYong
 * @Date: 2020-04-13 08:21:20
 * @LastEditors: fengyong
 * @LastEditTime: 2020-04-13 10:35:36
 */
// pages/anchorPoint/anchorPoint.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 左侧导航数据
    leftArray: ["选项一", "选项二", "选项三", "选项四", "选项五", "选项六", "选项七", "选项八"],
    leftIndex: 0, //左侧选中的下标
    // 右侧滚动区域数据
    rightArray: ["商品一", "商品二", "商品三", "商品四", "商品五", "商品六", "商品七", "商品八"],
    dataList:[]
  },

  // 右侧滚动时显示对应的左侧导航
  getScroll(e) {
    let scrollTop = e.detail.scrollTop
    var query = wx.createSelectorQuery();
    var that = this;
    // 获取元素高度
    query.select('.right-item').boundingClientRect(function(rect) {
      let height = rect.height
      // 当前元素距离顶部的距离 / 每一行的高度   向下取整
      that.setData({
        leftIndex: Math.floor(scrollTop / height)
      })
    }).exec();
  },
  // 左侧点击事件添加选中时的样式
  clickLeft(e) {
    let index = e.currentTarget.dataset.index;
    // toView属性 与右侧每一块区域id一一对应
    let toView = "a" + index
    this.setData({
      leftIndex: index,
      toView
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

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