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

        <!--
        <Modal
                :show="true"
                title="弹窗提示"
                :iconLoading="true"
                mode="default"
                @close="modalClose"
                @confirm="modalConfirm"
        >
            <div style="font-size: 20px; width: 600px">
                <PickerMonth :date="dateDouble" :quickSwitch="true" :range="true" @change="dateChangeDouble" />
                123
                <br><br><br><br><br><br><br><br>
                <br><br><br><br><br><br><br><br>
                <br><br><br><br><br><br><br><br>
                <br><br><br><br><br><br><br><br>
                <br><br><br><br><br><br><br><br>
                456
            </div>
        </Modal>
        -->

        <Drawer
                :show="true"
                title="抽屉"
                :loading="false"
                :focus="true"
        >
            <div style="width: 500px;font-size: 20px">
                123
                456
                789
                <div style="font-size: 16px;" :style="{height: height+'px'}">
                    <PickerMonth :date="dateDouble" :quickSwitch="true" :range="true" @change="dateChangeDouble" />
                    <br><br><br><br><br><br><br><br>
                    <br><br><br><br><br><br><br><br>
                    <br><br><br><br><br><br><br><br>
                    <br><br><br><br><br><br><br><br>
                    <br><br><br><br><br><br><br><br>
                    <br><br><br><br><br><br><br><br>
                    <br><br><br><br><br><br><br><br>
                    <br><br><br><br><br><br><br><br>
                    <br><br><br><br><br><br><br><br>
                    <br><br><br><br><br><br><br><br>
                    <br><br><br><br><br><br><br><br>
                    <br><br><br><br><br><br><br><br>
                    <br><br><br><br><br><br><br><br>
                    <br><br><br><br><br><br><br><br>
                    <br><br><br><br><br><br><br><br>
                    <br><br><br><br><br><br><br><br>
                    <br><br><br><br><br><br><br><br>
                    <br><br><br><br><br><br><br><br>
                </div>
            </div>
        </Drawer>
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
            },


            modalClose() {
                this.modalStatusDefault=false;
                this.modalStatusFull=false;
                this.modalStatusSmall=false;
            },
            modalConfirm() {
                console.log('alertConfirm')
            }
        }
    }
</script>

<style lang="stylus" scoped>

.component-padding
    padding-bottom 200px !important
    width 240px

</style>