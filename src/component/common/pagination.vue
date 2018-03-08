<template>
  <div class="pagination">
    <button class="pagination-direction"
      :class="{'pagination-direction-death': isFirst}"
      @click="limitClick('first')">|<<</button>
    <button class="pagination-direction"
      :class="{'pagination-direction-death': isFirst}"
      @click="directionClick('previous')"><</button>
    <ul class="pagination-pages">
      <li class="pagination-page-ctrl"
        :class="{'pagination-page-ctrl-selected': selectedIndex === index + (group * countPage)}"
        v-for="(item, index) in countPage"
        :key="index"
        v-if="shouldShowCount(item) <= countTotal"
        @click="pageCtrlClick(shouldShowCount(item) - 1)">{{shouldShowCount(item)}}</li>
    </ul>
    <button class="pagination-direction"
      :class="{'pagination-direction-death': isLast}"
      @click="directionClick('next')">></button>
    <button class="pagination-direction"
      :class="{'pagination-direction-death': isLast}"
      @click="limitClick('last')">>>|</button>
  </div>
</template>

<script>
export default {
  data() {
    return (
      {
        selectedIndex: -1
      }
    )
  },
  mounted: function() {
    let _initialSelectedIndex = this.initialSelectedIndex || 0
    if(_initialSelectedIndex >= this.countTotal - 1) _initialSelectedIndex = this.countTotal - 1
    this.pageCtrlClick(_initialSelectedIndex)
  },
  watch: {
    countTotal: function() {
      this.pageCtrlClick(0)
    }
  },
  computed: {
    group: function() {
      return parseInt(this.selectedIndex / this.countPage)
    },
    isFirst: function() {
      return this.selectedIndex === 0
    },
    isLast: function() {
      return this.selectedIndex === this.countTotal - 1
    }
  },
  props: {
    initialSelectedIndex: {
      type: Number,
      remind: '默认 0'
    },
    countPage: {
      type: Number,
      required: true
    },
    countTotal: {
      type: Number,
      required: true
    },
    pageClick: {
      type: Function,
      required: true
    }
  },
  methods: {
    pageCtrlClick: function(index) { // 处理 index 相关逻辑的唯一地方, 任何地方算好了 index, 直接调用即可
      if(index === this.selectedIndex) return
      this.selectedIndex = index
      this.pageClick(index)
    },
    directionClick(direction) { // 点击左右两个按钮处理
      let _index = null
      if(direction === 'next') {
        _index = this.selectedIndex + this.countPage
        _index = _index > this.countTotal - 1 ? this.countTotal - 1 : _index
      }
      else {
        _index = this.selectedIndex - this.countPage
        _index = _index < 0 ? 0 : _index
      }

      this.pageCtrlClick(_index)
    },
    limitClick(limit) { // 第一个或最后一个点击
      let _index = 0
      if(limit === 'last') _index = this.countTotal - 1

      this.pageCtrlClick(_index)
    },
    shouldShowCount(index) { // 自己对应显示的数字组码
      return index + (this.countPage * this.group)
    }
  }
}
</script>


<style scoped lang='less'>
@nw: 32px;
@nh: 32px;

.pagination {
  display: flex;
  justify-content: flex-start;
  align-items: center;

  .inline-block {
    display: inline-block;
  }

  .pagination-ctrl-common {
    width: @nw;
    height: @nh;
    background-color: white;
    border: 0;
    box-sizing: border-box;
    border: 1px solid #d8d8d8;
    border-radius: 4px;
    outline: none;
    cursor: pointer;
    .inline-block;
    margin-right: 4px;
    padding: 0;

    &:active {
      border: 2px solid #d8d8d8;
    }
  }

  .pagination-direction {
    .pagination-ctrl-common;
  }

  .pagination-direction-death {
    color: #d8d8d8;

    &:active {
      border: 1px solid #d8d8d8;
    }
  }

  .pagination-pages {
    padding: 0;
    .inline-block;
    display: flex;

    .pagination-page-ctrl {
      .pagination-ctrl-common;
      list-style: none;
      display: flex;
      justify-content: center;
      align-items: center;
    }

    .pagination-page-ctrl-selected {
      border: 1px solid #333;
    }
  }
}
</style>
