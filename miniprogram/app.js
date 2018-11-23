//app.js
App({
  onLaunch: function () {
    
    if (!wx.cloud) {
      console.error('请使用 2.2.3 或以上的基础库以使用云能力')
    } else {
      wx.cloud.init({
        env:"work-1374f9",
          // env:"sophie-bd5744",
        traceUser: true,
      })
    }

    this.globalData = {}
  },
  onShow:function(){
    console.log(" on show ");
  },
  onHide:function(){
    console.log(" on Hide ");
  },
  onError:function(){
    console.log(" on errror ");
  },
  globalData:"I am global data",
  
})
