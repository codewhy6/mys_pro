// components/delDia/delDia.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    // 是否显示
    show: {
      type: Boolean,
      value: ""
    },
    // 标题
    title: {
      type: String,
      value: ''
    },
    // 副标题
    subTitle: {
      type: String,
      value: ""
    },
    // 左侧按钮文字
    leftBtnTxt: {
      type: String,
      value: ''
    },
    // 右侧按钮文字
    rightBtnTxt: {
      type: String,
      value: ''
    }

  },

  /**
   * 组件的初始数据
   */
  data: {
    show: false,
    title: '',
    subTitle: '',
    leftBtnTxt: '',
    rightBtnTxt: ''
  },

  /**
   * 组件的方法列表
   */
  methods: {
    // 点击隐藏
    onClickHide() {
      // this.setData({
      //   show: false
      // });
      var myEventDetail = {
        show:this.data.show
      } // detail对象，提供给事件监听函数
      this.triggerEvent("rightBtnEvent",myEventDetail)
    },
    // 确定事件
    onTapChild(e) {
      // console.log(e);
      var myEventDetail = {} // detail对象，提供给事件监听函数
      var myEventOption = {} // 触发事件的选项
      // 使用 triggerEvent 方法触发自定义组件事件，指定事件名、detail对象和事件选项
      this.triggerEvent('leftBtnEvent', myEventDetail)
    },

    noop() {},
  }
})