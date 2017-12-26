//user.js
//获取应用实例
const app = getApp()

Page({
  /**
   * 页面的初始数据
   */
  data: {
    nickName: '',
    avatarUrl: '',
    "list": [
      {
        "id": "myNum",
        "name": "我的排隊單號",
        "more": "/pages/images/more.png"
      }, {
        "id": "phone",
        "name": "手機號",
        "text": "",
        "more": ""
      }, {
        "id": "contact",
        "name": "聯絡我們",
        "more": "/pages/images/more.png"
      }, {
        "id": "feedback",
        "name": "意見反饋",
        "more": ""
      }
    ]
  },

  navto: function (e) {
    var id = e.currentTarget.id;  //獲取點擊區域的id
    // console.log(e);
    if (id == "contact") {  //聯絡我們
      wx.makePhoneCall({   //調用撥打電話接口
        phoneNumber: '88888888',
        success: function (res) { },
        fail: function (res) { console.log("拨打失败！") },
        complete: function (res) { },
      })
    }
    if (id == "myNum") {  //我的排隊單號
      // 獲取本地緩存數據，判斷用戶是否已經綁定手機號
      wx.getStorage({
        key: 'phone',
        success: function (res) {  // 已綁定手機號
          // 跳轉至我的排隊單號界面
          if (res.data != '') {
            wx.navigateTo({
              url: '/pages/user/myNum/myNum',
            })
          } else {
            // 跳轉至綁定手機界面
            wx.navigateTo({
              url: '/pages/user/phone/phone',
            })
          }
        },
        fail: function () {  // 未綁定手機號
          // 跳轉至綁定手機界面
          wx.navigateTo({
            url: '/pages/user/phone/phone',
          })
        }
      })
    } else if (id == "phone") {  //手機號
      // 獲取本地緩存數據，判斷用戶是否已經綁定手機號
      wx.getStorage({
        key: 'phone',
        success: function (res) {
          if (res.data != '') {
            console.log("用戶已綁定手機號");
          } else {
            wx.navigateTo({
              url: '/pages/user/phone/phone',
            })
          }
        },
        fail: function () {
          wx.navigateTo({
            url: '/pages/user/phone/phone',
          })
        }
      })
    } else if (id == "feedback") {  //意見反饋
      // 獲取本地緩存數據，判斷用戶是否已經綁定手機號
      wx.getStorage({
        key: 'phone',
        success: function(res) {  // 已綁定手機號
          // 跳轉至意見反饋界面
          if (res.data != '') {
            wx.navigateTo({
              url: '/pages/user/feedback/feedback',
            })
          } else {
            wx.navigateTo({
              url: '/pages/user/phone/phone',
            })
          }
        },
        fail: function() {  // 未綁定手機號
          // 跳轉至綁定手機界面
          wx.navigateTo({
            url: '/pages/user/phone/phone',
          })
        }
      })
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 
    // 獲取用戶信息
    var _this = this;
    wx.getUserInfo({
      success: function (res) {
        //success
        _this.setData({
          nickName: res.userInfo.nickName,
          avatarUrl: res.userInfo.avatarUrl,
        })
      },
      fail: function () {
        //fail
        console.log("获取用户信息失败！")
      },
      complete: function () {
        //complete
        console.log("获取信息成功！");
        wx.getStorage({
          key: 'phone',
          success: function (result) {
            if (result.data == '') {
              console.log('用戶未綁定手機號');
            }
            _this.setData({
              'list[1].text': result.data
            });
          },
        })
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