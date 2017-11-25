
const app = getApp();

Page({

  data: {
    planSum : {
      "taskExperiment": 0,
      "taskGuard": 0,
      "taskPatrol": 0,
      "taskRepair": 0
    }
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
      this.getPlanSum();
    })
  },

  getPlanSum:function(){
    app.http.get('/statistics/work/planSum').then(res=>{
      this.setData({ planSum: res })
    })
  },

  taskPatrol: function () {
    wx.navigateTo({
      url: '/pages/patrol/task'
    })
  }

})