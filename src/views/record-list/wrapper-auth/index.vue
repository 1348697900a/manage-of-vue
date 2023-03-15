<script lang="ts">
  import Index from '../index.vue';
  import checkPageAuth from '@/utils/check-page-auth';
  export default checkPageAuth(Index)('record_list');
</script>
