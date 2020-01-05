// pages/index/index.js
import util from '../../utils/util.js'
import api from '../../config/api.js'
import shareList from '../../utils/shareList.js'
// import jsBase64 from 'js-base64';
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
    topics:[],    // 专题精选 
    query: {
      bg_color: "orange",
      color: "#000",
      flag: 0,
      name: "首页"
    } 
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
      //缓存
      wx.setStorage({
        key: 'goodsCount',
        data: res.data.goodsCount,
      })
    })

    //加密解密
    // console.log(jsBase64.Base64.encode("haha"),"加密");
    // console.log(jsBase64.Base64.decode("aGFoYQ=="),"解密")
  },

  //声明变量
  scrollStatus:false,

  //倒计时显示
  onPageScroll:function(e){
    //增加scrollStatus中间状态来判断
    if (e.scrollTop > 120) {
      this.scrollStatus = true
    } else {
      this.scrollStatus = false
    }

    //中间状态与scrollTop比较
    if(this.scrollStatus != this.data.scrollTop){
      this.setData({
        scrollTop:!this.data.scrollTop
      })
    }
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
    let shareHome = shareList.shareFun('home');
    return {
      title: shareHome.title,
      path:'/pages/index/index',
      imageUrl: shareHome.imgUrl,
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