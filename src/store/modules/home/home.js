import {
	getCategoryList,
	getBannerList,
	getFloors,
	getRecommends,
} from "../../../api/index"
import {
	SAVE_CATEGORYLIST,
	SAVE_BANNERLIST,
	SAVE_FLOORS,
	SAVE_RECOMMENDS,
} from "./mutations-tpyes"
export default {
	state: {
		categoryList: [],
		bannerList: [],
		recommends: [],
		floors: [],
	},

	mutations: {
		[SAVE_CATEGORYLIST](state, categoryList) {
			state.categoryList = categoryList.splice(0, 16)
		},
		[SAVE_BANNERLIST](state, bannerList) {
			state.bannerList = bannerList
		},
		[SAVE_FLOORS](state, floors) {
			state.floors = floors
		},
		[SAVE_RECOMMENDS](state, recommends) {
			state.recommends = recommends
		},
	},

	actions: {
		getCategoryListAction({ commit }) {
			getCategoryList().then((res) => {
				if (res.code == 200) {
					commit(SAVE_CATEGORYLIST, res.data)
				}
			})
		},
		getBannerListAction({ commit }) {
			getBannerList().then((res) => {
				if (res.code == 200) {
					commit(SAVE_BANNERLIST, res.data)
				}
			})
		},
		getFloorsAction({ commit }) {
			getFloors().then((res) => {
				if (res.code == 200) {
					commit(SAVE_FLOORS, res.data)
				}
			})
		},
		getRecommendsAction({ commit }) {
			getRecommends().then((res) => {
				if (res.code == 200) {
					commit(SAVE_RECOMMENDS, res.data)
				}
			})
		},
	},

	getters: {},
}
