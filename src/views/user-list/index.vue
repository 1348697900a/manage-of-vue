<template>
  <div>
    <PageContentLayout>
      <template #filter>
        <div style="margin-bottom: 20px">筛选区</div>
        <a-form :model="formData" layout="vertical">
          <a-row :gutter="[24, 24]">
            <a-col :span="6">
              <a-form-item field="staff_name_list" label="员工姓名">
                <a-select
                  v-model="formData.staff_name_list"
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
            <a-button @click="() => (visible = !visible)" type="primary">
              <template #icon>
                <icon-user-add />
              </template>
              新增员工
            </a-button>
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
                      transformTimeKeys.includes(item.dataIndex)
                        ? transformTimeFormat(record[item.dataIndex])
                        : record[item.dataIndex]
                    }}
                  </template>
                </a-table-column>
              </template>
              <a-table-column title="操作">
                <template #cell="{ record }">
                  <a-button
                    v-if="record.is_exist === '在职'"
                    @click="() => handleStaffState(record)"
                    >禁用</a-button
                  >
                </template>
              </a-table-column>
            </template>
          </a-table>
        </div>
      </template>
    </PageContentLayout>
    <a-modal
      v-model:visible="visible"
      :ok-loading="okLoading"
      body-style="display:flex;justify-content: center;"
      title="新员工信息录入"
      @ok="handleSubmit"
      @before-ok="handleFormValidate"
      @cancel="() => (visible = !visible)"
    >
      <a-form ref="modalFormRef" style="width: 90%" :model="modalData">
        <a-form-item
          :rules="[{ required: true }]"
          field="staff_name"
          label="员工姓名"
        >
          <a-input
            placeholder="请输入员工姓名"
            v-model="modalData.staff_name"
          />
        </a-form-item>
        <a-form-item
          :rules="[{ required: true }]"
          field="college"
          label="所在学院"
        >
          <a-select
            allow-create
            placeholder="请输入所在学院"
            v-model="modalData.college"
          >
            <a-option value="物理与光电工程学院">物理与光电工程学院</a-option>
            <a-option value="计算机与软件学院">计算机与软件学院</a-option>
            <a-option value="电子信息工程学院">电子信息工程学院</a-option>
          </a-select>
        </a-form-item>
        <a-form-item
          :rules="[{ required: true }]"
          field="fingerprintID"
          label="指纹ID"
        >
          <a-input-number
            v-model="modalData.fingerprintID"
            placeholder="请输入指纹ID（0～127）"
            :min="0"
            :max="127"
          />
        </a-form-item>
      </a-form>
    </a-modal>
  </div>
</template>

<script lang="tsx" setup>
  import PageContentLayout from '@/layout/page-content-layout.vue';
  import useRequest from 'vue-hooks-plus/es/useRequest';
  import transformTimeFormat from '@/utils/transformTimeFormat';
  import { ref, watch } from 'vue';
  import columns from './columns';
  import getData from './data';
  import type { FormInstance } from '@arco-design/web-vue';
  import api from '@/api';
  import modal from '@arco-design/web-vue/es/modal';
  const formData = ref({
    staff_name_list: [],
  });
  const visible = ref(false);
  const modalData = ref({
    staff_name: '',
    college: '',
    fingerprintID: undefined,
  });
  const okLoading = ref(false);
  const modalFormRef = ref<FormInstance>();
  const { data, loading, run } = useRequest(getData);
  const transformTimeKeys = ['register_time', 'leave_time'];

  const handleFormValidate = async () => {
    // TODO
    // 确认按钮的loading
    // 查询模版是否被占用、用户是否已经存在
    okLoading.value = true;
    const res = await modalFormRef.value?.validate();
    if (res) {
      return false;
    }
    try {
      await api.validateFingerprintID({
        fingerprintID: modalData.value.fingerprintID,
      });
      return true;
    } catch (e) {
      console.log(e);
    } finally {
      okLoading.value = false;
    }

    return false;
  };
  const handleSubmit = async () => {
    api.addUserInfo(modalData.value);
    // modalFormRef.value?.resetFields();
  };
  const handleStaffState = async (record: any) => {
    modal.confirm({
      title: '再次确认',
      content: `是否禁用该${record.staff_name}的打卡权限？点击同意员工状态将变为已离职`,
      onOk: () => {
        api
          .updateUserInfo({
            is_exist:record.is_exist,
            fingerprintID: record.fingerprintID,
          })
          .then(() => {
            run(formData.value);
          });
      },
    });
  };
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
