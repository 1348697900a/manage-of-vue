import myRequest from '@/hooks/request';
import transformTimeFormat from '@/utils/transformTimeFormat';
import type { ISelectDrownOptions, MResponse } from './type';
class Api {
  private prefix = '/manageServer';
  private _request = myRequest;
  testGet() {
    return this._request({
      method: 'get',
      params: { name: 'lyx', password: '111' },
      path: this.prefix + '/testGet',
    });
  }
  testPost() {
    return this._request({
      method: 'post',
      params: { name: 'lyx', password: '111' },
      path: this.prefix + '/testPost',
    });
  }
  /**
   * 打卡列表
   * @param params
   * @returns
   */
  getRecordList(params: Record<string, any>) {
    return this._request<MResponse<{ [x: string]: any }[]>>({
      method: 'get',
      params,
      path: this.prefix+'/getRecordList',
    });
  }
  getUserList(params: Record<string, any>) {
    return this._request({
      method: 'get',
      params,
      path: this.prefix + '/getUserList',
    });
  }
  addUserInfo(params: any) {
    return this._request({
      method: 'post',
      params,
      path: this.prefix + '/addUserInfo',
    });
  }
  validateFingerprintID(params: any) {
    return this._request({
      method: 'get',
      params,
      path: this.prefix + '/validateFingerprintID',
    });
  }
  getConfig() {
    return this._request<
      MResponse<{ work_time_range: { morning: string[]; afternoon: string[] } }>
    >({
      method: 'get',
      path: this.prefix + '/getConfig',
    });
  }
  updateConfig(params: any) {
    return this._request({
      method: 'post',
      params,
      path: this.prefix + '/updateConfig',
    });
  }
  updateUserInfo(params: {
    is_exist: '在职' | '离职';
    fingerprintID: number | string;
  }) {
    return this._request<MResponse<ISelectDrownOptions>>({
      method: 'post',
      params,
      path: this.prefix + '/updateUserInfo',
    });
  }
  test(keywords: any) {
    return this._request<MResponse<ISelectDrownOptions>>({
      method: 'get',
      params: { keywords },
      path: this.prefix + '/test',
    });
  }
  login(params?: { account: string; password: string }) {
    return this._request<MResponse<any>>({
      method: 'post',
      params,
      path: this.prefix + '/login',
    });
  }
  dataShow(
    params: any = {
      date: transformTimeFormat(new Date().getTime(), 'YYYY-MM-DD'),
    }
  ) {
    return this._request<MResponse<any>>({
      method: 'post',
      params,
      path: this.prefix + '/dataShow',
    });
  }
  getStaffName(){
    return this._request<MResponse<any>>({
      method: 'post',
      params: {id:0},
      path: '/esp8266/getStaffName',
    });
  }
  getStaffNums(){
    return this._request<MResponse<any>>({
      method: 'get',
      path: this.prefix+'/getStaffNums',
    });
  }
}

const api = new Api();
export default api;
