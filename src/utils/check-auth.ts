import { useUserInfoStore } from '@/store';
const useCheckAuth = () => {

  const { authList = [] } = useUserInfoStore();
  const checkAuth = (auth: string) => authList.includes(auth);

  return [authList, checkAuth] as [string[], (auth: string) => boolean];
};

export default useCheckAuth;
