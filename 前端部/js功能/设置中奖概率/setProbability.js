/*
 * @Description: 设置抽奖概率
 * @fileName: setProbability.js
 * @Author: LiSuwan
 * @Date: 2019-11-04 13:49:14
 * @LastEditors: Li Suwan
 * @LastEditTime: 2019-11-04 14:28:24
 */
$(function(){


    var prizes = [
        {
            imgName:"Idol_9.png", //中奖图片 20元优惠券
            prizeWeight:10//概率 必填
        },
        {
            imgName:"Idol_8.png", //中奖图片  50元优惠券
            prizeWeight:15//概率
        },
        {
            imgName:"Idol_7.png", //中奖图片  100元优惠券
            prizeWeight:20//概率
        },
        {
            imgName:"Idol_6.png", //中奖图片  200元优惠券
            prizeWeight:19.75//概率
        },
        {
            imgName:"Idol_5.png", //中奖图片 爱豆助力5票
            prizeWeight:15//概率
        },
        {
            imgName:"Idol_4.png", //中奖图片 爱豆助力20票
            prizeWeight:15.39//概率
        },
        {
            imgName:"Idol_3.png", //中奖图片 爱豆助力50票
            prizeWeight:4.75//概率
        },
        {
            imgName:"Idol_2.png", //中奖图片 明星见面会门票一张
            prizeWeight:0.1//概率
        },
        {
            imgName:"Idol_1.png", //中奖图片 1314元现金红包
            prizeWeight:0.01//概率
        }

    ]


    var index = startPrize(prizes);
        console.log("抽中奖品:"+prizes[index].imgName)
})



/**
 * @Description: 设置中奖概率
 * @Author: LiSuwan
 * @Date: 2019-11-04 14:19:35
 * @param {Array}  prizes:数组
 * @return: {Number} random:中奖商品（数组的索引值）
 */
function  startPrize(prizes) {
    var random = -1;
     var sumWeight = 0.0;

     for(var i =0;i<prizes.length;i++){
         sumWeight += prizes[i].prizeWeight;
     }

     //产生随机数
    var randomNumber;
    randomNumber = Math.random();

    var d1 = 0.0;
    var d2 = 0.0;
    for(var i=0;i<prizes.length;i++){
        d2 += prizes[i].prizeWeight/sumWeight;
        if(i==0){
            d1 = 0.0;
        }else{
            d1 +=prizes[i-1].prizeWeight/sumWeight;
        }
        if(randomNumber >= d1 && randomNumber <= d2){
            random = i;
            break;
        }
    }
    return random;
}