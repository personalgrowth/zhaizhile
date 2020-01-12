// pages/page4/page4.js
var globalApp = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    details: {},
    timeCountDown: ''
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
        let day = data.cantime - globalApp.nowDaysTimeStamp() == 0 ? '1' : data.cantime - globalApp.nowDaysTimeStamp();
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

  closeOrder: function (e) {
    let that = this;
    wx.showModal({
      title: '提示',
      content: '确定取消订单吗？',
      success(res) {
        if (res.confirm) {
          let data = e.currentTarget.dataset;
          const db = wx.cloud.database();
          //删除订单
          db.collection("order").where({
            _id: data.id
          }).remove({
            success: res => {
              wx.navigateBack({
                delta: 2
              })
            }
          })
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    });
  },

  makeCall: function (e) {
    let tel = this.data.details.tel;
    let data = e.currentTarget.dataset;
    wx.showModal({
      title: '联系客户',
      content: '确定联系客户' + tel + '吗？',
      success(res) {
        if (res.confirm) {
          wx.navigateTo({ 
            url: '../orderMobile/page5?id=' + data.id  
          });
        }
      }
    });
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