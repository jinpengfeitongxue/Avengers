// pages/ewm2/ewm2.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    ee:'ffff',
    num:"",
    del:"删除订单"

  },
del:function(e){
  wx.showToast({

    title:'嘤嘤嘤，你见不到我了',
    icon:'none',
    duration: 800
   })
  this.setData({
    del:"已删除"
  })
},
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var self=this
    wx.getStorage({
      key: 'number',
     
      success: function (res) {
        console.log(res.data);
          self.setData({
              num: res.data,
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
})