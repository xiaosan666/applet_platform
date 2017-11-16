
/**
 * util:业务无关的工具方法
 * helper:业务或框架有关的工具方法
 */

const alert= function(content = '', title = '') {
  wx.showModal({
    content: content,
    title: title,
    showCancel: false
  })
}

module.exports = {
  alert: alert
}

 

