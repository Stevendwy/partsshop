// 买卖家中心右侧模块
import Vuex from 'vuex'

export default {
  computed: {
    ...Vuex.mapGetters(['centerNullBackground']),
    ...Vuex.mapState('seller', ['orders'])
  },
  methods: {
    ...Vuex.mapMutations('seller', ['updateMI']),
    ...Vuex.mapActions('seller', ['aList', 'aSummary'])
  }
}