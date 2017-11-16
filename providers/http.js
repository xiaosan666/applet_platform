
/**
 * http
 */

const config = require('./config.js');
const helper = require('./helper.js');
const globalData = require('./globalData.js');

const request = function (url, data = {}, method = 'POST', header = {}, dataType = 'json') {
  wx.showNavigationBarLoading();
  return new Promise((resolve, reject) => {
    wx.request({
      url: config.APP_SERVE_URL + url,
      method: method,
      data: data,
      dataType: dataType,
      header: Object.assign({
        'Content-Type': 'application/json; charset=UTF-8',
        'Authorization': 'Bearer ' + globalData.accessToken
      }, header),
      success: (res) => {
        if (res.statusCode === 200) {
          resolve(res.data);
        } else {
          reject(res);
          if (res.data && res.data.message) {
            helper.alert(res.data.message);
          }
        }
      },
      fail: (err) => {
        reject(err);
        wx.getNetworkType({
          success: function (res) {
            res.networkType == 'none' ? helper.alert('请连接网络') : helper.alert('请求失败');
          }
        })
      },
      complete: (res) => {
        wx.hideNavigationBarLoading();
      }
    })
  })
}

const get = function (url, data) {
  url = buildURLParams(url, data);
  return request(url, {}, 'GET');
}

const post = (url, data) => {
  return request(url, data, 'POST');
}

const postFormData = (url, data) => {
  return request(url, data, 'POST', { 'content-type': 'application/x-www-form-urlencoded' });
}

const buildURLParams = (url, data) => {
  if (!data || JSON.stringify(data) == "{}" || Array.isArray(data)) {
    return url;
  }
  let arr = [];
  for (let i in data) {
    arr.push(i + '=' + encodeURIComponent(data[i]));
  }
  let str = arr.join('&');
  return url + (url.lastIndexOf('?') == -1 ? '?' : '&') + str;
}

module.exports = {
  get,
  post,
  postFormData
}
