import detail from './detail/detail'
import { Loading } from 'element-ui';
import Vue from 'vue'

export default {
  namespaced: true,
  modules: {
    detail
  },
  state: {
    searchPage: 1, // 搜索页码
    hasNext: 0, // 是否有下一页
    searchResultList: null, // 
    currentSearchItem: null, //
    carsInfo: [],
    baseInfoList: null, // 基础信息数据
    goodsInfo: null, // 渠道价格列表数据
    searchValue: '', // 零件搜索框内容
    detailPart: null, // 搜索详情的零件号
  },
  getters: {
    searchRequest(state) {
      return {
        parts: state.searchValue,
        brand: "audi",
        code: "audi",
        page: state.searchPage
      }
    },
    detailRequest(state) {
      return {
        part: state.detailPart,
        brand: "audi"
      };
    },
    goodsRequest(state) {
      return {
        pid: state.detailPart,
        brand: "audi"
      };
    }
  },
  mutations: {
    cleanData(state) {
      state.searchResultList = null;
      state.carsInfo = [];
    },
    detailBack(state) {
      state.baseInfoList = null;
      state.goodsInfo = null;
    },
    updateSP(state, payload) {
      if(payload.init) state.searchPage = 1
      else state.searchPage ++
    },
    updateBIL(state, payload) {
      state.baseInfoList = payload.data
    },
    updateSV(state, payload) {
      state.searchValue = payload.value
    },
    updateSRL(state, payload) {
      if(!state.searchResultList) state.searchResultList = payload.data // 初始化的值为 null , 直接赋值
      else state.searchResultList = state.searchResultList.concat(payload.data) // 这里为拼接
    },
    updateHN(state, payload) {
      state.hasNext = payload.hasNext
    },
    updateCSI(state, payload) {
      state.currentSearchItem = payload.item
    },
    updateDP(state, payload) {
      state.detailPart = payload.pid
    },
    updateGI(state, payload) {
      state.goodsInfo = payload.data
    },
    updateCI(state, payload) {
      state.carsInfo = payload.data
    }
  },
  actions: {
    searchClick(ct, payload) {
      ct.commit('cleanData')
      ct.commit('detailBack')
      ct.commit('updateSP', {init: true})
      return ct.dispatch('ajaxSRL', payload)
    },
    searchLoadMore(ct, payload) {
      ct.commit('updateSP', {})
      return ct.dispatch('ajaxSRL', payload)
    },
    ajaxSRL(ct, payload) {

      return (
        u.post("/community/parts_search", ct.getters.searchRequest)
          .then(res => {
            if(!res) return

            ct.commit('updateSRL', { data: res.data })
            ct.commit('updateHN', {hasNext: res.has_next})
            // 如果只有一条直接进入
            if (res.data.length === 1 && res.data[0].status) ct.dispatch('resultItemClick', { item: res.data[0], callback: payload.nextCallback })
            return res
          })
      )
    },
    resultItemClick(ct, payload) {
      let item = payload.item
      if (!item.status) {
        alert("无此零件详情");
        return;
      }

      ct.commit('updateCSI', {item}) // 更新 item
      ct.commit('updateDP', { pid: item.pid })
      ct.dispatch('ajaxGoods')
      ct.dispatch('ajaxBI')
        .then(payload.callback)
    },
    ajaxGoods(ct) {
      return (
        u.get("/community/partsitems", ct.getters.goodsRequest, { closeMum: true })
          .then(res => {
            if(!res) return

            ct.commit('updateGI', { data: res.data })
          })
      )
    },
    ajaxBI(ct, payload) {
      let loading = Loading.service()

      return (
        u.get("/ppys/partssearchs", ct.getters.detailRequest)
          .then(res => {
            if(!res) return

            loading.close()

            ct.commit('updateBIL', { data: res.partdetail })
            if (res.headname && res.headname.includes("适用车型")) ct.dispatch('ajaxCars')
            return res
          })
      )
    },
    ajaxCars(ct) {
      return (
        u.get("/ppys/partcars", ct.getters.detailRequest, { closeMum: true })
          .then(res => {
            if(!res) return

            ct.commit('updateCI', { data: res.data })
            return res
          })
      )
    },
    addShoppingCart(ct, payload) {
      ct.commit('cart/updateOrders', { item: payload.item, mode: "plus" }, { root: true })
      ct.commit('updateBadgeCount', { mode: "plus" }, { root: true })
    },
    cartAdd(ct, payload) {
      let obj = {
        p_uid: payload.item.p_uid
      }

      let loading = Loading.service() 

      return (
        u.post('/community/spcart/add', obj)
          .then(res => {
            loading.close()

            if(!res) return

            Vue.set(payload.item, 'in_spcarts', true)
          })
      )
    },
    cartDel(ct, payload) {
      let obj = {
        p_uid: payload.item.p_uid
      }

      let loading = Loading.service() 

      return (
        u.post('/community/spcart/del', obj)
          .then(res => {
            loading.close()

            if(!res) return

            Vue.set(payload.item, 'in_spcarts', false)
          })
      )
    }
  }
}