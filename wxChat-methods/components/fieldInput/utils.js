var regExp = {
  telPhone: /^((1[3,4,5,6,8,9,7][0-9])|(14[5,7])|(17[0,6,7,8])|(19[7]))\d{8}$/, // 手机号码正则表达式
  userName: /^[A-Za-z0-9]+$/, // 用户名只能是英文和数字
  emial: /^[A-Za-z\d]+([-_.][A-Za-z\d]+)*@([A-Za-z\d]+[-.])+[A-Za-z\d]{2,4}$/, // 邮箱正则表达式
  number: /^[0-9]*$/, // 只能是数字
  passwordLength: /^.{5,18}$/, // 密码长度6-18位
  loginCode: /^[A-Za-z0-9]{4}$/, // 登录验证码英文和数字4位,
  chineseCode: /[\u4e00-\u9fa5]/g, // 中文字符匹配正则
  equipmentTypeName: /^[\u4e00-\u9fa5_a-zA-Z0-9]+$/, // 只能包含中/英文、数字和下划线
  measuringPointName: /^[\u4e00-\u9fa5a-zA-Z0-9]+$/, // 只能包含中/英文、数字
  checkExcel: /\.(?:xls|xlsx)$/, // 验证是否为Excel文件
  systemCheckExcel: /^(10500[01][0-9])$/, // 系统校验Excel文档错误提示码
  password: /^[a-zA-Z0-9]{4,8}$/, //密码字母或数字 6-14位
  money: /^(\d+)(.\d{0,2})?$/, //小数点后2位
};
/**
 * @Description: 校验手机号码是否正确
 * @Author: zhangchen
 * @Date: 2019-08-15 21:48:42
 */
let checkTelphone = function (phone) {
  return regExp.telPhone.test(phone) ? true : false;
};

/**
 * @Description: 校验邮箱
 * @Author: zhangchen
 * @Date: 2020-01-07 19:00:27
 */
let checkEmail = function (emial) {
  return regExp.emial.test(emial) ? true : false;
};

// 校验密码
let checkPassword = function (password) {
  return regExp.password.test(password) ? true : false;
};

/**
 * @Description: 校验身份证号合法性
 * @Author: zhangchen
 * @Param:{String}:val:身份证号
 * @Date: 2019-12-25 21:01:20
 */
var checkCode = function (val) {
  var p = /^[1-9]\d{5}(18|19|20)\d{2}((0[1-9])|(1[0-2]))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/;
  var factor = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2];
  var parity = [1, 0, "X", 9, 8, 7, 6, 5, 4, 3, 2];
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
};

/**
 * @Description: 校验金额只能保留2位小数
 * @Author: zhangchen
 * @Date: 2019-08-15 21:48:42
 */
let checkMoney = function (money) {
  return regExp.money.test(money) ? true : false;
};
module.exports = {
  checkTelphone,
  checkEmail,
  checkPassword,
  checkCode,
  checkMoney
}