// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
//event是小程序调用云函数时传入的参数
//根据fileId读取云存储的文件
  //fileID: 'cloud://sophie-bd5744.736f-sophie-bd5744/flows/fucha.txt',
  const res = await cloud.downloadFile({
    fileID: event.fileID
  })
  const buffer = res.fileContent;
  console.log(res.tempFilePath)
  return buffer.toString('utf8');
}