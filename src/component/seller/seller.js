import { Loading } from 'element-ui';
import Vue from 'vue'

export default {
  namespaced: true,
  state: {
    orders: [],
    detailOrdersData: {},
    summary: {}, // 摘要数量
    menuIndex: '0-0',
    expresses: [] // 运输公司列表数据
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
      Vue.set(state.summary, 'received', payload.received)
      Vue.set(state.summary, 'paid', payload.paid)
      Vue.set(state.summary, 'sent', payload.sent)
    },
    /**
     * 更新菜单选中样式
     * @param {*} state 
     * @param {*} payload 
     */
    updateMI(state, payload) {
      state.menuIndex = payload.index
    },
    updateExpresses(state, payload) {
      state.expresses = payload.expresses
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
        u.get("/community/order/seller/list", obj)
          .then(res => {
            ct.commit('updateOrders', {orders: res.data})
            return res
          })
      )
    },
    aExpresses(ct) {
      return (
        u.get('/community/logistics/list')
          .then(res => ct.commit('updateExpresses', {expresses: res.selector}))
      )
    },
    aDetail(ct, payload) {
      let loading = Loading.service()
      
      return (
        u.get('/community/order/seller/detail', {order_id: payload.order_id})
          .then(res => {
            loading.close()
            
            if(!res) return
            ct.commit('updateDO', {detailOrdersData: res})
          })
      )
    },
    aSummary(ct) {
      return (
        u.get('/community/order/seller/summary')
          .then(res => {
            ct.commit('updateSummary', res.data)
          })
      )
    },
    handleOrder(ct, payload) {
      let obj = {
        order_id: payload.order_id,
        action: 'close'
      }
      let loading = Loading.service()

      return (
        u.post('/community/order/seller/edit', obj)
          .then(res => {
            loading.close()
            
            if(!res) return
            ct.dispatch('aList', {page: 1, status: payload.status})
          })
      )
    },
    deliver(ct, payload) {
      let request = payload.request
      let loading = Loading.service()

      return (
        u.post('/community/order/seller/delivery', request)
          .then(() => loading.close())
      )
    }
  }
}