/*
 * @Description: axios发送请求
 * @fileName: index.js
 * @Author: FengYong
 * @Date: 2020-04-13 14:19:08
 * @LastEditors: fengyong
 * @LastEditTime: 2020-04-13 18:10:43
 */

// 引入axios
import axios from 'axios';
// 引入QS
import QS from 'qs';
// 引入store
import store from '@/store/index';



// 环境的切换
if (process.env.NODE_ENV == 'development') {
  axios.defaults.baseURL = '/api';
} else if (process.env.NODE_ENV == 'debug') {
  axios.defaults.baseURL = '';
} else if (process.env.NODE_ENV == 'production') {
  axios.defaults.baseURL = '';
}

// 请求超时
axios.defaults.timeout = 10000;

// 请求头
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';


// 请求拦截器
axios.interceptors.request.use(
  config => {
    // 每次发送请求之前判断vuex中是否存在token 
    const token = store.state.token;
    token && (config.headers.Authorization = token);
    return config;
  },
  error => {
    return Promise.error(error);
  })

// 响应拦截器
axios.interceptors.response.use(
  response => {
    // 如果返回的状态码为200，说明接口请求成功，可以正常拿到数据 否则的话抛出错误
    if (response.status === 200) {
      return Promise.resolve(response);
    } else {
      return Promise.reject(response);
    }
  },
  // 服务器状态码不是200
  error => {
    if (error.response.status) {
      return Promise.reject(error.response);
    }
  }
)

/**
 * get方法，对应get请求
 * @param {String} url [请求的url地址]
 * @param {Object} params [请求时携带的参数]
 */
function get(url, params) {
  return new Promise((resolve, reject) => {
    axios.get(url, {
      params: params
    }).then(res => {
      resolve(res.data);
    }).catch(err => {
      reject(err.data)
    })
  });
}
/** 
 * post方法，对应post请求 
 * @param {String} url [请求的url地址] 
 * @param {Object} params [请求时携带的参数] 
 */
function post(url, params) {
  return new Promise((resolve, reject) => {
    axios.post(url, QS.stringify(params))
      .then(res => {
        resolve(res.data);
      })
      .catch(err => {
        reject(err.data)
      })
  });
}
export default {
  install(Vue) {
    Vue.prototype.$api = {
      get,
      post
    }
  }
}