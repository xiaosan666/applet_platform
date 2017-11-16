
/**
 * 全局数据
 */
const globalData = {

  _accessToken: '',

  _refreshToken: '',

  _userInfo: { id: '', username: '', fullName: '' },


  get accessToken() {
    return this._accessToken;
  },
  set accessToken(accessToken) {
    this._accessToken = accessToken;
  },
  get refreshToken() {
    return this._refreshToken;
  },
  set refreshToken(refreshToken) {
    this._refreshToken = refreshToken;
  },
  get userInfo() {
    return this._userInfo;
  },
  set userInfo(userInfo) {
    this._userInfo = userInfo;
  }

}

module.exports = globalData;

