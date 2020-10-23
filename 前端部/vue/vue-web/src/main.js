/*
 * @Description: src目录代码引导文件,用于引导程序启动,环境构建,文件关联
 * @fileName: main.js
 * @Author: FengYong
 * @Date: 2020-04-13 13:32:53
 * @LastEditors: fengyong
 * @LastEditTime: 2020-04-13 17:54:14
 */

// 引入vue实例
import Vue from 'vue'
// 引入单文件组件
import App from './App.vue'
// 引入vue路由
import router from './router'
// 引入vuex中央状态管理
import store from './store'

// 取消 Vue 所有的日志与警告 , 取值类型：boolean 默认值：false
Vue.config.silent = true; 

//配置是否允许 vue-devtools 检查代码 , 取值类型：boolean
Vue.config.devtools = true

// 设置为 false 以阻止 vue 在启动时生成生产提示 , 取值类型：boolean 默认值：true
Vue.config.productionTip = false;

// http请求方法
import http from './utils'
Vue.use(http)

// 全局过滤器
import filters from './filters'
Vue.use(filters)

// 全局组件
import globalCompontents from './globalCompontents'
Vue.use(globalCompontents)

// 引入初始化css样式
import './css/base.css'

// 引入element-ui
import ElementUI from 'element-ui';
// 在main.js中引入的css文件全局共享
import 'element-ui/lib/theme-chalk/index.css';
// vue.use插件安装方法
Vue.use(ElementUI);


// 初始化实例
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
