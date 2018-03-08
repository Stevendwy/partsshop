<template lang="pug">
.get
  .g-table(v-show='orders.length')
    .table
      .header
        .h-item(v-once='', v-for='(title, index) in headerTitles', :key='index')
      .orders
        order(type='sent', v-for='(order, index) in orders', :key='index', :order='order', @reloaddata='reloadData')
    pagination(v-show='totalPage > 0', :countTotal='totalPage', :initialSelectedindex='0', :countPage='5', :pageClick='paginationPageClick')
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
      headerTitles: ['零件号、名称', '单价（元）', '数量', '总金额（元）', '订单状态', '交易操作', '其他']
    }
  },
  mounted() {
    this.updateMI({index: '0-3'})
  },
  methods: {
    ...Vuex.mapActions('buyer', ['aList']),
    paginationPageClick(index) {
      this.reloadData({index: index + 1})
    },
    reloadData({index}) {
      this.aList({
        page: index,
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
          width: 150px;
        }
        &:nth-child(2) {
          width: 150px;
        }
        &:nth-child(3) {
          width: 50px;
        }
        &:nth-child(4) {
          width: 150px;
        }
        &:nth-child(5) {
          width: 150px;
        }
        &:nth-child(6) {
          width: 100px;
        }
        &:nth-child(7) {
          width: 54px;
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
  }
}
</style>