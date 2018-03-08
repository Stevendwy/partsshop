// 买卖家中心右侧模块
import Vuex from 'vuex'

export default {
  computed: {
    ...Vuex.mapGetters(['centerNullBackground']),
    ...Vuex.mapState('buyer', ['orders'])
  },
  methods: {
    ...Vuex.mapMutations('buyer', ['updateMI']),
    ...Vuex.mapActions('buyer', ['aList'])
  }
}