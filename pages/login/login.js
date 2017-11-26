
const app = getApp();

Page({

  data: {
    loading: false
  },

  login: function (e) {
    let formData = e.detail.value;
    app.validator.add(formData.username, 'notEmpty', '请输入用户名');
    app.validator.add(formData.username, 'maxLength:10', '最大长度是10');
    app.validator.add(formData.password, 'notEmpty', '请输入密码');
    let errorMsg = app.validator.start();
    if (errorMsg) {
      app.helper.alert(errorMsg);
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