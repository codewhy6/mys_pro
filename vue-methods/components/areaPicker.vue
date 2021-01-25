<!--
 * @Description: 地域选择器
 * @Author: ZhangChen
 * @Date: 2021-01-12 10:21:13
 * @LastEditors: ZhangChen
 * @LastEditTime: 2021-01-19 13:11:07
 * @FilePath: \testpro\src\components\areaPicker.vue
-->
<template>
  <div class="areaPicker">
    <van-cell
      :title="title"
      title-style="flex: 0 1 30%;margin-right: 12px;"
      :is-link="!disabled"
      :value="value3"
      :value-class="value1 == value2 ? 'valCls' : 'valCls2'"
      :required="required"
      @click="openAreaPicker"
      use-label-slot
    >
      <template v-if="errFlag">
        <div slot="label" class="labelCls" v-if="errorMsgFlag">
          <span>{{ errorMsg }}</span>
        </div>
      </template>
    </van-cell>
    <!-- 区域选择器 企业地区选择-->
    <van-popup
      v-model="pickerAreaVisible"
      position="bottom"
      round
      @close="onCloseAreaPopup"
    >
      <van-area
        :area-list="areaList"
        :value="region"
        @confirm="onSelectArea"
        :columns-placeholder="['请选择', '请选择', '请选择']"
        @cancel="closeAreaPicker"
        title="省/市/区"
      />
    </van-popup>
    <!-- 定义地图显示容器 -->
    <!-- <div id="container"></div> -->
  </div>
</template>
<script>
import areaList from "../util/area";
import { get, post } from "../util/http";
import { getMap, getAdress, getIp } from "../api/index";
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
    // 当前选择的对象
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
    prov_id: {
      type: String,
      default: "",
    },
    area_id: {
      type: String,
      default: "",
    },
    district_id: {
      type: String,
      default: "",
    },
    // 地域选择器 第几个
    areaNo: {
      type: String,
      default: "1",
    },
  },
  data() {
    return {
      value3: this.value, //--当前选中的值
      errorMsg: "", //--错误信息
      pickerAreaVisible: false, //选择器的显示和隐藏
      errorMsgFlag: false, //--错误信息
      targetData: {}, // 选择器选中的新的数据的对象，需要传递给父组件
      value1: "1",
      value2: "1",
      // 全国地域数据
      areaList: areaList,
      // 当前默认选择的地区
      region: "",
    };
  },
  computed: {},
  methods: {
    // 打开选择器
    openAreaPicker() {
      if (this.disabled) return;
      this.pickerAreaVisible = true;
    },
    // 关闭选择器
    onCloseAreaPopup() {
      this.pickerAreaVisible = false;
      this.closeAreaPicker();
    },

    // 关闭地域选择器
    closeAreaPicker() {
      this.pickerAreaVisible = false;
      this.errorMsg = `请填写${this.title}！`;
      this.errorMsgFlag = true; //--第一次没有值，点击取消后显示错误提示信息
      let targetData = this.targetData;
      //有值之后第二次点击取消，不能显示错误信息
      if (
        (targetData.prov_id && targetData.prov_id != "") ||
        (targetData.area_id && targetData.area_id != "") ||
        (targetData.district_id && targetData.district_id != "")
      ) {
        this.errorMsgFlag = false; //--第一次没有值，点击取消后显示错误提示信息
      }
      if (this.prov_id != "" && this.area_id != "" && this.district_id != "") {
        this.errorMsg = "";
      }
    },

    // 选择地域-确定
    onSelectArea(value) {
      // console.log(this.$parent);
      let targetData = this.targetData;
      if (this.areaNo == "1") {
        targetData.prov_id = value[0].code;
        targetData.area_id = value[1].code;
        targetData.district_id = value[2].code;
      } else if (this.areaNo == "2") {
        targetData.prov_id2 = value[0].code;
        targetData.area_id2 = value[1].code;
        targetData.district_id2 = value[2].code;
      } else if (this.areaNo == "3") {
        targetData.prov_id3 = value[0].code;
        targetData.area_id3 = value[1].code;
        targetData.district_id3 = value[2].code;
      }

      // 点击确定，有值，不显示错误提示
      if (value[0].code && value[1].code && value[2].code) {
        this.errorMsg = "";
      }
      // detail对象，提供给事件监听函数,将数据传送给父组件
      var myEventDetail = {
        targetData: targetData,
      };
      this.$emit("onSelectArea", myEventDetail);
      // 选中一个值，就要关闭选择器
      this.targetData = targetData;
      // console.log(this.formatTime(value, "yyyy-mm-dd"), "onSelectDate");
      this.value3 = `${value[0].name}/${value[1].name}/${value[2].name}`;
      this.pickerAreaVisible = false;
      this.value2 = "0";
      this.errorMsgFlag = false;
    },
    // initMap() {
    //   //定义地图中心点坐标
    //   var center = new TMap.LatLng(39.98412, 116.307484);
    //   //定义map变量，调用 TMap.Map() 构造函数创建地图
    //   var map = new TMap.Map(document.getElementById("container"), {
    //     center: center, //设置地图中心点坐标
    //     zoom: 17.2, //设置地图缩放级别
    //     pitch: 43.5, //设置俯仰角
    //     rotation: 45, //设置地图旋转角度
    //   });
    // },
    getLocation() {
      getIp({
        key: "FKSBZ-LCQCW-OO5RF-RTN4E-XDQH3-Y7FHL",
        ip: returnCitySN.cip,
      }).then((res) => {
        if (res.status == 0) {
          // console.log(res.result);
          this.region = res.result.ad_info.adcode + "";

          // getMap({
          //   key: "FKSBZ-LCQCW-OO5RF-RTN4E-XDQH3-Y7FHL",
          //   location: `${res.result.location.lat},${res.result.location.lng}`,
          // }).then((res) => {
          //   if (res.status == 0) {
          //     console.log(res.result);
          //   }
          // });
        }
      });
    },
  },
  created() {
    // this.initMap();
    // 如果选择器禁用，显示的文字为深色
    if (this.disabled) {
      this.value2 = "0";
    }
    // 父组件传递过来值，就默认选中
    if (this.prov_id != "" && this.area_id != "" && this.district_id != "") {
      this.value3 = `${this.areaList.province_list[this.prov_id]}/${
        this.areaList.city_list[this.area_id]
      }/${this.areaList.county_list[this.district_id]}`;
      this.value2 = "0";
    }
  },
  mounted() {
    // this.getLocation();
    // this.$http
    //   .get("/api/ws/geocoder/v1", {
    //     params: {
    //       key: "FKSBZ-LCQCW-OO5RF-RTN4E-XDQH3-Y7FHL",
    //       location: "39.984154,116.307490",
    //     },
    //   })
    //   .then((res) => {
    //     console.log(res);
    //     if (res.data.status == 0) {
    //       console.log(res.data.result, "l");
    //     }
    //   });
    // getAdress({
    //   key: "FKSBZ-LCQCW-OO5RF-RTN4E-XDQH3-Y7FHL",
    //   address: "江苏省南京市鼓楼区天目路29号院",
    // }).then((res) => {
    //   if (res.status == 0) {
    //     console.log(res.result);
    //   }
    // });
  },
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
#container {
  /*地图(容器)显示大小*/
  width: 1200px;
  height: 400px;
}
</style>
