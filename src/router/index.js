import Vue from "vue"
import VueRouter from "vue-router"
import routes from "./routes"
import store from "../store/index"

Vue.use(VueRouter)

/**
 *    路由未改变重新跳转到当前路由报错：
 * 		Uncaught (in promise) NavigationDuplicated ： ......
 *		ss
	
	  1)  为什么会报这样的错误？
	  	   在vue-router的3.1.0版本中更新的内容：
			路由参数未改变而进行原地址的跳转，对于vue-router来说是一种没有必要的操作，
		   所以router会报错

	  2)  为什么router-link 不会报这样的错？
			因为router-link会默认携带一个函数，只要携带了一个函数，它就不会解析成porimse
 *
 */

// 缓存原本的push方法
const originalPush = VueRouter.prototype.push
const originalReplace = VueRouter.prototype.replace
// 指定新的push方法
VueRouter.prototype.push = function push(location, onResolve, onReject) {
	// 如果指定了成功或失败的回调
	if (onResolve || onReject) {
		// 直接调用原本的push方法
		// originalPush(location, onResolve, onReject)  // this不是router而是undefined
		return originalPush.call(this, location, onResolve, onReject)
	}
	// 没有指定成功或失败回调, 必须用catch处理
	return originalPush.call(this, location).catch((err) => {
		// 如果是重复导航产生的错误, 不再向外传递错误
		//NavigationFailureType能判断当前请求的故障具体是什么故障-> 官网看细节
		//  duplicated导航被阻止，因为我们已经在目标位置了。
		if (
			VueRouter.isNavigationFailure(
				err,
				VueRouter.NavigationFailureType.duplicated
			)
		) {
			return err // 产生的是成功的promise, 成功promise的value是err
		}
		// 如果是其它原因导航的错误, 将错误向下传递
		// throw error
		return Promise.reject(err)
	})
}

VueRouter.prototype.replace = function(location, onResolve, onReject) {
	if (onResolve || onReject) {
		return originalReplace.call(this, location, onResolve, onReject)
	}
	return originalReplace.call(this, location).catch((err) => {
		if (VueRouter.isNavigationFailure(err)) {
			return err
		}
		return Promise.reject(err)
	})
}

const router = new VueRouter({
	mode: "history",
	routes,
	// 滚动时触发，使路由跳转时路由页面强制定位
	scrollBehavior() {
		return { x: 0, y: 0 }
	},
})

//因为只要登录过，就会将token存在本地，而store一开始拿的就是本地的，
//不可能存在没有的情况，除非是从来没有登录，
//第一次登录后，就存在了本地，所以只需要拿store里面的token即可
let isPay = ""

router.beforeEach((to, from, next) => {
	// to 去向的路由地址
	// from 从那个路由地址来
	// next() 直接放行,比如一些隐藏的或者需要发请求的内容就写在这里
	// next(false) 中断当前的导航
	// next("/地址") //  next({name:xxx}) 要路由定义了name属性才可使用
	if (store.state.user.token) {
		if (isPay && to.path == "/home" && from.path !== isPay) {
			let a = isPay
			console.log(a)
			isPay = ""
			next(a)
		}
		if (to.path == "/login") {
			// next(false)   并没有中断
			return
		}

		next()
	} else if (store.state.user.userTempId) {
		if (to.path.startsWith("/center")) {
			isPay = to.path
			next("/login")
		}
		if (
			to.path == "/trade" ||
			to.path.startsWith("/pay") ||
			to.path.startsWith("/pay") ||
			to.path == "/paysuccess"
		) {
			isPay = from.path
			next("/login")
		} else {
			next()
		}
	}
	next()
})

export default router
