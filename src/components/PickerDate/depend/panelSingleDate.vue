<template>
    <div class="p-picker-child" ref="pPickerChild">
        <div
                :class="[
                    'p-picker-input', 'p-picker-input-trigger', 'p-picker-input-single',
                    quickSwitch?'p-picker-input-triangle':'p-picker-input-normal'
                ]"
                @mouseenter="pickerClearShow"
                @mouseleave="pickerClearHide"
                @click="pickerBoxShow"
        >
            <i
                    v-if="quickSwitch"
                    :class="['p-picker-triangle', 'p-picker-triangle-left', (!selectedDate || disableQuickSortLeft)&&'p-picker-triangle-disabled']"
                    @click.stop="quickSort('left')"
            ><TrianglePickerLeft /></i>
            <section
                    :class="['p-picker-input-tip-single', selectedDate?'p-picker-input-values':'p-picker-input-tip', 'p-picker-ellipsis']"
                    @mouseover="pickerEllipsis"
            >{{(tabKey==='week'&&thTextSelected)?thTextSelected:(selectedDate?selectedDate:'选择日期')}}</section>
            <section v-if="!quickSwitch" :class="['p-picker-svg-box', (selectedDate&&format==='hms')&&'p-picker-left-box-shadow']">
                <ClearSvg class="p-picker-clear-svg" v-if="clearStatus" @click.stop="clearTime" />
                <CalendarSvg v-else />
            </section>
            <i v-if="quickSwitch"
               :class="[
                   'p-picker-triangle', 'p-picker-triangle-right',
                    (selectedDate&&format==='hms'&&tabKey==='day')&&'p-picker-left-box-shadow',
                    (!selectedDate || disableQuickSortRight)&&'p-picker-triangle-disabled'
               ]"
               @click.stop="quickSort('right')"
            ><TrianglePickerRight /></i>
        </div>
    </div>
</template>

<script>
    import SingleDrop from './singleDrop';
    import CountWeek from '../../static/utils/datePicker/CountWeek';

    import ClearSvg from '../../static/iconSvg/clear2.svg';
    import CalendarSvg from '../../static/iconSvg/calendar.svg';
    import TrianglePickerLeft from '../../static/iconSvg/triangle_picker_left.svg';
    import TrianglePickerRight from '../../static/iconSvg/triangle_picker_right.svg';
    import CountBeforeOrAfterDay from '../../static/utils/datePicker/CountBeforeOrAfterDay';

    export default {
        name: "panelSingleDate",
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

                thTextSelected: '', // 选择的第几周 String

                disableQuickSortLeft: false, // 禁用左箭头
                disableQuickSortRight: false, // 禁用右箭头

                tabKey: 'day'
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
                if (!this.format) return;
                const target=e.target;
                const {clientWidth, scrollWidth}=target;
                if (scrollWidth > clientWidth) target.title=target.innerText;
            },
            // 格式化时间
            formatSelectDate(date) {
                this.selectedDate=date;
                if (date && this.quickSwitch) this.setDisableQuickSort(date);
                let time='', yearMonthDay='';
                let DATE=date;
                if (date && this.picker === 'week') {
                    if (date.includes(':')) {
                        const [de, t]=date.split(/\s+/);
                        DATE=de;
                        time=t;
                    }
                    const [Y, M, D]=DATE.split('.');
                    yearMonthDay=Y+'.'+M+'.'+D;

                    const countWeek=new CountWeek({date: yearMonthDay, sort: this.sort});
                    const weeksArray=countWeek.getWeeksArray();

                    this.setWeek(weeksArray, Y, M, D);
                }
            },
            // 初始化日期对象-周条件下
            setWeek(weeksArray, Y, M, D) {
                const obj=weeksArray.find(d => (d.year===Y&&d.month===M)&&d.weeks.some(d2 => d2.year===Y&&d2.month===M&&d2.day===D));

                let weeks=[], thText='';
                if (obj && obj.hasOwnProperty('weeks')) {
                    const {weeks: W, thText: T}=obj;
                    weeks=W;
                    thText=T;
                } else {
                    // 计算当前选中的周是多少
                    const Y=this.yearSelected, M=this.monthSelected, D=this.daySelected;
                    const countWeek=new CountWeek({date: Y+'.'+M+'.'+D, sort: this.sort});
                    const weeksArray=countWeek.getWeeksArray();
                    const obj=weeksArray.find(d => d.flag==='n'&&d.weeks.some(d2 => d2.year===Y&&d2.month===M&&d2.day===D));
                    if (obj && obj.hasOwnProperty('weeks')) {
                        const {weeks: W, thText: T}=obj;
                        weeks=W;
                        thText=T;
                    }
                }

                if (!weeks || !weeks.length) return;
                this.thTextSelected=thText;
            },
            // 显示清除按钮
            pickerClearShow() {
                if (this.selectedDate) this.clearStatus=true;
            },
            // 隐藏清除按钮
            pickerClearHide() {
                this.clearStatus=false;
            },
            // 清除时间
            clearTime() {
                this.selectedDate='';
                this.thTextSelected='';

                if (this.singleDrop) {
                    this.singleDrop.clearTime();
                } else {
                    this.$emit('change', '');
                }
                this.pickerClearHide();
            },

            // 初始化日期选择box
            initPicker() {
                this.singleDrop=SingleDrop({
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
                    const [selectedDate, thTextSelected]=obj;
                    this.selectedDate=selectedDate;
                    this.thTextSelected=thTextSelected;
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
                    let Y, M, D, YE, ME, DE;
                    if (date.includes('-')) {
                        // 周情况下
                        const [S, E]=date.split('-'), [y, m, d]=S.split('.'), [ye, me, de]=E.split('.');
                        Y=y;M=m;D=d;
                        YE=ye;ME=me;DE=de;
                    } else {
                        const [y, m, d]=date.split('.');
                        Y=y;M=m;D=d;
                    }

                    const [s, e]=scope.split('-');
                    const [yl, ml, dl]=s.split('.');
                    const [yr, mr, dr]=e.split('.');

                    switch (this.tabKey) {
                        case 'day': {
                            this.disableQuickSortLeft = Y + M + D <= yl + ml + dl;
                            this.disableQuickSortRight = Y + M + D >= yr + mr + dr;
                            break;
                        }
                        case 'week': {
                            const [y1, m1, d1]=CountBeforeOrAfterDay(yl, ml, dl, 7);
                            const [y2, m2, d2]=CountBeforeOrAfterDay(yr, mr, dr, -7);
                            this.disableQuickSortLeft = Y + M + D <= y1 + m1 + d1;
                            this.disableQuickSortRight = YE + ME + DE >= y2 + m2 + d2;
                            break;
                        }
                        case 'month': {
                            this.disableQuickSortLeft = Y + M <= yl + ml;
                            this.disableQuickSortRight = Y + M >= yr + mr;
                            break;
                        }
                        case 'year': {
                            this.disableQuickSortLeft = Y <= yl;
                            this.disableQuickSortRight = Y >= yr;
                            break;
                        }
                        default: break;
                    }
                }
            },
            // 打开时间选择盒子
            pickerBoxShow() {
                if (this.singleDrop) {
                    if (this.pickerBoxStatus) {
                        this.setPickerBoxStatus(false);
                        return;
                    }
                    this.setPickerBoxStatus(true);
                    SingleDrop.resetPosition(this.singleDrop);
                } else {
                    this.initPicker();

                    this.singleDrop.$nextTick(() => {
                        this.setPickerBoxStatus(true)
                    });
                }
            },
            // 设置下拉状态
            setPickerBoxStatus(status) {
                this.pickerBoxStatus=status;
                if (this.singleDrop) this.singleDrop.pickerBoxStatus=status;
            },
            // 快速切换
            quickSort(flag) {
                if (!this.selectedDate) return;
                if (!this.singleDrop) this.initPicker();
                if (flag==='left' && this.disableQuickSortLeft) return;
                if (flag==='right' && this.disableQuickSortRight) return;
                this.singleDrop.quickSort(flag);
            },
            // 监听页面滚动
            listenScroll() {
                this.setPickerBoxStatus(false);
            }
        },
        beforeDestroy() {
            // 销毁实例
            if (this.singleDrop) SingleDrop.remove(this.singleDrop);
            window.removeEventListener('mousewheel', this.listenScroll)
        }
    }
</script>
