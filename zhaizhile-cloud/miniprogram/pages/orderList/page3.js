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
    wx.startPullDownRefresh();
  },

  loadData: function (options) {
    let _that = this;
    const db = wx.cloud.database()
    new Promise((resolve, reject) => {
      db.collection('order').get({
        success: res => {
          if (options.type == 'down') {
            let data = res.data;
            let newData = [];
            for (let i = 0; i < data.length; i++) {
              data[i].imgs = data[i].imgs.split('|');
              newData.push(data[i]);
            }
            resolve(newData);
          }
        },
        fail: err => {
          reject('查询列表数据失败');
        }
      })
    }).then(res => {
      _that.setData({
        list: res
      })
      wx.hideNavigationBarLoading();
      wx.stopPullDownRefresh();
    }).catch(err => {
      wx.showToast(err);
      wx.hideNavigationBarLoading();
      wx.stopPullDownRefresh();
    })
  },

  jumpOrderDetails: function (e) {
    let data = e.currentTarget.dataset;
    if (data.status == '1'){
      //跳到发布结果页中
      wx.navigateTo({
        url: '../taskOrder/page2?id=' + data.id
      });
    } else {
      //跳到接单结果页中
      wx.navigateTo({
        url: '../sendOrder/page4?id=' + data.id
      });
    }
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
    wx.startPullDownRefresh();
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

  }
})