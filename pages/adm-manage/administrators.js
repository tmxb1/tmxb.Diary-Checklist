// pages/administrators/administrators.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
      xq:[]
    },

    //删除账户
    del:function(params) {
      var name = params.target.dataset.index;
      // console.log(neme);
      wx.showModal({
        title: '注销账户',
        content:'是否注销本账户，即再也无法使用本账户',
        confirmText:'确认注销',
        cancelText:'在想想',
        success: res => {
          if (res.confirm) {
            console.log('注销');
            var that=this;
            wx.request({
              url: 'http://127.0.0.1:3000/delmember',
              data: {
                //临时用123
                "delmember_name":name,
                // "delmember_name":"12"
              },
              method: 'post',
              success: function (res) {
                if (res.data=='{result:ok}') {
                  //       //成功刷新页面
                  that.onShow()
                  wx.showToast({
                    title: "注销成功", // 提示的内容
                    icon: "success", // 图标，默认success
                    image: "", // 自定义图标的本地路径，image 的优先级高于 icon
                    duration: 500, // 提示的延迟时间，默认1500
                    mask: false, // 是否显示透明蒙层，防止触摸穿透
                    success: function () {
                    },
                    fail: function () {
                        console.log("接口调用失败的回调函数");
                    },
                    complete: function () {
                        console.log("接口调用结束的回调函数（调用成功、失败都会执行）");
                    }
                  })
                  //刷新页面
                  
                }
              },
              fail: function (err) {
                // fail
                console.log('require fail' ,err)
              },
              complete: function () {
                // complete
              },
              
            })
    
    
          }else{
            console.log('取消');
          }
        }
      })
    },

    //更改密码
    pass:function (params) {
      var name=params.target.dataset.index;
      wx.showModal({
        editable:true,//显示输入框
        placeholderText:'请输入新密码',//显示输入框提示信息
        success: res => {
          if (res.confirm) { //点击了确认
            var newpass=res.content
            console.log(newpass)//用户输入的值
            var that = this;
            wx.request({
              url: 'http://127.0.0.1:3000/changepass',
              data: {
                //临时用123
                "changepass_name":name,
                // "changepass_name":"123",
                "changepass_newpass":newpass
              },
              method: 'post',
              success: function (res) {
                if (res.data=='{result:ok}') {
                  //       //成功刷新页面
                  that.onShow()
                  wx.showToast({
                    title: "更改成功", // 提示的内容
                    icon: "success", // 图标，默认success
                    image: "", // 自定义图标的本地路径，image 的优先级高于 icon
                    duration: 500, // 提示的延迟时间，默认1500
                    mask: false, // 是否显示透明蒙层，防止触摸穿透
                    success: function () {
                        console.log("接口调用成功的回调函数");
                    },
                    fail: function () {
                        console.log("接口调用失败的回调函数");
                    },
                    complete: function () {
                        console.log("接口调用结束的回调函数（调用成功、失败都会执行）");
                    }
                  })
                  
                  // that.setData({
                  //   name:newname
                  // })
                  console.log(that.data.name);
                }
              },
              fail: function (err) {
                // fail
                console.log('require fail' ,err)
              },
              complete: function () {
                // complete
              },
              
            })
          } else {
            console.log('用户点击了取消')
          }
        }
      })
    },
    //更改名称
    name:function (params) {
      var name=params.target.dataset.index;
      wx.showModal({
        editable:true,//显示输入框
        placeholderText:'请输入新名称',//显示输入框提示信息
        success: res => {
          if (res.confirm) { //点击了确认
            var newname=res.content
            console.log(newname)//用户输入的值
            var that = this;
            wx.request({
              url: 'http://127.0.0.1:3000/changename',
              data: {
                "changename_oldname":name,
                "changename_newname":newname
              },
              method: 'post',
              success: function (res) {
                if (res.data=='{result:ok}') {
                  //       //成功刷新页面
                  wx.showToast({
                    title: "更改成功", // 提示的内容
                    icon: "success", // 图标，默认success
                    image: "", // 自定义图标的本地路径，image 的优先级高于 icon
                    duration: 500, // 提示的延迟时间，默认1500
                    mask: false, // 是否显示透明蒙层，防止触摸穿透
                    success: function () {
                        console.log("接口调用成功的回调函数");
                    },
                    fail: function () {
                        console.log("接口调用失败的回调函数");
                    },
                    complete: function () {
                        console.log("接口调用结束的回调函数（调用成功、失败都会执行）");
                    }
                  })
                  that.onShow()
                  that.setData({
                    name:newname
                  })
                  console.log(that.data.name);
                }else{
                  wx.showToast({
                    title: "名字被占用", // 提示的内容
                    icon: "loading", // 图标，默认success
                    image: "", // 自定义图标的本地路径，image 的优先级高于 icon
                    duration: 500, // 提示的延迟时间，默认1500
                    mask: false, // 是否显示透明蒙层，防止触摸穿透
                    success: function () {
                        console.log("接口调用成功的回调函数");
                    },
                    fail: function () {
                        console.log("接口调用失败的回调函数");
                    },
                    complete: function () {
                        console.log("接口调用结束的回调函数（调用成功、失败都会执行）");
                    }
                  })
                }
              },
              fail: function (err) {
                // fail
                console.log('require fail' ,err)
              },
              complete: function () {
                // complete
              },
              
            })
          } else {
            console.log('用户点击了取消')
          }
        }
      })
    },
    //跳转我的页面
    my:function(params) {
      wx.redirectTo({
        url: '/pages/adm-my/adm-my',
      })
    },


    //跳转清单管理页面
    inventory:function(params) {
      var name=params.target.dataset.index;
      wx.navigateTo({
        url: '/pages/adm_inventory/index?name='+name,
      })
    },


    //跳转笔记管理页面
    note:function(params) {
      var name=params.target.dataset.index;
      wx.navigateTo({
        url: '/pages/adm_note/index?name='+name,
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
  var that = this;
    wx.request({
      url: 'http://127.0.0.1:3000/member',
      data: {
      },
      method: 'get',
      success: function (res) {
        that.setData({
          xq:Processingdata(res.data)
        })
        console.log(that.data.xq);
      },
      fail: function (err) {
        // fail
        console.log('require fail' ,err)
      },
      complete: function () {
        // complete
      },
      
    })
    //用一个数组
    function Processingdata(data) {
      var ls=[]
      for (let n = 0; n < data.length; n++) {
        var time = data[n].time;
        time= time.replace("T","  ");
        time= time.replace(".000Z","");
        data[n].time=time
      }
      // console.log(scx);
      return data;
    }

},

  //模糊搜索
  search:function (params) {
    wx.showModal({
      editable:true,//显示输入框
      placeholderText:'请输入要搜索的用户名',//显示输入框提示信息
      success: res => {
       var content=res.content//用户输入的值
          var that = this;
          wx.request({
            url: 'http://127.0.0.1:3000/search_member',
            data: {"search_member_name":content},
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
//selected: 0就是选中的tabbar下标，根据不同页面显示不同tabbar下标

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