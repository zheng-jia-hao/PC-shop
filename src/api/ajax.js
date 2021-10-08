/**
 *  对axios  进行二次封装
 *      添加请求拦截和响应拦截
 *      显示进度条
 *      统一处理请求
 */

import axios from "axios"
import NProgress from "nprogress"
import "nprogress/nprogress.css"
import store from "../store"

const service = axios.create({
	baseURL: "/api",
	timeout: 20000,
})

service.interceptors.request.use((config) => {
	//开始请求时显示进度条
	NProgress.start()

	if (!config.headers.userTempId) {
		config.headers.userTempId = store.state.user.userTempId
	}

	if (!config.headers.token) {
		config.headers.token = store.state.user.token
	}

	//最后一定是将config返回出去，让发送请求的操作继续进行
	return config
})

service.interceptors.response.use(
	(response) => {
		//成功响应时隐藏进度条
		NProgress.done()
		if (response.data.code !== 200) {
			alert(response.data.message)
		}
		return response.data
	},
	(error) => {
		//请求出错时隐藏进度条
		NProgress.done()
		alert(error.messages)
		return new Promise({})
	}
)

export default service
