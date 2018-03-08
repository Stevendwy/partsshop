<template>
  <div class="search-container">
    <div class="search">
      <div class="search-title">{{title}}</div>
      <div class="search-input-container">
        <input ref='input' type="text" class="search-input" placeholder="输入零件号 / 名称" autofocus
          @keydown.13="search"
          v-model="searchValue">
        <!-- <div class="search-icon" @click="search" /> -->
        <div class="search-clean" @click="clean" v-if="cleanShow">
          <i class="el-icon-circle-close"></i>
        </div>
        <div class="search-text" @click="search">
          搜索
          <div class="no-result" v-if="hasSearch && noResult">没有找到相关信息</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Vuex from 'vuex'

export default {
  data() {
    return {
      searchValue: "",
      hasSearch: false,
      cleanShow: false, // 显示清空按钮
    };
  },
  computed: {
    ...Vuex.mapState("hub", ['noResult'])
  },
  watch: {
    searchValue(value) {
      if(value.length > 0) this.cleanShow = true
      else this.cleanShow = false

      this.hasSearch = false
      this.$emit("change", this.searchValue);
    }
  },
  methods: {
    clean() {
      this.searchValue = ''
      this.$nextTick(() => {
        this.$refs.input.focus()
      })
    },
    search() {
      this.hasSearch = true
      this.$emit("search", this.searchValue);
    }
  },
  props: ["title"]
};
</script>

<style scoped lang="less">
.search-container {
  display: flex;
  justify-content: center;
  width: 1024px;

  .search {
    position: relative;
    display: flex;
    align-items: flex-end;
    width: 1024px;
    height: 56px;

    .search-title {
      position: absolute;
      top: 0;
      left: 412px;
      display: flex;
      justify-content: center;
      align-items: center;
      width: 200px;
      height: 100%;
      color: white;
      font-size: 20px;
    }

    .search-input-container {
      position: relative;
      margin-left: 30px;

      .search-input {
        width: 306px;
        height: 32px;
        padding-left: 8px;
        border: 0;
        border-radius: 4px;
        border: 1px solid #20a0ff;
      }

      .search-icon {
        position: absolute;
        top: -4px;
        right: 0;
        width: 40px;
        height: 40px;
        background: url(/static/img/spirit.png) 0 -120px ~"/" 40px auto
          no-repeat;
        cursor: pointer;
      }

      .search-clean {
        position: absolute;
        right: 66px;
        top: 0;
        display: flex;
        justify-content: center;
        align-items: center;
        width: 32px;
        height: 32px;
        cursor: pointer;
      }

      .search-text {
        position: absolute;
        top: 0;
        right: 0;
        width: 66px;
        line-height: 32px;
        text-align: center;
        background: #0063ff;
        border-radius: 0 4px 4px 0;
        color: white;
        cursor: pointer;

        .no-result {
          position: absolute;
          top: 32px;
          right: 66px;
          width: 240px;
          line-height: 32px;
          color: #999;
          border: 1px solid #999999;
          background: white;
        }
      }
    }
  }
}
</style>
