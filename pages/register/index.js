Page({ 
    data: { 
    password:'' ,
    name:'',
    name1:''
    }, 
    
   // 获取输入账号 
    phoneInput :function (e) { 
    this.setData({ 
    name:e.detail.value 
    }) 
    }, 
    
   // 获取输入密码 
    passwordInput :function (e) { 
    this.setData({ 
    password:e.detail.value 
    }) 
    }, 



   // 登录 
   register: function () { 
    if(this.data.name.length == 0 || this.data.password.length == 0){ 
        wx.showToast({ 
        title: '用户名,密码不能为空', 
        icon: 'loading', 
        duration: 500 
        }) 
   }else { 
      var that = this;
      wx.request({
      url: 'http://127.0.0.1:3000/register',
      data: {
        'register_yhm':that.data.name,
        'register_mm':that.data.password
      },
      method: 'post',
      success: function (res) {
        var data=res.data;
        if (data=="000") {
          //名称重复
          that.setData({
            name1:''
          })
          wx.showToast({ 
            title: '用户名已被占用，请更换用户名', 
            icon: 'loading', 
            duration: 500 
            }) 
        }else{
          //注册成功，跳转至清单页面
          wx.setStorageSync('name1', that.data.name); 
          wx.switchTab({
            url: '/pages/inventory/index'
          })
        } 
      },
      fail: function (err) {
      },
      complete: function () {
      }
    })
    } 
    } 
   }) 