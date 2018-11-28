// pages/login/index.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    accesstoken:''
  },
  /**
   * 表单提交
   */
  handleInput: function(e){
    this.setData({
      accesstoken: e.detail.value
    })
  },
  handleLogin: function(){
    let accesstoken = this.data.accesstoken
    let that = this
    wx.showToast({
      title: '数据加载中',
      icon: 'loading',
    });
    wx.request({
      url: 'https://cnodejs.org/api/v1/accesstoken',
      method: 'POST',
      data: {
        accesstoken: accesstoken
      },
      success(res) {
        if (res.statusCode == 200) {
          wx.showToast({
            title: '登录成功',
            icon: 'success',
            duration: 1000
          });
          app.globalData.accesstoken = accesstoken
          app.globalData.username = res.data.loginname
          wx.switchTab({
            url: '/pages/user/index'
          })
        } else {
          wx.showToast({
            title: '登录失败',
            duration: 1000,
            image: '/public/error.png'
          });
        }
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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