Page({
  data: {
    list:[]
  },
  //显示地址列表
  onShow: function (){
    var that=this;
    wx.request({
      url:"http://49.234.225.248:6060/user",
      method:"GET",
      success:function(res){
        that.setData({
          list:res.data
        })
      }
    })
  },
  //增加地址
  addAddr: function () {
    wx.navigateTo({
      url: '/pages/wode/address/add-address/add-address'
    })
  },
  //删除地址
  delAddr:function(e){
    var nowidx=e.currentTarget.dataset.id;//当前索引
    var newList=this.data.list;
    newList.splice(nowidx-1,1);
    this.setData({
      list:newList
    })
    wx.request({
      url: 'http://49.234.225.248:6060/udel',
      method: "post",
      data:{
        uid:nowidx
      },
      success:function(res){
        console.log(res);
        wx.navigateBack({
          delta: 0,
        })
      }
    })
  },
})