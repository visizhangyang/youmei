// pages/mulv/index.js
import wxTimerFun from '../../utils/wxTime.js'
let goodsList = [
  { actEndTime: "2020/05/01 10:00:30" },
  { actEndTime: "1998/05/01 10:00:30" },
  { actEndTime: "2021/05/01 10:00:30" },
  { actEndTime: "2022/05/01 10:00:30" },
  { actEndTime: "2023/05/01 10:00:30" },
  { actEndTime: "2024/05/01 10:00:30" },
  { actEndTime: "2020/05/01 10:00:30" },
]
Page({

  /**
   * 页面的初始数据
   */
  data: {
    countDownList:[],
    actEndTimeList:[]
  },

  clearCountDown:'',
  /**
   * 生命周期函数--监听页面加载 
   */
  onLoad: function (options) {
    //开始
    wxTimerFun.wxTimer.start(this, goodsList)
  },

  //清除
  clearTimeout:function(){
    wxTimerFun.wxTimer.stop()
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

  }
})