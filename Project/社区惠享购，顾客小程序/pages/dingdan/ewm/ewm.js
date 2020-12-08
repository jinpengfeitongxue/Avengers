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
    wx.setStorage({
      data: self.data.data,
      key: 'change2',
    })
    console.log(this.data.data)
    wx.setStorage({
      data: self.data.data.index,
      key: 'bindex2',
    })
    console.log(this.data.data.index)
    wx.request({
      url:'http://49.234.225.248:5050/uscha ',
      method: 'POST',
      data:{
        ustate:3,
        usid:this.data.data.conum
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
      key: 'number',
     
      success: function (res) {
        console.log(res.data);
          self.setData({
              data:res.data
          })
      }
  })
  wx.getStorage({
    key: 'index2',
    success: function (res) {
      console.log(res.data);
        self.setData({
            index: res.data.index,
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