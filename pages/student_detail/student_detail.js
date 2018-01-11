// pages/student_detail/student_detail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    session_id: wx.getStorageSync("session_id"),
    url: "https://aoaotheone.cn/dormitory/index.php/Home/Wx/",
    student_key_map:{
      college: "学院",
      student_number: "学号",
      major: "专业",
      classname: "班级",
      phone: "电话",
      native_place: "籍贯",
      room: "宿舍",
      dorm: "宿舍变更信息",
      first_contact: "第一联系人",
      first_contact_number: "联系人电话",
      instructor: "辅导员",
      instructor_phone: "辅导员工号",
      is_poor: "是否为贫困生",
      is_insurance: "是否购买保险",
      note:"备注（辅导员填写）"
    },
    student_title:{
      name:"莫广智",
      sex:"男",
      grade:"2016"
    },
    student:[
      {
        college: "信息科学与技术学院",
        student_number:"20151002208",
        major:"计算机类",
        classname:"计算机1503"
      },
      {
        phone: "15602233126",
        native_place: "广东清远",
        room: "南苑13-339",
      },
      // 第一联系人
      {
        first_contact: "\u9ec4\u5c0f\u69d0",
        first_contact_number: "12352166625"
      },
      // 辅导员
      {
        instructor:"\u9ad8\u7537",
        instructor_phone:"15918798365"
      },
      // 是否为贫困生，是否有保险
      {
        is_poor: "否",
        is_insurance: "是",
      },
      // 备注
      {
        note: "emmmm",
      }
    ],
    historys:[
      {
        "time": "2018.01.10",
        "main": "总管理员"
      },
      {
        "time": "2018.01.10",
        "main": "总管理员"
      },
      {
        "time": "2018.01.10",
        "main": "总管理员"
      },
      {
        "time": "2018.01.10",
        "main": "总管理员"
      },
      {
        "time": "2018.01.10",
        "main": "总管理员"
      }
    ],
    insurance_type:"\u5546\u4e1a\u533b\u7597\u4fdd\u9669",
    isEdit:false,
    // 用来在编辑的时候保存编辑之前的数据
    oldData:[],
    selectIndex:{
      college:0,
      major:0,
      classname:0,
      is_poor:0,
      is_insurance:0
    },
    options:{
      college: [],
      major: [],
      classname: [],
      is_poor: ["是","否"],
      is_insurance: ["是","否"]
    },
    optiosMap:[]
  },
  editHandler:function(){
    this.setData({
      isEdit: !this.data.isEdit
    })
  },
  cansoleEditHandler:function(){
    this.setData({
      isEdit: false
    })
  },
  saveEditHandler:function(){
    this.setData({
      isEdit: false
    })
  },
  initOptions:function(){
    var that = this;
    this.optiosMap = wx.getStorageSync("options");
    var collegeOptions = [];
    var majorOptions = [];
    var classOptions = [];
    var collegeIndex = 0, majorIndex = 0, classIndex = 0, ispoorIndex = 0, isinsuranceIndex = 0;
    // 设置学院，专业，班级
    this.optiosMap.forEach(function(item,index){
      collegeOptions.push(item.college.college);
      if(item.college.college==that.data.student[0].college){
        collegeIndex = index;
        item.major.forEach(function(item,index){
          majorOptions.push(item.major);
          if (item.major === that.data.student[0].major){
            majorIndex = index;
            item.class.forEach(function(item,index){
              classOptions.push(item.class);
              if(item.class === that.data.student[0].classname){
                classIndex = index
              }
            })
          }
        })
      }
    })
    // 设置是否为贫困生
    this.data.options.is_poor.forEach(function(item,index){
      if(item==that.data.student[4].is_poor){
        ispoorIndex = index;
        // console.log(index);
      }
    })
    // 设置是否有保险
    this.data.options.is_insurance.forEach(function (item, index) {
      if (item == that.data.student[4].is_insurance) {
        isinsuranceIndex = index;
        // console.log(index);
        
      }
    })
    // 设置data，渲染视图
    this.setData({
      "options.college": collegeOptions,
      "options.major": majorOptions,
      "options.classname": classOptions,
      "selectIndex.college": collegeIndex,
      "selectIndex.major": majorIndex,
      "selectIndex.classname": classIndex,
      "selectIndex.is_poor": ispoorIndex,
      "selectIndex.is_insurance": isinsuranceIndex
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.initOptions();
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