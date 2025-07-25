Page({

  /**
   * 页面的初始数据
   */
  data: {
    role:'',
    name:'',
    checkout:'',

    autoplay: true,
    interval: 3000,
    duration: 1200
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this; 
    var data = {
      "datas": [
        {
          "id": 1,
          "imgurl": "/pages/source/广告1.jpeg"
        },
        {
          "id": 2,
          "imgurl": "/pages/source/广告2.jpg"
        }
      ]
    }; 
    that.setData({
      lunboData: data.datas
    })
  },


//更改名称
  name:function (params) {
    wx.showModal({
      editable:true,//显示输入框
      placeholderText:'请输入新名称',//显示输入框提示信息
      success: res => {
        if (res.confirm) { //点击了确认
          var newname=res.content//用户输入的值
          var that = this;
          wx.request({
            url: 'http://127.0.0.1:3000/changename',
            data: { "changename_oldname":that.data.name, "changename_newname":newname
            },
            method: 'post',
            success: function (res) {
              if (res.data=='{result:ok}') {//成功刷新页面
                wx.showToast({
                  title: "更改成功", // 提示的内容
                  icon: "success", // 图标，默认success
                  image: "", // 自定义图标的本地路径，image 的优先级高于 icon
                  duration: 500, // 提示的延迟时间，默认1500
                  mask: false, // 是否显示透明蒙层，防止触摸穿透
                })
                wx.setStorageSync('name1', newname); 
                that.onShow();that.setData({name:newname });
              }else{
                wx.showToast({
                  title: "名字被占用", // 提示的内容
                  icon: "loading", // 图标，默认success
                  image: "", // 自定义图标的本地路径，image 的优先级高于 icon
                  duration: 500, // 提示的延迟时间，默认1500
                  mask: false, // 是否显示透明蒙层，防止触摸穿透
            })}},
            fail: function (err) {},
            complete: function () {},
          })
        } else {
          //用户点击了取消
        }
      }
    })
  },



//更改密码
pass:function (params) {
  wx.showModal({
    editable:true,//显示输入框
    placeholderText:'请输入新密码',//显示输入框提示信息
    success: res => {
      if (res.confirm) { //点击了确认
        var newpass=res.content//用户输入的值
        var that = this;
        wx.request({
          url: 'http://127.0.0.1:3000/changepass',
          data: {"changepass_name":that.data.name,"changepass_newpass":newpass},
          method: 'post',
          success: function (res) {
            if (res.data=='{result:ok}') {//成功刷新页面      
              that.onShow()
              wx.showToast({title: "更改成功", icon: "success", image: "", duration: 500, mask: false })//提示框
            }
          },
          fail: function (err) {},
          complete: function () {}})
      } else {
        //用户点击了取消
      }
    }
  })
},



//注销用户
del:function (params) {
  let name = wx.getStorageSync('name1');
  wx.showModal({
    title: '注销账户',content:'是否注销本账户，即再也无法使用本账户',confirmText:'确认注销',cancelText:'在想想',
    success:function (e) {
      if (e.confirm) {//注销
        var that = this;
        wx.request({
          url: 'http://127.0.0.1:3000/delmember',
          data: {"delmember_name":name,},
          method: 'post',
          success: function (res) {
            if (res.data=='{result:ok}') {//成功刷新页面
              wx.showToast({
                title: "注销成功", icon: "success",  image: "", duration: 500, mask: false, 
              })
              wx.setStorageSync('name1', ''); 
              wx.reLaunch({
                url: '/pages/Login/index'
              })
            }
          },
          fail: function (err) {},
          complete: function () {},
        })
      }else{
        //取消
      }
    }
  })
       
     
},



  //退出
  exit:function (params) {
    wx.setStorageSync('name1', ''); 
    wx.reLaunch({
      url: '/pages/Login/index'
    })
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
   //暂时更改
  let name = wx.getStorageSync('name1');
  // let name="123";
  this.setData({ 
    name
  })
  console.log(this.data.name);
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