<template>
  <div class="list">
    <l-table
      v-for="(order, index) in orders" :key="index"
      :order="order"/>
  </div>
</template>

<script>
import lTable from './table.vue'

export default {
  props: ['orders'],
  components: {
    lTable
  },
  data() {
    return {

    }
  },
  computed: {
    
  }
}
</script>

<style scoped lang="less">
.list {
  width: 1024px;
  margin-bottom: 10px;
  background-color: white;
}
</style>
