// components/IknowDia/Iknow.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    // 是否显示
    show:{
      type:Boolean,
      value:""
    },
    // 标题
    title:{
     type:String,
     value:'' 
    },
    // 提示的具体内容
    value:{
      type:String,
      value:''
    },
    // 按钮的内容
    btnText:{
      type:String,
      value:''
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    show:false,
    title:'提示',
    value:'',
    btnText:'我知道了'
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onClickHide() {
      this.setData({ show: false });
    },

    noop(){},
  }
})
