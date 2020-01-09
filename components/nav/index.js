Component({
  properties: {
   myProperty:{
     type: Object,
     value:{
       "bg_color":"orange",   //背景颜色
       "color":"#000000",     //字体颜色
       "flag":1,              //显示图标类型
       "name":"我的是标题"      //标题

     }
   }
  },
  data: {

  }, // 私有数据，可用于模版渲染

  lifetimes: {
    // 生命周期函数，可以为函数，或一个在methods段中定义的方法名
    attached: function () { },
    moved: function () { },
    detached: function () { },
  },

  // 生命周期函数，可以为函数，或一个在methods段中定义的方法名
  attached: function () { }, // 此处attached的声明会被lifetimes字段中的声明覆盖
  ready: function () {
    var that = this;
    wx.getSystemInfo({
      success(res) {
        that.setData({
          "commonHeadHeight.statusBarHeight": (34 * 2),
          "commonHeadHeight.titleHeight": res.statusBarHeight + 46
        });

      }
    })
  },

  pageLifetimes: {
    // 组件所在页面的生命周期函数
    show: function () {

    },
  },

  methods: {
    commonHead_left_back:function(){
      //返回按钮
      wx.navigateBack();
    },
    commonHead_left_home:function(){
      //首页按钮
      wx.reLaunch({
        url: '/pages/index/index',
      })
    }
  }

})