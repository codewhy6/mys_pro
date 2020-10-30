# new methods

### 一、滚动条新的样式

```css
.intr_sed_txt::-webkit-scrollbar {
    /*滚动条整体样式*/
    width: 6px;
    /*高宽分别对应横竖滚动条的尺寸*/
    height: 1px;
  }

  .intr_sed_txt::-webkit-scrollbar-thumb {
    /*滚动条里面小方块*/
    border-radius: 10px;
    /* box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2); */
    background: #d7d7d7;
  }

  .intr_sed_txt::-webkit-scrollbar-track {
    /*滚动条里面轨道*/
    /* box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2); */
    border-radius: 10px;
    background: #f6f6f6;
  }
//------------------------------------------
 &::-webkit-scrollbar {
    /*滚动条整体样式*/
    width: 5px;
    /*高宽分别对应横竖滚动条的尺寸*/
    height: 1px;
  }
  &::-webkit-scrollbar-thumb {
    /*滚动条里面小方块*/
    border-radius: 10px;
    /* box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2); */
    background: #d7d7d7;
  }

  &::-webkit-scrollbar-track {
    /*滚动条里面轨道*/
    /* box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2); */
    border-radius: 10px;
    background: #f6f6f6;
  }

```

### 二、隐藏滚动条

```css
.sub-tab-wrap::-webkit-scrollbar {
  display: none;
}
```

### 三、判断是否为 IE 

```js
 if (navigator.appName == "Microsoft Internet Explorer" && parseInt(navigator.appVersion.split(";")[1].replace(/[ ]/g, "").replace("MSIE", "")) < 10) {}
```

### 四、重置轮播按钮

```html
<!-- swiper-btns -->
<div class=" pub_swiper_btns my_swiper_btn_next">
    <img src="./images/swiper_jt.png" alt="swiper_jt">
</div>
<div class=" pub_swiper_btns my_swiper_btn_prev">
    <img src="./images/swiper_jt.png" alt="swiper_jt">
</div>
```

```css
.pub_swiper_btns {
  width: 0.66rem;
  height: 0.66rem;
  text-align: center;
  line-height: 0.6rem;
  border-radius: 50%;
  background-color: rgba(0, 0, 0, 0.5);
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  z-index: 99;
}
.pub_swiper_btns img {
  width: 0.18rem;
  height: 0.34rem;
}

.my_swiper_btn_next {
  right: 0rem;
}
.my_swiper_btn_prev {
  left: 0rem;
}
.my_swiper_btn_prev img {
  transform: rotate(-180deg);
}
```

### 五、轮播下的数字下标 

```html
<link href="https://cdn.bootcdn.net/ajax/libs/Swiper/5.4.5/css/swiper.css" rel="stylesheet">
<script src="https://cdn.bootcdn.net/ajax/libs/Swiper/5.4.5/js/swiper.js"></script>

 <!-- 头部轮播 -->
<div class="pro_index_swiper">
    <!-- Swiper -->
    <div class="swiper-container">
        <div class="swiper-wrapper">
            <div class="swiper-slide">
                <img src="./images/pro_index_swiper1.png" alt="项目首页轮播">
            </div>
            <div class="swiper-slide">
                <img src="./images/pro_index_swiper1.png" alt="项目首页轮播">
            </div>
            <div class="swiper-slide">
                <img src="./images/pro_index_swiper1.png" alt="项目首页轮播">
            </div>
        </div>
    </div>

    <!-- 轮播数字下标 -->
    <div class="swiper_num_box">
        <span class="current_num">1</span>
        <span>/</span>
        <span class="total_num">3</span>
    </div>
</div>
```

```css
.swiper_num_box {
  width: 1.09rem;
  height: 0.52rem;
  line-height: 0.52rem;
  text-align: center;
  background-color: rgba(0, 0, 0, 0.5);
  border-radius: 0.26rem;
  position: absolute;
  right: 0.13rem;
  bottom: 0.13rem;
  z-index: 999;
  font-size: 0.3rem;
  color: #ffffff;
}
```



```js
var proSwiper = new Swiper('.pro_index_swiper .swiper-container', {
            spaceBetween: 30,
            centeredSlides: true,
            autoplay: {
                delay: 2500,
                disableOnInteraction: false,
            },
            loop: true,
            on: {
                init: function (swiper) {
                    $('.current_num').text('1')
                },
                slideChangeTransitionStart: function () {
                    // console.log(this.activeIndex);
                    var current_index = parseInt($('.pro_index_swiper .current_num').text()) + 1
                    var slidersCount = $('.pro_index_swiper .swiper-wrapper .swiper-slide img').length - 2
                    // console.log(slidersCount);
                    if (current_index > slidersCount) {
                        current_index = 1
                    }
                    $('.pro_index_swiper .current_num').text(current_index)

                },
            },
        });
        $('.pro_index_swiper .total_num').text(proSwiper.slides.length - 2)


/**
* @Description: 轮播缩略图的点击事件
* @Author: ZhangChen
* @Date: 2020-09-08 15:32:42
*/
$("body").on("click", ".my_swiperNums_btn_next", function () {
    swiperNums.slideNext()
    var current_index = parseInt($('.swiper_num_box .current_num').text()) + 1
    var slidersCount = $('.my_swiperNums_slide img').length - 6
    // console.log(slidersCount);
    if (current_index > slidersCount) {
        current_index = 1
    }
    $('.swiper_num_box .current_num').text(current_index)
})
$("body").on("click", ".my_swiperNums_btn_prev", function () {
    swiperNums.slidePrev()
    var current_index2 = parseInt($('.swiper_num_box .current_num').text()) - 1
    var slidersCount = $('.my_swiperNums_slide img').length - 6
    // console.log(slidersCount);
    if (current_index2 < 1) {
        current_index2 = slidersCount
    }
    $('.swiper_num_box .current_num').text(current_index2)
})
```

### 六、更改轮播点样式

```css
.swiper_home_container .swiper-pagination-bullet {
  width: 0.3rem;
  height: 0.04rem;
  background: #fff;
  border-radius: 0;
  margin: 0 0.1rem;
}
.swiper_home_container .swiper-pagination-bullet-active {
  background-color: #ff9515;
}
```

### 七、手机号码表单input

```html
<input type="number" maxlength="11" id="phone" oninput="if(value.length>11)value=value.slice(0,11)" placeholder="您的电话" class="custo_right form_input" />
```

### 八、单选按钮样式重置

```css
.customer_form input[type="radio"] {
  width: 0.24rem;
  height: 0.24rem;
  background-color: #fff;
  border: solid 1px #c9c9c9;
  border-radius: 50%;
  margin: 0px 0.14rem;
}

.customer_form input[type="radio"]:checked {
  position: relative;
  border-color: #ff6d15;
}

.customer_form input[type="radio"]:checked::after {
  position: absolute;
  content: "";
  width: 0.12rem;
  height: 0.12rem;
  background-color: #ff6d15;
  top: 50%;
  left: 50%;
  transform: translate3d(-50%, -50%, 0);
  -webkit-transform: translate3d(-50%, -50%, 0);
  -moz-transform: translate3d(-50%, -50%, 0);
  -ms-transform: translate3d(-50%, -50%, 0);
  -o-transform: translate3d(-50%, -50%, 0);
  border-radius: 50%;
  -webkit-border-radius: 50%;
  -moz-border-radius: 50%;
  -ms-border-radius: 50%;
  -o-border-radius: 50%;
}

.customer_form input[type="checkbox"]:checked {
  background: url(../images/radoi_checkedhiolk.png) 0px 0px no-repeat;
  background-size: 100% 100%;
  border: 1px solid #ff6d15;
}

input[type="file"]:focus,
input[type="radio"]:focus,
input[type="checkbox"]:focus {
  outline: none;
  border: 1px solid #ff6d15;
}

.customer_form input[type="checkbox"] {
  width: 0.24rem;
  height: 0.24rem;
  border-radius: 0.04rem;
  border: solid 1px #c9c9c9;
  background-color: #fff;
  margin-right: 0.15rem;
  -webkit-border-radius: 0.04rem;
  -moz-border-radius: 0.04rem;
  -ms-border-radius: 0.04rem;
  -o-border-radius: 0.04rem;
}

```



### 九、移动端横向可滚动栏

```html
<div class="join_detail_nav  ">
    <ul class=" join_detail_nav_list">
        <li class="join_detail_nav_item jdn_item_active ">加盟详情</li>
        <li class="join_detail_nav_item">加盟优势</li>
        <li class="join_detail_nav_item">加盟支持</li>
        <li class="join_detail_nav_item">加盟条件</li>
        <li class="join_detail_nav_item">加盟流程</li>
        <li class="join_detail_nav_item">加盟费用</li>
    </ul>
</div>
```

```css
.join_detail_nav {
  background-color: #fff;
  border-bottom: 1px solid #ebebeb;
  overflow-x: auto;
  display: flex;
  align-items: center;
}

.join_detail_nav::-webkit-scrollbar {
  display: none;
}

.join_detail_nav_list {
  padding: 0 4%;
  width: auto;
  background-color: #fff;
  white-space: nowrap;
}

.join_detail_nav_item {
  position: relative;
  padding: 0.2rem 0rem;
  display: inline-block;
}

.join_detail_nav_item + .join_detail_nav_item {
  margin-left: 0.3rem;
}

.join_detail_nav_item.jdn_item_active {
  font-size: 0.3rem;
  color: #ff6d15;
}

.join_detail_nav_item.jdn_item_active::after {
  content: "";
  width: 0.4rem;
  height: 0.05rem;
  background-color: #ff6d15;
  position: absolute;
  bottom: 0rem;
  left: 50%;
  transform: translateX(-50%);
}
```



### 十、搜索框的键盘回车事件

```js
/**
     * @Description: 搜索
     * @Author: xujun
     * @Date: 2020-09-21 13:56:32
     */
function handleSearch() {
    var searchVal = $(".input-search").val();
    if (!searchVal) {
        layer.open({
            content: "请输入搜索内容",
            skin: "msg",
            time: 2,
        });
        return;
    } else {
        window.location.href = "searchResult.html?searchVal=" + searchVal;
    }
}
/**
     * @Description: 键盘回车事件
     * @Author: xujun
     * @Date: 2020-09-22 13:47:56
     */
$(document).keydown(function (event) {
    if (event.keyCode == 13) {
        handleSearch();
        // 清空表单内容
        $(".input-search").val('');
    }
});

```

### 十一、分页样式

```html
<!-- 分页 start -->
<div class="paging" style="margin-bottom: 60px;">
    <button class="paging-btn-prev">
        <img src="./images/arrow_left.png" alt="arrow_left">
    </button>
    <button>1</button>
    <button class="paging-btn-on">2</button>
    <button class="morepages">…</button>
    <button>10</button>
    <button class="paging-btn-next">
        <img src="./images/arrow_right.png" alt="arrow_right">
    </button>
</div>
<!-- 分页 end -->
```

```css
.paging {
    text-align: center;
}

.paging button {
    width: 40px;
    height: 40px;
    line-height: 40px;
    background-color: #fff;
    color: #666;
    font-size: 16px;
    border: 1px solid #ededed;
    margin: 0 2px;
    cursor: pointer;
    overflow: hidden;
    -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
}

.paging button:hover {
    background-color: #1171f3;
    color: #fff;
}

.morepages {
    font-weight: bold;
}

.paging-btn-prev,
.paging-btn-next img {
    width: 9px;
    height: 14px;
    margin-top:-6px;
}


.paging button.paging-btn-on {
    background-color: #1171f3;
    color: #fff;
}

.paging-btn-next:hover img {
    content: url(./images/arrow_right_on.png);
}

.paging-btn-prev:hover img {
    content: url(./images/arrow_left_on.png);
}
```

### 十二、获取锚点参数

```js
var activeIndex = getUrlParams().activeIndex
// console.log(activeIndex);
$('.server_nav li').eq(activeIndex).addClass('nav_active').siblings().removeClass('nav_active')
// 页面滚动事件
setTimeout(function(){
    if (scrollIndex == 1) {
        var offsetTop = $('.boos_new_box').offset().top;
        $("html,body").animate({ "scrollTop": offsetTop }, 500);
    }
},1000)

/**
  * @Description: 设置初始tab状态
  * @Author: zhangchen
  * @Date: 2020-09-22 15:51:09
 */
function setTabActive(targetEle) {
    var query = getUrlParams();
    if (query.tabIndex) {
        $(targetEle)
            .eq(query.tabIndex)
            .addClass("active")
            .siblings()
            .removeClass("active");
    }
}
setTabActive();
```

### 十三、返回顶部的按钮事件

```js
$("body").on("click", ".scrollTop_box", function () {
    $("body,html").animate({
        scrollTop: 0,
    },"slow");
});

```

### 十四、三角箭头css样式

```css
/* 三角箭头的父元素 */
.arrow_jt {
    position: relative;
}

/* 三角箭头的css样式,伪元素 */
.arrow_jt::after {
    content: '';
    width: 12px;
    height: 12px;
    position: absolute;
    right: 15px;
    top: 50%;
    transform: translateY(-50%) rotate(45deg);
    background-color: transparent;
    border-width: 2px 2px 0px 0px;
    border-color: #fff;
    border-style: solid;
}
```

### 十五、格式化时间

```js
//格式化时间
onDateConfirm(e) {
    let time = new Date(e.detail);
    let y = time.getFullYear();
    let m = time.getMonth()+1;
    let d = time.getDate();
    let h = time.getHours();
    let mm = time.getMinutes();
    let s = time.getSeconds();
    let timeResult = y+'-'+this.add0(m)+'-'+this.add0(d)
    this.setData({
        time:timeResult,
        show3:false
    })
},
add0(m){return m<10?'0'+m:m },
```

### 十六、new js methods

```js
// 首字母大写
function getUpperCase(str) {
    // replace每找到一个敏感词，就会调用一次回调函数
    // keyword：会自动保存本次找到的敏感词的内容
    str = str.replace(/\b[a-z]/ig, function (keyword) {
        // 返回一个新值
        return keyword.toUpperCase();
    });
    return str;
}

// 将查询字符串变成一个对象的形式
let str = '?uname=chen&email=1464481294@qq.com&favs=swimming&favs=running&favs=basketball';
function getSearchObj(str) {
    // 定义一个对象，保存
    let obj = {};
    // 1.截取？之后的所有字符串
    str = str.substr(1);
    // 2.以&进行截取，变成一个数组
    let arr = str.split('&');
    // 3.遍历数组，获取每一项的值
    for (const item of arr) {
        // 4.以=进行截取
        arr = item.split('=');
        // 数组解构，取出数组中的每一项的值
        let [key, val] = arr;
        // 5.对象中有重复的属性名，就要将属性值放在一个数组中
        if (obj[key] === undefined) {
            obj[key] = val;
        } else {
            obj[key] = [].concat(obj[key], val)
        }
    }

    return obj;
};

// 方式二：零宽断言
// 截取字符串
let ret2 = str.match(/[a-z]+(?=:\/\/)|(?<=:\/\/)[a-z0-9.]+(?=:)|(?<=:)\d+(?=\/)|\/[a-z0-9./]+(?=\?)|(?<=\?)[a-z0-9=&]+(?=\#)|#[a-z0-9]+/ig);
console.log(ret2);
/*
    [
      0: "http"
      1: "www.tmooc.cn"
      2: "5050"
      3: "/product/index.html"
      4: "uname=chen&pwd=123"
      5: "#flag"
    ]
    */


// 封装获取元素样式的函数
function getStyle(ele, calssName) {
    if (window.getComputedStyle) {
        //大部分浏览器具有getComputedStyle()方法
        return window.getComputedStyle(ele, null).getPropertyValue(calssName);
    } else {
        //兼容IE8,7,6的方式,
        return ele.currentStyle[calssName];
    }
}


function addClass(obj, cn) {
    // 没有该样式就要添加
    if (!hasClass(obj, cn)) {
        obj.className += " " + cn;
    }
}

// 判断这个对象是不是有该样式
function hasClass(obj, cn) {
    let reg = new RegExp("\\b" + cn + "\\b");
    return reg.test(obj.className);
}

// 有该样式就要删除
function removeClass(obj, cn) {
    let reg = new RegExp('\\b' + cn + '\\b');
    obj.className = obj.className.replace(reg, '');
}

// 切换样式
function toggleClass(obj, cn) {
    if (hasClass(obj, cn)) {
        removeClass(obj, cn)
    } else {
        addClass(obj, cn);
    }
}

//--获取随机的整数
function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min; //含最大值，含最小值 
}
```

### 十七、动画animate函数

```js
function animate(obj, target, callback) {
    // 清除多余定时器
    clearInterval(obj.timer);
    // 开启定时器--执行动画
    obj.timer = setInterval(function () {
        // 定义步长（缓动动画）
        let step = (target - obj.offsetLeft) / 5;
        step = step > 0 ? Math.ceil(step) : Math.floor(step);
        // 判断是否到达目标位置
        if (obj.offsetLeft === target) {
            // 清除定时器，停止动画
            clearInterval(obj.timer);
            // 判断是否有回调函数
            if (callback) {
                // 调用回调函数
                callback();
            }
        }
        obj.style.left = obj.offsetLeft + step + 'px';
    }, 15)
}
```
