// pages/friend/friend.js
let store = require("../../../utils/store.js");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo:'',
    share:'',
    dis: false,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let userInfo = store.getItem("userInfo")
    this.setData({
      userInfo:userInfo
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
      url: 'http://49.234.225.248:3333/image',
      method: 'get',
      header: {
        'content-type': 'content-type:text/plain'
      },
      success:(res)=>{
        this.setData({
          share:res.data
        })
      },
      fail: function (e) {
        console.log(e.massage);
      },
    });
  },
  go:function(e){
    let name=e.target.dataset.nick;
    wx.navigateTo({
      url: '/pages/wode/friend/other/other?touxiang='+name,
    })
  },
  gode:function(e){
    let idsh=e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '/pages/wode/friend/detail/detail?shid='+idsh,
    })
  }
})