// pages/shop/shop.js
const app = getApp()


Page({

  /**
   * 页面的初始数据
   */
  data: {
    // shopdata:[],
    goodlist:[],
    loading:true,
    i:0,
    idx:1,
    sid:0,
    latitude:'',
    longitude:'',
  
    showView:true,
  

    //微信小程序动画
    animationData: {},
    animationisno: false,
    guilist: {},
    arrId: [],
    arrName: [],
    textStates: ["view-btns-text-normal", "view-btns-text-select"],
    num:1,
    
  },
  totip:function(){
    wx.navigateTo({
      url: '../shop/tip/tip',
    })

  },
  close: function () {
    let that = this;
    that.setData({
      showView: (!that.data.showView)
    })
  },
  share: function (e) {
    let idx = e.currentTarget.dataset.id;
    console.log(idx);
    this.setData({
      showView: false
    })
    this.setData({
      i:0
    })
    for(let j=0;j<this.data.goodlist.length;j++){
      if(idx!=this.data.goodlist[j].gid){
        this.setData({
          i:++this.data.i
        })
      }
      else{
        console.log(this.data.i);
        break
      }
    }
  }, 
  
 

  /**
   * 生命周期函数--监听页面加载
   */
  
  onLoad: function (options) {
    this.setData({
      latitude:options.latitude,
      longitude:options.longitude
    })
    this.loadDetail(options.id); // 拿到列表页传过来的 id
    console.log(options.id)
    wx.setStorage({
      data: options.id,
      key: 'sid',
    })
    var data = options.shopdata
    this.setData({
      shopdata:data,
      i:options.i
    })
  
    
   
    let that = this;
    let guilists = that.data.guilist;
    that.setData({
      goodsList: that.data.goodlist,
    })
    
  },
  loadDetail (sid) {
    wx.showLoading({
        title: '详情加载中...',
    })

    wx.request({
        url: 'http://49.234.225.248:7070/good',
        success: (res) => {
            let thisPlace = res.data.filter((val) => val.gsid == sid)
            console.log(thisPlace)
            this.setData({ 
                goodlist: thisPlace,
                loading:false
            });
            // console.log(this.data.goodlist)
            wx.hideLoading();
        }
    })
    wx.request({
      url: 'http://49.234.225.248:8080/store',
      success: (res) => {
          let thisPlaceShop = res.data.filter((val) => val.sid == sid)
          console.log(thisPlaceShop)
          this.setData({ 
              shopdata: thisPlaceShop,
              loading:false
          });
          console.log(this.data.shopdata)
          wx.hideLoading();
      }
  })
},
  addCartClick() {
    let that = this;
    let image = that.data.goodlist[that.data.i].gimgsrc;
    let title = that.data.goodlist[that.data.i].gtitle;
    let price = that.data.goodlist[that.data.i].gprice;
    let gId = that.data.goodlist[that.data.i].gid;
    let unit = that.data.goodlist[that.data.i].gunit;
    let num = that.data.num;
    let goodsObj = {
      image,
      title,
      price,
      gId,
      num,
      unit,
      gstatus: true
    };
    // 获取判断缓存里面有没有CartGoods数据
    wx.getStorage({
      key: 'CartGoods',
      success: function (res) {
        let list = res.data;
        // 使用findIndex寻找是否存在
        let index = list.findIndex(val => val.gId == gId);
        if (index == -1) {
          list.push(goodsObj);
          wx.setStorage({
            data: list,
            key: 'CartGoods',
            success: function () {
              wx.showToast({
                title: '加入成功',
              })
            }
          })
        } else {
          // 循环发现相同商品num++
          list.forEach((val) => {
            if (val.gId == gId) {
              val.num += num;
            }
          })
          // 里面有这个商品num++
          wx.setStorage({
            data: list,
            key: 'CartGoods',
            success: function () {
              wx.showToast({
                title: '加入成功',
              })
            }
          })
        }
      },
      fail: function (err) {
        let list = [];
        list.push(goodsObj);
        wx.setStorage({
          data: list,
          key: 'CartGoods',
          success: function () {
            wx.showToast({
              title: '加入成功',
            })
          }
        })
      }
    })
  },  
  
  /* 点击减号 */
  bindMinus: function () {
    var num = this.data.num;
    // 如果大于1时，才可以减  
    if (num > 1) {
      num--;
    }
    // 只有大于一件的时候，才能normal状态，否则disable状态  
    var minusStatus = num <= 1 ? 'disabled' : 'normal';
    // 将数值与状态写回  
    this.setData({
      num: num,
      minusStatus: minusStatus
    });
  },
  /* 点击加号 */
  bindPlus: function () {
    var num = this.data.num;
    // 不作过多考虑自增1  
    if(num<=this.data.goodlist[this.data.i].gresidue-1) {
      num++;
    }
    // 只有大于一件的时候，才能normal状态，否则disable状态  
    var minusStatus = num < 1 ? 'disabled' : 'normal';
    // 将数值与状态写回  
    this.setData({
      num: num,
      minusStatus: minusStatus
    });
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
    this.setData({
      inpvalue:s
    })
  },
  firstLink(){
    
    wx.navigateTo({
      url: '/pages/notice/detail',
    })
  },
  firstclick(){
  
   
    wx.navigateTo({
      url: '/pages/shopdetail/shopdetail?i='+this.data.i,
    })
  },
  
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function (options) {
    // wx.getLocation({
    //   type:'gcj02',
    //   success:(res)=>{
    //     console.log("当前位置：",res)
    //     const inpvalue=this.getDistance(res.latitude,res.longitude,this.data.shopdata[0].latitude,this.data.shopdata[0].longitude);
    //   }
    // })
    const inpvalue=this.getDistance(this.data.latitude,this.data.longitude,this.data.shopdata[0].latitude,this.data.shopdata[0].longitude);
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    
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
