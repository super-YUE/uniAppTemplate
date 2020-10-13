import Vue from 'vue'
import App from './App'

import * as Api from './common/api.js'
import * as Storage from './common/storage'
import * as Config from './common/config.js'

import store from './store'
import Utils from './common/utils'

Vue.config.productionTip = false

Vue.prototype.$store = store
Vue.prototype.$api = Api;
Vue.prototype.$utils = Utils;
Vue.prototype.$storage = Storage;
Vue.prototype.$config = Config;

App.mpType = 'app'

Vue.prototype.$store = store

// 引入全局组件
import uView from 'uview-ui'
Vue.use(uView);
import './components/index'

const app = new Vue({
    store,
    ...App
})
app.$mount()
