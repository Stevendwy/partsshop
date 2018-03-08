import { Message } from 'element-ui'
import Vue from 'vue'

export default {
  namespaced: true,
  state: {
    editing:false,       //是否展示编辑页面
    lastupdatetime:"", //最后更新时间
    agency: '', // 代理商
    total: '', // 总条目
    total_online: '', // 上线条目
    total_offline: '', // 下线条目
    resultList: [],
    noResult: false, // 没有结果标识
    total_page: 1, // 默认页码 1
    bch: {
      brands: [],
      cities: [],
      hubs: []
    }, // 下拉选择内容
    currentReq: {}, // 当前保存的查询资料
  },
  mutations: {
    updateTotal(state, payload) { // 更新所有数目
      if (payload.agency_company) state.agency = payload.agency_company
      state.total = payload.total
      state.total_online = payload.total_online
      state.total_offline = payload.total_offline
    },
    updateRL(state, payload) {
      state.resultList = payload.data
    },
    setNoResult(state) {
      state.noResult = true
    },
    clearNoResult(state) {
      state.noResult = false
    },
    updateTP(state, payload) {
      state.total_page = payload.page
    },
    updateTime(state, payload) {
      state.lastupdatetime = payload.lasttime
    },
    updateBCH(state, payload) {
      state.bch = {
        brands: payload.item_brand,
        cities: payload.item_city,
        hubs: payload.item_warehouse
      }
    },
    handleSS(state, payload) {
      Vue.set(payload.item, 'sailing', payload.sailing)
    },
    updateBrands(state, payload) {
      state.bch.brands = payload.brands
    },
    updateCities(state, payload) {
      state.bch.cities = payload.cities
    },
    updateHubs(state, payload) {
      state.bch.hubs = payload.hubs
    },
    updateCurrentReq(state, payload) {
      let currentReq = state.currentReq
      
      let online = payload.online
      if(online === '') online = ''
      else if(online === undefined) online = currentReq.online

      let query = payload.query
      if(query === '') query = ''
      else if(query === undefined) query = currentReq.query

      // debugger
      state.currentReq = {
        online,
        query,
        page: payload.page || currentReq.page
      }
    },
    editRoundly (state, payload) {
      console.log()
      if (payload.showedit === "showedit") {
        state.editing = true
      }else{
        state.editing = false
      }
    },
  },
  actions: {
    aList(ct) {
      return (
        u.get("/community/inventory", ct.state.currentReq)
          .then(res => {
            if(!res) return

            let data = res.data
            if (data && data.length > 0) {
              // console.log(res)
              ct.commit('clearNoResult')
              ct.commit('updateTotal', res)
              ct.commit('updateRL', { data: res.data }) 
              ct.commit('updateTime', { lasttime: res.last_modified || "" })
              ct.commit('updateTP', { page: res.total_page || 0 })
              ct.commit('updateBCH', res)
            }
            else ct.commit('setNoResult')
          })
      )
    },
    edit(ct, payload) {
      let item = payload.item

      let online = payload.online
      let sailing = payload.sailing

      if (online === 0 || online) online = online
      else online = item.online

      if (sailing === 0 || sailing) sailing = sailing
      else sailing = item.sailing

      let request = {
        pid: item.pid,
        label: payload.label || item.label,
        amount: payload.amount || item.amount,
        price: payload.price || item.prices,
        sailing: sailing,
        mill: payload.mill || item.mill,
        address: payload.address || item.address,
        location: payload.location || item.location,
        online: online,
        total: ct.state.total,
        total_online: ct.state.total_online,
        total_offline: ct.state.total_offline
      }

      return (
        u.post('/community/inventory', request)
          .then(res => {
            if (!res) return
            if (res.total) ct.commit('updateTotal', res)

            let data = res.data
            Vue.set(item, 'prices', data.price)
            Vue.set(item, 'label', data.label)
            Vue.set(item, 'amount', data.amount)
            Vue.set(item, 'sailing', data.sailing)
            Vue.set(item, 'mill', data.mill)
            Vue.set(item, 'address', data.address)
            Vue.set(item, 'location', data.location)
            Vue.set(item, 'online', data.online)

            if (payload.mill) ct.commit('updateBrands', { brands: res.item_brand })
            if (payload.address) ct.commit('updateCities', { cities: res.item_city })
            if (payload.location) ct.commit('updateHubs', { hubs: res.item_warehouse })

            Message({
              message: '修改成功',
              type: 'success'
            })
          })
      )
    },
    batch (ct,obj) {
      return (
        u.post("/community/inventory/multi_edit", obj)
          .then(res => {
            if(!res) return

            Message({
              message: '修改成功',
              type: 'success'
            })
          })
      )
    }
  },
  getters: {
    getEventList (states) {
        return states.resultList
    }
  }
}