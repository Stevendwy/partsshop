<template>
  <div class="d-navi">
    <div class="d-back"
      @click="back"/>
    <div class="d-container">
      <div :class="selectedIndex === 0 ? 'dc-item-selected' : 'dc-item'"
        @click="selectorClick(0)">商品</div>
      <div :class="selectedIndex === 1 ? 'dc-item-selected' : 'dc-item'"
        @click="selectorClick(1)">详情</div>
    </div>
    <div class="d-box"></div>
  </div>
</template>

<script>
import Vuex from 'vuex'

export default {
  computed: {
    ...Vuex.mapState('part/detail', [
      'selectedIndex'
    ])
  },
  mounted() {
    this.selectorClick(0)
  },
  methods: {
    ...Vuex.mapMutations("part", ["detailBack"]),
    ...Vuex.mapMutations('part/detail', [
      'updateI'
    ]),
    back() {
      this.detailBack();
      this.$router.push("/part/selector");
    },
    selectorClick(index) {
      this.updateI({index, callback: () => {
        if(index === 0) this.$router.push('/part/detail')
        else this.$router.push('/part/detail/content')
      }})
    }
  }
}
</script>

<style scoped lang="less">
.d-navi {
  width: 1024px;
  height: 40px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border: 0 solid #EFEFEF;
  box-shadow: 0 0 2px 0 rgba(0,0,0,0.12), 0 2px 2px 0 rgba(0,0,0,0.24);

  .d-back {
    width: 52px;
    height: 24px;
    margin-left: 8px;
    border: 1px solid #cac9ca;
    border-radius: 4px;
    box-shadow: 0 0 0 0 rgba(0, 0, 0, 0.3);
    background: #f9f9f9 url(/static/img/spirit.png) 4px -88px ~"/" 40px auto no-repeat;
    cursor: pointer;
  }

  .d-container {
    width: 200px;
    height: 40px;
    display: flex;
    justify-content: center;
    align-items: center;

    .dc-item {
      display: flex;
      justify-content: center;
      align-items: center;
      box-sizing: border-box;
      height: 100%;
      margin: 0 10px;
      border-bottom: 2px solid white;
      cursor: pointer;
      font-size: 14px;
      color:#666;
    }

    .dc-item-selected {
      .dc-item;
      color: #ec6337;
      border-bottom: 2px solid #ec6337;
    }
  }

  .d-box {
    width: 52px;
    height: 40px;
  }
}
</style>
