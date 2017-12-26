// pages/home/search/search.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    modalHidden: true,
    tips: '搜索內容為空',
    chainShops: null
  },

  /**
   * 關閉提示信息
   */
  closeTips: function () {
    this.setData({
      modalHidden: true,
    })
  },

  /**
   * 跳轉至搜索詳情界面
   */
  toRests: function () {
    var that = this;
    var chainShops = that.data.chainShops;
    var value = this.data.value;
    if (value == null || value == "") {
      that.setData({
        tips: '請輸入關鍵詞',
        modalHidden: false
      })
    } else if (chainShops == null || chainShops.length == 0) {
      that.setData({
        tips: '所搜索的餐廳不存在',
        modalHidden: false
      })
    } else {
      chainShops = JSON.stringify(chainShops);
      wx.navigateTo({
        url: 'restaurants/restaurants?chainShops=' + chainShops,
      })
    }
  },

  /**
   * 顯示餐廳信息
   */
  showRestInfo: function (event) { 
    var i = event.target.dataset.csid;  // 連鎖店列表下標
    var j = event.target.dataset.restid;  // 餐廳列表下標
    var restaurant = JSON.stringify(this.data.chainShops[i].restaurants[j]);  // 獲取指定下標的餐廳對象，并將其轉換成string類型
    // 跳轉至餐廳詳情頁面
    wx.navigateTo({
      url: "/pages/home/details/details?restaurant=" + restaurant,
    })
  },

  /**
   * 根據關鍵字搜索餐廳信息
   */
  searchRest: function (event) {
    var that = this;
    var value = event.detail.value; // 關鍵字
    that.setData({
      value: value
    })
    // 發起網絡請求，調用服務器中的接口獲取根據關鍵字查詢的餐廳連鎖店列表
    wx.request({
      url: that.data.url + '/wechat-nowait/chainShop/showChainShopLikeName',
      data: {
        name: value,  // 餐廳名稱
        longitude: that.data.longitude, // 當前位置經度
        latitude: that.data.latitude  // 當前位置緯度
      },
      success: function (res) {
        that.setData({
          chainShops: res.data  // 連鎖店列表
        })
        console.log(res)
      }
    })
  },

  /**
   * 清除按鈕所綁定的清除事件
   */
  clear: function(){
    var _this = this;
    _this.setData({
      inputValue: '',
      chainShops: '',
      value: ''
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    // 設置服務器url地址
    wx.getStorage({
      key: 'url',
      success: function (res) {
        that.setData({
          url: res.data
        })
      },
    })
    wx.getStorage({
      key: 'longitude',
      success: function(res) {
        that.setData({
          longitude: res.data
        })
      },
    })
    wx.getStorage({
      key: 'latitude',
      success: function (res) {
        that.setData({
          latitude: res.data
        })
      },
    })
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