//index.js
//获取应用实例
const app = getApp()
let store = require("../../utils/store.js")
let router = require("../../utils/router.js")
let Api = app.Api
var QQMapWX = require('../../utils/qqmap-wx-jssdk1.2/qqmap-wx-jssdk.min.js');
var qqmapsdk

Page({
  data: {
    addtitle:'',
    localtitle:'',
    latitude:'',
    longitude:'',
    addr:'',
    newshopdata:[],
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
    userInfo:store.getItem("userInfo"),
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
  onShow:function(){
    this.onReady();
  },
  onReady: function (options) {
    // 实例化API核心类
    qqmapsdk = new QQMapWX({
      key: 'W57BZ-JDB6X-XPA4H-Z76MI-73FF2-24BT4'
    });
    let addtitle = store.getItem('title')
    let latitude = store.getItem('latitude')
    let longitude = store.getItem('longitude')
    let addr = store.getItem('addr')
    this.setData({
      addtitle:addtitle,
      latitude:latitude,
      longitude:longitude,
      addr:addr
    })
    if(this.data.addtitle===""){
    wx.getLocation({
      type:'gcj02',
      success:(res)=>{
        //你地址解析
        this.setData({
          latitude:res.latitude,
          longitude:res.longitude
        })
        const latitude = res.latitude
        const longitude = res.longitude
        qqmapsdk.reverseGeocoder({
          location: {
            latitude: latitude,
            longitude: longitude
          },
          success: (res)=>{
            this.setData({
              localtitle:res.result.address
            })
          },
        });
        for(let i=0;i<this.data.shopdata.length;i++){
          const inpvalue=this.getDistance(res.latitude,res.longitude,this.data.shopdata[i].latitude,this.data.shopdata[i].longitude);  
          this.data.shopdata[i].inpvalue = inpvalue;
        }
        // getApp().inpvalue = inpvalue;
        const newshopdata = this.data.shopdata.filter((val)=>val.inpvalue<2)
        this.setData({
          newshopdata:newshopdata
        })
      },
    })
  }
  else{
    const latitude = this.data.latitude
    const longitude = this.data.longitude
    for(let i=0;i<this.data.shopdata.length;i++){
      const inpvalue=this.getDistance(latitude,longitude,this.data.shopdata[i].latitude,this.data.shopdata[i].longitude);  
      this.data.shopdata[i].inpvalue = inpvalue;
    }
    const newshopdata = this.data.shopdata.filter((val)=>val.inpvalue<2)
    this.setData({
      newshopdata:newshopdata
    })
  }
  
  },
  Rad: function (d) { //根据经纬度判断距离
    return d * Math.PI / 180.0;
  },
  getDistance: function (lat1, lng1, lat2, lng2) {
    // lat1用户的纬度
    // lng1用户的经度
    // lat2商家的纬度
    // lng2商家的经度
    var radLat1 = this.Rad(lat1);
    var radLat2 = this.Rad(lat2);
    var a = radLat1 - radLat2;
    var b = this.Rad(lng1) - this.Rad(lng2);
    var s = 2 * Math.asin(Math.sqrt(Math.pow(Math.sin(a / 2), 2) + Math.cos(radLat1) * Math.cos(radLat2) * Math.pow(Math.sin(b / 2), 2)));
    s = s * 6378.137;
    s = Math.round(s * 10000) / 10000;
    s = s.toFixed(2)  //保留两位小数
    return s
    
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
  store.setItem("userInfo",userInfo)
  userInfo.openid = store.getItem("openId");
  app.get(Api.login,{
    userInfo
  }).then(res =>{
    store.setItem('userId',res.userId);
    this.setData({
      userId:res.userId,
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
    var shopdata = JSON.stringify(this.data.shopdata)
    console.log(shopdata)
    wx.navigateTo({ 
      url: "/pages/shop/shop?id="+e.currentTarget.dataset.id+"&shopdata="+shopdata+"&i="+this.data.i+"&latitude="+this.data.latitude+"&longitude="+this.data.longitude,
    })
  }
})
