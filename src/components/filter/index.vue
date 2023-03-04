<script lang="tsx">
  import { defineComponent, type PropType, type VNode } from 'vue';
  interface FilterType {
    label: string;
    name: string;
    component: VNode | (() => VNode);
  }
  export type FilterListType = FilterType[];
  export default defineComponent({
    props: {
      filterList: {
        type: Array as PropType<FilterListType>,
      },
    },
    setup(props) {
      console.log(props.filterList);
      return () => (
        <a-row gutter={[42, 12]}>
          {props.filterList?.map((item) => (
            <a-col span={6}>
              <div class="item-label">{item.label}</div>
              {item.component}
            </a-col>
          ))}
        </a-row>
      );
    },
  });
</script>

<style scoped>
  .item-label {
    color: var(--color-text-2);
    margin-bottom: 10px;
  }
</style>
