import Vue from 'vue'
import App from './App'
import {router} from './router.js';  //路径换成自己的
Vue.use(router)

Vue.config.productionTip = false
uni.$Router = router;

App.mpType = 'app'

const app = new Vue({
  ...App
})
app.$mount()
