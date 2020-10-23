

/** 
 * @Description:http请求
 * @fileName: http.js
 * @Author: LiSuwan
 * @Date: 2019-11-04 09:21:35
 * @LastEditors: Li Suwan
 * @LastEditTime : 2020-02-14 17:52:26
 */

let baseeUrl = "http://javatest01.chemguan.com/"; //基础路径 这个需要修改
//let baseeUrl="http://192.168.1.158:9999"//龚
let imgStateUrl = baseeUrl + "projectimg/";//动态图片资源路径


/**
 * @Description: AJAX方法
 * @Author: LiSuwan
 * @Date: 2019-11-04 09:31:02
 * @param {url} ：接口路径
 * @param {data} ：参数
 * @param {callback} ：回调函数
 * @param {loading}: 是否显示加载中，默认值true
 * @param {requireType} :请求方式，默认值是post 请求
 */
function http(url, callback, requireType = 'post', data = null, loading = true) {

    if (loading == true) {
        layer.open({
            type: 2,
            shadeClose: false,
            content: '加载中'
        });
    }

    let rquestUrl = baseeUrl + url;

    let params = ""
    if (requireType == "post" && data !=null) {
        params = JSON.stringify(data)
    } else {
        params = data
    }


    $.ajax({
        type: requireType, //请求方式
        url: rquestUrl,//请求地址
        contentType: "application/json",
        data: params,
        success: function (result) { //请求成功
            callback(result)
        },
        error: function (e) {
            console.log(e.status);
            console.log(e.responseText);
        },
        complete: function () {
            layer.closeAll()
        }
    })

}


/**
 * @Description: 上传文件功能
 * @Author: LiSuwan
 * @Date: 2020-02-14 16:10:46
 * @param {Object} file:上传的文件
 * @param {function}  callback:函数方法
 */
function uploadFileXun(file,callback) {
    // file = $("#file").get(0).files[0]  备注用
    let uploadFileXunUrl = "club/column/api/mobile/uploadFileXun";
    var formData = new FormData();
    formData.append('file', file);
    
    $.ajax({
        url: baseeUrl + uploadFileXunUrl,
        data: formData,
        type: "post",
        async: false,
        cache: false,
        contentType: false,
        processData: false,
        success: function (data) {
            callback(data)
        }
    });

}