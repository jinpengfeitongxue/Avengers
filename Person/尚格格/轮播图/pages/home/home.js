// pages/home/home.js
Page({

  /**
   * 页面的初始数据
   */
  data: { 
    imgUrls: [
      'https://dss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=117981263,3437647671&fm=26&gp=0.jpg',
      'https://dss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=2422543966,1960079128&fm=26&gp=0.jpg',
      'https://dss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=3130690419,1171365388&fm=26&gp=0.jpg'
    ],
  },
//轮播图的切换事件

swiperChange: function(e) {
  this.setData({
    swiperCurrent: e.detail.current
  })
},
//点击图片触发事件
swipclick: function(e) {
  console.log(this.data.swiperCurrent);
  wx.switchTab({
    url: this.data.links[this.data.swiperCurrent]
  })
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

  }
})