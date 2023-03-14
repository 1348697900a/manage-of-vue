import api from '@/api';
import { defineStore } from 'pinia';
type ConfigType = {
  work_time_range: {
    morning: string[];
    afternoon: string[];
  };
  // [T: string]: any;
};
const useConfigStore = defineStore('config', {
  state: (): ConfigType => ({
    work_time_range: {
      morning: ['9:00', '12:00'],
      afternoon: ['14:00', '18:00'],
    },
  }),
  actions: {
    async updateConfig() {
      api.getConfig().then((res) => {
        const { work_time_range } =res.data.list;
        this.$patch({ work_time_range });
      });
    },
  },
});

export default useConfigStore;
