// pages/component/page/details/details.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    //img1: "/pages/images/eg-img.jpg ",
    background: ["/pages/images/eg-img.jpg ", 
    "/pages/images/eg-img.jpg ", 
    "/pages/images/eg-img.jpg "],
    name:"8號餐廳（長安街店）",
    cuisine:"粵菜 68¥/人",
    star:"/pages/images/4@3x.png ",
    address:"王府井東街8號澳門中心16層",
    distance:"3.3",
    telephone:"(010)1234-1234",
    time:"9:00-22:00",
    smallnamber:"6",
    smalltime:"--",
    mediumnamber: "0",
    mediumtime: "--",
    largenamber: "0",
    largetime: "--",
    callphoneHidden: true,
    getnamberHidden: true,
  },

  //電話顯示-底部彈窗
  callphone: function () {
    this.setData({
      //取反
      callphoneHidden: !this.data.callphoneHidden
    });
  },

  listenerCallphone: function () {
    this.setData({
      callphoneHidden: !this.data.callphoneHidden
    })
  },

  //人數選擇-底部彈窗
  getnamber: function () {
    var that = this;
    wx.getStorage({
      key: 'phone',
      success: function(res) {
        if (res.data == '') {
          wx.navigateTo({
            url: '/pages/user/phone/phone',
          })
        } else {
          that.setData({
            //取反
            getnamberHidden: !that.data.getnamberHidden
          });
        }
      },
    })
    
  },

  listenerGetnamber: function () {
    this.setData({
      getnamberHidden: !this.data.getnamberHidden
    })
  },
  scrollToTop: function (e) {
    this.setAction({
      scrollTop: 0
    })
  },
  tap: function (e) {
    for (var i = 0; i < order.length; ++i) {
      if (order[i] === this.data.toView) {
        this.setData({
          toView: order[i + 1],
          scrollTop: (i + 1) * 200
        })
        break
      }
    }
  },

  tapMove: function (e) {
    this.setData({
      scrollTop: this.data.scrollTop + 10
    })
  },

  oppenPay:function (e) {
    var that = this;
    console.log(e)
    that.setData({
      getnamberHidden: !that.data.getnamberHidden
    }) 
    var people = e.currentTarget.id;
    var name = that.data.restaurant.name;
    var restId = that.data.restaurant.id;
    var isOverdue = that.data.restaurant.isOverdue;
    wx.navigateTo({
      url: "/pages/home/pay/pay?name=" + name + "&&people=" + people + "&&restId=" + restId + "&&isOverdue=" + isOverdue,
    })
  },

  //彈窗1
  showModal: function (e) {
    console.log(e)
    this.setData({
      getnamberHidden: !this.data.getnamberHidden
    })
    this.setData({
      modalHidden: !this.data.modalHidden
    })
  },

  modalBindaconfirm: function () {
    this.setData({
      modalHidden: !this.data.modalHidden,
      show: !this.data.show
    })
  },

  //撥打電話
  callmy: function () {
    var that = this
    wx.makePhoneCall({
      phoneNumber: "(010)1234-1234",
      success: function () {
        console.log("成功拨打电话")
      }
    })
  },

  /**
   * 計算餐廳座位最大人數
   */
  calculateDeskMaxPeople: function (desks) {
    var desk = desks[desks.length - 1];
    desk.info = desk.info.replace("人", "");
    var maxPeople = desk.info.split("-")[1];
    var peoplenumberItems = [];
    for (var i = 0; i < maxPeople; i++) {
      peoplenumberItems[i] = i + 1;
    }
    this.setData({
      peoplenumberItems: peoplenumberItems
    })
  },

  /**
   * 計算預計等待時間
   * @param desk 座位人數信息
   * @return int 預計等待時間，（單位：分鐘）
   */
  calculateForWaitTime: function (desk) {
    desk.info.replace("人", "");
    var people = desk.info.split("-");
    var avg = (Math.ceil((parseInt(people[0]) + parseInt(people[1])) / 2));  // 平均人數
    var waitTime;
    switch(avg) {
      case 1:
      case 2:
      case 3: waitTime = 3; break;
      case 4:
      case 5:
      case 6: waitTime = 5; break;
      case 7:
      case 8:
      case 9: waitTime = 7; break;
      default: waitTime = 10; break;
    }
    return waitTime * desk.waitTableSum;
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    var restaurant = JSON.parse(options.restaurant);  // 將string類型的餐廳對象轉換成JSON類型
    console.log(restaurant);
    console.log(restaurant.desks[0].waitTableSum);
    var waitTime = ['--', '--', '--'];
    // 計算等待時間
    for (var i = 0; i < restaurant.desks.length; i++) {
      if (restaurant.desks[i].waitTableSum > 0) {
        waitTime[i] = '>' + this.calculateForWaitTime(restaurant.desks[i]) + '分鐘';
      }
    };
    that.setData({
      restaurant: restaurant, // 餐廳信息對象
      waitTime: waitTime,
      background: restaurant.navPic.split(",")
    });
    this.calculateDeskMaxPeople(restaurant.desks);
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