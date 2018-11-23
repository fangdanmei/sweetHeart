// pages/foodlist/foodlist.js
wx.cloud.init();
const db = wx.cloud.database();
const _ = db.command;
var file = "../foodDe/foodDe"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    food:[],
    url:file,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var _this = this;
    var expiration = wx.getStorageSync("index_data_expiration");//拿到过期时间
   
    var timestampNow= Date.parse(new Date());//拿到现在时间

    console.log("过期时间" + expiration);
    console.log("现在时间" + timestampNow);
    
    //进行时间比较
    //如果过期了,就删除缓存,从数据库中读取数据,并存入缓存,如果没有过期,就直接从缓存中读取.
    if (expiration < timestampNow){
      console.log("过期");
      wx.clearStorageSync();
      db.collection('food').field({
        _id: true,
        name: true,
        img: true,
        material: true
      })
        .get({
          success: function (res) {
            //设置缓存
            //console.log(res.data);
            var timestamp = Date.parse(new Date());
            let expiration = timestamp + 600000;
            wx.setStorage({
              key: 'foodList',
              data: res.data,
            });
            wx.setStorageSync("index_data_expiration", expiration);
            console.log("过期时间2" + expiration);
            // wx.getStorage({
            //   key: 'foodList',
            //   success: function (res) {
            //    console.log("过期"+res.data);
            //   },
            // })

            _this.setData({ food: res.data });
          }
        })
    }else{
      console.log("没过期");
      wx.getStorage({
        key: 'foodList',
        success: function(res) {
          _this.setData({ food:res.data });
        },
      })
     
    }

      
  },

  getfoodList:function(){
    
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    console.log("onReady");
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    console.log("onShow");
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    console.log("onHide");
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