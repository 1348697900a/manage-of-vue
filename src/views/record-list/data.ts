import api from '@/api';
const getData = (params: any) => api.getRecordList(params).then(res => {
    return res.data.list || Promise.resolve([])
});
export default getData;
