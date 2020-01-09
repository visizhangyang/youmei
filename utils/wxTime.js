let that = ""
let wxTimer = {
  clearCountDown:'',
  endTimeList:[],
  //start
  start:function(_this, getListData){
    that = _this
    //将结束时间提取成一个单独数组
    getListData.forEach(o => this.endTimeList.push(o.actEndTime))
    that.setData({
      actEndTimeList: this.endTimeList
    })
    //调用倒计时
    this.countDown();
  },
  //倒计时函数
  countDown() {
    //获得当前时间，同时得到活动结束时间数据
    let newTime = new Date().getTime();
    let endTimeList = that.data.actEndTimeList;
    let countDownArr = [];

    //对结束时间进行处理渲染到页面
    endTimeList.forEach(o => {
      let endTime = new Date(o).getTime();
      let obj = null;
      //如果活动未结束，对时间处理
      if (endTime - newTime > 0) {
        let time = (endTime - newTime) / 1000;
        //获取天、时、分、秒
        let day = parseInt(time / (60 * 60 * 24));
        let hou = parseInt(time % (60 * 60 * 24) / 3600);
        let min = parseInt(time % (60 * 60 * 24) % 3600 / 60);
        let sec = parseInt(time % (60 * 60 * 24) % 3600 % 60);
        obj = {
          day: this.timeFormat(day),
          hou: this.timeFormat(hou),
          min: this.timeFormat(min),
          sec: this.timeFormat(sec)
        }
      } else {
        obj = {
          day: '00',
          hou: '00',
          min: '00',
          sec: '00'
        }
      }

      countDownArr.push(obj)
    })

    // 渲染并执行倒计时
    that.setData({
      countDownList: countDownArr
    })
    this.clearCountDown = setTimeout(this.countDown.bind(this), 1000)
  },

  //时间格式
  timeFormat(param) {
    //小于10的格式化函数
    return param < 10 ? '0' + param : param
  },

  //stop
  stop:function(){
    clearTimeout(this.clearCountDown)
  }
}

module.exports = {
  wxTimer
}