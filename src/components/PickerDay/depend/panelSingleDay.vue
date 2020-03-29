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
                    @click="quickLeft"
            ><TrianglePickerLeft /></i>
            <section
                    :class="['p-picker-input-tip-single', selectedDate?'p-picker-input-values':'p-picker-input-tip', 'p-picker-ellipsis']"
                    @click="pickerBoxShow"
                    @mouseover="pickerEllipsis"
            >{{selectedDate?selectedDate:'选择日期'}}</section>
            <section v-if="!quickSwitch" :class="['p-picker-svg-box', (selectedDate&&format==='hms')&&'p-picker-left-box-shadow']">
                <ClearSvg class="p-picker-clear-svg" v-if="clearStatus" @click.stop="clearTime" />
                <CalendarSvg v-else />
            </section>
            <i v-if="quickSwitch"
               :class="[
                   'p-picker-triangle', 'p-picker-triangle-right',
                    (selectedDate&&format==='hms')&&'p-picker-left-box-shadow',
                    !selectedDate&&'p-picker-triangle-disabled'
               ]"
               @click="quickRight"
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
                                    :class="[(yearSelected&&monthSelected&&daySelected)?'p-picker-input-values':'p-picker-input-tip']"
                            >{{(yearSelected&&monthSelected&&daySelected)?`${yearSelected}.${monthSelected}.${daySelected}${format?(' '+time):''}`:'请选择日期'}}</article>
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
                        <DaySelect
                                v-show="!panelYear&&!panelMonth&&!panelTime"
                                :picker="picker"
                                :yearNow="yearNow"
                                :monthNow="monthNow"
                                :dayNow="dayNow"
                                :yearActive="yearActive"
                                :monthActive="monthActive"
                                :dayActive="dayActive"
                                :yearSelected="yearSelected"
                                :monthSelected="monthSelected"
                                :daySelected="daySelected"
                                :daysArray="daysArray"
                                @prevYear="prevYear"
                                @nextYear="nextYear"
                                @prevMonth="prevMonth"
                                @nextMonth="nextMonth"
                                @change="changeDate"
                                @panelYearHandle="panelYearHandle"
                                @panelMonthHandle="panelMonthHandle"
                        />
                        <TimeSelect
                                ref="timeSelect"
                                class="p-picker-main-item-time-select"
                                v-show="format && panelTime"
                                :time="time"
                                :format="format"
                                @change="panelTimeChange"
                        />
                    </div>
                </div>

                <div class="p-picker-main-handle">
                    <span
                            v-if="format"
                            :class="['p-picker-handle-time', (panelTime||!daySelected)?'p-picker-handle-time-disabled':'p-picker-handle-time-normal']"
                            @click="panelTimeOpen"
                    >选择时间</span>
                    <template>
                        <Button v-if="panelTime" type="primary" size="small" @click="panelTimeClose">确定</Button>
                        <Button v-else :type="btnType" size="small" @click="pickerConfirm">确定</Button>
                    </template>
                </div>
            </div>
        </transition>
    </div>
</template>

<script>
    import CountDay from '../../static/utils/datePicker/CountDay';
    import CountBeforeOrAfterDay from '../../static/utils/datePicker/CountBeforeOrAfterDay';

    import CountNextYear from '../../static/utils/datePicker/CountNextYear';
    import CountPrevYear from '../../static/utils/datePicker/CountPrevYear';
    import CountNextMonth from '../../static/utils/datePicker/CountNextMonth';
    import CountPrevMonth from '../../static/utils/datePicker/CountPrevMonth';

    import SingleYear from '../../PickerYear/depend/singleYear';
    import SingleMonth from '../../PickerMonth/depend/singleMonth';
    import DaySelect from './day';
    import Button from '../../Button';
    import TimeSelect from '../../PickerTime/depend/time';

    import ClearSvg from '../../static/iconSvg/clear2.svg';
    import CalendarSvg from '../../static/iconSvg/calendar.svg';
    import TrianglePickerLeft from '../../static/iconSvg/triangle_picker_left.svg';
    import TrianglePickerRight from '../../static/iconSvg/triangle_picker_right.svg';
    export default {
        name: "panelSingleDay",
        components: {
            SingleYear,
            SingleMonth,
            DaySelect,
            Button,
            TimeSelect,
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
            // 快速切换时间
            quickSwitch: {
                type: Boolean,
                default: false
            },
            // 是否显示日周月年切换
            picker: {
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
                time: '', // 时分|时分秒

                yearNow: '', // 当前年
                monthNow: '', // 当前月
                dayNow: '', // 当前日

                // 活动的年月日
                yearActive: '',
                monthActive: '',
                dayActive: '',

                yearSelected: '', // 选择的年
                monthSelected: '', // 选择的月
                daySelected: '', // 选择的日

                daysArray: [], // 日列表
                panelYear: false, // 显示年面板
                panelMonth: false, // 显示月面板
                panelTime: false // 显示时分(秒)面板
            }
        },
        watch: {
            // 监听日期改变
            date(n, o) {
                if (n === o) return;
                this.init(n);
            },
            pickerBoxStatus(n) {
                if (n) return;
                this.panelYearHandle(false);
                this.panelMonthHandle(false);
                this.panelTime=false;
            }
        },
        created() {
            // 初始化日期对象
            this.init(this.date);
        },
        methods: {
            // 文字超出显示省略号
            pickerEllipsis(e) {
                const target=e.target;
                const {clientWidth, scrollWidth}=target;
                if (scrollWidth > clientWidth) target.title=target.innerText;
            },
            /**
             * 改变按钮状态
             */
            changeBtnType(str) {
                if (str && str.replace(/\./g, '')) this.btnType='primary';
                else this.btnType='disabled';
            },
            /**
             * 格式化传入的时间
             * @param date String '2020.02.14 08:09:10'
             */
            setSelectedDate(date) {
                this.selectedDate=date;
                this.changeBtnType(date);
                let sDate='', time='';
                if (date) {
                    if (this.format && date.includes(':')) {
                        const [d, t]=date.split(' ');
                        sDate=d;
                        time=t;
                    } else {
                        sDate=date;
                    }
                }
                this.time=time;
                return [sDate, time]
            },
            /**
             * 初始化日期对象
             */
            init(date) {
                const [tDate, time]=this.setSelectedDate(date);
                this.countDay=new CountDay(tDate); // 当前计算天的对象
                this.daysArray=this.countDay.getDaysArray();
                const [year, month, day]=this.countDay.countNowDate(); // 获取当前时间、日期
                this.yearNow=year;
                this.monthNow=month;
                this.dayNow=day;
                this.setDate(tDate, time);
            },
            /**
             * 设置选择的年月日
             * @param date String 2019.10.31
             * @param time String 09:10:31
             */
            setDate(date, time) {
                let year='', month='', day='',
                    yearActive='', monthActive='', dayActive='';
                if (date) {
                    const [YY, MM, DD]=date.split('.'); // 获取传入的时间、日期
                    year=YY;
                    month=MM;
                    day=DD;
                    yearActive=YY;
                    monthActive=MM;
                    dayActive=DD;
                } else {
                    yearActive=this.yearNow;
                    monthActive=this.monthNow;
                    dayActive=this.dayNow;
                }

                this.time=time;
                this.yearActive=yearActive;
                this.monthActive=monthActive;
                this.dayActive=dayActive;
                this.yearSelected=year;
                this.monthSelected=month;
                this.daySelected=day;
                this.changeDaysArray({year, month, day});
            },
            /**
             * 改变选中状态
             * @param obj {year, month, day}
             */
            changeDaysArray({year, month, day}) {
                this.daysArray=this.daysArray.map(d => {
                    if (d.year===year&&d.month===month&&d.day===day) d.selected='selected';
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
                this.time='';
                // this.yearNow='';
                // this.monthNow='';
                // this.dayNow='';
                this.yearSelected='';
                this.monthSelected='';
                this.daySelected='';
                this.$emit('change', '');
                this.pickerClearHide();
            },

            pickerMainBlur() {
                this.$nextTick(() => {
                    this.blurStatus=false;
                    this.$refs.pickerMain.blur()
                })
            },
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
            },
            /**
             * 关闭时间选择盒子
             */
            pickerBoxHide() {
                if (this.pickerBoxStatus && this.blurStatus) this.pickerBoxStatus=false;
            },
            /**
             * 切换日期
             * @param date String '2019.10.31'
             */
            switchDate(date) {
                this.countDay=new CountDay(date); // 当前计算天的对象
                this.daysArray=this.countDay.getDaysArray();
                const [yearActive, monthActive, dayActive]=date.split('.'); // 获取传入的时间、日期
                this.yearActive=yearActive;
                this.monthActive=monthActive;
                this.dayActive=dayActive;
            },
            /**
             * 上一年
             */
            prevYear() {
                const date=CountPrevYear([this.yearActive, this.monthActive, this.dayActive]);
                this.switchDate(date);
            },
            /**
             * 下一年
             */
            nextYear() {
                const date=CountNextYear([this.yearActive, this.monthActive, this.dayActive]);
                this.switchDate(date);
            },
            /**
             * 上一月
             */
            prevMonth() {
                const date=CountPrevMonth([this.yearActive, this.monthActive, this.dayActive]);
                this.switchDate(date);
            },
            /**
             * 下一月
             */
            nextMonth() {
                const date=CountNextMonth([this.yearActive, this.monthActive, this.dayActive]);
                this.switchDate(date);
            },
            /**
             * 点击日期
             * @param obj {year, month, day}
             */
            changeDate({year, month, day}) {
                this.yearSelected=year;
                this.monthSelected=month;
                this.daySelected=day;
                this.btnType='primary';
                this.changeDaysArray({year, month, day});
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

                this.daysArray=this.countDay.yearChangeCountDay(year, this.monthActive);
                this.btnType='disabled';
            },
            // 点击月
            panelMonthChangeDate({year, month}) {
                this.panelMonthHandle(false);
                this.monthActive=month;
                this.daysArray=this.countDay.yearChangeCountDay(year, month);
                this.btnType='disabled';
            },

            // 时间面板显示切换
            panelTimeOpen() {
                this.panelYear=false;
                this.panelMonth=false;
                this.panelTime=true;
                setTimeout(() => {
                    this.$refs.timeSelect.setTimeDom();
                })
            },
            // 关闭时分(秒)面板
            panelTimeClose() {
                this.panelTime=false;
            },
            // 时间切换
            panelTimeChange(time) {
                // this.panelTime=false;
                this.time=time;
            },
            // 快速选择-设置时间 flat可选值【add，min】
            setQuickDate(flag) {
                const [Y, M, D]=CountBeforeOrAfterDay(this.yearSelected, this.monthSelected, this.daySelected, flag==='min'?-1:1);

                const selectedDate=Y+'.'+M+'.'+D+`${this.format?' '+this.time:''}`;
                this.yearSelected=Y;
                this.monthSelected=M;
                this.daySelected=D;
                this.selectedDate=selectedDate;
                this.init();
                this.$emit('change', selectedDate);
            },
            // 向左快速选择
            quickLeft() {
                if (!this.selectedDate) return;
                this.setQuickDate('min');
            },
            // 向右快速选择
            quickRight() {
                if (!this.selectedDate) return;
                this.setQuickDate('add');
            },

            /**
             * 确定
             */
            pickerConfirm() {
                const selectedDate=this.yearSelected+'.'+this.monthSelected+'.'+this.daySelected+`${this.format?' '+this.time:''}`;
                this.selectedDate=selectedDate;
                this.blurStatus=false;
                this.pickerBoxStatus=false;
                /**
                 * 返回选择的时分秒
                 * @type Function
                 */
                this.$emit('change', selectedDate);
            }
        }
    }
</script>
