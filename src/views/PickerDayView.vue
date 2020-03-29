<template>
    <div class="component component-padding">
        <h1>PickerDay组件</h1>
        <PickerDay :date="dateSingleNull" @change="dateChangeSingleNull" />
        <br><br>
        <PickerDay :date="dateSingleNull" :quickSwitch="true" @change="dateChangeSingleNull" />
        <br><br>
        <PickerDay :date="dateSingle" @change="dateChangeSingle" />
        <br><br>
        <PickerDay :date="dateSingle" :quickSwitch="true" @change="dateChangeSingle" />
        <br><br>
        <PickerDay :date="dateSingleHm" format="hm" @change="dateChangeSingleHm" />
        <br><br>
        <PickerDay :date="dateSingleHm" :quickSwitch="true" format="hm" @change="dateChangeSingleHm" />
        <br><br>
        <PickerDay :date="dateSingleHms" format="hms" @change="dateChangeSingleHms" />
        <br><br>
        <PickerDay :date="dateSingleHms" :quickSwitch="true" format="hms" @change="dateChangeSingleHms" />

        <br><br><br><br><br>
        <PickerDay :date="dateDoubleNull" :range="true" @change="dateChangeDoubleNull" />
        <br><br>
        <PickerDay :date="dateDoubleNull" :quickSwitch="true" :range="true" @change="dateChangeDoubleNull" />
        <br><br>
        <PickerDay :date="dateDouble" :range="true" @change="dateChangeDouble" />
        <br><br>
        <PickerDay :date="dateDouble" :quickSwitch="true" :range="true" @change="dateChangeDouble" />
        <br><br>
        <PickerDay :date="dateDoubleHm" format="hm" :range="true" @change="dateChangeDoubleHm" />
        <br><br>
        <PickerDay :date="dateDoubleHm" :quickSwitch="true" format="hm" :range="true" @change="dateChangeDoubleHm" />
        <br><br>
        <PickerDay :date="dateDoubleHms" format="hms" :range="true" @change="dateChangeDoubleHms" />
        <br><br>
        <PickerDay :date="dateDoubleHms" :quickSwitch="true" format="hms" :range="true" @change="dateChangeDoubleHms" />
        <br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br>
    </div>
</template>

<script>
    export default {
        name: "PickerDayView",
        data() {
            return {
                dateSingleNull: '',
                // dateSingle: '',
                dateSingle: '2020.02.29',
                dateSingleHm: '2020.02.29 08:09',
                dateSingleHms: '2020.02.29 08:09:10',

                dateDoubleNull: '',
                dateDouble: '2020.02.14-2020.02.29',
                dateDoubleHm: '2020.02.14 08:09-2020.02.29 08:09',
                dateDoubleHms: '2020.02.14 08:09:10-2020.02.29 08:09:10'
            }
        },
        mounted() {
            // setTimeout(() => {
            //     this.dateSingle='2020.02.29';
            //     console.log(this.dateSingle);
            // }, 3000)
        },
        methods: {
            dateChangeSingleNull(date) {
                console.log('选择的日期::::', date);
                this.dateSingleNull=date;
            },
            dateChangeSingle(date) {
                console.log('选择的日期::::', date);
                this.dateSingle=date;
            },
            dateChangeSingleHm(date) {
                console.log('选择的日期::::', date);
                this.dateSingleHm=date;
            },
            dateChangeSingleHms(date) {
                console.log('选择的日期::::', date);
                this.dateSingleHms=date;
            },

            dateChangeDoubleNull(date) {
                console.log('选择的日期::::', date);
                this.dateDoubleNull=date;
            },
            dateChangeDouble(date) {
                console.log('选择的日期::::', date);
                this.dateDouble=date;
            },
            dateChangeDoubleHm(date) {
                console.log('选择的日期::::', date);
                this.dateDoubleHm=date;
            },
            dateChangeDoubleHms(date) {
                console.log('选择的日期::::', date);
                this.dateDoubleHms=date;
            }
        }
    }
</script>

<style lang="stylus" scoped>

.component-padding
    padding-bottom 200px !important
    width 240px

</style>