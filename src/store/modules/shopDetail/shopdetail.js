import { getShopDetail } from "../../../api/index"
import { SAVE_SHOPDETAIL } from "./mutaions-types"
export default {
	state: {
		shopDetail: {},
	},
	mutations: {
		[SAVE_SHOPDETAIL](state, shopDetail) {
			state.shopDetail = shopDetail
		},
	},
	actions: {
		getShopDetailAction({ commit }, id) {
			getShopDetail(id).then((res) => {
				if (res.code == 200) {
					commit(SAVE_SHOPDETAIL, res.data)
				}
			})
		},
	},
	getters: {
		categoryView(state) {
			return state.shopDetail.categoryView || {}
		},
		skuInfo(state) {
			return state.shopDetail.skuInfo || {}
		},
		spuSaleAttrList(state) {
			return state.shopDetail.spuSaleAttrList || []
		},
	},
}
