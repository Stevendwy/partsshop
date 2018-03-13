import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

// modules
import part from './part/part'
import cart from './cart/cart'
import hub from './hub/hub'
import sale from './sale/sale'
import buyer from './buyer/buyer'
import seller from './seller/seller'
import pay from './pay/pay'

// getters
import getters from '../theme/getters'

export default new Vuex.Store({
  modules: {
    part,
    cart,
    hub,
    sale,
    buyer,
    seller,
    pay
  },
  state: {
    naviSelectedPath: '',
    untouch: {},
    badgeCount: 0, // 购物车角标
    userInfo: {},
    appScrollTop: 0, // app 滚动监听数据
    theme: {}, // 主题配置相关
  },
  getters,
  mutations: {
    updateNSP(state, payload) {
      state.naviSelectedPath = payload.path
    },
    updateUntouch(state, payload) {
      state.untouch = payload.data
    },
    clearUntouchBuyer(state) {
      state.untouch.order = 0
    },
    clearUntouchSeller(state) {
      state.untouch.order_seller = 0
    },
    clearUntouch(state) {
      untouch: { }
    },
    updateBadgeCount(state, payload) {
      let badgeCount = payload.badgeCount
      if (badgeCount || badgeCount === 0) state.badgeCount = badgeCount // 如果存在指定数目, 直接使用
      else {
        if (payload.mode === "plus") {
          state.badgeCount++
        } else {
          state.badgeCount--
        }
      }
    },
    updateUserInfo(state, payload) {
      Vue.set(state.userInfo, 'is_seller', payload.is_seller)
      for (let key in payload.data) {
        Vue.set(state.userInfo, key, payload.data[key])
      }
    },
    updateAppScrollTop(state, payload) {
      state.appScrollTop = payload.scrollTop
    },
    updateTheme(state, payload) {
      state.theme = payload.theme
    }
  },
  actions: {
    untouch(ct) {
      // return (
      //   axios.get('/community/order/untouch')
      //     .then(res => {
      //       if(!res.data) return

      //       ct.commit('updateUntouch', { data: res.data })
      //     })
      //     .catch(err => {
      //       console.log(err)
      //     })
      // )
    },
    touched(ct, payload) {
      let channel = payload.channel
      let obj = {
        order_id: 'any',
        channel: channel
      }
      // return (
      //   u.post('/community/order/touched', obj)
      //     .then(res => {
      //       if (channel === 'buyer') ct.commit('clearUntouchBuyer')
      //       else ct.commit('clearUntouchSeller')
      //     })
      // )
    },
    aUserInfo(ct, payload) {
      // return (
      //   u.get("/community/user/profile")
      //     .then(res => {
      //       ct.commit('updateUserInfo', res)
      //       return res
      //     })
      // )
    },
    aTheme({ commit }) {
      // return (
      //   u.get('/system/community/theme')
      //     .then(res => {
      //       if(!res) return
            
      //       commit('updateTheme', {theme: res.data})
      //     })
      // )
    }
  }
})