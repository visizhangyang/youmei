import util from '../../utils/util.js'
import api from '../../config/api.js'

Page({
    data: {
      topicList: [],
      page:1,
      size:10,
      showBottom:false
    },
    onLoad: function (options) {
      this.getTopic()

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

    //触底加载数据
    onReachBottom(){
      this.getTopic();
    },

    //加载列表接口
    getTopic:function(){
      let _this = this;
      //loading
      wx.showToast({
        title: '加载中...',
        icon:'loading',
        duration:4000
      })
      //加载数据
      util.request(api.TopicList,{
        page:_this.data.page,
        size:_this.data.size
      }).then((res) => {
        if(res.errno === 0){
          let topicListData = _this.data.topicList;
          let getTopicList = res.data.data;
          if(getTopicList != 0){
            _this.setData({
              topicList:topicListData.concat(getTopicList),
              page:parseInt(_this.data.page) + 1
            })
          }else{
            _this.setData({
              showBottom:true
            })
          }
        }

        //隐藏显示框
        wx.hideToast()
      })
    }
    
})