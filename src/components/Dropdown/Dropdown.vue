<template>
    <div class="p-drop" ref="pDrop" @mouseenter="dropEnter">
        <section class="p-drop-title">
            <article class="p-drop-title-content">
                <!-- @slot html内容 -->
                <slot />
            </article>
            <article :class="['p-drop-triangle', !optionStatus && 'p-drop-triangle-rotate']"><Triangle /></article>
        </section>
    </div>
</template>

<script>
    import Triangle from '../static/iconSvg/triangle.svg';

    import DropOption from './depend/dropOption';

    export default {
        name: "Dropdown",
        components: { Triangle },
        props: {
            /**
             * 数据列表
             */
            data: {
                type: Array,
                default: () => [],
                require: true
            },
            /**
             * 绑定的v-model值
             */
            value: {
                type: [String, Number],
                default: ''
            },
            /**
             * 下拉菜单位置，可选值【left， right】
             */
            position: {
                type: String,
                default: 'left'
            },
            // 基于哪个父容器定位，可选值body、parent父级、p-modal-content当前触发器的某个class类名
            transfer: {
                type: String,
                default: 'parent'
            }
        },
        data() {
            return {
                /**
                 * 三角形状态
                 */
                optionStatus: false
            }
        },
        watch: {
            value(n, o) {
                if (n === o) return;
                if (this.dOption) this.dOption.value=n;
            },
            data(n, o) {
                if (n === o) return;
                if (this.dOption) this.dOption.data=n;
            }
        },
        mounted() {
            window.addEventListener('mousewheel', this.listenScroll, false)
        },
        methods: {
            dropEnter() {
                if (this.dOption) {
                    this.setDropdownStatus(true);
                } else {
                    // 初始化实例
                    this.dOption=DropOption({
                        tag: this.$refs.pDrop,
                        param: {
                            parent: this,
                            value: this.value,
                            data: this.data
                        }
                    }).$on('change', (id) => {
                        this.optionClick(id);
                    });

                    this.dOption.$nextTick(() => {
                        this.setDropdownStatus(true);
                    });
                }
            },
            // 设置下拉状态
            setDropdownStatus(status) {
                this.optionStatus=status;
                if (this.dOption) {
                    this.dOption.optionStatus=status;
                    if (status) DropOption.resetPosition(this.dOption);
                }
            },
            /**
             * 提交当前选择的值
             * @param id 返回值
             */
            optionClick(id) {
                this.$emit('input', id);
                this.setDropdownStatus(false);
            },
            // 监听页面滚动
            listenScroll() {
                this.setDropdownStatus(false);
            }
        },
        beforeDestroy() {
            // 组件销毁前重置状态表
            this.setDropdownStatus(false);
            if (this.dOption) DropOption.remove(this.dOption)
            window.removeEventListener('mousewheel', this.listenScroll)
        }
    }
</script>

<style lang="stylus">

@import "../static/stylus/animate/selectDownUpExtend.styl"

.p-drop
    position relative
    display inline-block
    vertical-align middle
    font-size 0
    text-align left
    .p-drop-title
        position relative
        padding-right 16px
        cursor pointer
        z-index 10
        .p-drop-title-content
            font-size 14px
            color $grey-900
        .p-drop-triangle
            position absolute
            right 0
            top 50%
            display inline-block
            width 16px
            height 16px
            transform translateY(-8px)
            svg
                transition transform .3s
        .p-drop-triangle-rotate
            svg
                transform rotate(180deg)
.p-drop-option
    position absolute
    outline none
    padding-top 4px
    padding-bottom 4px
    background-color $white
    border 1px solid $grey-300
    border-radius 4px
    box-shadow $box-shadow-bottom
    min-width 120px
    max-width 240px
    max-height 138px
    overflow-y auto
    z-index 1000
    .p-drop-option-item
        padding-left 12px
        padding-right 12px
        width 100%
        height 32px
        font-size 14px
        color $grey-900
        cursor pointer
        white-space nowrap
        text-overflow ellipsis
        overflow hidden
        .p-drop-option-svg
            margin-right 8px
            svg
                vertical-align middle
        span
            vertical-align middle
            line-height 32px
        &:hover
            background-color $grey-200
        &.option-selected
            color $blue-500
            background-color $blue-100
            .p-drop-option-svg
                svg
                    path
                        fill $blue-500
        &.p-drop-option-disable
            color $grey-400
            cursor not-allowed

</style>
