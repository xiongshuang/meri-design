### PickerDate 日期选择

<template>
    <div class="component component-padding">
        <h1>PickerDate组件</h1>
        <h2 class="titleLine">一、单选</h2>
        <h3>1.空状态</h3>
        <PickerDate :date="dateSingleNull" @change="dateChangeSingleNull"/>
        <br><br>
        <PickerDate :date="dateSingleNullHm" format="hm" @change="dateChangeSingleNullHm"/>
        <br><br>
        <PickerDate :date="dateSingleNullHms" format="hms" @change="dateChangeSingleNullHms"/>
        <br><br>
        <h3>1-1.空状态-设置可选范围2020.03.12-2020.05.01</h3>
        <PickerDate :date="dateSingleNull" scope="2020.03.12-2020.05.01" @change="dateChangeSingleNull"/>
        <br><br><br><br>
        <h3>2.有默认值</h3>
        <PickerDate :date="dateSingle" @change="dateChangeSingle"/>
        <br><br>
        <PickerDate :date="dateSingleHm" format="hm" @change="dateChangeSingleHm"/>
        <br><br>
        <PickerDate :date="dateSingleHms" format="hms" @change="dateChangeSingleHms"/>
        <br><br><br><br>
        <h3>2.有默认值-设置可选范围2020.03.12-2020.05.01</h3>
        <PickerDate :date="dateSingle" scope="2020.03.12-2020.05.01" @change="dateChangeSingle"/>
        <br><br><br><br>
        <h3>2-2.有默认值-周按照月排序</h3>
        <PickerDate :date="dateSingleMonth" sort="month" @change="dateChangeSingleMonth"/>
        <br><br>
        <PickerDate :date="dateSingleHmMonth" sort="month" format="hm" @change="dateChangeSingleHmMonth"/>
        <br><br>
        <PickerDate :date="dateSingleHmsMonth" sort="month" format="hms" @change="dateChangeSingleHmsMonth"/>
        <br><br><br><br>
        <h3>3.快速切换</h3>
        <PickerDate :date="dateSingleQuick" :quickSwitch="true" @change="dateChangeSingleQuick"/>
        <br><br>
        <PickerDate :date="dateSingleHmQuick" :quickSwitch="true" format="hm" @change="dateChangeSingleHmQuick"/>
        <br><br>
        <PickerDate :date="dateSingleHmsQuick" :quickSwitch="true" format="hms" @change="dateChangeSingleHmsQuick"/>
        <br><br><br><br>
        <h3>3-1.快速切换-周按照月排序</h3>
        <PickerDate :date="dateSingleQuickMonth" :quickSwitch="true" sort="month" @change="dateChangeSingleQuickMonth"/>
        <br><br>
        <PickerDate :date="dateSingleHmQuickMonth" :quickSwitch="true" sort="month" format="hm" @change="dateChangeSingleHmQuickMonth"/>
        <br><br>
        <PickerDate :date="dateSingleHmsQuickMonth" :quickSwitch="true" sort="month" format="hms" @change="dateChangeSingleHmsQuickMonth"/>
        <br><br><br><br>
        <h2 class="titleLine">二、多选</h2>
        <h3>1.空状态</h3>
        <PickerDate :date="dateDoubleNull" :range="true" @change="dateChangeDoubleNull"/>
        <br><br>
        <PickerDate :date="dateDoubleNullHm" :range="true" format="hm" @change="dateChangeDoubleNullHm"/>
        <br><br>
        <PickerDate :date="dateDoubleNullHms" :range="true" format="hms" @change="dateChangeDoubleNullHms"/>
        <br><br>
        <h3>1-1.空状态-设置可选范围2020.03.12-2020.05.01</h3>
        <PickerDate :date="dateDoubleNull" :range="true" scope="2020.03.12-2020.05.01" @change="dateChangeDoubleNull"/>
        <br><br>
        <h3>2.有默认值</h3>
        <PickerDate :date="dateDouble" :range="true" @change="dateChangeDouble"/>
        <br><br>
        <PickerDate :date="dateDoubleHm" :range="true" format="hm" @change="dateChangeDoubleHm"/>
        <br><br>
        <PickerDate :date="dateDoubleHms" :range="true" format="hms" @change="dateChangeDoubleHms"/>
        <br><br>
        <h3>2.有默认值-设置可选范围2020.03.12-2020.05.01</h3>
        <PickerDate :date="dateDouble" :range="true" scope="2020.03.12-2020.05.01" @change="dateChangeDouble"/>
        <br><br>
        <h3>2-2.有默认值-周按照月排序</h3>
        <PickerDate :date="dateDoubleMonth" :range="true" sort="month" @change="dateChangeDoubleMonth"/>
        <br><br>
        <PickerDate :date="dateDoubleHmMonth" :range="true" sort="month" format="hm" @change="dateChangeDoubleHmMonth"/>
        <br><br>
        <PickerDate :date="dateDoubleHmsMonth" :range="true" sort="month" format="hms"
                    @change="dateChangeDoubleHmsMonth"/>
        <br><br>
        <h3>3.快速切换</h3>
        <PickerDate :date="dateDoubleQuick" :range="true" :quickSwitch="true" @change="dateChangeDoubleQuick"/>
        <br><br>
        <PickerDate :date="dateDoubleHmQuick" :range="true" :quickSwitch="true" format="hm"
                    @change="dateChangeDoubleHmQuick"/>
        <br><br>
        <PickerDate :date="dateDoubleHmsQuick" :range="true" :quickSwitch="true" format="hms"
                    @change="dateChangeDoubleHmsQuick"/>
        <br><br>
        <h3>3-1.快速切换-周按照月排序</h3>
        <PickerDate :date="dateDoubleQuickMonth" :range="true" sort="month" :quickSwitch="true"
                    @change="dateChangeDoubleQuickMonth"/>
        <br><br>
        <PickerDate :date="dateDoubleHmQuickMonth" :range="true" sort="month" :quickSwitch="true" format="hm"
                    @change="dateChangeDoubleHmQuickMonth"/>
        <br><br>
        <PickerDate :date="dateDoubleHmsQuickMonth" :range="true" sort="month" :quickSwitch="true" format="hms"
                    @change="dateChangeDoubleHmsQuickMonth"/>
        <br><br><br><br>
        <h2 class="titleLine">三、无tab切换</h2>
        <br><br>
        <h3>1.单选-空状态</h3>
        <PickerDate :date="dateSingleNullDayPickerDay" picker="day" @change="dateChangeSingleNullPickerDay"/>
        <PickerDate :date="dateSingleNullDayHmPickerDay" picker="day" format="hm"
                    @change="dateChangeSingleNullHmPickerDay"/>
        <PickerDate :date="dateSingleNullDayHmsPickerDay" picker="day" format="hms"
                    @change="dateChangeSingleNullHmsPickerDay"/>
        <br><br>
        <PickerDate :date="dateSingleNullPickerWeek" picker="week" @change="dateChangeSingleNullPickerWeek"/>
        <br><br>
        <PickerDate :date="dateSingleNullPickerMonth" picker="month" @change="dateChangeSingleNullPickerMonth"/>
        <br><br>
        <PickerDate :date="dateSingleNullPickerYear" picker="year" @change="dateChangeSingleNullPickerYear"/>
        <br><br>
        <h3>1-1.单选-有默认值</h3>
        <PickerDate :date="dateSinglePickerDay" picker="day" @change="dateChangeSinglePickerDay"/>
        <PickerDate :date="dateSinglePickerDayHm" picker="day" format="hm" @change="dateChangeSinglePickerDayHm"/>
        <PickerDate :date="dateSinglePickerDayHms" picker="day" format="hms" @change="dateChangeSinglePickerDayHms"/>
        <br><br>
        <PickerDate :date="dateSinglePickerWeek" picker="week" @change="dateChangeSinglePickerWeek"/>
        <br><br>
        <PickerDate :date="dateSinglePickerMonth" picker="month" @change="dateChangeSinglePickerMonth"/>
        <br><br>
        <PickerDate :date="dateSinglePickerYear" picker="year" @change="dateChangeSinglePickerYear"/>
        <br><br>
        <h3>2.多选-空状态</h3>
        <PickerDate :date="dateDoubleNullPickerDay" picker="day" :range="true" @change="dateChangeDoubleNullPickerDay"/>
        <PickerDate :date="dateDoubleNullHmPickerDay" picker="day" :range="true" format="hm"
                    @change="dateChangeDoubleNullHmPickerDay"/>
        <PickerDate :date="dateDoubleNullHmsPickerDay" picker="day" :range="true" format="hms"
                    @change="dateChangeDoubleNullHmsPickerDay"/>
        <br><br>
        <PickerDate :date="dateDoubleNullPickerWeek" picker="week" :range="true"
                    @change="dateChangeDoubleNullPickerWeek"/>
        <br><br>
        <PickerDate :date="dateDoubleNullPickerMonth" picker="month" :range="true"
                    @change="dateChangeDoubleNullPickerMonth"/>
        <br><br>
        <PickerDate :date="dateDoubleNullPickerYear" picker="year" :range="true"
                    @change="dateChangeDoubleNullPickerYear"/>
        <br><br>
        <h3>2-1.多选-有默认值</h3>
        <PickerDate :date="dateDoublePickerDay" picker="day" :range="true" @change="dateChangeDoublePickerDay"/>
        <PickerDate :date="dateDoubleHmPickerDay" picker="day" :range="true" format="hm"
                    @change="dateChangeDoubleHmPickerDay"/>
        <PickerDate :date="dateDoubleHmsPickerDay" picker="day" :range="true" format="hms"
                    @change="dateChangeDoubleHmsPickerDay"/>
        <br><br>
        <PickerDate :date="dateDoublePickerWeek" picker="week" :range="true" @change="dateChangeDoublePickerWeek"/>
        <br><br>
        <PickerDate :date="dateDoublePickerMonth" picker="month" :range="true" @change="dateChangeDoublePickerMonth"/>
        <br><br>
        <PickerDate :date="dateDoublePickerYear" picker="year" :range="true" @change="dateChangeDoublePickerYear"/>
        <br><br><br><br><br><br><br><br><br><br>
    </div>
</template>

<script>
    export default {
        name: "PickerDateView",
        data() {
            return {
                // 单选
                dateSingleNull: '',
                dateSingleNullHm: '',
                dateSingleNullHms: '',

                dateSingleNullDay: '',
                dateSingleNullDayHm: '',
                dateSingleNullDayHms: '',
                dateSingleNullWeek: '',
                dateSingleNullMonth: '',
                dateSingleNullYear: '',

                dateSingle: '2020.02.24',
                dateSingleHm: '2020.02.24 12:12',
                dateSingleHms: '2020.02.24 12:12:25',

                dateSingleMonth: '2020.02.24',
                dateSingleHmMonth: '2020.02.24 12:12',
                dateSingleHmsMonth: '2020.02.24 12:12:25',

                dateSingleQuick: '2020.02.24',
                dateSingleHmQuick: '2020.02.24 12:12',
                dateSingleHmsQuick: '2020.02.24 12:12:25',

                dateSingleQuickMonth: '2020.02.24',
                dateSingleHmQuickMonth: '2020.02.24 12:12',
                dateSingleHmsQuickMonth: '2020.02.24 12:12:25',

                // 多选
                dateDoubleNull: '',
                dateDoubleNullHm: '',
                dateDoubleNullHms: '',

                dateDouble: '2020.01.03-2020.02.28',
                dateDoubleHm: '2020.01.03 11:20-2020.02.28 20:08',
                dateDoubleHms: '2020.01.03 11:20:22-2020.02.28 20:08:30',

                dateDoubleMonth: '2020.01.03-2020.02.28',
                dateDoubleHmMonth: '2020.01.03 11:20-2020.02.28 20:08',
                dateDoubleHmsMonth: '2020.01.03 11:20:22-2020.02.28 20:08:30',

                dateDoubleQuick: '2020.01.03-2020.02.28',
                dateDoubleHmQuick: '2020.01.03 11:20-2020.02.28 20:08',
                dateDoubleHmsQuick: '2020.01.03 11:20:22-2020.02.28 20:08:30',

                dateDoubleQuickMonth: '2020.01.03-2020.02.28',
                dateDoubleHmQuickMonth: '2020.01.03 11:20-2020.02.28 20:08',
                dateDoubleHmsQuickMonth: '2020.01.03 11:20:22-2020.02.28 20:08:30',

                dateSingleNullDayPickerDay: '',
                dateSingleNullDayHmPickerDay: '',
                dateSingleNullDayHmsPickerDay: '',
                dateSingleNullPickerWeek: '',
                dateSingleNullPickerMonth: '',
                dateSingleNullPickerYear: '',

                dateSinglePickerDay: '2020.01.03-2020.02.28',
                dateSinglePickerDayHm: '2020.01.03 11:20-2020.02.28 20:08',
                dateSinglePickerDayHms: '2020.01.03 11:20:22-2020.02.28 20:08:30',

                dateSinglePickerWeek: '2020.03.23',
                dateSinglePickerMonth: '2020.05',
                dateSinglePickerYear: '2020',

                dateDoubleNullPickerDay: '',
                dateDoubleNullHmPickerDay: '',
                dateDoubleNullHmsPickerDay: '',

                dateDoubleNullPickerWeek: '',
                dateDoubleNullPickerMonth: '',
                dateDoubleNullPickerYear: '',

                dateDoublePickerDay: '2020.01.03-2020.02.28',
                dateDoubleHmPickerDay: '2020.01.03 11:20-2020.02.28 20:08',
                dateDoubleHmsPickerDay: '2020.01.03 11:20:22-2020.02.28 20:08:30',

                dateDoublePickerWeek: '2020.02.23-2020.03.29',
                dateDoublePickerMonth: '2020.01.03-2020.02.28',
                dateDoublePickerYear: '2020-2026',
            }
        },
        methods: {
            // 单选
            dateChangeSingleNull(date) {
                console.log('选择的日期::::', date);
                this.dateSingleNull = date;
            },
            dateChangeSingleNullHm(date) {
                console.log('选择的日期::::', date);
                this.dateSingleNullHm = date;
            },
            dateChangeSingleNullHms(date) {
                console.log('选择的日期::::', date);
                this.dateSingleNullHms = date;
            },

            dateChangeSingleNullDay(date) {
                console.log('选择的日期::::', date);
                this.dateSingleNullDay = date;
            },
            dateChangeSingleNullDayHm(date) {
                console.log('选择的日期::::', date);
                this.dateSingleNullDayHm = date;
            },
            dateChangeSingleNullDayHms(date) {
                console.log('选择的日期::::', date);
                this.dateSingleNullDayHms = date;
            },
            dateChangeSingleNullWeek(date) {
                console.log('选择的日期::::', date);
                this.dateSingleNullWeek = date;
            },
            dateChangeSingleNullMonth(date) {
                console.log('选择的日期::::', date);
                this.dateSingleNullMonth = date;
            },
            dateChangeSingleNullYear(date) {
                console.log('选择的日期::::', date);
                this.dateSingleNullYear = date;
            },

            dateChangeSingle(date) {
                console.log('选择的日期::::', date);
                this.dateSingle = date;
            },
            dateChangeSingleHm(date) {
                console.log('选择的日期::::', date);
                this.dateSingleHm = date;
            },
            dateChangeSingleHms(date) {
                console.log('选择的日期::::', date);
                this.dateSingleHms = date;
            },

            dateChangeSingleMonth(date) {
                console.log('选择的日期::::', date);
                this.dateSingleMonth = date;
            },
            dateChangeSingleHmMonth(date) {
                console.log('选择的日期::::', date);
                this.dateSingleHmMonth = date;
            },
            dateChangeSingleHmsMonth(date) {
                console.log('选择的日期::::', date);
                this.dateSingleHmsMonth = date;
            },

            dateChangeSingleQuick(date) {
                console.log('选择的日期::::', date);
                this.dateSingleQuick = date;
            },
            dateChangeSingleHmQuick(date) {
                console.log('选择的日期::::', date);
                this.dateSingleHmQuick = date;
            },
            dateChangeSingleHmsQuick(date) {
                console.log('选择的日期::::', date);
                this.dateSingleHmsQuick = date;
            },

            dateChangeSingleQuickMonth(date) {
                console.log('选择的日期::::', date);
                this.dateSingleQuickMonth = date;
            },
            dateChangeSingleHmQuickMonth(date) {
                console.log('选择的日期::::', date);
                this.dateSingleHmQuickMonth = date;
            },
            dateChangeSingleHmsQuickMonth(date) {
                console.log('选择的日期::::', date);
                this.dateSingleHmsQuickMonth = date;
            },

            // 多选
            dateChangeDoubleNull(date) {
                console.log('选择的日期::::', date);
                this.dateDoubleNull = date;
            },
            dateChangeDoubleNullHm(date) {
                console.log('选择的日期::::', date);
                this.dateDoubleNullHm = date;
            },
            dateChangeDoubleNullHms(date) {
                console.log('选择的日期::::', date);
                this.dateDoubleNullHms = date;
            },

            dateChangeDouble(date) {
                console.log('选择的日期::::', date);
                this.dateDouble = date;
            },
            dateChangeDoubleHm(date) {
                console.log('选择的日期::::', date);
                this.dateDoubleHm = date;
            },
            dateChangeDoubleHms(date) {
                console.log('选择的日期::::', date);
                this.dateDoubleHms = date;
            },

            dateChangeDoubleMonth(date) {
                console.log('选择的日期::::', date);
                this.dateDoubleMonth = date;
            },
            dateChangeDoubleHmMonth(date) {
                console.log('选择的日期::::', date);
                this.dateDoubleHmMonth = date;
            },
            dateChangeDoubleHmsMonth(date) {
                console.log('选择的日期::::', date);
                this.dateDoubleHmsMonth = date;
            },

            dateChangeDoubleQuick(date) {
                console.log('选择的日期::::', date);
                this.dateDoubleQuick = date;
            },
            dateChangeDoubleHmQuick(date) {
                console.log('选择的日期::::', date);
                this.dateDoubleHmQuick = date;
            },
            dateChangeDoubleHmsQuick(date) {
                console.log('选择的日期::::', date);
                this.dateDoubleHmsQuick = date;
            },

            dateChangeDoubleQuickMonth(date) {
                console.log('选择的日期::::', date);
                this.dateDoubleQuickMonth = date;
            },
            dateChangeDoubleHmQuickMonth(date) {
                console.log('选择的日期::::', date);
                this.dateDoubleHmQuickMonth = date;
            },
            dateChangeDoubleHmsQuickMonth(date) {
                console.log('选择的日期::::', date);
                this.dateDoubleHmsQuickMonth = date;
            },

            dateChangeSingleNullPickerDay(date) {
                console.log('选择的日期::::', date);
                this.dateSingleNullDayPickerDay = date;
            },
            dateChangeSingleNullHmPickerDay(date) {
                console.log('选择的日期::::', date);
                this.dateSingleNullDayHmPickerDay = date;
            },
            dateChangeSingleNullHmsPickerDay(date) {
                console.log('选择的日期::::', date);
                this.dateSingleNullDayHmsPickerDay = date;
            },

            dateChangeSingleNullPickerWeek(date) {
                console.log('选择的日期::::', date);
                this.dateSingleNullPickerWeek = date;
            },
            dateChangeSingleNullPickerMonth(date) {
                console.log('选择的日期::::', date);
                this.dateSingleNullPickerMonth = date;
            },
            dateChangeSingleNullPickerYear(date) {
                console.log('选择的日期::::', date);
                this.dateSingleNullPickerYear = date;
            },

            dateChangeSinglePickerDay(date) {
                console.log('选择的日期::::', date);
                this.dateSinglePickerDay = date;
            },
            dateChangeSinglePickerDayHm(date) {
                console.log('选择的日期::::', date);
                this.dateSinglePickerDayHm = date;
            },
            dateChangeSinglePickerDayHms(date) {
                console.log('选择的日期::::', date);
                this.dateSinglePickerDayHms = date;
            },
            dateChangeSinglePickerWeek(date) {
                console.log('选择的日期::::', date);
                this.dateSinglePickerDayHms = date;
            },
            dateChangeSinglePickerMonth(date) {
                console.log('选择的日期::::', date);
                this.dateSinglePickerMonth = date;
            },
            dateChangeSinglePickerYear(date) {
                console.log('选择的日期::::', date);
                this.dateSinglePickerYear = date;
            },

            dateChangeDoubleNullPickerDay(date) {
                console.log('选择的日期::::', date);
                this.dateDoubleNullPickerDay = date;
            },
            dateChangeDoubleNullHmPickerDay(date) {
                console.log('选择的日期::::', date);
                this.dateDoubleNullHmPickerDay = date;
            },
            dateChangeDoubleNullHmsPickerDay(date) {
                console.log('选择的日期::::', date);
                this.dateDoubleNullHmsPickerDay = date;
            },

            dateChangeDoubleNullPickerWeek(date) {
                console.log('选择的日期::::', date);
                this.dateDoubleNullPickerWeek = date;
            },
            dateChangeDoubleNullPickerMonth(date) {
                console.log('选择的日期::::', date);
                this.dateDoubleNullPickerMonth = date;
            },
            dateChangeDoubleNullPickerYear(date) {
                console.log('选择的日期::::', date);
                this.dateDoubleNullPickerYear = date;
            },

            dateChangeDoublePickerDay(date) {
                console.log('选择的日期::::', date);
                this.dateDoublePickerDay = date;
            },
            dateChangeDoubleHmPickerDay(date) {
                console.log('选择的日期::::', date);
                this.dateDoubleHmPickerDay = date;
            },
            dateChangeDoubleHmsPickerDay(date) {
                console.log('选择的日期::::', date);
                this.dateDoubleHmsPickerDay = date;
            },

            dateChangeDoublePickerWeek(date) {
                console.log('选择的日期::::', date);
                this.dateDoublePickerWeek = date;
            },
            dateChangeDoublePickerMonth(date) {
                console.log('选择的日期::::', date);
                this.dateDoublePickerMonth = date;
            },
            dateChangeDoublePickerYear(date) {
                console.log('选择的日期::::', date);
                this.dateDoublePickerYear = date;
            },
        }
    }
</script>

<style lang="stylus" scoped>

.component-padding
    padding-bottom 200px !important

</style>

```vue
<template>
    <div class="component component-padding">
        <h1>PickerDate组件</h1>

        <h2 class="titleLine">一、单选</h2>
        <h3>1.空状态</h3>
        <PickerDate :date="dateSingleNull" @change="dateChangeSingleNull"/>
        <br><br>
        <PickerDate :date="dateSingleNullHm" format="hm" @change="dateChangeSingleNullHm"/>
        <br><br>
        <PickerDate :date="dateSingleNullHms" format="hms" @change="dateChangeSingleNullHms"/>

        <br><br>
        <h3>1-1.空状态-设置可选范围2020.03.12-2020.05.01</h3>
        <PickerDate :date="dateSingleNull" scope="2020.03.12-2020.05.01" @change="dateChangeSingleNull"/>

        <br><br><br><br>
        <h3>2.有默认值</h3>
        <PickerDate :date="dateSingle" @change="dateChangeSingle"/>
        <br><br>
        <PickerDate :date="dateSingleHm" format="hm" @change="dateChangeSingleHm"/>
        <br><br>
        <PickerDate :date="dateSingleHms" format="hms" @change="dateChangeSingleHms"/>

        <br><br><br><br>
        <h3>2.有默认值-设置可选范围2020.03.12-2020.05.01</h3>
        <PickerDate :date="dateSingle" scope="2020.03.12-2020.05.01" @change="dateChangeSingle"/>

        <br><br><br><br>
        <h3>2-2.有默认值-周按照月排序</h3>
        <PickerDate :date="dateSingleMonth" sort="month" @change="dateChangeSingleMonth"/>
        <br><br>
        <PickerDate :date="dateSingleHmMonth" sort="month" format="hm" @change="dateChangeSingleHmMonth"/>
        <br><br>
        <PickerDate :date="dateSingleHmsMonth" sort="month" format="hms" @change="dateChangeSingleHmsMonth"/>

        <br><br><br><br>
        <h3>3.快速切换</h3>
        <PickerDate :date="dateSingleQuick" :quickSwitch="true" @change="dateChangeSingleQuick"/>
        <br><br>
        <PickerDate :date="dateSingleHmQuick" :quickSwitch="true" format="hm" @change="dateChangeSingleHmQuick"/>
        <br><br>
        <PickerDate :date="dateSingleHmsQuick" :quickSwitch="true" format="hms" @change="dateChangeSingleHmsQuick"/>

        <br><br><br><br>
        <h3>3-1.快速切换-周按照月排序</h3>
        <PickerDate :date="dateSingleQuickMonth" :quickSwitch="true" sort="month" @change="dateChangeSingleQuickMonth"/>
        <br><br>
        <PickerDate :date="dateSingleHmQuickMonth" :quickSwitch="true" sort="month" format="hm"
                    @change="dateChangeSingleHmQuickMonth"/>
        <br><br>

        <PickerDate :date="dateSingleHmsQuickMonth" :quickSwitch="true" sort="month" format="hms"
                    @change="dateChangeSingleHmsQuickMonth"/>

        <br><br><br><br>

        <h2 class="titleLine">二、多选</h2>
        <h3>1.空状态</h3>
        <PickerDate :date="dateDoubleNull" :range="true" @change="dateChangeDoubleNull"/>
        <br><br>
        <PickerDate :date="dateDoubleNullHm" :range="true" format="hm" @change="dateChangeDoubleNullHm"/>
        <br><br>
        <PickerDate :date="dateDoubleNullHms" :range="true" format="hms" @change="dateChangeDoubleNullHms"/>
        <br><br>

        <h3>1-1.空状态-设置可选范围2020.03.12-2020.05.01</h3>
        <PickerDate :date="dateDoubleNull" :range="true" scope="2020.03.12-2020.05.01" @change="dateChangeDoubleNull"/>

        <br><br>
        <h3>2.有默认值</h3>
        <PickerDate :date="dateDouble" :range="true" @change="dateChangeDouble"/>
        <br><br>
        <PickerDate :date="dateDoubleHm" :range="true" format="hm" @change="dateChangeDoubleHm"/>
        <br><br>
        <PickerDate :date="dateDoubleHms" :range="true" format="hms" @change="dateChangeDoubleHms"/>
        <br><br>
        <h3>2.有默认值-设置可选范围2020.03.12-2020.05.01</h3>
        <PickerDate :date="dateDouble" :range="true" scope="2020.03.12-2020.05.01" @change="dateChangeDouble"/>

        <br><br>
        <h3>2-2.有默认值-周按照月排序</h3>
        <PickerDate :date="dateDoubleMonth" :range="true" sort="month" @change="dateChangeDoubleMonth"/>
        <br><br>
        <PickerDate :date="dateDoubleHmMonth" :range="true" sort="month" format="hm" @change="dateChangeDoubleHmMonth"/>
        <br><br>
        <PickerDate :date="dateDoubleHmsMonth" :range="true" sort="month" format="hms"
                    @change="dateChangeDoubleHmsMonth"/>
        <br><br>
        <h3>3.快速切换</h3>
        <PickerDate :date="dateDoubleQuick" :range="true" :quickSwitch="true" @change="dateChangeDoubleQuick"/>
        <br><br>
        <PickerDate :date="dateDoubleHmQuick" :range="true" :quickSwitch="true" format="hm"
                    @change="dateChangeDoubleHmQuick"/>
        <br><br>
        <PickerDate :date="dateDoubleHmsQuick" :range="true" :quickSwitch="true" format="hms"
                    @change="dateChangeDoubleHmsQuick"/>
        <br><br>
        <h3>3-1.快速切换-周按照月排序</h3>
        <PickerDate :date="dateDoubleQuickMonth" :range="true" sort="month" :quickSwitch="true"
                    @change="dateChangeDoubleQuickMonth"/>
        <br><br>
        <PickerDate :date="dateDoubleHmQuickMonth" :range="true" sort="month" :quickSwitch="true" format="hm"
                    @change="dateChangeDoubleHmQuickMonth"/>
        <br><br>
        <PickerDate :date="dateDoubleHmsQuickMonth" :range="true" sort="month" :quickSwitch="true" format="hms"
                    @change="dateChangeDoubleHmsQuickMonth"/>


        <br><br><br><br>
        <h2 class="titleLine">三、无tab切换</h2>
        <br><br>
        <h3>1.单选-空状态</h3>
        <PickerDate :date="dateSingleNullDayPickerDay" picker="day" @change="dateChangeSingleNullPickerDay"/>
        <PickerDate :date="dateSingleNullDayHmPickerDay" picker="day" format="hm"
                    @change="dateChangeSingleNullHmPickerDay"/>
        <PickerDate :date="dateSingleNullDayHmsPickerDay" picker="day" format="hms"
                    @change="dateChangeSingleNullHmsPickerDay"/>
        <br><br>
        <PickerDate :date="dateSingleNullPickerWeek" picker="week" @change="dateChangeSingleNullPickerWeek"/>
        <br><br>
        <PickerDate :date="dateSingleNullPickerMonth" picker="month" @change="dateChangeSingleNullPickerMonth"/>
        <br><br>
        <PickerDate :date="dateSingleNullPickerYear" picker="year" @change="dateChangeSingleNullPickerYear"/>

        <br><br>
        <h3>1-1.单选-有默认值</h3>
        <PickerDate :date="dateSinglePickerDay" picker="day" @change="dateChangeSinglePickerDay"/>
        <PickerDate :date="dateSinglePickerDayHm" picker="day" format="hm" @change="dateChangeSinglePickerDayHm"/>
        <PickerDate :date="dateSinglePickerDayHms" picker="day" format="hms" @change="dateChangeSinglePickerDayHms"/>
        <br><br>
        <PickerDate :date="dateSinglePickerWeek" picker="week" @change="dateChangeSinglePickerWeek"/>
        <br><br>
        <PickerDate :date="dateSinglePickerMonth" picker="month" @change="dateChangeSinglePickerMonth"/>
        <br><br>
        <PickerDate :date="dateSinglePickerYear" picker="year" @change="dateChangeSinglePickerYear"/>

        <br><br>
        <h3>2.多选-空状态</h3>
        <PickerDate :date="dateDoubleNullPickerDay" picker="day" :range="true" @change="dateChangeDoubleNullPickerDay"/>
        <PickerDate :date="dateDoubleNullHmPickerDay" picker="day" :range="true" format="hm"
                    @change="dateChangeDoubleNullHmPickerDay"/>
        <PickerDate :date="dateDoubleNullHmsPickerDay" picker="day" :range="true" format="hms"
                    @change="dateChangeDoubleNullHmsPickerDay"/>
        <br><br>
        <PickerDate :date="dateDoubleNullPickerWeek" picker="week" :range="true"
                    @change="dateChangeDoubleNullPickerWeek"/>
        <br><br>
        <PickerDate :date="dateDoubleNullPickerMonth" picker="month" :range="true"
                    @change="dateChangeDoubleNullPickerMonth"/>
        <br><br>
        <PickerDate :date="dateDoubleNullPickerYear" picker="year" :range="true"
                    @change="dateChangeDoubleNullPickerYear"/>

        <br><br>
        <h3>2-1.多选-有默认值</h3>
        <PickerDate :date="dateDoublePickerDay" picker="day" :range="true" @change="dateChangeDoublePickerDay"/>
        <PickerDate :date="dateDoubleHmPickerDay" picker="day" :range="true" format="hm"
                    @change="dateChangeDoubleHmPickerDay"/>
        <PickerDate :date="dateDoubleHmsPickerDay" picker="day" :range="true" format="hms"
                    @change="dateChangeDoubleHmsPickerDay"/>
        <br><br>
        <PickerDate :date="dateDoublePickerWeek" picker="week" :range="true" @change="dateChangeDoublePickerWeek"/>
        <br><br>
        <PickerDate :date="dateDoublePickerMonth" picker="month" :range="true" @change="dateChangeDoublePickerMonth"/>
        <br><br>
        <PickerDate :date="dateDoublePickerYear" picker="year" :range="true" @change="dateChangeDoublePickerYear"/>
        <br><br><br><br><br><br><br><br><br><br>
    </div>
</template>

<script>
    export default {
        name: "PickerDateView",
        data() {
            return {
                // 单选
                dateSingleNull: '',
                dateSingleNullHm: '',
                dateSingleNullHms: '',

                dateSingleNullDay: '',
                dateSingleNullDayHm: '',
                dateSingleNullDayHms: '',
                dateSingleNullWeek: '',
                dateSingleNullMonth: '',
                dateSingleNullYear: '',

                dateSingle: '2020.02.24',
                dateSingleHm: '2020.02.24 12:12',
                dateSingleHms: '2020.02.24 12:12:25',

                dateSingleMonth: '2020.02.24',
                dateSingleHmMonth: '2020.02.24 12:12',
                dateSingleHmsMonth: '2020.02.24 12:12:25',

                dateSingleQuick: '2020.02.24',
                dateSingleHmQuick: '2020.02.24 12:12',
                dateSingleHmsQuick: '2020.02.24 12:12:25',

                dateSingleQuickMonth: '2020.02.24',
                dateSingleHmQuickMonth: '2020.02.24 12:12',
                dateSingleHmsQuickMonth: '2020.02.24 12:12:25',

                // 多选
                dateDoubleNull: '',
                dateDoubleNullHm: '',
                dateDoubleNullHms: '',

                dateDouble: '2020.01.03-2020.02.28',
                dateDoubleHm: '2020.01.03 11:20-2020.02.28 20:08',
                dateDoubleHms: '2020.01.03 11:20:22-2020.02.28 20:08:30',

                dateDoubleMonth: '2020.01.03-2020.02.28',
                dateDoubleHmMonth: '2020.01.03 11:20-2020.02.28 20:08',
                dateDoubleHmsMonth: '2020.01.03 11:20:22-2020.02.28 20:08:30',

                dateDoubleQuick: '2020.01.03-2020.02.28',
                dateDoubleHmQuick: '2020.01.03 11:20-2020.02.28 20:08',
                dateDoubleHmsQuick: '2020.01.03 11:20:22-2020.02.28 20:08:30',

                dateDoubleQuickMonth: '2020.01.03-2020.02.28',
                dateDoubleHmQuickMonth: '2020.01.03 11:20-2020.02.28 20:08',
                dateDoubleHmsQuickMonth: '2020.01.03 11:20:22-2020.02.28 20:08:30',

                dateSingleNullDayPickerDay: '',
                dateSingleNullDayHmPickerDay: '',
                dateSingleNullDayHmsPickerDay: '',
                dateSingleNullPickerWeek: '',
                dateSingleNullPickerMonth: '',
                dateSingleNullPickerYear: '',

                dateSinglePickerDay: '2020.01.03-2020.02.28',
                dateSinglePickerDayHm: '2020.01.03 11:20-2020.02.28 20:08',
                dateSinglePickerDayHms: '2020.01.03 11:20:22-2020.02.28 20:08:30',

                dateSinglePickerWeek: '2020.03.23',
                dateSinglePickerMonth: '2020.05',
                dateSinglePickerYear: '2020',

                dateDoubleNullPickerDay: '',
                dateDoubleNullHmPickerDay: '',
                dateDoubleNullHmsPickerDay: '',

                dateDoubleNullPickerWeek: '',
                dateDoubleNullPickerMonth: '',
                dateDoubleNullPickerYear: '',

                dateDoublePickerDay: '2020.01.03-2020.02.28',
                dateDoubleHmPickerDay: '2020.01.03 11:20-2020.02.28 20:08',
                dateDoubleHmsPickerDay: '2020.01.03 11:20:22-2020.02.28 20:08:30',

                dateDoublePickerWeek: '2020.02.23-2020.03.29',
                dateDoublePickerMonth: '2020.01.03-2020.02.28',
                dateDoublePickerYear: '2020-2026',
            }
        },
        methods: {
            // 单选
            dateChangeSingleNull(date) {
                console.log('选择的日期::::', date);
                this.dateSingleNull = date;
            },
            dateChangeSingleNullHm(date) {
                console.log('选择的日期::::', date);
                this.dateSingleNullHm = date;
            },
            dateChangeSingleNullHms(date) {
                console.log('选择的日期::::', date);
                this.dateSingleNullHms = date;
            },

            dateChangeSingleNullDay(date) {
                console.log('选择的日期::::', date);
                this.dateSingleNullDay = date;
            },
            dateChangeSingleNullDayHm(date) {
                console.log('选择的日期::::', date);
                this.dateSingleNullDayHm = date;
            },
            dateChangeSingleNullDayHms(date) {
                console.log('选择的日期::::', date);
                this.dateSingleNullDayHms = date;
            },
            dateChangeSingleNullWeek(date) {
                console.log('选择的日期::::', date);
                this.dateSingleNullWeek = date;
            },
            dateChangeSingleNullMonth(date) {
                console.log('选择的日期::::', date);
                this.dateSingleNullMonth = date;
            },
            dateChangeSingleNullYear(date) {
                console.log('选择的日期::::', date);
                this.dateSingleNullYear = date;
            },

            dateChangeSingle(date) {
                console.log('选择的日期::::', date);
                this.dateSingle = date;
            },
            dateChangeSingleHm(date) {
                console.log('选择的日期::::', date);
                this.dateSingleHm = date;
            },
            dateChangeSingleHms(date) {
                console.log('选择的日期::::', date);
                this.dateSingleHms = date;
            },

            dateChangeSingleMonth(date) {
                console.log('选择的日期::::', date);
                this.dateSingleMonth = date;
            },
            dateChangeSingleHmMonth(date) {
                console.log('选择的日期::::', date);
                this.dateSingleHmMonth = date;
            },
            dateChangeSingleHmsMonth(date) {
                console.log('选择的日期::::', date);
                this.dateSingleHmsMonth = date;
            },

            dateChangeSingleQuick(date) {
                console.log('选择的日期::::', date);
                this.dateSingleQuick = date;
            },
            dateChangeSingleHmQuick(date) {
                console.log('选择的日期::::', date);
                this.dateSingleHmQuick = date;
            },
            dateChangeSingleHmsQuick(date) {
                console.log('选择的日期::::', date);
                this.dateSingleHmsQuick = date;
            },

            dateChangeSingleQuickMonth(date) {
                console.log('选择的日期::::', date);
                this.dateSingleQuickMonth = date;
            },
            dateChangeSingleHmQuickMonth(date) {
                console.log('选择的日期::::', date);
                this.dateSingleHmQuickMonth = date;
            },
            dateChangeSingleHmsQuickMonth(date) {
                console.log('选择的日期::::', date);
                this.dateSingleHmsQuickMonth = date;
            },

            // 多选
            dateChangeDoubleNull(date) {
                console.log('选择的日期::::', date);
                this.dateDoubleNull = date;
            },
            dateChangeDoubleNullHm(date) {
                console.log('选择的日期::::', date);
                this.dateDoubleNullHm = date;
            },
            dateChangeDoubleNullHms(date) {
                console.log('选择的日期::::', date);
                this.dateDoubleNullHms = date;
            },

            dateChangeDouble(date) {
                console.log('选择的日期::::', date);
                this.dateDouble = date;
            },
            dateChangeDoubleHm(date) {
                console.log('选择的日期::::', date);
                this.dateDoubleHm = date;
            },
            dateChangeDoubleHms(date) {
                console.log('选择的日期::::', date);
                this.dateDoubleHms = date;
            },

            dateChangeDoubleMonth(date) {
                console.log('选择的日期::::', date);
                this.dateDoubleMonth = date;
            },
            dateChangeDoubleHmMonth(date) {
                console.log('选择的日期::::', date);
                this.dateDoubleHmMonth = date;
            },
            dateChangeDoubleHmsMonth(date) {
                console.log('选择的日期::::', date);
                this.dateDoubleHmsMonth = date;
            },

            dateChangeDoubleQuick(date) {
                console.log('选择的日期::::', date);
                this.dateDoubleQuick = date;
            },
            dateChangeDoubleHmQuick(date) {
                console.log('选择的日期::::', date);
                this.dateDoubleHmQuick = date;
            },
            dateChangeDoubleHmsQuick(date) {
                console.log('选择的日期::::', date);
                this.dateDoubleHmsQuick = date;
            },

            dateChangeDoubleQuickMonth(date) {
                console.log('选择的日期::::', date);
                this.dateDoubleQuickMonth = date;
            },
            dateChangeDoubleHmQuickMonth(date) {
                console.log('选择的日期::::', date);
                this.dateDoubleHmQuickMonth = date;
            },
            dateChangeDoubleHmsQuickMonth(date) {
                console.log('选择的日期::::', date);
                this.dateDoubleHmsQuickMonth = date;
            },

            dateChangeSingleNullPickerDay(date) {
                console.log('选择的日期::::', date);
                this.dateSingleNullDayPickerDay = date;
            },
            dateChangeSingleNullHmPickerDay(date) {
                console.log('选择的日期::::', date);
                this.dateSingleNullDayHmPickerDay = date;
            },
            dateChangeSingleNullHmsPickerDay(date) {
                console.log('选择的日期::::', date);
                this.dateSingleNullDayHmsPickerDay = date;
            },

            dateChangeSingleNullPickerWeek(date) {
                console.log('选择的日期::::', date);
                this.dateSingleNullPickerWeek = date;
            },
            dateChangeSingleNullPickerMonth(date) {
                console.log('选择的日期::::', date);
                this.dateSingleNullPickerMonth = date;
            },
            dateChangeSingleNullPickerYear(date) {
                console.log('选择的日期::::', date);
                this.dateSingleNullPickerYear = date;
            },

            dateChangeSinglePickerDay(date) {
                console.log('选择的日期::::', date);
                this.dateSinglePickerDay = date;
            },
            dateChangeSinglePickerDayHm(date) {
                console.log('选择的日期::::', date);
                this.dateSinglePickerDayHm = date;
            },
            dateChangeSinglePickerDayHms(date) {
                console.log('选择的日期::::', date);
                this.dateSinglePickerDayHms = date;
            },
            dateChangeSinglePickerWeek(date) {
                console.log('选择的日期::::', date);
                this.dateSinglePickerDayHms = date;
            },
            dateChangeSinglePickerMonth(date) {
                console.log('选择的日期::::', date);
                this.dateSinglePickerMonth = date;
            },
            dateChangeSinglePickerYear(date) {
                console.log('选择的日期::::', date);
                this.dateSinglePickerYear = date;
            },

            dateChangeDoubleNullPickerDay(date) {
                console.log('选择的日期::::', date);
                this.dateDoubleNullPickerDay = date;
            },
            dateChangeDoubleNullHmPickerDay(date) {
                console.log('选择的日期::::', date);
                this.dateDoubleNullHmPickerDay = date;
            },
            dateChangeDoubleNullHmsPickerDay(date) {
                console.log('选择的日期::::', date);
                this.dateDoubleNullHmsPickerDay = date;
            },

            dateChangeDoubleNullPickerWeek(date) {
                console.log('选择的日期::::', date);
                this.dateDoubleNullPickerWeek = date;
            },
            dateChangeDoubleNullPickerMonth(date) {
                console.log('选择的日期::::', date);
                this.dateDoubleNullPickerMonth = date;
            },
            dateChangeDoubleNullPickerYear(date) {
                console.log('选择的日期::::', date);
                this.dateDoubleNullPickerYear = date;
            },

            dateChangeDoublePickerDay(date) {
                console.log('选择的日期::::', date);
                this.dateDoublePickerDay = date;
            },
            dateChangeDoubleHmPickerDay(date) {
                console.log('选择的日期::::', date);
                this.dateDoubleHmPickerDay = date;
            },
            dateChangeDoubleHmsPickerDay(date) {
                console.log('选择的日期::::', date);
                this.dateDoubleHmsPickerDay = date;
            },

            dateChangeDoublePickerWeek(date) {
                console.log('选择的日期::::', date);
                this.dateDoublePickerWeek = date;
            },
            dateChangeDoublePickerMonth(date) {
                console.log('选择的日期::::', date);
                this.dateDoublePickerMonth = date;
            },
            dateChangeDoublePickerYear(date) {
                console.log('选择的日期::::', date);
                this.dateDoublePickerYear = date;
            },
        }
    }
</script>
```

### Attributes

| 参数     | 说明  | 类型    | 默认值  | 必须    |
| ------- | ---- | ------ | ------- | ------ |
| date    | 默认时间 | String | '' | no     |
| scope    | 可选择的时间段 | String | '' | no     |
| format    | 时分秒格式可选值【hm/hms】 | String | 'hms' | no     |
| picker    | 时间选择器类型，可选值【day/week/month/year】 | String | '' | no     |
| sort    | 周选择器的排序方式，可选值【month/year】 | String | year | no     |
| quickSwitch    | 是否可快速切换时间 | Boolean | false | no     |
| range    | 开启时间段选择器 | Boolean | false | no     |
| change    | 提交选中时间回调 | Function | -- | Yes     |