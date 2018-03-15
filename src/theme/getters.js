export default {
  isYHC(state) {
    return state.theme.application === '萤火虫'
  },
  // 零件搜索为空的提示话术
  partSearchEmpty(state, getters) {
    return getters.isYHC ? "抱歉, 暂无此零件供应~" : "抱歉！没有找到相关的商品"
  },
  cartNullBackground(state, getters) {
    return getters.isYHC ?
      "background: url(/sp/static/img/p_shop.png) center / 200px auto no-repeat;" :
      "background: url(/sp/static/img/p_shop_hwq.png) center / 200px auto no-repeat;"
  },
  centerNullBackground(state, getters) {
    return getters.isYHC ?
      "background: url(/static/img/p_order.png) center / 150px auto no-repeat;" :
      "background: url(/static/img/p_order_hwq.png) center / 150px auto no-repeat;"
  },
  hubNullUrl(state, getters) {
    return getters.isYHC ?
      "/sp/static/img/p_kucun.png" :
      "/sp/static/img/p_kucun_hwq.png"
  },
  partSearchPosition(state, getters) {
    return getters.isYHC ?
      "justify-content: center;" :
      "justify-content: flex-end;"
  }
}