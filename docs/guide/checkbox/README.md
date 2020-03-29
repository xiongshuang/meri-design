### Checkbox 复选框

<template>
    <div class="checkbox">
        <Checkbox :checked="checked1" @change="handleChange" />
        <Checkbox :checked="checked1" :disabled="true"/>
        <Checkbox :checked="checked2"/>
        <Checkbox :checked="checked2" :disabled="true"/>
        <Checkbox :checked="checked3"/>
        <Checkbox :checked="checked3" :disabled="true"/>
        <div style="margin: 12px"></div>
        <Checkbox :checked="checked1" @change="handleChange">战三</Checkbox>
        <Checkbox :checked="checked1" :disabled="true">战三</Checkbox>
        <Checkbox :checked="checked2">卢俊义</Checkbox>
        <Checkbox :checked="checked2" :disabled="true">卢俊义</Checkbox>
        <Checkbox :checked="checked3">素材水果</Checkbox>
        <Checkbox :checked="checked3" :disabled="true">素材水果</Checkbox>
    </div>
</template>

<script>
    export default {
        name: "CheckboxView",
        data() {
            return {
                checked1: 'checked', // checked-选中 uncheck-未选中 notNull-半选
                checked2: 'uncheck',
                checked3: 'notNull',
            }
        },
        methods: {
            handleChange(v) {
                this.checked1=v;
            }
        }
    }
</script>

<style lang="stylus" scoped>
.checkbox
    padding 16px
    font-size 0

</style>
 

```vue

<template>
    <div class="checkbox">
        <Checkbox :checked="checked1" @change="handleChange" />
        <Checkbox :checked="checked1" :disabled="true"/>
        <Checkbox :checked="checked2"/>
        <Checkbox :checked="checked2" :disabled="true"/>
        <Checkbox :checked="checked3"/>
        <Checkbox :checked="checked3" :disabled="true"/>
        <div style="margin: 12px"></div>
        <Checkbox :checked="checked1" @change="handleChange">战三</Checkbox>
        <Checkbox :checked="checked1" :disabled="true">战三</Checkbox>
        <Checkbox :checked="checked2">卢俊义</Checkbox>
        <Checkbox :checked="checked2" :disabled="true">卢俊义</Checkbox>
        <Checkbox :checked="checked3">素材水果</Checkbox>
        <Checkbox :checked="checked3" :disabled="true">素材水果</Checkbox>
    </div>
</template>

<script>
    export default {
        name: "CheckboxView",
        data() {
            return {
                checked1: 'checked', // checked-选中 uncheck-未选中 notNull-半选
                checked2: 'uncheck',
                checked3: 'notNull',
            }
        },
        methods: {
            handleChange(v) {
                this.checked1=v;
            }
        }
    }
</script>

```


### Attributes

| 参数     | 说明    | 类型    | 默认值   | 必须  |
| ------- | ----    | ------  | ------- | ------|
| checked    | 选中状态，可选值[checked/uncheck/notNull'] | String | ''     | no     |
| disabled    | 是否禁用 | Boolean | false    | no     |
| slot    | 插槽值 | String | ''    | no     |
| change   | 改变状态触发事件 | Function | ''| no     |
