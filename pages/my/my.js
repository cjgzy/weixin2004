// pages/my/my.js
Page({
    tapName: function(event) {
    // console.log(1111);
    // console.log(_this);
    wx.login({
      success (res) {        
        if (res.code) {
          console.log(res);
          //发起网络请求
          wx.setStorage({//存缓存
                      key:"token",
                      data:res.code
                });
          wx.request({
            url: 'http://weixin.2004.com/api/login',
            data: {
              code: res.code
            }
          })
        } else {
          console.log('登录失败！' + res.errMsg)
        }
      }
    })
    },
})