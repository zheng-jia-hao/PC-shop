export default [
	// component : () => import("路由组件路劲")  懒加载路由组件 只有需要的组件时才导入该路由组件
	{
		path: "/",
		redirect: "/home",
	},
	//PaySuccess
	{
		path: "/paysuccess",
		component: () => import("../views/PaySuccess/index.vue"),
	},
	{
		path: "/center",
		component: () => import("../views/Center/index.vue"),
		children: [
			{
				path: "/center",
				redirect: "/center/right",
			},
			{
				path: "/center/right",
				component: () => import("../views/Center/Right.vue"),
			},
		],
	},

	{
		path: "/pay/:orderId",
		component: () => import("../views/Pay/index.vue"),
	},
	{
		path: "/detail/:id",
		component: () => import("../views/Detail/index.vue"),
	},
	{
		path: "/trade",
		component: () => import("../views/Trade/index.vue"),
	},
	{
		path: "/shopcart",
		component: () => import("../views/ShopCart/index.vue"),
	},
	{
		name: "addcartsuccess",
		path: "/addcartsuccess",
		component: () => import("../views/AddCartSuccess/index.vue"),
	},
	{
		name: "home",
		path: "/home",
		component: () => import("../views/Home/Home.vue"),
	},
	{
		name: "login",
		path: "/login",
		component: () => import("../views/Login/Login.vue"),
		meta: {
			NoShowFooter: true,
		},
	},
	{
		name: "search",
		path: "/search/:keyword?", //添加占位符，后面的问号是不一定携带参数
		component: () => import("../views/Search/Search.vue"),
		// props:true //  props传参只能传递params参数
		//  route是当前路由对象
		// props: (route) => ({
		// 	keyword2: route.params.keyword,
		// 	queryKeyWord2: route.query.queryKeyWord,
		// }),
	},
	{
		name: "register",
		path: "/register",
		component: () => import("../views/Register/Register.vue"),
		meta: {
			NoShowFooter: true,
		},
	},
	{
		path: "/communication",
		component: () => import("../views/Communication/Communication"),
		children: [
			{
				path: "event",
				component: () => import("../views/Communication/EventTest/EventTest"),
				meta: {
					isHideFooter: true,
				},
			},
			{
				path: "model",
				component: () => import("../views/Communication/ModelTest/ModelTest"),
				meta: {
					isHideFooter: true,
				},
			},
			{
				path: "sync",
				component: () => import("../views/Communication/SyncTest/SyncTest"),
				meta: {
					isHideFooter: true,
				},
			},
			{
				path: "attrs-listeners",
				component: () =>
					import(
						"../views/Communication/AttrsListenersTest/AttrsListenersTest"
					),
				meta: {
					isHideFooter: true,
				},
			},
			{
				path: "children-parent",
				component: () =>
					import(
						"../views/Communication/ChildrenParentTest/ChildrenParentTest"
					),
				meta: {
					isHideFooter: true,
				},
			},
			{
				path: "scope-slot",
				component: () =>
					import("../views/Communication/ScopeSlotTest/ScopeSlotTest"),
				meta: {
					isHideFooter: true,
				},
			},
		],
	},
]
