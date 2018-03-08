export default {
  namespaced: true,
  state: {
    selectedIndex: 0, // 详情默认选中商品
  },
  mutations: {
    updateI(state, payload) {
      state.selectedIndex = payload.index
      if(payload.callback) payload.callback()
    }
  }
}