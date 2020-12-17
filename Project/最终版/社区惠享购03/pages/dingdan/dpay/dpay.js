// miniprogram/pages/dpay/dpay.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    goods:[],
    price:"",
    pp:"确认付款"
  },
gopay:function(e){
  console.log(this.data)
  var self=this
  wx.showToast({
    title:'付款成功',
    icon:'none',
    duration: 800
   })
  this.setData({
    pp:"已付款"
  })
wx.request({
  url:'http://49.234.225.248:4399/chadet ',
  method: 'POST',
  data:{
    dstate:2,
    usid:self.data.goods.uid,
  },
  success: function (res) {
    console.log(res.data); 
  },
  fail: function (res) { 
    console.log(err);
  },
  complete: function (res) { },
});//改
for(var j=0;j<this.data.goods.goods.length;j++){
  var gnum=this.data.goods.goods[j].gresidue-this.data.goods.goods[j].num;
  console.log(gnum);
wx.request({
  url:'http://49.234.225.248:7070/gchas ',
  method: 'POST',
  data:{
    gresidue:gnum,
    gid:this.data.goods.goods[j].gid
  },
  success: function (res) {
    console.log(res.data); 
  },
  fail: function (res) { 
    console.log(err);
  },
  complete: function (res) { },
});//改
}
},
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var self=this;
  console.log(this.data.goods)
    wx.getStorage({
      key: 'paygoods',
      success: function (res) {
        console.log(res.data);
          self.setData({
              goods: res.data,
          })
      }
  })
  console.log(self.data)
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