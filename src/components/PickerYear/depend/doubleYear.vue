<template>
    <div :class="['p-picker-child-select-box', 'p-picker-child-select-box-'+borderLeft]">
        <div class="p-picker-child-select-box-title">
            <section class="p-picker-child-select-box-icon">
                <article
                        class="p-picker-child-select-box-icon-svg p-picker-child-select-box-icon-svg-left"
                        @click="prevYear"
                        v-if="!disableYearLeft"
                >
                    <ArrowRightDoubleSvg />
                </article>
            </section>
            <section class="p-picker-child-select-box-title-text">
                <article>{{yearActive}}</article>
            </section>
            <section class="p-picker-child-select-box-icon">
                <article
                        class="p-picker-child-select-box-icon-svg"
                        @click="nextYear"
                        v-if="!disableYearRight"
                >
                    <ArrowRightDoubleSvg />
                </article>
            </section>
        </div>
        <div class="p-picker-panel-content">
            <div class="p-picker-panel-select">
                <ul>
                    <li
                            :class="[
                                'p-picker-panel-text',
                                yearNow===ya.year&&'p-picker-panel-text-current',
                                'p-picker-panel-text-'+ya.multiple,
                                'p-picker-panel-text-'+ya.selected
                             ]"
                            v-for="(ya, yai) in yearsArray"
                            :key="'year-'+ya.year+yai"
                            @click="yearClick(ya)"
                            @mouseenter="yearEnter(ya)"
                    >
                        <span>{{ya.year}}</span>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
    import ArrowRightDoubleSvg from '../../static/iconSvg/arrow_right_double.svg';

    export default {
        name: "DoubleYear",
        components: { ArrowRightDoubleSvg },
        props: {
            // 左边框
            borderLeft: {
                type: String,
                default: ''
            },

            /**
             * 日期
             */
            yearNow: {
                type: String,
                default: ''
            },
            yearActive: {
                type: String,
                default: ''
            },

            /**
             * 年列表
             */
            yearsArray: {
                type: Array,
                default: () => []
            },

            /**
             * 禁用左箭头-年
             */
            disableYearLeft: {
                type: Boolean,
                default: false
            },
            /**
             * 禁用右箭头-年
             */
            disableYearRight: {
                type: Boolean,
                default: false
            },
        },
        methods: {
            /**
             * 上一年
             */
            prevYear() {
                this.$emit('prevYear')
            },
            /**
             * 下一年
             */
            nextYear() {
                this.$emit('nextYear')
            },
            /**
             * 点击日
             * @param obj
             */
            yearClick({year}) {
                this.$emit('change', year);
            },
            /**
             * 鼠标在day面板上移动
             * @param obj {year}
             */
            yearEnter({year}) {
                this.$emit('yearEnter', year);
            }
        }
    }
</script>

<style lang="stylus">

    @import "../../static/stylus/datePicker/pickerChild.styl"
    @import "../../static/stylus/datePicker/pickerPanelYearAndMonth.styl"

    .p-picker-child-select-box-title
        display flex
        justify-content space-between
        align-items center
        padding-left 16px
        padding-right 16px
        .p-picker-child-select-box-icon
            display flex
            align-items center
            width 68px
            &:nth-of-type(1)
                justify-content flex-start
            &:nth-of-type(3)
                justify-content flex-end
            .p-picker-child-select-box-icon-svg
                padding-top 3px
                width 28px
                height @width
                line-height @width
                text-align center
                cursor pointer
                &:hover
                    svg
                        path
                            transition fill .5s
                            fill $blue-500
            .p-picker-child-select-box-icon-svg-left
                transform rotate(-180deg)
    .p-picker-child-title
        display flex
        align-items center
        margin-top 12px
        margin-bottom 8px
        padding-left 16px
        .p-picker-child-title-item
            margin-right 16px
            width 24px
            height 24px
            line-height @height
            color $grey-500
            font-size 14px
            text-align center
            user-select none

</style>