// pages/login/login.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    username:"",
    password:"",
    session_id:"",
    loginUrl:"https://gwsscx.com/dormitory/index.php/Home/Wx/",
    isRememberPassword:false,
    isRememberUsername:false,
    users: wx.getStorageSync('users')
  },
  usernameInput:function(e){
    this.setData({
      username:e.detail.value
    })
    // console.log(this.data.users[]); 
    this.fillPassword(e.detail.value);
  },
  fillPassword:function(username){
    if (this.data.users[username]) {
      console.log(this.data.users[username])
      this.setData({
        password: this.data.users[username]
      })
    }else{
      this.setData({
        password: ""
      })
    }
  },
  passwordInput:function(e){
    this.setData({
      password:e.detail.value
    })
  },
  login:function(){
    wx.showLoading({
      mask:true,
      title: '请稍后',
    })
    var that = this;
    console.log(that.data.username + "  " + that.data.password);
    wx.request({
      method:"post",
      url: that.data.loginUrl,
      dataType:"json",
      header:{'content-type':"application/json"},
      data:{
        type:"A001",
        data:{
          username:that.data.username,
          password: that.data.password
        },
      },
      success:function(res){
        wx.hideLoading()
        // 账号密码错误
        if (res.data.code !== 1) {
          wx.showModal({
            title: '账号或密码错误',
            content: "请重新输入账号密码"
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

        // 登录成功，存储localStorage
        try {
          wx.setStorageSync('session_id', res.data.msg.session_id);
          wx.setStorageSync('id', res.data.msg.id);
          wx.setStorageSync('name', res.data.msg.name);
          wx.setStorageSync('identify', res.data.msg.identify);
          wx.setStorageSync('options', res.data.msg.college);
          // 记住账号
          if (that.data.isRememberUsername) wx.setStorageSync('username', that.data.username);
          // 记住密码
          if (that.data.isRememberPassword) {
            var users = wx.getStorageSync("users");
            if(users){
              users[that.data.username] = that.data.password;
            }else{
              // 第一次记住密码
              users = {};
              users[that.data.username] = that.data.password;
            }
            wx.setStorageSync('users', users);
          };
        } catch (e) {
          console.log(e);
        }
        // 页面跳转
        wx.switchTab({
          url: '/pages/student/student'
        })
      },
      fail:function(res){
        wx.hideLoading()
        wx.showModal({
          title: '网络异常',
          content: "请稍后重试"
        })
        console.log(res.errMsg);
      }
    })
    
  },
  rememberUsernameHandler:function(e){
    if(e.detail.value.length===1){
      // this.data.isRememberPassword = true;
      this.setData({
        isRememberUsername:true
      })

    }else{
      this.data.isRememberPassword = false;
      this.setData({
        isRememberUsername: false
      })

      // 解除记住密码
      try {
        wx.setStorageSync('username', "");
      } catch (e) {
        console.log(e);
      }
    }
    console.log(this.data.isRememberPassword)
  },
  rememberPasswordHandler:function(e){
    if (e.detail.value.length === 1) {
      this.setData({
        isRememberPassword: true
      })
    }else{
      this.setData({
        isRememberPassword: false
      })
    }
    console.log(this.data.isRememberPassword)
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
    var lastUsername = wx.getStorageSync('username');
    if (lastUsername) {
      this.setData({
        username: lastUsername,
        isRememberUsername:true
      })
    }

    this.fillPassword(lastUsername);
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