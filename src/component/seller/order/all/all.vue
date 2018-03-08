<template lang="pug">
.orders-container
  .orders(v-show='orders.length')
    o-table(type='all', :orders='orders', :reloaddata='reloadData')
    pagination(v-show='totalPage > 0', :countTotal='totalPage', :initialSelectedIndex='0', :countPage='5', :pageClick='paginationPageClick')
  .null(:style='centerNullBackground', v-if='!orders.length')
</template>

<script>
import oTable from './table.vue'
import pagination from '../../../common/pagination.vue'
import Vuex from 'vuex'
import mixin from '../../mixin/mixin'

export default {
  components: {
    oTable,
    pagination
  },
  mixins: [mixin],
  data() {
    return {
      totalPage: 1,
    }
  },
  mounted() {
    this.updateMI({index: '0-0'})
  },
  methods: {
    paginationPageClick(index) {
      this.reloadData({index: index + 1})
    },
    reloadData({index}) {
      this.aSummary()
      this.aList({
        page: index,
        status: 'all'
      }).then(res => this.totalPage = res.total_page || 0)
    }
  }
}
</script>

<style scoped lang="less">
.orders-container {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: e('calc(50% + 302px)');
  margin-left: 10px;
  padding-top: 10px;
  min-height: 400px;

  .orders {
    height: 100%;
  }

  .null {
    width: 804px;
    height: 600px;
    background: url(/static/img/p_order.png) center ~'/' 150px auto no-repeat;
  }
}
</style>