// pages/page2/page2.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    details: ''
  },
  
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this;
    const db = wx.cloud.database();
    db.collection('order').where({
      _id: options.id
    }).get({
      success: function (res) {
        let data = res.data[0];
        data.imgs = data.imgs.split("|");
        that.setData({
          details: data
        })
      }
    })
  },

  updateOrder: function () {
    wx.showModal({
      content: '确认修改吗',
      success: function (res) {
        wx.navigateBack({
          delta: 1
        })
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

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  }
})