// pages/mulv/index.js
import util from '../../utils/util.js'
import api from '../../config/api.js'

Page({

  /**
   * 页面的初始数据
   */
  data: {
      keyword:"",
      defaultKeyword:{},
      searchStatus:false,   //显示状态
      historyKeyword:[],
      hotKeyword:[],
      categoryFilter:false,
      currentSortType:'default',
      currentSortOrder:'',
      filterCategory:[],
      page:1,
      size:20,
      categoryId:0,
searchIcon:"http://nos.netease.com/mailpub/hxm/yanxuan-wap/p/20150730/style/img/icon-normal/search2-2fb94833aa.png",
    deteleIcon:"http://nos.netease.com/mailpub/hxm/yanxuan-wap/p/20150730/style/img/icon-normal/clearIpt-f71b83e3c2.png",
    historyDeteleIcon:"http://nos.netease.com/mailpub/hxm/yanxuan-wap/p/20150730/style/img/icon-normal/del1-93f0a4add4.png",
    noDataIcon:"http://yanxuan.nosdn.127.net/hxm/yanxuan-wap/p/20161201/style/img/icon-normal/noSearchResult-7572a94f32.png"
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //获取历史记录与热门搜索
    this.getSearchKeyword();
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

  },

  // input关键词
  inputChange:function(e){
    console.log("111")
    this.setData({
      keyword:e.detail.value,
      searchStatus:false
    })
  },

  // input focus
  inputFocus:function(){
    this.setData({
      goodsList:[],
      searchStatus:false
    })
  },

  //点击列表关键词
  onKeywordTap:function(event){
    this.getSearchResult(event.target.dataset.keyword);
  },

  // 点击搜索按钮
  onKeywrodConfirm:function(event){
    console.log(event,"event")
    this.getSearchResult(event.detail.value)
  },

  // 搜索结果方法
  getSearchResult(keyword){
    this.setData({
      keyword:keyword,
      page:1,
      categoryId:0,
      goodsList:[]
    })
    //请求列表数据
    this.getGoodsList();
  },

  // 获取搜索列表
  getGoodsList:function(){
    let _this = this;
    util.request(api.SearchGoodsList,
    {
      keyword: _this.data.keyword,
      page:_this.data.page,
      size:_this.data.size,
      sort:_this.data.currentSortType,
      order:_this.data.currentSortOrder,
      categoryId:_this.data.categoryId
    }).then((res) => {
      if(res.errno === 0){
        _this.setData({
            searchStatus: true,
            categoryFilter: false,
            goodsList: res.data.goodsList,
            filterCategory: res.data.filterCategory,
            page: res.data.currentPage,
            size:res.data.pageSize
        })
      }
    })
    //重新获取历史记录
    _this.getSearchKeyword();
  },

  // 接口请求方法
  getSearchKeyword:function(){
    let _this = this;  
    util.request(api.SearchIndex).then((res)=>{
      if(res.errno === 0){
        _this.setData({
          defaultKeyword: res.data.defaultKeyword,
          historyKeyword: res.data.historyKeywordList,
          hotKeyword: res.data.hotKeywordList
        })
      }
    })
  },

  // 清除历史记录
  clearHistory:function(){
    this.setData({
      historyKeyword:[]
    })
    //清除数据库
    util.request(api.ClearHistory,{},'POST').then((res) =>{
      if(res.errno === 0){
        wx.showToast({
          title: '删除成功',
        })
      }
    })
  },

  //点击搜索二级分类
  openSortFilter:function(event){
    console.log(event,"event")
    let currentId = event.currentTarget.id;
    switch (currentId){
      //分类
      case 'categoryFilter':
      this.setData({
        'categoryFilter': !this.data.categoryFilter,
        'currentSortOrder': 'asc'
      });
      break;
      //价格
      case 'priceSort':
      let tmpSortOrder = 'asc';
        if (this.data.currentSortOrder == 'asc'){
          tmpSortOrder = 'desc'
        }
      this.setData({
        'currentSortType':'price',
        'currentSortOrder': tmpSortOrder,
        'categoryFilter':false
      })  
      this.getGoodsList();
      break;
      //综合
      default:
        this.setData({
          'currentSortType': 'default',
          'currentSortOrder': 'desc',
          'categoryFilter': false
        })
        this.getGoodsList();
        break;
    }
  },
  //选择搜索分类 
  setectCategory:function(event){
    let currentIndex = event.currentTarget.dataset.categoryIndex;
    let filterCategory = this.data.filterCategory;
    let currentCategory = null;
    for (let key in filterCategory){
      if(key == currentIndex){
        filterCategory[key].selected = true;
        currentCategory = filterCategory[key]
      }else{
        filterCategory[key].selected = false
      }
    }
    this.setData({
      'filterCategory' : filterCategory,
      'categoryFilter': false,
      categoryId: currentCategory.id,
      page:1,
      goodsList:[]
    })

    this.getGoodsList();
  }

})