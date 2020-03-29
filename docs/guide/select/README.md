### Select 下拉选择器


<template>
    <section class="select-display-panel">
        <h1>Select组件</h1>
        <section class="row">
            <section>
                <h5>禁选状态</h5>
                <Select  width="300" @change="testClick" :selectdata="dataSelect1"  :placeholder="'请选择'" />
            </section>
            <section>
                <h5>主副双行-默认选中-单选</h5>
                <Select  width="300" v-model="model"   @change="testClick"  :selectdata="dataSelect2"  :placeholder="'请选择'" />
            </section>
        </section>
        <section class="row">
            <section>
                <h5>头像-主副双行-单选-圆角</h5>
                <Select  width="300"  radius  @change="testClick"  :selectdata="dataSelect3"  :placeholder="'请选择'" />
            </section>
            <section>
                <h5>带标签-单选</h5>
                <Select  width="300" caption="所属名称"  @change="testClick"   :selectdata="dataSelect4"  :placeholder="'请选择'" />
            </section>
        </section>
        <section class="row">
            <section>
                <h5>带分类多选</h5>
                <Select  width="300"  :selectdata="dataSelect5" @confirm="testConfirm" @cancel="testCancel" @change="testClick"   :placeholder="'请选择'" multiple/>
            </section>
        </section>
        <section class="row">
            <section>
                <h5>带标题多选</h5>
                <Select  width="300"   :selectdata="dataSelect6" @confirm="testConfirm" @cancel="testCancel" @change="testClick"   :placeholder="'请选择'" multiple />
            </section>
            <section>
                <h5>头像单行多选</h5>
                <Select  width="300"  v-model="model2" :selectdata="dataSelect7" @confirm="testConfirm" @cancel="testCancel" @change="testClick"   :placeholder="'请选择'" multiple />
            </section>
        </section>
        <section class="row">
            <section>
                <h5>头像带分类单行多选</h5>
                <Select  width="300"  :selectdata="dataSelect8" @confirm="testConfirm" @cancel="testCancel" @change="testClick"   :placeholder="'请选择'" multiple />
            </section>
        </section>
    </section>
</template>

<script>
    const src ='http://47.95.122.141:8200/persagy_ui_kit/images/defaultImage.png'
    export default {
        name: 'SelectView',
        data() {
            return {
                model:'test1',
                model2: ['test1','test2'],
                dataSelect1:[],
                dataSelect2:[
                    {selected:false, id:'test1', name: '测试文字溢出测试文字溢出测试文字溢测试文字溢出测试文字溢出测试文字溢测试文字溢出测试文字溢出测试文字溢',sub:'副标题' },
                    {selected:false, id:'test2', name: '单平米',sub:'副标题' },
                    {selected:false, id:'test3', name: '下级分项',sub:'副标题' },
                    {selected:false, id:'test4', name: '滑动平均滑动平均',sub:'副标题'}
                ],
                dataSelect3: [
                    {selected:false, id:'test1', name: '测试文字溢出测试文字溢出测试文字溢出测试文字溢出测试文字溢出测试文字溢出测试文字溢出测试文字溢出', sub: 'hello111' ,src:src},
                    {selected:false, id:'test2', name: '单平米', sub: 'hola111',src:src},
                    {selected:false, id:'test3', name: '下级分项',sub: 'bonjour', src:src,divider:true},
                    {selected:false, id:'test4', name: '滑动平均滑动平均', sub:'hi',src:src}
                ],
                dataSelect4:[
                    {selected:false, id:'test1', name: '测试文字溢出测试文字溢出测试文字溢出测试文字溢出测试文字溢出测试文字溢出测试文字溢出测试文字溢出',label:"高级"},
                    {selected:false, id:'test2', name: '单平米', label:"中级"},
                    {selected:false, id:'test3', name: '下级分项', label:"初级"},
                    {selected:false, id:'test4', name: '4444444', label:"低级"},
                    {selected:false, id:'test5', name: '555555555', label:"低级"},
                    {selected:false, id:'test6', name: '66666666666', label:"低级"},
                    {selected:false, id:'test7', name: '6666', label:"低级"},
                    {selected:false, id:'test8', name: '6', label:"低级"}
                ],
                dataSelect5:[
                    {selected:false, id:'test1', name: '测试文字溢出测试文字溢出测试文字溢出测试文字溢出测试文字溢出测试文字溢出测试文字溢出测试文字溢出', label:"高级"},
                    {selected:false, id:'test2', name: '单平米', label:"中级"},
                    {selected:false, id:'test3', name: '下级分项',  label:"初级",divider:true},
                    {selected:false, id:'test4', name: '滑动平均滑动平均',label:"低级"},
                    {selected:false, id:'test5', name: '滑动平均滑动平均',label:"低级"}
                ],
                dataSelect6:[
                    {selected:false, id:'test1', name: '测试文字溢出测试文字溢出测试文字溢出测试文字溢出测试文字溢出测试文字溢出测试文字溢出测试文字溢出',label:"高级"},
                    {selected:false, id:'test2', name: '单平米', label:"中级"},
                    {selected:false, id:'test3', classify:'分类一'},
                    {selected:false, id:'test4', name: '下级分项', label:"初级"},
                    {selected:false, id:'test5', classify:'分类二'},
                    {selected:false, id:'test6', name: '滑动平均滑动平均',label:"低级"},
                    {selected:false, id:'test7', name: '滑动平均滑动平均',label:"低级"}
                ],
                dataSelect7: [
                    {selected:false, id:'test1', name: '测试文字溢出测试文字溢出测试文字溢出测试文字溢出测试文字溢出测试文字溢出测试文字溢出测试文字溢出',src:src, sub:'测试文字溢出测试文字溢出测试文字溢出测试文字溢出测试文字溢出测试文字溢出测试文字溢出测试文字溢出'},
                    {selected:false, id:'test2', name: '总量2222',src:src, sub:'测试文字溢出测试文字溢出测试文字溢出测试文字溢出测试文字溢出测试文字溢出测试文字溢出测试文字溢出'},
                    {selected:false, id:'test3', name: '总量3333',src:src,sub:'测试文字溢出测试文字溢出测试文字溢出测试文字溢出测试文字溢出测试文字溢出测试文字溢出测试文字溢出'},
                ],
                dataSelect8: [
                    {selected:false, id:'test1', name: '测试文字溢出测试文字溢出测试文字溢出测试文字溢出测试文字溢出测试文字溢出测试文字溢出测试文字溢出',src:src},
                    {selected:false, id:'test2', name: '总量2222',src:src },
                    {selected:false, id:'test3', name: '总量3333',src:src},
                ],
            }
        },
        watch:{
            model(n,o){

            }
        },

        methods:{
            testClick (data) {
            },
            testConfirm (data) {
            },
            testCancel () {
            }
        }
    }
</script>

<style lang="stylus" scoped>
    .select-display-panel
        padding 60px
        width 800px
        h1
            margin-bottom 40px
        .row
            display flex
            justify-content space-between
            align-items center
            margin-bottom 40px
            section
                h5
                    margin-bottom 20px

</style>



```vue

<template>
    <section class="select-display-panel">
        <h1>Select组件</h1>
        <section class="row">
            <section>
                <h5>禁选状态</h5>
                <Select  width="300" @change="testClick" :selectdata="dataSelect1"  :placeholder="'请选择'" />
            </section>
            <section>
                <h5>主副双行-默认选中-单选</h5>
                <Select  width="300" v-model="model"   @change="testClick"  :selectdata="dataSelect2"  :placeholder="'请选择'" />
            </section>
        </section>
        <section class="row">
            <section>
                <h5>头像-主副双行-单选-圆角</h5>
                <Select  width="300"  radius  @change="testClick"  :selectdata="dataSelect3"  :placeholder="'请选择'" />
            </section>
            <section>
                <h5>带标签-单选</h5>
                <Select  width="300" caption="所属名称"  @change="testClick"   :selectdata="dataSelect4"  :placeholder="'请选择'" />
            </section>
        </section>
        <section class="row">
            <section>
                <h5>带分类多选</h5>
                <Select  width="300"  :selectdata="dataSelect5" @confirm="testConfirm" @cancel="testCancel" @change="testClick"   :placeholder="'请选择'" multiple/>
            </section>
        </section>
        <section class="row">
            <section>
                <h5>带标题多选</h5>
                <Select  width="300"   :selectdata="dataSelect6" @confirm="testConfirm" @cancel="testCancel" @change="testClick"   :placeholder="'请选择'" multiple />
            </section>
            <section>
                <h5>头像单行多选</h5>
                <Select  width="300"  v-model="model2" :selectdata="dataSelect7" @confirm="testConfirm" @cancel="testCancel" @change="testClick"   :placeholder="'请选择'" multiple />
            </section>
        </section>
        <section class="row">
            <section>
                <h5>头像带分类单行多选</h5>
                <Select  width="300"  :selectdata="dataSelect8" @confirm="testConfirm" @cancel="testCancel" @change="testClick"   :placeholder="'请选择'" multiple />
            </section>
        </section>
    </section>
</template>

<script>
    const src ='http://47.95.122.141:8200/persagy_ui_kit/images/defaultImage.png'
    export default {
        name: 'SelectView',
        data() {
            return {
                model:'test1',
                model2: ['test1','test2'],
                dataSelect1:[],
                dataSelect2:[
                    {selected:false, id:'test1', name: '测试文字溢出测试文字溢出测试文字溢测试文字溢出测试文字溢出测试文字溢测试文字溢出测试文字溢出测试文字溢',sub:'副标题' },
                    {selected:false, id:'test2', name: '单平米',sub:'副标题' },
                    {selected:false, id:'test3', name: '下级分项',sub:'副标题' },
                    {selected:false, id:'test4', name: '滑动平均滑动平均',sub:'副标题'}
                ],
                dataSelect3: [
                    {selected:false, id:'test1', name: '测试文字溢出测试文字溢出测试文字溢出测试文字溢出测试文字溢出测试文字溢出测试文字溢出测试文字溢出', sub: 'hello111' ,src:src},
                    {selected:false, id:'test2', name: '单平米', sub: 'hola111',src:src},
                    {selected:false, id:'test3', name: '下级分项',sub: 'bonjour', src:src,divider:true},
                    {selected:false, id:'test4', name: '滑动平均滑动平均', sub:'hi',src:src}
                ],
                dataSelect4:[
                    {selected:false, id:'test1', name: '测试文字溢出测试文字溢出测试文字溢出测试文字溢出测试文字溢出测试文字溢出测试文字溢出测试文字溢出',label:"高级"},
                    {selected:false, id:'test2', name: '单平米', label:"中级"},
                    {selected:false, id:'test3', name: '下级分项', label:"初级"},
                    {selected:false, id:'test4', name: '4444444', label:"低级"},
                    {selected:false, id:'test5', name: '555555555', label:"低级"},
                    {selected:false, id:'test6', name: '66666666666', label:"低级"},
                    {selected:false, id:'test7', name: '6666', label:"低级"},
                    {selected:false, id:'test8', name: '6', label:"低级"}
                ],
                dataSelect5:[
                    {selected:false, id:'test1', name: '测试文字溢出测试文字溢出测试文字溢出测试文字溢出测试文字溢出测试文字溢出测试文字溢出测试文字溢出', label:"高级"},
                    {selected:false, id:'test2', name: '单平米', label:"中级"},
                    {selected:false, id:'test3', name: '下级分项',  label:"初级",divider:true},
                    {selected:false, id:'test4', name: '滑动平均滑动平均',label:"低级"},
                    {selected:false, id:'test5', name: '滑动平均滑动平均',label:"低级"}
                ],
                dataSelect6:[
                    {selected:false, id:'test1', name: '测试文字溢出测试文字溢出测试文字溢出测试文字溢出测试文字溢出测试文字溢出测试文字溢出测试文字溢出',label:"高级"},
                    {selected:false, id:'test2', name: '单平米', label:"中级"},
                    {selected:false, id:'test3', classify:'分类一'},
                    {selected:false, id:'test4', name: '下级分项', label:"初级"},
                    {selected:false, id:'test5', classify:'分类二'},
                    {selected:false, id:'test6', name: '滑动平均滑动平均',label:"低级"},
                    {selected:false, id:'test7', name: '滑动平均滑动平均',label:"低级"}
                ],
                dataSelect7: [
                    {selected:false, id:'test1', name: '测试文字溢出测试文字溢出测试文字溢出测试文字溢出测试文字溢出测试文字溢出测试文字溢出测试文字溢出',src:src, sub:'测试文字溢出测试文字溢出测试文字溢出测试文字溢出测试文字溢出测试文字溢出测试文字溢出测试文字溢出'},
                    {selected:false, id:'test2', name: '总量2222',src:src, sub:'测试文字溢出测试文字溢出测试文字溢出测试文字溢出测试文字溢出测试文字溢出测试文字溢出测试文字溢出'},
                    {selected:false, id:'test3', name: '总量3333',src:src,sub:'测试文字溢出测试文字溢出测试文字溢出测试文字溢出测试文字溢出测试文字溢出测试文字溢出测试文字溢出'},
                ],
                dataSelect8: [
                    {selected:false, id:'test1', name: '测试文字溢出测试文字溢出测试文字溢出测试文字溢出测试文字溢出测试文字溢出测试文字溢出测试文字溢出',src:src},
                    {selected:false, id:'test2', name: '总量2222',src:src },
                    {selected:false, id:'test3', name: '总量3333',src:src},
                ],
            }
        },
        watch:{
            model(n,o){

            }
        },

        methods:{
            testClick (data) {
            },
            testConfirm (data) {
            },
            testCancel () {
            }
        }
    }
</script>


```

### Attributes

| 参数     |      说明      | 类型    |  默认值  | 必须    |
| -------  |     ----       | ------  | ------- | ------ |
| data     |  下拉框的数据   |   Array |   []    |  Yes     |
| v-model  |    绑定的默认值 | String/Number/Array|   ''    |  Yes     |
| width    |     宽度       | String/Numner | '200' | no     |
| caption  |     标题       | String  | ''    | no     | 
| radius   |     圆角       | Boolean | false | no     | 
| disabled |     禁用       | Boolean | false | no     | 
| change   |     点击       | function| ()=>{}| no     | 
| cancel   |     取消       | function| ()=>{}| no     | 
| confirm  |     确认       | function| ()=>{}| no     | 
 