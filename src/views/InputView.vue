<template>
    <div class="input-view">
        <h3>1.普通输入框</h3>
        <div class="input-view-item">
            <Input v-model="inputVal" placeholder="请搜索" @focus="inputFocus" @blur="inputBlur" @input="boxInput" name="persager" :max-length="8"/>
        </div>
        <h3>2.带icon</h3>
        <div class="input-view-item">
            <Input iconType="search" v-model="inputVal2" @pressEnter="pressEnter"/>
        </div>
        <h3>3.禁用</h3>
        <div class="input-view-item">
            <Input v-model="inputVal4" :disabled="true"/>
        </div>
        <h3>4.报错</h3>
        <div class="input-view-item">
            <Input v-model="inputVal5" :error-info="errorMsg"/>
        </div>
        <h3>5.左按钮</h3>
        <div class="input-view-item">
            <Input v-model="inputVal6" :left-button="leftButton" @blur="inputBlur" @pressEnter="pressEnter"/>
        </div>
        <h3>6.右按钮</h3>
        <div class="input-view-item">
            <Input v-model="inputVal7" :right-button="rightButton" @blur="inputBlur" @pressEnter="pressEnter"/>
        </div>
        <h3>7.输入框 (自定义宽度)</h3>
        <div class="input-view-item">
            <Input v-model="inputVal7" @blur="inputBlur" @pressEnter="pressEnter" :width="300" iconType="search"/>
        </div>
        <h3>8.type=textarea</h3>
        <div class="input-view-item">
            <Input v-model="inputVal8" type="textarea" @blur="inputBlur" @pressEnter="pressEnter" @focus="inputFocus" :rows="6" :autofocus="false" name="persagy-aera" :max-length="10"/>
        </div>
        <h3>9.type=textarea (禁用)</h3>
        <div class="input-view-item">
            <Input v-model="inputVal9" type="textarea" @blur="inputBlur" @pressEnter="pressEnter" @focus="inputFocus" :disabled="true"/>
        </div>
        <h3>10.type=textarea (报错)</h3>
        <div class="input-view-item">
            <Input v-model="inputVal10" type="textarea" @blur="inputBlur" @pressEnter="pressEnter" @focus="inputFocus" :error-info="errorMsg"/>
        </div>
        <h3>11.type=textarea （自定义宽度）</h3>
        <div class="input-view-item">
            <Input v-model="inputVal11" type="textarea" @blur="inputBlur" @pressEnter="pressEnter" @focus="inputFocus" :width="400"/>
        </div>
    </div>
</template>

<script>
    export default {
        name: "InputView",
        data() {
            return {
                leftButton: [{
                    id: '1',
                    name: 'https://',
                    checked: 'checked'
                }],
                rightButton: [{
                    id: '1',
                    name: 'https://',
                    checked: 'checked'
                }],
                errorMsg: '密码错误！',
                inputVal: '',
                inputVal2: '',
                inputVal4: '',
                inputVal5: '',
                inputVal6: '',
                inputVal7: '',
                inputVal8: '',
                inputVal9: '',
                inputVal10: '',
                inputVal11: ''
            }
        },
        methods: {
            inputFocus (e) {
                console.log('focus', e);
            },
            inputBlur (e) {
                console.log('blur', e);
            },
            boxInput (e) {
                console.log('input', e);
            },
            pressEnter (e) {
                console.log('pressEnter', e);
            }
        }
    }
</script>

<style lang="stylus" scoped>
    .input-view
        padding 16px
        h3
            margin 12px
        .input-view-item
            font-size 0

</style>
