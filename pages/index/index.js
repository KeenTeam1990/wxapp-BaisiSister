//index.js
//获取应用实例
const app = getApp()
var curPage = 1;
var isPullDownRefreshing = false;

Page({
  data: {
    jokesDic: [],
  },

  onLoad: function () {
    var that = this
    this.fetchJokesData();
  },
  bindItemTap: function (e) {

  },
  lower: function () {
    var that = this;
    that.fetchJokesData();
  },
  onPullDownRefresh: function () {
    var that = this;
    curPage = 1;
    isPullDownRefreshing = true;
    that.fetchJokesData();
  },

  fetchJokesData: function () {
    var that = this
    wx.showNavigationBarLoading();
    wx.request({
      url: app.globalData.requestUrl,
      data: {
        'showapi_appid': app.globalData.appid,
        'showapi_sign': app.globalData.apiKey,
        'page': curPage.toString(),
        'type': app.globalData.tText
      },
      method: 'GET',
      success: function (res) {
        if (curPage == 1) {
          that.setData({ jokesDic: res.data.showapi_res_body.pagebean.contentlist })
        } else {
          that.setData({ jokesDic: that.data.jokesDic.concat(res.data.showapi_res_body.pagebean.contentlist) })
        }
        curPage += 1;
        wx.hideNavigationBarLoading();

      },
    })
  }

})
