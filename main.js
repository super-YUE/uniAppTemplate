import Vue from 'vue'
import App from './App'

import * as Api from './common/api.js'
import Utils from './common/utils'
import * as Storge from './common/storge'
import * as Config from './common/config.js'

import uView from "uview-ui";
Vue.use(uView);

import store from './store'

Vue.config.productionTip = false

Vue.prototype.$store = store
Vue.prototype.$api = Api;
Vue.prototype.$utils = Utils;
Vue.prototype.$storge = Storge;
Vue.prototype.$config = Config;

App.mpType = 'app'

const app = new Vue({
    store,
    ...App
})
app.$mount()
