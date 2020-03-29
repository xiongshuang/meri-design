<template>
    <div class="p-picker-child">
        <div
                :class="['p-picker-input', 'p-picker-input-double', quickSwitch?'p-picker-input-triangle':'p-picker-input-normal']"
                @mouseover="pickerClearShow"
                @mouseleave="pickerClearHide"
        >
            <i v-if="quickSwitch"
               :class="['p-picker-triangle', 'p-picker-triangle-left', !selectedDate&&'p-picker-triangle-disabled']"
               @click="quickSort('left')"
            ><TrianglePickerLeft /></i>
            <section
                    :class="['p-picker-input-double-tip', selectedDate?'p-picker-input-values':'p-picker-input-tip']"
                    @click="pickerBoxShow"
            >
                <article class="p-picker-input-tip-values">{{dateStart?dateStart:'开始日期'}}</article>
                <article class="p-picker-input-tip-to">至</article>
                <article class="p-picker-input-tip-values">{{dateEnd?dateEnd:'结束日期'}}</article>
            </section>
            <section v-if="!quickSwitch" class="p-picker-svg-box">
                <ClearSvg class="p-picker-clear-svg" v-if="clearStatus" @click.stop="clearTime" />
                <CalendarSvg v-else />
            </section>
            <i v-if="quickSwitch"
               :class="['p-picker-triangle', 'p-picker-triangle-right', !selectedDate&&'p-picker-triangle-disabled']"
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
                                    :class="['p-picker-input-alert-tip', yearSelectedStart?'p-picker-input-values':'p-picker-input-tip']"
                            >{{(yearSelectedStart&&monthSelectedStart)?(yearSelectedStart+'.'+monthSelectedStart):'开始日期'}}</article>
                            <article class="p-picker-input-tip-to">至</article>
                            <article
                                    :class="['p-picker-input-alert-tip', yearSelectedEnd?'p-picker-input-values':'p-picker-input-tip']"
                            >{{(yearSelectedEnd&&monthSelectedEnd)?(yearSelectedEnd+'.'+monthSelectedEnd):'结束日期'}}</article>
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
                        <DoubleMonth
                                v-show="!panelYearStart"
                                :yearNow="yearNow"
                                :monthNow="monthNow"
                                :yearActive="yearActiveStart"
                                :monthActive="monthActiveStart"
                                :monthsArray="monthsArrayStart"
                                @prevYear="prevYearStart"
                                @nextYear="nextYearStart"
                                @change="changeDateStart"
                                :disableYearRight="disableYearRight"
                                @monthEnter="monthEnterStart"
                                @panelYearHandle="panelYearHandleStart"
                        />
                        <SingleYear
                                ref="singleYearEnd"
                                borderLeft="border-left"
                                v-show="panelYearEnd"
                                date=""
                                @change="panelYearChangeDateEnd"
                                @panelYearDisableArrow="panelYearDisableArrowEnd"
                        />
                        <DoubleMonth
                                v-show="!panelYearEnd"
                                borderLeft="border-left"
                                :yearNow="yearNow"
                                :monthNow="monthNow"
                                :yearActive="yearActiveEnd"
                                :monthActive="monthActiveEnd"
                                :monthsArray="monthsArrayEnd"
                                @prevYear="prevYearEnd"
                                @nextYear="nextYearEnd"
                                @change="changeDateEnd"
                                :disableYearLeft="disableYearLeft"
                                @monthEnter="monthEnterEnd"
                                @panelYearHandle="panelYearHandleEnd"
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
    import CountMonth from '../../static/utils/datePicker/CountMonth';
    import CountLeftOrRightMonth from '../../static/utils/datePicker/CountLeftOrRightMonth';

    import DoubleMonth from './doubleMonth';
    import Button from '../../Button';

    import ClearSvg from '../../static/iconSvg/clear2.svg';
    import CalendarSvg from '../../static/iconSvg/calendar.svg';
    import TrianglePickerLeft from '../../static/iconSvg/triangle_picker_left.svg';
    import TrianglePickerRight from '../../static/iconSvg/triangle_picker_right.svg';
    export default {
        name: "panelDoubleMonth",
        components: {
            SingleYear,
            DoubleMonth,
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

                dateStart: '',
                dateEnd: '',

                // 当前年月日
                yearNow: '',
                monthNow: '',

                // 活动的年月日
                yearActiveStart: '',
                monthActiveStart: '',
                yearActiveEnd: '',
                monthActiveEnd: '',

                // 选择的年月日
                yearSelectedStart: '',
                monthSelectedStart: '',
                yearSelectedEnd: '',
                monthSelectedEnd: '',

                monthsArrayStart: [], // 日列表-开始
                monthsArrayEnd: [], // 日列表-结束

                disableYearRight: false, // 禁用开始时间右箭头-年
                disableYearLeft: false,  // 禁用结束时间左箭头-年

                panelYearStart: false, // 显示年面板
                panelYearEnd: false // 显示年面板
            }
        },
        watch: {
            date(n, o) {
                if (n === o) return;
                this.dateFormat(n);

                this.initEnd();
            },
            pickerBoxStatus(n) {
                if (n) return;
                this.panelYearHandleStart(false);
                this.panelYearHandleEnd(false);
            }
        },
        created() {
            this.dateFormat(this.date);

            this.initEnd();
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
             * @param date String '2019.03-2020.10'
             */
            dateFormat(date) {
                this.selectedDate=date;
                this.changeBtnType(date);
                let dateStart='', dateEnd='';
                if (date && date.includes('-')) {
                    const [ds, de]=date.split('-');
                    dateStart=ds;
                    dateEnd=de;
                }
                this.dateStart=dateStart;
                this.dateEnd=dateEnd;
            },
            // 禁用箭头
            disableArrow() {
                const activeStart=this.yearActiveStart;
                const activeEnd=this.yearActiveEnd;

                const nextYear=(parseInt(activeStart)+1).toString();
                const prevYear=(parseInt(activeEnd)-1).toString();

                this.disableYearRight = nextYear >= activeEnd;
                this.disableYearLeft = prevYear <= activeStart;
            },

            /**
             * 初始化日期对象
             */
            initEnd() {
                const countMonthEnd=new CountMonth(this.dateEnd); // 当前计算年、月的对象
                this.monthsArrayEnd=countMonthEnd.getMonthsArray();
                const [year, month]=countMonthEnd.countNowMonth();
                this.yearNow=year;
                this.monthNow=month;

                this.setDateEnd(this.dateEnd);

                // 初始化开始时间对象
                this.initStart(this.dateStart);
            },
            /**
             * 初始化日期对象
             */
            initStart(date) {
                const dateS=date.replace(/\./g, '');
                const dateE=this.dateEnd.replace(/\./g, '');
                const dateStart=(date && (dateE - dateS > 12))?date:(this.monthsArrayEnd[0].year-1).toString();
                const countMonthStart=new CountMonth(dateStart+'.01.01'); // 当前计算年的对象
                this.monthsArrayStart=countMonthStart.getMonthsArray();

                this.setDateStart(this.dateStart);

                this.disableArrow();
            },
            /**
             * 设置选择的年月日
             * @param date String 2019
             */
            setDateEnd(date) {
                if (date) {
                    const dateS=this.dateStart.replace(/\./g, '');
                    const dateE=date.replace(/\./g, '');
                    const [year, month]=date.split('.');
                    this.yearSelectedEnd=year;
                    this.monthSelectedEnd=month;
                    this.yearActiveEnd=year;
                    this.monthActiveEnd=month;
                    // 设置默认选中状态
                    const monthsArray=this.monthsArrayEnd;
                    if (dateE-dateS<=12) {
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
                } else {
                    this.yearActiveEnd=this.yearNow;
                    this.monthActiveEnd=this.monthNow;
                    this.changeMonthsArrayEnd({year: '', month: ''});
                }
            },
            /**
             * 设置选择的年月日
             * @param date String 2019
             */
            setDateStart(date) {
                if (date) {
                    const dateS=date.replace(/\./g, '');
                    const dateE=this.dateEnd.replace(/\./g, '');
                    const [year, month]=date.split('.');
                    this.yearSelectedStart=year;
                    this.monthSelectedStart=month;

                    if (dateE-dateS>12) {
                        // 设置默认选中状态
                        const monthsArray=this.monthsArrayStart;
                        this.monthsArrayStart=monthsArray.map(d => {
                            const dateC=d.year+d.month;
                            if (dateC===dateS) d.selected='selected';
                            else if (dateC>dateS) d.multiple='multiple';
                            return d;
                        })
                    } else {
                        this.yearActiveStart=year-1+'';
                        this.monthActiveStart=month;
                    }
                } else {
                    this.yearActiveStart=this.monthsArrayStart[0].year;
                    this.monthActiveStart='';
                    this.changeMonthsArrayStart({year: '', month: ''});
                }
            },
            /**
             * 改变选中状态
             * @param year
             * @param month
             * @param clearOther Boolean 清空其他
             */
            changeMonthsArrayEnd({year, month}, clearOther) {
                this.monthsArrayEnd=this.monthsArrayEnd.map(d => {
                    if (d.year===year && d.month===month) {
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
             * @param year
             * @param month
             * @param clearOther Boolean 清空其他
             */
            changeMonthsArrayStart({year, month}, clearOther) {
                this.monthsArrayStart=this.monthsArrayStart.map(d => {
                    if (d.year===year && d.month===month) {
                        d.selected='selected';
                    } else if (clearOther) {
                        d.selected='';
                        d.multiple='';
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
                this.yearSelectedStart='';
                this.monthSelectedStart='';
                this.yearSelectedEnd='';
                this.monthSelectedEnd='';
                this.$emit('change', '');
                this.pickerClearHide();
                this.changeMonthsArrayStart({year: '', month: ''}, true);
                this.changeMonthsArrayEnd({year: '', month: ''}, true);
                this.changeYearsArrayHandleStart('');
                this.changeYearsArrayHandleEnd('');
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
             * @param date String '2019.10'
             */
            switchDateStart(date) {
                const countMonthStart=new CountMonth(date); // 当前计算天的对象
                this.monthsArrayStart=countMonthStart.getMonthsArray();

                this.disableArrow();

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
            },
            /**
             * 切换日期
             * @param date String '2019.10.31'
             */
            switchDateEnd(date) {
                const countMonthEnd=new CountMonth(date); // 当前计算天的对象
                this.monthsArrayEnd=countMonthEnd.getMonthsArray();

                this.disableArrow();

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
            },
            /**
             * 上一年
             */
            prevYearStart() {
                const date=(this.yearActiveStart-1).toString();
                this.yearActiveStart=date;
                this.changeYearsArrayHandleStart(date);
                this.switchDateStart(date+'.'+this.monthActiveStart);
            },
            /**
             * 上一年
             */
            prevYearEnd() {
                const date=(this.yearActiveEnd-1).toString();
                this.yearActiveEnd=date;
                this.changeYearsArrayHandleEnd(date);
                this.switchDateEnd(date+'.'+this.monthActiveEnd);
            },
            /**
             * 下一年
             */
            nextYearStart() {
                const date=(parseInt(this.yearActiveStart)+1).toString();
                this.yearActiveStart=date;
                this.switchDateStart(date+'.'+this.monthActiveStart);
            },
            /**
             * 下一年
             */
            nextYearEnd() {
                const date=(parseInt(this.yearActiveEnd)+1).toString();
                this.yearActiveEnd=date;
                this.switchDateEnd(date+'.'+this.monthActiveEnd);
            },
            /**
             * 点击日期-开始日期
             * @param year
             * @param month
             */
            changeDateStart({year, month}) {
                let clearOther=false;
                if (this.yearSelectedStart && this.yearSelectedEnd) {
                    this.yearSelectedStart=year;
                    this.monthSelectedStart=month;

                    this.yearSelectedEnd='';
                    this.monthSelectedEnd='';
                    clearOther=true;

                    this.changeMonthsArrayEnd({year: '', month: ''}, clearOther);
                } else if (this.yearSelectedStart && !this.yearSelectedEnd) {
                    this.yearSelectedEnd=year;
                    this.monthSelectedEnd=month;
                } else {
                    this.yearSelectedStart=year;
                    this.monthSelectedStart=month;
                }

                if (this.yearSelectedStart && this.yearSelectedEnd) this.btnType='primary';
                else this.btnType='disabled';

                this.changeMonthsArrayStart({year, month}, clearOther);
            },
            /**
             * 点击日期-结束日期
             * @param year
             * @param month
             */
            changeDateEnd({year, month}) {
                let clearOther=false;
                if (this.yearSelectedStart && this.yearSelectedEnd) {
                    this.yearSelectedEnd=year;
                    this.monthSelectedEnd=month;

                    this.yearSelectedStart='';
                    this.monthSelectedStart='';
                    clearOther=true;

                    this.changeMonthsArrayStart({year: '', month: ''}, clearOther);
                } else if (!this.yearSelectedStart && this.yearSelectedEnd) {
                    this.yearSelectedStart=year;
                    this.monthSelectedStart=month;
                } else {
                    this.yearSelectedEnd=year;
                    this.monthSelectedEnd=month;
                }

                if (this.yearSelectedStart && this.yearSelectedEnd) this.btnType='primary';
                else this.btnType='disabled';

                this.changeMonthsArrayEnd({year, month}, clearOther);
            },
            /**
             * 鼠标进入-开始日期
             * @param year
             * @param month
             */
            monthEnterStart({year, month}) {
                if ((!this.yearSelectedStart && !this.yearSelectedEnd) || (this.yearSelectedStart && this.yearSelectedEnd)) return;
                const monthsArray=this.monthsArrayStart;
                const dateS=this.yearSelectedStart+this.monthSelectedStart;
                const dateE=this.yearSelectedEnd+this.monthSelectedEnd;
                const dateN=year+month;

                // 当前传入时间的索引
                const nInd=monthsArray.findIndex(d => d.year===year && d.month===month);
                // 以选择的时间的索引
                const sInd=monthsArray.findIndex(d => d.year===this.yearSelectedStart && d.month===this.monthSelectedStart);

                /* 修改开始右侧结束时间面板multiple -s */
                if (dateE) {
                    const monthsArrayEnd=this.monthsArrayEnd;
                    if (dateN > dateE) { // 选中的左侧面板开始时间大于当前鼠标hover的时间
                        this.monthsArrayEnd=monthsArrayEnd.map(d => {
                            const dateC=d.year+d.month;
                            if (dateC < dateN && dateC > dateE) d.multiple='multiple';
                            else d.multiple='';
                            return d;
                        })
                    } else {
                        this.monthsArrayEnd=monthsArrayEnd.map(d => {
                            const dateC=d.year+d.month;
                            if (dateC > dateN && dateC < dateE) d.multiple='multiple';
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
            /**
             * 鼠标进入-结束日期
             * @param year
             * @param month
             */
            monthEnterEnd({year, month}) {
                if ((!this.yearSelectedStart && !this.yearSelectedEnd) || (this.yearSelectedStart && this.yearSelectedEnd)) return;
                const monthsArray=this.monthsArrayEnd;
                const dateS=this.yearSelectedStart+this.monthSelectedStart;
                const dateE=this.yearSelectedEnd+this.monthSelectedEnd;
                const dateN=year+month;

                // 当前传入时间的索引
                const nInd=monthsArray.findIndex(d => d.year===year && d.month===month);
                // 以选择的时间的索引
                const sInd=monthsArray.findIndex(d => d.year===this.yearSelectedEnd && d.month===this.monthSelectedEnd);


                /* 修改左侧开始时间面板multiple -s */
                if (dateS) {
                    const monthsArrayStart=this.monthsArrayStart;
                    if (dateN > dateS) { // 选中的左侧面板开始时间大于当前鼠标hover的时间
                        this.monthsArrayStart=monthsArrayStart.map(d => {
                            const dateC=d.year+d.month;
                            if (dateC < dateN && dateC > dateS) d.multiple='multiple';
                            else d.multiple='';
                            return d;
                        })
                    } else {
                        this.monthsArrayStart=monthsArrayStart.map(d => {
                            const dateC=d.year+d.month;
                            if (dateC > dateN && dateC < dateS) d.multiple='multiple';
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
            // 快速选择-设置时间 flag可选值【left，right】
            quickSort(flag) {
                if (!this.selectedDate) return;
                const dateS=this.yearSelectedStart+'.'+this.monthSelectedStart, dateE=this.yearSelectedEnd+'.'+this.monthSelectedEnd;
                const [YS, MS, YE, ME]=CountLeftOrRightMonth(flag, dateS, dateE);

                const dateStart=YS+'.'+MS, dateEnd=YE+'.'+ME;
                this.dateStart=dateStart;
                this.dateEnd=dateEnd;

                const selectedDate=dateStart+'-'+dateEnd;
                this.yearSelectedStart=YS;
                this.monthSelectedStart=MS;
                this.yearSelectedEnd=YE;
                this.monthSelectedEnd=ME;
                this.selectedDate=selectedDate;

                this.initEnd();
                this.$emit('change', selectedDate);
            },
            /**
             * 确定
             */
            pickerConfirm() {
                const dateS=this.yearSelectedStart+'.'+this.monthSelectedStart;
                const dateE=this.yearSelectedEnd+'.'+this.monthSelectedEnd;
                const selectedDate=dateS>dateE?(dateE+'-'+dateS):(dateS+'-'+dateE);
                this.selectedDate=selectedDate;
                this.dateStart=dateS;
                this.dateEnd=dateE;
                /**
                 * 返回选择的时分秒
                 * @type Function
                 */
                this.$emit('change', selectedDate);
                this.blurStatus=false;
                this.pickerBoxStatus=false;
            },

            // 年面板显示切换-start，如果flag为true则执行禁用箭头函数
            panelYearHandleStart(status, flag) {
                this.panelYearStart=status;
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
                this.switchDateStart(year+'.'+this.monthActiveStart)
            },
            // 点击年-end
            panelYearChangeDateEnd(year) {
                this.panelYearHandleEnd(false);
                this.yearActiveEnd=year;
                this.switchDateEnd(year+'.'+this.monthActiveEnd)
            },
            // 月面板的yearActive改变，改变年面板的year选中项-start
            changeYearsArrayHandleStart(year) {
                this.$refs.singleYearStart.changeYearsArray(year)
            },
            // 月面板的yearActive改变，改变年面板的year选中项-end
            changeYearsArrayHandleEnd(year) {
                this.$refs.singleYearEnd.changeYearsArray(year)
            }
        }
    }
</script>

<style lang="stylus">

</style>