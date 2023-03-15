<template>
  <div>
    <div>aaa</div>
    <BSelect
      :allow-search="true"
      :allow-clear="true"
      :allow-create="true"
      :options="data"
      :multiple="true"
      v-model="selectValue"
    />
  </div>
</template>

<script setup lang="ts">
  import BSelect from '@/components/selectB/index.vue';
  import { ref, watch } from 'vue';
  const selectValue = ref<string[]>();
  const data = [{ label: '小蓝', value: 'xiaolang' }];
  const handleValueChange = (e: string[]) => {
    console.log(selectValue.value);
  };
  const handleSearch = (e: any) => {
    console.log(e);
  };
  const handleFetchData = (e: any) => {
    return Promise.resolve([{ label: '小红', value: 'xiaohong' }]);
  };
  watch(
    selectValue,
    () => {
      console.log(selectValue.value);
    },
    { deep: true }
  );
</script>
