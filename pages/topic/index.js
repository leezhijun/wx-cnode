// pages/topic/index.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    username: app.globalData.username,
    accesstoken: app.globalData.accesstoken,
    topic_id:null,
    topic: {},
    article: {},
    loadmore: true,
    loaderror: false,
    errMsg: '请求失败，刷新重试',
    content: null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this
    wx.request({
      url: 'https://cnodejs.org/api/v1/topic/' + options.id, //仅为示例，并非真实的接口地址
      method: 'GET',
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        if (res.statusCode == 200) {
          let data = res.data.data
          let article = app.towxml.toJson(data.content, 'html', that);
          let replies = data.replies.map(item => {
            item.content = app.towxml.toJson(item.content, 'html', that);
            return item
          })
          data.replies = replies
          that.setData({
            topic: data,
            article,
            loadmore: false,
            topic_id: options.id
          });
        } else {
          that.setData({
            loadmore: false,
            loaderror: true,
          });
        }
      }
    })
  },
  /**
   * 留言输入处理
   */
  handleInput: function(e) {
    this.setData({
      [e.target.id]: e.detail.value,
    })
  },
  handleSubmit: function() {
    let {
      topic_id,
      content,
      accesstoken
    } = this.data
    let that = this
    if (!content) {
      wx.showModal({
        content: '回复内容不能为空',
        showCancel: false,
        success: function(res) {
          if (res.confirm) {
            console.log('用户点击确定')
          }
        }
      });
    }
    wx.request({
      url: 'https://cnodejs.org/api/v1/topic/' + topic_id +'/replies',
      method: 'POST',
      data: {
        accesstoken,
        content
      },
      success(res) {
        if (res.statusCode == 200) {
          that.setData({
            content: '',
          })
          wx.request({
            url: 'https://cnodejs.org/api/v1/topic/' + topic_id,
            method: 'GET',
            header: {
              'content-type': 'application/json' // 默认值
            },
            success(res) {
              if (res.statusCode == 200) {
                let data = res.data.data
                let replies = data.replies.map(item => {
                  item.content = app.towxml.toJson(item.content, 'html', that);
                  return item
                })
                replies = replies
                that.setData({
                  'topic.replies': replies
                });
              } else {
                wx.showToast({
                  title: '数据刷新失败',
                  duration: 1000,
                  image: '/public/error.png'
                });
              }
            }
          })
        } else {
          wx.showToast({
            title: '回复失败',
            duration: 1000,
            image: '/public/error.png'
          });
          this.setData({
            title: '',
            content: '',
            accountIndex: 0,
          })
        }
      }
    })
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})