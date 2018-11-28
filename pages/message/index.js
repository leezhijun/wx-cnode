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

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})