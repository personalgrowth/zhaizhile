// pages/page2/page2.js
var globalApp = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    id: '',
    details: '',
    timeCountDown: ''
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

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    let that = this;
    const db = wx.cloud.database();
    db.collection('order').where({
      _id: that.data.id
    }).get({
      success: function (res) {
        let data = res.data[0];
        data.imgs = data.imgs.split("|");
        that.setData({
          timeCountDown: '还剩余' + (data.cantime - globalApp.nowDaysTimeStamp() + 1) + '天'
        })
        data.cantime = globalApp.timeStampTurnDate(data.cantime);
        that.setData({
          details: data
        })
      }
    })
  },

  updateOrder: function () {
    let that = this

    wx.showModal({
      title: '提示',
      content: '确认修改吗',
      success: function (res) {
        if (res.confirm) {
          wx.redirectTo({
            url: '../updateOrder/index?id=' + that.data.id
          })
        }
      }
    });
  },

  agreeOrder: function (e) {
    let that = this;
    let thatData = e.currentTarget.dataset;
    const db = wx.cloud.database();
    db.collection('order').where({
      _id: thatData.id
    }).update({
      data: {
        orderStatus: '2'
      },
      success: function (res) {
        if (res.stats.updated == 1) {
          wx.showToast({
            title: '申请人同意接单',
            icon: 'success',
            duration: 2000
          });

          setTimeout(function(){
            wx.redirectTo({
              url: '../sendOrder/page4?id=' + thatData.id,
            });
          }, 2000)
        }
      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  }
})