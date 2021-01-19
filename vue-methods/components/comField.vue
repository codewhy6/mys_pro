<!--
 * @Description: 移动端表单输入框组件
 * @Author: ZhangChen
 * @Date: 2021-01-11 11:08:15
 * @LastEditors: ZhangChen
 * @LastEditTime: 2021-01-13 15:53:43
 * @FilePath: \testpro\src\components\comField.vue
-->
<template>
  <div class="comField">
    <van-field
      :label="title"
      label-width="30%"
      v-model="value2"
      :type="type"
      :password="password"
      :required="required"
      :placeholder="placeholder"
      placeholder-style="color:#969799;"
      :error-message="errorMsg"
      :border="true"
      @input="modelInput"
      @blur="validateData"
    />
  </div>
</template>
<script>
// import Field from "vant/lib/field";
export default {
  props: {
    // 标题
    title: {
      type: String,
      default: "",
    },
    value: {
      type: String,
      default: "",
    },
    type: {
      type: String,
      default: "text",
    },
    password: {
      type: Boolean,
      default: false,
    },
    placeholder: {
      type: String,
      default: "",
    },
    required: {
      type: Boolean,
      default: false,
    },
    currentkey: {
      type: String,
      default: "",
    },
    validatetype: {
      type: String,
      default: "",
    },
    // errorMsg: {
    //   type: String,
    //   default: "",
    // },
    maxlength: {
      type: Number,
      default: -1,
    },
  },
  data() {
    return {
      targetData: {}, // 选择器选中的新的数据的对象，需要传递给父组件
      value2: this.value, //-输入框的值
      errorMsg: "", //--错误提示信息
    };
  },
  computed: {},
  methods: {
    // 输入框中的双向绑定
    modelInput(value) {
      let targetData = this.targetData;
      let currentkey = this.currentkey;
      let currentconfig = this.currentconfig;
      if (currentconfig) {
        targetData[currentconfig][currentkey] = value;
      } else {
        if (currentkey == "card_no") {
          targetData[currentkey] = value
            .replace(/(\s)/g, "")
            .replace(/(\d{4})/g, "$1 ")
            .replace(/\s*$/, "");
        } else {
          targetData[currentkey] = value;
        }
      }
      // 有输入，错误信息不显示
      if (value) {
        this.errorMsg = "";
      }
      var myEventDetail = {
        targetData: targetData,
      };
      // 使用 triggerEvent 方法触发自定义组件事件，指定事件名、detail对象和事件选项
      this.$emit("modelInput", targetData);
      this.targetData = targetData;
      // console.log(this.targetData, "this.targetData");
    },

    // 表单失去焦点，校验数据格式
    validateData(e) {
      if (!this.value2 || this.value2.trim().length == 0 || this.value2 == "") {
        this.errorMsg = `请输入您的${this.title}！`;
      }
    },
  },
  created() {},
  mounted() {
    // if (this.value && this.value != "" && this.value.trim().length != 0) {
    //   let currentkey = this.currentkey;
    //   let targetData = this.targetData;
    //   targetData[currentkey] = this.value;
    //   var myEventDetail = {
    //     targetData: targetData,
    //   };
    //   // 使用 triggerEvent 方法触发自定义组件事件，指定事件名、detail对象和事件选项
    //   this.$emit("modelInput", targetData);
    //   this.targetData = targetData;
    // }
  },
};
</script>
<style lang="less" scoped>
@field-placeholder-text-color: "#969799";
</style>
