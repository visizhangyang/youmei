import util from '../../utils/util.js';
import api from '../../config/api.js';
import pay from '../../services/pay.js'

Page({
  data: {
    orderId:0,
    status:false
  },
  onLoad: function (options) {
    // 页面初始化 options为页面跳转所带来的参数
    this.setData({
      orderId: options.orderId || 24, 
      status: options.status
    })
  },
  onReady: function () {

  },
  onShow: function () {
    // 页面显示

  },
  onHide: function () {
    // 页面隐藏
 
  },
  onUnload: function () {
    // 页面关闭

  },

  //重新付款
  payOrder:function(){
    pay.payOrder(parseInt(this.data.orderId)).then(res => {
      this.setData({
        status:ture
      });
    }).catch(err =>{
      wx.showToast({
        title: '支付失败',
      })
    })
  }
})