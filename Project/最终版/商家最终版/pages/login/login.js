let len,idx,tlen;
Page({
  data: {
    list:[],
    tlist:[],
    i:-1,
    state:-1
  },
  onShow: function(){
    var that=this;
    wx.request({
      url:"http://49.234.225.248:8080/store",
      method:"GET",
      success:function(res){
        console.log(res)
        //获取数组长度及数据库中的商店信息
        len=res.data.length;
        that.setData({
          list:res.data
        })
      }
    })
  },
  //登录
  Login: function(e){
    // console.log(len);
    var that=this;
    idx = e.detail.value.shopId;
    this.setData({
      i:0
    })
    for(let j=0;j<len;j++){
      // console.log(this.data.list)
      if(idx !== that.data.list[j].sid){
        this.setData({
          i:++this.data.i
        })
      }else{
        wx.showModal({
          title: '恭喜',
          content: "登录成功",
          success:function(res){
            if(res.confirm) {
              //点击确定按钮
              getApp().i=that.data.i
              getApp().shopId=idx
              wx.switchTab({
                // url: '/pages/shop-info/shop-info',
                url: '/pages/login/login',
              })
            }
          }
        })
        break;
      }
      console.log(this.data.i);
      if(j==len-1){
        wx.showModal({
          title: '提示',
          content: "没有您的id号，请点击下方注册",
        })
      }
    }
  },
  //注册
  shopRegister: function(){
    wx.navigateTo({
      url: '/pages/login/register/register',
    })
  },
  //删除商店
  delShop:function(e){
    var shopid=this.data.list[this.data.i].sid;//当前索引
    var newList=this.data.list;
    newList.splice(this.data.i,1);
    this.setData({
      list:newList
    })
    
    wx.request({
      url: 'http://49.234.225.248:8080/sdel',
      method: "post",
      data:{
        sid:shopid
      },
    })
    this.setData({
      i:-1
    })
  },
  //查看留言
  viewMessage:function(e){
    wx.navigateTo({
      url: '/pages/message/message',
    })
  },
  //退出登录
  outShop:function(e){
    getApp().shopId = '';
    var that=this;
    wx.showModal({
      title: '提示',
      content: "退出成功",
      success:function(res){
        if(res.confirm) {
          //点击确定按钮
          that.setData({
            i:-1,
            state:-1
          })
        }
      }
    })
  }
})