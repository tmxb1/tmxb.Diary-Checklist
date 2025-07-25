// pages/adm_note/index.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        name:''
    },

    //删除
    del: function (e) { 
        var content = e.target.dataset.index;//获取内容
        var that = this;
        wx.request({
        url: 'http://127.0.0.1:3000/del_note',
        data: {"del_note_name":that.data.name,"del_note_content":content},
        method: 'post',
        success: function (res) {
            if (res.data=='{result:ok}') {
              that.onShow()//成功后刷新页面
            }
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
    onShow: function () {
      
        //数据库找列表
          var that = this;
          wx.request({
            url: 'http://127.0.0.1:3000/note',
            data: {
              //临时用123
              // "inventory_name":that.data.name,
              "note_name":that.data.name,
            },
            method: 'post',
            success: function (res) {
              that.setData({
                data:Processingdata(res.data)
              })
              console.log(that.data.data);
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