// pages/dingdan/dingdan.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    shopId:0,
    height:6000,
    dingdanList:[],
    alreadyList:[],//用来渲染已完成页面
    paidList:[],//用来渲染已付款页面
    goodsList:[],
    currtab: 0,
    swipertab: [{ name: '已付款', index: 0 }, { name: '已完成', index: 1 }],
  },
  getDingdanList:async function(){
    var that=this;
    return await new Promise((rv, rj) =>{
      wx.request({
        url:'http://49.234.225.248:4399/detail',
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
  getGoodsList:async function(){
    var that=this;
    return await new Promise((rv, rj) => {
      wx.request({
        url:'http://49.234.225.248:7070/good',
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
  onLoad: function () {
  
  },
  onShow:function(){
    this.setData({
      shopId:getApp().shopId,
    })
    console.log(this.data.shopId)
    this.orderShow()
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    // 页面渲染完成
    
  },
 
  /**
  * @Explain：选项卡点击切换
  */
  tabSwitch: function (e) {
    var that = this
    if (this.data.currtab === e.target.dataset.current) {
      return false
    } else {
      that.setData({
        currtab: e.target.dataset.current
      })
      
    }
  },
 
  tabChange: function (e) {
    this.setData({ currtab: e.detail.current })
    this.orderShow()
  },
 
  orderShow: async function () {
    let that = this
    //console.log("currtab:"+this.data.currtab)
    let goods = await this.getGoodsList()
    that.setData({
      goodsList:goods
    })
    let dingdans=await this.getDingdanList()
    that.setData({
      dingdanList:dingdans
    })
    
    switch (this.data.currtab) {
      case 0:
        //console.log(this.data.dingdanList)
        that.paidShow()
        break
      case 1:
        //console.log(this.data.goodsList)
        that.alreadyShow()
        break
    }
    that.setData({
      height:this.data.currtab==0?this.data.paidOrder.length*225:this.data.alreadyOrder.length*225
    })
  },
  //一个通过gid找到gimgsrc的函数
  findg:function(gid,sid){
    let g=[];
    for(let i=0;i<this.data.goodsList.length;i++){
      if(gid==this.data.goodsList[i].gid && sid == this.data.goodsList[i].gsid){
        g[0] = this.data.goodsList[i];
        break;
      }
    }
    return g;
  },
  //已付款
  paidShow:function(){
    
    let i=0,j=0;
    var paidList=[];
    //console.log(this.data.shopId)
    for(i=0;i<this.data.dingdanList.length;i++){
      if(this.data.dingdanList[i].sid==this.data.shopId && this.data.dingdanList[i].dstate==1){
        paidList[j]=this.data.dingdanList[i];
        paidList[j].g=this.findg(this.data.dingdanList[i].gid,this.data.shopId);
        j++;
      }
    };
    //console.log(paidList)
    //this.data.paidList = paidList
    this.setData({
      paidOrder: paidList,
    })
  },
  //已完成
  alreadyShow: function(){
    let i=0,j=0;
    var alreadyList=[];
    //console.log(this.data.shopId)
    for(i=0;i<this.data.dingdanList.length;i++){
      if(this.data.dingdanList[i].sid==this.data.shopId && this.data.dingdanList[i].dstate==2){
        alreadyList[j]=this.data.dingdanList[i];
        alreadyList[j].g=this.findg(this.data.dingdanList[i].gid,this.data.shopId);
        j++;
      }
    };
    console.log(alreadyList)
    this.setData({
      alreadyOrder: alreadyList
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