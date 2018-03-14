<template>
  <div class="container">
    <div class="pr-selector"
      v-if="searchResultList && searchResultList.length > 0 && !baseInfoList">
      <div class="prs-header">
        <div class="prsh-item"></div>
        <div class="prsh-item">零件号</div>
        <div class="prsh-item">名称</div>
      </div>
      <div class="prs-content">
        <div :class="item.status ? 'prsc-row' : 'prscr-warning'"
          v-for="(item, index) in searchResultList" :key="index + 'rootItem'"
          @click='itemClick(item)'>
          <div class="prsc-item"></div>
          <div class="prsc-item">
            {{splitPid(item.pid, item.s_pid)[0]}}
            <span v-show="splitPid(item.pid, item.s_pid)[0] !== item.pid" class="prsc-item-special">
              {{item.s_pid}}
            </span>
            {{splitPid(item.pid, item.s_pid)[1]}}
          </div>
          <div class="prsc-item">
            {{item.label}}
          </div>
        </div>
        <div class="load-more"
          v-if="hasNext === 1"
          @click="loadMore">
          <el-button
            :loading="isLoaingMore">加载更多</el-button>
        </div>
      </div>
    </div>
    <div class="no-list"
      v-if="searchResultList && searchResultList.length === 0">
      <div class="img" v-if="isYHC" />
      <span class="remind" v-text="partSearchEmpty" />
    </div>
  </div>
</template>

<script>
import Vuex from 'vuex'

export default {
  data() {
    return {
      isLoaingMore: false // 是否加载更多中
    };
  },
  computed: {
    ...Vuex.mapGetters(['isYHC', "partSearchEmpty"]),
    ...Vuex.mapState("part", ["baseInfoList", "searchResultList", 'hasNext'])
  },
  methods: {
    ...Vuex.mapActions("part", ["resultItemClick", "searchLoadMore"]),
    splitPid(pid, sPid) {
      return pid.split(sPid);
    },
    loadMore() {
      this.isLoaingMore = true;
      this.searchLoadMore()
        .then(() => this.isLoaingMore = false)
    },
    itemClick(item) {
      this.resultItemClick({item, callback: () => this.$router.push('/part/detail')})
    }
  }
};
</script>

<style scoped lang="less">
.container {
  .pr-selector {
    .row {
      display: flex;
      width: 100%;
      height: 40px;
    }

    .item {
      display: flex;
      align-items: center;

      &:nth-child(1) {
        width: 5%;
      }

      &:nth-child(2) {
        width: 25%;
      }

      &:nth-child(3) {
        width: 75%;
      }
    }

    .prs-header {
      .row;
      background-color: #e6e6e6;

      .prsh-item {
        .item;
      }
    }

    .prs-content {
      min-height: 400px;
      background-color: white;

      .prsc-row {
        .row;
        cursor: pointer;

        &:nth-child(2n) {
          background-color: white;
        }

        &:nth-child(2n + 1) {
          background-color: #f5f5f5;
        }

        .prsc-item {
          .item;

          .prsc-item-special {
            color: #4990e2;
          }
        }
      }

      .prscr-warning {
        .prsc-row;
        cursor: default;

        .prsc-item {
          color: #f33;
        }
      }

      .load-more {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 1024px;
        height: 40px;
        border: 1px solid #d8d8d8;
        cursor: pointer;
      }
    }
    }

    .no-list {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 1024px;
      min-height: 368px;
      background-color: white;

      .img {
        width: 40px;
        height: 40px;
        background: url(/sp/static/img/spirit.png) 0 -280px ~'/' 40px auto no-repeat;
      }

      .remind {
        font-size: 16px;
        color: #9b9b9b;
      }
    }
}
</style>
