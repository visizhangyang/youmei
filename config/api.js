const ApiRootUrl = 'http://192.168.0.104:8360/api/'
 
const IndexUrl = ApiRootUrl + 'index/index'                   //首页数据接口
const GoodsCount = ApiRootUrl + 'goods/count'                 //统计商品总数
const AuthLoginByWeixin = ApiRootUrl + 'auth/loginByWeixin'   //微信登录
const SearchIndex = ApiRootUrl + 'search/index'               //搜索-历史记录与热门搜索
const ClearHistory = ApiRootUrl + 'search/clearhistory'       //清除历史记录
const SearchGoodsList = ApiRootUrl + 'goods/list'             //搜索列表
const TopicList = ApiRootUrl + 'topic/list'                   //专题列表
const CatalogList = ApiRootUrl + 'catalog/index'              //全部分类数据
const CatalogCurrent = ApiRootUrl + 'catalog/current'         //当前数据
const GoodsDetail = ApiRootUrl + 'goods/detail'               //商品详情
const GoodsRelated = ApiRootUrl + 'goods/related'             //相关推荐
const CartGoodsCount = ApiRootUrl + 'cart/goodscount'         //购物车商品总数
const Addordelete = ApiRootUrl + 'collect/addordelete'        //添加取消收藏
const CartAdd = ApiRootUrl + 'cart/add'                       //添加到购物车
const CartIndex = ApiRootUrl + 'cart/index'                   //获取购物车列表
const CartChecked = ApiRootUrl + 'cart/checked'               //选择或取消商品
const CartUpdate = ApiRootUrl + 'cart/update'                 //更新购物车
const CartCheckout = ApiRootUrl + 'cart/checkout'             //选中商品详情
const OrderSubmit = ApiRootUrl + 'order/submit'               //提交订单
const PayPrepayId = ApiRootUrl + 'pay/prepay'                 //获取prepayID
const OrderList = ApiRootUrl + 'order/list'                   //订单列表
const OrderDetail = ApiRootUrl + 'order/detail'               //订单列表
       
//导出    
module.exports = { 
  IndexUrl: IndexUrl,
  GoodsCount: GoodsCount, 
  AuthLoginByWeixin: AuthLoginByWeixin,
  SearchIndex: SearchIndex,
  ClearHistory: ClearHistory,
  SearchGoodsList: SearchGoodsList,
  TopicList: TopicList,
  CatalogList: CatalogList,
  CatalogCurrent: CatalogCurrent, 
  GoodsDetail: GoodsDetail, 
  GoodsRelated: GoodsRelated,
  CartGoodsCount: CartGoodsCount,
  Addordelete: Addordelete,
  CartAdd: CartAdd,
  CartIndex: CartIndex,
  CartChecked: CartChecked, 
  CartUpdate: CartUpdate,
  CartCheckout: CartCheckout,
  OrderSubmit: OrderSubmit,
  PayPrepayId: PayPrepayId,
  OrderList: OrderList,
  OrderDetail: OrderDetail,

}    