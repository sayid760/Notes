//app.js
App({
  onLaunch: function () {
    var that = this
    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        if (res.code) {
          wx.request({
            url: 'http://localhost:8083/wx/code2session',
            data: {
              code: res.code
            },
            success(res) {
              console.log()
              that.globalData.openid = res.data.data.openid
            }
          })
        }
      }
    })
  },
  globalData: {
    openid: null
  }
})