<template>
  <div class="banner">
    <div class="banner-inner">
      <a-carousel class="carousel" animation-name="fade">
        <a-carousel-item
          style="width: 100%; height: 100vh"
          v-for="(item, index) in carouselItem"
          :key="index"
        >
          <div :key="index" class="carousel-item">
            <img class="carousel-image" :src="item" />
          </div>
        </a-carousel-item>
      </a-carousel>
    </div>
  </div>
</template>
<script lang="ts" setup>
  import { computed } from 'vue';
  const carouselItem = computed(() => [
    'https://www.szu.edu.cn/__local/F/44/09/13DDE5FC14356BE847B7900E8CB_2547CCD9_11DD1E.jpg',
    "https://n.sinaimg.cn/sinakd20210320ac/503/w1778h1125/20210320/4a12-kmrcukz3763520.jpg",
    "https://p5.itc.cn/q_70/images01/20210423/c4697a3952f845cca78c43b5d08aa673.jpeg"
  ]);
</script>

<style lang="less" scoped>
  .banner {
    display: flex;
    align-items: center;
    justify-content: center;

    &-inner {
      flex: 1;
      height: 100%;
    }
  }

  .carousel {
    height: 100%;

    &-item {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      height: 100%;
    }

    &-title {
      color: var(--color-fill-1);
      font-weight: 500;
      font-size: 20px;
      line-height: 28px;
    }

    &-sub-title {
      margin-top: 8px;
      color: var(--color-text-3);
      font-size: 14px;
      line-height: 22px;
    }

    &-image {
     
      height: 100vh;
    }
  }
</style>
