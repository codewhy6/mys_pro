/*
 * @Description: currentId
 * @fileName: 
 * @Author: LiSuwan
 * @Date: 2020-07-21 17:45:16
 * @LastEditors: Li Suwan
 * @LastEditTime: 2020-07-21 18:34:16
 */ 
//layui对象
var sliderRender;

//layui音量对象
var sliderRenderVoice;

//定时器对象
var timer;
//当前所选id
var currentId;

/**
 * 音频暂停
 * @param audio
 */
function audioStop(audio){
    clearInterval(timer);
    audio.pause();
}


/**
 * 音频开始
 * @param audio
 * @param source
 */
function audioStart(audio,source){
    var audiosrc=audio.src;
    var checkIndex=audiosrc.indexOf(source);
    if(checkIndex==-1){
        audio.src=source;
        clearInterval(timer);
    }
    audio.play();
    audio.volume=0.5;
}


/**
 * 音频状态，定时器监听并改变进度条
 * @param audio
 */
function audioState(audio){
    let time = 0;//默认时间
    clearInterval(timer);
    timer=setInterval(function() {
        time++;//时间自动加1；
        var allTime = audio.duration;
        var currentTime = audio.currentTime;
        allTime = parseFloat(allTime);
        currentTime = parseFloat(currentTime);
        var percent=allTime <= 0 ? "0" : (Math.round(currentTime / allTime * 10000) / 100.00);
        
        console.log(parseInt(percent))

        var minute = time / 60;
        var minutes = parseInt(minute);
        if (minutes < 10) {
            minutes = "0" + minutes;
        }
        //秒
        var second = time % 60;
        var seconds = Math.round(second);
        if (seconds < 10) {
            seconds = "0" + seconds;
        }   


        $("#"+currentId).parent().prev().text(minutes+":" + seconds);
        sliderRender.setValue(parseInt(percent));
    }, 1000);
}



//初始化进度条
function initSlient(audio){
    layui.use('slider', function(){
        var slider = layui.slider;
        //渲染进度
        
        sliderRender=slider.render({
            elem: "#" + currentId,
            theme:'#0099ff',
            tips:false,
            change: function (value) {
                console.log(currentId)
                var allTime = audio.duration;
                var currentTime = audio.currentTime;
                allTime = parseFloat(allTime);
                currentTime = parseFloat(currentTime);
                var percent=allTime <= 0 ? "0" : (Math.round(currentTime / allTime * 10000) / 100.00);
                if(parseInt(percent)!=value){
                    audio.currentTime=allTime*value*0.01;
                }
            }
        });


        // //渲染音量
        // sliderRenderVoice=slider.render({
        //     elem: '#sound_span_voice'+currentId,
        //     theme:'#8e90e0',
        //     type: 'vertical',
        //     height: 80,
        //     value: 50,
        //     tips:true,
        //     change: function (value) {
        //         audio.volume=parseFloat(value/100);
        //     }
        // });
    });
}