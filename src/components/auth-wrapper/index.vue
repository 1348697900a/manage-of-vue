<template>
  <div v-if="hasAuth"><slot></slot></div>
</template>
<script setup lang="ts">
import useCheckAuth from "@/utils/check-auth";
import { ref } from "vue";
const props = defineProps<{ auth: string }>();
const [, checkAuth] = useCheckAuth();
const hasAuth = ref(checkAuth(props.auth));
</script>
