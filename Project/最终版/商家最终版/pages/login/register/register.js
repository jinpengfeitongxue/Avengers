let i,max;
Page({
  data: {
    sid:'',
    sname:'',
    sshopname:'',
    stel:'',
    spic:'',
    sadd:'',
    latitude:'',
    longitude:''
  },
  onLoad: function(){
    var that=this;
    wx.request({
      url:'http://49.234.225.248:8080/store',
      method:'GET',
      success:function(res){
        i=res.data.length;
        console.log(res.data)
        that.setData({
          data:res.data
        })
        console.log(that.data.data)
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
          sadd: res.address,
          longitude: res.longitude,
          latitude: res.latitude
        })
      },
    })
  },
  //上传图片
  chooseImage: function(type){
    var that = this;
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],
      sourceType: [type],
      success: function(res) {
        console.log(res);
        that.upImgs(res.tempFilePaths[0]) //调用上传方法
        //将商店照片信息存储到本地
        // that.setData({
        //   spic: res.tempFilePaths[0],
        // })
        console.log(that.data)
        console.log(that.data.spic)    
      },
    })
    console.log(that.data.spic)
  },
  //上传服务器
  upImgs: function (imgurl) {
    console.log(imgurl);
    var that = this;
    wx.uploadFile({
      url: 'http://49.234.225.248:1111/upload',
      filePath: imgurl,
      name: 'file',
      header: {
        'content-type': 'multipart/form-data'
      },
      formData: null,
      success: function (res) {
        console.log(res.data) //接口返回网络路径
        that.setData({
          spic:'http://49.234.225.248:1111/image/'+res.data
        })
      },
      fail:function(res){
        console.log(res);
      }
    })
  },
  //注册
  register: function (e) {
    if (e.detail.value.shopname == "") {
      wx.showModal({
        title: '提示',
        content: "请填写商店的名称！"
      })
    } else if (e.detail.value.name == "") {
      wx.showModal({
        title: '提示',
        content: "请填写法人的姓名！"
      })
    } else if (e.detail.value.telephone == "") {
      wx.showModal({
        title: '提示',
        content: "请填写法人的手机号！"
      })
    } else if (!(/^1(3|4|5|7|8)\d{9}$/.test(e.detail.value.telephone))) {
      wx.showModal({
        title: '提示',
        content: "手机号格式不正确"
      })
    } else if (e.detail.value.address === "") {
      wx.showModal({
        title: '提示',
        content: "请点击按钮以获取您的位置"
      })
    } else if (e.detail.value.longitude == "") {
      wx.showModal({
        title: '提示',
        content: "请点击按钮以获取您的经度"
      })
    } else if (e.detail.value.latitude == "") {
      wx.showModal({
        title: '提示',
        content: "请点击按钮以获取您的纬度"
      })
    } else if (e.detail.value.latitude == "") {
      wx.showModal({
        title: '提示',
        content: "请点击按钮以获取您的纬度"
      })
    } else if (this.data.spic == "") {
      wx.showModal({
        title: '提示',
        content: "请上传商店的照片"
      })
    } else {
      max=this.data.data[0].sid;
      console.log(max);
      for(var j=0;j<i;j++){
        if(max<this.data.data[j].sid){
          max=this.data.data[j].sid;
        }
      }
      max=Number(max);
      console.log(max)
      //将商店信息存储到本地
      this.setData({
        sid:max+1,
        sname:e.detail.value.name,
        sshopname:e.detail.value.shopname,
        stel:e.detail.value.telephone,
      })
      //保存新地址【存入到数据库中】
      var that=this;
      wx.request({
        url:"http://49.234.225.248:8080/sadd", 
        method:'post',
        data:{
          sid:this.data.sid,
          sname:this.data.sname,
          sshopname:this.data.sshopname,
          stel:this.data.stel,
          spic:this.data.spic,
          sadd:this.data.sadd,
          latitude:this.data.latitude,
          longitude:this.data.longitude
        },
        success:function(res){
          wx.showModal({
            title: '恭喜您，已注册成功',
            content: "您的商店id为"+that.data.sid,
            success:function(res){
              if(res.confirm) {
                //点击确定按钮
                wx.navigateBack({
                  delta: 0,
                })
              } 
            }
          })
        }
      });
    }
  },
})