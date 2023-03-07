<template>
  <div>
    <PageContentLayout>
      <template #filter>
        <div style="margin-bottom: 20px">筛选区</div>
        <a-form :model="formData" layout="vertical">
          <a-row :gutter="[24, 24]">
            <a-col :span="6">
              <a-form-item field="user_name_list" label="员工姓名">
                <a-select
                  v-model="formData.user_name_list"
                  placeholder="请输入员工姓名"
                  multiple
                  allow-create
                >
                  <a-option>小明</a-option>
                  <a-option>小红</a-option>
                </a-select>
              </a-form-item>
            </a-col>
          </a-row>
        </a-form>
      </template>
      <template #table>
        <div class="table-head">
          <div class="title">员工列表</div>
          <div class="operation">
            <a-button type="primary">
              <template #icon>
                <icon-user-add />
              </template>
              新增员工
            </a-button>
          </div>
        </div>
        <div class="table-content">
          <a-table :loading="loading" :data="data?.data">
            <template #columns>
              <template v-for="item in columns" :key="item.dataIndex">
                <a-table-column
                  :title="item.title"
                  :data-index="item.dataIndex"
                >
                </a-table-column>
              </template>
              <a-table-column title="操作">
                <template #cell="{ record }">
                  <a-button
                    @click="
                      $modal.confirm({
                        title: '再次确认',
                        content: `是否禁用该${record.staff_name}的打卡权限？点击同意员工状态将变为已离职`,
                      })
                    "
                    >禁用</a-button
                  >
                </template>
              </a-table-column>
            </template>
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
  const formData = ref({
    user_name_list: [],
  });
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
