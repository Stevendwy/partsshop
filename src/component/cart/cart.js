import Vue from 'vue'
import order from './order/order'
import { Loading } from 'element-ui';

export default {
  namespaced: true,
  modules: {
    order
  },
  state: {
    orders: [], // 购物车清单
    submitOrders: [], // 提交的清单
  },
  getters: {
    cartSubmitRequest(state) {
      return {
        action: "submit",
        data: JSON.stringify(state.submitOrders)
      }
    },
    deleteRequest(state) {
      let p_uid = ''
      state.submitOrders.forEach(item => {
        p_uid += (item.p_uid + ',')
      })
      p_uid = p_uid.replace(/,$/, '')
      return p_uid
    }
  },
  mutations: {
    updateOrders(state, payload) {
      state.orders = payload.orders
    },
    updateSO(state, payload) {
      let sos = state.submitOrders
      for(let i = 0, j = sos.length; i < j; i ++) {
        let so = sos[i]
        if(so.p_uid === payload.p_uid) {
          so.quantity = payload.quantity
          break
        }
      }
    },
    addSO(state, payload) {
      let item = payload.item
      let sos = state.submitOrders
      for(let i = 0, j = sos.length; i < j; i ++) {
        let so = sos[i]
        if(so.p_uid === payload.p_uid) {
          return
        }
      }
      sos.push({
        p_uid: item.p_uid,
        quantity: item.quantity,
        price: item.price
      })
    },
    delSO(state, payload) {
      state.submitOrders = u.remove(payload.item, state.submitOrders, 'p_uid')
    },
    clearSO(state) {
      state.submitOrders = []
    },
    clearOrders(state) {
      state.orders = []
    },
    updateOrders(state, payload) {
      if(payload.orders) state.orders = payload.orders
      else {
        if(payload.mode === "plus"){
          state.orders.push(payload.item)
        }else{
          state.orders.splice(state.orders.indexOf(payload.item), 1) 
        }
      }
    }
  },
  actions: {
    aList(ct, payload) {
      let loading = Loading.service()

      return (
        u.get("/community/spcart/list", null)
          .then(res => {
            loading.close()

            if(!res) return

            ct.commit('updateOrders', {orders: res.order_data})
            ct.commit('updateBadgeCount', {badgeCount: res.total_quantity}, {root: true})
          })
      )
    },
    cartSubmit(ct, payload) {
      let loading = Loading.service()

      return (
        u.post("/community/spcart/submit", ct.getters.cartSubmitRequest)
          .then(() => loading.close())
      )
    },
    deleteCollection(ct, payload) {
      return (
        Vue.prototype.$confirm('确认要删除已选中的零件吗？', '提示', {
          confirmButtonText: '确认',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          let loading = Loading.service()

          return u.post('/community/spcart/del', {p_uid: payload.p_uid || ct.getters.deleteRequest})
            .then(res => {
              loading.close()
              
              if(!res) return

              ct.commit('clearOrders')
              ct.commit('clearSO')
            })
            .then(() => {
              return ct.dispatch('aList')
            })
        }).catch(() => {
          Vue.prototype.$message({
            type: 'info',
            message: '已取消'
          })  
        })
      )
    }
  }
}