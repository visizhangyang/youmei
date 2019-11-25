import PUBLIC from './Util.js';

//分享数据
let shareListArr = {
	/*
	**胖球首页
	*/
  home: [
		{ title: "我在胖球0元拿了很多好物，这里一定有你喜欢的，快...", imgUrl: "http://static.doudoubianli.com/static/imgs/free.png" },
		{ title: "快来捡漏！厂家正在甩卖换季、库存、断码尾货...", imgUrl: "http://static.doudoubianli.com/share/imgs/index_mall.png" },
		{ title: "我不到1个月就赚了几千块，比上班赚的还多！你看看...", imgUrl: "http://static.doudoubianli.com/share/imgs/index_money.png" },
		{ title: "我在这里又免费拿闲置，又赚钱，真是神奇，你能打开吗...", imgUrl: "http://static.doudoubianli.com/share/imgs/index_all.png" }
  ],
	/*
	**试玩小程序
	*/
  playGame: [
    { title: "我不到1个月就赚了几千块，比上班赚的还多！你看看...", imgUrl: "http://static.doudoubianli.com/share/imgs/index_money.png" },
    { title: "我没多久就赚了几千块，比上班来钱快！你快去看看...", imgUrl: "http://static.doudoubianli.com/share/imgs/try_img1.png" },
    { title: "我刚试玩又赚了钱，分享给你，可秒提现，我玩好久了...", imgUrl: "http://static.doudoubianli.com/share/imgs/try_img6.png" },
    { title: "我在这里轻松赚了好多钱，但不想公开我的秘密...", imgUrl: "http://static.doudoubianli.com/share/imgs/try_img2.png" }
  ],
	/*
	**分享赚
	*/
  shareMake: [
    { title: "邀请人XXX 推荐给你商品", imgUrl: "" },
  ],
	/*
	**自购返现
	*/
  returnShopMoney: [
    { title: "好多人都领了我的红包，剩不多了，你看还有吗?", imgUrl: "http://static.doudoubianli.com/share/imgs/try_img4.png" },
    { title: "我刚领的红包也分你一个，100%可得，快去收钱", imgUrl: "http://static.doudoubianli.com/share/imgs/try_img5.png" },
    { title: "就差你1人了，快帮我点下，一起领红包，100%可得！", imgUrl: "http://static.doudoubianli.com/share/imgs/try_img3.png" },
  ],
	/*
	**去赚钱(边玩边赚)
	*/
  goMakeBall: [
    { title: "我在胖球0元拿了很多好物，这里一定有你喜欢的，快...", imgUrl: "http://static.doudoubianli.com/static/imgs/free.png" },        
    { title: "快来捡漏！厂家正在甩卖换季、库存、断码尾货...", imgUrl: "http://static.doudoubianli.com/share/imgs/index_mall.png" },
    { title: "我不到1个月就赚了几千块，比上班赚的还多！你看看...", imgUrl: "http://static.doudoubianli.com/share/imgs/index_money.png" },
    { title: "在吗？@邀请人微信名 给你发红包了，别忘了领啊~", imgUrl: "http://static.doudoubianli.com/share/imgs/day_img1.png" },
    { title: "2019年流行这个赚钱方式，还不知道的亏大了，竟然是...", imgUrl: "http://static.doudoubianli.com/share/imgs/audio_icon.png" },
    { title: "老公痴迷靠这个赚钱，老婆闹离婚，一句话让老婆恍然大悟", imgUrl: "http://static.doudoubianli.com/share/imgs/tv_icon.png" },
    { title: "2019趋势：盘点比上班还赚钱的方法排行榜，看完辞职...", imgUrl: "http://static.doudoubianli.com/share/imgs/year_icon.png" },
    { title: "测智商有多少，知道下面的答案，就可以有红包领~", imgUrl: "http://static.doudoubianli.com/share/imgs/day_img5.png" },
    { title: "我在这里又免费拿闲置，又赚钱，真是神奇，你能打开吗...", imgUrl: "http://static.doudoubianli.com/share/imgs/index_all.png" },
  ],
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
	**天天领钱
	*/
	dailyGetMoney: [
		{ title: "给你发红包了，别忘了领啊", imgUrl: "http://static.doudoubianli.com/share/imgs/day_img1.png" },
		{ title: "2019年流行这个赚钱方式，还不知道的亏大了，竟然是...", imgUrl: "http://static.doudoubianli.com/share/imgs/day_img3.png" },
		{ title: "老公痴迷靠这个赚钱，老婆闹离婚，一句话让老婆恍然大悟", imgUrl: "http://static.doudoubianli.com/share/imgs/day_img2.png" },
		{ title: "2019趋势：盘点比上班还赚钱的方法排行榜，看完辞职...", imgUrl: "http://static.doudoubianli.com/share/imgs/day_img4.png" },
		{ title: "测智商有多少，知道下面的答案，就可以有红包领~", imgUrl: "http://static.doudoubianli.com/share/imgs/day_img5.png" }
	],
	/*
	**步数赚
	*/
	stepNumMake: [
		{ title: "每天走走路，就可以用步数免费换商品和赚钱，你也试试", imgUrl: "http://static.doudoubianli.com/share/imgs/step_share_goods.png" }
	],
	/*
	**砍球分享
	*/
  bargainShare: [
    { title: "帮我砍个价好不好？我真的特别想要这个宝贝", imgUrl: "" },
    { title: "是朋友就帮我砍一刀，我特别想要，你最好啦！", imgUrl: "" },
    { title: "就差你1刀，拜托帮帮我，先谢谢啦~", imgUrl: "" },
  ],
}
//返回值
var shareFun = function (pageName,goodsName){
	let userInfo = '';
	let  userName = wx.getStorageSync('USERINFO')
	if (userName) {
		userInfo = userName
	}
	let arrLength = shareListArr[pageName].length
  let randomVal = Math.floor(Math.random() * arrLength);
	/**
	 * 天天领钱：当为数组中第一个对象时显示用户名
	*/
  if (pageName == 'dailyGetMoney' && randomVal == 0) {
    shareListArr[pageName][randomVal].title = `在吗？${userInfo.nickName}给你发红包了，别忘了领啊`
  }
  /**
	 * 分享赚：当为数组中第一个对象时显示用户名,图片为carvars
	*/
  if (pageName == 'shareMake' && randomVal == 0) {
    shareListArr[pageName][randomVal].title = `${ userInfo.nickName} 推荐给你了${goodsName}`;
  }
  /**
	 * 去赚球：当为数组中第三个对象时显示用户名
	*/
  if (pageName == 'goMakeBall' && randomVal == 3){
    shareListArr[pageName][randomVal].title = `在吗？${userInfo.nickName} 给你发红包了，别忘了领啊~`;
  }
  return shareListArr[pageName][randomVal]
}

module.exports = {
  shareFun
}