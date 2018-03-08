<template>
  <div class="container"
    @mouseover="isMouseOver = true"
    @mouseout="isMouseOver = false">
    <input ref="input" type="text" class="input"
      :placeholder="placeholder"
      @keydown.13="enter($event)"
      @focus="focus"
      @blur="blur($event)">
    <div class="items">
      <div :class="isMouseOver ? 'item' : 'hidden'"
        v-for="(title, index) in titles" :key="index"
        @click="itemClick(title)">{{title}}</div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["item", 'type', 'titles'],
  data() {
    return {
      isMouseOver: false,
      hiddenPlaceholder: false
    }
  },
  computed: {
    placeholder() {
      if(this.hiddenPlaceholder) return ''
      else return this.item && this.item[this.type]
    }
  },
  methods: {
    focus() {
      this.$refs.input.value = this.placeholder
      // this.hiddenPlaceholder = true
    },
    blur(e) {
      // this.hiddenPlaceholder = false
      this.enter(e)
    },
    enter(e) {
      this.itemClick(e.target.value)
      e.target.blur()
      this.$refs.input.value = ''
    },
    itemClick(value) {
      if(value.length < 1) return 

      let payload = {item: this.item}
      payload[this.type] = value
      
      this.$emit('update', payload)
      this.isMouseOver = false
    }
  }
}
</script>

<style scoped lang="less">
.container {
  width: 100%;
  height: 32px;

  @sColor: #0063ff;

  .input {
    position: relative;
    left: 5%;
    width: 90%;
    height: 100%;
    padding: 0;
    border: 0;
    box-sizing: border-box;
    outline: none;
    background: white;
    border: 1px solid @sColor;
    box-shadow: 0 1px 1px 0 rgba(0,0,0,0.40);
    border-radius: 4px;
    text-align: center;
  }

  .items {
    position: relative;
    left: 5%;
    width: 90%;
    z-index: 2;

    .item {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 100%;
      height: 32px;
      background: #FFFFFF;
      box-shadow: 0 0 2px 0 rgba(0,0,0,0.12), 0 2px 2px 0 rgba(0,0,0,0.24);
      cursor: pointer;

      &:hover {
        background-color: #f2f2f2;
      }
    }

    .hidden {
      display: none;
    }
  }
}
</style>
