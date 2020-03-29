<template>
    <transition name="slideRightLeft">
        <div
                ref="drawerBox"
                v-if="show"
                class="p-drawer"
                :tabindex="-1"
                @blur="drawerBlur"
                @mouseenter="drawerEnter"
                @mouseleave="drawerLeave"
        >
            <div class="p-drawer-title" v-show="title">
                <section class="p-drawer-title-text">{{title}}</section>
                <i class="p-drawer-title-icon">
                    <IconClose @click="onClose" />
                </i>
            </div>
            <div :class="['p-drawer-content', bottom&&'p-drawer-content-bottom']" @scroll="contentScroll">
                <!-- @slot html内容 -->
                <slot name="content" />
                <section class="p-drawer-content-loading" v-if="loadingMore">
                    <LoadingGrey />
                    <span>加载中...</span>
                </section>
            </div>
            <div :class="['p-drawer-handle', bottom&&'p-drawer-handle-bottom']" v-if="$slots.handle">
                <slot name="handle" />
            </div>
        </div>
    </transition>
</template>

<script>
    import IconClose from '../static/iconSvg/icon_close.svg';
    import LoadingGrey from '../static/iconSvg/loading_grey.svg';

    export default {
        name: 'Drawer',
        components: { IconClose, LoadingGrey },
        props: {
            /**
             * 侧拉窗显示状态
             */
            show: {
                type: Boolean,
                default: false,
                require: true
            },
            /**
             * 是否聚焦（也就是失去交掉是否关闭侧拉窗）
             */
            focus: {
                type: Boolean,
                default: false
            },
            /**
             * 侧拉窗标题
             */
            title: {
                type: String,
                default: '',
                require: true
            },
            /**
             * 是否固定底部操作栏
             */
            bottom: {
                type: Boolean,
                default: false
            },
            // 加载更多
            loadingMore: {
                type: Boolean,
                default: false
            }
        },
        data() {
            return {
                autoClose: false, // 是否拾取焦点就关闭
                scrollTop: 0 // 滚动条的位置
            }
        },
        watch: {
            // 监听focus改变
            focus(n) {
                this.autoClose=n;
            },
            // 监听抽屉显示
            show(n) {
                if (n) {
                    this.$nextTick(() => {
                        this.$refs.drawerBox.focus();
                    })
                }
            }
        },
        created() {
            this.autoClose=this.focus;
        },
        methods: {
            // 鼠标移入
            drawerEnter() {
                if (this.focus) this.autoClose=false;
            },
            // 鼠标移出
            drawerLeave(e) {
                if (this.focus) {
                    this.autoClose=true;
                    e.target.focus();
                }
            },
            // 失去焦点
            drawerBlur() {
                if (this.focus && this.autoClose) this.onClose();
            },
            /**
             * 关闭侧拉窗
             */
            onClose() {
                this.$emit('close', false);
            },
            // 监听页面触底
            contentScroll(e) {
                if (this.loadingMore) return;
                this.$nextTick(() => {
                    const target=e.target;
                    const {scrollTop, scrollHeight}=target;
                    const h=target.getBoundingClientRect().height;
                    if (scrollTop+h === scrollHeight) {
                        // 触底了
                        this.$emit('getMore')
                    }
                })
            }
        }
    }
</script>

<style lang="stylus">
    @import "../static/stylus/animate/slideRightLeft.styl"

    .p-drawer
        outline none
        position fixed
        right 0
        top 48px
        background-color $white
        box-shadow $box-shadow-bottom
        min-width 304px
        max-width 680px
        height calc(100% - 48px)
        font-size 0
        z-index 899
    .p-drawer-title
        position relative
        padding-left 32px
        padding-right 32px
        border-bottom 1px solid $grey-300
        width 100%
        height 56px
        line-height @height
        .p-drawer-title-text
            max-width calc(100% - 16px)
            color $grey-900
            font-size 16px
            font-weight 500
            overflow hidden
            text-overflow ellipsis
            white-space nowrap
        .p-drawer-title-icon
            position absolute
            top 8px
            right 28px
            display inline-block
            width 16px
            height 16px
            svg
                cursor pointer
                &:hover
                    path
                        fill $blue-500
                        transition fill .3s
    .p-drawer-content
        padding 16px 32px
        width 100%
        height calc(100% - 56px)
        overflow auto
        .p-drawer-content-loading
            padding 16px
            width 100%
            text-align center
            svg
                width 16px
                vertical-align middle
            span
                vertical-align middle
                color $grey-600
                font-size 14px
    .p-drawer-content-bottom
        height calc(100% - 128px)
    .p-drawer-handle
        padding 20px 32px
        background-color $white
        width 100%
    .p-drawer-handle-bottom
        position absolute
        right 0
        bottom 0
        box-shadow $box-shadow-top

</style>
