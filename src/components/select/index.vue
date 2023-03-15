<template>
  <a-select
    v-model="selectValue"
    v-bind="{ clearable: true, filterable: true, ...$attrs }"
    :multiple="multiple"
    :allow-search="true"
    :allow-create="allowCreate"
    :loading="state"
    @search="handleSearch"
  >
    <a-option
      v-for="(item, index) in optionsData"
      :key="index + 'i'"
      :label="item.label"
      :value="item.value"
    ></a-option>
  </a-select>
</template>
<script lang="ts">
  export default {
    name: 'TSelect',
    extends: Select,
  };
</script>
<script setup lang="ts">
  import type { ISelectDrownOptions } from '@/api/type';
  import { useBoolean } from 'vue-hooks-plus';
  import { watch, ref } from 'vue';
  import { Select } from '@arco-design/web-vue';
  const props = defineProps<{
    getData: (keywords?: string) => Promise<ISelectDrownOptions>;
    multiple?: boolean;
    originSearch?: boolean;
    deepList?: string[];
    allowCreate?: boolean;
  }>();
  const optionsData = ref<ISelectDrownOptions>([]);
  const selectValue = ref<string[]>([]);
  const [state, { setTrue, setFalse }] = useBoolean(false);

  // 获取下拉选项的数据
  const updateOptionsData = (keywords?: string) => {
    console.log(keywords);

    setTrue();
    props
      .getData(keywords)
      .then((res) => {
        optionsData.value = res;
        setFalse();
      })
      .catch((e) => {
        console.log(e);
        setFalse();
      });
  };
  const handleSearch = (e: string) => {
    props.originSearch && updateOptionsData(e);
  };
  watch(
    props.deepList || [],
    () => {
      updateOptionsData();
    },
    { immediate: true, deep: true }
  );
</script>
