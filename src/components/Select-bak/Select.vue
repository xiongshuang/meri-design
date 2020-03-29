<template>
    <div
            ref="pSelect"
            :class="['p-select', 'p-select-'+size]"
            :style="{width: width+'px'}" tabindex="-1"
            @blur="selectBlur"
    >
        <section
                :class="['p-select-title', radius&&'p-select-title-radius']"
                @click="selectBoxHandle"
        >
            <article class="p-select-title-text"><span v-if="title" style="width: 32%">{{title}}</span><span :style="{width: title?'62%':'90%'}">{{text}}</span></article>
            <section :class="['p-select-triangle', !optionStatus && 'p-select-triangle-rotate']"><Triangle /></section>
        </section>
    </div>
</template>

<script>
    import Triangle from '../static/iconSvg/triangle.svg';
    import Options from './options';

    export default {
        name: "Select",
        components: { Triangle },
        props: {
            /**
             * 绑定的v-model值
             */
            value: {
                type: String,
                default: ''
            },
            /**
             * 下拉列表数据
             */
            data: {
                type: Array,
                default: () => []
            },
            /**
             * 下拉列表宽度
             */
            title: {
                type: String,
                default: ''
            },
            /**
             * 下拉列表宽度
             */
            width: {
                type: [String, Number],
                default: '88'
            },
            /**
             * 圆角
             */
            radius: {
                type: Boolean,
                default: false
            },
            /**
             * 输入框尺寸
             */
            size: {
                type: String,
                default: 'large' // 可选值 large small
            }
        },
        data() {
            return {
                text: '',
                optionStatus: false
            }
        },
        created() {
            this.titleFormat(this.value)
        },
        watch: {
            value(n, o) {
                if (n === o) return;
                this.titleFormat(n);
                if (this.options) this.options.value=n;
            }
        },
        methods: {
            // 设置title
            titleFormat(v) {
                if (v) this.text=this.data.find(d => d.id === v).name;
            },
            // 打开下拉选择盒子
            selectBoxHandle() {
                // this.options ---> 表示当前实例
                if (this.options) {
                    this.options.optionStatus=!this.options.optionStatus;
                } else {
                    const data=this.data, value=this.value;
                    // 初始化实例
                    this.options=Options({
                        tag: this.$refs.pSelect, param: {data, value}
                    }).$on('change', (id) => {
                        // 监听自定义事件
                        this.optionClick(id);
                    });
                    // 注意：监听dom挂载并更新完成，需如下写
                    this.options.$nextTick(() => {
                        this.options.optionStatus=true;
                    })
                }
            },
            // 提交当前选择的值
            optionClick(id) {
                this.titleFormat(id);
                /**
                 * 提交绑定的值
                 */
                this.$emit('input', id);
                this.selectBlur();
            },
            selectBlur() {
                this.options.optionStatus=false;
            }
        }
    }
</script>

<style lang="stylus">

    @import "../static/stylus/animate/selectDownUpExtend.styl"

    .p-select
        outline none
        position relative
        display inline-block
        vertical-align middle
        &:hover
            .p-select-title
                border-color $blue-500
        &:focus
            .p-select-title
                border-color $blue-500
                box-shadow $box-shadow-blue
        .p-select-title
            position relative
            padding-left 12px
            padding-right 12px
            background-color $white
            border 1px solid $grey-400
            border-radius 4px
            width 100%
            text-align left
            cursor pointer
            z-index 10
            .p-select-title-text
                width 100%
                color $grey-900
                span
                    display inline-block
                    width 100%
                    font-size 14px
                    overflow hidden
                    text-overflow ellipsis
                    white-space nowrap
            .p-select-triangle
                position absolute
                top 0
                right 0
                display flex
                align-items center
                justify-content center
                text-align center
                transition transform .3s
            .p-select-triangle-rotate
                transform rotate(180deg)
        .p-select-title-radius
            border-radius 16px
    .p-select-option-box
        position absolute
        display inline-block
        margin-top 8px
        background-color $white
        border 1px solid $grey-300
        border-radius 4px
        box-shadow $box-shadow-bottom
        width 240px
        max-height 184px
        overflow-y auto
        z-index 11
    .p-select-large
        .p-select-title
            height 32px
            line-height @height
            .p-select-triangle
                width 32px
                height @width
    .p-select-small
        .p-select-title
            height 28px
            line-height @height
            .p-select-triangle
                width 28px
                height @width

</style>
