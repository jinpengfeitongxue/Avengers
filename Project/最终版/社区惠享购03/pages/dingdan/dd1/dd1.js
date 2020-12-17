// pages/dingdan/dd1/dd1.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    status:"",
    push:"0",
    res:'',
    time:'2020-11-18 00:00:00',  
    carts:[
      {
        cout:0,
        goods:[],
        price:''
      },],
  },
  hd3: function(e){
    wx.navigateTo({
      url: '../dd2/dd2',
    })

  },
  hd4: function(e){
    wx.navigateTo({
      url: '../dd3/dd3',
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
    var self=this;
  var prices=0;

    var index1=self.data.carts.length-1;
    wx.getStorage({
      key: 'message',
      success: function (res) {
         //console.log(res.data);
         for(var i=0;i<res.data.length;i++){
           prices+=res.data[i].num*res.data[i].price
         }
          self.setData({
            ['carts['+ index1+ '].goods']: res.data,
            ['carts['+ index1+ '].price']:prices
          })
          //console.log(prices)
          //console.log(index1);
      }
  })
  wx.getStorage({
    key: 'thm',
    success:function(res){
      console.log(res.data);
      self.setData({
        ['carts['+ index1+ '].time']: res.data.time,
        ['carts['+ index1+ '].dnum']:res.data.ordernum,
        ['carts['+ index1+ '].thm']:res.data.thm,
      })
      //console.log(self.data.carts);
    }
  })
  if(self.data.carts.length>index1){
    index1++;
  }
  wx.removeStorage({
    key: 'message',
    success: function(res) {
    },
  })
  wx.removeStorage({
    key: 'thm',
    success: function(res) {
    },
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