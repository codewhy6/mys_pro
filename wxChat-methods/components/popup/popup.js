// const { default: toast } = require("../../miniprogram_npm/@vant/weapp/toast/toast")
import Toast from '../../miniprogram_npm/@vant/weapp/toast/toast'

// components/popup/popup.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    // 选择器的数据源
    pickerList: {
      type: Object,
      value: {}
    },
    // 标题
    title: {
      type: String,
      value: ''
    },
    // 当前选中的值
    value: {
      type: String,
      value: ''
    },
    // 选择器类型
    pickertype: {
      type: String,
      value: ''
    },
    placeholder: {
      type: String,
      value: ''
    },
    // 选择器类型
    currentkey: {
      type: String,
      value: ''
    },
    // 是否是红心标记
    required: {
      type: Boolean,
      value: false
    },
    // 错误信息
    errorMsg: {
      type: String,
      value: ''
    },
    errorMsgFlag: {
      type: Boolean,
      value: false
    },
    errFlag: {
      type: Boolean,
      value: false
    },
    // 是否显示--禁用
    disabled: {
      type: Boolean,
      value: false
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    pickerVisible: false, //选择器的显示和隐藏
    currentconfig: '',
    pickertype: "", // 选择器的类型
    currentkey: '', // 当前选择的对象
    targetData: {}, // 选择器选中的新的数据的对象，需要传递给父组件
    value1: '1',
    value2: '1',
  },

  /**
   * 组件的方法列表
   */
  methods: {
    // 点击遮罩层，关闭弹窗
    onClosePopup(e) {
      this.setData({
        pickerVisible: false,
      })
      this.closePicker(e)
    },
    // 打开选择器 
    openPicker(e) {
      let {
        currentkey,
        currentconfig,
        pickertype
      } = e.currentTarget.dataset
      // console.log(e.currentTarget.dataset);
      this.setData({
        pickerVisible: true,
        currentkey: currentkey,
        currentconfig: currentconfig,
        pickertype: pickertype
      })
      // console.log(this.data.pickertype);
      // console.log(this.data.pickerList);
    },
    // 关闭选择器 
    closePicker(e) {
      // console.log(this.data);
      this.setData({
        pickerVisible: false,
        errorMsg: `请填写${this.data.title}！`,
        errorMsgFlag: true, //--第一次没有值，点击取消后显示错误提示信息
      })
      let targetData = this.data.targetData
      let currentkey = this.data.currentkey || e.currentTarget.dataset.currentkey
      // console.log(currentkey); 有值之后第二次点击取消，不能显示错误信息
      if (targetData[currentkey] && targetData[currentkey].value != '') {
        this.setData({
          errorMsgFlag: false
        })
      }
    },
    // 选择器确认
    onSelect(e) { //公司类型
      // console.log(e, 'e.detail');
      let targetData = this.data.targetData
      let currentkey = this.data.currentkey || e.currentTarget.dataset.currentkey
      let currentconfig = this.data.currentconfig || e.currentTarget.dataset.currentconfig
      if (currentconfig) {
        targetData[currentconfig][currentkey] = e.detail.value.value
      } else {
        targetData[currentkey] = e.detail.value
      }
      // 点击确定，有值，不显示错误提示
      if (e.detail.value) {
        this.setData({
          errorMsg: ''
        })
      }
      // detail对象，提供给事件监听函数,将数据传送给父组件
      var myEventDetail = {
        targetData: targetData
      }
      // 触发事件的选项
      var myEventOption = {}
      // 使用 triggerEvent 方法触发自定义组件事件，指定事件名、detail对象和事件选项
      this.triggerEvent('onPickerSelect', myEventDetail, myEventOption)
      // 选中一个值，就要关闭选择器
      this.setData({
        targetData: targetData,
        pickerVisible: false,
        // 选中的值
        value: e.detail.value.text,
        value2: '0',
        errorMsgFlag: false, //--点击确定不显示错误信息
      })
      // console.log(this.data, "onSelect")
    },
    noop() {},
  },
  lifetimes: {
    attached() {
      // console.log(this.data.pickerList[this.data.pickertype].data);
      if (!this.data.value || this.data.value.trim().length == 0 || this.data.value == '') {
        return
      } else {
        this.data.pickerList[this.data.pickertype].data.forEach(item => {
          if (item.value == this.data.value) {
            this.setData({
              value: item.text,
              value2: '0'
            })
          }
        });
      }
    },
  }
})