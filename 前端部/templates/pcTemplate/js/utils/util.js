/*
 * @Description: 工具类
 * @fileName: util.js
 * @Author: LiSuwan
 * @Date: 2020-01-04 14:42:06
 * @LastEditors  : Li Suwan
 * @LastEditTime : 2020-01-09 14:28:21
 */

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
  * @Description: 设置文章详情的图片尺寸
  * @Author: LiSuwan
  * @Param:{String}:content:文章详情的内容
  * @Date: @Date: 2019-11-20
  */
let setArticleDetailImgSize = function (content) {
  content = content.replace(/<img/g, '<img style="max-width:100%;height:auto" ');
  return content

}

/**
  * @Description: 校验手机号码
  * @Author: LiSuwan
  * @Param:{String}:phone:手机号码
  * @Date: 2019-12-25 21:01:20
  */

let checkPhone = function (phone) {
  if (!phone) {
    layer.open({
      title: '提示'
      , content: '请输入手机号'
    });
    return false;
  } else if (!checkTelphone(phone)) {
    layer.open({
      title: '提示'
      , content: '手机号不正确'
    });
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


/**
 * @Description: 截取字符串长度
 * @Author: LiSuwan
 * @Date: 2020-01-06 09:11:18
 * @param {Object} that:this的作用域
 * @param {Number} sliceLength:截取的字符串长度
 * @return: {String} value:截取之后的值
 */
function sliceStr(that, sliceLength = 11) {
  let value = that.value
  if (value.length > sliceLength) value = value.slice(0, sliceLength)
  that.value = value
}


let checkPassword = function (password) {
  return regExp.password.test(password) ? true : false
}

/**
 * @Description: 校验密码 字母或数字6-14位
 * @Author: LiSuwan
 * @Date: 2020-01-06 09:56:18
 * @param {String} password:密码 
 */
let checkPasswordTip = function (password) {
  if (!password) {
    layer.open({
      title: '提示'
      , content: '请输入密码'
    });
    return false;
  } else if (!checkPassword(password)) {
    layer.open({
      title: '提示'
      , content: '密码不规范，请重新输入'
    });
    return false;
  }
  return true
}

/**
 * @Description: 弹窗提醒
 * @Author: LiSuwan
 * @Date: 2020-01-06 19:14:34
 * @param {String} content:弹窗提醒内容 
 */
var popupReminder = function (content) {
  layer.open({
    title: '提示'
    , content: content
  })
}

/**
 * @Description: 获取上传的文件名后缀名、文件名称
 * @Author: LiSuwan
 * @Date: 2020-01-07 10:01:56
 * @param {Object} fileData:上传的文件对象
 * @return: {String} type:文件名称
 */
var getUploadFileName = function (fileData) {
  let file = fileData[0].files[0];//获取上传的文件
  let fileName = file && file.name; //上传的文件名
  var point = fileName.lastIndexOf(".");
  var type = fileName.substr(point + 1);
  return { type, fileName }
}

/**
 * @Description: 获取上传图片的大小
 * @Author: LiSuwan
 * @Date: 2020-01-07 10:10:08
 * @param {Object} fileData：上传的文件对象
 * @param {Number} Max_Size：限制图片大小：默认是512000字节（500KB）
 * @return: {boolean} isAllow
 */
var testMaxSize = function (fileData, Max_Size = 512000) {
  var isAllow = false;
  var size = fileData[0].files[0].size;
  isAllow = size <= Max_Size;
  if (!isAllow) {
    return false;
  }
  return isAllow;
}

/**
 * @Description: 校验邮箱
 * @Author: LiSuwan
 * @Date: 2020-01-07 19:00:27
 */
var checkEmail = function (emial) {
  if (emial == "") {
    popupReminder("请输入新邮箱");
    return false
  } else if (regExp.emial.test(emial) == false) {
    popupReminder("邮箱格式不正确请重新输入");
    return false

  }
  return emial
}

/**
 * @Description: 比较两个日期之间大小
 * @Author: LiSuwan
 * @Date: 2020-01-08 09:48:31
 * @param {String} date2:结束日期
 * @param {String} date1:开始日期
 */
var compareDate = function (date1, date2) {
  var oDate1 = new Date(date1);
  var oDate2 = new Date(date2);
  return oDate1.getTime() > oDate2.getTime() ? false : true;
}

/**
 * @Description: 获取两个日期间的月份差
 * @Author: LiSuwan
 * @Date: 2020-01-08 09:48:31
 * @param {String} startDate:结束日期
 * @param {String} endDate:开始日期
 */
var getIntervalMonth = function (startDate, endDate) {
  endDate = new Date(endDate)
  startDate = new Date(startDate)
  var startMonth = startDate.getMonth();
  var endMonth = endDate.getMonth();
  var intervalMonth = (endDate.getFullYear() * 12 + endMonth) - (startDate.getFullYear() * 12 + startMonth);
  return intervalMonth
}


/**
 * @Description: 放大图片
 * @Author: LiSuwan
 * @Date: 2020-01-08 19:01:01
 * @param {String}  src：图片路径
 */
var enlargeImg = function (src) {
  let htmlStr = '<div>' +
    '<img src="' + src + '" style="width:500px;min-height:500px;height:auto">' +
    '</div>'

  layer.open({
    type: 1
    , title: false //不显示标题栏
    , closeBtn: false,
    shadeClose: true
    , area: '500px;'
    , shade: 0.5
    , id: 'LAY_layuipro' //设定一个id，防止重复弹出
    , btnAlign: 'c'
    , moveType: 1 //拖拽模式，0或者1
    , content: htmlStr
  });
}









