// pages/topic/index.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    topic:{},
    article: {},
    loadmore:true,
    loaderror: false,
    errMsg: '请求失败，刷新重试',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    wx.request({
      url: 'https://cnodejs.org/api/v1/topic/' + options.id, //仅为示例，并非真实的接口地址
      method: 'GET',
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        if (res.statusCode == 200){
          let data = res.data.data
          let article = app.towxml.toJson(data.content, 'html', that);
          that.setData({
            topic: data,
            article,
            loadmore:false
          });
        }else{
          that.setData({
            loadmore: false,
            loaderror: true,
          });
        }
      }
    })
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