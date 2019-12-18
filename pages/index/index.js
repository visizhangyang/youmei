// pages/index/index.js
import util from '../../utils/util.js'
import api from '../../config/api.js'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    goodsCount: 0,// 商品总数
    banner:[],   // banner数据
    channel: [], // 分类数据
    brands:[],   // 品牌
    hotGoods:[], // 人气推荐
    topics:[]    // 专题精选 
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let _this = this;
    //获取首页数据
    this.getIndexData();

    //商品总数查询
    util.request(api.GoodsCount).then((res) => {
      _this.setData({
        goodsCount: res.data.goodsCount
      })
    })
  },


  getIndexData:function(){
    let _this = this;
    util.request(api.IndexUrl).then((res) => {
      if (res.errno == 0) {
        _this.setData({
          banner: res.data.banner,
          channel: res.data.channel,
          brands: res.data.brandList,
          hotGoods: res.data.hotGoodsList,
          topics: res.data.topicList
        })
      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    return {
      title:"邀请函",
      path:'/pages/index/index',
      imageUrl:"/static/images/banner-3.jpeg",
      success:function(res){
        //转发成功
        if(res.errMsg == 'shareAppMessage:ok'){

        }
      },
      fail:function(err){
        //转发失败
        if(err.errMsg == 'shareAppMessage:fail'){

        }
        //用户取消转发
        else if(err.errMsg == 'shearAppMessage fail cancel'){

        }
      }
    }
  },

  searchFun:function(e){
    console.log(e)
    wx.navigateTo({
      url: '/pages/search/search',
    })
  }
})