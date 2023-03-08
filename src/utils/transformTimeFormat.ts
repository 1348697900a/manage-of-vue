import dayjs from 'dayjs';
/**
 * 
 * @param time 时间戳或字符串格式时间
 * @param format 转化形式
 * @returns 
 */
const transformTimeFormat = (
  time: string | number,
  format: string = 'M月D号 HH:mm:ss'
) => dayjs(time).format(format);

export default transformTimeFormat;
