// pages/dormitory/dormitory.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    building:{
      north:[
        {
          builingname:"1",
          bed:"2"
        },
        {
          builingname: "2",
          bed: "24"
        },
        {
          builingname: "3",
          bed: "26"
        },
        {
          builingname: "4",
          bed: "45"
        },
        {
          builingname: "5",
          bed: "2"
        },
        {
          builingname: "6",
          bed: "21"
        },
        {
          builingname: "7",
          bed: "3"
        },

      ],
      south: [
        {
          builingname: "8",
          bed: "2"
        },
        {
          builingname: "9",
          bed: "2"
        },
        {
          builingname: "10",
          bed: "2"
        },
        {
          builingname: "11",
          bed: "2"
        },
        {
          builingname: "12",
          bed: "2"
        },
        {
          builingname: "13",
          bed: "2"
        }
      ],
      teacher: [
        {
          builingname: "1",
          bed: "2"
        },
        {
          builingname: "2",
          bed: "2"
        },
        {
          builingname: "3",
          bed: "2"
        },
        {
          builingname: "4",
          bed: "2"
        },
      ]
    },
    areamap:{
      "north":"北苑",
      "south":"南苑",
      "teacher":"师苑"
    }
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