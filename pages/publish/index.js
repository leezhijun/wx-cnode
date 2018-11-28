var app = getApp();
Page({
  data: {
    username: app.globalData.username,
    accesstoken: app.globalData.accesstoken,
    accounts: ["分享", "问答", "测试"],
    accountIndex: 0,
    tabs:['share','ask','dev'],
    title:null,
    tab:'share',
    content:null
  },
  onLoad: function (options) {
    let { username, accesstoken } = app.globalData
    let that = this
    console.log(app)
    if (!username) {
      wx.reLaunch({
        url: '/pages/login/index'
      })
    }
  },
  bindAccountChange: function(e) {
    // console.log('picker account 发生选择改变，携带值为', e.detail.value);
    let tab = this.data.tabs[e.detail.value]
    this.setData({
      accountIndex: e.detail.value,
      tab: tab
    })
  },
  handleInput: function(e){
    this.setData({
      [e.target.id]: e.detail.value,
    })
  },
  handleSubmit: function(){
    let { title, content, tab, accesstoken} = this.data
    let that = this
    if (!title){
      wx.showModal({
        content: '标题不能为空',
        showCancel: false,
        success: function (res) {
          if (res.confirm) {
            console.log('用户点击确定')
          }
        }
      });
    }
    if (!content) {
      wx.showModal({
        content: '内容不能为空',
        showCancel: false,
        success: function (res) {
          if (res.confirm) {
            console.log('用户点击确定')
          }
        }
      });
    }
    wx.request({
      url: 'https://cnodejs.org/api/v1/topics',
      method:'POST',
      data: {
        accesstoken,
        title,
        tab,
        content
      },
      success(res) {
        if (res.statusCode == 200) {
          wx.navigateTo({
            url: '/pages/topic/index?id=' + res.data.topic_id,
          })
          that.setData({
            title: '',
            content: '',
            accountIndex: 0,
          })
        } else {
          wx.showToast({
            title: '创建话题失败',
            duration: 1000,
            image: '/public/error.png'
          });
          that.setData({
            title:'',
            content:'',
            accountIndex: 0,
          })
        }
      }
    })
  }
});