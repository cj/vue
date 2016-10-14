<template>
  <footer>
    <slot />
  </footer>
</template>

<style scoped lang="sass">
  @import "~assets/styles/variables";

  footer {
    background-color: $tertiary-color;
    bottom: 0;
    height: $footer-height;
    left: 0;
    position: fixed;
    width: 100%;
    z-index: 10;
  }
</style>

<script>
  export default {
    name: 'app-footer'
  }
</script>
