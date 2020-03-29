<template>
    <div class="component component-padding">
        <h2>表格</h2>
        <br />
        <div>
            <Table
                :head="headList1"
                :source="sourceComputed[page-1]"
                selectWidth="180"
                :setColumnWidth="true"
                align="left"
                height="500"
                :checkAble="true"
                :group="groupMsg"
                :pagination="true"
                :pageCount="source.length"
                :pageSizeSetting="true"
                :columnSet="true"
                :toolButtons="toolBtns"
                toolButtonType="icon"
                :filtersList="filters"
                :reloadPage="true"
                @check-change="tableCheckChange"
                @page-size-change="pageSizeChange"
                @reload-page="reloadPageHandle"
                @column-set-change="submitColumnSet"
                @column-set-resume="resumeDefault"
                @order-change="sourceOrder"
                @tool-button-click="buttonClickHandle"
                @group-change="groupMsgChange"
                @filter-change="filterChange"
                @delete="deleteTableRow"
                @download="download"
                @row-click="rowClickHandle"
            >
                <span
                    slot-scope="{col, row}"
                    v-if="col.key==='state'"
                >
                    <Tag
                        size="big"
                        v-for="(tag,i) in row._tags"
                        v-if="tag.key === col.key"
                        :key="i"
                        type="dot"
                        :color="tag.tag"
                    >
                        {{row[col.key]}}
                    </Tag>
                </span>
                <span v-else>{{row[col.key]}}</span>
            </Table>
        </div>
    </div>
</template>

<script>
export default {
    name: "TableView",
    data() {
        return {
            headList2: [
                {
                    title: "设备状态", // 列的名称
                    key: "state", // 列的标识
                    show: true // 是否显示该列
                },
                {
                    title: "设备名称",
                    key: "name",
                    show: true
                },
                {
                    title: "专业",
                    key: "job",
                    show: true
                },
                {
                    title: "所属系统",
                    key: "system",
                    show: false
                },
                {
                    title: "设备类型",
                    key: "type",
                    show: false
                },
                {
                    title: "购置时间",
                    key: "acquisitionTime",
                    show: true
                },
                {
                    title: "采购类型",
                    key: "purchaseType",
                    show: true
                },
                {
                    title: "所属部门",
                    key: "department",
                    show: true
                },
                {
                    title: "设备位置",
                    key: "position",
                    show: false
                }
            ],
            headList1: [
                {
                    title: "设备状态",
                    key: "state",
                    show: true
                },
                {
                    title: "设备名称",
                    key: "name",
                    show: true
                },
                {
                    title: "专业",
                    key: "job",
                    show: true
                },
                {
                    title: "所属系统",
                    key: "system",
                    show: false
                },
                {
                    title: "设备类型",
                    key: "type",
                    show: false
                },
                {
                    title: "购置时间",
                    key: "acquisitionTime",
                    show: true,
                    isOrder: true
                },
                {
                    title: "采购类型",
                    key: "purchaseType",
                    show: true
                },
                {
                    title: "所属部门",
                    key: "department",
                    show: true
                },
                {
                    title: "设备位置",
                    key: "position",
                    show: false
                }
            ],
            // 默认表格数据
            defaultSource: [
                {
                    id: "1", // 该条数据id （可以不叫id,只要保证该字段唯一即可）
                    state: "闲置", // 数据字段，与headList2中字段对应
                    name: "佳能-网络视频录像机-315",
                    job: "强电",
                    system: "给排水系统",
                    type: "通用设备",
                    acquisitionTime: "2018.12.12",
                    purchaseType: "试用",
                    department: "物业部",
                    position: "办公室"
                },
                {
                    id: "2",
                    state: "检测中",
                    name: "尼康-摄影机-314",
                    job: "给排水",
                    system: "供配电系统",
                    type: "专业设备",
                    acquisitionTime: "2018.12.11",
                    purchaseType: "租用",
                    department: "资产部",
                    position: "服务用房"
                },
                {
                    id: "3",
                    state: "使用中",
                    name: "尼康-网络视频录像机-313",
                    job: "消防",
                    system: "冷热源系统",
                    type: "暖通设备",
                    acquisitionTime: "2018.12.10",
                    purchaseType: "购买",
                    department: "维修部",
                    position: "服务用房"
                },
                {
                    id: "5",
                    state: "封存",
                    name: "三菱-立式空调-311",
                    job: "暖通空调",
                    system: "空调系统",
                    type: "仪器仪表",
                    acquisitionTime: "2018.12.08",
                    purchaseType: "租用",
                    department: "资产部",
                    position: "起居室"
                },
                {
                    id: "6",
                    state: "已报废",
                    name: "尼康-液晶屏-310",
                    job: "弱电",
                    system: "物业管理系统",
                    type: "通用设备",
                    acquisitionTime: "2018.12.07",
                    purchaseType: "购买",
                    department: "维修部",
                    position: "电气开关室"
                },
                {
                    id: "7",
                    state: "使用中",
                    name: "海尔-吸尘器-315",
                    job: "综合",
                    system: "信息网络系统",
                    type: "专业设备",
                    acquisitionTime: "2018.12.06",
                    purchaseType: "试用",
                    department: "物业部",
                    position: "档案室"
                },
                {
                    id: "4",
                    state: "维修中",
                    name: "三菱-中央变频空调-312",
                    job: "电梯",
                    system: "照明系统",
                    type: "弱电设备",
                    acquisitionTime: "2018.12.09",
                    purchaseType: "试用",
                    department: "物业部",
                    position: "休息室"
                },
                {
                    id: "8",
                    state: "维修中",
                    name: "联想-智能摄像机-314",
                    job: "安管",
                    system: "有限电视系统",
                    type: "暖通设备",
                    acquisitionTime: "2018.12.05",
                    purchaseType: "租用",
                    department: "资产部",
                    position: "电梯机房"
                },
                {
                    id: "9",
                    state: "封存",
                    name: "萤石-智能摄像头-313",
                    job: "环境",
                    system: "公告广播系统",
                    type: "弱电设备",
                    acquisitionTime: "2018.12.04",
                    purchaseType: "购买",
                    department: "维修部",
                    position: "清洁间"
                },
                {
                    id: "10",
                    state: "已报废",
                    name: "佳能-打印机-312",
                    job: "安品",
                    system: "电话交换系统",
                    type: "仪器仪表",
                    acquisitionTime: "2018.12.03",
                    purchaseType: "试用",
                    department: "物业部",
                    position: "会议室"
                },
                {
                    id: "11",
                    state: "闲置",
                    name: "佳能-网络视频录像机-315",
                    job: "强电",
                    system: "给排水系统",
                    type: "通用设备",
                    acquisitionTime: "2018.12.12",
                    purchaseType: "试用",
                    department: "物业部",
                    position: "办公室"
                },
                {
                    id: "12",
                    state: "检测中",
                    name: "尼康-摄影机-314",
                    job: "给排水",
                    system: "供配电系统",
                    type: "专业设备",
                    acquisitionTime: "2018.12.11",
                    purchaseType: "租用",
                    department: "资产部",
                    position: "服务用房"
                },
                {
                    id: "13",
                    state: "使用中",
                    name: "尼康-网络视频录像机-313",
                    job: "消防",
                    system: "冷热源系统",
                    type: "暖通设备",
                    acquisitionTime: "2018.12.10",
                    purchaseType: "购买",
                    department: "维修部",
                    position: "服务用房"
                },
                {
                    id: "14",
                    state: "维修中",
                    name: "三菱-中央变频空调-312",
                    job: "电梯",
                    system: "照明系统",
                    type: "弱电设备",
                    acquisitionTime: "2018.12.09",
                    purchaseType: "试用",
                    department: "物业部",
                    position: "休息室"
                },
                {
                    id: "15",
                    state: "封存",
                    name: "三菱-立式空调-311",
                    job: "暖通空调",
                    system: "空调系统",
                    type: "仪器仪表",
                    acquisitionTime: "2018.12.08",
                    purchaseType: "租用",
                    department: "资产部",
                    position: "起居室"
                },
                {
                    id: "16",
                    state: "已报废",
                    name: "尼康-液晶屏-310",
                    job: "弱电",
                    system: "物业管理系统",
                    type: "通用设备",
                    acquisitionTime: "2018.12.07",
                    purchaseType: "购买",
                    department: "维修部",
                    position: "电气开关室"
                },
                {
                    id: "17",
                    state: "使用中",
                    name: "海尔-吸尘器-315",
                    job: "综合",
                    system: "信息网络系统",
                    type: "专业设备",
                    acquisitionTime: "2018.12.06",
                    purchaseType: "试用",
                    department: "物业部",
                    position: "档案室"
                },
                {
                    id: "18",
                    state: "维修中",
                    name: "联想-智能摄像机-314",
                    job: "安管",
                    system: "有限电视系统",
                    type: "暖通设备",
                    acquisitionTime: "2018.12.05",
                    purchaseType: "租用",
                    department: "资产部",
                    position: "电梯机房"
                },
                {
                    id: "19",
                    state: "封存",
                    name: "萤石-智能摄像头-313",
                    job: "环境",
                    system: "公告广播系统",
                    type: "弱电设备",
                    acquisitionTime: "2018.12.04",
                    purchaseType: "购买",
                    department: "维修部",
                    position: "清洁间"
                },
                {
                    id: "20",
                    state: "已报废",
                    name: "佳能-打印机-312",
                    job: "安品",
                    system: "电话交换系统",
                    type: "仪器仪表",
                    acquisitionTime: "2018.12.03",
                    purchaseType: "试用",
                    department: "物业部",
                    position: "会议室"
                },
                {
                    id: "21",
                    state: "维修中",
                    name: "联想-智能摄像机-314",
                    job: "安管",
                    system: "有限电视系统",
                    type: "暖通设备",
                    acquisitionTime: "2018.12.05",
                    purchaseType: "租用",
                    department: "资产部",
                    position: "电梯机房"
                },
                {
                    id: "22",
                    state: "使用中",
                    name: "尼康-网络视频录像机-313",
                    job: "消防",
                    system: "冷热源系统",
                    type: "暖通设备",
                    acquisitionTime: "2018.12.10",
                    purchaseType: "购买",
                    department: "维修部",
                    position: "服务用房"
                },
                {
                    id: "23",
                    state: "维修中",
                    name: "三菱-中央变频空调-312",
                    job: "电梯",
                    system: "照明系统",
                    type: "弱电设备",
                    acquisitionTime: "2018.12.09",
                    purchaseType: "试用",
                    department: "物业部",
                    position: "休息室"
                },
                {
                    id: "24",
                    state: "闲置",
                    name: "佳能-网络视频录像机-315",
                    job: "强电",
                    system: "给排水系统",
                    type: "通用设备",
                    acquisitionTime: "2018.12.12",
                    purchaseType: "试用",
                    department: "物业部",
                    position: "办公室"
                },
                {
                    id: "25",
                    state: "封存",
                    name: "三菱-立式空调-311",
                    job: "暖通空调",
                    system: "空调系统",
                    type: "仪器仪表",
                    acquisitionTime: "2018.12.08",
                    purchaseType: "租用",
                    department: "资产部",
                    position: "起居室"
                },
                {
                    id: "26",
                    state: "检测中",
                    name: "尼康-摄影机-314",
                    job: "给排水",
                    system: "供配电系统",
                    type: "专业设备",
                    acquisitionTime: "2018.12.11",
                    purchaseType: "租用",
                    department: "资产部",
                    position: "服务用房"
                },
                {
                    id: "27",
                    state: "已报废",
                    name: "尼康-液晶屏-310",
                    job: "弱电",
                    system: "物业管理系统",
                    type: "通用设备",
                    acquisitionTime: "2018.12.07",
                    purchaseType: "购买",
                    department: "维修部",
                    position: "电气开关室"
                },
                {
                    id: "28",
                    state: "使用中",
                    name: "海尔-吸尘器-315",
                    job: "综合",
                    system: "信息网络系统",
                    type: "专业设备",
                    acquisitionTime: "2018.12.06",
                    purchaseType: "试用",
                    department: "物业部",
                    position: "档案室"
                },
                {
                    id: "29",
                    state: "已报废",
                    name: "佳能-打印机-312",
                    job: "安品",
                    system: "电话交换系统",
                    type: "仪器仪表",
                    acquisitionTime: "2018.12.03",
                    purchaseType: "试用",
                    department: "物业部",
                    position: "会议室"
                },
                {
                    id: "30",
                    state: "封存",
                    name: "萤石-智能摄像头-313",
                    job: "环境",
                    system: "公告广播系统",
                    type: "弱电设备",
                    acquisitionTime: "2018.12.04",
                    purchaseType: "购买",
                    department: "维修部",
                    position: "清洁间"
                },
                 {
                    id: "31",
                    state: "闲置",
                    name: "佳能-网络视频录像机-315",
                    job: "强电",
                    system: "给排水系统",
                    type: "通用设备",
                    acquisitionTime: "2018.12.12",
                    purchaseType: "试用",
                    department: "物业部",
                    position: "办公室"
                },
                {
                    id: "32",
                    state: "检测中",
                    name: "尼康-摄影机-314",
                    job: "给排水",
                    system: "供配电系统",
                    type: "专业设备",
                    acquisitionTime: "2018.12.11",
                    purchaseType: "租用",
                    department: "资产部",
                    position: "服务用房"
                },
                {
                    id: "33",
                    state: "使用中",
                    name: "尼康-网络视频录像机-313",
                    job: "消防",
                    system: "冷热源系统",
                    type: "暖通设备",
                    acquisitionTime: "2018.12.10",
                    purchaseType: "购买",
                    department: "维修部",
                    position: "服务用房"
                },
                {
                    id: "34",
                    state: "维修中",
                    name: "三菱-中央变频空调-312",
                    job: "电梯",
                    system: "照明系统",
                    type: "弱电设备",
                    acquisitionTime: "2018.12.09",
                    purchaseType: "试用",
                    department: "物业部",
                    position: "休息室"
                },
                {
                    id: "35",
                    state: "封存",
                    name: "三菱-立式空调-311",
                    job: "暖通空调",
                    system: "空调系统",
                    type: "仪器仪表",
                    acquisitionTime: "2018.12.08",
                    purchaseType: "租用",
                    department: "资产部",
                    position: "起居室"
                },
                {
                    id: "36",
                    state: "已报废",
                    name: "尼康-液晶屏-310",
                    job: "弱电",
                    system: "物业管理系统",
                    type: "通用设备",
                    acquisitionTime: "2018.12.07",
                    purchaseType: "购买",
                    department: "维修部",
                    position: "电气开关室"
                },
                {
                    id: "37",
                    state: "使用中",
                    name: "海尔-吸尘器-315",
                    job: "综合",
                    system: "信息网络系统",
                    type: "专业设备",
                    acquisitionTime: "2018.12.06",
                    purchaseType: "试用",
                    department: "物业部",
                    position: "档案室"
                },
                {
                    id: "38",
                    state: "维修中",
                    name: "联想-智能摄像机-314",
                    job: "安管",
                    system: "有限电视系统",
                    type: "暖通设备",
                    acquisitionTime: "2018.12.05",
                    purchaseType: "租用",
                    department: "资产部",
                    position: "电梯机房"
                },
                {
                    id: "39",
                    state: "封存",
                    name: "萤石-智能摄像头-313",
                    job: "环境",
                    system: "公告广播系统",
                    type: "弱电设备",
                    acquisitionTime: "2018.12.04",
                    purchaseType: "购买",
                    department: "维修部",
                    position: "清洁间"
                },
                {
                    id: "40",
                    state: "已报废",
                    name: "佳能-打印机-312",
                    job: "安品",
                    system: "电话交换系统",
                    type: "仪器仪表",
                    acquisitionTime: "2018.12.03",
                    purchaseType: "试用",
                    department: "物业部",
                    position: "会议室"
                },
            ],
            // 可配表格数据
            source: [
                {
                    id: "1",
                    state: "闲置",
                    name: "佳能-网络视频录像机-315",
                    job: "强电",
                    system: "给排水系统",
                    type: "通用设备",
                    acquisitionTime: "2018.12.12",
                    purchaseType: "试用",
                    department: "物业部",
                    position: "办公室",
                    _tags: [
                        {
                            key: "state",
                            tag: "#E1F2FF"
                        }
                    ]
                },
                {
                    id: "2",
                    state: "检测中",
                    name: "尼康-摄影机-314",
                    job: "给排水",
                    system: "供配电系统",
                    type: "专业设备",
                    acquisitionTime: "2018.12.11",
                    purchaseType: "租用",
                    department: "资产部",
                    position: "服务用房",
                    _tags: [
                        {
                            key: "state",
                            tag: "#E1F2FF"
                        }
                    ]
                },
                {
                    id: "3",
                    state: "使用中",
                    name: "尼康-网络视频录像机-313",
                    job: "消防",
                    system: "冷热源系统",
                    type: "暖通设备",
                    acquisitionTime: "2018.12.10",
                    purchaseType: "购买",
                    department: "维修部",
                    position: "服务用房",
                    _tags: [
                        {
                            key: "state",
                            tag: "#E1F2FF"
                        }
                    ]
                },
                {
                    id: "5",
                    state: "封存",
                    name: "三菱-立式空调-311",
                    job: "暖通空调",
                    system: "空调系统",
                    type: "仪器仪表",
                    acquisitionTime: "2018.12.08",
                    purchaseType: "租用",
                    department: "资产部",
                    position: "起居室",
                    _tags: [
                        {
                            key: "state",
                            tag: "#E1F2FF"
                        }
                    ]
                },
                {
                    id: "6",
                    state: "已报废",
                    name: "尼康-液晶屏-310",
                    job: "弱电",
                    system: "物业管理系统",
                    type: "通用设备",
                    acquisitionTime: "2018.12.07",
                    purchaseType: "购买",
                    department: "维修部",
                    position: "电气开关室",
                    _tags: [
                        {
                            key: "state",
                            tag: "#E1F2FF"
                        }
                    ]
                },
                {
                    id: "7",
                    state: "使用中",
                    name: "海尔-吸尘器-315",
                    job: "综合",
                    system: "信息网络系统",
                    type: "专业设备",
                    acquisitionTime: "2018.12.06",
                    purchaseType: "试用",
                    department: "物业部",
                    position: "档案室",
                    _tags: [
                        {
                            key: "state",
                            tag: "#E1F2FF"
                        }
                    ]
                },
                {
                    id: "4",
                    state: "维修中",
                    name: "三菱-中央变频空调-312",
                    job: "电梯",
                    system: "照明系统",
                    type: "弱电设备",
                    acquisitionTime: "2018.12.09",
                    purchaseType: "试用",
                    department: "物业部",
                    position: "休息室",
                    _tags: [
                        {
                            key: "state",
                            tag: "#E1F2FF"
                        }
                    ]
                },
                {
                    id: "8",
                    state: "维修中",
                    name: "联想-智能摄像机-314",
                    job: "安管",
                    system: "有限电视系统",
                    type: "暖通设备",
                    acquisitionTime: "2018.12.05",
                    purchaseType: "租用",
                    department: "资产部",
                    position: "电梯机房",
                    _tags: [
                        {
                            key: "state",
                            tag: "#E1F2FF"
                        }
                    ]
                },
                {
                    id: "9",
                    state: "封存",
                    name: "萤石-智能摄像头-313",
                    job: "环境",
                    system: "公告广播系统",
                    type: "弱电设备",
                    acquisitionTime: "2018.12.04",
                    purchaseType: "购买",
                    department: "维修部",
                    position: "清洁间",
                    _tags: [
                        {
                            key: "state",
                            tag: "#E1F2FF"
                        }
                    ]
                },
                {
                    id: "10",
                    state: "已报废",
                    name: "佳能-打印机-312",
                    job: "安品",
                    system: "电话交换系统",
                    type: "仪器仪表",
                    acquisitionTime: "2018.12.03",
                    purchaseType: "试用",
                    department: "物业部",
                    position: "会议室",
                    _tags: [
                        {
                            key: "state",
                            tag: "#E1F2FF"
                        }
                    ]
                },
                {
                    id: "11",
                    state: "闲置",
                    name: "佳能-网络视频录像机-315",
                    job: "强电",
                    system: "给排水系统",
                    type: "通用设备",
                    acquisitionTime: "2018.12.12",
                    purchaseType: "试用",
                    department: "物业部",
                    position: "办公室",
                    _tags: [
                        {
                            key: "state",
                            tag: "#E1F2FF"
                        }
                    ]
                },
                {
                    id: "12",
                    state: "检测中",
                    name: "尼康-摄影机-314",
                    job: "给排水",
                    system: "供配电系统",
                    type: "专业设备",
                    acquisitionTime: "2018.12.11",
                    purchaseType: "租用",
                    department: "资产部",
                    position: "服务用房",
                    _tags: [
                        {
                            key: "state",
                            tag: "#E1F2FF"
                        }
                    ]
                },
                {
                    id: "13",
                    state: "使用中",
                    name: "尼康-网络视频录像机-313",
                    job: "消防",
                    system: "冷热源系统",
                    type: "暖通设备",
                    acquisitionTime: "2018.12.10",
                    purchaseType: "购买",
                    department: "维修部",
                    position: "服务用房",
                    _tags: [
                        {
                            key: "state",
                            tag: "#E1F2FF"
                        }
                    ]
                },
                {
                    id: "14",
                    state: "维修中",
                    name: "三菱-中央变频空调-312",
                    job: "电梯",
                    system: "照明系统",
                    type: "弱电设备",
                    acquisitionTime: "2018.12.09",
                    purchaseType: "试用",
                    department: "物业部",
                    position: "休息室",
                    _tags: [
                        {
                            key: "state",
                            tag: "#E1F2FF"
                        }
                    ]
                },
                {
                    id: "15",
                    state: "封存",
                    name: "三菱-立式空调-311",
                    job: "暖通空调",
                    system: "空调系统",
                    type: "仪器仪表",
                    acquisitionTime: "2018.12.08",
                    purchaseType: "租用",
                    department: "资产部",
                    position: "起居室",
                    _tags: [
                        {
                            key: "state",
                            tag: "#E1F2FF"
                        }
                    ]
                },
                {
                    id: "16",
                    state: "已报废",
                    name: "尼康-液晶屏-310",
                    job: "弱电",
                    system: "物业管理系统",
                    type: "通用设备",
                    acquisitionTime: "2018.12.07",
                    purchaseType: "购买",
                    department: "维修部",
                    position: "电气开关室",
                    _tags: [
                        {
                            key: "state",
                            tag: "#E1F2FF"
                        }
                    ]
                },
                {
                    id: "17",
                    state: "使用中",
                    name: "海尔-吸尘器-315",
                    job: "综合",
                    system: "信息网络系统",
                    type: "专业设备",
                    acquisitionTime: "2018.12.06",
                    purchaseType: "试用",
                    department: "物业部",
                    position: "档案室",
                    _tags: [
                        {
                            key: "state",
                            tag: "#E1F2FF"
                        }
                    ]
                },
                {
                    id: "18",
                    state: "维修中",
                    name: "联想-智能摄像机-314",
                    job: "安管",
                    system: "有限电视系统",
                    type: "暖通设备",
                    acquisitionTime: "2018.12.05",
                    purchaseType: "租用",
                    department: "资产部",
                    position: "电梯机房",
                    _tags: [
                        {
                            key: "state",
                            tag: "#E1F2FF"
                        }
                    ]
                },
                {
                    id: "19",
                    state: "封存",
                    name: "萤石-智能摄像头-313",
                    job: "环境",
                    system: "公告广播系统",
                    type: "弱电设备",
                    acquisitionTime: "2018.12.04",
                    purchaseType: "购买",
                    department: "维修部",
                    position: "清洁间",
                    _tags: [
                        {
                            key: "state",
                            tag: "#E1F2FF"
                        }
                    ]
                },
                {
                    id: "20",
                    state: "已报废",
                    name: "佳能-打印机-312",
                    job: "安品",
                    system: "电话交换系统",
                    type: "仪器仪表",
                    acquisitionTime: "2018.12.03",
                    purchaseType: "试用",
                    department: "物业部",
                    position: "会议室",
                    _tags: [
                        {
                            key: "state",
                            tag: "#E1F2FF"
                        }
                    ]
                },
                 {
                    id: "21",
                    state: "维修中",
                    name: "联想-智能摄像机-314",
                    job: "安管",
                    system: "有限电视系统",
                    type: "暖通设备",
                    acquisitionTime: "2018.12.05",
                    purchaseType: "租用",
                    department: "资产部",
                    position: "电梯机房",
                    _tags: [
                        {
                            key: "state",
                            tag: "#E1F2FF"
                        }
                    ]
                },
                {
                    id: "22",
                    state: "使用中",
                    name: "尼康-网络视频录像机-313",
                    job: "消防",
                    system: "冷热源系统",
                    type: "暖通设备",
                    acquisitionTime: "2018.12.10",
                    purchaseType: "购买",
                    department: "维修部",
                    position: "服务用房",
                    _tags: [
                        {
                            key: "state",
                            tag: "#E1F2FF"
                        }
                    ]
                },
                {
                    id: "23",
                    state: "维修中",
                    name: "三菱-中央变频空调-312",
                    job: "电梯",
                    system: "照明系统",
                    type: "弱电设备",
                    acquisitionTime: "2018.12.09",
                    purchaseType: "试用",
                    department: "物业部",
                    position: "休息室",
                    _tags: [
                        {
                            key: "state",
                            tag: "#E1F2FF"
                        }
                    ]
                },
                {
                    id: "24",
                    state: "闲置",
                    name: "佳能-网络视频录像机-315",
                    job: "强电",
                    system: "给排水系统",
                    type: "通用设备",
                    acquisitionTime: "2018.12.12",
                    purchaseType: "试用",
                    department: "物业部",
                    position: "办公室",
                    _tags: [
                        {
                            key: "state",
                            tag: "#E1F2FF"
                        }
                    ]
                },
                {
                    id: "25",
                    state: "封存",
                    name: "三菱-立式空调-311",
                    job: "暖通空调",
                    system: "空调系统",
                    type: "仪器仪表",
                    acquisitionTime: "2018.12.08",
                    purchaseType: "租用",
                    department: "资产部",
                    position: "起居室",
                    _tags: [
                        {
                            key: "state",
                            tag: "#E1F2FF"
                        }
                    ]
                },
                {
                    id: "26",
                    state: "检测中",
                    name: "尼康-摄影机-314",
                    job: "给排水",
                    system: "供配电系统",
                    type: "专业设备",
                    acquisitionTime: "2018.12.11",
                    purchaseType: "租用",
                    department: "资产部",
                    position: "服务用房",
                    _tags: [
                        {
                            key: "state",
                            tag: "#E1F2FF"
                        }
                    ]
                },
                {
                    id: "27",
                    state: "已报废",
                    name: "尼康-液晶屏-310",
                    job: "弱电",
                    system: "物业管理系统",
                    type: "通用设备",
                    acquisitionTime: "2018.12.07",
                    purchaseType: "购买",
                    department: "维修部",
                    position: "电气开关室",
                    _tags: [
                        {
                            key: "state",
                            tag: "#E1F2FF"
                        }
                    ]
                },
                {
                    id: "28",
                    state: "使用中",
                    name: "海尔-吸尘器-315",
                    job: "综合",
                    system: "信息网络系统",
                    type: "专业设备",
                    acquisitionTime: "2018.12.06",
                    purchaseType: "试用",
                    department: "物业部",
                    position: "档案室",
                    _tags: [
                        {
                            key: "state",
                            tag: "#E1F2FF"
                        }
                    ]
                },
                {
                    id: "29",
                    state: "已报废",
                    name: "佳能-打印机-312",
                    job: "安品",
                    system: "电话交换系统",
                    type: "仪器仪表",
                    acquisitionTime: "2018.12.03",
                    purchaseType: "试用",
                    department: "物业部",
                    position: "会议室",
                    _tags: [
                        {
                            key: "state",
                            tag: "#E1F2FF"
                        }
                    ]
                },
                {
                    id: "30",
                    state: "封存",
                    name: "萤石-智能摄像头-313",
                    job: "环境",
                    system: "公告广播系统",
                    type: "弱电设备",
                    acquisitionTime: "2018.12.04",
                    purchaseType: "购买",
                    department: "维修部",
                    position: "清洁间",
                    _tags: [
                        {
                            key: "state",
                            tag: "#E1F2FF"
                        }
                    ]
                },
                 {
                    id: "31",
                    state: "闲置",
                    name: "佳能-网络视频录像机-315",
                    job: "强电",
                    system: "给排水系统",
                    type: "通用设备",
                    acquisitionTime: "2018.12.12",
                    purchaseType: "试用",
                    department: "物业部",
                    position: "办公室",
                    _tags: [
                        {
                            key: "state",
                            tag: "#E1F2FF"
                        }
                    ]
                },
                {
                    id: "32",
                    state: "检测中",
                    name: "尼康-摄影机-314",
                    job: "给排水",
                    system: "供配电系统",
                    type: "专业设备",
                    acquisitionTime: "2018.12.11",
                    purchaseType: "租用",
                    department: "资产部",
                    position: "服务用房",
                    _tags: [
                        {
                            key: "state",
                            tag: "#E1F2FF"
                        }
                    ]
                },
                {
                    id: "33",
                    state: "使用中",
                    name: "尼康-网络视频录像机-313",
                    job: "消防",
                    system: "冷热源系统",
                    type: "暖通设备",
                    acquisitionTime: "2018.12.10",
                    purchaseType: "购买",
                    department: "维修部",
                    position: "服务用房",
                    _tags: [
                        {
                            key: "state",
                            tag: "#E1F2FF"
                        }
                    ]
                },
                {
                    id: "34",
                    state: "维修中",
                    name: "三菱-中央变频空调-312",
                    job: "电梯",
                    system: "照明系统",
                    type: "弱电设备",
                    acquisitionTime: "2018.12.09",
                    purchaseType: "试用",
                    department: "物业部",
                    position: "休息室",
                    _tags: [
                        {
                            key: "state",
                            tag: "#E1F2FF"
                        }
                    ]
                },
                {
                    id: "35",
                    state: "封存",
                    name: "三菱-立式空调-311",
                    job: "暖通空调",
                    system: "空调系统",
                    type: "仪器仪表",
                    acquisitionTime: "2018.12.08",
                    purchaseType: "租用",
                    department: "资产部",
                    position: "起居室",
                    _tags: [
                        {
                            key: "state",
                            tag: "#E1F2FF"
                        }
                    ]
                },
                {
                    id: "36",
                    state: "已报废",
                    name: "尼康-液晶屏-310",
                    job: "弱电",
                    system: "物业管理系统",
                    type: "通用设备",
                    acquisitionTime: "2018.12.07",
                    purchaseType: "购买",
                    department: "维修部",
                    position: "电气开关室",
                    _tags: [
                        {
                            key: "state",
                            tag: "#E1F2FF"
                        }
                    ]
                },
                {
                    id: "37",
                    state: "使用中",
                    name: "海尔-吸尘器-315",
                    job: "综合",
                    system: "信息网络系统",
                    type: "专业设备",
                    acquisitionTime: "2018.12.06",
                    purchaseType: "试用",
                    department: "物业部",
                    position: "档案室",
                    _tags: [
                        {
                            key: "state",
                            tag: "#E1F2FF"
                        }
                    ]
                },
                {
                    id: "38",
                    state: "维修中",
                    name: "联想-智能摄像机-314",
                    job: "安管",
                    system: "有限电视系统",
                    type: "暖通设备",
                    acquisitionTime: "2018.12.05",
                    purchaseType: "租用",
                    department: "资产部",
                    position: "电梯机房",
                    _tags: [
                        {
                            key: "state",
                            tag: "#E1F2FF"
                        }
                    ]
                },
                {
                    id: "39",
                    state: "封存",
                    name: "萤石-智能摄像头-313",
                    job: "环境",
                    system: "公告广播系统",
                    type: "弱电设备",
                    acquisitionTime: "2018.12.04",
                    purchaseType: "购买",
                    department: "维修部",
                    position: "清洁间",
                    _tags: [
                        {
                            key: "state",
                            tag: "#E1F2FF"
                        }
                    ]
                },
                {
                    id: "40",
                    state: "已报废",
                    name: "佳能-打印机-312",
                    job: "安品",
                    system: "电话交换系统",
                    type: "仪器仪表",
                    acquisitionTime: "2018.12.03",
                    purchaseType: "试用",
                    department: "物业部",
                    position: "会议室",
                    _tags: [
                        {
                            key: "state",
                            tag: "#E1F2FF"
                        }
                    ]
                },
            ],
            // 分组信息 （非必需）
            groupMsg: {
                key: "all", // 当前选中的分组条件的id值，'all'为内置的key,代表无分组
                isGroup: true, // 是否分组
                // 分组条件列表，参考Select组件数据要求
                options: [
                    {
                        id: "all",
                        name: "全部"
                    },
                    {
                        id: "state",
                        name: "设备状态"
                    },
                    {
                        id: "purchaseType",
                        name: "采购类型"
                    }
                ]
            },
            // 操作按钮组 (非必填)
            toolBtns: [
                {
                    icon: "edit", // 按钮的icon
                    name: "编辑", // 按钮名称
                    type: "action", // 图标类型
                    disabled: true // 是否禁用
                },
                {
                    icon: "menu",
                    name: "复制",
                    type: "action"
                },
                {
                    icon: "reportForm",
                    name: "申请",
                    type: "action"
                },
                {
                    icon: "save",
                    name: "修改",
                    type: "action"
                },
                {
                    icon: "alarm",
                    name: "下载",
                    type: "action"
                },
                {
                    icon: "strategy",
                    name: "应用随碟附送都发生大幅",
                    type: "action"
                }
            ],
            // 条件筛选列表
            filters: [
                {
                    title: "状态:", // 筛选条件的名称
                    key: "state", // 条件标识
                    value: "all", // 当前选中的条件id值
                    // 条件列表，参考Select组件数据要求
                    source: [
                        {
                            id: "all",
                            name: "全部"
                        },
                        {
                            id: "0",
                            name: "闲置"
                        },
                        {
                            id: "1",
                            name: "检测中"
                        }
                    ]
                },
                {
                    title: "专业:",
                    key: "job",
                    value: "all",
                    source: [
                        {
                            id: "all",
                            name: "全部"
                        },
                        {
                            id: "0",
                            name: "强电"
                        },
                        {
                            id: "1",
                            name: "弱电"
                        }
                    ]
                },
                {
                    title: "采购:",
                    key: "purchaseType",
                    value: "all",
                    source: [
                        {
                            id: "all",
                            name: "全部"
                        },
                        {
                            id: "0",
                            name: "试用"
                        },
                        {
                            id: "1",
                            name: "购买"
                        }
                    ]
                },
                {
                    title: "部门:",
                    key: "department",
                    value: "all",
                    source: [
                        {
                            id: "all",
                            name: "全部"
                        },
                        {
                            id: "0",
                            name: "物业部"
                        },
                        {
                            id: "1",
                            name: "维修部"
                        }
                    ]
                },
                {
                    title: "系统:",
                    key: "system",
                    value: "",
                    source: [
                        {
                            id: "0",
                            name: "照明系统"
                        },
                        {
                            id: "1",
                            name: "空调系统"
                        }
                    ]
                }
            ],
            defaultPage: 1,
            defaultPageSize: 20,
            page: 1,
            pageSize: 20,
        };
    },
    computed: {
        /**
         * 默认表格分页数据
         */
        defaultSourceComputed() {
            const len = this.defaultSource.length;
            let pagecount = Math.ceil(len / this.defaultPageSize);
            let source = [];

            for (let i=1; i<=pagecount; i++) {
                const temp = [];
                for (let j=0; j<len; j++) {
                    if ((j > (i-1)*this.defaultPageSize || j === 0) && j <= i*this.defaultPageSize-1) {
                        temp.push(this.defaultSource[j])
                    }
                }
                source.push(temp);
            }
            return source;
        },
        /**
         * 可配置表格计算数据
         */
        sourceComputed() {
            const len = this.source.length;
            let pagecount = Math.ceil(len / this.pageSize);
            let source = [];

            for (let i=1; i<=pagecount; i++) {
                const temp = [];
                for (let j=0; j<len; j++) {
                    if ((j > (i-1)*this.pageSize || j === 0) && j <= i*this.pageSize-1) {
                        temp.push(this.source[j])
                    }
                }
                source.push(temp);
            }
            return source;
        }
    },
    methods: {
        rowClickHandle(obj) {
            console.log(obj)
        },
        tableCheckChange(data) {
            console.log(data);
        },
        submitColumnSet(data) {
            console.log(data);
        },
        /**
         * 默认表格切换页码或者改变每页条数
         */
        pageSizeChange2(pageSize) {
            this.defaultPage = pageSize.newPage;
            this.defaultPageSize = pageSize.newPageSize;
        },
        /**
         * 可配置表格切换页码或者改变每页条数
         */
        pageSizeChange(pageSize) {
            console.log(pageSize)
            this.page = pageSize.newPage;
            this.pageSize = pageSize.newPageSize;
        },
        resumeDefault() {
            console.log("恢复默认");
        },
        sourceOrder(data) {
            console.log(data);
        },
        resetPagination() {
            console.log("重置分页器");
        },
        buttonClickHandle(value) {
            console.log(value);
        },
        groupMsgChange(value) {
            console.log(value);
        },
        filterChange(val) {
            console.log(val);
        },
        reloadPageHandle(page) {
            console.log(page);
        },
        /**
         * 删除已选行回调
         * @param {Array} rows 已勾选的行数据
         */
        deleteTableRow(rows) {
            const ids = rows.map(row => row.id);
            this.source = this.source.filter(row => !ids.includes(row.id));
        },
        /**
         * 下载事件回调
         * @param {Array} rows 已勾选的行数据
         */
        download(rows) {
            console.log(rows);
        }
    },
    mounted() {
        setTimeout(() => {
            // this.headList1 =  [
            //     {
            //         title: "设备状态",
            //         key: "state",
            //         show: true
            //     },
            //     {
            //         title: "设备名称",
            //         key: "name",
            //         show: true
            //     },
            //     {
            //         title: "专业",
            //         key: "job",
            //         show: true
            //     },
            //     {
            //         title: "所属系统",
            //         key: "system",
            //         show: false
            //     },
            //     {
            //         title: "设备类型",
            //         key: "type",
            //         show: false
            //     },
            //     {
            //         title: "购置时间",
            //         key: "acquisitionTime",
            //         show: true,
            //         isOrder: true
            //     },
            //     {
            //         title: "采购类型",
            //         key: "purchaseType",
            //         show: true
            //     },
            //     {
            //         title: "所属部门",
            //         key: "department",
            //         show: true
            //     },
            //     {
            //         title: "设备位置",
            //         key: "position",
            //         show: false
            //     }
            // ]
        },2000)
        
    }
};
</script>

<style lang="stylus">
.container
    height 500px
    padding 20px
    border 1px solid #eee
.t
    border 1px solid #333
.e
    height 44px
    display flex
    flex-wrap wrap-reverse
    overflow hidden

</style>