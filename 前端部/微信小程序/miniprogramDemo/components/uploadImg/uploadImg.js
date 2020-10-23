// components/uploadImg/uploadImg.js
var app = getApp()
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    selectImgCount: { //最多选择图片数量
      value: 9,
      type: Number
    }

  },

  /**
   * 组件的初始数据
   */
  data: {
    upload_picture_list: []
  },

  /**
   * 组件的方法列表
   */
  methods: {
    deleteImg(e) {
      let upload_picture_list = this.data.upload_picture_list;
      let index = e.currentTarget.dataset.index;
      upload_picture_list.splice(index, 1);
      this.setData({
        upload_picture_list: upload_picture_list
      });
      that.triggerEvent('pullComment', { imageList: that.data.upload_picture_list })
    },
    //选择图片方法
    uploadpic: function (e) {
      let that = this //获取上下文
      let upload_picture_list = that.data.upload_picture_list
      //选择图片
      wx.chooseImage({
        count: that.data.selectImgCount, // 默认9，这里显示一次选择相册的图片数量 
        sizeType: ['compressed'], // 可以指定是原图还是压缩图，默认二者都有  
        sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
        success: function (res) { // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片 
          let tempFiles = res.tempFiles

          for (let i in tempFiles) {
            tempFiles[i]['upload_percent'] = 0
            tempFiles[i]['path_server'] = ''
            upload_picture_list.push(tempFiles[i])
          }
          console.log(tempFiles)
          //显示
          that.setData({
            upload_picture_list: upload_picture_list,
          });
          that.triggerEvent('pullComment', { imageList: that.data.upload_picture_list })
        }
      })
    },
    // 点击上传图片
    async uploadimage() {
      console.log('进入第一个接口')
      let images1 = ''
      let page = this
      let upload_picture_list = page.data.upload_picture_list
      //循环把图片上传到服务器 并显示进度       
      for (let j in upload_picture_list) {
        if (upload_picture_list[j]['upload_percent'] == 0) {
          await new Promise((r, p) => {
            wx.uploadFile({
              url: `${app.globalData.address}api/mobile/uploadFileXun`, //仅为示例，非真实的接口地址  
              filePath: upload_picture_list[j].path,
              name: 'file',
              success(res) {
                var json = JSON.parse(res.data);//json字符串转化为json对象
                var data = json.data.result
                if (images1 == null || images1 == '') {
                  images1 = data;
                } else {
                  images1 += "," + data;
                }
                upload_picture_list[j]['upload_percent'] = 100
                page.setData({
                  imagesxx: images1
                })
                r(true)
              }
            })
          })
        }
      }
    },
    async getUploadImages(){
      await this.uploadimage();
      return this.data.imagesxx
    }
    
  }
})
