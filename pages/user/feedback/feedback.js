// pages/component/page/feedback/feedback.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    title: '',
    tips: '',
    modalHidden: true,
  },
  /**
   * 表單提交事件
   */
  formSubmit: function (e) {
    var that = this;
    if (e.detail.value.textarea == '') {
      console.log('反馈内容为空，不执行跳转');
      that.setData({
        title: '反饋失敗',
        tips: '內容不能為空',
        modalHidden: !that.data.modalHidden,
      })
    } else {
      that.setData({
        info: e.detail.value.textarea
      })
      wx.request({
        url: that.data.url + '/wechat-nowait/feedBack/saveFeedBackInfo',
        data: {
          info: that.data.info,
          wxuserId: that.data.wxuserId
        },
        success: function (res) {
          console.log(res);
          if (res.data == 'fail') {
            console.log('反馈失败');
            that.setData({
              title: '反饋失敗',
              tips: '壹天只能反饋壹次哦',
              modalHidden: !that.data.modalHidden,
            })
          }
          else if (res.data == 'success') {
            console.log('反馈成功');
            that.setData({
              title: '反饋成功',
              tips: '',
              modalHidden: !that.data.modalHidden,
            })
          }
        }
      })
    }
  },
  //弹窗设置
  modalBindaconfirm: function () {
    this.setData({
      modalHidden: !this.data.modalHidden,
    })
  },
  //返回上一頁 
  reback: function () {//支付弹出的界面
    if (this.data.tips != '內容不能為空') {
      wx.switchTab({
        url: '/pages/user/user',
        success: function () {
          var page = getCurrentPages().pop();
          page.onLoad();
        }
      })
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    wx.getStorage({
      key: 'url',
      success: function (res) {
        that.setData({
          url: res.data
        })
      },
    })
    wx.getStorage({
      key: 'wxUserId',
      success: function (res) {
        that.setData({
          wxuserId: res.data
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