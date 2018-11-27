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
    let {username,accesstoken} = this.data
    let that = this
    console.log( username)
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
      wx.navigateTo({
        url: '/pages/login/index'
      })
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