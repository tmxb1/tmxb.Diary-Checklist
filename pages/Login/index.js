Page({ 
    data: { 
      items: [
        {value: 'user', name: '用户',checked: 'true'},
        {value: 'administrators', name: '管理员'},
      ],
    phone: '', 
    password:'' ,
    type:'0',
    name:'',
    pass:''
    }, 
    
  // 单选
  radioChange(e) {
    console.log('radio发生change事件，携带value值为：', e.detail.value)

    const items = this.data.items
    for (let i = 0, len = items.length; i < len; ++i) {
      items[i].checked = items[i].value === e.detail.value
    }

    this.setData({
      items
    })
  },

   // 获取输入账号 
    phoneInput :function (e) { 
      let phone=e.detail.value
    this.setData({ 
      phone
    }) 
    }, 
    
   // 获取输入密码 
    passwordInput :function (e) { 
      let password=e.detail.value 
    this.setData({ 
      password
    }) 
    }, 

    //获取类型
    radioChange:function (e) {
      console.log("sds "+e.detail.value);
      if(e.detail.value=="administrators"){
        this.data.type='1';
      }else{
        this.data.type='0';
      }
      console.log(this.data.type);
    },

   // 登录 
    login: function () { 
    if(this.data.phone.length == 0 || this.data.password.length == 0){ 
        wx.showToast({ title: '用户名和密码不能为空', icon: 'loading', duration: 2000 }) 
    }else { 
    var that = this;
    wx.request({
      url: 'http://127.0.0.1:3000/signin',
      data: {"signin_yhm":that.data.phone,},
      method: 'post',
      success: function (res) {
        console.log(res.data);
        //账户密码都错
        if(res.data==''){
          console.log('错误');
          //清空密码
          that.setData({pass: '',name:''})
          //显示错误
          wx.showToast({title: '账户密码不正确', icon: 'loading', duration: 500 }) 
        //密码不一样
        }else{
          var password=res.data[0].password;
          var type=res.data[0].type;
          if(password!=that.data.password){
            that.setData({pass: ''})
            //显示错误
            wx.showToast({ title: '密码不正确', icon: 'loading', duration: 500 }) 
          //类型不一样
          }else if(type!=that.data.type){
          //显示错误
          wx.showToast({ title: '类型错误', icon: 'loading', duration: 500 }) 
     //普通用户登录 0
          }else if(type=='0'){
            // wx.setStorageSync('role', '10'); 
            wx.setStorageSync('name1', that.data.phone); 
            wx.switchTab({url: '/pages/inventory/index'})
      //管理员登入 1
          }else if(type=="1"){
            // wx.setStorageSync('role', '1'); 
            wx.setStorageSync('name1', that.data.phone); 
            wx.redirectTo({url: '/pages/adm-manage/administrators'})
          }
      }
    },
      fail: function (err) {
      },
      complete: function () {
      }
    })
    }
},



  onShow: function () {
   
  }
}) 