const ApiRootUrl = 'http://127.0.0.1:8360/api/'
 
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
const GoodsCategory= ApiRootUrl + 'goods/category'            //获得分类数据

//扩展完善功能（选看）
const BrandList = ApiRootUrl + 'brand/list'                   //获得分类数据
const BrandDetail = ApiRootUrl + 'brand/detail'               //品牌详情
const CollectList =  ApiRootUrl + 'collect/list'              //收藏列表
const CommentList = ApiRootUrl + 'comment/list'               //评论列表
const CommentCount = ApiRootUrl + 'comment/count'             //评论总数
const CommentPost = ApiRootUrl + 'comment/post'               //发表评论
const TopicDetail = ApiRootUrl + 'topic/detail'               //专题详情
const TopicRelated = ApiRootUrl + 'topic/related'             //相关专题
const SearchResult = ApiRootUrl + 'search/result'             //搜索数据
const SearchHelper = ApiRootUrl + 'search/helper'             //搜索帮助
const SearchClearHistory = ApiRootUrl + 'search/clearhistory' //搜索帮助
const AddressList = ApiRootUrl + 'address/list'               //收货地址列表
const AddressDetail = ApiRootUrl + 'address/detail'           //收货地址详情
const AddressSave = ApiRootUrl + 'address/save'               //保存收货地址
const AddressDelete = ApiRootUrl + 'address/delete'           //保存收货地址
const RegionList = ApiRootUrl + 'region/list'                 //获取区域列表
const OrderCancel = ApiRootUrl + 'order/cancel'               //取消订单
const OrderExpress = ApiRootUrl + 'order/express'             //物流详情
const FootprintList = ApiRootUrl + 'footprint/list'           //足迹列表
const FootprintDelete = ApiRootUrl + 'footprint/delete'       //删除足迹


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
  GoodsCategory: GoodsCategory,
  //扩展
  BrandList: BrandList,
  BrandDetail: BrandDetail,
  CollectList: CollectList,
  CommentList: CommentList,
  CommentCount: CommentCount,
  CommentPost: CommentPost,
  TopicDetail: TopicDetail,
  TopicRelated: TopicRelated,
  SearchResult: SearchResult,
  SearchHelper: SearchHelper,
  SearchClearHistory: SearchClearHistory,
  AddressList: AddressList,
  AddressDetail: AddressDetail,
  AddressSave: AddressSave,
  AddressDelete: AddressDelete,
  RegionList: RegionList,
  OrderList: OrderList,
  OrderCancel: OrderCancel,
  OrderExpress: OrderExpress,
  FootprintList: FootprintList,
  FootprintDelete: FootprintDelete
}    