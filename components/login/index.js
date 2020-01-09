// components/login/index.js
import util from '../../utils/util.js'
import api from '../../config/api.js'
const app = getApp();
Component({
  /**
   * 组件的属性列表 
   */
  properties: {
    showLoginDialog:{
      type:Boolean,
      value:false
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    userInfo:{},
    showLoginDialog:false
  },

  /**
   * 组件的方法列表
   */
  methods: {
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

    // 微信登录功能
    onWechatLogin: function (e) {
      //是否成功
      console.log(e.detail.errMsg)
      if (e.detail.errMsg == "getUserInfo:ok") {
        //加载接口
        util.login().then((res) => {
          return util.request(api.AuthLoginByWeixin,
            { code: res, userInfo: e.detail },
            'POST')
        }).then((res) => {
          if (res.errno !== 0) {
            wx.showToast({
              title: '服务器错误，请稍后重试！',
            })
          } else {

            // 存储数据（用户信息，Token）
            const getUserInfo = res.data.userInfo
            const getToken = res.data.token
            app.globalData.userInfo = getUserInfo;
            app.globalData.token = getToken;
            wx.setStorageSync('userInfo', JSON.stringify(getUserInfo))
            wx.setStorageSync('token', getToken)
          }

          //子传父
          this.triggerEvent('userinfo')

          //隐藏登录框
          this.onCloseLoginDialog();

          //数据上报-成功
          util.dataEvent("login_btn", { name:"微信授权",status:"成功"})

          //阿拉丁
          util.aldEvent("login_btn", { name: "微信授权", status: "成功" })
        }).catch((err) => {
          console.log(err)

          //数据上报-失败
          util.dataEvent("login_btn", { name: "微信授权", status: "失败" })
          
          //阿拉丁
          util.aldEvent("login_btn", { name: "微信授权", status: "失败" })
        })
      } else {
        wx.showToast({
          title: '微信录制失败',
        })

        //数据上报-失败
        util.dataEvent("login_btn", { name: "微信授权", status: "失败" })

        //阿拉丁
        util.aldEvent("login_btn", { name: "微信授权", status: "失败" })
      }
    },
  }
})
