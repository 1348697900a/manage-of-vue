import { useUserInfoStore } from '@/store';
const useCheckAuth = () => {
  const userInfo = useUserInfoStore();
  const checkAuth = (auth?: string) => {
    if (!userInfo.isLogin) return false;
    if(!auth) return true
    return (
      (userInfo.authList || []).includes(auth) ||
      userInfo.authList?.includes('admin')
    );
  };

  return [userInfo.authList, checkAuth] as [
    string[],
    (auth: string) => boolean
  ];
};

export default useCheckAuth;
