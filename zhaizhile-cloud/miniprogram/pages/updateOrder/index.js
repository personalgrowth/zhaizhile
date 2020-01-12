// pages/page1/page1.js
var globalApp = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    id: '',
    updateOrder: {},

    files: [],
    showDate: '',
    date: ''
  },
  onLoad: function (options) {
    let that = this;
    that.setData({
      id: options.id
    })
    const db = wx.cloud.database();
    db.collection('order').where({
      _id: options.id
    }).get({
      success: function (res) {
        let data = res.data[0];
        that.setData({
          date: data.cantime
        });
        data.cantime = globalApp.timeStampTurnDate(data.cantime);
        that.setData({
          showDate: data.cantime,
          files: data.imgs.split("|"),
          updateOrder: data
        })
      }
    })
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
  updateOrder: function (e) {
    /*云请求开发 */
    let that = this;
    wx.showLoading({
      title: '修改中...',
    })
    let files = that.data.files;
    // let filesid = [];
    Promise.all(files.map((item) => {
      // return wx.cloud.uploadFile({
      //   cloudPath: 'my-image' + Date.now() + item.match(/\.[^.]+?$/)[0],
      //   filePath: item
      // })
      return true;
    }))
      .then((resCloud) => {
        wx.hideLoading();
        // filesid = resCloud.map((item) => {
        //   return item.fileID
        // })

        let myDate = new Date();
        const db = wx.cloud.database();
        db.collection('order').where({
          _id: that.data.id
        }).update({
          data: {
            name: e.detail.value.name,
            tel: e.detail.value.tel,
            money: e.detail.value.money,
            content: e.detail.value.content,
            cantime: that.data.date,
            updatetime: myDate.getFullYear() + '-' + (myDate.getMonth() + 1) + '-' + myDate.getDate() + ' ' + myDate.getHours() + ':' + myDate.getMinutes(),
            address: e.detail.value.address,
            // imgs: filesid.join('|')
          },
          success: response => {
            wx.showModal({
              title: '成功',
              content: '修改订单成功',
              showCancel: false,
              success: function (res) {
                //订单发布成功
                wx.redirectTo({ 
                  url: '../taskOrder/page2?id=' + that.data.id
                });
              }
            });
          },
          fail: err => {
            wx.showToast({
              icon: 'none',
              title: '修改订单失败，请重新修改'
            })
          }
        })
      }).catch((err) => {
        console.log(err)
    })
  }
})