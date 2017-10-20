<template>
  <div class="Mobilescreen" ref="Mobilescreen_hook">
    <ul class="conter" ref="sliderGroup">
      <li v-for="(item ,index) in items" :data-id="'item-'+(index)">
        <img :src="item.bj" alt="">
      </li>
    </ul>
    <!--定义轮播图的小圆点-->
    <div class="dots">
      <span class="dot" :class="{active:currentPageIndex===index}" v-for="(item, index) in dots"></span>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import BScroll from 'better-scroll'

  export default {
    data() {
      return {
        items: [
          {bj: 'https://y.gtimg.cn/music/photo_new/T003R720x288M000003SUoSe2CBVtp.jpg?max_age=2592000&max_age=2592000'},
          {bj: 'https://y.gtimg.cn/music/photo_new/T003R720x288M000003SUoSe2CBVtp.jpg?max_age=2592000&max_age=2592000'},
          {bj: 'https://y.gtimg.cn/music/photo_new/T003R720x288M000002GKCZP15Gcip.jpg?max_age=2592000&max_age=2592000'},
          {bj: 'https://y.gtimg.cn/music/photo_new/T003R720x288M000004SXnk30QzDZS.jpg?max_age=2592000&max_age=2592000'},
          {bj: 'https://y.gtimg.cn/music/photo_new/T003R720x288M000002ilksh1fMvwV.jpg?max_age=2592000&max_age=2592000'}
        ],
        loop: true,             // 是否为循环播放
        dots: [],              // 存放轮播小圆点
        currentPageIndex: 0,  // 当前是哪个
        autoPlay: true,      // 是否自动轮播
        interval: 4000      // 设置自动轮播的时间
      }
    },
    mounted() {           // el 被新创建的 vm.$el 替换，并挂载到实例上去之后调用该钩子。
      // 设置20ms的延迟
      setTimeout(() => {
        this._setSliderWidth()
        this._initDots()
        this._initScroll()
        // 设置自动轮播
        if (this.autoPlay) {
          this._play()
        }
      }, 20)
      // 监听窗口改变重置高度
      window.addEventListener('resize', () => {
        if (!this.scroll) {
          return false
        }
        this._setSliderWidth(true)
        this.scroll.refresh()  // 当 better-scroll 刷新时触发，强制刷新
      })
    },
    activated() {       // 该钩子在服务器端渲染期间不被调用。
      if (this.autoPlay) {
        this._play()
      }
    },
    deactivated() {
      clearTimeout(this.timer)
    },
    beforeDestroy() {
      clearTimeout(this.timer)
    },
    methods: {
      // 定义一个计算宽度的方法
      _setSliderWidth(isResize) {
        this.children = this.$refs.sliderGroup.children
        let width = 0
        // 计算一个的宽度
        let wrapperWidth = this.$refs.Mobilescreen_hook.clientWidth
        for (let i = 0; i < this.children.length; i++) {
          let child = this.children[i]
          child.style.width = wrapperWidth + 'px'
          width += wrapperWidth;
        }
        // 如果是循环播放
        if (this.loop && !isResize) {
          width += 2 * wrapperWidth
        }
        this.$refs.sliderGroup.style.width = width + 'px'
      },
      _initScroll() {
        this.scroll = new BScroll(this.$refs.Mobilescreen_hook, {
          scrollY: false,
          scrollX: true,
          momentum: true, // 当快速滑动时是否开启滑动惯性
          snap: {
            loop: this.loop,   // ture表示前后增加一张
            threshold: 0.6,
            speed: 400
          },
          snapThreshold: 0.6,
          snapSpeed: 400,   // 轮播图切换的动画时间
          click: true
        })
        // 监听滚动结束后的小圆点
        this.scroll.on('scrollEnd', () => {      // scrollEnd滚动结束时触发
          let pageIndex = this.scroll.getCurrentPage().pageX     // snap 为 true 时，获取滚动的当前页，返回的对象结构为 {x, y, pageX, pageY}，其中 x,y 代表滚动横向和纵向的位置；pageX，pageY 表示横向和纵向的页面索引。
          if (this.loop) {
            pageIndex -= 1
          }
          this.currentPageIndex = pageIndex
          if (this.autoPlay) {
            this._play()
          }
        })
        // 手指滑动就停止自动轮播
        this.scroll.on('beforeScrollStart', () => {
          if (this.autoPlay) {
            clearTimeout(this.timer)
          }
        })
      },
      // 初始化添加小圆点
      _initDots() {
        this.dots = new Array(this.children.length)
      },
      // 设置自动轮播
      _play() {
        let pageIndex = this.currentPageIndex + 1
        if (this.loop) {
          pageIndex += 1
        }
        this.timer = setTimeout(() => {
          this.scroll.goToPage(pageIndex, 0, 400)  // goToPage(x, y, time, easing)snap 为 true，滚动到对应的页面
        }, this.interval)                          // ，x 表示横向页面索引，y 表示纵向页面索引， time 表示动画，easing 表示缓动函数（可省略不写）
      }
    },
    // 组件销毁的时候清理定时器
    destroyed() {
      clearTimeout(this.timer)
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" type="text/stylus">
  .Mobilescreen {
    position: relative
    width: 100%
    min-height 1px
    overflow: hidden
  }

  .Mobilescreen .conter li {
    float: left
    box-sizing border-box
    text-align: center
    overflow: hidden
  }

  .Mobilescreen .conter li img {
    width: 100%
    height: 100%
    display: block
  }

  .Mobilescreen .dots {
    position: absolute;
    right: 0;
    left: 0;
    bottom: 12px;
    text-align: center;
    font-size: 0;
  }

  .dots .dot {
    display: inline-block;
    margin: 0 4px;
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: #ddd;
  }

  .dots .dot.active {
    background-color: #666
  }

</style>
