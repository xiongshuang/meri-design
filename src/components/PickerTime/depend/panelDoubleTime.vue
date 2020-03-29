<template>
    <div class="p-picker-child" ref="pickerDoubleTime">
        <div
                class="p-picker-input p-picker-input-double p-picker-input-normal"
                @click="pickerBoxShow"
                @mouseenter="pickerClearShow"
                @mouseleave="pickerClearHide"
        >
            <section
                    :class="['p-picker-input-double-tip', selectedTime?'p-picker-input-values':'p-picker-input-tip']"
            >
                <article class="p-picker-input-tip-values">{{timeStart?timeStart:'开始时间'}}</article>
                <article class="p-picker-input-tip-to">至</article>
                <article class="p-picker-input-tip-values">{{timeEnd?timeEnd:'结束时间'}}</article>
            </section>
            <section class="p-picker-svg-box">
                <ClearSvg class="p-picker-clear-svg" v-if="clearStatus" @click.stop="clearTime" />
                <CalendarSvg v-else />
            </section>
        </div>
    </div>
</template>

<script>
    import DoubleTime from "./doubleTime/index";

    import ClearSvg from '../../static/iconSvg/clear2.svg';
    import CalendarSvg from '../../static/iconSvg/calendar.svg';

    export default {
        name: "panelDoubleTime",
        components: {
            ClearSvg,
            CalendarSvg
        },
        props: {
            /**
             * 设置时间
             */
            time: {
                type: String,
                default: ''
            },
            /**
             * 时间格式
             * @value 可选值 【hms-时分秒（默认值），hm-时分】
             */
            format: {
                type: String,
                default: 'hms'
            }
        },
        data() {
            return {
                pickerBoxStatus: false, // 显示选择时间框
                clearStatus: false, // 关闭按钮
                selectedTime: '', // 选中的时间
                timeStart: '',
                timeEnd: ''
            }
        },
        watch: {
            time(n, o) {
                if (n === o) return;
                this.setTime(n);
                if (this.doubleTime) {
                    this.doubleTime.selectedTime=n;
                }
            }
        },
        created() {
            this.setTime(this.time);
        },
        mounted() {
            window.addEventListener('mousewheel', this.listenScroll, false)
        },
        methods: {
            /**
             * 打开时间选择盒子
             */
            pickerBoxShow() {
                if (this.doubleTime) {
                    this.setPickerBoxStatus(true);
                    DoubleTime.resetPosition(this.doubleTime);
                } else {
                    this.doubleTime=DoubleTime({
                        tag: this.$refs.pickerDoubleTime,
                        props: {
                            time: this.time,
                            format: this.format
                        },
                        param: {
                            parent: this
                        }
                    }).$on('change', ([selectedTime, timeStart, timeEnd]) => {
                        this.selectedTime=selectedTime;
                        this.timeStart=timeStart;
                        this.timeEnd=timeEnd;
                        this.$emit('change', selectedTime);
                    });

                    this.doubleTime.$nextTick(() => {
                        this.setPickerBoxStatus(true);
                    });
                }
            },
            /**
             * 关闭时间选择盒子
             */

            setPickerBoxStatus(status) {
                this.pickerBoxStatus=status;
                if (this.doubleTime) this.doubleTime.pickerBoxStatus=status;
            },
            /**
             * 设置时间
             */
            setTime(time) {
                this.selectedTime=time;
                if (time && time.includes('-')) {
                    const [s, e]=time.split('-');
                    this.timeStart=s;
                    this.timeEnd=e;
                }
            },
            /**
             * 显示清除按钮
             */
            pickerClearShow() {
                if (this.selectedTime) this.clearStatus=true;
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
                this.selectedTime='';
                this.timeStart='';
                this.timeEnd='';

                if (this.doubleTime) {
                    this.doubleTime.clearTime();
                } else {
                    this.$emit('change', '');
                }
                this.pickerClearHide();
            },
            // 监听页面滚动
            listenScroll() {
                this.setPickerBoxStatus(false);
            }
        },
        beforeDestroy() {
            if (this.doubleTime) DoubleTime.remove(this.doubleTime);
            window.removeEventListener('mousewheel', this.listenScroll)
        }
    }
</script>
