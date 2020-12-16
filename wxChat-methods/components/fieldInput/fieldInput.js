// components/fieldInput/fieldInput.js
import Toast from '../../miniprogram_npm/@vant/weapp/toast/toast'
import {checkTelphone,checkEmail,checkPassword,checkCode}from './utils'
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
    value: {
      type: String,
      value: ''
    },
    type: {
      type: String,
      value: 'text'
    },
    password: {
      type: Boolean,
      value: false
    },
    placeholder: {
      type: String,
      value: ''
    },
    required:{
      type: Boolean,
      value: false
    },
    currentkey: {
      type: String,
      value: ''
    },
    validatetype:{
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

    // 表单失去焦点，校验数据格式
    validateData(e) {
      let targetData = this.data.targetData
      let {
        validatetype,
        currentkey,
      } = e.currentTarget.dataset
      // console.log(validatetype,'validatetype');
      // console.log(targetData,'targetData');
      if (validatetype && validatetype=='email') {
        let email=targetData[currentkey]
        if (!email) {
          Toast("请输入您的邮箱！");
          return false;
        } else if (!checkEmail(email)) {
          Toast("邮箱格式不正确，请重新输入！");
          // 动态更新目标对应的数据
          this.setData({
            value: '',
          })
          return false;
        }
      }else if (validatetype && validatetype=='phone') {
        let phone=targetData[currentkey]
        if (!phone) {
          Toast("请输入您的手机号!");
          return false;
        } else if (!checkTelphone(phone)) {
          Toast("手机号格式不正确，请重新输入!");
          // 动态更新目标对应的数据
          this.setData({
            value: '',
          })
          return false;
        }
      }else if (validatetype && validatetype=='ID_no'){
        let ID_no=targetData[currentkey]
        if (!ID_no) {
          Toast("请输入您的身份证号码!");
          return false;
        } else if (!checkCode(ID_no)) {
          Toast("身份证号码不正确，重新输入!");
          // 动态更新目标对应的数据
          this.setData({
            value: '',
          })
          return false;
        }
      }
      // // detail对象，提供给事件监听函数,将数据传送给父组件
      // var myEventDetail = {
      //   targetData: targetData
      // }
      // this.triggerEvent('validateData', myEventDetail, {})
    },
  }
})