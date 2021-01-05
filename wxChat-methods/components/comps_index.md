```js
//index.js
//获取应用实例
const app = getApp()
import {
    Picker
} from '../../utils/picker'
import {
    checkTelphone,
    checkEmail,
    checkPassword,
    checkCode
} from '../../utils/util'

import Toast from '../../miniprogram_npm/@vant/weapp/toast/toast'
Page({
    data: {
        delDiaShow: false,
        // 选择器的数据源
        pickerList: Picker,
        // 需要选择器操作的数据对象
        company: {
            name: '',
            email: 'asas',
            phone: '15156985314',
            ID_no: '',
            card_type: '', //卡类型
            card_no: '',
            idNoLx: '', //省份证
            Yxq: '', //有效期类型
            type_begin_date: "", //法人证件有效期开始日期
            type_end_date: "", //法人证件有效期截止日期
            prov_id: "", //省
            area_id: "", // 市
            district_id: "", //区
            prov_id2: "", //省
            area_id2: "", // 市
            district_id2: "", //区
        },
    },

    // 表单文本输入
    modelInput(e) {
        // 自定义组件触发事件时提供的detail对象，用来获取子组件传递来的数据
        var targetVal = e.detail.targetData;
        // console.log('子组件传递来的数据 targetVal:', targetVal); //--card_type: {name: "145454"}
        // 动态更新目标对应的数据
        let str = `company.${Object.keys(targetVal)}`
        this.setData({
            [str]: targetVal[Object.keys(targetVal)],
        })
    },
    // 普通选择器
    onSelect(e) {
        // console.log(e);
        // 自定义组件触发事件时提供的detail对象，用来获取子组件传递来的数据
        var targetVal = e.detail.targetData;
        // console.log('子组件传递来的数据 targetVal:', targetVal); //--card_type: {text: "对公", value: "0"}
        // 动态更新目标对应的数据
        let str = `company.${Object.keys(targetVal)}`
        this.setData({
            [str]: targetVal[Object.keys(targetVal)].value,
        })
    },

    // 时间选择器
    onDatePickerSelected(e) {
        var targetVal = e.detail.targetData;
        // console.log('子组件传递来的数据 targetVal:', targetVal); //--{targetData: {type_begin_date: "2020-12-05"}}
        let str = `company.${Object.keys(targetVal)}`
        this.setData({
            [str]: targetVal[Object.keys(targetVal)],
        })
    },

    // 省市区选择器
    onSelectAreaed(e) {
        var targetVal = e.detail.targetData;
        // console.log('子组件传递来的数据 targetVal:', targetVal);
        /*
      {
        area_id: {code: "140400", name: "长治市"}
        district_id: {code: "140423", name: "襄垣县"}
        prov_id: {code: "140000", name: "山西省"}
      }
    */
        // console.log(Object.keys(targetVal)); //--["prov_id", "area_id", "district_id"]
        Object.keys(targetVal).forEach((item) => {
            let str = `company.${item}`
            this.setData({
                [str]: targetVal[item].code,
            })
        })
    },

    // 点击下一步
    nextBtn(e) {
        // 非空验证，并提示错误信息
        for (const key in this.data.company) {
            if (!this.data.company[key] || this.data.company[key].trim().length == 0 || this.data.company[key] == '') {
                // console.log(key);
                if (this.selectComponent(`#${key}`) && this.selectComponent(`#${key}`).validateData) {
                    this.selectComponent(`#${key}`).validateData(e)
                } else if (this.selectComponent(`#${key}`) && this.selectComponent(`#${key}`).closePicker) {
                    this.selectComponent(`#${key}`).closePicker(e)
                } else if (this.selectComponent(`#${key}`) && this.selectComponent(`#${key}`).closeDatePicker) {
                    this.selectComponent(`#${key}`) && this.selectComponent(`#${key}`).closeDatePicker(e)
                } else if (this.selectComponent(`#${key}`) && this.selectComponent(`#${key}`).closeAreaPicker) {
                    this.selectComponent(`#${key}`) && this.selectComponent(`#${key}`).closeAreaPicker(e)
                }
            }
        }
        // 格式校验
        for (const key in this.data.company) {
            if (!this.data.company[key] || this.data.company[key].trim().length == 0 || this.data.company[key] == '') {
                Toast({
                    message:'必填参数缺失，请仔细检查！',
                    duration:3500
                })
                return false
            } else if (this.data.company[key] != '' && key == 'email') {
                if (!checkEmail(this.data.company[key])) {
                    Toast('邮箱格式不正确，请重新输入！')
                    this.setData({
                        errorMsg: '邮箱格式不正确，请重新输入！'
                    })
                    return false
                }
            } else if (this.data.company[key] != '' && key == 'phone') {
                if (!checkTelphone(this.data.company[key])) {
                    Toast('手机号格式不正确，请重新输入!')
                    this.setData({
                        errorMsg2: '手机号格式不正确，请重新输入!'
                    })
                    return false
                }
            } else if (this.data.company[key] != '' && key == 'ID_no') {
                if (!checkCode(this.data.company[key])) {
                    Toast('身份证号码不正确，重新输入!')
                    this.setData({
                        errorMsg3: '身份证号码不正确，重新输入!'
                    })
                    return false
                }
            }
        }

        // 调用相应的接口，实现功能
        setTimeout(() => {
            Toast('success')
        }, 2000)
    },

   
    delBtn() {
        this.setData({
            delDiaShow: true,
        })
    },




    onLoad: function () {

    },

})
```

