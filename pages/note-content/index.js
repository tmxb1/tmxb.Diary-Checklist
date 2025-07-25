// pages/note-content/index.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        name:'',
        input:'',
        title:''
    },
    //内容获得
    input: function(e) {
        let input= e.detail.value
        this.setData({ 
            input
        })
      },
      //标题获得
      title: function(e) {
        let title=e.detail.value
        this.setData({ 
            title
        }) 
      },




      //保存信息
      button: function(e) {
        var that = this;
        wx.request({
        url: 'http://127.0.0.1:3000/add_note',
        data: {
          //发送名称，标题，内容
            "add_note_name":that.data.name,
            "add_note_input":that.data.input,
            "add_note_title":that.data.title,
        },
        method: 'post',
        success: function (res) {
            if (res.data=='{result:ok}') {
            //成功后跳转note
            wx.switchTab({
                url: '/pages/note/logs',
              })
            }
            },
        fail: function (err) {
        },
        complete: function () {
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

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {
    let name = wx.getStorageSync('name1');
    // let name = '123';
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