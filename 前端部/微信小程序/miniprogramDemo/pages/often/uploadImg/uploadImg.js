// pages/often/uploadImg/uploadImg.js
const utils = require("../../../utils/util.js")

Page({ 

  /**
   * 页面的初始数据
   */
  data: {
    imageList:"",//上传图片
  },
  //获取上传图片的数量
  getUploadImgCount(e){
    this.setData({
      imageList: e.detail.imageList
    })
  },
  //上传图片
  uploadImgBtn(){
    if (this.data.imageList.length == 0) {
      utils.showModal("请选择图片");
      return false;
    }
    this.uploadImg.getUploadImages().then(res => {
      // 回调
      
    })
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.uploadImg = this.selectComponent("#uploadingImg")

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