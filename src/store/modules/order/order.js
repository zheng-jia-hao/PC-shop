import { getOrderInfo } from "../../../api/index"
import { SAVE_ORDERDETAIL } from "./mutations-tpyes"
export default {
	state: {
		orderDetail: {},
	},

	mutations: {
		[SAVE_ORDERDETAIL](state, orderDetail) {
			state.orderDetail = orderDetail
		},
		CLEARORDERS(state) {
			state.orderDetail = {}
		},
	},

	actions: {
		async getOrderDetailAction({ commit }) {
			let res = await getOrderInfo()
			if (res.code == 200) {
				console.log(res.data)
				res.data.userAddressList = []
				res.data.userAddressList.push(
					{
						consignee: "admin",
						id: 2,
						isDefault: "1",
						phoneNum: 15011111111,
						userAddress: "北京昌平区2",
						userId: 2,
					},
					{
						consignee: "张三",
						id: 4,
						isDefault: "0",
						phoneNum: 15011111111,
						userAddress: "北京昌平区2",
						userId: 2,
					}
				)
				commit(SAVE_ORDERDETAIL, res.data)
			}
		},
	},

	getters: {
		detailArrayList(state) {
			return state.orderDetail.detailArrayList || []
		},
		userAddressList(state) {
			return state.orderDetail.userAddressList || []
		},
	},
}
