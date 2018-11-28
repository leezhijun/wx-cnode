// pages/message/index.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    username: '',
    accesstoken: '',
    messages: {},
    has_read_messages: null,
    hasnot_read_messages:null,
    loadmore: true,
    loaderror: false,
    errMsg: '请求失败，刷新重试',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let { username, accesstoken } = app.globalData
    let that = this
    if (username) {
      wx.request({
        url: 'https://cnodejs.org/api/v1/messages',
        data: {
          accesstoken: accesstoken,
        },
        success(res) {
          console.log(res)
          if (res.statusCode == 200) {
            that.setData({
              messages: res.data.data,
              has_read_messages: res.data.data.has_read_messages.length,
              hasnot_read_messages: res.data.data.hasnot_read_messages.length,
              loadmore: false,
              username,
              accesstoken,
            });
          } else {
            that.setData({
              loadmore: false,
              loaderror: true,
            });
          }
        }
      })
    } else {
      // wx.reLaunch({
      //   url: '/pages/login/index'
      // })
    }
  },
})