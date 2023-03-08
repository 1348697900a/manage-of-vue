import myRequest from '@/hooks/request';
class Api {
  private prefix = '/manageServer';
  private _request = myRequest;
  login() {
    return this._request({
      method: 'post',
      params: { name: 'lyx', password: '111' },
      path: this.prefix + '/login',
    });
  }
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
  getRecordList(params: Record<string, any>) {
    return this._request({
      method: 'get',
      params,
      path: this.prefix + '/getRecordList',
    });
  }
  getUserList(params: Record<string, any>) {
    return this._request({
      method: 'get',
      params,
      path: this.prefix + '/getUserList',
    });
  }
  addUserInfo(params:any) {
    return this._request({
      method: 'post',
      params,
      path: this.prefix + '/addUserInfo',
    });
  }
  validateFingerprintID(params:any) {
    return this._request({
      method: 'get',
      params,
      path: this.prefix + '/validateFingerprintID',
    });
  }
}

const api = new Api();
export default api;
