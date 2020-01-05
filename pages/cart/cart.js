import util from '../../utils/util.js';
import api from '../../config/api.js';

Page({

  data: {
    cartGoods: [],                  //购物车商品列表
    checkedAllStatus: true,         //全选状态
    cartTotal: {
      "goodsCount": 0,              //购物车总数
      "goodsAmount": 0.00,          //购物车总价
      "checkedGoodsCount": 0,       //选择商品数量
      "checkedGoodsAmount": 0.00    //选择商品总价
    },
    showLoginDialog:false
  },

  onLoad: function (options) {
    // 页面初始化 options为页面跳转所带来的参数
    this.getCartList();
    // this.setData({
    //   cartGoods:res.data.cartList
    // })
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
  //获取购物车列表
  getCartList:function(){
    let _this = this;
    util.request(api.CartIndex).then(res => {
      if(res.errno === 0){
        _this.setData({
          cartGoods: res.data.cartList,
          cartTotal: res.data.cartTotal,
        })
      }
      //是否已全选
      _this.setData({
        checkedAllStatus: _this.isCheckedAll()
      })
    })
  },

  //判断购物车商品是否已全选
  isCheckedAll:function(){
    return this.data.cartGoods.every(function(element, index, array){
      if(element.checked == true){
        return true;
      }else{
        return false;
      }
    })
  },

  //选择商品
  checkedItem:function(event){
    let itemIndex = event.target.dataset.itemIndex;
    let _this = this;
    //选中取消接口
    util.request(api.CartChecked,{
      isChecked: _this.data.cartGoods[itemIndex].checked ? 0 : 1,
      productIds: _this.data.cartGoods[itemIndex].product_id
    },'POST').then(res => {
      if(res.errno === 0){
        _this.setData({
          cartGoods: res.data.cartList,
          cartTotal: res.data.cartTotal
        })
        //是否已全选
        _this.setData({
          checkedAllStatus: _this.isCheckedAll()
        })
      }
    })
  },

  //全部选中
  checkedAll:function(){
    let _this = this
    let productIds = this.data.cartGoods.map(function(v){
      return v.product_id
    })
    //选中取消接口
    util.request(api.CartChecked, {
      isChecked: _this.isCheckedAll() ? 0 : 1,
      productIds: productIds.join(',')
    }, 'POST').then(res => {
      if (res.errno === 0) {
        _this.setData({
          cartGoods: res.data.cartList,
          cartTotal: res.data.cartTotal
        })
        //是否已全选
        _this.setData({
          checkedAllStatus: _this.isCheckedAll()
        })
      }
    })
  },

  //减数量
  cutNumber:function(event){
    let itemIndex = event.target.dataset.itemIndex;
    let cartItem = this.data.cartGoods[itemIndex]
    let number = (cartItem.number -1 > 1) ? cartItem.number -1: 1;
    cartItem.number = number;
    this.setData({
      cartGoods: this.data.cartGoods
    });
    this.updateCart(cartItem.product_id, cartItem.goods_id, number, cartItem.id);
  },

  //加数量
  addNumber: function (event) {
    let itemIndex = event.target.dataset.itemIndex;
    let cartItem = this.data.cartGoods[itemIndex]
    let number = cartItem.number + 1 
    cartItem.number = number;
    this.setData({
      cartGoods: this.data.cartGoods
    });
    this.updateCart(cartItem.product_id, cartItem.goods_id, number, cartItem.id);
  },

  //更新购物车
  updateCart(productId,goodsId,number,id){
    let _this = this;
    util.request(api.CartUpdate,{
      productId: productId,
      goodsId: goodsId,
      number: number,
      id:id
    },'POST').then(res =>{
      if(res.errno === 0){
        _this.setData({
          cartTotal: res.data.cartTotal
        })
      }
      //是否已全选
      _this.setData({
        checkedAllStatus: _this.isCheckedAll()
      })
    })
  },

  //下单
  checkoutOrder:function(){
    let _this = this;
    let checkedGoods = this.data.cartGoods.filter(function(element,index,array){
      if(element.checked == true){
        return true;
      }else{
        return false;
      }
    })
    if(checkedGoods <= 0){
      return false;
    }

    //判断是否已登录
    const userInfo = wx.getStorageSync('userInfo');
    if (userInfo){
      wx.navigateTo({
        url: '../shopping/checkout/checkout',
      })
    }else{
      this.setData({
        showLoginDialog:true
      })
    }

  },

})