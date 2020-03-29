<template>
    <div class="p-picker">
        <DoubleTime
                v-if="range"
                :time="time"
                :format="format"
                @change="changeDouble"
        />
        <SingleTime
                v-else
                :time="time"
                :format="format"
                @change="changeSingle"
        />
    </div>
</template>

<script>
    import SingleTime from './depend/panelSingleTime';
    import DoubleTime from './depend/panelDoubleTime';

    export default {
        name: "PickerTime",
        components: {
            SingleTime,
            DoubleTime
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
            },
            /**
             * 时间段
             * @value 【false-时间点（默认值），true-时间段】
             */
            range: {
                type: Boolean,
                default: false
            }
        },
        methods: {
            /**
             * 点击日期
             * @param date String
             */
            changeSingle(date) {
                this.$emit('change', date)
            },
            /**
             * 点击日期
             * @param date String
             */
            changeDouble(date) {
                this.$emit('change', date)
            }
        }
    }
</script>

<style lang="stylus">
@import "../static/stylus/datePicker/pickerMain.styl"
@import "../static/stylus/datePicker/pickerInput.styl"
@import "../static/stylus/animate/selectDownUpExtend.styl"

</style>
