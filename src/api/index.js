import ajax from "./ajax"

//首页三级分类
export const getCategoryList = () =>
	ajax({
		url: "/product/getBaseCategoryList",
	})

//首页轮播
export const getBannerList = () => ajax("/cms/banner")

/**
 * mock ajax
 */

// 今日推荐
export const getRecommends = () => ajax("/mock/recommends")

// 楼层
export const getFloors = () => ajax("/mock/floors")

// 获取搜索页信息

export const getSearcData = (SearchDetail) => ajax.post("/list", SearchDetail)

// 获取商品详情数据

export const getShopDetail = (id) => ajax(`/item/${id}`)

//添加购物车
export const AddConfirm = (id, shopCount) => {
	return ajax({
		url: `/cart/addToCart/${id}/${shopCount}`,
		method: "post",
	})
}

//购物车详情
export const getShopCart = () => ajax("/cart/cartList")

//修改购物车checked状态
// /cart/checkCart/{skuID}/{isChecked}
export const changeCartChecked = (id, isChecked) =>
	ajax(`/cart/checkCart/${id}/${isChecked}`)

//删除某个购物车
///api/cart/deleteCart/{skuId}
export const deleteCart = (id) =>
	ajax({
		url: `/cart/deleteCart/${id}`,
		method: "delete",
	})
//注册用户
///api/user/passport/register

export const registerUser = (phone, password, code) =>
	ajax({
		url: "/user/passport/register",
		method: "post",
		data: {
			phone,
			password,
			code,
		},
	})

//登录
export const Login = (phone, password) =>
	ajax({
		url: "/user/passport/login",
		method: "post",
		data: {
			phone,
			password,
		},
	})

//获取用户信息
///user/passport/auth/getUserInfo

export const getUserInfo = () => ajax("/user/passport/auth/getUserInfo")

//退出登录
// /api/user/passport/logout

export const loginOut = () => ajax("/user/passport/logout")

//订单交易信息
///api/order/auth/trade
export const getOrderInfo = () => ajax("/order/auth/trade")

//交易订单信息提交
///api/order/auth/submitOrder?tradeNo={tradeNo}
export const submitOrderDetail = (traderNo, Orderinfo) =>
	ajax({
		url: `/order/auth/submitOrder?tradeNo=${traderNo}`,
		method: "post",
		data: Orderinfo,
	})

//订单信息获取
export const getPayDetail = (orderId) =>
	ajax(`/payment/weixin/createNative/${orderId}`)

//订单列表
///api/order/auth/{page}/{limit}
export const getOrderList = (page, limit) =>
	ajax(`/order/auth/${page}/${limit}`)
