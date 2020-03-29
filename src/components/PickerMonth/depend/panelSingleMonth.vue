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
            <i v-if="quickSwitch"
               :class="['p-picker-triangle', 'p-picker-triangle-left', !selectedDate&&'p-picker-triangle-disabled']"
               @click="quickSort('left')"
            ><TrianglePickerLeft /></i>
            <section
                    :class="['p-picker-input-tip-single', selectedDate?'p-picker-input-values':'p-picker-input-tip']"
                    @click="pickerBoxShow"
            >{{selectedDate?selectedDate:'选择日期'}}</section>
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
                                    :class="[yearSelected?'p-picker-input-values':'p-picker-input-tip']"
                            >{{yearSelected?(yearSelected+'.'+monthSelected):'选择日期'}}</article>
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
                                v-show="!panelYear"
                                :date="date"
                                @change="changeDate"
                                @panelYearHandle="panelYearHandle"
                                @changeYearsArrayHandle="changeYearsArrayHandle"
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
    import SingleMonth from './singleMonth';
    import Button from '../../Button';

    import ClearSvg from '../../static/iconSvg/clear2.svg';
    import CalendarSvg from '../../static/iconSvg/calendar.svg';
    import TrianglePickerLeft from '../../static/iconSvg/triangle_picker_left.svg';
    import TrianglePickerRight from '../../static/iconSvg/triangle_picker_right.svg';
    export default {
        name: "panelSingleMonth",
        components: {
            SingleYear,
            SingleMonth,
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

                yearSelected: '', // 选择的年
                monthSelected: '', // 选择的年
                panelYear: false // 显示年面板
            }
        },
        watch: {
            date(n, o) {
                if (n === o) return;
                this.dateFormat(n);
            },
            pickerBoxStatus(n) {
                if (n) return;
                this.panelYearHandle(false);
            }
        },
        created() {
            // 初始化日期对象
            this.dateFormat(this.date);
        },
        methods: {
            dateFormat(date) {
                this.selectedDate=date;
                if (date && date.includes('.')) {
                    const [year, month]=date.split('.');
                    this.yearSelected=year;
                    this.monthSelected=month;
                }
                this.changeBtnType(date);
            },
            /**
             * 改变按钮状态
             */
            changeBtnType(str) {
                if (str && str.replace(/\./, '')) this.btnType='primary';
                else this.btnType='disabled';
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
                this.yearSelected='';
                this.monthSelected='';
                this.$emit('change', '');
                this.pickerClearHide();
                this.changeYearsArrayHandle('');
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
             * 点击月
             * @param year
             * @param month
             */
            changeDate({year, month}) {
                this.yearSelected=year;
                this.monthSelected=month;
                this.btnType='primary';
            },
            // 快速选择-设置时间 flag可选值【left，right】
            quickSort(flag) {
                if (!this.selectedDate) return;
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
                this.yearSelected=Y;
                this.monthSelected=M;
                this.selectedDate=selectedDate;
                const singleMonth=this.$refs.singleMonth;
                const ma=singleMonth.monthsArray;
                if (!ma.some(d => d.year === Y && d.month === M)) singleMonth.init(selectedDate);
                this.$emit('change', selectedDate);
            },
            /**
             * 确定
             */
            pickerConfirm() {
                const selectedDate=this.yearSelected+'.'+this.monthSelected;
                this.selectedDate=selectedDate;
                this.blurStatus=false;
                this.pickerBoxStatus=false;
                /**
                 * 返回选择的时分秒
                 * @type Function
                 */
                this.$emit('change', selectedDate);
            },

            // 年面板显示切换
            panelYearHandle(status) {
                this.panelYear=status
            },
            // 点击年
            panelYearChangeDate(year) {
                this.panelYearHandle(false);
                this.$refs.singleMonth.switchDate(year)
            },
            // 月面板的yearActive改变，改变年面板的year选中项
            changeYearsArrayHandle(year) {
                this.$refs.singleYear.changeYearsArray(year)
            }
        }
    }
</script>

<style lang="stylus">

</style>