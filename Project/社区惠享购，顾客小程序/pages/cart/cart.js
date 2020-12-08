// pages/cart/cart.js
var util = require('../../time.js')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    CartDataList: [],
    onShow: false,
    selectAll:false,
    sum:0,
  },
  orderList:[
    {
      time:'2020/11/28 15:01:47',
      ordernum:'0001',
      sum1:'100',
      state:0,
      thm:'x5x6'
    }
  ],  
  message:[
    {
      gId: 1,
      gstatus: true,
      image: "",
      num: 1,
      price: "",
      title: "",
      unit: "",
      gsid:""
    }
  ],
  // 点击删除触发的父函数
  delClick() {
    this.getCartData();
  },

  //点击去逛逛
  goShooping(){
    wx.switchTab({
      url: '../index/index',
    })
  },
  // 点击选择
  async selectClick(e) {
    let that = this;
    let res = await this.getCartStroage();
    // 获取子组件传递的id
    let id = e.detail;
    let list = res.data;
    // 获取商品使用id判断是哪一个变为 反
    list.forEach(val => {
      if (val.gId == id) {
        val.gstatus = !val.gstatus
      }
    });
    // 修改完选择状态就把数据修改掉
    wx.setStorage({
      data: list,
      key: 'CartGoods',
      success() {
        // 使用some查找是否存在为false未被选中(返回true表示有false则不全选，反知，全选)
        let isAllSelect = list.some((val) => {
          return val.gstatus == false
        });
        that.getSum();
        if(!isAllSelect){
          that.setData({
            selectAll:true
          })
        }else{
          that.setData({
            selectAll:false
          })
        }
      }
    })
    
  },
  // 点击全选
  async AllBtnClick(){
    //  获取修改
    let that = this;
    let res = await this.getCartStroage();
    let list = res.data
    if(list.length==0){
      that.setData({
        selectAll:false
      })
      return
    }
    that.setData({
      selectAll:!that.data.selectAll
    })
    // 循环修改选中状态
    list.forEach(val => {
      val.gstatus = that.data.selectAll;
    });
    wx.setStorage({
      data: list,
      key: 'CartGoods',
      success(){
        // 修改成功刷新数据
        that.getCartData()
      }
    })
    
  },
  // 查看是否全选
  checkSelectAll(){
    let checked =  this.data.CartDataList.some((val)=>{
      return val.gstatus == false;
    });
    this.setData({
      selectAll: !checked
    })
  },
  //封装获取的方法
  getCartStroage() {
    return wx.getStorage({
      key: 'CartGoods',
    })
  },
  // 获取存在storage里的购物车数据
  async getCartData() {
    let that = this;
    that.getCartStroage().then(res => {
      that.setData({
        CartDataList: res.data,
        onShow: true,
      });
      // 调用check全选检查
      that.checkSelectAll();
      // 修改总和
      that.getSum();
      if (res.data.length == 0) {
        that.setData({
          onShow: false
        });
      }
    }).catch(err => {
      that.setData({
        onShow: false
      })

    });
  },
  // 计算总和
  async getSum(){
    let that = this;
    let nowsum = 0;
    let list =  await this.getCartStroage();
    let listall = list.data.filter(val => val.gstatus);
    listall.forEach(val => {
      nowsum = nowsum + (val.price*val.num); 
    });
    that.setData({
      sum:nowsum
    });
  },
  // 点击结算
  //首先产生随机提货码
  random:function(){
    var char1 = ['0','1','2','3','4','5','6','7','8','9']; 
    var char2=['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'];
    var res ='';
    for(var i = 0; i <4; i++){
      var id = Math.ceil(Math.random()*9);
      res += char1[id];
      }
    res+="-"
    for(var j=0;j<4;j++){
      var id = Math.ceil(Math.random()*25);
      res += char2[id];
    }
    return res;
  },//提货码应该在状态码变成一（就是支付已经完成）的时候产生
  add:function(){
    let time0 = util.formatTime(new Date());//时间戳
    let thm0 = this.random();//提货码
    let id = time0+'/'+thm0;
    //console.log(id.slice(id.length-21,id.length-1))
    this.orderList[0].time=''+time0;
    this.orderList[0].ordernum=id.slice(id.length-21,id.length-1);
    this.orderList[0].state=1;
    this.orderList[0].thm=thm0;
    this.orderList[0].sum1 = ''+this.data.sum;
    console.log(this.orderList[0]);
    wx.setStorage({
      data: this.orderList[0],
      key: 'thm',
    })
  },
  //调用上面的函数
  async toBuyClick(){
    this.add();
    console.log(this.orderList);
    let list =  await this.getCartStroage();
    let listall = list.data.filter(val => val.gstatus);//这才是真正要结算的商品列表
    console.log(listall);
    this.message=listall;
    console.log(this.message);
    wx.setStorage({
      key:'message',
      data:this.message
    })

    
    wx.request({
      url:'http://49.234.225.248:5050/usadd  ',
      data: {
        usid: this.orderList[0].ordernum,
        ustate: this.orderList[0].state,
        ustime: this.orderList[0].time,
        uma:this.orderList[0].thm,
        uprice:this.orderList[0].sum1
      },
      method: 'POST',
      success: function (res) {
        console.log(res.data); 
      },
      fail: function (res) { 
        console.log(err);
      },
      complete: function (res) { },
    });//增
    if(this.message.length!=0){
      wx.showModal({
        title: '是否付款',
        // icon:'none'
        success:(res)=>{
          if(res.confirm){
            wx.switchTab({
              url: '/pages/dingdan/dd',
            })

          }
          else if(res.cancel){
            wx.switchTab({
              url: '/pages/dingdan/dd',
            })


          }
        }
      })  
    }
    else {
      wx.showToast({
        title: '暂时不能购买哦',
        icon:'none'
      })
    }  
   
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getCartData();
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
    this.getCartData();
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