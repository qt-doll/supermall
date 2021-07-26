import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import toast from 'components/common/toast'
import VueLazyLoad from 'vue-lazyload'

import FastClck from 'fastclick'

Vue.config.productionTip = false

// 事件总线  vue实例可以做事件总件的，所以才能发射事件
// 添加事件总线对象
Vue.prototype.$bus = new Vue()

// 安装toast插件 ,默认执行obj.install函数，看/common/toast/index.js
Vue.use(toast)

// 解决移动端300ms的延迟
FastClck.attach(document.body)

// 使用懒加载插件, img里的 src -> v-lazy,也可以传参数，具体 看资料
Vue.use(VueLazyLoad, {
  loading: require('assets/img/common/placeholder.png')
})

new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')
