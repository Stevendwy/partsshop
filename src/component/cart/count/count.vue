<template lang="pug">
.count
  .c-header(v-once='') 购物车
  c-table(v-show='orders.length > 0')
  .null(:style='cartNullBackground', v-if='orders.length < 1')
</template>

<script>
import cTable from './table.vue'
import Vuex from 'vuex'

export default {
  components: {
    cTable
  },
  computed: {
    ...Vuex.mapGetters(['cartNullBackground']),
    ...Vuex.mapState('cart', ['orders'])
  },
  mounted() {
    // this.aList()
    // this.clearSO()
  },
  methods: {
    ...Vuex.mapMutations('cart', ['clearSO']),
    ...Vuex.mapActions('cart', ['aList'])
  }
}
</script>

<style scoped lang="less">
.count {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 100%;

  @eColor: #ec6337;

  .c-header {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 60px;
    font-size: 20px;
    color: @eColor;
    background-color: white;
    box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.24);
    z-index: 2;
  }

  .null {
    width: 1024px;
    height: 600px;
  }
}
</style>
