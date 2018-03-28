const App = getApp()

Page({
    data: {
        indicatorDots: !0,
        vertical: !1,
        autoplay: !1,
        interval: 3000,
        duration: 1000,
        goods: {
            item: {
                images: [
                  { path:'http://p5bvccvyy.bkt.clouddn.com/aboutus04.jpeg'},
                  { path: 'http://p5bvccvyy.bkt.clouddn.com/aboutus03.jpeg' },
                  { path: 'http://p5bvccvyy.bkt.clouddn.com/aboutus02.jpeg' },
                  { path: 'http://p5bvccvyy.bkt.clouddn.com/aboutus01.jpeg' }
                    ],
                name: 'ThoughtJobs @ ThoughtWorks',
                price: '我们是一群发自内心热爱ThoughtWorks的TWer！',
                remark: `ThoughtJobs这款微信息小程序就是我们自发组织，利用业余时间为你定制的礼物，希望给大家更多的机会了解彼此！ \r\n`
            }
        }
    },
    estateAgent(e) {
        App.WxService.navigateTo('/pages/agent/index', {
        })
    },
    onLoad(option) {
    },
    onShow() {
    },
    previewImage(e) {
        const urls = this.data.goods && this.data.goods.item.images.map(n => n.path)
        const index = e.currentTarget.dataset.index
        const current = urls[Number(index)]
        
        App.WxService.previewImage({
            current: current, 
            urls: urls, 
        })
    }
})