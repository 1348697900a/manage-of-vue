import api from '@/api';
const getData = (params: any) =>
  api
    .getUserList(params)
    .then((res) => res.data?.data || Promise.resolve([]));
export default getData;
