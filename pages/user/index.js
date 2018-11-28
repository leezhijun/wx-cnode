// pages/user/index.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    username: app.globalData.username,
    accesstoken: app.globalData.accesstoken,
    userinfo:{},
    loadmore: true,
    loaderror: false,
    errMsg: '请求失败，刷新重试',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let app = getApp();
    console.log(app)
    let { username, accesstoken } = app.globalData
    let that = this
    if(username){
      wx.request({
        url: 'https://cnodejs.org/api/v1/user/' + username,
        success(res) {
          if (res.statusCode == 200) {
            that.setData({
              userinfo:res.data.data,
              loadmore: false,
            });
          } else {
            that.setData({
              loadmore: false,
              loaderror: true,
            });
          }
        }
      })
    }else{
      wx.reLaunch({
        url: '/pages/login/index'
      })
    }
  },
})