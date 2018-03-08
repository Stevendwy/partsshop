<template lang="pug">
.get
  .g-table(v-show='orders.length')
    .table
      .header
        .h-item(v-once='', v-for='(title, index) in headerTitles', :key='index')
      .orders
        order(type='sent', v-for='(order, index) in orders', :key='index', :order='order')
    pagination(v-show='totalPage > 0', :countTotal='totalPage', :initialSelectedIndex='0', :countPage='5', :pageClick='paginationPageClick')
  .null(:style='centerNullBackground', v-if='!orders.length')
</template>

<script>
import order from './order.vue'
import pagination from '../../../common/pagination.vue'
import Vuex from 'vuex'
import mixin from '../../mixin/mixin'

export default {
  components: {
    order,
    pagination
  },
  mixins: [mixin],
  data() {
    return {
      totalPage: 1,
      headerTitles: ['零件号、名称', '单价（元）', '数量', '买家', '订单状态', '交易操作', '实收款']
    }
  },
  mounted() {
    this.updateMI({index: '0-2'})
  },
  methods: {
    paginationPageClick(index) {
      this.aSummary()
      this.aList({
        page: index + 1,
        status: 'sent'
      }).then(res => this.totalPage = res.total_page || 0)
    }
  }
}
</script>

<style scoped lang="less">
.get {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: e('calc(50% + 302px)');
  margin-left: 10px;
  padding-top: 10px;
  min-height: 400px;

  @d8line: 1px solid #d8d8d8;
  @0Color: #0076ff;

  .g-table {
    height: 100%;

    .table {
      width: 100%;
      height: e('calc(100% - 64px)');

      .item {
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 12px;
        color: #999;

        &:nth-child(1) {
          width: 200px;
        }
        &:nth-child(2) {
          width: 80px;
        }
        &:nth-child(3) {
          width: 70px;
        }
        &:nth-child(4) {
          width: 128px;
        }
        &:nth-child(5) {
          width: 105px;
        }
        &:nth-child(6) {
          width: 105px;
        }
        &:nth-child(7) {
          width: 116px;
        }
      }

      .header {
        display: flex;
        align-items: center;
        width: 804px;
        height: 32px;
        background-color: #f8f8f8;

        .h-item {
          .item;
        }
      }

      .orders {
        width: 100%;
        height: e('calc(100% - 42px)');
        overflow-y: scroll;
        overflow-x: hidden;
      }
    }
  }

  .null {
    width: 804px;
    height: 600px;
    background: url(/static/img/p_order.png) center ~'/' 150px auto no-repeat;
  }
}
</style>