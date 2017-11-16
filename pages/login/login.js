
const app = getApp();

Page({

  data: {
    loading: false
  },

  login: function (e) {
    let formData = e.detail.value;
    if (!formData.username) {
      app.helper.alert('请输入用户名');
      return;
    }
    if (!formData.password) {
      app.helper.alert('请输入密码');
      return;
    }
    this.setData({ loading: true });
    app.http.post('/authenticate', {
      "client_id": "app",
      "username": formData.username,
      "password": formData.password
    }).then(res => {
      app.globalData.accessToken = res.access_token;
      app.globalData.refreshToken = res.refresh_token;
      app.globalData.userInfo = res.user;
      wx.setStorage({
        key: 'loginInfo',
        data: res
      })
      wx.redirectTo({
        url: '/pages/home/home'
      })
      this.setData({ loading: false });
    }).catch(err => {
      this.setData({ loading: false });
    });
  }

})