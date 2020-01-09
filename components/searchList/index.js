// components/searchList/index.js
import util from '../../utils/util.js'
import api from '../../config/api.js'
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    keyword:{
      type:String,
      value:''
    },
    searchStatus:{
      type:Boolean,
      value:false
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    defaultKeyword: {},
    historyKeyword: [],
    hotKeyword: [],
    categoryFilter: false,
    currentSortType: 'default',
    currentSortOrder: '',
    filterCategory: [],
    page: 1,
    size: 20,
    categoryId: 0,
    noDataIcon: "http://yanxuan.nosdn.127.net/hxm/yanxuan-wap/p/20161201/style/img/icon-normal/noSearchResult-7572a94f32.png"

  },

  //监听keyword关键词
  observers:{
    'keyword':function(){
      if(this.data.keyword){
        this.getGoodsList()
      }
    }
  },

  /**
   * 组件的方法列表
   */
  methods: {
    // 获取搜索列表
    getGoodsList: function () {
      let _this = this;
      util.request(api.SearchGoodsList,
        {
          keyword: _this.data.keyword,
          page: _this.data.page,
          size: _this.data.size,
          sort: _this.data.currentSortType,
          order: _this.data.currentSortOrder,
          categoryId: _this.data.categoryId
        }).then((res) => {
          if (res.errno === 0) {
            _this.setData({
              searchStatus: true,
              categoryFilter: false,
              goodsList: res.data.goodsList,
              filterCategory: res.data.filterCategory,
              page: res.data.currentPage,
              size: res.data.pageSize
            })
          }
        })
    },

    //点击搜索二级分类
    openSortFilter: function (event) {
      console.log(event, "event")
      let currentId = event.currentTarget.id;
      switch (currentId) {
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
          if (this.data.currentSortOrder == 'asc') {
            tmpSortOrder = 'desc'
          }
          this.setData({
            'currentSortType': 'price',
            'currentSortOrder': tmpSortOrder,
            'categoryFilter': false
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
    setectCategory: function (event) {
      let currentIndex = event.currentTarget.dataset.categoryIndex;
      let filterCategory = this.data.filterCategory;
      let currentCategory = null;
      for (let key in filterCategory) {
        if (key == currentIndex) {
          filterCategory[key].selected = true;
          currentCategory = filterCategory[key]
        } else {
          filterCategory[key].selected = false
        }
      }
      this.setData({
        'filterCategory': filterCategory,
        'categoryFilter': false,
        categoryId: currentCategory.id,
        page: 1,
        goodsList: []
      })

      this.getGoodsList();
    }
  }
})
