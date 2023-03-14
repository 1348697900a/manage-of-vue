<template>
  <div class="login-form-wrapper">
    <div style="margin-bottom: 30px">
      <div class="login-form-title">指纹考勤系统管理端登陆</div>
      <div class="login-form-sub-title">基于esp8266、AS608的指纹考勤机</div>
    </div>
    <a-form
      ref="loginForm"
      :model="loginData"
      class="login-form"
      layout="vertical"
      @submit="handleSubmit"
    >
      <a-form-item
        field="account"
        :rules="[{ required: true, message: '必填' }]"
        hide-label
      >
        <a-input v-model="loginData.account" placeholder="请输入账号">
          <template #prefix>
            <icon-user />
          </template>
        </a-input>
      </a-form-item>
      <a-form-item
        field="password"
        :rules="[{ required: true, message: '必填' }]"
        hide-label
      >
        <a-input-password
          v-model="loginData.password"
          placeholder="请输入密码"
          allow-clear
        >
          <template #prefix>
            <icon-lock />
          </template>
        </a-input-password>
      </a-form-item>
      <a-space :size="16" direction="vertical">
        <a-button type="primary" html-type="submit" long :loading="loading">
          登陆
        </a-button>
      </a-space>
    </a-form>
  </div>
</template>

<script lang="ts" setup>
  import { ref } from 'vue';
  import { useRouter } from 'vue-router';
  import { useBoolean } from 'vue-hooks-plus';
  import { Message, type FormInstance } from '@arco-design/web-vue';;
  import { useUserInfoStore } from '@/store';

  const router = useRouter();
  const userInfo = useUserInfoStore();
  const loginData = ref<{ account: string; password: string }>({
    account: '',
    password: '',
  });
  const loginForm = ref<FormInstance>();
  const [loading, { setTrue, setFalse }] = useBoolean(false);

  const handleSubmit = async () => {
    const res = await loginForm.value?.validate();
    if (res) {
      return;
    }
    setTrue();
    try {
      await userInfo.login({
        account: loginData.value.account,
        password: loginData.value.password,
      });
      Message.success({
        content: `欢迎${userInfo.admin_name}回来👏👏👏`,
      });
      router.push('recordList')
    } finally {
      setFalse();
    }
  };
</script>

<style lang="less" scoped>
  .login-form {
    &-wrapper {
      width: 320px;
    }

    &-title {
      color: var(--color-text-1);
      font-weight: 500;
      font-size: 24px;
      line-height: 32px;
    }

    &-sub-title {
      color: var(--color-text-3);
      font-size: 16px;
      line-height: 24px;
    }

    &-error-msg {
      height: 32px;
      color: rgb(var(--red-6));
      line-height: 32px;
    }

    &-password-actions {
      display: flex;
      justify-content: space-between;
    }

    &-register-btn {
      color: var(--color-text-3) !important;
    }
  }
</style>
