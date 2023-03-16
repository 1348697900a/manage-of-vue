import axios from 'axios';
import { Message } from '@arco-design/web-vue';
export type RequestType = {
  method: 'get' | 'post';
  path: string;
  params?: Record<any, any>;
};
const service = axios.create({
  //baseURL: '/manageServer',
  timeout: 5000
})
service.interceptors.response.use(
  (res: any) => {
    //console.log(res.data);
    const resp = res.data;
   // console.log(resp);
    
    if (res.data?.code !== 0) {
      Message.error(resp?.msg);
      throw new Error(resp?.msg)
    }

    // 容错处理
    return res.data;
  },
  () => {
    // console.log(e);
    // state != 200
    // console.log('error');
  }
);

service.interceptors.request.use((config) => {
  // 对请求参数统一处理、滤值、大小写转化等。
  // token、user Name等通用信息注入
  //  console.log('requestConfig:', config);
  //console.log("request:",config);
 // console.log(config);
  
  return config;
});

const request = <T=any>(config: RequestType): Promise<T> => {
  const { method, path, params } = config;
  if (method === 'get') {
    return service({ method, params: params, url: path });
  } else {
    return service({ method, data: params, url: path });
  }
};

export default request;
