<script setup lang="ts">
  import Default from '@/layout/default-layout.vue';
  import { useConfigStore } from './store';
  const configStore = useConfigStore();
  configStore.updateConfig();
</script>

<template>
  <Default />
</template>

<!-- <style scoped>

</style> -->
