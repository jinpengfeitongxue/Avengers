// pages/wode/friend/other/other.js
let store = require("../../../../utils/store.js");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    name:'',
    detail:'',
    dis: false,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      name:options.touxiang
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
    wx.request({
      url: 'http://49.234.225.248:9026/searchname/'+encodeURI(this.data.name),
      method: 'post',
      header: {
        'content-type': 'content-type:text/plain'
      },
      success:(res)=>{
        this.setData({
          detail:res.data
        })
      },
      fail: function (e) {
        console.log(e.massage);
      },
    });
  },
  gode:function(e){
    let idsh=e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '/pages/wode/friend/detail/detail?shid='+idsh,
    })
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