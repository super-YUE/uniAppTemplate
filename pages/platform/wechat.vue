<template>
  <view class="u-demo">
    <view class="u-item-title">登陆</view>
    <view class="u-demo-wrap">
			<view class="u-demo-title"> 昵称:{{ userInfo.nickname }} </view>
			<view class="u-demo-area">
        <view v-if="isLogin">
          <image :src="userInfo.avatar" mode="" class="avatar"></image>
        </view>
				<u-button v-else open-type="getUserInfo" @getuserinfo="getUserInfo">登陆</u-button>
				<view class="u-demo-result-line" :style="{ backgroundColor: '#ffffff'}">
          <view class="u-demo-area">
						<view class="u-no-demo-here">
							流程：open-type为getuserinfo按钮按钮获取加密信->wx登陆,拿到微信code请求后端接口->后端解密->返回用户数据->塞入vuex和缓存->openid作为用户唯一标示
						</view>
					</view>
				</view>
			</view>
		</view>
    <view class="u-item-title" style="margin-top: 15px">微信支付</view>
    <view class="u-demo-wrap">
			<view class="u-demo-area">
				<u-button @click="pay">微信支付</u-button>
				<view class="u-demo-result-line" :style="{ backgroundColor: '#ffffff'}">
          <view class="u-demo-area">
						<view class="u-no-demo-here">
							流程：唤起支付流程
						</view>
					</view>
				</view>
			</view>
		</view>
    <view class="u-item-title" style="margin-top: 15px">获取手机号</view>
    <view class="u-demo-wrap">
			<view class="u-demo-area">
				<u-button open-type="getPhoneNumber" @getphonenumber="getPhoneNumber">微信支付</u-button>
				<view class="u-demo-result-line" :style="{ backgroundColor: '#ffffff'}">
          <view class="u-demo-area">
						<view class="u-no-demo-here">
							流程：open-type为getPhoneNumber按钮获取加密信息->wx登陆,拿到微信code->请求后端接口->后端解密->返回用户数据->更新用户手机号
						</view>
					</view>
				</view>
			</view>
		</view>
    <view class="u-item-title" style="margin-top: 15px">客服会话</view>
    <view class="u-demo-wrap">
			<view class="u-demo-area">
				<u-button open-type="getPhoneNumber" @contact="contact">客服会话</u-button>
				<view class="u-demo-result-line" :style="{ backgroundColor: '#ffffff'}">
          <view class="u-demo-area">
						<view class="u-no-demo-here">
							小程序后台需要开通客服服务->配置客服人员->点击按钮跳到客服服务
						</view>
					</view>
				</view>
			</view>
		</view>
    <view class="u-item-title" style="margin-top: 15px">用户反馈</view>
    <view class="u-demo-wrap">
			<view class="u-demo-area">
				<u-button open-type="feedback">用户反馈</u-button>
				<view class="u-demo-result-line" :style="{ backgroundColor: '#ffffff'}">
          <view class="u-demo-area">
						<view class="u-no-demo-here">
							点击按钮跳转到客户反馈页面，提交反馈后，可以在小程序后台看到
						</view>
					</view>
				</view>
			</view>
		</view>
    <view class="u-item-title" style="margin-top: 15px">用户分享</view>
    <view class="u-demo-wrap">
			<view class="u-demo-area">
				<u-button open-type="share" @share="share">用户分享</u-button>
				<view class="u-demo-result-line" :style="{ backgroundColor: '#ffffff'}">
          <view class="u-demo-area">
						<view class="u-no-demo-here">
							只对各家小程序有效，点击右上角的"胶囊"，即可弹出分享菜单
						</view>
					</view>
				</view>
			</view>
		</view>
  </view>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  computed: {
    ...mapGetters(["isLogin", "userInfo", "phone"]),
  },
  methods: {
    async getPhoneNumber(e) {
      await this.$api.getWeixinUserPhone(e);
    },
    async share(e) {
      console.log(e);
    },
    async getUserInfo(e) {
      await this.$api.wxLogin(e);
    },
  },
};
</script>
