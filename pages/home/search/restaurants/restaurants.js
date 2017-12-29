// pages/home/search/restaurants/restaurants.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
  
  },

  /**
   * 顯示餐廳詳情信息
   */
  oppenDetails: function (e) {
    var that = this;
    var restIdx = e.currentTarget.id;
    var restaurant = JSON.stringify(that.data.restaurants[restIdx]);  // 餐廳對象
    // 跳轉至餐廳詳情信息頁面
    wx.navigateTo({
      url: "/pages/home/details/details?restaurant=" + restaurant,
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var restaurants = JSON.parse(options.restaurants);
    this.setData({
      restaurants: restaurants
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