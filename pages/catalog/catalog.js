import util from '../../utils/util.js'
import api from '../../config/api.js'

Page({
  data: {
    navList: [],     //左侧一级分类
    currentCategory: {},    //右侧二级分类
    scrollLeft: 0,
    scrollTop: 0,
    goodsCount: 0,
    scrollHeight: 0
  },
  onLoad: function (options) {
    this.getCatalog();
  },

  //获取分类数据
  getCatalog:function(){
    let _this = this;
    wx.showLoading({
      title: '加载中...',
    })
    //调用分类数据接口
    util.request(api.CatalogList).then((res)=>{
      _this.setData({
        navList: res.data.categoryList,
        currentCategory: res.data.currentCategory
      })
      //隐藏Loading
      wx.hideLoading(); 
    })

    //获取商品总数
    let goodsCount = wx.getStorageSync('goodsCount')
    if (goodsCount){
      this.setData({
        goodsCount: goodsCount
      })
    }else{
      util.request(api.GoodsCount).then((res) => {
        _this.setData({
          goodsCount: res.data.goodsCount
        })
      })
    }
  },
 
  //加载二级数据
  getCurrentCategory:function(id){
    let _this = this;
    util.request(api.CatalogCurrent, { id: id }).then((res) =>{
      console.log(res,"res")
      _this.setData({
        currentCategory: res.data.currentCategory
      })
    })
  },

  // 点击一级分类
  switchcate:function(event){
    let _this = this;
    const currentTarget = event.currentTarget.dataset.id;
    if (this.data.currentCategory.id == currentTarget){
      return false
    }
    this.getCurrentCategory(currentTarget)
  },

  switchCate: function (event) {
    var that = this;
    var currentTarget = event.currentTarget;
    if (this.data.currentCategory.id == event.currentTarget.dataset.id) {
      return false;
    }
    this.getCurrentCategory(event.currentTarget.dataset.id);
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

})