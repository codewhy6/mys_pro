## vue.config.js配置

### 1、标准版（无需安装依赖）

```js
// vue.config.js
/* 
	vue-cli3 代码优化：uglifyjs-webpack-plugin
	步骤：
	1、npm install uglifyjs-webpack-plugin --save-dev
	2、const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

	vue-cli3 代码优化：terser-webpack-plugin（想在项目打包时去除console.log语句及debugger等。）
	步骤：
	1、npm install terser-webpack-plugin --save-dev
	2、const TerserPlugin = require("terser-webpack-plugin");
	3、使用
	configureWebpack:{
        optimization: {
            minimizer: [
              new TerserPlugin({
                terserOptions:{
                  compress:{
                    warnings: false,
                    drop_console: true,
                    drop_debugger: true,
                    pure_funcs: ["console.log"]
                  }
                }
              })
            ],
          },
    }
*/
const path = require("path");
const IS_PROD = ["production", "prod"].includes(process.env.NODE_ENV);
const resolve = (dir) => path.join(__dirname, dir);
module.exports = {
    publicPath: process.env.NODE_ENV === "production" ? "./" : "/",
    //publicPath: process.env.NODE_ENV === 'production' ? '/site/vue-demo/' : '/',  // 公共路径
    // 相对于打包路径index.html的路径
    indexPath: "index.html",
    // 'dist', 生产环境构建文件的目录
    outputDir: process.env.outputDir || "dist",
    // 相对于outputDir的静态资源(js、css、img、fonts)目录
    assetsDir: "static",
    // 构建多页时使用
    pages: undefined,
    // eslint-loader是否在保存的时候检查
    lintOnSave: false,
    // 是否使用包含运行时编译器的 Vue 构建版本
    runtimeCompiler: true,
    // 如果不需要生产环境的 source map，可以将其设置为 false 以加速生产环境构建。
    productionSourceMap: !IS_PROD,
    // 默认情况下 babel-loader 会忽略所有 node_modules 中的文件。如果你想要通过 Babel 显式转译一个依赖，可以在这个选项中列出来	
    transpileDependencies: [],
    // 是否为 Babel 或 TypeScript 使用 thread-loader。该选项在系统的 CPU 有多于一个内核时自动启用，仅作用于生产构建。
    parallel: require("os").cpus().length > 1,
    // 向 PWA 插件传递选项。
    pwa: {},

    // --服务器相关配置
    devServer: {
        overlay: {
            // 让浏览器 overlay 同时显示警告和错误
            warnings: true,
            errors: true,
        },
        host: "localhost",
        port: 8080, // 端口号
        https: false, // https:{type:Boolean}
        open: false, //配置自动启动浏览器
        hotOnly: true, // 热更新
        // proxy: 'http://localhost:8080'   // 配置跨域处理,只有一个代理
        proxy: {
            //配置多个跨域
            "/api": {
                target: "http://172.11.11.11:7071",
                //允许跨域
                changeOrigin: true,
                ws: true,// 是否启用websockets
                secure: false,
                pathRewrite: {
                    "^/api": "/",
                },
            },
        },
    },
    // 对内部的 webpack 配置（比如修改、增加Loader选项）(链式操作)
    chainWebpack: (config) => {
        // 修复热更新失效
        config.resolve.symlinks(true);
        // 如果使用多页面打包，使用vue inspect --plugins查看html是否在结果数组中
        config.plugin("html").tap((args) => {
            // 修复 Lazy loading routes Error
            args[0].chunksSortMode = "none";
            return args;
        });
        // 添加别名
        config.resolve.alias
            .set("@", resolve("src"))
            .set("@assets", resolve("src/assets"))
            .set("@components", resolve("src/components"))
            .set("@views", resolve("src/views"))
            .set("@store", resolve("src/store"));
    },
    // 如果这个值是一个对象，则会通过 webpack-merge 合并到最终的配置中。如果这个值是一个函数，则会接收被解析的配置作为参数。该函数及可以修改配置并不返回任何东西，也可以返回一个被克隆或合并过的配置版本。
    configureWebpack: (config) => {
        if (process.env.NODE_ENV === "production") {
            // 为生产环境修改配置
            config.plugins.push(
                // new UglifyJsPlugin({
                //     uglifyOptions: {
                //         compress: {
                //             drop_debugger: true,
                //             //生产环境自动删除console
                //             drop_console: true,
                //         },
                //         warnings: false,
                //     },
                //     sourceMap: false,
                //     //使用多进程并行运行来提高构建速度。默认并发运行数：os.cpus().length - 1。
                //     parallel: true,
                // })
                //去掉打包之后的打印
                new TerserPlugin({
                    terserOptions: {
                        ecma: undefined,
                        warnings: false,
                        parse: {},
                        compress: {
                            drop_console: true,
                            drop_debugger: false,
                            pure_funcs: ["console.log"], // 移除console
                        },
                    },
                })
            );
        }else{
            // 为开发环境修改配置...
        }
    },
    // css相关配置
    css: {
        // 将组件内的 CSS 提取到一个单独的 CSS 文件 (只用在生产环境中)
        // 也可以是一个传递给 `extract-text-webpack-plugin` 的选项对象
        extract: IS_PROD,
        // 是否开启 CSS source map？
        sourceMap: false,
        // 去掉文件名中的 .module
        requireModuleExtension: false,
        loaderOptions: {
            // 给 less-loader 传递 Less.js 相关选项
            less: {
                // `globalVars` 定义全局对象，可加入全局变量
                globalVars: {
                    primary: "#333",
                },
            },
        },
    },
    // 第三方插件配置
    pluginOptions: {
        // ...
    },
};

```



### 2、设置生产环境/开发环境

```js
// 通过不同命令行切换不同环境api等信息，
/* 
例如： 
	npm run dev 调用本地环境api
	npm run test 调用测试环境api
	npm run build 调用线上环境api
*/

//（1）先在package.json文件中添加：
"test": "vue-cli-service build --mode test", //打包测试环境
"publish": "vue-cli-service build && vue-cli-service build --mode test", //测试和生产一起打包

// (2) 在项目目录下建立 .env.production文件和.env.development文件
// .env.production文件
NODE_ENV = 'production'
VUE_APP_MODE = 'production'
VUE_APP_BASE_API = 'http://xxx.xxx.xxx.xx:8008/api/'
// .env.development
NODE_ENV = 'development'  
VUE_APP_MODE = 'development'  
VUE_APP_BASE_API = 'http://192.****:8008/api/' 
// .env.test
NODE_ENV = 'production'
VUE_APP_MODE = 'test'
VUE_APP_BASE_API = 'http://xxx.xxx.xxx.xx:8008/api/'
outputDir = test
// (3) 在vue.config.js文件中添加：
outputDir: process.env.outputDir

// (4) 在main.js文件中配置api变量 / 或者是 http.js中
import axios from 'axios'
axios.defaults.baseURL = process.env.VUE_APP_BASE_API;
if(process.env.VUE_APP_MODE==='development'){
    //开发环境下的执行操作
}else if(process.env.VUE_APP_MODE==='test'){
    //测试环境下的执行操作
}else{
    //生产环境下的执行操作
}

/*第一层if判断生产环境和开发环境*/
if (process.env.NODE_ENV === 'production') {
    /*第二层if，根据.env文件中的VUE_APP_FLAG判断是生产环境还是测试环境*/
    if (process.env.VUE_APP_FLAG === 'pro') {
        //production 生产环境
        axios.defaults.baseURL = 'http://api.xinggeyun.com';

    } else {
        //test 测试环境
        axios.defaults.baseURL = 'http://192.168.0.152:8102';

    }
} else {
    //dev 开发环境
    axios.defaults.baseURL = 'http://192.168.0.152:8102';
}
```

