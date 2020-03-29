<template>
    <transition :name="position?'selectDownUpExtend':'selectDownUpExtendTop'">
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
                @wheel.stop
        >
            <div class="p-picker-main-item-box">
                <div class="p-picker-main-item-input-box">
                    <section
                            :class="['p-picker-input-alert', !picker&&'p-picker-input-alert-picker']"
                    >
                        <article
                                :class="[clickSelectedDate?'p-picker-input-values':'p-picker-input-tip', format&&'p-picker-ellipsis p-picker-ellipsis-overflow']"
                                @mouseenter="pickerEllipsis"
                        >{{(tabKey==='week'&&clickThTextSelected)?clickThTextSelected:(clickSelectedDate?clickSelectedDate:'选择日期')}}</article>
                    </section>
                    <TabDate v-model="tabKey" v-if="!picker" />
                </div>
                <div class="p-picker-main-item">
                    <div class="p-picker-child-select-box">
                        <div class="p-picker-child-select-box-title" v-show="tabKey !== 'time'">
                            <section class="p-picker-child-select-box-icon">
                                <article
                                        class="p-picker-child-select-box-icon-svg p-picker-child-select-box-icon-svg-left"
                                        @click="prevYear"
                                >
                                    <ArrowRightDoubleSvg v-if="!disableYearLeft" />
                                </article>
                                <article
                                        class="p-picker-child-select-box-icon-svg p-picker-child-select-box-icon-svg-left"
                                        @click="prevMonth"
                                        v-if="(tabKey==='day'||tabKey==='week')&&!panelYear&&!panelMonth"
                                >
                                    <ArrowRightSvg />
                                </article>
                            </section>
                            <section class="p-picker-child-select-box-title-text">
                                <article class="p-picker-active-title" @click="yearActiveClick">{{(tabKey==='year'||panelYear)?(`${yearActiveStart}-${yearActiveEnd}`):yearActive}}年</article>
                                <article v-show="(tabKey==='day'||tabKey==='week')&&!panelYear&&!panelMonth" class="p-picker-active-title" @click="monthActiveClick">{{monthActive}}月</article>
                            </section>
                            <section class="p-picker-child-select-box-icon">
                                <article
                                        class="p-picker-child-select-box-icon-svg"
                                        @click="nextMonth"
                                        v-if="(tabKey==='day'||tabKey==='week')&&!panelYear&&!panelMonth"
                                >
                                    <ArrowRightSvg />
                                </article>
                                <article
                                        class="p-picker-child-select-box-icon-svg"
                                        @click="nextYear"
                                >
                                    <ArrowRightDoubleSvg v-if="!disableYearRight" />
                                </article>
                            </section>
                        </div>
                        <div class="p-picker-child-title" v-if="(tabKey==='day'||tabKey==='week')&&!panelYear&&!panelMonth">
                            <section
                                    class="p-picker-child-title-item"
                                    v-for="wt in weekText"
                                    :key="'wt-'+wt"
                            >{{wt}}</section>
                        </div>

                        <template>
                            <Day
                                    v-if="tabKey==='day' && !panelYear && !panelMonth"
                                    :yearNow="yearNow"
                                    :monthNow="monthNow"
                                    :dayNow="dayNow"
                                    :daysArray="daysArray"
                                    @change="dayChange"
                            />
                            <Week
                                    v-else-if="tabKey==='week' && !panelYear && !panelMonth"
                                    :weeksArray="weeksArray"
                                    @change="weekChange"
                            />
                            <Month
                                    v-else-if="(tabKey==='month' || panelMonth) && !panelYear"
                                    :monthsArray="monthsArray"
                                    @change="monthChange"
                            />
                            <Year
                                    v-else-if="tabKey==='year' || panelYear"
                                    :yearsArray="yearsArray"
                                    @change="yearChange"
                            />
                            <Time
                                    v-else
                                    ref="timeSelect"
                                    class="p-picker-main-item-time-date"
                                    :time="time"
                                    :format="format"
                            />
                        </template>
                    </div>
                </div>
            </div>

            <div class="p-picker-main-handle">
                    <span
                            v-if="format&&tabKey==='day'"
                            :class="['p-picker-handle-time', clickDaySelected?'p-picker-handle-time-normal':'p-picker-handle-time-disabled']"
                            @click="panelTimeOpen"
                    >选择时间</span>
                <template>
                    <Button v-if="format&&tabKey==='time'" type="primary" size="small" @click="panelTimeClose">确定</Button>
                    <Button v-else :type="btnType" size="small" @click="pickerConfirm">确定</Button>
                </template>
            </div>
        </div>
    </transition>
</template>

<script>
    import CountNowDate from '../../../static/utils/datePicker/CountNowDate';
    import CountDay from '../../../static/utils/datePicker/CountDay';
    import CountWeek from '../../../static/utils/datePicker/CountWeek';
    import CountMonth from '../../../static/utils/datePicker/CountMonth';
    import CountYear from '../../../static/utils/datePicker/CountYear';
    import CountBeforeOrAfterDay from '../../../static/utils/datePicker/CountBeforeOrAfterDay';
    import LeapYear from '../../../static/utils/datePicker/LeapYear';
    import { SetDaysArrayDisabled, SetWeeksArrayDisabled, SetMonthsArrayDisabled, SetYearsArrayDisabled } from '../../../static/utils/datePicker/SetDataArrayDisabled';

    import CountNextYear from '../../../static/utils/datePicker/CountNextYear';
    import CountPrevYear from '../../../static/utils/datePicker/CountPrevYear';
    import CountNextMonth from '../../../static/utils/datePicker/CountNextMonth';
    import CountPrevMonth from '../../../static/utils/datePicker/CountPrevMonth';

    import Button from '../../../Button';

    import Day from '../day';
    import Week from '../week';
    import Month from '../month';
    import Year from '../year';

    import Time from '../../../PickerTime/depend/time';
    import TabDate from '../tabDate';

    import ClearSvg from '../../../static/iconSvg/clear2.svg';
    import CalendarSvg from '../../../static/iconSvg/calendar.svg';
    import TrianglePickerLeft from '../../../static/iconSvg/triangle_picker_left.svg';
    import TrianglePickerRight from '../../../static/iconSvg/triangle_picker_right.svg';
    import ArrowRightSvg from '../../../static/iconSvg/arrow_right2.svg';
    import ArrowRightDoubleSvg from '../../../static/iconSvg/arrow_right_double.svg';

    export default {
        name: "panelSingleDate",
        components: {
            Button,

            Day,
            Week,
            Year,
            Month,
            Time,

            TabDate,
            ClearSvg,
            CalendarSvg,
            TrianglePickerLeft,
            TrianglePickerRight,
            ArrowRightSvg,
            ArrowRightDoubleSvg
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
                position: true, // 动画执行方向
                btnType: 'disabled', // 按钮状态
                pickerBoxStatus: false, // 显示选择时间框
                blurStatus: false, // 是否可执行blur
                selectedDate: '', // 选中的时间
                clickSelectedDate: '', // 当前点击改变的时间
                time: '', // 时分|时分秒

                yearNow: '', // 当前年
                monthNow: '', // 当前月
                dayNow: '', // 当前日

                // 活动的年月日
                yearActive: '',
                monthActive: '',
                dayActive: '',
                yearActiveStart: '',
                yearActiveEnd: '',

                yearSelected: '', // 选择的年
                monthSelected: '', // 选择的月
                daySelected: '', // 选择的日
                clickYearSelected: '', // 点击-选择的年
                clickMonthSelected: '', // 点击-选择的月
                clickDaySelected: '', // 点击-选择的日

                thTextSelected: '', // 选择的第几周 String
                clickThTextSelected: '', // 当前点击选择的第几周 String
                weeksSelected: [], // 选择的周列表

                daysArray: [], // 日列表
                weeksArray: [], // 周列表
                monthsArray: [], // 月列表
                yearsArray: [], // 年列表

                disableYearLeft: false,  // 禁用左箭头-年
                disableYearRight: false, // 禁用右箭头-年

                panelYear: false, // 显示年面板
                panelMonth: false, // 显示月面板
                tabKey: 'day' // 日周月年切换显示
            }
        },
        computed: {
            weekText() {
                return ['一', '二', '三', '四', '五', '六', '日']
            }
        },
        watch: {
            // 监听状态改变
            pickerBoxStatus(n) {
                if (!n) return;
                this.pickerMainFocus();
            },
            // 监听日期改变
            date(n, o) {
                if (n === o || n === this.selectedDate) return;
                const tabKey=this.tabKey;
                if (n) {
                    if (n.includes('-')) {
                        const [date]=n.split('-');
                        this.paramsChange(tabKey, date, true);
                    } else {
                        this.paramsChange(tabKey, n, true);
                    }
                } else {
                    this.paramsChange(tabKey, '');
                }
            },
            // 日周月年切换显示
            tabKey(n, o) {
                if (n === o || o === 'time') return;
                this.$emit('tabKeyChange', n); // 提交tabKey
                this.panelYear=false;
                this.panelMonth=false;
                let date='';
                let y=this.yearActive, m=this.monthActive, d=this.dayActive, t=this.time;
                this.disableYearLeft=y === '1997';
                // this.disableYearRight=y === '2032';

                if (m === '02' && Number(d) >= 29) {
                    if (LeapYear(y)) {
                        d='29';
                    } else {
                        d='28';
                    }
                }
                date=y+'.'+m+'.'+d+(n==='day'&&this.format&&t?(' '+t):'');
                this.paramsChange(n, date);
            },
            // 监听活动的年改变-禁用箭头
            yearActive(n, o) {
                if (n === o && this.tabKey==='year') return;
                this.disableYearLeft=n === '1997';
                // this.disableYearRight=n === '2032';
            },
            // tabKey==='year' 监听活动的年改变-禁用箭头
            yearActiveStart(n, o) {
                if (n === o && this.tabKey!=='year') return;
                this.disableYearLeft=n <= '1997';
            }
        },
        created() {
            // 初始化日期对象
            const picker=this.picker;
            if (picker) {
                this.tabKey=picker;
                this.paramsChange(picker, this.date, true);
            } else {
                this.paramsChange(this.tabKey, this.date, true);
            }
        },
        methods: {
            // 文字超出显示省略号
            pickerEllipsis(e) {
                if (!this.format) return;
                const target=e.target;
                const {clientWidth, scrollWidth}=target;
                if (scrollWidth > clientWidth) target.title=target.innerText;
            },
            /**
             * 改变按钮状态
             */
            changeBtnType(str) {
                if (str && str.replace(/[.: ]/g, '')) this.btnType='primary';
                else this.btnType='disabled';
            },
            // 参数改变设置面板初始化 init-表示是否初次渲染
            paramsChange(params, date, init) {
                if (params === 'time') return;
                if (date && init) {
                    this.selectedDate=date;
                    this.clickSelectedDate=date;
                } else {
                    this.clickSelectedDate='';
                    this.clickThTextSelected='';
                }
                let time='', year='', yearMonth='', yearMonthDay='';
                let DATE=date;
                if (date) {
                    if (date.includes(':')) {
                        const [de, t]=date.split(/\s+/);
                        DATE=de;
                        time=t;
                    }
                    const [Y, M, D]=DATE.split('.');
                    year=Y;
                    yearMonth=Y+'.'+M;
                    yearMonthDay=Y+'.'+M+'.'+D;
                }
                if (init) {
                    const [year, month, day]=CountNowDate(); // 获取当前时间、日期
                    this.yearNow=year;
                    this.monthNow=month;
                    this.dayNow=day;

                    this.time=time;
                    let y, m, d;
                    if (DATE) {
                        const [y1, m1, d1]=DATE.split('.');
                        y=y1;
                        m=m1;
                        d=d1;
                        this.yearSelected=y;
                        this.monthSelected=m;
                        this.daySelected=d;
                        this.clickYearSelected=y;
                        this.clickMonthSelected=m;
                        this.clickDaySelected=d;
                        this.setDay(y, m, d, time);
                    } else {
                        y=year;
                        m=month;
                        d=day;
                    }
                    this.yearActive=y;
                    this.monthActive=m;
                    this.dayActive=d;
                }

                this.changeBtnType(this.date);
                switch (params) {
                    case 'day':
                        this.dayInit(DATE);
                        break;
                    case 'week':
                        this.weekInit(yearMonthDay);
                        break;
                    case 'month':
                        this.monthInit(yearMonth);
                        break;
                    case 'year':
                        this.yearInit(year);
                        break;
                    default:
                        break;
                }
            },
            /**
             * 初始化日期对象
             */
            dayInit(date) {
                this.countDay=new CountDay(date); // 当前计算天的对象
                const daysArray=this.countDay.getDaysArray();
                this.daysArray=SetDaysArrayDisabled(this.scope, daysArray);
                if (this.daySelected) this.setDay(this.yearSelected, this.monthSelected, this.daySelected, this.time);
            },
            weekInit(date) {
                const countWeek=new CountWeek({date: '', sort: this.sort});
                let weeksArray=null;
                if (date) {
                    const [Y, M]=date.split('.');
                    weeksArray=countWeek.yearChangeCountWeek(Y, M, this.sort);
                } else {
                    weeksArray=countWeek.getWeeksArray();
                }

                this.weeksArray=SetWeeksArrayDisabled(this.scope, weeksArray);

                this.setWeek(this.yearSelected, this.monthSelected, this.daySelected);
            },
            // 如果set属性为true时不用设置选中时间
            monthInit(date) {
                const countMonth=new CountMonth(date);
                this.monthsArray=SetMonthsArrayDisabled(this.scope, countMonth.getMonthsArray());

                this.setMonth(this.yearSelected, this.monthSelected);
            },
            yearInit(date) {
                this.countYear=new CountYear(date); // 当前计算年的对象
                const yearsArray=this.countYear.getYearsArray();

                this.yearsArray=SetYearsArrayDisabled(this.scope, yearsArray);
                this.yearActiveStart=yearsArray[0].year;
                this.yearActiveEnd=yearsArray[11].year;
                this.setYear(this.yearSelected);
            },

            /**
             * 设置选择的年月日
             * @param Y String 2019
             * @param M String 10
             * @param D String 31
             * @param T String 12:12
             */
            setDay(Y, M, D, T) {
                if (Y) {
                    const sd=Y+'.'+M+'.'+D+(this.format&&T?' '+T:'');
                    this.selectedDate=sd;
                    this.clickSelectedDate=sd;
                    this.changeDaysArray({year: Y, month: M, day: D});
                } else {
                    this.selectedDate='';
                    this.clickSelectedDate='';
                }
            },
            setWeek(Y, M, D) {
                if (Y) {
                    const wa=this.weeksArray;
                    const obj=wa.find(d => (d.year===Y&&d.month===M)&&d.weeks.some(d2 => d2.year===Y&&d2.month===M&&d2.day===D));

                    let weeks=[], thText='';
                    if (obj && obj.hasOwnProperty('weeks')) {
                        const {weeks: W, thText: T}=obj;
                        weeks=W;
                        thText=T;
                    } else {
                        // 计算当前选中的周是多少
                        const Y=this.yearSelected, M=this.monthSelected, D=this.daySelected;
                        const countWeek=new CountWeek({date: Y+'.'+M+'.'+D, sort: this.sort});
                        const weeksArray=SetWeeksArrayDisabled(this.scope, countWeek.getWeeksArray());
                        const obj=weeksArray.find(d => d.flag==='n'&&d.weeks.some(d2 => d2.year===Y&&d2.month===M&&d2.day===D));
                        if (obj && obj.hasOwnProperty('weeks')) {
                            const {weeks: W, thText: T}=obj;
                            weeks=W;
                            thText=T;
                        }
                    }

                    if (!weeks || !weeks.length) return;
                    const ws1=weeks[0], ws2=weeks[6];
                    const sd=ws1.year+'.'+ws1.month+'.'+ws1.day+'-'+ws2.year+'.'+ws2.month+'.'+ws2.day;
                    this.selectedDate=sd;
                    this.clickSelectedDate=sd;
                    this.weeksSelected=weeks;
                    this.thTextSelected=thText;
                    this.clickThTextSelected=thText;
                    this.changeWeeksArray(thText);
                } else {
                    this.weeksSelected=[];
                    this.selectedDate='';
                    this.clickSelectedDate='';
                    this.thTextSelected='';
                    this.clickThTextSelected='';
                }
            },
            setMonth(Y, M) {
                if (Y) {
                    const sd=Y+'.'+M;
                    this.selectedDate=sd;
                    this.clickSelectedDate=sd;
                    this.yearSelected=Y;
                    this.monthSelected=M;

                    this.changeMonthsArray({year: Y, month: M});
                } else {
                    this.changeMonthsArray({year: '', month: ''});
                }
            },
            setYear(Y) {
                this.selectedDate=Y;
                this.clickSelectedDate=Y;
                this.changeYearsArray(Y);
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
            changeWeeksArray(thText) {
                this.weeksArray=this.weeksArray.map(d => {
                    if (d.flag==='n'&&d.thText===thText) d.selected='selected';
                    else d.selected='';
                    return d;
                })
            },
            changeMonthsArray({year, month}) {
                this.monthsArray=this.monthsArray.map(d => {
                    if (d.year===year && d.month===month) d.selected='selected';
                    else d.selected='';
                    return d;
                })
            },
            changeYearsArray(year) {
                this.yearsArray=this.yearsArray.map(d => {
                    if (d.year===year) d.selected='selected';
                    else d.selected='';
                    return d;
                })
            },
            /**
             * 清除时间
             */
            clearTime() {
                this.selectedDate='';
                this.clickSelectedDate='';
                this.time='';
                this.yearSelected='';
                this.monthSelected='';
                this.daySelected='';
                this.clickYearSelected='';
                this.clickMonthSelected='';
                this.clickDaySelected='';
                this.thTextSelected='';
                this.clickThTextSelected='';
                this.weeksSelected=[];
                this.$emit('change', ['', '']);
                this.btnType='disabled';
                this.resetDataArray(this.tabKey);
            },

            // 重置【日 周 月 年】面板数据选中状态
            resetDataArray(tabKey) {
                switch (tabKey) {
                    case 'day':
                        this.changeDaysArray({year: '', month: '', day: ''});
                        break;
                    case 'week':
                        this.changeWeeksArray('');
                        break;
                    case 'month':
                        this.changeMonthsArray({year: '', month: ''});
                        break;
                    case 'year':
                        this.changeYearsArray('');
                        break;
                    default: break;
                }
            },

            // 时间选择主体失去焦点
            pickerMainBlur() {
                this.$nextTick(() => {
                    this.blurStatus=false;
                    this.$refs.pickerMain.blur()
                })
            },
            // 时间选择主体获取焦点
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
                if (this.pickerBoxStatus && this.blurStatus) {
                    this.parent.pickerBoxStatus=false;
                    this.pickerBoxStatus=false;
                    this.panelYear=false;
                    this.panelMonth=false;
                }
            },
            /**
             * 切换日期
             * @param date String '2019.10.31'
             */
            switchDay(date) {
                const [Y, M, D]=date.split('.'); // 获取传入的时间、日期
                this.yearActive=Y;
                this.monthActive=M;
                this.dayActive=D;
                this.countDay=new CountDay(date); // 当前计算天的对象
                const daysArray=this.countDay.getDaysArray();
                this.daysArray=SetDaysArrayDisabled(this.scope, daysArray);
            },
            /**
             * 切换日期
             * @param date
             */
            switchWeek(date) {
                const [Y, M]=date.split('.');
                this.yearActive=Y;
                this.monthActive=M;
                const countWeek=new CountWeek({date: Y+'.'+M, sort: this.sort});
                this.weeksArray=SetWeeksArrayDisabled(this.scope, countWeek.getWeeksArray());
                if (Y === this.yearSelected && M === this.monthSelected) {
                    this.changeWeeksArray(this.thTextSelected);
                }
            },
            /**
             * 切换日期
             * @param year String '2019'
             */
            switchMonth(year) {
                this.yearActive=year;
                let date=`${year}.${this.monthActive}`;
                const countMonth=new CountMonth(date);
                this.monthsArray=SetMonthsArrayDisabled(this.scope, countMonth.getMonthsArray()).map(d => {
                    if (d.year===this.yearSelected && d.month===this.monthSelected) d.selected='selected';
                    return d;
                });
            },
            /**
             * 切换日期
             * @param date String '2019'
             */
            switchYear(date) {
                this.countYear=new CountYear(date); // 当前计算年的对象
                const yearsArray=SetYearsArrayDisabled(this.scope, this.countYear.getYearsArray());
                this.yearsArray=yearsArray.map(d => {
                    if (d.year===this.yearSelected) d.selected='selected';
                    if (d.year<'1997') d.disabled ='disabled';
                    // if (d.year<'1997' || d.year>'2032') d.disabled ='disabled';
                    return d;
                });
                this.yearActiveStart=yearsArray[0].year;
                this.yearActiveEnd=yearsArray[11].year;
            },
            /**
             * 上一年
             */
            prevYear() {
                if ((this.tabKey!=='year' && this.yearActive === '1997') || (this.tabKey==='year' && this.yearActiveStart <= '1997')) return;
                const tabKey=this.tabKey;
                if (this.panelYear && tabKey!=='year') {
                    const date=(this.yearsArray.shift().year-1).toString();
                    this.switchYear(date);
                }

                switch (tabKey) {
                    case 'day':
                        (() => {
                            const date=CountPrevYear([this.yearActive, this.monthActive, this.dayActive]);
                            this.switchDay(date);
                        })();
                        break;
                    case 'week':
                        (() => {
                            const date=CountPrevYear([this.yearActive, this.monthActive, '01']);
                            this.switchWeek(date);
                        })();
                        break;
                    case 'month':
                        (() => {
                            const date=(this.yearActive-1).toString();
                            this.switchMonth(date);
                        })();
                        break;
                    case 'year':
                        (() => {
                            const date=(this.yearsArray.shift().year-1).toString();
                            this.switchYear(date);
                        })();
                        break;
                    default:break;
                }
            },
            /**
             * 下一年
             */
            nextYear() {
                // if ((this.tabKey!=='year' && this.yearActive === '2032') || (this.tabKey==='year' && this.yearActiveEnd >= '2032')) return;
                const tabKey=this.tabKey;
                if (this.panelYear && tabKey!=='year') {
                    const date=(parseInt(this.yearsArray.pop().year)+12).toString();
                    this.switchYear(date);
                }

                switch (tabKey) {
                    case 'day':
                        (() => {
                            const date=CountNextYear([this.yearActive, this.monthActive, this.dayActive]);
                            this.switchDay(date);
                        })();
                        break;
                    case 'week':
                        (() => {
                            const date=CountNextYear([this.yearActive, this.monthActive, '01']);
                            this.switchWeek(date);
                        })();
                        break;
                    case 'month':
                        (() => {
                            const date=(parseInt(this.yearActive)+1).toString();
                            this.switchMonth(date);
                        })();
                        break;
                    case 'year':
                        (() => {
                            const date=(parseInt(this.yearsArray.pop().year)+12).toString();
                            this.switchYear(date);
                        })();
                        break;
                    default:break;
                }
            },
            /**
             * 上一月
             */
            prevMonth() {
                if (this.tabKey === 'day') {
                    const date=CountPrevMonth([this.yearActive, this.monthActive, this.dayActive]);
                    this.switchDay(date);
                } else {
                    // tabKey === 'week'
                    const date=CountPrevMonth([this.yearActive, this.monthActive, '01']);
                    this.switchWeek(date);
                }
            },
            /**
             * 下一月
             */
            nextMonth() {
                if (this.tabKey === 'day') {
                    const date=CountNextMonth([this.yearActive, this.monthActive, this.dayActive]);
                    this.switchDay(date);
                } else {
                    // tabKey === 'week'
                    const date=CountNextMonth([this.yearActive, this.monthActive, '01']);
                    this.switchWeek(date);
                }
            },
            // 点击active的年，去选择active的年
            yearActiveClick() {
                if (this.tabKey==='year') return;
                this.yearInit(this.yearActive);
                this.panelYear=true;
            },
            // 点击active的月，去选择active的月
            monthActiveClick() {
                if (this.tabKey==='month') return;
                this.monthInit(this.yearActive+'.'+this.monthActive);
                this.panelMonth=true;
            },
            /**
             * 点击日期-日改变
             * @param obj {year, month, day}
             */
            dayChange({year, month, day}) {
                this.yearActive=year;
                this.monthActive=month;
                this.dayActive=day;
                this.clickYearSelected=year;
                this.clickMonthSelected=month;
                this.clickDaySelected=day;
                const format=this.format, time=this.time;
                // this.clickSelectedDate=year+'.'+month+'.'+day+(this.format&&this.time?' '+this.time:'');
                let t='', space='';
                if (format) {
                    space=' ';
                    if (time) {
                        t=time;
                    } else {
                        const d=new Date(),
                            h=d.getHours(),
                            m=d.getMinutes(),
                            s=d.getSeconds(),
                            hour=h<10?'0'+h:h,
                            minute=m<10?'0'+m:m,
                            second=s<10?'0'+s:s;
                        if (format === 'hm') t=hour+':'+minute;
                        else t=hour+':'+minute+':'+second;

                        this.time=t;
                    }
                }
                this.clickSelectedDate=year+'.'+month+'.'+day+space+t;
                this.btnType='primary';
                this.changeDaysArray({year, month, day});
            },
            /**
             * 点击日期-周改变
             * @param {year, month, thText}
             */
            weekChange({weeks, year, month, thText}) {
                this.weeksSelected=weeks;
                this.yearActive=year;
                this.monthActive=month;
                this.clickYearSelected=year;
                this.clickMonthSelected=month;
                const ws1=weeks[0], ws2=weeks[6];
                this.clickDaySelected=ws1.day;
                this.clickSelectedDate=ws1.year+'.'+ws1.month+'.'+ws1.day+'-'+ws2.year+'.'+ws2.month+'.'+ws2.day;
                this.clickThTextSelected=thText;
                this.btnType='primary';
                this.changeWeeksArray(thText);
            },
            /**
             * 点击日期-月改变
             * @param {year, month}
             */
            monthChange({year, month}) {
                if (this.panelMonth) {
                    this.yearActive=year;
                    this.monthActive=month;
                    let y=year, m=month, d=this.dayActive, t=this.time;
                    if (this.tabKey==='day') {
                        if (m === '02' && d >= 29) {
                            if (LeapYear(y)) {
                                d='29';
                            } else {
                                d='28';
                            }
                        }
                        const date=y+'.'+m+'.'+d+(this.format?' '+t:'');
                        this.dayInit(date, t);
                    } else {
                        // tabKey==='week'
                        this.weekInit(y+'.'+m+'.'+d);
                    }
                    this.panelMonth=false;
                    this.btnType='disabled';
                } else {
                    this.clickYearSelected=year;
                    this.clickMonthSelected=month;
                    this.clickSelectedDate=year+'.'+month;
                    this.changeMonthsArray({year, month});
                    this.btnType='primary';
                }
            },
            /**
             * 点击日期-年改变
             * @param {year}
             */
            yearChange({year}) {
                if (this.panelYear) {
                    this.yearActive=year;
                    const tabKey=this.tabKey;
                    let y=year, m=this.monthActive, d=this.dayActive, t=this.time;
                    if (tabKey==='day') {
                        if (m === '02' && d >= 29) {
                            if (LeapYear(y)) {
                                d='29';
                            } else {
                                d='28';
                            }
                        }
                        const date=y+'.'+m+'.'+d+(this.format&&t?' '+t:'');
                        this.dayInit(date, t);
                    } else if (tabKey==='week') {
                        this.weekInit(y+'.'+m+'.'+d);
                    } else {
                        // tabKey==='month'
                        this.monthInit(y+'.'+m);
                    }
                    this.panelYear=false;
                    this.btnType='disabled';
                } else {
                    this.clickYearSelected=year;
                    this.clickSelectedDate=year;
                    this.changeYearsArray(year);
                    this.btnType='primary';
                }
            },

            // 时间面板显示切换
            panelTimeOpen() {
                if (!this.clickDaySelected) return;
                this.tabKey='time';
                // this.panelTime=true;
                setTimeout(() => {
                    this.$refs.timeSelect.setTimeDom();
                })
            },
            // 关闭时分(秒)面板
            panelTimeClose() {
                // this.panelTime=false;
                const ts=this.$refs.timeSelect;
                const time=ts.hour+':'+ts.minute+(this.format==='hms'?':'+ts.second:'');
                this.time=time;
                this.clickSelectedDate=this.clickYearSelected+'.'+this.clickMonthSelected+'.'+this.clickDaySelected+' '+time;
                this.tabKey='day';
            },
            // 日-快速选择-设置时间 flag可选值【left，right】
            setQuickDay(flag) {
                const [Y, M, D]=CountBeforeOrAfterDay(this.yearSelected, this.monthSelected, this.daySelected, flag==='left'?-1:1);

                const selectedDate=Y+'.'+M+'.'+D+(this.format&&this.time?' '+this.time:'');
                this.yearActive=Y;
                this.monthActive=M;
                this.dayActive=D;
                this.yearSelected=Y;
                this.monthSelected=M;
                this.daySelected=D;
                this.clickYearSelected=Y;
                this.clickMonthSelected=M;
                this.clickDaySelected=D;
                this.selectedDate=selectedDate;
                this.clickSelectedDate=selectedDate;

                this.$emit('change', [selectedDate, '']);
                this.dayInit(selectedDate, this.time);
            },
            // 周-快速选择-设置时间 flat可选值【left，right】
            setQuickWeek(flag) {
                const ws=this.weeksSelected, s=ws[0], e=ws[6];
                const y1=s.year, m1=s.month, d1=s.day, y2=e.year, m2=e.month, d2=e.day;

                let selectedDate, y, m, d;
                if (flag === 'left') {
                    const [ey, em, ed]=CountBeforeOrAfterDay(y1, m1, d1, -1);
                    const [sy, sm, sd]=CountBeforeOrAfterDay(ey, em, ed, -6);
                    const start=sy+'.'+sm+'.'+sd;
                    const end=ey+'.'+em+'.'+ed;
                    selectedDate=start+'-'+end;
                    y=sy;
                    m=sm;
                    d=sd;
                } else {
                    const [sy, sm, sd]=CountBeforeOrAfterDay(y2, m2, d2, 1);
                    const [ey, em, ed]=CountBeforeOrAfterDay(sy, sm, sd, 6);
                    const start=sy+'.'+sm+'.'+sd;
                    const end=ey+'.'+em+'.'+ed;
                    selectedDate=start+'-'+end;
                    y=sy;
                    m=sm;
                    d=sd;
                }
                this.yearActive=y;
                this.monthActive=m;
                this.dayActive=d;
                this.yearSelected=y;
                this.monthSelected=m;
                this.daySelected=d;
                this.clickYearSelected=y;
                this.clickMonthSelected=m;
                this.clickDaySelected=d;

                this.selectedDate=selectedDate;
                this.clickSelectedDate=selectedDate;

                this.weekInit(y+'.'+m+'.'+d);
                this.$emit('change', [selectedDate, this.thTextSelected]);
            },
            // 月-快速选择-设置时间 flat可选值【left，right】
            setQuickMonth(flag) {
                const ys=Number(this.yearSelected), ms=Number(this.monthSelected);
                const m=flag==='left'?ms-1:ms+1;
                let Y='', M='';
                if (m === 0) {
                    Y=(ys-1).toString();
                    M='12';
                } else if (m === 13) {
                    Y=(ys+1).toString();
                    M='01';
                } else {
                    Y=ys.toString();
                    M=m>9?''+m:'0'+m;
                }

                const selectedDate=Y+'.'+M;
                this.yearActive=Y;
                this.monthActive=M;
                this.yearSelected=Y;
                this.monthSelected=M;
                this.clickYearSelected=Y;
                this.clickMonthSelected=M;
                this.selectedDate=selectedDate;
                this.clickSelectedDate=selectedDate;

                this.$emit('change', [selectedDate, '']);
                this.monthInit(selectedDate);
            },
            // 年-快速选择-设置时间 flat可选值【left，right】
            setQuickYear(flag) {
                const ys=Number(this.yearSelected);
                const selectedDate=((flag==='left'?ys-1:ys+1)).toString();
                this.yearActive=selectedDate;
                this.yearSelected=selectedDate;
                this.clickYearSelected=selectedDate;
                this.selectedDate=selectedDate;
                this.clickSelectedDate=selectedDate;

                this.$emit('change', [selectedDate, '']);
                this.yearInit(selectedDate);
            },
            // 快速选择 flag可选值【left，right】
            quickSort(flag) {
                if (!this.selectedDate) return;

                switch (this.tabKey) {
                    case 'day':
                        this.setQuickDay(flag);
                        break;
                    case 'week':
                        this.setQuickWeek(flag);
                        break;
                    case 'month':
                        this.setQuickMonth(flag);
                        break;
                    case 'year':
                        this.setQuickYear(flag);
                        break;
                    default:break;
                }
            },

            /**
             * 确定
             */
            pickerConfirm() {
                let selectedDate='';
                const Y=this.clickYearSelected, M=this.clickMonthSelected, D=this.clickDaySelected, T=this.time;
                this.yearSelected=Y;
                this.monthSelected=M;
                this.daySelected=D;
                switch (this.tabKey) {
                    case 'day':
                        selectedDate=Y+'.'+M+'.'+D+(this.format&&T?' '+T:'');
                        break;
                    case 'week':
                        const ws=this.weeksSelected, ws1=ws[0], ws2=ws[6];
                        selectedDate=ws1.year+'.'+ws1.month+'.'+ws1.day+'-'+ws2.year+'.'+ws2.month+'.'+ws2.day;
                        this.thTextSelected=this.clickThTextSelected;
                        break;
                    case 'month':
                        if (!D) this.clickDaySelected=this.dayNow, this.daySelected=this.dayNow;
                        selectedDate=Y+'.'+M;
                        this.yearActive=Y;
                        this.monthActive=M;
                        break;
                    case 'year':
                        selectedDate=Y;
                        if (!M) this.clickMonthSelected=this.monthNow, this.monthSelected=this.monthNow;
                        if (!D) this.clickDaySelected=this.dayNow, this.daySelected=this.dayNow;
                        this.yearActive=Y;
                        break;
                    default:
                        break;
                }
                this.selectedDate=selectedDate;
                this.blurStatus=false;
                /**
                 * 返回选择的时分秒
                 * @type Function
                 */
                this.$emit('change', [selectedDate, this.thTextSelected]);
            }
        }
    }
</script>
