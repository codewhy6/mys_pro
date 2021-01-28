### 1、头像框

```html
<ul data-v-ed1599cc="" id="ranking_list" class="ranking_list">
    <li data-v-ed1599cc="" class="ranking_other_item clearfix">
        <div data-v-ed1599cc="" class="other_lf fl">
            <div data-v-ed1599cc="" class="avatar_box">
                <img data-v-ed1599cc="" src="https://cspc.liuyanzb.com//default.jpg" alt="">		</div>
            <div data-v-ed1599cc="" class="user_base_info">
                <p data-v-ed1599cc="" class="txt_of">手机用户8961</p>
                <p data-v-ed1599cc="" class="txt_of">已邀请2人</p>
            </div>
        </div>
        <div data-v-ed1599cc="" class="other_rt fr">
            <p data-v-ed1599cc="">
                <span data-v-ed1599cc="">累计获得</span><
                span data-v-ed1599cc="" class="special_zn">0</span>
                <span data-v-ed1599cc="">六钻</span>
            </p>
        </div>
    </li>
</ul>
```

```less
.ranking_list {
    width: 100%;
    padding: 0px 12px;
    box-sizing: border-box;
    height: auto;
    max-height: 430px;
    overflow-y: scroll;
    &::-webkit-scrollbar {
        display: none;
    }

    .ranking_other_item {
        background: #ffffff;
        border-radius: 5px;
        box-shadow: 0px 4px 4px 3px rgba(215, 28, 42, 0.04);
        padding: 10px 12px;
        box-sizing: border-box;
        display: flex;
        align-items: center;

        & + .ranking_other_item {
            margin-top: 13px;
        }

        > div:first-child {
            width: 47%;
        }
        > div:last-child {
            width: 53%;
        }
    }
}

.other_lf {
    display: flex;
    align-items: center;

    .avatar_box {
        width: 40px;
        height: 40px;
        border-radius: 50%;
        // background: pink;
        border: 1px solid #ffc1c6;
        margin-right: 8px;
        overflow: hidden;

        img {
            width: 100%;
            height: 100%;
        }
    }
    .user_base_info {
        // flex: 1;
        width: 61%;

        > p {
            width: 100%;
            margin: 0px;
        }
        > p:first-child {
            color: #333;
            font-weight: bold;
            font-size: 13px;
            margin-bottom: 8px;
        }
        > p:last-child {
            color: #999;
            font-size: 12px;
        }
    }
}

.other_rt {
    display: flex;
    justify-content: flex-end;
    align-items: center;

    p {
        color: #999;
        font-size: 12px;
        text-align: right;
    }

    .special_zn {
        color: #eab61a;
        font-size: 14px;
        font-weight: bold;
        margin: 0px 4px;
    }
}
```

### 2.可滑动的按钮

```html
<div class="sendHbWay">
    <button :class="sendHbWayActive ? 'active' : ''" @click="sendHbWay">
        <span v-if="sendHbWayActive">立即发放</span>
        <span v-else>延迟1分钟</span>
    </button>
</div>
```

```js
sendHbWay() {
    this.sendHbWayActive = !this.sendHbWayActive;
}
```

```less
.sendHbWay {
    width: 85px;
    height: 30px;
    background: rgba(0, 0, 0, 0.2);
    border-radius: 15px;
    margin: 0px auto;
    margin-top: 12px;
    overflow: hidden;
    position: relative;

    button {
        width: 82%;
        height: 100%;
        outline: none;
        line-height: 30px;
        text-align: center;
        background: #f38d80;
        color: #fff;
        border-radius: 15px;
        font-size: 12px;
        cursor: pointer;
        user-select: none;
        position: absolute;
        left: 0px;
        top: 0px;
        transition: all 0.5s;

        &.active {
            left: 15px;
        }
    }
}
```

### 3.可滑动的tabs栏

```vue
<!--
* @Description: 
* @Author: ZhangChen
* @Date: 2021-01-26 15:22:28
* @LastEditors: ZhangChen
* @LastEditTime: 2021-01-26 17:38:30
* @FilePath: \testpro\src\components\tabs.vue
-->
<template>
<div v-if="list.length > 0" class="tabBlock">
    <div @scroll="scroll" class="tabContent">
        <div ref="tabContentScroll" class="tabContentScroll">
            <ul id="tab_list" class="tab">
                <li
                    ref="tab_item"
                    v-for="(item, index) in list"
                    :key="index"
                    :class="[
                            'tab__item',
                            { 'tab__item--active': currentIndex === index },
                            ]"
                    :style="{ color: currentIndex === index ? `${itemColor}` : '' }"
                    @click="select(item, index)"
                    >
                    <div class="tab__item-title">
                        <slot :title="item" name="title"></slot>
    </div>
                    <div v-if="!showTitleSlot" class="tab__item-title">
                        {{ item.title }}
    </div>
    </li>
    </ul>
            <div
                 :style="{
                         background: lineColor,
                         width: lineStyle.width,
                         transform: lineStyle.transform,
                         transitionDuration: lineStyle.transitionDuration,
                         }"
                 class="tab__line"
                 ></div>
    </div>
    </div>
    </div>
</template>

<script>
    export default {
        props: {
            value: {
                type: [Number, String],
                default: null,
            },
            // 数据源
            list: {
                type: Array,
                default: () => {
                    return [];
                },
            },
            // 字体颜色
            itemColor: {
                type: [Array, String],
                default: null,
            },
            // 选中下划线的颜色
            lineColor: {
                type: [Array, String],
                default: null,
            },
            lineAnimated: {
                type: Array,
                default: () => {
                    return [];
                },
            },
        },
        data() {
            return {
                // 当前默认选中的索引值
                currentIndex: 0,
                // 选中下划线的样式
                lineStyle: {},
                // 父元素默认滚动的初始值为0
                scrollLeft: 0,
                tabsScrollLeft: 0,
                // 持续的时间
                duration: 0.3,
            };
        },
        computed: {
            showTitleSlot() {
                return this.$scopedSlots.title;
            },
        },
        watch: {
            list() {
                this.setTabList();
            },
            value() {
                this.currentIndex = this.value;
                this.setTabList();
            },
            scrollLeft(val) {
                // console.log(val);
            },
        },
        mounted() {
            this.currentIndex = this.value;
            this.setTabList();
            if (!this.lineAnimated) {
                this.duration = 0;
            }
            // console.log(this.$scopedSlots)
        },
        methods: {
            // 点击选中事件
            select(item, index) {
                this.$emit("input", index);
                this.scroll();
            },
            // 监听/设置数据源
            setTabList() {
                this.$nextTick(() => {
                    if (this.list.length > 0) {
                        this.setLine();
                        this.scrollIntodiv();
                    }
                });
            },
            // 设置当前选中的下划线
            setLine() {
                let lineWidth = 0;
                let lineLeft = 0;
                this.getElementData(`#tab_item`, (data) => {
                    const el = data[this.currentIndex];
                    lineWidth = el.width;
                    // lineLeft = el.width * (this.currentIndex + 0.5)  // 此种只能针对每个item长度一致的
                    lineLeft = el.width / 2 + -data[0].left + el.left;
                    this.lineStyle = {
                        width: `${lineWidth}px`,
                        transform: `translateX(${lineLeft}px) translateX(-50%)`,
                        transitionDuration: `${this.duration}s`,
                    };
                });
            },
            // item滚动计算
            scrollIntodiv() {
                // const list = data[0]
                this.getElementData("#tab_item", (data) => {
                    const item = data[this.currentIndex];
                    // 滚动父级元素宽度
                    // const tabContentWidth = this.$refs.tabContentScroll.scrollWidth
                    // 父级元素可视区域宽度
                    const screenWdith = this.$refs.tabContentScroll.offsetWidth;
                    // item的宽度
                    const itemWidth = item.width;
                    // item距离最左侧的距离
                    const itemOffsetLeft = item.left;
                    // item中间值 = (父级可视区域宽度 - item的宽度) / 2
                    const itemCenter = (screenWdith - itemWidth) / 2;
                    // item目标值 = 当前item左移值 - 中间值
                    const itemTarget = itemOffsetLeft - itemCenter;
                    console.log(itemOffsetLeft, "itemOffsetLeft");

                    console.log(itemCenter, "itemCenter");
                    console.log(itemTarget, "itemTarget");
                    // 屏幕宽度
                    const winWidth = window.innerWidth;
                    // console.log(winWidth);
                    // 目标值小于0时，滚动值设置为0
                    if (itemTarget < 0) {
                        // this.$refs.tabContentScroll.scrollLeft = 0;
                        this.$refs.tabContentScroll.scrollTo({
                            left: 0,
                            behavior: "smooth",
                        });
                        return;
                    }
                    // 目标值 < 屏幕宽-父级可视区域宽，滚动值 = 父级可视区域宽-屏幕宽+元素宽
                    if (itemTarget < winWidth - screenWdith) {
                        // this.$refs.tabContentScroll.scrollLeft =
                        //   screenWdith - winWidth + itemWidth;
                        this.$refs.tabContentScroll.scrollTo({
                            left: screenWdith - winWidth + itemWidth,
                            behavior: "smooth",
                        });
                        return;
                    }
                    // 正常情况
                    // this.$refs.tabContentScroll.scrollLeft = itemTarget;
                    this.$refs.tabContentScroll.scrollTo({
                        left: itemTarget,
                        behavior: "smooth",
                    });
                });
            },

            // 获取每一个元素的 left / width
            getElementData(el, callback) {
                const domArr = this.$refs.tab_item;
                const arr = [];
                domArr.forEach((e) => {
                    arr.push({ id: "tab_item", left: e.offsetLeft, width: e.offsetWidth });
                });
                callback(arr);
            },
            scroll() {
                // console.log(
                //   this.$refs.tabContentScroll.scrollLeft,
                //   "this.$refs.tabContentScroll.scrollLeft"
                // );
                this.scrollLeft = this.$refs.tabContentScroll.scrollLeft;
            },
        },
    };
</script>

<style lang="less" scoped>
    .tabBlock {
        position: relative;
        // margin-bottom: 30px;
        .tabContent {
            background:#fff;
            .tabContentScroll {
                margin: 0 15px;
                overflow: auto;
            }
            .tabContentScroll::-webkit-scrollbar {
                display: none;
            }
        }
        .tabContent::before {
            content: "";
            height: 1px;
            width: 100%;
            position: absolute;
            bottom: 0px;
            left: 0;
            background: #cccccc;
        }
        .tab {
            position: relative;
            display: flex;
            font-size: 28px;
            padding: 10px 0px;
            white-space: nowrap;
            &__item {
                // flex: 1;
                // text-align: center;
                line-height: 90px;
                color: #999999;
                margin-right: 20px;
                position: relative;
                &--active {
                    color: black;
                }
                &-title {
                    font-size: 14px;
                    font-weight: 400;
                    line-height: 22px;
                }
            }
        }
        .tab__line {
            display: block;
            height: 2px;
            position: absolute;
            bottom: 0px;
            left: 0;
            z-index: 1;
            border-radius: 3px;
            position: relative;
            background: #000;
        }
    }
</style>

```

```vue
<!-- 可横向滚动的组件 -->
<filtersTab :list="filtersList" v-model="active">
    <template v-slot:title="{ title }">
<div class="tab-block">
    <div class="tab-block-title">{{ title.title }}</div>
    <div v-if="title.info != 0" class="tab-block-info">
        <p class="tab-block-info-text">{{ title.info }}</p>
        </div>
        </div>
    </template>
</filtersTab>
<!-- <filtersTab
:list="filtersList"
v-model="active"
itemColor="#03648f"
lineColor="#03648f"
></filtersTab> -->
```





