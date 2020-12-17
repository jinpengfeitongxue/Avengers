// pages/message/message.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tlist:[],
    shopId:0
  },
  getMessage:async function(){
    var that=this;
    return await new Promise((rv, rj) => {
      wx.request({
        url:'http://49.234.225.248:3199/text',
        method:'GET',
        success:function(res){
          //console.log(that.data)
          rv(res.data)
        },
        fail : err => {
          rj(err)
        }
      });
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
    this.setData({
      shopId:getApp().shopId,
    })
    this.showView()
  },

  showView: async function (){
    let that = this;
    let tempList = [];
    let messgaes = await this.getMessage();
    this.setData({
      tlist:messgaes
    })
    tlen=this.data.tlist.length;
    //筛选出对应本商店的留言
    for(var j=0;j<tlen;j++){
      if(this.data.tlist[j].sid === this.data.shopId){
        tempList.push(this.data.tlist[j]);
      }
    }
    //按时间进行排序，最新留言时间在前
    tempList.sort(function(a,b){
      return a.ttime < b.ttime ? 1 : -1;
    });
    that.setData({
      tlist:tempList,
    })
    //console.log(this.data.tlist);
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