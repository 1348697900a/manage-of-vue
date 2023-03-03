<template>
  <div class="filter container">
    <div>筛选区</div>
  </div>
  <div class="content container">
    表格内容
  </div>
</template>
<script lang="ts" setup>
</script>
<style scoped lang="less">
.container {
  background-color: white;
}
.filter {
  min-height: 200px;
}
.content {
  margin-top: 40px;
  min-height: calc(100vh - 340px);
}
</style>
