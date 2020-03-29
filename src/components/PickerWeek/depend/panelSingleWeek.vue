<template>
    <div class="p-picker-child">
        <div
                :class="[
                    'p-picker-input', 'p-picker-input-trigger', 'p-picker-input-single',
                    quickSwitch?'p-picker-input-triangle':'p-picker-input-normal'
                ]"
                @mouseenter="pickerClearShow"
                @mouseleave="pickerClearHide"
        >
            <i
                    v-if="quickSwitch"
                    :class="['p-picker-triangle', 'p-picker-triangle-left', !selectedDate&&'p-picker-triangle-disabled']"
                    @click="quickSort('left')"
            ><TrianglePickerLeft /></i>
            <section
                    :class="['p-picker-input-tip-single', thTextSelected?'p-picker-input-values':'p-picker-input-tip']"
                    @click="pickerBoxShow"
            >{{thTextSelected?thTextSelected:'选择日期'}}</section>
            <section v-if="!quickSwitch" class="p-picker-svg-box">
                <ClearSvg class="p-picker-clear-svg" v-if="clearStatus" @click.stop="clearTime" />
                <CalendarSvg v-else />
            </section>
            <i v-if="quickSwitch"
               :class="[
                   'p-picker-triangle', 'p-picker-triangle-right',
                    !selectedDate&&'p-picker-triangle-disabled'
               ]"
               @click="quickSort('right')"
            ><TrianglePickerRight /></i>
        </div>
        <transition name="opacityTop">
            <!--
            -->
            <div
                    class="p-picker-main"
                    ref="pickerMain"
                    tabindex="-1"
                    v-show="pickerBoxStatus"
                    @mouseenter="pickerMainBlur"
                    @mouseleave="pickerMainFocus"
                    @blur="pickerBoxHide"
            >
                <div class="p-picker-main-item-box">
                    <div class="p-picker-main-item-input-box">
                        <section class="p-picker-input-alert">
                            <article
                                    :class="[thTextSelected?'p-picker-input-values':'p-picker-input-tip']"
                            >{{thTextSelected?thTextSelected:'请选择日期'}}</article>
                        </section>
                    </div>
                    <div class="p-picker-main-item">
                        <SingleYear
                                ref="singleYear"
                                v-show="panelYear"
                                date=""
                                @change="panelYearChangeDate"
                        />
                        <SingleMonth
                                ref="singleMonth"
                                v-show="panelMonth"
                                date=""
                                @change="panelMonthChangeDate"
                                @panelYearHandle="panelYearHandle"
                        />
                        <WeekSelect
                                v-show="!panelYear&&!panelMonth"
                                :yearNow="yearNow"
                                :yearActive="yearActive"
                                :monthNow="monthNow"
                                :monthActive="monthActive"
                                :weeksArray="weeksArray"
                                @prevYear="prevYear"
                                @nextYear="nextYear"
                                @prevMonth="prevMonth"
                                @nextMonth="nextMonth"
                                @change="changeDate"
                                @panelYearHandle="panelYearHandle"
                                @panelMonthHandle="panelMonthHandle"
                        />
                    </div>
                </div>

                <div class="p-picker-main-handle">
                    <Button :type="btnType" size="small" @click="pickerConfirm">确定</Button>
                </div>
            </div>
        </transition>
    </div>
</template>

<script>
    import CountWeek from '../../static/utils/datePicker/CountWeek';
    import CountBeforeOrAfterDay from '../../static/utils/datePicker/CountBeforeOrAfterDay';

    import SingleYear from '../../PickerYear/depend/singleYear';
    import SingleMonth from '../../PickerMonth/depend/singleMonth';
    import WeekSelect from './week';
    import Button from '../../Button';

    import ClearSvg from '../../static/iconSvg/clear2.svg';
    import CalendarSvg from '../../static/iconSvg/calendar.svg';
    import CountPrevMonth from "../../static/utils/datePicker/CountPrevMonth";
    import CountNextMonth from "../../static/utils/datePicker/CountNextMonth";
    import CountPrevYear from "../../static/utils/datePicker/CountPrevYear";
    import CountNextYear from "../../static/utils/datePicker/CountNextYear";
    import TrianglePickerLeft from '../../static/iconSvg/triangle_picker_left.svg';
    import TrianglePickerRight from '../../static/iconSvg/triangle_picker_right.svg';
    export default {
        name: "panelSingleMonth",
        components: {
            SingleYear,
            SingleMonth,
            WeekSelect,
            Button,
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
            /**
             * 排序规则
             * 可选值【year-按照年排序（默认），month-按照月排序】
             */
            sort: {
                type: String,
                default: 'year'
            },
            // 快速切换时间
            quickSwitch: {
                type: Boolean,
                default: false
            }
        },
        data() {
            return {
                btnType: 'disabled', // 按钮状态
                pickerBoxStatus: false, // 显示选择时间框
                blurStatus: false, // 是否可执行blur
                clearStatus: false, // 关闭按钮
                selectedDate: '', // 选中的时间

                yearNow: '', // 当前年
                monthNow: '', // 当前月

                // 活动的年月
                yearActive: '',
                monthActive: '',

                weeksSelected: [], // 选择的周列表
                yearSelected: '', // 选择的年
                monthSelected: '', // 选择的月
                thTextSelected: '', // 选择的第几周 String

                weeksArray: [], // 周列表
                panelYear: false, // 显示年面板
                panelMonth: false // 显示月面板
            }
        },
        watch: {
            date(n, o) {
                if (n === o) return;
                this.init(n);
            },
            pickerBoxStatus(n) {
                if (n) return;
                this.panelYearHandle(false);
                this.panelMonthHandle(false);
            }
        },
        created() {
            // 初始化日期对象
            this.init(this.date);
        },
        methods: {
            /**
             * 改变按钮状态
             */
            changeBtnType(str) {
                if (str && str.replace(/\./, '')) this.btnType='primary';
                else this.btnType='disabled';
            },
            /**
             * 初始化日期对象
             */
            init(date) {
                const countWeek=new CountWeek({date, sort: this.sort});
                this.weeksArray=countWeek.getWeeksArray();
                this.countWeek=countWeek;
                const [year, month]=countWeek.countNowDate();
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
                this.changeBtnType(date);
                if (date) {
                    const [sd, ed]=date.split('-');
                    if (ed - sd < 6) {
                        // 一周时间必须等于七天
                        console.error('Date error, there must be seven days in a week.');
                        return;
                    }
                    const [year, month]=sd.split('.');
                    const wa=this.weeksArray;

                    this.yearSelected=year;
                    this.monthSelected=month;
                    this.yearActive=year;
                    this.monthActive=month;

                    const {weeks, thText}=wa.find(d => {
                        const dw=d.weeks;
                        const dStr=dw[0].year+'.'+dw[0].month+'.'+dw[0].day+'-'+dw[6].year+'.'+dw[6].month+'.'+dw[6].day;
                        return (dStr === date);
                    });
                    this.weeksSelected=weeks;
                    this.thTextSelected=thText;
                    this.changeWeeksArray(thText);
                } else {
                    this.yearActive=this.yearNow;
                    this.monthActive=this.monthNow;
                }
            },
            /**
             * 改变选中状态
             * @param thText
             */
            changeWeeksArray(thText) {
                this.weeksArray=this.weeksArray.map(d => {
                    if (d.thText===thText) d.selected='selected';
                    else d.selected='';
                    return d;
                })
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
                this.weeksSelected=[];
                this.yearSelected='';
                this.monthSelected='';
                this.thTextSelected='';
                this.$emit('change', {thTextSelected: '', selectedDate: ''});
                this.pickerClearHide();
            },
            // 失去焦点
            pickerMainBlur() {
                this.$nextTick(() => {
                    this.blurStatus=false;
                    this.$refs.pickerMain.blur()
                })
            },
            // 获取焦点
            pickerMainFocus() {
                this.$nextTick(() => {
                    this.blurStatus=true;
                    if (this.$refs.pickerMain) this.$refs.pickerMain.focus()
                })
            },
            /**
             * 打开时间选择盒子
             */
            pickerBoxShow() {
                this.pickerBoxStatus=true;
                // 初始化日期对象
                // this.init(this.date);
            },
            /**
             * 关闭时间选择盒子
             */
            pickerBoxHide() {
                if (this.pickerBoxStatus && this.blurStatus) this.pickerBoxStatus=false;
            },
            /**
             * 切换日期
             * @param Y
             * @param M
             */
            switchDate(Y, M) {
                this.yearActive=Y;
                this.monthActive=M;
                this.countWeek.setYearMonth(Y, M);
                this.weeksArray=this.countWeek.getWeeksArray();
                if (Y === this.yearSelected && M === this.monthSelected) {
                    this.changeWeeksArray(this.thTextSelected);
                }
            },
            /**
             * 上一年
             */
            prevYear() {
                const date=CountPrevYear([this.yearActive, this.monthActive, '01']);
                const [Y, M]=date.split('.');
                this.switchDate(Y, M);
            },
            /**
             * 下一年
             */
            nextYear() {
                const date=CountNextYear([this.yearActive, this.monthActive, '01']);
                const [Y, M]=date.split('.');
                this.switchDate(Y, M);
            },
            /**
             * 上一月
             */
            prevMonth() {
                const date=CountPrevMonth([this.yearActive, this.monthActive, '01']);
                const [Y, M]=date.split('.');
                this.switchDate(Y, M);
            },
            /**
             * 下一月
             */
            nextMonth() {
                const date=CountNextMonth([this.yearActive, this.monthActive, '01']);
                const [Y, M]=date.split('.');
                this.switchDate(Y, M);
            },
            /**
             * 点击日期
             * @param weeks
             * @param year
             * @param month
             * @param thText
             */
            changeDate({weeks, year, month, thText}) {
                this.weeksSelected=weeks;
                this.yearSelected=year;
                this.monthSelected=month;
                this.thTextSelected=thText;
                this.btnType='primary';
                this.changeWeeksArray(thText);
            },
            // 年面板显示切换
            panelYearHandle(status) {
                this.panelYear=status;
                this.panelMonth=false;
            },
            // 月面板显示切换
            panelMonthHandle(status) {
                // 计算月
                const sm=this.$refs.singleMonth;
                if (sm.yearActive !== this.yearActive || sm.monthActive !== this.monthActive) sm.init(this.yearActive+'.'+this.monthActive);
                this.panelMonth=status;
                this.panelYear=false;
            },
            // 点击年
            panelYearChangeDate(year) {
                this.panelYearHandle(false);
                this.yearActive=year;

                this.weeksArray=this.countWeek.yearChangeCountWeek(year, this.monthActive, this.sort);
                this.btnType='disabled';

                // this.weeksArray=weeksArray;
                /*
                修改选中的时间
                if (this.date) {
                    // this.yearSelected=year;
                    if (this.sort === 'year') {
                        const th=Number(this.thTextSelected.substr(5,2));
                        this.weeksArray=weeksArray.map(d => {
                            if (d.th === th) {
                                d.selected='selected';
                                // this.weeksSelected=d.weeks;
                            }
                            return d;
                        });
                        // this.thTextSelected=year+'第'+(th<10?'0'+th:th)+'周';
                    } else {
                        const tht=this.thTextSelected;
                        const m=tht.substr(5,2);
                        const th=Number(tht.substr(8, 2));
                        this.weeksArray=weeksArray.map(d => {
                            if (d.month === m && d.th === th) {
                                d.selected='selected';
                                // this.weeksSelected=d.weeks;
                            }
                            return d;
                        });
                        // this.thTextSelected=year+'.'+m+'第'+(th<10?'0'+th:th)+'周';
                    }
                } else {
                    this.weeksArray=weeksArray;
                }
                */
            },
            // 点击月
            panelMonthChangeDate({year, month}) {
                this.panelMonthHandle(false);
                this.monthActive=month;
                this.weeksArray=this.countWeek.yearChangeCountWeek(year, month, this.sort);
                this.btnType='disabled';
            },

            // 快速选择-设置时间 flat可选值【left，right】
            quickSort(flag) {
                if (!this.selectedDate) return;
                const ws=this.weeksSelected, s=ws[0], e=ws[6];
                const y1=s.year, m1=s.month, d1=s.day, y2=e.year, m2=e.month, d2=e.day;

                let selectedDate;
                if (flag === 'left') {
                    const [ey, em, ed]=CountBeforeOrAfterDay(y1, m1, d1, -1);
                    const [sy, sm, sd]=CountBeforeOrAfterDay(ey, em, ed, -6);
                    const start=sy+'.'+sm+'.'+sd;
                    const end=ey+'.'+em+'.'+ed;
                    selectedDate=start+'-'+end;
                } else {
                    const [sy, sm, sd]=CountBeforeOrAfterDay(y2, m2, d2, 1);
                    const [ey, em, ed]=CountBeforeOrAfterDay(sy, sm, sd, 6);
                    const start=sy+'.'+sm+'.'+sd;
                    const end=ey+'.'+em+'.'+ed;
                    selectedDate=start+'-'+end;
                }

                this.init(selectedDate);
                this.selectedDate=selectedDate;
                this.$emit('change', {thTextSelected: this.thTextSelected, selectedDate});
            },
            /**
             * 确定
             */
            pickerConfirm() {
                const ws=this.weeksSelected, thTextSelected=this.thTextSelected;
                const s=ws[0], e=ws[6];
                const start=s.year+'.'+s.month+'.'+s.day;
                const end=e.year+'.'+e.month+'.'+e.day;
                const selectedDate=start+'-'+end;
                this.selectedDate=selectedDate;
                this.blurStatus=false;
                this.pickerBoxStatus=false;
                /**
                 * 返回选择的日期
                 * @type Function
                 */
                this.$emit('change', {thTextSelected, selectedDate});
            }
        }
    }
</script>
