// 定义一些全局的变量
const getters = {
	// user的变量
	openid: state => state.user.openid,
	userInfo: state => state.user.userInfo,
	isLogin: state => state.user.isLogin,
	phone: state => state.user.phone,
}
export default getters