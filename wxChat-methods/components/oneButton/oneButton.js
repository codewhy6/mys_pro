/*
 * @Description: 按钮组件
 * @fileName: oneButoton
 * @Author: fengyong
 * @Date: 2020-06-23 15:52:46
 * @LastEditors: fengyong
 * @LastEditTime: 2020-06-23 16:20:56
 */ 
// component/oneButton/oneButton.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    btnName:{
      type:String,
      value:""
    },//按钮名称
    btnColor:{
      type:String,
      value:"#00ae86"
    },//按钮颜色
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    /**
     * @Description: 向父组件传递数据
     * @Author: fengyong
     * @Date: 2020-06-23 15:55:31
     */
    handleClick() {
      var myEventDetail = {} // detail对象，提供给事件监听函数
      var myEventOption = {} // 触发事件的选项
      this.triggerEvent('oneButton', myEventDetail, myEventOption)
    }
  }
})