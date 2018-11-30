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
    pageIndex: 1,//从第二页开始加载
    pageSize: 6,//每页加载4个
    isShowLoadmore:false,//正在加载
    isShowNoDatasTips:false,//暂无数据
    haseMoreData:true//判断是否还有数据
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var dbName = "food";
    var _this = this;
    var pageIndex = this.data.pageIndex;
    var pageSize = this.data.pageSize;
    //调用云函数,获取数据,并将数据放入缓存.
    var expiration = wx.getStorageSync("index_data_expiration");//拿到过期时间
    //console.log("foodlistexpriation" + expiration);
    var timestampNow = Date.parse(new Date());//拿到现在时间
    var foodListStorage = wx.getStorageSync("foodList");
   // wx.clearStorageSync();
    if (expiration < timestampNow | foodListStorage == ""){
      console.log("过期");
      wx.removeStorageSync("foodList");
      //查询数据
      this.getfoodList(dbName, pageIndex, pageSize, function (result) {
        if(result.length!=0){
          //将数据添加到缓存中
          var timestamp = Date.parse(new Date());
          let expiration = timestamp + 86400000;
          wx.setStorage({
              key: 'foodList',
              data: result,
            });
          wx.setStorageSync("index_data_expiration", expiration);
        }
      });
    }else{
      console.log("没过期");
      wx.getStorage({
        key: 'foodList',
        success: function(res) {
          _this.setData({ food: res.data });
        },
      })
    }
   
  },

  //调用云函数,分页查询
  getfoodList:function(dbName,pageIndex,pageSize,cb){
    var _this = this;
    wx.cloud.callFunction({
      name:'pagination',
      data:{
        dbName:dbName,
        pageIndex:pageIndex,
        pageSize:pageSize,
        field:{
          img: true,
          name: true,
          material: true
        }
      }
    }).then(res=>{
      var result = res.result.data
      //如果返回的数据没有pagesize大
      if (result.length < pageSize) {
        //如果没有数据
        if (result.length === 0) {
          console.log("1")
          console.log(result);
          _this.setData({
            isShowLoadmore: true,//隐藏正在加载
            isShowNoDatasTips: true,//显示暂无数据
            haseMoreData: false,//上拉不在加载数据
          })
        } else {
          console.log("2")
          //如果有数据只是不超过pagesize
          _this.setData({
            food: _this.data.food.concat(result),
            isShowLoadmore: true,//隐藏正在加载
            isShowNoDatasTips: true,//显示暂无数据
            haseMoreData: false,//上拉不在加载数据
          })
          console.log("getfoodList2"+result)
        }

      } else {
        console.log("3")
        _this.setData({
          food: _this.data.food.concat(result),
          pageIndex: _this.data.pageIndex + 1

        })
      }
      //回调数据
      typeof cb == "function" && cb(result);
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
    console.log("foodListonHide");
    
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
  var that=this;
  var dbName = "food";
  var pageIndex = this.data.pageIndex;
  var pageSize = this.data.pageSize;
//如果有更多数据,进行加载
   var haseMoreData=that.data.haseMoreData;
    console.log(haseMoreData)
   if (haseMoreData){
     this.getfoodList(dbName, pageIndex, pageSize, function (result) {
       if (result.length != 0) {
         //将数据添加到缓存中
         var timestampReach = Date.parse(new Date());
         let expirationReach = timestampReach + 86400000;
         console.log("onreachBottom" + result);
         wx.setStorage({
           key: 'foodList',
           data: that.data.food,
         });
         wx.setStorageSync("index_data_expiration", expirationReach);
       }
     });
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  }
})