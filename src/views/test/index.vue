<script lang="tsx">
  import checkPageAuth from '@/utils/check-page-auth';
  import PageContentLayout from "@/layout/page-content-layout.vue"
  import { defineComponent } from 'vue';
  const cpm = defineComponent({
    setup() {
      console.log('test');
      return () => <div>
        <PageContentLayout>
            
        </PageContentLayout>
    </div>;
    },
  });
  export default checkPageAuth(cpm)('hhh');
</script>
