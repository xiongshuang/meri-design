<template>
    <div class="p-picker-child" ref="pPickerChild">
        <div
            :class="[
                'p-picker-input', format?'p-picker-input-double-max':'p-picker-input-double',
                quickSwitch?'p-picker-input-triangle':'p-picker-input-normal'
                ]"
            @mouseover="pickerClearShow"
            @mouseleave="pickerClearHide"
            @click="pickerBoxShow"
        >
            <i
                    v-if="quickSwitch"
                    :class="['p-picker-triangle', 'p-picker-triangle-left', (!selectedDate || disableQuickSortLeft)&&'p-picker-triangle-disabled']"
                    @click.stop="quickSort('left')"
            ><TrianglePickerLeft /></i>
            <section
                    :class="['p-picker-input-double-tip', selectedDate?'p-picker-input-values':'p-picker-input-tip']"
            >
                <article class="p-picker-input-tip-values p-picker-ellipsis"
                         @mouseenter="pickerEllipsis"
                >{{(tabKey==='week'&&thTextSelectedStart)?thTextSelectedStart:(selectedDateStart?selectedDateStart:'开始日期')}}</article>
                <article :class="['p-picker-input-tip-to', (tabKey==='day'&&selectedDateStart&&format&&timeStart)&&'p-picker-left-box-shadow']">至</article>
                <article class="p-picker-input-tip-values p-picker-ellipsis"
                         @mouseenter="pickerEllipsis"
                >{{(tabKey==='week'&&thTextSelectedEnd)?thTextSelectedEnd:(selectedDateEnd?selectedDateEnd:'结束日期')}}</article>
            </section>
            <section v-if="!quickSwitch" :class="['p-picker-svg-box', (tabKey==='day'&&selectedDateEnd&&format&&timeEnd)&&'p-picker-left-box-shadow']">
                <ClearSvg class="p-picker-clear-svg" v-if="clearStatus" @click.stop="clearTime" />
                <CalendarSvg v-else />
            </section>
            <i v-if="quickSwitch"
               :class="[
                   'p-picker-triangle', 'p-picker-triangle-right', (selectedDate&&format)&&'p-picker-left-box-shadow',
                    (!selectedDate || disableQuickSortRight)&&'p-picker-triangle-disabled'
               ]"
               @click.stop="quickSort('right')"
            ><TrianglePickerRight /></i>
        </div>
    </div>
</template>

<script>
    import DoubleDrop from './doubleDrop';
    import CountWeek from '../../static/utils/datePicker/CountWeek';
    import DiffTimestamp from '../../static/utils/datePicker/DiffTimestamp';

    import ClearSvg from '../../static/iconSvg/clear2.svg';
    import CalendarSvg from '../../static/iconSvg/calendar.svg';
    import TrianglePickerLeft from '../../static/iconSvg/triangle_picker_left.svg';
    import TrianglePickerRight from '../../static/iconSvg/triangle_picker_right.svg';
    import CountBeforeOrAfterDay from "../../static/utils/datePicker/CountBeforeOrAfterDay";

    export default {
        name: "PanelDoubleDate",
        components: {
            ClearSvg,
            CalendarSvg,
            TrianglePickerLeft,
            TrianglePickerRight
        },
        props: {
            /**
             * 传入的日期
             */
            date: {
                type: String,
                default: ''
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
        data() {
            return {
                pickerBoxStatus: false, // 显示选择时间框
                clearStatus: false, // 清除按钮

                selectedDate: '', // 选中的时间
                selectedDateStart: '', // 选中的时间-s
                selectedDateEnd: '', // 选中的时间-e

                timeStart: '', // 时分|时分秒
                timeEnd: '', // 时分|时分秒

                thTextSelectedStart: '', // 选择的第几周 String
                thTextSelectedEnd: '', // 选择的第几周 String

                disableQuickSortLeft: false, // 禁用左箭头
                disableQuickSortRight: false, // 禁用右箭头

                tabKey: 'day' // 日周月年切换显示
            }
        },
        created() {
            // 初始化日期对象
            const picker=this.picker;
            if (picker) this.tabKey=picker;
            this.formatSelectDate(this.date);
        },
        mounted() {
            window.addEventListener('mousewheel', this.listenScroll, false)
        },
        methods: {
            // 文字超出显示省略号
            pickerEllipsis(e) {
                // if (!this.format) return;
                const target=e.target;
                const {clientWidth, scrollWidth}=target;
                if (scrollWidth > clientWidth) target.title=target.innerText;
            },
            // 格式化时间
            formatSelectDate(date) {
                if (!date) return;
                this.selectedDate=date;
                if (date && this.quickSwitch) this.setDisableQuickSort(date);
                if (date.includes('-')) {
                    const [S, E]=date.split('-');
                    if (this.picker === 'week') {
                        this.weekInitEnd(this.dateFormat(S), this.dateFormat(E));
                    } else {
                        this.selectedDateStart=S;
                        this.selectedDateEnd=E;
                    }
                    if (S.includes(':')) this.timeStart=S.split(' ')[1];
                    if (E.includes(':')) this.timeEnd=E.split(' ')[1];
                }
            },

            /**
             * 判断是否有时分秒
             * @param date String '2019.09.30 08:09:10'
             */
            dateFormat(date) {
                let D=date;
                if (date.includes(':')) {
                    const [d]=date.split(' ');
                    D=d;
                }

                return D
            },

            // 获取结束周
            weekInitEnd(dateStart, dateEnd) {
                const countWeek=new CountWeek({date: dateEnd, sort: this.sort});
                const weeksArrayEnd=countWeek.getWeeksArray();

                this.setWeekEnd(dateStart, dateEnd, weeksArrayEnd);
            },
            // 获取开始周
            weekInitStart(dateStart) {
                const countWeek=new CountWeek({date: dateStart, sort: this.sort});
                const weeksArrayStart=countWeek.getWeeksArray();

                this.setWeekStart(dateStart, weeksArrayStart);
            },

            /**
             * 设置开始周
             * @param dateStart 开始时间
             * @param dateEnd 结束时间
             * @param wa 周列表
             */
            setWeekEnd(dateStart, dateEnd, wa) {
                const [YS, MS, DS]=dateStart.split('.'), [YE, ME, DE]=dateEnd.split('.');

                // 结束时间
                const obj=wa.find(d => d.weeks.some(d2 => d2.year===YE && d2.month===ME && d2.day===DE));
                if (obj && obj.hasOwnProperty('weeks')) this.thTextSelectedEnd=obj.thText;
                else return;

                if (YS===YE && MS===ME) { // 开始结束在同一月
                    // 开始时间
                    const obj=wa.find(d => d.weeks.some(d2 => d2.year===YS && d2.month===MS && d2.day===DS));
                    if (obj && obj.hasOwnProperty('weeks')) this.thTextSelectedStart=obj.thText;
                } else {
                    this.weekInitStart(dateStart);
                }
            },
            /**
             * 设置开始周
             * @param dateStart 开始时间
             * @param wa 周列表
             */
            setWeekStart(dateStart, wa) {
                const [YS, MS, DS]=dateStart.split('.');

                const obj=wa.find(d => d.weeks.some(d2 => d2.year===YS && d2.month===MS && d2.day===DS));
                if (obj && obj.hasOwnProperty('weeks')) this.thTextSelectedStart=obj.thText;
            },
            /**
             * 显示清除按钮
             */
            pickerClearShow() {
                if (this.selectedDate) this.clearStatus=true;
            },
            /**
             * 隐藏清除按钮
             */
            pickerClearHide() {
                this.clearStatus=false;
            },
            /**
             * 清除时间
             */
            clearTime() {
                this.selectedDate='';
                this.selectedDateStart='';
                this.selectedDateEnd='';
                this.thTextSelectedStart='';
                this.thTextSelectedEnd='';

                if (this.doubleDrop) {
                    this.doubleDrop.clearTime();
                } else {
                    this.$emit('change', '');
                }
                this.pickerClearHide();
            },

            // 初始化日期选择box
            initPicker() {
                this.doubleDrop=DoubleDrop({
                    tag: this.$refs.pPickerChild,
                    props: {
                        date: this.date,
                        format: this.format,
                        sort: this.sort,
                        quickSwitch: this.quickSwitch,
                        picker: this.picker,
                        scope: this.scope
                    },
                    param: {
                        parent: this,
                        tabKey: this.tabKey
                    },
                    methods: {
                        pickerEllipsis: this.pickerEllipsis
                    }
                }).$on('change', (obj) => {
                    // 注意接收顺序不能变
                    const [
                        selectedDate, selectedDateStart, selectedDateEnd,
                        timeStart, timeEnd,
                        thTextSelectedStart, thTextSelectedEnd
                    ]=obj;
                    this.selectedDate=selectedDate;
                    this.selectedDateStart=selectedDateStart;
                    this.selectedDateEnd=selectedDateEnd;
                    this.timeStart=timeStart;
                    this.timeEnd=timeEnd;

                    this.thTextSelectedStart=thTextSelectedStart;
                    this.thTextSelectedEnd=thTextSelectedEnd;

                    this.setDisableQuickSort(selectedDate);
                    this.$emit('change', selectedDate);
                    this.setPickerBoxStatus(false);
                }).$on('tabKeyChange', tabKey => this.tabKey=tabKey);
            },
            // 设置禁用
            setDisableQuickSort(date) {
                if (!date) return;
                const scope=this.scope;
                if (scope) {
                    let start, end;
                    const [S, E]=date.split('-');
                    start=S;end=E;
                    if (date.includes(':')) {
                        start=S.split(' ')[0];
                        end=E.split(' ')[0];
                    }
                    const [ys, ms, ds]=start.split('.'), [ye, me, de]=end.split('.');
                    // 选择的时间段差值
                    const diff=DiffTimestamp(start, end);
                    const [s, e]=scope.split('-');
                    const [yl, ml, dl]=s.split('.');
                    const [yr, mr, dr]=e.split('.');
                    // 向左切换的差值
                    const [y1, m1, d1]=CountBeforeOrAfterDay(ys, ms, ds, -1);
                    const diffLeft=DiffTimestamp([yl, ml, dl], [y1, m1, d1]);
                    // 向右切换的差值
                    const [y2, m2, d2]=CountBeforeOrAfterDay(ye, me, de, 1);
                    const diffRight=DiffTimestamp([y2, m2, d2], [yr, mr, dr]);
                    this.disableQuickSortLeft=diffLeft<=diff;
                    this.disableQuickSortRight=diffRight<=diff;
                }
            },
            /**
             * 打开时间选择盒子
             */
            pickerBoxShow() {
                if (this.doubleDrop) {
                    if (this.pickerBoxStatus) {
                        this.setPickerBoxStatus(false);
                        return;
                    }
                    this.setPickerBoxStatus(true);
                    DoubleDrop.resetPosition(this.doubleDrop);
                } else {
                    this.initPicker();

                    this.doubleDrop.$nextTick(() => {
                        this.setPickerBoxStatus(true)
                    });
                }
            },
            // 设置下拉状态
            setPickerBoxStatus(status) {
                this.pickerBoxStatus=status;
                if (this.doubleDrop) this.doubleDrop.pickerBoxStatus=status;
            },

            // 快速选择 flag可选值【left，right】
            quickSort(flag) {
                if (!this.selectedDate) return;
                if (!this.doubleDrop) this.initPicker();
                if (flag==='left' && this.disableQuickSortLeft) return;
                if (flag==='right' && this.disableQuickSortRight) return;
                this.doubleDrop.quickSort(flag);
            },

            // 监听页面滚动
            listenScroll() {
                this.setPickerBoxStatus(false);
            }
        },
        beforeDestroy() {
            // 销毁实例
            if (this.doubleDrop) DoubleDrop.remove(this.doubleDrop);
            window.removeEventListener('mousewheel', this.listenScroll)
        }
    }
</script>
