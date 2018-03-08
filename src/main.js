import Vue from 'vue'
import app from './App.vue'
import store from './component/store'
import router from './router/router'
import {
  Button,
  Message,
  Dropdown,
  DropdownMenu,
  DropdownItem,
  MessageBox,
  Loading
} from 'element-ui'

Vue.use(Button)
Vue.use(Dropdown)
Vue.use(DropdownMenu)
Vue.use(DropdownItem)
Vue.prototype.$loading = Loading.service
Vue.prototype.$message = Message
Vue.prototype.$confirm = MessageBox.confirm
Vue.prototype.$alert = MessageBox.alert

new Vue({
  el: '#app',
  store,
  router,
  template: '<app />',
  components: { app }
})