
const app = getApp();

Page({

  data: {
    taskList: []
  },

  task: function () {
    app.http.post('/repair/faultList/taskList').then(res => {
      for (let data of res) {
        data.bugTime = app.util.formatDate(new Date(data.bugTime), 'yyyy-MM-dd HH:mm');
      }
      this.setData({ taskList: res });
    })

  },

  onLoad: function (options) {
    this.task();
  },

  onShow: function () {

  }

})