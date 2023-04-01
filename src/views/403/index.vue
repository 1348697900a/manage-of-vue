<template>
  <h2>403!无权限或处于未登陆状态，请联系开发者申请 </h2>
</template>


<script setup lang="ts">
import { Message } from '@arco-design/web-vue';
import { ref } from 'vue';
const s = ref<number>(3);
Message.info({
  content: `403!无权限或处于未登陆状态，请联系开发者申请 !!!${s.value}秒后跳转登陆页面`
})
const timer= setInterval(() => {
  s.value = s.value-1
  if(s.value===0) {
    // 使用了wrapper包裹，强制刷新，使recordList页面重新加载
     window.open('/login','_self')
    
    clearInterval(timer)
  }
},1000)
</script>