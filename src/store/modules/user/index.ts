import { defineStore } from 'pinia';
import type { LoginInfo, UserInfo } from './type';

const useUserInfoStore = defineStore('user', {
  state: (): UserInfo => ({ name: undefined, isLogin: false,authList:['hhh'] }),
  getters: {
    userInfo(state: UserInfo): UserInfo {
      return {
        ...state,
        isLogin: false,
      };
    },
  },
  actions: {
    login(formData: LoginInfo): { code: number; data?: any } {
    //  console.log(formData);
      const res = {
        code: 0,
        data: {
          userInfo: {
            name: 'lyx',
            isLogin: true,
          },
        },
      };
      this.updateUserInfo(res.data.userInfo)
      return res;
    },
    updateUserInfo(data: Partial<UserInfo>){
        this.$patch(data)
    }
  },
});

export default useUserInfoStore;
