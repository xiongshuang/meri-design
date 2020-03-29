<template>
    <div class="p-picker-child">
        <div
                :class="['p-picker-input', 'p-picker-input-double-max', quickSwitch?'p-picker-input-triangle':'p-picker-input-normal']"
                @mouseover="pickerClearShow"
                @mouseleave="pickerClearHide"
        >
            <i
                    v-if="quickSwitch"
                    :class="['p-picker-triangle', 'p-picker-triangle-left', !selectedDate&&'p-picker-triangle-disabled']"
                    @click="quickSort('left')"
            ><TrianglePickerLeft /></i>
            <section
                    :class="['p-picker-input-double-tip', thTextSelected?'p-picker-input-values':'p-picker-input-tip']"
                    @click="pickerBoxShow"
            >
                <article class="p-picker-input-tip-values p-picker-ellipsis">{{thTextSelectedStart?thTextSelectedStart:'开始日期'}}</article>
                <article class="p-picker-input-tip-to">至</article>
                <article class="p-picker-input-tip-values p-picker-ellipsis">{{thTextSelectedEnd?thTextSelectedEnd:'结束日期'}}</article>
            </section>
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
                    v-show="pickerBoxStatus"
                    tabindex="-1"
                    @mouseenter="pickerMainBlur"
                    @mouseleave="pickerMainFocus"
                    @blur="pickerBoxHide"
            >
                <div class="p-picker-main-item-box">
                    <div class="p-picker-main-item-input-box">
                        <section class="p-picker-input-alert">
                            <article
                                    :class="['p-picker-input-alert-tip', thTextSelectedStart?'p-picker-input-values':'p-picker-input-tip']"
                            >{{thTextSelectedStart?thTextSelectedStart:'开始日期'}}</article>
                            <article class="p-picker-input-tip-to">至</article>
                            <article
                                    :class="['p-picker-input-alert-tip', thTextSelectedEnd?'p-picker-input-values':'p-picker-input-tip']"
                            >{{thTextSelectedEnd?thTextSelectedEnd:'结束日期'}}</article>
                        </section>
                    </div>
                    <div class="p-picker-main-item">
                        <SingleYear
                                ref="singleYearStart"
                                v-show="panelYearStart"
                                date=""
                                @change="panelYearChangeDateStart"
                                @panelYearDisableArrow="panelYearDisableArrowStart"
                        />
                        <SingleMonth
                                ref="singleMonthStart"
                                v-show="panelMonthStart"
                                date=""
                                @change="panelMonthChangeDateStart"
                                @panelYearHandle="panelYearHandleStart"
                        />
                        <WeekSelect
                                v-show="!panelYearStart&&!panelMonthStart"
                                :multiple="true"
                                :yearNow="yearNow"
                                :monthNow="monthNow"
                                :yearActive="yearActiveStart"
                                :monthActive="monthActiveStart"
                                :weeksArray="weeksArrayStart"
                                :disableYearRight="disableYearRight"
                                :disableMonthRight="disableMonthRight"
                                @prevYear="prevYearStart"
                                @nextYear="nextYearStart"
                                @prevMonth="prevMonthStart"
                                @nextMonth="nextMonthStart"
                                @weekEnter="weekEnterStart"
                                @change="changeDateStart"
                                @panelYearHandle="panelYearHandleStart"
                                @panelMonthHandle="panelMonthHandleStart"
                        />
                        <SingleYear
                                ref="singleYearEnd"
                                borderLeft="border-left"
                                v-show="panelYearEnd"
                                date=""
                                @change="panelYearChangeDateEnd"
                                @panelYearDisableArrow="panelYearDisableArrowEnd"
                        />
                        <SingleMonth
                                ref="singleMonthEnd"
                                v-show="panelMonthEnd"
                                borderLeft="border-left"
                                date=""
                                @change="panelMonthChangeDateEnd"
                                @panelYearHandle="panelYearHandleEnd"
                        />
                        <WeekSelect
                                v-show="!panelYearEnd&&!panelMonthEnd"
                                borderLeft="border-left"
                                :multiple="true"
                                :yearNow="yearNow"
                                :monthNow="monthNow"
                                :yearActive="yearActiveEnd"
                                :monthActive="monthActiveEnd"
                                :weeksArray="weeksArrayEnd"
                                :disableYearLeft="disableYearLeft"
                                :disableMonthLeft="disableMonthLeft"
                                @prevYear="prevYearEnd"
                                @nextYear="nextYearEnd"
                                @prevMonth="prevMonthEnd"
                                @nextMonth="nextMonthEnd"
                                @weekEnter="weekEnterEnd"
                                @change="changeDateEnd"
                                @panelYearHandle="panelYearHandleEnd"
                                @panelMonthHandle="panelMonthHandleEnd"
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
    import SingleYear from '../../PickerYear/depend/singleYear';
    import SingleMonth from '../../PickerMonth/depend/singleMonth';
    import CountWeek from '../../static/utils/datePicker/CountWeek';

    import WeekSelect from './week';
    import Button from '../../Button';

    import ClearSvg from '../../static/iconSvg/clear2.svg';
    import CalendarSvg from '../../static/iconSvg/calendar.svg';
    import CountPrevMonth from "../../static/utils/datePicker/CountPrevMonth";
    import CountNextMonth from "../../static/utils/datePicker/CountNextMonth";
    import CountPrevYear from "../../static/utils/datePicker/CountPrevYear";
    import CountNextYear from "../../static/utils/datePicker/CountNextYear";
    import CountStartOrEndDate from "../../static/utils/datePicker/CountStartOrEndDate";
    import TrianglePickerLeft from '../../static/iconSvg/triangle_picker_left.svg';
    import TrianglePickerRight from '../../static/iconSvg/triangle_picker_right.svg';
    import CountBeforeOrAfterDay from "../../static/utils/datePicker/CountBeforeOrAfterDay";
    export default {
        name: "panelDoubleMonth",
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
             * 传入的时间段
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
                selectedDate: '', // 选中的时间-开始周到结束周
                selectedDateStart: '', // 选中的时间-开始周
                selectedDateEnd: '', // 选中的时间-结束周
                thTextSelected: '', // 选中的时间-开始周到结束周Text

                // 当前年月日
                yearNow: '',
                monthNow: '',

                // 活动的年月日
                yearActiveStart: '',
                monthActiveStart: '',
                yearActiveEnd: '',
                monthActiveEnd: '',

                // 选择的数据
                weeksSelectedStart: [], // 选择的周列表
                yearSelectedStart: '', // 选择的年
                monthSelectedStart: '', // 选择的月
                thTextSelectedStart: '', // 选择的第几周 String

                weeksSelectedEnd: [], // 选择的周列表
                yearSelectedEnd: '', // 选择的年
                monthSelectedEnd: '', // 选择的月
                thTextSelectedEnd: '', // 选择的第几周 String

                weeksArrayStart: [], // 周列表-开始
                weeksArrayEnd: [], // 周列表-结束

                disableYearRight: false, // 禁用开始时间右箭头-年
                disableYearLeft: false,  // 禁用结束时间左箭头-年
                disableMonthRight: false, // 禁用开始时间右箭头-月
                disableMonthLeft: false,  // 禁用结束时间左箭头-月

                sameMonth: false, // 开始结束时间在同一月

                panelYearStart: false, // 显示年面板
                panelMonthStart: false, // 显示月面板
                panelYearEnd: false, // 显示年面板
                panelMonthEnd: false // 显示月面板
            }
        },
        watch: {
            date(n, o) {
                if (n === o) return;
                this.dateFormat(n);
            },
            pickerBoxStatus(n) {
                if (n) return;
                this.panelYearHandleStart(false);
                this.panelMonthHandleStart(false);
                this.panelYearHandleEnd(false);
                this.panelMonthHandleEnd(false);
            }
        },
        created() {
            this.dateFormat(this.date);
        },
        methods: {
            /**
             * 改变按钮状态
             */
            changeBtnType(str) {
                if (str && str.replace(/[.-]/g, '')) this.btnType='primary';
                else this.btnType='disabled';
            },
            /**
             * 日期
             * @param date String '2020.01.06-2020.01.19'
             */
            dateFormat(date) {
                this.selectedDate=date;
                if (date) {
                    const [ds, de]=date.split('-'); // 得到开始、结束时间
                    const yms=ds.substr(0, 7); // 得到开始时间年月

                    const endLeftDate=CountStartOrEndDate(de, -6); // 计算结束周的开始年月日
                    const yme=endLeftDate.substr(0, 7); // 得到结束时间年月

                    // 设置结束时间
                    const [yearE, monthE]=endLeftDate.split('.');
                    this.yearSelectedEnd=yearE;
                    this.monthSelectedEnd=monthE;
                    this.yearActiveEnd=yearE;
                    this.monthActiveEnd=monthE;
                    this.selectedDateEnd=endLeftDate+'-'+de;

                    // 设置开始时间
                    const [yearS, monthS]=ds.split('.');
                    this.yearSelectedStart=yearS;
                    this.monthSelectedStart=monthS;
                    this.yearActiveStart=yearS;
                    this.monthActiveStart=monthS;
                    this.selectedDateStart=ds+'-'+CountStartOrEndDate(ds, 6);

                    // 如果开始结束年月相等，表示在同一月
                    this.sameMonth=(yms === yme);
                }

                this.initEnd();
            },
            // 禁用箭头
            disableArrow() {
                const activeStart=this.yearActiveStart+this.monthActiveStart;
                const activeEnd=this.yearActiveEnd+this.monthActiveEnd;

                const reg=/\./g;
                const nextYear=CountNextYear([this.yearActiveStart, this.monthActiveStart, this.dayActiveStart]).replace(reg, '').substr(0, 6);
                const nextMonth=CountNextMonth([this.yearActiveStart, this.monthActiveStart, this.dayActiveStart]).replace(reg, '').substr(0, 6);
                const prevYear=CountPrevYear([this.yearActiveEnd, this.monthActiveEnd, this.dayActiveEnd]).replace(reg, '').substr(0, 6);
                const prevMonth=CountPrevMonth([this.yearActiveEnd, this.monthActiveEnd, this.dayActiveEnd]).replace(reg, '').substr(0, 6);

                this.disableYearRight = nextYear >= activeEnd;
                this.disableMonthRight = nextMonth >= activeEnd;
                this.disableYearLeft = prevYear <= activeStart;
                this.disableMonthLeft = prevMonth <= activeStart;
            },

            /**
             * 初始化日期对象
             */
            initEnd() {
                const date=this.selectedDateEnd;
                const countWeek=new CountWeek({date, sort: this.sort});
                this.weeksArrayEnd=countWeek.getWeeksArray();
                this.countWeekEnd=countWeek;
                const [year, month]=countWeek.countNowDate();
                this.yearNow=year;
                this.monthNow=month;

                this.setDateEnd(date);

                if (this.sameMonth) {
                    const [es]=this.selectedDateEnd.split('-');
                    const [Y, M]=es.split('.');
                    const prevDate=CountPrevMonth([Y, M , '01']);
                    this.initStart(prevDate);
                } else {
                    if (date) {
                        this.initStart();
                    } else {
                        const prevDate=CountPrevMonth([year, month, '01']);
                        this.initStart(prevDate);
                    }
                }
            },
            /**
             * 初始化日期对象
             */
            initStart(d) {
                const date=d?d:this.selectedDateStart;
                const countWeek=new CountWeek({date, sort: this.sort});
                this.weeksArrayStart=countWeek.getWeeksArray();
                this.countWeekStart=countWeek;

                this.setDateStart(date);
            },
            /**
             * 设置选择的年月日
             * @param date String 2019
             */
            setDateEnd(date) {
                if (date) {
                    const reg=/[.第周]/g, date2=this.selectedDateStart;
                    const [sds]=date2.split('-'), [sde]=date.split('-');
                    const wa=this.weeksArrayEnd;
                    const [yearE, monthE]=sde.split('.');
                    this.yearActiveEnd=yearE;
                    this.monthActiveEnd=monthE;

                    // 结束时间
                    const {weeks: weeks2, thText: thText2}=wa.find(d => {
                        const dw=d.weeks;
                        const dStr=dw[0].year+'.'+dw[0].month+'.'+dw[0].day;
                        return (dStr === sde);
                    });
                    this.weeksSelectedEnd=weeks2;
                    this.thTextSelectedEnd=thText2;
                    const dateE=thText2.replace(reg, '');
                    if (this.sameMonth) { // 开始结束在同一月
                        // 开始时间
                        const {weeks, thText}=wa.find(d => {
                            const dw=d.weeks;
                            const dStr=dw[0].year+'.'+dw[0].month+'.'+dw[0].day;
                            return (dStr === sds);
                        });
                        this.weeksSelectedStart=weeks;
                        this.thTextSelectedStart=thText;

                        const dateS=thText.replace(reg, '');
                        this.thTextSelected=thText+'-'+thText2;

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
                } else {
                    this.yearActiveEnd=this.yearNow;
                    this.monthActiveEnd=this.monthNow;
                }
            },
            /**
             * 设置选择的年月日
             * @param date String 2019
             */
            setDateStart(date) {
                if (date) {
                    if (date.includes('-')) {
                        const reg=/[.第周]/g;
                        const [sd]=date.split('-');
                        const wa=this.weeksArrayStart;
                        const [year, month]=sd.split('.');
                        this.yearActiveStart=year;
                        this.monthActiveStart=month;

                        const {weeks, thText}=wa.find(d => {
                            const dw=d.weeks;
                            const dStr=dw[0].year+'.'+dw[0].month+'.'+dw[0].day;
                            return (dStr === sd);
                        });
                        this.weeksSelectedStart=weeks;
                        this.thTextSelectedStart=thText;
                        const dateS=thText.replace(reg, '');
                        this.weeksArrayStart=this.weeksArrayStart.map(d => {
                            if (d.flag === 'n') {
                                const dateC=d.thText.replace(reg, '');
                                if (dateC===dateS) d.selected='selected';
                                else if (dateC>dateS) d.multiple='multiple';
                            }
                            return d;
                        });
                        this.thTextSelected=this.thTextSelectedStart+'-'+this.thTextSelectedEnd;
                    } else {
                        const [year, month]=date.split('.');
                        this.yearActiveStart=year;
                        this.monthActiveStart=month;
                    }
                } else {
                    this.yearActiveStart=this.yearNow;
                    this.monthActiveStart=this.monthNow;
                }
                // 禁用箭头
                this.disableArrow();
                // 改变按钮状态
                this.changeBtnType(this.date);
            },
            /**
             * 改变选中状态
             * @param thText
             * @param clearOther Boolean 清空其他
             */
            changeWeeksArrayStart(thText, clearOther) {
                const reg=/[.第周]/g;
                const dateS=thText.replace(reg, '');
                const dateE=this.thTextSelectedEnd.replace(reg, '');
                this.weeksArrayStart=this.weeksArrayStart.map(d => {
                    if (d.flag === 'n') {
                        const dateC=d.thText.replace(reg, '');
                        if (this.sameMonth) {
                            if (d.thText===thText || d.thText === this.thTextSelectedEnd) {
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
            changeWeeksArrayEnd(thText, clearOther) {
                const reg=/[.第周]/g;
                const dateE=thText.replace(reg, '');
                const dateS=this.thTextSelectedStart.replace(reg, '');
                this.weeksArrayEnd=this.weeksArrayEnd.map(d => {
                    if (d.flag === 'n') {
                        const dateC=d.thText.replace(reg, '');
                        if (this.sameMonth) {
                            if (d.thText===thText || d.thText === this.thTextSelectedStart) {
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
                this.thTextSelected='';
                this.weeksSelectedStart=[];
                this.weeksSelectedEnd=[];
                this.yearSelectedStart='';
                this.monthSelectedStart='';
                this.yearSelectedEnd='';
                this.monthSelectedEnd='';
                this.thTextSelectedStart='';
                this.thTextSelectedEnd='';
                this.sameMonth=false;
                this.$emit('change', {thTextSelected: '', selectedDate: ''});
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
                // 初始化日期对象
                if (this.date) this.dateFormat(this.date);
                else this.initEnd();
            },
            /**
             * 关闭时间选择盒子
             */
            pickerBoxHide() {
                if (this.pickerBoxStatus && this.blurStatus) this.pickerBoxStatus=false;
                if (!this.selectedDate) this.clearTime();
            },
            /**
             * 切换日期
             * @param Y
             * @param M
             */
            switchDateStart(Y, M) {
                this.yearActiveStart=Y;
                this.monthActiveStart=M;
                this.countWeekStart.setYearMonth(Y, M);
                this.weeksArrayStart=this.countWeekStart.getWeeksArray();
                this.disableArrow();
                this.changeWeeksArrayStart(this.thTextSelectedStart, false);
            },
            /**
             * 切换日期
             * @param Y
             * @param M
             */
            switchDateEnd(Y, M) {
                this.yearActiveEnd=Y;
                this.monthActiveEnd=M;
                this.countWeekEnd.setYearMonth(Y, M);
                this.weeksArrayEnd=this.countWeekEnd.getWeeksArray();
                this.disableArrow();
                this.changeWeeksArrayEnd(this.thTextSelectedEnd, false);
            },
            /**
             * 上一年-start
             */
            prevYearStart() {
                const date=CountPrevYear([this.yearActiveStart, this.monthActiveStart, '01']);
                const [Y, M]=date.split('.');
                this.switchDateStart(Y, M);
            },
            /**
             * 上一年-end
             */
            prevYearEnd() {
                const date=CountPrevYear([this.yearActiveEnd, this.monthActiveEnd, '01']);
                const [Y, M]=date.split('.');
                this.switchDateEnd(Y, M);
            },
            /**
             * 下一年-start
             */
            nextYearStart() {
                const date=CountNextYear([this.yearActiveStart, this.monthActiveStart, '01']);
                const [Y, M]=date.split('.');
                this.switchDateStart(Y, M);
            },
            /**
             * 下一年-end
             */
            nextYearEnd() {
                const date=CountNextYear([this.yearActiveEnd, this.monthActiveEnd, '01']);
                const [Y, M]=date.split('.');
                this.switchDateEnd(Y, M);
            },
            /**
             * 上一月-start
             */
            prevMonthStart() {
                const date=CountPrevMonth([this.yearActiveStart, this.monthActiveStart, '01']);
                const [Y, M]=date.split('.');
                this.switchDateStart(Y, M);
            },
            /**
             * 上一月-end
             */
            prevMonthEnd() {
                const date=CountPrevMonth([this.yearActiveEnd, this.monthActiveEnd, '01']);
                const [Y, M]=date.split('.');
                this.switchDateEnd(Y, M);
            },
            /**
             * 下一月-start
             */
            nextMonthStart() {
                const date=CountNextMonth([this.yearActiveStart, this.monthActiveStart, '01']);
                const [Y, M]=date.split('.');
                this.switchDateStart(Y, M);
            },
            /**
             * 下一月-end
             */
            nextMonthEnd() {
                const date=CountNextMonth([this.yearActiveEnd, this.monthActiveEnd, '01']);
                const [Y, M]=date.split('.');
                this.switchDateEnd(Y, M);
            },
            /**
             * 点击日期-开始日期
             * @param weeks
             * @param year
             * @param month
             * @param thText
             */
            changeDateStart({weeks, year, month, thText}) {
                let clearOther=false;
                if (this.thTextSelectedStart && this.thTextSelectedEnd) {
                    this.weeksSelectedStart=weeks;
                    this.yearSelectedStart=year;
                    this.monthSelectedStart=month;
                    this.thTextSelectedStart=thText;

                    this.weeksSelectedEnd=[];
                    this.yearSelectedEnd='';
                    this.monthSelectedEnd='';
                    this.thTextSelectedEnd='';
                    clearOther=true;
                    this.changeWeeksArrayEnd(thText, clearOther);
                } else if (this.thTextSelectedStart && !this.thTextSelectedEnd) {
                    this.weeksSelectedEnd=weeks;
                    this.yearSelectedEnd=year;
                    this.monthSelectedEnd=month;
                    this.thTextSelectedEnd=thText;
                } else {
                    this.weeksSelectedStart=weeks;
                    this.yearSelectedStart=year;
                    this.monthSelectedStart=month;
                    this.thTextSelectedStart=thText;
                }

                if (this.thTextSelectedStart && this.thTextSelectedEnd) this.btnType='primary';
                else this.btnType='disabled';
                this.sameMonth=((this.yearSelectedStart+'.'+this.monthSelectedStart) === (this.yearSelectedEnd+'.'+this.monthSelectedEnd));
                this.changeWeeksArrayStart(thText, clearOther);
            },
            /**
             * 点击日期-结束日期
             * @param weeks
             * @param year
             * @param month
             * @param thText
             */
            changeDateEnd({weeks, year, month, thText}) {
                let clearOther=false;
                if (this.thTextSelectedStart && this.thTextSelectedEnd) {
                    this.weeksSelectedEnd=weeks;
                    this.yearSelectedEnd=year;
                    this.monthSelectedEnd=month;
                    this.thTextSelectedEnd=thText;

                    this.weeksSelectedStart=[];
                    this.yearSelectedStart='';
                    this.monthSelectedStart='';
                    this.thTextSelectedStart='';
                    clearOther=true;
                    this.changeWeeksArrayStart(thText, clearOther);
                } else if (!this.thTextSelectedStart && this.thTextSelectedEnd) {
                    this.weeksSelectedStart=weeks;
                    this.yearSelectedStart=year;
                    this.monthSelectedStart=month;
                    this.thTextSelectedStart=thText;
                } else {
                    this.weeksSelectedEnd=weeks;
                    this.yearSelectedEnd=year;
                    this.monthSelectedEnd=month;
                    this.thTextSelectedEnd=thText;
                }

                if (this.thTextSelectedStart && this.thTextSelectedEnd) this.btnType='primary';
                else this.btnType='disabled';
                this.sameMonth=((this.yearSelectedStart+'.'+this.monthSelectedStart) === (this.yearSelectedEnd+'.'+this.monthSelectedEnd));
                this.changeWeeksArrayEnd(thText, clearOther);
            },
            /**
             * 鼠标进入-开始日期
             * @param weeks
             * @param year
             * @param month
             * @param thText
             */
            weekEnterStart({weeks, year, month, thText}) {
                if ((!this.yearSelectedStart && !this.yearSelectedEnd) || (this.yearSelectedStart && this.yearSelectedEnd)) return;
                const reg=/[.第周]/g;
                const weeksArray=this.weeksArrayStart;
                const dateS=this.thTextSelectedStart.replace(reg, '');
                const dateE=this.thTextSelectedEnd.replace(reg, '');
                const dateN=thText.replace(reg, '');

                // 当前传入时间的索引
                const nInd=weeksArray.findIndex(d => d.thText===thText);
                // 已选择的时间的索引
                const sInd=weeksArray.findIndex(d => d.thText===this.thTextSelectedStart);

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
             * 鼠标进入-结束日期
             * @param weeks
             * @param year
             * @param month
             * @param thText
             */
            weekEnterEnd({weeks, year, month, thText}) {
                if ((!this.yearSelectedStart && !this.yearSelectedEnd) || (this.yearSelectedStart && this.yearSelectedEnd)) return;
                const reg=/[.第周]/g;
                const weeksArray=this.weeksArrayEnd;
                const dateS=this.thTextSelectedStart.replace(reg, '');
                const dateE=this.thTextSelectedEnd.replace(reg, '');
                const dateN=thText.replace(reg, '');

                // 当前传入时间的索引
                const nInd=weeksArray.findIndex(d => d.thText===thText);
                // 已选择的时间的索引
                const sInd=weeksArray.findIndex(d => d.thText===this.thTextSelectedEnd);


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
            // 开始结束时间交换位置
            /*
            exchange() {
                console.log('%c开始结束时间交换位置', 'color: #0091ff;');
                [this.selectedDateStart, this.selectedDateEnd]=[this.selectedDateEnd, this.selectedDateStart];
                [this.yearActiveStart, this.yearActiveEnd]=[this.yearActiveEnd, this.yearActiveStart];
                [this.monthActiveStart, this.monthActiveEnd]=[this.monthActiveEnd, this.monthActiveStart];
                [this.weeksSelectedStart, this.weeksSelectedEnd]=[this.weeksSelectedEnd, this.weeksSelectedStart];
                [this.yearSelectedStart, this.yearSelectedEnd]=[this.yearSelectedEnd, this.yearSelectedStart];
                [this.monthSelectedStart, this.monthSelectedEnd]=[this.monthSelectedEnd, this.monthSelectedStart];
                [this.thTextSelectedStart, this.thTextSelectedEnd]=[this.thTextSelectedEnd, this.thTextSelectedStart];
            },
            */

            // 清空开始周选中
            clearWeeksArrayStart() {
                this.weeksArrayStart=this.weeksArrayStart.map(d => {
                    d.selected='';
                    d.multiple='';
                    return d;
                });
                this.btnType='disabled';
            },
            // 清空结束周选中
            clearWeeksArrayEnd() {
                this.weeksArrayEnd=this.weeksArrayEnd.map(d => {
                    d.selected='';
                    d.multiple='';
                    return d;
                });
                this.btnType='disabled';
            },

            // 年面板显示切换-start，如果flag为true则执行禁用箭头函数
            panelYearHandleStart(status, flag) {
                this.panelYearStart=status;
                this.panelMonthStart=false;
                const y=this.$refs.singleYearEnd.yearsArray[0].year;
                // 重新计算年列表
                const yae=(y-1).toString();
                this.$refs.singleYearStart.init(yae);
                this.$refs.singleYearStart.changeYearsArray(this.yearActiveStart);
                if (flag) this.panelYearDisableArrowStart();
            },
            // 年面板显示切换-end
            panelYearHandleEnd(status, flag) {
                this.panelYearEnd=status;
                this.panelMonthEnd=false;
                const y=this.$refs.singleYearStart.yearsArray[11].year;
                // 重新计算年列表
                const yas=(Number(y)+12).toString();
                this.$refs.singleYearEnd.init(yas);
                this.$refs.singleYearEnd.changeYearsArray(this.yearActiveEnd);
                if (flag) this.panelYearDisableArrowEnd();
            },
            // 禁用箭头-start
            panelYearDisableArrowStart() {
                const sys=this.$refs.singleYearStart, sye=this.$refs.singleYearEnd;
                const yas=sys.yearsArray;
                const yae=sye.yearsArray;
                const ys=yas[11].year, ye=yae[0].year;
                if (ye - ys < 12) {
                    sys.disableYearRight = true;
                    sye.disableYearLeft = true;
                } else {
                    sys.disableYearRight = false;
                    sye.disableYearLeft = false;
                }
            },
            // 禁用箭头-end
            panelYearDisableArrowEnd() {
                const sys=this.$refs.singleYearStart, sye=this.$refs.singleYearEnd;
                const yas=sys.yearsArray;
                const yae=sye.yearsArray;
                const ys=yas[11].year, ye=yae[0].year;
                if (ye - ys < 12) {
                    sye.disableYearLeft = true;
                    sys.disableYearRight = true;
                } else {
                    sye.disableYearLeft = false;
                    sys.disableYearRight = false;
                }
            },
            // 点击年-start
            panelYearChangeDateStart(year) {
                this.panelYearHandleStart(false);
                this.yearActiveStart=year;
                this.weeksArrayStart=this.countWeekStart.yearChangeCountWeek(year, this.monthActiveStart, this.sort);
                if (this.yearSelectedStart && this.yearSelectedEnd) this.clearWeeksArrayEnd();
            },
            // 点击年-end
            panelYearChangeDateEnd(year) {
                this.panelYearHandleEnd(false);
                this.yearActiveEnd=year;
                this.weeksArrayEnd=this.countWeekEnd.yearChangeCountWeek(year, this.monthActiveEnd, this.sort);
                if (this.yearSelectedStart && this.yearSelectedEnd) this.clearWeeksArrayStart();
            },
            // 月面板的yearActive改变，改变年面板的year选中项-start
            changeYearsArrayHandleStart(year) {
                this.$refs.singleYearStart.changeYearsArray(year)
            },
            // 月面板的yearActive改变，改变年面板的year选中项-end
            changeYearsArrayHandleEnd(year) {
                this.$refs.singleYearEnd.changeYearsArray(year)
            },
            // 月面板显示切换-start
            panelMonthHandleStart(status) {
                // 计算月
                const sms=this.$refs.singleMonthStart;
                if (sms.yearActive !== this.yearActiveStart || sms.monthActive !== this.monthActiveStart) sms.init(this.yearActiveStart+'.'+this.monthActiveStart);
                this.panelMonthStart=status;

                if (this.yearActiveStart === this.yearActiveEnd) sms.setMonthsArrayRightDisable(this.monthActiveEnd);
            },
            // 月面板显示切换-end
            panelMonthHandleEnd(status) {
                // 计算月
                const sme=this.$refs.singleMonthEnd;
                if (sme.yearActive !== this.yearActiveEnd || sme.monthActive !== this.monthActiveEnd) sme.init(this.yearActiveEnd+'.'+this.monthActiveEnd);
                this.panelMonthEnd=status;

                if (this.yearActiveStart === this.yearActiveEnd) sme.setMonthsArrayLeftDisable(this.monthActiveStart);
            },
            // 点击月-start
            panelMonthChangeDateStart({year, month}) {
                this.panelMonthHandleStart(false);
                this.monthActiveStart=month;
                this.weeksArrayStart=this.countWeekStart.yearChangeCountWeek(year, month, this.sort);
                if (this.yearSelectedStart && this.yearSelectedEnd) this.clearWeeksArrayEnd();
            },
            // 点击月-end
            panelMonthChangeDateEnd({year, month}) {
                this.panelMonthHandleEnd(false);
                this.monthActiveEnd=month;
                this.weeksArrayEnd=this.countWeekEnd.yearChangeCountWeek(year, month, this.sort);
                if (this.yearSelectedStart && this.yearSelectedEnd) this.clearWeeksArrayStart();
            },

            // 快速选择-设置时间 flag可选值【left，right】
            quickSort(flag) {
                if (!this.selectedDate) return;
                const ws=this.weeksSelectedStart, s=ws[0],
                    we=this.weeksSelectedEnd, e=we[6];
                const ys=s.year, ms=s.month, ds=s.day,
                    ye=e.year, me=e.month, de=e.day;
                const diff=(new Date(ye, me-1, de).getTime() - new Date(ys, ms-1, ds).getTime()) / (1000*60*60*24);

                let selectedDateStart, selectedDateEnd;
                if (flag === 'left') {
                    const [ey, em, ed]=CountBeforeOrAfterDay(ys, ms, ds, -1);
                    const [sy, sm, sd]=CountBeforeOrAfterDay(ey, em, ed, -diff);
                    selectedDateStart=sy+'.'+sm+'.'+sd;
                    selectedDateEnd=ey+'.'+em+'.'+ed;
                } else {
                    const [sy, sm, sd]=CountBeforeOrAfterDay(ye, me, de, 1);
                    const [ey, em, ed]=CountBeforeOrAfterDay(sy, sm, sd, diff);
                    selectedDateStart=sy+'.'+sm+'.'+sd;
                    selectedDateEnd=ey+'.'+em+'.'+ed;
                }

                const selectedDate=selectedDateStart+'-'+selectedDateEnd;
                this.dateFormat(selectedDate);
                this.$emit('change', {thTextSelected: this.thTextSelected, selectedDate});
            },
            /**
             * 确定
             */
            pickerConfirm() {
                const reg=/[.第周]/g;
                const ws=this.weeksSelectedStart,
                    we=this.weeksSelectedEnd,
                    thStart=this.thTextSelectedStart,
                    thEnd=this.thTextSelectedEnd;
                const ss=ws[0], se=ws[6], es=we[0], ee=we[6];
                const startS=ss.year+'.'+ss.month+'.'+ss.day,
                    endS=se.year+'.'+se.month+'.'+se.day;
                const startE=es.year+'.'+es.month+'.'+es.day,
                    endE=ee.year+'.'+ee.month+'.'+ee.day;

                this.selectedDateStart=startS+'-'+endS;
                this.selectedDateEnd=startE+'-'+endE;

                let thTextSelected='', selectedDate='';
                if (thStart.replace(reg, '') > thEnd.replace(reg, '')) { // 开始时间大于结束时间
                    thTextSelected=thEnd+'-'+thStart;
                    selectedDate=startE+'-'+endS;
                    // this.exchange();
                } else {
                    thTextSelected=thStart+'-'+thEnd;
                    selectedDate=startS+'-'+endE;
                }
                this.sameMonth=((ss.year+'.'+ss.month)===(es.year+'.'+es.month));
                this.selectedDate=selectedDate;
                this.thTextSelected=thTextSelected;
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
