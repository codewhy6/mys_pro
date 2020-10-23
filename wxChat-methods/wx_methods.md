### 1、头像的cell

```html
<van-cell-group>
    <van-cell title="收款码收款-来自*子祥" value="+36.00" title-width="400rpx" size="large" label="2020.09.17  15:57" center="true"
              title-class="f28" label-class="f24" value-class="f36">
        <image slot="icon" class="custom-icon" src="https://qiniu.liuyanzb.com/20200515/5ebe120405755.jpg"></image>
    </van-cell>
</van-cell-group>

.custom-icon{
  width: 56rpx;
  height: 56rpx;
  border-radius: 50%;
  margin-right: 20rpx;
}

```

### 2、戴眼镜的的密码输入框

```html
<van-field value="{{ subAccountPwd }}" type="{{inputType?'password':''}}" placeholder="点击输入子账号密码" border="{{ false }}" bind:change="onChange" custom-style="box-shadow: 0px 0px 4px 0px rgba(0, 0, 0, 0.16);border-radius:8rpx"  use-button-slot>
    <van-icon slot="button" size="large" name="eye-o" bindtap="showPwd" custom-style="margin-top:10px;" wx:if="{{!inputType}}"/>
    <van-icon slot="button" size="large" name="closed-eye" custom-style="margin-top:10px;" bindtap="showPwd" wx:else/>
</van-field>
```

```js
// --点击显示和隐藏密码框类型
showPwd(){
    this.setData({
        inputType:!this.data.inputType
    })
},
```

### 3、手机号输入框

```vue
<van-field type="number" maxlength="11" bind:input="if(value.length>11)value=value.slice(0,11)" model:value="{{ bankPhone }}" placeholder="点击输入银行预留手机号" border="{{ false }}" size="large"
           custom-style="box-shadow: 0px 0px 4px 0px rgba(0, 0, 0, 0.16);border-radius:8rpx" input-class="round8" />
```

### 4、通栏的大按钮

```vue
<van-button color="#1478FC" block bind:click="login" custom-class="bigBtn ">同意协议并绑卡</van-button>
.bigBtn{
	font-size: 30rpx;
	font-weight: 700;
    border-radius:8rpx;
}
```

### 5、tabs新样式

```html
<van-tabs active="{{ active }}"  bind:change="onChange" color="#1478FC" custom-class="tabs_box" tab-class="new_tab_cls" tab-active-class="new_tab_cls_active" line-width="0rpx">
    <van-tab title="全部">内容 1</van-tab>
    <van-tab title="微信">内容 2</van-tab>
    <van-tab title="支付宝">内容 3</van-tab>
    <van-tab title="云闪付">内容 4</van-tab>
</van-tabs>
```

```css
.tabs_box{
    padding:20rpx !important;
    border: 0rpx !important;
}
.new_tab_cls {
    width: 104rpx !important;
    height: 72rpx !important;
    line-height: 72rpx !important;
    text-align: center;
    background: #f2f2f2 !important;
    border-radius: 8rpx !important;
    font-size: 28rpx;
    color: #333333;
    border: 0rpx !important;
}

.new_tab_cls+.new_tab_cls{
    margin-left: 20rpx !important; 
}

.new_tab_cls_active{
    background: #1478FC !important;
    color: #fff !important;
}
```

