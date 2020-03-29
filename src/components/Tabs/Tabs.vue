<template>
    <div :class="classes">
        <div :class="[this.prefixCls + '-nav-container']">
            <div ref="navWrap" :class="[this.prefixCls + '-nav-wrap']" :style="navWrapStyle">
                <div :class="[this.prefixCls + '-navbar']" :style="barStyle"></div>
                <div :class="tabItemCls(item.id)" v-for="(item, index) in data" :key="index" @click="handleClick(item)" :style="itemStyle(item)">{{item.name}}</div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "Tabs",
        computed:{
            // 类名称前缀
            prefixCls() {
                return 'p-tabs';
            },
            classes () {   // 设置组件最外层的class
                return [
                    `${this.prefixCls}`,
                    {
                        [`${this.prefixCls}-first-nav`] : this.type === 'first-nav',
                        [`${this.prefixCls}-second-nav`] : this.type === 'second-nav',
                        [`${this.prefixCls}-card-nav`] : this.type === 'card',
                    }
                ]
            },
            navWrapStyle () { // 设置页签包裹层的样式
                return {
                    height : this.type === 'first-nav' || this.type === 'second-nav' ? '48px' : '32px' ,
                    borderBottom : this.type === 'first-nav' || this.type === 'second-nav' ? '1px solid #EFF0F1' : 'none'
                }
            },
            barStyle () {  // 设置页签指示条的样式
                let style = {
                    display: 'block',
                    width: `${this.barWidth}px`
                }
                if (this.type === 'card') style.display = 'none'
                style.left = `${this.baroffset}px`
                return style
            },

        },
        props: {
            value: {   // 设置默认选中项
                type: [Number,String],
                default:''
            },
            type: {   // 设置页签类型  first-nav：一级页签，  second-nav：二级页签， card：卡片式页签
                validator (value) {
                    return ['first-nav','second-nav','card'].findIndex(item => { return item === value}) > -1
                }
            },
            data: {  // 用户传递的数据
                type: Array,
                default:() => []
            },
        },
        data () {
            return {
                activeKey: 0,  // 记录用户点击项
                baroffset:0,  // 页签指示条距离左边的值
                barWidth:0,   // 指示条的宽度
            }
        },
        watch: {
            type (curVal, oldVal) {  // 监听到类型改变时触发
                if (curVal !== oldVal) this.updateBarPos()
            },
            value: {  // 监听到默认选中项改变时触发
                handler(curVal, oldVal) {
                    this.activeKey = curVal
                },
                immediate:true
            },
            activeKey:{
                handler(curVal, oldVal) {  // 监听到当前选中项改变时触发
                    if ( (this.type !== 'card') && (curVal !== oldVal)) {
                        this.updateBarPos()
                    }
                }
            }
        },
        mounted() {
            if (this.type !== 'card') {
                this.updateBarPos()
            }
        },
        methods: {
            /**
             * @description: 一级页签和二级页签点击页签的情况下改变指示条的位置
             * @param：
             * @return:
             * @author: XXD
             * @Date: 2020-02-24 14:31:36
             */
            updateBarPos () {
                this.$nextTick(() => {
                    const index = this.data.findIndex(item => {
                        return item.id === this.activeKey
                    })
                    if (index === -1) return
                    const tabs = this.$refs.navWrap && this.$refs.navWrap.querySelectorAll(`.${this.prefixCls}-nav-item`)
                    if (!tabs) return
                    const tab = tabs[index]
                    if (this.type === 'first-nav') {
                        this.barWidth = tab ? parseFloat(tab.offsetWidth) : 0
                    } else {
                        this.barWidth = 40
                    }
                    let offset = 0
                    let gutter = 16
                    let centerDis = (tab.offsetWidth - this.barWidth) / 2
                    if (index > 0) {
                        for (let i=0; i < index; i++) {
                            offset += parseFloat(tabs[i].offsetWidth) + gutter
                        }
                        if (this.type === 'first-nav') {
                            this.baroffset = offset
                        } else {
                            this.baroffset = centerDis + offset
                        }
                    } else {
                        if (this.type === 'first-nav') {
                            this.baroffset = 0
                        } else {
                            this.baroffset = centerDis
                        }
                    }
                })
            },

            /**
             * @description: 点击页签时触发事件
             * @param item:点击项
             * @return:
             * @author: XXD
             * @Date: 2020-02-24 14:34:39
             */
            handleClick (item) {
                this.activeKey = item.id
                this.$emit('change', item)
                this.$emit('input', item.id)
            },

            /**
             * @description: 根据用户选择的类型取class名称
             * @param id
             * @return:
             * @author: XXD
             * @Date: 2020-02-24 14:36:29
             */
            tabItemCls (id) {
                return [
                    `${this.prefixCls}-nav-item`,
                    {
                        [`${this.prefixCls}-first-nav-item`] : this.type === 'first-nav',
                        [`${this.prefixCls}-second-nav-item`] : this.type === 'second-nav',
                        [`${this.prefixCls}-card-nav-item`] : this.type === 'card',
                        [`${this.prefixCls}-line-item-active`] : (this.type === 'second-nav' || this.type === 'first-nav') && this.activeKey === id,
                        [`${this.prefixCls}-card-item-active`] : this.type === 'card' && this.activeKey === id
                    }
                ]
            },

            /**
             * @description: 选择卡片式时根据字数设置padding值
             * @param item:每个页签
             * @return:
             * @author: XXD
             * @Date: 2020-02-24 14:37:28
             */
            itemStyle (item) {
                if (this.type === 'card') {
                    return {
                        padding: item.name.length > 1 ? '5px 16px' : '5px 8px'
                    }
                }
            }
        }
    }
</script>

<style lang="stylus">
    .p-tabs
        font-size 0
    .p-tabs-first-nav, .p-tabs-second-nav
        height 48px
    .p-tabs-card-nav
        height 32px
    .p-tabs-nav-container
        .p-tabs-nav-wrap
            position relative
        .p-tabs-navbar
            position absolute
            height 2px
            bottom 0
            background $blue-500
            transition left .3s ease-in-out
        .p-tabs-nav-item
            display inline-block
            height 100%
            padding 12px 16px
            margin-right 16px
            line-height 24px
            font-size 16px
            color $grey-900
            cursor pointer
            text-align center
            transition color .3s
            &:hover
                color $blue-500
        .p-tabs-card-nav-item
            height 32px
            min-width 30px
            line-height 20px
            padding 5px 16px
            margin-right 0
            box-sizing border-box
            border 1px solid $grey-400
            border-right none
            font-size 14px
            color $grey-900
            overflow hidden
            white-space: nowrap
            text-align center
            background $white
        div.p-tabs-card-nav-item:nth-child(2)
            border-top-left-radius 4px
            border-bottom-left-radius 4px

        div.p-tabs-card-nav-item:last-child
            border-top-right-radius 4px
            border-bottom-right-radius 4px
            border-right 1px solid $grey-400

        .p-tabs-line-item-active
            color $blue-500
        .p-tabs-card-item-active
            color $blue-500
            border 1px solid $blue-500!important
            border-right 1px solid $blue-500
            background #E1F2FF
        .p-tabs-card-item-active + div
            border-left none

</style>