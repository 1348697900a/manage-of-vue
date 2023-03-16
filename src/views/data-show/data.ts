import api from '@/api';
const getData = (params: any) =>
  api.dataShow(params).then((res) => {
    // console.log(res.data.list);
    const infoList = res.data.list;
    const list = infoList.map((v: any) => {
      // 完成打卡人数
      const sign_nums = Math.min(
        v.total_nums - v.morning.length,
        v.total_nums - v.afternoon.length
      );
      // 早上缺勤
      const morning_lack = v.morning.length;
      const afternoon_lack = v.afternoon.length;
      return {
        afternoon_lack,
        morning_lack,
        sign_nums,
        total_nums: v.total_nums,
        date: v.date
      };
    });

    return list || Promise.resolve([]);
  });
export default getData;
