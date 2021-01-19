<!--
 * @Description: 
 * @Author: ZhangChen
 * @Date: 2020-12-23 14:21:39
 * @LastEditors: ZhangChen
 * @LastEditTime: 2020-12-28 09:24:01
 * @FilePath: \testpro\src\components\Pagination.vue
-->

<template>
  <!-- 分页 start -->
  <div class="paging">
    <button class="paging-btn-prev" @click="pagePrev"></button>
    <button
      v-for="(item, index) in totalPages"
      :key="index"
      :class="activeIndex == item ? 'paging-btn-on' : ''"
      @click="selectActive(item)"
      ref="button"
    >
      {{ item }}
    </button>
    <button class="morepages">…</button>
    <!-- <button :class="activeIndex == totalPages ? 'paging-btn-on' : ''">
      {{ totalPages }}
    </button> -->
    <button class="paging-btn-next" @click="pageNext"></button>
  </div>
  <!-- 分页 end -->
</template>
<script>
export default {
  data() {
    return {
      // 默认显示的页数
      pages: [1, 2, 3],
      // 总页数
      totalPages: 5,
      // 当前选中的页数
      activeIndex: 1,
    };
  },
  computed: {},
  methods: {
    // 点击选中
    selectActive(params) {
      console.log(params);
      this.activeIndex = params;
    },
    // 点击下一页
    pageNext() {
      this.activeIndex++;
      if (this.activeIndex >= this.totalPages) {
        this.activeIndex = this.totalPages;
      }
      let button = document.createElement("button");
      button.innerHTML = "...";
      console.log(button);
      console.log(this.$refs.button);
      this.$refs.button.forEach((item) => {
        console.log(item);
        if (item.getAttribute("class") == "paging-btn-on") {
          document.querySelector(".paging").insertBefore(item, button);
        }
      });
    },
    // 点击上一页
    pagePrev() {
      this.activeIndex--;
      if (this.activeIndex <= 1) {
        this.activeIndex = 1;
      }
    },
  },
  created() {},
  mounted() {},
};
</script>
<style lang="less" scoped>
.paging {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 40px;
}

.paging button {
  width: 40px;
  height: 40px;
  line-height: 40px;
  background-color: #fff;
  color: #666;
  font-size: 16px;
  border: 1px solid #ededed;
  margin: 0 2px;
  outline: none;
  border-radius: 5px;
  cursor: pointer;
  overflow: hidden;
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
}

.paging button:hover {
  background-color: #1171f3;
  color: #fff;
}

.morepages {
  font-weight: bold;
}

.paging button.paging-btn-on {
  background-color: #1171f3;
  color: #fff;
}

.paging-btn-next,
.paging-btn-prev {
  position: relative;
  &::after {
    content: "";
    width: 10px;
    height: 10px;
    position: absolute;
    right: 15px;
    top: 50%;
    transform: translateY(-50%) rotate(45deg);
    background-color: transparent;
    border-width: 2px 2px 0px 0px;
    border-color: #666;
    border-style: solid;
  }
  &:hover::after {
    border-color: #fff;
  }
}

.paging-btn-prev {
  &::after {
    left: 15px;
    transform: translateY(-50%) rotate(-135deg);
  }
}
</style>
