<template>
  <router-view v-slot="{ Component, route }">
    <transition name="fade" mode="out-in">
      <component
        :is="Component"
        :key="route.path"
      />
    </transition>
  </router-view>
</template>
<script lang="ts" setup>
  console.log(1111);
</script>
