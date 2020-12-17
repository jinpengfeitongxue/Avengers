let i;
Page({
  data: {
    uid:'',
    uname:'',
    utel:'',
    uadd:'',
    uaddde:''
  },
  onLoad: function(){
    wx.request({
      url:'http://49.234.225.248:6060/user',
      method:'GET',
      success:function(res){
        i=res.data.length;
      }
    });
  },
  //获取位置信息
  getLocation: function(){
    var that = this;
    wx.chooseLocation({
      success: function(res) {
        console.log(res);
        //将商店地址信息存储到本地
        that.setData({
          uadd: res.address
        })
      },
    })
  },
  //保存修改地址
  saveAddr: function(e){
    if (e.detail.value.name == "") {
      wx.showModal({
        title: '提示',
        content: "请填写您的姓名！"
      })
    } else if (e.detail.value.phone == "") {
      wx.showModal({
        title: '提示',
        content: "请填写您的手机号！"
      })
    } else if (!(/^1(3|4|5|7|8)\d{9}$/.test(e.detail.value.phone))) {
      wx.showModal({
        title: '提示',
        content: "手机号格式不正确"
      })
    } else if (e.detail.value.address === "") {
      wx.showModal({
        title: '提示',
        content: "请输入您的收货地址"
      })
    } else if (e.detail.value.door_card == "") {
      wx.showModal({
        title: '提示',
        content: "请输入您的详细地址"
      })
    }
    //将地址数据存储到本地
    this.setData({
      uid:i+1,
      uname:e.detail.value.name,
      utel:e.detail.value.phone,
      uadd:e.detail.value.address,
      uaddde:e.detail.value.door_card,
    });
    //保存新地址【存入到数据库中】
    wx.request({
      url:"http://49.234.225.248:6060/uadd", 
      method:'post',
      data:{
        uid:this.data.uid,
        uname:this.data.uname,
        utel:this.data.utel,
        uadd:this.data.uadd,
        uaddde:this.data.uaddde
      },
      success:function(res){
        console.log(res);
        wx.navigateBack({
          delta: 0,
        })
      }
    });
  },
})