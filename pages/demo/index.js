// pages/demo/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    item:{
      content:'不错',
      nums:11
    },
    userInfo:{}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log("监听页面加载")
    // 加载字体
    wx.loadFontFace({
      family:"PingFangSC-Medium",
      source:'url(/static/font/PingFang Medium.ttf)',
      success:function(){
        console.log(" load font success")
      }
    })
    //setStorage
    wx.setStorage({
      key: 'key1',
      data: 'value1',
    })
    wx.setStorage({
      key: 'key2',
      data: 'value2',
    })
    //getStorage
    wx.getStorage({
      key: 'key1',
      success: function(res) {
        console.log(res)
      },
    })
    //removeStorage
    // wx.removeStorage({
    //   key: 'key2',
    //   success: function(res) {
    //     console.log(res,"removeStorage")
    //   },
    // })
    //clearStorage
    wx.clearStorage()


    //采用是否授权，直接获取getUserInfo
    wx.getSetting({
      success (res){
        //已授权
        if(res.authSetting['scope.userInfo']){
          //获取userInfo
          wx.getUserInfo({
            success:function(res){
              console.log(res.userInfo,"scope.userInfo")
            }
          })
        }
      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    console.log("监听页面初次渲染完成")
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    console.log("监听页面显示")
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    console.log("监听页面隐藏")
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    console.log("111")
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

  //子传父
  _up:function(e){
    console.log(e.detail,"ent")
    this.setData({
      ctx:e.detail
    })
  },

  // getuserinfo
  bindGetUserInfo:function(e){
    console.log(e,"bindGetUserInfo")
    const userInfo = e.detail.userInfo
    this.setData({
      userInfo: userInfo
    })
  }
})