### DropDownButton 按钮

<template>
  <div class="split-button-view">
    <div class="component component-padding">
      <h1>Button组件</h1>
      <div class="btn">
        <h2>size=large</h2>
        <DropDownButton @click="tap" type="default" size="large" drop-down-type="split-drop" interactive="tap" :drop-down-list="dropDownList" v-model="value">Click me</DropDownButton>
        <DropDownButton @click="tap" type="primary" size="large" drop-down-type="split-drop" interactive="tap" :drop-down-list="dropDownList" v-model="value">Click me</DropDownButton>
        <DropDownButton @click="tap" type="default" size="large" drop-down-type="split-drop" interactive="hover" :drop-down-list="dropDownList" v-model="value">Hover me</DropDownButton>
        <DropDownButton @click="tap" type="primary" size="large" drop-down-type="split-drop" interactive="hover" :drop-down-list="dropDownList" v-model="value">Hover me</DropDownButton>
        <DropDownButton @click="tap" type="default" size="large" drop-down-type="drop" interactive="tap" :drop-down-list="dropDownList" v-model="value">Click me</DropDownButton>
        <DropDownButton @click="tap" type="primary" size="large" drop-down-type="drop" interactive="tap" :drop-down-list="dropDownList" v-model="value">Click me</DropDownButton>
        <DropDownButton @click="tap" type="default" size="large" drop-down-type="drop" interactive="hover" :drop-down-list="dropDownList" v-model="value">Hover me</DropDownButton>
        <DropDownButton @click="tap" type="primary" size="large" drop-down-type="drop" interactive="hover" :drop-down-list="dropDownList" v-model="value">Hover me</DropDownButton>
        <DropDownButton @click="tap" type="default" size="large" drop-down-type="default-drop" interactive="tap" :drop-down-list="dropDownList" v-model="value">Click me</DropDownButton>
        <DropDownButton @click="tap" type="default" size="large" drop-down-type="default-drop" interactive="hover" :drop-down-list="dropDownList" v-model="value">Hover me</DropDownButton>
        <DropDownButton @click="tap" type="primary" size="large" drop-down-type="default-drop" interactive="hover" :drop-down-list="dropDownList" v-model="value" :disabled="true">Hover me</DropDownButton>
      </div>
      <div class="btn">
        <h2>size=medium</h2>
        <DropDownButton @click="tap" type="default" drop-down-type="split-drop" interactive="tap" :drop-down-list="dropDownList" v-model="value">Click me</DropDownButton>
        <DropDownButton @click="tap" type="primary" drop-down-type="split-drop" interactive="tap" :drop-down-list="dropDownList" v-model="value">Click me</DropDownButton>
        <DropDownButton @click="tap" type="default" drop-down-type="split-drop" interactive="hover" :drop-down-list="dropDownList" v-model="value">Hover me</DropDownButton>
        <DropDownButton @click="tap" type="primary" drop-down-type="split-drop" interactive="hover" :drop-down-list="dropDownList" v-model="value">Hover me</DropDownButton>
        <DropDownButton @click="tap" type="default" drop-down-type="drop" interactive="tap" :drop-down-list="dropDownList" v-model="value">Click me</DropDownButton>
        <DropDownButton @click="tap" type="primary" drop-down-type="drop" interactive="tap" :drop-down-list="dropDownList" v-model="value">Click me</DropDownButton>
        <DropDownButton @click="tap" type="default" drop-down-type="drop" interactive="hover" :drop-down-list="dropDownList" v-model="value">Hover me</DropDownButton>
        <DropDownButton @click="tap" type="primary" drop-down-type="drop" interactive="hover" :drop-down-list="dropDownList" v-model="value">Hover me</DropDownButton>
        <DropDownButton @click="tap" type="default" drop-down-type="default-drop" interactive="tap" :drop-down-list="dropDownList" v-model="value">Click me</DropDownButton>
        <DropDownButton @click="tap" type="default" drop-down-type="default-drop" interactive="hover" :drop-down-list="dropDownList" v-model="value">Hover me</DropDownButton>
        <DropDownButton @click="tap" type="primary" drop-down-type="default-drop" interactive="hover" :drop-down-list="dropDownList" v-model="value" :disabled="true">Hover me</DropDownButton>
      </div>
      <div class="btn">
        <h2>size=small</h2>
        <DropDownButton @click="tap" type="default" size="small" drop-down-type="split-drop" interactive="tap" :drop-down-list="dropDownList" v-model="value">Click me</DropDownButton>
        <DropDownButton @click="tap" type="primary" size="small" drop-down-type="split-drop" interactive="tap" :drop-down-list="dropDownList" v-model="value">Click me</DropDownButton>
        <DropDownButton @click="tap" type="default" size="small" drop-down-type="split-drop" interactive="hover" :drop-down-list="dropDownList" v-model="value">Hover me</DropDownButton>
        <DropDownButton @click="tap" type="primary" size="small" drop-down-type="split-drop" interactive="hover" :drop-down-list="dropDownList" v-model="value">Hover me</DropDownButton>
        <DropDownButton @click="tap" type="default" size="small" drop-down-type="drop" interactive="tap" :drop-down-list="dropDownList" v-model="value">Click me</DropDownButton>
        <DropDownButton @click="tap" type="primary" size="small" drop-down-type="drop" interactive="tap" :drop-down-list="dropDownList" v-model="value">Click me</DropDownButton>
        <DropDownButton @click="tap" type="default" size="small" drop-down-type="drop" interactive="hover" :drop-down-list="dropDownList" v-model="value">Hover me</DropDownButton>
        <DropDownButton @click="tap" type="primary" size="small" drop-down-type="drop" interactive="hover" :drop-down-list="dropDownList" v-model="value">Hover me</DropDownButton>
        <DropDownButton @click="tap" type="default" size="small" drop-down-type="default-drop" interactive="tap" :drop-down-list="dropDownList" v-model="value">Click me</DropDownButton>
        <DropDownButton @click="tap" type="default" size="small" drop-down-type="default-drop" interactive="hover" :drop-down-list="dropDownList" v-model="value">Hover me</DropDownButton>
        <DropDownButton @click="tap" type="primary" size="small" drop-down-type="default-drop" interactive="hover" :drop-down-list="dropDownList" :disabled="true">Hover me</DropDownButton>
      </div>
    </div>
  </div>
</template>

<script>
    export default {
        name: "DropDownButtonView",
        data () {
            return {
                value: '',
                dropDownList: [
                    {
                        id: '1',
                        name: 'option1',
                        disabled: false
                    },
                    {
                        id: '2',
                        name: 'option2',
                        disabled: false
                    },
                    {
                        id: '3',
                        name: 'option3',
                        disabled: true
                    }
                ]
            }
        },
        watch: {
            value (o, n) {
                console.log(o)
            }
        },
        methods: {
            tap () {
                console.log('click')
            }
        }
    }
</script>

```vue

<template>
  <div class="split-button-view">
    <div class="component component-padding">
      <h1>Button组件</h1>
      <div class="btn">
        <h2>size=large</h2>
        <DropDownButton @click="tap" type="default" size="large" drop-down-type="split-drop" interactive="tap" :drop-down-list="dropDownList" v-model="value">Click me</DropDownButton>
        <DropDownButton @click="tap" type="primary" size="large" drop-down-type="split-drop" interactive="tap" :drop-down-list="dropDownList" v-model="value">Click me</DropDownButton>
        <DropDownButton @click="tap" type="default" size="large" drop-down-type="split-drop" interactive="hover" :drop-down-list="dropDownList" v-model="value">Hover me</DropDownButton>
        <DropDownButton @click="tap" type="primary" size="large" drop-down-type="split-drop" interactive="hover" :drop-down-list="dropDownList" v-model="value">Hover me</DropDownButton>
        <DropDownButton @click="tap" type="default" size="large" drop-down-type="drop" interactive="tap" :drop-down-list="dropDownList" v-model="value">Click me</DropDownButton>
        <DropDownButton @click="tap" type="primary" size="large" drop-down-type="drop" interactive="tap" :drop-down-list="dropDownList" v-model="value">Click me</DropDownButton>
        <DropDownButton @click="tap" type="default" size="large" drop-down-type="drop" interactive="hover" :drop-down-list="dropDownList" v-model="value">Hover me</DropDownButton>
        <DropDownButton @click="tap" type="primary" size="large" drop-down-type="drop" interactive="hover" :drop-down-list="dropDownList" v-model="value">Hover me</DropDownButton>
        <DropDownButton @click="tap" type="default" size="large" drop-down-type="default-drop" interactive="tap" :drop-down-list="dropDownList" v-model="value">Click me</DropDownButton>
        <DropDownButton @click="tap" type="default" size="large" drop-down-type="default-drop" interactive="hover" :drop-down-list="dropDownList" v-model="value">Hover me</DropDownButton>
        <DropDownButton @click="tap" type="primary" size="large" drop-down-type="default-drop" interactive="hover" :drop-down-list="dropDownList" v-model="value" :disabled="true">Hover me</DropDownButton>
      </div>
      <div class="btn">
        <h2>size=medium</h2>
        <DropDownButton @click="tap" type="default" drop-down-type="split-drop" interactive="tap" :drop-down-list="dropDownList" v-model="value">Click me</DropDownButton>
        <DropDownButton @click="tap" type="primary" drop-down-type="split-drop" interactive="tap" :drop-down-list="dropDownList" v-model="value">Click me</DropDownButton>
        <DropDownButton @click="tap" type="default" drop-down-type="split-drop" interactive="hover" :drop-down-list="dropDownList" v-model="value">Hover me</DropDownButton>
        <DropDownButton @click="tap" type="primary" drop-down-type="split-drop" interactive="hover" :drop-down-list="dropDownList" v-model="value">Hover me</DropDownButton>
        <DropDownButton @click="tap" type="default" drop-down-type="drop" interactive="tap" :drop-down-list="dropDownList" v-model="value">Click me</DropDownButton>
        <DropDownButton @click="tap" type="primary" drop-down-type="drop" interactive="tap" :drop-down-list="dropDownList" v-model="value">Click me</DropDownButton>
        <DropDownButton @click="tap" type="default" drop-down-type="drop" interactive="hover" :drop-down-list="dropDownList" v-model="value">Hover me</DropDownButton>
        <DropDownButton @click="tap" type="primary" drop-down-type="drop" interactive="hover" :drop-down-list="dropDownList" v-model="value">Hover me</DropDownButton>
        <DropDownButton @click="tap" type="default" drop-down-type="default-drop" interactive="tap" :drop-down-list="dropDownList" v-model="value">Click me</DropDownButton>
        <DropDownButton @click="tap" type="default" drop-down-type="default-drop" interactive="hover" :drop-down-list="dropDownList" v-model="value">Hover me</DropDownButton>
        <DropDownButton @click="tap" type="primary" drop-down-type="default-drop" interactive="hover" :drop-down-list="dropDownList" v-model="value" :disabled="true">Hover me</DropDownButton>
      </div>
      <div class="btn">
        <h2>size=small</h2>
        <DropDownButton @click="tap" type="default" size="small" drop-down-type="split-drop" interactive="tap" :drop-down-list="dropDownList" v-model="value">Click me</DropDownButton>
        <DropDownButton @click="tap" type="primary" size="small" drop-down-type="split-drop" interactive="tap" :drop-down-list="dropDownList" v-model="value">Click me</DropDownButton>
        <DropDownButton @click="tap" type="default" size="small" drop-down-type="split-drop" interactive="hover" :drop-down-list="dropDownList" v-model="value">Hover me</DropDownButton>
        <DropDownButton @click="tap" type="primary" size="small" drop-down-type="split-drop" interactive="hover" :drop-down-list="dropDownList" v-model="value">Hover me</DropDownButton>
        <DropDownButton @click="tap" type="default" size="small" drop-down-type="drop" interactive="tap" :drop-down-list="dropDownList" v-model="value">Click me</DropDownButton>
        <DropDownButton @click="tap" type="primary" size="small" drop-down-type="drop" interactive="tap" :drop-down-list="dropDownList" v-model="value">Click me</DropDownButton>
        <DropDownButton @click="tap" type="default" size="small" drop-down-type="drop" interactive="hover" :drop-down-list="dropDownList" v-model="value">Hover me</DropDownButton>
        <DropDownButton @click="tap" type="primary" size="small" drop-down-type="drop" interactive="hover" :drop-down-list="dropDownList" v-model="value">Hover me</DropDownButton>
        <DropDownButton @click="tap" type="default" size="small" drop-down-type="default-drop" interactive="tap" :drop-down-list="dropDownList" v-model="value">Click me</DropDownButton>
        <DropDownButton @click="tap" type="default" size="small" drop-down-type="default-drop" interactive="hover" :drop-down-list="dropDownList" v-model="value">Hover me</DropDownButton>
        <DropDownButton @click="tap" type="primary" size="small" drop-down-type="default-drop" interactive="hover" :drop-down-list="dropDownList" :disabled="true">Hover me</DropDownButton>
      </div>
    </div>
  </div>
</template>

<script>
    export default {
        name: "DropDownButtonView",
        data () {
            return {
                value: '',
                dropDownList: [
                    {
                        id: '1',
                        name: 'option1',
                        disabled: false
                    },
                    {
                        id: '2',
                        name: 'option2',
                        disabled: false
                    },
                    {
                        id: '3',
                        name: 'option3',
                        disabled: true
                    }
                ]
            }
        },
        watch: {
            value (o, n) {
                console.log(o)
            }
        },
        methods: {
            tap () {
                console.log('click')
            }
        }
    }
</script>

```

### Attributes

| 参数     | 说明  | 类型    | 默认值  | 必须    |
| ------- | ---- | ------ | ------- | ------ |
| type    | 类型（可选值：default/primary） | String | default | Yes     |
| size   | 大小（可选值：large/medium/small） | String | medium | no     |
| interactive   | 拉下列表方式（可选值：hover --鼠标移上去, tap --点击） | String | hover | no     |
| v-model   | 列表选中值 | 无 | '' | no   |
| :text.sync   | 按钮文本 | String | '' | no   |
| disabled   | 是否禁用 | Boolean | false | no   |
| dropDownType   | 下拉列表类型（可选值：drop --普通下拉 split-drop --分割按钮下拉按钮, default-drop --去边框按钮下拉） | String | default | no   |
| dropDownList   | 下拉列表数据 | Array | [] | no   |
| transfer   | 可选值body、parent父级、p-modal-content当前触发器的某个class类名 | String | parent | no   |
