// components/cartlistitem/cartListItem.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    cartGoodsObj:{
      type:Object,
      value:{}
    }
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    // 删除
    delClick(){
      let that = this;
     
      wx.getStorage({
        key: 'CartGoods',
        success(res){
          let list = res.data;
          let nowlist =  list.filter(val => {
            return val.gId != that.properties.cartGoodsObj.gId;
          });
          wx.setStorage({
            data: nowlist,
            key: 'CartGoods',
            success(res){
              that.triggerEvent('DelClick')
            }
          })
        }
      })
    },
    // 点击选择
  checkBoxClick(){
    this.triggerEvent('BoxClick',this.properties.cartGoodsObj.gId);
  },
  toDetail(){
    let id = this.properties.cartGoodsObj.gId;
    console.log('id',id);
    
    wx.navigateTo({
      url: '../../pages/index/index?id='+id
    })
  }
  }
})
