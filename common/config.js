let url = ''

if(process.env.NODE_ENV === 'development'){
	// 开发环境url
	url = 'http://127.0.0.1:7001/mobile/'
}else{
	// 线上环境环境url
    url = 'http://127.0.0.1:8360/mobile/'
}

export const baseUrl = url

export const projectName = 'example'

// 首页
export const homePage = '/pages/index/index'

// 登陆页
export const loginPage = '/pages/user/index'


