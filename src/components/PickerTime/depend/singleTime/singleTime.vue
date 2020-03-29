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
                                :class="[selectedTime?'p-picker-input-values':'p-picker-input-tip']"
                        >{{selectedTime?selectedTime:'选择时间'}}</article>
                    </section>
                </div>
                <div class="p-picker-main-item">
                    <TimeSelect
                            ref="timeSelect"
                            :time="time"
                            :format="format"
                            @change="timeChange"
                    />
                </div>
            </div>

            <div class="p-picker-main-handle">
                <Button :type="selectedTime?'primary':'disabled'" size="small" @click="pickerConfirm">确定</Button>
            </div>
        </div>
    </transition>
</template>

<script>
    import TimeSelect from '../time';
    import ClearSvg from '../../../static/iconSvg/clear2.svg';
    import CalendarSvg from '../../../static/iconSvg/calendar.svg';

    export default {
        name: "singleTime",
        components: { TimeSelect, ClearSvg, CalendarSvg },
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
                selectedTime: '' // 选中的时间
            }
        },
        watch: {
            time(n ,o) {
                if (n === o) return;
                this.selectedTime=n;
            },
            pickerBoxStatus(n) {
                if (n) {
                    this.$refs.timeSelect.setTimeDom();
                }
            }
        },
        created() {
            this.selectedTime=this.time;
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
                    if (this.$refs.pickerMain) this.$refs.pickerMain.focus();
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
             * 清除时间
             */
            clearTime() {
                this.selectedTime='';
                this.$emit('change', '');
            },
            // 选中的时间
            timeChange(time) {
                this.selectedTime=time;
            },
            /**
             * 确定
             */
            pickerConfirm() {
                /**
                 * 返回选择的时分秒
                 * @type Function
                 */
                this.$emit('change', this.selectedTime);
                this.blurStatus=false;
                this.pickerBoxStatus=false;
            }
        }
    }
</script>
