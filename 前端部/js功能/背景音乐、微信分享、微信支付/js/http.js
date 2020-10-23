/*
 * @Description:公共的JS
 * @fileName: public.js
 * @Author: LiSuwan
 * @Date: 2019-11-04 09:21:35
 * @LastEditors  : Li Suwan
 * @LastEditTime : 2020-01-15 12:00:15
 */

let baseeUrl ="http://flag2020.uxbrand.cn/"
// let baseeUrl ="http://192.168.1.158:9000/"
    /**
     * @Description: AJAX方法
     * @Author: LiSuwan
     * @Date: 2019-11-04 09:31:02
     * @param {url} ：接口路径
     * @param {data} ：参数
     * @param {callback} ：回调函数
     * @param {requireType} :请求方式
     */
    function http(url,callback,requireType = 'post',data = null){
        
        $.ajax({
            //请求方式
            type : requireType,
            //请求地址
            url : baseeUrl + url,
            contentType:"application/x-www-form-urlencoded;charset=utf-8",
            data:data,
            //数据，json字符串
            
            //请求成功
            success : function(result) {
                callback(result)
                console.log(result);
            },
            //请求失败，包含具体的错误信息
            error : function(e){
                console.log(e.status);
                console.log(e.responseText);
            }
        })
        
    }