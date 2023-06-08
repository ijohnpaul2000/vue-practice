<template>
  <div class="card" :class="{ reverse: reverse }">
    <slot></slot>
  </div>
</template>

<script lang="ts">
export default {
  name: 'Card', //eslint-disable-line
  props: {
    reverse: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style scoped>
.card {
  background: #fff;
  color: #212121;
}
.card.reverse {
  background: #212121;
  color: #fff;
}
</style>
