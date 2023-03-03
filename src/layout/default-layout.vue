<template>
  <ALayout class="default-layout">
    <ALayoutHeader class="header">
      <a
        href="https://www.szu.edu.cn"
        target="_blank"
        rel="noopener noreferrer"
      >
        <img style="height: 28px;" src="https://www.szu.edu.cn/images/logo_03.png" alt="" />
      </a>
    </ALayoutHeader>
    <ALayout>
      <ALayoutSider class="sider"><Menu /> </ALayoutSider>
      <ALayoutContent class="content"> <PageLayout /> </ALayoutContent>
    </ALayout>
  </ALayout>
</template>

<script lang="ts" setup>
  import Menu from '@/components/menu/index.vue';
  import PageLayout from './page-layout.vue';
</script>
<style scoped lang="less">
  .default-layout {
    height: 100vh;
    width: 100vw;
    .header {
      height: 60px;
      padding: 16px 0 16px 48px;
      border-bottom: 1px solid var(--color-border);
    }
    .sider {
      background-color: var(--color-primary-light-3);
    }
    .content {
      padding: 20px;
      background-color: rgba(245, 244, 244, .6);
   
    }
  }
</style>
