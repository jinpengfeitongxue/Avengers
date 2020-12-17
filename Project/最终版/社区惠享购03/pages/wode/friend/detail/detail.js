// pages/wode/friend/other/other.js
let store = require("../../../../utils/store.js");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id:'',
    name:'',
    detail:'',
    comment:'',
    addBookrackSucceed: true,
    iconAddBookrack: "../../../../icon/点赞.png",  
    iconAddBookrackSucceed: "../../../../icon/点赞 (1).png", 
    show:true,
    ctext:'',
    dis: false,
    comment:'',
    cshid:'',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let userInfo = store.getItem("userInfo")
    this.setData({
      id:options.shid,
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
      url: 'http://49.234.225.248:9026/searchdetail/'+encodeURI(this.data.id),
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
    wx.request({
      url: 'http://49.234.225.248:9026/searchid/'+encodeURI(this.data.id),
      method: 'post',
      header: {
        'content-type': 'content-type:text/plain'
      },
      success:(res)=>{
        this.setData({
          comment:res.data
        })
      },
      fail: function (e) {
        console.log(e.massage);
      },
    });
  },
  chooseAddBookrack: function() {
    let value = this.data.addBookrackSucceed;
    this.setData({
      addBookrackSucceed: !value
    })
  },
  previewImg:function(e){
    wx.previewImage({
     current:e.currentTarget.dataset.src,   //当前图片地址
     urls:[e.currentTarget.dataset.src],        //所有要预览的图片的地址集合 数组形式
    })
   },
  on:function(e){
    let ids=e.target.dataset.id;
    this.setData({
      show:false,
      cshid:ids
    })
  },
  go:function(e){
    let name=e.target.dataset.nick;
    wx.navigateTo({
      url: '/pages/wode/friend/other/other?touxiang='+name,
    })
  },
  can:function(){
    this.setData({
      show:true
    })
  },
  textBlur(e) {
    this.setData({
      ctext: e.detail.value
    })
  },
  formSubmit(e) {
    let that = this
    if (e.detail.value.ctext === "") {
      wx.showToast({
        title: '评论内容不能为空',
        icon: "none",
        duration: 1000,
        mask: true,
      })
    } else {
      let params = {

      }
      wx.showModal({
        title: '提示',
        content: '确认评论该内容',
        success(res) {
          if (res.confirm) {
            that.sureRelease(params); //确定
          } else if (res.cancel) {
            wx.showToast({
              title: '继续编辑',
              icon: "none",
              duration: 2000,
              mask: true,
            })
          }
          that.setData({
            dis: true,
          })
        }
      })
    }
  },
  sureRelease(params) {
    let that = this
    let id=new Date().getTime();
    wx.request({
      url: 'http://49.234.225.248:9026/comadd',
      method: 'post',
      header: {
        'content-type': 'content-type:text/plain'
      },
      data:{
        cid:id,
        cname:that.data.userInfo.nickName,
        cshid:that.data.cshid,
        ctext:that.data.ctext
      },
      success:(res)=>{
        that.setData({
          show:true,
          ctext:''
        })
        that.onShow();
      },
      fail: function (e) {
        console.log(e.massage);
      },
    });
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