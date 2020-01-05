const util = require('../../../utils/util.js');
const api = require('../../../config/api.js');
const user = require('../../../services/user.js');
const app = getApp();
 
Page({
  data: {
    userInfo: {},
    showLoginDialog:true
  },
  onLoad: function (options) {
    // 页面初始化 options为页面跳转所带来的参数
    const getNickName = wx.getStorageSync('userInfo')
    if (getNickName){
      this.setData({ 
        showLoginDialog: false 
      })  
    }
  },

  //重新加载数据
  reload:function(){
    this.onShow();
  },
  onReady: function () {

  },
  onShow: function () {
    this.setData({
      userInfo: app.globalData.userInfo,
    });
  },
  onHide: function () {
    // 页面隐藏

  },
  onUnload: function () {
    // 页面关闭
  },

  onDialogBody() {
    // 阻止冒泡
  },

  onOrderInfoClick: function (event) {
    wx.navigateTo({
      url: '/pages/ucenter/order/order',
    })
  },

  onSectionItemClick: function (event) {

  },

  // 点击事件
  onUserInfoClick:function(){
    if(!wx.getStorageSync('token')){
      //显示登录模块
      this.showLoginDialog();
    }
  },

  //显示登录模块
  showLoginDialog() {
    this.setData({
      showLoginDialog: true
    })
  },

  //隐藏登录模块
  onCloseLoginDialog() {
    this.setData({
      showLoginDialog: false
    })
  },
  
  // 退出登录
  exitLogin: function () {
    wx.showModal({
      title: '',
      confirmColor: '#d32f34',
      content: '退出登录？',
      success: function (res) {
        if (res.confirm) {
          wx.removeStorageSync('token');
          wx.removeStorageSync('userInfo');
          wx.switchTab({
            url: '/pages/index/index'
          });
        }
      }
    })

  }
})