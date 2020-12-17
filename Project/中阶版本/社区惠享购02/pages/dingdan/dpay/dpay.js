// miniprogram/pages/dpay/dpay.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    ctime:"",
    conum:'',
    cnum:'',
    index:'',
    goods:[],
    price:"",
    pp:"确认付款"
  },
gopay:function(e){
  var self=this
  wx.showToast({
    title:'付款成功',
    icon:'none',
    duration: 800
   })
  this.setData({
    pp:"已付款"
  })
  console.log(self.data.index);
wx.setStorage({
  key: 'bindex',
  data: self.data.index,
})
wx.setStorage({
  data: self.data,
  key: 'change',
})

wx.request({
  url:'http://49.234.225.248:5050/uscha ',
  method: 'POST',
  data:{
    ustate:2,
    usid:this.data.conum
  },
  success: function (res) {
    console.log(res.data); 
  },
  fail: function (res) { 
    console.log(err);
  },
  complete: function (res) { },
});//改

for(var j=0;j<this.data.goods.length;j++){
  var gnum=this.data.goods[j].gresidue-this.data.goods[j].num;
  console.log(gnum)
  
wx.request({
  url:'http://49.234.225.248:7070/gchas ',
  method: 'POST',
  data:{
    gresidue:gnum,
    gid:this.data.goods[j].gId
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
    wx.request({
      url:'http://49.234.225.248:7070/good ',
      method: 'GET',
      success: function (res) {
        console.log(res.data);
        for(var i=0;i<res.data.length;i++){
          for(var t=0;t<self.data.goods.length;t++){
            if(self.data.goods[t].gId==res.data[i].gid){
        self.setData({
          ['goods['+t+'].gresidue']:res.data[i].gresidue
        })}
      }
      }
      },
      fail: function (res) { 
        console.log(err);
      },
      complete: function (res) { },
    });//查
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
  wx.getStorage({
    key: 'index',
    success: function (res) {
      console.log(res.data);
        self.setData({
            index: res.data,
        })
    }
})
  wx.getStorage({
    key: 'payprice',
    success: function (res) {
      console.log(res.data);
        self.setData({
            price: res.data,
        })
    }
})
wx.getStorage({
  key: 'ctime',
  success: function (res) {
    console.log(res.data);
      self.setData({
          ctime: res.data,
      })
  }
})
wx.getStorage({
  key: 'conum',
  success: function (res) {
    console.log(res.data);
      self.setData({
          conum: res.data,
      })
  }
})
wx.getStorage({
  key: 'cthm',
  success: function (res) {
    console.log(res.data);
      self.setData({
          cthm: res.data,
      })
  }
})
wx.setStorage({
  data: this.data.carts[e.currentTarget.dataset.index].thm,
  key: 'cthm',
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