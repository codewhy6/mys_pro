/*
 * @Description:公共的JS
 * @fileName: public.js
 * @Author: LiSuwan
 * @Date: 2019-11-04 09:21:35
 * @LastEditors: longhaiyan
 * @LastEditTime: 2020-09-21 14:27:55
 */
// https://wx28.cemni.com/wap/selectStoresByCityname/%E5%8D%97%E4%BA%AC.do
 //let baseeUrl ="http://192.168.1.104:8080/QnChristmas/"

 var baseeUrl ="http://192.168.1.158:9000/"
 /**
  * @Description: AJAX方法
  * @Author: LiSuwan
  * @Date: 2019-11-04 09:31:02
  * @param {url} ：接口路径
  * @param {data} ：参数
  * @param {callback} ：回调函数
  * @param {requireType} :请求方式
  */
 function http(url,callback,requireType ,data,loading){
     
    requireType = requireType || 'post';
    data = data || null;
    loading= loading || true
     if(loading == true){
         layer.open({
             type: 2,
             shadeClose:false,
             content: '加载中'
           });
     }
     
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
         },
         complete:function(){
             layer.closeAll()
         }
     })
     
 }