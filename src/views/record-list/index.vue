<template>
  <div>
    <PageContentLayout>
      <template #filter>
        <div style="margin-bottom: 20px">筛选区</div>
        <a-form :model="formData" layout="vertical">
          <a-row :gutter="[24, 24]">
            <a-col :span="6">
              <a-form-item field="staff_name_list" label="员工姓名">
                <BSelect
                  placeholder="请输入员工姓名"
                  :allow-clear="true"
                  :allow-create="true"
                  :multiple="true"
                  v-model="queryConfig.staff_name_list"
                />
              </a-form-item>
            </a-col>
            <a-col :span="6">
              <a-form-item field="college_list" label="所在部门">
                <a-select
                  v-model="queryConfig.college_list"
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
                  v-model="queryConfig.date_range"
                  showTime
                  style="width: 380px"
                />
              </a-form-item>
            </a-col>
          </a-row>
        </a-form>
      </template>
      <template #table>
        <a-space
          style="width: 100%; justify-content: space-around"
          size="large"
        >
          <template #split>
            <a-divider direction="vertical" />
          </template>
          <a-statistic
            title="在职员工"
            :start="animationState"
            animation
            :animation-duration="500"
            :value-from="0"
            :value="showData.total_nums"
            show-group-separator
          >
          </a-statistic>
          <a-statistic
            title="已打卡人数"
            :value="showData.sign_nums"
            animation
            :animation-duration="500"
            :start="animationState"
            :value-from="0"
            :value-style="{ color: 'green' }"
          >
          </a-statistic>
          <a-statistic
            title="未打卡人数"
            :value-from="0"
            :animation-duration="500"
            :value="showData.total_nums-showData.sign_nums"
            :value-style="{ color: 'red' }"
            :start="animationState"
            animation
          >
          </a-statistic>
        </a-space>
        <div class="table-head">
          <div class="title">考勤列表</div>
          <div style="margin-left: 30px">
            当前上班时间：
            <span style="color: red"
              >{{ work_time_range.morning[0] }}～{{
                work_time_range.morning[1]
              }}，{{ work_time_range.afternoon[0] }}～{{
                work_time_range.afternoon[1]
              }}</span
            >
          </div>
          <div class="operation">
            <a-tooltip content="设置考勤时间">
              <a-button @click="() => (visible = !visible)" type="primary">
                <template #icon>
                  <icon-settings />
                </template>
                设置
              </a-button>
            </a-tooltip>
            <a-checkbox @change="(e)=> queryConfig.is_late=e as boolean"
              >开启过滤</a-checkbox
            >
          </div>
        </div>
        <div class="table-content">
          <a-table :loading="loading" :data="data">
            <template #columns>
              <template v-for="item in columns" :key="item.dataIndex">
                <a-table-column
                  :title="item.title"
                  :data-index="item.dataIndex"
                >
                  <template #cell="{ record }">
                    {{
                      item.dataIndex === 'date'
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
    <a-modal
      v-model:visible="visible"
      title="考勤时间设置"
      @ok="handleSubmit"
      @cancel="() => (visible = !visible)"
    >
      <a-form ref="modalFormRef" style="width: 90%" :model="modalData">
        <a-form-item field="work_time_range1" label="早上">
          <a-time-picker
            value-format="timestamp"
            placeholder="打卡时间"
            v-model="modalData.work_time_range1"
            showTime
            disableConfirm
            format="HH:mm"
            type="time-range"
          />
        </a-form-item>
        <a-form-item field="work_time_range2" label="下午">
          <a-time-picker
            value-format="timestamp"
            v-model="modalData.work_time_range2"
            showTime
            disableConfirm
            placeholder="打卡时间"
            format="HH:mm"
            type="time-range"
          />
        </a-form-item>
      </a-form>
    </a-modal>
  </div>
</template>

<script lang="tsx" setup>
  import PageContentLayout from '@/layout/page-content-layout.vue';
  import BSelect from '@/components/selectB/index.vue';
  import { useBoolean } from 'vue-hooks-plus';
  import type { FormInstance } from '@arco-design/web-vue';
  import useRequest from 'vue-hooks-plus/es/useRequest';
  import { ref, watch } from 'vue';
  import columns from './columns';
  import getData from './data';
  import transformTimeFormat from '@/utils/transformTimeFormat';
  import { useConfigStore } from '@/store';
  import api from '@/api';
  import type { FormDataType, TableQueryType } from './type';

  const { work_time_range } = useConfigStore();
  const [animationState, { setFalse, setTrue }] = useBoolean(false);
  const formData = ref<FormDataType>({
    date_range: [],
    college_list: [],
    staff_name_list: [],
  });
  const modalData = ref({
    work_time_range1: work_time_range.morning,
    work_time_range2: work_time_range.afternoon,
  });

  const queryConfig = ref<FormDataType & TableQueryType>({
    date_range: [],
    college_list: [],
    staff_name_list: [],
    is_late: undefined,
    page_current: 1,
    page_size: 10,
  });
  const modalFormRef = ref<FormInstance>();
  const visible = ref(false);
  const showData = ref<{
    total_nums: number;
    sign_nums: number;
  }>({ total_nums: 0, sign_nums: 0});
  const { data, loading, run } = useRequest(getData);
  const handleSubmit = () =>
    api.updateConfig({
      work_time_range: {
        morning: modalData.value.work_time_range1,
        afternoon: modalData.value.work_time_range2,
      },
    });

  watch(
    queryConfig.value,
    () => {
      run(queryConfig.value);
      setFalse();
      api.dataShow().then((res) => {
       
        const infoList = [res.data.list[0]];
        const list = infoList.map((v: any) => {
          // 完成打卡人数
          const sign_nums = Math.min(
            v.total_nums - v.morning.length,
            v.total_nums - v.afternoon.length
          );
          return {
            sign_nums,
            total_nums: v.total_nums,
            date: v.date,
          };
        });
        showData.value = list[0]
        setTrue();
      });
    },
    { deep: true, immediate: true }
  );
</script>

<style scoped lang="less">
  .table-head {
    display: flex;
    padding: 20px 40px 0 15px;
    margin-bottom: 30px;
    align-items: center;
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
