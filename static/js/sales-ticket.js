"use strict"

let Printer = Vue.extend({
  template: '#printer',
  data: function() {
    return {
      rows: [],
      orderId: '', // 订单号
      pData: {}, // 打印的所有资料
    }
  },
  computed: {
    sellerInfo: function() {
      return this.pData.seller_info || {}
    },
    orderDate: function() {
      return this.pData.order_dt
    },
    orders: function() {
      return this.pData.data || []
    },
    contact: function() {
      return this.pData.contact || {}
    },
    sReceiver: function() {
      return '客户姓名 ' + (this.contact.receiver || '')
    },
    sOrderId: function() {
      return '订单编号 ' + (this.orderId || '')
    },
    sContactPhone: function() {
      return '联系电话 ' + (this.contact.contact_phone || '')
    },
    sBuyerName: function() {
      return '采购员 ' + (this.sellerInfo.buyer_name || '')
    },
    sOrderDate: function() {
      return '销售日期 ' + (this.orderDate || '')
    },
    rTotalAmountCN: function() {
      return '金额总计 ' + (this.pData.total_amount_cn || '')
    },
    rAddress: function() {
      return '收货地址 ' + (this.contact.area_cn || '') + (this.contact.address || '')
    }
    ,
    siAddress: function() {
      return '发货地址 ' + (this.sellerInfo.address || '')
    },
    siPhone: function() {
      return '联系电话 ' + (this.sellerInfo.phone || '')
    }
  },
  mounted: function() {
    this.aData()
  },
  methods: {
    aData: function() {
      let search = location.search
      let self = this
      search.slice(1).split('&').forEach(function(query) {
        let splitArr = query.split('=')
        if(splitArr[0] === 'order_id') self.orderId = splitArr[1]
      })

      if(this.orderId.length > 0) {
        axios.get('/community/order/seller/detail', {params: {order_id: this.orderId}})
          .then(function(res) {
            self.pData = res.data
          })
      }
      else {
        alert('无有效的订单号')
      }
    }
  }
})

new Vue({
  el: '#app',
  components: {
    Printer: Printer
  },
  template: '<Printer />'
})