import util from '../../../utils/util.js'
import api from '../../../config/api.js'

Page({
  data:{
    orderList: []   //订单列表
  },
  onLoad:function(options){
    // 页面初始化 options为页面跳转所带来的参数
    this.getOrderList();
  },

  //获取订单列表
  getOrderList:function(){
    let _this = this;
    util.request(api.OrderList).then(res => {
      if(res.errno === 0){
        _this.setData({ 
          orderList: res.data.data
        })
      }
    })
  }, 

  //去付款
  payOrder:function(event){
    const index = event.currentTarget.dataset.index;
    const item = this.data.orderList[index];
    wx.redirectTo({
      url: '/pages/pay/pay?orderId='+item.goodsList[0].order_id + '&actualPrice='+item.actual_price
    })
  },

  onReady:function(){
    // 页面渲染完成
  },
  onShow:function(){
    // 页面显示
  },
  onHide:function(){
    // 页面隐藏
  },
  onUnload:function(){
    // 页面关闭
  }
})