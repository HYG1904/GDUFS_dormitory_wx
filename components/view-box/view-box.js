// components/view-box/view-box.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    array:{
      type: Array,
      value: [],
    },
    texta:{
      type: String,
      value: ""
    },
    textb:{
      type: String,
      value: ""
    }
  },
  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    tagItem: function (e) {
      this.triggerEvent('clickRoom', { room: e.currentTarget.dataset.room });
    },
  },
})
