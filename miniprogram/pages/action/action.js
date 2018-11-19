// pages/action/action.js
const date=new Date();
const nowYear=date.getFullYear();
const nowMonth=date.getMonth()+1;
const nowDay=date.getDate();
const nowHour=date.getHours();
const nowMin=date.getMinutes();
// console.log("hour"+nowHour);
// console.log("min"+nowMin);


//设置年份列表
const years = [];
const months=[];
const days=[];
const hours = [];
const mins = [];
for(let i=2015;i<=date.getFullYear()+1;i++){
  years.push(i);
}
//设置月份列表
for(let i=1;i<=12;i++){
  months.push(i);
}
//设置日期列表
let daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
//根据年月 获取当月的总天数
let getDays = function (year, month) {
  if (month == 2) {
    return ((year % 4 == 0) && ((year % 100) != 0)) || (year % 400 == 0) ? 29 : 28
  } else {
    return daysInMonth[month - 1]
  }
}
//设置小时列表
for(let i=0;i<=23;i++){
  hours.push(i);
}
//设置分钟列表
for (let i = 0; i <= 59; i++) {
  mins.push(i);
}

Page({

  /**
   * 页面的初始数据
   */
  data: {
    years: years,
    months: months,
    days:[],
    hours:hours,
    mins:mins,

    year: nowYear,
    month: nowMonth,
    day: nowDay,
    hour:nowHour,
    min:nowMin,

    value:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.freshDate(this.data.year, this.data.month, this.data.day,this.data.hour,this.data.min, this);
    console.log(this.data.value);
  },
  bindChange:function(e){
    let val=e.detail.value;
    this.freshDate(this.data.years[val[0]],this.data.months[val[1]],this.data.days[val[2]],this);
  },

  freshDate:function(year,month,day,hour,min,_th){
    console.log("day00"+day);
    //根据年月,得到这个月一共有多少天.
    let dayNums = getDays(year, month);
    //将天数存入到days中.
    for (let i = 1; i <= dayNums; i++) {
      days.push(i);
    }
    //console.log(days);
    let yearIdx=999;
    let monthIdx=0;
    let dayIdx=0;
    let hourIdx=0;
    let minIdx=0;

    years.map(function(v,idx){

      if(v==year){
        yearIdx=idx;
      }
    });

    months.map(function(v,idx){
      if(v==month){
        monthIdx=idx;
      }
    });
    
    days.map(function(v,idx){
      if(v==day){
        dayIdx=idx;
      }
    });

    hours.map(function(v,idx){
      if(v==hour){
        hourIdx=idx;
      }
    });

    mins.map(function(v,idx){
      if(v==min){
        minIdx=idx;
      }
    });
    var _th=this;
    
    //设置列表,修改页面数据
    _th.setData({
      // years: years,//设置年份列表
      // months: months,//月份列表
      days: days,//设置列表
      year: year,
      month: month,
      day: day,
      value: [yearIdx, monthIdx, dayIdx,hourIdx,minIdx]
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