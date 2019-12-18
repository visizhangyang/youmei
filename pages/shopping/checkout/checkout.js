import util from '../../../utils/util.js';
import api from '../../../config/api.js';
import pay from '../../../services/pay.js'

Page({
  data: {
    checkedGoodsList: [],  //已选择商品列表
    checkedAddress: {},    //选择地址
    checkedCoupon: [],     //选择优惠券
    couponList: [],        //优惠券列表
    goodsTotalPrice: 0.00, //商品总价
    freightPrice: 0.00,    //快递费
    couponPrice: 0.00,     //优惠券的价格
    orderTotalPrice: 0.00,  //订单总价
    actualPrice: 0.00,     //实际需要支付的总价
    addressId: 0,          //地址ID
    couponId: 0            //优惠券ID
  },
  onLoad: function (options) {
    // 页面初始化 options为页面跳转所带来的参数
    this.getCheckoutInfo();
  },

  //获取选中商品详情
  getCheckoutInfo:function(){
    let _this = this;
    util.request(api.CartCheckout,{
      addressId: _this.data.addressId,
      couponId: _this.data.couponId
    }).then(res =>{
      if(res.errno === 0){
        _this.setData({
          checkedGoodsList: res.data.checkedGoodsList,  
          checkedAddress: res.data.checkedAddress,
          actualPrice: res.data.actualPrice,
          checkedCoupon: res.data.checkedCoupon,
          couponList: res.data.couponList,
          couponPrice: res.data.couponPrice,
          freightPrice: res.data.freightPrice,
          goodsTotalPrice: res.data.goodsTotalPrice,
          orderTotalPrice: res.data.orderTotalPrice
        })
      }
    })
  },
  
  //选择地址
  selectAddress() {
    wx.navigateTo({
      url: '/pages/shopping/address/address',
    })
  },

  //添加地址
  addAddress() {
    wx.navigateTo({
      url: '/pages/shopping/addressAdd/addressAdd',
    })
  },
  onReady: function () {
    // 页面渲染完成

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

  //去付款
  submitOrder:function(){
    const addressId = this.data.checkedAddress.id;
    if (addressId <= 0){
      wx.showToast({
        title: '请选择收货地址',
      }) 
      return false;
    }
    //提交订单接口
    util.request(api.OrderSubmit,{
      addressId: addressId,
      couponId: this.data.couponId
    },'POST').then(res =>{
      if(res.errno == 0){ 
        const orderId = res.data.orderInfo.id;
        //获取微信统一下单prepay_id
        pay.payOrder(parseInt(orderId)).then(res => {
          wx.redirectTo({
            url: '/pages/payResult/payResult?status=1&orderId' + orderId,
          })
        }).catch(err =>{
          wx.redirectTo({
            url: '/pages/payResult/payResult?status=0&orderId' + orderId,
          })
        })
      }else{
        wx.showToast({ 
          title: '下单失败',
        })
      }
    })
  },
  
  //复制至剪贴板
  setClipboardData:function(event){
    let orderId = event.currentTarget.dataset.orderid;
    wx.setClipboardData({
      data: orderId,
      success(res){
        wx.getClipboardData({
          success(res){
            console.log(res.data)
          }
        })
      }
    })
  }
})