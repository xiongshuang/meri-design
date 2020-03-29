 
<template>
    <div id="baseexample">
        <h2>鼠标移入后显示省略类容或提示信息</h2>
        <div class="display-panel">
            <h5>显示省略类容 无需传值</h5>
            <div class="tool-tip" v-ptitle>我是天空里的一片云,你不必讶异，更无须欢喜，在转瞬间消灭了踪影。，偶尔投影在你的波心。</div>
        </div>
        <div class="display-panel">
            <h5>显示提示信息 需要传值</h5>
            <div class="tool-tip-info" v-ptitle="testText">你我相逢在黑夜的海上，你有你的，我有我的，方向；你记得也好，最好你忘掉，在这交会时互放的光亮！</div>
        </div>
    </div>
</template>
<script>
export default {
    data () {
        return {
            testText:'这是徐志摩的诗'
        }
    },
}
</script>
<style lang="stylus">
.display-panel
    margin-top 80px
    margin-bottom 20px
    h5
        margin 20px
    .tool-tip
        width:300px
        padding-left 40px
        text-overflow ellipsis
        white-space nowrap
        overflow hidden
        color #666
    .tool-tip-info
        padding-left 40px
        color #666

</style>