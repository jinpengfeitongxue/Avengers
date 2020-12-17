let len;
Page({
  data: {
    list:[],
    i:0
  },
  //显示地址列表
  onShow: function (){
    var that=this;
    wx.request({
      url:"http://49.234.225.248:6060/user",
      method:"GET",
      success:function(res){
        len=res.data.length;
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
    var that=this;
    var nowidx=e.currentTarget.dataset.id;//当前索引
    console.log(nowidx);
    console.log(len)
    for(let j=0;j<len;j++){
      // console.log(this.data.list)
      if(nowidx !== that.data.list[j].uid){
        this.setData({
          i:++this.data.i
        })
      }
    }
    var newList=this.data.list;
    newList.splice(this.data.i,1);
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
      }
    })
    this.onShow()
  },
})