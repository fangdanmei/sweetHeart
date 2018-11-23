// pages/foodDe/foodDe.js
var app = getApp();
wx.cloud.init();
const db = wx.cloud.database();
const _ = db.command;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    img:'',
    material:'',
    name:'',
    steps:[],
    tips:[],
    brief:'',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var _this = this;

    var expiration = wx.getStorageSync("expiration_foodDe"+options.id);//拿到过期时间

    var timestampNow = Date.parse(new Date());//拿到现在时间

    console.log("过期时间de" + expiration);
    console.log("现在时间de" + timestampNow);

    //进行时间比较
    //如果过期了,就删除缓存,从数据库中读取数据,并存入缓存,如果没有过期,就直接从缓存中读取.
    if (expiration < timestampNow) {
      console.log("过期de");
      wx.clearStorageSync();

      db.collection('food').doc(options.id).get({
        success: function (res) {
          // res.data 包含该记录的数据
          // console.log(res.data.tips);
          var timestamp = Date.parse(new Date());
          let expiration = timestamp + 600000;
          wx.setStorage({
            key: 'foodDe' + options.id,
            data: res.data,
          });
          wx.setStorageSync("expiration_foodDe" + options.id, expiration);
          console.log("过期时间2de" + expiration);
          // wx.getStorage({
          //   key: 'foodList',
          //   success: function (res) {
          //     console.log("过期" + res.data);
          //   },
          // })

          // _this.setData({ food: res.data });

          if (res.data.tips != undefined) {
            _this.setData({
              tips: res.data.tips,
            });
          }
          if (res.data.brief != undefined) {
            _this.setData({
              brief: res.data.brief,
            });
          }

          _this.setData({
            img: res.data.img,
            name: res.data.name,
            material: res.data.material,
            steps: res.data.steps,

          });
        }

      })

    } else {
      console.log("没过期de");
      wx.getStorage({
        key: 'foodDe' + options.id,
        success: function (res) {
          console.log("没过期de"+res.data)
          _this.setData({
            img: res.data.img,
            name: res.data.name,
            material: res.data.material,
            steps: res.data.steps,

          });
        },
      })

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