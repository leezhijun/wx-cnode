var sliderWidth = 96; // 需要设置slider的宽度，用于计算中间位置

Page({
  data: {
    tabs: ["全部", "精华", "分享", "问答", "招聘"],
    topics: [
      {tab:'all',data: [],page: 1},
      {tab: 'good',data: [],page: 1},
      {tab: 'share',data: [],page: 1},
      {tab: 'ask',data: [],page: 1},
      {tab: 'job',data: [],page: 1}
    ],
    loadmore:false,
    loadend:false,
    loaderror:false,
    errMsg:'请求失败，刷新重试',
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
    that.setData({
      loadmore: true
    });
    wx.request({
      url: 'https://cnodejs.org/api/v1/topics',
      data: {
        page: 1,
        tab: 'all',
        limit: 20,
      },
      success(res) {
        if (res.statusCode==200){
          that.setData({
            'topics[0].data': res.data.data,
            loadmore: false
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
  tabClick: function(e) {
    var that = this;
    let {topics} = this.data
    let id = e.currentTarget.id
    this.setData({
      sliderOffset: e.currentTarget.offsetLeft,
      activeIndex: e.currentTarget.id
    });
    if (topics[id].data.length==0){
      that.setData({
        loadmore: true
      });
      let tab = topics[id].tab
      wx.request({
        url: 'https://cnodejs.org/api/v1/topics',
        data: {
          page: 1,
          tab: tab,
          limit: 20,
        },
        success(res) {
          if (res.statusCode == 200) {
            let resData = 'topics[' + id + '].data'
            that.setData({
              [resData]: res.data.data,
              loadmore: false
            });
          } else {
            that.setData({
              loadmore: false,
              loaderror: true,
            });
          }
        }
      })
    }
  },
  onReachBottom: function () {
    console.log(123)
    var that = this
    let id = this.data.activeIndex
    let tab = this.data.topics[id].tab
    let page = this.data. topics[id].page + 1
    let data = this.data.topics[id].data
    that.setData({
      loadmore: true,
      loadend:false
    });
    wx.request({
      url: 'https://cnodejs.org/api/v1/topics',
      data: {
        page: page,
        tab: tab,
        limit: 20,
      },
      success(res) {
        if (res.statusCode == 200) {
          let resData = 'topics[' + id + '].data'
          let newPage = 'topics[' + id + '].page'
          that.setData({
            [resData]: data.concat(res.data.data),
            [newPage]: page,
            loadmore: false
          });
          if (!res.data.data.length){
            that.setData({
              loadend: true
            });
          }
        } else {
          that.setData({
            loadmore: false,
            loaderror: true,
          });
        }
      }
    })
  },
  onPullDownRefresh: function(){
    console.log(456)

  },
});