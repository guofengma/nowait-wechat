// pages/user/myNum/myNum.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    "name": "",
    "date": "",
    "YorN": "",
    "least": "",
    "number": "",
    "time": "",
    "modalHidden": true
  },

  /**
   * 显示我的排队单号
   */
  showMyOrder: function () {
    var that = this;
    wx.request({
      url: that.data.url + '/wechat-nowait/order/getOrderByWxUserId',
      data: {
        wxuserId: that.data.wxUserId
      },
      success: function (result) {
        console.log('成功獲取排隊單號');
        console.log(result);
        if (result.data != 'noOrder') {
          that.setData({
            name: result.data.restName,
            date: result.data.createDate,
            number: result.data.waitNo,
            least: result.data.count,
            time: result.data.waitTime,
            restId: result.data.restId
          })
        }
      },
      fail: function () {
        console.log('獲取排隊單號失敗')
      }
    })
  },
  /**
   * 取消订单
   */
  cancelOrder: function () {
    var that = this;
    console.log('取消订单')
    wx.request({
      url: that.data.url + '/wechat-nowait/order/cancelOrder',
      data: {
        wxuserId: that.data.wxUserId,
        restId: that.data.restId
      },
      success: function (result) {
        if (result.data == '取消成功') {
          that.setData({
            modalHidden: false,
            text: '成功取消訂單'
          })
        }
      },
    })
  },
  modalBindaconfirm: function () {
    this.setData({
      modalHidden: !this.data.modalHidden
    })
  },
  reback: function () {
    console.log('取消訂單方法')
    this.setData({
      name: ''
    })
    this.onLoad();
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log('onLoad');
    var that = this;
    wx.getStorage({
      key: 'url',
      success: function(res) {
        that.setData({
          url: res.data
        })
      },
    })
    wx.getStorage({
      key: 'wxUserId',
      success: function (res) {
        that.setData({
          wxUserId: res.data
        })
        //显示排队单号
        that.showMyOrder()
      }
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