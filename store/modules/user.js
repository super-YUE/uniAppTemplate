import {
	get,
	set,
	del
} from '../../common/storge'

const state = {
	openid: get('openid'), // openid
	userInfo: {}, // 用户信息
	phone: '',
	isLogin: false
}

const mutations = {
	setOpenid: (state, token) => {
		set('openid', token)
		state.token = token
	},
	setPhone: (state, phone) => {
		set('phone', phone)
		state.phone = phone
	},
	setUserinfo: (state, userInfo) => {
		set('userInfo', userInfo)
		state.userInfo = userInfo
	},
	setLoginStatus: (state, status) => {
		state.isLogin = status
	}
}

const actions = {
	async init({commit}) {
		const userInfo = get('userInfo')
		const openid = get('openid')
		if (userInfo && openid) {
			commit('setOpenid', openid)
			commit('setUserinfo', userInfo)
			commit('setLoginStatus', true)
		}
	},
	// 登录
	async login({commit}, userInfo) {
		commit('setOpenid', userInfo.openid)
		delete userInfo.openid
		commit('setUserinfo', userInfo)
		commit('setLoginStatus', true)
	},
	async getPhone({commit}, phone) {
		commit('setPhone', phone)
	},
	// 登出
	async logOut({commit}) {
		try {
			await logOut()
			commit('SET_TOKEN', '')
			commit('SET_ROLES', [])
			del('mobileToken')
		} catch (e) {
			throw e
		}
	}
}

export default {
	namespaced: true,
	state,
	mutations,
	actions
}