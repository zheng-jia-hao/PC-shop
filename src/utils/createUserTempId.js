import { v4 as uuidv4 } from "uuid"
// uuidv4() // ⇨ '9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d'
//生成用户的临时标识，用于添加购物车和访问界面
export const getTempId = function() {
	return (
		localStorage.getItem("TEMPID_KEY") ||
		localStorage.setItem("TEMPID_KEY", uuidv4())
	)
}
