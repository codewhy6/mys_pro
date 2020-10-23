/*
 * @Description: 全局过滤器
 * @fileName: index.js
 * @Author: FengYong
 * @Date: 2020-04-13 14:36:36
 * @LastEditors: fengyong
 * @LastEditTime: 2020-04-13 14:38:19
 */
/**
 * @Description: 定义过滤器
 * @Author: fengyong
 * @Date: 2020-04-13 14:37:06
 */
const name = function (arg) {
    return arg;
}

export default {
    install(Vue) {
        Vue.filter("id", name);
    }
}