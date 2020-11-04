# 公共的css样式

### 一、base.css

```css
/* css公共代码块样式 */
/* 清除浮动 */
.clearfix::after {
    content: "";
    display: block;
    clear: both;
    visibility: hidden;
    height: 0;
}

/* 左浮动 */
.fl {
    float: left;
}

/* 右浮动 */
.fr {
    float: right;
}

/* 文本溢出隐藏，一行 */
.txt_of {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}

/* 多行文本溢出隐藏 */
.txt_of2 {
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
}
.txt_of3 {
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
}


/* flex布局 */
.flex_c {
    display: flex;
    justify-content: center;
    align-items: center;
}
/* flex布局 */
.flex_sb {
    display: flex;
    justify-content: space-between;
    align-items: center;
}
.flex_sa {
    display: flex;
    justify-content: space-around;
    align-items: center;
}
```

