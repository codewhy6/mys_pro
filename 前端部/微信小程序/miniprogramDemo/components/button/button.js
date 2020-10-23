// components/button.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    
  },

  /**
   * 组件的初始数据
   */
  data: {
    btnName:"",
  },

  /**
   * 组件的方法列表
   */
  methods: {
    /**
   * @Description: 触发点击事件
   * @Author: LiSuwan
   * @Date: 2019-09-04 19:53:51
   */
    clickEvent(){
      this.triggerEvent('pullComment', {})
    }
  },
  properties:{
    btnName:{
      type:String,
      value:"确定",
    }
  }
})
