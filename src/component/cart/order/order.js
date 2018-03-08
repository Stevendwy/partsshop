import { Loading } from 'element-ui';

export default {
  namespaced: true,
  state: {
    ordersData: [], // 订单数据
    addr_id: '' // 提交订单的地址标识
  },
  getters: {
    submitOrdersRequest(state) {
      let submitOrders = []
      
      state.ordersData.order_data.forEach(server => {
        let order = {}
        order.seller_id = server.seller_id
        order.remark = server.remark
        order.items = []

        server.items.forEach(item => {
          let rItem = {}
          rItem.p_uid = item.p_uid
          rItem.quantity = item.quantity

          order.items.push(rItem)
        })
        submitOrders.push(order)
      })

      return {
        addr_id: state.addr_id,
        detail: JSON.stringify(submitOrders)
      }
    }
  },
  mutations: {
    updateOD(state, payload) {
      state.ordersData = payload.ordersData
    },
    clearOD(state) {
      state.ordersData = []
    },
    updateAI(state, payload) {
      state.addr_id = payload.addr_id
    }
  },
  actions: {
    aList(ct, payload) {
      return (
        u.get("/community/order/submit", null, {closeMum: true})
          .then(res => {
            if(!res) return

            ct.commit('updateOD', {ordersData: res})
          })
      )
    },
    submitOrders(ct, payload) {
      let loading = Loading.service()

      return (
        u.post("/community/order/submit", ct.getters.submitOrdersRequest)
          .then(res => {
            loading.close()
            
            return res
          })
      )
    }
  }
}