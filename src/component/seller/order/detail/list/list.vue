<template>
  <div class="list">
    <l-table
      :ordersData="detailOrdersData"/>
  </div>
</template>

<script>
import lTable from './table.vue'
import Vuex from 'vuex'

export default {
  components: {
    lTable
  },
  computed: {
    ...Vuex.mapState('seller', ['detailOrdersData'])
  }
}
</script>

<style scoped lang="less">

</style>
