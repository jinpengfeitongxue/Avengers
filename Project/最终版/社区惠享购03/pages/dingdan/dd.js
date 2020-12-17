// miniprogram/pages/dd/dd.js
var util = require('../../time.js')
Page({
  /**
   * 页面的初始数据
   */
  data: {
    lastTime: '', //剩余时间
    endTimeText:'已结束',//结束文字
    status:"",
    push:"0",
    res:'',
    del:0,
    onhead1: '1',
    onhead3: '0',
    onhead4: '0',
    time:'2020-11-18 00:00:00',  
    carts:[],
    cc:[],
    dgs:[],
    kk:[],
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
    key:'thm',
    data:this.data.carts[e.currentTarget.dataset.index]
  })
  wx.navigateTo({
    url: '../dingdan/ewm/ewm',
  })
  
},
onewmoff:async function(e){
 var self=this
  wx.setStorage({
    key:'thm2',
    data:this.data.carts[e.currentTarget.dataset.index]
  })
  wx.navigateTo({
    url: '../dingdan/ewm2/ewm2',
  })

},
topay:function(e){
  //console.log(this.data.carts[e.currentTarget.dataset.index])
  wx.setStorage({
    key:'paygoods',
    data:this.data.carts[e.currentTarget.dataset.index]
  })
  wx.navigateTo({
    url: '../dingdan/dpay/dpay',
  })
},
toddxq1:function(e){
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

// },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var self=this
    //console.log("刷新");
    wx.request({
      url: 'http://49.234.225.248:7070/good',
      method:'GET',
      success:function(res){
        //console.log(res.data);
         self.setData({
           dgs: res.data
         })
         //console.log(self.data.dgs);
      }
    })
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
  onShow: async function () {
    var self=this;
    let gg = await this.dd()
    self.setData({
      cc:gg
          })
      //console.log(self.data.cc)
  for(var kk=0;kk<self.data.carts.length;kk++){
    if(self.data.carts[kk].state!=1){
    self.setData({
      ['carts['+kk+'].lastTime']: 1,
    })
  }
  }
  for(var dd=0;dd<self.data.cc.length;dd++){
    if(self.data.cc[dd].dstate==4){
      wx.request({
        url:'http://49.234.225.248:4399/deldet',
        method: 'POST',
        data:{
          usid:self.data.cc[dd].usid
        },
        success: function (res) {
          //console.log(res.data); 
        },
        fail: function (res) { 
          //console.log(err);
        },
        complete: function (res) { },
      });//删
    }
  }
    var k=0;
    var x=0;
    for(var i=0;i<self.data.cc.length;i++){
      for(var j=0;j<self.data.dgs.length;j++){
          if(self.data.cc[i].gid==self.data.dgs[j].gid){
          self.setData({
            ['kk['+ x+ '].uid']:self.data.cc[i].usid,
            ['kk['+ x+ '].state']:self.data.cc[i].dstate,
            ['kk['+ x+ '].thm']:self.data.cc[i].dma,
            ['kk['+ x+ '].num']:self.data.cc[i].dsum,
            ['kk['+ x+ '].time']:self.data.cc[i].dtime,
            ['kk['+ x+ '].gid']:self.data.dgs[j].gid,
            ['kk['+ x+ '].image']:self.data.dgs[j].gimgsrc,
            ['kk['+ x+ '].price']:self.data.dgs[j].gprice,
            ['kk['+ x+ '].title']:self.data.dgs[j].gtitle,
            ['kk['+ x+ '].unit']:self.data.dgs[j].gunit,
            ['kk['+ x+ '].gresidue']:self.data.dgs[j].gresidue
          })
          x++;
        } 
      }
    }
    //console.log(self.data.kk);
var t=0;
//console.log(self.data.carts)
for(var p=0;p<self.data.kk.length;++p){
   if(p==0){
     console.log(k);
    self.setData({
      ['carts['+ k+ '].uid']:self.data.kk[p].uid,
      ['carts['+ k+ '].state']:self.data.kk[p].state,
      ['carts['+ k+ '].thm']:self.data.kk[p].thm,
      ['carts['+ k+ '].time']:self.data.kk[p].time,
      ['carts['+ k+ '].goods['+t+'].gid']:self.data.kk[p].gid,
      ['carts['+ k+ '].goods['+t+'].num']:self.data.kk[p].num,
      ['carts['+ k+ '].goods['+t+'].image']:self.data.kk[p].image,
      ['carts['+ k+ '].goods['+t+'].price']:self.data.kk[p].price,
      ['carts['+ k+ '].goods['+t+'].title']:self.data.kk[p].title,
      ['carts['+ k+ '].goods['+t+'].unit']:self.data.kk[p].unit,
      ['carts['+ k+ '].goods['+t+'].gresidue']:self.data.kk[p].gresidue
    })
    //console.log(self.data.carts);
    t++;
  }
  if(p!=0){
      if(self.data.kk[p].uid!=self.data.kk[p-1].uid){
        k++;
        t=0;
        self.setData({
          ['carts['+ k+ '].uid']:self.data.kk[p].uid,
          ['carts['+ k+ '].state']:self.data.kk[p].state,
          ['carts['+ k+ '].thm']:self.data.kk[p].thm,
          ['carts['+ k+ '].time']:self.data.kk[p].time,
          ['carts['+ k+ '].goods['+t+'].gid']:self.data.kk[p].gid,
          ['carts['+ k+ '].goods['+t+'].num']:self.data.kk[p].num,
          ['carts['+ k+ '].goods['+t+'].image']:self.data.kk[p].image,
          ['carts['+ k+ '].goods['+t+'].price']:self.data.kk[p].price,
          ['carts['+ k+ '].goods['+t+'].title']:self.data.kk[p].title,
          ['carts['+ k+ '].goods['+t+'].unit']:self.data.kk[p].unit,
          ['carts['+ k+ '].goods['+t+'].gresidue']:self.data.kk[p].gresidue
        })
        t++;
      }
      if(self.data.kk[p].uid==self.data.kk[p-1].uid){
        self.setData({
          ['carts['+ k+ '].goods['+t+'].gid']:self.data.kk[p].gid,
          ['carts['+ k+ '].goods['+t+'].num']:self.data.kk[p].num,
          ['carts['+ k+ '].goods['+t+'].image']:self.data.kk[p].image,
          ['carts['+ k+ '].goods['+t+'].price']:self.data.kk[p].price,
          ['carts['+ k+ '].goods['+t+'].title']:self.data.kk[p].title,
          ['carts['+ k+ '].goods['+t+'].unit']:self.data.kk[p].unit,
          ['carts['+ k+ '].goods['+t+'].gresidue']:self.data.kk[p].gresidue
        })
        t++;
      }
    }
}
for(var m=0;m<self.data.carts.length;m++){
  var prices=0;
  for(var mm=0;mm<self.data.carts[m].goods.length;mm++){
    prices+=self.data.carts[m].goods[mm].num*self.data.carts[m].goods[mm].price
  }
  self.setData({
      ['carts['+ m+ '].price'] : prices
}) 
}
//console.log(self.data.carts)
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

  },
  dd :async function(){
    var self=this;
    return await new Promise((rv,rj)=>{
    wx.request({
      url:'http://49.234.225.248:4399/detail',
      method: 'GET',
      success: function (res) {
        rv(res.data)
      },
      fail: function (res) { 
        rj(err)
      },
      complete: function (res) { },
    });//查
  })
  },

})