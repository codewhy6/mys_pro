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

