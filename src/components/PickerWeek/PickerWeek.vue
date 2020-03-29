<template>
    <div class="p-picker">
        <PanelDoubleWeek
                v-if="range"
                :date="date"
                :sort="sort"
                :quickSwitch="quickSwitch"
                @change="changeDouble"
        />
        <PanelSingleWeek
                v-else
                :date="date"
                :sort="sort"
                :quickSwitch="quickSwitch"
                @change="changeSingle"
        />
    </div>
</template>

<script>
    import PanelSingleWeek from './depend/panelSingleWeek';
    import PanelDoubleWeek from './depend/panelDoubleWeek';
    export default {
        name: "PickerWeek",
        components: {
            PanelSingleWeek,
            PanelDoubleWeek
        },
        props: {
            /**
             * 设置时间
             */
            date: {
                type: String,
                default: ''
            },
            /**
             * 排序规则
             * 可选值【year-按照年排序（默认），month-按照月排序】
             */
            sort: {
                type: String,
                default: 'year'
            },
            /**
             * 时间段
             * @value 【false-时间点（默认值），true-时间段】
             */
            range: {
                type: Boolean,
                default: false
            },
            // 快速切换时间
            quickSwitch: {
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
    @import "../static/stylus/datePicker/pickerInput.styl"
    @import "../static/stylus/datePicker/pickerMain.styl"

</style>