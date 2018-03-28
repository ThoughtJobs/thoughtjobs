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
    onLoad() {
      this.lastLikeDate = null
      this.userInfo = App.WxService.getStorageSync('userinfo')
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
    onCallButtonClicked() {
      const twers = ['wwsun', 'hruan', 'htao', 'wwsun']
      const theOne = twers[parseInt(Math.random() * 3)]

      App.WxService.showModal({
        content: `请将你的简历发送至邮箱:\r\n\r\n ${theOne}@thoughtworks.com \r\n\r\n 主题里请以【内推】开头。我们将在第一时间为你定制专属你的ThoughtWorks之旅！`,
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
    onShareAppMessage: function () {
      var self = this
        return {
          title: `ThoughtWorks最新招聘信息`,
          path: '/pages/index/index',
          complete: function (res) {
          },
          fail: function(res) {
          }
        }
    }
})
