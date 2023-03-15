import { useUserInfoStore } from '@/store';
const useCheckAuth = () => {
  const userInfo = useUserInfoStore();
  console.log(userInfo.isLogin,userInfo.admin_name);
  
  const checkAuth = (auth: string) => {
    if (!userInfo.isLogin) return false;
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
