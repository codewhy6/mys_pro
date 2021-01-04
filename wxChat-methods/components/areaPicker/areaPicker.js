// components/areaPicker/areaPicker.js
import areaList from './area'
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
    // 当前选中的值
    value: {
      type: String,
      value: '',
      observer: function (newVal, oldVal, changedPath) {
        // 属性被改变时执行的函数（可选），也可以写成在methods段中定义的方法名字符串
        // 通常 newVal 就是新设置的数据， oldVal 是旧数据
        // console.log(newVal,oldVal);
        // this.setData({
        //   flag:newVal
        // })
        // console.log(this.data.flag);
      }
    },
    // 选择器类型
    currentkey: {
      type: String,
      value: ''
    },
    // 省
    prov_id: {
      type: String,
      value: ''
    },
    // 市
    area_id: {
      type: String,
      value: ''
    },
    // 区
    district_id: {
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
    // 是否显示错误信息
    errorMsgFlag: {
      type: Boolean,
      value: false
    },
    // 是否显示错误模块
    errFlag: {
      type: Boolean,
      value: false
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    // 省市区数据
    areaList: areaList,
    targetData: {}, // 选择器选中的新的数据的对象，需要传递给父组件
    prov_id: '', //--省
    area_id: '', //--市
    district_id: '', //--区
    // 默认选中的省市区
    region: '320100',
    value1: '1',
    value2: '1',
  },

  /**
   * 组件的方法列表
   */
  methods: {
    // 打开区域选择器 区域的话好像一个页面只有一个
    openAreaPicker(e) {
      let {
        prov_id,
        area_id,
        district_id,
      } = e.currentTarget.dataset

      this.setData({
        prov_id: prov_id ? prov_id : '',
        area_id: area_id ? area_id : '',
        district_id: district_id ? district_id : '',
        pickerAreaVisible: true,
      })
    },
    // 关闭
    closeAreaPicker(e) {
      // console.log(this.data);
      this.setData({
        pickerAreaVisible: false,
        errorMsg: `请填写${this.data.title}！`,
        errorMsgFlag: true, //--第一次没有值，点击取消后显示错误提示信息
      })
      let targetData = this.data.targetData
      // console.log(currentkey); 有值之后第二次点击取消，不能显示错误信息
      if ((targetData[this.data.prov_id] && targetData[this.data.prov_id] != '') || (targetData[this.data.area_id] && targetData[this.data.area_id] != '') || (targetData.district_id && targetData.district_id != '')) {
        this.setData({
          errorMsgFlag: false
        })
      }
    },
    // 确定
    onSelectArea(e) {
      // console.log(this.data);
      // console.log(e, 'e.detail.values')
      // e.detail.values
      let targetData = this.data.targetData
      targetData[this.data.prov_id] = e.detail.values[0]
      targetData[this.data.area_id] = e.detail.values[1]
      targetData[this.data.district_id] = e.detail.values[2]

      // 点击确定，有值，不显示错误提示
      if (e.detail.value) {
        this.setData({
          errorMsg: '',
        })
      }
      // detail对象，提供给事件监听函数,将数据传送给父组件
      var myEventDetail = {
        targetData: targetData
      }
      // 触发事件的选项
      var myEventOption = {}
      // 使用 triggerEvent 方法触发自定义组件事件，指定事件名、detail对象和事件选项
      this.triggerEvent('onSelectArea', myEventDetail, myEventOption)
      // 选中一个值，就要关闭选择器
      this.setData({
        targetData: targetData,
        pickerAreaVisible: false,
        value: `${e.detail.values[0].name}/${e.detail.values[1].name}/${e.detail.values[2].name}`,
        value2: '0',
        errorMsgFlag: false

      })
      // console.log(this.data, "onSelectArea")
    },
  },
  lifetimes: {
    attached() {
      // wx.getLocation({
      //   type: 'wgs84',
      //   success (res) {
      //     console.log(res,'getLocation');
      //     const latitude = res.latitude
      //     const longitude = res.longitude
      //     const speed = res.speed
      //     const accuracy = res.accuracy
      //   }
      //  })
    }
  }
})