//app.js
App({
  onLaunch: function() {
    if (!wx.cloud) {
      console.error('请使用 2.2.3 或以上的基础库以使用云能力')
    } else {
      wx.cloud.init({
        // env 参数说明：
        //   env 参数决定接下来小程序发起的云开发调用（wx.cloud.xxx）会默认请求到哪个云环境的资源
        //   此处请填入环境 ID, 环境 ID 可打开云控制台查看
        //   如不填则使用默认环境（第一个创建的环境）
        // env: 'my-env-id',
        traceUser: true,
      })
    }
  },
  //得出当前的天数的时间戳
  nowDaysTimeStamp: function () {
    let myDate = new Date();
    let year = myDate.getFullYear();
    let mouth = (myDate.getMonth() + 1) < 10 ? '0' + (myDate.getMonth() + 1) : (myDate.getMonth() + 1);
    let day = myDate.getDate();
    let str = year + '-' + mouth + '-' + day;
    return this.dateTurnTimeStamp(str);
  },
  //天数（时间戳）转日期
  timeStampTurnDate: function(timeStamp) {
    if (timeStamp > 0) {
      var date = new Date(timeStamp * 86400000);
      return date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate();
    } else {
      return "";
    }
  },
  //日期转天数（时间戳）
  dateTurnTimeStamp: function(date){
    return parseInt(new Date(date).getTime() / 86400000);
  },
  globalData: {
    oneDayMilliseconds: 86400000, //一天的毫秒数
    orderTime: '0.1' //下订单倒计时时间
  }
})