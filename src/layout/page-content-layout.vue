<template>
  <div class="filter container">
      <slot name="filter"></slot>
  </div>
  <div class="content container">
    <slot name="table"></slot>
  </div>
</template>
<script lang="ts" setup>

</script>
<style scoped lang="less">
.container {
  background-color: white;
  border-radius: 10px;
  box-shadow: 0 2px 5px 0 rgb(0 0 0 / 8%);
}
.filter {
  min-height: 200px;
  padding: 20px 0 0 15px;
}
.content {
  margin-top: 40px;
  min-height: calc(100vh - 340px);
}
</style>

