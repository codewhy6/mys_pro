/*
 * @Description: 项目环境配置
 * @fileName: vue.config.js
 * @Author: FengYong
 * @Date: 2020-04-13 14:06:36
 * @LastEditors: fengyong
 * @LastEditTime: 2020-07-04 15:47:47
 */
module.exports = {

  publicPath: "./",

  productionSourceMap: false,



  css: {
    sourceMap: true
  },
  devServer: {
    port: 8080, 
    proxy: {

      "/api": {
        target: "http://www.baidu.com",
    
        pathRewrite: {
          "^/api": ""
        },
        logLevel: "debug"
      }
    }
  },

  pluginOptions: {
    'style-resources-loader': {
      preProcessor: 'less', 
      patterns: [
        // 全局less变量
        // "./src/less/var.less"
      ]
    }
  }
}