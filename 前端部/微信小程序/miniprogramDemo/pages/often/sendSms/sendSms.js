// pages/often/sendSms/sendSms.js

const utils = require('../../../utils/util.js')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    phone: "",//手机号码
    verificationCodeBtn: {
      btnName: "获取验证码",//获取验证码的按钮名称
      time: null,//setInterval的次数，默认值是null
      timenum: 60,//倒计时
      disabled: false,//按钮是否禁用 //默认不禁用
    }
  },
  //获取验证码
  getVerificationCode() {
    var that = this;
    if (!this.data.phone) {
      utils.showModal("请输入手机号");
      return false;
    } else if (!utils.checkTelphone(this.data.phone)) {
      utils.showModal("手机号不正确");
      this.setData({
        phone: ""
      })
      return false;
    }

    let btnName = "verificationCodeBtn.btnName";
    let disabled = "verificationCodeBtn.disabled"
    let timenum = "verificationCodeBtn.timenum"
    let time = "verificationCodeBtn.time"

    let verificationCodeBtn = this.data.verificationCodeBtn;

    if (verificationCodeBtn.timenum === 60 && verificationCodeBtn.btnName == "获取验证码" && verificationCodeBtn.disabled == false) {
      console.log("获取验证码")
      that.setData({
        [disabled]: true
      })

      

      // 请求接口 start  默认注释掉的
      // let data = {
      //   phone: this.data.myProfile.phone
      // }
      // app.globalData.wxRequest.getRequest(url, data);

      // 请求接口 end 

      // 下面的方法应该写在回调中

      if (this.data.verificationCodeBtn.time === null) {
        that.data.verificationCodeBtn.time = setInterval(function () {

          if (that.data.verificationCodeBtn.timenum == 1) {
            clearInterval(that.data.verificationCodeBtn.time);
            that.setData({
              [btnName]: "获取验证码",
              [disabled]: false,
              [timenum]: 60,
              [time]: true
            })
            return false      //必须有
          }
          that.data.verificationCodeBtn.timenum--;
          that.setData({
            [btnName]: that.data.verificationCodeBtn.timenum + "s后重新获取",
            [disabled]: true,
          })
        }, 1000)
      }

    }







  },
  //获取输入的手机号
  getPhone(e) {
    this.data.phone = e.detail.value;
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