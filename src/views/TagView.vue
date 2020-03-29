
<template>
    <div class="toggleView">
        <div class="component component-padding">
            <h1>Tag组件</h1>
            <div class="display-panel">
                <h3>1.big</h3>
                <Tag v-for="(color, i1) in tagBgColors" :key="'big'+color+i1" size='big' :color="color">大标签</Tag>
            </div>
            <div class="display-panel">
                <h3>2.small</h3>
                <Tag v-for="(color, i2) in tagBgColors" :key="'small'+color+i2" size='small' :color="color">小标签</Tag>
            </div>
            <div class="display-panel">
                <h3>3.status</h3>
                <Tag  type="circular" name='copy'  color="#E1F2FF">标签一</Tag>
                <Tag  type="circular" name='cost'  color="#D5F6F2">标签二</Tag>
                <Tag  type="circular" name='start' color="#D9F5D6">标签三</Tag>
                <Tag  type="circular" name='link'  color="#FAF1D1">标签四</Tag>
                <Tag  type="circular" name='copy'  color="#FEEAD2">标签一</Tag>
                <Tag  type="circular" name='cost'  color="#FDE3E2">标签二</Tag>
                <Tag  type="circular" name='start' color="#FDDDEF">标签三</Tag>
                <Tag  type="circular" name='link'  color="#ECE2FE">标签四</Tag>
                <Tag  type="circular" name='copy'  color="#B2E6F2">标签一</Tag>
                <Tag  type="circular" name='cost'  color="#EFF0F1">标签二</Tag>
            </div>
            <div class="display-panel">
                <h3>4.dot</h3>
                <Tag  type="dot" name='copy'  color="#0091FF">标签一</Tag>
                <Tag  type="dot" name='cost'  color="#F54E45">标签二</Tag>
                <Tag  type="dot" name='start' color="#34C724">标签三</Tag>
                <Tag  type="dot" name='link'  color="#F58300">标签四</Tag>
                <Tag  type="dot" name='copy'  color="#8D9399">标签五</Tag>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "TagView",
        data () {
            return {
                tagBgColors: ['#E1F2FF' , '#D5F6F2', '#D9F5D6', '#FAF1D1', '#FEEAD2', '#FDE3E2', '#FDDDEF', '#ECE2FE' ,'#B2E6F2', '#EFF0F1'],
                dotBgColors :['#0091FF','#F54E45','#34C724','#F58300','#8D9399']
            }
        },
    }
</script>

<style lang="stylus" scoped>
    .component
        .display-panel
            margin-bottom 40px
        h3
            padding 8px
            font-size 16px
</style>
