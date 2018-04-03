// pages/dormitory/dormitory.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    building:{
      // north:[
      //   {
      //     builingname:"1",
      //     bed:"2"
      //   },
      //   {
      //     builingname: "2",
      //     bed: "24"
      //   },
      //   {
      //     builingname: "3",
      //     bed: "26"
      //   },
      //   {
      //     builingname: "4",
      //     bed: "45"
      //   },
      //   {
      //     builingname: "5",
      //     bed: "2"
      //   },
      //   {
      //     builingname: "6",
      //     bed: "21"
      //   },
      //   {
      //     builingname: "7",
      //     bed: "3"
      //   },

      // ],
      // south: [
      //   {
      //     builingname: "8",
      //     bed: "2"
      //   },
      //   {
      //     builingname: "9",
      //     bed: "2"
      //   },
      //   {
      //     builingname: "10",
      //     bed: "2"
      //   },
      //   {
      //     builingname: "11",
      //     bed: "2"
      //   },
      //   {
      //     builingname: "12",
      //     bed: "2"
      //   },
      //   {
      //     builingname: "13",
      //     bed: "2"
      //   }
      // ],
      // teacher: [
      //   {
      //     builingname: "1",
      //     bed: "2"
      //   },
      //   {
      //     builingname: "2",
      //     bed: "2"
      //   },
      //   {
      //     builingname: "3",
      //     bed: "2"
      //   },
      //   {
      //     builingname: "4",
      //     bed: "2"
      //   },
      // ]
    },
    areamap:{
      "north":"北苑",
      "south":"南苑",
      "teacher":"师苑"
    },
    url: "https://gwsscx.com/dormitory/index.php/Home/Wx/",
    session_id:wx.getStorageSync("session_id")
  },
  fetchData:function(){
    var that = this;
    wx.showLoading({
      mask: true,
      title: '加载中',
    })
    wx.request({
      method: "post",
      url: that.data.url,
      dataType: "json",
      header: { 'content-type': "application/json" },
      data: {
        session_id: that.data.session_id,
        type: "A007",
      },
      success: function (res) {
        wx.hideLoading()
        //未登录
        if (res.data.code == 5) {
          wx.showModal({
            title: '未登录',
            content: '请先登陆',
            success: function (res) {
              wx.navigateTo({
                url: '/pages/login/login'
              })
            }
          })
          return;
        }

        // 请求出错
        if (res.data.code !== 1) {
          wx.showModal({
            title: '请求异常',
            content: res.data.msg
          })
          return;
        }


        var options = {}
        for (var key in res.data.msg){
          options[key] = [];
          res.data.msg[key].forEach(function(item,index){
            options[key][index] = {};
            if(key=="south"){
              options[key][index].building = index+7
            }else{
              options[key][index].building = index+1
            }
            options[key][index].bedcount = item;
          })
        }
        // 请求成功
        that.setData({
          building: options
        })
      },
      fail: function (res) {
        wx.hideLoading()
        wx.showModal({
          title: '网络异常',
          content: "请稍后重试"
        })
        console.log(res.errMsg);
      }
    })
  },
  showbuildingDetial(e){
    var building = e.currentTarget.dataset.area+e.currentTarget.dataset.building+'栋';
    // console.log(building);
    wx.navigateTo({
      url: '/pages/dormitory_building/dormitory_building?building='+building
    })
  },
  logout:function(){
    wx.showLoading({
      mask: true,
      title: '退出登录中',
    })
    var that = this;
    wx.request({
      method: "post",
      url: that.data.url,
      dataType: "json",
      header: { 'content-type': "application/json" },
      data: {
        type: "A014",
        session_id: that.data.session_id
      },
      success: function (res) {
        wx.hideLoading()
        try {
          wx.setStorageSync('session_id', "");
          wx.setStorageSync('id', "");
          wx.setStorageSync('name', "");
          wx.setStorageSync('identify', "");
          wx.setStorageSync('options', "");
        } catch (e) {
          console.log(e);
        }
        // 页面跳转
        wx.redirectTo({
          url: '/pages/login/login'
        })
      },
      fail: function (res) {
        wx.hideLoading()
        wx.showModal({
          title: '网络异常',
          content: "请稍后重试"
        })
        console.log(res.errMsg);
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    this.fetchData();
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.setData({
      session_id: wx.getStorageSync("session_id")
    })
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