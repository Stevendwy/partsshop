<template lang="pug">
.all
  .a-table(v-show='orders.length')
    o-table(type='all', :orders='orders')
    pagination(v-show='totalPage > 0', :countTotal='totalPage', :initialSelectedIndex='0', :countPage='5', :pageClick='paginationPageClick')
  .null(:style='centerNullBackground', v-if='!orders.length')
</template>

<script>
import Vuex from 'vuex'
import oTable from './table.vue'
import pagination from '../../../common/pagination.vue'
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
    this.updateNSP({ path: '/buyer' })
  },
  methods: {
    ...Vuex.mapMutations(["updateNSP"]),
    paginationPageClick(index) {
      this.aList({
        page: index + 1,
        status: 'all'
      }).then(res => this.totalPage = res.total_page || 0)
    }
  }
}
</script>

<style scoped lang="less">
.all {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: e('calc(50% + 302px)');
  margin-left: 10px;
  padding-top: 10px;
  min-height: 400px;

  .a-table {
    height: 100%;
  }

  .null {
    width: 804px;
    height: 600px;
  }
}
</style>