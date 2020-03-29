 <template>
    <span @click.stop="noop" class="p-cascader-column" >
        <ul class="p-cascader-menu" v-if="!multiple" :style="menuWidth">
            <li :class="itemClass(item)" 
                v-for="(item, index) in cascaderList"
                @mouseenter.stop="handleHoverItem(item)"
                @mouseleave="handleLeaveItem(item)"
                @click.stop="handleClickItem(item, index)" 
                :key="index">
                <span :class="['p-cascader-item-text', item.forbidden&&'p-cascader-item-text-disabled' ]" :style="itemWidth" >{{item.title}}</span>
                <span style="transform: translate(0px, 4px);">
                    <i class="p-cascader-next-icon" v-if="item.children && item.children.length && !item.loading"><arrow style="width:16px;height:16px"></arrow></i>
                    <i class="p-cascader-item-loading" v-if="item.loading"><loading style="width:16px; height:16px;" /></i>
                </span>
            </li>
        </ul>
        <ul class="p-cascader-menu" v-if="multiple" :style="menuWidth">
            <li :class="itemClass(item)" 
                v-for="(item, index) in cascaderList" 
                :key="index"
                @click.stop="noop"
                >
                <Checkbox
                    v-if="type && type!=='final'" 
                    :checked ="item.checked" 
                    :data-id ="item.id"
                    :disabled="item.forbidden || item.disabled"
                    @change="handleCheckbox"
                    >
                </Checkbox>
                <Checkbox v-if="type && type=='final' && item.selectCheckbox" 
                    :checked ="item.checked" 
                    :disabled="item.forbidden || item.disabled"
                    :data-id ="item.id"
                    @change="handleCheckbox"
                >
                </Checkbox>
                <span :class="['p-cascader-item-text', item.forbidden&&'p-cascader-item-text-disabled' ]" 
                      :style="itemWidth"  
                       @mouseenter.stop="handleHoverItem(item)"
                       @click.stop="handleClickItem(item)"
                       @mouseleave="handleLeaveItem(item)"
                      >
                      {{item.title}}
                </span>
                <span style="transform: translate(0px, 4px);">
                    <i class="p-cascader-next-icon" 
                          v-if="item.children && item.children.length && !item.loading"
                           @mouseenter.stop="handleHoverItem(item)"
                           @click.stop="handleClickItem(item)"
                           @mouseleave="handleLeaveItem(item)"
                        >
                          <arrow style="width:16px;height:16px">
                          </arrow>
                    </i>
                    <i class="p-cascader-item-loading" v-if="item.loading"><loading style="width:16px; height:16px;" /></i>
                </span>
            </li>
        </ul>
        <cascaPanel 
            v-if="subListData.length" 
            :change="change"
            :deepChange="deepChange"
            :checkWidth="checkWidth"
            :loadData="loadData"
            :multiple="multiple"
            :type="type"
            :width="width"
            :trigger="trigger"
            :all="all"
            :cascaderList="subListData">
        </cascaPanel>
    </span>
</template>

<script>
import loading from '../static/iconSvg/loading_grey.svg'
import Checkbox from '../Checkbox/Checkbox'
import arrow  from '../static/iconSvg/arrow_right2.svg'
export default {
    name: 'cascaPanel',
    components:{loading,arrow},
    inject: ['flatData'],
    props:{
        cascaderList:{
            type:Array,
            default: () => []
        },
        change: {
            type: Function,
            default: () => false
        },
        deepChange:{
            type:Function,
            default: () => false
        },
        checkWidth :{
            type:Function,
            default:() => false
        },
        loadData: {
            type: Function
        },
        type:{
            type:String
        },
        width:{
            type:[Number,String]
        },
        multiple:{
            type:Boolean
        },
        trigger: {
            validator (value) {
                return  ['click', 'hover'].indexOf(value) > -1
            },
            default: 'click'
        },
        all:{
            type:Boolean,
            default:false
        }
    },
    data () {
        return {
            subListData:[],
            activeKey:'',
            initKey:1,
            currentHandleItem:null,
            timer:null
        }
    },
    watch:{
         
    },
    computed: {
        itemWidth () {
            let width = this.width
            if (width < 180) width = 180;
            if (width > 600) width = 600;
            return {width : (width - 56) + 'px'}
        },
        menuWidth () {
            let width = this.width
            if (width < 180) width = 180;
            if (width > 600) width = 600;
            return {width: width + 'px'}
        },
    },
    mounted () {
        this.$on('clear', () => {
            this.subListData = []
        })
    },
    methods:{
        noop () {
            return false
        },
        itemClass (item) {
            return ['p-cascader-item', {
                ['p-cascader-item-active'] : item.active,
                ['p-cascader-item-disabled'] : item.disabled
            }]
        },
        /**
         * normal: 常规 子父级联动 父级有半选状态
         * independent: 父级和子级都可以选择，且互不干
         * final:只有子级节点可以选择，此时的父级节不能选择
         * forbidden: 选择了父级，子级勾选，且不可操作
         */
        handleCheckbox (a, b) {
            let item = this.flatData.find(option => {return option.id === b.id})
            if (item) {
                if (this.type === 'normal') {
                    this.handleNormal(item)
                }
                if (this.type === 'forbidden') {
                    this.handleForbidden(item)
                }
                if (this.type === 'independent') {
                    this.handleIndependent(item)
                }
                if (this.type === 'final') {
                    this.handleFinal(item)
                }
                if (typeof this.loadData === 'function'){
                    if (item.children.length) {
                        this.setAttributeOfNode(item)
                    }
                } 
                this.deepChange()
            }
        },
        handleFinal (item) {
            if(item.checked==='checked') {
                item.checked = 'uncheck' 
            } else {
                item.checked = 'checked' 
            }
        },
        handleIndependent (item) {
            if(item.checked==='checked') {
                item.checked = 'uncheck' 
            } else {
                item.checked = 'checked' 
            }
        },
        handleForbidden (item) {
            if(item.checked==='checked') {
                item.checked = 'uncheck' 
                this.recursiveSetChecked(item, 'uncheck', false)
            } else {
                item.checked = 'checked' 
                this.recursiveSetChecked (item, 'checked', true)
            }
        },
        handleNormal (item) {
            if(item.checked==='checked') {
                item.checked = 'uncheck' 
                this.recursiveSetChecked (item, 'uncheck')
                this.checkParentStatus(this, item)
            } else {
                item.checked = 'checked' 
                this.recursiveSetChecked(item, 'checked')
                this.checkParentStatus(this, item)
            }
        },
        handleLeaveItem () {
            if (this.timer) {
                clearTimeout(this.timer)
            }
        },
        handleHoverItem (item) {
            if (this.trigger !== 'hover' || !item.children || !item.children.length) return;   
            this.expandNextPanel(item);
        },
        handleClickItem (item) {
            if (this.trigger !== 'click' && item.children && item.children.length) return;  
            this.expandNextPanel(item);
        },
        expandNextPanel (item) {
            this.flatData.forEach(option=>{
                if (option.id === item.id) {
                    option.active = true
                } else {
                    option.active = false
                }
            })
            let vm = this
            if (!item.disabled) {
                this.change(item)
            } 
            this.clearData()
            if (typeof this.loadData === 'function') {
                this.timer = setTimeout(()=>{
                    this.loadData(item, () => {
                        if (item.children.length) {
                                this.setAttributeOfNode(item)
                                this.subListData = item.children
                        } else {
                            this.subListData = []
                        }
                        this.timer = null
                        this.$nextTick(()=>{
                            this.checkWidth()
                        })
                    })
                },300)
            } else {
                if (item.children&&item.children.length) {
                    this.subListData = item.children
                } else {
                    this.subListData = []
                }
                this.$nextTick(()=>{
                    this.checkWidth()
                })
            }
        },
        setAttributeOfNode (item) {
            item.children.forEach(option => {
                this.initKey++
                this.$set(option,'parentId', item.nodekey)
                this.$set(option,'loading', false)
                this.$set(option,'children', [])
                this.$set(option,'nodekey', item.nodekey + '' + this.initKey)
                this.$set(option,'id', item.nodekey + '' + this.initKey)
                if (this.multiple) {
                    this.$set(option,'checked', 'uncheck')
                    this.$set(option,'active', false)
                    if (this.type === 'forbidden') {
                        this.$set(option,'forbidden', false)
                    }
                }
                this.flatData.push(option)
            })
        },
        checkParentStatus (node, item) {
            let vm = this
            let selectedLen = node.cascaderList.filter(item=>item.checked === 'checked').length
            let uncheckLen = node.cascaderList.filter(item=>item.checked === 'notNull').length
            let allLen = node.cascaderList.length
            let parent = vm.flatData.find(option => {return option.nodekey === item.parentId})
            if (parent) {
                if (selectedLen === allLen) {
                    parent.checked = 'checked'   // 全选 
                }
                if (!selectedLen) {
                    parent.checked = 'uncheck'; // 全不选
                }
                if ((selectedLen && selectedLen < allLen) || uncheckLen) { // 不全选 不全不选
                    parent.checked = 'notNull'; 
                } 
                if (node.$parent && node.$parent.$options.name === "cascaPanel") {
                    this.checkParentStatus(node.$parent, parent)
                }
            }
        },
        recursiveSetChecked (data ,status, disabled) {
            if (data.children && data.children.length) {
                data.children.forEach(item => {
                    if (item.disabled) return;
                    item.checked = status
                    if (typeof disabled !== 'undefined') {
                        this.$set(item,'forbidden', disabled)
                    }
                    this.recursiveSetChecked(item, status, disabled)
                })
            }
        },
        clearData() {
            if (this.$children) {
                this.findChldComponent(this.$children)
            }
        },
        findChldComponent (parent) {
            parent.forEach(comp => {
                if (comp.$options.name === 'cascaPanel') {
                    comp.activeKey =''
                    comp.$emit('clear')
                    if (comp.$children) {
                        this.findChldComponent(comp.$children)
                    }
                }
            })
        }
    }
}
</script>
<style lang="stylus">
.p-cascader-column
    width 100%
    box-sizing border-box
    overflow auto
    .p-cascader-menu
        display: inline-block
        padding 8px 0
        min-width: 120px
        height 222px
        border-right: 1px solid $grey-200
        vertical-align: top
        overflow: auto
        li.p-cascader-item
            display flex
            justify-content space-between
            align-items center
            height 38px
            padding: 8px 12px
            box-sizing border-box    
            color: $grey-900
            line-height: 22px
            font-size: 14px;
            white-space: nowrap;
            list-style: none;
            cursor: pointer
            text-align left 
            .p-cascader-item-text
                white-space: nowrap
                overflow hidden
                text-overflow ellipsis
            .p-checkbox
                padding-top 0
                height 24px
            .p-cascader-item-text-disabled
                color $grey-400
                cursor not-allowed
            &:hover
                background $grey-100
        li.p-cascader-item-active
            color $blue-500
            background $blue-100
            i.p-cascader-item-loading
                pointer-events none
        li.p-cascader-item-disabled
            color $grey-400
            cursor not-allowed
            &:hover
                background: transparent
            

</style>