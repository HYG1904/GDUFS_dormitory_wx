// pages/login/login.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    username:"",
    password:"",
    session_id:"",
    loginUrl:"",
    isRememberPassword:false,
    isRememberUsername:false
  },
  usernameInput:function(e){
    this.setData({
      username:e.detail.value
    })
  },
  passwordInput:function(e){
    this.setData({
      password:e.detail.value
    })
  },
  login:function(){
    var that = this;

    wx.request({
      url: that.data.loginUrl,
      data:{
        session_id:"",
        type:"A001",
        data:{
          username:that.data.username,
          password: that.data.password
        },
      },
      success:function(res){
        // 请求出错
        if(res.data.code !== 1){
          console.log(res.data.code);
          return;
        }

        // 登录成功，存储localStorage
        try {
          wx.setStorageSync('session_id', res.data.msg.session_id);
          wx.setStorageSync('id', res.data.msg.id);
          wx.setStorageSync('name', res.data.msg.name);
          wx.setStorageSync('identify', res.data.msg.identify);
        } catch (e) {
          console.log(e);
        }
        // 页面跳转
        wx.navigateTo({
          url: 'pages/student/student'
        })
      },
      fail:function(res){
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