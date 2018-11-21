// pages/flowDetail/flowDetail.js

var app = getApp();
wx.cloud.init();
const db = wx.cloud.database();
const _ = db.command;
let wxparse = require("../../wxParse/wxParse.js");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    title:'',
    message:'',
    image:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) { 
    var _this=this; 
    var fileID="";
    console.log(options.id);
    db.collection('flowsDetail').doc(options.id).get({
      success: function (res) {
        // res.data 包含该记录的数据
        // console.log(res.data);
        
        //添加缓存
        // wx:
        _this.setData({
           title: res.data.name,
           });
        if(res.data.img!=null){
          _this.setData({image:res.data.img});
        }
        wxparse.wxParse('message','html',res.data.message,_this);
        // console.log(res.data.filepath);
        // fileID = res.data.filepath;
        // wx.cloud.callFunction({
        //   name: 'readFile',
        //   data: { fileID: fileID },
        //   success: res => {
        //     console.log(res.result)
        //     _this.setData({ message: res.result});
        //   },
        //   fail: err => {
        //     console.log(err)
        //   }
        // })
      }

    })
  
  },


  previewImage:function(e){
    console.log(e.target);
    var current = e.target.dataset.src;
    wx.previewImage({
      current: current, // 当前显示图片的http链接  
      urls: this.data.image // 需要预览的图片http链接列表  
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