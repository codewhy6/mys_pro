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

/* 表单输入框更改光标的颜色==================== */
.input{
    caret-color: #1478fc;
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

### 十四、右箭头/叉号/三角形/加号-css样式

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
/* ================================================================================ */
/* 叉号的css样式,伪元素 */
.close_icon {
    position: relative;
    /* width: 40px;
    height: 40px; */
}
.close_icon::before,
.close_icon::after {
    position: absolute;
    content: " ";
    background-color: red;
    left: 20px;
    width: 1px;
    height: 40px;
}
.close_icon::before {
    transform: rotate(45deg);
}
.close_icon::after {
    transform: rotate(-45deg);
}

/* ================================================================================ */
/* 三角形-css样式 */
.triangle::after {
    content:'';
    position:absolute;
    left:0px;
    top:0px;
    width: 0;
    height: 0;
    border-style: solid;
    border-width: 86.6px 50px 0 50px;
    border-color: #00adb5 transparent transparent transparent;
}

/* ================================================================================ */
/* 加号-css样式 */
.add_icon {
    border: 1px solid;
    width: 100px;
    height: 100px;
    color: #ccc;
    transition: color .25s;
    position: relative;
}
.add_icon::before{
    content: '';
    position: absolute;
    left: 50%;
    top: 50%;
    width: 80px;
    margin-left: -40px;
    margin-top: -5px;
    border-top: 10px solid;
}
.add_icon::after {
    content: '';
    position: absolute;
    left: 50%;
    top: 50%;
    height: 80px;
    margin-left: -5px;
    margin-top: -40px;
    border-left: 10px solid;
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

//--倒计时
function countDown(params) {
    let newDate = +new Date();
    let targetDate = +new Date(params);
    // 毫秒数变成秒数
    let times = Math.floor((targetDate - newDate) / 1000);
    // 剩余天数
    let d = Math.floor(times / (60 * 60 * 24));
    // 剩余小时数
    let h = getTimeStyle(Math.floor((times % (60 * 60 * 24)) / (60 * 60)));
    // 剩余分钟数
    let m = getTimeStyle(Math.floor((times % (60 * 60)) / 60));
    // 剩余秒数
    let s = getTimeStyle(Math.floor(times % 60));
    // console.log(d);
    // console.log(h);
    // console.log(m);
    // console.log(s);
    return `剩余${d}天${h}小时${m}分钟${s}秒`;
}
console.log(countDown("2020-11-13 00:00:00"));

function getTimeStyle(a) {
    return a < 10 ? "0" + a : a;
}


// 对象转数组
export const objToArr = (obj) => {
    let res = []
    for (let key in obj) {
        res.push({
            value: key,
            text: obj[key]
        })
    }
    return res
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

### 十八、点击复制文本

```html
<span id="ptext1">NJ14206</span>
<!-- 点击复制需要一个隐藏的textarea 才能复制到粘贴板-->
<textarea id="input1" style="position: fixed; top: 100%"></textarea>
```

```js
copyUrl() {
    var text = document.getElementById("ptext1").innerText;
    var input = document.getElementById("input1");
    input.value = text; // 修改文本框的内容
    input.select();
    document.execCommand("Copy");
    this.$message({
        message: "复制成功！",
        type: "success",
    });
},
```

### 十九、双飞翼布局

```html
<main class="main">
    <section :style="width:100%">
        <div class="center">
            A paragraph of filler text. La la la de dah de dah de dah de la.
        </div>
        <div class="left">left</div>
        <div class="right">right</div>
    </section>
</main>
```

```css
main {
    width: 100%;
    font-size: 12px;
}
section {
    box-shadow: 0 0 0 1px #eee;
}
/* 清除浮动 */
section::after {
    content: "";
    display: block;
    clear: both;
}
section > div {
    height: 229px;
    line-height: 1.5em;
    text-align: center;
    /* 浮动 */
    float: left;
    color: white;
}
section .left,
section .right {
    /* 左右盒子固定的宽度 */
    width: 119px;
    background: #b4a078;
}
section .left {
    margin-left: -100%;
}
section .center {
    width: 100%;
    text-align: justify;
    hyphens: auto;
    background: pink;
    background-clip: content-box;
    /* 中间的自适应盒子宽度是100%，padding就是左右盒子的宽度+间隙（10px） */
    padding: 0px 129px;
    box-sizing: border-box;
}

section .right {
    margin-left: -119px;
}
```

### 二十、绝对底部布局

```html
<main class="main">
    <header>
        <h1>Site Header</h1>
    </header>
    <section>
        <input id="con-1" type="checkbox" checked />
        <label for="con-1"><b>Toggle contents</b></label>
        <p>
            A paragraph of filler text. La la la de dah de dah de dah de la.A
            paragraph of filler text. La la la de dah de dah de dah de la.A
            paragraph of filler text. La la la de dah de dah de dah de la.A
            paragraph of filler text. La la la de dah de dah de dah de la.A
            paragraph of filler text. La la la de dah de dah de dah de la.A
            paragraph of filler text. La la la de dah de dah de dah de la.
        </p>
    </section>
    <footer>
        <p>© 2018 LHammer</p>
        <p>CSS Tricks need to know for web developer.</p>
    </footer>
</main>
```

```css
main {
    width: 100%;
    height: 392px;
}
section input:checked ~ p {
    display: none;
}
.main > header,
.main > section,
.main > footer {
    padding: 0.1em calc(50% - 329px);
    text-align: justify;
    hyphens: auto;
}
header {
    text-align: center;
}
section {
    box-sizing: border-box;
    /* 赋予内容区最小高度:calc() 计算（视窗高度 - 页头高度 - 页脚高度） */
    min-height: calc(100vh - 88px - 93px);
}
footer {
    color: white;
    background: #747e7f;
}
```

### 二十一、条纹背景进度条

```html
<main>
    <div class="progress-outer">
        <!--更好的扩展-->
        <div class="progress-enter">
            <div class="progress-bg"></div>
        </div>
        <!-- <span>60%</span> -->
    </div>
</main>
```

```css
main {
    width: 100%;
    padding: 80px 0px;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
}
.progress-outer {
    width: 60%;
    height: 12px;
    border-radius: 8px;
    overflow: hidden;
    position: relative;
}
.progress-enter {
    height: inherit;
    background: rgba(180, 160, 120, 0.2);
}
.progress-bg {
    width: 60%;
    height: inherit;
    border-radius: 6px;
    background: repeating-linear-gradient(
        -45deg,
        #d9cfbb 25%,
        #c3b393 0,
        #c3b393 50%,
        #d9cfbb 0,
        #d9cfbb 75%,
        #c3b393 0
    );
    background-size: 16px 16px;
    animation: panoramic 20s linear infinite;
}
@keyframes panoramic {
    to {
        background-position: 200% 0;
    }
}
```

### 二十二、金额保留两位小数

```js
Money(value, num) {
    num = num > 0 && num <= 20 ? num : 2;
    value = parseFloat((value + "").replace(/[^\d\.-]/g, "")).toFixed(num) + ""; //将金额转成比如 123.45的字符串
    var valueArr = value.split(".")[0].split("").reverse() //将字符串的数变成数组
    const valueFloat = value.split(".")[1]; // 取到 小数点后的值
    let valueString = "";
    for (let i = 0; i < valueArr.length; i++) {
        valueString += valueArr[i] + ((i + 1) % 3 == 0 && (i + 1) != valueArr.length ? "," : ""); //循环 取数值并在每三位加个','
    }
    const money = valueString.split("").reverse().join("") + "." + valueFloat; //拼接上小数位
    return money
},

    
//--正则表达式
/^(([1-9]{1}\d*)|(0{1}))(\.\d{1,2})?$/
```

### 二十三、获取用户当前所在的城市

```js
<script src="http://pv.sohu.com/cityjson?ie=utf-8"></script>

console.log(returnCitySN)
//--{cip: "221.231.169.178", cid: "320100", cname: "江苏省南京市"},'returnCitySN'

export const getIp = () => {
    return new Promise((resolve, reject) => {
        var script = document.createElement('script')
        // script.src = 'https://jsonip.com/'
        script.src = 'https://pv.sohu.com/cityjson?ie=utf-8'
        script.onload = function () {
            resolve(window.returnCitySN)
        }
        document.body.appendChild(script)
    })
}
//--使用
import {getIp} from '../../utils/util';
getIp().then((res) => {
    this.ip = res.cip;
});
```

### 二十四、自定义键盘，不弹起手机自带的软键盘

```html
<div class="input-wrap">
    <!--<input-->
    <!--type="text"-->
    <!--class="inp"-->
    <!--placeholder="请输入金额"-->
    <!--v-model="money"-->
    <!--:readonly="true"-->
    <!--/>-->
    <!--<span class="flagSta"></span>-->
    <div class="numb" @click="changeStatus" v-show="!money">请输入金额</div>
    <div class="numb2" v-show="showNum || money">{{ money }}</div>
    <span class="sym">￥</span>
</div>
```

```less
.input-wrap {
    position: relative;
    border-bottom: 1px solid #e4e4e4;
    height: 60px;
    .inp {
        width: 100%;
        height: 100px;
        font-size: 54px;
        line-height: 140px;
        text-indent: 36px;
        border: none;
        // font-weight: bold;
        caret-color: #1478fc;
    }
    .sym {
        position: absolute;
        left: 0;
        bottom: 15px;
        font-size: 36px;
    }
}
.numb {
    height: 60px;
    /* position: absolute; */
    padding-left: 40px;
    padding-top: 5px;
    font-size: 36px;
    color:#ccc;
}

.numb2 {
    width: 93.5%;
    height: 60px;
    margin-left: 40px;
    box-sizing: border-box;
    padding-top: 5px;
    font-size: 36px;
    overflow-x: scroll;
    &::-webkit-scrollbar {
        display: none;
    }
}
.numb2::after {
    position: absolute;
    content: "";
    display: inline-block;
    width: 4px;
    height: 30px;
    animation: blink 1.2s infinite;
    top: 9px;
    margin-left: 1px;
}
@keyframes blink {
    0%,
    100% {
        background-color: #1989fa;
    }
    50% {
        background-color: transparent;
    }
}
```

