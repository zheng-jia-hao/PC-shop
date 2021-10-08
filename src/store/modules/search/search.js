import { SAVE_SEARCHDATA } from "./mutaions-types"
import { getSearcData } from "../../../api/index"
export default {
	state: {
		searchData: {},
	},
	mutations: {
		[SAVE_SEARCHDATA](state, searchData) {
			state.searchData = searchData
		},
	},
	actions: {
		getSearcDataAction({ commit }, searchDetail) {
			//去除发送请求时的不必要参数
			searchDetail = { ...searchDetail } //一定要进行拷贝，不然将影响原组件数据
			// console.log(Object.keys(searchDetail))   方法返回一个带属性名的数组
			Object.keys(searchDetail).forEach((key) => {
				if (
					searchDetail[key] === "" ||
					(Array.isArray(searchDetail[key]) && searchDetail[key].length === 0)
				) {
					//判断参数是否有效,无效则删除
					delete searchDetail[key]
				}
			})
			getSearcData(searchDetail).then((res) => {
				if (res.code === 200) {
					commit(SAVE_SEARCHDATA, res.data)
				}
			})
		},
	},
	getters: {
		searchData: (state) => {
			return state.searchData
		},
		trademarkList: (state) => state.searchData.trademarkList || [],
		attrsList: (state) => state.searchData.attrsList || [],
		goodsList: (state) => state.searchData.goodsList || [],
	},
}
