// pages/qrCode/index.js
// import drawing  from '../../utils/drawing.js'
const drawing = require('../../utils/drawing.js')

const context = wx.createCanvasContext("myCanvas");
const deviceWidth = wx.getSystemInfoSync().windowWidth;
const bgHeight = (deviceWidth * 1334) / 750;

Page({
  /**
   * 页面的初始数据
   */
  data: {
    expressData: {
      imgPath:
        "https://image-static.segmentfault.com/252/756/2527565021-5dcc0b7e310ac_articlex",
      qrCodeUrl: {
        code: "www.boxuegu.com",
        width: 110,
        height: 110,
        x: 225,
        y: 375
      },
      list: {
        avatar: {
          imgUrl:
            "https://imgs-1253854453.image.myqcloud.com/0eff60f48db1f79f0ac43dd7fb12c56a.jpg",
          width: 50,
          height: 50,
          x: 40,
          y: 53
        },
        product: {
          imgUrl:
            "https://img.alicdn.com/imgextra/https://img.alicdn.com/imgextra/i2/3583761727/O1CN01LF2Tz51Od0YwVB0gd_!!3583761727.jpg_430x430q90.jpg",
          width: 190,
          height: 242,
          x: 90,
          y: 120
        },
        text: {
          text: "休闲圆领毛衣",
          color: "#f00",
          font: "24",
          x: 30,
          y: 400
        },
        total: {
          text: "599",
          color: "#000",
          font: "15",
          x: 90,
          y: 427
        }
      }
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // this.drawBackgroudImage();
    // this.drawAvatar();
    // this.drawProduct();
    this.drawCanvasImg();
  },

  //整体画图
  drawCanvasImg:function(){
    wx.showLoading({
      title: '加载中',
    })
    // 1.加载背景图
    this.drawBackgroudImage().then(() => {
      // 2.加载头像，产品图，文案
      Promise.all([this.drawAvatar(), this.drawProduct()]).then(() => {
        this.drawQrCodeImage();
        this.saveCanvasToLocal('qrCodeCanvas').then(localPath => {
          const qrCodeUrl = this.data.expressData.qrCodeUrl;
          context.drawImage(
            localPath,
            deviceWidth * (qrCodeUrl.x / 375),
            deviceWidth * (qrCodeUrl.y / 375),
            deviceWidth * (qrCodeUrl.width / 375),
            deviceWidth * (qrCodeUrl.height / 375),
          )
          context.draw();
          wx.hideLoading();
        })
      })
    })
  },
  
  //绘制背景图片
  drawBackgroudImage() {
    const _this = this;
    return new Promise((resolve, reject) => {
      wx.getImageInfo({
        src: _this.data.expressData.imgPath,
        success: function (res) {
          //背景图片
          context.drawImage(res.path, 0, 0, deviceWidth, bgHeight);
          resolve();
        },
        fail: function (err) {
          reject(err);
        }
      });
    });
  },

  //绘制头像
  drawAvatar(){
    const _this = this;
    return new Promise((resolve,reject) => {
      wx.getImageInfo({
        src: _this.data.expressData.list.avatar.imgUrl,
        success:function(res){
          _this.drawCircleImg(
            context,
            res.path,
            deviceWidth * (_this.data.expressData.list.avatar.x / 375),
            deviceWidth * (_this.data.expressData.list.avatar.y / 375),
            deviceWidth * (_this.data.expressData.list.avatar.width / 750)
          )
          resolve();
        },
        fail:function(err){
          reject(err)
        }
      })
    })
  },

  //绘制圆形
  drawCircleImg:function(ctx, img , x, y, r){
    ctx.save();
    let d = 2 * r;
    let cx = x + r;
    let cy = y + r;
    ctx.arc(cx, cy, r, 0, 2 * Math.PI);
    ctx.clip();
    ctx.drawImage(img,x,y,d,d);
    ctx.restore();
  },

  //绘制产品图片及文案
  drawProduct(){
    const _this  = this;
    return new Promise((resolve,reject) => {
      wx.getImageInfo({
        src: _this.data.expressData.list.product.imgUrl,
        success:function(res){
          const list = _this.data.expressData.list;
          //商品图片
          context.drawImage(
            res.path,
            deviceWidth * (list.product.x / 375),
            deviceWidth * (list.product.y / 375),
            deviceWidth * (list.product.width / 375),
            deviceWidth * (list.product.height / 375),
          )
          //绘制标题
          _this.drawText(
            context,
            list.text,
            deviceWidth * (list.text.font / 375),
            deviceWidth * (list.text.x / 375),
            deviceWidth * (list.text.y / 375),
          )
          //绘制价格
          _this.drawText(
            context,
            list.total,
            deviceWidth * (list.total.font / 375),
            deviceWidth * (list.total.x / 375),
            deviceWidth * (list.total.y / 375),
          )
          return resolve();
        },
        fail:function(err){
          reject(err);
        }
      })
    })
  },

  //绘制文案
  drawText:function(ctx, data, font, x, y){
    ctx.setFontSize(font);
    ctx.setFillStyle(data.color);
    ctx.setTextAlign("left");
    ctx.fillText(data.text, x, y)
  },

  //绘制二维码
  drawQrCodeImage(){
    drawing.qrc("qrCodeCanvas", this.data.expressData.qrCodeUrl.code, 50, 50);
  },

  //保存Canvas画布为图片
  saveCanvasToLocal(id){
    return new Promise((resolve,reject) => {
      wx.canvasToTempFilePath({
        canvasId: id,
        success:function(res){
          resolve(res.tempFilePath)
        },
        fail:function(err){
          reject(err)
        }
      })
    })
  },

  //保存朋友圈分享图
  longClick:function(){
    let _this = this;
    _this.saveCanvasToLocal('myCanvas').then(canvasPath => {
      wx.showModal({
        title: '是否保存图片',
        success:function(res){
          //点击确定按钮
          if(res.confirm){
            wx.saveImageToPhotosAlbum({
              filePath: canvasPath,
              success(res){
                wx.showToast({
                  title: '保存成功',
                  icon:"success",
                  duration: 2000
                })
              },
              fail(err){
                wx.hideToast()

                //是否打开手机图库授权
                wx.getSetting({
                  success:res =>{
                    if(!res.authSetting["scope.writePhotoAlbum"]){
                      wx.showModal({
                        title: '提示',
                        content: '保存图片需要打开手机图库授权，是否继续授权？',
                        success:function(res){
                          if(res.confirm){
                            wx.openSetting()
                          }else if(res.cancel){
                            console.log("用户已取消")
                          }
                        }
                      })
                    }
                  }
                })
              }
            })
          }else if(res.cancel){
            console.log("用户已取消")
          }
        }
      })
    })
  }
})