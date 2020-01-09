//创建behavior共moudleA和moudleB组件调用
let behaviors = Behavior({
  //共享属性
  properties:{
    address: String,
    type: String
  },
  //共享数据
  data:{
    selectedAddress:'',
    selectedType:''
  },
  //共享方法
  methods:{
    behaviorTap(address,type){
      this.setData({
        selectedAddress:address,
        selectedType:type
      })
    }
  }
})

//导出
export { behaviors }