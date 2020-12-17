// pages/shopdetail/shopdetail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
   i:0,
  shopdata:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({

      i:options.i
    })
    console.log(this.data.i)
    
    wx.request({
      url: 'http://49.234.225.248:8080/store',
      method:'GET',
      data:{},
      success:(res)=>{
        this.setData({
          shopdata:res.data,
        })
      }
    })
    
  },
  phoneCall:function(){
    wx.makePhoneCall({
      phoneNumber: '13545607694',
    })
  },
  guideNow:function(){
    wx.openLocation({
      latitude:37.995317,
      longitude:114.525274,
      scale: 18,
      name:"美梦精品水果超市",
      address:"河北省石家庄市裕华区南焦国培大厦一楼",
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