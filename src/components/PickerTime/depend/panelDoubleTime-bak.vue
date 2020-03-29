<template>
    <div class="p-picker-child">
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
        <transition name="opacityTop">
            <!--
            -->
            <div
                    class="p-picker-main"
                    ref="pickerMain"
                    tabindex="-1"
                    v-if="pickerBoxStatus"
                    @mouseenter="pickerMainBlur"
                    @mouseleave="pickerMainFocus"
                    @blur="pickerBoxHide"
            >
                <div class="p-picker-main-item-box">
                    <div class="p-picker-main-item-input-box">
                        <section class="p-picker-input-alert">
                            <article
                                    :class="['p-picker-input-alert-tip', timeStart?'p-picker-input-values':'p-picker-input-tip']"
                            >{{timeStart?timeStart:'开始时间'}}</article>
                            <article class="p-picker-input-tip-to">至</article>
                            <article
                                    :class="['p-picker-input-alert-tip', timeEnd?'p-picker-input-values':'p-picker-input-tip']"
                            >{{timeEnd?timeEnd:'结束时间'}}</article>
                        </section>
                    </div>
                    <div class="p-picker-main-item">
                        <TimeSelect
                                :time="timeStart"
                                :format="format"
                                @change="changeStart"
                        />
                        <TimeSelect
                                borderLeft="border-left"
                                :time="timeEnd"
                                :format="format"
                                @change="changeEnd"
                        />
                    </div>
                </div>

                <div class="p-picker-main-handle">
                    <Button :type="(timeStart&&timeEnd)?'primary':'disabled'" size="small" @click="pickerConfirm">确定</Button>
                </div>
            </div>
        </transition>
    </div>
</template>

<script>
    import TimeSelect from './time';

    import ClearSvg from '../../static/iconSvg/clear2.svg';
    import CalendarSvg from '../../static/iconSvg/calendar.svg';

    export default {
        name: "panelDoubleTime",
        components: {
            TimeSelect,
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
                blurStatus: false, // 是否可执行blur
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
            }
        },
        created() {
            this.setTime(this.time);
        },
        methods: {
            pickerMainBlur() {
                this.$nextTick(() => {
                    this.blurStatus=false;
                    if (this.$refs.pickerMain) this.$refs.pickerMain.blur()
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
                this.$emit('change', '');
                this.pickerClearHide();
            },
            // 点击结束时间
            changeStart(time) {
                this.timeStart=time;
            },
            // 点击结束时间
            changeEnd(time) {
                this.timeEnd=time;
            },
            /**
             * 确定
             */
            pickerConfirm() {
                const selectedTime=this.timeStart+'-'+this.timeEnd;
                this.selectedTime=selectedTime;
                /**
                 * 返回选择的时分秒
                 * @type Function
                 */
                this.$emit('change', selectedTime);
                this.blurStatus=false;
                this.pickerBoxStatus=false;
            }
        }
    }
</script>
