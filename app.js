
const config = require('./providers/config.js');
const http = require('./providers/http.js');
const util = require('./providers/util.js');
const helper = require('./providers/helper.js');
const validator = require('./providers/validator.js');
const globalData = require('./providers/globalData.js');

App({
  onLaunch: function () {
    let loginInfo = wx.getStorageSync('loginInfo') || null;
    if (loginInfo) {//在app.json已经设置默认进入首页
      globalData.accessToken = loginInfo.access_token;
      globalData.refreshToken = loginInfo.refresh_token;
      globalData.userInfo = loginInfo.user;
    } else {
      wx.redirectTo({
        url: '/pages/login/login'
      })
    }
  },
  config: config,
  http: http,
  util: util,
  helper: helper,
  validator: validator,
  globalData: globalData
});