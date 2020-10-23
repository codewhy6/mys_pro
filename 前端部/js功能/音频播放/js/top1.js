/*
 * @Description: 
 * @fileName: 
 * @Author: caochen
 * @Date: 2020-06-12 10:25:02
 * @LastEditors: caochen
 * @LastEditTime: 2020-06-12 12:38:12
 */ 
/**
 * @Description: 屏幕滑动一段 距离  顶部菜单固定
 * @Author: longhaiyan
 * @Date: 2020-06-08 15:18:25
 */
document.addEventListener('scroll', function(event) {
    var scrollDistance = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
    if (scrollDistance >= 230) { // 触发的位置
        $('.header_con_top').css({
            'position': 'fixed',
            'top':'0px',
            'left':'0px',
            'width':'100%',
            'background':'#fff',
            'box-shadow': '0px 1px 30px 0px rgba(68, 68, 68, 0.1)',
            'z-index':'60'
        })
    } else {
        $('.header_con_top').css({'position':'static'})
    }
});