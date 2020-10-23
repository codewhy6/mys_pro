/*
 * @Description: 路由配置
 * @fileName: index.js
 * @Author: FengYong
 * @Date: 2020-04-13 13:32:53
 * @LastEditors: fengyong
 * @LastEditTime: 2020-04-13 18:27:08
 */
import Vue from 'vue'
import VueRouter from 'vue-router'
import template from '../views/template.vue'

Vue.use(VueRouter)

const routes = [{
    path: '/',
    name: 'template',
    component: template
  },
  // { 
  //   path:"定义组件地址"，
  //   name:"路由别名"
  //   component： () => import( /* webpackChunkName: "about" */ '../views/About.vue'),
  //   redirect："目标地址",
  //   meta:"定义自定义数据",
  //   children:"定义子路由"
  // }
]
const router = new VueRouter({
  // 激活路由样式配置
  // linkActiveClass: "class名称",
  // linkExactActiveClass: "class名称",
  // 路由模式切换
  // mode:"history|hash",默认为hash模式
  routes
})
router.beforeEach((to, from, next) => {
  if (to.matched.some(res => res.meta.isLogin)) { //判断是否需要登录
    if (sessionStorage['username']) {
      next();
    } else {
      next({
        path: "/login",
        query: {
          redirect: to.fullPath
        }
      });
    }

  } else {
    next()
  }
});

export default router