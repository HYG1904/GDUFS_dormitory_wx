// pages/dormitory_buiding/dormitory_building.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    buildingname: "南苑13栋",
    session_id: wx.getStorageSync("session_id"),
    url:"https://aoaotheone.cn/dormitory/index.php/Home/Wx/",
    roomView: [],
    floorinformation:[],
    currentTab:"0"
  },
  fetchData2:function(){
    var that = this;
    // wx.showLoading({
    //   mask: true,
    //   title: '加载中',
    // })
    wx.request({
      method: "post",
      url: that.data.url,
      dataType: "json",
      header: { 'content-type': "application/json" },
      data: {
        session_id: that.data.session_id,
        type: "A008",
        data:{
          building: that.data.buildingname
        }
      },
      success: function (res) {
        // wx.hideLoading()
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

        // 请求成功
        var floorinformation = []
        res.data.msg.forEach(function (item, index) {
          floorinformation[index] = {};
          floorinformation[index]['bedcount'] = item;
          floorinformation[index]['floor'] = index + 1;
        })
        that.setData({
          floorinformation:floorinformation
        })
        console.log(that.data.building);
      },
      fail: function (res) {
        // wx.hideLoading()
        wx.showModal({
          title: '网络异常',
          content: "请稍后重试"
        })
        console.log(res.errMsg);
      }
    })
  },
  fetchData1:function(){
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
        type: "A010",
        data: {
          building: that.data.buildingname
        }
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

        // 请求成功
        var roomView = {};
        for (var key in res.data.msg){
          roomView[key] = [];
          res.data.msg[key].forEach(function(item,index){
            roomView[key][index] = {};
            roomView[key][index]["bedcount"] = item['free_number'];
            roomView[key][index]["room"] = item['room_number'];            
          })
        }

        that.setData({
          roomView: roomView
        })
        console.log(that.data.roomView);
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
  fetchDataStrategy: function (strategy){
    switch (strategy) {
      case 0:
        return this.fetchData1;
      case 1:
        return this.fetchData2;
    }
  },
  changeTab:function(e){
    var tab = e.target.dataset.index;
    this.setData({
      currentTab:tab,
    })
  },
  showFloorDetail:function(e){
    var floor = e.currentTarget.dataset.floor;
    var buildingname = this.data.buildingname;
    console.log(floor);
    wx.navigateTo({
      url: '/pages/dormitory_floor/dormitory_floor?building=' + buildingname + "&floor=" + floor
    })
  },
  showDormitoryDetial:function(e){
    var building = this.data.buildingname;
    var room = e.detail.room;
    wx.navigateTo({
      url: '/pages/dormitory_room/dormitory_room?building=' + building + "&room=" + room
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 读取参数
    this.setData({
      buildingname: options.building,
      session_id: wx.getStorageSync("session_id")
    })
    // this.data.buildingname = options.building;

    //获取数据
    this.fetchData1();
    this.fetchData2();
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