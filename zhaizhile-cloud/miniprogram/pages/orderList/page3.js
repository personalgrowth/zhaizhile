// pages/page3/page3.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let _that = this;
    wx.showNavigationBarLoading();
    wx.startPullDownRefresh();
    this.loadData({
      type: 'down'
    });
  },

  loadData: function (options) {
    let _that = this;
    const db = wx.cloud.database()
    db.collection('order').get({
      success: function (res) {
        if(options.type == 'down'){
          _that.setData({
            list: res.data
          })
          wx.hideNavigationBarLoading();
          wx.stopPullDownRefresh();
        }
      }
    })
  },

  listJump: function (e) {
    
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
    wx.showNavigationBarLoading();
    this.loadData({
      type: 'down'
    });
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