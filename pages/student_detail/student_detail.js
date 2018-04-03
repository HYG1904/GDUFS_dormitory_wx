// pages/student_detail/student_detail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    session_id: wx.getStorageSync("session_id"),
    url: "https://gwsscx.com/dormitory/index.php/Home/Wx/",
    student_number:"",
    student_key_map:{
      college: "学院",
      student_number: "学号",
      major: "专业",
      classname: "班级",
      phone: "电话",
      id_card: "身份证号码",
      native_place: "籍贯",
      room: "宿舍",
      dorm: "宿舍",
      first_contact: "第一联系人",
      first_contact_number: "联系人电话",
      instructor: "辅导员",
      instructor_phone: "辅导员电话",
      is_poor: "是否为贫困生",
      is_insurance: "是否购买保险",
      note:"备注（辅导员填写）"
    },
    student_title:{
      name:"",
      sex:"",
      grade:""
    },
    student:[
      {
        college: "",
        student_number:"",
        major:"",
        classname:""
      },
      {
        phone: "",
        id_card:"",
        native_place: "",
        dorm: "",
      },
      // 第一联系人
      {
        first_contact: "",
        first_contact_number: ""
      },
      // 辅导员
      {
        instructor:"",
        instructor_phone:""
      },
      // 是否为贫困生，是否有保险
      {
        is_poor: "",
        is_insurance: "",
      },
      // 备注
      {
        note: "",
      }
    ],
    oldStudent: [],
    insurance_type:"",
    oldinsurance_type:"",
    isEdit:false,
    // 用来在编辑的时候保存编辑之前的数据
    selectIndex:{
      college:0,
      major:0,
      classname:0,
      is_poor:0,
      is_insurance:0
    },
    oldSelectIndex:{},
    options:{
      college: [],
      major: [],
      classname: [],
      is_poor: ["是","否"],
      is_insurance: ["是","否"]
    },
    oldOptions:{},
    optiosMap:[],
    optionsMajorMap:[],
    historys: [
      // {
      //   "time": "2018.01.10",
      //   "main": "总管理员"
      // },
      // {
      //   "time": "2018.01.10",
      //   "main": "总管理员"
      // },
      // {
      //   "time": "2018.01.10",
      //   "main": "总管理员"
      // },
      // {
      //   "time": "2018.01.10",
      //   "main": "总管理员"
      // },
      // {
      //   "time": "2018.01.10",
      //   "main": "总管理员"
      // }
    ],
    building:"",
    room_number:""
  },
  inputInsuranceHandler:function(e){
    this.setData({
      insurance_type:e.detail.value
    })
  },
  inputHandler:function(e){
    var key = e.currentTarget.dataset.key;
    var index = e.currentTarget.dataset.index;
    var value = e.detail.value;

    var str = "student[" + index + "]." + key
    var params = {};
    params[str] = value;
    this.setData(params);
  },
  pickerHandler:function(e){
    var key = e.currentTarget.dataset.key;
    var index = e.currentTarget.dataset.index;
    var value = e.detail.value;

    var str = "student["+index+"]."+key;
    var str2 = "selectIndex."+key;
    var params = {};
    params[str] = this.data.options[key][value];
    params[str2] = value;
    console.log(params);
    this.setData(params);

    // 当选项是保险时
    if (key === "is_insurance"){
      if (this.data.options[key][value] === "是") return;
      this.setData({
        insurance_type: ""
      })
    }
    // 当选项是college时
    if (key === "college") {
      this.changeCollege(this.data.options[key][value]);
    }
    // 当选项是major时
    if (key === "major") {
      this.changeMajor(this.data.options[key][value]);
    }
  },
  changeCollege:function(college){
    var that = this;
    var majorOptions = [];
    this.data.optiosMap.forEach(function(item,index){
      if(item.college.college === college){
        that.data.optionsMajorMap = item;
        item.major.forEach(function(item,index){
          if (!item.major) return;
          majorOptions.push(item.major);
        })
      }
    })

    console.log(majorOptions);
    this.setData({
      "options.major": majorOptions,
      "options.classname": [],
      "student[0].major": "",
      "student[0].classname": "",
      "selectIndex.major": 0,
      "selectIndex.classname": 0,
    })
  },
  changeMajor:function(major){
    var that = this;
    var classOptions = [];
    // console.log(that.data.optionsMajorMap)
    that.data.optionsMajorMap.major.forEach(function(item,index){
      console.log(item.major+"  "+major);
      if(item.major === major){
        console.log(item);
        item.class.forEach(function(item){
          if (!item.classname) return;
          classOptions.push(item.classname);
        })
      }
    })
    console.log(classOptions);
    this.setData({
      "options.classname": classOptions,
      "student[0].classname": "",
      "selectIndex.classname": 0,
    })
  },
  editHandler:function(){
    if(this.data.isEdit) return;

    this.setData({
      oldStudent: this.data.student,
      oldinsurance_type: this.data.insurance_type,
      oldOptions: this.data.options,
      oldSelectIndex: this.data.selectIndex,
      isEdit: true
    })
  },
  cansoleEditHandler:function(){
    // 数据复原
    this.setData({
      student: this.data.oldStudent,
      insurance_type: this.data.oldinsurance_type,
      options: this.data.oldOptions,
      selectIndex: this.data.oldSelectIndex,
      isEdit: false
    })

    // 清空备份数据
    this.setData({
      oldStudent: [],
      oldinsurance_type: "",
      oldOptions: {},
      oldSelectIndex: {},
    })
  },
  saveEditHandler:function(){
    var that = this;
    var data = {};
    // 组合数据
    this.data.student.forEach(function(item){

      for (var key in item){
        data[key] = item[key];
      }
      // item.forEach(function(item,key){
      //   data[key] = item;
      // })
    })
    for (var key in this.data.student_title){
      data[key] = this.data.student_title[key];
    }
    // this.data.student_title.forEach(function (item,key) {
    //   data[key] = item;
    // })
    console.log(data);
    // 后台发送数据
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
        type: "A013",
        data:data
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
        // 没有权限
        if (res.data.code === 4) {
          wx.showModal({
            title: '没有权限',
            content: "不好意思，您没有权限修改该同学信息",
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
        var historys = res.data.msg;
        that.setData({
          isEdit: false,
          historys: historys
        })
        // 清空备份数据
        that.setData({
          oldStudent: [],
          oldinsurance_type: "",
          oldOptions: {},
          oldSelectIndex: {},
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
  initOptions:function(){
    var that = this;
    this.data.optiosMap = wx.getStorageSync("options");
    var collegeOptions = [];
    var majorOptions = [];
    var classOptions = [];
    var collegeIndex = 0, majorIndex = 0, classIndex = 0, ispoorIndex = 0, isinsuranceIndex = 0;
    // 设置学院，专业，班级
    this.data.optiosMap.forEach(function(item,index){
      collegeOptions.push(item.college.college);
      if(item.college.college==that.data.student[0].college){
        that.data.optionsMajorMap = item;
        collegeIndex = index;
        item.major.forEach(function(item,index){
          if (!item.major) return;
          majorOptions.push(item.major);
          if (item.major === that.data.student[0].major){
            majorIndex = index;
            item.class.forEach(function(item,index){
              if (!item.class) return;
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
  fetchData: function () {
    console.log();
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
        type: "A004",
        data: {
          student_number: that.data.student_number
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
        // 没有权限
        if (res.data.code === 4) {
          wx.showModal({
            title: '没有权限',
            content: "不好意思，您没有权限查询该同学信息",
            complete:function(){
              wx.navigateBack();
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
        var student = that.data.student;
        var studentSource = res.data.msg.student[0];
        var historys = res.data.msg.change_history;
        var student_title = that.data.student_title;
        student.forEach(function(item,index){
          for(var key in item){
            student[index][key] = studentSource[key];
          }
        })
        
        for (var key in student_title) {
          student_title[key] = studentSource[key];
        }
        that.setData({
          student: student,
          historys: historys,
          student_title: student_title,
          building: studentSource.building,
          room_number: studentSource.room_number,
        })
        console.log(studentSource);
        console.log(student);
        console.log(that.data);
        // console.log()
        that.initOptions();
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
    this.data.student_number = options.student_number;
    this.data.session_id = wx.getStorageSync("session_id");

    

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