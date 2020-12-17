//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    shopId:0,
    shopgoods:'',
    shop:''

  },
  //跳转
  gotoUpload:function(){
    wx.navigateTo({
      url: '/pages/upload/upload',
    })
  },
  deleteGoods:function(e){
    wx.request({
      url: 'http://49.234.225.248:7070/gdel',
      method:'POST',
      data:{
        gid:e.currentTarget.dataset.id
      },
      success:(res)=>{
        wx.showToast({
          title: '删除成功',
          icon: "none",
          duration: 2000,
          mask: true,
        })
      }
    })
  },
  onLoad: function () {
    
  },
  //获取登录id
  onShow:function(){
    this.setData({
      shopId:getApp().shopId,
    })
    // console.log(this.data.shopId)
    wx.request({
      url: 'http://49.234.225.248:7070/good',
      method:'GET',
      data:{},
      success:(res)=>{
        let shop = res.data.filter((val)=>val.gsid==this.data.shopId)
        this.setData({
          shop:shop,
        })
        //console.log(this.data.shop)
      }
    })
  }
})
