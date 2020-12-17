const app = getApp()
Page({
  data: {
    gstatus:"false",
    gsid:"",
    gid:"",
    gtitle: "",
    gprice: "",
    gimgsrc:"",
    gresidue:"",
    gunit:"",
    gbutton:"选规格",
    detail: [], //详情图片
    detailNew: [],
    detailAll: [],
    checkUp: true, //判断从编辑页面进来是否需要上传图片
    check: false,
    chooseViewShowDetail: true,
    dis: false,
    params:{}
  },
  onLoad: function (options) {

  },
  /*** 获取标题*/
  titleBlur(e) {
    this.setData({
      gtitle: e.detail.value
    })
  },
  /*** 获取商品价格*/
  priceBlur(e) {
    this.setData({
      gprice: e.detail.value
    })
  },
  /*** 获取商品信息*/
  residueBlur(e) {
    this.setData({
      gresidue: e.detail.value
    })
  },
  /*** 获取商品卖点*/
  unitBlur(e) {
    this.setData({
      gunit: e.detail.value
    })
  },
  /**
   * 商品状态
   */
  /**发布提交 */
  formSubmit(e) {
    let that = this
    var priceTF = /^\d+(\.\d{1,2})?$/
    if (e.detail.value.gtitle === "") {
      wx.showToast({
        title: '请输入商品名称',
        icon: "none",
        duration: 1000,
        mask: true,
      })
    } else if (e.detail.value.gtitle.length > 20) {
      wx.showToast({
        title: '商品名称不得大于20字',
        icon: "none",
        duration: 1000,
        mask: true,
      })
    } else if (e.detail.value.gtitle.length === "") {
      wx.showToast({
        title: '请输入商品价格',
        icon: "none",
        duration: 1000,
        mask: true,
      })
    } else if (!priceTF.test(e.detail.value.gprice)) {
      wx.showToast({
        title: '商品价格精确到两位',
        icon: "none",
        duration: 1000,
        mask: true,
      })
    } else if (e.detail.value.gresidue === "") {
      wx.showToast({
        title: '请输入商品剩余量',
        icon: "none",
        duration: 1000,
        mask: true,
      })
    } else if (e.detail.value.gunit === "") {
      wx.showToast({
        title: '请输入商品单位',
        icon: "none",
        duration: 1000,
        mask: true,
      })
    } else if (that.data.detail.length === 0) {
      wx.showToast({
        title: '请选择详情图片',
        icon: "none",
        duration: 1000,
        mask: true,
      })
    } else {
      let params = {
        gid:Date.parse(new Date()),
        gtitle: e.detail.value.gtitle,
        gresidue: e.detail.value.gresidue,
        gunit: e.detail.value.gunit,
        gprice: e.detail.value.gprice,
        gbutton:"选规格",
        gsid:getApp().shopId,
        gstatus:"false",
      }
      wx.showModal({
        title: '提示',
        content: '确定发布商品',
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
    let id = params.gid;
    let gid = id.toString().slice(0,9)
    let that = this
    for (var j = 0; j < that.data.detail.length; j++) {
      if (that.data.detail.length === j + 1) {
        that.data.check = true
      }
      wx.uploadFile({
        url: 'http://49.234.225.248:1111/upload',
        filePath: that.data.detail[j],
        name: 'file',
        success: function (res) {
          let imgdata = res.data;
          wx.request({
            url: 'http://49.234.225.248:7070/gadd',
            method:'POST',
            data:{
              gid:gid,
              gimgsrc:`http://49.234.225.248:1111/image/${imgdata}`,
              gtitle: params.gtitle,
              gresidue: params.gresidue,
              gunit:params.gunit,
              gprice: params.gprice,
              gbutton:params.gbutton,
              gsid:params.gsid,
              gstatus:params.gstatus,
            },
            success:(res)=>{
              wx.showToast({
                title: '商品上传成功',
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
        },
        fail: function (res) {
          // if (JSON.parse(res.errMsg) === "request:fail socket time out timeout:6000") {
          wx.showToast({
            title: '请求超时，请稍后再试！',
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
          // }

        }
      })
    }
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
    if (that.data.detail.length < 1) {
      wx.chooseImage({
        count: 1,
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
        title: '限制选择1个文件',
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
    if (this.data.detail.length >= 1) {
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