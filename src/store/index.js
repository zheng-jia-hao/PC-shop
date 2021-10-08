import Vue from "vue"
import Vuex from "vuex"

import home from "./modules/home/home"
import search from "./modules/search/search"
import shopDetail from "./modules/shopDetail/shopdetail"
import shopCart from "./modules/shopCart/shopCart"
import user from "./modules/user/user"
import order from "./modules/order/order"
Vue.use(Vuex)

export default new Vuex.Store({
	modules: {
		home,
		user,
		order,
		search,
		shopDetail,
		shopCart,
	},
})
