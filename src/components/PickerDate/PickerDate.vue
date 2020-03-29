<template>
    <div class="p-picker">
        <PanelDoubleDate
                v-if="range"
                :date="date"
                :format="format"
                :sort="sort"
                :quickSwitch="quickSwitch"
                :picker="picker"
                :scope="scope"
                @change="changeDate"
        />
        <PanelSingleDate
                v-else
                :date="date"
                :format="format"
                :sort="sort"
                :quickSwitch="quickSwitch"
                :picker="picker"
                :scope="scope"
                @change="changeDate"
        />
    </div>
</template>

<script>
    import PanelSingleDate from './depend/panelSingleDate';
    import PanelDoubleDate from './depend/panelDoubleDate';

    export default {
        name: "PickerDate",
        components: { PanelSingleDate, PanelDoubleDate },
        props: {
            /**
             * 设置时间
             */
            date: {
                type: String,
                default: ''
            },
            /**
             * 时间段
             * @value 【false-时间点（默认值），true-时间段】
             */
            range: {
                type: Boolean,
                default: false
            },
            // 是否显示时分秒 可选值[hms, hm]
            format: {
                type: String,
                default: ''
            },

            // weeks-按照年or周排序 【year、month】
            sort: {
                type: String,
                default: 'year'
            },
            // 快速切换时间
            quickSwitch: {
                type: Boolean,
                default: false
            },
            // 快速切换时间 可选值 [day, week, month, year]
            picker: {
                type: String,
                default: ''
            },
            // 可选范围 - 2020.01.12-2029.12.01
            scope: {
                type: String,
                default: ''
            }
        },
        methods: {
            /**
             * 点击日期
             * @param date String
             */
            changeDate(date) {
                this.$emit('change', date)
            }
        }
    }
</script>

<style lang="stylus">
    @import "../static/stylus/datePicker/pickerInput.styl"
    @import "../static/stylus/datePicker/pickerMain.styl"
    @import "../static/stylus/datePicker/pickerPanelYearAndMonth.styl"

    .p-picker-main-item-time-date
        margin-top 22px
        margin-bottom 22px

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
                > svg
                    width 16px
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
            &:nth-of-type(7n)
                margin-right 0

    @import "../static/stylus/animate/selectDownUpExtend.styl"

    .p-picker-box-content
        padding 8px 15px
        width 100%
        height 208px
        .p-picker-day-select
            height 192px

</style>