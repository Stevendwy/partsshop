export default {
  namespaced: true,
  state: {
    qrData: {} // 二维码数据，包含订单数据
  },
  mutations: {
    updateQRData(state, payload) {
      state.qrData = payload.qrData
    },
    clearQRData(state) {
      state.qrData = {}
    }
  },
  actions: {
    aData(ct, payload) {
      let obj = {
        order_id: payload.order_id,
        device: 'pc'
      }
      return (
        u.get('/pays/send/alipay', obj)
      )
    },
    aQRData(ct, payload) {
      let obj = {
        order_id: payload.order.order_id,
        device: 'pc'
      }

      ct.commit('clearQRData')

      return (
        u.get('/pays/send/' + payload.payType, obj, { closeMum: true })
          .then(res => ct.commit('updateQRData', {qrData: res}))
      )
    },
  }
}