const util = require('../../../utils/util.js');
const api = require('../../../config/api.js');
const user = require('../../../services/user.js');
const app = getApp();

Page({
  data: {
    userInfo: {},
    showLoginDialog:false
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
  showLoginDialog(){
    this.setData({
      showLoginDialog:true
    })
  },

  //隐藏登录模块
  onCloseLoginDialog() {
    this.setData({
      showLoginDialog: false
    })
  },

  // 微信登录功能
  onWechatLogin:function(e){
    //是否成功
    console.log(e.detail.errMsg)
    if (e.detail.errMsg == "getUserInfo:ok"){
      //加载接口
      util.login().then((res) =>{
        return util.request(api.AuthLoginByWeixin,
               {code:res,userInfo:e.detail},
               'POST')
      }).then((res) =>{
        if(res.errno !== 0){
          wx.showToast({
            title: '服务器错误，请稍后重试！',
          })
        }else{
          //设置用户信息
          this.setData({
            userInfo: res.data.userInfo,
            showLoginDialog: false
          })

          // 存储数据（用户信息，Token）
          const getUserInfo = res.data.userInfo
          const getToken = res.data.token
          app.globalData.userInfo = getUserInfo;
          app.globalData.token = getToken;
          wx.setStorageSync('userInfo', JSON.stringify(getUserInfo))
          wx.setStorageSync('token', getToken)
        }
      }).catch((err) =>{
        console.log(err)
      })
    }else{
      wx.showToast({
        title: '微信录制失败',
      })
    }
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