var sliderWidth = 96; // 需要设置slider的宽度，用于计算中间位置

Page({
  data: {
    tabs: ["全部", "精华", "分享", "问答", "招聘"],
    topics: [
      {tab:'all',data: [],page: 0},
      {tab: 'good',data: [],page: 0},
      {tab: 'share',data: [],page: 0},
      {tab: 'ask',data: [],page: 0},
      {tab: 'job',data: [],page: 0}
    ],
    loadmore:false,
    activeIndex: 0,
    sliderOffset: 0,
    sliderLeft: 0
  },
  onLoad: function() {
    var that = this;
    wx.getSystemInfo({
      success: function(res) {
        that.setData({
          sliderLeft: (res.windowWidth / that.data.tabs.length - sliderWidth) / 2,
          sliderOffset: res.windowWidth / that.data.tabs.length * that.data.activeIndex
        });
      }
    });
    wx.showToast({
      title: '数据加载中',
      icon: 'loading',
      duration: 3000
    });
    wx.request({
      url: 'https://cnodejs.org/api/v1/topics',
      data: {
        page: 0,
        tab: 'all',
        limit: 20,
      },
      success(res) {
        console.log(res)
        that.setData({
          'topics[0].data' : res.data.data,
        });
      },
      fail(res) {
        console.log(res)
        wx.showToast({
          title: '请求失败',
          icon: 'fail',
          duration: 1500
        });
      }
    })
  },
  tabClick: function(e) {
    var that = this;
    let {topics} = this.data
    let id = e.currentTarget.id
    this.setData({
      sliderOffset: e.currentTarget.offsetLeft,
      activeIndex: e.currentTarget.id
    });
    if (topics[id].data.length==0){
      wx.showToast({
        title: '数据加载中',
        icon: 'loading',
        duration: 3000,
      });
      let tab = topics[id].tab
      wx.request({
        url: 'https://cnodejs.org/api/v1/topics',
        data: {
          page: 0,
          tab: tab,
          limit: 20,
        },
        success(res) {
          let resData = 'topics[' + id + '].data'
          that.setData({
            [resData]: res.data.data,
          });
        },
        fail(res) {
          console.log(res)
          wx.showToast({
            title: '请求失败',
            icon: 'fail',
            duration: 1500
          });
        }
      })
    }
  },
  onReachBottom: function(){
    wx.showToast({
      title: '数据加载中',
      icon: 'loading',
      duration: 3000
    });
    var that = this
    let id = this.data.activeIndex
    let tab = topics[id].tab
    let page = topics[id].page + 1
    let data = topics[id].data
    wx.request({
      url: 'https://cnodejs.org/api/v1/topics',
      data: {
        page: page,
        tab: tab,
        limit: 20,
      },
      success(res) {
        let resData = 'topics[' + id + '].data'
        that.setData({
          [resData]: data.concat(res.data.data),
        });
      },
      fail(res) {
        console.log(res)
        wx.showToast({
          title: '请求失败',
          icon: 'fail',
          duration: 1500
        });
      }
    })
  }
});