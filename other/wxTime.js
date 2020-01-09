
let that= '';

let wxTimer = {
  endTimeList:[],
  clearCountDown:'',
  //开始执行
  start: function(_this, getListData){
    that = _this;
    // 将活动的结束时间参数提成一个单独的数组，方便操作
    getListData.forEach(o => { this.endTimeList.push(o.actEndTime) })
    _this.setData({ actEndTimeList: this.endTimeList });
    // 执行倒计时函数
    this.countDown(_this);
  },
  // 倒计时
  countDown:function(_this) {//倒计时函数
    // 获取当前时间，同时得到活动结束时间数组
    let newTime = new Date().getTime();
    let endTimeList =  that.data.actEndTimeList;
    let countDownArr = [];
    // 对结束时间进行处理渲染到页面
    endTimeList.forEach(o => {
      let endTime = new Date(o).getTime();
      let obj = null;
      // 如果活动未结束，对时间进行处理
      if (endTime - newTime > 0) {
        let time = (endTime - newTime) / 1000;
        // 获取天、时、分、秒
        let day = parseInt(time / (60 * 60 * 24));
        let hou = parseInt(time % (60 * 60 * 24) / 3600);
        let min = parseInt(time % (60 * 60 * 24) % 3600 / 60);
        let sec = parseInt(time % (60 * 60 * 24) % 3600 % 60);
        obj = {
          day: timeFormat(day),
          hou: timeFormat(hou),
          min: timeFormat(min),
          sec: timeFormat(sec)
        }
      } else {//活动已结束，全部设置为'00'
        obj = { 
          day: '00',
          hou: '00',
          min: '00',
          sec: '00'
        }
      }
      countDownArr.push(obj);
    })
    // 渲染，然后每隔一秒执行一次倒计时函数
    that.setData({ countDownList: countDownArr })
    this.clearCountDown = setTimeout(this.countDown.bind(this), 1000);
  },

  //清除setTimeout
  stop:function() {
    clearTimeout(this.clearCountDown)
  }
}

//时间格式
function timeFormat(param) {//小于10的格式化函数
  return param < 10 ? '0' + param : param;
}

//导出
module.exports = {
  wxTimer
};
