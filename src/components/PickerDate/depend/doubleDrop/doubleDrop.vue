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
                    <section :class="['p-picker-input-alert', (tabKey==='day'&&clickSelectedDateEnd&&timeEnd&&format&&timeEnd)&&'p-picker-input-alert-shadow']">
                        <article
                                :class="['p-picker-input-alert-tip', clickSelectedDateStart?'p-picker-input-values':'p-picker-input-tip', 'p-picker-ellipsis']"
                                @mouseenter="pickerEllipsis"
                        >{{(tabKey==='week'&&clickThTextSelectedStart)?clickThTextSelectedStart:(clickSelectedDateStart?clickSelectedDateStart:'开始日期')}}</article>
                        <article :class="['p-picker-input-tip-to', (tabKey==='day'&&clickSelectedDateStart&&timeStart&&format&&timeStart)&&'p-picker-left-box-shadow']">至</article>
                        <article
                                :class="['p-picker-input-alert-tip', clickSelectedDateEnd?'p-picker-input-values':'p-picker-input-tip', 'p-picker-ellipsis']"
                                @mouseenter="pickerEllipsis"
                        >{{(tabKey==='week'&&clickThTextSelectedEnd)?clickThTextSelectedEnd:(clickSelectedDateEnd?clickSelectedDateEnd:'开始日期')}}</article>
                    </section>
                    <TabDate v-model="tabKey" v-if="!picker" />
                </div>
                <div class="p-picker-main-item">
                    <!-- 开始时间-s -->
                    <div class="p-picker-child-select-box">
                        <div class="p-picker-child-select-box-title" v-show="tabKey !== 'time'">
                            <section class="p-picker-child-select-box-icon">
                                <article
                                        class="p-picker-child-select-box-icon-svg p-picker-child-select-box-icon-svg-left"
                                        @click="prevYearStart"
                                >
                                    <ArrowRightDoubleSvg v-if="!disableStartYearLeft" />
                                </article>
                                <article
                                        class="p-picker-child-select-box-icon-svg p-picker-child-select-box-icon-svg-left"
                                        @click="prevMonthStart"
                                        v-if="(tabKey==='day'||tabKey==='week')&&!panelYearStart&&!panelMonthStart"
                                >
                                    <ArrowRightSvg />
                                </article>
                            </section>
                            <section class="p-picker-child-select-box-title-text">
                                <article class="p-picker-active-title" @click="yearActiveClickStart">{{(tabKey==='year'||panelYearStart)?(`${yearActiveStartLeft}-${yearActiveStartRight}`):yearActiveStart}}年</article>
                                <article v-show="(tabKey==='day'||tabKey==='week')&&!panelYearStart&&!panelMonthStart" class="p-picker-active-title" @click="monthActiveClickStart">{{monthActiveStart}}月</article>
                            </section>
                            <section class="p-picker-child-select-box-icon">
                                <article
                                        class="p-picker-child-select-box-icon-svg"
                                        @click="nextMonthStart"
                                        v-if="(tabKey==='day'||tabKey==='week')&&!panelYearStart&&!panelMonthStart&&!disableMonthStartRight"
                                >
                                    <ArrowRightSvg />
                                </article>
                                <article
                                        class="p-picker-child-select-box-icon-svg"
                                        @click="nextYearStart"
                                >
                                    <ArrowRightDoubleSvg v-if="!disableYearStartRight" />
                                </article>
                            </section>
                        </div>
                        <div class="p-picker-child-title" v-if="(tabKey==='day'||tabKey==='week')&&!panelYearStart&&!panelMonthStart">
                            <section
                                    class="p-picker-child-title-item"
                                    v-for="wt in weekText"
                                    :key="'wts-'+wt"
                            >{{wt}}</section>
                        </div>

                        <template>
                            <Day
                                    v-if="tabKey==='day' && !panelYearStart && !panelMonthStart"
                                    :yearNow="yearNow"
                                    :monthNow="monthNow"
                                    :dayNow="dayNow"
                                    :multiple="true"
                                    :daysArray="daysArrayStart"
                                    @change="dayChangeStart"
                                    @enter="dayEnterStart"
                            />
                            <Week
                                    v-else-if="tabKey==='week' && !panelYearStart && !panelMonthStart"
                                    :multiple="true"
                                    :weeksArray="weeksArrayStart"
                                    @change="weekChangeStart"
                                    @enter="weekEnterStart"
                            />
                            <Month
                                    v-else-if="(tabKey==='month' || panelMonthStart) && !panelYearStart"
                                    :multiple="true"
                                    :monthsArray="monthsArrayStart"
                                    @change="monthChangeStart"
                                    @enter="monthEnterStart"
                            />
                            <Year
                                    v-else-if="tabKey==='year' || panelYearStart"
                                    :multiple="true"
                                    :yearsArray="yearsArrayStart"
                                    @change="yearChangeStart"
                                    @enter="yearEnterStart"
                            />
                            <Time
                                    v-else
                                    ref="timeSelectStart"
                                    class="p-picker-main-item-time-date"
                                    :multiple="true"
                                    :time="timeStart"
                                    :format="format"
                            />
                            <!--                                @change="timeChangeStart"-->
                        </template>
                    </div>
                    <!-- 开始时间-e -->
                    <!-- 结束时间-s -->
                    <div class="p-picker-child-select-box p-picker-child-select-box-border-left">
                        <div class="p-picker-child-select-box-title" v-show="tabKey !== 'time'">
                            <section class="p-picker-child-select-box-icon">
                                <article
                                        class="p-picker-child-select-box-icon-svg p-picker-child-select-box-icon-svg-left"
                                        @click="prevYearEnd"
                                >
                                    <ArrowRightDoubleSvg v-if="!disableYearEndLeft" />
                                </article>
                                <article
                                        class="p-picker-child-select-box-icon-svg p-picker-child-select-box-icon-svg-left"
                                        @click="prevMonthEnd"
                                        v-if="(tabKey==='day'||tabKey==='week')&&!panelYearEnd&&!panelMonthEnd&&!disableMonthEndLeft"
                                >
                                    <ArrowRightSvg />
                                </article>
                            </section>
                            <section class="p-picker-child-select-box-title-text">
                                <article class="p-picker-active-title" @click="yearActiveClickEnd">{{(tabKey==='year'||panelYearEnd)?(`${yearActiveEndLeft}-${yearActiveEndRight}`):yearActiveEnd}}年</article>
                                <article v-show="(tabKey==='day'||tabKey==='week')&&!panelYearEnd&&!panelMonthEnd" class="p-picker-active-title" @click="monthActiveClickEnd">{{monthActiveEnd}}月</article>
                            </section>
                            <section class="p-picker-child-select-box-icon">
                                <article
                                        class="p-picker-child-select-box-icon-svg"
                                        @click="nextMonthEnd"
                                        v-if="(tabKey==='day'||tabKey==='week')&&!panelYearEnd&&!panelMonthEnd"
                                >
                                    <ArrowRightSvg />
                                </article>
                                <article
                                        class="p-picker-child-select-box-icon-svg"
                                        @click="nextYearEnd"
                                >
                                    <ArrowRightDoubleSvg />
                                </article>
                            </section>
                        </div>
                        <div class="p-picker-child-title" v-if="(tabKey==='day'||tabKey==='week')&&!panelYearEnd&&!panelMonthEnd">
                            <section
                                    class="p-picker-child-title-item"
                                    v-for="wt in weekText"
                                    :key="'wts-'+wt"
                            >{{wt}}</section>
                        </div>

                        <template>
                            <Day
                                    v-if="tabKey==='day' && !panelYearEnd && !panelMonthEnd"
                                    :yearNow="yearNow"
                                    :monthNow="monthNow"
                                    :dayNow="dayNow"
                                    :multiple="true"
                                    :daysArray="daysArrayEnd"
                                    @change="dayChangeEnd"
                                    @enter="dayEnterEnd"
                            />
                            <Week
                                    v-else-if="tabKey==='week' && !panelYearEnd && !panelMonthEnd"
                                    :multiple="true"
                                    :weeksArray="weeksArrayEnd"
                                    @change="weekChangeEnd"
                                    @enter="weekEnterEnd"
                            />
                            <Month
                                    v-else-if="(tabKey==='month' || panelMonthEnd) && !panelYearEnd"
                                    :multiple="true"
                                    :monthsArray="monthsArrayEnd"
                                    @change="monthChangeEnd"
                                    @enter="monthEnterEnd"
                            />
                            <Year
                                    v-else-if="tabKey==='year' || panelYearEnd"
                                    :multiple="true"
                                    :yearsArray="yearsArrayEnd"
                                    @change="yearChangeEnd"
                                    @enter="yearEnterEnd"
                            />
                            <Time
                                    v-else
                                    ref="timeSelectEnd"
                                    class="p-picker-main-item-time-date"
                                    :multiple="true"
                                    :time="timeEnd"
                                    :format="format"
                            />
                            <!--                                @change="timeChangeEnd"-->
                        </template>
                    </div>
                    <!-- 结束时间-e -->
                </div>
            </div>

            <div class="p-picker-main-handle">
                    <span
                            v-if="format&&tabKey==='day'"
                            :class="['p-picker-handle-time', (clickSelectedDateStart&&clickSelectedDateEnd)?'p-picker-handle-time-normal':'p-picker-handle-time-disabled']"
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
    import CountDay from '../../../static/utils/datePicker/CountDay';
    import CountWeek from '../../../static/utils/datePicker/CountWeek';
    import CountMonth from '../../../static/utils/datePicker/CountMonth';
    import CountYear from '../../../static/utils/datePicker/CountYear';
    import CountBeforeOrAfterDay from '../../../static/utils/datePicker/CountBeforeOrAfterDay';
    import LeapYear from '../../../static/utils/datePicker/LeapYear';
    import CountLeftOrRightMonth from '../../../static/utils/datePicker/CountLeftOrRightMonth';
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

    import ArrowRightSvg from '../../../static/iconSvg/arrow_right2.svg';
    import ArrowRightDoubleSvg from '../../../static/iconSvg/arrow_right_double.svg';

    export default {
        name: "doubleDrop",
        components: {
            Button,

            Day,
            Week,
            Year,
            Month,
            Time,

            TabDate,
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
                selectedDateStart: '', // 选中的时间-s
                selectedDateEnd: '', // 选中的时间-e
                clickSelectedDateStart: '', // 选中的时间-弹窗
                clickSelectedDateEnd: '', // 选中的时间-弹窗

                timeStart: '', // 时分|时分秒
                timeEnd: '', // 时分|时分秒

                // 当前年月日
                yearNow: '',
                monthNow: '',
                dayNow: '',

                // 活动的年月日
                yearActiveStart: '',
                monthActiveStart: '',
                dayActiveStart: '',
                yearActiveEnd: '',
                monthActiveEnd: '',
                dayActiveEnd: '',

                // 年面板-活动的年段
                yearActiveStartLeft: '',
                yearActiveStartRight: '',
                yearActiveEndLeft: '',
                yearActiveEndRight: '',

                // 选择的年月日-s
                yearSelectedStart: '',
                monthSelectedStart: '',
                daySelectedStart: '',
                // 点击-选择的年月日-s
                clickYearSelectedStart: '',
                clickMonthSelectedStart: '',
                clickDaySelectedStart: '',

                // 选择的年月日-e
                yearSelectedEnd: '',
                monthSelectedEnd: '',
                daySelectedEnd: '',
                // 点击-选择的年月日-e
                clickYearSelectedEnd: '',
                clickMonthSelectedEnd: '',
                clickDaySelectedEnd: '',

                thTextSelectedStart: '', // 选择的第几周 String
                thTextSelectedEnd: '', // 选择的第几周 String
                clickThTextSelectedStart: '', // 当前点击选择的第几周 String
                clickThTextSelectedEnd: '', // 当前点击选择的第几周 String
                weeksSelectedStart: [], // 选择的周列表
                weeksSelectedEnd: [], // 选择的周列表

                daysArrayStart: [], // 日列表-开始
                daysArrayEnd: [], // 日列表-结束
                weeksArrayStart: [], // 周列表
                weeksArrayEnd: [], // 周列表
                monthsArrayStart: [], // 月列表
                monthsArrayEnd: [], // 月列表
                yearsArrayStart: [], // 年列表
                yearsArrayEnd: [], // 年列表

                disableStartYearLeft: false, // 禁用开始时间左箭头-年
                disableYearStartRight: false, // 禁用开始时间右箭头-年
                disableMonthStartRight: false, // 禁用开始时间右箭头-月
                disableYearEndLeft: false,  // 禁用结束时间左箭头-年
                disableMonthEndLeft: false,  // 禁用结束时间左箭头-月

                panelYearStart: false, // 显示年面板
                panelYearEnd: false, // 显示年面板
                panelMonthStart: false, // 显示月面板
                panelMonthEnd: false, // 显示月面板

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
                this.paramsChange(this.tabKey, n);
            },
            // 日周月年切换显示
            tabKey(n, o) {
                if (n === o || o === 'time') return;
                this.$emit('tabKeyChange', n); // 提交tabKey
                this.panelYearStart=false;
                this.panelMonthStart=false;
                this.panelYearEnd=false;
                this.panelMonthEnd=false;
                const date=this.countInitDate(n);

                this.paramsChange(n, date);
            },
            // 如果活动的年小于1997就禁用左箭头
            yearActiveStart(n, o) {
                if (n === o) return;
                this.disableStartYearLeft=n <= '1997';
            },
            // 如果活动的年小于1997就禁用左箭头
            yearActiveEnd(n, o) {
                if (n === o) return;
                this.disableYearEndLeft=(n - 1) <= this.yearActiveStart;
            },
            // 如果活动的年小于1997就禁用左箭头
            yearActiveStartLeft(n, o) {
                if (n === o) return;
                this.disableStartYearLeft=n <= '1997';
            },
            // 如果活动的年小于1997就禁用左箭头
            yearActiveEndLeft(n, o) {
                if (n === o) return;
                this.disableYearEndLeft=(n-1) <= ((this.tabKey==='year'||this.panelYearStart)?this.yearActiveStartRight:this.yearActiveStart);
            }
        },
        created() {
            // 初始化日期对象
            this.paramsChange(this.tabKey, this.date, true);
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
                if (str && str.replace(/[.:\- ]/g, '')) this.btnType='primary';
                else this.btnType='disabled';
            },
            // 计算开始结束日期-初始化数据
            countInitDate(tabKey) {
                let dateS='', dateE='';
                const yas=this.yearActiveStart, mas=this.monthActiveStart, das=this.dayActiveStart;
                const yae=this.yearActiveEnd, mae=this.monthActiveEnd, dae=this.dayActiveEnd;
                const yss=this.yearSelectedStart, mss=this.monthSelectedStart, dss=this.daySelectedStart;
                const yse=this.yearSelectedEnd, mse=this.monthSelectedEnd, dse=this.daySelectedEnd;
                let ys=yas?yas:yss, ms=mas?mas:mss, ds=das?das:dss, ts=this.timeStart;
                let ye=yae?yae:yse, me=mae?mae:mse, de=dae?dae:dse, te=this.timeEnd;
                this.yearActiveStart=ys;this.monthActiveStart=ms;this.dayActiveStart=ds;
                this.yearActiveEnd=ye;this.monthActiveEnd=me;this.dayActiveEnd=de;

                if (ms === '02' && Number(ds) >= 29) {
                    if (LeapYear(ys)) {
                        ds='29';
                    } else {
                        ds='28';
                    }
                }
                if (me === '02' && Number(de) >= 29) {
                    if (LeapYear(ys)) {
                        de='29';
                    } else {
                        de='28';
                    }
                }
                dateS=ys+'.'+ms+'.'+ds+(tabKey==='day'&&this.format&&ts?(' '+ts):'');
                dateE=ye+'.'+me+'.'+de+(tabKey==='day'&&this.format&&te?(' '+te):'');
                return dateS+'-'+dateE;
            },

            // 参数改变设置面板初始化 init-表示是否初次渲染
            paramsChange(params, date, init) {
                if (params === 'time') return;
                if (date && init) {
                    this.selectedDate=date;
                    const [start, end]=this.dateFormat(date);
                    this.selectedDateStart=start;
                    this.selectedDateEnd=end;
                    this.clickSelectedDateStart=start;
                    this.clickSelectedDateEnd=end;
                    const [dateS, timeS]=this.setSelectedDay(start);
                    const [dateE, timeE]=this.setSelectedDay(end);
                    this.timeStart=timeS;
                    this.timeEnd=timeE;
                    const [ys, ms, ds]=dateS.split('.');
                    const [ye, me, de]=dateE.split('.');
                    this.yearSelectedStart=ys;
                    this.monthSelectedStart=ms;
                    this.daySelectedStart=ds;
                    this.yearActiveStart=ys;
                    this.monthActiveStart=ms;
                    this.dayActiveStart=ds;
                    this.clickYearSelectedStart=ys;
                    this.clickMonthSelectedStart=ms;
                    this.clickDaySelectedStart=ds;
                    this.yearSelectedEnd=ye;
                    this.monthSelectedEnd=me;
                    this.daySelectedEnd=de;
                    this.yearActiveEnd=ye;
                    this.monthActiveEnd=me;
                    this.dayActiveEnd=de;
                    this.clickYearSelectedEnd=ye;
                    this.clickMonthSelectedEnd=me;
                    this.clickDaySelectedEnd=de;
                } else {
                    this.clickSelectedDateStart='';
                    this.clickSelectedDateEnd='';
                    this.clickThTextSelectedStart='';
                    this.clickThTextSelectedEnd='';
                }

                if (this.selectedDate) {
                    let dateStart='', dateEnd='';
                    switch (this.tabKey) {
                        case 'day':
                            (() => {
                                const format=this.format;
                                const m1=this.clickMonthSelectedStart, d1=this.clickDaySelectedStart, ts=this.timeStart,
                                    m2=this.clickMonthSelectedEnd, d2=this.clickDaySelectedEnd, te=this.timeEnd;
                                dateStart=m1+'.'+d1+`${format&&ts?' '+ts:''}`;
                                dateEnd=m2+'.'+d2+`${format&&te?' '+te:''}`;
                            })();
                            break;
                        case 'week':
                            (() => {
                                const m1=this.clickMonthSelectedStart, d1=this.clickDaySelectedStart, ts=this.timeStart,
                                    m2=this.clickMonthSelectedEnd, d2=this.clickDaySelectedEnd, te=this.timeEnd;
                                dateStart=m1+'.'+d1;
                                dateEnd=m2+'.'+d2;
                            })();
                            break;
                        case 'month':
                            (() => {
                                dateStart=this.clickMonthSelectedStart;
                                dateEnd=this.clickMonthSelectedEnd;
                            })();
                            break;
                        case 'year':
                            (() => {
                                dateStart=this.clickYearSelectedStart;
                                dateEnd=this.clickYearSelectedEnd;
                            })();
                            break;
                        default:
                            break;
                    }

                    this.changeBtnType(dateStart+'-'+dateEnd);
                } else {
                    this.btnType='disabled';
                }

                switch (params) {
                    case 'day':
                        this.dayInitEnd(date, init);
                        break;
                    case 'week':
                        this.weekInitEnd(date);
                        break;
                    case 'month':
                        this.monthInitEnd(date);
                        break;
                    case 'year':
                        this.yearInitEnd(date);
                        break;
                    default:
                        break;
                }
            },

            /**
             * 格式化传入的时间
             * @param date String '2020.02.14 08:09:10'
             */
            setSelectedDay(date) {
                let sDate='', time='';
                if (date) {
                    if (date.includes(':')) {
                        const [d, t]=date.split(' ');
                        sDate=d;
                        time=t;
                    } else {
                        sDate=date;
                    }
                }
                return [sDate, time]
            },
            /**
             * 日
             * @param date String '2019.09.30 08:09:10-2019.10.31 08:09:10'
             */
            dateFormat(date) {
                const reg=/[.:\- ]/g;
                let dateStart='', dateEnd='';
                if (date && date.replace(reg, '')) {
                    const [ds, de]=date.split('-');
                    dateStart=ds;
                    dateEnd=de;
                }

                return [dateStart, dateEnd]
            },
            // 禁用箭头
            disableArrow() {
                const tabKey=this.tabKey;
                switch (tabKey) {
                    case 'day':
                    case 'week':
                        (() => {
                            const yas=this.yearActiveStart, yae=this.yearActiveEnd;
                            const mas=this.monthActiveStart, mae=this.monthActiveEnd;
                            const das=this.dayActiveStart, dae=this.dayActiveEnd;
                            const activeStart=yas+mas;
                            const activeEnd=yae+mae;

                            const reg=/\./g;
                            const nextYear=CountNextYear([yas, mas, das]).replace(reg, '').substr(0, 6);
                            const nextMonth=CountNextMonth([yas, mas, das]).replace(reg, '').substr(0, 6);
                            const prevYear=CountPrevYear([yae, mae, dae]).replace(reg, '').substr(0, 6);
                            const prevMonth=CountPrevMonth([yae, mae, dae]).replace(reg, '').substr(0, 6);

                            this.disableYearStartRight = activeEnd <= nextYear;
                            this.disableMonthStartRight = activeEnd <= nextMonth;
                            this.disableYearEndLeft = prevYear <= activeStart;
                            this.disableMonthEndLeft = prevMonth <= activeStart;
                        })();
                        break;
                    case 'month':
                        (() => {
                            const activeStart=this.yearActiveStart, activeEnd=this.yearActiveEnd;

                            this.disableYearStartRight = (activeEnd-1) <= activeStart;
                            this.disableYearEndLeft = (activeEnd-1) <= activeStart;
                        })();
                        break;
                    case 'year':
                        (() => {
                            const yearStartRight=(this.tabKey==='year'||this.panelYearStart)?this.yearActiveStartRight:this.yearActiveStart,
                                yearEndLeft=this.yearActiveEndLeft;

                            this.disableYearStartRight = (yearEndLeft-1) <= yearStartRight;
                            this.disableYearEndLeft = (yearEndLeft-1) <= yearStartRight;
                        })();
                        break;
                    default:
                        break;
                }
            },

            /**
             * 初始化日期对象
             * @param date
             * @param init -表示是否初次渲染
             */
            dayInitEnd(date, init) {
                const [dateStart, dateEnd]=this.dateFormat(date);
                const [dateS, timeS]=this.setSelectedDay(dateStart);
                const [dateE, timeE]=this.setSelectedDay(dateEnd);
                this.timeStart=timeS;
                this.timeEnd=timeE;
                const countDayEnd=new CountDay(dateE); // 当前计算天的对象
                let daysArrayEnd=countDayEnd.getDaysArray();
                const obj=daysArrayEnd.find(d => (d.year+'.'+d.month+'.'+d.day) === (this.yearSelectedEnd+'.'+this.monthSelectedEnd+'.'+this.daySelectedEnd));
                let date_e='';
                if (obj && obj.flag) {
                    const flag=obj.flag;
                    if (flag === 'p') {
                        date_e=CountPrevMonth(dateE.split('.'));
                    } else if (flag === 'f') {
                        date_e=CountNextMonth(dateE.split('.'));
                    }
                    if (date_e) {
                        const [y, m, d]=date_e.split('.');
                        this.yearActiveEnd=y;
                        this.monthActiveEnd=m;
                        this.dayActiveEnd=d;
                        daysArrayEnd=countDayEnd.changeDay(date_e);
                    }
                }

                this.daysArrayEnd=SetDaysArrayDisabled(this.scope, daysArrayEnd);
                this.countDayEnd=countDayEnd;
                if (init) {
                    const [year, month, day]=this.countDayEnd.countNowDate(); // 获取当前时间、日期
                    this.yearNow=year;
                    this.monthNow=month;
                    this.dayNow=day;
                    if (dateEnd) {
                        const [year, month, day]=dateEnd.split('.');
                        this.yearActiveEnd=year;
                        this.monthActiveEnd=month;
                        this.dayActiveEnd=day;
                    } else {
                        this.yearActiveEnd=year;
                        this.monthActiveEnd=month;
                        this.dayActiveEnd=day;
                    }
                    // 初始化开始时间对象
                    this.dayInitStart(dateS?dateS:CountPrevMonth([year, month, day]), init);
                } else {
                    this.dayInitStart(dateS, init);
                }

                if (this.daySelectedStart && this.daySelectedEnd) {
                    const sds=this.selectedDateStart, sde=this.selectedDateEnd;
                    this.clickSelectedDateStart=sds;
                    this.clickSelectedDateEnd=sde;
                    let dateS=sds, dateE=sde;

                    if (sds.includes(':')) {
                        const [s]=sds.split(' '), [e]=sde.split(' ');
                        dateS=s;
                        dateE=e;
                    }
                    this.setDayEnd(dateE);

                    const sd=dateS.replace(/\./g, '').substr(0, 6);
                    const ed=dateE.replace(/\./g, '').substr(0, 6);
                    if (sd === ed) { // 开始结束时间是否在同一月
                        const daysArray=this.daysArrayEnd;
                        const sInd=daysArray.findIndex(d => d.flag==='n'&&(d.year+'.'+d.month+'.'+d.day)===dateS);
                        const eInd=daysArray.findIndex(d => d.flag==='n'&&(d.year+'.'+d.month+'.'+d.day)===dateE);

                        this.daysArrayEnd=daysArray.map((d, i) => {
                            if (d.flag==='n') {
                                if (i===sInd || i===eInd) {
                                    d.selected='selected'
                                } else if (i>sInd && i<eInd) {
                                    d.multiple='multiple'
                                }
                            }
                            return d;
                        })
                    } else {
                        const daysArray=this.daysArrayEnd;
                        const eInd=daysArray.findIndex(d => d.flag==='n'&&(d.year+'.'+d.month+'.'+d.day)===dateE);
                        this.daysArrayEnd=daysArray.map((d, i) => {
                            if (d.flag==='n') {
                                if (i===eInd) {
                                    d.selected='selected'
                                } else if (i<eInd) {
                                    d.multiple='multiple'
                                }
                            }
                            return d;
                        })
                    }
                }
            },
            /**
             * 初始化日期对象
             * @param date
             * @param init -表示是否初次渲染
             */
            dayInitStart(date, init) {
                const countDayStart=new CountDay(date); // 当前计算天的对象
                let daysArray=countDayStart.getDaysArray();

                const obj=daysArray.find(d => (d.year+'.'+d.month+'.'+d.day) === (this.yearSelectedStart+'.'+this.monthSelectedStart+'.'+this.daySelectedStart));
                let date_s='';
                if (obj && obj.flag) {
                    const flag=obj.flag;
                    if (flag === 'p') {
                        date_s=CountPrevMonth(date.split('.'));
                    } else if (flag === 'f') {
                        date_s=CountNextMonth(date.split('.'));
                    }
                    if (date_s) {
                        const [y, m, d]=date_s.split('.');
                        this.yearActiveStart=y;
                        this.monthActiveStart=m;
                        this.dayActiveStart=d;
                        daysArray=countDayStart.changeDay(date_s);
                    }
                }

                this.countDayStart=countDayStart;
                this.daysArrayStart=SetDaysArrayDisabled(this.scope, daysArray);

                if (init) {
                    const [yearActive, monthActive, dayActive]=date.split('.');
                    this.yearActiveStart=yearActive;
                    this.monthActiveStart=monthActive;
                    this.dayActiveStart=dayActive;
                }

                if (this.daySelectedStart && this.daySelectedEnd) {
                    const dateS=this.selectedDateStart.substr(0, 10);
                    const dateE=this.selectedDateEnd.substr(0, 10);
                    this.setDayStart(dateS);
                    const sd=dateS.replace(/\./g, '').substr(0, 6);
                    const ed=dateE.replace(/\./g, '').substr(0, 6);
                    if (this.panelYearStart || this.panelYearEnd || this.panelMonthStart || this.panelMonthEnd) {
                        this.daysArrayStart=daysArray.map(d => {
                            d.selected='';
                            d.multiple='';
                            return d;
                        });
                        return;
                    }
                    if (ed - sd > 0) {
                        const sDate=dateS.replace(/\./g, '');
                        this.daysArrayStart=daysArray.map(d => {
                            if (d.flag==='n') {
                                const cDate=d.year+d.month+d.day;
                                if (cDate===sDate) {
                                    d.selected='selected'
                                } else if (cDate>sDate) {
                                    d.multiple='multiple'
                                } else {
                                    d.selected='';
                                    d.multiple='';
                                }
                            }
                            return d;
                        })
                    }
                }

                this.disableArrow();
            },
            weekInitEnd(date) {
                const[dateStart, dateEnd]=this.dateFormat(date);
                const countWeek=new CountWeek({date: dateEnd, sort: this.sort});
                this.countWeekEnd=countWeek;
                this.weeksArrayEnd=SetWeeksArrayDisabled(this.scope, countWeek.getWeeksArray());

                if (this.daySelectedStart && this.daySelectedEnd) this.setWeekEnd(this.yearSelectedEnd, this.monthSelectedEnd, this.daySelectedEnd);

                this.weekInitStart(dateStart);
            },
            weekInitStart(date) {
                const countWeek=new CountWeek({date: date, sort: this.sort});
                this.countWeekStart=countWeek;
                this.weeksArrayStart=SetWeeksArrayDisabled(this.scope, countWeek.getWeeksArray());

                if (this.daySelectedStart && this.daySelectedEnd) this.setWeekStart(this.yearSelectedStart, this.monthSelectedStart, this.daySelectedStart);
            },
            // 计算结束周
            countWeeksArrayEnd(date) {
                const countWeek=new CountWeek({date: date, sort: this.sort});
                this.weeksArrayEnd=SetWeeksArrayDisabled(this.scope, countWeek.getWeeksArray());
                if (this.daySelectedStart && this.daySelectedEnd) this.setWeekEnd(this.yearSelectedEnd, this.monthSelectedEnd, this.daySelectedEnd);
            },
            monthInitEnd(date) {
                if (this.panelMonthEnd) {
                    const countMonthEnd=new CountMonth(date); // 当前计算年、月的对象
                    const monthsArrayEnd=SetMonthsArrayDisabled(this.scope, countMonthEnd.getMonthsArray());
                    const YS=this.yearActiveStart, MS=this.monthActiveStart;
                    const YE=this.yearActiveEnd;
                    if (YS === YE) {
                        this.monthsArrayEnd=monthsArrayEnd.map(d => {
                            if (d.month<=MS) d.disabled='disabled';
                            return d;
                        })
                    } else {
                        this.monthsArrayEnd=monthsArrayEnd
                    }
                    return;
                }

                const[dateStart, dateEnd]=this.dateFormat(date);
                const dateS=dateStart.substr(0, 10);
                const dateE=dateEnd.substr(0, 10);
                const countMonthEnd=new CountMonth(dateE); // 当前计算年、月的对象
                const monthsArrayEnd=SetMonthsArrayDisabled(this.scope, countMonthEnd.getMonthsArray());


                // 初始化开始时间对象
                const [ys]=dateS.split('.'), [ye, me]=dateE.split('.');

                if (ye===ys) {
                    monthsArrayEnd.forEach(d => {
                        if (d.month < me) d.disabled='disabled';
                    });
                    this.monthInitStart(dateS, me);
                } else {
                    this.monthInitStart(dateS);
                }
                this.monthsArrayEnd=monthsArrayEnd;
                if (this.monthSelectedStart && this.monthSelectedEnd) this.setMonthEnd(this.yearSelectedEnd, this.monthSelectedEnd);
            },
            // me有值-表示禁用选择
            monthInitStart(date, me) {
                const countMonthStart=new CountMonth(date); // 当前计算年的对象
                const monthsArrayStart=SetMonthsArrayDisabled(this.scope, countMonthStart.getMonthsArray());
                if (this.panelYearStart || this.panelYearEnd || this.panelMonthStart || this.panelMonthEnd) {
                    const YS=this.yearActiveStart;
                    const YE=this.yearActiveEnd, ME=this.monthActiveEnd;
                    if (YS === YE) {
                        this.monthsArrayStart=monthsArrayStart.map(d => {
                            if (d.month>=ME) d.disabled='disabled';
                            return d;
                        })
                    } else {
                        this.monthsArrayStart=monthsArrayStart
                    }
                } else {
                    if (me) {
                        monthsArrayStart.forEach(d => {
                            if (d.month >= me) d.disabled='disabled';
                        })
                    }
                    this.monthsArrayStart=monthsArrayStart;

                    if (this.monthSelectedStart && this.monthSelectedEnd) this.setMonthStart(this.yearSelectedStart, this.monthSelectedStart);
                }

                this.disableArrow();
            },
            yearInitEnd(date) {
                let dateStart='',dateEnd='';
                if (this.panelYearEnd) {
                    dateEnd=date;
                } else {
                    const[YS, YE]=this.dateFormat(date);
                    if (YE - YS > 11) {
                        dateEnd=YE;
                    } else {
                        dateEnd=YS;
                    }
                }
                const dateE=dateEnd.substr(0, 4);
                const countYearEnd=new CountYear(String(Number(dateE)+12)); // 当前计算年的对象
                const yearsArrayEnd=SetYearsArrayDisabled(this.scope, countYearEnd.getYearsArray()).map(d => {
                    if (d.year < 1997) d.disabled='disabled';
                    return d;
                });
                this.yearsArrayEnd=yearsArrayEnd;
                this.yearActiveEndLeft=yearsArrayEnd[0].year;
                this.yearActiveEndRight=yearsArrayEnd[11].year;
                if (this.yearSelectedEnd) this.setYearEnd(this.yearSelectedEnd);

                // 初始化开始时间对象
                if (!this.panelYearEnd) this.yearInitStart(dateStart?dateStart:(yearsArrayEnd[0].year-1).toString());
            },
            yearInitStart(date) {
                const countYearStart=new CountYear(date); // 当前计算年的对象
                const yearsArrayStart=SetYearsArrayDisabled(this.scope, countYearStart.getYearsArray()).map(d => {
                    if (d.year < 1997) d.disabled='disabled';
                    return d;
                });
                this.yearsArrayStart=yearsArrayStart;
                this.yearActiveStartLeft=yearsArrayStart[0].year;
                this.yearActiveStartRight=yearsArrayStart[11].year;
                if (this.yearSelectedStart) this.setYearStart(this.yearSelectedStart);

                this.disableArrow();
            },

            /**
             * 设置选择的年月日
             * @param date String 2019.10.31
             */
            setDayEnd(date) {
                if (!date) return;
                const [year, month, day]=date.split('.'); // 获取传入的时间、日期

                this.clickYearSelectedEnd=year;
                this.clickMonthSelectedEnd=month;
                this.clickDaySelectedEnd=day;
                this.changeDaysArrayEnd({year, month, day});
            },
            /**
             * 设置选择的年月日
             * @param date String 2019.10.31
             */
            setDayStart(date) {
                if (!date) return;
                const [year, month, day]=date.split('.'); // 获取传入的时间、日期

                this.clickYearSelectedStart=year;
                this.clickMonthSelectedStart=month;
                this.clickDaySelectedStart=day;
                this.changeDaysArrayStart({year, month, day});
            },
            setWeekEnd(Y, M, D) {
                const reg=/[.第周]/g;
                const YS=this.yearSelectedStart, MS=this.monthSelectedStart, DS=this.daySelectedStart;
                const YE=Y, ME=M, DE=D;
                const wa=this.weeksArrayEnd;

                // 结束时间
                const obj=wa.find(d => d.weeks.some(d2 => d2.year===YE && d2.month===ME && d2.day===DE));
                let weeksE=[], thTextE='';
                if (obj && obj.hasOwnProperty('weeks')) {
                    const {flag, weeks, thText}=obj;
                    let date='';
                    if (flag === 'p') {
                        date=CountPrevMonth([Y, M, D]);
                    } else if (flag === 'f') {
                        date=CountNextMonth([Y, M, D]);
                    }
                    if (date) {
                        const [y, m, d]=date.split('.');
                        this.yearActiveEnd=y;
                        this.monthActiveEnd=m;
                        this.dayActiveEnd=d;
                        this.countWeeksArrayEnd(date);
                        this.disableArrow();
                        return;
                    }
                    weeksE=weeks;
                    thTextE=thText;
                }
                this.weeksSelectedEnd=weeksE;
                this.thTextSelectedEnd=thTextE;
                this.clickThTextSelectedEnd=thTextE;
                if (weeksE && weeksE.length) {
                    const {year, month}=weeksE[0];
                    this.clickSelectedDateEnd=year+'.'+month+'.'+DE;
                }
                const dateE=thTextE.replace(reg, '');
                if (YS===YE && MS===ME) { // 开始结束在同一月
                    // 开始时间
                    let thTextS='';
                    const obj=wa.find(d => d.weeks.some(d2 => d2.year===YS && d2.month===MS && d2.day===DS));
                    if (obj && obj.hasOwnProperty('weeks')) {
                        const {thText}=obj;
                        thTextS=thText;
                    }

                    const dateS=thTextS.replace(reg, '');
                    this.weeksArrayEnd=wa.map(d => {
                        if (d.flag === 'n') {
                            const dateC=d.thText.replace(reg, '');
                            if (dateC === dateS || dateC === dateE) {
                                d.selected='selected';
                            } else if ((dateC > dateS && dateC < dateE) || (dateC < dateS && dateC > dateE)) {
                                d.multiple='multiple';
                            }
                        }
                        return d;
                    });
                } else {
                    this.weeksArrayEnd=wa.map(d => {
                        if (d.flag === 'n') {
                            const dateC=d.thText.replace(reg, '');
                            if (dateC === dateE) {
                                d.selected='selected';
                            } else if (dateC < dateE) {
                                d.multiple='multiple';
                            }
                        }
                        return d;
                    });
                }
            },
            setWeekStart(Y, M, D) {
                const wa=this.weeksArrayStart;
                if (this.panelYearStart || this.panelYearEnd || this.panelMonthStart || this.panelMonthEnd) {
                    this.weeksArrayStart=wa.map(d => {
                        d.selected='';
                        d.multiple='';
                        return d;
                    });
                } else {
                    const reg=/[.第周]/g;
                    const YS=Y, MS=M, DS=D;

                    let weeksS=[], thTextS='';
                    const obj=wa.find(d => d.weeks.some(d2 => d2.year===YS && d2.month===MS && d2.day===DS));
                    if (obj && obj.hasOwnProperty('weeks')) {
                        const {flag, weeks, thText}=obj;
                        let date='';
                        if (flag === 'p') {
                            date=CountPrevMonth([Y, M, D]);
                        } else if (flag === 'f') {
                            date=CountNextMonth([Y, M, D]);
                        }
                        if (date) {
                            const [y, m, d]=date.split('.');
                            this.yearActiveStart=y;
                            this.monthActiveStart=m;
                            this.dayActiveStart=d;
                            this.weekInitStart(date);
                            this.disableArrow();
                            return;
                        }
                        weeksS=weeks;
                        thTextS=thText;
                    }
                    this.weeksSelectedStart=weeksS;
                    this.thTextSelectedStart=thTextS;
                    this.clickThTextSelectedStart=thTextS;
                    if (weeksS && weeksS.length) {
                        const {year, month}=weeksS[0];
                        this.clickSelectedDateStart=year+'.'+month+'.'+DS;
                    }
                    if (thTextS) {
                        const dateS=thTextS.replace(reg, '');

                        this.weeksArrayStart=wa.map(d => {
                            if (d.flag === 'n') {
                                const dateC=d.thText.replace(reg, '');
                                if (dateC===dateS) d.selected='selected';
                                else if (dateC>dateS) d.multiple='multiple';
                            }
                            return d;
                        });
                    } else {
                        this.weeksArrayStart=wa.map(d => {
                            d.selected='';
                            d.multiple='';
                            return d;
                        });
                    }
                }
            },
            setMonthEnd(Y, M) {
                const YS=this.yearSelectedStart, MS=this.monthSelectedStart;
                const dateS=YS+MS;
                const dateE=Y+M;
                this.yearSelectedEnd=Y;
                this.monthSelectedEnd=M;
                this.clickSelectedDateEnd=Y+'.'+M;
                // 设置默认选中状态
                const monthsArray=this.monthsArrayEnd;

                // YS === Y表示在同一年
                if (YS === Y || dateE-dateS<=12) {
                    this.monthsArrayEnd=monthsArray.map(d => {
                        const dateC=d.year+d.month;
                        if (dateC===dateS || dateC===dateE) d.selected='selected';
                        else if (dateC>dateS && dateC<dateE) d.multiple='multiple';
                        return d;
                    })
                } else {
                    this.monthsArrayEnd=monthsArray.map(d => {
                        const dateC=d.year+d.month;
                        if (dateC===dateE) d.selected='selected';
                        else if (dateC<dateE) d.multiple='multiple';
                        return d;
                    })
                }
            },
            setMonthStart(Y, M) {
                const monthsArray=this.monthsArrayStart;
                const dateS=Y+M;
                const YE=this.yearSelectedStart, ME=this.monthSelectedStart;
                const dateE=YE+ME;
                this.yearSelectedStart=Y;
                this.monthSelectedStart=M;
                this.clickSelectedDateStart=Y+'.'+M;
                // YE === Y表示在同一年
                if (YE === Y || dateE-dateS>12) {
                    // 设置默认选中状态
                    this.monthsArrayStart=monthsArray.map(d => {
                        const dateC=d.year+d.month;
                        if (dateC===dateS) d.selected='selected';
                        else if (dateC>dateS) d.multiple='multiple';
                        return d;
                    })
                }
            },
            setYearEnd(Y) {
                const yearsArray=this.yearsArrayEnd, ye=this.yearSelectedEnd;
                if (this.panelYearEnd) {
                    this.yearsArrayEnd=yearsArray.map(d => {
                        if (d.year===ye) d.selected='selected';
                        return d;
                    })
                } else {
                    this.clickSelectedDateEnd=Y;
                    const ys=this.yearSelectedStart;
                    if (ye-ys<=12) {
                        this.yearsArrayEnd=yearsArray.map(d => {
                            if (d.year===ys || d.year===ye) d.selected='selected';
                            else if (d.year>ys && d.year<ye) d.multiple='multiple';
                            return d;
                        })
                    } else {
                        this.yearsArrayEnd=yearsArray.map(d => {
                            if (d.year===ye) d.selected='selected';
                            else if (d.year<ye) d.multiple='multiple';
                            return d;
                        })
                    }
                }
            },
            setYearStart(Y) {
                const yearsArray=this.yearsArrayStart, ys=this.yearSelectedStart, ye=this.yearSelectedEnd;
                if (this.panelYearStart) {
                    this.yearsArrayStart=yearsArray.map(d => {
                        if (d.year===ys) d.selected='selected';
                        return d;
                    })
                } else {
                    if (this.panelYearEnd) return;
                    this.clickSelectedDateStart=Y;
                    this.yearsArrayStart=yearsArray.map(d => {
                        if (d.year===ys || d.year===ye) {
                            d.selected='selected';
                        } else if (d.year>ys && d.year<ye) {
                            d.multiple='multiple';
                        }
                        return d;
                    })
                }
            },
            /**
             * 改变选中状态
             * @param obj {year, month, day}
             * @param clearOther Boolean 清空其他
             */
            changeDaysArrayEnd({year, month, day}, clearOther) {
                this.daysArrayEnd=this.daysArrayEnd.map(d => {
                    if (d.year===year&&d.month===month&&d.day===day) {
                        d.selected='selected';
                    } else if (clearOther) {
                        d.selected='';
                        d.multiple='';
                    }
                    return d;
                })
            },
            /**
             * 改变选中状态
             * @param obj {year, month, day}
             * @param clearOther Boolean 清空其他
             */
            changeDaysArrayStart({year, month, day}, clearOther) {
                this.daysArrayStart=this.daysArrayStart.map(d => {
                    if (d.year===year&&d.month===month&&d.day===day) {
                        d.selected='selected';
                    } else if (clearOther) {
                        d.selected='';
                        d.multiple='';
                    }
                    return d;
                })
            },
            /**
             * 改变选中状态
             * @param thText
             * @param clearOther Boolean 清空其他
             */
            changeWeeksArrayEnd(thText, clearOther) {
                const reg=/[.第周]/g;
                const dateE=thText.replace(reg, '');
                const dateS=this.clickThTextSelectedStart.replace(reg, '');
                this.weeksArrayEnd=this.weeksArrayEnd.map(d => {
                    if (d.flag === 'n') {
                        const dateC=d.thText.replace(reg, '');
                        if ((this.clickYearSelectedStart+'.'+this.clickMonthSelectedStart) === (this.clickYearSelectedEnd+'.'+this.clickMonthSelectedEnd)) {
                            if (d.thText===thText || d.thText === this.clickThTextSelectedStart) {
                                d.selected='selected';
                            } else if ((dateC < dateE && dateC > dateS) || (dateC > dateE && dateC < dateS)) {
                                d.multiple='multiple';
                            } else if (clearOther) {
                                d.selected='';
                                d.multiple='';
                            }
                        } else {
                            if (d.thText===thText) {
                                d.selected='selected';
                            } else if (dateS && dateC < dateE) {
                                d.multiple='multiple';
                            } else if (clearOther) {
                                d.selected='';
                                d.multiple='';
                            }
                        }
                    }
                    return d;
                })
            },
            /**
             * 改变选中状态
             * @param thText
             * @param clearOther Boolean 清空其他
             */
            changeWeeksArrayStart(thText, clearOther) {
                const reg=/[.第周]/g;
                const dateS=thText.replace(reg, '');
                const dateE=this.clickThTextSelectedEnd.replace(reg, '');
                this.weeksArrayStart=this.weeksArrayStart.map(d => {
                    if (d.flag === 'n') {
                        const dateC=d.thText.replace(reg, '');
                        if ((this.clickYearSelectedStart+'.'+this.clickMonthSelectedStart) === (this.clickYearSelectedEnd+'.'+this.clickMonthSelectedEnd)) {
                            if (d.thText===thText || d.thText === this.clickThTextSelectedEnd) {
                                d.selected='selected';
                            } else if ((dateC < dateE && dateC > dateS) || (dateC > dateE && dateC < dateS)) {
                                d.multiple='multiple';
                            } else if (clearOther) {
                                d.selected='';
                                d.multiple='';
                            }
                        } else {
                            if (d.thText===thText) {
                                d.selected='selected';
                            } else if (dateE && dateC > dateS) {
                                d.multiple='multiple';
                            } else if (clearOther) {
                                d.selected='';
                                d.multiple='';
                            }
                        }
                    }
                    return d;
                })
            },
            changeMonthsArrayEnd({year, month}, clearOther, clearDisable) {
                this.monthsArrayEnd=this.monthsArrayEnd.map(d => {
                    if (clearDisable) {
                        d.selected='';
                        d.multiple='';
                        d.disabled='';
                    } else {
                        if (d.year===year && d.month===month) {
                            d.selected='selected';
                        } else if (clearOther) {
                            d.selected='';
                            d.multiple='';
                        }
                    }
                    return d;
                })
            },
            changeMonthsArrayStart({year, month}, clearOther, clearDisable) {
                this.monthsArrayStart=this.monthsArrayStart.map(d => {
                    if (clearDisable) {
                        d.selected='';
                        d.multiple='';
                        d.disabled='';
                    } else {
                        if (d.year===year && d.month===month) {
                            d.selected='selected';
                        } else if (clearOther) {
                            d.selected='';
                            d.multiple='';
                        }
                    }
                    return d;
                })
            },
            changeYearsArrayEnd(year, clearOther) {
                this.yearsArrayEnd=this.yearsArrayEnd.map(d => {
                    if (d.year===year) {
                        d.selected='selected';
                    } else if (clearOther) {
                        d.selected='';
                        d.multiple='';
                    }
                    return d;
                })
            },
            changeYearsArrayStart(year, clearOther) {
                this.yearsArrayStart=this.yearsArrayStart.map(d => {
                    if (d.year===year) {
                        d.selected='selected';
                    } else if (clearOther) {
                        d.selected='';
                        d.multiple='';
                    }
                    return d;
                })
            },
            /**
             * 清除时间
             */
            clearTime() {
                this.yearActiveStartLeft='';
                this.yearActiveStartRight='';
                this.yearActiveEndLeft='';
                this.yearActiveEndRight='';
                this.selectedDate='';
                this.selectedDateStart='';
                this.selectedDateEnd='';
                this.clickSelectedDateStart='';
                this.clickSelectedDateEnd='';
                this.timeStart='';
                this.timeEnd='';
                this.yearSelectedStart='';
                this.monthSelectedStart='';
                this.daySelectedStart='';
                this.clickYearSelectedStart='';
                this.clickMonthSelectedStart='';
                this.clickDaySelectedStart='';
                this.yearSelectedEnd='';
                this.monthSelectedEnd='';
                this.daySelectedEnd='';
                this.clickYearSelectedEnd='';
                this.clickMonthSelectedEnd='';
                this.clickDaySelectedEnd='';
                this.thTextSelectedStart='';
                this.thTextSelectedEnd='';
                this.clickThTextSelectedStart='';
                this.clickThTextSelectedEnd='';
                this.weeksSelectedStart=[];
                this.weeksSelectedEnd=[];
                this.$emit('change', ['', '', '', '', '', '', '']);
                this.btnType='disabled';
                this.resetDataArray(this.tabKey);
            },

            // 重置【日 周 月 年】面板数据选中状态
            resetDataArray(tabKey) {
                switch (tabKey) {
                    case 'day':
                        this.changeDaysArrayStart({year: '', month: '', day: ''}, true);
                        this.changeDaysArrayEnd({year: '', month: '', day: ''}, true);
                        break;
                    case 'week':
                        this.changeWeeksArrayStart('', true);
                        this.changeWeeksArrayEnd('', true);
                        break;
                    case 'month':
                        this.changeMonthsArrayStart({year: '', month: ''}, true, true);
                        this.changeMonthsArrayEnd({year: '', month: ''}, true, true);
                        break;
                    case 'year':
                        this.changeYearsArrayStart('', true);
                        this.changeYearsArrayEnd('', true);
                        break;
                    default: break;
                }
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
                if (this.pickerBoxStatus && this.blurStatus) {
                    this.parent.pickerBoxStatus=false;
                    this.pickerBoxStatus=false;
                }
            },
            /**
             * 切换日期
             * @param date String '2019.10.31'
             */
            switchDayStart(date) {
                this.countDayStart=new CountDay(date); // 当前计算天的对象
                const daysArrayStart=this.countDayStart.getDaysArray();
                this.daysArrayStart=SetDaysArrayDisabled(this.scope, daysArrayStart);
                const [yearActive, monthActive, dayActive]=date.split('.'); // 获取传入的时间、日期
                this.yearActiveStart=yearActive;
                this.monthActiveStart=monthActive;
                this.dayActiveStart=dayActive;

                const dateS=this.yearSelectedStart+this.monthSelectedStart+this.daySelectedStart;
                const dateE=this.yearSelectedEnd+this.monthSelectedEnd+this.daySelectedEnd;
                if (dateS > dateE) {
                    this.daysArrayStart=this.daysArrayStart.map(d => {
                        if (d.flag==='n') {
                            const dateC=d.year+d.month+d.day;
                            if (dateC === dateS || dateC === dateE) d.selected='selected';
                            else if (dateC > dateE && dateC < dateS) d.multiple='multiple';
                        }
                        return d;
                    })
                } else {
                    this.daysArrayStart=this.daysArrayStart.map(d => {
                        if (d.flag==='n') {
                            const dateC=d.year+d.month+d.day;
                            if (dateC === dateS || dateC === dateE) d.selected='selected';
                            else if (dateC > dateS && dateC < dateE) d.multiple='multiple';
                        }
                        return d;
                    })
                }
                this.disableArrow();
            },
            /**
             * 切换日期
             * @param date String '2019.10.31'
             */
            switchDayEnd(date) {
                this.countDayEnd=new CountDay(date); // 当前计算天的对象
                const daysArrayEnd=this.countDayEnd.getDaysArray();
                this.daysArrayEnd=SetDaysArrayDisabled(this.scope, daysArrayEnd);
                const [yearActive, monthActive, dayActive]=date.split('.'); // 获取传入的时间、日期
                this.yearActiveEnd=yearActive;
                this.monthActiveEnd=monthActive;
                this.dayActiveEnd=dayActive;

                const dateS=this.yearSelectedStart+this.monthSelectedStart+this.daySelectedStart;
                const dateE=this.yearSelectedEnd+this.monthSelectedEnd+this.daySelectedEnd;

                if (dateS > dateE) {
                    this.daysArrayEnd=this.daysArrayEnd.map(d => {
                        const dateC=d.year+d.month+d.day;
                        if (d.flag==='n' && dateC > dateE && dateC < dateS) d.multiple='multiple';
                        if (d.flag==='n' && dateC === dateS || dateC === dateE) d.selected='selected';
                        return d;
                    })
                } else {
                    this.daysArrayEnd=this.daysArrayEnd.map(d => {
                        const dateC=d.year+d.month+d.day;
                        if (d.flag==='n' && dateC > dateS && dateC < dateE) d.multiple='multiple';
                        if (d.flag==='n' && dateC === dateS || dateC === dateE) d.selected='selected';
                        return d;
                    })
                }

                this.disableArrow();
            },
            switchWeekStart(Y, M) {
                this.yearActiveStart=Y;
                this.monthActiveStart=M;
                this.countWeekStart.setYearMonth(Y, M);
                this.weeksArrayStart=SetWeeksArrayDisabled(this.scope, this.countWeekStart.getWeeksArray());
                this.changeWeeksArrayStart(this.thTextSelectedStart, false);
                this.disableArrow();
            },
            switchWeekEnd(Y, M) {
                this.yearActiveEnd=Y;
                this.monthActiveEnd=M;
                this.countWeekEnd.setYearMonth(Y, M);
                this.weeksArrayEnd=SetWeeksArrayDisabled(this.scope, this.countWeekEnd.getWeeksArray());
                this.changeWeeksArrayEnd(this.thTextSelectedEnd, false);
                this.disableArrow();
            },
            switchMonthStart(date) {
                const countMonthStart=new CountMonth(date); // 当前计算天的对象
                this.monthsArrayStart=SetMonthsArrayDisabled(this.scope, countMonthStart.getMonthsArray());

                const dateS=this.yearSelectedStart+this.monthSelectedStart;
                const dateE=this.yearSelectedEnd+this.monthSelectedEnd;

                if (dateS > dateE) {
                    this.monthsArrayStart=this.monthsArrayStart.map(d => {
                        const dateC=d.year+d.month;
                        if (dateC > dateE && dateC < dateS) d.multiple='multiple';
                        if (dateC === dateS || dateC === dateE) d.selected='selected';
                        return d;
                    })
                } else {
                    this.monthsArrayStart=this.monthsArrayStart.map(d => {
                        const dateC=d.year+d.month;
                        if (dateC > dateS && dateC < dateE) d.multiple='multiple';
                        if (dateC === dateS || dateC === dateE) d.selected='selected';
                        return d;
                    })
                }

                this.disableArrow();
            },
            switchMonthEnd(date) {
                const countMonthEnd=new CountMonth(date); // 当前计算天的对象
                this.monthsArrayEnd=SetMonthsArrayDisabled(this.scope, countMonthEnd.getMonthsArray());

                const dateS=this.yearSelectedStart+this.monthSelectedStart;
                const dateE=this.yearSelectedEnd+this.monthSelectedEnd;
                if (dateS > dateE) {
                    this.monthsArrayEnd=this.monthsArrayEnd.map(d => {
                        const dateC=d.year+d.month;
                        if (dateC > dateE && dateC < dateS) d.multiple='multiple';
                        if (dateC === dateS || dateC === dateE) d.selected='selected';
                        return d;
                    })
                } else {
                    this.monthsArrayEnd=this.monthsArrayEnd.map(d => {
                        const dateC=d.year+d.month;
                        if (dateC > dateS && dateC < dateE) d.multiple='multiple';
                        if (dateC === dateS || dateC === dateE) d.selected='selected';
                        return d;
                    })
                }

                this.disableArrow();
            },
            switchYearStart(date) {
                this.countYearStart=new CountYear(date); // 当前计算天的对象
                const yearsArrayStart=SetYearsArrayDisabled(this.scope, this.countYearStart.getYearsArray()).map(d => {
                    if (d.year < '1997') d.disabled='disabled';
                    return d;
                });
                this.yearsArrayStart=yearsArrayStart;

                this.yearActiveStartLeft=yearsArrayStart[0].year;
                this.yearActiveStartRight=yearsArrayStart[yearsArrayStart.length-1].year;

                this.disableArrow();
                if (this.panelYearStart) return;

                const dateS=this.yearSelectedStart;
                const dateE=this.yearSelectedEnd;

                if (dateS > dateE) {
                    this.yearsArrayStart=this.yearsArrayStart.map(d => {
                        if (d.year > dateE && d.year < dateS) d.multiple='multiple';
                        if (d.year === dateS || d.year === dateE) d.selected='selected';
                        return d;
                    })
                } else {
                    this.yearsArrayStart=this.yearsArrayStart.map(d => {
                        if (d.year > dateS && d.year < dateE) d.multiple='multiple';
                        if (d.year === dateS || d.year === dateE) d.selected='selected';
                        return d;
                    })
                }
            },
            switchYearEnd(date) {
                this.countYearEnd=new CountYear(date); // 当前计算天的对象
                const yearsArrayEnd=SetYearsArrayDisabled(this.scope, this.countYearEnd.getYearsArray()).map(d => {
                    if (d.year < '1997') d.disabled='disabled';
                    return d;
                });
                this.yearsArrayEnd=yearsArrayEnd;

                this.yearActiveEndLeft=yearsArrayEnd[0].year;
                this.yearActiveEndRight=yearsArrayEnd[yearsArrayEnd.length-1].year;

                this.disableArrow();
                if (this.panelYearEnd) return;

                const dateS=this.yearSelectedStart;
                const dateE=this.yearSelectedEnd;
                if (dateS > dateE) {
                    this.yearsArrayEnd=this.yearsArrayEnd.map(d => {
                        if (d.year > dateE && d.year < dateS) d.multiple='multiple';
                        if (d.year === dateS || d.year === dateE) d.selected='selected';
                        return d;
                    })
                } else {
                    this.yearsArrayEnd=this.yearsArrayEnd.map(d => {
                        if (d.year > dateS && d.year < dateE) d.multiple='multiple';
                        if (d.year === dateS || d.year === dateE) d.selected='selected';
                        return d;
                    })
                }
            },

            /**
             * 上一年
             */
            prevYearStart() {
                if (this.disableStartYearLeft) return;
                const tabKey=this.tabKey;

                if (this.panelYearStart) {
                    const date=(this.yearsArrayStart.shift().year-1).toString();
                    this.switchYearStart(date);
                }
                switch (tabKey) {
                    case 'day':
                        (() => {
                            const date=CountPrevYear([this.yearActiveStart, this.monthActiveStart, this.dayActiveStart]);
                            if (this.panelMonthStart) this.switchMonthStart(date);
                            this.switchDayStart(date);
                        })();
                        break;
                    case 'week':
                        (() => {
                            const date=CountPrevYear([this.yearActiveStart, this.monthActiveStart, '01']);
                            if (this.panelMonthStart) this.switchMonthStart(date);
                            const [Y, M]=date.split('.');
                            this.switchWeekStart(Y, M);
                        })();
                        break;
                    case 'month':
                        (() => {
                            const date=(this.yearActiveStart-1).toString();
                            this.yearActiveStart=date;
                            this.switchMonthStart(date+'.'+this.monthActiveStart);
                            this.changeMonthsArrayEnd({year: '', month: ''}, true, true);
                        })();
                        break;
                    case 'year':
                        (() => {
                            const date=(this.yearsArrayStart.shift().year-1).toString();
                            this.switchYearStart(date);
                        })();
                        break;
                    default:
                        break;
                }
            },
            /**
             * 上一年
             */
            prevYearEnd() {
                if (this.disableYearEndLeft) return;
                const tabKey=this.tabKey;

                if (this.panelYearEnd) {
                    const date=(this.yearsArrayEnd.shift().year-1).toString();
                    this.switchYearEnd(date);
                }
                switch (tabKey) {
                    case 'day':
                        (() => {
                            const date=CountPrevYear([this.yearActiveEnd, this.monthActiveEnd, this.dayActiveEnd]);
                            if (this.panelMonthEnd) this.switchMonthEnd(date);
                            this.switchDayEnd(date);
                        })();
                        break;
                    case 'week':
                        (() => {
                            const date=CountPrevYear([this.yearActiveEnd, this.monthActiveEnd, '01']);
                            if (this.panelMonthEnd) this.switchMonthEnd(date);
                            const [Y, M]=date.split('.');
                            this.switchWeekEnd(Y, M);
                        })();
                        break;
                    case 'month':
                        (() => {
                            const date=(this.yearActiveEnd-1).toString();
                            this.yearActiveEnd=date;
                            this.switchMonthEnd(date+'.'+this.monthActiveEnd);
                        })();
                        break;
                    case 'year':
                        (() => {
                            const date=(this.yearsArrayEnd.shift().year-1).toString();
                            this.switchYearEnd(date);
                        })();
                        break;
                    default:
                        break;
                }
            },
            /**
             * 下一年
             */
            nextYearStart() {
                const tabKey=this.tabKey;

                if (this.panelYearStart) {
                    const date=(parseInt(this.yearsArrayStart.pop().year)+12).toString();
                    this.switchYearStart(date);
                }
                switch (tabKey) {
                    case 'day':
                        (() => {
                            const date=CountNextYear([this.yearActiveStart, this.monthActiveStart, this.dayActiveStart]);
                            if (this.panelMonthStart) this.switchMonthStart(date);
                            this.switchDayStart(date);
                        })();
                        break;
                    case 'week':
                        (() => {
                            const date=CountNextYear([this.yearActiveStart, this.monthActiveStart, '01']);
                            if (this.panelMonthStart) this.switchMonthStart(date);
                            const [Y, M]=date.split('.');
                            this.switchWeekStart(Y, M);
                        })();
                        break;
                    case 'month':
                        (() => {
                            const date=(parseInt(this.yearActiveStart)+1).toString();
                            this.yearActiveStart=date;
                            this.switchMonthStart(date+'.'+this.monthActiveStart);
                        })();
                        break;
                    case 'year':
                        (() => {
                            const date=(parseInt(this.yearsArrayStart.pop().year)+12).toString();
                            this.switchYearStart(date);
                        })();
                        break;
                    default:
                        break;
                }
            },
            /**
             * 下一年
             */
            nextYearEnd() {
                const tabKey=this.tabKey;

                if (this.panelYearEnd) {
                    const date=(parseInt(this.yearsArrayEnd.pop().year)+12).toString();
                    this.switchYearEnd(date);
                }
                switch (tabKey) {
                    case 'day':
                        (() => {
                            const date=CountNextYear([this.yearActiveEnd, this.monthActiveEnd, this.dayActiveEnd]);
                            if (this.panelMonthEnd) this.switchMonthEnd(date);
                            this.switchDayEnd(date);
                        })();
                        break;
                    case 'week':
                        (() => {
                            const date=CountNextYear([this.yearActiveEnd, this.monthActiveEnd, '01']);
                            if (this.panelMonthEnd) this.switchMonthEnd(date);
                            const [Y, M]=date.split('.');
                            this.switchWeekEnd(Y, M);
                        })();
                        break;
                    case 'month':
                        (() => {
                            const date=(parseInt(this.yearActiveEnd)+1).toString();
                            this.yearActiveEnd=date;
                            this.switchMonthEnd(date+'.'+this.monthActiveEnd);
                            this.changeMonthsArrayStart({year: '', month: ''}, true, true);
                        })();
                        break;
                    case 'year':
                        (() => {
                            const date=(parseInt(this.yearsArrayEnd.pop().year)+12).toString();
                            this.switchYearEnd(date);
                        })();
                        break;
                    default:
                        break;
                }
            },
            /**
             * 上一月
             */
            prevMonthStart() {
                const tabKey=this.tabKey;

                if (this.panelYearStart) {
                    const date=(this.yearsArrayStart.shift().year-1).toString();
                    this.switchYearStart(date);
                }
                switch (tabKey) {
                    case 'day':
                        (() => {
                            const date=CountPrevMonth([this.yearActiveStart, this.monthActiveStart, this.dayActiveStart]);
                            if (this.panelMonthStart) this.switchMonthStart(date);
                            if (this.panelYearStart) this.switchYearStart(date.substr(0, 4));
                            this.switchDayStart(date);
                        })();
                        break;
                    case 'week':
                        (() => {
                            const date=CountPrevMonth([this.yearActiveStart, this.monthActiveStart, '01']);
                            if (this.panelMonthStart) this.switchMonthStart(date);
                            const [Y, M]=date.split('.');
                            this.switchWeekStart(Y, M);
                        })();
                        break;
                    default:
                        break;
                }
            },
            /**
             * 上一月
             */
            prevMonthEnd() {
                const tabKey=this.tabKey;

                if (this.panelYearEnd) {
                    const date=(this.yearsArrayEnd.shift().year-1).toString();
                    this.switchYearEnd(date);
                }
                switch (tabKey) {
                    case 'day':
                        (() => {
                            const date=CountPrevMonth([this.yearActiveEnd, this.monthActiveEnd, this.dayActiveEnd]);
                            this.switchDayEnd(date);
                        })();
                        break;
                    case 'week':
                        (() => {
                            const date=CountPrevMonth([this.yearActiveEnd, this.monthActiveEnd, '01']);
                            const [Y, M]=date.split('.');
                            this.switchWeekEnd(Y, M);
                        })();
                        break;
                    default:
                        break;
                }
            },
            /**
             * 下一月
             */
            nextMonthStart() {
                const tabKey=this.tabKey;

                if (this.panelYearStart) {
                    const date=(parseInt(this.yearsArrayStart.pop().year)+12).toString();
                    this.switchYearStart(date);
                }
                switch (tabKey) {
                    case 'day':
                        (() => {
                            const date=CountNextMonth([this.yearActiveStart, this.monthActiveStart, this.dayActiveStart]);
                            this.switchDayStart(date);
                        })();
                        break;
                    case 'week':
                        (() => {
                            const date=CountNextMonth([this.yearActiveStart, this.monthActiveStart, '01']);
                            const [Y, M]=date.split('.');
                            this.switchWeekStart(Y, M);
                        })();
                        break;
                    default:
                        break;
                }
            },
            /**
             * 下一月
             */
            nextMonthEnd() {
                const tabKey=this.tabKey;

                if (this.panelYearEnd) {
                    const date=(parseInt(this.yearsArrayEnd.pop().year)+12).toString();
                    this.switchYearEnd(date);
                }
                switch (tabKey) {
                    case 'day':
                        (() => {
                            const date=CountNextMonth([this.yearActiveEnd, this.monthActiveEnd, this.dayActiveEnd]);
                            this.switchDayEnd(date);
                        })();
                        break;
                    case 'week':
                        (() => {
                            const date=CountNextMonth([this.yearActiveEnd, this.monthActiveEnd, '01']);
                            const [Y, M]=date.split('.');
                            this.switchWeekEnd(Y, M);
                        })();
                        break;
                    default:
                        break;
                }
            },

            // 点击active的年，去选择active的年
            yearActiveClickStart() {
                if (this.tabKey==='year') return;
                let year=this.yearActiveStart;
                if (this.panelYearEnd) year=String(this.yearActiveEndLeft-1);
                this.panelYearStart=true;
                this.yearInitStart(year);
            },
            yearActiveClickEnd() {
                if (this.tabKey==='year') return;
                let year=this.yearActiveStart;
                if (this.panelYearStart) year=this.yearActiveStartRight;
                this.panelYearEnd=true;
                this.yearInitEnd(year);
            },
            // 点击active的月，去选择active的月
            monthActiveClickStart() {
                if (this.tabKey==='month') return;
                this.panelMonthStart=true;
                this.monthInitStart(this.yearActiveStart+'.'+this.monthActiveStart);
            },
            monthActiveClickEnd() {
                if (this.tabKey==='month') return;
                this.panelMonthEnd=true;
                this.monthInitEnd(this.yearActiveEnd+'.'+this.monthActiveEnd);
            },
            /**
             * 设置时间的默认值
             * @param format String 时间格式
             * @param start Boolean 是否是开始时间
             * @return String
             */
            setTimeDefault(format, start) {
                if (start) {
                    // 计算开始时间
                    return format==='hm'?'00:00':'00:00:00';
                } else {
                    // 计算结束时间
                    let t='';
                    const d=new Date(),
                        h=d.getHours(),
                        m=d.getMinutes(),
                        s=d.getSeconds(),
                        hour=h<10?'0'+h:h,
                        minute=m<10?'0'+m:m,
                        second=s<10?'0'+s:s;
                    if (format === 'hm') t=hour+':'+minute;
                    else t=hour+':'+minute+':'+second;

                    return t;
                }
            },
            /**
             * 点击日期-开始日期
             * @param obj {year, month, day}
             */
            dayChangeStart({year, month, day}) {
                let clearOther=false;
                const format=this.format;
                if (this.clickYearSelectedStart && this.clickYearSelectedEnd) {
                    this.clickYearSelectedStart=year;
                    this.clickMonthSelectedStart=month;
                    this.clickDaySelectedStart=day;
                    this.clickSelectedDateStart=year+'.'+month+'.'+day+(format?(this.timeStart?' '+this.timeStart:' '+(this.timeStart=this.setTimeDefault(format, true))):'');

                    this.clickYearSelectedEnd='';
                    this.clickMonthSelectedEnd='';
                    this.clickDaySelectedEnd='';
                    this.clickSelectedDateEnd='';
                    clearOther=true;

                    this.changeDaysArrayEnd({year: '', month: '', day: ''}, clearOther);
                } else if (this.clickYearSelectedStart && !this.clickYearSelectedEnd) {
                    this.clickYearSelectedEnd=year;
                    this.clickMonthSelectedEnd=month;
                    this.clickDaySelectedEnd=day;
                    this.clickSelectedDateEnd=year+'.'+month+'.'+day+(format?(this.timeEnd?' '+this.timeEnd:' '+(this.timeEnd=this.setTimeDefault(format, false))):'');
                } else {
                    this.clickYearSelectedStart=year;
                    this.clickMonthSelectedStart=month;
                    this.clickDaySelectedStart=day;
                    this.clickSelectedDateStart=year+'.'+month+'.'+day+(format?(this.timeStart?' '+this.timeStart:' '+(this.timeStart=this.setTimeDefault(format, true))):'');
                }

                if (this.clickYearSelectedStart && this.clickYearSelectedEnd) this.btnType='primary';
                else this.btnType='disabled';

                this.changeDaysArrayStart({year, month, day}, clearOther);
            },
            /**
             * 点击日期-结束日期
             * @param obj {year, month, day}
             */
            dayChangeEnd({year, month, day}) {
                let clearOther=false;
                const format=this.format;
                if (this.clickYearSelectedStart && this.clickYearSelectedEnd) {
                    this.clickYearSelectedEnd=year;
                    this.clickMonthSelectedEnd=month;
                    this.clickDaySelectedEnd=day;
                    // this.clickSelectedDateEnd=year+'.'+month+'.'+day+(this.format&&this.timeEnd?' '+this.timeEnd:'');
                    this.clickSelectedDateEnd=year+'.'+month+'.'+day+(format?(this.timeEnd?' '+this.timeEnd:' '+(this.timeEnd=this.setTimeDefault(format, false))):'');

                    this.clickYearSelectedStart='';
                    this.clickMonthSelectedStart='';
                    this.clickDaySelectedStart='';
                    this.clickSelectedDateStart='';
                    clearOther=true;

                    this.changeDaysArrayStart({year: '', month: '', day: ''}, clearOther);
                } else if (!this.clickYearSelectedStart && this.clickYearSelectedEnd) {
                    this.clickYearSelectedStart=year;
                    this.clickMonthSelectedStart=month;
                    this.clickDaySelectedStart=day;
                    this.clickSelectedDateStart=year+'.'+month+'.'+day+(format?(this.timeStart?' '+this.timeStart:' '+(this.timeStart=this.setTimeDefault(format, true))):'');
                } else {
                    this.clickYearSelectedEnd=year;
                    this.clickMonthSelectedEnd=month;
                    this.clickDaySelectedEnd=day;
                    this.clickSelectedDateEnd=year+'.'+month+'.'+day+(format?(this.timeEnd?' '+this.timeEnd:' '+(this.timeEnd=this.setTimeDefault(format, false))):'');
                }

                if (this.clickYearSelectedStart && this.clickYearSelectedEnd) this.btnType='primary';
                else this.btnType='disabled';

                this.changeDaysArrayEnd({year, month, day}, clearOther);
            },
            /**
             * 点击日期-开始日期
             * @param obj {weeks, year, month, thText}
             */
            weekChangeStart({weeks, year, month, thText}) {
                let clearOther=false;
                if (this.clickThTextSelectedStart && this.clickThTextSelectedEnd) {
                    this.weeksSelectedStart=weeks;
                    this.clickYearSelectedStart=year;
                    this.clickMonthSelectedStart=month;
                    this.clickThTextSelectedStart=thText;
                    this.clickSelectedDateStart=year+'.'+month;

                    this.weeksSelectedEnd=[];
                    this.clickYearSelectedEnd='';
                    this.clickMonthSelectedEnd='';
                    this.clickThTextSelectedEnd='';
                    this.clickSelectedDateEnd='';
                    clearOther=true;
                    this.changeWeeksArrayEnd(thText, clearOther);
                } else if (this.clickThTextSelectedStart && !this.clickThTextSelectedEnd) {
                    this.weeksSelectedEnd=weeks;
                    this.clickYearSelectedEnd=year;
                    this.clickMonthSelectedEnd=month;
                    this.clickThTextSelectedEnd=thText;
                    this.clickSelectedDateEnd=year+'.'+month;
                } else {
                    this.weeksSelectedStart=weeks;
                    this.clickYearSelectedStart=year;
                    this.clickMonthSelectedStart=month;
                    this.clickThTextSelectedStart=thText;
                    this.clickSelectedDateStart=year+'.'+month;
                }

                if (this.clickThTextSelectedStart && this.clickThTextSelectedEnd) this.btnType='primary';
                else this.btnType='disabled';
                this.changeWeeksArrayStart(thText, clearOther);
            },
            /**
             * 点击日期-结束日期
             * @param obj {weeks, year, month, thText}
             */
            weekChangeEnd({weeks, year, month, thText}) {
                let clearOther=false;
                if (this.clickThTextSelectedStart && this.clickThTextSelectedEnd) {
                    this.weeksSelectedEnd=weeks;
                    this.clickYearSelectedEnd=year;
                    this.clickMonthSelectedEnd=month;
                    this.clickThTextSelectedEnd=thText;
                    this.clickSelectedDateEnd=year+'.'+month;

                    this.weeksSelectedStart=[];
                    this.clickYearSelectedStart='';
                    this.clickMonthSelectedStart='';
                    this.clickThTextSelectedStart='';
                    this.clickSelectedDateStart='';
                    clearOther=true;
                    this.changeWeeksArrayStart(thText, clearOther);
                } else if (!this.clickThTextSelectedStart && this.clickThTextSelectedEnd) {
                    this.weeksSelectedStart=weeks;
                    this.clickYearSelectedStart=year;
                    this.clickMonthSelectedStart=month;
                    this.clickThTextSelectedStart=thText;
                    this.clickSelectedDateStart=year+'.'+month;
                } else {
                    this.weeksSelectedEnd=weeks;
                    this.clickYearSelectedEnd=year;
                    this.clickMonthSelectedEnd=month;
                    this.clickThTextSelectedEnd=thText;
                    this.clickSelectedDateEnd=year+'.'+month;
                }

                if (this.clickThTextSelectedStart && this.clickThTextSelectedEnd) this.btnType='primary';
                else this.btnType='disabled';
                this.changeWeeksArrayEnd(thText, clearOther);
            },
            /**
             * 点击日期-结束日期-月
             * @param obj {year, month}
             */
            monthChangeStart({year, month}) {
                let clearOther=false;
                if (this.panelMonthStart) {
                    this.yearActiveStart=year;
                    this.monthActiveStart=month;
                    this.clickYearSelectedStart='';
                    this.clickMonthSelectedStart='';
                    this.clickDaySelectedStart='';
                    this.clickYearSelectedEnd='';
                    this.clickMonthSelectedEnd='';
                    this.clickDaySelectedEnd='';
                    this.clickSelectedDateStart='';
                    this.clickSelectedDateEnd='';

                    switch (this.tabKey) {
                        case 'day':
                            this.dayInitStart(year+'.'+month+'.'+this.dayActiveStart);
                            this.changeDaysArrayEnd({year: '', month: '', day: ''}, true);
                            break;
                        case 'week':
                            this.weekInitStart(year+'.'+month);
                            this.changeWeeksArrayEnd('', true);
                            break;
                        default:
                            break;
                    }

                    this.panelMonthStart=false;
                } else {
                    if (this.clickYearSelectedStart && this.clickYearSelectedEnd) {
                        this.clickYearSelectedStart=year;
                        this.clickMonthSelectedStart=month;
                        this.clickSelectedDateStart=year+'.'+month;

                        this.clickYearSelectedEnd='';
                        this.clickMonthSelectedEnd='';
                        this.clickSelectedDateEnd='';
                        clearOther=true;

                        this.changeMonthsArrayEnd({year: '', month: ''}, clearOther);
                    } else if (this.clickYearSelectedStart && !this.clickYearSelectedEnd) {
                        this.clickYearSelectedEnd=year;
                        this.clickMonthSelectedEnd=month;
                        this.clickSelectedDateEnd=year+'.'+month;
                    } else {
                        this.clickYearSelectedStart=year;
                        this.clickMonthSelectedStart=month;
                        this.clickSelectedDateStart=year+'.'+month;
                    }

                    if (this.clickYearSelectedStart && this.clickYearSelectedEnd) this.btnType='primary';
                    else this.btnType='disabled';
                }

                this.changeMonthsArrayStart({year, month}, clearOther, false);
            },
            /**
             * 点击日期-结束日期-月
             * @param obj {year, month}
             */
            monthChangeEnd({year, month}) {
                let clearOther=false;
                if (this.panelMonthEnd) {
                    this.yearActiveEnd=year;
                    this.monthActiveEnd=month;
                    this.clickYearSelectedStart='';
                    this.clickMonthSelectedStart='';
                    this.clickDaySelectedStart='';
                    this.clickYearSelectedEnd='';
                    this.clickMonthSelectedEnd='';
                    this.clickDaySelectedEnd='';
                    this.clickSelectedDateStart='';
                    this.clickSelectedDateEnd='';

                    const tabKey=this.tabKey;
                    switch (tabKey) {
                        case 'day':
                            this.dayInitEnd(
                                this.yearActiveStart+'.'+this.monthActiveStart+'.'+this.dayActiveStart+(this.format&&this.timeStart?' '+this.timeStart:'')
                                +'-'+
                                year+'.'+month+'.'+this.dayActiveEnd+(this.format&&this.timeEnd?' '+this.timeEnd:'')
                            );
                            break;
                        case 'week':
                            this.weekInitEnd(
                                this.yearActiveStart+'.'+this.monthActiveStart+'.'+this.dayActiveStart
                                +'-'+
                                year+'.'+month+'.'+this.dayActiveEnd
                            );
                            break;
                        default:
                            break;
                    }

                    this.panelMonthEnd=false;
                } else {
                    if (this.clickYearSelectedStart && this.clickYearSelectedEnd) {
                        this.clickYearSelectedEnd=year;
                        this.clickMonthSelectedEnd=month;
                        this.clickSelectedDateEnd=year+'.'+month;

                        this.clickYearSelectedStart='';
                        this.clickMonthSelectedStart='';
                        this.clickSelectedDateStart='';
                        clearOther=true;

                        this.changeMonthsArrayStart({year: '', month: ''}, clearOther);
                    } else if (!this.clickYearSelectedStart && this.clickYearSelectedEnd) {
                        this.clickYearSelectedStart=year;
                        this.clickMonthSelectedStart=month;
                        this.clickSelectedDateStart=year+'.'+month;
                    } else {
                        this.clickYearSelectedEnd=year;
                        this.clickMonthSelectedEnd=month;
                        this.clickSelectedDateEnd=year+'.'+month;
                    }

                    if (this.clickYearSelectedStart && this.clickYearSelectedEnd) this.btnType='primary';
                    else this.btnType='disabled';
                }

                this.changeMonthsArrayEnd({year, month}, clearOther, false);
            },
            yearChangeStart({year}) {
                let clearOther=false;
                if (this.panelYearStart) {
                    this.yearActiveStart=year;
                    this.clickYearSelectedStart='';
                    this.clickMonthSelectedStart='';
                    this.clickDaySelectedStart='';
                    this.clickYearSelectedEnd='';
                    this.clickMonthSelectedEnd='';
                    this.clickDaySelectedEnd='';
                    this.clickSelectedDateStart='';
                    this.clickSelectedDateEnd='';
                    switch (this.tabKey) {
                        case 'day':
                            this.dayInitStart(year+'.'+this.monthActiveStart+'.'+this.dayActiveStart);
                            this.changeDaysArrayEnd({year: '', month: '', day: ''}, true);
                            break;
                        case 'week':
                            this.weekInitStart(year+'.'+this.monthActiveStart);
                            this.changeWeeksArrayEnd('', true);
                            break;
                        case 'month':
                            this.monthInitStart(year+'.'+this.monthActiveStart);
                            this.changeMonthsArrayEnd({year: '', month: ''}, true);
                            break;
                        default:
                            break;
                    }
                    this.panelYearStart=false;
                } else {
                    if (this.clickYearSelectedStart && this.clickYearSelectedEnd) {
                        this.clickYearSelectedStart=year;
                        this.clickSelectedDateStart=year;

                        this.clickYearSelectedEnd='';
                        this.clickSelectedDateEnd='';
                        clearOther=true;

                        this.changeYearsArrayEnd('', clearOther);
                    } else if (this.clickYearSelectedStart && !this.clickYearSelectedEnd) {
                        this.clickYearSelectedEnd=year;
                        this.clickSelectedDateEnd=year;
                    } else {
                        this.clickYearSelectedStart=year;
                        this.clickSelectedDateStart=year;
                    }

                    if (this.clickYearSelectedStart && this.clickYearSelectedEnd) this.btnType='primary';
                    else this.btnType='disabled';
                }

                this.changeYearsArrayStart(year, clearOther);
            },
            yearChangeEnd({year}) {
                let clearOther=false;
                if (this.panelYearEnd) {
                    this.yearActiveEnd=year;
                    this.clickYearSelectedStart='';
                    this.clickMonthSelectedStart='';
                    this.clickDaySelectedStart='';
                    this.clickYearSelectedEnd='';
                    this.clickMonthSelectedEnd='';
                    this.clickDaySelectedEnd='';
                    this.clickSelectedDateStart='';
                    this.clickSelectedDateEnd='';

                    switch (this.tabKey) {
                        case 'day':
                            this.dayInitEnd(
                                this.yearActiveStart+'.'+this.monthActiveStart+'.'+this.dayActiveStart+(this.format&&this.timeStart?' '+this.timeStart:'')
                                +'-'+
                                year+'.'+this.monthActiveEnd+'.'+this.dayActiveEnd+(this.format&&this.timeEnd?' '+this.timeEnd:'')
                            );
                            break;
                        case 'week':
                            this.weekInitEnd(
                                this.yearActiveStart+'.'+this.monthActiveStart+'.'+this.dayActiveStart
                                +'-'+
                                year+'.'+this.monthActiveEnd+'.'+this.dayActiveEnd
                            );
                            break;
                        case 'month':
                            this.monthInitEnd(
                                this.yearActiveStart+'.'+this.monthActiveStart+'.'+this.dayActiveStart
                                +'-'+
                                year+'.'+this.monthActiveEnd+'.'+this.dayActiveEnd
                            );
                            break;
                        default:
                            break;
                    }
                    this.panelYearEnd=false;
                } else {
                    if (this.clickYearSelectedStart && this.clickYearSelectedEnd) {
                        this.clickYearSelectedEnd=year;
                        this.clickSelectedDateEnd=year;

                        this.clickYearSelectedStart='';
                        this.clickSelectedDateStart='';
                        clearOther=true;

                        this.changeYearsArrayStart('', clearOther);
                    } else if (!this.clickYearSelectedStart && this.clickYearSelectedEnd) {
                        this.clickYearSelectedStart=year;
                        this.clickSelectedDateStart=year;
                    } else {
                        this.clickYearSelectedEnd=year;
                        this.clickSelectedDateEnd=year;
                    }

                    if (this.clickYearSelectedStart && this.clickYearSelectedEnd) this.btnType='primary';
                    else this.btnType='disabled';
                }

                this.changeYearsArrayEnd(year, clearOther);
            },
            /**
             * 鼠标进入-开始日期-日
             * @param obj {year, month, day}
             */
            dayEnterStart({year, month, day}) {
                if (this.panelYearStart || this.panelMonthStart || this.panelYearEnd || this.panelMonthEnd || (!this.clickYearSelectedStart && !this.clickYearSelectedEnd) || (this.clickYearSelectedStart && this.clickYearSelectedEnd)) return;
                const daysArray=this.daysArrayStart;
                const dateS=this.clickYearSelectedStart+this.clickMonthSelectedStart+this.clickDaySelectedStart;
                const dateE=this.clickYearSelectedEnd+this.clickMonthSelectedEnd+this.clickDaySelectedEnd;
                const dateN=year+month+day;

                // 当前传入时间的索引
                const nInd=daysArray.findIndex(d => d.flag === 'n' && d.year===year&&d.month===month&&d.day===day);
                // 已选择的时间的索引
                const sInd=daysArray.findIndex(d => d.flag === 'n' && d.year===this.clickYearSelectedStart&&d.month===this.clickMonthSelectedStart&&d.day===this.clickDaySelectedStart);

                /* 修改开始右侧结束时间面板multiple -s */
                if (dateE) {
                    const daysArrayEnd=this.daysArrayEnd;
                    if (dateN > dateE) { // 选中的左侧面板开始时间大于当前鼠标hover的时间
                        this.daysArrayEnd=daysArrayEnd.map(d => {
                            const dateC=d.year+d.month+d.day;
                            if (d.flag === 'n' && dateC < dateN && dateC > dateE) d.multiple='multiple';
                            else d.multiple='';
                            return d;
                        })
                    } else {
                        this.daysArrayEnd=daysArrayEnd.map(d => {
                            const dateC=d.year+d.month+d.day;
                            if (d.flag === 'n' && dateC > dateN && dateC < dateE) d.multiple='multiple';
                            else d.multiple='';
                            return d;
                        })
                    }
                } else {
                    this.daysArrayEnd=this.daysArrayEnd.map(d => {
                        d.multiple='';
                        return d;
                    })
                }
                /* 修改开始右侧结束时间面板multiple -e */

                // 修改当前鼠标hover状态
                if (dateS) { // 已选择开始时间
                    if (sInd === -1) { // 不在当前面板
                        if (dateN < dateS) {
                            this.daysArrayStart=daysArray.map(d => {
                                if (d.flag === 'n' && d.year+d.month+d.day >= dateN) d.multiple='multiple';
                                else d.multiple='';
                                return d;
                            })
                        } else {
                            this.daysArrayStart=daysArray.map(d => {
                                if (d.flag === 'n' && d.year+d.month+d.day <= dateN) d.multiple='multiple';
                                else d.multiple='';
                                return d;
                            })
                        }
                    } else { // 在当前面板
                        if (nInd > sInd) {
                            this.daysArrayStart=daysArray.map(d => {
                                const dateC=d.year+d.month+d.day;
                                if (dateC <= dateN && dateC > dateS) d.multiple='multiple';
                                else d.multiple='';
                                return d;
                            })
                        } else {
                            this.daysArrayStart=daysArray.map(d => {
                                const dateC=d.year+d.month+d.day;
                                if (dateC >= dateN && dateC < dateS) d.multiple='multiple';
                                else d.multiple='';
                                return d;
                            })
                        }
                    }
                } else { // 未选择开始时间
                    this.daysArrayStart=daysArray.map(d => {
                        if (d.flag==='n'&&d.year+d.month+d.day >= dateN) d.multiple='multiple';
                        else d.multiple='';
                        return d;
                    })
                }
            },
            /**
             * 鼠标进入-结束日期-日
             * @param obj {year, month, day}
             */
            dayEnterEnd({year, month, day}) {
                if (this.panelYearStart || this.panelMonthStart || this.panelYearEnd || this.panelMonthEnd || (!this.clickYearSelectedStart && !this.clickYearSelectedEnd) || (this.clickYearSelectedStart && this.clickYearSelectedEnd)) return;
                const daysArray=this.daysArrayEnd;
                const dateS=this.clickYearSelectedStart+this.clickMonthSelectedStart+this.clickDaySelectedStart;
                const dateE=this.clickYearSelectedEnd+this.clickMonthSelectedEnd+this.clickDaySelectedEnd;
                const dateN=year+month+day;

                // 当前传入时间的索引
                const nInd=daysArray.findIndex(d => d.year===year&&d.month===month&&d.day===day);
                // 以选择的时间的索引
                const sInd=daysArray.findIndex(d => d.year===this.clickYearSelectedEnd&&d.month===this.clickMonthSelectedEnd&&d.day===this.clickDaySelectedEnd);

                /* 修改开始左侧开始时间面板multiple -s */
                if (dateS) {
                    const daysArrayStart=this.daysArrayStart;
                    if (dateN > dateS) { // 选中的左侧面板开始时间大于当前鼠标hover的时间
                        this.daysArrayStart=daysArrayStart.map(d => {
                            const dateC=d.year+d.month+d.day;
                            if (d.flag==='n' && dateC < dateN && dateC > dateS) d.multiple='multiple';
                            else d.multiple='';
                            return d;
                        })
                    } else {
                        this.daysArrayStart=daysArrayStart.map(d => {
                            const dateC=d.year+d.month+d.day;
                            if (d.flag==='n' && dateC > dateN && dateC < dateS) d.multiple='multiple';
                            else d.multiple='';
                            return d;
                        })
                    }
                } else {
                    this.daysArrayStart=this.daysArrayStart.map(d => {
                        d.multiple='';
                        return d;
                    })
                }
                /* 修改开始左侧开始时间面板multiple -e */

                // 修改当前鼠标hover状态
                if (sInd === -1) { // 不在当前面板
                    if (dateN < dateE) {
                        this.daysArrayEnd=daysArray.map(d => {
                            if (d.flag==='n' && d.year+d.month+d.day >= dateN) d.multiple='multiple';
                            else d.multiple='';
                            return d;
                        })
                    } else {
                        this.daysArrayEnd=daysArray.map(d => {
                            if (d.flag==='n' && d.year+d.month+d.day <= dateN) d.multiple='multiple';
                            else d.multiple='';
                            return d;
                        })
                    }
                } else { // 在当前面板
                    if (nInd > sInd) {
                        this.daysArrayEnd=daysArray.map(d => {
                            const dateC=d.year+d.month+d.day;
                            if (d.flag==='n' && dateC <= dateN && dateC > dateE) d.multiple='multiple';
                            else d.multiple='';
                            return d;
                        })
                    } else {
                        this.daysArrayEnd=daysArray.map(d => {
                            const dateC=d.year+d.month+d.day;
                            if (d.flag==='n' && dateC >= dateN && dateC < dateE) d.multiple='multiple';
                            else d.multiple='';
                            return d;
                        })
                    }
                }
            },
            /**
             * 鼠标进入-开始日期-周
             * @param obj {thText}
             */
            weekEnterStart({thText}) {
                if (this.panelYearStart || this.panelMonthStart || this.panelYearEnd || this.panelMonthEnd || (!this.clickYearSelectedStart && !this.clickYearSelectedEnd) || (this.clickYearSelectedStart && this.clickYearSelectedEnd)) return;
                const reg=/[.第周]/g;
                const weeksArray=this.weeksArrayStart;
                const dateS=this.clickThTextSelectedStart.replace(reg, '');
                const dateE=this.clickThTextSelectedEnd.replace(reg, '');
                const dateN=thText.replace(reg, '');

                // 当前传入时间的索引
                const nInd=weeksArray.findIndex(d => d.thText===thText);
                // 已选择的时间的索引
                const sInd=weeksArray.findIndex(d => d.thText===this.clickThTextSelectedStart);

                /* 修改开始右侧结束时间面板multiple -s */
                if (dateE) {
                    const weeksArrayEnd=this.weeksArrayEnd;
                    if (dateN > dateE) { // 选中的左侧面板开始时间大于当前鼠标hover的时间
                        this.weeksArrayEnd=weeksArrayEnd.map(d => {
                            if (d.flag === 'n') {
                                const dateC=d.thText.replace(reg, '');
                                if (dateC < dateN && dateC > dateE) d.multiple='multiple';
                                else d.multiple='';
                            }
                            return d;
                        })
                    } else {
                        this.weeksArrayEnd=weeksArrayEnd.map(d => {
                            if (d.flag === 'n') {
                                const dateC=d.thText.replace(reg, '');
                                if (dateC > dateN && dateC < dateE) d.multiple='multiple';
                                else d.multiple='';
                            }
                            return d;
                        })
                    }
                } else {
                    this.weeksArrayEnd=this.weeksArrayEnd.map(d => {
                        d.multiple='';
                        return d;
                    })
                }
                /* 修改开始右侧结束时间面板multiple -e */

                // 修改当前鼠标hover状态
                if (dateS) { // 已选择开始时间
                    if (sInd === -1) { // 不在当前面板
                        if (dateN < dateS) {
                            this.weeksArrayStart=weeksArray.map(d => {
                                if (d.flag === 'n') {
                                    const dateC=d.thText.replace(reg, '');
                                    if (dateC >= dateN) d.multiple='multiple';
                                    else d.multiple='';
                                }
                                return d;
                            })
                        } else {
                            this.weeksArrayStart=weeksArray.map(d => {
                                if (d.flag === 'n') {
                                    const dateC=d.thText.replace(reg, '');
                                    if (dateC <= dateN) d.multiple='multiple';
                                    else d.multiple='';
                                }
                                return d;
                            })
                        }
                    } else { // 在当前面板
                        if (nInd > sInd) {
                            this.weeksArrayStart=weeksArray.map(d => {
                                if (d.flag === 'n') {
                                    const dateC=d.thText.replace(reg, '');
                                    if (dateC <= dateN && dateC > dateS) d.multiple='multiple';
                                    else d.multiple='';
                                }
                                return d;
                            })
                        } else {
                            this.weeksArrayStart=weeksArray.map(d => {
                                if (d.flag === 'n') {
                                    const dateC=d.thText.replace(reg, '');
                                    if (dateC >= dateN && dateC < dateS) d.multiple='multiple';
                                    else d.multiple='';
                                }
                                return d;
                            })
                        }
                    }
                } else { // 未选择开始时间
                    this.weeksArrayStart=weeksArray.map(d => {
                        if (d.flag === 'n') {
                            const dateC=d.thText.replace(reg, '');
                            if (dateC >= dateN) d.multiple='multiple';
                            else d.multiple='';
                        }
                        return d;
                    })
                }
            },
            /**
             * 鼠标进入-开始日期-周
             * @param obj {thText}
             */
            weekEnterEnd({thText}) {
                if (this.panelYearStart || this.panelMonthStart || this.panelYearEnd || this.panelMonthEnd || (!this.clickYearSelectedStart && !this.clickYearSelectedEnd) || (this.clickYearSelectedStart && this.clickYearSelectedEnd)) return;
                const reg=/[.第周]/g;
                const weeksArray=this.weeksArrayEnd;
                const dateS=this.clickThTextSelectedStart.replace(reg, '');
                const dateE=this.clickThTextSelectedEnd.replace(reg, '');
                const dateN=thText.replace(reg, '');

                // 当前传入时间的索引
                const nInd=weeksArray.findIndex(d => d.thText===thText);
                // 已选择的时间的索引
                const sInd=weeksArray.findIndex(d => d.thText===this.clickThTextSelectedEnd);


                /* 修改左侧开始时间面板multiple -s */
                if (dateS) {
                    const weeksArrayStart=this.weeksArrayStart;
                    if (dateN > dateS) { // 选中的左侧面板开始时间大于当前鼠标hover的时间
                        this.weeksArrayStart=weeksArrayStart.map(d => {
                            if (d.flag === 'n') {
                                const dateC=d.thText.replace(reg, '');
                                if (dateC < dateN && dateC > dateS) d.multiple='multiple';
                                else d.multiple='';
                            }
                            return d;
                        })
                    } else {
                        this.weeksArrayStart=weeksArrayStart.map(d => {
                            if (d.flag === 'n') {
                                const dateC=d.thText.replace(reg, '');
                                if (dateC > dateN && dateC < dateS) d.multiple='multiple';
                                else d.multiple='';
                            }
                            return d;
                        })
                    }
                } else {
                    this.weeksArrayStart=this.weeksArrayStart.map(d => {
                        d.multiple='';
                        return d;
                    })
                }
                /* 修改开始左侧开始时间面板multiple -e */

                // 修改当前鼠标hover状态
                if (sInd === -1) { // 不在当前面板
                    if (dateN < dateE) {
                        this.weeksArrayEnd=weeksArray.map(d => {
                            if (d.flag === 'n') {
                                const dateC=d.thText.replace(reg, '');
                                if (dateC >= dateN) d.multiple='multiple';
                                else d.multiple='';
                            }
                            return d;
                        })
                    } else {
                        this.weeksArrayEnd=weeksArray.map(d => {
                            if (d.flag === 'n') {
                                const dateC=d.thText.replace(reg, '');
                                if (dateC <= dateN) d.multiple='multiple';
                                else d.multiple='';
                            }
                            return d;
                        })
                    }
                } else { // 在当前面板
                    if (nInd > sInd) {
                        this.weeksArrayEnd=weeksArray.map(d => {
                            if (d.flag === 'n') {
                                const dateC=d.thText.replace(reg, '');
                                if (dateC <= dateN && dateC > dateE) d.multiple='multiple';
                                else d.multiple='';
                            }
                            return d;
                        })
                    } else {
                        this.weeksArrayEnd=weeksArray.map(d => {
                            if (d.flag === 'n') {
                                const dateC=d.thText.replace(reg, '');
                                if (dateC >= dateN && dateC < dateE) d.multiple='multiple';
                                else d.multiple='';
                            }
                            return d;
                        })
                    }
                }
            },
            monthEnterStart({year, month}) {
                if (this.panelYearStart || this.panelMonthStart || this.panelYearEnd || this.panelMonthEnd || (!this.clickYearSelectedStart && !this.clickYearSelectedEnd) || (this.clickYearSelectedStart && this.clickYearSelectedEnd)) return;
                const monthsArray=this.monthsArrayStart;
                const dateS=this.clickYearSelectedStart+this.clickMonthSelectedStart;
                const dateE=this.clickYearSelectedEnd+this.clickMonthSelectedEnd;
                const dateN=year+month;

                // 当前传入时间的索引
                const nInd=monthsArray.findIndex(d => d.year===year && d.month===month);
                // 以选择的时间的索引
                const sInd=monthsArray.findIndex(d => d.year===this.clickYearSelectedStart && d.month===this.clickMonthSelectedStart);

                /* 修改开始右侧结束时间面板multiple -s */
                if (dateE) {
                    const monthsArrayEnd=this.monthsArrayEnd;
                    if (dateN > dateE) { // 选中的左侧面板开始时间大于当前鼠标hover的时间
                        this.monthsArrayEnd=monthsArrayEnd.map(d => {
                            const dateC=d.year+d.month;
                            if (dateC < dateN && dateC > dateE && !d.disabled) d.multiple='multiple';
                            else d.multiple='';
                            return d;
                        })
                    } else {
                        this.monthsArrayEnd=monthsArrayEnd.map(d => {
                            const dateC=d.year+d.month;
                            if (dateC > dateN && dateC < dateE && !d.disabled) d.multiple='multiple';
                            else d.multiple='';
                            return d;
                        })
                    }
                } else {
                    this.monthsArrayEnd=this.monthsArrayEnd.map(d => {
                        d.multiple='';
                        return d;
                    })
                }
                /* 修改开始右侧结束时间面板multiple -e */

                // 修改当前鼠标hover状态
                if (dateS) { // 已选择开始时间
                    if (sInd === -1) { // 不在当前面板
                        if (dateN < dateS) {
                            this.monthsArrayStart=monthsArray.map(d => {
                                if (d.year+d.month >= dateN) d.multiple='multiple';
                                else d.multiple='';
                                return d;
                            })
                        } else {
                            this.monthsArrayStart=monthsArray.map(d => {
                                if (d.year+d.month <= dateN) d.multiple='multiple';
                                else d.multiple='';
                                return d;
                            })
                        }
                    } else { // 在当前面板
                        if (nInd > sInd) {
                            this.monthsArrayStart=monthsArray.map(d => {
                                const dateC=d.year+d.month;
                                if (dateC <= dateN && dateC > dateS) d.multiple='multiple';
                                else d.multiple='';
                                return d;
                            })
                        } else {
                            this.monthsArrayStart=monthsArray.map(d => {
                                const dateC=d.year+d.month;
                                if (dateC >= dateN && dateC < dateS) d.multiple='multiple';
                                else d.multiple='';
                                return d;
                            })
                        }
                    }
                } else { // 未选择开始时间
                    this.monthsArrayStart=monthsArray.map(d => {
                        if (d.year+d.month >= dateN) d.multiple='multiple';
                        else d.multiple='';
                        return d;
                    })
                }
            },
            monthEnterEnd({year, month}) {
                if (this.panelYearStart || this.panelMonthStart || this.panelYearEnd || this.panelMonthEnd || (!this.clickYearSelectedStart && !this.clickYearSelectedEnd) || (this.clickYearSelectedStart && this.clickYearSelectedEnd)) return;
                const monthsArray=this.monthsArrayEnd;
                const dateS=this.clickYearSelectedStart+this.clickMonthSelectedStart;
                const dateE=this.clickYearSelectedEnd+this.clickMonthSelectedEnd;
                const dateN=year+month;

                // 当前传入时间的索引
                const nInd=monthsArray.findIndex(d => d.year===year && d.month===month);
                // 以选择的时间的索引
                const sInd=monthsArray.findIndex(d => d.year===this.clickYearSelectedEnd && d.month===this.clickMonthSelectedEnd);


                /* 修改左侧开始时间面板multiple -s */
                if (dateS) {
                    const monthsArrayStart=this.monthsArrayStart;
                    if (dateN > dateS) { // 选中的左侧面板开始时间大于当前鼠标hover的时间
                        this.monthsArrayStart=monthsArrayStart.map(d => {
                            const dateC=d.year+d.month;
                            if (dateC < dateN && dateC > dateS && !d.disabled) d.multiple='multiple';
                            else d.multiple='';
                            return d;
                        })
                    } else {
                        this.monthsArrayStart=monthsArrayStart.map(d => {
                            const dateC=d.year+d.month;
                            if (dateC > dateN && dateC < dateS && !d.disabled) d.multiple='multiple';
                            else d.multiple='';
                            return d;
                        })
                    }
                } else {
                    this.monthsArrayStart=this.monthsArrayStart.map(d => {
                        d.multiple='';
                        return d;
                    })
                }
                /* 修改开始左侧开始时间面板multiple -e */

                // 修改当前鼠标hover状态
                if (sInd === -1) { // 不在当前面板
                    if (dateN < dateE) {
                        this.monthsArrayEnd=monthsArray.map(d => {
                            if (d.year+d.month >= dateN) d.multiple='multiple';
                            else d.multiple='';
                            return d;
                        })
                    } else {
                        this.monthsArrayEnd=monthsArray.map(d => {
                            if (d.year+d.month <= dateN) d.multiple='multiple';
                            else d.multiple='';
                            return d;
                        })
                    }
                } else { // 在当前面板
                    if (nInd > sInd) {
                        this.monthsArrayEnd=monthsArray.map(d => {
                            const dateC=d.year+d.month;
                            if (dateC <= dateN && dateC > dateE) d.multiple='multiple';
                            else d.multiple='';
                            return d;
                        })
                    } else {
                        this.monthsArrayEnd=monthsArray.map(d => {
                            const dateC=d.year+d.month;
                            if (dateC >= dateN && dateC < dateE) d.multiple='multiple';
                            else d.multiple='';
                            return d;
                        })
                    }
                }
            },
            yearEnterStart({year}) {
                if (this.panelYearStart || this.panelMonthStart || this.panelYearEnd || this.panelMonthEnd || (!this.clickYearSelectedStart && !this.clickYearSelectedEnd) || (this.clickYearSelectedStart && this.clickYearSelectedEnd)) return;
                const yearsArray=this.yearsArrayStart;
                const dateS=this.clickYearSelectedStart;
                const dateE=this.clickYearSelectedEnd;
                const dateN=year;

                // 当前传入时间的索引
                const nInd=yearsArray.findIndex(d => d.year===year);
                // 以选择的时间的索引
                const sInd=yearsArray.findIndex(d => d.year===this.clickYearSelectedStart);

                /* 修改开始右侧结束时间面板multiple -s */
                if (dateE) {
                    const yearsArrayEnd=this.yearsArrayEnd;
                    if (dateN > dateE) { // 选中的左侧面板开始时间大于当前鼠标hover的时间
                        this.yearsArrayEnd=yearsArrayEnd.map(d => {
                            if (d.year < dateN && d.year > dateE) d.multiple='multiple';
                            else d.multiple='';
                            return d;
                        })
                    } else {
                        this.yearsArrayEnd=yearsArrayEnd.map(d => {
                            if (d.year > dateN && d.year < dateE) d.multiple='multiple';
                            else d.multiple='';
                            return d;
                        })
                    }
                } else {
                    this.yearsArrayEnd=this.yearsArrayEnd.map(d => {
                        d.multiple='';
                        return d;
                    })
                }
                /* 修改开始右侧结束时间面板multiple -e */

                // 修改当前鼠标hover状态
                if (dateS) { // 已选择开始时间
                    if (sInd === -1) { // 不在当前面板
                        if (dateN < dateS) {
                            this.yearsArrayStart=yearsArray.map(d => {
                                if (d.year >= dateN) d.multiple='multiple';
                                else d.multiple='';
                                return d;
                            })
                        } else {
                            this.yearsArrayStart=yearsArray.map(d => {
                                if (d.year <= dateN) d.multiple='multiple';
                                else d.multiple='';
                                return d;
                            })
                        }
                    } else { // 在当前面板
                        if (nInd > sInd) {
                            this.yearsArrayStart=yearsArray.map(d => {
                                if (d.year <= dateN && d.year > dateS) d.multiple='multiple';
                                else d.multiple='';
                                return d;
                            })
                        } else {
                            this.yearsArrayStart=yearsArray.map(d => {
                                if (d.year >= dateN && d.year < dateS) d.multiple='multiple';
                                else d.multiple='';
                                return d;
                            })
                        }
                    }
                } else { // 未选择开始时间
                    this.yearsArrayStart=yearsArray.map(d => {
                        if (d.year >= dateN) d.multiple='multiple';
                        else d.multiple='';
                        return d;
                    })
                }
            },
            yearEnterEnd({year}) {
                if (this.panelYearStart || this.panelMonthStart || this.panelYearEnd || this.panelMonthEnd || (!this.clickYearSelectedStart && !this.clickYearSelectedEnd) || (this.clickYearSelectedStart && this.clickYearSelectedEnd)) return;
                const yearsArray=this.yearsArrayEnd;
                const dateS=this.clickYearSelectedStart;
                const dateE=this.clickYearSelectedEnd;
                const dateN=year;

                // 当前传入时间的索引
                const nInd=yearsArray.findIndex(d => d.year===year);
                // 以选择的时间的索引
                const sInd=yearsArray.findIndex(d => d.year===this.clickYearSelectedEnd);

                /* 修改左侧开始时间面板multiple -s */
                if (dateS) {
                    const yearsArrayStart=this.yearsArrayStart;
                    if (dateN > dateS) { // 选中的左侧面板开始时间大于当前鼠标hover的时间
                        this.yearsArrayStart=yearsArrayStart.map(d => {
                            if (d.year < dateN && d.year > dateS) d.multiple='multiple';
                            else d.multiple='';
                            return d;
                        })
                    } else {
                        this.yearsArrayStart=yearsArrayStart.map(d => {
                            if (d.year > dateN && d.year < dateS) d.multiple='multiple';
                            else d.multiple='';
                            return d;
                        })
                    }
                } else {
                    this.yearsArrayStart=this.yearsArrayStart.map(d => {
                        d.multiple='';
                        return d;
                    })
                }
                /* 修改开始左侧开始时间面板multiple -e */

                // 修改当前鼠标hover状态
                if (sInd === -1) { // 不在当前面板
                    if (dateN < dateE) {
                        this.yearsArrayEnd=yearsArray.map(d => {
                            if (d.year >= dateN) d.multiple='multiple';
                            else d.multiple='';
                            return d;
                        })
                    } else {
                        this.yearsArrayEnd=yearsArray.map(d => {
                            if (d.year <= dateN) d.multiple='multiple';
                            else d.multiple='';
                            return d;
                        })
                    }
                } else { // 在当前面板
                    if (nInd > sInd) {
                        this.yearsArrayEnd=yearsArray.map(d => {
                            if (d.year <= dateN && d.year > dateE) d.multiple='multiple';
                            else d.multiple='';
                            return d;
                        })
                    } else {
                        this.yearsArrayEnd=yearsArray.map(d => {
                            if (d.year >= dateN && d.year < dateE) d.multiple='multiple';
                            else d.multiple='';
                            return d;
                        })
                    }
                }
            },

            // 打开时间选择器
            panelTimeOpen() {
                if (!this.clickSelectedDateStart || !this.clickSelectedDateEnd) return;
                this.tabKey='time';

                setTimeout(() => {
                    this.$refs.timeSelectStart.setTimeDom();
                    this.$refs.timeSelectEnd.setTimeDom();
                })
            },
            // 关闭时间选择器
            panelTimeClose() {
                const tss=this.$refs.timeSelectStart,
                    tse=this.$refs.timeSelectEnd;
                const timeStart=tss.hour+':'+tss.minute+(this.format==='hms'?':'+tss.second:'');
                const timeEnd=tse.hour+':'+tse.minute+(this.format==='hms'?':'+tse.second:'');
                this.timeStart=timeStart;
                this.timeEnd=timeEnd;
                this.clickSelectedDateStart=this.clickYearSelectedStart+'.'+this.clickMonthSelectedStart+'.'+this.clickDaySelectedStart+' '+timeStart;
                this.clickSelectedDateEnd=this.clickYearSelectedEnd+'.'+this.clickMonthSelectedEnd+'.'+this.clickDaySelectedEnd+' '+timeEnd;
                this.tabKey='day';
            },

            // 快速选择-设置时间 flag可选值【left，right】
            setQuickDay(flag) {
                const y1=this.yearSelectedStart, m1=this.monthSelectedStart, d1=this.daySelectedStart,
                    y2=this.yearSelectedEnd, m2=this.monthSelectedEnd, d2=this.daySelectedEnd;
                let sy, sm, sd // 计算后的开始年月日
                    ,ey, em, ed; // 计算后的结束年月日
                // 天差值
                const diff=(new Date(y2, m2-1, d2).getTime() - new Date(y1, m1-1, d1).getTime()) / (1000*60*60*24);
                if (flag === 'left') {
                    // 计算结束时间
                    const [ey1, em1, ed1]=CountBeforeOrAfterDay(y1, m1, d1, -1);
                    ey=ey1;em=em1;ed=ed1;
                    // 计算开始时间
                    const [sy1, sm1, sd1]=CountBeforeOrAfterDay(ey1, em1, ed1, -diff);
                    sy=sy1;sm=sm1;sd=sd1;
                } else {
                    // 计算开始时间
                    const [sy1, sm1, sd1]=CountBeforeOrAfterDay(y2, m2, d2, 1);
                    sy=sy1;sm=sm1;sd=sd1;
                    // 计算结束时间
                    const [ey1, em1, ed1]=CountBeforeOrAfterDay(sy1, sm1, sd1, diff);
                    ey=ey1;em=em1;ed=ed1;
                }

                const dateStart=sy+'.'+sm+'.'+sd+`${this.format&&this.timeStart?' '+this.timeStart:''}`,
                    dateEnd=ey+'.'+em+'.'+ed+`${this.format&&this.timeEnd?' '+this.timeEnd:''}`;

                this.selectedDateStart=dateStart;
                this.selectedDateEnd=dateEnd;
                this.yearSelectedStart=sy;
                this.monthSelectedStart=sm;
                this.daySelectedStart=sd;
                this.yearActiveStart=sy;
                this.monthActiveStart=sm;
                this.dayActiveStart=sd;
                this.clickYearSelectedStart=sy;
                this.clickMonthSelectedStart=sm;
                this.clickDaySelectedStart=sd;
                this.yearSelectedEnd=ey;
                this.monthSelectedEnd=em;
                this.daySelectedEnd=ed;
                this.yearActiveEnd=ey;
                this.monthActiveEnd=em;
                this.dayActiveEnd=ed;
                this.clickYearSelectedEnd=ey;
                this.clickMonthSelectedEnd=em;
                this.clickDaySelectedEnd=ed;
                const selectedDate=dateStart+'-'+dateEnd;
                this.selectedDate=selectedDate;
                this.$emit('change', [
                    selectedDate, dateStart, dateEnd,
                    this.timeStart, this.timeEnd,
                    '', ''
                ]);
                this.dayInitEnd(selectedDate);
            },
            setQuickWeek(flag) {
                const ws=this.weeksSelectedStart, s=ws[0],
                    we=this.weeksSelectedEnd, e=we[6];
                const ys=s.year, ms=s.month, ds=s.day,
                    ye=e.year, me=e.month, de=e.day;
                const diff=(new Date(ye, me-1, de).getTime() - new Date(ys, ms-1, ds).getTime()) / (1000*60*60*24);

                let sy, sm, sd // 计算后的开始年月日
                    ,ey, em, ed; // 计算后的结束年月日
                let dateStart, dateEnd;
                if (flag === 'left') {
                    const [ey1, em1, ed1]=CountBeforeOrAfterDay(ys, ms, ds, -1);
                    const [sy1, sm1, sd1]=CountBeforeOrAfterDay(ey1, em1, ed1, -diff);
                    dateStart=sy1+'.'+sm1+'.'+sd1;
                    dateEnd=ey1+'.'+em1+'.'+ed1;
                    sy=sy1;sm=sm1;sd=sd1;
                    ey=ey1;em=em1;ed=ed1;
                } else {
                    const [sy1, sm1, sd1]=CountBeforeOrAfterDay(ye, me, de, 1);
                    const [ey1, em1, ed1]=CountBeforeOrAfterDay(sy1, sm1, sd1, diff);
                    dateStart=sy1+'.'+sm1+'.'+sd1;
                    dateEnd=ey1+'.'+em1+'.'+ed1;
                    sy=sy1;sm=sm1;sd=sd1;
                    ey=ey1;em=em1;ed=ed1;
                }

                this.selectedDateStart=dateStart;
                this.selectedDateEnd=dateEnd;
                this.yearSelectedStart=sy;
                this.monthSelectedStart=sm;
                this.daySelectedStart=sd;
                this.yearActiveStart=sy;
                this.monthActiveStart=sm;
                this.dayActiveStart=sd;
                this.clickYearSelectedStart=sy;
                this.clickMonthSelectedStart=sm;
                this.clickDaySelectedStart=sd;
                this.yearSelectedEnd=ey;
                this.monthSelectedEnd=em;
                this.daySelectedEnd=ed;
                this.yearActiveEnd=ey;
                this.monthActiveEnd=em;
                this.dayActiveEnd=ed;
                this.clickYearSelectedEnd=ey;
                this.clickMonthSelectedEnd=em;
                this.clickDaySelectedEnd=ed;
                const selectedDate=dateStart+'-'+dateEnd;
                this.selectedDate=selectedDate;

                this.weekInitEnd(selectedDate);

                this.$emit('change', [
                    selectedDate, dateStart, dateEnd,
                    '', '',
                    this.thTextSelectedStart, this.thTextSelectedEnd
                ]);
            },
            setQuickMonth(flag) {
                const dateS=this.yearSelectedStart+'.'+this.monthSelectedStart, dateE=this.yearSelectedEnd+'.'+this.monthSelectedEnd;
                const [YS, MS, YE, ME]=CountLeftOrRightMonth(flag, dateS, dateE);

                const dateStart=YS+'.'+MS, dateEnd=YE+'.'+ME;
                this.selectedDateStart=dateStart;
                this.selectedDateEnd=dateEnd;
                this.clickSelectedDateStart=dateStart;
                this.clickSelectedDateEnd=dateEnd;

                const selectedDate=dateStart+'-'+dateEnd;
                this.yearSelectedStart=YS;
                this.monthSelectedStart=MS;
                this.yearActiveStart=YS;
                this.monthActiveStart=MS;
                this.yearSelectedEnd=YE;
                this.monthSelectedEnd=ME;
                this.yearActiveEnd=YE;
                this.monthActiveEnd=ME;
                this.selectedDate=selectedDate;

                this.$emit('change', [
                    selectedDate, dateStart, dateEnd,
                    '', '',
                    '', ''
                ]);
                this.monthInitEnd(selectedDate);
            },
            setQuickYear(flag) {
                const yss=Number(this.yearSelectedStart), yse=Number(this.yearSelectedEnd);
                const diff=yse-yss;
                const sds=((flag==='left'?yss-1-diff:yse+1)).toString(), sde=((flag==='left'?yss-1:yse+1+diff)).toString();
                this.yearSelectedStart=sds;
                this.yearSelectedEnd=sde;
                this.yearActiveStart=sds;
                this.yearActiveEnd=sde;
                this.selectedDateStart=sds;
                this.selectedDateEnd=sde;
                this.clickSelectedDateStart=sds;
                this.clickSelectedDateEnd=sde;
                const selectedDate=sds+'-'+sde;
                this.selectedDate=selectedDate;

                this.$emit('change', [
                    selectedDate, sds, sde,
                    '', '',
                    '', ''
                ]);
                this.yearInitEnd(selectedDate);
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
                const tabKey=this.tabKey;
                let dateStart, dateEnd, ts=this.timeStart, te=this.timeEnd;
                switch (tabKey) {
                    case 'day':
                        (() => {
                            const format=this.format;
                            const y1=this.clickYearSelectedStart, m1=this.clickMonthSelectedStart, d1=this.clickDaySelectedStart,
                                y2=this.clickYearSelectedEnd, m2=this.clickMonthSelectedEnd, d2=this.clickDaySelectedEnd;
                            if (y1+m1+d1 > y2+m2+d2) {
                                this.yearSelectedStart=y2;this.monthSelectedStart=m2;this.daySelectedStart=d2;
                                this.yearSelectedEnd=y1;this.monthSelectedEnd=m1;this.daySelectedEnd=d1;
                                dateStart=y2+'.'+m2+'.'+d2+`${format&&ts?' '+ts:''}`;
                                dateEnd=y1+'.'+m1+'.'+d1+`${format&&te?' '+te:''}`;
                            } else {
                                this.yearSelectedStart=y1;this.monthSelectedStart=m1;this.daySelectedStart=d1;
                                this.yearSelectedEnd=y2;this.monthSelectedEnd=m2;this.daySelectedEnd=d2;
                                dateStart=y1+'.'+m1+'.'+d1+`${format&&ts?' '+ts:''}`;
                                dateEnd=y2+'.'+m2+'.'+d2+`${format&&te?' '+te:''}`;
                            }
                        })();
                        break;
                    case 'week':
                        (() => {
                            const wks=this.weeksSelectedStart, wke=this.weeksSelectedEnd;
                            const {year: y1, month: m1, day: d1}=wks[0], {year: y2, month: m2, day: d2}=wke[6];
                            if (y1+m1+d1 > y2+m2+d2) {
                                this.yearSelectedStart=y2;this.monthSelectedStart=m2;this.daySelectedStart=d2;
                                this.yearSelectedEnd=y1;this.monthSelectedEnd=m1;this.daySelectedEnd=d1;
                                this.thTextSelectedStart=this.clickThTextSelectedEnd;
                                this.thTextSelectedEnd=this.clickThTextSelectedStart;
                                dateStart=y2+'.'+m2+'.'+d2;
                                dateEnd=y1+'.'+m1+'.'+d1;
                            } else {
                                this.yearSelectedStart=y1;this.monthSelectedStart=m1;this.daySelectedStart=d1;
                                this.yearSelectedEnd=y2;this.monthSelectedEnd=m2;this.daySelectedEnd=d2;
                                this.thTextSelectedStart=this.clickThTextSelectedStart;
                                this.thTextSelectedEnd=this.clickThTextSelectedEnd;
                                dateStart=y1+'.'+m1+'.'+d1;
                                dateEnd=y2+'.'+m2+'.'+d2;
                            }
                        })();
                        break;
                    case 'month':
                        (() => {
                            const y1=this.clickYearSelectedStart, m1=this.clickMonthSelectedStart,
                                y2=this.clickYearSelectedEnd, m2=this.clickMonthSelectedEnd;
                            if (y1+m1 > y2+m2) {
                                this.yearSelectedStart=y2;this.monthSelectedStart=m2;
                                this.yearSelectedEnd=y1;this.monthSelectedEnd=m1;
                                dateStart=y2+'.'+m2;
                                dateEnd=y1+'.'+m1;
                            } else {
                                this.yearSelectedStart=y1;this.monthSelectedStart=m1;
                                this.yearSelectedEnd=y2;this.monthSelectedEnd=m2;
                                dateStart=y1+'.'+m1;
                                dateEnd=y2+'.'+m2;
                            }
                        })();
                        break;
                    case 'year':
                        (() => {
                            const y1=this.clickYearSelectedStart,
                                y2=this.clickYearSelectedEnd;
                            this.yearSelectedStart=y1;
                            this.yearSelectedEnd=y2;
                            if (y1 > y2) {
                                this.yearSelectedStart=y2;
                                this.yearSelectedEnd=y1;
                                dateStart=y2;
                                dateEnd=y1;
                            } else {
                                this.yearSelectedStart=y1;
                                this.yearSelectedEnd=y2;
                                dateStart=y1;
                                dateEnd=y2;
                            }
                        })();
                        break;
                    default:
                        break;
                }

                this.selectedDateStart=dateStart;
                this.selectedDateEnd=dateEnd;
                const selectedDate=dateStart+'-'+dateEnd;
                this.selectedDate=selectedDate;
                this.blurStatus=false;
                /**
                 * 返回选择的时分秒
                 * @type Function
                 */
                this.$emit('change', [
                    selectedDate, dateStart, dateEnd,
                    ts, te,
                    this.thTextSelectedStart, this.thTextSelectedEnd
                ]);
            }
        }
    }
</script>
