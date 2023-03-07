<template>
  <div>
    <PageContentLayout>
      <template #filter>
        <div style="margin-bottom: 20px">筛选区</div>
        <a-form :model="formData" ref="formRef" layout="vertical">
          <a-row :gutter="[24, 24]">
            <a-col :span="6">
              <a-form-item field="user_name_list" label="员工姓名">
                <a-select
                  v-model="formData.user_name_list"
                  placeholder="请输入员工姓名"
                  multiple
                  allow-create
                >
                  <a-option>Beijing</a-option>
                  <a-option>Shanghai</a-option>
                  <a-option>Guangzhou</a-option>
                  <a-option disabled>Disabled</a-option>
                  <a-option>Shenzhen</a-option>
                  <a-option>Chengdu</a-option>
                  <a-option>Wuhan</a-option>
                </a-select>
              </a-form-item>
            </a-col>
            <a-col :span="6">
              <a-form-item field="department_list" label="所在部门">
                <a-select
                  v-model="formData.department_list"
                  placeholder="请输入员工所在部门"
                  multiple
                  allow-create
                >
                  <a-option>物理与光电工程学院</a-option>
                  <a-option>电子信息工程学院</a-option>
                  <a-option>建筑学院</a-option>
                </a-select>
              </a-form-item>
            </a-col>
            <a-col :span="6">
              <a-form-item field="date_range" label="打卡时间">
                <a-range-picker
                  v-model="formData.date_range"
                  showTime
                  style="width: 380px"
                />
              </a-form-item>
            </a-col>
          </a-row>
        </a-form>
      </template>
      <template #table>
        <div class="table-head">
          <div class="title">考勤列表</div>
          <div class="operation">
            <a-tooltip content="设置考勤时间">
              <a-button type="primary">
                <template #icon>
                  <icon-settings />
                </template>
                设置
              </a-button>
            </a-tooltip>
            <a-checkbox>开启过滤</a-checkbox>
          </div>
        </div>
        <div class="table-content">
          <a-table :loading="loading" :columns="columns" :data="data?.data" />
        </div>
      </template>
    </PageContentLayout>
  </div>
</template>

<script lang="tsx" setup>
  import PageContentLayout from '@/layout/page-content-layout.vue';
  import type { FormInstance } from '@arco-design/web-vue';
  import useRequest from 'vue-hooks-plus/es/useRequest';
  import { ref, watch } from 'vue';
  import columns from './columns';
  import getData from './data';
  const formData = ref({
    date_range: [],
    department_list: '',
    user_name_list: [],
  });
  const formRef = ref<FormInstance>();

  const { data, loading, run } = useRequest(getData);
  watch(
    formData.value,
    () => {
      run(formData.value.user_name_list[0]);

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
