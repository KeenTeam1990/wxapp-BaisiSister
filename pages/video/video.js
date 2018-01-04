var app = getApp()
var curPage = 1;
var isPullDownRefreshing = false;

Page({

  /**
   * 页面的初始数据
   */
  data: {
    jokesData: [],
  },
  
  lower:function(){
   var that =this;
   that.fetchJokeData();
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    this.fetchJokeData();
  },

  fetchJokeData: function () {
    wx.showNavigationBarLoading();
    var that = this
    wx.request({
      url: app.globalData.requestUrl,
      data: {
        'showapi_appid': app.globalData.appid,
        'showapi_sign': app.globalData.apiKey,
        'page': curPage.toString(),
        'type': app.globalData.tVideo
      },
      method: 'GET',
      success: function (res) {
        if (curPage == 1) {

          that.setData({
            jokesData: res.data.showapi_res_body.pagebean.contentlist
          });

        } else {
          that.setData({
            jokesData: that.data.jokesData.concat(res.data.showapi_res_body.pagebean.contentlist)

          });

        }
        curPage += 1;
        wx.hideNavigationBarLoading();
      },
    })

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