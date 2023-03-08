import axios from 'axios';
import { Message } from '@arco-design/web-vue';
export type RequestType = {
  method: 'get' | 'post';
  path: string;
  params?: Record<any, any>;
};
axios.interceptors.response.use(
  (res: any) => {
    //console.log(res.data);
    const resp = res.data;
    if (res.data?.code !== 0) {
      Message.error(resp?.msg);
      throw new Error(resp?.msg)
    }

    // 容错处理
    return res;
  },
  () => {
    // console.log(e);
    // state != 200
    // console.log('error');
  }
);

axios.interceptors.request.use((config) => {
  // 对请求参数统一处理、滤值、大小写转化等。
  // token、user Name等通用信息注入
  //  console.log('requestConfig:', config);
  //console.log("request:",config);

  return config;
});

const request = (config: RequestType) => {
  const { method, path, params } = config;
  if (method === 'get') {
    return axios({ method, params: params, url: path });
  } else {
    return axios({ method, data: params, url: path });
  }
};

export default request;
