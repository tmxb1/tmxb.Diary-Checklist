// index.js

// const { timeStamp } = require("console");

// 获取应用实例
Page({

  /**
   * 页面的初始数据
   */
  data: {
    xq:[],
    searchhotel:'',
    name:'',
    scx:[],//line-through
    input:''
  },
  //输出存储
  input :function (e) { 
    let input=e.detail.value 
    console.log(input);
    this.setData({ 
      input
    }) 
  }, 


  
  add: function () { //添加
    var name1 = wx.getStorageSync('name1');//获取用户名
    var that = this;
    wx.request({
      url: 'http://127.0.0.1:3000/add',
      data: {"add_yhm":name1,"add_input":that.data.input},
      method: 'post',
      success: function (res) {
        if (res.data=='{result:ok}') {
          that.setData({//删除文本框
            input: ''
          })
          that.onShow()//成功后刷新页面
      }},
    }) 
},

  /**
   * 删除
   */
  del: function (e) { 
    var name = wx.getStorageSync('name1');//获取名称
    var content = e.target.dataset.index;//获取内容
    var that = this;
    wx.request({
      url: 'http://127.0.0.1:3000/logout',
      data: {"logout_name":name,"logout_content":content},
      method: 'post',
      success: function (res) {
        if (res.data=='{result:ok}') {//成功刷新页面
          that.onShow()
      }}
    })
  },


  //模糊搜索
search:function (params) {
  wx.showModal({
    editable:true,//显示输入框
    placeholderText:'请输入要搜索的内容',//显示输入框提示信息
    success: res => {
     var content=res.content//用户输入的值
        var that = this;
        wx.request({
          url: 'http://127.0.0.1:3000/search_inventory',
          data: {"search_inventory_name":that.data.name,"search_inventory_content":content},
          method: 'post',
          success: function (res) {
              that.setData({xq:Processingdata(res.data)});   
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


  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    // wx.setStorageSync('role', '10'); 
  },



  /**
  * 生命周期函数--监听页面显示
  */
 onShow: function () {
  //数据库找列表
    let name = wx.getStorageSync('name1');
    // let name =123;
    this.setData({name}) 
    var that = this;
    wx.request({
      url: 'http://127.0.0.1:3000/inventory',
      data: {"inventory_name":that.data.name,},
      method: 'post',
      success: function (res) {
        that.setData({xq:Processingdata(res.data)})
      },
      fail: function (err) {},
      complete: function () {},
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
    
  },
  mylink:function(){
    wx.switchTab({
      url: '../detail/detail.wxml',
    })
  }

})
