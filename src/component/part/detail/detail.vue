<template>
  <div class="detail"
    v-if="baseInfoList">
    <d-selector />
    <router-view />
  </div>
</template>

<script>
import dSelector from './selector.vue'
import Vuex from 'vuex'

export default {
  components: {
    dSelector,
  },
  computed: {
    ...Vuex.mapState("part", ["baseInfoList"])
  }
};
</script>

<style scoped lang="less">
.detail {
  min-height: 400px;
  background-color: white;
}
</style>
