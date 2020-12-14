// pagesarcharch.js
Page({
  data: {
    searchValue: '',
    shopdata:[],
    click:'',
  },
  onLoad: function () {

  },
  gotoShop:function(e){
    console.log(e.currentTarget.dataset.id);
    wx.navigateTo({
      url: "../../shop/shop?id="+e.currentTarget.dataset.id,
    })
  },
  confirm:function(e){
    var that = this;
    this.setData({
      click:'true'
    })
    wx.request({
      url: 'http://49.234.225.248:7070/search/' + encodeURI(this.data.searchValue),
      method: 'post',
      header: {
        'content-type': 'content-type:text/plain'
      },
      success:(res)=>{
        this.setData({
          shopdata:res.data
        })
      },
      fail: function (e) {
        console.log(e.massage);
      },
    });
  },
  searchValueInput: function (e) {
    var value = e.detail.value;
    this.setData({
      searchValue: value,
    });
  },
  suo:function(e){
    var that = this;
    this.setData({
      click:'true'
    })
    wx.request({
      url: 'http://49.234.225.248:7070/search/' + encodeURI(this.data.searchValue),
      method: 'post',
      header: {
        'content-type': 'content-type:text/plain'
      },
      success:(res)=>{
        this.setData({
          shopdata:res.data
        })
      },
      fail: function (e) {
        console.log(e.massage);
      },
    });
  }
});
