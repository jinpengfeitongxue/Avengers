// pages/tip/tip.js
var util = require('../../../time.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    show:true,
    arr:[],

    sid:'',
    tt:''


  },

  speak:function(e){
    this.setData({
      show:false
    })

  },
  gtext:function(e){
    this.setData({
      tt: e.detail.value
    })
    console.log(e.detail.value)
    console.log(this.data.tt)
  },
  sub:function(e){
    var self=this

    this.setData({
      show:true
    })
    if(self.data.tt!=""){
    wx.request({
      url:'http://49.234.225.248:3199/texadd ',
      data:{
        tid: self.data.arr[self.data.arr.length-1].tid+1, sid: self.data.sid, text: self.data.tt, ttime: util.formatTime(new Date())
      },
      method: 'POST',
      success: function (res) {
        console.log(self.data.tt)   
        console.log(res.data)
      },
      fail: function (res) { 
        console.log(err);
      },
    });
  }
  this.onLoad();


  },
  close:function(e){
    var self=this
    console.log(self.data.tt)    
    
      wx.showToast({
        title:'评价成功',
        icon:'none',
        duration: 800
       })
      
    this.onShow()

  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var self=this
    wx.getStorage({
      key: 'sid',
      success: function (res) {
        self.setData({
          sid:res.data
        })
      }
    })
    console.log(self.data.sid)
    wx.request({
      url:'http://49.234.225.248:3199/text ',
      method: 'GET',
      success: function (res) {
   
        
        self.setData({
          arr:res.data
        })
    console.log(self.data.arr)
      },
      fail: function (res) { 
        console.log(err);
      },
    });
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
      
    var self=this
    console.log(self.data.tt) 

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