import api from '@/api';
import { defineStore } from 'pinia';
import type { LoginInfo, UserInfo } from './type';

const useUserInfoStore = defineStore('user', {
  state: (): UserInfo => {
    const userInfo = JSON.parse(
      window.localStorage.getItem('userInfo') || '{}'
    ) as UserInfo;
    return Object.keys(userInfo).length>0
      ? userInfo
    : {
        admin_name: undefined,
        isLogin: false,
        authList: [],
      };
  },
  actions: {
    async login(formData?: LoginInfo) {
      try {
        const { data } = await api.login(formData);
        this.updateUserInfo({
          isLogin: true,
          admin_name: data.list.admin_name,
          authList: ['admin'],
        });
        console.log(this.isLogin);

        // 简单做存储，正式点自行查找资料
        const userInfo = {
          admin_name: data.list.admin_name,
          isLogin: true,
          authList: ['admin'],
        };
        window.localStorage.setItem('userInfo', JSON.stringify(userInfo));
      } catch {
        throw new Error('login error');
      }
    },
    updateUserInfo(data: Partial<UserInfo>) {
      this.$patch(data);
      console.log(this.isLogin);
    },
  },
});

export default useUserInfoStore;
