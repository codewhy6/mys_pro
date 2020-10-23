/*
 * @Description: 配置rem 1rem = 100px
 * @fileName: resize.js
 * @Author: LiSuwan
 * @Date: 2020-01-09 17:54:03
 * @LastEditors  : Li Suwan
 * @LastEditTime : 2020-01-09 17:55:40
 */


function Reload() {
    var deviceWidth = document.documentElement.clientWidth;
    if(deviceWidth > 750) deviceWidth = 750;
    document.documentElement.style.fontSize = deviceWidth / 7.5 + 'px';
}

Reload();
























