<template>
  <div>
    <PageContentLayout>
      <template #filter>
        <div style="margin-bottom: 20px">筛选区</div>
        <a-form :model="formData" layout="vertical">
          <a-row :gutter="[24, 24]">
            <a-col :span="6">
              <a-form-item field="date" label="查询日期">
                <a-date-picker v-model="formData.date" placeholder="请选择日期">
                  <template #extra>Extra footer</template>
                </a-date-picker>
              </a-form-item>
            </a-col>
          </a-row>
        </a-form>
        <a-button type="primary" @click="handleTest">test</a-button>
      </template>
     
      <template #table>
        <div class="table-head">
          <div class="title">数据汇总（T+1）</div>
        </div>
        <div class="table-content">
          <a-table :columns="columns" :loading="loading" :data="data">
          </a-table>
        </div>
      </template>
    </PageContentLayout>
  </div>
</template>

<script lang="tsx" setup>
  import PageContentLayout from '@/layout/page-content-layout.vue';
  import useRequest from 'vue-hooks-plus/es/useRequest';
  import { ref, watch } from 'vue';
  import columns from './columns';
  import getData from './data';
import api from '@/api';
  const formData = ref<{ date: string | number | Date }>({
    date: '',
  });
  const { data, loading, run } = useRequest(getData);
  const handleTest =() => {
    api.getStaffName()
  }
  watch(
    formData.value,
    () => {
      run(formData.value);
    },
    { deep: true }
  );
</script>

<style scoped lang="less">
  .table-head {
    display: flex;
    padding: 20px 40px 0 15px;
    margin-bottom: 30px;
    .title {
      font-size: 20px;
    }
    .operation {
      margin-left: auto;
      button {
        margin-right: 20px;
      }
    }
  }
</style>
