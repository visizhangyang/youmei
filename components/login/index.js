// comments/login/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    userInfo: {
      type: Object,
      value: {}
    },
    showLoginDialog:{
      type: Boolean,
      value: false
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    userInfo: {},
    showLoginDialog: false
  },


  onUserInfoClick: function () {
    if (wx.getStorageSync('token')) {

    } else {
      this.showLoginDialog();
      console.log(11111)
    }
  },

  showLoginDialog() {
    this.setData({
      showLoginDialog: true
    })
  },

  onCloseLoginDialog() {
    this.setData({
      showLoginDialog: false
    })
  },

  /**
   * 组件的方法列表
   */
  methods: {

  }
})
