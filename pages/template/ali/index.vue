<template>
    <view class="conntainer">
		<u-button>月落</u-button>
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

