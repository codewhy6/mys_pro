/**
 * Created by Administrator on 2016/10/12 0012.
 */




//返回顶部
$(".toTop").hide();
$(window).scroll(function(){
    var scrollTop=$(window).scrollTop();
    if(scrollTop>0){
        $(".toTop").fadeIn(500);
    }
    else{
        $(".toTop").fadeOut(500);
    }
});
$(".toTop").find("a").click(function(){
    $("html,body").animate({"scrollTop":0},500);
});