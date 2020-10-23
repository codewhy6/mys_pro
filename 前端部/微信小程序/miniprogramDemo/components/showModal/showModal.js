// components/showModal.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    show: { // 属性名
      type: Boolean,      
    },
    message:{
      type:String
    }

  },

  /**
   * 组件的初始数据
   */
  data: {
    show:false
  },

  /**
   * 组件的方法列表
   */
  methods: {
    closeModal(){
      this.triggerEvent('myevent', { color:"#333" });
      this.setData({
        show:false
      })
    },
  }
})
