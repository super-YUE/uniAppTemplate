import { loginPage } from './config.js';
import { del } from './storge'
//操作成功后，的提示信息
function success(msg='保存成功', callback=() => {}){
	uni.showToast({
		title: msg,
		icon: 'success',
		duration: 2000,
	});
	setTimeout(() => {
		callback();
	}, 500);
}

//操作失败的提示信息
function error(msg = '操作失败', callback = () => {}) {
	uni.showToast({
		title: msg,
		icon: 'none',
		duration: 2000,
	});
	setTimeout(() => {
		callback();
	}, 500);
}

function toast(title, duration = 2000, icon = 'none') {
	uni.showToast({
		title,
		icon,
		duration
	});
}
//加载显示
function loading(msg = '加载中') {
	uni.showToast({
		title: msg,
		icon: 'loading',
	});
}
function hideLoading(msg = '加载中') {
	uni.showToast({
		title: msg,
		icon: 'loading',
	});
}

// 提示框
function alert({
	title = '提示',
	content = '确认执行此操作吗?',
	onConfirm = () => {},
	cancelText = '取消',
	confirmText = '确定'}) {
	uni.showModal({
		title: title,
		content: content,
		showCancel: false,
		cancelText: cancelText,
		confirmText: confirmText,
		cancelText: cancelText,
		success: function (res) {
			if (res.confirm) {
				// 用户点击确定操作
				setTimeout(() => {
					onConfirm()
				}, 500)
			}
		}
	});
}

// 提示框
function confirm({
	title = '提示',
	content = '确认执行此操作吗?',
	showCancel = true,
	cancelText = '取消',
	confirmText = '确定',
	onConfirm = () => {},
	onCancel = () => {}}) {
	uni.showModal({
		title: title,
		content: content,
		showCancel: showCancel,
		cancelText: cancelText,
		confirmText: confirmText,
		cancelText: cancelText,
		success: (res) => {
			if (res.confirm) {
				// 用户点击确定操作
				setTimeout(() => {
					onConfirm()
				}, 500)
			} else if (res.cancel) {
				onCancel()
			}
		}
	});
}

//不足位数前面补0
function PadStart(num, length) {
	return (Array(length).join('0') + num).slice(-length); 
}

//验证是否是手机号
function isPhoneNumber(str){
    var myreg = /^[1][3,4,5,6,7,8,9][0-9]{9}$/;
	return myreg.test(str)
}

//统一跳转
function navigateTo(url){
	uni.navigateTo({
    url:url,
		animationType:'pop-in',
		animationDuration:300
	});
}

//统一重定向
function redirectTo (url) {
	uni.redirectTo({
		url: url,
		animationType: 'pop-in',
		animationDuration: 300
	})
}

/**
 * 
 *  判断是否在微信浏览器 true是
 */
function isWeiXinBrowser () {
	// #ifdef H5
   	// window.navigator.userAgent属性包含了浏览器类型、版本、操作系统类型、浏览器引擎类型等信息，这个属性可以用来判断浏览器类型
	let ua = window.navigator.userAgent.toLowerCase()
   	// 通过正则表达式匹配ua中是否含有MicroMessenger字符串
	if (ua.match(/MicroMessenger/i) == 'micromessenger') {
		return true
	} else {
		return false
	}
	// #endif
	
	// #ifdef MP
	return false;
	// #endif
}

// 跳转到登陆页
function jumpToLogin() {
	del('userToken')
	redirectTo(loginPage)
}

export default {
	success,
	error,
	toast,
	loading,
	hideLoading,
	alert,
	confirm,
	PadStart,
	isPhoneNumber,
	navigateTo,
	redirectTo,
	isWeiXinBrowser,
	jumpToLogin
}