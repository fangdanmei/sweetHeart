// pages/flowDetail/flowDetail.js

var app = getApp();
wx.cloud.init();
const db = wx.cloud.database();
const _ = db.command;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    title:'',
    message:[],
    image:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) { 
    var _this=this; 
    var fileID="";
    var expiration = wx.getStorageSync("expiration_flowDetail"+options.id);//拿到过期时间
    var timestampNow = Date.parse(new Date());//拿到现在时间
    var flowDetailStorage= wx.getStorageSync("flowDetail"+options.id);
    // console.log("过期时间" + expiration);
    // console.log("现在时间" + timestampNow);

    // console.log();

    if (expiration < timestampNow | flowDetailStorage == ""){
       console.log("过期");
       wx.clearStorageSync();
      db.collection('flowsDetail').doc(options.id).get({
        success: function (res) {
          // res.data 包含该记录的数据
          var timestamp = Date.parse(new Date());
          let expiration = timestamp + 100000;
          wx.setStorage({
            key: 'flowDetail'+options.id,
            data: res.data,
          })
          wx.setStorageSync("expiration_flowDetail" + options.id, expiration);
         // 判断是否有图片
        // console.log("message00"+res.data.message);
          if (res.data.img != null) {
            _this.setData({
              title: res.data.name,
              message: res.data.message,
              image: res.data.img 
            });
          }else{
            _this.setData({
              title: res.data.name,
              message: res.data.message
            });
          }
        }
      })
    }else{
      //wx.clearStorageSync();
       console.log("没过期");
      wx.getStorage({
        key: 'flowDetail' + options.id,
        success: function(res) {
          //判断是否有图片
          if (res.data.img != null) {
            _this.setData({
              title: res.data.name,
              message: res.data.message,
              image: res.data.img
            });
          } else {
            _this.setData({
              title: res.data.name,
              message: res.data.message
            });
          }
        },
      })

    }

  
  
  },


  previewImage:function(e){
    console.log(e.target);
    var current = e.target.dataset.src;
    var imgArr=[];
     imgArr.push(current);
    wx.previewImage({
      current: current, // 当前显示图片的http链接  
      urls: imgArr // 需要预览的图片http链接列表  
    })
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