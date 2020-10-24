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

### 2、时间过滤器 

```js
Vue.filter('dateFormat', function (originTime) {
    let newTime = new Date(originTime);
    let y = newTime.getFullYear()
    let m = (newTime.getMonth() + 1 + '').padStart(2, '0')
    let d = (newTime.getDate() + '').padStart(2, '0')
    let hh = (newTime.getHours() + '').padStart(2, '0')
    let mm = (newTime.getMinutes() + '').padStart(2, '0')
    let ss = (newTime.getSeconds() + '').padStart(2, '0')
    return `${y}-${m}-${d} ${hh}:${mm}:${ss}`
})

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
...mapState(["hotLive", "jackpotList", "jackpotTime", "jackpotAn"]),

```

### 9、千分符

```js

```

