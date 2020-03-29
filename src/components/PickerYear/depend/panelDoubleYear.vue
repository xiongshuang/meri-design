<template>
    <div class="p-picker-child">
        <div
                :class="['p-picker-input', 'p-picker-input-double', quickSwitch?'p-picker-input-triangle':'p-picker-input-normal']"
                @mouseover="pickerClearShow"
                @mouseleave="pickerClearHide"
        >
            <i
                    v-if="quickSwitch"
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
            <i
               v-if="quickSwitch"
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
                            >{{yearSelectedStart?yearSelectedStart:'开始日期'}}</article>
                            <article class="p-picker-input-tip-to">至</article>
                            <article
                                    :class="['p-picker-input-alert-tip', yearSelectedEnd?'p-picker-input-values':'p-picker-input-tip']"
                            >{{yearSelectedEnd?yearSelectedEnd:'结束日期'}}</article>
                        </section>
                    </div>
                    <div class="p-picker-main-item">
                        <DoubleYear
                                :yearNow="yearNow"
                                :yearActive="yearActiveStart"
                                :yearsArray="yearsStartArray"
                                @prevYear="prevYearStart"
                                @nextYear="nextYearStart"
                                @change="changeDateStart"
                                :disableYearRight="disableYearRight"
                                @yearEnter="yearEnterStart"
                        />
                        <DoubleYear
                                borderLeft="border-left"
                                :yearNow="yearNow"
                                :yearActive="yearActiveEnd"
                                :yearsArray="yearsEndArray"
                                @prevYear="prevYearEnd"
                                @nextYear="nextYearEnd"
                                @change="changeDateEnd"
                                :disableYearLeft="disableYearLeft"
                                @yearEnter="yearEnterEnd"
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
    import CountYear from '../../static/utils/datePicker/CountYear';

    import DoubleYear from './DoubleYear';
    import Button from '../../Button';

    import ClearSvg from '../../static/iconSvg/clear2.svg';
    import CalendarSvg from '../../static/iconSvg/calendar.svg';
    import TrianglePickerLeft from '../../static/iconSvg/triangle_picker_left.svg';
    import TrianglePickerRight from '../../static/iconSvg/triangle_picker_right.svg';
    export default {
        name: "panelDoubleYear",
        components: {
            DoubleYear,
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

                // 当前年
                yearNow: '',

                // 活动的年
                yearActiveStart: '',
                yearActiveEnd: '',

                // 选择的年
                yearSelectedStart: '',
                yearSelectedEnd: '',

                yearsStartArray: [], // 日列表-开始
                yearsEndArray: [], // 日列表-结束

                disableYearRight: false, // 禁用开始时间右箭头-年
                disableYearLeft: false  // 禁用结束时间左箭头-年
            }
        },
        watch: {
            date(n, o) {
                if (n === o) return;
                this.dateFormat(n);
                this.initEnd();
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
                if (str && str.replace(/[.\-]/g, '')) this.btnType='primary';
                else this.btnType='disabled';
            },
            /**
             * 日期
             * @param date String '2019-2020'
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
                const reg=/[ 年]/g;
                const activeStart=this.yearActiveStart.replace(reg, '').split('-')[1];
                const activeEnd=this.yearActiveEnd.replace(reg, '').split('-')[0];

                const nextYear=(parseInt(this.yearsStartArray[this.yearsStartArray.length-1].year)+1).toString();
                const prevYear=(parseInt(this.yearsEndArray[0].year)-1).toString();

                this.disableYearRight = nextYear >= activeEnd;
                this.disableYearLeft = prevYear <= activeStart;
            },

            /**
             * 初始化日期对象
             */
            initEnd() {
                this.countYearEnd=new CountYear(this.dateEnd); // 当前计算年的对象
                this.yearsEndArray=this.countYearEnd.getYearsArray();
                this.yearNow=this.countYearEnd.countNowYear(); // 获取当前年
                this.setDateEnd(this.dateEnd);

                // 初始化开始时间对象
                this.initStart((this.yearsEndArray[0].year-1).toString());
            },
            /**
             * 初始化日期对象
             */
            initStart(date) {
                this.countYearStart=new CountYear(date); // 当前计算年的对象
                this.yearsStartArray=this.countYearStart.getYearsArray();
                this.setDateStart(this.dateStart);

                this.disableArrow();
            },
            /**
             * 设置选择的年月日
             * @param date String 2019
             */
            setDateEnd(date) {
                this.setYearActiveEnd(this.yearsEndArray);
                this.yearSelectedEnd=date;
                if (this.date) {
                    // 设置默认选中状态
                    const yearsArray=this.yearsEndArray;
                    if (this.dateEnd-this.dateStart<=12) {
                        this.yearsEndArray=yearsArray.map(d => {
                            if (d.year===this.dateStart || d.year===this.dateEnd) d.selected='selected';
                            else if (d.year>this.dateStart && d.year<this.dateEnd) d.multiple='multiple';
                            return d;
                        })
                    } else {
                        this.yearsEndArray=yearsArray.map(d => {
                            if (d.year===this.dateEnd) d.selected='selected';
                            else if (d.year<this.dateEnd) d.multiple='multiple';
                            return d;
                        })
                    }
                } else {
                    this.changeYearsEndArray(date);
                }
            },
            /**
             * 设置选择的年月日
             * @param date String 2019
             */
            setDateStart(date) {
                this.setYearActiveStart(this.yearsStartArray);
                this.yearSelectedStart=date;
                if (this.date && this.dateEnd-this.dateStart>12) {
                    // 设置默认选中状态
                    const yearsArray=this.yearsStartArray;
                    this.yearsStartArray=yearsArray.map(d => {
                        if (d.year===this.dateStart) {
                            d.selected='selected';
                        } else if (d.year>this.dateStart) {
                            d.multiple='multiple';
                        }
                        return d;
                    })
                } else {
                    this.changeYearsStartArray(date);
                }
            },
            /**
             * 改变选中状态
             * @param year
             * @param clearOther Boolean 清空其他
             */
            changeYearsEndArray(year, clearOther) {
                this.yearsEndArray=this.yearsEndArray.map(d => {
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
             * 改变选中状态
             * @param year
             * @param clearOther Boolean 清空其他
             */
            changeYearsStartArray(year, clearOther) {
                this.yearsStartArray=this.yearsStartArray.map(d => {
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
                this.yearSelectedEnd='';
                this.$emit('change', '');
                this.pickerClearHide();
                this.changeYearsStartArray('', true);
                this.changeYearsEndArray('', true);
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
             * 设置yearActiveStart
             */
            setYearActiveStart(arr) {
                const ly=arr[0].year, ry=arr[arr.length-1].year;
                this.yearActiveStart=ly+'年'+' - '+ry+'年';
            },
            /**
             * 设置yearActiveEnd
             */
            setYearActiveEnd(arr) {
                const ly=arr[0].year, ry=arr[arr.length-1].year;
                this.yearActiveEnd=ly+'年'+' - '+ry+'年';
            },
            /**
             * 切换日期
             * @param date String '2019'
             */
            switchDateStart(date) {
                this.countYearStart=new CountYear(date); // 当前计算天的对象
                this.yearsStartArray=this.countYearStart.getYearsArray();
                this.setYearActiveStart(this.yearsStartArray);

                this.disableArrow();

                const dateS=this.yearSelectedStart;
                const dateE=this.yearSelectedEnd;

                if (dateS > dateE) {
                    this.yearsStartArray=this.yearsStartArray.map(d => {
                        if (d.year > dateE && d.year < dateS) d.multiple='multiple';
                        if (d.year === dateS || d.year === dateE) d.selected='selected';
                        return d;
                    })
                } else {
                    this.yearsStartArray=this.yearsStartArray.map(d => {
                        if (d.year > dateS && d.year < dateE) d.multiple='multiple';
                        if (d.year === dateS || d.year === dateE) d.selected='selected';
                        return d;
                    })
                }
            },
            /**
             * 切换日期
             * @param date String '2019'
             */
            switchDateEnd(date) {
                this.countYearEnd=new CountYear(date); // 当前计算天的对象
                this.yearsEndArray=this.countYearEnd.getYearsArray();
                this.setYearActiveEnd(this.yearsEndArray);

                this.disableArrow();

                const dateS=this.yearSelectedStart;
                const dateE=this.yearSelectedEnd;
                if (dateS > dateE) {
                    this.yearsEndArray=this.yearsEndArray.map(d => {
                        if (d.year > dateE && d.year < dateS) d.multiple='multiple';
                        if (d.year === dateS || d.year === dateE) d.selected='selected';
                        return d;
                    })
                } else {
                    this.yearsEndArray=this.yearsEndArray.map(d => {
                        if (d.year > dateS && d.year < dateE) d.multiple='multiple';
                        if (d.year === dateS || d.year === dateE) d.selected='selected';
                        return d;
                    })
                }
            },
            /**
             * 上一组年
             */
            prevYearStart() {
                const date=(this.yearsStartArray.shift().year-1).toString();
                this.switchDateStart(date);
            },
            /**
             * 上一组年
             */
            prevYearEnd() {
                const date=(this.yearsEndArray.shift().year-1).toString();
                this.switchDateEnd(date);
            },
            /**
             * 下一组年
             */
            nextYearStart() {
                const date=(parseInt(this.yearsStartArray.pop().year)+12).toString();
                this.switchDateStart(date);
            },
            /**
             * 下一组年
             */
            nextYearEnd() {
                const date=(parseInt(this.yearsEndArray.pop().year)+12).toString();
                this.switchDateEnd(date);
            },
            /**
             * 点击日期-开始日期
             * @param year
             */
            changeDateStart(year) {
                let clearOther=false;
                if (this.yearSelectedStart && this.yearSelectedEnd) {
                    this.yearSelectedStart=year;

                    this.yearSelectedEnd='';
                    clearOther=true;

                    this.changeYearsEndArray('', clearOther);
                } else if (this.yearSelectedStart && !this.yearSelectedEnd) {
                    this.yearSelectedEnd=year;
                } else {
                    this.yearSelectedStart=year;
                }

                if (this.yearSelectedStart && this.yearSelectedEnd) this.btnType='primary';
                else this.btnType='disabled';

                this.changeYearsStartArray(year, clearOther);
            },
            /**
             * 点击日期-结束日期
             * @param year
             */
            changeDateEnd(year) {
                let clearOther=false;
                if (this.yearSelectedStart && this.yearSelectedEnd) {
                    this.yearSelectedEnd=year;

                    this.yearSelectedStart='';
                    clearOther=true;

                    this.changeYearsStartArray('', clearOther);
                } else if (!this.yearSelectedStart && this.yearSelectedEnd) {
                    this.yearSelectedStart=year;
                } else {
                    this.yearSelectedEnd=year;
                }

                if (this.yearSelectedStart && this.yearSelectedEnd) this.btnType='primary';
                else this.btnType='disabled';

                this.changeYearsEndArray(year, clearOther);
            },
            /**
             * 鼠标进入-开始日期
             * @param year
             */
            yearEnterStart(year) {
                if ((!this.yearSelectedStart && !this.yearSelectedEnd) || (this.yearSelectedStart && this.yearSelectedEnd)) return;
                const yearsArray=this.yearsStartArray;
                const dateS=this.yearSelectedStart;
                const dateE=this.yearSelectedEnd;
                const dateN=year;

                // 当前传入时间的索引
                const nInd=yearsArray.findIndex(d => d.year===year);
                // 以选择的时间的索引
                const sInd=yearsArray.findIndex(d => d.year===this.yearSelectedStart);

                /* 修改开始右侧结束时间面板multiple -s */
                if (dateE) {
                    const yearsEndArray=this.yearsEndArray;
                    if (dateN > dateE) { // 选中的左侧面板开始时间大于当前鼠标hover的时间
                        this.yearsEndArray=yearsEndArray.map(d => {
                            if (d.year < dateN && d.year > dateE) d.multiple='multiple';
                            else d.multiple='';
                            return d;
                        })
                    } else {
                        this.yearsEndArray=yearsEndArray.map(d => {
                            if (d.year > dateN && d.year < dateE) d.multiple='multiple';
                            else d.multiple='';
                            return d;
                        })
                    }
                } else {
                    this.yearsEndArray=this.yearsEndArray.map(d => {
                        d.multiple='';
                        return d;
                    })
                }
                /* 修改开始右侧结束时间面板multiple -e */

                // 修改当前鼠标hover状态
                if (dateS) { // 已选择开始时间
                    if (sInd === -1) { // 不在当前面板
                        if (dateN < dateS) {
                            this.yearsStartArray=yearsArray.map(d => {
                                if (d.year >= dateN) d.multiple='multiple';
                                else d.multiple='';
                                return d;
                            })
                        } else {
                            this.yearsStartArray=yearsArray.map(d => {
                                if (d.year <= dateN) d.multiple='multiple';
                                else d.multiple='';
                                return d;
                            })
                        }
                    } else { // 在当前面板
                        if (nInd > sInd) {
                            this.yearsStartArray=yearsArray.map(d => {
                                if (d.year <= dateN && d.year > dateS) d.multiple='multiple';
                                else d.multiple='';
                                return d;
                            })
                        } else {
                            this.yearsStartArray=yearsArray.map(d => {
                                if (d.year >= dateN && d.year < dateS) d.multiple='multiple';
                                else d.multiple='';
                                return d;
                            })
                        }
                    }
                } else { // 未选择开始时间
                    this.yearsStartArray=yearsArray.map(d => {
                        if (d.year >= dateN) d.multiple='multiple';
                        else d.multiple='';
                        return d;
                    })
                }
            },
            /**
             * 鼠标进入-结束日期
             * @param year
             */
            yearEnterEnd(year) {
                if ((!this.yearSelectedStart && !this.yearSelectedEnd) || (this.yearSelectedStart && this.yearSelectedEnd)) return;
                const yearsArray=this.yearsEndArray;
                const dateS=this.yearSelectedStart;
                const dateE=this.yearSelectedEnd;
                const dateN=year;

                // 当前传入时间的索引
                const nInd=yearsArray.findIndex(d => d.year===year);
                // 以选择的时间的索引
                const sInd=yearsArray.findIndex(d => d.year===this.yearSelectedEnd);

                /* 修改左侧开始时间面板multiple -s */
                if (dateS) {
                    const yearsStartArray=this.yearsStartArray;
                    if (dateN > dateS) { // 选中的左侧面板开始时间大于当前鼠标hover的时间
                        this.yearsStartArray=yearsStartArray.map(d => {
                            if (d.year < dateN && d.year > dateS) d.multiple='multiple';
                            else d.multiple='';
                            return d;
                        })
                    } else {
                        this.yearsStartArray=yearsStartArray.map(d => {
                            if (d.year > dateN && d.year < dateS) d.multiple='multiple';
                            else d.multiple='';
                            return d;
                        })
                    }
                } else {
                    this.yearsStartArray=this.yearsStartArray.map(d => {
                        d.multiple='';
                        return d;
                    })
                }
                /* 修改开始左侧开始时间面板multiple -e */

                // 修改当前鼠标hover状态
                if (sInd === -1) { // 不在当前面板
                    if (dateN < dateE) {
                        this.yearsEndArray=yearsArray.map(d => {
                            if (d.year >= dateN) d.multiple='multiple';
                            else d.multiple='';
                            return d;
                        })
                    } else {
                        this.yearsEndArray=yearsArray.map(d => {
                            if (d.year <= dateN) d.multiple='multiple';
                            else d.multiple='';
                            return d;
                        })
                    }
                } else { // 在当前面板
                    if (nInd > sInd) {
                        this.yearsEndArray=yearsArray.map(d => {
                            if (d.year <= dateN && d.year > dateE) d.multiple='multiple';
                            else d.multiple='';
                            return d;
                        })
                    } else {
                        this.yearsEndArray=yearsArray.map(d => {
                            if (d.year >= dateN && d.year < dateE) d.multiple='multiple';
                            else d.multiple='';
                            return d;
                        })
                    }
                }
            },
            // 快速选择-设置时间 flag可选值【left，right】
            quickSort(flag) {
                if (!this.selectedDate) return;
                const yss=Number(this.yearSelectedStart), yse=Number(this.yearSelectedEnd);
                const diff=yse-yss;
                const sds=((flag==='left'?yss-1-diff:yse+1)).toString(), sde=((flag==='left'?yss-1:yse+1+diff)).toString();
                this.yearSelectedStart=sds;
                this.yearSelectedEnd=sde;
                this.dateStart=sds;
                this.dateEnd=sde;
                const selectedDate=sds+'-'+sde;
                this.selectedDate=selectedDate;

                this.initEnd();
                this.$emit('change', selectedDate);
            },
            /**
             * 确定
             */
            pickerConfirm() {
                const dateS=this.yearSelectedStart;
                const dateE=this.yearSelectedEnd;
                this.dateStart=dateS;
                this.dateEnd=dateE;
                const selectedDate=dateS>dateE?(dateE+'-'+dateS):(dateS+'-'+dateE);
                this.selectedDate=selectedDate;
                /**
                 * 返回选择的时分秒
                 * @type Function
                 */
                this.$emit('change', selectedDate);
                this.blurStatus=false;
                this.pickerBoxStatus=false;
            }
        }
    }
</script>