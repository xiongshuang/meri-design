<template>
    <div class="p-picker-child" ref="pickerSingleTime">
        <div
                class="p-picker-input p-picker-input-trigger p-picker-input-single p-picker-input-normal"
                @mouseenter="pickerClearShow"
                @mouseleave="pickerClearHide"
        >
            <section
                    :class="['p-picker-input-tip-single', selectedTime?'p-picker-input-values':'p-picker-input-tip']"
                    @click="pickerBoxShow"
            >{{selectedTime?selectedTime:'选择时间'}}</section>
            <section class="p-picker-svg-box">
                <ClearSvg class="p-picker-clear-svg" v-if="clearStatus" @click.stop="clearTime" />
                <CalendarSvg v-else />
            </section>
        </div>
    </div>
</template>

<script>
    import SingleTime from './singleTime/index';

    import ClearSvg from '../../static/iconSvg/clear2.svg';
    import CalendarSvg from '../../static/iconSvg/calendar.svg';
    export default {
        name: "panelSingleTime",
        components: { ClearSvg, CalendarSvg },
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
                selectedTime: '' // 选中的时间
            }
        },
        watch: {
            time(n ,o) {
                if (n === o) return;
                this.selectedTime=n;
                if (this.singleTime) {
                    this.singleTime.selectedTime=n;
                }
            }
        },
        created() {
            this.selectedTime=this.time;
        },
        mounted() {
            window.addEventListener('mousewheel', this.listenScroll, false)
        },
        methods: {
            /**
             * 打开时间选择盒子
             */
            pickerBoxShow() {
                if (this.singleTime) {
                    this.setPickerBoxStatus(true);
                    SingleTime.resetPosition(this.singleTime);
                } else {
                    this.singleTime=SingleTime({
                        tag: this.$refs.pickerSingleTime,
                        props: {
                            time: this.time,
                            format: this.format
                        },
                        param: {
                            parent: this
                        }
                    }).$on('change', (selectedTime) => {
                        this.selectedTime=selectedTime;
                        this.$emit('change', selectedTime);
                    });

                    this.singleTime.$nextTick(() => {
                        this.setPickerBoxStatus(true);
                    });
                }
            },
            /**
             * 关闭时间选择盒子
             */
            setPickerBoxStatus(status) {
                this.pickerBoxStatus=status;
                if (this.singleTime) this.singleTime.pickerBoxStatus=status;
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
                if (this.singleTime) {
                    this.singleTime.clearTime();
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
            if (this.singleTime) SingleTime.remove(this.singleTime);
            window.removeEventListener('mousewheel', this.listenScroll)
        }
    }
</script>
