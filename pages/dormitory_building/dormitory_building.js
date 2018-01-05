// pages/dormitory_buiding/dormitory_building.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    buildingname: "南苑13栋",
    roomView: [
      [
        { room: "202", bedcount: "3" },
        { room: "202", bedcount: "3" },
        { room: "202", bedcount: "3" },
        { room: "202", bedcount: "3" },
        { room: "202", bedcount: "3" },
        { room: "202", bedcount: "3" },
      ],
      [
        { room: "202", bedcount: "3" },
        { room: "202", bedcount: "3" },
        { room: "202", bedcount: "3" },
        { room: "202", bedcount: "3" },
        { room: "202", bedcount: "3" },
        { room: "202", bedcount: "3" },
        { room: "202", bedcount: "3" },
        { room: "202", bedcount: "3" },
      ],
      [
        { room: "202", bedcount: "3" },
        { room: "202", bedcount: "3" },
        { room: "202", bedcount: "3" },
        { room: "202", bedcount: "3" },
        { room: "202", bedcount: "3" },
        { room: "202", bedcount: "3" },
        { room: "202", bedcount: "3" },
        { room: "202", bedcount: "3" }
      ]
    ],
    floorinformation:[
      { floor: 2, bedcount: 12 },
      { floor: 3, bedcount: 13 },
      { floor: 4, bedcount: 4 },
      { floor: 5, bedcount: 12 },
      { floor: 6, bedcount: 44 },
      { floor: 7, bedcount: 14 },
      { floor: 8, bedcount: 6 }
    ],

    currentTab:"1"
  },
  changeTab:function(e){
    var tab = e.target.dataset.index;
    // console.log(tab);
    this.setData({
      currentTab:tab,
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