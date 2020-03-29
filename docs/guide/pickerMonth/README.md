### PickerMonth 月选择 内侧中...

<template>
    <div class="component component-padding">
        <h1>PickerMonth组件</h1>
        <PickerMonth :date="dateSingle" @change="dateChangeSingle" />
        <br><br>
        <PickerMonth :date="dateSingle" :quickSwitch="true" @change="dateChangeSingle" />
        <br><br><br><br><br>
        <PickerMonth :date="dateDouble" :range="true" @change="dateChangeDouble" />
        <br><br>
        <PickerMonth :date="dateDouble" :quickSwitch="true" :range="true" @change="dateChangeDouble" />
    </div>
</template>

<script>
    export default {
        name: "PickerMonthView",
        data() {
            return {
                // dateSingle: '2020.03',
                dateSingle: '',
                dateDouble: ''
                // dateDouble: '2007.05-2017.10'
                // dateDouble: '2020.02-2020.10'
            }
        },
        methods: {
            dateChangeSingle(date) {
                console.log('选择的日期::::', date);
                this.dateSingle=date;
            },
            dateChangeDouble(date) {
                console.log('选择的日期::::', date);
                this.dateDouble=date;
            }
        }
    }
</script>

```vue
<template>
    <div class="component component-padding">
        <h1>PickerMonth组件</h1>
        <PickerMonth :date="dateSingle" @change="dateChangeSingle" />
        <br><br>
        <PickerMonth :date="dateSingle" :quickSwitch="true" @change="dateChangeSingle" />

        <br><br><br><br><br>
        <PickerMonth :date="dateDouble" :range="true" @change="dateChangeDouble" />
        <br><br>
        <PickerMonth :date="dateDouble" :quickSwitch="true" :range="true" @change="dateChangeDouble" />
    </div>
</template>

<script>
    export default {
        name: "PickerMonthView",
        data() {
            return {
                // dateSingle: '2020.03',
                dateSingle: '',
                dateDouble: ''
                // dateDouble: '2007.05-2017.10'
                // dateDouble: '2020.02-2020.10'
            }
        },
        methods: {
            dateChangeSingle(date) {
                console.log('选择的日期::::', date);
                this.dateSingle=date;
            },
            dateChangeDouble(date) {
                console.log('选择的日期::::', date);
                this.dateDouble=date;
            }
        }
    }
</script>

```