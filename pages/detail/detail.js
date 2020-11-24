// pages/detail/detail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    indicatorDots: true,
    vertical: false,
    autoplay: true,
    interval: 2000,
    duration: 500,
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

  },
  onLoad: function () {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse){
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
  onLoad:function (options) {
    // console.log(this)
    let _this=this;

    wx.request({
      url: 'http://weixin.2004.com/api/cate', //仅为示例，并非真实的接口地址
      data: {
       goods_id:options.goods_id,
       token:wx.getStorageSync('token')
      },
      success (res) {
        console.log(res.data);
    //     if(res.code.token=1111){
    //       wx.showModal({
    //         title:'提示',
    //         content:'登录信息过期，请重新登录',
    //         success(res){
    //           if(res.confirm){
    //             wx.switchTab({
    //               url: '/pages/index/index',
    //               success(){
    //                 let page=getCurrentPages().pop();
    //                 if(!page) return;
    //                 page.onLoad();
    //               }
    //             })
    //           }
    //         }
    //       })
    //     }
        _this.setData({
       data:res.data,
         background:res.data.goods_image
        })
       }
     })
  },
  swipperChange:function(e){
    // console.log(111);
    let current=e.detail.current;
    this.setData({
      current:e.detail.current
    })
  },
  carts:function(e){
  
    wx.showModal({
      title: '提示',
      content: '确定加入购物车?',
      success (res) {
        if (res.confirm) {
          console.log(e)
          let detail_goods_id = e.currentTarget.dataset.goodsid;
          console.log(detail_goods_id);
          wx.setStorage({
            data: detail_goods_id,
            key: 'detail_goods_id',
          })
          // console.log(goods_id);
          wx.switchTab({
            url: '/pages/cart/cart',
            success(res){
              let page = getCurrentPages().pop(); //跳转页面成功之后
              if (!page) return;
              page.onLoad(); //如果页面存在，则重新刷新页面
            }
          })
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
    //跳转路由
  
  },
}) 