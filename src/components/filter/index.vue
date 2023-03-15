<script lang="tsx">
  import type { FormInstance } from '@arco-design/web-vue';
  import { defineComponent, ref, type PropType, type VNode } from 'vue';
  import BSelect from '@/components/selectB/index.vue';
  interface FilterType {
    label: string;
    name: string;
    component: VNode | (() => VNode);
  }
  export type FilterListType = FilterType[];
  export default defineComponent({
    props: {
      filterList: {
        type: Array as PropType<FilterListType> |undefined,
      },
    },
    emits: ['change'],
    setup(props) {
      const form = ref<{ name: string; value?: any }[]>(
        (props.filterList || []).map((item) => ({
          name: item.name,
        }))
      );
      const formRef = ref<FormInstance>();
      return () => (
        <a-form model={form} ref={form} layout="vertical">
          <a-row gutter={[42, 12]}>
            {props.filterList?.map((item) => (
              <a-col span={6}>
                <a-form-item
                  field={item.name}
                  label={item.label}
                >
                 {item.component}
                 {/* 当component为select等组件时值改变时，绑定在a-form-item的onChange无法触发*/}
                </a-form-item>
              </a-col>
            ))}
          </a-row>
        </a-form>
      );
    },
  });
</script>

<style scoped></style>
