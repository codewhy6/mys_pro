# vue新方法

### 1、全局的自定义指令 v-focus

```js
// 全局的自定义指令，在定义是不需要写指令的前缀 v-，但是在调用时，必须要写
Vue.directive('focus', {
    // inserted函数，形参ele是原生的DOM元素，内部写的也都是原生的DOM语法
    inserted(ele) {
        // 原生DOM元素获取焦点事件
        ele.focus();
    }
});
```

### 2、时间-过滤器 

```js
Vue.filter('dateFormat', function (dataString, pattern = '') {
    // 根据给定的时间字符串，得到特定的时间
    let dt = new Date(dataString);
    let year = dt.getFullYear();
    let month =(dt.getMonth() + 1+'').padStart(2,'0');
    let day = (dt.getDate()+'').padStart(2,'0');
    //yyyy-mm-dd:返回这个日期格式
    if (pattern.toLowerCase() === 'yyyy-mm-dd') {
        return year + '-' + month + '-' + day;
    } else {
        let hour = (dt.getHours()+'').padStart(2,'0');
        let minute = (dt.getMinutes()+'').padStart(2,'0');
        let second = (dt.getSeconds()+'').padStart(2,'0');
        return `${year}-${month}-${day} ${hour}:${minute}:${second}`;
    }
});
```

### 3、asios网络请求

```js
// 导入axios网络请求模块----------------------------------------------------------
import axios from 'axios'
// 设置请求的根路径
axios.defaults.baseURL = 'http://127.0.0.1:8888/api/private/v1'
// 设置axios请求拦截器,因为所有的接口都需要获取到token之后,携带token才能进行发送请求,获取数据
axios.interceptors.request.use((config) => {
  // config:就是当前请求的对象,包含请求头,请求的url......,必须要返回
  // 为请求头对象,添加 Token 验证的 Authorization 字段
  config.headers.Authorization = window.sessionStorage.getItem('token');
  return config
})
// 注入到vue的原型对象中
Vue.prototype.$http = axios;
```

### 4、返回顶部-按钮事件

```js
 /**
 * @description: 点击返回顶部
 * @author: zhangChen
 */
clickBackTop() {
    let timer = setInterval(() => {
        let scrollTop =
            document.documentElement.scrollTop ||
            document.body.scrollTop ||
            document.getElementById("app").scrollTop;
        let stepSpeed = Math.floor(-scrollTop / 6);
        if (scrollTop == 0) {
            clearInterval(timer);
        }
        document.documentElement.scrollTop = document.body.scrollTop = document.getElementById(
            "app"
        ).scrollTop = scrollTop + stepSpeed;
    }, 30);
},
```

### 5、数值过万-过滤器

```js
filters: {
    million: function (value) {
        //过万处理
        let num;
        if (value > 9999) {
            //大于9999显示x.xx万
            num = Math.floor(value / 1000) / 10 + "万";
        } else if (value < 9999 && value > -9999) {
            num = value;
        } else if (value < -9999) {
            //小于-9999显示-x.xx万
            num = -(Math.floor(Math.abs(value) / 1000) / 10) + "万";
        }
        return num;
    },
},
```

### 6、上传图片的change事件

```js
toBase64(){
    var self = this
    var file = document.querySelector('input[type=file]').files[0];
    var reader = new FileReader();
    reader.onloadend = function () {
        //把转换后的数据给id为base64Img的src属性
        // console.log(reader.result);
        self.imageUrl = reader.result;
    }
    if (file) {
        reader.readAsDataURL(file);
    }
},
```

### 7、this.$router在新窗口中打开

```js
//--在单击事件触发的方法里
const {href} = this.$router.resolve({
    path: `/user_details/${userId}`
});
window.open(href, '_blank');
//--在user_details页面中怎么接受通过路径传递过来的userId?
let userId = this.$route.params.userId
```

### 8、vuex语法

```js
import { mapActions, mapState, mapMutations } from "vuex";
//-computed中引入mapState
...mapState(["hotLive", "jackpotList", "jackpotTime", "jackpotAn"]),

```

### 9、千分符-过滤器

```js
filters: {
    thousandMark: function (value) {
        if(typeof value != "string"){
            value=value+''
        }
        return value=value.replace(/(\d)(?=(\d{3})+(\.|$))/g,'$1,');
    },
},
```

### 10、数字转中文-过滤器

```js
filters: {
    toChinesNum: function (num) {
        let changeNum = [
            "零",
            "一",
            "二",
            "三",
            "四",
            "五",
            "六",
            "七",
            "八",
            "九",
        ];
        let unit = ["", "十", "百", "千", "万"];
        num = parseInt(num);
        let getWan = (temp) => {
            let strArr = temp.toString().split("").reverse();
            let newNum = "";
            for (var i = 0; i < strArr.length; i++) {
                newNum =
                    (i == 0 && strArr[i] == 0
                     ? ""
                     : i > 0 && strArr[i] == 0 && strArr[i - 1] == 0
                     ? ""
                     : changeNum[strArr[i]] + (strArr[i] == 0 ? unit[0] : unit[i])) +
                    newNum;
            }
            
            if (newNum=='一十') {
              newNum='十'
            }
            return newNum;
        };
        let overWan = Math.floor(num / 10000);
        let noWan = num % 10000;
        if (noWan.toString().length < 4) {
            noWan = "0" + noWan;
        }
        return overWan ? getWan(overWan) + "万" + getWan(noWan) : getWan(num);
    },
},
```

### 11、银行卡表单输入有空格--过滤器

```js
filters: {
    cardNoFormat: function (value) {
        if(typeof value != "string"){
            value=value+''
        }
        return value=value.replace(/(\s)/g, '').replace(/(\d{4})/g, '$1 ').replace(/\s*$/, '');
    },
},
```



### 12、点击滚动页面指定的位置scrollTo（）

```js
toScroll(id) {
    let el = document.getElementById(id);
    let baseH = document.getElementById("");
    let page = document.getElementById("");
    page.scrollTo({
        top: baseH.offsetTop + el.offsetTop - 80,
        behavior: "smooth",
    });
},
```

### 13、点击全屏显示

```js
//获取浏览器型号和版本号
export function bro() {
    let broName = ''
    let strStart = 0
    let strStop = 0
    let temp = ''
    let userAgent = window.navigator.userAgent // 包含以下属性中所有或一部分的字符串：appCodeName,appName,appVersion,language,platform
    // FireFox
    if (userAgent.indexOf('Firefox') !== -1) {
        strStart = userAgent.indexOf('Firefox')
        temp = userAgent.substring(strStart)
        broName = temp.split('/')
    }
    // Edge
    if (userAgent.indexOf('Edge') !== -1) {
        /* broName = 'Edge浏览器'; */
        strStart = userAgent.indexOf('Edge')
        temp = userAgent.substring(strStart)
        broName = temp.split('/')
    }
    // IE浏览器
    if (userAgent.match(/msie ([\d.]+)/)) {
        /* broName = 'IE浏览器'; */
        let s = userAgent.match(/msie ([\d.]+)/)
        let res = 'IE ' + s[1]
        broName = res + res.replace(/[^0-9.]/ig, '')
    }
    // 360极速模式可以区分360安全浏览器和360极速浏览器
    if (userAgent.indexOf('WOW') !== -1 && userAgent.indexOf('NET') < 0 && userAgent.indexOf('Firefox') < 0) {
        if (navigator.javaEnabled()) {
            broName = '360安全浏览器-极速模式'
        } else {
            broName = '360极速浏览器-极速模式'
        }
    }
    // 360兼容
    if (userAgent.indexOf('WOW') !== -1 && userAgent.indexOf('NET') !== -1 && userAgent.indexOf('MSIE') !== -1 && userAgent.indexOf('rv') < 0) {
        broName = '360兼容模式'
    }
    // Chrome浏览器
    if (userAgent.match(/Chrome\/([\d.]+)/)) {
        /* broName = 'Chrome浏览器'; */
        strStart = userAgent.indexOf('Chrome')
        strStop = userAgent.indexOf('Safari')
        temp = userAgent.substring(strStart, strStop)
        broName = temp.split('/')
    }
    // safari
    if (userAgent.match(/Version\/([\d.]+).*Safari/)) {
        strStop = userAgent.indexOf('Safari')
        temp = userAgent.substring(strStop)
        broName = temp.split('/')
    }
    // opera
    if (userAgent.match(/Opera.([\d.]+)/)) {
        strStop = userAgent.indexOf('Opera')
        temp = userAgent.substring(strStop)
        broName = temp.split('/')
    }
    return broName
}

//--进入全屏
fullScreen() {
    var ele = document.getElementById("zb_video");
    var type = util.bro();
    if (type[0] == "Firefox") {
        ele.mozRequestFullScreen();
    } else {
        if (ele.requestFullscreen) {
            ele.requestFullscreen();
        } else if (ele.mozRequestFullScreen) {
            ele.mozRequestFullScreen();
        } else if (ele.webkitRequestFullScreen) {
            ele.webkitRequestFullScreen();
        }
    }
}

//--退出全屏
function exitFullscreen() {
    if (document.exitFullscreen) {
        document.exitFullscreen()
    } else if (document.msExitFullscreen) {
        document.msExitFullscreen()
    } else if (document.mozCancelFullScreen) {
        document.mozCancelFullScreen()
    } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen()
    }
}
```

### 14、判断某一元素是否滚动到底部

```js
// 是否滚动到底部
isScrollBottom() {
    let ranking_list = document.getElementById("ranking_list");
    // console.log(
    //   ranking_list.scrollHeight +
    //     "  " +
    //     ranking_list.scrollTop +
    //     " " +
    //     ranking_list.clientHeight
    // );
    // 判断有没有滚动到底部
    if (
        ranking_list.scrollHeight - ranking_list.scrollTop ==
        ranking_list.clientHeight
    ) {
        this.rankQueryParams.page = this.rankQueryParams.page + 1;
        if (this.rankQueryParams.page > this.totalPage) {
            this.$toast({
                message: "没有更多数据了!!!",
                position: "bottom",
            });
            this.rankQueryParams.page = this.totalPage;
            return false;
        }
        //--滚动到底部再次请求数据（拼接数据）
        this.agentRank(this.rankQueryParams, 2);
        // console.log(this.rankQueryParams.page);
    }
},
```

### 15、付款表单，金额输入问题

```js
watch:{
    money(val, old) {
        // console.log(typeof Number(val), "是数字");
        if (isNaN(Number(val))) {
            this.money = old;
            return;
        }
        //修复第一个字符是小数点的情况.
        if (val != "" && val.substr(0, 1) == ".") {
            this.money = "";
        }
        //解决 粘贴不生效
        this.money = val.replace(/^0*(0\.|[1-9])/, "$1"); 
        //清除“数字”和“.”以外的字符
        this.money = val.replace(/[^\d.]/g, "");
        //只保留第一个. 清除多余的
        this.money = val.replace(/\.{2,}/g, "."); 
        this.money = val.replace(".", "$#$").replace(/\./g, "").replace("$#$", ".");
        //只能输入两位小数
        this.money = val.replace(/^(\-)*(\d+)\.(\d\d).*$/, "$1$2.$3"); 
        if (val.indexOf(".") < 0 && val != "") {
            //以上已经过滤，此处控制的是如果没有小数点，首位不能为类似于 01、02的金额
            if (val.substr(0, 1) == "0" && val.length == 2) {
                this.money = val.substr(1, val.length);
            }
        }
    },
}
```

### 16、判断是不是Android、iOS、WeChat、PC

```js
// 点击下载
down() {
    let u = navigator.userAgent;
    // console.log(u);
    //-Android终端
    let isAndroid = u.indexOf("Android") > -1 || u.indexOf("Linux") > -1; //g
    //ios终端
    let isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); 
    // 判断是否在微信中打开的链接
    let ua = window.navigator.userAgent.toLowerCase();
    let iswx = ua.match(/MicroMessenger/i);
    if (isIOS) {
        window.location.href = "https://apps.apple.com/cn/app/id1532241721";
    } else if (isAndroid) {
        if (iswx == "micromessenger") {
            this.isWx = true;
        } else {
            window.location.href =
                "http://task.liuyanzb.com/download/liuyan_360.apk";
        }
    } else {
        window.location.href = "https://www.liuyanzb.com/";
    }
}
//-判断是不是PC
IsPC() {
    var userAgentInfo = navigator.userAgent;
    var Agents = ["Android", "iPhone", "SymbianOS", "Windows Phone", "iPod"];
    var flag = true;
    for (var v = 0; v < Agents.length; v++) {
        if (userAgentInfo.indexOf(Agents[v]) > 0) {
            flag = false;
            break;
        }
    }
    if (window.screen.width >= 768) {
        flag = true;
    }
    return flag;
}
//-判断是不是 mobile
isMobile ()  {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
}
```

```html
<div class="iswx" v-show="isWx" @click="isWx = false">
    <img src="@/assets/guide-arrows.png" alt="" />
    <div class="txt">
        点击右上角<br />
        选择在 <span class="b1">浏览器</span> 中打开
    </div>
</div>
```

```css
.iswx {
    position: fixed;
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    font-size: 16px;
    background-color: rgba(0, 0, 0, 0.5);
    width: 100%;
    height: 100vh;
    font-size: 24px;
    color: #ffffff;
    z-index: 999;
    img {
        width: 150px;
        height: 180px;
        position: absolute;
        right: 40px;
        top: 10px;
        // transform: translateX(-50%);
    }
    .b1 {
        font-weight: bold;
    }
    .txt {
        position: absolute;
        top: 180px;
        left: 50%;
        min-width: 250px;
        transform: translateX(-50%);
        margin-left: -30px;
        line-height: 45px;
        font-size: 40px;
    }
}
```



### 17、路由元信息

```js
// 1.只能在需要用户登录才能访问的路由上添加meta元信息，这样就可以区分哪些路由需要用户登录了！代码如下：
{
    path:'/me',
        component:Me,
            //在路由的头部添加元信息
            meta:{
                //requiresAuth是自定义的头部参数名称,
                //标识访问该路由时是否进行用户登录的检测
                requiresAuth:true
            }
}
// 2.接下来就可以通过全局前置守卫进行检测，代码如下：
router.beforeEach((to,from,next)=>{
    //console.log(to);
    //console.log(to.meta.requiresAuth);
    //检测目标路由信息是否包含requiresAuth的元信息
    //如果包含则代表需要进行用户登录状态的检测
    if(to.meta.requiresAuth){
        //检测用户是否登录了?
        if(store.state.author.isLogined == false || sessionStorage.getItem('isLogined') == false){
            //强行跳转到登录路由(附加目标路由信息作为URL地址栏的参数)
            if (confirm('未登录，是否要进行登陆！')) {
                // 从哪个页面跳转到的登陆页面，在登陆成功后就需要到回到当前的页面
                router.push('/login?redirect=' + to.fullPath)
            }
        } else {
            //访问用户期望访问的信息(如我的,也就是说访问那些用户已登录后才能访问的路由)
            next();
        }
    } else {
        //不需要用户登录即可访问的路由
        next();
    } 
});

//--login.vue
// 从哪个页面点击的登陆，或者跳转到登陆的页面
// 在登陆成功后，就从跳转当前的页面
if (this.$route.query.redirect) {
    this.$router.push(this.$route.query.redirect);
} else {
    // 直接在登陆页面的登陆，就要跳转到首页
    this.$router.push("/");
}
```

### 18、从url中获取参数信息

```js
export const getUrlKey = (name) => {
    return decodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(location.href) || [, ""])[1].replace(/\+/g, '%20')) || null
}
```

