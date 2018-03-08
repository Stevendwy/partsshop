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
            <div class="sub-menu-container">
              <i class="el-icon-message"></i>
              <span slot="title">我的订单</span>
            </div>
          </template>
          <el-menu-item
            index="0-0">
            全部<span class="summary"></span>
          </el-menu-item>
          <el-menu-item
            index="0-1">
            待发货<span class="summary">{{summary.paid || 0}}</span>
            <div class="red-point"
              v-if="untouch.order_seller"></div>
          </el-menu-item>
          <el-menu-item
            index="0-2">
            待收货<span class="summary">{{summary.sent || 0}}</span>
          </el-menu-item>
          <el-menu-item
            index="0-3">
            已签收<span class="summary">{{summary.received || 0}}</span>
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
      paths: ['all', 'send', 'get', 'sign']
    }
  },
  computed: {
    ...Vuex.mapState(['untouch']),
    ...Vuex.mapState('seller', ['summary', 'menuIndex'])
  },
  mounted() {
    this.checkInitialPath()
  },
  methods: {
    ...Vuex.mapActions(['touched']),
    ...Vuex.mapMutations('seller', ['updateMI']),
    select(index) {
      let path = ''
      switch(index) {
        case '0-0': path = 'all'
        break
        case '0-1': {
          this.touched({channel: 'seller'})
          path = 'send'
        }
        break
        case '0-2': path = 'get'
        break
        case '0-3': path = 'sign'
        break
        default: path = 'all'
      }
      this.$router.push('/seller/' + path)
      this.updateMI({index}) // 这里重置, 否则不触发刷新
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

  @0Color: #0076ff;

  .sub-menu-container {
    position: relative;
    left: -20px;
    width: 200px;
    height: 100%;
    padding-left: 20px;
    color: #999;

    &:hover {
      background: @0Color;
    }
  }

  .menu {
    width: 200px;

    .el-menu-item.is-active {
      color: @0Color;
    }

    .el-submenu__title {

      // 为什么无效
      &:hover, &:focus {
        background-color: #eef6ff;
      }

      &>span {
        color: #999;
      }
    }

    .el-menu {
      height: 100%;
      min-height: 600px;
    }

    .el-menu-item {

      &:hover, &:focus {
        background-color: #eef6ff;
      }

      .summary {
        color: @0Color;
        margin-left: 8px;
      }

      .red-point {
        position: absolute;
        background: @0Color;
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
