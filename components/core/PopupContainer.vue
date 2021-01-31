<template>
  <div class="wrap">
    <slot></slot>
    <div class="wrap__bg"></div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },

  computed: {},

  created() {},

  methods: {},
};
</script>

<style lang="scss">
.wrap {
  position: relative;
  display: flex;
  height: 100vh;

  &__bg {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: -1;
    background: rgba(27, 32, 79, 0.2);
  }
}
</style>
