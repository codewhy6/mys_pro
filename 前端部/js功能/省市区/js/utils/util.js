/*
 * @Description: 工具类
 * @fileName: util.js
 * @Author: LiSuwan
 * @Date: 2020-01-04 14:42:06
 * @LastEditors: longhaiyan
 * @LastEditTime: 2020-09-24 10:39:35
 */

/**
 * @Description: 获取今天的年月日
 * @Author: LiSuwan
 * @Return: {String} 今天的日期，格式“YYYY-MM-DD”
 * @Date: 2019-08-15 21:41:07
 */
var getToday = function () {
  var date = new Date()
  var year = date.getFullYear()
  var month = date.getMonth() + 1
  if (month < 10) {
    month = "0" + month
  }
  var day = date.getDate()
  return "" + year + "-" + month + "-" + day
}

/**
 * @Description: 手机号码替换成星号
 * @Author: LiSuwan
 * @Param: {String} phone:手机号码
 * @Date: 2019-08-15 19:04:32
 */
var replaceTel = function (phone) {
  var showPhone = phone.replace(/^(\d{3})\d{4}(\d+)/, "$1****$2")
  return showPhone;
}

/**
 * @Description: 校验手机号码是否正确
 * @Author: LiSuwan
 * @Date: 2019-08-15 21:48:42
 */
var checkTelphone = function (phone) {
  return regExp.telPhone.test(phone) ? true : false
}



/**
  * @Description: 设置文章详情的图片尺寸
  * @Author: LiSuwan
  * @Param:{String}:content:文章详情的内容
  * @Date: @Date: 2019-11-20
  */
var setArticleDetailImgSize = function (content) {
  content = content.replace(/<img/g, '<img style="max-width:100%;height:auto" ');
  return content

}

/**
  * @Description: 校验手机号码
  * @Author: LiSuwan
  * @Param:{String}:phone:手机号码
  * @Date: 2019-12-25 21:01:20
  */

var checkPhone = function (phone) {
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
function sliceStr(that, sliceLength) {
  sliceLength = sliceLength || 11
  var value = that.value
  if (value.length > sliceLength) value = value.slice(0, sliceLength)
  that.value = value
}


var checkPassword = function (password) {
  return regExp.password.test(password) ? true : false
}

/**
 * @Description: 校验密码 字母或数字6-14位
 * @Author: LiSuwan
 * @Date: 2020-01-06 09:56:18
 * @param {String} password:密码 
 */
var checkPasswordTip = function (password) {
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
  var file = fileData[0].files[0];//获取上传的文件
  var fileName = file && file.name; //上传的文件名
  var point = fileName.lastIndexOf(".");
  var type = fileName.substr(point + 1);
  return { type:type, fileName:fileName }
}

/**
 * @Description: 获取上传图片的大小
 * @Author: LiSuwan
 * @Date: 2020-01-07 10:10:08
 * @param {Object} fileData：上传的文件对象
 * @param {Number} Max_Size：限制图片大小：默认是512000字节（500KB）
 * @return: {boolean} isAllow
 */
var testMaxSize = function (fileData, Max_Size) {
  Max_Size = Max_Size || 512000
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
  var htmlStr = '<div>' +
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
 * @Description: 头部nav选中
 * @Author: ZhangChen
 * @Date: 2020-09-18 20:44:53
 */
var navChecked = function (params) {
  setTimeout(function () {
    $("header .nav_list  li ").eq(params).addClass("nav_li_active");
  }, 200);
};


/**
   * @Description: 初始化省市区数据
   * @Author: xujun
   * @Date: 2020-09-18 22:13:14
   */
  function initAreaData() {
    var province = ChineseDistricts["86"];
    console.log(province);
    var prostr = "";
    for (prokey in province) {
      prostr +=
        '<li class="select-list-item province" data-id="' +
        prokey +
        '">' +
        province[prokey] +
        "</li>";
    }
    $(".province").html(prostr);
    // 默认城市显示
    var defaltCity =
      '<li class="select-list-item city" data-id="110100">' +
      ChineseDistricts["110000"]["110100"] +
      "</li>";
    $(".city").html(defaltCity);
    // 默认区显示
    var area = ChineseDistricts["110100"];
    var areastr = "";
    for (areakey in area) {
      areastr +=
        '<li class="select-list-item area" data-id="' +
        areakey +
        '">' +
        area[areakey] +
        "</li>";
    }
    $(".area").html(areastr);
  }
$(function(){
  if (navigator.appName == "Microsoft Internet Explorer" && parseInt(navigator.appVersion.split(";")[1].replace(/[ ]/g, "").replace("MSIE", "")) < 10) {
    $(".customer_form_list li").addClass("ie")
  }
    if($(".object_base_info .swiper-container").length != 0) {
      if (navigator.appName == "Microsoft Internet Explorer" && parseInt(navigator.appVersion.split(";")[1].replace(/[ ]/g, "").replace("MSIE", "")) < 10) {
        //--  IE8 如果需要前进后退按钮 --
        $('.object_base_info .swiper-button-prev,.object_base_info .swiper-button-next').addClass("ie")
        $('.object_base_info .swiper-button-prev').click(function (e) {
            e.preventDefault();
            infoSwiper.swipePrev();
            infoSwiper.startAutoplay();
        });
        $('.object_base_info .swiper-button-next').click(function (e) {
            e.preventDefault();
            infoSwiper.swipeNext();
            infoSwiper.startAutoplay();
        });

      }
      /**
      * @Description: 初始化 项目详情 项目基本信息左侧 轮播图
      * @Author: longhaiyan
      * @Date: 2020-09-17 18:14:22
      */
      var infoSwiper = new Swiper('.object_base_info .swiper-container', {
        slidesPerView: 3,
        spaceBetween: 30,
        centeredSlides: true,
        loop:true,
        on: {
            // 轮播切换结束事件  对应改变大图显示
            slideChangeTransitionEnd: function(){
                $("#infoShow").attr("src",$(".object_base_info .swiper-slide").eq(this.activeIndex).find("img").attr("src"))
            },
        },
        onSlideChangeEnd:function(swiper){
          // console.log(swiper.activeLoopIndex)
          $("#infoShow").attr("src",$(".object_base_info .swiper-slide").eq(swiper.activeLoopIndex-1).find("img").attr("src"))
        },
        navigation: {
            nextEl: '.object_base_info .swiper-button-next',
            prevEl: '.object_base_info .swiper-button-prev',
        },
      });
    }

    
   

  /**
   * @Description: 项目详情 点击缩略图  展示对应大图
   * @Author: longhaiyan
   * @Date: 2020-09-17 18:15:10
   */
  
  if (!(navigator.appName == "Microsoft Internet Explorer" && parseInt(navigator.appVersion.split(";")[1].replace(/[ ]/g, "").replace("MSIE", "")) < 10)) {
    $("body").on("click",".object_base_info .swiper-slide",function(){
      $("#infoShow").attr("src",$(".object_base_info .swiper-slide").eq($(this).index()).find("img").attr("src"))
        infoSwiper.slideTo($(this).index(),100,false) // swipeTo
    })
  }

  /**
   * @Description: 点击省 / 市 / 区 展开下拉选择
   * @Author: longhaiyan
   * @Date: 2020-09-21 13:37:27
   */
  $("body").on("click",".area_box",function(){
    $(this).find("ul").slideToggle()
  })
  
  /**
   * @Description: 点击选择项设置省
   * @Author: xujun
   * @Date: 2020-09-18 10:59:55
   */
  $("body").on("click", ".province li", function (e) {
    e.preventDefault()
    e.stopPropagation()
    $(this).addClass("on").siblings().removeClass("on");
    var currentCities = ChineseDistricts[$(this).data("id")];
    console.log(currentCities);
    var citystr = "";
    var cityCont = [];
    for (citykey in currentCities) {
      citystr +=
        '<li class="select-list-item city" data-id="' +
        citykey +
        '">' +
        currentCities[citykey] +
        "</li>";
      cityCont.push(citykey);
    }
    var currentAreaDefault = "";
    for (cadkey in ChineseDistricts[cityCont[0]]) {
      currentAreaDefault +=
        '<li  class="select-list-item area" data-id="' +
        cadkey +
        '">' +
        ChineseDistricts[cityCont[0]][cadkey] +
        "</li>";
    }
    $(this).parents(".area_box").siblings().find(".area").html(currentAreaDefault);
    $(this).parents(".area_box").siblings().find(".city").html(citystr);
    $(this).addClass("active").siblings().removeClass("active");
    $(".province-val").eq(0).text();
    if( $(this).parents(".area_box").find(".province li.active").length == 0) {
      $(this).parents(".area_box").find("input.province_input").val($(this).parents(".area_box").find(".province li").eq(0).html())
    } else {
      $(this).parents(".area_box").find("input.province_input").val($(this).html())      
    }
    if( $(this).parents(".area_box").siblings().find(".city li.active").length == 0) {
      $(this).parents(".area_box").siblings().find("input.city_input").val($(this).parents(".area_box").siblings().find(".city li").eq(0).html())
    } else {
      $(this).parents(".area_box").siblings().find("input.city_input").val($(this).parents(".area_box").siblings().find(".city li.active").eq(0).html())      
    }
    if( $(this).parents(".area_box").siblings().find(".area li.active").length == 0) {
      $(this).parents(".area_box").siblings().find("input.area_input").val($(this).parents(".area_box").siblings().find(".area li").eq(0).html())
    } else {
      $(this).parents(".area_box").siblings().find("input.area_input").val($(this).parents(".area_box").siblings().find(".area li.active").eq(0).html())      
    }
    $(this).parent().slideUp()
  });

  /**
   * @Description: 点击选择项设置市
   * @Author: xujun
   * @Date: 2020-09-18 10:59:55
   */
  $("body").on("click", ".city li", function (e) {
    e.stopPropagation()
    var currentArea = ChineseDistricts[$(this).data("id")]
		console.log(currentArea)
		var areastr = ""
		for(areakey in currentArea) {
			areastr += '<li data-id="'+areakey+'">'+currentArea[areakey]+'</li>'
		}
		$(this).parents(".area_box").siblings().find(".area").html(areastr)
    $(this).addClass("active").siblings().removeClass("active");
    $(".city-val").eq(0).text();
    if( $(this).parents(".area_box").siblings().find(".province li.active").length == 0) {
      $(this).parents(".area_box").siblings().find("input.province_input").val($(this).parents(".area_box").siblings().find(".province li").eq(0).html())
    } else {
      $(this).parents(".area_box").siblings().find("input.province_input").val($(this).parents(".area_box").siblings().find(".province li.active").html())      
    }
    if( $(this).parents(".area_box").find(".city li.active").length == 0) {
      $(this).parents(".area_box").find("input.city_input").val($(this).parents(".area_box").find(".city li").eq(0).html())
    } else {
      $(this).parents(".area_box").find("input.city_input").val($(this).html())      
    }
    if( $(this).parents(".area_box").siblings().find(".area li.active").length == 0) {
      $(this).parents(".area_box").siblings().find("input.area_input").val($(this).parents(".area_box").siblings().find(".area li").eq(0).html())
    } else {
      $(this).parents(".area_box").siblings().find("input.area_input").val($(this).parents(".area_box").siblings().find(".area li.active").html())      
    }
    $(this).parent().slideUp()
  });

  /**
   * @Description: 点击选择项设置区
   * @Author: xujun
   * @Date: 2020-09-18 10:59:55
   */
  $("body").on("click", ".area li", function (e) {
    $(this).addClass("active").siblings().removeClass("active");
    e.stopPropagation()
    var currentArea = ChineseDistricts[$(this).data("id")]
    $(this).addClass("active").siblings().removeClass("active");
    $(".area-val").eq(0).text();
    $(".area_box ul").slideUp()
    
    if( $(this).parents(".area_box").siblings().find(".province li.active").length == 0) {
      $(this).parents(".area_box").siblings().find("input.province_input").val($(this).parents(".area_box").siblings().find(".province li").eq(0).html())
    } else {
      $(this).parents(".area_box").siblings().find("input.province_input").val($(this).parents(".area_box").siblings().find(".province li.active").html())      
    }
    if( $(this).parents(".area_box").siblings().find(".city li.active").length == 0) {
      $(this).parents(".area_box").siblings().find("input.city_input").val($(this).parents(".area_box").siblings().find(".city li").eq(0).html())
    } else {
      $(this).parents(".area_box").siblings().find("input.city_input").val($(this).parents(".area_box").siblings().find(".city li.active").html())      
    }
    if( $(this).parents(".area_box").find(".area li.active").length == 0) {
      $(this).parents(".area_box").find("input.area_input").val($(this).parents(".area_box").siblings().find(".area li").eq(0).html())
    } else {
      $(this).parents(".area_box").find("input.area_input").val($(this).html())      
    }
  });
  
  /**
   * @Description: 点击通话
   * @Author: xujun
   * @Date: 2020-09-18 09:23:14
   */
  $("body").on("click", ".imit_call_btn", function () {
    var phone1 = $(this).prev().val(); // 手机号
    if (!phone1) {
      layer.msg("请输入手机号");
    } else if (!checkTelphone(phone1)) {
      layer.msg("手机号格式不正确");
    } else {
      $(this).prev().val("")
      layer.closeAll()
      layer.msg("您的手机号已提交，请耐心等待")
    }
  });
  /**
   * @Description: 点击其他地方隐藏下拉框
   * @Author: xujun
   * @Date: 2020-09-18 10:54:34
   */
  $("body").bind("click", function (e) {
    var target = $(e.target);
    if (
      target.closest(
        ".select-wrap.province, .select-wrap.city,  .select-wrap.area"
      ).length == 0
    ) {
      $(".select-list").hide(0.3);
    }
  });
  /**
   * @Description: 点击提交资询
   * @Author: xujun
   * @Date: 2020-09-18 20:37:38
   */
  $("body").on("click", "#btn-consult-submit", function () {
    var name = $("#name").val(); // 姓名
    var phone2 = $("#phone2").val(); // 电话
    var message = $("#message").val(); // 留言
    var money = $("#money").val(); // 金额
    var protocol = $("#protocol:checked"); // 是否同意协议
    var sex = $(".sex:checked").eq(0).val(); // 1 先生 2女士
    if (!name) {
      layer.msg("请输入您的姓名");
    } else if (!sex) {
      layer.msg("请选择您的称呼");
    } else if (!phone2) {
      layer.msg("请输入您的电话号码");
    } else if (!checkTelphone(phone2)) {
      layer.msg("请正确输入您的电话号码");
    } else if (protocol.length == 0) {
      layer.msg("请阅读并同意 《商机互通网服务条款》");
    } else {
      layer.msg('您的加盟咨询申请已提交')
      $("#name,input[name=sex],#money,#phone2,#provinceJoin1,#cityJoin1,#areaJoin1,#message").val("")
      $("input[name=sex],input[type=checkbox]").prop("checked",false)
      initAreaData()
    }
  });

  /**
   * @Description: 点击金额 展开下拉选框
   * @Author: longhaiyan
   * @Date: 2020-09-21 15:41:11
   */
  $("body").on("click",".money_choose input",function(){
    $(this).next().slideToggle()
  })

  /**
   * @Description: 选择金额
   * @Author: longhaiyan
   * @Date: 2020-09-21 15:42:44
   */
  $("body").on("click",".money_choose ul li",function(){
    $(this).parent().slideToggle().prev().val($(this).text())
  })

  /**
     * @Description: 咨询弹窗
     * @Author: longhaiyan
     * @Date: 2020-09-21 14:47:46
     */
    var topJoinPop = '<img src="./images/pop_close.png" alt="关闭" class="pop_close join_pop_close"><div class="form_top">'+
      '<p class="form_top_left">我对此项目很感兴趣，马上电联或留言</p>'+
      '<p class="form_top_right">24小时内获得企业快速回复</p></div>'+
    '<div class="form_item">'+
      '<div class="customer_form">'+
        '<ul class="customer_form_list">'+
          '<li>'+
            '<div class="custo_left"><span>姓名</span><i>*</i></div>'+
            '<div class="custo_right">'+
              '<input type="text" id="nameJoin1" class="name_input form_input size_two" />'+
              '<label><input type="radio" class="sex" id="man" name="sex" value="1" /><span>先生</span></label>'+
              '<label><input type="radio" class="sex" id="man" name="sex" value="2" /><span>女士</span></label>'+
            '</div>'+
            '<div class="clear"></div>'+
          '</li>'+
          '<li class="right">'+
            '<span class="custo_left">金额</span>'+
            '<div class="money_choose"><input type="text" id="moneyJoin1" readonly class="money_choice custo_right form_input select_input size_one" placeholder="选择基本投资额" />'+
            '<ul>'+
                '<li>5-10万</li>'+
                '<li>10-20万</li>'+
                '<li>30-40万</li>'+
                '<li>40-50万</li>'+
               '<li>50-100万</li>'+
              '</ul></div>'+
          '</li>'+
          '<li>'+
            '<div class="custo_left"><span>电话</span><i>*</i></div>'+
            '<input type="number" maxlength="11" oninput="if(value.length>11)value=value.slice(0,11)" id="phoneJoin1" class="phone_input custo_right form_input"  />'+
          '</li>'+
          '<li class="right">'+
            '<span class="custo_left">地区</span>'+
            '<div class="custo_right">'+
              '<div class="area_box">'+
                '<input type="text" class="province_input form_input select_input size_three" readonly id="provinceJoin2" placeholder="省" />'+
                '<ul class="province"></ul>'+
              '</div>'+
              '<div class="area_box">'+
                '<input type="text" class="city_input form_input select_input size_three" readonly id="cityJoin2" placeholder="市"/>'+
                '<ul class="city"></ul>'+
              '</div>'+
              '<div class="area_box">'+            
                '<input type="text" class="area_input form_input select_input size_three" readonly id="areaJoin2" placeholder="区" />'+
                '<ul class="area"></ul>'+
              '</div>'+
            '</div>'+
          '</li>'+
          '<li class="clear message_li">'+
            '<span class="custo_left">留言</span>'+
            '<div class="custo_right form_input message_right">'+
             '<textarea name="" id="messageJoin1" cols="30"  rows="10" placeholder="请输入您的留言" ></textarea>'+
              '<div class="custo_right_tip">'+
                '<h6 class="form_tit" style="padding: 0px">快捷留言</h6>'+
                '<p class="message_text">我对本项目很感兴趣，请尽快寄资料给我！</p>'+
                '<p class="message_text">我想详细了解本项目的加盟流程，请与我联系！</p>'+
                '<p class="message_text">做为本项目的代理加盟商能得到哪些支持？</p>'+
                '<p class="message_text">请问投资本项目所需要的费用有哪些？</p>'+
              '</div>'+
              '<div class="clear"></div>'+
            '</div>'+
          '</li>'+
          '<li class="clear message_li last">'+
            '<span class="custo_left"></span>'+
            '<div class="custo_right">'+
              '<div class="agree_box">'+
                '<label class="text-label" style="padding: 0"><span class="check_box"><input type="checkbox" name="agree" />我已阅读并同意</span>'+
                    '<a href="protocol.html"   >《商机互通网服务条款》</a>'+
                '</label>'+
              '</div>'+
              '<div class="submit_item">'+
                '<button class="btn_org pop_sub_join" >提交咨询</button>'+
                '<span>（<i>*</i>为必填项）</span>'+
              '</div>'+
            '</div>'+
          '</li>'+
        '</ul>'+
      '</div>'+
      '<div class="clear"></div>'+
    '</div>'
    
    /**
     * @Description: 点击加盟咨询   打开加盟咨询弹窗
     * @Author: longhaiyan
     * @Date: 2020-09-18 21:31:30
     */
    $("body").on("click",".top_join",function(e){
        e.preventDefault()
        e.stopPropagation()
        layer.open({
            type:1,
            content:topJoinPop,
            title:false,
            btn:"",
            closeBtn:false,
            skin:"join-pop",
            className:"join-pop",
            success:function(layero){
                initAreaData()
                if (navigator.appName == "Microsoft Internet Explorer" && parseInt(navigator.appVersion.split(";")[1].replace(/[ ]/g, "").replace("MSIE", "")) < 10) {
                  $(".customer_form_list li").addClass("ie")
                }
            }
        })
    })


    /**
     * @Description: 点击咨询弹窗的提交按钮
     * @Author: longhaiyan
     * @Date: 2020-09-21 14:35:51
     */
    $("body").on("click",".pop_sub_join",function(){
        if($(this).parents(".customer_form").find(".name_input").val() == "") {
            layer.msg("请输入您的姓名")
        } else if($(this).parents(".customer_form").find("input[name=sex]").prop("checked") == false) {
            layer.msg("请选择您的称呼")
        } else if($(this).parents(".customer_form").find(".phone_input").val() == ""){
            layer.msg("请输入您的电话号码")
        } else if(!checkTelphone($(this).parents(".customer_form").find(".phone_input").val())){
            layer.msg("请正确输入您的电话号码")
        } else if( !$(this).parents(".customer_form").find("input[name=agree]").prop("checked")){
            layer.msg("请阅读并同意 《商机互通网服务条款》");
        } else {
          layer.closeAll()
          layer.msg("您的加盟咨询申请已提交")
        }
    })

    /**
     * @Description: 点击加盟咨询弹窗的关闭按钮
     * @Author: longhaiyan
     * @Date: 2020-09-18 22:02:11
     */
    $("body").on("click",".join_pop_close",function(){
        layer.closeAll()
    })

    /**
     * @Description: 通话弹窗
     * @Author: longhaiyan
     * @Date: 2020-09-21 14:47:59
     */
    var talkPop = '<img src="./images/pop_close.png" alt="关闭" class="pop_close join_pop_close">'+
    '<div class="form_item">'+
      '<div class="contact_form">'+
        '<div class="left_form_top">'+
          '<img src="./images/one_mini.png" alt="1分钟极速响应" />'+
          '<div class="left_top_right">'+
            '<p class="top_right_tit">立即与我们沟通</p>'+
            '<p class="top_right_txt">1分钟极速响应</p>'+
          '</div>'+
        '</div>'+
        '<h6 class="form_tit"><i></i><span>直拨通话</span></h6>'+
        '<p class="direct_phone">025-88888888</p>'+
       '<h6 class="form_tit"><i></i><span>免费通话</span></h6>'+
        '<input type="number" maxlength="11" oninput="if(value.length>11)value=value.slice(0,11)"  placeholder="请输入您的手机号" class="form_input" id="talJoin1" />'+
        '<button class="imit_call_btn btn_green">点击通话</button>'+
        '<p class="submit_tip">'+
          '<img src="./images/submit_tip.png" alt="提示" />'+
          '<span>提交后，企业招商经理将马上致电您</span>'+
        '</p>'+
      '</div>'+
      '<div class="clear"></div>'+
    '</div>'

    /**
     * @Description: 点击通话按钮 打开立即通话弹窗
     * @Author: longhaiyan
     * @Date: 2020-09-18 22:16:43
     */
    $("body").on("click",".top_talk_phone",function(e){
         e.preventDefault()
        e.stopPropagation()
        layer.open({
            type:1,
            content:talkPop,
            title:false,
            btn:"",
            closeBtn:false,
            skin:"talk-pop",
            className:"talk-pop",
        })
    })
    
    /**
     * @Description: 点击索要资料  定位到 咨询表单的位置
     * @Author: longhaiyan
     * @Date: 2020-09-21 18:30:36
     */
    $("body").on("click",".need_data",function(){
      var iTop = $(".form_item").offset().top;
      $("html,body").animate({ "scrollTop": iTop - 80 }, 500);
    })
})