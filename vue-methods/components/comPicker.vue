<!--
 * @Description: 
 * @Author: ZhangChen
 * @Date: 2021-01-11 15:28:01
 * @LastEditors: ZhangChen
 * @LastEditTime: 2021-01-18 10:50:09
 * @FilePath: \testpro\src\components\comPicker.vue
-->
<template>
  <div class="comPicker">
    <van-cell
      :title="title"
      title-style="flex: 0 1 30%;margin-right: 12px;"
      :is-link="!disabled"
      :value="!value3 ? placeholder : value3"
      :value-class="value1 == value2 ? 'valCls' : 'valCls2'"
      :required="required"
      :border="true"
      @click="openPicker"
      use-label-slot
    >
      <template v-if="errFlag">
        <div slot="label" class="labelCls" v-if="errorMsgFlag">
          <span>{{ errorMsg }}</span>
        </div>
      </template>
    </van-cell>
    <!-- 选择器 -->
    <van-popup
      v-model="pickerVisible"
      position="bottom"
      round
      @close="onClosePopup"
    >
      <van-picker
        :columns="pickerList[pickertype].data"
        active-class="activeCls"
        @confirm="onSelect"
        @cancel="closePicker"
        show-toolbar
        :title="pickerList[pickertype].title"
        value-key="text"
      />
    </van-popup>
  </div>
</template>
<script>
export default {
  props: {
    // 选择器的数据源
    pickerList: {
      type: Object,
      default: {},
    },

    // 标题
    title: {
      type: String,
      default: "",
    },
    // 提示占位符
    value: {
      type: String,
      default: "",
    },
    // 选择器类型
    pickertype: {
      type: String,
      default: "",
    },
    // 选择器类型
    currentkey: {
      type: String,
      default: "",
    },
    // 是否是红心标记
    required: {
      type: Boolean,
      default: false,
    },
    errFlag: {
      type: Boolean,
      default: false,
    },
    // 是否显示--禁用
    disabled: {
      type: Boolean,
      default: false,
    },
    placeholder: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      value3: this.value, //--当前选中的值
      errorMsg: "", //--错误信息
      pickerVisible: false, //选择器的显示和隐藏
      errorMsgFlag: false, //--错误信息
      targetData: {}, // 选择器选中的新的数据的对象，需要传递给父组件
      value1: "1",
      value2: "1",
      dftIndex: "",
    };
  },
  watch: {},
  computed: {},
  methods: {
    // 点击遮罩层，关闭弹窗
    onClosePopup(e) {
      this.pickerVisible = false;
      this.closePicker(e);
    },
    // 打开选择器
    openPicker(e) {
      if (this.disabled) return;
      this.pickerVisible = true;
    },
    // 关闭选择器
    closePicker(e) {
      // console.log(this.data);
      this.pickerVisible = false;
      this.errorMsg = `请填写${this.title}！`;
      this.errorMsgFlag = true; //--第一次没有值，点击取消后显示错误提示信息

      let targetData = this.targetData;
      let currentkey = this.currentkey;
      let currentconfig = this.currentconfig;
      // console.log(currentkey); 有值之后第二次点击取消，不能显示错误信息
      if (targetData[currentkey] && targetData[currentkey].value != "") {
        this.errorMsgFlag = false; //--第一次没有值，点击取消后显示错误提示信息
      }
      if (this.value != "" && this.value.trim().length != 0) {
        this.errorMsg = "";
      }
    },
    // 选择器确认
    onSelect(value, index) {
      //公司类型
      let targetData = this.targetData;
      let currentkey = this.currentkey;
      let currentconfig = this.currentconfig;
      if (currentconfig) {
        targetData[currentconfig][currentkey] = value.value;
      } else {
        targetData[currentkey] = value.value;
      }
      // 点击确定，有值，不显示错误提示
      if (value.value) {
        this.errorMsg = "";
      }
      // detail对象，提供给事件监听函数,将数据传送给父组件
      var myEventDetail = {
        targetData: targetData,
      };
      // 使用 emit 方法触发自定义组件事件，指定事件名、detail对象和事件选项
      this.$emit("onPickerSelect", myEventDetail);
      // 选中一个值，就要关闭选择器
      this.targetData = targetData;
      this.pickerVisible = false;
      this.value3 = value.text;
      this.errorMsgFlag = false;
      this.value2 = "0";
      // console.log(this.targetData, "targetData");
    },
  },
  created() {
    // 如果选择器禁用，显示的文字为深色
    if (this.disabled) {
      this.value2 = "0";
    }
    // 父组件传递过来值，就默认选中
    if (this.value != "" && this.value.trim().length != 0) {
      let currentkey = this.currentkey;
      // console.log(this.pickerList[currentkey].data);
      this.pickerList[currentkey].data.forEach((element) => {
        if (this.value == element.value) {
          this.value3 = element.text;
          this.value2 = "0";
        }
      });
    }
  },
  mounted() {},
};
</script>
<style lang="less" scoped>
/* 右侧显示内容的样式 */
.valCls {
  text-align: left !important;
  color: #c8c9cc !important;
}
.valCls2 {
  text-align: left !important;
  color: #333 !important;
}

.activeCls {
  color: rgb(16, 68, 212);
}

/* 描述信息的样式 */
.labelCls {
  width: 130%;
  color: #ee0a24;
  margin-left: 112%;
}
</style>
