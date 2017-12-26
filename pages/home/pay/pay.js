// pages/home/pay/pay.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    countdown: '',
    name: '8號餐廳（長安街店）',
    people: '5',
    price: '2',
    modalHidden: true,
    num: "A0013",
    show: false
  },

  oppensuccess: function () {
    this.addOrder();
    this.setData({
      modalHidden: !this.data.modalHidden
    });
  },

  /**
   * 添加訂單
   */
  addOrder: function () {
    var that = this;
    wx.request({
      url: that.data.url + '/wechat-nowait/order/saveOrder',
      data: {
        wxuserId: that.data.wxuserId,
        restId: that.data.restId,
        restName: that.data.restName,
        numberOfPeople: that.data.numberOfPeople,
        warnInfo: that.data.warnInfo
      },
      success: function (res) {
        console.log(res);
        if (res.data == "多余訂單") {
          console.log("不可以重複取號");
          that.setData({
            title: "不可重複取號"
          })
        } else if (res.data == "取號失敗") {
          console.log("取號失敗");
          that.setData({
            title: "取號失敗"
          })
        } else {
          console.log("取號成功");
          that.setData({
            text: "您當前的號碼是" + res.data
          })
        }
      }
    })
  },

  modalBindaconfirm: function () {
    this.setData({
      modalHidden: !this.data.modalHidden,
      show: !this.data.show
    })
  },
  //返回上一頁 
  reback: function () {//支付弹出的界面
    wx.switchTab({
      url: '/pages/home/index',
      success: function () {
        var page = getCurrentPages().pop();
        page.onLoad();
      }
    })
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
    })
    if (leave == 1) {
      leave = 0;
      cf++;
      count_down(this);
    }
    if (total_second !== 1 / 6 * 60 * 60 * 1000) {
      total_second = 1 / 6 * 60 * 60 * 1000;//再进去重新倒计时
      cf++;
      count_down(this);

    } else {
      count_down(this);
    }
    wx.getStorage({
      key: 'wxUserId',
      success: function(res) {
        that.setData({
          wxuserId: res.data,
          restId: options.restId,
          restName: options.name,
          numberOfPeople: options.people,
          warnInfo: options.isOverdue == 1 ? '過號不作廢' : '過號作廢'
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
    leave = 1;//跳出递归

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
var total_second = 1 / 6 * 60 * 60 * 1000;
var cf = 1;
var leave = 0;

/* 秒级倒计时 */
function count_down(that) {
  //console.log(total_second);
  // 渲染倒计时时钟
  that.setData({
    countdown: date_format(total_second)
  });
  if (leave == 1) {//已经支付过了
    // that.setData({
    // countdown: "已经支付"
    //});
    cf = 1;
    total_second = 1 / 6 * 60 * 60 * 1000;
    return;
  }

  if (total_second <= 0) {
    //that.setData({
    //  countdown: "已经截止"
    //});
    leave = 1;
    wx.navigateBack();//返回上一页
    // timeout则跳出递归
    return;
  }
  setTimeout(function () {
    // 放在最后--
    total_second = total_second - 10;
    count_down(that);
  }, 10 * cf)
}

// 时间格式化输出
function date_format(mir_second) {
  // 秒数
  var second = Math.floor(mir_second / 1000);
  // 分钟位
  var min = fill_zero_prefix(Math.floor((second) / 60));
  // 秒位
  var sec = fill_zero_prefix((second - min * 60));// equal to => var sec = second % 60;

  return min + "分" + sec + "秒";
}

// 位数不足补零
function fill_zero_prefix(num) {
  return num < 10 ? "0" + num : num
}
