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
                <article
                        class="p-picker-child-select-box-icon-svg p-picker-child-select-box-icon-svg-left"
                        @click="prevMonth"
                        v-if="!disableMonthLeft"
                >
                    <ArrowRightSvg />
                </article>
            </section>
            <section class="p-picker-child-select-box-title-text">
                <article class="p-picker-active-title" @click="yearActiveClick">{{yearActive}}年</article>
                <article class="p-picker-active-title" @click="monthActiveClick">{{monthActive}}月</article>
            </section>
            <section class="p-picker-child-select-box-icon">
                <article
                        class="p-picker-child-select-box-icon-svg"
                        @click="nextMonth"
                        v-if="!disableMonthRight"
                >
                    <ArrowRightSvg />
                </article>
                <article
                        class="p-picker-child-select-box-icon-svg"
                        @click="nextYear"
                        v-if="!disableYearRight"
                >
                    <ArrowRightDoubleSvg />
                </article>
            </section>
        </div>
        <div class="p-picker-child-title">
            <section
                    class="p-picker-child-title-item"
                    v-for="wt in weekText"
                    :key="'wt-'+wt"
            >{{wt}}</section>
        </div>
        <div class="p-picker-week-content">
            <div class="p-picker-day-select">
                <section
                        :class="[
                            'p-picker-weeks-list',
                            'p-picker-weeks-list-'+weeks.multiple,
                            'p-picker-weeks-list-'+weeks.selected
                        ]"
                        :style="weeks.flag!=='n'&&{pointerEvents: 'none'}"
                        v-for="(weeks, i) in weeksArray" :key="'weeks'+i"
                        @click="weekClick(weeks)"
                        @mouseenter="weekEnter(weeks)"
                >
                    <article class="p-picker-weeks-list-text">
                        第<span>{{weeks.th}}</span>周
                    </article>
                    <article
                            :class="['p-picker-day-text', 'p-picker-day-text-'+ww.flag]"
                            v-for="(ww, wi) in weeks.weeks"
                            :key="'week-'+ww.th+wi"
                    >
                        <span>{{ww.day}}</span>
                    </article>
                </section>
            </div>
        </div>
    </div>
</template>

<script>
    import ArrowRightSvg from '../../static/iconSvg/arrow_right2.svg';
    import ArrowRightDoubleSvg from '../../static/iconSvg/arrow_right_double.svg';

    export default {
        name: "WeekSelect",
        components: { ArrowRightSvg, ArrowRightDoubleSvg },
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
            monthNow: {
                type: String,
                default: ''
            },
            dayNow: {
                type: String,
                default: ''
            },

            yearActive: {
                type: String,
                default: ''
            },
            monthActive: {
                type: String,
                default: ''
            },
            dayActive: {
                type: String,
                default: ''
            },

            yearSelected: {
                type: String,
                default: ''
            },
            monthSelected: {
                type: String,
                default: ''
            },
            daySelected: {
                type: String,
                default: ''
            },

            /**
             * 周列表
             */
            weeksArray: {
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
            /**
             * 禁用左箭头-月
             */
            disableMonthLeft: {
                type: Boolean,
                default: false
            },
            /**
             * 禁用右箭头-月
             */
            disableMonthRight: {
                type: Boolean,
                default: false
            },
            /**
             * 开启多选
             */
            multiple: {
                type: Boolean,
                default: false
            }
        },
        computed: {
            weekText() {
                return ['一', '二', '三', '四', '五', '六', '日']
            }
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
             * 上一月
             */
            prevMonth() {
                this.$emit('prevMonth')
            },
            /**
             * 下一月
             */
            nextMonth() {
                this.$emit('nextMonth')
            },
            /**
             * 点击日
             * @param obj
             */
            weekClick(obj) {
                // if (obj.flag === 'n') this.$emit('change', obj);
                this.$emit('change', obj);
            },
            /**
             * 鼠标在day面板上移动
             * @param obj {flag, year, month, day}
             */
            weekEnter(obj) {
                if (!this.multiple) return;
                this.$emit('weekEnter', obj);
            },
            // 点击active的年，去选择active的年
            yearActiveClick() {
                this.$emit('panelYearHandle', true, true);
            },
            // 点击active的月，去选择active的月
            monthActiveClick() {
                this.$emit('panelMonthHandle', true, true);
            }
        }
    }
</script>

<style lang="stylus">

    @import "../../static/stylus/datePicker/pickerChild.styl"

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
            &:nth-of-type(7n)
                margin-right 0
    .p-picker-week-content
        padding 8px 15px
        width 100%
        height 208px
        .p-picker-day-select
            height 192px
            .p-picker-weeks-list
                position relative
                display flex
                flex-wrap wrap
                margin-bottom 8px
                border-radius 4px
                width 100%
                cursor pointer
                transition background-color .3s
                &:hover
                    background-color $grey-200
                    .p-picker-weeks-list-text
                        top -24px
                        opacity 1
                &.p-picker-weeks-list-multiple
                    background-color $grey-200
                &.p-picker-weeks-list-selected
                    background-color $blue-500
                    .p-picker-day-text
                        span
                            color $white
                .p-picker-weeks-list-text
                    position absolute
                    top -12px
                    left 50%
                    padding-top 4px
                    padding-bottom 4px
                    background-color $white
                    box-shadow $box-shadow-bottom
                    border-radius 4px
                    transform translateX(-36px)
                    opacity 0
                    width 72px
                    text-align center
                    color $grey-900
                    font-size 14px
                    z-index 11
                    transition all .3s
                    user-select none
                    &:after
                        display block
                        position absolute
                        left 50%
                        bottom 0
                        border-style solid
                        border-width 4px
                        width 0
                        height 0
                        border-color $white $white transparent transparent
                        box-shadow $box-shadow-min-bottom
                        transform rotate(135deg) translateX(5.5px)
                        pointer-events none
                        content ''
                    span
                        padding-left 4px
                        padding-right 4px
                        color $blue-500
            .p-picker-day-text
                display flex
                align-items center
                justify-content center
                margin-right 16px
                margin-bottom 0
                border-width 1px
                border-style solid
                border-color transparent
                border-radius 4px
                width 24px
                //height 24px
                text-align center
                transition background-color .3s
                &:nth-of-type(8n)
                    margin-right 0
                span
                    position relative
                    line-height 22px
                    color $grey-900
                    font-size 14px
                    transition color .3s
                    user-select none
                    z-index 10
                &.p-picker-day-text-p,
                &.p-picker-day-text-f
                    span
                        color $grey-400

</style>