<template>
  <header>
    <img v-if='image' :src='image' />
  </header>
</template>

<style scoped lang="sass">
  @import "~assets/styles/variables";
  @lost flexbox flex;

  header {
    background-color: $primary-color;
    height: $header-height;
    left: 0;
    position: fixed;
    right: 0;
    top: 0;
    width: 100%;
    z-index: 10;

    img {
      height: $header-img-height;
      margin-left: $spacing;
      margin-top: $spacing;
      vertical-align: middle;
    }
  }
</style>

<script>
  export default {
    name: 'app-header',
    props: {
      image: String
    }
  }
</script>
