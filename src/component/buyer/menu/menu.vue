<template>
  <div class="menu-container">
    <div class="menu">
      <el-menu
        :default-active="menuIndex"
        :collapse="isCollapse"
        @select="select"
        :unique-opened="true">
        <el-submenu
          index="0">
          <template slot="title">
            <i class="el-icon-message"></i>
            <span slot="title">我的订单</span>
          </template>
          <el-menu-item
            index="0-0">
            全部<span class="summary"></span>
          </el-menu-item>
          <el-menu-item
            index="0-1">
            待付款<span class="summary">{{summary.created || 0}}</span>
          </el-menu-item>
          <el-menu-item
            index="0-2">
            待发货<span class="summary">{{summary.paid || 0}}</span>
          </el-menu-item>
          <el-menu-item
            index="0-3">
            待收货<span class="summary">{{summary.sent || 0}}</span>
            <div class="red-point"
              v-if="untouch.order"></div>
          </el-menu-item>
          <el-menu-item
            index="0-4">
            已签收<span class="summary">{{summary.received || 0}}</span>
          </el-menu-item>
          <el-menu-item
            index="0-5">
            其他<span class="summary">{{summary.closed || 0}}</span>
          </el-menu-item>
        </el-submenu>
      </el-menu>
    </div>
  </div>
</template>

<script>
import Vuex from 'vuex'

export default {
  data() {
    return {
      isCollapse: false,
      paths: ['all', 'pay', 'send', 'get', 'sign']
    }
  },
  computed: {
    ...Vuex.mapState(['untouch']),
    ...Vuex.mapState('buyer', ['menuIndex', 'summary'])
  },
  mounted() {
    this.aSummary()
    this.checkInitialPath()
  },
  methods: {
    ...Vuex.mapActions(['touched']),
    ...Vuex.mapMutations('buyer', ['updateMI']),
    ...Vuex.mapActions('buyer', ['aSummary']),
    select(index) {
      let path = ''
      switch(index) {
        case '0-0': path = 'all'
        break
        case '0-1': path = 'pay'
        break
        case '0-2': path = 'send'
        break
        case '0-3': {
          this.touched({channel: 'buyer'})
          path = 'get'
        }
        break
        case '0-4': path = 'sign'
        break
        case '0-5': path = 'close'
        break
        default: path = 'all'
      }
      this.$router.push('/buyer/' + path)
      this.updateMI({index}) // 这里重置, 否则不触发刷新
      this.aSummary()
    },
    /**
     * 检查当前所在 path
     */
    checkInitialPath() {
      let index = 0 // 初始选中索引
      let routePath = this.$route.path
      let paths = this.paths
      for(let i = 0, j = paths.length; i < j; i ++) {
        let path = paths[i]
        if(routePath.includes(path)) index = i
      }
      this.updateMI({index: '0-' + index})
    }
  }
}
</script>

<style scoped lang="less">
.menu-container {
  display: flex;
  justify-content: flex-end;
  width: e('calc(50% - 312px)');

  @eColor: #ec6337;

  .menu {
    width: 200px;

    .el-menu {
      height: 100%;
      min-height: 600px;
    }

    .el-submenu__title>span {
      color: #999;
    }

    .el-menu-item {
      position: relative;

      .summary {
        color: @eColor;
        margin-left: 8px;
      }

      .red-point {
        position: absolute;
        background: @eColor;
        left: 80px;
        top: 16px;
        width: 6px;
        height: 6px;
        border-radius: 3px;
      }
    }
  }
}
</style>
