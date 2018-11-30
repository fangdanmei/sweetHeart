// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
const db=cloud.database()
// 云函数入口函数
exports.main = async (event, context) => {
 var dbName=event.dbName;//集合名称
 var filter=event.filter?event.filter:null;//删选条件,默认为空,filter:{_id:xxx}
 var field=event.field?event.field:"*";//设置读取的field.field:{aa:true}
 var pageIndex= event.pageIndex?event.pageIndex:1;//当前页面是第几页,默认是第一页
 var pageSize=event.pageSize?event.pageSize:10;//每页记录数,默认是10;
 const countResult=await db.collection(dbName).where(filter).count();//获取集合中的总记录数
 const total=countResult.total;//得到总记录数
 const totalPage=Math.ceil(total/pageSize);//计算需要的页数
 var haseMore;//提示前端是否还有数据
 if(pageIndex>=totalPage){
   //没有数据了,就返回false
   haseMore=false;
 }else{
   haseMore=true;
 }
//查询数据并返回给前端
if(field=="*"){
  return db.collection(dbName).where(filter).skip((pageIndex - 1) * pageSize).limit(pageSize).get().then(res => {
    res.haseMore = haseMore;
    return res;
  })
}else{
  return db.collection(dbName).field(field).where(filter).skip((pageIndex - 1) * pageSize).limit(pageSize).get().then(res => {
    res.haseMore = haseMore;
    return res;
  })
}

}