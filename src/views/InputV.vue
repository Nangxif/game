<template>
  <div class="inputv">
    <input type="text" placeholder="输入框" />
  </div>
</template>
<script>
export default {
  name: 'inputv',
  data() {
    return {};
  }
};
</script>
<style lang="scss" scoped>
.inputv {
  position: absolute;
  left: 0px;
  top: 0px;
  width: 100%;
  height: 100%;
  input {
    position: absolute;
    left: 0px;
    top: 600px;
  }
}
</style>
