//index.js
//获取应用实例
const app = getApp()
Page({
  data: {
  },
  pay:function(e){
    wx.request({
      url: 'http://localhost:8083/wx/wxpay', //仅为示例，并非真实的接口地址
      data: {
        openid: app.globalData.openid
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        console.log(res.data.data)
        let data = res.data.data
        wx.requestPayment({
          timeStamp: data.timeStamp,
          nonceStr: data.nonceStr,
          package: data.package,
          signType: data.signType,
          paySign: data.paySign,
          success:function(res){
            console.log('success')
            console.log(res)
          },
          fail:function(res){
            console.log('fail')
            console.log(res)
          },
          complete:function(res){
            console.log('complete')
            console.log(res)
          }
        })
      }
    })
  }
})
