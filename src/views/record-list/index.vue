<template>
  <div>
    <PageContentLayout>
      <template #filter>
        <div style="margin-bottom: 20px">筛选区</div>
        <a-form :model="formData" ref="formRef" layout="vertical">
          <a-row :gutter="[24, 24]">
            <a-col :span="6">
              <a-form-item field="staff_name_list" label="员工姓名">
                <a-select
                  v-model="formData.staff_name_list"
                  placeholder="请输入员工姓名"
                  multiple
                  allow-create
                >
                  <a-option value="小明">小明</a-option>
                  <a-option value="小红">小红</a-option>
                </a-select>
              </a-form-item>
            </a-col>
            <a-col :span="6">
              <a-form-item field="college_list" label="所在部门">
                <a-select
                  v-model="formData.college_list"
                  placeholder="请输入员工所在学院"
                  multiple
                  allow-create
                >
                  <a-option>物理与光电工程学院</a-option>
                  <a-option>计算机软件学院</a-option>
                  <a-option>电子信息工程学院</a-option>
                  <a-option>建筑学院</a-option>
                </a-select>
              </a-form-item>
            </a-col>
            <a-col :span="6">
              <a-form-item field="date_range" label="打卡时间">
                <a-range-picker
                  value-format="timestamp"
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
          <!-- <a-table :loading="loading" :columns="columns" :data="data" /> -->
          <a-table :loading="loading" :data="data">
            <template #columns>
              <template v-for="item in columns" :key="item.dataIndex">
                <a-table-column :title="item.title" :data-index="item.dataIndex">
                  <template #cell="{ record }">
                    {{
                      item.dataIndex === "date"
                        ? transformTimeFormat(record.date)
                        : record[item.dataIndex]
                    }}
                  </template>
                </a-table-column>
              </template>
            </template>
          </a-table>
        </div>
      </template>
    </PageContentLayout>
  </div>
</template>

<script lang="tsx" setup>
import PageContentLayout from "@/layout/page-content-layout.vue";
import type { FormInstance } from "@arco-design/web-vue";
import useRequest from "vue-hooks-plus/es/useRequest";
import { ref, watch } from "vue";
import columns from "./columns";
import getData from "./data";
import transformTimeFormat from "@/utils/transformTimeFormat";

const formData = ref({
  date_range: [],
  college_list: [],
  staff_name_list: [],
});
const formRef = ref<FormInstance>();
console.log(transformTimeFormat(new Date().getTime()));
const { data, loading, run } = useRequest(getData);
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
