<template>
  <div class="Crossscreen" ref="Crossscreen_hook">
    <ul class="content">
      <li v-for="item in iterms" :style="{background:item.bg,height:height}">{{item.text}}</li>
    </ul>
  </div>
</template>

<script type="text/ecmascript-6">
  import BScroll from 'better-scroll'

  export default {
    data() {
      return {
        iterms: [
          {bg: '#F1EFEF', text: '第1屏'},
          {bg: '#F9E1CE', text: '第2屏'},
          {bg: '#D7F2F5', text: '第3屏'},
          {bg: '#DFD7E9', text: '第4屏'},
          {bg: '#CCF1D7', text: '第5屏'},
          {bg: '#BDD8D9', text: '第6屏'},
          {bg: '#BFDEF8', text: '第7屏'}
        ],
        height: 0
      }
    },
    created() {
      this.height = window.innerHeight + 'px'
    },
    mounted() {      // el 被新创建的 vm.$el 替换，并挂载到实例上去之后调用该钩子。
      // 设置20ms的延迟
      setTimeout(() => {
        this._initScroll()
      }, 20)
      // 监听窗口改变重置高度
      window.addEventListener('resize', () => {
        this.height = window.innerHeight + 'px'
      })
    },
    methods: {
      _initScroll() {
        var scroll = new BScroll(this.$refs.Crossscreen_hook, {
          scrollY: true,
          click: true,
          snap: {               // 该属性是给 slider 组件使用的，普通的列表滚动不需要配置
            loop: false,        // 设置不是循环的(设置loop设置true就会在前后加一个)
            threshold: 0.6,   // 用手指滑动时页面可切换的阈值，大于这个阈值可以滑动的下一页
            speed: 400       // 轮播图切换的动画时间
          }
        })
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" type="text/stylus">
  .Crossscreen {
    position: absolute
    text-outline: 0
    left: 0
    width: 100%
    height: 100%
    overflow: hidden
    background-color: #666
  }

  .Crossscreen .content li {
    width: 100%
    text-align: center
    font-size 30px
    /* padding-top 40%*/
    color red
  }
</style>
