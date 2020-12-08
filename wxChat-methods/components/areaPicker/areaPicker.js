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
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    // 省市区数据
    areaList: areaList,
    targetData: {}, // 选择器选中的新的数据的对象，需要传递给父组件
    // 默认选中的省市区
    region: '320100',
    value1:'1',
    value2:'1',
  },

  /**
   * 组件的方法列表
   */
  methods: {
    // 打开区域选择器 区域的话好像一个页面只有一个
    openAreaPicker() {
      this.setData({
        pickerAreaVisible: true,
      })
    },
    // 关闭
    closeAreaPicker() {
      this.setData({
        pickerAreaVisible: false,
      })
    },
    // 确定
    onSelectArea(e) {
      // console.log(e, 'e.detail.values')
      // e.detail.values
      let targetData = this.data.targetData
      targetData.prov_id = e.detail.values[0]
      targetData.area_id = e.detail.values[1]
      targetData.district_id = e.detail.values[2]
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
        value:`${e.detail.values[0].name}/${e.detail.values[1].name}/${e.detail.values[2].name}`,
        value2:'0'
      })
      // console.log(this.data, "onSelectArea")
    },
  },
  lifetimes:{
    attached(){
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