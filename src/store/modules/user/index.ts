import api from '@/api';
import { defineStore } from 'pinia';
import type { LoginInfo, UserInfo } from './type';

const useUserInfoStore = defineStore('user', {
  state: (): UserInfo => ({ admin_name: undefined, isLogin: false,authList:['hhh'] }),
  actions: {
    async login(formData: LoginInfo){
      try{
        const {data} =await api.login(formData)
        this.updateUserInfo({
          isLogin:true,
          admin_name: data.list.admin_name
        })
      }catch{
        throw new Error('login error')
      }
    },
    updateUserInfo(data: Partial<UserInfo>){
        this.$patch(data)
    }
  },
});

export default useUserInfoStore;
