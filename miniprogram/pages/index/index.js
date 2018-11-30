//index.js
const app = getApp()
wx.cloud.init();
const db = wx.cloud.database();
const _ = db.command;
Page({
  data: {
    dayStyle: [
      { month: 'current', day: new Date().getDate(), color: 'white', background: '#AAD4F5' }, 
      { month: 'current', day: new Date().getDate(), color: 'white', background: '#AAD4F5' }
      ],
    routMorn:'',
    routAfter:'',

    },

 //给点击的日期设置一个背景颜色
  dayClick: function (event) {
     let clickDay = event.detail.day; 
     let changeDay = `dayStyle[1].day`;
     let changeBg = `dayStyle[1].background`; 
     this.setData({ [changeDay]: clickDay, [changeBg]: "#84e7d0" });
   
     var clickyear=event.detail.year;
     var clickmonth=event.detail.month;
     var date = clickyear + "/" + clickmonth + "/" + clickDay;
      // console.log(date);
     this.showRrouting(date);

     },

  onLoad: function(event) {
  console.log(event.detail);
    var date = new Date();
    var day=date.getDate();
    var month=date.getMonth()+1;
    var year=date.getFullYear();
    var _date=year+"/"+month+"/"+day;
    this.showRrouting(_date);
  
   },
  showRrouting:function(d){
    var _this=this;
    

    db.collection('routing').where({
      workDate: d
    }).get({
        success: function (res) {
          // console.log("aa"+d);
          // console.log("success"+res.data[0].routMorn);
          if(res.data==""){
            _this.setData({ routMorn: "", routAfter:""})
          }else{
            _this.setData({ routMorn: res.data[0].routMorn, routAfter: res.data[0].routAfter })
          }
         
        }
      })


   
  }


})
