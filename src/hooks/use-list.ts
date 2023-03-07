import { onMounted, ref, watch } from 'vue';

/**
 * options: {}
 */
interface UseListOptions {
  getData: (query?: Record<string, any>) => Promise<any>;
  getQuery?: (query: any) => void;
}
type ResState = {
  data: any;
  loading: boolean;
};
type ResMethods = {
  setQuery: (newValue: Record<string, any>) => void;
};
const useList = (options: UseListOptions, query: any) => {
  const { getData } = options;
  // const props = ref<Record<string,any>>({});
  const _query = ref<Record<string, any>>(query);
  const state = ref<ResState>({
    data: [],
    loading: false,
  });
  const setQuery = (cur: any) => {
    _query.value = { ...query.value, ...cur };
  };

  const fetchData = async () => {
    state.value.loading = true;
    try {
      const res = await getData(_query.value);
      state.value = {
        data: res.data,
        loading: false
      }
    } catch (e) {
      console.log(e);
    } finally {
      state.value.loading = false;
    }
  };
  watch(
    _query.value,
    async() => {
      fetchData()
    },
    { deep: true,immediate:true }
  );
  const methods = {
    setQuery,
  };
  console.log('return');
  console.log(state.value);
  
  return [state.value, methods] as [ResState, ResMethods];
};

export default useList;
