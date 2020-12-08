//index.js
//获取应用实例
const app = getApp()
let store = require("../../utils/store.js")
let router = require("../../utils/router.js")
let Api = app.Api

Page({
  data: {
    //shopdata 超市数据
    shopdata:[],
    Goodlist:[],
    goodlist:[],
    i:0,
    s:0,
    sid:1,
    //商品数据
    goods:[],
    currentIndex:0,
    userId: store.getItem("userId"),
    imgUrls: [
      'https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=262434159,3687318859&fm=11&gp=0.jpg',
      'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=2932105850,3655978207&fm=26&gp=0.jpg',
      'https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=1053005720,2260688389&fm=26&gp=0.jpg'
    ]
  },

  onLoad: function () {
    //判断用户是否登录
    if(!this.data.userId){
      this.getSession();
    }
    //获取超市数据
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
    wx.request({
      url:'http://49.234.225.248:7070/good',
      method:'get',
      data:{},
      success:(res)=>{
        this.setData({
          Goodlist:res.data,
        })
        
      }
      
    })
    
  },
 // 获取登录的code
 getSession(){
  wx.login({
    success:res =>{
      if(res.code){
        app.get(Api.getSession,{
          code:res.code
        }).then(res =>{
          store.setItem("openId",res.openid);
        }).catch(err =>{
          console.log(err.message)
        })
      }
    }
  })
},
getUserInfo:function(e){
  let userInfo = e.detail.userInfo;
  userInfo.openid = store.getItem("openId");
  app.get(Api.login,{
    userInfo
  }).then(res =>{
    store.setItem('userId',res.userId);
    this.setData({
      userId:res.userId
    })
  })
},
    /* 这里实现控制中间凸显图片的样式 */
  handleChange: function(e) {
    this.setData({
    currentIndex: e.detail.current
    })
  },
  //进入超市，传递sid值
  goshop:function(e){
    let sId=e.currentTarget.dataset.id
    console.log(sId);
    this.setData({
      i:0,
      sid:sId
    })
    for(let j=0;j<this.data.shopdata.length;j++){
      if(sId!=this.data.shopdata[j].sid){
        this.setData({
          i:++this.data.i
        })
      }
      else{
        console.log(this.data.i);
        break
      }
    }
    // for(let u=0;u<this.data.Goodlist.length;u++){
    //   if(this.data.sid==this.data.Goodlist[u].gsid){
    //       this.data.goodlist[u]=this.data.Goodlist[u]
    //   }
    //   if(this.data.sid!=this.data.Goodlist[u].gsid){
    //     this.data.goodlist[u]=this.data.Goodlist[u]
    //   }
    // }
    var shopdata = JSON.stringify(this.data.shopdata)
    console.log(shopdata)
    wx.navigateTo({ 
      url: "/pages/shop/shop?id="+e.currentTarget.dataset.id+"&shopdata="+shopdata+"&i="+this.data.i,
    })
  }
})
