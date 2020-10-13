import { baseUrl, projectName, loginPage } from './config.js';
import utils from './utils' //引入common
import * as storage from './storage' //引入common
import store from '../store/index' //引入common

// 不需要登陆的接口
const whiteList = [
	'auth/wechatLogin',
];

const post = (url, data, header = {}) => {
	return new Promise((resolve, reject) => {
		utils.loading('加载中')
		let openid = storage.get("openid") || '';
		if (whiteList.indexOf(url) == -1) {
			if (!openid) {
				utils.error("请登陆",() => {
					utils.redirectTo(loginPage)
				});
				return;
			}
		}
		uni.request({
			url: baseUrl + url,
			data: data,
			method: 'POST',
			header: Object.assign(header,{
				'Accept': 'application/json',
				'Content-Type': 'application/json',
				[`auth_${projectName}_token`]: openid
			}),
			success: (response) => {
				const result = response.data
				if (result.code === 502) {
					db.del("openid");
					utils.error(result.msg, () => {
						utils.redirectTo(loginPage)
					});
					return
				}
				resolve(response.data)
			},
			fail: (error) => {
				if (error && error.response) {
					showError(error.response);
					reject(error)
				}
			},
			complete: () => {
				utils.hideLoading();
			}
		})
	})
}

const get = (url, data, header = {}) => {
	return new Promise((resolve, reject) => {
		utils.loading('加载中')
		let openid = storage.get("openid") || '';
		// 判断token是否存在
		if (whiteList.indexOf(url) == -1) {
			// 获取用户token
			if (!openid) {
				utils.error("请登陆",() => {
					utils.redirectTo(loginPage)
				});
				return;
			}
		}
		uni.request({
			url: baseUrl + url,
			data,
			header: Object.assign(header,{
				'Accept': 'application/json',
				'Content-Type': 'application/json',
				[`auth_${projectName}_token`]: openid
			}),
			method: 'GET',
			success: (response) => {
				const result = response.data
				if (result.code === 502) {
					db.del("openid");
					utils.error(result.msg, () => {
						utils.redirectTo(loginPage)
					});
					return
				}
				resolve(response.data)
			},
			fail: (error) => {
				utils.hideLoading();
				if (error && error.response) {
					showError(error.response);
					reject(error)
				}
			},
			complete: () => {
				utils.hideLoading();
			}
		});
	})
}

// 文件上传
export const uploadFiles = (callback) => {
	uni.chooseImage({
		success: (chooseImageRes) => {
			uni.showLoading({
				title: '上传中...'
			});
			const tempFilePaths = chooseImageRes.tempFilePaths;
			const uploadTask = uni.uploadFile({
				url: baseUrl + 'api.html', //仅为示例，非真实的接口地址
				filePath: tempFilePaths[0],
				fileType: 'image',
				name: 'file',
				headers: {
					'Accept': 'application/json',
					'Content-Type': 'multipart/form-data',
				},
				formData: {
						'method': 'images.upload',
						'upfile': tempFilePaths[0]
				},
				success: (uploadFileRes) => {
						callback(JSON.parse(uploadFileRes.data));
				},
				fail: (error) => {
					if (error && error.response) {
						showError(error.response);
					}
				},
				complete: () => {
					setTimeout(function () {
						uni.hideLoading();
					}, 250);
				}
			});
		}
	});
}

const showError = error => {
	let errorMsg = ''
	switch (error.status) {
		case 400:
			errorMsg = '请求参数错误'
			break
		case 401:
			errorMsg = '未授权，请登录'
			break
		case 403:
			errorMsg = '跨域拒绝访问'
			break
		case 404:
			errorMsg = `请求地址出错: ${error.config.url}`
			break
		case 408:
			errorMsg = '请求超时'
			break
		case 500:
			errorMsg = '服务器内部错误'
			break
		case 501:
			errorMsg = '服务未实现'
			break
		case 502:
			errorMsg = '网关错误'
			break
		case 503:
			errorMsg = '服务不可用'
			break
		case 504:
			errorMsg = '网关超时'
			break
		case 505:
			errorMsg = 'HTTP版本不受支持'
			break
		default:
			errorMsg = error.msg
			break
	}

	utils.Toast(errorMsg);
}

export const wxLogin = function(e) {
	return new Promise((resolve, reject) => {
		uni.login({
			provider: 'weixin',
			success: async (loginRes) => {
				const res = await post('auth/wechatLogin', {
					code: loginRes.code,
					userInfo: JSON.stringify({
						encryptedData:	e.detail.encryptedData,
						iv: e.detail.iv,
						signature: e.detail.signature,
						rawData: e.detail.rawData
					})
				})
				await store.dispatch('user/login', res.data)
				resolve()
			},
			fail: (error) => {
				reject(error)
			},
		});
	})
}

export const getWeixinUserPhone = async function(e) {
	return new Promise((resolve, reject) => {
		uni.login({
			provider: 'weixin',
			success: async (loginRes) => {
				const res = await post('auth/getWechatPhone', {
					code: loginRes.code,
					phoneData: JSON.stringify({
						encryptedData:	e.detail.encryptedData,
						iv: e.detail.iv
					})
				})
				await store.dispatch('user/getPhone', res.data)
				resolve()
			},
			fail: (error) => {
				reject(error)
			},
		});
	})
	
}

export default {
	post,
	get,
}