import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import "@/assets/css/base.css";
// 导入自定义插件 Toast
import toast from "@/components/common/toast/index.js"

Vue.config.productionTip = false
// 使用自定义插件 toast
Vue.use(toast);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
