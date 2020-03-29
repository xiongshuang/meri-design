### PickerWeek 周选择 内侧中...

<template>
    <div class="component component-padding">
        <h1>PickerWeek组件</h1>
        <h3>单选-按年排序</h3>
        <PickerWeek :date="dateSingleYear" sort="year" @change="dateChangeSingleByYear" />
        <br><br>
        <PickerWeek :date="dateSingleYear" :quickSwitch="true" sort="year" @change="dateChangeSingleByYear" />
        <h3>单选-按月排序</h3>
        <PickerWeek :date="dateSingleMonth" sort="month" @change="dateChangeSingleByMonth" />
        <br><br>
        <PickerWeek :date="dateSingleMonth" :quickSwitch="true" sort="month" @change="dateChangeSingleByMonth" />
        <br><br><br><br>
        <h3>多选-按年排序</h3>
        <PickerWeek :date="dateDoubleYear" sort="year" :range="true" @change="dateChangeDoubleByYear" />
        <br><br>
        <PickerWeek :date="dateDoubleYear" :quickSwitch="true" sort="year" :range="true" @change="dateChangeDoubleByYear" />
        <h3>多选-按月排序</h3>
        <PickerWeek :date="dateDoubleMonth" sort="month" :range="true" @change="dateChangeDoubleByMonth" />
        <br><br>
        <PickerWeek :date="dateDoubleMonth" :quickSwitch="true" sort="month" :range="true" @change="dateChangeDoubleByMonth" />
    </div>
</template>

<script>
    export default {
        name: "PickerWeekView",
        data() {
            return {
                dateSingleYear: '2020.05.18-2020.05.24',
                // dateSingleYear: '',
                // dateSingleMonth: '2020.05.18-2020.05.24',
                dateSingleMonth: '',

                // dateDoubleYear: '2020.01.06-2020.02.02',
                dateDoubleYear: '2020.01.06-2020.02.23',
                // dateDoubleYear: '',
                dateDoubleMonth: ''
                // dateDoubleMonth: '2020.02.03-2020.03.01'
            }
        },
        methods: {
            dateChangeSingleByYear({thTextSelected, selectedDate}) {
                console.log('year-选择的日期Text::::', thTextSelected);
                console.log('year-选择的日期::::', selectedDate);
                this.dateSingleYear=selectedDate;
            },
            dateChangeSingleByMonth({thTextSelected, selectedDate}) {
                console.log('month-选择的日期Text::::', thTextSelected);
                console.log('month-选择的日期::::', selectedDate);
                this.dateSingleMonth=selectedDate;
            },
            dateChangeDoubleByYear({thTextSelected, selectedDate}) {
                console.log('month-选择的日期Text::::', thTextSelected);
                console.log('选择的日期::::', selectedDate);
                this.dateDoubleYear=selectedDate;
            },
            dateChangeDoubleByMonth({thTextSelected, selectedDate}) {
                console.log('month-选择的日期Text::::', thTextSelected);
                console.log('选择的日期::::', selectedDate);
                this.dateDoubleMonth=selectedDate;
            }
        }
    }
</script>

```vue
<template>
    <div class="component component-padding">
        <h1>PickerWeek组件</h1>
        <h3>单选-按年排序</h3>
        <PickerWeek :date="dateSingleYear" sort="year" @change="dateChangeSingleByYear" />
        <br><br>
        <PickerWeek :date="dateSingleYear" :quickSwitch="true" sort="year" @change="dateChangeSingleByYear" />
        <h3>单选-按月排序</h3>
        <PickerWeek :date="dateSingleMonth" sort="month" @change="dateChangeSingleByMonth" />
        <br><br>
        <PickerWeek :date="dateSingleMonth" :quickSwitch="true" sort="month" @change="dateChangeSingleByMonth" />

        <br><br><br><br>
        <h3>多选-按年排序</h3>
        <PickerWeek :date="dateDoubleYear" sort="year" :range="true" @change="dateChangeDoubleByYear" />
        <br><br>
        <PickerWeek :date="dateDoubleYear" :quickSwitch="true" sort="year" :range="true" @change="dateChangeDoubleByYear" />
        <h3>多选-按月排序</h3>
        <PickerWeek :date="dateDoubleMonth" sort="month" :range="true" @change="dateChangeDoubleByMonth" />
        <br><br>
        <PickerWeek :date="dateDoubleMonth" :quickSwitch="true" sort="month" :range="true" @change="dateChangeDoubleByMonth" />
    </div>
</template>

<script>
    export default {
        name: "PickerWeekView",
        data() {
            return {
                dateSingleYear: '2020.05.18-2020.05.24',
                // dateSingleYear: '',
                // dateSingleMonth: '2020.05.18-2020.05.24',
                dateSingleMonth: '',

                // dateDoubleYear: '2020.01.06-2020.02.02',
                dateDoubleYear: '2020.01.06-2020.02.23',
                // dateDoubleYear: '',
                dateDoubleMonth: ''
                // dateDoubleMonth: '2020.02.03-2020.03.01'
            }
        },
        methods: {
            dateChangeSingleByYear({thTextSelected, selectedDate}) {
                console.log('year-选择的日期Text::::', thTextSelected);
                console.log('year-选择的日期::::', selectedDate);
                this.dateSingleYear=selectedDate;
            },
            dateChangeSingleByMonth({thTextSelected, selectedDate}) {
                console.log('month-选择的日期Text::::', thTextSelected);
                console.log('month-选择的日期::::', selectedDate);
                this.dateSingleMonth=selectedDate;
            },
            dateChangeDoubleByYear({thTextSelected, selectedDate}) {
                console.log('month-选择的日期Text::::', thTextSelected);
                console.log('选择的日期::::', selectedDate);
                this.dateDoubleYear=selectedDate;
            },
            dateChangeDoubleByMonth({thTextSelected, selectedDate}) {
                console.log('month-选择的日期Text::::', thTextSelected);
                console.log('选择的日期::::', selectedDate);
                this.dateDoubleMonth=selectedDate;
            }
        }
    }
</script>

```