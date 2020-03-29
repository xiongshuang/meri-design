<template>
<transition name="selectDownUpExtend">
    <div ref="dropdown" class="p-cascader-drop" v-show="showCascader" >
        <div class="p-cascader-select-container"  >
            <div class="p-cascader-select-panel">
                <div>
                    <cascaPanel 
                        v-show=" !query && !queryItems.length"
                        :cascaderList="data"
                        :loadData="loadData"
                        :multiple="multiple" 
                        :type="type"
                        :width="width"
                        :deepChange="deepChange"
                        :checkWidth="checkWidth"
                        :trigger="trigger"
                        :change="change"
                        :all="all"
                        >                        
                    </cascaPanel>
                    <div @click.stop="noop" class="p-cascader-filter" :style="{width: width+'px', height: '222px'}" v-show="query && queryItems.length">
                        <ul>
                            <li class="p-cascader-item" 
                                v-for="(item, index) in queryItems"
                                @click="handleSelectItem(item)"
                                :key="index">
                                <Checkbox 
                                    v-if="type && type!=='final'" 
                                    :checked ="item.checked" 
                                    :disabled="item.forbidden || item.disabled"
                                    :data-id="item.id"
                                    @change="handleCheckbox"
                                    >
                                </Checkbox>
                                <Checkbox v-if="type && type=='final' && item.selectCheckbox" 
                                    :checked ="item.checked" 
                                    :disabled="item.forbidden || item.disabled"
                                    :data-id="item.id"
                                    @change="handleCheckbox"
                                >
                                </Checkbox>
                                <span class="p-cascader-item-text" :title="item.title" :style="{width: (width - 50 )+'px' }" v-html="item.display"></span>
                            </li>
                        </ul>
                    </div>
                    <div class="p-cascader-no-found" ref='notfound' :style="notFoundStyle" v-show=" query  && !queryItems.length || !data.length" >没有找到任何内容</div>
                </div>
                <div @click.stop="noop" class="p-cascader-select-panel-footer"  v-if="multiple && !showPanel">
                    <span @click="cancalPanel">取消</span>
                    <span @click="confirmEmit">确定</span>
                </div>
            </div>
            <div  @click.stop="noop" class="p-cascader-select-list"  v-if="showPanel"  :style="{width: width + 'px'}">
                <div class="p-cascader-select-list-header">
                    <span class="p-cascader-selected">已选(<span>{{selectedItems.length}}</span>)</span>
                    <span class="p-cascader-clear" :style="cursorStyle" @click.capture="clearSelectAll">清空</span>
                </div>
                <div  class="p-cascader-select-list-body">
                    <ul>
                        <li  v-for="(item, index) in selectedItems" :key="index">
                            <span :style="itemWidth">
                                {{item._title || item.title}}
                            </span>
                            <span class="p-cascader-clear-icon">
                                <i @click.stop="clearSingleItem(item,index)" ><clear style="width:16px;height:16px"></clear></i>
                            </span>
                        </li>
                    </ul>
                </div>
                <div :style="boxShadowStyle"  :class="panelClass">
                    <span @click="cancalPanel">取消</span>
                    <span @click="confirmEmit">确定</span>
                </div>
            </div>
        </div>
    </div>
</transition>
</template>
<script>
import cascaPanel from './cascaPanel'
import clickoutside from './clickoutside'
import clear from '../static/iconSvg/clear2.svg'
import {cloneDeep} from './utils'
export default {
    provide(){
        return {
            flatData: this.flatData
        }
    },
    name:'cascaderDrop',
    components:{cascaPanel, clear},
    data () {
        return {
            showCascader:false,
            queryItems:[],
            selectedItems:[],
            storeFlatData:[],
            confirmedData:[],
            storeHandleData:[],
            storeQueryData:[],
            storeSelectedItems:[],
            activeItem:null,
            depth:1,
            selectedItemsCloneStr: '',
        }
    },
    directives:{
        'clickoutside':clickoutside
    },
    computed: {
        itemWidth () {
            return {width : (this.width - 50) + 'px'}
        },
        notFoundStyle () {
            return {
                height: this.multiple ? '222px' : '54px',
                width: this.width + 'px',
                borderRight: this.multiple ? '1px solid #eff0f1': 'none'
            }
        },
        boxShadowStyle () {
            return {
                boxShadow: this.selectedItems.length > 4 ? '' : '' 
            }
        },
        panelClass () {
            return  ['p-cascader-select-list-footer',  this.selectedItems.length > 4 ? 'p-cascader-select-list-footer-shadow' : ''
            ]
        },
        cursorStyle () {
            return {
                cursor : this.selectedItems.length ? 'pointer' : 'not-allowed',
            }
        },
        containerWidth () {
            let add = this.showPanel ? 1 : 0
            return {
                width : (this.depth + add) * Number(this.width) + 'px'
            }
        }
    },
    props:{
        query:{
            type:String,
            default:''
        },
        data:{
            type:Array,
            default: () => []
        },
        loadData:{
            type: Function
        },
        selectIds:{
            type:Array
        },
        flatData: {
            type:Array
        },
        type:{
            type: String
        },
        multiple: {
            type:Boolean
        },
        showPanel:{
            type:Boolean
        },
        width:{
            type:[Number,String]
        },
        recursionData:{
            type:Array
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
        },
    },
    mounted(){
        if (this.selectIds && Array.isArray(this.selectIds) && this.selectIds.length) {
            this.refillCasscader(this.data, this, this.selectIds)
        }
    },
    watch:{
        selectIds:{
            handler(n,o) {
                if ( n !== o) {
                    this.query = ''
                    this.queryItems = []
                    if (!n.length) {
                        this.clearData()
                    }
                }
            },
        },
        showCascader:{
            handler(n,o) {
                if ( n !== o) {
                    if (this.multiple) {
                        if (n ) {
                            if (!this.confirmedData.length) {
                                this.clearSelectAll(true)
                            } else {
                                this.recursiveReset(this.data)
                                this.selectedItems = JSON.parse(this.selectedItemsCloneStr)
                                if(!this.query) {
                                    this.queryItems=[]
                                } else {
                                    this.resetQueryData()
                                }
                            }
                        }
                    }
                }
            }
        },
    },
    methods:{
        handleMouseOver (item) {
            this.activeItem = item.id
        },
        noop () {
            return false
        },
        resetQueryData(){
         
        },
        cancalPanel () {
            if (!this.confirmedData.length) {
                this.query = ''
                this.clearSelectAll()
                this.depth = 1
                this.$children[0].subListData = []
                this.$emit('checkWidth', 1)
            }  
            this.$emit('change', this.confirmedData)
            this.showCascader = false
        },
        recursiveReset (data) {
            data.forEach(item => {
                let res = this.storeHandleData.find(option => { return option.id === item.id})
                if (res) {item.checked = res.checked}
                if (this.type === 'forbidden') {
                    item.forbidden = res.forbidden
                }
                if (item.children && item.children.length) {
                    this.recursiveReset(item.children)
                }
            })
        },
        confirmEmit () {
            if (this.query) {
                this.confirmedData.forEach(item => {
                    this.checkParent(item)
                })
                this.query = ''
            } 
            this.showCascader = false
            this.confirmedData = cloneDeep(this.selectedItems)
            this.selectedItemsCloneStr = JSON.stringify(this.selectedItems)
            this.storeHandleData = cloneDeep(this.flatData)
            this.$emit('confirm', this.confirmedData)
        },
        refillCasscader (data,obj,ids) {
            let index = -1
            let vm =this
            findComp(data, obj, ids)
            setTimeout(() => {
                this.checkWidth()
                if (this.multiple) {
                    let id = ids[ids.length -1]
                    let item = this.flatData.find(item => {return item.id === id})
                    if (item) {
                        this.checkParent(item)
                        this.selectedItems.push(item)
                        this.confirmedData = cloneDeep(this.selectedItems)
                        this.selectedItemsCloneStr = JSON.stringify(this.selectedItems)
                    }
                    this.$emit('change', this.selectedItems)
                }
            })
            function findComp (data, parent, arr) {
                index++
                for (let i=0 ; i < data.length; i++) {
                    let item = data[i]
                    if (item.id === arr[index]) {
                        if (vm.multiple) {
                            item.checked = 'checked'
                        } else {
                            item.active = true
                        }
                        let comp = findNextComp(parent)
                        if (!comp) return
                        if (item.children) {
                            comp.subListData = item.children
                            vm.$nextTick(() => {
                                findComp(item.children, comp, arr)
                            })
                        } else {
                            comp.subListData = []
                        }
                    } 
                }
            }
            function findNextComp(Comp) {
                let target = null
                if (Comp.$children && Comp.$children.length) {
                    Comp.$children.forEach(comp => {
                        if (comp.$options.name === 'cascaPanel') {
                            target = comp 
                        }
                    })
                    return target
                }
            }
        },
        checkWidth () {
            let depth = 0
            let vm = this
            findChldComponent(this.$children) 
            this.depth = depth
            this.$emit('checkWidth', depth)
            function findChldComponent (parent) {
                parent.forEach(comp => {
                    if (comp.$options.name === 'cascaPanel') {
                        depth++
                        if (comp.$children) {
                            findChldComponent(comp.$children)
                        }  
                    }
                })
            }
        },
        clearSelectAll () {
            this.flatData.forEach(item => {
                if (this.type === 'forbidden') {
                    item.forbidden = false
                    item.checked = 'uncheck'
                }
                item.active = false
            })
            this.selectedItems.forEach((item, index)=> {
                let result = this.flatData.find(option => {
                   return item.id === option.id
                })
                if (result) {
                    result.checked = 'uncheck'
                    this.checkParent(result)
                }
            })
            this.selectedItems = []
            this.$emit('change', this.selectedItems)
        },
        clearSingleItem (item, index) {
         
            let ids = (item._ids || item.ids).split('/')
            let id =ids[ids.length - 1]
            let vm = this
            let result = this.flatData.find(option => {
                return id === option.id
            })
          
            if (result) {
                result.checked = 'uncheck'
                if (this.type === 'normal') {
                    this.checkParent(result)

                    if (result.children && result.children.length) {
                        recursiveClear(result)
                    }
                }
                if (this.type === 'forbidden') {
                    recursiveSetChecked(result, 'uncheck', false)
                }
            }
            this.selectedItems.splice(index, 1)

            if (!this.selectedItems.length) {
                this.$emit('change', this.selectedItems)
            }
            if (this.type === 'normal') {
                this.checkParent(result)
                this.countSelectedNumner()
            }
            if (this.query) {
                let find = this.queryItems.find(option => {return option.id === item.id})
                if (find) {
                    find.checked = 'uncheck'
                }
            }
            function recursiveClear (data) {
                data.children.forEach(item => {
                    item.checked = 'uncheck'
                    let index = vm.selectedItems.findIndex(option => { return item.id === option.id })
                    if (index>-1) {
                        vm.selectedItems.splice(index, 1)
                    } 
                    if (item.children && item.children.length) {
                        recursiveClear(item)
                    }
                })
            }
            function recursiveSetChecked (data ,status, disabled) {
                if (data.children && data.children.length) {
                    data.children.forEach(item => {
                        if (item.disabled) return;
                        item.checked = status
                        if (typeof disabled !== 'undefined') {
                            vm.$set(item,'forbidden', disabled)
                        }
                        recursiveSetChecked(item, status, disabled)
                    })
                }
            }
        },
        checkParent(data) {
            if (this.type !== 'normal') return;
            let parent = this.flatData.find(option => {
                return data.parentId === option.nodekey
            })
            if (!parent || !parent.children) {
                return
            }  
            let children = parent.children
            if (parent && children && children.length) {
                let selectedLen = children.filter(item=>item.checked === 'checked').length
                let uncheckLen = children.filter(item=>item.checked === 'notNull').length
                let allLen = children.length
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
                    this.checkParent(parent)
                }
            }
        },
        handleClose () {
            this.showCascader = false
        },
        handleCheckbox (a ,b) {
            let item = this.queryItems.find(option => {return option.id === b.id})
            let index = this.selectedItems.findIndex(item => { return item.id === b.id })
            let data = this.flatData.find(item => { return item.id === b.id })
            if (data.disabled) return
            if (item && data) {
                if(item.checked==='checked') {
                    item.checked = 'uncheck' 
                    data.checked = 'uncheck'
                    if (index > -1) {
                        this.selectedItems.splice(index,1)
                    }
                } else {
                    item.checked = 'checked' 
                    data.checked = 'checked'
                    if (index === -1) {
                        if (!data.disabled) {
                            this.selectedItems.push(item)
                        }
                    }
                }
                
                if (this.type !== 'final') {
                    this.checkParent(item)
                    this.countSelectedNumner()
                }
            }
        },
        handleSelectItem (item, index) {
            this.$emit('select', item);
        },
        change (item) {
            if (!this.multiple) {
                this.$emit('change', item)
            }  
        },
        deepChange () {
            if(this.type !== 'final') {
                this.countSelectedNumner()
            }
            if (this.type === 'final') {
                let arr = []
                this.flatData.forEach(item => {
                    if (item.checked === 'checked') {
                        arr.push(item)
                    }
                })
                this.selectedItems = arr
            }
        },
        countSelectedNumner () {
            let selections = []
            this.$nextTick(()=>{
                this.flatData.forEach(item => {
                    if (this.type=== 'normal' || this.type === 'independent') {
                        if (item.checked === 'checked' && !item.disabled) {
                            selections.push(item)
                        }
                        if (item.checked === 'notNull' && this.type === 'normal' && this.all  && !item.disabled) {
                            selections.push(item)
                        }
                    }
                    if (this.type === 'forbidden') {
                        if (item.checked === 'checked' && !item.forbidden) {
                            selections.push(item)
                        }
                    }
                })
                this.selectedItems = selections
                if (!this.selectedItems.length) {
                    this.$emit('change', this.selectedItems)
                }
            })
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
@import '../static/stylus/animate/selectDownUpExtend.styl'
.p-cascader-drop
    position absolute
    width auto
    border 1px solid #E4E5E7
    border-radius 4px
    box-shadow 0 2px 10px 0 rgba(31,35,41, .1)
    background white
    font-size 0
    // outline none 
    .p-cascader-select-container
        display flex
        justify-content flex-start
        .p-cascader-select-panel
            .p-cascader-filter
                min-width 120px
                border-right 1px solid $grey-300
                width 100%
                height 222px
                overflow auto
                ul li
                    display flex
                    align-items center
                    height 38px
                    padding-right: 36px
                    padding: 8px 16px
                    color:  $grey-900
                    font-size: 14px
                    white-space: nowrap
                    list-style: none
                    cursor: pointer
                    .p-cascader-item-text
                        display inline-block
                        white-space: nowrap
                        overflow hidden
                        text-overflow ellipsis
            .p-cascader-no-found
                width 100%
                padding 0 12px
                padding 16px 0 16px 12px
                border-radius 4px
                line-height 22px
                font-size 14px
                color #C3C7CB
                min-width 180px
                max-width 600px
                background:white
                box-shadow 0 2 10 0 rgba(31, 35, 41, .1)
                box-sizing border-box
                white-space: nowrap
                overflow hidden
                text-overflow ellipsis
            .p-cascader-select-panel-footer
                display flex 
                justify-content flex-end
                align-items center
                padding 0 12px 0 16px
                height 45px
                line-height 45px
                font-size 14px
                border-top 1px solid $red-200
                span 
                    cursor pointer
                span:first-child    
                    margin-right 16px
                    color $grey-900
                span:last-child
                    color $blue-500
                    margin-right 12px
        .p-cascader-select-list
            position relative
            min-width 200px
            height 222px
            .p-cascader-select-list-header
                display flex 
                justify-content space-between
                align-items center
                padding 0 12px 0 16px
                height 45px
                line-height 45px
                border-bottom 1px solid $red-200
                font-size 14px
                color $grey-500
            .p-cascader-select-list-body
                height calc(100% - 90px)
                overflow-y auto
                ul
                    li
                        position: relative
                        display flex
                        align-items center
                        justify-content flex-start
                        line-height: 22px
                        padding: 8px 16px
                        color: $grey-900
                        font-size: 14px
                        list-style: none
                        cursor: pointer
                        span:first-child
                            white-space: nowrap
                            overflow hidden
                            text-overflow ellipsis
                        .p-cascader-clear-icon
                            position absolute
                            top 50%
                            right 16px
                            transform translate(0px, -30%)
                            &:hover
                                svg
                                    path
                                        fill #0091FF
            .p-cascader-select-list-footer
                display flex
                justify-content flex-end
                align-items center
                width 100%
                height 45px
                font-size 14px
                color $grey-900
                span 
                    cursor pointer
                span:first-child    
                    margin-right 16px
                    color $grey-900
                span:last-child
                    color $blue-500
                    margin-right 12px
            .p-cascader-select-list-footer-shadow
                box-shadow $box-shadow-top

</style>