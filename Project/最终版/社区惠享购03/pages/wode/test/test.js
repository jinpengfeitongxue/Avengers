// pages/test/test.js
var time = require('./time.js');
let store = require("../../../utils/store.js");
Page({
  /**
   * 页面的初始数据
   */
  data: {
    userInfo:'',
    shtext:'',
    id:'',
    detail: [], //详情图片
    detailNew: [],
    detailAll: [],
    checkUp: true, //判断从编辑页面进来是否需要上传图片
    check: false,
    chooseViewShowDetail: true,
    dis: false,
    params:{}
  },
 
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let userInfo = store.getItem("userInfo")
    this.setData({
      userInfo:userInfo
    })
  },
  textBlur(e) {
    this.setData({
      shtext: e.detail.value
    })
  },
  formSubmit(e) {
    let that = this
    if (e.detail.value.shtext === "") {
      wx.showToast({
        title: '新鲜事不能为空',
        icon: "none",
        duration: 1000,
        mask: true,
      })
    } else {
      let params = {
        gsid:getApp().shopId,
      }
      wx.showModal({
        title: '提示',
        content: '确认上传该内容',
        success(res) {
          if (res.confirm) {
            that.sureRelease(params); //确定
          } else if (res.cancel) {
            wx.showToast({
              title: '继续编辑',
              icon: "none",
              duration: 2000,
              mask: true,
            })
          }
          that.setData({
            dis: true,
          })
        }
      })
    }
  },
  /**确认发布 */
  sureRelease(params) {
    let that = this
    let item=[]
    let sum = 0;
    for (var j = 0; j < that.data.detail.length; j++) {
      if (that.data.detail.length === j + 1) {
        that.data.check = true
      }
      wx.uploadFile({
        url: 'http://49.234.225.248:1111/upload',
        filePath: that.data.detail[j],
        name: 'file',
        success: function (res) {
          sum++
          let imgdata = res.data;
          that.setData({
            id:new Date().getTime()
          })
          item.push(imgdata);
          if(sum==that.data.detail.length){
            wx.request({
              url: 'http://49.234.225.248:3333/iadd',
              method:'POST',
              data:{
                imgid:that.data.id,
                pic1:`http://49.234.225.248:1111/image/${item[0]}`,
                pic2:`http://49.234.225.248:1111/image/${item[1]}`,
                pic3:`http://49.234.225.248:1111/image/${item[2]}`,
              },
              success:(res)=>{
                console.log(res.data)
              }
            })
          }
        },
      })
    }
    
    setTimeout(function(){
      let times=time.formatTime(new Date())
      wx.request({
        url: 'http://49.234.225.248:2222/shadd',
        method:'POST',
        data:{
          shid:new Date().getTime(),
          shname:that.data.userInfo.nickName,
          shimg:that.data.userInfo.avatarUrl,
          shtext:that.data.shtext,
          imgid:that.data.id,
          stime:times
        },
        success:()=>{
          wx.showToast({
            title: '上传成功',
            icon: "none",
            duration: 2000,
            mask: true,
            success() {
              setTimeout(function () {
                wx.navigateBack({
                  delta: 0,
                })
              }, 1000);
            }
          })
        }
      })
    },1000)
  },
  /**判断详情新旧数组是否有相同值 */
  checkDetail() {
    let detail = this.data.detail
    let detailNew = this.data.detailNew
    let detailAll = this.data.detailAll
    for (var i = 0; i < detail.length; i++) {
      for (var j = 0; j < detailNew.length; j++) {
        if (detail[i] === detailNew[j]) {
          detailAll = detailAll.concat(detail[i])
          this.setData({
            detailAll: detailAll
          })
        } else {
          console.log("detail无相同")
        }
      }
    }
  },
  //添加上传图片
  chooseImageTap: function () {
    var that = this;
    wx.showActionSheet({
      itemList: ['从相册中选择', '拍照'],
      itemColor: "#00000",
      success: function (res) {
        if (!res.cancel) {
          if (res.tapIndex == 0) {
            that.chooseDetail('album')
          } else if (res.tapIndex == 1) {
            that.chooseDetail('camera')
          }
        }
      }
    })
  },
  /** 选择图片detail */
  chooseDetail: function (type) {
    wx.showLoading({
      title: '正在打开',
      mask: 'true'
    })
    var that = this;
    if (that.data.detail.length < 3) {
      wx.chooseImage({
        count: 3,
        sizeType: ['compressed'],
        sourceType: [type],
        success: function (res) {
          console.log(type)
          wx.hideLoading();
          // detail中包含的可能还有编辑页面下回显的图片，detailNew中包含的只有所选择的图片
          let detail = that.data.detail;
          detail = detail.concat(res.tempFilePaths);
          let detailNew = that.data.detailNew
          detailNew = detailNew.concat(res.tempFilePaths)
          that.setData({
            detail: detail,
            detailNew: detailNew,
            checkUp: false
          })
          that.chooseViewShowDetail();
        },
        complete: function () {
          wx.hideLoading()
        }
      })
    } else {
      wx.showToast({
        title: '限制选择3个文件',
        icon: 'none',
        duration: 1000
      })
    }
  },
  /** 删除图片detail */
  deleteImvDetail: function (e) {
    var that = this;
    var detail = that.data.detail;
    var itemIndex = e.currentTarget.dataset.id;
    if (that.data.productID != 0) {
      wx.showModal({
        title: '提示',
        content: '删除不可恢复，请谨慎操作',
        success(res) {
          if (res.confirm) {
            detail.splice(itemIndex, 1);
            that.setData({
              detail: detail,
              checkUp: false
            })
            that.chooseViewShowDetail();
          }
        }
      })
    } else {
      detail.splice(itemIndex, 1);
      that.setData({
        detail: detail,
        checkUp: false
      })
      that.chooseViewShowDetail();
    }
  },
  /** 是否隐藏图片选择detail */
  chooseViewShowDetail: function () {
    if (this.data.detail.length >= 3) {
      this.setData({
        chooseViewShowDetail: false
      })
    } else {
      this.setData({
        chooseViewShowDetail: true
      })
    }
  },
  /** 查看大图Detail */
  showImageDetail: function (e) {
    var detail = this.data.detail;
    var itemIndex = e.currentTarget.dataset.id;
    wx.previewImage({
      current: detail[itemIndex], // 当前显示图片的http链接
      urls: detail // 需要预览的图片http链接列表
    })
  },
})