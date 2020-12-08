// miniprogram/pages/dd/dd.js

Page({
  /**
   * 页面的初始数据
   */
  data: {
    status:"",
    push:"0",
    res:'',
    onhead1: '1',
    onhead3: '0',
    onhead4: '0',
    time:'2020-11-18 00:00:00',  
    carts:[null],
      carts2:[null],
      carts3:[null]
  },
  hd1: function(e){
      this.setData({
        onhead1: ' 1',
        onhead2: ' 0',
        onhead3: ' 0',
        onhead4: ' 0'
      })
  },
  hd2: function(e){
    this.setData({
      onhead1: ' 0',
      onhead2: ' 1',
      onhead3: ' 0',
      onhead4: ' 0'
    })
},
hd3: function(e){
  this.setData({
    onhead1: ' 0',
    onhead2: ' 0',
    onhead3: ' 1',
    onhead4: ' 0',
    onimg:'0',
  })
},
hd4: function(e){
  this.setData({
    onhead1: ' 0',
    onhead2: ' 0',
    onhead3: ' 0',
    onhead4: ' 1'
  })
},
onewm:function(e){
  wx.setStorage({
    key:'number',
    data:this.data.carts2[e.currentTarget.dataset.index]
  })
  wx.setStorage({
    key:'index2',
    data:e.currentTarget.dataset.index
  })
  console.log(this.data.carts2[e.currentTarget.dataset.index])

  wx.navigateTo({
    url: '../dingdan/ewm/ewm',
  })
},
onewmoff:function(e){
  var self=this
  wx.request({
    url:'http://49.234.225.248:5050/usdel',
    method: 'POST',
    data:{
      usid:self.data.carts3[e.currentTarget.dataset.index].conum
    },
    success: function (res) {
      console.log(res.data); 
    },
    fail: function (res) { 
      console.log(err);
    },
    complete: function (res) { },
  });//删
  this.setData({
    ['carts3['+ e.currentTarget.dataset.index+ ']']:null
  })
},

topay:function(e){
  wx.setStorage({
    key:'paygoods',
    data:this.data.carts[e.currentTarget.dataset.index].goods
  })
  wx.setStorage({
    key:'index',
    data:e.currentTarget.dataset.index
  })
  wx.setStorage({
    key:'payprice',
    data:this.data.carts[e.currentTarget.dataset.index].price
  })
  wx.setStorage({
    data: this.data.carts[e.currentTarget.dataset.index].time,
    key: 'ctime',
  })
  wx.setStorage({
    data: this.data.carts[e.currentTarget.dataset.index].dnum,
    key: 'conum',
  })
  console.log( this.data.carts[e.currentTarget.dataset.index].dnum,)
  wx.setStorage({
    data: this.data.carts[e.currentTarget.dataset.index].thm,
    key: 'cthm',
  })
  wx.navigateTo({
    url: '../dingdan/dpay/dpay',
  })
},
toddxq1:function(e){
  var self=this
  console.log(666);
  wx.setStorage({
    key:'goods',
    data:this.data.carts[e.currentTarget.dataset.index].goods
  })
  console.log(this.data.carts[e.currentTarget.dataset.index].goods);
  wx.setStorage({
    key:'price',
    data:this.data.carts[e.currentTarget.dataset.index].price
  })
  wx.navigateTo({
    url: '../dingdan/ddxq/ddxq',
  })
},
toddxq2:function(e){
  var self=this
    wx.setStorage({
      key:'goods',
      data:this.data.carts2[e.currentTarget.dataset.index].goods
    })
    console.log(this.data.carts2[e.currentTarget.dataset.index].goods);
    wx.setStorage({
      key:'price',
      data:this.data.carts2[e.currentTarget.dataset.index].price
    })
    wx.navigateTo({
      url: '../dingdan/ddxq/ddxq',
    })
},
toddxq3:function(e){
    wx.setStorage({
      key:'goods',
      data:this.data.carts3[e.currentTarget.dataset.index].goods
    })
    console.log(this.data.carts3[e.currentTarget.dataset.index].goods);
    wx.setStorage({
      key:'price',
      data:this.data.carts3[e.currentTarget.dataset.index].price
    })
    wx.navigateTo({
      url: '../dingdan/ddxq/ddxq',
    })
},
// gdd1:function(e){
//   var self=this;
//   var prices=0;
//   if(this.data.status==1){
//     var index1=self.data.carts.length-1;
//     wx.getStorage({
//       key: 'message',
//       success: function (res) {
//          console.log(res.data);
//          for(var i=0;i<res.data.length;i++){
//            prices+=res.data[i].num*res.data[i].price
//          }
//           self.setData({
//             ['carts['+ index1+ '].goods']: res.data,
//             ['carts['+ index1+ '].price']:prices
//           })
//           console.log(prices)
//           console.log(index1);
//       }
//   })
//   wx.getStorage({
//     key: 'thm',
//     success:function(res){
//       console.log(res.data);
//       self.setData({
//         ['carts['+ index1+ '].time']: res.data.time,
//         ['carts['+ index1+ '].dnum']:res.data.ordernum,
//         ['carts['+ index1+ '].thm']:res.data.thm,
//       })
//       console.log(self.data.carts);
//     }
//   })
//   if(self.data.carts.length>index1){
//     index1++;
//   }
// }  
//   wx.removeStorage({
//     key: 'message',
//     success: function(res) {
//     },
//   })
//   wx.removeStorage({
//     key: 'thm',
//     success: function(res) {
//     },
//   })

// },
// gdd2:function(e){
//   var self=this;
//   var prices=0;
//   if(this.data.status==2){
//     var index2=self.data.carts2.length-1;
//     wx.getStorage({
//       key: 'message',
//       success: function (res) {
//          console.log(res.data);
//          for(var i=0;i<res.data.length;i++){
//            prices+=res.data[i].num*res.data[i].price
//          }
//           self.setData({
//             ['carts2['+ index2+ '].cout']:'1',
//             ['carts2['+ index2+ '].goods']: res.data,
//             ['carts2['+ index2+ '].price']:prices
//           })
//           console.log(prices)
//           console.log(index2);
//       }
//   })
//   wx.getStorage({
//     key: 'thm',
//     success:function(res){
//       console.log(res.data);
//       self.setData({
//         ['carts2['+ index2+ '].time']: res.data.time,
//         ['carts2['+ index2+ '].dnum']:res.data.ordernum,
//         ['carts2['+ index2+ '].thm']:res.data.thm,
//       })
//       console.log(self.data.carts2);
  
//     }
//   })
  
//   if(self.data.carts2.length!=index2){
//     index2++;
//   }
//     wx.removeStorage({
//     key: 'message',
//     success: function(res) {
//     },
//   })
//   wx.removeStorage({
//     key: 'thm',
//     success: function(res) {
//     },
//   })

//   }
  

// },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log("刷新");

    // wx.request({
    //   url:'http://49.234.225.248:5050/usadd  ',
    //   data: {
    //     usid: "0003",
    //     ustate: 6,
    //     ustime: "202011271718"
    //   },
    //   method: 'POST',
    //   success: function (res) {
    //     console.log(res.data); 
    //   },
    //   fail: function (res) { 
    //     console.log(err);
    //   },
    //   complete: function (res) { },
    // });//增
    // wx.request({
    //   url:'http://49.234.225.248:5050/list ',
    //   method: 'GET',
    //   success: function (res) {
    //     console.log(res.data); 
    //   },
    //   fail: function (res) { 
    //     console.log(err);
    //   },
    //   complete: function (res) { },
    // });//查
    // wx.request({
    //   url:'http://49.234.225.248:5050/usdel',
    //   method: 'POST',
    //   data:{
    //     usid:"0002"
    //   },
    //   success: function (res) {
    //     console.log(res.data); 
    //   },
    //   fail: function (res) { 
    //     console.log(err);
    //   },
    //   complete: function (res) { },
    // });//删
    // wx.request({
    //   url:'http://49.234.225.248:5050/uscha ',
    //   method: 'POST',
    //   data:{
    //     ustate:6,
    //     usid:"0001"
    //   },
    //   success: function (res) {
    //     console.log(res.data); 
    //   },
    //   fail: function (res) { 
    //     console.log(err);
    //   },
    //   complete: function (res) { },
    // });//改
    wx.request({
      url:'http://49.234.225.248:5050/list ',
      method: 'GET',
      success: function (res) {
        console.log(res.data); 
      },
      fail: function (res) { 
        console.log(err);
      },
      complete: function (res) { },
    });//查
  
 
    // 再通过setData更改Page()里面的data，动态更新页面的数据



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
    var self=this;
    wx.getStorage({
      key: 'statu',
      success:function(res){
     
        self.setData({
          status:res.data
        })
        if(res.data==1){
        self.setData({
          onhead1:1,
          onhead3:0
        })
      }
     if(res.data==2){
        self.setData({
          onhead1:0,
          onhead3:1
        })
      }
      }
    })
    var self=this;
    var prices=0;
      var index1=self.data.carts.length-1;
      wx.getStorage({
        key: 'message',
        success: function (res) {
           console.log(res.data);
           for(var i=0;i<res.data.length;i++){
             prices+=res.data[i].num*res.data[i].price
           }
            self.setData({
              ['carts['+ index1+ '].goods']: res.data,
              ['carts['+ index1+ '].price']:prices
            })
            console.log(index1);
        }
    })
    wx.getStorage({
      key: 'thm',
      success:function(res){
        console.log(res.data);
        self.setData({
          ['carts['+ index1+ '].time']: res.data.time,
          ['carts['+ index1+ '].dnum']:res.data.ordernum,
          ['carts['+ index1+ '].thm']:res.data.thm,
        })
        console.log(self.data.carts);
      }
    })
    if(self.data.carts.length!=index1){
      index1++;
    }
  wx.removeStorage({
    key: 'message',
    success: function(res) {
    },
  })
  wx.removeStorage({
    key: 'thm',
    success: function(res) {
    },
  })

    wx.getStorage({
      key: 'bindex',
      success:function(res){
        console.log(res.data);
        self.setData({
          ['carts['+ res.data+ ']']:null,
        })
        index1--;
       }
    })
    var index2=self.data.carts2.length;
    wx.getStorage({
      key: 'change',
      success:function(res){
        console.log(res.data)
        self.setData({
          ['carts2['+ index2+ ']']:res.data,
        })
        console.log(self.data.carts2);
      }
    })
    wx.removeStorage({
      key: 'change',
      success: function(res) {
      },
    })

    wx.getStorage({
      key: 'bindex2',
      success:function(res){
        console.log(res.data);
        self.setData({
          ['carts2['+ res.data+ ']']:null,
        })
        index2--;
       }
    })
    var index3=self.data.carts3.length;
    wx.getStorage({
      key: 'change2',
      success:function(res){
        console.log(res.data)
        self.setData({
          ['carts3['+ index3+ ']']:res.data,
        })
        console.log(self.data.carts3);
      }
    })
    wx.removeStorage({
      key: 'change2',
      success: function(res) {
      },
    })
    
//     var self=this;
//   var prices=0;
//   if(this.data.status==1){
//     var index1=self.data.carts.length;
//     wx.getStorage({
//       key: 'message',
//       success: function (res) {
//          console.log(res.data);
//          for(var i=0;i<res.data.length;i++){
//            prices+=res.data[i].num*res.data[i].price
//          }
//           self.setData({
//             ['carts['+ index1+ '].goods']: res.data,
//             ['carts['+ index1+ '].price']:prices
//           })
//           console.log(prices)
//           console.log(index1);
//       }
//   })
//   wx.getStorage({
//     key: 'thm',
//     success:function(res){
//       console.log(res.data);
//       self.setData({
//         ['carts['+ index1+ '].time']: res.data.time,
//         ['carts['+ index1+ '].dnum']:res.data.ordernum,
//         ['carts['+ index1+ '].thm']:res.data.thm,
//       })
//       console.log(self.data.carts);
//     }
//   })

// }  
// if(this.data.status==2){
//   var index2=self.data.carts2.length;
//   wx.getStorage({
//     key: 'message',
//     success: function (res) {
//        console.log(res.data);
//        for(var i=0;i<res.data.length;i++){
//          prices+=res.data[i].num*res.data[i].price
//        }
//         self.setData({
//           ['carts2['+ index2+ '].goods']: res.data,
//           ['carts2['+ index2+ '].price']:prices
//         })
//         console.log(prices)
//         console.log(index2);
//     }
// })
// wx.getStorage({
//   key: 'thm',
//   success:function(res){
//     console.log(res.data);
//     self.setData({
//       ['carts2['+ index2+ '].time']: res.data.time,
//       ['carts2['+ index2+ '].dnum']:res.data.ordernum,
//       ['carts2['+ index2+ '].thm']:res.data.thm,
//     })
//     console.log(self.data.carts2);

//   }
// })


// }

//   wx.request({
//     url:'http://49.234.225.248:5050/list ',
//     method: 'GET',
//     success: function (res) {
//       console.log(res.data); 
//     },
//     fail: function (res) { 
//       console.log(err);
//     },
//     complete: function (res) { },
//   });//查



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