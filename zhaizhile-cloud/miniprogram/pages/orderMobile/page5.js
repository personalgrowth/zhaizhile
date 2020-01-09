// pages/page5/page5.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  gotoindex: function() {
    wx.reLaunch({
      url: '../index/index',
    });
  },

  gotopage3: function() {
    wx.reLaunch({
      url: '../orderList/page3'
    });
  }
})