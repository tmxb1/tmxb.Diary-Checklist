// pages/adm_inventory/index.js
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
  /**
   * 添加
   */
  add: function () { 
    var that = this;
    wx.request({
      url: 'http://127.0.0.1:3000/add',
      data: {
        "add_yhm":that.data.name,
        "add_input":that.data.input
      },
      method: 'post',
      
      success: function (res) {
        console.log(res.data);
        if (res.data=='{result:ok}') {
          //删除文本框
          that.setData({
            input: ''
          })
          //成功刷新页面
          that.onShow()
          
        }
        },
      fail: function (err) {
      // fail
        console.log('require fail' ,err)
      },
      complete: function () {
      // complete
      }
    })
      //刷新
    
  },

  /**
   * 删除
   */
  del: function (e) { 
    var content = e.target.dataset.index
    console.log(content);
    var that = this;
    wx.request({
      url: 'http://127.0.0.1:3000/logout',
      data: {
        "logout_name":that.data.name,
        "logout_content":content
      },
      method: 'post',
      success: function (res) {
        console.log(res.data);
        if (res.data=='{result:ok}') {
    //       //成功刷新页面
          that.onShow()
        }
        },
      fail: function (err) {
      // fail
        console.log('require fail' ,err)
      },
      complete: function () {
      // complete
      }
    })
  },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        console.log(options);
        this.setData({
            name:options.name
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
    onShow: function (options) {
        
    var that = this;
    wx.request({
      url: 'http://127.0.0.1:3000/inventory',
      data: {
        //临时用123
        "inventory_name":that.data.name,
        // "inventory_name":name,
      },
      method: 'post',
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