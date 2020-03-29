<template>
    <div class="component component-padding">
        <h1>PickerTime组件</h1>
        <h3>format="hm"</h3>
        <br>
        <PickerTime :time="timeHm" format="hm" @change="timeChangeHm" />
        <br><br>
        <h3>format="hms"</h3>
        <br>
        <PickerTime :time="timeHms" format="hms" @change="timeChangeHms" />
        <br><br>

        <h3>format="hm"</h3>
        <br>
        <PickerTime :time="timeHmDouble" format="hm" :range="true" @change="timeChangeHmDouble" />
        <br><br>
        <h3>format="hms"</h3>
        <br>
        <PickerTime :time="timeHmsDouble" format="hms" :range="true" @change="timeChangeHmsDouble" />
        <br><br><br><br><br>
    </div>
</template>

<script>
    export default {
        name: "PickerTimeView",
        data() {
            return {
                timeHm: '08:09',
                timeHms: '',
                timeHmDouble: '',
                timeHmsDouble: '08:09:25-13:14:52',
            }
        },
        methods: {
            timeChangeHm(time) {
                console.log('选择的时分::::', time);
                this.timeHm=time;
            },
            timeChangeHms(time) {
                console.log('选择的时分秒::::', time);
                this.timeHms=time;
            },
            timeChangeHmDouble(time) {
                console.log('选择的时分秒::::', time);
                this.time1=time;
            },
            timeChangeHmsDouble(time) {
                console.log('选择的时分秒::::', time);
                this.time2=time;
            }
        }
    }
</script>

<style lang="stylus" scoped>

.component-padding
    padding-bottom 200px !important
    width 240px

</style>