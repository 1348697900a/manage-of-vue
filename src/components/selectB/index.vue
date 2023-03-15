<script lang="tsx">
  import { ref, defineComponent, type PropType, watch, h } from 'vue';
  import { Select } from '@arco-design/web-vue';
  import { useBoolean } from 'vue-hooks-plus';
  export default defineComponent({
    name: 'MySelect',
    extends: Select,
    props: {
      placeholder: {
        type: String,
        default: 'Please select',
      },
      /**
       * 下拉选项，优先级高于getData函数的返回值
       */
      options: {
        type: Array as PropType<{ label: string; value: string }[]>,
        default: () => [],
      },
      /**
       * 下拉选项值的来源
       */
      getData: {
        type: Function as PropType<
          (query: Record<string, any>) => Promise<any>
        >,
        default: () => Promise.resolve([]),
      },
      /**
       * 依赖项
       */
      deepList: {
        type: Array as PropType<any>,
        default: () => [],
      },
    },
    emits: ['update:modelValue', 'search','submit'],
    setup(props, { emit }) {
      const data = ref<{ label: string; value: string }[]>(props.options);
      const [loading, { setFalse, setTrue }] = useBoolean(false);
      const updateData = async (keywords?: string) => {
        setTrue();
        try {
          data.value = await props.getData({ keywords });
        } finally {
          setFalse();
        }
      };
      const handleChange = (e: any) => {
        emit('update:modelValue', e);
        emit('submit','ssss')
      };
      const handleSearch = (e: any) => {
        updateData(e);
        emit('search', e);
      };
      watch(
        [...props.deepList],
        () => {
          props.options.length == 0 && updateData();
        },
        {
          immediate: true,
          deep: true,
        }
      );
      return () =>
        h(Select, {
          ...props,
          options: data.value,
          onChange: handleChange,
          onSearch: props.allowSearch ? handleSearch : () => {},
          loading: loading.value,
        });
    },
  });
</script>
