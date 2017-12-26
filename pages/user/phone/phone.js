// pages/user/phone/phone.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    'phone': '',
    'code': '',
    'openid': '',
    'second': 60,
    'selected': false,
    'selected1': true
  },
  phoneKeyInput: function (e) { //獲取手機輸入框的值
    this.setData({
      phone: e.detail.value
    })
  },
  codeKeyInput: function (e) {  //獲取驗證碼輸入框的值
    this.setData({
      code: e.detail.value
    })
  },

  /**
   * 绑定手机
   */
  addBtn: function () {
    var that = this;
    var phoneReg = this.data.phone;
    var codeReg = this.data.code;
    var userOpenid = this.data.openid;
    var phoneHide = phoneReg.substr(0, 1) + '****' + phoneReg.substr(5, 7);//隱藏手機信息：1****678
    if (phoneReg.length == 0) {    //驗證手機號：不為空、8位數、首位6,
      wx.showModal({
        content: '請輸入手機號碼',
      })
    } else if (phoneReg.length != 8 || phoneReg[0] != 6) {
      wx.showModal({
        content: '請輸入正確的手機號碼',
      })
    } else if (codeReg.length == 0) {  //驗證不為空
      wx.showModal({
        content: '請輸入驗證碼',
      })
    } else if (phoneReg) {     //保存號碼到本地緩存
      wx.setStorage({
        key: 'phone',
        data: phoneHide.substr(0, 1) + '****' + phoneHide.substr(5, 7),
        success: function (res) {
          wx.showToast({
            title: '綁定成功',
            icon: 'success',
            image: '',
            duration: 3000,
            mask: true,
            success: function (res) {
              wx.switchTab({
                url: '/pages/user/user',
                success: function () {
                  var page = getCurrentPages().pop();
                  page.onLoad();
                }
              })
            },
          })
        },
      });
      // 將個人信息保存到數據庫
      wx.request({
        url: that.data.url + '/wechat-nowait/wxUser/saveUserInfo',
        data: {
          phone: phoneReg,
          openid: userOpenid,
          code: codeReg
        },
        success: function(res) {
          if (res.data != -1) {
            wx.setStorage({
              key: 'wxUserId',
              data: res.data,
            })
          } else {
            console.log('綁定失敗');
          }
        }
      })
      console.log("ok");
    }

  },
  getmsgCode: function (e) {  //點擊‘獲取驗證碼’，顯示倒計時
    var phoneReg = this.data.phone;
    var codeReg = this.data.code;
    var that = this;
    if (phoneReg.length == 0) {    //驗證手機號：不為空、8位數、首位6,
      wx.showModal({
        content: '請輸入手機號碼',
      })
    } else if (phoneReg.length != 8 || phoneReg[0] != 6) {
      wx.showModal({
        content: '請輸入正確的手機號碼',
      })
    } else {
      this.setData({
        selected: true,
        selected1: false,
      });
      // 獲取手機短信驗證碼
      wx.request({
        url: that.data.url + '/wechat-nowait/wxUser/getmsgCode',
        data: {
          phone: phoneReg
        },
        success: function (res) {
          console.log(res);
          that.setData({
            code: res.data
          })
        }
      })
    }

    countdown(this);
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    wx.getStorage({
      key: 'url',
      success: function(res) {
        that.setData({
          url: res.data
        })
      },
    });
    wx.getStorage({
      key: 'openid',
      success: function (res) {
        that.setData({
          openid: res.data
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
});
function countdown(that) {
  var second = that.data.second;
  if (second == 0) {
    // console.log("Time Out...");
    that.setData({
      selected: false,
      selected1: true,
      second: 60,
    });
    return;
  }
  var time = setTimeout(function () {
    that.setData({
      second: second - 1
    });
    countdown(that);
  }
    , 1000)
}