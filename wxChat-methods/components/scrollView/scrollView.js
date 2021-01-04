const timeout = 5000;
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    height: {
      type: String,
      value: '100%'
    },
    // 下拉刷新球，显示和隐藏
    ball: {
      type: Boolean,
      value: true
    }
  },
  /**
   * 组件的初始数据
   */
  data: {
    isBusy: false,
    status: 0, //0:正常状态 1:加载中状态
    freshBall: {
      maxBallTop: 80, //刷新球最大下拉距离
      top: 0, //刷新球位置
      show: true,
      isLoading: 0, //-是否为加载状态
      deg: 0, //旋转角度
      step: 1.8 //步长 
    },
    isTop: true, //是否在顶部
    touchStartY: 0, //刚触碰屏幕时 距离顶部的距离
    touchMoveHeight: 0 //触碰屏幕时 手指移动的距离
  },

  /**
   * 组件的方法列表
   */
  methods: {
    // 手指滑动事件
    bindscroll: function (e) {
      //console.log(e)
      let self = this;
      // 滑动的时候，不是在顶部
      self.setData({
        isTop: false
      })
    },
    // 手指开始要滑动，记录距离顶部的距离
    touchStart: function (e) {
      // console.log(e,'touchStart')
      let self = this;
      self.setData({
        touchStartY: e.changedTouches[0] && e.changedTouches[0].pageY,
        isTop: true
      })
    },
    // 手指滑动
    touchMove: function (e) {
      //console.log(e)
      let self = this;
      // 刚触碰屏幕时 距离顶部的距离
      let touchStartY = self.data.touchStartY;
      // 手指移动结束后，距离顶部的距离
      let touchMoveY = e.changedTouches[0] && e.changedTouches[0].pageY;
      // 手指移动的距离
      self.setData({
        touchMoveHeight: touchMoveY - touchStartY
      })
      if (!this.data.isBusy && this.data.isTop) {
        this.data.freshBall.top = this.data.touchMoveHeight > this.data.freshBall.maxBallTop * this.data.freshBall.step ? this.data.freshBall.maxBallTop : this.data.touchMoveHeight / this.data.freshBall.step;
        this.data.freshBall.deg = this.getDegByHeight(this.data.freshBall.top);
        // 手指滑动，加载的状态为false
        this.data.freshBall.isLoading = 0;
        this.setData({
          freshBall: this.data.freshBall
        });
      }
    },
    // 手指滑动结束
    touchEnd: function (e) {
      //console.log(e)
      let self = this;
      let isTop = self.data.isTop;
      let touchStartY = self.data.touchStartY;
      let touchEndY = e.changedTouches[0] && e.changedTouches[0].pageY;
      //console.log(isTop)
      //console.log(touchStartY)
      //console.log(touchEndY)

      if (!this.data.isBusy && isTop && touchEndY - this.data.freshBall.maxBallTop * this.data.freshBall.step > touchStartY) {
        console.log("触发下拉刷新");
        this.data.freshBall.isLoading = 1;
        this.setData({
          freshBall: this.data.freshBall
        });
        let timeId = null;
        new Promise((resolve, reject) => {
          this.triggerEvent('pulldown', {
            resolve
          });
          timeId = setTimeout(() => {
            resolve();
            // this.data.freshBall.isLoading = 2;
            // this.setData({
            //   freshBall: this.data.freshBall
            // });
          }, timeout)
        }).then((data) => {
          if (!timeId) return;
          clearTimeout(timeId);
          timeId = null;
          this.data.freshBall.top = 0;
          this.setData({
            freshBall: this.data.freshBall
          });
          this.setData({
            isBusy: false
          });
        }).catch(e => {
          if (!timeId) return;
          clearTimeout(timeId);
          this.data.freshBall.top = 0;
          this.setData({
            freshBall: this.data.freshBall
          });
          this.setData({
            isBusy: false
          });
        })
        this.setData({
          isBusy: true,
          touchMoveHeight: 0
        });
      } else {
        this.data.freshBall.top = 0;
        this.setData({
          freshBall: this.data.freshBall
        });
      }
    },
    // 触发底部的事件
    lower(e) {
      //console.log(e)
      if (!this.data.isBusy) {
        console.log("触底")
        this.triggerEvent('lower')
        this.setData({
          isBusy: true
        })
        setTimeout(() => {
          this.setData({
            isBusy: false
          });
        }, 500)
      }
    },
    getDegByHeight(height) {
      let maxBallTop = this.data.freshBall.maxBallTop;
      return height / maxBallTop * 360;
    },
    resetFreshBall() { //重置刷新球
      this.setData({
        maxBallTop: 100,
        top: 0,
        show: true,
        deg: 0,
        isLoading: false,
        step: 2
      });
    }
  }
})