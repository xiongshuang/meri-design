<template>
  <div class="app">
    <div class="backBox">
      <section class="title">{{routeName}}</section>
    </div>
    <router-view/>
  </div>
</template>

<script>

  export default {
    name: 'App',
    data() {
      return {
        backShow: false, // 当前路由
        routeName: '' // 当前路由名字
      }
    },
    created() {
      const {path, name} = this.$route;
      this.routeName=name;
      this.backShow = path !== '/componentLists';
    },
    mounted() {
    },
    watch: {
      $route(to){
        // （监听路由变化）控制tab显示
        this.routeName=to.name;
        this.backShow = to.path !== '/componentLists';
      }
    },
    methods: {
      backFn() {
        // 返回上一页
        this.$router.back()
      }
    }
  }
</script>

<style lang="stylus">
  .app
    width 100%
    height 100%
    .backBox
      background-color $white
      box-shadow 0 3px 3px rgba(0,0,0,.1)
      width 100%
      height 48px
      line-height 48px
      .title
        text-align center
        color $black
        font-size 18px
        font-weight 600
    .component-padding
      padding 16px
    .component
      h1
        margin-bottom 8px
        font-size 20px
    .titleLine
      padding-left 12px
      border-left 4px solid $grey-400

</style>
