const app = getApp();
import util from '../../utils/util.js';
import api from '../../config/api.js';
import Wxparse from '../../lib/wxParse/wxParse.js'

Page({
  data: {
    id: 0,
    goods: {},        //商品详情
    gallery: [],      //展示图
    attribute: [],    //选择属性
    issueList: [],    //问题列表
    comment: [],      //评价
    brand: {},        //品牌
    specificationList: [],  //属性列表
    productList: [],        //详情列表
    relatedGoods: [],       //关联商品
    cartGoodsCount: 0,      //购物车商品数量
    userHasCollect: 0,      //用户收藏
    number: 1,              //商品数量
    checkedSpecText: '请选择规格数量',
    openAttr: false,        //打开属性框
    noCollectImage: "/static/images/icon_collect.png",
    hasCollectImage: "/static/images/icon_collect_checked.png",
    collectBackImage: "/static/images/icon_collect.png"
  },

  //详情页数据
  getGoodsInfo: function () {
    let _this = this;
    util.request(api.GoodsDetail,{id:_this.data.id}).then(res =>{
      if(res.errno === 0){
        _this.setData({
          goods: res.data.info,
          gallery: res.data.gallery,
          attribute: res.data.attribute,
          issueList: res.data.issue,
          comment: res.data.comment,
          brand: res.data.brand,
          specificationList: res.data.specificationList,
          productList: res.data.productList,
          userHasCollect: res.data.userHasCollect
        });
      }

      //插入内容
      Wxparse.wxParse('goodsDetail','html',res.data.info.goods_desc, _this)

      //商品推荐
      _this.getGoodsRelated();
    })
  },

  //商品推荐
  getGoodsRelated(){
    let _this = this;
    util.request(api.GoodsRelated,{id:_this.data.id}).then( res =>{
      if(res.errno ===0){
        _this.setData({
          relatedGoods: res.data.goodsList
        })
      }
    }) 
  },

  //购物车商品总数
  cartGoodsCount(){
    let _this = this;
    util.request(api.CartGoodsCount).then(res =>{
      if(res.errno === 0){
        _this.setData({
          cartGoodsCount: res.data.cartTotal.goodsCount
        })
      }
    })
  },

  // 添加取消收藏商品
  addCannelCollect(){
    let _this = this;
    util.request(api.Addordelete,{goodsId: this.data.id},'POST').then(res => {
      if(res.errno === 0){
        // type add 添加成功
        // type detete 取消成功
        if(res.data.type == 'add'){
          _this.setData({
            'collectBackImage': _this.data.hasCollectImage
          })
          //提示框
          wx.showToast({
            title: '添加成功',
          })
        }else{
          _this.setData({
            'collectBackImage': _this.data.noCollectImage
          })
          //提示框
          wx.showToast({
            title: '取消成功',
          })
        }
      }else{
        wx.showToast({
          image:'/static/images/icon_errot.png',
          title: res.errmsg,
          mask: true
        })
      }
    })
  },

  onLoad: function (options) {
    //页面初始化，options跳转所带来的参数
    this.setData({
      id: parseInt(options.id)
      //id:118800
    })

    //加载详情页数据
    this.getGoodsInfo();

    //加载购物车商品总数
    this.cartGoodsCount();

    //相关推荐数据
    // this.setData({
    //   relatedGoods: related.data.goodsList,
    // });


    //购物车总数
    // this.setData({
    //   cartGoodsCount: cartRes.data.cartTotal.goodsCount
    // });


    //商品详情数据    
    // this.setData({
    //   goods: res.data.info,
    //   gallery: res.data.gallery,
    //   attribute: res.data.attribute,
    //   issueList: res.data.issue,
    //   comment: res.data.comment,
    //   brand: res.data.brand,
    //   specificationList: res.data.specificationList,
    //   productList: res.data.productList,
    //   userHasCollect: res.data.userHasCollect
    // });
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

  //跳转购物车页面
  gotoCartPage(){
    wx.switchTab({
      url: '/pages/cart/cart',
    })
  },

  //加入购物车
  addToCart(){
    let _this = this;
    if(this.data.openAttr === false){
      //打开规格选择框
      this.setData({
        openAttr: !this.data.openAttr
      })
    }else{
      // 逻辑实现

      // 1 提示选择完整规格
      if (!this.isCheckedAllSpec()){
        wx.showToast({
          image:'/static/images/icon_error.png',
          title: '请选择规格',
          mask:true
        })
        return false
      }

      // 2根据选中的规格，判断是否有对应的sku信息
      let checkedProduct = this.getCheckedProductItem(this.getCheckedSpecKey());
      if (!checkedProduct || checkedProduct.length <= 0 || checkedProduct.goods_number < this.data.number) {
        //找不到对应的product信息，提示没有库存
        wx.showToast({
          image: '/static/images/icon_error.png',
          title: '库存不足',
          mask: true
        });
        return false
      }


      //添加到购物车接口
      util.request(api.CartAdd,{
        goodsId: this.data.goods.id,
        number: this.data.number,
        productId: checkedProduct[0].id
      },'POST').then(res =>{
        if(res.errno === 0 ){
          wx.showToast({
            title: '添加成功',
          })
          _this.setData({
            openAttr: !_this.data.openAttr,
            cartGoodsCount: res.data.cartTotal.goodsCount
          })
        }else{
          wx.showToast({
            title: res.errmsg,
            image:'/static/images/icon_error.png',
            mask:true
          })
        }
      })
    }
  },

  //关闭属性框
  closeAttr:function(){
    this.setData({
      openAttr:false
    })
  },

  //判断规格是否选择完整
  isCheckedAllSpec:function(){
    return !this.getCheckedSpecValue().some(function(v){
      if(v.valueId == 0){
        return true
      }
    })
  },

  //获取选中的规格信息
  getCheckedSpecValue:function(){
    let checkedValues =[];
    let _specificationList = this.data.specificationList;
    for (let i = 0; i < _specificationList.length; i++){
      let _checkedObj ={
        nameId: _specificationList[i]._specification_id,
        valueId:0,
        valueText:''
      };
      for (let j = 0; j < _specificationList[i].valueList.length; j++){
        if (_specificationList[i].valueList[j].checked){
          _checkedObj.valueId = _specificationList[i].valueList[j].id,
            _checkedObj.valueText = _specificationList[i].valueList[j].value
        }
      }
      checkedValues.push(_checkedObj);
    }

    return checkedValues;
  },

  //获取选择商品属性
  getCheckedProductItem: function (key) {
    return this.data.productList.filter(function (v) {
      if (v.goods_specification_ids == key) {
        return true;
      } else {
        return false;
      }
    });
  },
  //获取选中商品key
  getCheckedSpecKey: function () {
    let checkedValue = this.getCheckedSpecValue().map(function (v) {
      return v.valueId;
    });

    return checkedValue.join('_');
  },

  //点击选择SKU商品
  clickSkuValue:function(event){
    let _this = this;
    let specNameId = event.currentTarget.dataset.nameId;
    let specValueId = event.currentTarget.dataset.valueId;

    let _specificationList = this.data.specificationList;
    for (let i = 0; i < _specificationList.length; i++) {
      if (_specificationList[i].specification_id == specNameId) {
        for (let j = 0; j < _specificationList[i].valueList.length; j++) {
          if (_specificationList[i].valueList[j].id == specValueId) {
            //如果已经选中，则反选
            if (_specificationList[i].valueList[j].checked) {
              _specificationList[i].valueList[j].checked = false;
            } else {
              _specificationList[i].valueList[j].checked = true;
            }
          } else {
            _specificationList[i].valueList[j].checked = false;
          }
        }
      }
    }
    this.setData({
      'specificationList': _specificationList
    });
    //重新计算spec改变后的信息
    this.changeSpecInfo();
  },


  //变化商品信息
  changeSpecInfo(){
    let checkedNameValue = this.getCheckedSpecValue();

    //设置选择的信息
    let checkedValue = checkedNameValue.filter(function(v){
      if(v.valueId != 0){
        return true;
      }else{
        return false;
      }
    }).map(function(v){
      return v.valueText
    })

    if (checkedValue.length > 0){
      this.setData({
        'checkedSpecText': checkedValue.join(' ')
      })
    }else{
      this.setData({
        'checkedSpecText': '请选择规格数量'
      })
    }
  },

  //减数量
  cutNumber:function(){
    this.setData({
      number: (this.data.number - 1 > 1) ? this.data.number - 1: 1
     })
  },

  //加数量
  addNumber: function () {
    this.setData({
      number: this.data.number + 1 
    })
  },

  //显示商品图片
  showPreview: function (event) {
    const currentUrl = event.currentTarget.dataset.currenturl;
    let imgList = []
    //遍历
    for (const item of this.data.gallery) {
      imgList.push(item.img_url)
    }
    //预览图片
    wx.previewImage({
      current: currentUrl,
      urls: imgList,
    })
  },

  //分享功能
  onShareAppMessage: function () {
    return {
      title: this.data.goods.name,
      desc: this.data.goods.goods_brief,
      path: '/pages/goods/goods?id=' + this.data.id,
      imgageUrl: this.data.gallery[0].img_url
    }
  },
})