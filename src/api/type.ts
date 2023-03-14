export type MResponse<T = any> = {
  code: number;
  msg: string;
  data: {
    total: number;
    page_size: number;
    page_current: number;
    list: T;
  };
};
export type ISelectDrownOptions = { label: string; value: string | number }[];
