// JavaScript Document


function Reload() {
    var deviceWidth = document.documentElement.clientWidth;
    if(deviceWidth > 750) deviceWidth = 750;
    document.documentElement.style.fontSize = deviceWidth / 7.5 + 'px';

    $("img").each(function () {
        var imgbl = $(this).attr("data");
        if (imgbl != "" || imgbl != null) {
            var imgwh = $(this).parent().width();
            //$(this).height($(this).width() * imgbl);
            $(this).parent().height(imgwh * imgbl);
        }
    });
}

$(window).resize(function () {
    Reload();
});
$(function () {
    Reload();
    document.body.addEventListener('touchstart', function () { }); 
    $(window).scroll(function(){
        var scrollTop=$(window).scrollTop();
        if(scrollTop>0){
            $(".toTop").fadeIn(500);
        }
        else{
            $(".toTop").fadeOut(500);
        }
    });
});
//���ض���
function BackTop(){
    $("html,body").animate({"scrollTop":0},500);
}

$('.li3').click(function(){
	$('.pop').fadeIn();
})
$('.pop .close').click(function(){
	$('.pop').fadeOut();
})























