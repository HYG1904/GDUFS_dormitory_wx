// pages/dormitory_room/dormitory_room.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    session_id: wx.getStorageSync("session_id"),
    url: "https://aoaotheone.cn/dormitory/index.php/Home/Wx/",
    buildingname: "",
    room: "",
    students:[
      {
        is_dorm_manager:true,
        name:"莫广智",
        sex:"男",
        grade:"2015",
        college:"信息科学与技术学院",
        student_number:"20151002208",
        phone:"15602233126",
        instructor:"谢石顺",
        instructor_phone:"13710042673"
      },
      {
        is_dorm_manager: false,
        name: "莫广智",
        sex: "男",
        grade: "2015",
        college: "信息科学与技术学院",
        student_number: "20151002208",
        phone: "15602233126",
        instructor: "谢石顺",
        instructor_phone: "13710042673"
      },
      {
        is_dorm_manager: false,
        name: "莫广智",
        sex: "男",
        grade: "2015",
        college: "信息科学与技术学院",
        student_number: "20151002208",
        phone: "15602233126",
        instructor: "谢石顺",
        instructor_phone: "13710042673"
      },
      {
        is_dorm_manager: false,
        name: "莫广智",
        sex: "男",
        grade: "2015",
        college: "信息科学与技术学院",
        student_number: "20151002208",
        phone: "15602233126",
        instructor: "谢石顺",
        instructor_phone: "13710042673"
      }
    ],
  },
  changeManager:function(e){
    var student_number = e.currentTarget.dataset.student_number;
    console.log(student_number);
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
        type: "A012",
        data: {
          building: that.data.buildingname,
          dorm: that.data.room,
          student_number: student_number
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
        }

        // 请求出错
        if (res.data.code !== 1) {
          console.log(res.data.msg);
          return;
        }

        // 请求成功
          // 改变页面
          that.data.students.forEach(function(item,index){
            var param = {};
            var string = "students[" + index + "].student_number";
            if(item.student_number === stuedent_number) {
              param[string] = true;
              that.setData(param);
              return;
            }
            param[string] = false;
            that.setData(param);
          })

          that.setData({
            students
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
        type: "A011",
        data: {
          building: that.data.buildingname,
          dorm: that.data.room
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
        }

        // 请求出错
        if (res.data.code !== 1) {
          console.log(res.data.msg);
          return;
        }

        // 请求成功
        var students = res.data.msg;

        that.setData({
          students: students,
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
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      buildingname:options.building,
      room:options.room
    })

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