// const [{ data, loading }, { setQuery }] = useList(
//   {
//     getData: () => {
//       console.log('query has change');

//     },
//   },
//   formData.value
// );
const getData = (params: any) => {
  console.log(params);

  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        code: 0,
        data: [
          {
            fingerprintID: '1',
            staff_name: '小明',
            date: '2023-03-02 16:22:11',
            department: '物理与光电工程学院',
          },
          {
            fingerprintID: '2',
            staff_name: '小红',
            date: '2023-03-02 15:22:11',
            department: '电子信息学院',
          },
        ],
      });
    }, 300);
  }).then((res: any) => ({ data: res?.data }));
};
export default getData;
