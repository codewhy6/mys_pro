// pages/ceshicavans/ceshicavans.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // const wxGetImageInfo = promisify(wx.getImageInfo)

    // Promise.all([
    //   wxGetImageInfo({
    //     src: 'http://some-domain.com/background.png'
    //   }),
    //   wxGetImageInfo({
    //     src: 'http://some-domain.com/api/generate/qrcode'
    //   })
    // ]).then(res => {
    //   const ctx = wx.createCanvasContext('shareCanvas')

    //   // 底图
    //   ctx.drawImage(res[0].path, 0, 0, 600, 900)

    //   // 作者名称
    //   ctx.setTextAlign('center')    // 文字居中
    //   ctx.setFillStyle('#000000')  // 文字颜色：黑色
    //   ctx.setFontSize(22)         // 文字字号：22px
    //   ctx.fillText("作者：一斤代码", 600 / 2, 500)

    //   // 小程序码
    //   const qrImgSize = 180
    //   ctx.drawImage(res[1].path, (600 - qrImgSize) / 2, 530, qrImgSize, qrImgSize)

    //   ctx.stroke()
    //   ctx.draw()
    // })
    // const wxCanvasToTempFilePath = promisify(wx.canvasToTempFilePath)
    // const wxSaveImageToPhotosAlbum = promisify(wx.saveImageToPhotosAlbum)

    // wxCanvasToTempFilePath({
    //   canvasId: 'shareCanvas'
    // }, this).then(res => {
    //   return wxSaveImageToPhotosAlbum({
    //     filePath: res.tempFilePath
    //   })
    // }).then(res => {
    //   wx.showToast({
    //     title: '已保存到相册'
    //   })
    // })
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