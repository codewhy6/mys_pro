// pages/often/moreLoding/moreLoding.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    moreLoadingParams: {//请求数据参数
      size: 10,//每页显示条数
      page: 1,//页码
      hasNextPage: true,//是否有下一页
      hasLoading: true,//是否可以请求数据 
    },
    moreLoadingList:[],//列表数据
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  //获取数据 默认在onLoad中执行
  getMoreLoadingList() {
    let that = this;
    let url = "请求数据接口";
    let params = that.data.moreLoadingParams;
    if (params.hasLoading == true) {
      that.data.moreLoadingParams.hasLoading = false;
      app.globalData.wxRequest.getRequest(url, params).then(res => {
        that.data.moreLoadingParams.hasLoading = true;
        if (res.data.code == 200) {
          let data = res.data.data.list;
          let hasNextPage = "moreLoadingParams.hasNextPage"
          that.setData({
            moreLoadingList: that.data.moreLoadingList.concat(data),
            [hasNextPage]: res.data.data.hasNextPage
          })
          console.log("请求数据", that.data.moreLoadingList)
        }
      })
    }

  },

  //点击加载更多获取更多数据
  moreLoadContents() {
    if (this.data.moreLoadingParams.hasLoading == true && this.data.moreLoadingParams.hasNextPage == true) {
      this.data.moreLoadingParams.page += 1;
      this.getMoreLoadingList()
    }
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