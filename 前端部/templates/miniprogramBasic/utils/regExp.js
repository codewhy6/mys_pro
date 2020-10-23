/*
 * @module: 工具类 - 正则表达式
 * @fileName: regExp.js
 * @Description: 全局所有的正则表达式
 * @Author: LiSuwan
 * @Date: 2019-03-29 15:21:57
 */

module.exports =  {
  'telPhone': /^((1[3,5,8,9,7][0-9])|(14[5,7])|(17[0,6,7,8])|(19[7]))\d{8}$/, // 手机号码正则表达式
  'userName': /^[A-Za-z0-9]+$/, // 用户名只能是英文和数字
  'emial': /^[A-Za-z\d]+([-_.][A-Za-z\d]+)*@([A-Za-z\d]+[-.])+[A-Za-z\d]{2,4}$/, // 邮箱正则表达式
  'number': /^[0-9]*$/, // 只能是数字
  'passwordLength': /^.{5,18}$/, // 密码长度6-18位
  'loginCode': /^[A-Za-z0-9]{4}$/, // 登录验证码英文和数字4位,
  'chineseCode': /[\u4e00-\u9fa5]/g, // 中文字符匹配正则
  'equipmentTypeName': /^[\u4e00-\u9fa5_a-zA-Z0-9]+$/, // 只能包含中/英文、数字和下划线
  'measuringPointName': /^[\u4e00-\u9fa5a-zA-Z0-9]+$/, // 只能包含中/英文、数字
  'checkExcel': /\.(?:xls|xlsx)$/, // 验证是否为Excel文件
  'systemCheckExcel': /^(10500[01][0-9])$/, // 系统校验Excel文档错误提示码
}
