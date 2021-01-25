// components/areaPicker/areaPicker.js
import areaList from './area'
const QQMapWX = require('../../utils/qqmap-wx-jssdk')
import Toast from '../../miniprogram_npm/@vant/weapp/toast/toast'
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
    // 提示符
    placeholder: {
      type: String,
      value: ''
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
    // 是否显示错误模块
    errFlag: {
      type: Boolean,
      value: false
    },
    // 地址选择器的序号
    areaNo: {
      type: Number,
      value: 1
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
    region: '',
    value1: '1',
    value2: '1',
    qqmapsdk: '', //--腾讯地图第三方的sdk
  },

  /**
   * 组件的方法列表
   */
  methods: {
    // 点击遮罩层，关闭弹窗
    onCloseAreaPopup(e) {
      this.setData({
        pickerAreaVisible: false,
      })
      this.closeAreaPicker(e)
    },
    // 打开区域选择器 
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
        // errorMsgFlag: true, //--第一次没有值，点击取消后显示错误提示信息
      })
      let targetData = this.data.targetData
      // console.log(currentkey); 有值之后第二次点击取消，不能显示错误信息
      // if ((targetData.prov_id && targetData.prov_id != '') || (targetData.area_id && targetData.area_id != '') || (targetData.district_id && targetData.district_id != '')) {
      //   this.setData({
      //     errorMsgFlag: false
      //   })
      // }
      // 父组件传递不参数有值，错误信息为空
      if (this.data.prov_id != "" && this.data.area_id != "" && this.data.district_id != "") {
        this.setData({
          errorMsg: '',
        })
      }
    },
    // 确定
    onSelectArea(e) {
      // console.log(this.data);
      // console.log(e, 'e.detail.values')
      // e.detail.values
      let targetData = this.data.targetData

      if (this.data.areaNo == 1) {
        targetData.prov_id = e.detail.values[0]
        targetData.area_id = e.detail.values[1]
        targetData.district_id = e.detail.values[2]
      } else if (this.data.areaNo == 2) {
        targetData.prov_id2 = e.detail.values[0]
        targetData.area_id2 = e.detail.values[1]
        targetData.district_id2 = e.detail.values[2]
      }
      // 点击确定，有值，不显示错误提示
      if (e.detail.values[0] && e.detail.values[1] && e.detail.values[2]) {
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
        placeholder: `${e.detail.values[0].name}/${e.detail.values[1].name}/${e.detail.values[2].name}`,
        value2: '0',
        errorMsgFlag: false

      })
      // console.log(this.data, "onSelectArea")
    },
  },
  lifetimes: {
    attached() {
      // 实例化腾讯位置服务API核心类
      this.data.qqmapsdk = new QQMapWX({
        key: 'LKNBZ-TLVKU-6I5VT-B3PGY-WYCIO-FHBPX'
      });
      // wx.getLocation({
      //   type: 'wgs84',
      //   success(res) {
      //     console.log(res, 'getLocation');
      //     const latitude = res.latitude
      //     const longitude = res.longitude
      //     const speed = res.speed
      //     const accuracy = res.accuracy
      //   }
      // })
      // 父组件传递过来值，就默认选中
      if (this.data.prov_id != "" && this.data.area_id != "" && this.data.district_id != "") {
        this.setData({
          placeholder: `${this.data.areaList.province_list[this.data.prov_id]}/${
          this.data.areaList.city_list[this.data.area_id]
        }/${this.data.areaList.county_list[this.data.district_id]}`,
          value2: '0',
        })
      } 
    },
    ready() {
      if (!this.data.prov_id2) {
        Dialog.confirm({
          title: '提示',
          message: '创乐付需要获取您的地理位置！',
        })
        .then(() => {
          // on confirm
          let that = this
          // 获取当前的地理位置
          that.data.qqmapsdk.reverseGeocoder({
            success: function (res) {
              // console.log(res.result);
              if (res.status == 0) {
                // Toast(res.result.address)
                that.setData({
                  region: res.result.ad_info.adcode
                })
              }

            }
          });
        })
        .catch(() => {
          // on cancel
        });
      }
      // that.data.qqmapsdk.getCityList({
      //   success: function (res) {
      //     if (res.status == 0) {
      //       let areaListData = {}
      //       // 省
      //       let province_list = {}
      //       res.result[0].map((item) => {
      //         province_list[item.id] = item.fullname
      //       })
      //       // 市
      //       let city_list = {}
      //       res.result[1].map((item) => {
      //         city_list[item.id] = item.fullname
      //       })
      //       // 区
      //       let county_list = {}
      //       res.result[2].map((item) => {
      //         county_list[item.id] = item.fullname
      //       })
      //       areaListData.province_list = province_list
      //       areaListData.city_list = city_list
      //       areaListData.county_list = county_list

      //       that.setData({
      //         areaList: areaListData
      //       })
      //       // console.log(res);
      //       // console.log('省份数据：', res.result[0]); //打印省份数据
      //       // console.log('城市数据：', res.result[1]); //打印城市数据
      //       // console.log('区县数据：', res.result[2]); //打印区县数据
      //     }
      //   }
      // })
    },
  }
})