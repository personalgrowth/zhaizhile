// pages/page1/page1.js
var globalApp = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    files: [],
    startDate: new Date().getFullYear() + '-' + ('0' + (new Date().getMonth() + 1)) + '-' + new Date().getDate(),
    showDate: '',
    date: '',

    isAgree: false
  },
  binddatechange: function (e) {
    this.setData({
      showDate: e.detail.value,
      date: globalApp.dateTurnTimeStamp(e.detail.value)
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
            updatetime: myDate.getFullYear() + '-' + (myDate.getMonth() + 1) + '-' + myDate.getDate() + ' ' + myDate.getHours() + ':' + myDate.getMinutes(),
            address: e.detail.value.address,
            imgs: filesid.join('|'),
            orderStatus: '1'
          },
          success: response => {
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
  }

})