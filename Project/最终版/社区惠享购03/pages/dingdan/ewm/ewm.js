// pages/ewm/ewm.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    index:'',
    ee:'ffff',
    num:"",
    shopname:"对应超市",
    get:"点击提货"
  },
  gget:function(e){
    var self=this
    wx.showToast({
      title:'提货成功',
      icon:'none',
      duration: 800
     })
    this.setData({
      get:"已提货"
    })
    wx.request({
      url:'http://49.234.225.248:4399/chadet ',
      method: 'POST',
      data:{
        dstate:3,
        usid:self.data.dthm.uid,
      },
      success: function (res) {
        console.log(res.data); 
      },
      fail: function (res) { 
        console.log(err);
      },
      complete: function (res) { },
    });//改
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    var self=this
    wx.getStorage({
      key: 'thm',
      success: function (res) {
        console.log(res.data);
          self.setData({
              dthm:res.data
          })
      }
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
});