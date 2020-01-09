// components/moduleA/index.js
import { behaviors } from '../../utils/behavior.js'
Component({
  /**
   * 组件的属性列表
   */
  behaviors: [ behaviors ], //继承behavior.js里面的properties,data,methods
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    onTap(ev){
      let { address, type } = ev.target.dataset;
      this.behaviorTap(address, type)   //通过this访问behavior.js当中的内容
    }
  }
})
