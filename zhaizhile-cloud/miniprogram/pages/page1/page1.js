// pages/page1/page1.js


Page({

  /**
   * 页面的初始数据
   */
  data: {
      /*
        表单字段-start
      */
      name: '',
      mobile: '',
      address: '',
      dateTime: '',
      details: '',
      uploadImg: '',
      price: '',
      /*
        表单字段-end
      */

      isAgree: false
  },

  //动态将input中的值给到data对应的变量中
  inputedit: function (e) {
    let _that = this;
    //data-开头的自定义属性，可以通过dataset获取到，dataset是一个json对象
    let dataset = e.currentTarget.dataset;
    let name = dataset.name;
    let value = e.detail.value;
    _that.setData({
      [name]: value
    });
  },

  //有效时间选择
  binddatechange: function (e) {
    this.setData({
      dateTime: e.detail.value
    })
  },

  //上传图片
  chooseImage: function (e) {
    let _that = this;

    wx.chooseImage({ success (res) {
        const tempFilePaths = res.tempFilePaths
        _that.setData({
          uploadImg: tempFilePaths[0]
        })

        //这是直接上传到后台-服务器
        // wx.uploadFile({
        //   url: 'http://web.bxapi.sxbdjw.com/fastdfs/fastdfs/upload', //仅为示例，非真实的接口地址
        //   filePath: tempFilePaths[0],
        //   name: 'file',
        //   success (res){
        //     const data = res.data
        //     //do something
        //   }
        // })
      }
    })
  },

  bindAgreeChange: function () {
    this.setData({
      isAgree: true
    })
  },

  //发布订单
  gotopage2: function () {
    var formData = {
      name: this.data.name,
      mobile: this.data.mobile,
      address: this.data.address,
      dateTime: this.data.dateTime,
      details: this.data.details,
      uploadImg: this.data.uploadImg,
      price: this.data.price,
    }

    //在这插库，成功后跳转至订单发布成功页

    
    wx.showModal({
      title: '成功',
      content: '订单发布成功,请等待接单',
      showCancel: false,
      success: function (res) {
        //订单发布成功
        wx.navigateTo({ url: '../page2/page2' });
      }
    });
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