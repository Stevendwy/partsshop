import { Loading } from 'element-ui';
import Vue from 'vue'

export default {
  namespaced: true,
  state: {
    menuIndex: '0-0',
    orders: [],
    detailOrdersData: {},
    summary: {}, // 摘要数量
  },
  mutations: {
    updateOrders(state, payload) {
      state.orders = payload.orders
    },
    updateDO(state, payload) {
      state.detailOrdersData = payload.detailOrdersData
    },
    updateSummary(state, payload) {
      Vue.set(state.summary, 'all', payload.all)
      Vue.set(state.summary, 'created', payload.created)
      Vue.set(state.summary, 'paid', payload.paid)
      Vue.set(state.summary, 'sent', payload.sent)
      Vue.set(state.summary, 'received', payload.received)
      Vue.set(state.summary, 'closed', payload.closed)
    },
    updateMI(state, payload) {
      state.menuIndex = payload.index
    }
  },
  actions: {
    aList(ct, payload) {
      ct.commit('updateOrders', {orders: []}) // 先清空

      let obj = {
        page: payload.page,
        status: payload.status
      }

      return (
        u.get("/community/order/list", obj)
          .then(res => {
            
            if(!res)return
            
            ct.commit('updateOrders', {orders: res.data})
            return res
          })
      )
    },
    aDetail(ct, payload) {
      let loading = Loading.service()

      return (
        u.get('/community/order/detail', {order_id: payload.order_id})
          .then(res => {
            loading.close()
            
            if(!res) return
            ct.commit('updateDO', {detailOrdersData: res})
          })
      )
    },
    aSummary(ct) {
      return (
        u.get('/community/order/summary')
          .then(res => {
            if(!res) return

            ct.commit('updateSummary', res.data)
          })
      )
    },
    handleOrder(ct, payload) {
      let obj = {
        order_id: payload.order_id,
        action: payload.action
      }
      let loading = Loading.service()

      return (
        u.post('/community/order/edit', obj)
          .then(res => {
            loading.close()

            if(!res) return
            ct.dispatch('aList', {page: 1, status: payload.status})
            ct.dispatch('aSummary')
          })
      )
    }
  }
}