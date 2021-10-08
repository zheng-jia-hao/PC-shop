import Vue from "vue"
import App from "./App.vue"
import router from "./router"
import store from "./store/index"
import VueAwesomeSwiper from "vue-awesome-swiper"
import "swiper/css/swiper.css"
import { Pagination, MessageBox, Message, Button } from "element-ui"
// * as xxx  就是把里面所有分别暴露的函数变成 XXX:{}的形式
import * as API from "./api/index"

import "./mock/mock"
Vue.use(VueAwesomeSwiper)

//图片懒加载
import VueLazyload from "vue-lazyload"
import load from "./assets/load.gif"
Vue.use(VueLazyload, {
	loading: load,
})

import TypeNav from "./components/TypeNav/TypeNav.vue"
// 浏览器控制台不显示非生产环境打包的提示
Vue.config.productionTip = false

// Elenemt-ui
Vue.component(Pagination.name, Pagination)
Vue.component(Button.name, Button)
// Vue.component(Message.name, Message)
Vue.prototype.$confirm = MessageBox.confirm
Vue.prototype.$message = Message

//这里的TypeNav.name 是在组件中定义了name才可以这样使用
Vue.component(TypeNav.name, TypeNav)

new Vue({
	//挂载全局事件总线
	beforeCreate() {
		Vue.prototype.$eventBus = this
		Vue.prototype.$API = API
	},
	store,
	router,
	render: (h) => h(App),
}).$mount("#app")

// 禁用eslint 规程检查
/*---- eslint-disable no-unused-vars */

//全局的禁用在vue.config.js里面 添加 lintOnSave: "warning",
