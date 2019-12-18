// components/demo/index.js
Component({
  options:{
    multipleSlots: true //此处为多个solt启用
  },
  /**
   * 组件的属性列表
   */
  properties: {
    url:{
      type: String,
      value: ''
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    url:''
  },

  /**
   * 组件的方法列表
   */

  methods: {
    upEvent:function(e){
      this.triggerEvent('up',"你好！")
    }
  },

  lifetimes:{
    created:function(){
      console.log("1")
    },
    attached:function(){
      console.log("2")
    },
    ready:function(){
      console.log("3")
    }
  }
})
