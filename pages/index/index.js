import Config from '../../etc/config'
var util = require('../../utils/util.js');

const App = getApp()

Page({
    data: {
      coachInfo: {
        "nickName": 'ThoughtWorks最新招聘信息和相关资讯',
        "description": '作为朋友，只为你提供信息，不替你做决定！',
        "phone": "17786044851",
        "avatar": '../../assets/images/ThoughtJobs-420.png'
      },
      like: '工作环境',
      message: 0,
      infoList: [],
      postsList: [],
      officeImages: [
        { path: 'http://p5bvccvyy.bkt.clouddn.com/1.jpg' },
        { path: 'http://p5bvccvyy.bkt.clouddn.com/2.jpg' },
        { path: 'http://p5bvccvyy.bkt.clouddn.com/3.jpg' },
        { path: 'http://p5bvccvyy.bkt.clouddn.com/4.jpg' },
        { path: 'http://p5bvccvyy.bkt.clouddn.com/5.jpg' },
        { path: 'http://p5bvccvyy.bkt.clouddn.com/6.jpg' },
        { path: 'http://p5bvccvyy.bkt.clouddn.com/7.jpg' },
        { path: 'http://p5bvccvyy.bkt.clouddn.com/8.jpg' },
        { path: 'http://p5bvccvyy.bkt.clouddn.com/9.jpg' },
        { path: 'http://p5bvccvyy.bkt.clouddn.com/10.jpg' }
      ],
      hirePosts: [
        { path: 'http://p5bvccvyy.bkt.clouddn.com/hirepost-2018.jpeg' }
      ],
    },
    onLoad(options) {
      console.log('onload options', options)
      console.log('onLoad-options.id:' + options.id);
      if(options.id){
        wx.setStorageSync('optionsId', options.id)
      }
      this.lastLikeDate = null
      wx.login({
        success: function (res) {
          let code = res.code
          wx.getUserInfo({
            withCredentials: true,
            success: function (res) {
              console.log('res.userInfo', res.userInfo)
              wx.setStorageSync('token', res.userInfo.nickName)
              wx.setStorageSync('userinfo', res.userInfo)
            },
            fail: function (res) {
              console.log('get user info failed', res)
            }
          })
        }
      })
    },
    onShow() {
    },
    onLikeButtonClicked() {
      const urls = this.data.officeImages.map(n => n.path)
      const current = urls[Number(0)]

      App.WxService.previewImage({
        current: current,
        urls: urls,
      })
    },
    getTwEmailFromWeChatNickName(nickName){
      let mapping = {
        "陶慧": 'htao',
        "wayde": 'wwsun',
        "rh": 'hruan'
      }
      return mapping[nickName];
    },
    onCallButtonClicked() {
      const twers = ['htao', 'wwsun', 'hruan']
      let theOne = twers[Math.floor(Math.random() * 3)]
      let optionsId = wx.getStorageSync('optionsId')
      if (optionsId){
        theOne = this.getTwEmailFromWeChatNickName(optionsId)
      }
      App.WxService.showModal({
        content: `请将你的简历发送至小伙伴${optionsId}的ThoughtWorks邮箱:\r\n\r\n ${theOne}@thoughtworks.com \r\n\r\n 主题里请以【内推】开头。我们将在第一时间为你定制专属你的ThoughtWorks之旅！`,
        confirmText: "确认",
        showCancel: false,
        success: function (res) {
          // res.confirm
        }
      })
    },
    onHireInfoButtonClicked() {
      const urls = this.data.hirePosts.map(n => n.path)
      console.log(urls)
      const current = urls[Number(0)]

      App.WxService.previewImage({
        current: current,
        urls: urls,
      })
    },
    onAboutButtonClicked() {
      App.WxService.navigateTo('/pages/aboutus/index')
    },
    onClicked(e) {
      let action = e.currentTarget.dataset.id;
      switch(action){
        case 'like':
          this.onLikeButtonClicked()
          break
        case 'message':
          this.onAboutButtonClicked()
          break
        case 'call':
          this.onCallButtonClicked()
          break
        case 'appointment':
          this.onHireInfoButtonClicked()
          break
      }
    },
    onShareAppMessage: function (res) {
      try {
        let token = wx.getStorageSync('token')
        if (token) {
          console.log('onShareAppMessage token', token)
          var self = this
          return {
            title: `ThoughtWorks最新招聘信息`,
            path: '/pages/index/index?id=' + token,
            success: function (shareTickets) {
              shareTickets.forEach(item => {
                console.log(item);
              })
            },
            fail: function (res) {
            }
          }
        }
      } catch (e) {
        // Do something when catch error
        console.log('getStorageSync error', e)
      }
    }
})
