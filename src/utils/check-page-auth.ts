import useCheckAuth from "./check-auth"
import NotAuthPage from '@/views/403/index.vue'

const checkPageAuth = (targetComponent: any) => {
  
  return (auth:string) => {
    const [list,checkAuth] = useCheckAuth()
    if(checkAuth(auth)) return targetComponent;
    else return NotAuthPage
  }
}
export default checkPageAuth