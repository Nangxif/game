<template>
  <div id="app">
    <router-view />
  </div>
</template>
<script>
import preventScroll from './rpf/un/preventScroll';
preventScroll();
export default {
  name: 'app'
};
</script>
<style lang="scss">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  -webkit-overflow-scrolling: touch;
  user-select: none;
  /deep/ .scrollbar-track-y {
    width: 4px;
  }
  /deep/ .scrollbar-track {
    background: rgba(222, 222, 222, 0.75);
    .scrollbar-thumb {
      background: rgba(0, 0, 0, 0.3);
      width: 4px;
      border-radius: 2px;
    }
  }
}
</style>
