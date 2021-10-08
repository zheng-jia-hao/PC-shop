import { AddConfirm, getShopCart } from "../../../api/index"
import { SAVE_SHOPCARTLIST } from "./mutations-tpyes"
export default {
	state: {
		shopCartList: [],
	},

	mutations: {
		[SAVE_SHOPCARTLIST](state, shopCartList) {
			state.shopCartList = shopCartList
		},
	},

	actions: {
		//多个参数用对象包裹，还记不住？
		//这个函数是将商品添加到购物车中，不需要返回内容
		async AddShopinShopCartAction({ commit }, { id, count }) {
			let a = await AddConfirm(id, count)
			if (a.code === 200) {
				return "ok"
			}
		},
		async getShopCartListAction({ commit }) {
			let result = await getShopCart()
			console.log(result)
			if (result.code == 200) {
				console.log(result.data)
				if (result.data.length) {
					commit(SAVE_SHOPCARTLIST, result.data[0].cartInfoList)
				} else {
					commit(SAVE_SHOPCARTLIST, result.data)
				}
			}
		},
	},

	getters: {},
}
