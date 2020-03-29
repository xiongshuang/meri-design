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
                            ref="timeSelectStart"
                            :time="timeStart"
                            :format="format"
                            @change="changeStart"
                    />
                    <TimeSelect
                            borderLeft="border-left"
                            ref="timeSelectEnd"
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
</template>

<script>
    import TimeSelect from '../time';

    import ClearSvg from '../../../static/iconSvg/clear2.svg';
    import CalendarSvg from '../../../static/iconSvg/calendar.svg';

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
                position: true,
                parent: null,
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
            },
            pickerBoxStatus(n) {
                if (n) {
                    this.$refs.timeSelectStart.setTimeDom();
                    this.$refs.timeSelectEnd.setTimeDom();
                }
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
                if (this.pickerBoxStatus && this.blurStatus) {
                    this.pickerBoxStatus=false;
                    this.parent.pickerBoxStatus=false;
                }
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
             * 清除时间
             */
            clearTime() {
                this.selectedTime='';
                this.timeStart='';
                this.timeEnd='';
                this.$emit('change', ['', '', '']);
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
                this.$emit('change', [selectedTime, this.timeStart, this.timeEnd]);
                this.blurStatus=false;
                this.pickerBoxStatus=false;
            }
        }
    }
</script>
