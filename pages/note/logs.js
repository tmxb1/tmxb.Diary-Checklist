// logs.js
// const util = require('../../utils/util.js')

Page({
  data: {
    logs: [],
    name:'',
    data:[]
  },
  

  add: function () {
    wx.navigateTo({
      url: '/pages/note-content/index',
    })
  }, 


    //模糊搜索
search:function (params) {
  wx.showModal({
    editable:true,//显示输入框
    placeholderText:'请输入要搜索的标题',//显示输入框提示信息
    success: res => {
     var content=res.content//用户输入的值
        var that = this;
        wx.request({
          url: 'http://127.0.0.1:3000/search_note',
          data: {"search_note_name":that.data.name,"search_note_title":content},
          method: 'post',
          success: function (res) {
              that.setData({data:Processingdata(res.data)});   
          }})
    }
  })
  //时间微调 “t”改为空格
  function Processingdata(data) {
    var ls=[]
    for (let n = 0; n < data.length; n++) {
      var time = data[n].time;
      time= time.replace("T","  ");
      time= time.replace(".000Z","");
      data[n].time=time
    }
    return data;
  }
},


  
  onShow: function () {//数据库找列表
      let name = wx.getStorageSync('name1');
      // let name =123;
      this.setData({ name }) 
      var that = this;
      wx.request({
        url: 'http://127.0.0.1:3000/note',
        data: {"note_name":that.data.name,},
        method: 'post',
        success: function (res) {
          that.setData({data:Processingdata(res.data)})
      }})
      //用一个数组
      function Processingdata(data) {
        var ls=[]
        for (let n = 0; n < data.length; n++) {
          var time = data[n].time;
          time= time.replace("T","  ");
          time= time.replace(".000Z","");
          data[n].time=time
        }
        return data;
      }
  }
})
