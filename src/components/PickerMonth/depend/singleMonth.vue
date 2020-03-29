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
                <article class="p-picker-active-title" @click="yearActiveClick">{{yearActive}}年</article>
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
                                (yearNow===ma.year&&monthNow===ma.month)&&'p-picker-panel-text-current',
                                'p-picker-panel-text-'+ma.multiple,
                                'p-picker-panel-text-'+ma.selected,
                                'p-picker-panel-text-'+ma.disabled
                             ]"
                            v-for="(ma, mai) in monthsArray"
                            :key="'month-'+ma.month+mai"
                            @click="monthClick(ma)"
                    >
                        <span>{{ma.monthText}}</span>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
    import CountMonth from '../../static/utils/datePicker/CountMonth';
    import ArrowRightDoubleSvg from '../../static/iconSvg/arrow_right_double.svg';

    export default {
        name: "SingleMonth",
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
            date: {
                type: String,
                default: ''
            }
        },
        data() {
            return {
                yearNow: '', // 当前年
                monthNow: '', // 当前月
                yearActive: '', // 活动的年
                monthActive: '', // 活动的月
                yearSelected: '', // 选中的年
                monthSelected: '', // 选中的月
                monthsArray: [], // 月列表
                disableYearLeft: false, // 禁用左箭头-月
                disableYearRight: false // 禁用右箭头-月
            }
        },
        watch: {
            date(n, o) {
                if (n === o) return;
                let year='', month='';
                if (n && n.includes('.')) {
                    const [y, m]=n.split('.');
                    year=y;
                    month=m;
                    this.yearSelected=y;
                    this.monthSelected=m;
                }
                this.changeMonthsArray({year, month});
            }
        },
        created() {
            // 初始化日期对象
            this.init(this.date);
        },
        methods: {
            /**
             * 初始化日期对象
             */
            init(date) {
                const countMonth=new CountMonth(date);
                this.monthsArray=countMonth.getMonthsArray();
                const [year, month]=countMonth.countNowMonth();
                this.yearNow=year;
                this.monthNow=month;

                this.setDate(date);
            },
            /**
             * 设置选择的年月日
             * @param date String 2019.10.31
             */
            setDate(date) {
                this.selectedDate=date;
                if (date) {
                    const [year, m]=date.split('.');
                    const month=m?m:'';
                    this.yearSelected=year;
                    this.monthSelected=month;
                    this.yearActive=year;
                    this.monthActive=month;
                    this.changeMonthsArray({year, month});
                } else {
                    this.yearActive=this.yearNow;
                    this.monthActive=this.monthNow;
                    this.changeMonthsArray({year: '', month: ''});
                }
            },
            /**
             * 改变选中状态
             * @param year
             * @param month
             */
            changeMonthsArray({year, month}) {
                this.yearSelected=year;
                this.monthSelected=month;
                this.monthsArray=this.monthsArray.map(d => {
                    if (d.year===year && d.month===month) d.selected='selected';
                    else d.selected='';
                    return d;
                })
            },
            /**
             * 设置禁用
             * @param month
             */
            setMonthsArrayRightDisable(month) {
                this.monthsArray=this.monthsArray.map(d => {
                    if (month && d.month >= month) d.disabled='disabled';
                    else d.disabled='';
                    return d;
                })
            },
            setMonthsArrayLeftDisable(month) {
                this.monthsArray=this.monthsArray.map(d => {
                    if (month && d.month <= month) d.disabled='disabled';
                    else d.disabled='';
                    return d;
                })
            },
            /**
             * 切换日期
             * @param year String '2019'
             */
            switchDate(year) {
                this.yearActive=year;
                let date=`${year}.01`;
                if (this.date && this.date.includes('.')) {
                    const month=this.date.substr(5);
                    date=`${year}.${month}`;
                }
                const countMonth=new CountMonth(date);
                this.monthsArray=countMonth.getMonthsArray().map(d => {
                    if (d.year===this.yearSelected && d.month===this.monthSelected) d.selected='selected';
                    return d;
                });
            },
            /**
             * 上一组月
             */
            prevYear() {
                const date=(this.yearActive-1).toString();
                this.$emit('changeYearsArrayHandle', date);
                this.switchDate(date);
            },
            /**
             * 下一组月
             */
            nextYear() {
                const date=(parseInt(this.yearActive)+1).toString();
                this.$emit('changeYearsArrayHandle', date);
                this.switchDate(date);
            },
            /**
             * 点击月
             * @param obj
             */
            monthClick(obj) {
                if (obj.disabled) return;
                this.changeMonthsArray(obj);
                this.$emit('change', obj);
            },
            // 点击active的年，去选择active的年
            yearActiveClick() {
                this.$emit('panelYearHandle', true);
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