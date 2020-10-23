
/*
 * @Description: 工具类
 * @fileName: util.js
 * @Author: zhangchen
 * @Date: 2020-01-04 14:42:06
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2020-10-23 10:45:53
 */

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
 * @Author: zhangchen
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
 * @Author: zhangchen
 * @Param: {String} phone:手机号码
 * @Date: 2019-08-15 19:04:32
 */
let replaceTel = function (phone) {
  var showPhone = phone.replace(/^(\d{3})\d{4}(\d+)/, "$1****$2")
  return showPhone;
}
/**
 * @Description: 名字中间转换成星号
 * @Author: zhangchen
 * @Date: 2020-04-23 10:39:46
 * @param {string}name:名称
 */
const formatName = function (name) {
  let newStr;
  if (name.length === 2) {
    newStr = name.substr(0, 1) + '*';
  } else if (name.length > 2) {
    let char = '';
    for (let i = 0, len = name.length - 2; i < len; i++) {
      char += '*';
    }
    newStr = name.substr(0, 1) + char + name.substr(-1, 1);
  } else {
    newStr = name;
  }
  return newStr;
}

/**
 * @Description: 校验手机号码是否正确
 * @Author: zhangchen
 * @Date: 2019-08-15 21:48:42
 */
let checkTelphone = function (phone) {
  return regExp.telPhone.test(phone) ? true : false
}



/**
  * @Description: 设置文章详情的图片尺寸
  * @Author: zhangchen
  * @Param:{String}:content:文章详情的内容
  * @Date: @Date: 2019-11-20
  */
let setArticleDetailImgSize = function (content) {
  content = content.replace(/<img/g, '<img style="max-width:100%;height:auto" ');
  return content
}

/**
  * @Description: 拨打电话
  * @Author: zhangchen
  * @Param:{String}:tel:电话号码
  * @Date: 2019-11-20 
  */

let callPhone = function (tel) {
  wx.makePhoneCall({
    phoneNumber: tel //仅为示例，并非真实的电话号码
  })
}

/**
  * @Description: 校验手机号码
  * @Author: zhangchen
  * @Param:{String}:phone:手机号码
  * @Date: 2019-12-25 21:01:20
  */

let checkPhone = function (phone) {
  if (!phone) {
    popupReminder("请输入手机号")
    return false;
  } else if (!checkTelphone(phone)) {
    popupReminder("手机号不正确重新输入")
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
  * @Author: zhangchen
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
* @Author: zhangchen
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
 * @Author: zhangchen
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
 * @Author: zhangchen
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
 * @Author: zhangchen
 * @Date: 2020-01-06 19:14:34
 * @param {String} content:弹窗提醒内容 
 * @param {Function} callback:点击确定之后执行的方法
 * @param {Boolean} showCancel:是否显示取消按钮 默认不显示
 */
var popupReminder = function (content, callback, showCancel = false) {
  setTimeout(function () {
    let btns = showCancel == false ? '确定' : ['确认', '取消'];
    layer.open({
      content: content,
      btn: btns,
      shadeClose: false,
      yes: function () {
        layer.closeAll()
        callback && callback()
      }
    });
  }, 0)

}



/**
 * @Description: 获取上传的文件名后缀名、文件名称
 * @Author: zhangchen
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
 * @Author: zhangchen
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
 * @Author: zhangchen
 * @Date: 2020-01-07 19:00:27
 */
var checkEmailPc = function (emial) {
  if (emial == "") {
    popupReminder("请输入邮箱");
    return false
  } else if (regExp.emial.test(emial) == false) {
    popupReminder("邮箱格式不正确请重新输入");
    return false

  }
  return emial
}

/**
 * @Description: 校验邮箱
 * @Author: zhangchen
 * @Date: 2020-02-26 10:47:07
 */
let checkEmail = function (emial) {
  return regExp.emial.test(emial) ? true : false
}

/**
 * @Description: 比较两个日期之间大小
 * @Author: zhangchen
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
 * @Author: zhangchen
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
 * @Author: zhangchen
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

/**
 * @Description: picker的列的值
 * @Author: zhangchen
 * @Date: 2020-02-13 16:33:51
 * @param {Array} arr:筛选的数组数据 
 * @param {Array} keyName：筛选的数组key名 默认值是空
 */
function pickerColumn(arr, keyName) {
  let filterData = [];
  let id = keyName[1] || "id";
  arr.map((val) => {
    filterData.push({
      text: val[keyName[0]],
      value: val[id]
    })
  })
  return filterData
}

/**
 * @Description: 设置picker的选择效果
 * @Author: zhangchen
 * @Date: 2020-02-13 17:46:35
 * @param {String} pickerId：选择器ID
 * @param {Array} arr：在picker中显示的数组
 * @param {Array} keysName:操作的数组对象key说明：0、1的值是在列中用到key，2的值用于获取第二列的数据
 * @param {Number} columnS：设置picker显示的列数，默认显示1列
 * @param {Boolean} isShowParent：是否显示父级别
 */
function setPicker(pickerId, arr, keysName, columnS = 1, isShowParent = false) {
  let ID = pickerId;
  let pickerArr = [], pickerArrSecond = [], pickerArrThird = [];
  let pickerShop = null; //初始化picker

  var pickerId = document.getElementById(pickerId);
  /**
   * @Description: 初始化Picker
   * @Author: zhangchen
   * @Date: 2020-02-13 17:25:52
   */
  switch (columnS) {
    case 1:
      pickerArr = pickerColumn(arr, keysName);
      pickerShop = new Picker({
        data: [pickerArr],
        selectedIndex: [0],
      });
      break;
    case 2:
      pickerArr = pickerColumn(arr, keysName);
      pickerArrSecond = pickerColumn(arr[0][keysName[2]], keysName);
      pickerShop = new Picker({
        data: [pickerArr, pickerArrSecond],
        selectedIndex: [0, 0],
      });
      break;
    case 3:
      pickerArr = pickerColumn(arr, keysName);
      pickerArrSecond = pickerColumn(arr[0][keysName[2]], keysName);
      pickerArrThird = pickerColumn(arr[0][keysName[2]][0][keysName[2]], keysName);
      pickerShop = new Picker({
        data: [pickerArr, pickerArrSecond, pickerArrThird],
        selectedIndex: [0, 0, 0],
      });
      break;

  }


  /**
   * @Description: picker点击确认是设置input框的值
   * @Author: zhangchen
   * @Date: 2020-02-13 17:26:06
   */
  pickerShop.on('picker.valuechange', function (selectedVal, selectedIndex) {


    switch (columnS) {
      case 1:
        var text1 = pickerArr[selectedIndex[columnS - 1]].text;
        var id = pickerArr[selectedIndex[columnS - 1]].value;
        pickerId.value = text1;
        pickerId.setAttribute("data-id", id)
        break;
      case 2:
        var text1 = pickerArr[selectedIndex[0]].text;
        var id1 = pickerArr[selectedIndex[0]].value;
        var text2 = pickerArrSecond[selectedIndex[1]].text;
        var id2 = pickerArrSecond[selectedIndex[1]].value;
        if (isShowParent == true) {
          pickerId.value = text1 + "-" + text2;
          pickerId.setAttribute("data-id", id2)
          pickerId.setAttribute("data-parentId", id1)
        } else {
          pickerId.value = text1;
          pickerId.setAttribute("data-id", id1)
        }
        break;
      case 3:
        var text1 = pickerArr[selectedIndex[0]].text;
        var id1 = pickerArr[selectedIndex[0]].value;
        var text2 = pickerArrSecond[selectedIndex[1]].text;
        var id2 = pickerArrSecond[selectedIndex[1]].value;

        var text3 = "", id3 = "";
        if (pickerArrThird.length > 0) {
          text3 = pickerArrThird[selectedIndex[2]].text;
          id3 = pickerArrThird[selectedIndex[2]].value;
        }


        if (isShowParent == true) {
          if (text3) {
            pickerId.value = text1 + "-" + text2 + "-" + text3;
          } else {
            pickerId.value = text1 + "-" + text2;
          }
        } else {
          if (text3) {
            pickerId.value = text1 + "-" + text2 + "-" + text3;
          } else {
            pickerId.value = text1 + "-" + text2;
          }

        }
        break;

    }

    $("#" + ID).trigger("change");//触发change事件
  });





  /**
   * @Description: input框绑定click事件，点击显示pick组件
   * @Author: zhangchen
   * @Date: 2020-02-13 14:06:00
   */
  pickerId.addEventListener('click', function () {
    pickerShop.show();
  });

  /**
   * @Description: 单选择的值发生改变的时候执行
   * @Author: zhangchen
   * @Date: 2020-02-13 16:27:12
   * @param {Number}index:当前选择的列
   * @param {Number}selectedIndex：选择的值索引 
   */
  pickerShop.on('picker.change', function (index, selectedIndex) {
    if (index == 0) { //选中第一列      
      if (columnS == 2 || columnS == 3) seconClounm(selectedIndex);
    } else if (index == 1) {//选择第二列

      thirdClounm(selectedIndex)
    }
  })


  /**
   * @Description: 设置第二列的值
   * @Author: zhangchen
   * @Date: 2020-02-13 17:06:16
   * @param {Number} selectedIndex:选择的值索引
   */
  function seconClounm(selectedIndex) {
    pickerArrSecond = [];
    pickerArrThird = [];
    pickerArrSecond = pickerColumn(arr[selectedIndex][keysName[2]], keysName);
    pickerArrThird = pickerColumn(arr[selectedIndex][keysName[2]][0][keysName[2]], keysName);
    pickerShop.refillColumn(1, pickerArrSecond); //赋值
    pickerShop.scrollColumn(1, 0)//更新列
    pickerShop.refillColumn(2, pickerArrThird); //赋值
    pickerShop.scrollColumn(2, 0)//更新列
  }


  /**
  * @Description: 设置第第三列的值
  * @Author: zhangchen
  * @Date: 2020-02-13 17:06:16
  * @param {Number} selectedIndex:选择的值索引
  */
  function thirdClounm(selectedIndex) {
    console.log(pickerArrSecond)
    pickerArrThird = []
    pickerArrThird = pickerColumn(pickerArrSecond[selectedIndex][keysName[2]], keysName);
    pickerShop.refillColumn(2, pickerArrThird); //赋值
    pickerShop.scrollColumn(2, 0)//更新列

  }

}

/**
 * @Description: 校验金额只能保留2位小数
 * @Author: zhangchen
 * @Date: 2019-08-15 21:48:42
 */
let checkMoney = function (money) {
  return regExp.money.test(money) ? true : false
}




/**
 * @Description: 弹窗提示
 * @Author: zhangchen
 * @Date: 2020-01-08 19:01:01
 * @param {String}  title：标题
 * @param {String}  content：内容
 * @param {Number}  type:1:一个按钮 2:2个按钮
 * @param {Array}  btnsName:按钮名称
 */
var popupWindowMobile = function (content, type = 1, title = "提醒", btnsName = ['确定', '取消']) {
  let htmlStr = "";
  if (type == 1) {
    htmlStr = '<div class="popup_alert">' +
      '<img src="images/close.png" alt="关闭" class="popupWindow_closeIcon">' +
      '<div class="popupWindow_title">' +
      '<p>' + title + '</p>' +
      '</div>' +
      '<div class="popupWindow_line"></div>' +
      '<div class="popupWindow_text">' + content + '</div>' +
      '<div class="popupWindow_btn popupWindow_btn1"> ' +
      '<button class="popupWindow_confirm">' + btnsName[0] + '</button>' +
      '</div>' +
      '</div>'

  } else if (type = 2) {
    htmlStr = '<div class="popup_alert">' +
      '<img src="images/close.png" alt="关闭" class="popupWindow_closeIcon">' +
      '<div class="popupWindow_title">' +
      '<p>' + title + '</p>' +
      '</div>' +
      '<div class="popupWindow_line"></div>' +
      '<div class="popupWindow_text">' + content + '</div>' +
      '<div class="popupWindow_btn popupWindow_btn2"> ' +
      '<button class="popupWindow_btns popupWindow_btnsConfirm">' + btnsName[1] + '</button>' +
      '<button class="popupWindow_btns popupWindow_btnsThink">' + btnsName[0] + '</button>' +
      '</div>' +
      '</div>'
  }


  layer.open({
    shadeClose: false,//是否点击遮罩时关闭层 false：否
    className: 'popupWindow',
    content: htmlStr,
  })
}

/**
 * @Description: 从缓存中获取用户信息
 * @Author: zhangchen
 * @Date: 2020-02-15 19:28:36
 */
var getUserInfoBySession = function () {
  let userInfo = sessionStorage.getItem("userInfo");
  if (userInfo) {
    userInfo = JSON.parse(userInfo);
  }
  return userInfo

}


/**
 * @Description: 如果接口请求不到数据使用默认俱乐部图片
 * @Author: zhangchen
 * @Date: 2020-02-17 16:00:07
 * @param {Object} that:this的作用域 
 */
var defaultClubImg = function (that) {
  $(that).attr("src", "images/default_clubImg.png")
}

/**
 * @Description: 如果接口请求不到数据使用默认用户头像图片
 * @Author: zhangchen
 * @Date: 2020-02-17 16:00:07
 * @param {Object} that:this的作用域 
 */
var defaultUserImg = function (that) {
  $(that).attr("src", "images/default_userImg.png")
}

/**
     * @Description: 点击活动内容审核标准弹窗确定按钮
     * @Author: zhangchen
     * @Date: 2020-02-15 19:07:26
     */
$("body").on("click", ".popupWindow_confirm,.popupWindow_closeIcon,.popupWindow_btnsThink,.popupWindow_btnsConfirm", function () {
  layer.closeAll()
})


/**
 * @Description: 从URL上取参数
 * @Author: zhangchen
 * @Date: 2020-01-15 22:13:28
 */
var getUrlParams = function () {

  var url = decodeURIComponent(location.search);
  //获取url中"?"符后的字串 ('?modFlag=business&role=1')
  var theRequest = new Object();
  if (url.indexOf("?") != -1) {
    var str = url.substr(1); //substr()方法返回从参数值开始到结束的字符串；
    var strs = str.split("&");
    for (var i = 0; i < strs.length; i++) {
      theRequest[strs[i].split("=")[0]] = (strs[i].split("=")[1]);
    }
  }
  return theRequest
}

/**
 * @Description: 苹果手机不能自动播放背景音乐
 * @Author: zhangchen
 * @Date: 2020-01-15 10:29:42
 */
var audioAutoPlay = function (id) {
  var audio = document.getElementById(id);
  if (checkPlatform() == "iOS") {
    if (audio.paused) {
      audio.play();
    } else {
      audio.pause();
    }
  }

  document.addEventListener("WeixinJSBridgeReady", function () {
    if (checkPlatform() == "iOS") {
      if (audio.paused) {
        audio.play();
      } else {
        audio.pause();
      }
    }
  }, false);
}

/**
 * @Description: //手机端判断各个平台浏览器及操作系统平台
 * @Author: zhangchen
 * @Date: 2020-01-15 22:02:53
 */
var checkPlatform = function () {
  if (/android/i.test(navigator.userAgent)) {
    // document.write("This is Android'browser.");//这是Android平台下浏览器
    return "Android"
  }
  if (/(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent)) {
    // document.write("This is iOS'browser.");//这是iOS平台下浏览器
    return "iOS";
  }
  if (/Linux/i.test(navigator.userAgent)) {
    document.write("This is Linux'browser.");//这是Linux平台下浏览器
  }
  if (/Linux/i.test(navigator.platform)) {
    document.write("This is Linux operating system.");//这是Linux操作系统平台
  }
  if (/MicroMessenger/i.test(navigator.userAgent)) {
    document.write("This is MicroMessenger'browser.");//这是微信平台下浏览器
  }
}

/**
 * @Author      zhangchen
 * @DateTime    2018-07-25
 * @description 格式化日期
 * @param       {stt}   date:需要转换的日期字符串
 * @param       {number}type:0:年-月-日 1 年 2月 3 日
 * @return      {str}  str:返回格式化后的日期        
 */
var formatSplitDate = function (date, type) {
  type = type || 0;

  let year = "", month = "", day = "", str = "";

  if (date.length >= 4) { //取4位数字表示的年
    year = date.slice(0, 4);
  }
  if (date.length == 5) {//取2位数字标识的月份
    month = "0" + date.slice(5);
  } else if (date.length >= 5) {
    month = date.slice(5, 7);
  }

  if (date.length == 8) {
    day = "0" + date.slice(8)
  } else if (date.length >= 10) {
    day = date.slice(8, 10)
  }

  switch (type) {
    case 0:
      str = year + "-" + month + "-" + day;
      break;
    case 1:
      str = year;
      break;
    case 2:
      str = month;
      break;
    case 3:
      str = day;
      break;
  }

  return str;

}
/**
 * @Author      zhangchen
 * @DateTime    2018-05-16
 * @description 格式化日期
 * @param       {Str}   date:日期
 * @param       {Str}   fmt:日期格式化方式  
 * @return      {date}  fmt:返回格式化后的日期        
 */
var formatDate = function (date, fmt) {
  var time = new Date(date);
  var o = {
    "M+": time.getMonth() + 1, //月份 
    "D+": time.getDate(), //日 
    "H+": time.getHours(), //小时 
    "m+": time.getMinutes(), //分 
    "s+": time.getSeconds(), //秒 
    "q+": Math.floor((time.getMonth() + 3) / 3), //季度 
    "S": time.getMilliseconds() //毫秒 
  };

  if (/(Y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, (time.getFullYear() + "").substr(4 - RegExp.$1.length));
  }
  for (let k in o) {
    if (new RegExp("(" + k + ")").test(fmt)) {
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    }
  }

  return fmt;
}

/**
 * @Description: 查找数组中第一个符合条件的值
 * @Author: zhangchen
 * @Date: 2020-02-19 09:47:23
 * @param {Array} arr:处理的数组
 * @param {String} key:比对的键名
 * @param {String} value：查找的值
 * @return {Object}  filterValue:找到的值
 */
var getValue = function (arr, key, value) {

  let filterValue = arr.find(val => {
    return val[key] == value
  })

  return filterValue
}

/**
 * @Description: 发送验证码功能 需要根据业务逻辑进行修改
 * @Author: zhangchen
 * @Date: 2020-02-26 14:51:58
 */
$("body").on("click", "#YzmBtn", function () {
  let phone = checkPhone()
  if (phone == false) { //校验手机号码
    return false;
  }
  var countdown = 60;
  if (countdown == 60 && isClick == false) {
    isClick = true
    var btn = document.getElementById("YzmBtn");
    btn.setAttribute("disabled", true);
    let params = {
      phone: phone,//手机号码
    }
    http(sendCodeUrl, getYzm, "get", params) //sendCodeUrl 这个路径需要修改
    function getYzm(result) {
      isClick = false
      if (result.code == 200) {  //这行代码需要修改下
        var timeStop = setInterval(function () {
          countdown--;
          if (countdown > 0) {
            $("#YzmBtn").text("重新发送(" + countdown + "s)")
          } else {
            countdown = 60;//当减到0时赋值为60
            btn.removeAttribute("disabled");

            $("#YzmBtn").text("获取验证码")
            clearInterval(timeStop);//清除定时器
            timeStop = null;
          }
        }, 1000)
      } else {
        btn.removeAttribute("disabled");
        layer.open({
          content: result.msg,
          btn: '确定'
        });
      }
    }
  }
})








$(".displayNone").css("display", "none")




/**
 * @Description: 弹窗提示
 * @Author: zhangchen
 * @Date: 2020-01-08 19:01:01
 * @param {String}  title：标题
 * @param {String}  content：内容
 * @param {Number}  type:1:一个按钮 2:2个按钮
 * @param {Array}  btnsName:按钮名称
 */
var popupWindowMobile = function (content, type = 1, title = "提醒", btnsName = ['确定', '取消']) {
  let htmlStr = "";
  if (type == 1) {
    htmlStr = '<div class="popup_alert">' +
      '<img src="images/close.png" alt="关闭" class="popupWindow_closeIcon">' +
      '<div class="popupWindow_title">' +
      '<p>' + title + '</p>' +
      '</div>' +
      '<div class="popupWindow_line"></div>' +
      '<div class="popupWindow_text">' + content + '</div>' +
      '<div class="popupWindow_btn popupWindow_btn1"> ' +
      '<button class="popupWindow_confirm">' + btnsName[0] + '</button>' +
      '</div>' +
      '</div>'

  } else if (type = 2) {
    htmlStr = '<div class="popup_alert">' +
      '<img src="images/close.png" alt="关闭" class="popupWindow_closeIcon">' +
      '<div class="popupWindow_title">' +
      '<p>' + title + '</p>' +
      '</div>' +
      '<div class="popupWindow_line"></div>' +
      '<div class="popupWindow_text">' + content + '</div>' +
      '<div class="popupWindow_btn popupWindow_btn2"> ' +
      '<button class="popupWindow_btns popupWindow_btnsConfirm">' + btnsName[1] + '</button>' +
      '<button class="popupWindow_btns popupWindow_btnsThink">' + btnsName[0] + '</button>' +
      '</div>' +
      '</div>'
  }


  layer.open({
    shadeClose: false,//是否点击遮罩时关闭层 false：否
    className: 'popupWindow',
    content: htmlStr,
  })
}


/**
     * @Description: 上传文件
     * @Author: zhangchen
     * @Date: 2020-02-26 14:57:19
     */
$("body").on("change", "#upLoadFile", function () {
  let file = $(this)[0].files[0];//获取上传的文件
  let fileName = file.name; //上传的文件名
  let fileIcon = null;
  var point = fileName.lastIndexOf(".");
  var type = fileName.substr(point + 1).toLowerCase();
  if (type !== "xls" && type !== "xlsx" && type !== "doc" && type !== "docx" && type !== "pdf") {
    popupReminder("请选择xls、xlsx、doc、docx、pdf格式的文件")
    return false
  }

  // word用图片:doc.png
  // pdf用图片:pdf.png
  // xls用图片:xls.png 

  //设置文件文件icon
  switch (type) {
    case "xls":
      fileIcon = "xls";
      break;
    case "xlsx":
      fileIcon = "xls";
      break;
    case "doc":
      fileIcon = "doc";
      break;
    case "docx":
      fileIcon = "doc";
      break;
    case "pdf":
      fileIcon = "pdf";
      break;
  }



  let str = '<p class="evaluation_file_p2">' +
    '<img src="images/' + fileIcon + '.png">' +
    '<span>' + fileName + '</span>' +
    '<img src="images/cha.png" alt="删除" class="roundCha deleteFile">'
  '</p>';
  $(".evaluation_uploadFile").after(str);

  $(this).val("");
})


/**
     * @Description: 选择上传图片并显示
     * @Author: zhangchen
     * @Date: 2020-01-07 09:54:50
     */
$("body").on("change", ".modifyUserData_questionImg", function () {
  var file = getUploadFileName($(this));
  if (!$(this)[0].files[0]) return false;
  var type = file.type;
  if (type !== "jpg" && type !== "jpeg" && type !== "png") {
    popupReminder("请选择jpg、.jpeg、.png格式的图片")
    return false
  }

  if (testMaxSize($(this)) == false) {
    popupReminder("图片的大小控制在500k以内")
    return false
  }

  var reads = new FileReader();
  var f = $(this).get(0).files[0];
  reads.readAsDataURL(f);
  reads.onload = function (e) {
    let str = "";
    let that = this;
    str = '<p class="evaluation_file_p3">' +
      '<img src="' + that.result + '">' +
      '<img src="images/cha1.png" alt="删除" class="sjCha deleteQuestionImg">' +
      '</p>';

    $(".modifyUserData_questionImgParent").before(str)

    if ($(".evaluation_file_p3").length === 4) {
      $(".modifyUserData_questionImgParent").hide()
    }

    // uploadFileXun(f, uploadFileXunCallback);//上传文件到服务器，写功能的时候放开
    /**
     * @Description: 上传文件回调方法
     * @Author: zhangchen
     * @Date: 2020-02-14 16:16:40
     */
    function uploadFileXunCallback(res) {
      if (res.code == 200) {

        // 可以把上面的代码复制到下面来

      }
    }

  }
  $(this).val("");
})



/**
 * @Description: 播放音频
 * @Author: zhangchen
 * @Date: 2020-03-06 13:51:56
 */
function playMusic(idName) {
  /**
   * @Description: 所有播放的音乐暂停
   * @Author: zhangchen
   * @Date: 2020-03-06 13:58:25
   */
  $("audio").each(function () {
    let idElement = $(this).attr("id");
    if (idName != idElement) {
      idElement = document.getElementById(idElement);
      idElement.pause();
    }
  })

  var audioEle = document.getElementById(idName);
  if (audioEle.paused) { /*如果已经暂停*/
    audioEle.play();   //播放
  } else {
    audioEle.pause();  //暂停
  }
}

/**
 * @Description: 计算两个经纬度直接的距离
 * @Author: zhangchen
 * @Date: 2020-03-25 09:44:31
 */

// 计算两个经纬度直接的距离 start 
var PI = Math.PI;
var EARTH_RADIUS = 6378137.0;    //单位M
function getRad(d) {

  return d * PI / 180.0;
}

function getFlatternDistance(lat1, lng1, lat2, lng2) {
  var f = getRad((lat1 + lat2) / 2);
  var g = getRad((lat1 - lat2) / 2);
  var l = getRad((lng1 - lng2) / 2);

  var sg = Math.sin(g);
  var sl = Math.sin(l);
  var sf = Math.sin(f);

  var s, c, w, r, d, h1, h2;
  var a = EARTH_RADIUS;
  var fl = 1 / 298.257;

  sg = sg * sg;
  sl = sl * sl;
  sf = sf * sf;

  s = sg * (1 - sl) + (1 - sf) * sl;
  c = (1 - sg) * (1 - sl) + sf * sl;

  w = Math.atan(Math.sqrt(s / c));
  r = Math.sqrt(s * c) / w;
  d = 2 * w * a;
  h1 = (3 * r - 1) / 2 / c;
  h2 = (3 * r + 1) / 2 / s;

  return d * (1 + fl * (h1 * sf * (1 - sg) - h2 * (1 - sf) * sg));
}

// 计算两个经纬度直接的距离 end 

/**
 * @Description: 倒计时
 * @Author: Cheng Linmao
 * @Date: 2020-05-06 10:31:15
 * @param {type} endTime为倒计时结束的时间
 * @return: 
 */

let countDown = function (endTime) {
  let timeStop = null;//重新赋值为null
  timeStop = setInterval(function () {
    let nowTime = new Date().getTime();//现在时间（时间戳）
    let endTime = new Date(endTime).getTime();//结束时间（时间戳）
    let diffTime = (endTime - nowTime) / 1000;//距离结束的毫秒数
    // 每1000ms刷新一次
    if (time > 0) {
      timeStamp(diffTime, 4)
    } else {
      timeStamp(diffTime, 4)
      clearInterval(timeStop)//倒计时函数
      timeStop = null;//重新赋值为null
    }
  }, 1000)
}


/**
  * @Description: 把秒数转换成天、时、分、秒
  * @Author: ChengLinMao
  * @Date: 2020-04-17 17:00:42
  * @param {Number} second_time:秒数
  * @param {Number} type:转换的日期类型 1:天 2:小时 3：分 4：秒数
  *   min =min< 10 ? '0' + min : min;当时间小于0时,补0
  */
var timeStamp = function (second_time, type = 1) {
  var time = parseInt(second_time) + "秒";
  var hour = 0, second = parseInt(second_time), min = 0, day = "";
  if (parseInt(second_time) > 60) {
    second = parseInt(second_time) % 60;
    second = second < 10 ? '0' + second : second;
    min = parseInt(second_time / 60);
    min = min < 10 ? '0' + min : min;
    time = min + "分" + second + "秒";

    if (min > 60) {
      min = parseInt(second_time / 60) % 60;
      min = min < 10 ? '0' + min : min;
      hour = parseInt(parseInt(second_time / 60) / 60) < 10 ? '0' + hour : hour;
      time = hour + "小时" + min + "分" + second + "秒";

      if (hour > 24) {
        hour = parseInt(parseInt(second_time / 60) / 60) % 24;
        hour = hour < 10 ? '0' + hour : hour;
        var day = parseInt(parseInt(parseInt(second_time / 60) / 60) / 24);
        time = day + "天" + hour + "小时" + min + "分" + second + "秒";
      }
    }
  }

  switch (type) {
    case 1:
      time = day;
      break;
    case 2:
      time = hour;
      break;
    case 3:
      time = min;
      break;
    case 4:
      time = second;
      break;
  }

  return time
};
/**
 * @Description: js根据身份号码获取出生日期
 * @Author: Cheng Linmao
 * @Date: 2020-05-11 10:06:09
 * @param {type} type=1获取出生年月日;type=2获取身份证年龄
 * @return: 
 */
var getBirthAge = function (IDcard, type = 1) {
  IDcard = IDcard.replace(/\s+/g, "");//去除空格
  debugger
  let myDate = new Date();//获取当前时间
  let tYear = myDate.getFullYear();//获取当前年份
  let age = 0;//根据身份证换算年龄
  let birthday = "";//出生日期
  if (type == 1) {

    if (IDcard != null && IDcard != "") {
      if (IDcard.length == 15) {//老式身份证15位数字的
        IDcard = "19" + IDcard.substr(6, 6);
      } else if (IDcard.length == 18) {//现在身份证18位数字的
        IDcard = IDcard.substr(6, 8);
      }

      birthday = IDcard.replace(/(.{4})(.{2})/, "$1-$2-");
      return birthday
    }
  } if (type == 2) {
    debugger
    if (IDcard != null && IDcard != "") {
      if (IDcard.length == 15) {
        IDcard = "19" + IDcard.substr(6, 6);
        IDcard = IDcard.substr(0, 4)
        age = parseInt(tYear) - parseInt(IDcard)
      } else if (IDcard.length == 18) {
        IDcard = IDcard.substr(6, 8);
        IDcard = IDcard.substr(0, 4)
        age = parseInt(tYear) - parseInt(IDcard)
      }


      return age;
    }
  }
}


/**
* @Description: 设置富文本图片的公共路径，实际使用的时候需要修改下方法
* @Author: zhangchen
* @Param:{String}:content:文章详情的内容
* @Date: @Date: 2019-11-20
*/
let setArticleDetailImgSrc = function (content) {
  content = content.replace(/"\/projectimg\/upload/g, '"https://www.curtainspm.com/projectimg/upload');
  return content
}



/**
 * @Description: //加法函数，用来得到精确的加法结果
 * @Description: //说明：javascript的加法结果会有误差，在两个浮点数相加的时候会比较明显。这个函数返回较为精确的加法结果。
 * @Description://调用：accAdd(arg1,arg2)
 * @Description:  //返回值：arg1加上arg2的精确结果
 * @Author: Cheng Linmao
 * @Date: 2020-07-31 10:44:02
 * @param {NumberLength} NumberLength:number类型,保留几位有效数字
 * @return: 类型 Number
 */
function accAdd(arg1, arg2, NumberLength = 2) {
  let r1, r2, m;
  try { r1 = arg1.toString().split(".")[1].length } catch (e) { r1 = 0 }
  try { r2 = arg2.toString().split(".")[1].length } catch (e) { r2 = 0 }
  m = Math.pow(10, Math.max(r1, r2))
  return Number(((arg1 * m + arg2 * m) / m).toFixed(NumberLength))

}
//给Number类型增加一个add方法，调用起来更加方便。
Number.prototype.add = function (arg) {
  return accAdd(arg, this);
}


/**
 * @Description://乘法函数，用来得到精确的乘法结果
 * @Description://说明：javascript的乘法结果会有误差，在两个浮点数相乘的时候会比较明显。这个函数返回较为精确的乘法结果。
 * @Description://调用：accMul(arg1,arg2)
 * @Description://返回值：arg1乘以arg2的精确结果
 * @Author: Cheng Linmao
 * @Date: 2020-07-31 10:44:02
 * @param {NumberLength} NumberLength:number类型,保留几位有效数字
 * @return:类型 Number
 */

function accMul(arg1, arg2, NumberLength = 2) {
  let m = 0, s1 = arg1.toString(), s2 = arg2.toString();
  try { m += s1.split(".")[1].length } catch (e) { }
  try { m += s2.split(".")[1].length } catch (e) { }
  return Number((Number(s1.replace(".", "")) * Number(s2.replace(".", "")) / Math.pow(10, m)).toFixed(NumberLength))

}
//给Number类型增加一个mul方法，调用起来更加方便。
Number.prototype.mul = function (arg) {
  return accMul(arg, this);
}


/**
* @Description: 设置文章详情的图片完整链接
* @Author: cehnglinmao
* @Param:{String}:content:文章详情的内容
* @Date: @Date: 2020-8-13s
*/
var setArticleDetailImgHeard = function (details) {
  details = details.replace(/"\/projectimg\/upload/g, `"https://mini.jzqsclub.com/projectimg/upload`)
  return details
}


/**
* @Description: 设置替换回车换行符号
* @Author: cehnglinmao
* @Param:{String}:content:文章详情的内容
* @Date: @Date: 2020-8-13s
*/
var setArticleDetailEnter = function (details) {
  details = details.replace(/\n/g, "\\n").replace(/\r/g, "\\r")
  return details
}







