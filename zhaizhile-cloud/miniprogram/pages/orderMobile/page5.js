// pages/page5/page5.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this;
    that.setData({
      id: options.id
    })
  },

  gotoindex: function() {
    let that = this;

    const db = wx.cloud.database();
    db.collection('order').where({
      _id: that.data.id
    }).update({
      data: {
        orderStatus: '3'
      },
      success: function (res) {
        if (res.stats.updated == 1){
          wx.showToast({
            title: '订单已完成',
            icon: 'success',
            duration: 2000
          });

          wx.reLaunch({
            url: '../orderList/page3',
          });
        }
      }
    })
    
  },

  gotopage3: function() {
    wx.reLaunch({
      url: '../orderList/page3'
    });
  }
})