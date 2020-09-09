<template>
    <view class="conntainer">
		<view class="item">
		    <view class="title">
		        昵称 ：{{userInfo.nickname}}
		    </view>
		    <view v-if="isLogin">
		    	<image :src="userInfo.avatar" mode="" class="avatar"></image>
		    </view>
		    <button v-else class="userInfoBtn" open-type="getUserInfo" @getuserinfo="getUserInfo" hover-class="btn-hover">登陆</button>
		    <view class="content">
		        <view>open-type为getuserinfo按钮按钮获取加密信息->wx登陆,拿到微信code->请求后端接口->后端解密->返回用户数据->塞入vuex和缓存->openid作为用户唯一标示</view>
		    </view>
		</view>
		<view class="item">
			<view class="title">
			    微信支付
			</view>
		    <button class="userInfoBtn" open-type="getUserInfo" @click="pay" hover-class="btn-hover">微信支付</button>
			<view class="content">
			    <view>open-type为getuserinfo按钮按钮获取加密信息->wx登陆,拿到微信code->请求后端接口->后端解密->返回用户数据->塞入vuex和缓存->openid作为用户唯一标示</view>
			</view>
		</view>
        <view class="item">
            <view class="title">
                手机号:{{phone}}
            </view>
            <button class="userInfoBtn"  open-type="getPhoneNumber" @getphonenumber="getPhoneNumber" hover-class="btn-hover">获取手机号</button>
            <view class="content">
                <view>open-type为getPhoneNumber按钮获取加密信息->wx登陆,拿到微信code->请求后端接口->后端解密->返回用户数据->更新用户手机号</view>
            </view>
        </view>
        <view class="item">
            <view class="title">
                客服会话
            </view>
            <button class="userInfoBtn" open-type="contact" @contact="contact" hover-class="btn-hover">客服会话</button>
            <view class="content">
                <view>后台需要开通客服服务->配置客服人员->点击按钮跳到客服服务</view>
            </view>
        </view>
        <view class="item">
            <view class="title">
                客户反馈
            </view>
            <button open-type='feedback'>意见反馈</button>
            <view class="content">
                <view>点击按钮跳转到客户反馈页面，提交反馈后，可以在小程序后台看到</view>
            </view>
        </view>
        <view class="item">
            <view class="title">
                分享
            </view>
            <button class="userInfoBtn" open-type="share" @share="share" hover-class="btn-hover">分享</button>
            <view class="content">
                <view>请求后端接口->返回用户数据->openid作为用户唯一标示</view>
            </view>
        </view>
    </view>
</template>

<script>
import {
    mapGetters
} from 'vuex'

export default {
    computed: {
        ...mapGetters(['isLogin', 'userInfo', 'phone'])
    },
    methods: {
        async getPhoneNumber(e){
            await this.$api.getWeixinUserPhone(e)
        },
        async share(e){
            console.log(e)
        },
		async getUserInfo(e) {
		    await this.$api.wxlogin(e)
		},
    }
}
</script>

