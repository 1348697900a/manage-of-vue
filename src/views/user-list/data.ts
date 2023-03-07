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
            register_time: '2023-03-02 16:22:11',
            department: '物理与光电工程学院',
            is_exist:  true
          },
          {
            fingerprintID: '2',
            staff_name: '小红',
            register_name: '2023-03-02 15:22:11',
            department: '电子信息学院',
            is_exist:  true
          },
        ],
      });
    }, 300);
  }).then((res: any) => ({ data: res?.data }));
};
export default getData;
