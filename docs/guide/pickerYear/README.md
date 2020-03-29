### PickerYear 年选择 内侧中...

<template>
    <div class="component component-padding">
        <h1>PickerYear组件</h1>
        <PickerYear :date="dateSingle" @change="dateChangeSingle" />
        <br><br>
        <PickerYear :date="dateSingle" :quickSwitch="true" @change="dateChangeSingle" />
        <br><br><br><br><br>
        <PickerYear :date="dateDouble" :range="true" @change="dateChangeDouble" />
        <br><br>
        <PickerYear :date="dateDouble" :quickSwitch="true" :range="true" @change="dateChangeDouble" />
    </div>
</template>

<script>
    export default {
        name: "PickerYearView",
        data() {
            return {
                // dateSingle: '2020',
                dateSingle: '',
                dateDouble: ''
                // dateDouble: '2015-2020'
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
        <h1>PickerYear组件</h1>
        <PickerYear :date="dateSingle" @change="dateChangeSingle" />
        <br><br>
        <PickerYear :date="dateSingle" :quickSwitch="true" @change="dateChangeSingle" />

        <br><br><br><br><br>
        <PickerYear :date="dateDouble" :range="true" @change="dateChangeDouble" />
        <br><br>
        <PickerYear :date="dateDouble" :quickSwitch="true" :range="true" @change="dateChangeDouble" />
    </div>
</template>

<script>
    export default {
        name: "PickerYearView",
        data() {
            return {
                // dateSingle: '2020',
                dateSingle: '',
                dateDouble: ''
                // dateDouble: '2015-2020'
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