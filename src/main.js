import Vue from 'vue'
import Vuex from 'vuex'
import App from './App'
import router from './router'
import store from './vuex/store'
import ElementUI from 'element-ui'
import FullCalendar from 'vue-full-calendar'
import 'element-ui/lib/theme-chalk/index.css'
import '../static/css/style.css'
import '../static/icon/iconfont.css'
import '@/assets/iconfont/iconfont.css'
import Http from './util/request'
// import Print from 'vue-print-nb'
import '../static/js/xlsx.full.min.js'
import Print from 'vue-print-nb'

Vue.prototype.Http = Http

Vue.use(Vuex)
Vue.use(ElementUI)
Vue.use(FullCalendar)
Vue.use(Print)
// Vue.use(Print)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  components: { App },
  template: '<App/>'
})
