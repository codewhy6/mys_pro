const wxRequest = require('./http.js')
const regExp = require('./regExp.js')
const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

/**
 * @Description: 调用登录接口
 * @Author: LiSuwan
 * @Param: {Obj} app:全局app方法
 * @Param：{funciton} callBack:执行回调方法
 * @Date: 2019-08-14 21:29:07
 */
let login = function (app, callBack) {
  wx.login({
    success(res) {
      if (res.code) {
        //发起网络请求
        let url = "my/login";
        let data = {
          jsCode: res.code
        }
        data.hideLoading = app.globalData.hideLoading || false;
        let contentType = "application/x-www-form-urlencoded;charset=utf-8"
        wxRequest.getRequest(url, data, contentType).then(res => {
          app.globalData.openId = res.data.data.openId;
          wx.setStorage({
            key: "openId",
            data: res.data.data.openId
          })
          app.globalData.sessionKey = res.data.data.sessionKey;
          // app.globalData.nickName = res.data.data.user.nickName;
          // app.globalData.userImg = res.data.data.user.userImg;
          // app.globalData.phone = res.data.data.user.phone;  //将openId赋给app.js的全局变量
          callBack && callBack(app.globalData.openId, app.globalData.sessionKey);
        })

      } else {
        console.log('登录失败！' + res.errMsg)
      }
    }
  })
}


/**
 * @Description: 获取今天的年月日
 * @Author: LiSuwan
 * @Return: {String} 今天的日期，格式“YYYY-MM-DD”
 * @Date: 2019-08-15 21:41:07
 */
let getToday = function () {
  let date = new Date()
  const year = date.getFullYear()
  let month = date.getMonth() + 1
  if (month < 10) {
    month = "0" + month
  }
  const day = date.getDate()
  return "" + year + "-" + month + "-" + day
}

/**
 * @Description: 手机号码替换成星号
 * @Author: LiSuwan
 * @Param: {String} phone:手机号码
 * @Date: 2019-08-15 19:04:32
 */
let replaceTel = function (phone) {
  var showPhone = phone.replace(/^(\d{3})\d{4}(\d+)/, "$1****$2")
  return showPhone;
}

/**
 * @Description: 校验手机号码是否正确
 * @Author: LiSuwan
 * @Date: 2019-08-15 21:48:42
 */
let checkTelphone = function (phone) {
  return regExp.telPhone.test(phone) ? true : false
}
/**
  * @Description: 提示弹窗
  * @Author: LiSuwan
  * @Param:{String}:message:提示语
  * @Date: 2019-09-05 21:01:20
  */
let showModal = function (message, showCancel=false,callback=undefined) {
  wx.showModal({
    title: '提示',
    content: message,
    showCancel: showCancel,
    success(res) {
      if (res.confirm) {
          callback && callback()
      }
    }
  })
}






module.exports = {
  formatTime: formatTime,
  login: login,
  getToday: getToday,
  replaceTel: replaceTel,
  checkTelphone: checkTelphone,
  showModal: showModal
}