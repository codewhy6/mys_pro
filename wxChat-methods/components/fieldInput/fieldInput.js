// components/fieldInput/fieldInput.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    // 标题
    title: {
      type: String,
      value: ''
    },
    value:{
      type: String,
      value: ''
    },
    type:{
      type: String,
      value: 'text'
    },
    password:{
      type: Boolean,
      value: false
    },
    placeholder: {
      type: String,
      value: ''
    },
    currentkey: {
      type: String,
      value: ''
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    targetData: {}, // 选择器选中的新的数据的对象，需要传递给父组件

  },

  /**
   * 组件的方法列表
   */
  methods: {
    // 输入框中的双向绑定
    modelInput(e) {
      let targetData = this.data.targetData
      let {
        currentkey,
        currentconfig
      } = e.currentTarget.dataset
      if (currentconfig) {
        targetData[currentconfig][currentkey] = e.detail
      } else {
        targetData[currentkey] = e.detail
      }
      // detail对象，提供给事件监听函数,将数据传送给父组件
      var myEventDetail = {
        targetData: targetData
      }
      // 触发事件的选项
      var myEventOption = {}
      // 使用 triggerEvent 方法触发自定义组件事件，指定事件名、detail对象和事件选项
      this.triggerEvent('modelInput', myEventDetail, myEventOption)
      this.setData({
        targetData: targetData
      })
      // console.log(this.data, "data")
    },
  }
})