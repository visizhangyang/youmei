// import PUBLIC from './Util.js';

//分享数据
let shareListArr = {
	/*
	*商城首页
	*/
	mallHome: [
		{ title: "快来捡漏！厂家正在甩卖换季、库存、断码尾货商品...", imgUrl: "http://static.doudoubianli.com/share/imgs/index_mall.png" },
		{ title: "我买了好多库存尾货，比完价才知道，太划算了！快去...", imgUrl: "http://static.doudoubianli.com/share/imgs/mall_goods.png" },
		{ title: "我不到1个月就赚了几千块，比上班赚的还多！你看看...", imgUrl: "http://static.doudoubianli.com/share/imgs/index_money.png" },
		{ title: "我在这里又免费拿闲置，又赚钱，真是神奇，你能打开吗...", imgUrl: "http://static.doudoubianli.com/share/imgs/index_all.png" }
	],
  /*
  **详情页
  */
  detail: [
    { title: "快来捡漏！厂家正在甩卖换季、库存、断码尾货...", imgUrl: "http://static.doudoubianli.com/share/imgs/index_mall.png" },
    { title: "我不到1个月就赚了几千块，比上班赚的还多！你看看...", imgUrl: "http://static.doudoubianli.com/share/imgs/index_money.png" },
    { title: "我在这里又免费拿闲置，又赚钱，真是神奇，你能打开吗...", imgUrl: "http://static.doudoubianli.com/share/imgs/index_all.png" }
  ],
}
//返回值
var shareFun = function (pageName,goodsName){
  //数组长度
	let arrLength = shareListArr[pageName].length
  //random 随机方法
  let randomVal = Math.floor(Math.random() * arrLength);
  //返回数据
  return shareListArr[pageName][randomVal]
}

//导出
module.exports = {
  shareFun
}