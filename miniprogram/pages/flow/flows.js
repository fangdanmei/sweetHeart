// pages/flow/flows.js
var app=getApp();
const db = wx.cloud.database();
const _ = db.command;
var file="../flowDetail/flowDetail"
Page({

  /**
   * 页面的初始数据
   */
  data: {
     flows:[
       { id: '3', name: '就诊攻略', src: "../../images/jiuzhen.png"},
       { id: '1', name: '检查预约', src: "../../images/jiancha.png" },
       { id: '2', name: '入院办理', src: "../../images/zhuyuan.png"},
       { id: '4', name: '交通路线', src: "../../images/jiaotong.png"},
       { id: '5', name: '化疗注意事项', src: "../../images/hualiao.png" },
       { id: '6', name: '空港化疗', src: "../../images/hualiao.png"},
       { id: '7', name: '术后注意事项', src: "../../images/shoushu.png"},
       { id: '8', name: '术后出院注意事项', src: "../../images/chuyuan.png" },
       { id: '9', name: '异地就医手续', src: "../../images/yidi.png" },
       { id: '11', name: '复印病历', src: "../../images/bingli.png" },
       { id: '10', name: '天津残疾证办理', src: "../../images/canlian.png" }
       ],
       url:file
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