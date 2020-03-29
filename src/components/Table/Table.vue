<template>
    <div
        class="p-table-box"
        onselectstart="return false;"
        ref="_tableBox"
        :style="widthHeight"
    >
        <div class="p-table-container">
            <div class="p-table-container-box">
                <!-- 筛选条件 -->
                <div class="p-checked-filter-box" :style="{marginBottom: checkedCount?'12px':0}" v-if="Object.keys(groupMsg).length || filtersList.length || checkedCount">
                    <div class="p-checked-filter-inner-box">
                        <!-- 已选行回显条 -->
                        <div
                            class="p-checked-review"
                            v-if="checkedCount"
                        >
                            <div class="p-review-left">
                                <div class="p-checked-num">
                                    已选择
                                    <span>{{checkedCount}}</span> 项目
                                </div>
                                <div class="p-review-tool">
                                    <div class="p-review-tool-delete">
                                        <p-button
                                            type="default"
                                            size="small"
                                            @click="deleteCheckedSource"
                                        >删除</p-button>
                                    </div>
                                    <div class="p-review-tool-download">
                                        <p-button
                                            type="default"
                                            size="small"
                                            @click="download"
                                        >下载</p-button>
                                    </div>
                                </div>
                            </div>
                            <div class="p-review-right">
                                <i @click="clearCheckedSource">
                                    <icon-close />
                                </i>
                            </div>
                        </div>
                        <!-- 分组、条件筛选 -->
                        <div
                            class="p-filter-box"
                            ref="_filterBox"
                            :style="{
                                height: isFilterBtnShow&&filterBoxState==='on'?'auto':'35px',
                                overflow: filterBoxState==='on'?'visible':'hidden'
                            }"
                        >
                            <!-- 分组条件 -->
                            <Select
                                v-if="groupMsg.isGroup"
                                style="margin-right: 12px;"
                                v-model="groupMsg.key"
                                title="分组："
                                :selectdata="groupMsg.options"
                                :width="selectWidth"
                                @input="groupChange"
                            />
                            <!-- 条件筛选 -->
                            <Select
                                :style="{marginRight: f_i===filtersList.length-1?0:'12px',marginBottom:'12px'}"
                                :width="selectWidth"
                                v-for="(filter, f_i) in filtersList"
                                :key="`f_i_${f_i}`"
                                :title="filter.title"
                                :selectdata="filter.source"
                                v-model="filter.value"
                                @input="filterSelectChange(filter)"
                            ></Select>
                        </div>
                        <!-- 展开更多条件 -->
                        <div
                            class="p-more-filter-box"
                            v-if="isFilterBtnShow"
                        >
                            <span @click="toggleFilterBox">{{filterBoxState==='on'?'收起':'展开'}}</span>
                            <i :class="{off: filterBoxState === 'off', on: filterBoxState === 'on'}">
                                <toggle-btn />
                            </i>
                        </div>
                    </div>
                </div>
                <!-- 表格 -->
                <div class="p-inner-container">
                    <div 
                        class="p-table"
                        ref="_pTable" 
                        :class="{'p-overflowx': !overflow}"
                    >
                        <!-- 表头 -->
                        <ul class="p-table-head">
                            <!-- 全选框 -->
                            <li
                                class="p-check-box"
                                :style="{borderRight: bordered?'1px solid #e4e5e7':0}"
                                v-if="checkAble"
                            >
                                <Checkbox
                                    :checked="checked"
                                    @change="checkAllChange"
                                />
                            </li>
                            <!-- 表头项 -->
                            <li
                                class="p-table-head-th"
                                v-for="(head, i) in computedHeadList"
                                :key="`head_${i}`"
                                :title="head.title"
                                :style="{
									width: `${columnWidth[i]}px`,
                                    minWidth: `${columnWidth[i]}px`,
                                    maxWidth: `${columnWidth[i]}px`,
									textAlign: align,
									fontFamily: fontFamily,
									color: headFontColor,
									fontSize: headFontSize,
									fontWeight: headFontWeight,
									borderRight: (i !== computedHeadList.length - 1 && setColumnWidth) ? '1px solid transparent' : 0
								}"
                            >
                            <div class="p-head-title-con">
                                <div class="p-head-title">{{head.title}}</div>
                                <div
                                    class="p-order-box"
                                    v-if="head.isOrder"
                                >
                                    <i
                                        class="asc"
                                        @click.stop="sourceOrderHandle(head, 'asc')"
                                    >
                                        <sort-icon />
                                    </i>
                                    <i
                                        class="desc"
                                        @click.stop="sourceOrderHandle(head, 'desc')"
                                    >
                                        <sort-icon />
                                    </i>
                                </div>
                                </div>
                                <div
                                    class="right"
                                    v-show="setColumnWidth && i !== computedHeadList.length - 1"
                                    @mousedown="columnMousedownHandle(i, $event)"
                                ></div>
                            </li>
                            <!-- 表头操作按钮 -->
                            <li
                                class="p-column-set-btn"
                                v-if="columnSet"
                            >
                                <i @click.stop="showColumnSet($event)">
                                    <set-btn />
                                </i>
                            </li>
                        </ul>
                        <!-- 表体 -->
                        <ul
                            class="p-table-body"
                            ref="_tableHead"
                        >
                            <!-- 表格内容 -->
                            <li
                                class="p-table-body-tr"
                                v-for="(group, g_i) in groupSourceList2"
                                :key="'group'+g_i"
                            >
                                <!-- 分组 -->
                                <div class="p-group">
                                    <div
                                        class="p-group-tr"
                                        :class="{'p-group-border': !group.folding}"
                                        v-if="groupMsg.isGroup && groupMsg.key !== 'all'"
                                    >
                                        <div class="p-group-toggle-btn" :class="{'no-check-box': !checkAble}">
                                            <i
                                                :class="{'p-triangleUp': !group.folding, 'p-triangleDown': group.folding}"
                                                @click.stop="foldingChange(group)"
                                            >
                                                <toggle-btn-black />
                                            </i>
                                        </div>
                                        <div
                                            class="p-group-msg"
                                            :title="group.groupKey"
                                        >{{group.groupKey}} ({{group.sourceList.length}})</div>
                                    </div>
                                    <transition name="slideDown">
                                        <div v-if="group.folding">
                                            <div
                                                class="p-table-body-filed-tr"
                                                :class="{actived: item.actived}"
                                                v-for="(item, s_i) in group.sourceList"
                                                :key="s_i"
                                                :style="{
                                                    height: rowHeight?`${rowHeight}px`:'',
                                                    borderColor: group.sourceList[s_i+1] && (group.sourceList[s_i+1].hovered || group.sourceList[s_i+1].actived ) ? 'transparent' : '#e4e5e7'
                                                }"
                                                @mouseenter="rowFocusHandle(item.index, $event)"
                                                @mouseleave="rowBlurHandle(item.index, $event)"
                                                @click.stop="rowClickHandle(item, $event)"
                                            >
                                                <!-- 行勾选框 -->
                                                <div
                                                    class="p-check-box"
                                                    :style="{borderRight: bordered?'1px solid #e4e5e7':0}"
                                                    v-if="checkAble"
                                                >
                                                    <Checkbox
                                                        :checked="item.checked?'checked':'uncheck'"
                                                        @change="itemCheckChange([...arguments,item])"
                                                    />
                                                </div>
                                                <!-- 内容 -->
                                                <div
                                                    class="p-filed"
                                                    v-for="(head, i) in computedHeadList"
                                                    :key="`h_i_${i}`"
                                                    :title="isTitleShow?item[head.key]:''"
                                                    :style="{
                                                        width: `${columnWidth[i]}px`,
                                                        minWidth: `${columnWidth[i]}px`,
                                                        maxWidth: `${columnWidth[i]}px`,
                                                        textAlign: align,
                                                        fontFamily: fontFamily,
                                                        fontSize: fontSize,
                                                        fontWeight: fontWeight,
                                                        borderRight: (i !== computedHeadList.length - 1 && bordered) ? '1px solid #e4e5e7' : 0
                                                    }"
                                                >
                                                    <span>
                                                        <!-- 默认插槽 -->
                                                        <slot :col="{...head}" :row="{...item}">{{item[head.key]}}</slot>
                                                    </span>
                                                </div>

                                                <!-- 站位 -->
                                                <div
                                                    class="p-column-set-btn"
                                                    v-if="columnSet"
                                                ></div>

                                                <!-- 行操作按钮框 -->
                                                <transition name="slideRightLeft">
                                                    <div
                                                        ref="_toolBox"
                                                        class="p-row-tool-box"
                                                        v-if="item.hovered && item.isToolShow && toolButtons.length"
                                                    >
                                                        <!-- 按钮 -->
                                                        <div
                                                            class="p-tool"
                                                            @click.stop="toolClick(tool)"
                                                            v-for="(tool, t_i) in defaultBtnList"
                                                            :key="t_i"
                                                        >
                                                            <div class="p-btn-icon-box" :class="{'p-icon-only': toolButtonType==='icon'}">
                                                                <!-- icon组件 -->
                                                                <div class="p-icon-item-box">
                                                                     <Icon v-if="toolButtonType!=='text'" :type="tool.type" :name='tool.icon' :disabled="tool.disabled"/>
                                                                </div>
                                                               
                                                                <div class="p-btn-icon-tips" v-if="toolButtonType==='icon'">
                                                                    <span>{{tool.name}}</span>
                                                                    <div class="p-triangle"></div>
                                                                </div>
                                                            </div>
                                                            <div 
                                                                class="p-btn-text"
                                                                v-if="toolButtonType!=='icon'" 
                                                                :style="{
                                                                    cursor: tool.disabled?'not-allowed':'pointer',
                                                                    opacity: tool.disabled?.3:1
                                                                }"
                                                            >{{tool.name}}</div>
                                                        </div>
                                                        <!-- 更多 -->
                                                        <div
                                                            class="p-tool"
                                                            v-if="moreBtnList.length"
                                                        >
                                                            <div class="p-btn-icon-box" v-if="toolButtonType!=='text'" @click.stop="showItemMoreBtnList(item, s_i)">
                                                                <icon-more />
                                                                <div class="p-btn-icon-tips" v-if="toolButtonType==='icon'">
                                                                    <span>更多</span>
                                                                    <div class="p-triangle"></div>
                                                                </div>
                                                            </div>
                                                            <div 
                                                                class="p-more-text" 
                                                                 v-if="toolButtonType!=='icon'"
                                                                @click.stop="showItemMoreBtnList(item, s_i)"
                                                            >
                                                            更多
                                                            </div>
                                                            <transition name="slideDownUpUi">
                                                                <ul
                                                                    class="p-more-tool-select"
                                                                    v-show="item.isMoreBtnShow"
                                                                    ref="moreDropdowmBox"
                                                                >
                                                                    <li
                                                                        class="p-more-tool-select-item"
                                                                        v-for="(tool, t_i) in moreBtnList"
                                                                        :key="t_i"
                                                                        @click.stop="moreBtnItemClickHandle(tool)"
                                                                    > 
                                                                        <!-- icon组件 -->
                                                                        <div class="p-icon-box">
                                                                            <Icon v-if="toolButtonType !=='text'" :type="tool.type" :name='tool.icon' :disabled="tool.disabled"/>
                                                                        </div>
                                                                        <span :title="tool.name">{{tool.name}}</span>
                                                                    </li>
                                                                </ul>
                                                            </transition>
                                                        </div>
                                                        <div
                                                            class="p-more-triangle"
                                                            ref="_pMoreTriangle"
                                                            v-show="item.isMoreBtnShow"
                                                        >
                                                            <toggle-btn-black />
                                                        </div>
                                                    </div>
                                                </transition>
                                            </div>
                                        </div>
                                    </transition>
                                </div>
                            </li>
                        </ul>
                        <!-- 表头设置列表 -->
                        <transition name="slide-fade">
                            <div
                                class="p-set-content"
                                ref="_pSetContent"
                                v-if="columnSetShow"
                                v-off="hideBox"
                            >
                                <div class="p-set-content-body">
                                    <ul
                                        class="p-drag-list"
                                        ref="parentNode"
                                        @dragstart="onDragStart"
                                        @dragover="onDragOver"
                                        @dragend="onDragEnd"
                                    >
                                        <li
                                            v-for="(head,index) in headListSnapshot"
                                            :key="index"
                                            :title="head.title"
                                            class="p-drag-list-item"
                                            :class="{hovered: head.hovered}"
                                            draggable="true"
                                        >
                                            <Checkbox
                                                :checked="head.show?'checked':'uncheck'"
                                                @change="columnShowChange([...arguments, head])"
                                            />
                                            <div class="p-drag-title">{{head.title}}</div>
                                            <div 
                                                class="p-drag-icon" 
                                                @mouseenter="headListEnterHandle(head)"
                                                @mouseleave="headListLeaveHandle(head)"
                                            >
                                                <Shift></Shift>
                                            </div>
                                        </li>
                                    </ul>
                                </div>

                                <div class="p-set-content-foot">
                                    <div class="p-foot-left">
                                        <span @click.stop="resumeDefault">恢复默认</span>
                                    </div>
                                    <div class="p-foot-right">
                                        <div class="cancle">
                                            <p-button
                                                type="default"
                                                size="small"
                                                @click="cancelColmunSetBox"
                                            >取消</p-button>
                                        </div>
                                        <div class="submit">
                                            <p-button
                                                type="primary"
                                                size="small"
                                                @click="submitColumnSet"
                                            >确定</p-button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </transition>
                    </div>
                </div>
                <!-- 分页器 -->
                <div class="p-t-pagination" v-if="pagination">
                    <Pagination
                        :pageCountShow="pageCountShow"
                        :page="page"
                        :pageCount="pageCount"
                        :pageSize="pageSize"
                        :fast="fast"
                        :fastStep="fastStep"
                        :basePage="basePage"
                        :visiblePages="visiblePages"
                        :reloadPage="reloadPage"
                        :pageSizeSetting="pageSizeSetting"
                        :simple="simple"
                        @change="currentChange"
                        @reload-page="reloadPageHandle"
                    />
                </div>
            </div>
        </div>
    </div>
</template>

<script>
// 表头设置按钮Icon
import SetBtn from '../static/iconSvg/setting.svg';
// 小三角Icon
import ToggleBtn from '../static/iconSvg/arrow_triangle_blue.svg';
// 小三角 active
import ToggleBtnBlack from '../static/iconSvg/arrow_triangle_black.svg';
import sortIcon from '../static/iconSvg/sort.svg';
// 更多Icon
import IconMore from '../static/iconSvg/more.svg';
// 关闭Icon
import IconClose from '../static/iconSvg/icon_close.svg';
// 三明治Icon
import Shift from '../static/iconSvg/shift.svg';
// 分页器
import Pagination from '../Pagination';
import Checkbox from '../Checkbox';
import PButton from '../Button';
import Icon from '../Icon';
import Select from '../Select';

/**
 * 复制对象或数组
 * @param {object|array} obj
 * @return {object|array} obj的副本
 */
function _copy(obj) {
    return JSON.parse(JSON.stringify(obj));
}

export default {
    name: 'Table',
    props: {
        /**
         * 表头列表
         */
        head: {
            type: Array,
            default: () => []
        },
        /**
         * 表体数据列表
         */
        source: {
            type: Array,
            default: () => []
        },
        /**
         * 分组信息
         */
        group: {
            type: Object,
            default: () => {
                return {};
            }
        },
        /**
         * 分组和条件筛选组件的宽度
         */
        selectWidth: {
            type: [Number, String],
            default: 180
        },
        /**
         * 表格宽度
         */
        width: {
            type: [Number, String],
            default: "100%"
        },
        /**
         * 表格高度
         */
        height: {
            type: [Number, String]
        },
        /**
         * 行高
         */
        rowHeight: {
            type: [Number, String],
            default: 49
        },
        /**
         * 是否显示边框
         */
        bordered: {
            type: Boolean,
            default: false
        },
        /**
         * 文字对齐方式
         */
        align: {
            type: String,
            default: "left"
        },
        /**
         * 表格字体
         */
        fontFamily: {
            type: String,
            default: ""
        },
        /**
         * 表体字体颜色
         */
        fontColor: {
            type: String,
            default: "#1F2329"
        },
        /**
         * 表头字体颜色
         */
        headFontColor: {
            type: String,
            default: "#646A73"
        },
        /**
         * 表头字号
         */
        headFontSize: {
            type: String,
            default: "12px"
        },
        /**
         * 表体字号
         */
        fontSize: {
            type: String,
            default: "14px"
        },
        /**
         * 表体字体宽度
         */
        fontWeight: {
            type: [String, Number],
            default: "normal"
        },
        /**
         * 表头字体宽度
         */
        headFontWeight: {
            type: [String, Number],
            default: "normal"
        },
        /**
         * 是否开启拖拽设置列宽
         */
        setColumnWidth: {
            type: Boolean,
            default: false
        },
        /**
         * 是否开启行勾选
         */
        checkAble: {
            type: Boolean,
            default: false
        },
        /**
         * 是否开启表头拖拽排序和显隐设置
         */
        columnSet: {
            type: Boolean,
            default: false
        },
        /**
         * 是否使用分页器
         */
        pagination: {
            type: Boolean,
            default: false
        },
        /**
         * 总条数
         */
        pageCount: {
            type: Number,
            default: 0
        },
        /**
         * 是否显示总条数
         */
        pageCountShow: {
            type: Boolean,
            default: true
        },
        /**
         * 每页条数
         */
        pageSize: {
            type: [String, Number],
            default: '20'
        },
        /**
         * 当前选中页码
         */
        page: {
            type: Number,
            default: 1
        },
        /**
         * 快速翻页步长
         */
        fastStep: {
            type: Number,
            default: 5
        },
        /**
         * 显示快速翻页按钮的基数
         */
        basePage: {
            type: Number,
            default: 3
        },
        /**
         * 是否显示快速翻页按钮
         */
        fast: {
            type: Boolean,
            default: true
        },
        /**
         * 默认显示的页数
         */
        visiblePages: {
            type: Number,
            default: 5
        },
        /**
         * 是否显示重置页码
         */
        reloadPage: {
            type: Boolean,
            default: false
        },
        /**
         * 是否显示每页条数选择器
         */
        pageSizeSetting: {
            type: Boolean,
            default: false
        },
        /**
         * 是否使用简易分页器
         */
        simple: {
            type: Boolean,
            default: false
        },
        /**
         * 行操作按钮列表
         */
        toolButtons: {
            type: Array,
            default: () => []
        },
        /**
         * 工具栏按钮的样式 text：文字 | icon：图标 | iconText：文字+图标
         */
        toolButtonType: {
            type: String,
            default: 'iconText'
        },
        /**
         * 默认显示的按钮个数
         */
        defaultButtonNumber: {
            type: Number,
            default: 3
        },
        /**
         * 筛选条件列表
         */
        filtersList: {
            type: Array,
            default: () => []
        },
        /**
        * 是否使用默认的单元格title
         */
        isTitleShow: {
            type: Boolean,
            default: true
        }
    },
    directives: {
        /**
         * 自定义指令，点击空白处隐藏弹框。
         */
        off: {
            // 初始化指令
            bind(el, binding, vnode) {
                function documentHandler(e) {
                    e.stopPropagation();
                    // 这里判断点击的元素是否是本身，是本身，则返回
                    if (el.contains(e.target)) {
                        return false;
                    }
                    // 判断指令中是否绑定了函数
                    if (binding.expression) {
                        // 如果绑定了函数 则调用那个函数，此处binding.value就是handleClose方法
                        binding.value(e);
                    }
                }
                // 给当前元素绑定个私有变量，方便在unbind中可以解除事件监听
                el.__vueClickOutside__ = documentHandler;
                document.addEventListener("click", documentHandler);
            },
            update() {},
            unbind(el, binding) {
                // 解除事件监听
                document.removeEventListener("click", el.__vueClickOutside__);
                delete el.__vueClickOutside__;
            }
        }
    },
    data() {
        return {
            overflow: false, // 是否显示横向滚动条
            timeout: null, // 保存定时器编号
            timeout2: null, // 保存定时器编号
            headList: this.head, // 表头
            headListSnapshot: [], // 表头快照
            headListSnapshot2: [], // 表头快照，只有点击列设置的确定按钮后才会改变
            headListSnapshotSorted: [], // 排序后的表头快照
            sourceList: this.source, // 表格数据
            tableDom: null, // 表格dom
            tableHeadDom: null, // 表头dom
            right: null, // 当前操作列的right dom
            current_column: null, // 当前操作列
            current_column_index: 0, // 当前操作列的下标
            next_column: null, // 当前操作列的下一列
            // 当前光标的坐标
            current_mouse: {
                x: 0
            },
            mouse_start: {}, // 设置列宽开始时的光标坐标
            right_start: {}, // 设置列宽开始时的right坐标
            checked: "uncheck", // 全部勾选状态
            groupMsg: this.group, // 分组信息
            groupSourceList2: {}, // 分组信息
            columnSetShow: false, // 表头设置下拉框的显隐
            checkedValues: [], // 保存已选的行数据
            // 每页条数设置选择器数据
            pageSizeOptions: [
                "10",
                "20",
                "30",
                "40",
                "50",
                "60",
                "70",
                "80",
                "90",
                "100",
                ""
            ],
            currentPage: this.page, // 当前所在的页码
            defaultBtnNum: this.defaultButtonNumber, // 需要默认显示出来的按钮个数
            isFilterBtnShow: false, // 条件筛选展开按钮的显隐，筛选条件较多时显示
            filterBoxState: "off", // 条件筛选框的展开收起
            draging: null, //被拖拽的对象
            target: null //拖拽目标对象
        };
    },
    computed: {
        /**
         * 表格宽度
         */
        tableWidth() {
            const type = typeof this.width;
            if (type === "string") {
                if (this.width.indexOf("%") > -1) return this.width;
                const w = parseFloat(this.width);
                if (isNaN(w))
                    console.error("width 参数接受数字或数字开头的字符串！");
                else return `${w.toFixed(2)}px`;
            } else {
                return `${this.width.toFixed(2)}px`;
            }
        },
        /**
         * 表格高度
         */
        tableHeight() {
            if (!this.height) return null;
            const type = typeof this.height;
            if (type === "string") {
                if (this.height.indexOf("%") > -1) return this.height;
                const h = parseFloat(this.height);
                if (isNaN(h))
                    console.error("height 参数接受数字或数字开头的字符串！");
                else return `${h.toFixed(2)}px`;
            } else {
                return `${this.height.toFixed(2)}px`;
            }
        },
        widthHeight() {
            const styleObj = {
                width: this.tableWidth,
            };
            if (this.tableHeight) {
                styleObj.height = this.tableHeight;
            }
            return styleObj;
        },
        /**
         * 被选中的表格行数据
         */
        checkedRows() {
            return this.sourceList
                .filter(item => item.checked)
                .map(item => item);
        },
        /**
         * 分组信息
         */
        groupSourceList() {
            if (!this.groupMsg.isGroup)
                return [
                    {
                        groupKey: "",
                        folding: true,
                        sourceList: this.sourceList.map((item, i) => {
                            item.index = `0-${i}`;

                            if (this.checkAble)
                                this.$set(item, "checked", false);
                            if (this.isToolShow === undefined)
                                this.$set(item, "isToolShow", true);
                            this.$set(item, "hovered", false);
                            this.$set(item, "isMoreBtnShow", false);
                            return item;
                        })
                    }
                ];
            const keyList = Array.from(
                new Set(this.sourceList.map(item => item[this.groupMsg.key]))
            );
            return keyList.map((key, i) => {
                return {
                    groupKey: key,
                    folding: true,
                    sourceList: this.sourceList
                        .filter(source => source[this.groupMsg.key] === key)
                        .map((item, s_i) => {
                            item.index = `${i}-${s_i}`;

                            if (this.checkAble)
                                this.$set(item, 'checked', false);
                            if (this.isToolShow === undefined)
                                this.$set(item, 'isToolShow', true);
                            this.$set(item, 'hovered', false);
                            this.$set(item, 'actived', false);
                            this.$set(item, 'isMoreBtnShow', false);

                            return item;
                        })
                };
            });
        },
        /**
         * 要显示的表头列
         */
        computedHeadList() {
            return this.headList.filter(head => head.show);
        },
        /**
         * 每列列宽
         */
        columnWidth() {
            return this.computedHeadList.map(head => head.width);
        },
        /**
         * 被勾选的行数
         */
        checkedCount() {
            return this.sourceList.filter(item => item.checked).length;
        },
        /**
         * 默认要显示的按钮列表
         */
        defaultBtnList() {
            return this.toolButtons.filter((btn, i) => i < this.defaultBtnNum);
        },
        /**
         * 更多下拉框的中按钮列表
         */
        moreBtnList() {
            return this.toolButtons.filter((btn, i) => i >= this.defaultBtnNum);
        },
        /**
         * 每行中需要使用标签具名插槽的列
         */
        tagList() {
            return this.sourceList.map(source => source._tags || []).map(item => item.map(tag => tag.key));
        },
        /**
         * 每行中需要设置颜色的列
         */
        colorList() {
            return this.sourceList.map(source => source._colors || []).map(item => item.map(c => c.key));
        },
    },
    components: {
        SetBtn,
        ToggleBtn,
        ToggleBtnBlack,
        Pagination,
        IconMore,
        sortIcon,
        IconClose,
        Checkbox,
        PButton,
        Shift,
        Icon,
        Select
    },
    watch: {
        groupSourceList(val) {
            this.groupSourceList2 = val;
        },
        head(val) {
            this.headList = val;
            this.headListSnapshot = _copy(this.headList).map(
                (item, index) => {
                    item.order = index + 1;
                    this.$set(item, 'hovered', false);
                    return item;
            });
            // 排序后的列的副本，列排序后会改变
            this.headListSnapshotSorted = _copy(this.head).map((item, index) => {
                item.order = index + 1;
                return item;
            });
            // 保存初始表头副本，只有在列设置保存后才会改变。
            this.headListSnapshot2 = _copy(this.head);
            this.resetColumnWidth();
        },
        checkedRows(val) {
            if (!val.length) this.checked = "uncheck";
        },
        source(val) {
            this.sourceList = val.map(s => {
                s.timer = null
                return s;
            });
        },
        deep: true
    },
    methods: {
        /**
         * 通过操作按钮的个数，动态调整行工具栏的宽度
         */
        resizeToolBox() {
            this.$nextTick(() => {
                const toolBox = this.$refs._toolBox[0];
                const maxWidth = this.tableDom.offsetWidth * 0.8;
                const toolBoxWidth = toolBox.offsetWidth;
                if (toolBoxWidth > maxWidth) {
                    this.defaultBtnNum -= 1;
                    this.resizeToolBox();
                } else {
                    return;
                }
            });
        },
        /**
         * 显示鼠标所在行的工具栏
         * @param {number} index 行号 e 事件对象
         */
        rowFocusHandle(index, e) {
            this.sourceList.map(item => {
                item.hovered = false;
                if (item.timer) {
                    clearTimeout(item.timer);
                    item.timer = null;
                }
                if (item.index === index) {
                    // 等待0.3s才弹出工具栏
                    item.timer = setTimeout(() => {
                        item.hovered = true;
                        if (this.toolButtons.length)
                        this.resizeToolBox();
                        clearTimeout(item.timer);
                        item.timer = null;
                    },300)
                }
                if (this.toolButtons.length)
                    item.isMoreBtnShow = false;
                return item;
            });
            
        },
        /**
         * 隐藏鼠标移出行的工具栏
         * @param {number} index 行号 e 事件对象
         */
        rowBlurHandle(index, e) {
            this.sourceList.map(s => {
                s.hovered = false;
                if (s.timer) {
                    clearTimeout(s.timer);
                    s.timer = null;
                    s.hovered = false;
                }
            })
            this.defaultBtnNum = this.defaultButtonNumber;
        },
        /**
         * 行点击事件
         * @param {object} item 当前点击的行
         * @param {object} e 事件对象
         * @return {object} obj 行数据
         */
        rowClickHandle(item, e) {
            // 取消未保存的列设置，隐藏列设置下拉框
            this.checkedValues = this.headList
                .filter(head => head.show)
                .map(item => item.key);
            if (this.columnSetShow) {
                this.headListSnapshot = _copy(this.headListSnapshot2);
                this.columnSetShow = false;
            }
            // 标记选中的行
            this.sourceList.map(item => {
                item.actived = false;
            });
            item.actived = true;
            this.$emit('row-click', item);
        },
        // 点击列的右侧，绑定列宽设置事件
        /**
         * 点击表头列的右侧边框区域，绑定列宽设置事件
         * @param {number} i 当前列的表头列号
         * @param {object} ev 点击事件
         */
        columnMousedownHandle(i, ev) {
            if (!this.setColumnWidth) return;
            const e = ev || event;
            const right = e.target;
            this.right = right;
            this.current_column = this.right.parentNode.parentNode;
            this.current_column_index = i;
            this.mouse_start.x = e.clientX;
            this.right_start.x = right.offsetLeft;
            this.current_mouse.x = e.clientX;
            this.next_column = this.current_column.nextSibling;
            if (this.right.setCapture) {
                this.right.οnmοusemοve = this.doDrag;
                this.right.οnmοuseup = this.stopDrag;
                this.right.setCapture();
            } else {
                document.addEventListener("mousemove", this.doDrag, true);
                document.addEventListener("mouseup", this.stopDrag, true);
            }
        },
        /**
         * 从所有后置列中找出第一个列宽大于最小宽度的列（最小宽度80）
         * @param {number} i 当前操作列的列号
         * @return {array} [元素, 下标]
         */
        findNextColumn(i) {
            if (this.computedHeadList[i + 1].width > 80) {
                return [true, i + 1];
            }
            if (this.computedHeadList[i + 2]) {
                return this.findNextColumn(i + 1);
            }
            return [null, null];
        },
        /**
         * 从所有前置列中找出第一个列宽大于最小宽度的列（最小宽度80）
         * @param {number} i 当前操作列的列号
         * @return {array} [元素，下标]
         */
        findPreviousColumn(i) {
            if (this.computedHeadList[i - 1].width > 80) return [true, i - 1];
            if (this.computedHeadList[i - 2]) {
                return this.findPreviousColumn(i - 1);
            }
            return [null, null];
        },
        /**
         * 拖动时设置列宽
         * @param {object} clientX 鼠标的横坐标
         * @param {number} direction 鼠标拖动过的距离，direction < 0 左拖动 direction > 0 右拖动
         */
        setColumn(clientX, direction) {
            // 拖动的距离
            const d = Math.abs(direction);
            if (direction > 0) {
                // 向右拖动
                // 找出右侧列第一个大于最小宽度80的列，如果没有，说明是最后一列，最后一列不可拖拽
                const next = this.findNextColumn(this.current_column_index);
                if (next[0]) {
                    // 右侧列移动后的计算距离
                    const w = this.computedHeadList[next[1]].width - d;
                    // 临界值判断
                    if (w < 80){
                        // 如果移动之后小于最小宽度80,设置当前列的列宽实际增加宽度
                        this.computedHeadList[this.current_column_index].width += this.computedHeadList[next[1]].width - 80;
                    }else {
                        // 如果移动之后大于最小宽度80，设置当前列列宽
                        this.computedHeadList[this.current_column_index].width += d;
                    }
                    // 设置右侧列列宽
                    this.computedHeadList[next[1]].width = w < 80 ? 80 : w;
                }else {
                    // 右侧单元格都已经达到最小宽度就退出
                    return;
                }
            } else {
                // 向左拖动
                // 当前列达到最宽度80
                if (this.computedHeadList[this.current_column_index].width <= 80) {
                    // 如果是第一列就退出
                    if (this.current_column_index === 0) return;
                    // 找出左侧第一个大于最小宽度80的列，如果没有就退出
                    const prev = this.findPreviousColumn(
                        this.current_column_index
                    );
                    if (prev[0]) {
                        // 左侧列移动后的计算宽度
                        const w = this.computedHeadList[prev[1]].width - d;
                        // 前置列宽度未达到最小值80,设置后置列的宽度
                        if (w > 80) {
                            this.computedHeadList[
                                this.current_column_index + 1
                            ].width += d;
                        }else {
                            // 如果前置列计算后的宽度小于最小值80，设置后置列宽度为实际增加宽度
                            this.computedHeadList[
                                this.current_column_index + 1
                            ].width += this.computedHeadList[prev[1]].width - 80;
                        }
                        // 设置前置列宽度
                        this.computedHeadList[prev[1]].width = w > 80 ? w : 80;
                    } else {
                        // 左侧列都达到了最小宽度，退出
                        return;
                    }
                    
                } else {
                    // 如果当前列宽大于最小宽度80
                    // 当前列计算后的宽度
                    const w = this.computedHeadList[this.current_column_index].width - d;
                    // 计算后宽度,大于最小值80，设置后置列宽度
                    if (w > 80) {
                        this.computedHeadList[
                            this.current_column_index + 1
                        ].width += d;
                    } else {
                        // 计算后宽度小于最小宽度，设置后置列实际增加的宽度
                        this.computedHeadList[
                            this.current_column_index + 1
                        ].width += this.computedHeadList[this.current_column_index].width - 80;
                    }
                    // 设置当前列宽
                    this.computedHeadList[this.current_column_index].width = w < 80 ? 80 : w;
                }
            }
        },
        /**
         * 设置列宽mousemove事件的回调方法
         * @param {object} ev 事件对象
         */
        doDrag(ev) {
            const e = ev || event;
            // d < 0 向左拖动 d > 0 向右拖动
            const d = e.clientX - this.current_mouse.x;
            if (d === 0) return;
            this.current_mouse.x = e.clientX;
            // 设置列宽，最后一列不能设置
            if (this.next_column) 
                this.setColumn(e.client, d);
        },
        /**
         * 终止列宽设置
         */
        stopDrag() {
            if (this.right.releaseCapture) {
                this.right.οnmοusemοve = null;
                this.right.οnmοuseup = null;
                this.right.releaseCapture();
            } else {
                document.removeEventListener("mousemove", this.doDrag, true);
                document.removeEventListener("mouseup", this.stopDrag, true);
            }
            this.right = null;
            this.current_column = null;
            this.current_column_index = 0;
            this.next_column = null;
            this.current_mouse = { x: 0 };
            this.mouse_start = {};
            this.right_start = {};
        },
        /**
         * 全选事件
         * @param {string} checkState 全选框的勾选状态
         */
        checkAllChange(checkState) {
            this.checked = checkState;
            if (this.checked === "checked")
                this.sourceList.map(item => (item.checked = true));
            else this.sourceList.map(item => (item.checked = false));
            this.$emit("check-change", this.checkedRows);
        },
        /**
         * 列表项勾选事件
         * @param {object} e 鼠标事件
         * @param {object} item 勾选的行数据
         */
        itemCheckChange(data) {
            data[2].checked = data[0] === "checked" ? true : false;
            const len = this.sourceList.length;
            const checkedLen = this.sourceList.filter(obj => obj.checked)
                .length;
            if (checkedLen > 0)
                this.checked = len - checkedLen > 0 ? "notNull" : "checked";
            else this.checked = "uncheck";
            this.$emit("check-change", [this.checkedRows, data[2]]);
        },
        /**
         * 分组展开收起
         * @param {object} group 当前分组数据
         */
        foldingChange(group) {
            group.folding = !group.folding;
        },
        /**
         * 隐藏列设置框
         */
        hideBox(e) {
            // 被勾选的表头列表
            this.checkedValues = this.headList
                .filter(head => head.show)
                .map(item => item.key);
            this.headListSnapshot = _copy(this.headListSnapshot2);
            this.columnSetShow = false;
        },
        /**
         * 隐藏表头排序设置下拉框
         */
        cancelColmunSetBox() {
            this.checkedValues = this.headList
                .filter(head => head.show)
                .map(item => item.key);
            this.headListSnapshot = _copy(this.headListSnapshot2);
            this.columnSetShow = false;
        },
        /**
         * 显示列设置框
         */
        showColumnSet(e) {
            this.columnSetShow = true;
            this.$nextTick(() => {
                const elem = e.target;
                const height = this.$refs._pTable.offsetHeight;
                this.$refs._pSetContent.style.height = `${height-32}px`;
            })

        },
        /**
         * 重置列宽
         */
        resetColumnWidth() {
            // 重置列宽
            this.overflow = false;
            this.$nextTick(() => {
                let tableWidth = this.tableHeadDom.offsetWidth;
                const arr = this.headList.filter(head => head.show);
                // 减去表头设置和行勾选框所占宽度
                if (this.columnSet) tableWidth -= 48;
                if (this.checkAble) tableWidth -= 48;
                let width = Number((tableWidth / arr.length).toFixed(4));
                if (width < 81) {
                    this.overflow = true;
                    width = 80;
                }else {
                    this.overflow = false;
                    width = width;
                }
                this.headList = arr.map(item => {
                    this.$set(item, "width", width);
                    return item;
                });
            })
        },
        /**
         * 保存列宽设置
         */
        submitColumnSet() {
            this.headListSnapshot = _copy(this.headListSnapshotSorted);

            const newheadList = this.headListSnapshot.map(item => {
                item.show = this.checkedValues.includes(item.key);
                return item;
            });

            this.headList = _copy(newheadList);

            this.$emit("column-set-change", newheadList);

            this.headListSnapshot2 = _copy(this.headListSnapshot);

            // 重置列宽
            this.resetColumnWidth();
            this.columnSetShow = false;
        },
        /**
         * 改变分组
         * @param {string} value 当前分组的key名称
         */
        groupChange(value) {
            this.$emit("group-change", value);
        },
        /**
         * 清空已选项
         */
        clearCheckedSource() {
            this.checked = false;
            this.sourceList.map(item => (item.checked = false));
            this.$emit("check-change", this.checkedRows);
        },
        /**
         * 删除已选项
         */
        deleteCheckedSource() {
            this.$emit('delete', this.checkedRows);
        },
        /**
         * 下载
         */
        download() {
            this.$emit('download', this.checkedRows);
        },
        /**
         * 恢复表格列顺序默认设置
         */
        resumeDefault() {
            this.$emit("column-set-resume");
            this.columnSetShow = false;
        },
        /**
         * 点击工具
         * @param {object} tool 操作按钮信息，用以区分不同的按钮
         */
        toolClick(tool) {
            this.checkedValues = this.headList
                .filter(head => head.show)
                .map(item => item.key);
            if (this.columnSetShow) {
                this.headListSnapshot = _copy(this.headListSnapshot2);
                this.columnSetShow = false;
            }
            this.$emit("tool-button-click", tool);
        },
        /**
         * 显示更多操作按钮下拉框
         * @param {object} obj 当前操作的行数据
         * @param {Number} index 当前行号
         */
        showItemMoreBtnList(obj, index) {
            this.groupSourceList2.map(group => {
                group.sourceList.map(item => (item.isMoreBtnShow = false));
            });
            obj.isMoreBtnShow = true;
            // 计算元素距离文档顶部和左侧的距离
            function _offset(element) {
                var pos = { left: 0, top: 0 }
                var parents = element.offsetParent
                pos.left += element.offsetLeft
                pos.top += element.offsetTop

                while (parents && !/html|body/i.test(parents.tagName)) {
                    pos.left += parents.offsetLeft
                    pos.top += parents.offsetTop

                    parents = parents.offsetParent
                }
                return pos
            }
            this.$nextTick(() => {
                const box = this.$refs.moreDropdowmBox[0];
                const boxRect = box.getBoundingClientRect();
                const tableBox = this.$refs._pTable;
                const tableRect = tableBox.getBoundingClientRect();
                if (_offset(box).top + box.offsetHeight - this.$refs._tableHead.scrollTop > _offset(tableBox).top + tableBox.offsetHeight) {
                    box.style.top = -boxRect.height + 8 + "px";
                    this.$refs._pMoreTriangle[0].className = `${this.$refs._pMoreTriangle[0].className} p-more-triangle-rotate`;
                }else {
                    box.style.top = "39px";
                    this.$refs._pMoreTriangle[0].className = "p-more-triangle";
                }
            });
        },
        /**
         * 点击更多工具列表项
         * @param {object} tool 操作按钮信息，用以区分不同的按钮
         */
        moreBtnItemClickHandle(tool) {
            this.groupSourceList2.map(group => {
                group.sourceList.map(item => (item.isMoreBtnShow = false));
            });
            this.$emit("tool-button-click", tool);
        },
        /**
         * 数据排序（上下三角排序）
         * @param {object} head 要排序的表头信息
         * @param {string}  orderType asc=>升序 desc=>降序
         * @return {object} key=>排序列的key值 orderType=> asc：升序 desc：降序
         */
        sourceOrderHandle(head, orderType) {
            this.computedHeadList.map(head => {
                head.desc = false;
                head.asc = false;
            });
            head[orderType] = true;
            this.headListSnapshot = _copy(this.headListSnapshot2);
            this.$emit("order-change", { key: head.key, orderType: orderType });
        },
        /**
         * 筛选条件的展开收起
         */
        toggleFilterBox() {
            this.filterBoxState = this.filterBoxState === "on" ? "off" : "on";
        },
        /**
         * 拖拽开始
         * @param {object} event 拖拽事件对象
         */
        onDragStart(event) {
            this.draging = event.target;
            event.target.style.borderTopColor = "#0091ff";
        },
        /**
         * 拖拽中
         * @param {object} event 拖拽事件对象
         */
        onDragOver(event) {
            this.target = event.target;
            const targetTop = event.target.getBoundingClientRect().top;
            const dragingTop = this.draging.getBoundingClientRect().top;
            if (this.target.nodeName === "LI" && this.target !== this.draging) {
                if (this.target) {
                    if (this.target.animated) {
                        return;
                    }
                }

                if (this._index(this.draging) < this._index(this.target)) {
                    this.target.parentNode.insertBefore(
                        this.draging,
                        this.target.nextSibling
                    );
                } else {
                    this.target.parentNode.insertBefore(
                        this.draging,
                        this.target
                    );
                }
                this._anim(targetTop, this.target);
                this._anim(dragingTop, this.draging);
            }
        },
        /**
         * 鼠标进入表头设置列表回调
         */
        headListEnterHandle(head) {
            this.headListSnapshot.map(item => item.hovered = false);
            head.hovered = true;
        },
        /**
         * 鼠标离开表头设置列表回调
         */
        headListLeaveHandle(head) {
            head.hovered = false;
        },
        /**
         * 重绘拖拽dom
         * @param {number} startPos 开始拖拽时dom对象的纵坐标
         * @param {object} dom 正在拖拽的dom对象
         */
        _anim(startPos, dom) {
            const offset = startPos - dom.getBoundingClientRect().top;
            dom.style.transition = "none";
            dom.style.transform = `translateY(${offset}px)`;

            //触发重绘
            dom.offsetWidth;
            dom.style.transition = "transform .3s";
            dom.style.transform = ``;

            clearTimeout(dom.animated);
            dom.animated = setTimeout(() => {
                dom.style.transition = "";
                dom.style.transform = ``;
                dom.animated = false;
            }, 300);
        },
        /**
         * 拖拽结束
         * @param {object} event 拖拽事件对象
         */
        onDragEnd(event) {
            const currentNodes = Array.from(this.$refs.parentNode.childNodes);
            this.headListSnapshotSorted = currentNodes.map((i, index) => {
                return this.headListSnapshot.find(
                    c => c.title == i.getAttribute("title")
                );
            });
            event.target.style.borderTopColor = 'transparent';
        },
        /**
         * 当前拖拽dom对象的下标
         * @param {object} el 当前拖拽dom对象
         */
        _index(el) {
            const domData = Array.from(this.$refs.parentNode.childNodes);
            return domData.findIndex(i => i.innerText == el.innerText);
        },
        /**
         * 切换页码回调方法
         * @param {object} currentPage currentPage.newPage=>当前页码；currentPage。newPageSize=>每页条数
         */
        currentChange(currentPage) {
            this.$emit("page-size-change", currentPage);
        },
        /**
         * 刷新当前页
         */
        reloadPageHandle(page) {
            this.$emit('reload-page', page);
        },
        /**
         * 条件筛选事件
         */
        filterSelectChange(val) {
            this.$emit("filter-change", {
                key: val.key,
                value: val.value
            });
        },
        /**
         * 勾选表头名称
         * @param val [...argumnets, row] 
         *  arguments: checkBox组件返回的数据uncheck|checked; 
         *  row：被勾选的表头信息
         */
        columnShowChange(val) {
            const headSnapshot = this.headListSnapshot.find(
                head => head.key == val[2].key
            );
            headSnapshot.show = val[0] === "checked" ? true : false;
            this.checkedValues = this.headListSnapshot
                .filter(head => head.show)
                .map(head => head.key);
        },
        /**
         * 是否展示'展开收起'按钮
         */
        displayOffOnBtn() {
            if (this.filtersList.length) {
                this.$nextTick(() => {
                    const filterBoxWidth = this.$refs._filterBox.offsetWidth;
                    let num = this.filtersList.length;
                    if (Object.keys(this.groupMsg).length) ++num;
                    if (num*(parseFloat(this.selectWidth) + 12) > filterBoxWidth)
                        this.isFilterBtnShow = true;
                    else    
                        this.isFilterBtnShow = false;
                })
            } 
        }
    },
    created() {
        // timer 保存定时器编号，用于控制工具栏延时出现
        this.sourceList = this.source.map(s => {
            s.timer = null;
            return s;
        });

        // 分组信息
        this.groupSourceList2 = this.groupSourceList;

        // 列的副本
        this.headListSnapshot = _copy(this.head).map(
            (item, index) => {
                item.order = index + 1;
                this.$set(item, 'hovered', false);
                return item;
            }
        );

        // 排序后的列的副本，列排序后会改变
        this.headListSnapshotSorted = _copy(this.head).map((item, index) => {
            item.order = index + 1;
            return item;
        });
        
        // 保存初始表头副本，只有在列设置保存后才会改变。
        this.headListSnapshot2 = _copy(this.head);

        // 默认显示的列
        this.checkedValues = this.headListSnapshot
            .filter(head => head.show)
            .map(item => item.key);
    },
    mounted() {
        //为了防止火狐浏览器拖拽的时候以新标签打开
        document.body.ondrop = function(event) {
            event.preventDefault();
            event.stopPropagation();
        };
        window.addEventListener('resize', () => {
            if (this.timeout2) {
                clearTimeout(this.timeout2);
                this.timeout2 = null;
            }
            this.timeout2 = setTimeout(() => {
                this.resetColumnWidth();
                this.displayOffOnBtn();
            },200)
        }, false)
        this.$nextTick(() => {
            // 计算列的宽度
            this.tableDom = this.$refs._tableBox;
            this.tableHeadDom = this.$refs._tableHead;
            const arr = this.headList.filter(head => head.show);
            let tableHeadWidth = this.tableHeadDom.offsetWidth;
            // 减去列设置或者勾选框所占宽度
            if (this.columnSet) tableHeadWidth -= 48;
            if (this.checkAble) tableHeadWidth -= 48;
            let width = Number((tableHeadWidth / arr.length).toFixed(4));
            if (width < 81) {
                this.overflow = true;
                width = 80;
            }else {
                this.overflow = false;
                width = width;
            }
            // 设置列宽
            this.headList = arr.map(item => {
                // this.$set(item, 'width', width);
                this.$set(item, 'desc', false);
                this.$set(item, 'asc', false);
                return item;
            });
        })
        

        // 是否显示展开收起按钮
        this.displayOffOnBtn();
    }
};
</script>

<style lang="stylus">

.p-table-box
    position relative
    width 100%
    padding 2px
    font-size 0
    text-align left
    height 300px
    .p-table-container
        position relative
        height 100%
        .p-table-container-box
            display flex
            flex-direction column
            justufy-content space-between
            width 100%
            height 100%
            .p-checked-filter-box
                position relative
                min-height 44px
                .p-checked-filter-inner-box
                    display flex
                    justify-content space-between
                    .p-checked-review
                        display flex
                        align-items center
                        justify-content space-between
                        position absolute
                        top 0
                        left 0
                        right 0
                        bottom 0
                        z-index 1000
                        color $grey-600
                        padding-left 24px
                        padding-right 18px
                        background $blue-100
                        border-radius 4px
                        border 1px solid $blue-300
                        .p-review-left
                            display flex
                            align-items center
                            .p-checked-num
                                margin-right 20px
                                font-size 14px
                                span
                                    display inline-block
                                    width 25px
                                    text-align center
                                    color $black
                            .p-review-tool
                                display flex
                                align-items center
                                .p-review-tool-delete
                                    margin-right 12px
                        .p-review-right
                            display flex
                            align-items center
                            cursor pointer
                    .p-filter-box
                        display flex
                        flex-wrap wrap
                        flex-grow 1
                    .p-more-filter-box
                        display flex
                        width 50px
                        min-width 50px
                        padding-top 6.5px
                        justify-content center
                        font-size 14px
                        color $blue-500
                        cursor pointer
                        span, i
                            height 16px
                        .off
                            transform  rotate(180deg)
                            transition transform 0.3s
                        .on
                            transform  rotate(-180deg)
                            transition transform 0.3s
            .p-inner-container
                position relative
                flex-grow 1
                overflow-x auto
                // 表格
                .p-table
                    // height 100%
                    position absolute
                    top 0
                    bottom 0
                    // 表头
                    .p-table-head
                        display flex
                        align-items center
                        width 100%
                        height 40px
                        border-bottom 1px solid $grey-300
                        background $grey-50
                        &:hover .p-table-head-th
                                border-color $grey-300 !important
                        .p-check-box, .p-column-set-btn
                            height 100%
                            text-align center
                            background $grey-50
                        .p-check-box
                            display flex
                            align-items center
                            padding 0 4px 0 24px
                        .p-column-set-btn
                            display flex
                            align-items center
                            justify-content center
                            width 48px
                            min-width 48px
                            max-width 48px
                            cursor pointer
                            border-left 1px solid $grey-300
                            svg
                                width 16px
                                height 16px
                        .p-table-head-th
                            display flex
                            align-items center
                            justify-content space-between
                            height 100%
                            line-height 40px
                            min-width 80px
                            padding-left 20px
                            color $grey-300
                            .p-head-title-con
                                width calc(100% - 8px)
                                display flex
                                align-items center
                                .p-head-title
                                    height 100%
                                    max-width calc(100% - 16px)
                                    font-size 12px
                                    overflow hidden
                                    text-overflow ellipsis
                                    white-space nowrap
                                .p-order-box
                                    display flex
                                    flex-direction column
                                    justify-content center
                                    height 40px
                                    margin-left 4px
                                    i
                                        display flex
                                        flex-direction column
                                        justify-content flex-start
                                        cursor pointer
                                        svg 
                                            width 6px
                                            height 6px
                                    .desc
                                        transform rotate(180deg)
                            .right
                                width 8px
                                min-width 8px
                                height 100%
                                cursor col-resize
                    // 表体
                    .p-table-body
                        position relative
                        height calc(100% - 40px)
                        overflow-y auto
                        overflow-x hidden
                        .p-check-box, .p-column-set-btn
                            text-align center
                        .p-check-box
                            display flex
                            align-items center
                            height 100%
                            padding 0 4px 0 24px
                        .p-column-set-btn
                            width 50px
                            background $white
                        .p-table-body-tr
                            display flex
                            align-items center
                            width 100%
                            .p-group
                                width 100%
                                .p-group-tr
                                    display flex
                                    align-items center
                                    width 100%
                                    height 48px
                                    font-weight 500
                                    font-size 14px
                                    &.p-group-border
                                        border-bottom 1px solid $grey-300
                                    .p-group-toggle-btn
                                        margin-left 24px
                                        margin-right 8px
                                        i
                                            display flex
                                            align-items center
                                            justify-content flex-start
                                            height 100%
                                        .p-triangleUp
                                            transform rotate(90deg)
                                        .p-triangleDown
                                            transform rotate(180deg)
                                        &.no-check-box
                                            margin-left 0
                            .actived
                                background $grey-100
                                border-radius 24px
                                border-color transparent
                            .p-table-body-filed-tr
                                position relative
                                display flex
                                align-items center
                                height 49px
                                border-bottom 1px solid $grey-300
                                transition background .3s linear
                                
                                &:hover
                                    background $grey-100
                                    border-radius 24px
                                    border-color transparent
                                &:hover > .p-column-set-btn
                                    background #f5f6f7
                                .p-filed
                                    display flex
                                    align-items center
                                    height 100%
                                    min-width 80px
                                    padding-left 20px
                                    overflow hidden
                                    text-overflow ellipsis
                                    white-space nowrap
                                    span
                                        overflow hidden
                                        text-overflow ellipsis
                                        white-space nowrap
                                .p-row-tool-box
                                    position absolute
                                    right 0
                                    top 0
                                    z-index 3
                                    height 48px
                                    background $blue-800
                                    box-shadow 0px 2px 8px 0px rgba(0, 87, 154, 0.5)
                                    border-radius 24px
                                    display flex
                                    align-items center
                                    justify-content space-between
                                    padding-left 10px
                                    padding-right 10px
                                    font-size 14px
                                    color $white
                                    cursor pointer
                                    .p-more-triangle
                                        position absolute
                                        bottom 3px
                                        right 26px
                                        width 16px
                                        height 16px
                                    .p-more-triangle-rotate
                                        bottom 30px
                                        transform rotate(180deg)
                                    .p-tool
                                        position relative
                                        display flex
                                        height 100%
                                        color $white
                                        justify-content space-between
                                        flex-grow 1
                                        align-items center
                                        padding-right 10px
                                        padding-left 10px
                                        &:last-child
                                            border-right 0
                                        svg
                                            path
                                                fill $white
                                        .p-btn-text
                                            &:hover
                                                color $blue-200
                                        div
                                            display flex
                                            align-items center
                                            height 100%
                                            white-space nowrap
                                        .p-more-text
                                            &:hover
                                                color $blue-200
                                        .p-btn-icon-box
                                            position relative
                                            display flex
                                            justify-content center
                                            width 28px
                                            height 28px
                                            .p-icon-item-box
                                                height 28px
                                                width 28px
                                                display flex
                                                justify-content center
                                                border-radius 50%
                                                svg
                                                    margin-left 4px
                                            &:hover
                                                .p-btn-icon-tips
                                                    opacity 1
                                                    bottom -36px
                                                // .p-icon-item-box
                                                //     background rgba(0,101,179,1)
                                            .p-btn-icon-tips
                                                opacity 0
                                                position absolute
                                                bottom 0
                                                left 47%
                                                z-index 10
                                                transform translateX(-50%)
                                                padding 7px 12px
                                                height 36px
                                                background rgba(31,36,41,.8)
                                                border-radius 3px
                                                transition all .3s linear
                                                .p-triangle
                                                    width: 0;
                                                    height: 0;
                                                    border: 4px solid;
                                                    border-left-width: 2px;
                                                    border-right-width: 2px;
                                                    border-color: transparent transparent rgba(31,36,41,.8) transparent;
                                                    position: absolute;
                                                    top: -8px;
                                                    left: 50%;
                                        .p-icon-only
                                            &:hover
                                                .p-icon-item-box
                                                    background rgba(0,101,179,1)
                                                
                                        .p-more-tool-select
                                            flex-direction column
                                            position absolute
                                            top 39px
                                            right 0
                                            z-index 100
                                            width 100px
                                            min-height 30px
                                            max-height 150px
                                            overflow auto
                                            padding 8px 0
                                            background rgba(31, 36, 41, 0.8)
                                            box-shadow 0px 2px 10px 0px rgba(31, 35, 41, 0.1)
                                            border-radius 4px
                                            .p-more-tool-select-item
                                                display flex
                                                height 38px
                                                line-height 38px
                                                width 100%
                                                padding-left 13px
                                                color $white
                                                &:hover
                                                     background $grey-600
                                                .p-icon-box
                                                    width 24px
                                                span
                                                    flex-grow 1
                                                    overflow hidden
                                                    white-space nowrap
                                                    text-overflow ellipsis
                                                    &:hover
                                                        color $blue-200
    .p-t-pagination
        display flex
        align-items center
        justify-content flex-end
        padding-top 16px
        color #646a73
        border-top 1px solid $grey-300
    svg
        width 16px
        height 16px
    .p-overflowx 
        left 0
        right 0
// 表头设置
.p-set-content
    position absolute
    top 30px
    right 0px
    height 100px
    width 240px
    z-index 100
    box-shadow 0px 2px 10px 0px rgba(31, 35, 41, 0.1)
    border-radius 4px
    background $white
    color $grey-900
    border 1px solid rgba(228, 229, 231, 1)
    .p-set-content-body
        display flex
        flex-direction column
        height calc(100% - 60px)
        overflow auto
        padding 8px 0
        box-sizing border-box
        .p-drag-list
            .hovered
                border-top-color $blue-500 !important
                border-radius 4px
                background $grey-100
                box-shadow 0px 1px 6px 0px rgba(31, 36, 41, 0.2)
                transition all .3s
            .p-drag-list-item
                display flex
                align-items center
                justify-content space-between
                height 38px
                padding-left 20px
                padding-right 16px
                border 2px solid transparent
                transition background .3s
                &:hover 
                    background $grey-100
                    .p-drag-icon
                        opacity 1
                .p-drag-title
                    display flex
                    align-items center
                    width calc(100% - 30px)
                    height 100%
                    margin-left 3px
                    font-size 14px
                    overflow hidden
                    white-space nowrap
                    text-overflow ellipsis
                    cursor pointer
                .p-drag-icon
                    opacity 0
                    display flex
                    flex-direction column
                    justify-content space-between
                    height 14px
                    width 16px
                    cursor pointer
    .p-set-content-foot
        display flex
        align-items center
        height 60px
        padding-left 20px
        border-top 1px solid $grey-300
        .p-foot-left
            font-size 14px
            margin-right 12px
            span
                color $grey-600
                cursor pointer
        .p-foot-right
            display flex
            justify-content flex-end
            align-items center
            .cancle
                margin-right 12px
.slide-fade-enter-active 
    transition all .3s ease

.slide-fade-leave-active 
    transition all .3s ease

.slide-fade-enter, .slide-fade-leave-to
    opacity 0

@keyframes slideInDownUi2
    from
        pointer-events none
        opacity 0
        transform translate3d(0, -30px, 0)
    to
        pointer-events none
        opacity 1
        transform translate3d(0, 0, 0)

.slideDown-enter-active
    animation slideInDownUi2 .3s


</style>