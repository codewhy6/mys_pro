/*
 * @Description: 配置rem 1rem = 100px
 * @fileName: resize.js
 * @Author: LiSuwan
 * @Date: 2020-01-09 17:54:03
 * @LastEditors: Li Suwan
 * @LastEditTime: 2020-06-03 09:33:17
 */


// function Reload() {
//     var deviceWidth = document.documentElement.clientWidth;
//     if(deviceWidth > 750) deviceWidth = 750;
//     document.documentElement.style.fontSize = deviceWidth / 7.5 + 'px';
// }

// Reload();

(function (win,doc){
    var resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize',
        html,
        htmlW,
        fontSize,
        rem,
        recalc = function(){
            html = doc.documentElement
            htmlW = html.clientWidth < 750 ? html.clientWidth : 750 //最大 1rem = 100px;
            fontSize = htmlW / 7.5  // 默认按照 IPhone 6 ,1rem = 50px;
            rem = doc.getElementById('rem') || null
            if (rem) {
                rem.parentNode.removeChild(rem)
            }
            /* 创建style标签并添加到Head标签里去 */
            if(doc.all){
                // IE写法
                win.style="html{font-size:" + fontSize + "px;}";
                win.style.id ='rem';
                doc.createStyleSheet("javascript:style");
            }else{
                // 其他标准浏览器写法
                var style = doc.createElement('style');
                style.id = 'rem';
                style.type = 'text/css';
                style.innerHTML="html{font-size:" + fontSize + "px;}";
                doc.getElementsByTagName('HEAD').item(0).appendChild(style);
            }
        }
     if (!doc.addEventListener){
         return;
     }
    win.addEventListener(resizeEvt, recalc, false);
    doc.addEventListener('DOMContentLoaded', recalc, false);
})(window, document)

























