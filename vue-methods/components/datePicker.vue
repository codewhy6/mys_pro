<!--
 * @Description: 时间选择器
 * @Author: ZhangChen
 * @Date: 2021-01-11 17:39:50
 * @LastEditors: ZhangChen
 * @LastEditTime: 2021-01-18 10:51:07
 * @FilePath: \testpro\src\components\datePicker.vue
-->
<template>
  <div class="datePicker">
    <van-cell
      :title="title"
      title-style="flex: 0 1 30%;margin-right: 12px;"
      :is-link="!disabled"
      :value="value3"
      :value-class="value1 == value2 ? 'valCls' : 'valCls2'"
      :required="required"
      @click="openDatePicker"
      use-label-slot
    >
      <template v-if="errFlag">
        <div slot="label" class="labelCls" v-if="errorMsgFlag">
          <span>{{ errorMsg }}</span>
        </div>
      </template>
    </van-cell>
    <van-popup
      v-model="pickerDateVisible"
      position="bottom"
      round
      @close="onCloseDatePopup"
    >
      <van-datetime-picker
        :title="title"
        type="date"
        :formatter="formatter"
        v-model="currentDate2"
        :min-date="minDate"
        :max-date="maxDate"
        @cancel="closeDatePicker"
        @confirm="onSelectDate"
      />
    </van-popup>
  </div>
</template>
<script>
export default {
  props: {
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

    // 当前操作的对象
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
    currentDate: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      value3: this.value, //--当前选中的值
      errorMsg: "", //--错误信息
      pickerDateVisible: false, //选择器的显示和隐藏
      errorMsgFlag: false, //--错误信息
      targetData: {}, // 选择器选中的新的数据的对象，需要传递给父组件
      value1: "1",
      value2: "1",
      currentDate2: new Date(), //--当前的时间
      minDate: new Date(1960, 0, 1),
      maxDate: new Date(2025, 10, 1),
    };
  },
  computed: {},
  methods: {
    //--格式化时间
    formatter(type, value) {
      if (type === "year") {
        return `${value}年`;
      } else if (type === "month") {
        return `${value}月`;
      } else if (type === "day") {
        return `${value}日`;
      }
      return value;
    },
    // 选中的时间格式化
    formatTime(date, sym = "") {
      const year = date.getFullYear();
      const month = (date.getMonth() + 1 + "").padStart(2, "0");
      const day = (date.getDate() + "").padStart(2, "0");
      const hour = date.getHours();
      const minute = date.getMinutes();
      const second = date.getSeconds();
      if (sym.toLowerCase() == "yyyy-mm-dd") {
        return year + "-" + month + "-" + day;
      } else {
        return `${year}${month}${day}`;
      }
    },
    // 点击遮罩层，关闭弹窗
    onCloseDatePopup() {
      this.pickerDateVisible = false;
      this.closeDatePicker();
    },
    // 打开选择器
    openDatePicker() {
      if (this.disabled) return;

      this.pickerDateVisible = true;
    },

    // 关闭时间选择器
    closeDatePicker() {
      this.pickerDateVisible = false;
      this.errorMsg = `请填写${this.title}！`;
      this.errorMsgFlag = true; //--第一次没有值，点击取消后显示错误提示信息
      let targetData = this.targetData;
      let currentkey = this.currentkey;
      // console.log(currentkey); 有值之后第二次点击取消，不能显示错误信息
      if (targetData[currentkey] && targetData[currentkey].value != "") {
        this.errorMsgFlag = false; //--第一次没有值，点击取消后显示错误提示信息
      }
      if (this.currentDate != "" && this.currentDate.trim().length != 0) {
        this.errorMsg = "";
      }
    },
    // 时间选择器确认选择事件
    onSelectDate(value) {
      let targetData = this.targetData;
      let currentkey = this.currentkey;
      let currentconfig = this.currentconfig;
      if (currentconfig) {
        targetData[currentconfig][currentkey] = this.formatTime(value);
      } else {
        targetData[currentkey] = this.formatTime(value);
      }
      // 点击确定，有值，不显示错误提示
      if (value) {
        this.errorMsg = "";
      }
      // detail对象，提供给事件监听函数,将数据传送给父组件
      var myEventDetail = {
        targetData: targetData,
      };
      // 使用 emit 方法触发自定义组件事件，指定事件名、detail对象和事件选项
      this.$emit("onDatePickerSelect", myEventDetail);
      // 选中一个值，就要关闭选择器
      this.targetData = targetData;
      // console.log(this.formatTime(value, "yyyy-mm-dd"), "onSelectDate");
      this.value3 = this.formatTime(value, "yyyy-mm-dd");
      this.pickerDateVisible = false;
      this.value2 = "0";
      this.errorMsgFlag = false;
    },
    // 给字符串 添加/删除 修饰符
    formatStrSign(str, type, sign, signLength) {
      if (!str || str.trim().length == 0) return;
      // 20201231
      if (type == "del") {
        str = str.replace(/[\.-\/]/g, "");
        return str;
      } else if (type == "add") {
        str = str.replace(/[\.-\/]/g, "");
        str = `${str.substring(0, signLength[0])}${sign}${str.substring(
          signLength[0],
          signLength[1]
        )}${sign}${str.substr(signLength[1], 8)}`;
        return str;
      }
    },
  },
  created() {
    // 如果选择器禁用，显示的文字为深色
    if (this.disabled) {
      this.value2 = "0";
    }
    // 父组件传递过来值，就默认选中
    if (this.currentDate != "" && this.currentDate.trim().length != 0) {
      // console.log(this.formatStrSign(this.currentDate, "add", ".", [4, 6]));
      let str = this.formatStrSign(this.currentDate, "add", ".", [4, 6]);
      this.value3 = this.formatTime(new Date(str), "yyyy-mm-dd");
      this.value2 = "0";
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
