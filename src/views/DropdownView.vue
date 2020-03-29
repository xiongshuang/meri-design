<template>
    <div class="Button">
        <div class="component component-padding">
            <h1>Dropdown组件</h1>
            <!--
                组件说明:
                    参数   说明           默认值   类型   是否必须   可选值
                    v-model  当前绑定的值 --   String false
                    dataSelect 下拉菜单数据列表  [] Array true
                    position 下拉菜单位置  'left' String false  【'left', 'right'】
            -->
            <div>
                <Dropdown v-model="selVal" :data="dataSelect">
                    <span class="text">{{selText}}</span>
                </Dropdown>
            </div>
            <div style="padding-right: 50px;text-align: right">
                <Dropdown v-model="selVal" :data="dataSelect">
                    <span class="text">{{selText}}</span>
                </Dropdown>
            </div>

            <div>
                <!--transfer="default"-->
                <Dropdown v-model="selVal" :data="dataSelect">
                    <span class="text">{{selText}}</span>
                </Dropdown>
            </div>
            <div style="padding-right: 10px;text-align: right">
                <!--transfer="default"-->
                <Dropdown v-model="selVal" :data="dataSelect">
                    <span class="text">{{selText}}</span>
                </Dropdown>
            </div>

            <div style="font-size: 16px;">
                <br><br><br><br><br><br><br><br>
            </div>
            <div style="margin-left: 200px">
                <Dropdown v-model="selVal2" :data="dataSelect2">
                    <span class="avatar">
                        <img src="http://upload.jianshu.io/users/upload_avatars/11576163/f8c67791-cf2f-42ef-86dc-68a974830f8f.png?imageMogr2/auto-orient/strip|imageView2/1/w/120/h/120" alt="">
                    </span>
                </Dropdown>
            </div>
            <Button type="default" @click="openModal">打开弹窗</Button>

            <Modal
                    :show="modalStatusDefault"
                    title="弹窗提示"
                    :iconLoading="true"
                    mode="default"
                    @close="modalClose"
                    @confirm="modalConfirm"
            >
                <div style="font-size: 20px; width: 600px;">
                    <br>
                    <Dropdown v-model="selVal" :data="dataSelect">
                        <span class="text">{{selText}}</span>
                    </Dropdown>
                    <br>
                    <div style="text-align: right">
                        <Dropdown v-model="selVal" :data="dataSelect">
                            <span class="text">{{selText}}</span>
                        </Dropdown>
                    </div>
                    <div>
                        <PickerDate :date="''" :range="true" sort="month" :quickSwitch="true" format="hms" @change="() => {}" />
                    </div>
                    <div style="text-align: right">
                        <PickerDate :date="''" :range="true" sort="month" :quickSwitch="true" format="hms" @change="() => {}" />
                    </div>

                    <br>
                    <PickerDate :date="''" @change="() => {}" />
                    123
                    <br><br><br><br><br><br><br><br>
                    <br><br><br><br><br><br><br><br>
                    <br><br><br><br><br><br><br><br>
                    <br><br><br><br><br><br><br><br>
                    <br><br><br><br><br><br><br><br>
                    456
                </div>
            </Modal>
        </div>
    </div>
</template>

<script>
    const data=[
        { id: 'totalEnergy', name: '总量' },
        { id: 'singleParty', name: '单平米' },
        { id: 'lowerLevel', name: '下级分项' },
        { id: 'average', name: '滑动平均滑动平均滑动平均滑动平均', disabled: true }
    ];
    const data2=[
        { id: 'totalEnergy', name: '总量' },
        { id: 'singleParty', name: '单平米' }
    ];

    const data3=[
        {
            id: 'id_xcxm',
            name: '新城项目',
            children: [
                {
                    id: 'xincehng',
                    url: 'http://47.95.122.141:8200/HedyLamarrFrontend/V2/index.html',
                    name: '新城项目'
                }
            ]
        },
        {
            id: 'id_index',
            name: '首页',
            children: [
                {
                    id: 'tencent',
                    url: 'https://cloud.tencent.com',
                    name: '腾讯云'
                },
                {
                    id: 'animate',
                    url: 'https://daneden.github.io/animate.css',
                    name: 'animate',
                    disabled: true
                },
                {
                    id: 'aliyun',
                    url: 'https://www.aliyun.com/',
                    name: '阿里云'
                }
            ]
        }
    ];
    export default {
        name: 'DropdownView',
        data() {
            return {
                selVal: 'totalEnergy',
                selText: '总量',
                dataSelect: data,
                selVal2: 'totalEnergy',
                dataSelect2: data2,
                selValGroup: 'xincehng',
                selTextGroup: '新城项目',
                dataGroup: data3,

                modalStatusDefault: false
            }
        },
        watch: {
            selVal(n, o) {
                if (n === o) return;
                this.selText=this.dataSelect.find(d => d.id === n).name
            }
        },
        methods: {
            openModal() {
                this.modalStatusDefault=true;
            },
            modalClose() {
                this.modalStatusDefault=false;
            },
            modalConfirm() {
                console.log('alertConfirm')
            },

            groupChange({cId, cName, pId}) {
                console.log(cId, cName, pId);
                this.selVal=cId;
                this.selText=cName
            }
        }
    }
</script>

<style lang="stylus" scoped>

.text
    font-size 14px
    color #1f2329
    line-height 16px

.avatar
    display inline-block
    vertical-align middle
    padding-top 8px
    padding-bottom 8px
    img
        width 20px
        height @width

</style>
