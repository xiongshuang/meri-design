<template>
    <div class="p-picker">
        <SingleDay
                v-if="tabKey==='day'"
                ref="singleDay"
                :picker="true"
                :date="date"
                :format="format"
                :quickSwitch="quickSwitch"
                :tabKey="tabKey"
                @change="changeSingle"
                @tabChange="tabChange"
        />
        <SingleWeek
                v-else-if="tabKey==='week'"
                ref="singleWeek"
                :date="date"
                :sort="sort"
                :quickSwitch="quickSwitch"
                @change="changeSingle"
        />
        <SingleMonth
                v-else-if="tabKey==='month'"
                ref="singleMonth"
                :date="date"
                :quickSwitch="quickSwitch"
                @change="changeSingle"
        />
        <SingleYear
                v-else
                ref="singleYear"
                :date="date"
                :quickSwitch="quickSwitch"
                @change="changeSingle"
        />
    </div>
</template>

<script>
    import SingleDay from '../../PickerDay/depend/panelSingleDay';
    import SingleWeek from '../../PickerWeek/depend/panelSingleWeek';
    import SingleMonth from '../../PickerMonth/depend/panelSingleMonth';
    import SingleYear from '../../PickerYear/depend/panelSingleYear';

    export default {
        name: "SingleDate",
        components: { SingleDay, SingleWeek, SingleMonth, SingleYear },
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
            // 快速切换时间
            quickSwitch: {
                type: Boolean,
                default: false
            },
            /**
             * 排序规则
             * 可选值【year-按照年排序（默认），month-按照月排序】
             */
            sort: {
                type: String,
                default: 'year'
            },
        },
        data() {
            return {
                tabKey: 'day' // 日周月年的tab
            }
        },
        watch: {
            tabKey(n) {
                this.$nextTick(() => {
                    switch (n) {
                        case 'day':
                            this.$refs.singleDay.pickerBoxStatus=true;
                            break;
                        case 'week':
                            this.$refs.singleWeek.pickerBoxStatus=true;
                            break;
                        case 'month':
                            this.$refs.singleMonth.pickerBoxStatus=true;
                            break;
                        case 'year':
                            this.$refs.singleYear.pickerBoxStatus=true;
                            break;
                        default:
                            break;
                    }
                })
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
            // 日周月年切换
            tabChange(key) {
                console.log('日周月年切换:::', key);
                this.tabKey=key;
            }
        }
    }
</script>