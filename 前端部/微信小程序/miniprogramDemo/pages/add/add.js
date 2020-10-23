// pages/add/add.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    optionList: [
        {
            icon: ''
        },
        {
            icon: ''
        }
    ],
    showAddBtn: 1
},
recordValue: function (e){
    let _optionList = this.data.optionList;
    let _index = e.target.dataset.index;
    let value = e.detail.value;
    _optionList[_index].value = value;
    this.setData({optionList: _optionList});
},
addOption: function (e){

    let _optionList = this.data.optionList;
    _optionList.push({})
    this.setData({optionList: _optionList});
    console.log(this.data.optionList)
    // 选项大于15个后移除添加按钮
    if(_optionList.length >= 15) {
        this.setData({showAddBtn: 0});
    } else if (_optionList.length < 15){
      this.setData({ showAddBtn: 1 });
    }
},
delOption: function (e){
    let _index = e.target.dataset.index;
    let _optionList = this.data.optionList;

    _optionList.splice(_index, 1);

    this.setData({optionList: _optionList});
    if(_optionList.length < 15) {
      this.setData({ showAddBtn: 1 });
    }
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