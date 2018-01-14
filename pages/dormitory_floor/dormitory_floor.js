// pages/dormitory_floor/dormitory_floor.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    session_id:wx.getStorageSync("session_id"),
    url: "https://aoaotheone.cn/dormitory/index.php/Home/Wx/",
    buildingname:"",
    floor:"",
    isshowNull:false,
    roomView: [],
    roomViewAll: [],
    roomViewNull: [],
  },
  fetchData: function () {
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
        type: "A009",
        data: {
          building: that.data.buildingname,
          floor: that.data.floor
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
        var roomView = [];
        var roomViewNull = [];
        var i=0,j=0;
        var x=0,y=0;
        roomView[i] = [];
        roomViewNull[x] = [];
        for (var index in res.data.msg) {
          if(j >= 8){
            i++;
            j=0;
            roomView[i] = []
          }
          // 有空床位数组
          if(y >=8){
            x++;
            y=0;
            roomViewNull[x]=[]
          }
          roomView[i][j] = {};
          roomView[i][j]["bedcount"] = res.data.msg[index]['free_number'];
          roomView[i][j]["room"] = res.data.msg[index]['room_number'];
          j++;

          // 填充有空床位数组
          if (res.data.msg[index]['free_number'] != 0) {
            roomViewNull[x][y] = {};
            roomViewNull[x][y]["bedcount"] = res.data.msg[index]['free_number'];
            roomViewNull[x][y]["room"] = res.data.msg[index]['room_number'];
            y++;
          }
          
        }

        that.setData({
          roomView: roomView,
          roomViewAll: roomView,
          roomViewNull: roomViewNull
        })
        console.log(that.data.roomViewNull);
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
  showNullRoom:function(){
    var isshowNull = !this.data.isshowNull
    this.setData({
      isshowNull: isshowNull
    })

    if (isshowNull){
      var roomViewNull = this.data.roomViewNull;
      this.setData({
        roomView: roomViewNull
      })
    }else{
      var roomViewAll = this.data.roomViewAll;
      this.setData({
        roomView: roomViewAll
      })
    }

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
      floor: options.floor
    })
    // 获取数据
    this.fetchData();
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