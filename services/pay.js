import util from '../utils/util.js'
import api from '../config/api.js'

//支付订单 
function payOrder(orderId){
  return new Promise(function(resolve, reject){
    util.request(api.PayPrepayId,{orderId:orderId}).then(res =>{
      if(res.errno === 0){
        const payParam =  res.data;
        wx.requestPayment({
          timeStamp: payParam.timeStamp,
          nonceStr: payParam.nonceStr,
          package: payParam.package,
          signType: payParam.signType,
          paySign: payParam.paySign,
          success:function(res){
            resolve(res)
          },
          fail:function(err){
            reject(err)
          },
          complate:function(res){
            reject(res)
          }
        }) 
      }else{
        reject(res)
      }
    })
  })
}

module.exports = {
  payOrder
}