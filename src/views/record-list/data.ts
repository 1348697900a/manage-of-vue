import api from '@/api';
const getData = (params: any) => api.getRecordList(params).then(res => {
    return res.data?.data || Promise.resolve([])
});
export default getData;
