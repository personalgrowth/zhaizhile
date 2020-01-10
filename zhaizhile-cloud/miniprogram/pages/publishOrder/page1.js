// pages/page1/page1.js


Page({

  /**
   * 页面的初始数据
   */
  data: {
    files: [],
    date: '',

    isAgree: false
  },
  binddatechange: function (e) {
    this.setData({
      date: e.detail.value
    })
  },
  //已有图片进行替换
  previewImage: function (e) {
    let oldindex = e.currentTarget.id;
    let that = this;
    wx.chooseImage({
      success: function (res) {
        let files = that.data.files
        files[oldindex] = res.tempFilePaths[0]
        that.setData({
          files: files
        })
      }, fail: e => {
        console.error(e)
      }
    })
  },
  //新增图片
  chooseImage: function () {
    let that = this;
    wx.chooseImage({
      success: function (res) {
        let files = that.data.files;

        files = files.concat(res.tempFilePaths);
        that.setData({
          files: files
        })
      }, fail: e => {
        console.error(e)
      }
    })
  },
  bindAgreeChange: function() {
    this.setData({
      isAgree: true
    })
  },
  gotopage2: function (e) {
    /*云请求开发 */
    let that = this;
    wx.showLoading({
      title: '上传中...',
    })
    let files = that.data.files;
    let filesid = [];
    Promise.all(files.map((item) => {
      return wx.cloud.uploadFile({
        cloudPath: 'my-image' + Date.now() + item.match(/\.[^.]+?$/)[0],
        filePath: item,
      })
    }))
      .then((resCloud) => {
        wx.hideLoading();
        filesid = resCloud.map((item) => {
          return item.fileID
        })

        let myDate = new Date();
        const db = wx.cloud.database();
        db.collection('order').add({
          data: {
            name: e.detail.value.name,
            tel: e.detail.value.tel,
            money: e.detail.value.money,
            content: e.detail.value.content,
            cantime: that.data.date,
            insettime: myDate.getFullYear() + '-' + (myDate.getMonth() + 1) + '-' + myDate.getDate() + ' ' + myDate.getHours() + ':' + myDate.getMinutes(),
            address: e.detail.value.address,
            imgs: filesid.join('|'),
            orderStatus: '1'
          },
          success: response => {
            // 在返回结果中会包含新创建的记录的 _id
            this.setData({
              counterId: response._id,
              count: 1
            })

            wx.showModal({
              title: '成功',
              content: '订单发布成功,请等待接单',
              showCancel: false,
              success: function (res) {
                //订单发布成功
                wx.navigateTo({ 
                  url: '../taskOrder/page2?id=' + response._id 
                });
              }
            });
          },
          fail: err => {
            wx.showToast({
              icon: 'none',
              title: '订单发布失败，请重新发布'
            })
          }
        })
      }).catch((err) => {
        console.log(err)
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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