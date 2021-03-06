
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
  * @Param:{Boolean}:showCancel:是否显示 取消按钮，默认不显示
  * @Param:{Function}:callback:点击确定执行的回调函数
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


/**
  * @Description: 设置文章详情的图片尺寸
  * @Author: LiSuwan
  * @Param:{String}:content:文章详情的内容
  * @Date: @Date: 2019-11-20
  */
let setArticleDetailImgSize = function(content){
  content = content.replace(/<img/g, '<img style="max-width:100%;height:auto" ');
  return content

}

/**
  * @Description: 拨打电话
  * @Author: LiSuwan
  * @Param:{String}:tel:电话号码
  * @Date: 2019-11-20 
  */

let callPhone = function(tel){
  wx.makePhoneCall({
    phoneNumber: tel //仅为示例，并非真实的电话号码
  })
}

/**
  * @Description: 校验手机号码
  * @Author: LiSuwan
  * @Param:{String}:phone:手机号码
  * @Date: 2019-12-25 21:01:20
  */

let checkPhone = function (phone) {
  if (!phone) {
    showModal("请输入手机号");
    return false;
  } else if (!checkTelphone(phone)) {
    showModal("手机号不正确");
    return false;
  }
  return true

}

// 校验身份证号合法性 start
var checkCode = function (val) {
  var p = /^[1-9]\d{5}(18|19|20)\d{2}((0[1-9])|(1[0-2]))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/;
  var factor = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2];
  var parity = [1, 0, 'X', 9, 8, 7, 6, 5, 4, 3, 2];
  var code = val.substring(17);
  if (p.test(val)) {
    var sum = 0;
    for (var i = 0; i < 17; i++) {
      sum += val[i] * factor[i];
    }
    if (parity[sum % 11] == code.toUpperCase()) {
      return true;
    }
  }
  return false;
}
var checkDate = function (val) {
  var pattern = /^(18|19|20)\d{2}((0[1-9])|(1[0-2]))(([0-2][1-9])|10|20|30|31)$/;
  if (pattern.test(val)) {
    var year = val.substring(0, 4);
    var month = val.substring(4, 6);
    var date = val.substring(6, 8);
    var date2 = new Date(year + "-" + month + "-" + date);
    if (date2 && date2.getMonth() == (parseInt(month) - 1)) {
      return true;
    }
  }
  return false;
}
var checkProv = function (val) {
  var pattern = /^[1-9][0-9]/;
  var provs = { 11: "北京", 12: "天津", 13: "河北", 14: "山西", 15: "内蒙古", 21: "辽宁", 22: "吉林", 23: "黑龙江 ", 31: "上海", 32: "江苏", 33: "浙江", 34: "安徽", 35: "福建", 36: "江西", 37: "山东", 41: "河南", 42: "湖北 ", 43: "湖南", 44: "广东", 45: "广西", 46: "海南", 50: "重庆", 51: "四川", 52: "贵州", 53: "云南", 54: "西藏 ", 61: "陕西", 62: "甘肃", 63: "青海", 64: "宁夏", 65: "新疆", 71: "台湾", 81: "香港", 82: "澳门" };
  if (pattern.test(val)) {
    if (provs[val]) {
      return true;
    }
  }
  return false;
}
/**
  * @Description: 校验身份证号合法性
  * @Author: LiSuwan
  * @Param:{String}:val:身份证号
  * @Date: 2019-12-25 21:01:20
  */
var checkID = function (val) {
  if (checkCode(val)) {
    var date = val.substring(6, 14);
    if (checkDate(date)) {
      if (checkProv(val.substring(0, 2))) {
        return true;
      }
    }
  }
  return false;
}
// 校验身份证号合法性 end

/**
* @Description: 字节换算
* @Author: LiSuwan
* @Param:{String}:limit:字节
* @Date: 2019-12-25 21:01:20
*/
var changeByte = function changeByte(limit) {
  var size = "";
  if (limit < 0.1 * 1024) {                            //小于0.1KB，则转化成B
    size = limit.toFixed(2) + "B"
  } else if (limit < 0.1 * 1024 * 1024) {            //小于0.1MB，则转化成KB
    size = (limit / 1024).toFixed(2) + "KB"
  } else if (limit < 0.1 * 1024 * 1024 * 1024) {        //小于0.1GB，则转化成MB
    size = (limit / (1024 * 1024)).toFixed(2) + "MB"
  } else {                                            //其他转化成GB
    size = (limit / (1024 * 1024 * 1024)).toFixed(2) + "GB"
  }

  var sizeStr = size + "";                        //转成字符串
  var index = sizeStr.indexOf(".");                    //获取小数点处的索引
  var dou = sizeStr.substr(index + 1, 2)            //获取小数点后两位的值
  if (dou == "00") {                                //判断后两位是否为00，如果是则删除00                
    return sizeStr.substring(0, index) + sizeStr.substr(index + 3, 2)
  }
  return size;
}






module.exports = {
  formatTime: formatTime,
  getToday: getToday,
  replaceTel: replaceTel,
  checkTelphone: checkTelphone,
  showModal: showModal,
  setArticleDetailImgSize: setArticleDetailImgSize,
  callPhone: callPhone,
  changeByte: changeByte,
  checkID: checkID,
  checkPhone: checkPhone
}