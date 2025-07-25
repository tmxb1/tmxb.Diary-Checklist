// const { threadId } = require("worker_threads");

// pages/adm-my/adm-my.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        role:'',
        name:'',
        checkout:''
    },

    //更改名称
    name:function (params) {
        wx.showModal({
        editable:true,//显示输入框
        placeholderText:'请输入新名称',//显示输入框提示信息
        success: res => {
            if (res.confirm) { //点击了确认
            var newname=res.content
            console.log(newname,this.data.name)//用户输入的值
            var that = this;
            wx.request({
                url: 'http://127.0.0.1:3000/changename',
                data: {
                //临时用123
                "changename_oldname":that.data.name,
                // "changename_oldname":"123",
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
    //更改密码
    pass:function (params) {
    wx.showModal({
        editable:true,//显示输入框
        placeholderText:'请输入新密码',//显示输入框提示信息
        success: res => {
        if (res.confirm) { //点击了确认
            var newpass=res.content
            console.log(newpass,this.data.name)//用户输入的值
            var that = this;
            wx.request({
            url: 'http://127.0.0.1:3000/changepass',
            data: {
                //临时用123
                "changepass_name":that.data.name,
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


    exit:function (params) {
        wx.setStorageSync('name1', ''); 
        wx.reLaunch({
          url: '/pages/Login/index'
        })
      },

  /**
   * 生命周期函数--监听页面显示
   */
  /**
  * 生命周期函数--监听页面显示
  */
 onShow: function () {
    let name = wx.getStorageSync('name1');
    // let name="root";
    this.setData({ 
      name
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