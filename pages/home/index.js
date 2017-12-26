var app = Page({

  /**
   * 页面的初始数据
   */
  data: {
    // url: 'http://120.78.182.217',
    url: 'http://localhost:8080',
    scrollTop: 0,
    restaurants: [],
    start: 0,
    limit: 5
  },

  /**
 * 登錄獲取用戶openId
 */
  login: function () {
    var that = this;
    // 調用微信官方的登錄接口獲取用戶code
    wx.login({
      success: function (res) {
        if (res.code) { // 成功獲取code
          console.log('登錄成功');
          // 發起網絡請求，調用服務器接口獲取用戶openId
          wx.request({
            url: that.data.url + '/wechat-nowait/wxUser/login',
            data: {
              code: res.code  // 用戶code
            },
            success: function (result) {
              if (result.data.phone != null) {
                // 將獲取到的用戶手機號存儲到本地緩存
                wx.setStorage({
                  key: 'phone',
                  data: result.data.phone.substr(0, 1) + '****' + result.data.phone.substr(5, 7),
                });
              } else {
                wx.setStorage({
                  key: 'phone',
                  data: '',
                });
              }
              // 將獲取到的用戶openId存儲到本地緩存
              wx.setStorage({
                key: 'openid',
                data: result.data.openId,
              });
              if (result.data.wxUserId != 0) {  // 判斷用戶是否已經存在數據庫中
                console.log('用戶已綁定手機');
                // 將用戶在數據庫表中的Id存儲到本地緩存中
                wx.setStorage({
                  key: 'wxUserId',
                  data: result.data.wxUserId,
                })
              } else {
                console.log('用戶未綁定手機號');
                wx.setStorage({
                  key: 'wxUserId',
                  data: '-1',
                })
              }
            }
          })
        } else {
          console.log('登錄失敗')
        }
      }
    })
  },

  /**
   * 顯示連鎖店
   */
  showChainShop: function () {
    var that = this;
    // 發起網絡請求，調用服務器中的接口獲取所有有連鎖店信息
    wx.request({
      url: that.data.url + '/wechat-nowait/chainShop/showAllChainShop',
      data: {
        longitude: that.data.longitude, // 當前位置經度
        latitude: that.data.latitude  // 當前位置緯度
      },
      success: function (res) {
        console.log(res);
        that.setData({
          chainShops: res.data  // 連鎖店信息列表
        })
      }
    })
  },

  /**
   * 顯示附近餐廳信息
   */
  showNearRestaurant: function () {
    var that = this;
    // 發起網絡請求，調用服務器接口獲取當前位置的附近餐廳列表
    wx.request({
      url: that.data.url + '/wechat-nowait/restaurant/showNearRestaurantByConditionAndLimit',
      data: {
        longitude: that.data.longitude, // 當前位置經度
        latitude: that.data.latitude,  // 當前位置緯度
        start: that.data.start,
        limit: that.data.limit,
        btn1: that.data.selectedBtn1,
        btn2: that.data.selectedBtn2
      },
      success: function (result) {
        console.log(result);
        that.setData({
          restaurants: result.data,  // 餐廳信息列表
          start: that.data.start + that.data.limit,
          searchLoading: true
        });
      },
      fail: function () {
        console.log('獲取附近餐廳信息失敗')
      }
    })
  },

  /**
   * 顯示餐廳詳情信息
   */
  oppenDetails: function (e) {
    var that = this;
    var index = e.currentTarget.id; // 餐廳列表下標
    var restaurant = JSON.stringify(that.data.restaurants[index]);  // 將指定餐廳列表下標的餐廳轉換成string類型
    // 跳轉至顯示餐廳詳情信息頁面
    wx.navigateTo({
      url: "/pages/home/details/details?restaurant=" + restaurant,
    })
  },

  /**
   * 跳轉至搜索頁面
   */
  searchBar: function () {
    wx.navigateTo({
      url: '/pages/home/search/search',
    })
  },

  /**
   * 跳轉至分店頁面
   */
  branch: function (e) {
    var that = this;
    var restaurants;  // 餐廳列表
    var id = e.currentTarget.id;
    restaurants = JSON.stringify(that.data.chainShops[id].restaurants);
    // 跳轉至分店頁面
    wx.navigateTo({
      url: '/pages/home/branch/branch?restaurants=' + restaurants
    })
  },

  /**
   * 頁面中按鈕的點擊事件
   */
  selected1: function (e) {
    var _this = this;
    if (_this.data.selectedBtn1 == false) { //點擊時判斷值
      _this.setData({
        selectedBtn1: true
      })
    } else {
      _this.setData({
        selectedBtn1: false
      })
    }
    if (_this.data.selectedBtn1) {
      console.log('已選中可手機取號');
    } else {
      console.log('未選中可手機取號');
    }
    _this.setData({
      start: 0,
      limit: 5,
      hasNext: true
    })
    _this.showNearRestaurant();
  },

  /**
   * 頁面中按鈕的點擊事件
   */
  selected2: function (e) {
    var _this = this;
    if (_this.data.selectedBtn2 == false) {
      _this.setData({
        selectedBtn2: true
      })
    } else {
      _this.setData({
        selectedBtn2: false
      })
    }
    if (_this.data.selectedBtn2) {
      console.log('已選中過號不作廢');
    } else {
      console.log('未選中過號不作廢');
    }
    _this.setData({
      start: 0,
      limit: 5,
      hasNext: true
    })
    _this.showNearRestaurant();
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    that.setData({
      "selectedBtn1": false,
      "selectedBtn2": false,
      scrollTop: 0,
      start: 0,
      limit: 5,
      hasNext: true
    })
    // 設置服務器url地址
    wx.setStorage({
      key: 'url',
      data: that.data.url,
    })
    // 獲取當前位置經緯度
    wx.getLocation({
      success: function (res) {
        console.log('成功獲取當前位置');
        console.log('經度：' + res.longitude + ' 緯度：' + res.latitude);
        that.setData({
          longitude: res.longitude, // 經度
          latitude: res.latitude  // 緯度
        });
        wx.setStorage({
          key: 'longitude',
          data: res.longitude,
        })
        wx.setStorage({
          key: 'latitude',
          data: res.latitude,
        })
        // 顯示附近餐廳信息
        that.showNearRestaurant();
        // 顯示連鎖店信息
        that.showChainShop();
      },
      fail: function () {
        console.log('獲取當前位置失敗')
      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    // 調用當前js文件中的login()方法
    this.login();
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
    this.onLoad();
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    var that = this;
    console.log('到达底部')
    wx.request({
      url: that.data.url + '/wechat-nowait/restaurant/showNearRestaurantByConditionAndLimit',
      data: {
        longitude: that.data.longitude,
        latitude: that.data.latitude,
        start: that.data.start,
        limit: that.data.limit,
        btn1: that.data.selectedBtn1,
        btn2: that.data.selectedBtn2
      },
      success: function (res) {
        if (res.data.length > 0) {
          console.log('加載中...')
          var list = that.data.restaurants;
          for (var i = 0; i < res.data.length; i++) {
            list.push(res.data[i]);
          }
          that.setData({
            restaurants: list,
            start: that.data.start + that.data.limit,
          })
        } else {
          console.log('沒有更多了')
          that.setData({
            hasNext: false
          })
        }
      }
    })
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})