//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  getUserInfo: function(e) {
    // console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
  onLoad:function () {
    // console.log(this)
   this.getGoodsList();
   //登录
   wx.login({
    success (res) {
      if (res.code) {
        //发起网络请求
        wx.request({
          url: 'http://weixin.2004.com/api/login',
          data: {
            code: res.code
          },
          success(res){
            // console.log (res);
            //将token存入本地存储
              wx.setStorage({
                data: res.data.token,
                key: 'token',
              })
          }
        })
      } else {
        console.log('登录失败！' + res.errMsg)
      }
    }
  })

  },
    onShareAppMessage() {
      return {
        title: 'swiper',
        path: 'page/component/pages/swiper/swiper'
      }
    },
  
    data: {
      background: ["/images/discount-banner.jpg", '/images/nursing-banner.jpg', '/images/draw-banner.jpg'],
      indicatorDots: true,
      vertical: false,
      autoplay: true,
      interval: 2000,
      duration: 500,
      arr:[],
      page:1,
      pagesize:10,
    },
    onReachBottom:function(){
      console.log(1234567);
      this.data.page++;
      this.getGoodsList();
    },
    getGoodsList:function(){
      let _this=this;
      wx.request({
        url: 'http://weixin.2004.com/api/goodslist', //仅为示例，并非真实的接口地址
        data: {
          page:_this.data.page,
          size:_this.data.pagezise
        },
        header: {'content-type': 'application/json'},
        success (res) {
          // console.log(res);
        let new_list=_this.data.arr.concat(res.data.data.list)
        _this.setData({
          arr:new_list
        })
        }
      })
    },
    changeIndicatorDots() {
      this.setData({
        indicatorDots: !this.data.indicatorDots
      })
    },
    
    changeAutoplay() {
      this.setData({
        autoplay: !this.data.autoplay
      })
    },
  
    intervalChange(e) {
      this.setData({
        interval: e.detail.value
      })
    },
  
    durationChange(e) {
      this.setData({
        duration: e.detail.value
      })
    },
    catchTapCategory: function (e) {
          var goodsId = e.currentTarget.dataset.goodsid;
          wx.navigateTo({
            url: '/pages/detail/detail?goods_id='+goodsId
          })
    },
  })