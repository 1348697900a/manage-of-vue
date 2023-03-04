<template>
  <div>
    <PageContentLayout>
      <template #filter>
        <div style="margin-bottom: 20px">筛选区</div>
        <Filter :filter-list="data" />
      </template>
      <template #table> 表格区 </template>
    </PageContentLayout>
  </div>
</template>

<script lang="tsx" setup>
  import PageContentLayout from '@/layout/page-content-layout.vue';
  import Filter, { type FilterListType } from '@/components/filter/index.vue';
  const data: FilterListType = [
    {
      label: '姓名',
      name: 'userName',
      component: <a-input placeholder="请输入姓名" />,
    },
    {
      label: '所在部门',
      name: 'department',
      component: <a-input />,
    },
    {
      label: '打卡时间',
      name: 'date-range',
      component: <a-range-picker showTime style=" width: 100%; " />,
    }
  ];
</script>

<style scoped></style>
