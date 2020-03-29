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
                    >
                        <span>{{ya.year}}</span>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
    import CountYear from '../../static/utils/datePicker/CountYear';
    import ArrowRightDoubleSvg from '../../static/iconSvg/arrow_right_double.svg';

    export default {
        name: "SingleYear",
        components: { ArrowRightDoubleSvg },
        props: {
            // 左边框
            borderLeft: {
                type: String,
                default: ''
            },

            /**
             * 传入的日期
             */
            date: {
                type: String,
                default: ''
            }
        },
        data() {
            return {
                yearNow: '', // 当前日期
                yearActive: '', // 活动的日期
                yearSelected: '', // 选择的年
                yearsArray: [], // 年列表
                disableYearLeft: false, // 禁用左箭头-年
                disableYearRight: false // 禁用右箭头-年
            }
        },
        watch: {
            date(n, o) {
                if (n === o) return;
                if (this.yearsArray.some(d => d.year === n)) {
                    this.changeYearsArray(n);
                } else {
                    this.init(n);
                }
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
                this.countYear=new CountYear(date); // 当前计算年的对象
                this.yearNow=this.countYear.countNowYear(); // 获取当前年
                this.yearsArray=this.countYear.getYearsArray();

                this.setDate(date);
            },
            /**
             * 设置选择的年月日
             * @param date String 2019.10.31
             */
            setDate(date) {
                this.setYearActive(this.yearsArray);
                this.changeYearsArray(date);
            },
            /**
             * 改变选中状态
             * @param year
             */
            changeYearsArray(year) {
                this.yearSelected=year;
                const yearsArray=this.yearsArray;
                this.yearsArray=yearsArray.map(d => {
                    if (d.year===year) d.selected='selected';
                    else d.selected='';
                    return d;
                })
            },
            /**
             * 设置yearActive
             */
            setYearActive(arr) {
                const ly=arr[0].year, ry=arr[arr.length-1].year;
                this.yearActive=ly+'年'+' - '+ry+'年';
            },
            /**
             * 切换日期
             * @param date String '2019'
             */
            switchDate(date) {
                this.countYear=new CountYear(date); // 当前计算年的对象
                this.yearsArray=this.countYear.getYearsArray().map(d => {
                    if (d.year===this.yearSelected) d.selected='selected';
                    return d;
                });
                this.setYearActive(this.yearsArray);

                this.$emit('panelYearDisableArrow');
            },
            /**
             * 上一组年
             */
            prevYear() {
                const date=(this.yearsArray.shift().year-1).toString();
                this.switchDate(date);
            },
            /**
             * 下一组年
             */
            nextYear() {
                const date=(parseInt(this.yearsArray.pop().year)+12).toString();
                this.switchDate(date);
            },
            /**
             * 点击年
             * @param obj
             */
            yearClick({year}) {
                this.changeYearsArray(year);
                this.$emit('change', year);
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

</style>