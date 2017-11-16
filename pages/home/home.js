
const app = getApp();

Page({

  data: {
 
  },

  onLoad: function (options) {
    // 第一次进入首页不管token是否过期,都去获取新token
    app.http.post('/refresh_token', app.globalData.refreshToken).then(res => {
      app.globalData.accessToken = res.access_token;
      app.globalData.refreshToken = res.refresh_token;
      wx.getStorage({
        key: 'loginInfo',
        success: function (loginInfo) {
          loginInfo.access_token = res.access_token
          loginInfo.refresh_token = res.refresh_token
          wx.setStorage({
            key: 'loginInfo',
            data: loginInfo
          })
        }
      })
    })
  },

  onShow: function () {

  }

})