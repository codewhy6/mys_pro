(function (window, document, $, touch, undefined) {
    window.myTouchjs = function ($targetObj) {

        var myTouchjs = {
            x: 0,
            y: 0,
            setY: 0,
            setX: 0,
            scaleVal: 1,    //缩放
            setScale: 1,    //缩放
            rotateVal: 0,   //旋转
            setRotate: 0,   //旋转

            //初始化
            init: function ($targetObj) {
                this.drag($targetObj);
                this.scale($targetObj);
                this.rotate($targetObj);
                return this;
            },

            //拖动
            drag: function ($targetObj) {
                var that = this;
                touch.on($targetObj, 'drag', function (ev) {
                    that.setX = that.x + ev.x;
                    that.setY = that.y + ev.y;

                    that.set();
                });
                touch.on($targetObj, 'dragend', function (ev) {
                    that.x = that.setX;
                    that.y = that.setY;
                });
                touch.on($targetObj, 'touchcancel', function (ev) {
                    that.x = that.setX;
                    that.y = that.setY;
                });
            },

            //缩放
            scale: function ($targetObj) {
                var that = this;
                var initialScale = that.scaleVal || 1;
                var currentScale;
                touch.on($targetObj, 'pinch', function (ev) {
                    currentScale = ev.scale - 1;
                    currentScale = initialScale + currentScale;
                    that.scaleVal = currentScale;

                    that.set();
                });

                touch.on($targetObj, 'pinchend', function (ev) {
                    initialScale = currentScale;
                    that.scaleVal = currentScale;
                });
            },

            //旋转
            rotate: function ($targetObj) {
                var that = this;
                var angle = that.rotateVal || 0;
                touch.on($targetObj, 'rotate', function (ev) {
                    var totalAngle = angle + ev.rotation;
                    if (ev.fingerStatus === 'end') {
                        angle = angle + ev.rotation;
                    }
                    that.rotateVal = totalAngle;
                    that.set();
                });
            },

            set: function () {
                var transformStyle = 'translate(' + this.setX + 'px,' + this.setY + 'px) scale(' + this.scaleVal + ') rotate(' + this.rotateVal + 'deg)';

                $targetObj.css("transform", transformStyle).css("-webkit-transform", transformStyle);
                $targetObj.attr('data-rotate', this.rotateVal);
            }
        };

        return myTouchjs.init($targetObj);
    };
})(this, document, jQuery, touch);