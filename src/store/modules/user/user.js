import { getTempId } from "../../../utils/createUserTempId"
import { SAVE_USERINFO, SAVE_USERTOKEN, LOGIN_OUT } from "./mutaions-type"
import { Login, getUserInfo, loginOut } from "../../../api/index"
// import router from "../../../router/index"
export default {
	state: {
		userTempId: getTempId(),
		token: localStorage.getItem("TOKEN_KEY"),
		userinfo: {},
	},
	mutations: {
		[SAVE_USERTOKEN](state, token) {
			state.token = token
		},
		[SAVE_USERINFO](state, userinfo) {
			state.userinfo = userinfo
		},
		[LOGIN_OUT](state) {
			state.token = ""
			state.userinfo = {}
			localStorage.removeItem("TOKEN_KEY")
		},
	},
	actions: {
		async userLoginAction({ commit, dispatch }, { phone, password }) {
			//在contxt中能拿到dispatch
			//当登录成功后，将dispatch去获取userinfo
			localStorage.removeItem("TOKEN_KEY")
			let res = await Login(phone, password)
			if (res.code == 200) {
				commit(SAVE_USERTOKEN, res.data.token)
				dispatch("getUserInfoAction")
				if (!localStorage.getItem("TOKEN_KEY")) {
					localStorage.setItem("TOKEN_KEY", res.data.token)
				}
			}
		},
		async getUserInfoAction({ commit }) {
			let res = await getUserInfo()
			if (res.code == 200) {
				commit(SAVE_USERINFO, res.data)
			}
		},
		async loginOutAction({ commit }) {
			let res = await loginOut()
			if (res.code == 200) {
				commit(LOGIN_OUT)
			}
		},
	},
	getters: {},
}
